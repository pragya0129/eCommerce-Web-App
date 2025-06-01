import React, { useEffect, useState } from "react";
import "./ProductModal.css";

const ProductModal = ({ product, onClose }) => {
  const [reviews, setReviews] = useState([]);
  const [rating, setRating] = useState(0);
  const [reviewText, setReviewText] = useState("");
  const [averageRating, setAverageRating] = useState(0);

  useEffect(() => {
    if (!product || !product._id) return;

    fetch(`http://localhost:5000/api/reviews/${product._id}`)
      .then((res) => res.json())
      .then((data) => {
        setReviews(data);
        if (data.length > 0) {
          const avg =
            data.reduce((acc, cur) => acc + cur.rating, 0) / data.length;
          setAverageRating(avg.toFixed(1));
        } else {
          setAverageRating(0);
        }
      });
  }, [product]);

  const handleReviewSubmit = async () => {
    if (!reviewText || !rating) return;

    try {
      const userInfo = JSON.parse(localStorage.getItem("userInfo"));

      const response = await fetch(
        `http://localhost:5000/api/reviews/${product._id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${userInfo.token}`,
          },
          body: JSON.stringify({ text: reviewText, rating: Number(rating) }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        setReviews((prev) => [...prev, data]);
        setReviewText("");
        setRating(0);
        alert("Review added successfully!");
      } else {
        alert(data.message || "Error adding review");
      }
    } catch (err) {
      console.error("Error submitting review:", err);
      alert("An error occurred while submitting the review.");
    }
  };

  if (!product) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="product-modal" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>
          ×
        </button>
        <img src={product.image} alt={product.name} />
        <h2>{product.name}</h2>
        <p>{product.description}</p>
        <p>₹{product.price}</p>
        <p>
          <strong>Average Rating:</strong> {averageRating} ⭐
        </p>

        <div className="review-section">
          <h3>Write a Review</h3>
          <div className="review-form">
            <select value={rating} onChange={(e) => setRating(e.target.value)}>
              <option value={0}>Rate...</option>
              {[1, 2, 3, 4, 5].map((r) => (
                <option key={r} value={r}>
                  {r} Star{r > 1 && "s"}
                </option>
              ))}
            </select>
            <textarea
              placeholder="Write your review..."
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
            />
            <button onClick={handleReviewSubmit}>Submit Review</button>
          </div>

          <h4>
            {reviews.length > 0
              ? `${reviews.length} Review(s)`
              : "No reviews yet"}
          </h4>
          <div className="reviews-list">
            {reviews.map((r, i) => (
              <div key={i} className="review">
                <p>
                  <strong>{r.rating}⭐</strong>
                </p>
                <p>{r.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductModal;
