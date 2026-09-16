"""Add sample customer events to a running DDCOS API."""
import os
import random
import requests

URL = os.getenv("DDCOS_API_URL", "http://127.0.0.1:8000").rstrip("/")
products = requests.get(f"{URL}/products/", timeout=10).json()
if not products:
    raise SystemExit("No products found. Run seed_demo.py first.")

for _ in range(50):
    product = random.choice(products)
    payload = {
        "user_id": random.randint(1, 80),
        "product_id": product["id"],
        "event_type": random.choices(["view", "cart", "purchase"], weights=[65, 25, 10])[0],
        "price": product["price"],
    }
    response = requests.post(f"{URL}/events/", json=payload, timeout=10)
    response.raise_for_status()
    print(response.json())
