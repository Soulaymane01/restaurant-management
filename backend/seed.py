import sqlite3
import bcrypt
import os

DB_PATH = os.path.join(os.path.dirname(__file__), "..", "dev.db")

def create_user(username, password):
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()
    
    # Check if user exists
    cursor.execute("SELECT id FROM User WHERE username = ?", (username,))
    if cursor.fetchone():
        print(f"User {username} already exists.")
        return
        
    hashed_pwd = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())
    
    cursor.execute(
        "INSERT INTO User (username, passwordHash) VALUES (?, ?)", 
        (username, hashed_pwd.decode('utf-8'))
    )
    conn.commit()
    conn.close()
    print(f"User {username} created successfully!")

if __name__ == "__main__":
    create_user("admin", "password123")
    create_user("testuser", "password")
