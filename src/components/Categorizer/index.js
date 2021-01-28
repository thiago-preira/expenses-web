import React from "react";
import "./styles.css";
function Categorizer({ transaction, categories, onSelect }) {
  const selectedCategory = transaction.category?.name;
  return (
    <div className="category-list">
      {categories.map((category) => (
        <button
          key={category.id}
          className={`category-item ${
            category.name === selectedCategory ? "selected" : "none"
          }`}
          onClick={() => onSelect(category)}
        >
          {category.name}
        </button>
      ))}
    </div>
  );
}

export default Categorizer;
