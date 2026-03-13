import { useEffect, useState } from "react";
import ProductForm from "./components/ProductForm";
import ProductList from "./components/ProductList";
import {
  createProduct,
  deleteProduct,
  getProducts,
  updateProduct,
} from "./services/productService";

function App() {
  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);
  const [error, setError] = useState("");

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

    async function fetchProducts() {
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

    fetchProducts();

    return () => {
      cancelled = true;
    };
  }, []);

  const handleCreateOrUpdate = async (productData) => {
    try {
      if (editingProduct) {
        await updateProduct(editingProduct.id, productData);
        setEditingProduct(null);
      } else {
        await createProduct(productData);
      }

      await refreshProducts();
    } catch (err) {
      setError("Failed to save product.");
      console.error(err);
    }
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
  };

  const handleDelete = async (id) => {
    try {
      await deleteProduct(id);
      await refreshProducts();
    } catch (err) {
      setError("Failed to delete product.");
      console.error(err);
    }
  };

  const handleCancelEdit = () => {
    setEditingProduct(null);
  };

  return (
    <div style={{ maxWidth: "900px", margin: "0 auto", padding: "24px", fontFamily: "Arial" }}>
      <h1>Moda AI Store</h1>
      <p>React frontend connected to FastAPI CRUD.</p>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <ProductForm
        key={editingProduct?.id ?? "new"}
        onSubmit={handleCreateOrUpdate}
        editingProduct={editingProduct}
        onCancelEdit={handleCancelEdit}
      />

      <hr style={{ margin: "24px 0" }} />

      <ProductList
        products={products}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  );
}

export default App;