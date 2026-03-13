import { useState } from "react";

const buildFormState = (product) => ({
  name: product?.name ?? "",
  description: product?.description ?? "",
  price: product?.price ?? "",
  stock: product?.stock ?? "",
  category: product?.category ?? "",
  size: product?.size ?? "",
  color: product?.color ?? "",
  is_active: product?.is_active ?? true,
});

function ProductForm({ onSubmit, editingProduct, onCancelEdit }) {
  const [form, setForm] = useState(() => buildFormState(editingProduct));

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const payload = {
      ...form,
      price: Number(form.price),
      stock: Number(form.stock),
    };

    onSubmit(payload);
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: "grid", gap: "10px" }}>
      <h2>{editingProduct ? "Edit Product" : "Create Product"}</h2>

      <input
        name="name"
        placeholder="Name"
        value={form.name}
        onChange={handleChange}
        required
      />
      <input
        name="description"
        placeholder="Description"
        value={form.description}
        onChange={handleChange}
      />
      <input
        name="price"
        type="number"
        placeholder="Price"
        value={form.price}
        onChange={handleChange}
        required
      />
      <input
        name="stock"
        type="number"
        placeholder="Stock"
        value={form.stock}
        onChange={handleChange}
        required
      />
      <input
        name="category"
        placeholder="Category"
        value={form.category}
        onChange={handleChange}
        required
      />
      <input
        name="size"
        placeholder="Size"
        value={form.size}
        onChange={handleChange}
      />
      <input
        name="color"
        placeholder="Color"
        value={form.color}
        onChange={handleChange}
      />

      <label>
        <input
          name="is_active"
          type="checkbox"
          checked={form.is_active}
          onChange={handleChange}
        />
        Active
      </label>

      <div style={{ display: "flex", gap: "8px" }}>
        <button type="submit">
          {editingProduct ? "Update" : "Create"}
        </button>

        {editingProduct && (
          <button type="button" onClick={onCancelEdit}>
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}

export default ProductForm;