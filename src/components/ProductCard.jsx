import { useNavigate } from "react-router-dom";
import "../styles/components.css";

function ProductCard({ product, onAddToCart }) {
  const navigate = useNavigate();

  return (
    <div className="product-card">
      <img
        src={product.image}
        alt={product.name}
        className="product-image"
      />

      <h3 className="product-title">
        {product.name}
      </h3>

      <p className="product-description">
        {product.description}
      </p>

      <p className="product-price">
        ₹{product.price}
      </p>

      <button
        className="button-primary"
        onClick={() => onAddToCart(product)}
      >
        Add to Cart
      </button>

      <button
        className="button-secondary"
        onClick={() => navigate(`/products/${product._id}`)}
      >
        View More Details
      </button>
    </div>
  );
}

export default ProductCard;
