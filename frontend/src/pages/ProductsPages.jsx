import { useEffect, useState } from "react";
import ProductList from "../components/ProductList";
import { getProducts } from "../services/productService";

function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState("");

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

  return (
    <div className="page-stack">
      <section className="panel">
        <h1 className="panel-title">All Products</h1>
        <p className="app-subtitle">Browse the complete product catalog.</p>
      </section>

      {error && <p className="status-message error">{error}</p>}

      <ProductList products={products} showActions={false} />
    </div>
  );
}

export default ProductsPage;