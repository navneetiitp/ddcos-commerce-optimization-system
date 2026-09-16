"""Create a realistic local demo dataset for DDCOS."""
from datetime import datetime, timedelta, timezone
import random
from app.database.connection import Base, SessionLocal, engine
from app.models.product_model import Product
from app.models.event_model import Event
from app.models.price_history_model import PriceHistory
from app.services.train_service import train_model

Base.metadata.create_all(bind=engine)
rng = random.Random(42)
db = SessionLocal()
try:
    if db.query(Product).count() == 0:
        products = [
            Product(name="MacBook Air M3", price=109999, stock=24),
            Product(name="iPhone 15", price=69999, stock=48),
            Product(name="Sony WH-1000XM5", price=29999, stock=15),
            Product(name="Samsung Galaxy S24", price=74999, stock=32),
            Product(name="Dell XPS 13", price=119999, stock=8),
            Product(name="iPad Air", price=59999, stock=27),
        ]
        db.add_all(products)
        db.commit()
    products = db.query(Product).all()
    if db.query(PriceHistory).count() < 10:
        now = datetime.now(timezone.utc).replace(tzinfo=None)
        for day in range(45, 0, -1):
            for p in products:
                price = p.price * (1 + rng.uniform(-0.20, 0.20))
                demand = max(5, 190 - price * 0.00095 + (35 - p.stock) * 0.25 + rng.uniform(-5, 5))
                db.add(PriceHistory(product_id=p.id, price=round(price, 2), demand=round(demand, 2), timestamp=now - timedelta(days=day)))
        for i in range(120):
            p = rng.choice(products)
            event_type = rng.choices(["view", "cart", "purchase"], weights=[65, 25, 10])[0]
            db.add(Event(user_id=rng.randint(1, 80), product_id=p.id, event_type=event_type, price=p.price, timestamp=now - timedelta(hours=rng.randint(1, 1080))))
        db.commit()
finally:
    db.close()

result = train_model()
print(result)
