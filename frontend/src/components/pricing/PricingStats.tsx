interface PricingStatsProps {
  totalProducts: number;
  averagePrice: number;
  optimizedProducts: number;
  averageRevenue: number;
}

export default function PricingStats({
  totalProducts,
  averagePrice,
  optimizedProducts,
  averageRevenue,
}: PricingStatsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">

      <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-5 shadow">
        <p className="text-gray-400 text-sm">
          Products
        </p>

        <h2 className="text-3xl font-bold mt-2">
          {totalProducts}
        </h2>
      </div>

      <div className="bg-gradient-to-br from-blue-700 to-blue-900 rounded-xl p-5 shadow">
        <p className="text-gray-200 text-sm">
          Average Price
        </p>

        <h2 className="text-3xl font-bold mt-2">
          ₹
          {averagePrice.toLocaleString("en-IN", {
            maximumFractionDigits: 2,
          })}
        </h2>
      </div>

      <div className="bg-gradient-to-br from-green-700 to-green-900 rounded-xl p-5 shadow">
        <p className="text-gray-200 text-sm">
          Optimized
        </p>

        <h2 className="text-3xl font-bold mt-2">
          {optimizedProducts}
        </h2>
      </div>

      <div className="bg-gradient-to-br from-purple-700 to-purple-900 rounded-xl p-5 shadow">
        <p className="text-gray-200 text-sm">
          Avg Revenue
        </p>

        <h2 className="text-3xl font-bold mt-2">
          ₹
          {averageRevenue.toLocaleString("en-IN", {
            maximumFractionDigits: 2,
          })}
        </h2>
      </div>

    </div>
  );
}