import os
import json
import redis
from datetime import datetime
from dotenv import load_dotenv

load_dotenv()

REDIS_URL = os.getenv("REDIS_URL", "redis://localhost:6379/0")

# Initialize Redis client
redis_client = redis.from_url(REDIS_URL, decode_responses=True)

# 24 hours in seconds
TTL_SECONDS = 86400

def get_channel_name(channel: str) -> str:
    return f"notifications:{channel}"

def get_history_key(channel: str) -> str:
    return f"notifications:{channel}:history"

def publish_notification(channel: str, payload: dict):
    if not payload.get("timestamp"):
        payload["timestamp"] = datetime.utcnow().isoformat() + "Z"
    
    payload_str = json.dumps(payload)
    channel_name = get_channel_name(channel)
    history_key = get_history_key(channel)
    
    pipe = redis_client.pipeline()
    pipe.publish(channel_name, payload_str)
    pipe.lpush(history_key, payload_str)
    pipe.expire(history_key, TTL_SECONDS)
    pipe.ltrim(history_key, 0, 99)
    pipe.execute()
    
    return payload

def get_history(channel: str, limit: int = 50):
    history_key = get_history_key(channel)
    messages = redis_client.lrange(history_key, 0, limit - 1)
    return [json.loads(msg) for msg in messages]

def subscribe_channel(channel: str):
    channel_name = get_channel_name(channel)
    pubsub = redis_client.pubsub()
    pubsub.subscribe(channel_name)
    
    try:
        for message in pubsub.listen():
            if message['type'] == 'message':
                yield f"data: {message['data']}\n\n"
    except Exception as e:
        print(f"SSE Connection Error: {e}")
    finally:
        pubsub.unsubscribe(channel_name)
        pubsub.close()

def create_session(token: str, username: str):
    """Store session token in Redis with TTL"""
    session_key = f"session:{token}"
    redis_client.setex(session_key, TTL_SECONDS, username)

def get_user_by_token(token: str):
    """Retrieve username from session token"""
    session_key = f"session:{token}"
    return redis_client.get(session_key)

def delete_session(token: str):
    """Delete session token from Redis"""
    session_key = f"session:{token}"
    redis_client.delete(session_key)

