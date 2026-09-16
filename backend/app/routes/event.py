from fastapi import APIRouter, HTTPException, Query
from typing import List, Optional

from app.schemas.event_schema import EventCreate, EventResponse
from app.services.event_service import create_event, get_all_events

router = APIRouter()


# 🔥 Create Event
@router.post("/", response_model=EventResponse)
def add_event(event: EventCreate):
    try:
        return create_event(event)
    except Exception as e:
        raise HTTPException(
            status_code=400,
            detail=f"Failed to create event: {str(e)}"
        )


# 🔥 Get Events (with optional filters)
@router.get("/", response_model=List[EventResponse])
def list_events(
    event_type: Optional[str] = Query(None, description="Filter by event type"),
    product_id: Optional[int] = Query(None, description="Filter by product ID")
):
    try:
        events = get_all_events()

        # 🔥 Apply filters (simple but effective)
        if event_type:
            events = [e for e in events if e.event_type == event_type]

        if product_id:
            events = [e for e in events if e.product_id == product_id]

        return events

    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Error fetching events: {str(e)}"
        )