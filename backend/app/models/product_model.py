from sqlalchemy import Column, Integer, String, Float, DateTime
from sqlalchemy.orm import relationship
from datetime import datetime

from app.database.connection import Base


class Product(Base):
    __tablename__ = "products"

    # 🔥 Primary Key
    id = Column(Integer, primary_key=True, index=True)

    # 🔥 Core Fields
    name = Column(String(255), nullable=False, index=True)
    price = Column(Float, nullable=False)
    stock = Column(Integer, nullable=False, index=True)

    # 🔥 Timestamps (VERY IMPORTANT for real systems)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(
        DateTime,
        default=datetime.utcnow,
        onupdate=datetime.utcnow
    )

    # 🔥 Relationships
    events = relationship(
        "Event",
        back_populates="product",
        cascade="all, delete-orphan"
    )

    price_history = relationship(
        "PriceHistory",
        back_populates="product",
        cascade="all, delete-orphan"
    )