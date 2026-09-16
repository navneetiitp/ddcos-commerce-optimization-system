"""Small dependency-light API smoke test. Run with: PYTHONPATH=. python smoke_test.py"""
from fastapi.testclient import TestClient
from main import app

client = TestClient(app)
assert client.get("/health").status_code == 200
assert client.get("/products/").status_code == 200
assert client.get("/dashboard/").status_code == 200
assert client.get("/analytics/").status_code == 200
assert client.get("/train/status").status_code == 200
products = client.get("/products/").json()
if products:
    assert client.post("/optimize/price", json={"product_id": products[0]["id"]}).status_code == 200
    pid = client.post("/products/", json={"name": "Smoke Test", "price": 999, "stock": 5}).json()["id"]
    assert client.put(f"/products/{pid}", json={"name": "Smoke Test Updated", "price": 1099, "stock": 4}).status_code == 200
    assert client.delete(f"/products/{pid}").status_code == 200
print("DDCOS smoke test passed")
