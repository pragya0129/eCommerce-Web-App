import React, { useState } from "react";
import axios from "axios";
import "./AdminPanel.css";
import Navbar from "../components/Navbar";

const AdminPanel = () => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [productData, setProductData] = useState({
    name: "",
    description: "",
    image: "",
    price: "",
    category: "",
  });

  const [message, setMessage] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProductData({ ...productData, [name]: value });
  };

  const handleAddProduct = async () => {
    try {
      const userInfo = JSON.parse(localStorage.getItem("userInfo"));
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`, // if you're using JWT
        },
      };

      const { data } = await axios.post(
        "http://localhost:5000/api/products",
        productData,
        config
      );

      setMessage("✅ Product added successfully!");
      console.log("Added product:", data);
    } catch (error) {
      setMessage(
        "❌ Failed to add product: " + error.response?.data?.message ||
          error.message
      );
    } finally {
      setProductData({
        name: "",
        description: "",
        image: "",
        price: "",
        category: "",
      });
      setShowAddModal(false);
      setTimeout(() => setMessage(""), 3000); // clear message after 3 sec
    }
  };

  const handleDeleteProduct = () => {
    // Delete logic will go here
    setShowDeleteModal(false);
  };

  return (
    <div className="admin-panel">
      <Navbar />
      <h2>Welcome, Admin</h2>

      {message && <p className="status-msg">{message}</p>}

      <div className="admin-actions">
        <button onClick={() => setShowAddModal(true)} className="admin-btn add">
          Add Product
        </button>
        <button
          onClick={() => setShowDeleteModal(true)}
          className="admin-btn delete"
        >
          Delete Product
        </button>
      </div>

      {/* Add Product Modal */}
      {showAddModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>Add Product</h3>
            <input
              type="text"
              name="name"
              placeholder="Product Name"
              value={productData.name}
              onChange={handleInputChange}
            />
            <input
              type="text"
              name="description"
              placeholder="Description"
              value={productData.description}
              onChange={handleInputChange}
            />
            <input
              type="text"
              name="image"
              placeholder="Image URL"
              value={productData.image}
              onChange={handleInputChange}
            />
            <input
              type="number"
              name="price"
              placeholder="Price"
              value={productData.price}
              onChange={handleInputChange}
            />
            <input
              type="text"
              name="category"
              placeholder="Category"
              value={productData.category}
              onChange={handleInputChange}
            />
            <div className="modal-buttons">
              <button onClick={handleAddProduct}>Add</button>
              <button onClick={() => setShowAddModal(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Product Modal */}
      {showDeleteModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>Delete Product</h3>
            <input
              type="text"
              name="name"
              placeholder="Enter Product Name to Delete"
              onChange={handleInputChange}
            />
            <div className="modal-buttons">
              <button onClick={handleDeleteProduct}>Delete</button>
              <button onClick={() => setShowDeleteModal(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPanel;
