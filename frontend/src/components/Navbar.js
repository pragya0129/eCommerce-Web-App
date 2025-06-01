import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  const [isNavbarExpanded, setNavbarExpanded] = useState(false);
  const navigate = useNavigate();

  const toggleNavbar = () => {
    setNavbarExpanded((prev) => !prev);
  };

  const logoutHandler = () => {
    localStorage.removeItem("userInfo");
    navigate("/login");
  };

  return (
    <>
      <nav className="navbar">
        <div className="navbar-left">
          <Link to="/" className="navbar-logo">
            Logo
          </Link>
          <Link to="/categories" className="navbar-link">
            Categories
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
        <div className="hamburger" onClick={toggleNavbar}>
          ☰
        </div>
      </nav>

      {isNavbarExpanded && (
        <div className="navbar-expanded">
          <button className="close-btn" onClick={toggleNavbar}>
            ×
          </button>
          <Link to="/" className="navbar-link" onClick={toggleNavbar}>
            Home
          </Link>
          <Link to="/cart" className="navbar-link" onClick={toggleNavbar}>
            Cart
          </Link>
          <Link to="/orders" className="navbar-link" onClick={toggleNavbar}>
            Orders
          </Link>
          <Link to="/profile" className="navbar-link" onClick={toggleNavbar}>
            Profile
          </Link>
          <button
            onClick={() => {
              toggleNavbar();
              logoutHandler();
            }}
            className="navbar-logout"
          >
            Logout
          </button>
        </div>
      )}
    </>
  );
};

export default Navbar;
