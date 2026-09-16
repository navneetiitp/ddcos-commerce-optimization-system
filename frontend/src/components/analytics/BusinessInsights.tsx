interface BusinessInsightsProps {
  totalRevenue: number;
  totalSales: number;
  averageRevenue: number;
  bestProduct: string;
}

export default function BusinessInsights({
  totalRevenue,
  totalSales,
  averageRevenue,
  bestProduct,
}: BusinessInsightsProps) {

  const insights: string[] = [];

  if (totalRevenue > 100000) {
    insights.push(
      "📈 Revenue performance is strong. Continue monitoring high-performing products."
    );
  } else {
    insights.push(
      "📉 Revenue is relatively low. Consider reviewing pricing strategies and promotional campaigns."
    );
  }

  if (totalSales > 500) {
    insights.push(
      "🛒 Sales volume is healthy, indicating strong customer demand."
    );
  } else {
    insights.push(
      "⚠️ Sales volume is below the desired level. Focus on demand generation and marketing."
    );
  }

  if (averageRevenue > 1000) {
    insights.push(
      "💰 Average revenue per transaction is high, suggesting effective pricing."
    );
  } else {
    insights.push(
      "💡 Increasing average order value may improve profitability."
    );
  }

  if (bestProduct) {
    insights.push(
      `🏆 "${bestProduct}" is currently the best-performing product. Ensure inventory availability and consider promotional campaigns.`
    );
  }

  insights.push(
    "🤖 Continue using ML-based price optimization to maximize long-term revenue."
  );

  return (

    <div className="bg-gray-900 rounded-xl shadow p-6">

      <h2 className="text-2xl font-bold mb-5">

        Business Insights

      </h2>

      <div className="space-y-4">

        {insights.map((insight, index) => (

          <div
            key={index}
            className="bg-gray-800 rounded-lg p-4 border-l-4 border-green-500"
          >

            <p className="text-gray-300">

              {insight}

            </p>

          </div>

        ))}

      </div>

    </div>

  );

}