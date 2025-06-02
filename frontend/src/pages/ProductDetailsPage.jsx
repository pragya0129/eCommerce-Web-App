import React, { useEffect, useState } from "react";
import "./ProductDetailsPage.css";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

const ProductDetailsPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [rating, setRating] = useState(0);
  const [reviewText, setReviewText] = useState("");
  const [averageRating, setAverageRating] = useState(0);
  const [discountPercent, setDiscountPercent] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`http://localhost:5000/api/products/${id}`)
      .then((res) => res.json())
      .then((data) => setProduct(data))
      .catch((err) => console.error("Error fetching product:", err));
  }, [id]);

  useEffect(() => {
    if (!id) return;
    fetch(`http://localhost:5000/api/reviews/${id}`)
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
  }, [id]);

  // 🔽 Fetch discount based on category
  useEffect(() => {
    const fetchDiscount = async () => {
      if (!product?.category) return;
      try {
        const res = await fetch("http://localhost:5000/api/discounts");
        const discounts = await res.json();
        const match = discounts.find(
          (item) => item.category === product.category
        );
        if (match) setDiscountPercent(match.discount);
      } catch (err) {
        console.error("Failed to fetch discounts", err);
      }
    };

    fetchDiscount();
  }, [product]);

  const discountedPrice = product
    ? Math.round(product.price * (1 - discountPercent / 100))
    : 0;

  const handleReviewSubmit = async () => {
    if (!reviewText || !rating) return;
    try {
      const userInfo = JSON.parse(localStorage.getItem("userInfo"));
      const response = await fetch(`http://localhost:5000/api/reviews/${id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
        body: JSON.stringify({ text: reviewText, rating: Number(rating) }),
      });

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

  if (!product) return <p>Loading...</p>;

  return (
    <>
      <Navbar />
      <div className="product-page">
        <div className="product-left">
          <img src={product.image} alt={product.name} />
        </div>
        <div className="product-right">
          <button className="back-button" onClick={() => navigate(-1)}>
            ← Back
          </button>
          <h1>{product.name}</h1>
          <p className="description">{product.description}</p>
          <p className="price">
            {discountPercent > 0 ? (
              <>
                <span style={{ textDecoration: "line-through", color: "red" }}>
                  ₹{product.price}
                </span>{" "}
                <span style={{ color: "green", fontWeight: "bold" }}>
                  ₹{discountedPrice}
                </span>
              </>
            ) : (
              <>₹{product.price}</>
            )}
          </p>
          <p>
            <strong>Average Rating:</strong> {averageRating} ⭐
          </p>

          <div className="review-section">
            <h3>Write a Review</h3>
            <div className="review-form">
              <select
                value={rating}
                onChange={(e) => setRating(e.target.value)}
              >
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
    </>
  );
};

export default ProductDetailsPage;
