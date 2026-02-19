import React from "react";
import ProductCard from "./ProductCard";

function ProductGrid({ products, onAddToCart, loading }) {
  return (
    <div className="products-grid">
      {loading
        ? Array.from({ length: 8 }).map((_, idx) => (
            <div key={idx} className="skeleton-card" />
          ))
        : products.map((product) => (
            <ProductCard
              key={product._id}
              product={product}
              onAddToCart={onAddToCart}
            />
          ))}
    </div>
  );
}

export default ProductGrid;
