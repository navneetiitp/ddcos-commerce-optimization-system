from pydantic import BaseModel, Field
from datetime import datetime
from typing import Optional


class EventCreate(BaseModel):
    user_id: int = Field(..., gt=0)
    product_id: int = Field(..., gt=0)
    event_type: str = Field(..., pattern="^(view|cart|purchase)$")
    price: float = Field(..., ge=0)
    timestamp: Optional[datetime] = None


class EventResponse(BaseModel):
    id: int
    user_id: int
    product_id: int
    event_type: str
    price: float
    timestamp: datetime

    class Config:
        from_attributes = True