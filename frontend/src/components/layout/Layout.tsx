import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";

export default function Layout() {
  return <div className="min-h-screen bg-gray-950 text-white md:flex"><Sidebar /><main className="min-w-0 flex-1 md:ml-64"><Outlet /></main></div>;
}
