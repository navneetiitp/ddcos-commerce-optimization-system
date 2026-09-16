import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
} from "recharts";

interface RevenueDistributionItem {
  product: string;
  revenue: number;
}

interface RevenueDistributionProps {
  data: RevenueDistributionItem[];
}

const COLORS = [
  "#22c55e",
  "#3b82f6",
  "#f59e0b",
  "#ef4444",
  "#8b5cf6",
  "#06b6d4",
  "#84cc16",
  "#ec4899",
];

export default function RevenueDistribution({
  data,
}: RevenueDistributionProps) {

  if (!data || data.length === 0) {
    return (
      <div className="bg-gray-800 rounded-xl p-8 text-center">
        <p className="text-gray-400">
          No revenue distribution data available.
        </p>
      </div>
    );
  }

  return (

    <div className="bg-gray-800 rounded-xl shadow p-6">

      <div className="flex justify-between items-center mb-5">

        <h2 className="text-xl font-bold">
          Revenue Distribution
        </h2>

        <span className="text-sm text-gray-400">
          Product-wise contribution
        </span>

      </div>

      <ResponsiveContainer
        width="100%"
        height={350}
      >

        <PieChart>

          <Pie
            data={data}
            dataKey="revenue"
            nameKey="product"
            outerRadius={120}
            label
          >

            {data.map((_, index) => (

              <Cell
                key={index}
                fill={
                  COLORS[
                    index % COLORS.length
                  ]
                }
              />

            ))}

          </Pie>

          <Tooltip />

          <Legend />

        </PieChart>

      </ResponsiveContainer>

      <div className="mt-5 text-sm text-gray-400">

        Revenue distribution highlights
        which products contribute the
        most to overall business revenue.

      </div>

    </div>

  );

}