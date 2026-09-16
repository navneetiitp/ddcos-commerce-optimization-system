from app.database.connection import SessionLocal
from app.models.event_model import Event
from datetime import datetime


# 🔥 Allowed event types (IMPORTANT)
VALID_EVENT_TYPES = {"view", "cart", "purchase"}


# 🔥 Create Event
def create_event(event):
    db = SessionLocal()

    try:
        # 🔴 Validation
        if event.event_type not in VALID_EVENT_TYPES:
            raise ValueError("Invalid event_type")

        if event.price < 0:
            raise ValueError("Price must be non-negative")

        db_event = Event(
            user_id=event.user_id,
            product_id=event.product_id,
            event_type=event.event_type,
            price=event.price,
            timestamp=event.timestamp if event.timestamp else datetime.utcnow()
        )

        db.add(db_event)
        db.commit()
        db.refresh(db_event)

        return db_event

    except Exception as e:
        db.rollback()
        raise e

    finally:
        db.close()


# 🔥 Get All Events
def get_all_events():
    db = SessionLocal()

    try:
        return db.query(Event).all()

    finally:
        db.close()


# 🔥 Get Events by Product (analytics support)
def get_events_by_product(product_id: int):
    db = SessionLocal()

    try:
        return db.query(Event).filter(Event.product_id == product_id).all()

    finally:
        db.close()