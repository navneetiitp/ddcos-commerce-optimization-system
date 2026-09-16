# DDCOS — Data-Driven Commerce Optimization System

DDCOS is a full-stack commerce intelligence application that combines inventory management, event analytics, demand modeling and ML-assisted price optimization in one dashboard.

## What it does

- **Dashboard:** KPIs, revenue/demand trends, top products and business insights.
- **Inventory:** Create, edit, search, filter, sort and delete products.
- **Pricing:** Run ML price optimization, inspect predicted demand/revenue, elasticity, candidate-price simulation and Monte Carlo risk.
- **Analytics:** Revenue, sales, product performance and revenue distribution.
- **Simulation:** Generate realistic observed price/demand history on demand.
- **Model training:** Train a separate demand model for each product from historical observations.
- **API:** FastAPI + SQLAlchemy with Swagger documentation and health checks.

## Architecture

```text
React + TypeScript + Tailwind + Recharts
                 │
                 │ REST / JSON
                 ▼
        FastAPI application
                 │
       ┌─────────┴─────────┐
       ▼                   ▼
   SQLAlchemy          ML service
       │                   │
 SQLite / PostgreSQL   scikit-learn
```

## Local setup

### 1. Backend

```bash
cd backend
python -m venv .venv
# Windows: .venv\\Scripts\\activate
# macOS/Linux: source .venv/bin/activate
pip install -r requirements.txt
copy .env.example .env   # Windows
# cp .env.example .env   # macOS/Linux
python seed_demo.py
uvicorn main:app --reload
```

API: `http://127.0.0.1:8000`  
Swagger: `http://127.0.0.1:8000/docs`  
Health: `http://127.0.0.1:8000/health`

### 2. Frontend

```bash
cd frontend
npm install
copy .env.example .env   # Windows
# cp .env.example .env   # macOS/Linux
npm run dev
```

Open the Vite URL shown in the terminal, normally `http://localhost:5173`.

## Environment variables

### Backend `.env`

```env
DATABASE_URL=sqlite:///./ddcos.db
CORS_ORIGINS=http://localhost:5173,http://127.0.0.1:5173
SQL_ECHO=false
```

For production, replace `DATABASE_URL` with a PostgreSQL/Neon connection string and set `CORS_ORIGINS` to the deployed frontend URL.

### Frontend `.env`

```env
VITE_API_URL=http://127.0.0.1:8000
```

## ML approach

The training pipeline groups observations by product and trains a product-specific **Linear Regression** demand model using historical price → demand observations. Training returns R², MSE and RMSE metrics. The optimizer evaluates a dense price grid around the current price and selects the price with the highest predicted revenue.

The optimizer also provides:

- price-demand simulation
- demand elasticity
- Monte Carlo revenue uncertainty
- P10/P90 revenue estimates

Predicted optimization results are deliberately **not** written back as observed training data. This prevents prediction leakage into the historical dataset.

## API overview

| Method | Endpoint | Purpose |
|---|---|---|
| GET | `/health` | Service/database health |
| GET/POST | `/products/` | List/create products |
| GET/PUT/DELETE | `/products/{id}` | Read/update/delete product |
| PUT | `/products/{id}/price` | Update only price |
| GET/POST | `/events/` | Customer events |
| GET | `/dashboard/` | Dashboard KPIs and trends |
| GET | `/analytics/` | Full analytics payload |
| POST | `/optimize/price` | ML price optimization |
| GET/POST | `/price-history/` | Historical observations |
| POST | `/simulation/run` | One simulation cycle |
| POST | `/simulation/run-multiple` | Multiple cycles |
| POST | `/train/` | Train models |
| GET | `/train/status` | Model status |

## Deployment

### Backend — Render

The repository includes `render.yaml`. Configure `DATABASE_URL` and `CORS_ORIGINS` in Render. Use the backend directory as the service root.

### Frontend — Vercel

The repository includes `frontend/vercel.json` for React Router history fallback. Set `VITE_API_URL` to the deployed backend URL before building.

## Smoke test

After installing backend dependencies and starting from `backend`:

```bash
PYTHONPATH=. python smoke_test.py
```

## Project structure

```text
ddcos-commerce-optimization-system/
├── backend/
│   ├── app/
│   │   ├── database/
│   │   ├── ml/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── schemas/
│   │   └── services/
│   ├── main.py
│   ├── seed_demo.py
│   ├── smoke_test.py
│   └── requirements.txt
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   └── services/
│   ├── package.json
│   └── vercel.json
└── render.yaml
```

## Notes

- SQLite is the zero-configuration local default.
- PostgreSQL is supported for deployment.
- No database password is hardcoded in the application.
- Automatic database-writing background simulation is disabled; simulation is explicit so data does not grow unexpectedly.
