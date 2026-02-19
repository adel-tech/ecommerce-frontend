import { useEffect, useState } from "react";
import axios from "axios";

import SearchBar from "../components/SearchBar";
import CategoryFilter from "../components/CategoryFilter";
import ProductGrid from "../components/ProductGrid";
import ProductPagination from "../components/ProductPagination";

import "../styles/components.css";
import "../styles/global.css";

function Home({ onAddToCart }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [showFilters, setShowFilters] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const pageSize = 8;

  // Fetch products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get(
          "https://ecommerce-backend-zh5i.onrender.com/api/products"
        );
        setProducts(data);
      } catch (err) {
        console.error("Error fetching products:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Debounced search
  useEffect(() => {
    const timer = setTimeout(() => setDebouncedSearch(searchQuery), 500);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  // Categories
  const categories = Array.isArray(products)
    ? [...new Set(products.map((p) => p.category).filter(Boolean))]
    : [];

  // Filter products
  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name
      .toLowerCase()
      .includes(debouncedSearch.toLowerCase());
    const matchesCategory =
      selectedCategories.length === 0 || selectedCategories.includes(product.category);
    return matchesSearch && matchesCategory;
  });

  // Pagination slice
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  // Toggle category
  const toggleCategory = (category) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
    setCurrentPage(1); // reset page when filter changes
  };

  return (
    <div className="home-wrapper">
      <h2 className="page-title">Our Products</h2>

      <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

      <button
        className="filter-toggle"
        onClick={() => setShowFilters(!showFilters)}
      >
        {showFilters ? "Hide Filters" : "Show Filters"}
      </button>

      <div className="products-layout">
        <CategoryFilter
          categories={categories}
          selectedCategories={selectedCategories}
          toggleCategory={toggleCategory}
          showFilters={showFilters}
        />

        <ProductGrid
          products={paginatedProducts}
          onAddToCart={onAddToCart}
          loading={loading}
        />
      </div>

      <ProductPagination
        totalItems={filteredProducts.length}
        pageSize={pageSize}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
      />
    </div>
  );
}

export default Home;
