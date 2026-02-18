import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function ProductDetails({ onAddToCart }) {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    axios
      .get(`https://ecommerce-backend-zh5i.onrender.com/api/products/${id}`)
      .then((res) => setProduct(res.data))
      .catch((err) => console.error("Failed to fetch product:", err));
  }, [id]);

  if (!product) return <p>Loading...</p>;

  return (
    <div style={{ maxWidth: "600px", margin: "40px auto", fontFamily: "Segoe UI, sans-serif" }}>
      <button
        style={{ marginBottom: "20px", cursor: "pointer" }}
        onClick={() => window.history.back()}
      >
        ← Back
      </button>
      <img
        src={product.image}
        alt={product.name}
        style={{ width: "100%", height: "300px", objectFit: "cover", borderRadius: "8px" }}
      />
      <h2 style={{ marginTop: "20px" }}>{product.name}</h2>
      <p style={{ fontSize: "16px", color: "#555" }}>{product.description}</p>
      <p style={{ fontWeight: "600", margin: "10px 0" }}>₹{product.price}</p>
      <button
        onClick={() => onAddToCart(product)}
        style={{
          padding: "10px",
          width: "100%",
          backgroundColor: "#000",
          color: "#fff",
          border: "none",
          cursor: "pointer",
          borderRadius: "5px",
        }}
      >
        Add to Cart
      </button>
    </div>
  );
}

export default ProductDetails;
