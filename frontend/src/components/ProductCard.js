import React from "react";

const ProductCard = ({ product }) => {
  return (
    <div style={styles.card}>
      <img src={product.image} alt={product.title} style={styles.image} />
      <h3>{product.title}</h3>
      <p>₹{product.price}</p>
      <p style={{ fontSize: "0.9rem" }}>
        {product.description.slice(0, 80)}...
      </p>
    </div>
  );
};

const styles = {
  card: {
    border: "1px solid #ddd",
    borderRadius: "10px",
    padding: "1rem",
    width: "250px",
    backgroundColor: "#f9f9f9",
  },
  image: {
    width: "100%",
    height: "200px",
    objectFit: "contain",
    marginBottom: "1rem",
  },
};

export default ProductCard;
