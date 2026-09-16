from fastapi import APIRouter, HTTPException, Query
from typing import List, Optional

from app.schemas.price_history_schema import (
    PriceHistoryCreate,
    PriceHistoryResponse
)
from app.services.price_history_service import (
    create_price_history,
    get_all_price_history
)

router = APIRouter()


# 🔥 Add Data Point (ML training data)
@router.post("/", response_model=PriceHistoryResponse)
def add_price_history(data: PriceHistoryCreate):
    try:
        return create_price_history(data)
    except Exception as e:
        raise HTTPException(
            status_code=400,
            detail=f"Failed to insert data: {str(e)}"
        )


# 🔥 Get Data (with filters)
@router.get("/", response_model=List[PriceHistoryResponse])
def list_price_history(
    product_id: Optional[int] = Query(None, description="Filter by product"),
    limit: int = Query(50, description="Limit number of records")
):
    try:
        data = get_all_price_history()

        # 🔥 Filter by product
        if product_id:
            data = [d for d in data if d.product_id == product_id]

        # 🔥 Limit results (important for performance)
        data = data[-limit:]

        return data

    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Error fetching price history: {str(e)}"
        )


# 🔥 Quick stats (VERY USEFUL FOR ML DEBUG)
@router.get("/stats")
def get_stats():
    try:
        data = get_all_price_history()

        if not data:
            return {"message": "No data available"}

        prices = [d.price for d in data]
        demand = [d.demand for d in data]

        return {
            "total_records": len(data),
            "price_range": [min(prices), max(prices)],
            "demand_range": [min(demand), max(demand),
            ],
            "avg_price": round(sum(prices) / len(prices), 2),
            "avg_demand": round(sum(demand) / len(demand), 2)
        }

    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Error calculating stats: {str(e)}"
        )