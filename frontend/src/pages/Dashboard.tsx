import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { getDashboard, getHealth, getTopProducts, runSimulation, trainModel, type DashboardData } from "../services/api";

type TopProduct = { product_id: number; product_name: string; total_sales: number };
const emptyData: DashboardData = { stats: { total_products: 0, total_sales: 0, revenue: 0, average_demand: 0, average_price: 0, total_events: 0, top_product: "N/A" }, sales_over_time: [], business_insights: [] };

export default function Dashboard() {
  const [data, setData] = useState<DashboardData>(emptyData);
  const [topProducts, setTopProducts] = useState<TopProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState("");
  const [system, setSystem] = useState<{ status: string; db: boolean } | null>(null);
  const [lastUpdated, setLastUpdated] = useState("");

  const load = useCallback(async (showLoader = false) => {
    if (showLoader) setLoading(true);
    try {
      const [dashboard, top, health] = await Promise.all([getDashboard(), getTopProducts(), getHealth()]);
      setData(dashboard);
      setTopProducts(Array.isArray(top) ? top : []);
      setSystem(health);
      setLastUpdated(new Date().toLocaleTimeString());
    } catch (error) {
      console.error("Dashboard error:", error);
      setSystem({ status: "offline", db: false });
    } finally { setLoading(false); }
  }, []);

  useEffect(() => { void load(true); const id = window.setInterval(() => void load(), 30000); return () => window.clearInterval(id); }, [load]);

  const action = async (type: "simulation" | "training") => {
    setBusy(type);
    try { if (type === "simulation") await runSimulation(); else await trainModel(); await load(); }
    catch (error) { console.error(`${type} failed`, error); }
    finally { setBusy(""); }
  };

  return <div className="p-4 pt-24 md:p-8 md:pt-8">
    <div className="mb-8 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
      <div><div className="flex items-center gap-2"><span className={`h-2.5 w-2.5 rounded-full ${system?.db ? "bg-emerald-400" : "bg-red-400"}`} /><span className="text-xs font-semibold uppercase tracking-wider text-gray-400">System {system?.status ?? "checking"}</span></div><h1 className="mt-2 text-3xl font-black tracking-tight md:text-4xl">DDCOS Dashboard</h1><p className="mt-1 text-gray-400">Data-Driven Commerce Optimization System</p><p className="mt-2 text-xs text-gray-500">Last synchronized: {lastUpdated || "Loading..."}</p></div>
      <div className="flex flex-wrap gap-2"><button onClick={() => void action("simulation")} disabled={!!busy} className="rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold hover:bg-blue-500">{busy === "simulation" ? "Running…" : "Run Simulation"}</button><button onClick={() => void action("training")} disabled={!!busy} className="rounded-lg border border-gray-700 bg-gray-900 px-4 py-2.5 text-sm font-semibold hover:bg-gray-800">{busy === "training" ? "Training…" : "Train ML Model"}</button><Link to="/pricing" className="rounded-lg border border-gray-700 px-4 py-2.5 text-sm font-semibold hover:bg-gray-800">Optimize Pricing</Link></div>
    </div>

    {loading ? <div className="rounded-xl border border-gray-800 bg-gray-900 p-10 text-center text-gray-400">Loading business intelligence…</div> : <>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-5">
        {[['Products', data.stats.total_products], ['Sales', data.stats.total_sales], ['Revenue', `₹${Number(data.stats.revenue).toLocaleString("en-IN", { maximumFractionDigits: 0 })}`], ['Avg Demand', data.stats.average_demand], ['Avg Price', `₹${Number(data.stats.average_price).toLocaleString("en-IN", { maximumFractionDigits: 0 })}`]].map(([label, value]) => <div key={String(label)} className="rounded-xl border border-gray-800 bg-gray-900 p-5 shadow-lg"><p className="text-xs font-medium uppercase tracking-wide text-gray-500">{label}</p><p className="mt-2 truncate text-2xl font-black">{value}</p></div>)}
      </div>

      <div className="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-3"><div className="rounded-xl border border-gray-800 bg-gray-900 p-5"><p className="text-xs uppercase tracking-wide text-gray-500">Top Product</p><p className="mt-2 text-lg font-bold">{data.stats.top_product}</p></div><div className="rounded-xl border border-gray-800 bg-gray-900 p-5"><p className="text-xs uppercase tracking-wide text-gray-500">Events Processed</p><p className="mt-2 text-lg font-bold">{data.stats.total_events.toLocaleString("en-IN")}</p></div><div className="rounded-xl border border-gray-800 bg-gray-900 p-5"><p className="text-xs uppercase tracking-wide text-gray-500">Database</p><p className={`mt-2 text-lg font-bold ${system?.db ? "text-emerald-400" : "text-red-400"}`}>{system?.db ? "Connected" : "Unavailable"}</p></div></div>

      <div className="mt-6 rounded-xl border border-gray-800 bg-gray-900 p-5 shadow-lg"><div className="mb-5 flex items-center justify-between"><div><h2 className="text-lg font-bold">Revenue & Demand Trend</h2><p className="text-sm text-gray-500">Latest observed pricing intervals</p></div><Link to="/analytics" className="text-sm text-blue-400 hover:text-blue-300">Open analytics →</Link></div>{data.sales_over_time.length ? <ResponsiveContainer width="100%" height={330}><LineChart data={data.sales_over_time}><CartesianGrid stroke="#1f2937" /><XAxis dataKey="date" stroke="#6b7280" /><YAxis stroke="#6b7280" /><Tooltip contentStyle={{ background: "#111827", border: "1px solid #374151", borderRadius: 8 }} /><Line type="monotone" dataKey="revenue" stroke="#60a5fa" strokeWidth={3} dot={false} name="Revenue" /><Line type="monotone" dataKey="sales" stroke="#34d399" strokeWidth={2} dot={false} name="Demand" /></LineChart></ResponsiveContainer> : <div className="grid h-[330px] place-items-center text-gray-500">No history yet. Run a simulation to generate data.</div>}</div>

      <div className="mt-6 grid grid-cols-1 gap-6 xl:grid-cols-2"><div className="rounded-xl border border-gray-800 bg-gray-900 p-5"><h2 className="mb-4 text-lg font-bold">Top Products</h2>{topProducts.length ? <div className="space-y-3">{topProducts.map((p, i) => <div key={p.product_id} className="flex items-center justify-between rounded-lg bg-gray-950 p-3"><span><span className="mr-3 text-gray-500">#{i + 1}</span><span className="font-medium">{p.product_name}</span></span><span className="font-semibold text-emerald-400">{p.total_sales}</span></div>)}</div> : <p className="text-gray-500">No purchase events yet.</p>}</div><div className="rounded-xl border border-gray-800 bg-gray-900 p-5"><h2 className="mb-4 text-lg font-bold">Business Insights</h2><ul className="space-y-3">{data.business_insights.map((item) => <li key={item} className="rounded-lg border border-gray-800 bg-gray-950 p-3 text-sm text-gray-300">{item}</li>)}</ul></div></div>
    </>}
  </div>;
}
