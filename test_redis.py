import time
from backend.redis_client import publish_notification, get_history, redis_client, get_channel_name

def test_redis_flow():
    topic = "system"
    channel = get_channel_name(topic)
    
    print("Testing Redis Connection...")
    try:
        redis_client.ping()
        print("Successfully connected to Redis!")
    except Exception as e:
        print(f"Failed to connect to Redis: {e}")
        return
    
    # 1. Start a subscriber
    pubsub = redis_client.pubsub()
    pubsub.subscribe(channel)
    print(f"\nSubscribed to {channel}")
    
    # 2. Publish a message
    test_msg = {
        "id": "test-msg-123",
        "type": "info", 
        "message": "Hello Redis from Test Script!", 
        "channel": topic
    }
    publish_notification(topic, test_msg)
    print(f"\nPublished message to '{topic}': {test_msg}")
    
    # 3. Read real-time message from pubsub
    # First message is subscription confirmation
    pubsub.get_message() 
    
    # Read actual message
    message = None
    for _ in range(10):
        message = pubsub.get_message()
        if message and message['type'] == 'message':
            break
        time.sleep(0.1)
        
    if message:
        print(f"\nReal-time message received via Pub/Sub: {message['data']}")
    else:
        print("\nNo real-time message received.")
    
    # 4. Check history
    history = get_history(topic, limit=5)
    print(f"\nHistory for '{topic}':")
    for msg in history:
        print(f"  - {msg}")

if __name__ == "__main__":
    test_redis_flow()
