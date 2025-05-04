import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./DashboardPage.css";

const DashboardPage = () => {
  const [isNavbarExpanded, setNavbarExpanded] = useState(false);
  const navigate = useNavigate();

  // Toggle Navbar
  const toggleNavbar = () => {
    setNavbarExpanded(!isNavbarExpanded);
  };

  // Logout handler
  const logoutHandler = () => {
    localStorage.removeItem("userInfo");
    navigate("/login");
  };

  return (
    <div className="dashboard">
      {/* Navbar */}
      <nav className="navbar">
        <div className="navbar-left">
          <Link to="/" className="navbar-logo">
            Logo
          </Link>
          <Link to="/cart" className="navbar-link">
            Cart
          </Link>
          <Link to="/orders" className="navbar-link">
            Orders
          </Link>
          <Link to="/profile" className="navbar-link">
            Profile
          </Link>
        </div>
        <div className="navbar-right">
          <button onClick={logoutHandler} className="navbar-logout">
            Logout
          </button>
        </div>
        {/* Hamburger Menu for Mobile */}
        <div className="hamburger" onClick={toggleNavbar}>
          ☰
        </div>
      </nav>

      {/* Navbar Expanded for Mobile */}
      {isNavbarExpanded && (
        <div className="navbar-expanded">
          <Link to="/" className="navbar-link">
            Home
          </Link>
          <Link to="/cart" className="navbar-link">
            Cart
          </Link>
          <Link to="/orders" className="navbar-link">
            Orders
          </Link>
          <Link to="/profile" className="navbar-link">
            Profile
          </Link>
          <button onClick={logoutHandler} className="navbar-logout">
            Logout
          </button>
        </div>
      )}

      {/* Image Carousel */}
      <div className="carousel">
        <img
          src="https://via.placeholder.com/1500x500?text=Image+1"
          alt="Carousel Image 1"
        />
        <img
          src="https://via.placeholder.com/1500x500?text=Image+2"
          alt="Carousel Image 2"
        />
        <img
          src="https://via.placeholder.com/1500x500?text=Image+3"
          alt="Carousel Image 3"
        />
        <img
          src="https://via.placeholder.com/1500x500?text=Image+4"
          alt="Carousel Image 4"
        />
        <img
          src="https://via.placeholder.com/1500x500?text=Image+5"
          alt="Carousel Image 5"
        />
      </div>

      {/* Product Cards */}
      <div className="product-cards">
        <div className="product-card">
          <img src="https://via.placeholder.com/300x300" alt="Product" />
          <h3>Product Name</h3>
          <p>Product Description</p>
          <button>Add to Cart</button>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
