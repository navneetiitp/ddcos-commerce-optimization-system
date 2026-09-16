from sqlalchemy import Column, Integer, Float, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from datetime import datetime

from app.database.connection import Base


class PriceHistory(Base):
    __tablename__ = "price_history"

    # 🔥 Primary Key
    id = Column(Integer, primary_key=True, index=True)

    # 🔥 Foreign Key (with cascade)
    product_id = Column(
        Integer,
        ForeignKey("products.id", ondelete="CASCADE"),
        nullable=False,
        index=True
    )

    # 🔥 Price at that time
    price = Column(Float, nullable=False)

    # 🔥 Demand observed
    demand = Column(Float, nullable=False)   # 🔥 changed to Float (important)

    # 🔥 Timestamp (time-series critical)
    timestamp = Column(DateTime, default=datetime.utcnow, index=True)

    # 🔥 Relationship (bidirectional)
    product = relationship(
        "Product",
        back_populates="price_history"
    )