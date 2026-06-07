import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';
import { getProducts } from '../api/userApi';
import { toast } from 'react-toastify';

interface Product {
    _id: string;
    productName: string;
    productPrice: number;
    productOffer: number;
    image: string;
    desc: string;
}

const ProductPage: React.FC = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [quantities, setQuantities] = useState<{ [key: string]: number }>({});

    useEffect(() => {
        fetchProducts();
    }, []);

    const getQuantity = (id: string) => {
        return quantities[id] || 1;
    };
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

    const renderStars = (rating: number = 4.5) => {
        const stars: JSX.Element[] = [];

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

    return (
        <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg p-8 shadow-sm">

            {/* Title */}
            <h3 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-purple-700 to-pink-600 bg-clip-text text-transparent mb-4">
                Quality Products for Every Household Need
            </h3>

            {/* Subtitle */}
            <p className="text-[#ffb20a] leading-relaxed text-base md:text-lg mb-8">
                Explore our carefully selected collection of fresh groceries, pantry essentials,
                beverages, household items, and more. At Hamro Grocery, we bring you
                high-quality products at affordable prices.
            </p>

            {/* Swiper */}
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

                                {/* Image */}
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

                                {/* Content */}
                                <div className="p-5">

                                    {/* Name */}
                                    <h4 className="text-xl font-bold text-gray-800 mb-2">
                                        {product.productName}
                                    </h4>

                                    {/* Description */}
                                    <p className="text-gray-500 text-sm mb-3 line-clamp-2">
                                        {product.desc}
                                    </p>

                                    {/* Rating */}
                                    <div className="flex items-center mb-3">
                                        {renderStars()}
                                    </div>

                                    {/* Price and Quantity Selector - Same Line */}
                                    <div className="flex items-center justify-between gap-2 mb-4">
                                        {/* Price Section - Left Side */}
                                        <div className="flex items-center gap-2 flex-wrap">
                                            <span className="text-2xl font-bold text-purple-700">
                                                ₹{discountPrice.toFixed(2)}
                                            </span>

                                            {product.productOffer > 0 && (
                                                <>
                                                    <span className="text-gray-400 line-through text-sm">
                                                        ₹{product.productPrice}
                                                    </span>

                                                    <span className="text-green-600 text-sm font-semibold">
                                                        {product.productOffer}% OFF
                                                    </span>
                                                </>
                                            )}
                                        </div>

                                        {/* Quantity Selector - Right Side */}
                                        <div className="flex items-center border rounded-lg px-3 py-2">

                                            {/* MINUS */}
                                            <button
                                                onClick={() =>
                                                    setQuantities((prev) => ({
                                                        ...prev,
                                                        [product._id]: Math.max((prev[product._id] || 1) - 1, 1),
                                                    }))
                                                }
                                                className="text-xl font-bold text-purple-700 px-2"
                                            >
                                                -
                                            </button>

                                            {/* VALUE */}
                                            <span className="text-lg font-semibold mx-2">
                                                {getQuantity(product._id)}
                                            </span>

                                            {/* PLUS */}
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

                                    {/* Button */}
                                    <button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-2 rounded-lg font-semibold hover:from-purple-700 hover:to-pink-700 transition-all duration-300">
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