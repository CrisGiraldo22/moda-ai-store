function ProductList({ products, onEdit, onDelete, showActions = true }) {
  return (
    <div className="panel">
      <h2 className="panel-title">Product List</h2>

      {products.length === 0 ? (
        <p className="empty-state">No products found.</p>
      ) : (
        <div className="product-list">
          {products.map((product) => (
            <div key={product.id} className="product-card">
              <h3>{product.name}</h3>
              <p className="product-description">
                {product.description || "No description provided."}
              </p>

              <div className="product-meta">
                <p><strong>ID:</strong> {product.id}</p>
                <p><strong>Price:</strong> {product.price}</p>
                <p><strong>Stock:</strong> {product.stock}</p>
                <p><strong>Category:</strong> {product.category}</p>
                <p><strong>Size:</strong> {product.size || "-"}</p>
                <p><strong>Color:</strong> {product.color || "-"}</p>
                <p><strong>Active:</strong> {product.is_active ? "Yes" : "No"}</p>
              </div>

              {showActions && (
                <div className="button-row">
                  <button className="btn btn-warning" onClick={() => onEdit(product)}>
                    Edit
                  </button>
                  <button className="btn btn-danger" onClick={() => onDelete(product.id)}>
                    Delete
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ProductList;