import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./DashboardPage.css";
import Navbar from "../components/Navbar";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import ProductCard from "../components/ProductCard";

const DashboardPage = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await axios.get("http://localhost:5000/api/products");
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  const carouselImages = [
    "/assets/buy-online-slider-template-4261dd.webp",
    "/assets/shop-online-slider-template-4f2c60.webp",
    "/assets/buy-online-slider-template-4261dd.webp",
    "/assets/shop-online-slider-template-4f2c60.webp",
    "/assets/buy-online-slider-template-4261dd.webp",
  ];

  return (
    <div className="dashboard">
      <Navbar />

      {/* Swiper Carousel */}
      <div className="carousel-container">
        <Swiper
          modules={[Navigation, Autoplay]}
          navigation={true}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          loop={true}
          spaceBetween={30}
          slidesPerView={1}
          className="carousel-swiper"
        >
          {carouselImages.map((img, idx) => (
            <SwiperSlide key={idx}>
              <img
                src={img}
                alt={`Slide ${idx + 1}`}
                className="carousel-img"
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <h1>Top Deals</h1>
      {/* Product Cards */}
      <div className="product-cards">
        {products.map((product) => (
          <ProductCard product={product} />
        ))}
      </div>
    </div>
  );
};

export default DashboardPage;
