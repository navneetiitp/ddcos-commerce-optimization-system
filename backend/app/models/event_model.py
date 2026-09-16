from sqlalchemy import Column, Integer, String, Float, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from datetime import datetime

from app.database.connection import Base


class Event(Base):
    __tablename__ = "events"

    # 🔥 Primary Key
    id = Column(Integer, primary_key=True, index=True)

    # 🔥 User tracking
    user_id = Column(Integer, nullable=False, index=True)

    # 🔥 Foreign Key (Product)
    product_id = Column(
        Integer,
        ForeignKey("products.id", ondelete="CASCADE"),
        nullable=False,
        index=True
    )

    # 🔥 Event type (controlled values)
    event_type = Column(String(20), nullable=False, index=True)

    # 🔥 Price snapshot at event time
    price = Column(Float, nullable=False)

    # 🔥 Timestamp (critical for analytics & time-series)
    timestamp = Column(DateTime, default=datetime.utcnow, index=True)

    # 🔥 Relationship
    product = relationship("Product", back_populates="events")