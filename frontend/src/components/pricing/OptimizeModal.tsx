interface OptimizeModalProps {
  open: boolean;
  productName: string;
  currentPrice: number;
  suggestedPrice: number;
  predictedDemand: number;
  predictedRevenue: number;

  loading?: boolean;

  onClose: () => void;
  onApply: () => void;
}

export default function OptimizeModal({
  open,
  productName,
  currentPrice,
  suggestedPrice,
  predictedDemand,
  predictedRevenue,
  loading = false,
  onClose,
  onApply,
}: OptimizeModalProps) {

  if (!open) return null;

  const difference = suggestedPrice - currentPrice;

  const percent =
    currentPrice === 0
      ? 0
      : ((difference / currentPrice) * 100);

  return (

    <div className="fixed inset-0 bg-black/60 flex justify-center items-center z-50">

      <div className="bg-gray-800 rounded-xl shadow-xl w-full max-w-xl">

        {/* Header */}

        <div className="border-b border-gray-700 p-5">

          <h2 className="text-2xl font-bold">

            Price Optimization

          </h2>

        </div>

        {/* Body */}

        <div className="p-6 space-y-4">

          <div className="bg-gray-700 rounded-lg p-4">

            <p className="text-gray-400 text-sm">
              Product
            </p>

            <h3 className="text-xl font-bold">
              {productName}
            </h3>

          </div>

          <div className="grid md:grid-cols-2 gap-4">

            <div className="bg-gray-700 rounded-lg p-4">

              <p className="text-gray-400 text-sm">
                Current Price
              </p>

              <h3 className="text-2xl font-bold text-blue-400">
                ₹{currentPrice.toLocaleString("en-IN")}
              </h3>

            </div>

            <div className="bg-green-700 rounded-lg p-4">

              <p className="text-green-100 text-sm">
                Suggested Price
              </p>

              <h3 className="text-2xl font-bold">
                ₹{suggestedPrice.toLocaleString("en-IN")}
              </h3>

            </div>

          </div>

          <div className="grid md:grid-cols-2 gap-4">

            <div className="bg-gray-700 rounded-lg p-4">

              <p className="text-gray-400 text-sm">
                Predicted Demand
              </p>

              <h3 className="text-2xl font-bold text-yellow-400">
                {predictedDemand}
              </h3>

            </div>

            <div className="bg-gray-700 rounded-lg p-4">

              <p className="text-gray-400 text-sm">
                Predicted Revenue
              </p>

              <h3 className="text-2xl font-bold text-green-400">
                ₹{predictedRevenue.toLocaleString("en-IN")}
              </h3>

            </div>

          </div>

          <div className="bg-gray-700 rounded-lg p-4">

            <p className="text-gray-400 text-sm">
              Price Change
            </p>

            <h3
              className={`text-2xl font-bold ${
                difference >= 0
                  ? "text-green-400"
                  : "text-red-400"
              }`}
            >
              {difference >= 0 ? "+" : ""}
              ₹{difference.toFixed(2)}
              ({percent.toFixed(2)}%)
            </h3>

          </div>

        </div>

        {/* Footer */}

        <div className="border-t border-gray-700 p-5 flex justify-end gap-3">

          <button
            onClick={onClose}
            className="px-5 py-2 rounded-lg bg-gray-600 hover:bg-gray-700"
          >
            Cancel
          </button>

          <button
            onClick={onApply}
            disabled={loading}
            className="px-5 py-2 rounded-lg bg-green-600 hover:bg-green-700 disabled:opacity-50"
          >
            {loading ? "Applying..." : "Apply Price"}
          </button>

        </div>

      </div>

    </div>

  );

}