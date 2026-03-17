import { useState } from "react";
import Carousel from "../components/Carousel";
import ProductList from "../components/ProductList";
import SearchBar from "../components/SearchBar";
import { searchProducts } from "../services/productService";

function HomePage() {
  const [results, setResults] = useState([]);
  const [message, setMessage] = useState("");

  const handleSearch = async (query) => {
    if (!query) {
      setResults([]);
      setMessage("Please enter a product id or product name.");
      return;
    }

    try {
      const data = await searchProducts(query);
      setResults(data);

      if (data.length === 0) {
        setMessage("No matching products found.");
      } else {
        setMessage(`Found ${data.length} matching product(s).`);
      }
    } catch (error) {
      console.error(error);
      setMessage("Search failed.");
      setResults([]);
    }
  };

  return (
    <div className="page-stack">
      <section className="hero-section panel">
        <h1 className="app-title">Welcome to Moda AI Store</h1>
        <p className="app-subtitle">
          Explore fashion products, search smarter, and manage your store with a modern full stack application.
        </p>
      </section>

      <Carousel />

      <section className="panel">
        <h2 className="panel-title">Search Products</h2>
        <SearchBar onSearch={handleSearch} />
        {message && <p className="search-message">{message}</p>}
      </section>

      <ProductList products={results} showActions={false} />
    </div>
  );
}

export default HomePage;