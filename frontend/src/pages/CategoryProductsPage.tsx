import React, { useEffect, useState } from "react";
import { getProducts } from "../api/userApi";
import { toast } from "react-toastify";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";

interface Product {
  _id: string;
  productName: string;

  image: string;
  productPrice: number;
  productOffer: number;
  category?: {
    _id: string;
  };
}

interface Props {
  categoryId: string;
}

const CategoryProductsPage: React.FC<Props> = ({ categoryId }) => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    if (categoryId) {
      fetchProducts();
    }
  }, [categoryId]);

  const fetchProducts = async () => {
    try {
      const response = await getProducts();

      if (response.data.success) {
        const filtered = response.data.products.filter(
          (p: Product) => p.category?._id === categoryId
        );

        setProducts(filtered);
      } else {
        toast.error("Failed to load products");
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  // ⭐ STAR RENDER FUNCTION
  const renderStars = (rating: number = 4.5) => {
    const stars: React.JSX.Element[] = [];

    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<FaStar key={`full-${i}`} className="text-yellow-400" />);
    }

    if (hasHalfStar) {
      stars.push(<FaStarHalfAlt key="half" className="text-yellow-400" />);
    }

    const emptyStars = 5 - stars.length;

    for (let i = 0; i < emptyStars; i++) {
      stars.push(<FaRegStar key={`empty-${i}`} className="text-yellow-400" />);
    }

    return stars;
  };

  if (!categoryId) {
    return null;
  }

  return (
    <div className="p-6 bg-gradient-to-br from-purple-50 to-pink-50 min-h-screen mt-6 rounded-lg">
      
      <h2 className="text-2xl font-bold mb-6">
        Category Products
      </h2>

      {products.length === 0 ? (
        <p className="text-gray-600">No products found in this category</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">

          {products.map((product) => {
            const discountPrice =
              product.productPrice -
              (product.productPrice * product.productOffer) / 100;

            return (
              <div
                key={product._id}
                className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
              >
                {/* IMAGE */}
                <div className="relative h-56 overflow-hidden">
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

                  <h4 className="text-lg font-bold">
                    {product.productName}
                  </h4>

                 

                  {/* STARS */}
                  <div className="flex items-center gap-1 my-2">
                    {renderStars()}
                  </div>

                  {/* PRICE */}
                  <div className="flex items-center gap-2">
                    <span className="text-purple-700 font-bold">
                      ₹{discountPrice.toFixed(2)}
                    </span>
                  </div>

                 
                </div>
              </div>
            );
          })}

        </div>
      )}
    </div>
  );
};

export default CategoryProductsPage;