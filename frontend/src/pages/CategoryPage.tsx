import React, { useEffect, useState } from 'react';
import { getCategories } from '../api/userApi';
import { toast } from 'react-toastify';

const CategoryPage = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await getCategories();

      if (response.data.success) {
        setCategories(response.data.categories);
      } else {
        toast.error("Failed to load categories");
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg p-8 shadow-sm w-full">

      {/* Heading (FULL WIDTH LEFT) */}
      <h3 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-purple-700 to-pink-600 bg-clip-text text-transparent mb-4 text-left">
        Fresh Groceries Delivered to Your Doorstep
      </h3>

      {/* Paragraph (FULL WIDTH LEFT) */}
      <p className="text-[#ffb20a] leading-relaxed text-base md:text-lg mb-6 text-left w-full">
        Discover a wide range of fresh fruits,
        vegetables, dairy products, and daily essentials at Hamro Grocery.
        Shop easily and get quality products delivered quickly and safely to your home.
        Your everyday needs, made simple and convenient.
      </p>

      {/* CATEGORY SECTION (FULL WIDTH FLEX) */}
   
      <div className="flex flex-wrap gap-8 w-full justify-start">
        {categories.map((category) => (
          <div
            key={category._id}
            className="flex flex-col items-center"
          >
            <img
              src={category.image}
              alt={category.name}
              className="w-32 h-32 md:w-40 md:h-40 rounded-full object-cover border-4 border-purple-500 shadow-lg hover:scale-105 transition-transform duration-300"
            />

            <p className="mt-3 text-base font-semibold text-gray-700">
              {category.name}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryPage;