from fastapi import APIRouter, HTTPException, Query
from typing import Optional

from app.services.simulation_service import run_simulation

router = APIRouter()


# 🔥 Run simulation (manual trigger)
@router.post("/run")
def simulate():
    try:
        result = run_simulation()

        return {
            "status": "success",
            "message": "Simulation executed successfully",
            "details": result
        }

    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Simulation failed: {str(e)}"
        )


# 🔥 Run multiple simulation steps (VERY IMPRESSIVE)
@router.post("/run-multiple")
def simulate_multiple(
    steps: int = Query(5, ge=1, le=50, description="Number of simulation cycles")
):
    try:
        results = []

        for _ in range(steps):
            res = run_simulation()
            results.append(res)

        return {
            "status": "success",
            "steps": steps,
            "message": "Multiple simulation cycles completed"
        }

    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Simulation failed: {str(e)}"
        )