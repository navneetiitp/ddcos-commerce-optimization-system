interface InventoryStatsProps {
  totalProducts: number;
  averagePrice: number;
  lowStock: number;
  outOfStock: number;
}

export default function InventoryStats({
  totalProducts,
  averagePrice,
  lowStock,
  outOfStock,
}: InventoryStatsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">

      {/* Total Products */}

      <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-5 shadow">

        <p className="text-gray-400 text-sm">
          Total Products
        </p>

        <h2 className="text-3xl font-bold mt-2">
          {totalProducts}
        </h2>

      </div>

      {/* Average Price */}

      <div className="bg-gradient-to-br from-green-700 to-green-900 rounded-xl p-5 shadow">

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

      {/* Low Stock */}

      <div className="bg-gradient-to-br from-yellow-700 to-yellow-900 rounded-xl p-5 shadow">

        <p className="text-gray-200 text-sm">
          Low Stock
        </p>

        <h2 className="text-3xl font-bold mt-2">
          {lowStock}
        </h2>

      </div>

      {/* Out Of Stock */}

      <div className="bg-gradient-to-br from-red-700 to-red-900 rounded-xl p-5 shadow">

        <p className="text-gray-200 text-sm">
          Out Of Stock
        </p>

        <h2 className="text-3xl font-bold mt-2">
          {outOfStock}
        </h2>

      </div>

    </div>
  );
}