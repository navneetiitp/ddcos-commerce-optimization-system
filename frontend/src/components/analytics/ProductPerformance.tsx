interface ProductPerformanceItem {
  product: string;
  sales: number;
  revenue: number;
  demand: number;
}

interface ProductPerformanceProps {
  data: ProductPerformanceItem[];
}

export default function ProductPerformance({
  data,
}: ProductPerformanceProps) {

  if (!data || data.length === 0) {
    return (
      <div className="bg-gray-800 rounded-xl p-8 text-center">
        <p className="text-gray-400">
          No product performance data available.
        </p>
      </div>
    );
  }

  return (

    <div className="bg-gray-800 rounded-xl shadow p-6">

      <div className="flex justify-between items-center mb-5">

        <h2 className="text-xl font-bold">

          Product Performance

        </h2>

        <span className="text-sm text-gray-400">

          Top performing products

        </span>

      </div>

      <div className="overflow-x-auto">

        <table className="w-full text-left">

          <thead className="bg-gray-700">

            <tr>

              <th className="p-4">Rank</th>

              <th className="p-4">Product</th>

              <th className="p-4">Sales</th>

              <th className="p-4">Revenue</th>

              <th className="p-4">Demand</th>

            </tr>

          </thead>

          <tbody>

            {data.map((item, index) => (

              <tr
                key={index}
                className="border-b border-gray-700 hover:bg-gray-700 transition"
              >

                <td className="p-4">

                  {index === 0
                    ? "🥇"
                    : index === 1
                    ? "🥈"
                    : index === 2
                    ? "🥉"
                    : index + 1}

                </td>

                <td className="p-4 font-semibold">

                  {item.product}

                </td>

                <td className="p-4">

                  {item.sales.toLocaleString("en-IN")}

                </td>

                <td className="p-4 text-green-400 font-semibold">

                  ₹{item.revenue.toLocaleString("en-IN")}

                </td>

                <td className="p-4 text-blue-400">

                  {item.demand.toLocaleString("en-IN")}

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

      <div className="mt-5 text-sm text-gray-400">

        Product performance combines sales,
        revenue, and demand to identify the
        strongest products in your catalog.

      </div>

    </div>

  );

}