from pydantic import BaseModel, Field
from datetime import datetime
from typing import Optional


class PriceHistoryCreate(BaseModel):
    product_id: int = Field(..., gt=0)
    price: float = Field(..., ge=0)
    demand: float = Field(..., ge=0)   # 🔥 FIXED
    timestamp: Optional[datetime] = None


class PriceHistoryResponse(BaseModel):
    id: int
    product_id: int
    price: float
    demand: float
    timestamp: datetime

    class Config:
        from_attributes = True