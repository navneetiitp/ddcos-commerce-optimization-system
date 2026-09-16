from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database.connection import get_db
from app.models.product_model import Product
from app.models.price_history_model import PriceHistory
from app.models.event_model import Event

router = APIRouter()


@router.get("/")
def get_dashboard(db: Session = Depends(get_db)):

    # Total products
    total_products = db.query(Product).count()

    # Price history
    history = db.query(PriceHistory).all()

    if not history:
        return {
            "stats": {
                "total_products": total_products,
                "total_sales": 0,
                "revenue": 0,
                "average_demand": 0,
                "average_price": 0,
                "total_events": 0,
                "top_product": "N/A"
            },
            "sales_over_time": [],
            "business_insights": []
        }

    # KPI calculations
    total_sales = sum(h.demand for h in history)
    revenue = sum(h.price * h.demand for h in history)

    average_demand = round(total_sales / len(history), 2)
    average_price = round(
        sum(h.price for h in history) / len(history),
        2
    )

    total_events = db.query(Event).count()

    # Top Product
    product_sales = {}

    for h in history:
        product_sales[h.product_id] = (
            product_sales.get(h.product_id, 0)
            + h.demand
        )

    top_product = "N/A"

    if product_sales:
        top_product_id = max(
            product_sales,
            key=product_sales.get
        )

        product = (
            db.query(Product)
            .filter(Product.id == top_product_id)
            .first()
        )

        if product:
            top_product = product.name

    # Revenue & Demand Trend
    recent = (
        db.query(PriceHistory)
        .order_by(PriceHistory.timestamp.desc())
        .limit(10)
        .all()
    )

    recent.reverse()

    sales_data = [
        {
            "date": f"T{i+1}",
            "sales": round(item.demand, 2),
            "revenue": round(item.price * item.demand, 2)
        }
        for i, item in enumerate(recent)
    ]

    # Dynamic Business Insights
    business_insights = [
        f"🏆 Top Selling Product: {top_product}",
        f"📈 Average Demand: {average_demand} units",
        f"💰 Total Revenue: ₹{revenue:,.2f}",
        f"📊 Total Events Processed: {total_events}",
    ]

    if average_demand > 100:
        business_insights.append(
            "💡 Recommendation: Demand is high. Consider a slight price increase."
        )
    elif average_demand > 50:
        business_insights.append(
            "💡 Recommendation: Demand is stable. Maintain current pricing."
        )
    else:
        business_insights.append(
            "💡 Recommendation: Demand is low. Consider promotional discounts."
        )

    low_stock = db.query(Product).filter(Product.stock < 20).count()

    if low_stock > 0:
        business_insights.append(
            f"⚠ Inventory Alert: {low_stock} product(s) have low stock."
        )
    else:
        business_insights.append(
            "✅ Inventory Status: All products have sufficient stock."
        )

    return {
        "stats": {
            "total_products": total_products,
            "total_sales": round(total_sales, 2),
            "revenue": round(revenue, 2),
            "average_demand": average_demand,
            "average_price": average_price,
            "total_events": total_events,
            "top_product": top_product,
        },
        "sales_over_time": sales_data,
        "business_insights": business_insights
    }