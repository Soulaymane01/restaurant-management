# Partie 2 : Redis & Infrastructure
## Documentation Technique — Système de Notifications en Temps Réel

---

## 🚀 Getting Started (Setup Guide for Team Members)

This section explains how to set up and run the **Redis & Infrastructure** layer of the project on your local machine from scratch.

### Prerequisites

Make sure you have the following installed before starting:

| Tool | Version | Purpose |
|---|---|---|
| **Docker Desktop** | Latest | Run the Redis server in a container |
| **Python** | 3.10+ | Run the FastAPI backend |
| **Node.js** | 18+ | Run the Next.js frontend |

---

### Step 1 — Start Redis via Docker

Redis runs inside a Docker container. You do **not** need to install Redis directly on your machine.

Open a terminal and run:

```bash
docker run -d --name redis_server -p 6379:6379 redis:7
```

> **If the container already exists** (you've done this before), just start it:
> ```bash
> docker start redis_server
> ```

To verify Redis is running:
```bash
docker ps
# You should see "redis_server" listed with status "Up"
```

---

### Step 2 — Set Up the Python Virtual Environment

We use a **virtual environment (`venv`)** so that dependencies are isolated and do not affect your global Python installation. This is important for team compatibility.

```powershell
# From the project root:

# 1. Create the virtual environment (only needed once)
python -m venv backend/venv

# 2. Activate it (PowerShell)
.\backend\venv\Scripts\Activate.ps1

# 3. Install all backend dependencies
.\backend\venv\Scripts\python.exe -m pip install -r backend/requirements.txt
```

> ⚠️ **Note on Python versions:** `requirements.txt` pins **exact tested versions** (e.g. `pydantic==2.13.4`) that have pre-built binary wheels for Python 3.10, 3.11, 3.12, and 3.13. No Rust or C compilation is needed. If installation fails for any reason, make sure your Python version is ≥ 3.10.

---

### Step 3 — Seed the Database

Run the seed script once to create the default test users in the SQLite database:

```powershell
.\backend\venv\Scripts\python.exe .\backend\seed.py
```

This creates two users:

| Username | Password | Role |
|---|---|---|
| `admin` | `password123` | admin |
| `testuser` | `password` | staff |

---

### Step 4 — Start the FastAPI Backend

> ⚠️ **Important:** You must `cd` into the `backend/` folder before running uvicorn, otherwise it cannot find `main.py`.

```powershell
cd backend
.\venv\Scripts\uvicorn.exe main:app --reload --port 8000
```

The API will be available at: **http://localhost:8000**  
Interactive docs (Swagger UI): **http://localhost:8000/docs**

---

### Step 5 — Start the Next.js Frontend

Open a **separate terminal** in the project root:

```bash
npm install    # only needed once
npm run dev
```

The app will be available at: **http://localhost:3000**

---

### ✅ Quick Verification

To confirm everything is working, run the Redis test script:

```powershell
.\backend\venv\Scripts\python.exe .\test_redis.py
```

This script tests Pub/Sub messaging and history list storage directly against Redis, independently of the web app.

---

## 1. Overview

This part of the project establishes the **real-time messaging layer** using Redis. It acts as the bridge between the Next.js frontend and the FastAPI backend, enabling instant, push-based notifications without any page refresh.

Redis handles **three primary responsibilities**:

| Responsibility | Redis Feature Used | Purpose |
|---|---|---|
| Real-time message delivery | **Pub/Sub** | Broadcast notifications to all connected clients instantly |
| Notification history / cache | **Lists** (`LPUSH`, `LTRIM`) | Store recent messages so late-joining users see past events |
| User session management | **Key-Value** (`SETEX`, `GET`, `DEL`) | Authenticate API requests without a SQL query on every call |

---

## 2. Architecture Diagram

```
[Next.js Frontend]
       │
       │  SSE (EventSource)          POST /notify
       │  GET /stream?channel=X  ←───────────────── [Logged-in User]
       ▼
[FastAPI Backend]
       │
       ├── PUBLISH  ──────────────────────────────► [Redis Pub/Sub]
       │                                                    │
       ├── LPUSH / LTRIM ────────────────────────► [Redis Lists]
       │                                                    │
       └── SETEX / GET / DEL ──────────────────► [Redis Key-Value]
```

When a user sends a notification:
1. FastAPI **publishes** it to a Redis channel.
2. All SSE streams **subscribed** to that channel receive it immediately.
3. The message is also **pushed to a Redis list** (history cache).
4. The session token is **validated against Redis** before the request is accepted.

---

## 3. Redis Data Structures & Key Design

### 3.1 Pub/Sub Channels

- **Key format:** `notifications:{channel}`
- **Available channels:** `system`, `alerts`, `chat`, `orders`, `tasks`
- **Used by:** `POST /notify` (publisher) and `GET /stream` (subscriber)

```python
# Example key: notifications:orders
redis_client.publish("notifications:orders", json.dumps(payload))
```

Each frontend tab that opens the Dashboard subscribes to one channel at a time and receives messages in real-time via Server-Sent Events (SSE).

---

### 3.2 Notification History (Redis LIST)

- **Key format:** `notifications:{channel}:history`
- **TTL:** 86,400 seconds (24 hours)
- **Max size:** 100 messages per channel (enforced by `LTRIM`)

When a notification is published, it is **simultaneously** stored in the history list using a Redis pipeline (atomic operation):

```python
pipe = redis_client.pipeline()
pipe.publish(channel_name, payload_str)   # Real-time delivery
pipe.lpush(history_key, payload_str)      # Add to front of history list
pipe.expire(history_key, 86400)           # Reset TTL to 24 hours
pipe.ltrim(history_key, 0, 99)            # Keep only the last 100 messages
pipe.execute()                            # Execute all 4 commands atomically
```

When a new user opens the Dashboard, `GET /history?channel=X` fetches this list so they immediately see recent messages — even ones sent before they connected.

---

### 3.3 User Sessions (Redis Key-Value)

- **Key format:** `session:{token}`
- **Value:** The `username` mapped to that token
- **TTL:** 86,400 seconds (24 hours)

```python
# On login: store session
redis_client.setex(f"session:{token}", 86400, username)

# On each authenticated request: validate session
username = redis_client.get(f"session:{token}")

# On logout: delete session immediately
redis_client.delete(f"session:{token}")
```

This means:
- Sessions **auto-expire** after 24 hours — users are logged out automatically.
- Logout is **instant** — the token is deleted from Redis immediately.
- The backend **never queries SQLite** to validate a session — Redis handles it in O(1).

---

## 4. Backend API Endpoints

All endpoints are defined in `backend/main.py` and use the Redis client from `backend/redis_client.py`.

| Method | Endpoint | Auth Required | Description |
|---|---|---|---|
| `POST` | `/login` | ❌ | Verifies credentials against SQLite, creates Redis session, returns token |
| `POST` | `/logout` | ✅ | Deletes the Redis session token |
| `POST` | `/signup` | ❌ | Creates a new user in SQLite |
| `POST` | `/notify` | ✅ | Publishes a notification to Redis Pub/Sub + history list |
| `GET` | `/stream?channel=X` | ❌ | SSE endpoint — streams live notifications from Redis subscription |
| `GET` | `/history?channel=X` | ❌ | Returns the last N notifications from the Redis history list |

---

## 5. Frontend Integration

### 5.1 Real-Time Stream (`NotificationStream.tsx`)

The `useNotificationStream` hook in `app/components/NotificationStream.tsx` manages the SSE connection:

1. **On mount:** Fetches the history from `GET /history` to populate existing messages.
2. **Connects** an `EventSource` to `GET /stream?channel={channel}`.
3. **On new message:** Parses the JSON and prepends it to the notification list.
4. **On channel switch:** Closes the old connection and opens a new one.
5. **Connection stability:** The hook debounces disconnect events — only shows "Déconnecté" after 2+ consecutive failures with a 4-second delay, since SSE auto-reconnects naturally.

### 5.2 Authentication (`AuthProvider.tsx`)

- Stores `token` and `username` in `sessionStorage` (per-tab — allows multiple accounts in different tabs).
- Exposes `login()`, `logout()`, `token`, `user`, and `isAuthenticated` to all components via React Context.
- The `ProtectedRoute` component wraps protected pages and redirects to `/login` if not authenticated.

### 5.3 Send Notification (`dashboard/send/page.tsx`)

The send form submits to `POST /notify` with:
- `Authorization: Bearer {token}` header (from `useAuth()` context)
- Body: `{ id, type, title, message, channel }`

> The `id` field is optional — the backend auto-generates a UUID if not provided.

---

## 6. Key Files Reference

| File | Role |
|---|---|
| `backend/redis_client.py` | All Redis logic: Pub/Sub, history lists, session management |
| `backend/main.py` | FastAPI app with all API routes |
| `backend/models.py` | Pydantic data models (`NotificationPayload`, `LoginRequest`, etc.) |
| `backend/seed.py` | Script to create default users in SQLite |
| `backend/requirements.txt` | Python dependencies (uses `>=` bounds for Python 3.10–3.13 compatibility) |
| `app/components/NotificationStream.tsx` | React hook for SSE real-time connection |
| `app/components/AuthProvider.tsx` | Auth context (login, logout, token management) |
| `app/components/ProtectedRoute.tsx` | Route guard — redirects unauthenticated users to `/login` |
| `app/dashboard/page.tsx` | Main dashboard with channel selector, notification feed, and logout |
| `app/dashboard/send/page.tsx` | Form to publish notifications via the API |
| `test_redis.py` | Standalone Redis verification script (Pub/Sub + Lists) |

---

## 7. Bugs Fixed During Implementation

| Bug | Root Cause | Fix Applied |
|---|---|---|
| `setState during render` on login page | `router.replace()` called directly in render | Moved redirect to `useEffect` |
| `Missing or invalid Authorization header` | Token header was commented out in send page | Wired `token` from `useAuth()` context |
| `SSE disconnecting every ~60s` | `sse-starlette` closes idle connections normally; `onerror` fired | Debounced disconnect: only shows after 2+ errors with 4s delay |
| `[object Object]` on send error | FastAPI validation errors return `detail` as array, not string | Added proper serialization for all FastAPI error shapes |
| `Unexpected token 'd'` in SSE parsing | `sse-starlette 3.x` adds `data:` prefix automatically; code added it manually (double prefix) | Removed manual `data:` prefix — yield raw JSON only |
| `Error loading ASGI app: Could not import module "main"` | `uvicorn` run from project root instead of `backend/` folder | Must `cd backend` before running uvicorn |
| `SSE stream not updating live without refresh` | `pubsub.listen()` is synchronous and blocked the FastAPI async event loop | Changed `subscribe_channel` to an `async def` generator using `get_message()` and `asyncio.sleep()` to yield control |
