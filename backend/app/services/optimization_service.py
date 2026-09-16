from pathlib import Path
import joblib
import numpy as np
from app.database.connection import SessionLocal
from app.models.product_model import Product
from app.models.price_history_model import PriceHistory
from app.models.event_model import Event

MODEL_PATH = Path(__file__).resolve().parents[2] / "model.pkl"


def load_model(product_id=None):
    if not MODEL_PATH.exists():
        return None
    try:
        artifact = joblib.load(MODEL_PATH)
        if isinstance(artifact, dict) and "models" in artifact:
            return artifact["models"].get(int(product_id))
        return artifact
    except Exception:
        return None


def calculate_elasticity(model, price):
    if price <= 0:
        return 0.0
    delta = max(price * 0.01, 0.01)
    d1 = max(float(model.predict([[price]])[0]), 0.0)
    d2 = max(float(model.predict([[price + delta]])[0]), 0.0)
    if d1 <= 0:
        return 0.0
    return float(((d2 - d1) / d1) / (delta / price))


def simulate_prices(model, base_price):
    factors = np.linspace(0.7, 1.3, 31)
    prices = base_price * factors
    demands = np.maximum(model.predict(prices.reshape(-1, 1)), 0)
    revenues = prices * demands
    return [{"price": round(float(p), 2), "demand": round(float(d), 2), "revenue": round(float(r), 2)} for p, d, r in zip(prices, demands, revenues)]


def monte_carlo(model, price, n=500):
    base_demand = max(float(model.predict([[price]])[0]), 0.0)
    if base_demand <= 0:
        return {"avg_revenue": 0.0, "risk": 0.0, "p10_revenue": 0.0, "p90_revenue": 0.0}
    rng = np.random.default_rng(42)
    samples = np.maximum(0, base_demand + rng.normal(0, max(base_demand * 0.1, 0.01), size=n))
    revenues = price * samples
    return {
        "avg_revenue": round(float(np.mean(revenues)), 2),
        "risk": round(float(np.std(revenues)), 2),
        "p10_revenue": round(float(np.percentile(revenues, 10)), 2),
        "p90_revenue": round(float(np.percentile(revenues, 90)), 2),
    }


def fallback_from_data(db, product_id):
    data = db.query(PriceHistory).filter(PriceHistory.product_id == product_id).all()
    if not data:
        return None
    best = max(data, key=lambda x: x.price * x.demand)
    return {
        "mode": "data",
        "product_id": product_id,
        "old_price": None,
        "optimal_price": round(float(best.price), 2),
        "expected_revenue": round(float(best.price * best.demand), 2),
        "predicted_demand": round(float(best.demand), 2),
        "elasticity": None,
        "simulation": [],
        "monte_carlo": None,
    }


def optimize_price(product_id: int):
    db = SessionLocal()
    try:
        product = db.query(Product).filter(Product.id == product_id).first()
        if not product:
            return {"error": "Product not found"}

        base_price = float(product.price)
        model = load_model(product_id)
        if model is None:
            return fallback_from_data(db, product_id) or {"error": "Model not trained and no historical data"}

        price_range = np.linspace(max(0.01, base_price * 0.7), max(0.02, base_price * 1.3), 301)
        demands = np.maximum(model.predict(price_range.reshape(-1, 1)), 0)
        revenues = price_range * demands
        idx = int(np.argmax(revenues))
        best_price = float(price_range[idx])
        best_demand = float(demands[idx])
        best_revenue = float(revenues[idx])

        # Optimization is a prediction, not an observed transaction; do not pollute training history.
        return {
            "mode": "ml",
            "product_id": product_id,
            "old_price": base_price,
            "optimal_price": round(best_price, 2),
            "predicted_demand": round(best_demand, 2),
            "expected_revenue": round(best_revenue, 2),
            "elasticity": round(calculate_elasticity(model, best_price), 3),
            "simulation": simulate_prices(model, base_price),
            "monte_carlo": monte_carlo(model, best_price),
        }
    except Exception as e:
        return {"error": str(e)}
    finally:
        db.close()
