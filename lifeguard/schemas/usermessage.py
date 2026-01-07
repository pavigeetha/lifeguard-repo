from pydantic import BaseModel
from datetime import datetime

class user_message(BaseModel):
    id: str
    type: str
    text: str
    timestamp: datetime
