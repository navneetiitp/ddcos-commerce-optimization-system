from datetime import datetime
from pathlib import Path
from fastapi import APIRouter, HTTPException
from app.services.train_service import train_model, MODEL_PATH

router = APIRouter()

@router.post("/", summary="Train pricing model from database")
def train():
    result = train_model()
    if result.get("status") == "error":
        raise HTTPException(status_code=400, detail=result.get("message", "Training failed"))
    return result

@router.get("/status", summary="Check model status")
def model_status():
    if not MODEL_PATH.exists():
        return {"status": "not_trained", "last_trained": None}
    return {"status": "ready", "last_trained": datetime.fromtimestamp(MODEL_PATH.stat().st_mtime).isoformat()}

@router.post("/retrain", summary="Force retrain model")
def retrain():
    return train()
