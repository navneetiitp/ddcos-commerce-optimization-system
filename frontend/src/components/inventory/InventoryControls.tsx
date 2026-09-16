interface InventoryControlsProps {
  search: string;
  filter: string;
  sortBy: string;

  onSearchChange: (value: string) => void;
  onFilterChange: (value: string) => void;
  onSortChange: (value: string) => void;

  onAddProduct: () => void;
}

export default function InventoryControls({
  search,
  filter,
  sortBy,
  onSearchChange,
  onFilterChange,
  onSortChange,
  onAddProduct,
}: InventoryControlsProps) {
  return (
    <div className="bg-gray-800 rounded-xl shadow p-5 mb-8">

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">

        {/* Search */}

        <input
          type="text"
          placeholder="🔍 Search Product..."
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          className="bg-gray-700 rounded-lg px-4 py-3 outline-none text-white"
        />

        {/* Filter */}

        <select
          value={filter}
          onChange={(e) => onFilterChange(e.target.value)}
          className="bg-gray-700 rounded-lg px-4 py-3"
        >
          <option>All</option>
          <option>In Stock</option>
          <option>Limited</option>
          <option>Low Stock</option>
        </select>

        {/* Sort */}

        <select
          value={sortBy}
          onChange={(e) => onSortChange(e.target.value)}
          className="bg-gray-700 rounded-lg px-4 py-3"
        >
          <option>Name</option>
          <option>Price</option>
          <option>Stock</option>
        </select>

        {/* Add Product */}

        <button
          onClick={onAddProduct}
          className="bg-green-600 hover:bg-green-700 rounded-lg px-4 py-3 font-semibold transition"
        >
          + Add Product
        </button>

      </div>

    </div>
  );
}