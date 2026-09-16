import os
from contextlib import asynccontextmanager
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.database.connection import Base, engine, check_db_connection
from app.models import product_model, event_model, price_history_model
from app.routes import product, event, analytics, optimization, price_history_route, train, simulation
from app.routes.dashboard import router as dashboard_router

Base.metadata.create_all(bind=engine)

@asynccontextmanager
async def lifespan(app: FastAPI):
    yield

app = FastAPI(title="DDCOS Backend API", version="3.0.0", description="Data-Driven Commerce Optimization System")

origins = [x.strip() for x in os.getenv("CORS_ORIGINS", "http://localhost:5173,http://127.0.0.1:5173").split(",") if x.strip()]
app.add_middleware(CORSMiddleware, allow_origins=origins, allow_credentials=True, allow_methods=["*"], allow_headers=["*"])

app.include_router(product.router, prefix="/products", tags=["Products"])
app.include_router(event.router, prefix="/events", tags=["Events"])
app.include_router(analytics.router, prefix="/analytics", tags=["Analytics"])
app.include_router(optimization.router, prefix="/optimize", tags=["Optimization"])
app.include_router(dashboard_router, prefix="/dashboard", tags=["Dashboard"])
app.include_router(price_history_route.router, prefix="/price-history", tags=["Price History"])
app.include_router(train.router, prefix="/train", tags=["Training"])
app.include_router(simulation.router, prefix="/simulation", tags=["Simulation"])

@app.get("/health", tags=["System"])
def health_check():
    db_ok = check_db_connection()
    return {"status": "healthy" if db_ok else "degraded", "db": db_ok, "service": "DDCOS Backend", "version": app.version}

@app.get("/", tags=["System"])
def root():
    return {"message": "DDCOS Backend Running", "version": app.version, "docs": "/docs", "health": "/health"}
