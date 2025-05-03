// Dummy product data
const products = [
  { id: "1", name: "Laptop", price: 999 },
  { id: "2", name: "Smartphone", price: 499 },
];

const getAllProducts = (req, res) => {
  res.json(products);
};

const getProductById = (req, res) => {
  const product = products.find((p) => p.id === req.params.id);
  if (product) res.json(product);
  else res.status(404).json({ message: "Product not found" });
};

module.exports = { getAllProducts, getProductById };
