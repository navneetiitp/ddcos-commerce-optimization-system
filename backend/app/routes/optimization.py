from fastapi import APIRouter, HTTPException
from pydantic import BaseModel, Field
from typing import List, Dict, Optional

from app.services.optimization_service import optimize_price

router = APIRouter()


# 🔥 Request Schema
class OptimizeRequest(BaseModel):
    product_id: int = Field(..., gt=0, description="Valid product ID")


# 🔥 Response Schema (handles ML + fallback modes)
class OptimizeResponse(BaseModel):
    mode: str

    product_id: Optional[int] = None
    old_price: Optional[float] = None

    optimal_price: float
    predicted_demand: float
    expected_revenue: float

    elasticity: Optional[float] = None
    simulation: Optional[List[Dict]] = None
    monte_carlo: Optional[Dict] = None


# 🚀 Optimize Endpoint
@router.post("/price", response_model=OptimizeResponse)
def optimize(data: OptimizeRequest):
    try:
        result = optimize_price(data.product_id)

        # 🔥 Error handling
        if not result or "error" in result:
            raise HTTPException(
                status_code=404,
                detail=result.get("error", "Optimization failed")
            )

        return result

    except HTTPException:
        raise

    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Internal error: {str(e)}"
        )