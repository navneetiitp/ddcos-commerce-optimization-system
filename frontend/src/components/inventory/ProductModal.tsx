import { useEffect, useState } from "react";
import type { ProductInput } from "../../types/product";

interface ProductModalProps {
  open: boolean;
  title: string;
  loading?: boolean;
  initialData?: ProductInput;
  onClose: () => void;
  onSave: (product: ProductInput) => void;
}

export default function ProductModal({
  open,
 title,
  loading = false,
  initialData,
  onClose,
  onSave,
}: ProductModalProps) {

  const [form, setForm] = useState<ProductInput>({
    name: "",
    price: 0,
    stock: 0,
  });

  const [errors, setErrors] = useState({
    name: "",
    price: "",
    stock: "",
  });

  useEffect(() => {
    if (initialData) {
      setForm(initialData);
    } else {
      setForm({
        name: "",
        price: 0,
        stock: 0,
      });
    }

    setErrors({
      name: "",
      price: "",
      stock: "",
    });

  }, [initialData, open]);

  if (!open) return null;

  const validate = () => {

    let valid = true;

    const err = {
      name: "",
      price: "",
      stock: "",
    };

    if (!form.name.trim()) {
      err.name = "Product name is required";
      valid = false;
    }

    if (form.price < 0) {
      err.price = "Price cannot be negative";
      valid = false;
    }

    if (form.stock < 0) {
      err.stock = "Stock cannot be negative";
      valid = false;
    }

    setErrors(err);

    return valid;
  };

  const handleSave = () => {

    if (!validate()) return;

    onSave(form);

  };

  return (

    <div className="fixed inset-0 bg-black/60 flex justify-center items-center z-50">

      <div className="bg-gray-800 rounded-xl w-full max-w-lg shadow-2xl">

        <div className="border-b border-gray-700 p-5">

          <h2 className="text-2xl font-bold text-white">

            {title}

          </h2>

        </div>

        <div className="p-6 space-y-5">

          <div>

            <label className="block text-sm mb-2 text-gray-300">

              Product Name

            </label>

            <input
              className="w-full bg-gray-700 rounded-lg p-3 outline-none text-white"
              value={form.name}
              onChange={(e) =>
                setForm({
                  ...form,
                  name: e.target.value,
                })
              }
            />

            {errors.name && (
              <p className="text-red-400 text-sm mt-1">

                {errors.name}

              </p>
            )}

          </div>

          <div>

            <label className="block text-sm mb-2 text-gray-300">

              Price (₹)

            </label>

            <input
              type="number"
              className="w-full bg-gray-700 rounded-lg p-3 outline-none text-white"
              value={form.price}
              onChange={(e) =>
                setForm({
                  ...form,
                  price: Number(e.target.value),
                })
              }
            />

            {errors.price && (
              <p className="text-red-400 text-sm mt-1">

                {errors.price}

              </p>
            )}

          </div>

          <div>

            <label className="block text-sm mb-2 text-gray-300">

              Stock

            </label>

            <input
              type="number"
              className="w-full bg-gray-700 rounded-lg p-3 outline-none text-white"
              value={form.stock}
              onChange={(e) =>
                setForm({
                  ...form,
                  stock: Number(e.target.value),
                })
              }
            />

            {errors.stock && (
              <p className="text-red-400 text-sm mt-1">

                {errors.stock}

              </p>
            )}

          </div>

        </div>

        <div className="flex justify-end gap-3 p-5 border-t border-gray-700">

          <button
            onClick={onClose}
            className="px-5 py-2 rounded-lg bg-gray-600 hover:bg-gray-700"
          >
            Cancel
          </button>

          <button
            onClick={handleSave}
            disabled={loading}
            className="px-5 py-2 rounded-lg bg-green-600 hover:bg-green-700 disabled:opacity-50"
          >
            {loading ? "Saving..." : "Save Product"}
          </button>

        </div>

      </div>

    </div>

  );

}