import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar";
import "./CategoriesPage.css"; // Create this CSS file

const CategoriesPage = () => {
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:5000/api/products/categories/all"
        );
        setCategories(data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  const handleClick = (category) => {
    navigate(`/products/category/${encodeURIComponent(category)}`);
  };

  return (
    <div className="categories-page">
      <Navbar />
      <h2 className="categories-heading">Browse by Category</h2>
      <div className="category-cards">
        {categories.map((cat, index) => (
          <div
            key={index}
            className="category-card"
            onClick={() => handleClick(cat)}
          >
            <h3>{cat}</h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoriesPage;
