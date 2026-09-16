import { NavLink } from "react-router-dom";

const links = [
  ["/", "📊", "Dashboard"],
  ["/inventory", "📦", "Inventory"],
  ["/pricing", "💰", "Pricing"],
  ["/analytics", "📈", "Analytics"],
];

export default function Sidebar() {
  return <aside className="fixed z-40 flex h-auto w-full flex-row items-center border-b border-gray-800 bg-gray-900 px-4 py-3 md:h-screen md:w-64 md:flex-col md:items-stretch md:border-b-0 md:border-r md:px-5 md:py-6">
    <div className="mr-5 md:mr-0 md:mb-10"><h1 className="text-2xl font-black tracking-tight">DDCOS</h1><p className="hidden text-xs text-gray-500 md:block mt-1">Commerce Intelligence</p></div>
    <nav className="flex flex-1 gap-1 overflow-x-auto md:flex-col md:gap-2">
      {links.map(([to, icon, label]) => <NavLink key={to} to={to} end={to === "/"} className={({isActive}) => `whitespace-nowrap rounded-lg px-3 py-2.5 text-sm font-medium transition ${isActive ? "bg-blue-600 text-white shadow" : "text-gray-400 hover:bg-gray-800 hover:text-white"}`}>{icon} <span className="ml-2">{label}</span></NavLink>)}
    </nav>
    <div className="hidden md:block mt-auto rounded-xl border border-gray-800 bg-gray-950 p-4"><p className="text-xs font-semibold text-gray-300">ML Pricing Engine</p><p className="mt-1 text-xs text-gray-500">Demand forecasting + revenue optimization</p></div>
  </aside>;
}
