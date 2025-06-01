import React, { useState } from "react";
import ProductModal from "./ProductModal";

const ProductCard = ({ product }) => {
  const [showModal, setShowModal] = useState(false);

  const handleClick = () => setShowModal(true);
  const handleClose = () => setShowModal(false);

  return (
    <>
      <div style={styles.card} onClick={handleClick}>
        <img src={product.image} alt={product.name} style={styles.image} />
        <h3>{product.name}</h3>
        <p>₹{product.price}</p>
      </div>

      {showModal && <ProductModal product={product} onClose={handleClose} />}
    </>
  );
};

const styles = {
  card: {
    border: "1px solid #ddd",
    borderRadius: "10px",
    padding: "1rem",
    width: "250px",
    backgroundColor: "#f9f9f9",
    cursor: "pointer",
  },
  image: {
    width: "100%",
    height: "200px",
    objectFit: "contain",
    marginBottom: "1rem",
  },
};

export default ProductCard;
