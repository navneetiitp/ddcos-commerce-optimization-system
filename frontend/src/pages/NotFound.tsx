import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="text-center max-w-md">
        <p className="text-6xl font-black text-blue-500">404</p>
        <h1 className="text-2xl font-bold mt-4">Page not found</h1>
        <p className="text-gray-400 mt-2">The page you requested does not exist.</p>
        <Link to="/" className="inline-block mt-6 px-5 py-2 rounded-lg bg-blue-600 hover:bg-blue-700">
          Back to Dashboard
        </Link>
      </div>
    </div>
  );
}
