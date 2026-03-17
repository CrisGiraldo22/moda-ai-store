import { useEffect, useState } from "react";
import ProductForm from "../components/ProductForm";
import ProductList from "../components/ProductList";
import {
  createProduct,
  deleteProduct,
  getProducts,
  updateProduct,
} from "../services/productService";

function AdminPage() {
  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const refreshProducts = async () => {
    try {
      const data = await getProducts();
      setProducts(data);
      setError("");
    } catch (err) {
      setError("Failed to load products.");
      console.error(err);
    }
  };

  useEffect(() => {
    let cancelled = false;

    async function loadInitialProducts() {
      try {
        const data = await getProducts();

        if (!cancelled) {
          setProducts(data);
          setError("");
        }
      } catch (err) {
        if (!cancelled) {
          setError("Failed to load products.");
          console.error(err);
        }
      }
    }

    loadInitialProducts();

    return () => {
      cancelled = true;
    };
  }, []);

  const handleCreateOrUpdate = async (productData) => {
    try {
      if (editingProduct) {
        await updateProduct(editingProduct.id, productData);
        setEditingProduct(null);
        setSuccess("Product updated successfully.");
      } else {
        await createProduct(productData);
        setSuccess("Product created successfully.");
      }

      setError("");
      await refreshProducts();
    } catch (err) {
      setError("Failed to save product.");
      setSuccess("");
      console.error(err);
    }
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    setSuccess("");
    setError("");
  };

  const handleDelete = async (id) => {
    const confirmed = window.confirm("Are you sure you want to delete this product?");

    if (!confirmed) {
      return;
    }

    try {
      await deleteProduct(id);
      setSuccess("Product deleted successfully.");
      setError("");
      await refreshProducts();
    } catch (err) {
      setError("Failed to delete product.");
      setSuccess("");
      console.error(err);
    }
  };

  const handleCancelEdit = () => {
    setEditingProduct(null);
    setError("");
    setSuccess("");
  };

  return (
    <div className="page-stack">
      <section className="panel">
        <h1 className="panel-title">Admin Panel</h1>
        <p className="app-subtitle">Create, edit, and delete store products.</p>
      </section>

      {error && <p className="status-message error">{error}</p>}
      {success && <p className="status-message success">{success}</p>}

      <div className="content-grid">
        <ProductForm
          key={editingProduct?.id ?? "new"}
          onSubmit={handleCreateOrUpdate}
          editingProduct={editingProduct}
          onCancelEdit={handleCancelEdit}
        />

        <ProductList
          products={products}
          onEdit={handleEdit}
          onDelete={handleDelete}
          showActions={true}
        />
      </div>
    </div>
  );
}

export default AdminPage;