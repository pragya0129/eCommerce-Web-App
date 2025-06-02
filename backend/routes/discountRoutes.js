const express = require("express");
const router = express.Router();

const {
  setDiscount,
  getAllDiscounts,
} = require("../controllers/discountController");
const { protect } = require("../middleware/authMiddleware");

router.post("/", protect, setDiscount);
router.get("/", getAllDiscounts);

module.exports = router;
