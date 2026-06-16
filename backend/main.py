from fastapi import FastAPI, HTTPException, Depends, Header
from fastapi.middleware.cors import CORSMiddleware
from sse_starlette.sse import EventSourceResponse
import os
import sqlite3
import bcrypt
import secrets

from models import LoginRequest, SignupRequest, NotificationPayload
import redis_client

app = FastAPI(title="Real-time Notification API")

# Setup CORS for the Next.js frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

DB_PATH = os.path.join(os.path.dirname(__file__), "..", "dev.db")

def init_db():
    """Initialize SQLite DB and create User table if it doesn't exist"""
    conn = sqlite3.connect(DB_PATH, check_same_thread=False)
    cursor = conn.cursor()
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS User (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            username TEXT UNIQUE NOT NULL,
            passwordHash TEXT NOT NULL,
            role TEXT DEFAULT 'staff',
            createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
        )
    ''')
    conn.commit()
    conn.close()

# Run DB initialization on startup
init_db()

def get_db():
    conn = sqlite3.connect(DB_PATH, check_same_thread=False)
    conn.row_factory = sqlite3.Row
    try:
        yield conn
    finally:
        conn.close()

def verify_token(authorization: str = Header(None)):
    """Dependency to verify the session token stored in Redis"""
    if not authorization or not authorization.startswith("Bearer "):
        raise HTTPException(status_code=401, detail="Missing or invalid Authorization header")
    
    token = authorization.split(" ")[1]
    username = redis_client.get_user_by_token(token)
    
    if not username:
        raise HTTPException(status_code=401, detail="Invalid or expired session token")
    
    return username

@app.post("/signup")
async def signup(request: SignupRequest, db: sqlite3.Connection = Depends(get_db)):
    """Register a new user in the SQLite database"""
    # Check if user already exists
    cursor = db.cursor()
    cursor.execute("SELECT id FROM User WHERE username = ?", (request.username,))
    if cursor.fetchone():
        raise HTTPException(status_code=400, detail="Username already exists")
    
    # Hash password
    hashed_pwd = bcrypt.hashpw(request.password.encode('utf-8'), bcrypt.gensalt())
    
    # Insert user
    cursor.execute(
        "INSERT INTO User (username, passwordHash) VALUES (?, ?)", 
        (request.username, hashed_pwd.decode('utf-8'))
    )
    db.commit()
    
    return {"message": "User created successfully"}

@app.post("/login")
async def login(request: LoginRequest, db: sqlite3.Connection = Depends(get_db)):
    """Sign in a user, verify against SQLite, and store session in Redis"""
    cursor = db.cursor()
    cursor.execute("SELECT passwordHash FROM User WHERE username = ?", (request.username,))
    row = cursor.fetchone()
    
    if not row:
        raise HTTPException(status_code=401, detail="Invalid username or password")
        
    hashed_pwd = row['passwordHash']
    
    # Verify password
    if not bcrypt.checkpw(request.password.encode('utf-8'), hashed_pwd.encode('utf-8')):
        raise HTTPException(status_code=401, detail="Invalid username or password")
    
    # Generate random session token
    token = secrets.token_urlsafe(32)
    
    # Store session in Redis (with TTL)
    redis_client.create_session(token, request.username)
    
    return {"token": token, "username": request.username}

@app.post("/logout")
async def logout(authorization: str = Header(None)):
    """Remove session token from Redis"""
    if authorization and authorization.startswith("Bearer "):
        token = authorization.split(" ")[1]
        redis_client.delete_session(token)
    return {"status": "logged out"}

@app.post("/notify")
async def notify(payload: NotificationPayload, current_user: str = Depends(verify_token)):
    """Publish a notification (requires authentication)"""
    published_msg = redis_client.publish_notification(payload.channel, payload.model_dump())
    return {"status": "success", "published": published_msg, "sender": current_user}

@app.get("/stream")
async def stream(channel: str):
    """SSE Endpoint for real-time notifications on a given channel"""
    if not channel:
        raise HTTPException(status_code=400, detail="Channel is required")
        
    return EventSourceResponse(redis_client.subscribe_channel(channel))

@app.get("/history")
async def history(channel: str, limit: int = 50):
    """Retrieve the recent history for a given channel"""
    if not channel:
        raise HTTPException(status_code=400, detail="Channel is required")
        
    messages = redis_client.get_history(channel, limit)
    return messages
