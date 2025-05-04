import React from "react";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();

  // Log out function
  const logoutHandler = () => {
    localStorage.removeItem("userInfo"); // Remove user info from local storage
    navigate("/login"); // Redirect to login page
  };

  return (
    <div>
      <h2>Welcome to the HomePage</h2>
      <button onClick={logoutHandler}>Sign Out</button>
    </div>
  );
};

export default HomePage;
