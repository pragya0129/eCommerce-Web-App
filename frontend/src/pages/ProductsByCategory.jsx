import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar";
import "./ProductsByCategory.css";
import ProductCard from "../components/ProductCard";

const ProductsByCategory = () => {
  const { categoryName } = useParams();
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [sortOrder, setSortOrder] = useState("");
  const [maxPrice, setMaxPrice] = useState(5000);
  const [selectedMaxPrice, setSelectedMaxPrice] = useState(5000);
  const [priceSliderValue, setPriceSliderValue] = useState(5000);

  useEffect(() => {
    const fetchProductsByCategory = async () => {
      try {
        const [productsRes, discountsRes] = await Promise.all([
          axios.get("http://localhost:5000/api/products"),
          axios.get("http://localhost:5000/api/discounts/"),
        ]);

        const allProducts = productsRes.data;
        const allDiscounts = discountsRes.data;
        console.log(allDiscounts);

        // Get current category discount
        const categoryDiscount = allDiscounts.find(
          (d) => d.category === categoryName
        );
        const discountPercent = categoryDiscount?.discount || 0;
        console.log(discountPercent);

        // Filter and apply discount
        const filtered = allProducts
          .filter((product) => product.category === categoryName)
          .map((product) => {
            const discount = (product.price * discountPercent) / 100;
            const discountedPrice = Math.round(product.price - discount);
            return { ...product, discountedPrice };
          });

        setProducts(filtered);
        setFilteredProducts(filtered);

        const max = Math.max(...filtered.map((p) => p.discountedPrice), 5000);
        setMaxPrice(max);
        setSelectedMaxPrice(max);
        setPriceSliderValue(max);
      } catch (error) {
        console.error("Error fetching products by category:", error);
      }
    };

    fetchProductsByCategory();
  }, [categoryName]);

  useEffect(() => {
    let updated = [...products];

    // Sort by discountedPrice
    if (sortOrder === "lowToHigh") {
      updated.sort((a, b) => a.discountedPrice - b.discountedPrice);
    } else if (sortOrder === "highToLow") {
      updated.sort((a, b) => b.discountedPrice - a.discountedPrice);
    }

    // Filter by discountedPrice
    updated = updated.filter((p) => p.discountedPrice <= selectedMaxPrice);

    setFilteredProducts(updated);
  }, [sortOrder, selectedMaxPrice, products]);

  const handleApplyFilter = () => {
    setSelectedMaxPrice(priceSliderValue);
  };

  return (
    <div className="products-category-page">
      <Navbar />
      <h2>Products in "{categoryName}"</h2>
      <div className="products-content">
        <div className="filter-sidebar">
          <h4>Sort By</h4>
          <label>
            <input
              type="radio"
              name="sort"
              value="lowToHigh"
              checked={sortOrder === "lowToHigh"}
              onChange={() => setSortOrder("lowToHigh")}
            />
            Price: Low to High
          </label>
          <label>
            <input
              type="radio"
              name="sort"
              value="highToLow"
              checked={sortOrder === "highToLow"}
              onChange={() => setSortOrder("highToLow")}
            />
            Price: High to Low
          </label>

          <h4>Filter by Price</h4>
          <div>
            <input
              type="range"
              min="0"
              max={maxPrice}
              value={priceSliderValue}
              onChange={(e) => setPriceSliderValue(Number(e.target.value))}
            />
            <p>Up to ₹{priceSliderValue}</p>
            <button onClick={handleApplyFilter}>Apply Filter</button>
          </div>
        </div>

        <div className="product-cards">
          {filteredProducts.length === 0 ? (
            <p>No products found in this range.</p>
          ) : (
            filteredProducts.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductsByCategory;
