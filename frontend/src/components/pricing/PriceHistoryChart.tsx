import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

interface PriceHistory {
  date: string;
  price: number;
}

interface PriceHistoryChartProps {
  data: PriceHistory[];
}

export default function PriceHistoryChart({
  data,
}: PriceHistoryChartProps) {
  return (
    <div className="bg-gray-800 rounded-xl shadow p-6">

      <h2 className="text-xl font-bold mb-4 text-white">
        Price History
      </h2>

      {data.length === 0 ? (
        <p className="text-gray-400">
          No historical pricing data available.
        </p>
      ) : (
        <ResponsiveContainer width="100%" height={320}>
          <LineChart data={data}>

            <CartesianGrid stroke="#444" />

            <XAxis
              dataKey="date"
              stroke="#aaa"
            />

            <YAxis stroke="#aaa" />

            <Tooltip
              contentStyle={{
                backgroundColor: "#1f2937",
                border: "none",
              }}
            />

            <Line
              type="monotone"
              dataKey="price"
              stroke="#3b82f6"
              strokeWidth={3}
              dot={{ r: 4 }}
            />

          </LineChart>
        </ResponsiveContainer>
      )}

      <p className="text-sm text-gray-400 mt-4">
        Historical price movement helps visualize how pricing
        changes over time and supports optimization decisions.
      </p>

    </div>
  );
}