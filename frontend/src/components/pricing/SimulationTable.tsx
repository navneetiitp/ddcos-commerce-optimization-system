interface SimulationRow {
  price: number;
  demand: number;
  revenue: number;
}

interface SimulationTableProps {
  simulation: SimulationRow[];
  optimalPrice: number;
}

export default function SimulationTable({
  simulation,
  optimalPrice,
}: SimulationTableProps) {

  if (!simulation || simulation.length === 0) {
    return (
      <div className="bg-gray-800 rounded-xl p-8 text-center">
        <p className="text-gray-400">
          No simulation data available.
        </p>
      </div>
    );
  }

  return (

    <div className="bg-gray-800 rounded-xl shadow p-6">

      <h2 className="text-xl font-bold mb-5">

        Simulation Results

      </h2>

      <div className="overflow-x-auto">

        <table className="w-full text-left">

          <thead className="bg-gray-700">

            <tr>

              <th className="p-4">
                Price
              </th>

              <th className="p-4">
                Demand
              </th>

              <th className="p-4">
                Revenue
              </th>

              <th className="p-4">
                Status
              </th>

            </tr>

          </thead>

          <tbody>

            {simulation.map((row, index) => {

              const best =
                row.price === optimalPrice;

              return (

                <tr
                  key={index}
                  className={`border-b border-gray-700 hover:bg-gray-700 transition ${
                    best ? "bg-green-900/40" : ""
                  }`}
                >

                  <td className="p-4 font-semibold">

                    ₹{row.price.toLocaleString("en-IN")}

                  </td>

                  <td className="p-4">

                    {row.demand.toLocaleString("en-IN")}

                  </td>

                  <td className="p-4 text-green-400 font-semibold">

                    ₹{row.revenue.toLocaleString("en-IN")}

                  </td>

                  <td className="p-4">

                    {best ? (
                      <span className="bg-green-600 px-3 py-1 rounded-full text-xs font-semibold">
                        Recommended
                      </span>
                    ) : (
                      <span className="bg-gray-600 px-3 py-1 rounded-full text-xs">
                        Candidate
                      </span>
                    )}

                  </td>

                </tr>

              );

            })}

          </tbody>

        </table>

      </div>

      <div className="mt-5 text-sm text-gray-400">

        <p>

          ✔ Recommended price corresponds to the maximum expected revenue from the simulation.

        </p>

      </div>

    </div>

  );

}