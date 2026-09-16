import { useEffect, useMemo, useState } from "react";

import type { Product } from "../types/product";

import {
  getProducts,
  updateProductPrice,
} from "../services/product";
import { optimizePrice } from "../services/api";

import PricingStats from "../components/pricing/PricingStats";
import PricingControls from "../components/pricing/PricingControls";
import PricingTable from "../components/pricing/PricingTable";
import OptimizeModal from "../components/pricing/OptimizeModal";
import OptimizationResult from "../components/pricing/OptimizationResult";
import RiskCard from "../components/pricing/RiskCard";
import SimulationChart from "../components/pricing/SimulationChart";
import SimulationTable from "../components/pricing/SimulationTable";
import PriceHistoryChart from "../components/pricing/PriceHistoryChart";

interface PricingProduct extends Product {
  optimized?: boolean;
  optimizedPrice?: number;
  predictedDemand?: number;
  predictedRevenue?: number;
}

export default function Pricing() {

  /* ------------------------------
      Main State
  ------------------------------ */

  const [products, setProducts] =
    useState<PricingProduct[]>([]);

  const [loading, setLoading] =
    useState(true);

  const [search, setSearch] =
    useState("");

  const [sortBy, setSortBy] =
    useState("Name");

  const [optimizationFilter,
    setOptimizationFilter] =
    useState("All Products");

  const [selectedProduct,
    setSelectedProduct] =
    useState<PricingProduct | null>(null);

  const [result, setResult] =
    useState<any>(null);

  const [modalOpen,
    setModalOpen] =
    useState(false);

  const [applying,
    setApplying] =
    useState(false);

  /* ------------------------------
      Load Products
  ------------------------------ */

  async function loadProducts() {

    setLoading(true);

    try {

      const data =
        await getProducts();

      setProducts(
        Array.isArray(data)
          ? data
          : []
      );

    } catch (err) {

      console.error(err);

      setProducts([]);

    } finally {

      setLoading(false);

    }

  }

  useEffect(() => {

    loadProducts();

  }, []);
    /* ------------------------------
      Search + Filter + Sort
  ------------------------------ */

  const filteredProducts = useMemo(() => {

    let data = [...products];

    // Search

    if (search.trim() !== "") {

      data = data.filter((p) =>
        p.name
          .toLowerCase()
          .includes(search.toLowerCase())
      );

    }

    // Filter

    switch (optimizationFilter) {

      case "Optimized":

        data = data.filter(
          (p) => p.optimized
        );

        break;

      case "Not Optimized":

        data = data.filter(
          (p) => !p.optimized
        );

        break;

      default:
        break;
    }

    // Sort

    switch (sortBy) {

      case "Price":

        data.sort(
          (a, b) => b.price - a.price
        );

        break;

      case "Revenue":

        data.sort(
          (a, b) =>
            (b.predictedRevenue ?? 0) -
            (a.predictedRevenue ?? 0)
        );

        break;

      case "Demand":

        data.sort(
          (a, b) =>
            (b.predictedDemand ?? 0) -
            (a.predictedDemand ?? 0)
        );

        break;

      default:

        data.sort((a, b) =>
          a.name.localeCompare(b.name)
        );

    }

    return data;

  }, [
    products,
    search,
    sortBy,
    optimizationFilter,
  ]);

  /* ------------------------------
      KPI Cards
  ------------------------------ */

  const totalProducts = products.length;

  const averagePrice =
    products.length === 0
      ? 0
      : products.reduce(
          (sum, p) => sum + p.price,
          0
        ) / products.length;

  const optimizedProducts =
    products.filter(
      (p) => p.optimized
    ).length;

  const averageRevenue =
    products.length === 0
      ? 0
      : products.reduce(
          (sum, p) =>
            sum +
            (p.predictedRevenue ?? 0),
          0
        ) / products.length;

  /* ------------------------------
      Optimize One Product
  ------------------------------ */

  async function handleOptimize(
    product: PricingProduct
  ) {

    try {

      const res =
        await optimizePrice(product.id);

      setResult(res);

      setSelectedProduct(product);

      setModalOpen(true);

    } catch (err) {

      console.error(err);

    }

  }

  /* ------------------------------
      Optimize All Products
  ------------------------------ */

  async function handleOptimizeAll() {

    setLoading(true);

    try {

      const updated = await Promise.all(

        products.map(async (product) => {

          try {

            const res =
              await optimizePrice(product.id);

            return {

              ...product,

              optimized: true,

              optimizedPrice:
                res.optimal_price,

              predictedDemand:
                res.simulation?.find(
                  (x: any) =>
                    x.price ===
                    res.optimal_price
                )?.demand ?? 0,

              predictedRevenue:
                res.expected_revenue,

            };

          } catch {

            return product;

          }

        })

      );

      setProducts(updated);

    } finally {

      setLoading(false);

    }

  }

  /* ------------------------------
      Apply Optimized Price
  ------------------------------ */

  async function handleApply() {

  if (!selectedProduct || !result) return;

  setApplying(true);

  try {

    // Save optimized price in database
    const updatedProduct =
      await updateProductPrice(
        selectedProduct.id,
        result.optimal_price
      );

    if (!updatedProduct) {

      alert("Failed to update price.");

      return;

    }

    // Refresh products from backend
    await loadProducts();

    // Close modal
    setModalOpen(false);

    // Clear optimization result
    setResult(null);

    setSelectedProduct(null);

    alert("✅ Product price updated successfully!");

  } catch (err) {

    console.error(err);

    alert("Something went wrong.");

  } finally {

    setApplying(false);

  }

}
    return (
    <div className="p-6 text-white">

      {/* ==========================
          Page Header
      ========================== */}

      <h1 className="text-3xl font-bold mb-2">
        Pricing Optimization
      </h1>

      <p className="text-gray-400 mb-6">
        Optimize product prices using machine learning,
        demand prediction, and Monte Carlo simulation.
      </p>

      {/* ==========================
          KPI Cards
      ========================== */}

      <PricingStats
        totalProducts={totalProducts}
        averagePrice={averagePrice}
        optimizedProducts={optimizedProducts}
        averageRevenue={averageRevenue}
      />

      {/* ==========================
          Controls
      ========================== */}

      <PricingControls
        search={search}
        sortBy={sortBy}
        optimizationFilter={optimizationFilter}
        onSearchChange={setSearch}
        onSortChange={setSortBy}
        onFilterChange={setOptimizationFilter}
        onOptimizeAll={handleOptimizeAll}
      />

      {/* ==========================
          Pricing Table
      ========================== */}

      <PricingTable
  products={filteredProducts}
  loading={loading}
  onOptimize={handleOptimize}
  onApply={async (product) => {

    if (!product.optimizedPrice) {
      alert("Please optimize the product first.");
      return;
    }

    try {

      const updated = await updateProductPrice(
        product.id,
        product.optimizedPrice
      );

      if (!updated) {
        alert("Failed to update price.");
        return;
      }

      await loadProducts();

      alert("✅ Price updated successfully!");

    } catch (err) {

      console.error(err);

      alert("Something went wrong.");

    }

  }}
/>

      {/* ==========================
          Optimization Modal
      ========================== */}

      <OptimizeModal
        open={modalOpen}
        productName={selectedProduct?.name ?? ""}
        currentPrice={selectedProduct?.price ?? 0}
        suggestedPrice={result?.optimal_price ?? 0}
        predictedDemand={
          result?.simulation?.find(
            (item: any) =>
              item.price === result?.optimal_price
          )?.demand ?? 0
        }
        predictedRevenue={
          result?.expected_revenue ?? 0
        }
        loading={applying}
        onClose={() => setModalOpen(false)}
        onApply={handleApply}
      />
            {/* ==========================
          Optimization Result
      ========================== */}

      {result && (
        <div className="mt-8">
          <OptimizationResult result={result} />
        </div>
      )}

      {/* ==========================
          Monte Carlo Risk Analysis
      ========================== */}

      {result && (
        <div className="mt-8">
          <RiskCard
            avgRevenue={
              result.monte_carlo?.avg_revenue ?? 0
            }
            risk={
              result.monte_carlo?.risk ?? 0
            }
          />
        </div>
      )}

      {/* ==========================
          Demand & Revenue Simulation
      ========================== */}

      {result && (
        <div className="mt-8">
          <SimulationChart
            simulation={
              result.simulation ?? []
            }
            optimalPrice={
              result.optimal_price
            }
            expectedRevenue={
              result.expected_revenue
            }
          />
        </div>
      )}

      {/* ==========================
          Simulation Table
      ========================== */}

      {result && (
        <div className="mt-8">
          <SimulationTable
            simulation={
              result.simulation ?? []
            }
            optimalPrice={
              result.optimal_price
            }
          />
        </div>
      )}

      {/* ==========================
          Price History
      ========================== */}

      {result && (
        <div className="mt-8">
          <PriceHistoryChart
            data={
              result.simulation?.map(
                (row: any) => ({
                  date: `₹${row.price}`,
                  price: row.price,
                })
              ) ?? []
            }
          />
        </div>
      )}

      {/* ==========================
          Business Summary
      ========================== */}

      <div className="mt-8 bg-gray-900 rounded-xl p-6 shadow">

        <h2 className="text-xl font-bold mb-4">
          Business Summary
        </h2>

        <ul className="space-y-3 text-gray-300">

          <li>
            ✅ Machine learning estimates the revenue-maximizing price.
          </li>

          <li>
            ✅ Demand elasticity explains customer response to price changes.
          </li>

          <li>
            ✅ Monte Carlo simulation evaluates pricing uncertainty.
          </li>

          <li>
            ✅ Simulation compares multiple candidate prices before selecting the optimal one.
          </li>

          <li>
            ✅ Apply optimized prices after reviewing revenue, demand, and risk metrics.
          </li>

        </ul>

      </div>

    </div>
  );
}