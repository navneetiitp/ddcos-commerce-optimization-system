import { useEffect, useMemo, useState } from "react";
import { getAnalytics,} from "../services/api";


import AnalyticsStats from "../components/analytics/AnalyticsStats";
import AnalyticsControls from "../components/analytics/AnalyticsControls";
import RevenueChart from "../components/analytics/RevenueChart";
import SalesChart from "../components/analytics/SalesChart";
import ProductPerformance from "../components/analytics/ProductPerformance";
import RevenueDistribution from "../components/analytics/RevenueDistribution";
import BusinessInsights from "../components/analytics/BusinessInsights";



export default function Analytics() {

  const [analytics, setAnalytics] =
  useState<any>(null);

  const [loading, setLoading] =
    useState(true);

  const [search, setSearch] =
    useState("");

  const [period, setPeriod] =
    useState("All Time");

  const [sortBy, setSortBy] =
    useState("Revenue");

  const [lastUpdated, setLastUpdated] =
    useState("");

  async function loadAnalytics() {

  setLoading(true);

  try {

    const data =
      await getAnalytics();

    setAnalytics(data);

    setLastUpdated(
      new Date().toLocaleString()
    );

  } catch (err) {

    console.error(err);

  } finally {

    setLoading(false);

  }

}

  useEffect(() => {

    loadAnalytics();

    const interval =
      setInterval(
        loadAnalytics,
        5000
      );

    return () =>
      clearInterval(interval);

  }, []);
    /* ------------------------------
      Filter & Sort Products
  ------------------------------ */

  const filteredProducts = useMemo(() => {
  let data = [
  ...(analytics?.product_performance ?? [])
];

    // Search

    if (search.trim() !== "") {

      data = data.filter((p) =>
        p.product_name
          .toLowerCase()
          .includes(search.toLowerCase())
      );

    }

    // Sort

    switch (sortBy) {

      case "Sales":

        data.sort(
          (a, b) =>
            b.total_sales - a.total_sales
        );

        break;

      case "Product Name":

        data.sort((a, b) =>
          a.product_name.localeCompare(
            b.product_name
          )
        );

        break;

      default:

        data.sort(
          (a, b) =>
            b.total_sales - a.total_sales
        );

    }

    return data;

  }, [analytics, search, sortBy]);

  /* ------------------------------
      KPI Calculations
  ------------------------------ */

  const totalRevenue =
    analytics?.stats?.revenue ?? 0;

  const totalSales =
    analytics?.stats?.total_sales ?? 0;

  const averageRevenue =
    totalSales > 0
      ? totalRevenue / totalSales
      : 0;

  const bestProduct =
    filteredProducts.length > 0
      ? filteredProducts[0].product_name
      : "N/A";

  /* ------------------------------
      Revenue Chart Data
  ------------------------------ */

  const revenueData =
    analytics?.revenue_chart ?? [];

  /* ------------------------------
      Sales Chart Data
  ------------------------------ */

  const salesData =
    analytics?.sales_chart ?? [];

  /* ------------------------------
      Product Performance Data
  ------------------------------ */

  const performanceData =
  filteredProducts;

  /* ------------------------------
      Revenue Distribution
  ------------------------------ */
const revenueDistribution =
  analytics?.revenue_distribution ?? [];

  /* ------------------------------
      Export Report
  ------------------------------ */

  function handleExport() {

    alert(
      "CSV export will be connected in the next phase."
    );

  }
    return (

    <div className="p-6 text-white">

      {/* ==========================
            Header
      ========================== */}

      <h1 className="text-3xl font-bold mb-2">

        Business Analytics

      </h1>

      <p className="text-gray-400 mb-2">

        Analyze sales, revenue, demand,
        and product performance using
        interactive dashboards.

      </p>

      <p className="text-green-400 text-sm">

        ● Live Analytics

      </p>

      <p className="text-xs text-gray-500 mb-6">

        Last Updated : {lastUpdated}

      </p>

      {loading && (

        <p className="animate-pulse text-gray-400">

          Loading analytics...

        </p>

      )}

      {/* ==========================
            KPI Cards
      ========================== */}

      <AnalyticsStats

        totalRevenue={totalRevenue}

        totalSales={totalSales}

        averageRevenue={averageRevenue}

        bestProduct={bestProduct}

      />

      {/* ==========================
            Controls
      ========================== */}

      <AnalyticsControls

        search={search}

        period={period}

        sortBy={sortBy}

        onSearchChange={setSearch}

        onPeriodChange={setPeriod}

        onSortChange={setSortBy}

        onExport={handleExport}

      />

      {/* ==========================
            Revenue Chart
      ========================== */}

      <div className="mb-8">

        <RevenueChart

          data={revenueData}

        />

      </div>

      {/* ==========================
            Sales Chart
      ========================== */}

      <div className="mb-8">

        <SalesChart

          data={salesData}

        />

      </div>
           {/* ==========================
            Product Performance
      ========================== */}

      <div className="mb-8">

        <ProductPerformance
          data={performanceData}
        />

      </div>

      {/* ==========================
            Revenue Distribution
      ========================== */}

      <div className="mb-8">

        <RevenueDistribution
          data={revenueDistribution}
        />

      </div>

      {/* ==========================
            Business Insights
      ========================== */}

      <BusinessInsights
        totalRevenue={totalRevenue}
        totalSales={totalSales}
        averageRevenue={averageRevenue}
        bestProduct={bestProduct}
      />

      {/* ==========================
            Analytics Summary
      ========================== */}

      <div className="mt-8 bg-gray-900 rounded-xl p-6 shadow">

        <h2 className="text-xl font-bold mb-4">

          Analytics Summary

        </h2>

        <div className="grid md:grid-cols-2 gap-6">

          <div>

            <h3 className="font-semibold mb-3">

              Key Findings

            </h3>

            <ul className="space-y-2 text-gray-300">

              <li>
                📈 Revenue trends reveal overall business growth.
              </li>

              <li>
                🛒 Sales analytics identify peak demand periods.
              </li>

              <li>
                🏆 Product performance ranks the highest-performing products.
              </li>

              <li>
                🥧 Revenue distribution highlights each product's contribution.
              </li>

            </ul>

          </div>

          <div>

            <h3 className="font-semibold mb-3">

              Recommendations

            </h3>

            <ul className="space-y-2 text-gray-300">

              <li>
                ✅ Focus inventory on high-performing products.
              </li>

              <li>
                ✅ Monitor products with declining sales.
              </li>

              <li>
                ✅ Continue ML-based pricing optimization.
              </li>

              <li>
                ✅ Review analytics regularly for informed business decisions.
              </li>

            </ul>

          </div>

        </div>

      </div>

    </div>

  );

} 