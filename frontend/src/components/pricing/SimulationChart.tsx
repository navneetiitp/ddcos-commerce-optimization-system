import {
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ReferenceDot,
  Legend,
} from "recharts";

interface SimulationPoint {
  price: number;
  demand: number;
  revenue: number;
}

interface SimulationChartProps {
  simulation: SimulationPoint[];
  optimalPrice: number;
  expectedRevenue: number;
}

export default function SimulationChart({
  simulation,
  optimalPrice,
  expectedRevenue,
}: SimulationChartProps) {
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
        Demand & Revenue Simulation
      </h2>

      <ResponsiveContainer width="100%" height={350}>

        <LineChart data={simulation}>

          <CartesianGrid stroke="#444" />

          <XAxis
            dataKey="price"
            stroke="#aaa"
            label={{
              value: "Price (₹)",
              position: "insideBottom",
              offset: -5,
            }}
          />

          <YAxis stroke="#aaa" />

          <Tooltip
            contentStyle={{
              backgroundColor: "#1f2937",
              border: "none",
            }}
          />

          <Legend />

          <Line
            type="monotone"
            dataKey="demand"
            stroke="#60a5fa"
            strokeWidth={3}
            name="Demand"
          />

          <Line
            type="monotone"
            dataKey="revenue"
            stroke="#22c55e"
            strokeWidth={3}
            name="Revenue"
          />

          <ReferenceDot
            x={optimalPrice}
            y={expectedRevenue}
            r={8}
            fill="red"
            stroke="white"
            label="Optimal"
          />

        </LineChart>

      </ResponsiveContainer>

      <div className="mt-4 text-sm text-gray-400">

        <p>
          🔵 Blue line shows predicted demand at different prices.
        </p>

        <p>
          🟢 Green line shows expected revenue.
        </p>

        <p>
          🔴 Red point marks the optimal price recommended by the optimization engine.
        </p>

      </div>

    </div>
  );
}