import type { Product } from "../../types/product";

interface PricingProduct extends Product {
  predictedDemand?: number;
  predictedRevenue?: number;
  optimizedPrice?: number;
  optimized?: boolean;
}

interface PricingTableProps {
  products: PricingProduct[];
  loading: boolean;
  onOptimize: (product: PricingProduct) => void;
  onApply: (product: PricingProduct) => void;
}

export default function PricingTable({
  products,
  loading,
  onOptimize,
  
}: PricingTableProps) {
  if (loading) {
    return (
      <div className="bg-gray-800 rounded-xl p-10 text-center">
        <p className="animate-pulse text-gray-400">
          Loading pricing data...
        </p>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="bg-gray-800 rounded-xl p-10 text-center">
        <p className="text-gray-400">
          No products available.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-gray-800 rounded-xl shadow overflow-x-auto">

      <table className="w-full text-left">

        <thead className="bg-gray-700">

          <tr>

            <th className="p-4">Product</th>

            <th className="p-4">Current Price</th>

            <th className="p-4">Suggested Price</th>

            <th className="p-4">Demand</th>

            <th className="p-4">Revenue</th>

            <th className="p-4">Status</th>

            <th className="p-4">Actions</th>

          </tr>

        </thead>

        <tbody>

          {products.map((product) => (

            <tr
              key={product.id}
              className="border-b border-gray-700 hover:bg-gray-700 transition"
            >

              <td className="p-4 font-semibold">
                {product.name}
              </td>

              <td className="p-4 text-blue-400">
                ₹{product.price.toLocaleString("en-IN")}
              </td>

              <td className="p-4 text-green-400 font-semibold">
                {product.optimizedPrice
                  ? `₹${product.optimizedPrice.toLocaleString("en-IN")}`
                  : "-"}
              </td>

              <td className="p-4">
                {product.predictedDemand ?? "-"}
              </td>

              <td className="p-4">
                {product.predictedRevenue
                  ? `₹${product.predictedRevenue.toLocaleString("en-IN")}`
                  : "-"}
              </td>

              <td className="p-4">

                <span
                  className={`px-3 py-1 rounded-full text-xs ${
                    product.optimized
                      ? "bg-green-600"
                      : "bg-gray-600"
                  }`}
                >
                  {product.optimized
                    ? "Optimized"
                    : "Pending"}
                </span>

              </td>

              <td className="p-4">

                <div className="flex gap-2">

                  <button
                    onClick={() => onOptimize(product)}
                    className="bg-blue-600 hover:bg-blue-700 px-3 py-1 rounded text-sm"
                  >
                    Optimize
                  </button>

                  

                </div>

              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>
  );
}