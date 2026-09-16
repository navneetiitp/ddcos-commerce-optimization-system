import {
  ResponsiveContainer,
  BarChart,
  Bar,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from "recharts";

interface SalesData {
  date: string;
  sales: number;
}

interface SalesChartProps {
  data: SalesData[];
}

export default function SalesChart({
  data,
}: SalesChartProps) {

  if (!data || data.length === 0) {
    return (
      <div className="bg-gray-800 rounded-xl p-8 text-center">
        <p className="text-gray-400">
          No sales data available.
        </p>
      </div>
    );
  }

  return (

    <div className="bg-gray-800 rounded-xl shadow p-6">

      <div className="flex justify-between items-center mb-5">

        <h2 className="text-xl font-bold">
          Sales Trend
        </h2>

        <span className="text-sm text-gray-400">
          Sales over time
        </span>

      </div>

      <ResponsiveContainer
        width="100%"
        height={350}
      >

        <BarChart data={data}>

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

          <Bar
            dataKey="sales"
            fill="#3b82f6"
            name="Sales"
            radius={[6, 6, 0, 0]}
          />

        </BarChart>

      </ResponsiveContainer>

      <div className="mt-5 text-sm text-gray-400">

        Sales trends help identify demand changes,
        peak business periods,
        and product performance over time.

      </div>

    </div>

  );

}