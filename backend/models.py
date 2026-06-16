from pydantic import BaseModel
from typing import Optional
from datetime import datetime

class LoginRequest(BaseModel):
    username: str
    password: str

class SignupRequest(BaseModel):
    username: str
    password: str

class NotificationPayload(BaseModel):
    id: str
    type: str  # e.g., 'info', 'warning', 'order', 'alert'
    message: str
    channel: str # e.g., 'alerts', 'chat', 'tasks', 'system'
    timestamp: Optional[str] = None
