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

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      ...form,
      price: Number(form.price),
      stock: Number(form.stock),
    };

    await onSubmit(payload);

    if (!editingProduct) {
      setForm(buildFormState(null));
    }
  };

  return (
    <div className="panel">
      <h2 className="panel-title">
        {editingProduct ? "Edit Product" : "Create Product"}
      </h2>

      <form onSubmit={handleSubmit} className="form-grid">
        <input
          className="form-input"
          name="name"
          placeholder="Name"
          value={form.name}
          onChange={handleChange}
          required
        />
        <input
          className="form-input"
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
        />
        <input
          className="form-input"
          name="price"
          type="number"
          placeholder="Price"
          value={form.price}
          onChange={handleChange}
          required
        />
        <input
          className="form-input"
          name="stock"
          type="number"
          placeholder="Stock"
          value={form.stock}
          onChange={handleChange}
          required
        />
        <input
          className="form-input"
          name="category"
          placeholder="Category"
          value={form.category}
          onChange={handleChange}
          required
        />
        <input
          className="form-input"
          name="size"
          placeholder="Size"
          value={form.size}
          onChange={handleChange}
        />
        <input
          className="form-input"
          name="color"
          placeholder="Color"
          value={form.color}
          onChange={handleChange}
        />

        <label className="checkbox-row">
          <input
            name="is_active"
            type="checkbox"
            checked={form.is_active}
            onChange={handleChange}
          />
          Active
        </label>

        <div className="button-row">
          <button className="btn btn-primary" type="submit">
            {editingProduct ? "Update" : "Create"}
          </button>

          {editingProduct && (
            <button className="btn btn-secondary" type="button" onClick={onCancelEdit}>
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
}

export default ProductForm;