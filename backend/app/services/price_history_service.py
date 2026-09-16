from app.database.connection import SessionLocal
from app.models.price_history_model import PriceHistory
from datetime import datetime


# 🔥 Create data point (ML training data)
def create_price_history(data):
    db = SessionLocal()

    try:
        # 🔴 Validation
        if data.price < 0 or data.demand < 0:
            raise ValueError("Price and demand must be non-negative")

        obj = PriceHistory(
            product_id=data.product_id,
            price=float(data.price),
            demand=float(data.demand),
            timestamp=datetime.utcnow()
        )

        db.add(obj)
        db.commit()
        db.refresh(obj)

        return obj

    except Exception as e:
        db.rollback()
        raise e

    finally:
        db.close()


# 🔥 Get all data
def get_all_price_history():
    db = SessionLocal()

    try:
        return db.query(PriceHistory).all()

    finally:
        db.close()


# 🔥 Get data by product (ML-specific)
def get_price_history_by_product(product_id: int):
    db = SessionLocal()

    try:
        return (
            db.query(PriceHistory)
            .filter(PriceHistory.product_id == product_id)
            .all()
        )

    finally:
        db.close()


# 🔥 Get latest records (IMPORTANT for dashboard)
def get_latest_records(limit: int = 50):
    db = SessionLocal()

    try:
        return (
            db.query(PriceHistory)
            .order_by(PriceHistory.timestamp.desc())
            .limit(limit)
            .all()
        )

    finally:
        db.close()