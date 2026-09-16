import type { Product } from "../../types/product";

interface InventoryTableProps {
  products: Product[];
  loading: boolean;
  lastUpdated: string;
  onEdit: (product: Product) => void;
  onDelete: (product: Product) => void;
}

export default function InventoryTable({
  products,
  loading,
  lastUpdated,
  onEdit,
  onDelete,
}: InventoryTableProps) {
  if (loading) {
    return (
      <div className="bg-gray-800 rounded-xl p-10 text-center">
        <p className="text-gray-400 animate-pulse">
          Loading inventory...
        </p>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="bg-gray-800 rounded-xl p-10 text-center">
        <p className="text-gray-400">
          No products found.
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
            <th className="p-4">Price</th>
            <th className="p-4">Stock</th>
            <th className="p-4">Status</th>
            <th className="p-4">Updated</th>
            <th className="p-4">Actions</th>

          </tr>

        </thead>

        <tbody>

          {products.map((product) => {

            let status = "In Stock";
            let badge =
              "bg-green-600";

            if (product.stock === 0) {
              status = "Out of Stock";
              badge = "bg-red-700";
            } else if (product.stock <= 10) {
              status = "Low Stock";
              badge = "bg-red-600";
            } else if (product.stock <= 30) {
              status = "Limited";
              badge = "bg-yellow-600";
            }

            return (

              <tr
                key={product.id}
                className="border-b border-gray-700 hover:bg-gray-700 transition"
              >

                <td className="p-4 font-semibold">
                  {product.name}
                </td>

                <td className="p-4 text-blue-400">
                  ₹
                  {Number(product.price).toLocaleString(
                    "en-IN"
                  )}
                </td>

                <td className="p-4 font-bold">
                  {product.stock}
                </td>

                <td className="p-4">

                  <span
                    className={`${badge} px-3 py-1 rounded-full text-xs`}
                  >
                    {status}
                  </span>

                </td>

                <td className="p-4 text-gray-400 text-sm">
                  {lastUpdated}
                </td>

                <td className="p-4">

                  <div className="flex gap-2">

                    <button
                      onClick={() => onEdit(product)}
                      className="bg-blue-600 hover:bg-blue-700 px-3 py-1 rounded-lg text-sm"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => onDelete(product)}
                      className="bg-red-600 hover:bg-red-700 px-3 py-1 rounded-lg text-sm"
                    >
                      Delete
                    </button>

                  </div>

                </td>

              </tr>

            );

          })}

        </tbody>

      </table>

    </div>
  );
}