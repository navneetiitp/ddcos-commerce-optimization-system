import random
from datetime import datetime

from app.database.connection import SessionLocal
from app.models.price_history_model import PriceHistory
from app.models.product_model import Product


# 🔥 Improved demand function (realistic + stable)
def generate_demand(price, stock):
    base_demand = 120

    # Reduced price sensitivity
    price_effect = 0.0008 * price

    # Stock effect
    stock_effect = max(0, (50 - stock) * 0.5)

    # Random variation
    noise = random.uniform(-5, 5)

    demand = base_demand - price_effect + stock_effect + noise

    return max(1, round(demand, 2))


# 🚀 MAIN SIMULATION
def run_simulation():
    db = SessionLocal()

    try:
        products = db.query(Product).all()

        if not products:
            print("⚠️ No products found for simulation")
            return {"status": "no products"}

        for product in products:
            price = product.price
            stock = product.stock

            # 🔥 Generate demand
            demand = generate_demand(price, stock)

            # 🔥 Save to DB
            entry = PriceHistory(
                product_id=product.id,
                price=float(price),
                demand=float(demand),
                timestamp=datetime.utcnow()
            )

            db.add(entry)

        db.commit()

        print("🔥 Simulation data inserted")

        return {"status": "simulation data inserted"}

    except Exception as e:
        print("❌ Simulation error:", e)
        return {"error": str(e)}

    finally:
        db.close()