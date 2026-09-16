import {
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from "recharts";

interface RevenueData {
  date: string;
  revenue: number;
}

interface RevenueChartProps {
  data: RevenueData[];
}

export default function RevenueChart({
  data,
}: RevenueChartProps) {

  if (!data || data.length === 0) {
    return (
      <div className="bg-gray-800 rounded-xl p-8 text-center">
        <p className="text-gray-400">
          No revenue data available.
        </p>
      </div>
    );
  }

  return (

    <div className="bg-gray-800 rounded-xl shadow p-6">

      <div className="flex justify-between items-center mb-5">

        <h2 className="text-xl font-bold">

          Revenue Trend

        </h2>

        <span className="text-sm text-gray-400">

          Revenue over time

        </span>

      </div>

      <ResponsiveContainer
        width="100%"
        height={350}
      >

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

          <Legend />

          <Line
            type="monotone"
            dataKey="revenue"
            stroke="#22c55e"
            strokeWidth={3}
            activeDot={{ r: 7 }}
            name="Revenue"
          />

        </LineChart>

      </ResponsiveContainer>

      <div className="mt-5 text-sm text-gray-400">

        Revenue trend helps identify
        seasonal demand,
        pricing effectiveness,
        and long-term business growth.

      </div>

    </div>

  );

}