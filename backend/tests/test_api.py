import os
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[1]))

TEST_DB = Path(__file__).resolve().parents[1] / "test_ddcos.db"
os.environ["DATABASE_URL"] = f"sqlite:///{TEST_DB}"
os.environ["CORS_ORIGINS"] = "http://localhost:5173"

from fastapi.testclient import TestClient
from app.database.connection import Base, engine
from main import app

Base.metadata.create_all(bind=engine)
client = TestClient(app)


def teardown_module():
    Base.metadata.drop_all(bind=engine)
    if TEST_DB.exists():
        TEST_DB.unlink()


def test_health():
    response = client.get("/health")
    assert response.status_code == 200
    assert response.json()["status"] == "healthy"


def test_product_crud():
    created = client.post("/products/", json={"name": "Test Product", "price": 100, "stock": 20})
    assert created.status_code == 201
    product_id = created.json()["id"]

    fetched = client.get(f"/products/{product_id}")
    assert fetched.status_code == 200

    updated = client.put(f"/products/{product_id}", json={"name": "Updated Product", "price": 120, "stock": 18})
    assert updated.status_code == 200
    assert updated.json()["name"] == "Updated Product"

    deleted = client.delete(f"/products/{product_id}")
    assert deleted.status_code == 200


def test_missing_product():
    response = client.get("/products/999999")
    assert response.status_code == 404
