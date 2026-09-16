from app.database.connection import SessionLocal
from app.models.event_model import Event
from app.models.product_model import Product
from sqlalchemy import func


# 🔥 Top products (by sales count)
def get_top_products(limit: int = 5):
    db = SessionLocal()

    try:
        result = (
            db.query(
                Product.id.label("product_id"),
                Product.name.label("product_name"),
                func.count(Event.id).label("total_sales")
            )
            .join(Event, Event.product_id == Product.id)
            .filter(Event.event_type == "purchase")
            .group_by(Product.id, Product.name)
            .order_by(func.count(Event.id).desc())
            .limit(limit)
            .all()
        )

        return [
            {
                "product_id": r.product_id,
                "product_name": r.product_name,
                "total_sales": r.total_sales
            }
            for r in result
        ]

    finally:
        db.close()


# 🔥 Top products by revenue (VERY IMPORTANT)
def get_top_products_by_revenue(limit: int = 5):
    db = SessionLocal()

    try:
        result = (
            db.query(
                Product.id.label("product_id"),
                Product.name.label("product_name"),
                func.sum(Event.price).label("total_revenue")
            )
            .join(Event, Event.product_id == Product.id)
            .filter(Event.event_type == "purchase")
            .group_by(Product.id, Product.name)
            .order_by(func.sum(Event.price).desc())
            .limit(limit)
            .all()
        )

        return [
            {
                "product_id": r.product_id,
                "product_name": r.product_name,
                "total_revenue": round(r.total_revenue, 2)
            }
            for r in result
        ]

    finally:
        db.close()