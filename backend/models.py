from pydantic import BaseModel, Field
from typing import Optional
from datetime import datetime
import uuid

class LoginRequest(BaseModel):
    username: str
    password: str

class SignupRequest(BaseModel):
    username: str
    password: str

class NotificationPayload(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    type: str  # e.g., 'info', 'warning', 'order', 'alert'
    title: Optional[str] = None
    message: str
    channel: str # e.g., 'alerts', 'chat', 'tasks', 'system'
    timestamp: Optional[str] = None
