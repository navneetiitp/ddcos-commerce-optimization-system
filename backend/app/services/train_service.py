from datetime import datetime, timezone
from pathlib import Path
import joblib
import numpy as np
from sklearn.linear_model import LinearRegression
from sklearn.metrics import mean_squared_error, r2_score
from sklearn.model_selection import train_test_split
from app.database.connection import SessionLocal
from app.models.price_history_model import PriceHistory
from app.models.product_model import Product
from app.models.event_model import Event

MODEL_PATH = Path(__file__).resolve().parents[2] / "model.pkl"


def train_model():
    db = SessionLocal()
    try:
        records = db.query(PriceHistory).order_by(PriceHistory.timestamp.asc()).all()
        if len(records) < 10:
            return {"status": "error", "message": "Not enough data (minimum 10 records required)"}

        grouped = {}
        for record in records:
            grouped.setdefault(record.product_id, []).append(record)

        models = {}
        metrics = []
        for product_id, rows in grouped.items():
            if len(rows) < 8:
                continue
            X = np.array([float(r.price) for r in rows]).reshape(-1, 1)
            y = np.array([float(r.demand) for r in rows])
            X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
            model = LinearRegression()
            model.fit(X_train, y_train)
            train_pred = model.predict(X_train)
            test_pred = model.predict(X_test)
            mse = mean_squared_error(y_test, test_pred)
            models[int(product_id)] = model
            metrics.append((r2_score(y_train, train_pred), r2_score(y_test, test_pred), mse, len(rows)))

        if not models:
            return {"status": "error", "message": "No product has enough history to train a model"}

        MODEL_PATH.parent.mkdir(parents=True, exist_ok=True)
        joblib.dump({"models": models, "trained_at": datetime.now(timezone.utc).isoformat()}, MODEL_PATH)
        avg_train = float(np.mean([m[0] for m in metrics]))
        avg_test = float(np.mean([m[1] for m in metrics]))
        avg_mse = float(np.mean([m[2] for m in metrics]))
        return {
            "status": "success",
            "message": "Product-specific pricing models trained successfully",
            "samples_used": len(records),
            "models_trained": len(models),
            "model_type": "Product-specific Linear Regression",
            "metrics": {"avg_r2_train": round(avg_train, 4), "avg_r2_test": round(avg_test, 4), "avg_mse": round(avg_mse, 2), "avg_rmse": round(float(np.sqrt(avg_mse)), 2)},
        }
    except Exception as e:
        return {"status": "error", "message": str(e)}
    finally:
        db.close()
