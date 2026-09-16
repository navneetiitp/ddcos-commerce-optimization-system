import axios from "axios";

const API_BASE_URL = (import.meta.env.VITE_API_URL || "http://127.0.0.1:8000").replace(/\/$/, "");

const API = axios.create({ baseURL: API_BASE_URL, timeout: 15000 });

export interface DashboardData {
  stats: {
    total_products: number;
    total_sales: number;
    revenue: number;
    average_demand: number;
    average_price: number;
    total_events: number;
    top_product: string;
  };
  sales_over_time: { date: string; sales: number; revenue: number }[];
  business_insights: string[];
}

export interface AnalyticsData {
  stats: { revenue: number; sales: number; average_revenue: number; best_product: string };
  revenue_chart: { date: string; revenue: number }[];
  sales_chart: { date: string; sales: number }[];
  product_performance: { product: string; sales: number; revenue: number; demand: number }[];
  revenue_distribution: { product: string; revenue: number }[];
}

export interface OptimizationResult {
  mode: string;
  product_id: number;
  old_price: number | null;
  optimal_price: number;
  predicted_demand: number;
  expected_revenue: number;
  elasticity: number | null;
  simulation: { price: number; demand: number; revenue: number }[];
  monte_carlo: { avg_revenue: number; risk: number; p10_revenue: number; p90_revenue: number } | null;
}

export const getDashboard = async (): Promise<DashboardData> => (await API.get("/dashboard/")).data;
export const getTopProducts = async () => (await API.get("/analytics/top-products?limit=5")).data;
export const getProducts = async () => (await API.get("/products/")).data;
export const optimizePrice = async (product_id: number): Promise<OptimizationResult> => (await API.post("/optimize/price", { product_id })).data;
export const getAnalytics = async (): Promise<AnalyticsData> => (await API.get("/analytics/")).data;
export const getHealth = async () => (await API.get("/health")).data;
export const runSimulation = async (steps = 1) => (await API.post(steps === 1 ? "/simulation/run" : `/simulation/run-multiple?steps=${steps}`)).data;
export const trainModel = async () => (await API.post("/train/")).data;

export default API;
