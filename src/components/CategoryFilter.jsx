import React from "react";
import "../styles/components.css";

function CategoryFilter({ name, categories, selectedCategories, toggleCategory, showFilters }) {
  return (
    <div className={`filters ${showFilters ? "active" : ""}`}>
      <h3>{name}</h3>
      {categories.map((category) => (
        <label key={category} className="filter-item">
          <input
            type="checkbox"
            checked={selectedCategories.includes(category)}
            onChange={() => toggleCategory(category)}
          />
          {category}
        </label>
      ))}
    </div>
  );
}

export default CategoryFilter;
