import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  const [discountPercent, setDiscountPercent] = useState(0);

  useEffect(() => {
    const fetchDiscount = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/discounts/");
        const matched = res.data.find(
          (item) => item.category === product.category
        );
        if (matched) {
          setDiscountPercent(matched.discount);
        }
      } catch (err) {
        console.error("Failed to fetch discount", err);
      }
    };

    fetchDiscount();
  }, [product.category]);

  const discountedPrice = Math.round(
    product.price * (1 - discountPercent / 100)
  );

  const handleClick = () => {
    navigate(`/product/${product._id}`);
  };

  return (
    <div style={styles.card} onClick={handleClick}>
      <img src={product.image} alt={product.name} style={styles.image} />
      <h3>{product.name}</h3>
      {discountPercent > 0 ? (
        <p>
          <span style={styles.strike}>₹{product.price}</span>{" "}
          <span style={styles.discounted}>₹{discountedPrice}</span>
        </p>
      ) : (
        <p>₹{product.price}</p>
      )}
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
    cursor: "pointer",
  },
  image: {
    width: "100%",
    height: "200px",
    objectFit: "contain",
    marginBottom: "1rem",
  },
  strike: {
    textDecoration: "line-through",
    color: "red",
    marginRight: "10px",
  },
  discounted: {
    color: "green",
    fontWeight: "bold",
  },
};

export default ProductCard;
