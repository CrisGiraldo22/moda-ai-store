function ProductList({ products, onEdit, onDelete }) {
  if (products.length === 0) {
    return <p>No products found.</p>;
  }

  return (
    <div>
      <h2>Product List</h2>
      {products.map((product) => (
        <div
          key={product.id}
          style={{
            border: "1px solid #ccc",
            borderRadius: "8px",
            padding: "12px",
            marginBottom: "12px",
          }}
        >
          <h3>{product.name}</h3>
          <p>{product.description}</p>
          <p><strong>Price:</strong> {product.price}</p>
          <p><strong>Stock:</strong> {product.stock}</p>
          <p><strong>Category:</strong> {product.category}</p>
          <p><strong>Size:</strong> {product.size || "-"}</p>
          <p><strong>Color:</strong> {product.color || "-"}</p>
          <p><strong>Active:</strong> {product.is_active ? "Yes" : "No"}</p>

          <div style={{ display: "flex", gap: "8px" }}>
            <button onClick={() => onEdit(product)}>Edit</button>
            <button onClick={() => onDelete(product.id)}>Delete</button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ProductList;