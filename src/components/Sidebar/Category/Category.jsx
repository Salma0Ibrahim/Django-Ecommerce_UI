import React, { useState, useEffect } from "react";
import "./Category.css";
import Input from "../../Input";

function Category({ handleChange }) {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    // Fetch categories from API
    fetch("http://127.0.0.1:8000/categories/")
      .then((response) => response.json())
      .then((data) => setCategories(data))
      .catch((error) => console.error("Error fetching categories:", error));
  }, []);

  return (
    <div>
      <h2 className="sidebar-title">Category</h2>

      <div>
        <label className="sidebar-label-container">
          <input onChange={handleChange} type="radio" value="" name="test" />
          <span className="checkmark"></span>All
        </label>
        {categories.map((category) => (
          <Input
            key={category.id} // Assuming each category has a unique id
            handleChange={handleChange}
            value={category.name}
            title={category.name}
            name="test"
            color={category.color}
          />
        ))}
      </div>
    </div>
  );
}

export default Category;
