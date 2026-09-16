import { useEffect, useMemo, useState } from "react";

import type { Product, ProductInput } from "../types/product";

import {
  getProducts,
  addProduct,
  updateProduct,
  deleteProduct,
} from "../services/product";

import InventoryStats from "../components/inventory/InventoryStats";
import InventoryControls from "../components/inventory/InventoryControls";
import InventoryTable from "../components/inventory/InventoryTable";
import ProductModal from "../components/inventory/ProductModal";
import DeleteModal from "../components/inventory/DeleteModal";

export default function Inventory() {

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [sortBy, setSortBy] = useState("Name");

  const [lastUpdated, setLastUpdated] = useState("");

  const [modalOpen, setModalOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);

  const [saving, setSaving] = useState(false);

  const [editingProduct, setEditingProduct] =
    useState<Product | null>(null);

  const [deleteProductItem, setDeleteProductItem] =
    useState<Product | null>(null);

  const loadProducts = async () => {

    setLoading(true);

    try {

      const res = await getProducts();

      setProducts(Array.isArray(res) ? res : []);

      setLastUpdated(
        new Date().toLocaleString()
      );

    } finally {

      setLoading(false);

    }

  };

  useEffect(() => {

    loadProducts();

    const interval = setInterval(
      loadProducts,
      5000
    );

    return () => clearInterval(interval);

  }, []);

  const totalProducts = products.length;

  const averagePrice =
    products.length === 0
      ? 0
      : products.reduce(
          (sum, p) => sum + p.price,
          0
        ) / products.length;

  const lowStock =
    products.filter(
      (p) =>
        p.stock > 0 &&
        p.stock <= 10
    ).length;

  const outOfStock =
    products.filter(
      (p) => p.stock === 0
    ).length;

  const filteredProducts =
    useMemo(() => {

      let data = [...products];

      if (search.trim()) {

        data = data.filter((p) =>
          p.name
            .toLowerCase()
            .includes(
              search.toLowerCase()
            )
        );

      }

      switch (filter) {

        case "In Stock":

          data = data.filter(
            (p) => p.stock > 30
          );

          break;

        case "Limited":

          data = data.filter(
            (p) =>
              p.stock > 10 &&
              p.stock <= 30
          );

          break;

        case "Low Stock":

          data = data.filter(
            (p) => p.stock <= 10
          );

          break;

      }

      switch (sortBy) {

        case "Price":

          data.sort(
            (a, b) =>
              b.price - a.price
          );

          break;

        case "Stock":

          data.sort(
            (a, b) =>
              b.stock - a.stock
          );

          break;

        default:

          data.sort((a, b) =>
            a.name.localeCompare(
              b.name
            )
          );

      }

      return data;

    }, [
      products,
      search,
      filter,
      sortBy,
    ]);

  async function handleSave(
    product: ProductInput
  ) {

    setSaving(true);

    try {

      if (editingProduct) {

        await updateProduct(
          editingProduct.id,
          product
        );

      } else {

        await addProduct(product);

      }

      setModalOpen(false);

      setEditingProduct(null);

      await loadProducts();

    } finally {

      setSaving(false);

    }

  }

  async function handleDelete() {

    if (!deleteProductItem)
      return;

    await deleteProduct(
      deleteProductItem.id
    );

    setDeleteOpen(false);

    setDeleteProductItem(null);

    await loadProducts();

  }
    return (
    <div className="p-6 text-white">

      {/* Header */}
      <h1 className="text-3xl font-bold">
        Inventory Management
      </h1>

      <p className="text-gray-400 mb-2">
        Monitor stock levels and manage inventory efficiently.
      </p>

      <p className="text-green-400 text-sm">
        ● Live Inventory
      </p>

      <p className="text-xs text-gray-500 mb-6">
        Last Updated: {lastUpdated}
      </p>

      {/* Statistics */}
      <InventoryStats
        totalProducts={totalProducts}
        averagePrice={averagePrice}
        lowStock={lowStock}
        outOfStock={outOfStock}
      />

      {/* Search / Filter / Sort */}
      <InventoryControls
        search={search}
        filter={filter}
        sortBy={sortBy}
        onSearchChange={setSearch}
        onFilterChange={setFilter}
        onSortChange={setSortBy}
        onAddProduct={() => {
          setEditingProduct(null);
          setModalOpen(true);
        }}
      />

      {/* Inventory Table */}
      <InventoryTable
        products={filteredProducts}
        loading={loading}
        lastUpdated={lastUpdated}
        onEdit={(product) => {
          setEditingProduct(product);
          setModalOpen(true);
        }}
        onDelete={(product) => {
          setDeleteProductItem(product);
          setDeleteOpen(true);
        }}
      />

      {/* Product Modal */}
      <ProductModal
        open={modalOpen}
        title={
          editingProduct
            ? "Edit Product"
            : "Add Product"
        }
        loading={saving}
        initialData={
          editingProduct
            ? {
                name: editingProduct.name,
                price: editingProduct.price,
                stock: editingProduct.stock,
              }
            : undefined
        }
        onClose={() => {
          setModalOpen(false);
          setEditingProduct(null);
        }}
        onSave={handleSave}
      />

      {/* Delete Modal */}
      <DeleteModal
        open={deleteOpen}
        productName={
          deleteProductItem?.name ?? ""
        }
        loading={saving}
        onClose={() => {
          setDeleteOpen(false);
          setDeleteProductItem(null);
        }}
        onDelete={handleDelete}
      />

      {/* Footer */}
      <div className="mt-6 bg-gray-900 rounded-xl p-5">

        <div className="flex justify-between flex-wrap gap-4">

          <p>
            Showing{" "}
            <span className="font-bold text-green-400">
              {filteredProducts.length}
            </span>{" "}
            products
          </p>

          <p className="text-gray-400">
            Inventory updates automatically every 5 seconds.
          </p>

        </div>

      </div>

    </div>
  );
}