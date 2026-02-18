import { useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "../components/ProductCard";
import "../styles/components.css";
import "../styles/global.css";

function Home({ onAddToCart }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    axios
      .get("https://ecommerce-backend-zh5i.onrender.com/api/products")
      .then((res) => {
        setProducts(res.data);
      })
      .catch((err) => {
        console.error("Error fetching products:", err);
      })
      .finally(() => {
      setLoading(false);   // 🔥 THIS MUST BE HERE
    });
  }, []);

  return (
    <div className="home-wrapper">
      <h2 className="page-title">Our Products</h2>

      <div className="products-grid">
        {loading
  ? Array.from({ length: 8 }).map((_, index) => (
      <div key={index} className="skeleton-card" />
    ))
  : products.map((product) => (
      <ProductCard
        key={product._id}
        product={product}
        onAddToCart={onAddToCart}
      />
    ))}
      </div>
    </div>
  );
}

export default Home;
