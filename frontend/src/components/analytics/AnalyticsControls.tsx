interface AnalyticsControlsProps {
  search: string;
  period: string;
  sortBy: string;

  onSearchChange: (value: string) => void;
  onPeriodChange: (value: string) => void;
  onSortChange: (value: string) => void;

  onExport: () => void;
}

export default function AnalyticsControls({
  search,
  period,
  sortBy,
  onSearchChange,
  onPeriodChange,
  onSortChange,
  onExport,
}: AnalyticsControlsProps) {
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

        {/* Time Period */}

        <select
          value={period}
          onChange={(e) => onPeriodChange(e.target.value)}
          className="bg-gray-700 rounded-lg px-4 py-3"
        >
          <option>Last 7 Days</option>
          <option>Last 30 Days</option>
          <option>Last 90 Days</option>
          <option>All Time</option>
        </select>

        {/* Sort */}

        <select
          value={sortBy}
          onChange={(e) => onSortChange(e.target.value)}
          className="bg-gray-700 rounded-lg px-4 py-3"
        >
          <option>Revenue</option>
          <option>Sales</option>
          <option>Demand</option>
          <option>Product Name</option>
        </select>

        {/* Export */}

        <button
          onClick={onExport}
          className="bg-green-600 hover:bg-green-700 rounded-lg px-4 py-3 font-semibold transition"
        >
          📥 Export Report
        </button>

      </div>

    </div>
  );
}