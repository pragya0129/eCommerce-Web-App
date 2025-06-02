const Discount = require("../models/discountModel");

// @desc    Add or update a discount for a category
// @route   POST /api/discounts
// @access  Admin (assume auth middleware handles this)
const setDiscount = async (req, res) => {
  const { category, discount } = req.body;

  if (!category || discount === undefined) {
    return res
      .status(400)
      .json({ message: "Category and discount are required" });
  }

  try {
    let existing = await Discount.findOne({ category });

    if (existing) {
      existing.discount = discount;
      await existing.save();
      return res.json({ message: "Discount updated" });
    }

    const newDiscount = new Discount({ category, discount });
    await newDiscount.save();
    res.json({ message: "Discount added" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error while setting discount" });
  }
};

// (Optional) Get all discounts
const getAllDiscounts = async (req, res) => {
  try {
    const discounts = await Discount.find({});
    res.json(discounts);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch discounts" });
  }
};

module.exports = {
  setDiscount,
  getAllDiscounts,
};
