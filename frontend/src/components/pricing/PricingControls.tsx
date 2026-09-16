interface PricingControlsProps {
  search: string;
  sortBy: string;
  optimizationFilter: string;

  onSearchChange: (value: string) => void;
  onSortChange: (value: string) => void;
  onFilterChange: (value: string) => void;

  onOptimizeAll: () => void;
}

export default function PricingControls({
  search,
  sortBy,
  optimizationFilter,
  onSearchChange,
  onSortChange,
  onFilterChange,
  onOptimizeAll,
}: PricingControlsProps) {
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

        {/* Optimization Filter */}

        <select
          value={optimizationFilter}
          onChange={(e) => onFilterChange(e.target.value)}
          className="bg-gray-700 rounded-lg px-4 py-3"
        >
          <option>All Products</option>
          <option>Optimized</option>
          <option>Not Optimized</option>
        </select>

        {/* Sort */}

        <select
          value={sortBy}
          onChange={(e) => onSortChange(e.target.value)}
          className="bg-gray-700 rounded-lg px-4 py-3"
        >
          <option>Name</option>
          <option>Price</option>
          <option>Revenue</option>
          <option>Demand</option>
        </select>

        {/* Optimize All */}

        <button
          onClick={onOptimizeAll}
          className="bg-green-600 hover:bg-green-700 rounded-lg px-4 py-3 font-semibold transition"
        >
          ⚡ Optimize All
        </button>

      </div>

    </div>
  );
}