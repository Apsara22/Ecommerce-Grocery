import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";
import { getProducts } from "../api/userApi";
import { toast } from "react-toastify";

interface Product {
  _id: string;
  productName: string;
  productPrice: number;
  productOffer: number;
  image: string;
  desc: string;
}

interface CartItem {
  _id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
}

const ProductPage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [quantities, setQuantities] = useState<{ [key: string]: number }>({});

  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await getProducts();

      if (response.data.success) {
        setProducts(response.data.products);
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to load products");
    }
  };

  const getQuantity = (id: string) => {
    return quantities[id] || 1;
  };

  const renderStars = (rating: number = 4.5) => {
    const stars: React.JSX.Element[] = [];

    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <FaStar key={`full-${i}`} className="text-yellow-400 inline-block" />
      );
    }

    if (hasHalfStar) {
      stars.push(
        <FaStarHalfAlt key="half" className="text-yellow-400 inline-block" />
      );
    }

    const emptyStars = 5 - stars.length;

    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <FaRegStar key={`empty-${i}`} className="text-yellow-400 inline-block" />
      );
    }

    return stars;
  };

  // ⭐ ADD TO CART FUNCTION
  const handleAddToCart = (product: Product) => {
    if (!isLoggedIn) {
      toast.error("Please login or register first");

      document
        .getElementById("navbar")
        ?.scrollIntoView({ behavior: "smooth" });

      return;
    }

    const cart: CartItem[] = JSON.parse(localStorage.getItem("cart") || "[]");

    const qty = getQuantity(product._id);

    const existingIndex = cart.findIndex(
      (item: CartItem) => item._id === product._id
    );

    if (existingIndex !== -1) {
      cart[existingIndex].quantity += qty;
    } else {
      cart.push({
        _id: product._id,
        name: product.productName,
        price: product.productPrice,
        image: product.image,
        quantity: qty,
      });
    }

    localStorage.setItem("cart", JSON.stringify(cart));

    // trigger navbar update
    window.dispatchEvent(new Event("storage"));

    toast.success("Added to cart!");
  };

  return (
    <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg p-8 shadow-sm">

      {/* TITLE */}
      <h3 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-purple-700 to-pink-600 bg-clip-text text-transparent mb-4">
        Quality Products for Every Household Need
      </h3>

      {/* SUBTITLE */}
      <p className="text-[#ffb20a] leading-relaxed text-base md:text-lg mb-8">
        Explore our carefully selected collection of fresh groceries, pantry essentials,
        beverages, household items, and more.
      </p>

      {/* SWIPER */}
      <Swiper
        modules={[Autoplay, Navigation, Pagination]}
        spaceBetween={20}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        breakpoints={{
          640: { slidesPerView: 2 },
          768: { slidesPerView: 3 },
          1024: { slidesPerView: 4 },
        }}
      >
        {products.map((product) => {
          const discountPrice =
            product.productPrice -
            (product.productPrice * product.productOffer) / 100;

          return (
            <SwiperSlide key={product._id}>
              <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">

                {/* IMAGE */}
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.productName}
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                  />

                  {product.productOffer > 0 && (
                    <div className="absolute top-3 right-3 bg-red-500 text-white px-2 py-1 rounded-lg text-xs font-bold">
                      SALE
                    </div>
                  )}
                </div>

                {/* CONTENT */}
                <div className="p-5">

                  <h4 className="text-xl font-bold text-gray-800 mb-2">
                    {product.productName}
                  </h4>

                  <p className="text-gray-500 text-sm mb-3 line-clamp-2">
                    {product.desc}
                  </p>

                  {/* STARS */}
                  <div className="flex items-center mb-3">
                    {renderStars()}
                  </div>

                  {/* PRICE + QTY */}
                  <div className="flex items-center justify-between mb-4">

                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-2xl font-bold text-purple-700">
                        ₹{discountPrice.toFixed(2)}
                      </span>
                    </div>

                    {/* QTY */}
                    <div className="flex items-center border rounded-lg px-3 py-1">

                      <button
                        onClick={() =>
                          setQuantities((prev) => ({
                            ...prev,
                            [product._id]: Math.max(
                              (prev[product._id] || 1) - 1,
                              1
                            ),
                          }))
                        }
                        className="text-xl font-bold text-purple-700 px-2"
                      >
                        -
                      </button>

                      <span className="mx-2 font-semibold">
                        {getQuantity(product._id)}
                      </span>

                      <button
                        onClick={() =>
                          setQuantities((prev) => ({
                            ...prev,
                            [product._id]: (prev[product._id] || 1) + 1,
                          }))
                        }
                        className="text-xl font-bold text-purple-700 px-2"
                      >
                        +
                      </button>

                    </div>
                  </div>

                  {/* ADD TO CART BUTTON */}
                  <button
                    onClick={() => handleAddToCart(product)}
                    className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-2 rounded-lg font-semibold hover:from-purple-700 hover:to-pink-700 transition-all duration-300"
                  >
                    Add to Cart
                  </button>

                </div>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>

    </div>
  );
};

export default ProductPage;