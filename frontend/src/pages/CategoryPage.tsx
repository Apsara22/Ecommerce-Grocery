import React, { useEffect, useState } from "react";
import { getCategories } from "../api/userApi";
import { toast } from "react-toastify";

interface Category {
  _id: string;
  name: string;
  image: string;
}

interface Props {
  onCategorySelect: (categoryId: string) => void;
}

const CategoryPage: React.FC<Props> = ({ onCategorySelect }) => {
  const [categories, setCategories] = useState<Category[]>([]);

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
      
      <h3 className="text-3xl font-bold mb-4 text-left">
        Fresh Groceries Delivered
      </h3>

      <p className="mb-6 text-[#ffb20a]">
        Discover fresh groceries...
      </p>

      <div className="flex flex-wrap gap-8 w-full justify-start">
        {categories.map((category) => (
          <div
            key={category._id}
            onClick={() => onCategorySelect(category._id)}
            className="flex flex-col items-center cursor-pointer hover:scale-105 transition-transform"
          >
            <img
              src={category.image}
              alt={category.name}
              className="w-32 h-32 rounded-full border-4 border-purple-500 object-cover"
            />

            <p className="mt-3 font-semibold text-center">
              {category.name}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryPage;