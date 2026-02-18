import { useNavigate } from "react-router-dom";

function ProductCard({ product, onAddToCart }) {
  const navigate = useNavigate();

  return (
    <div style={cardStyle}>
      <img
        src={product.image}
        alt={product.name}
        style={{ width: "100%", height: "150px", objectFit: "cover", borderRadius: "5px" }}
      />
      <h3 style={{ margin: "10px 0 5px 0" }}>{product.name}</h3>
      <p style={{ fontSize: "14px", color: "#555", height: "40px", overflow: "hidden" }}>
        {product.description}
      </p>
      <p style={{ fontWeight: "600", marginBottom: "10px" }}>₹{product.price}</p>

      <button style={buttonStyle} onClick={() => onAddToCart(product)}>
        Add to Cart
      </button>

      <button
        style={{ ...buttonStyle, backgroundColor: "#555", marginTop: "5px" }}
        onClick={() => navigate(`/products/${product._id}`)}
      >
        View More Details
      </button>
    </div>
  );
}

const cardStyle = {
  border: "1px solid #ddd",
  padding: "15px",
  borderRadius: "8px",
  boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
};

const buttonStyle = {
  padding: "10px",
  width: "100%",
  backgroundColor: "#000",
  color: "#fff",
  border: "none",
  cursor: "pointer",
  borderRadius: "5px",
};

export default ProductCard;
