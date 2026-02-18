import { useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "../components/ProductCard";

function Home({ onAddToCart }) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios
      .get("https://ecommerce-backend-zh5i.onrender.com/api/products")
      .then((res) => {
        console.log("res", res)
        setProducts(res.data);
      })
      .catch((err) => {
        console.error("Error fetching products:", err);
      });
  }, []);

  return (
  <div
    style={{
      maxWidth: "1200px",
      margin: "40px auto",
      padding: "0 20px",
      fontFamily: "Segoe UI, sans-serif",
    }}
  >
    <h2
      style={{
        fontSize: "28px",
        marginBottom: "30px",
        fontWeight: "600",
        textAlign: "center",
      }}
    >
      Our Products
    </h2>

    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
        gap: "25px",
      }}
    >
      {products.map((product) => (
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
