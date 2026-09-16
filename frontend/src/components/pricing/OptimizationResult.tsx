interface OptimizationResultProps {
  result: any;
}

export default function OptimizationResult({
  result,
}: OptimizationResultProps) {

  if (!result) return null;

  return (

    <div className="space-y-6">

      {/* Optimization Mode */}

      <div className="bg-gray-800 rounded-xl p-5">

        <p className="text-gray-400 text-sm">

          Optimization Mode

        </p>

        <h2 className="text-2xl font-bold mt-2">

          {result.mode === "ml"
            ? "Machine Learning Based"
            : "Data Driven"}

        </h2>

      </div>

      {/* KPI Cards */}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        <div className="bg-gradient-to-br from-green-700 to-green-900 rounded-xl p-5">

          <p className="text-gray-200">

            Optimal Price

          </p>

          <h2 className="text-3xl font-bold mt-2">

            ₹{result.optimal_price}

          </h2>

        </div>

        <div className="bg-gradient-to-br from-blue-700 to-blue-900 rounded-xl p-5">

          <p className="text-gray-200">

            Expected Revenue

          </p>

          <h2 className="text-3xl font-bold mt-2">

            ₹{result.expected_revenue}

          </h2>

        </div>

        <div className="bg-gradient-to-br from-purple-700 to-purple-900 rounded-xl p-5">

          <p className="text-gray-200">

            Elasticity

          </p>

          <h2 className="text-3xl font-bold mt-2">

            {result.elasticity}

          </h2>

        </div>

      </div>

      {/* Business Insights */}

      <div className="bg-gray-900 rounded-xl p-6">

        <h2 className="font-bold mb-4">

          Business Insights

        </h2>

        <ul className="space-y-3 text-gray-300">

          <li>
            📈 Revenue reaches its maximum near the recommended price.
          </li>

          <li>
            💰 The optimization engine balances demand and profitability.
          </li>

          <li>
            📉 Higher prices increase revenue only until demand drops significantly.
          </li>

          <li>
            🤖 Machine learning estimates customer price sensitivity.
          </li>

          <li>
            🎯 Review the recommendation together with the risk analysis before applying a new price.
          </li>

        </ul>

      </div>

    </div>

  );

}