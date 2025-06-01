const Review = require("../models/reviewModel");

const getProductReviews = async (req, res) => {
  const reviews = await Review.find({ productId: req.params.productId });
  res.json(reviews);
};

const addProductReview = async (req, res) => {
  const { text, rating } = req.body;
  const userId = req.user._id;
  const productId = req.params.productId;

  try {
    const existingReview = await Review.findOne({ productId, userId });
    if (existingReview) {
      return res
        .status(400)
        .json({ message: "You have already reviewed this product." });
    }

    const review = await Review.create({
      productId,
      userId,
      rating,
      text,
    });

    res.status(201).json(review);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getProductReviews, addProductReview };
