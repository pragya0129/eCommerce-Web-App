import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const loginHandler = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        "http://localhost:5000/api/users/login",
        {
          email,
          password,
        }
      );
      console.log(data);

      // Save user info to localStorage
      localStorage.setItem("userInfo", JSON.stringify(data));

      // Redirect based on admin status
      if (data.isAdmin) {
        navigate("/adminpanel");
      } else {
        navigate("/dashboard");
      }
    } catch (err) {
      alert("Login failed: " + (err.response?.data?.message || err.message));
    }
  };

  return (
    <form onSubmit={loginHandler}>
      <h2>Login</h2>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        required
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        required
      />
      <button type="submit">Login</button>
      <p>
        Don't have an account? <Link to="/signup">Register here</Link>
      </p>{" "}
      {/* Correct usage of Link */}
    </form>
  );
};

export default LoginPage;
