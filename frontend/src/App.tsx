import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Layout from "./components/layout/Layout";
import Dashboard from "./pages/Dashboard";
import Inventory from "./pages/Inventory";
import Pricing from "./pages/Pricing";
import Analytics from "./pages/Analytics";

function NotFound() {
  return <div className="min-h-screen bg-gray-950 text-white grid place-items-center p-8"><div className="text-center"><p className="text-6xl font-black mb-4">404</p><p className="text-gray-400 mb-6">Page not found.</p><a className="bg-blue-600 px-5 py-3 rounded-lg" href="/">Back to dashboard</a></div></div>;
}

export default function App() {
  return <BrowserRouter><Routes><Route path="/" element={<Layout />}><Route index element={<Dashboard />} /><Route path="inventory" element={<Inventory />} /><Route path="pricing" element={<Pricing />} /><Route path="analytics" element={<Analytics />} /></Route><Route path="/404" element={<NotFound />} /><Route path="*" element={<Navigate to="/404" replace />} /></Routes></BrowserRouter>;
}
