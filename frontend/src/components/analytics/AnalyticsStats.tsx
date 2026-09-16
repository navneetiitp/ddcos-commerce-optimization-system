interface AnalyticsStatsProps {
  totalRevenue: number;
  totalSales: number;
  averageRevenue: number;
  bestProduct: string;
}

export default function AnalyticsStats({
  totalRevenue,
  totalSales,
  averageRevenue,
  bestProduct,
}: AnalyticsStatsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">

      <div className="bg-gradient-to-br from-green-700 to-green-900 rounded-xl p-5 shadow">
        <p className="text-gray-200 text-sm">
          Total Revenue
        </p>

        <h2 className="text-3xl font-bold mt-2">
          ₹{totalRevenue.toLocaleString("en-IN")}
        </h2>
      </div>

      <div className="bg-gradient-to-br from-blue-700 to-blue-900 rounded-xl p-5 shadow">
        <p className="text-gray-200 text-sm">
          Total Sales
        </p>

        <h2 className="text-3xl font-bold mt-2">
          {totalSales.toLocaleString("en-IN")}
        </h2>
      </div>

      <div className="bg-gradient-to-br from-purple-700 to-purple-900 rounded-xl p-5 shadow">
        <p className="text-gray-200 text-sm">
          Avg Revenue
        </p>

        <h2 className="text-3xl font-bold mt-2">
          ₹{averageRevenue.toLocaleString("en-IN")}
        </h2>
      </div>

      <div className="bg-gradient-to-br from-yellow-600 to-orange-700 rounded-xl p-5 shadow">
        <p className="text-gray-200 text-sm">
          Best Product
        </p>

        <h2 className="text-xl font-bold mt-2">
          {bestProduct || "N/A"}
        </h2>
      </div>

    </div>
  );
}