const mongoose = require("mongoose");

const discountSchema = new mongoose.Schema({
  category: {
    type: String,
    required: true,
    unique: true,
  },
  discount: {
    type: Number,
    required: true,
  },
});

const Discount = mongoose.model("Discount", discountSchema);

module.exports = Discount;
