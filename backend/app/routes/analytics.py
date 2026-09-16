from fastapi import APIRouter, HTTPException, Query
from typing import List

from app.services.analytics_service import get_top_products
from app.database.connection import SessionLocal
from app.models.price_history_model import PriceHistory
from sqlalchemy.orm import Session
from fastapi import Depends

from app.database.connection import get_db
from app.models.product_model import Product
router = APIRouter()


# 🔥 Top Products
@router.get("/top-products")
def top_products(limit: int = Query(5, ge=1, le=20)):
    try:
        return get_top_products(limit)
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Error fetching top products: {str(e)}"
        )


# 🔥 Revenue Summary (VERY IMPORTANT KPI)
@router.get("/revenue-summary")
def revenue_summary():
    db = SessionLocal()

    try:
        data = db.query(PriceHistory).all()

        if not data:
            return {"message": "No data available"}

        total_revenue = sum(d.price * d.demand for d in data)
        avg_revenue = total_revenue / len(data)

        return {
            "total_revenue": round(total_revenue, 2),
            "avg_revenue": round(avg_revenue, 2),
            "records": len(data)
        }

    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Error calculating revenue: {str(e)}"
        )

    finally:
        db.close()


# 🔥 Demand Insights (ML-related)
@router.get("/demand-insights")
def demand_insights():
    db = SessionLocal()

    try:
        data = db.query(PriceHistory).all()

        if not data:
            return {"message": "No data available"}

        demands = [d.demand for d in data]

        return {
            "max_demand": max(demands),
            "min_demand": min(demands),
            "avg_demand": round(sum(demands) / len(demands), 2)
        }

    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Error calculating demand insights: {str(e)}"
        )

    finally:
        db.close()

    # 🔥 Complete Analytics Dashboard
@router.get("/")
def analytics_dashboard(db: Session = Depends(get_db)):

    history = db.query(PriceHistory).all()
    products = db.query(Product).all()

    if not history:
        return {
            "stats": {
                "revenue": 0,
                "sales": 0,
                "average_revenue": 0,
                "best_product": "N/A"
            },
            "revenue_chart": [],
            "sales_chart": [],
            "product_performance": [],
            "revenue_distribution": []
        }

    total_sales = sum(h.demand for h in history)
    total_revenue = sum(h.price * h.demand for h in history)

    average_revenue = (
        total_revenue / total_sales
        if total_sales
        else 0
    )

    recent = sorted(
        history,
        key=lambda x: x.timestamp
    )[-20:]

    revenue_chart = []
    sales_chart = []

    for i, h in enumerate(recent):
        revenue_chart.append({
            "date": f"T{i+1}",
            "revenue": round(h.price * h.demand, 2)
        })

        sales_chart.append({
            "date": f"T{i+1}",
            "sales": round(h.demand, 2)
        })

    product_performance = []
    revenue_distribution = []

    best_product = "N/A"
    highest_sales = -1

    for p in products:

        product_history = [
            h for h in history
            if h.product_id == p.id
        ]

        sales = sum(h.demand for h in product_history)
        revenue = sum(h.price * h.demand for h in product_history)

        if sales > highest_sales:
            highest_sales = sales
            best_product = p.name

        product_performance.append({
            "product": p.name,
            "sales": round(sales, 2),
            "revenue": round(revenue, 2),
            "demand": round(sales, 2)
        })

        revenue_distribution.append({
            "product": p.name,
            "revenue": round(revenue, 2)
        })

    return {
        "stats": {
            "revenue": round(total_revenue, 2),
            "sales": round(total_sales, 2),
            "average_revenue": round(average_revenue, 2),
            "best_product": best_product
        },
        "revenue_chart": revenue_chart,
        "sales_chart": sales_chart,
        "product_performance": product_performance,
        "revenue_distribution": revenue_distribution
    }