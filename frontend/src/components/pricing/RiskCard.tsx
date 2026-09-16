interface RiskCardProps {
  avgRevenue: number;
  risk: number;
}

export default function RiskCard({
  avgRevenue,
  risk,
}: RiskCardProps) {

  const riskLevel =
    risk > 150000
      ? "High"
      : risk > 100000
      ? "Medium"
      : "Low";

  const confidence =
    risk > 150000
      ? "Moderate"
      : "High";

  return (

    <div className="bg-gray-800 rounded-xl shadow p-6">

      <h2 className="text-xl font-bold mb-5">

        Monte Carlo Risk Analysis

      </h2>

      <div className="grid md:grid-cols-2 gap-6">

        <div className="bg-gray-700 rounded-lg p-4">

          <p className="text-gray-400 text-sm">

            Average Revenue

          </p>

          <h3 className="text-2xl font-bold text-green-400 mt-2">

            ₹
            {avgRevenue.toLocaleString("en-IN")}

          </h3>

        </div>

        <div className="bg-gray-700 rounded-lg p-4">

          <p className="text-gray-400 text-sm">

            Revenue Risk

          </p>

          <h3 className="text-2xl font-bold text-yellow-400 mt-2">

            ₹
            {risk.toLocaleString("en-IN")}

          </h3>

        </div>

      </div>

      <div className="grid md:grid-cols-2 gap-6 mt-6">

        <div className="bg-gray-700 rounded-lg p-4">

          <p className="text-gray-400 text-sm">

            Risk Level

          </p>

          <h3
            className={`text-2xl font-bold mt-2 ${
              riskLevel === "Low"
                ? "text-green-400"
                : riskLevel === "Medium"
                ? "text-yellow-400"
                : "text-red-400"
            }`}
          >
            {riskLevel}

          </h3>

        </div>

        <div className="bg-gray-700 rounded-lg p-4">

          <p className="text-gray-400 text-sm">

            Confidence

          </p>

          <h3 className="text-2xl font-bold text-blue-400 mt-2">

            {confidence}

          </h3>

        </div>

      </div>

      <div className="mt-6 bg-gray-900 rounded-lg p-4">

        <h3 className="font-semibold mb-3">

          Recommendation

        </h3>

        <ul className="space-y-2 text-gray-300 text-sm">

          <li>✔ Revenue risk is estimated using Monte Carlo simulation.</li>

          <li>✔ Lower risk indicates more stable expected revenue.</li>

          <li>✔ High confidence suggests the optimized price is reliable.</li>

          <li>✔ Validate recommendations with live market data before deployment.</li>

        </ul>

      </div>

    </div>

  );

}