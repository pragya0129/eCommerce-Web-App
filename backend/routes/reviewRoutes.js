const express = require("express");
const {
  getProductReviews,
  addProductReview,
} = require("../controllers/reviewController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/:productId", getProductReviews);
router.post("/:productId", protect, addProductReview);

module.exports = router;
