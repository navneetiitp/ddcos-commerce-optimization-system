interface DeleteModalProps {
  open: boolean;
  productName: string;
  loading?: boolean;
  onClose: () => void;
  onDelete: () => void;
}

export default function DeleteModal({
  open,
  productName,
  loading = false,
  onClose,
  onDelete,
}: DeleteModalProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">

      <div className="bg-gray-800 rounded-xl shadow-xl w-full max-w-md">

        {/* Header */}

        <div className="flex justify-between items-center border-b border-gray-700 p-5">

          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-red-500"><path d="M3 6h18"/><path d="M8 6V4h8v2"/><path d="M19 6l-1 14H6L5 6"/><path d="M10 11v5"/><path d="M14 11v5"/></svg>
            Delete Product
          </h2>

          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
          </button>

        </div>

        {/* Body */}

        <div className="p-6">

          <p className="text-gray-300 mb-2">

            Are you sure you want to delete

          </p>

          <p className="font-bold text-red-400 text-lg">

            {productName} ?

          </p>

          <p className="text-gray-500 text-sm mt-4">

            This action cannot be undone.

          </p>

        </div>

        {/* Footer */}

        <div className="flex justify-end gap-3 border-t border-gray-700 p-5">

          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-gray-600 hover:bg-gray-700"
          >
            Cancel
          </button>

          <button
            onClick={onDelete}
            disabled={loading}
            className="px-4 py-2 rounded-lg bg-red-600 hover:bg-red-700 disabled:opacity-50"
          >
            {loading ? "Deleting..." : "Delete"}
          </button>

        </div>

      </div>

    </div>
  );
}