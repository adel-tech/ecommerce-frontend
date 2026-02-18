import { useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "../components/ProductCard";
import "../styles/components.css";
import "../styles/global.css";

function Home({ onAddToCart }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [showFilters, setShowFilters] = useState(false);

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

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchQuery);
    }, 500);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  const categories = [...new Set(products.map((p) => p.category))];

  const handleCategoryChange = (category) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  const filteredProducts = products.filter((product) => {
  const matchesSearch = product.name
    .toLowerCase()
    .includes(debouncedSearch.toLowerCase());


  const matchesCategory =
    selectedCategories.length === 0 ||
    selectedCategories.includes(product.category);

  return matchesSearch && matchesCategory;
});

  return (
    <div className="home-wrapper">
      <h2 className="page-title">Our Products</h2>

      <div className="search-container">
  <input
    type="text"
    placeholder="Search products..."
    value={searchQuery}
    onChange={(e) => setSearchQuery(e.target.value)}
    className="search-input"
  />
</div>

<button 
  className="filter-toggle"
  onClick={() => setShowFilters(!showFilters)}
>
  {showFilters ? "Hide Filters" : "Show Filters"}
</button>


 {/* PRODUCTS LAYOUT */}
<div className="products-layout">

  {/* LEFT SIDEBAR */}
  <div className={`filters ${showFilters ? "active" : ""}`}>
    <h3>Categories</h3>

    {categories.map((category) => (
      <label key={category} className="filter-item">
        <input
          type="checkbox"
          checked={selectedCategories.includes(category)}
          onChange={() => handleCategoryChange(category)}
        />
        {category}
      </label>
    ))}
  </div>

  {/* RIGHT PRODUCT GRID */}
  <div className="products-grid">
    {loading ? (
      Array.from({ length: 8 }).map((_, index) => (
        <div key={index} className="skeleton-card" />
      ))
    ) : (
      filteredProducts.map((product) => (
        <ProductCard
          key={product._id}
          product={product}
          onAddToCart={onAddToCart}
        />
      ))
    )}
  </div>

</div>


</div>
  );
}

export default Home;
