import React, { useEffect, useState } from 'react';
import { FaTrash } from 'react-icons/fa';
import { getCategories, deleteCategory } from '../api/userApi';
import { toast } from 'react-toastify';

const CategoryList = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await getCategories();

      if (response.data.success) {
        setCategories(response.data.categories);
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to load categories");
    }
  };

  const handleDelete = async (categoryId) => {
    try {
      const response = await deleteCategory(categoryId);

      if (response.data.success) {
        toast.success("Category deleted successfully");

        setCategories(
          categories.filter(
            (category) => category._id !== categoryId
          )
        );
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Delete failed");
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-bold mb-4 text-gray-800">
        Category List
      </h2>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">

          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Name
              </th>

              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Image
              </th>

              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Action
              </th>
            </tr>
          </thead>

          <tbody className="bg-white divide-y divide-gray-200">
            {categories.map((category) => (
              <tr
                key={category._id}
                className="hover:bg-gray-50"
              >
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {category.name}
                </td>

                <td className="px-6 py-4 whitespace-nowrap">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="h-12 w-12 rounded-lg object-cover"
                  />
                </td>

                <td className="px-6 py-4 whitespace-nowrap">
                  <button
                    onClick={() => handleDelete(category._id)}
                    className="text-red-600 hover:text-red-900 text-lg"
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>

        </table>
      </div>

      {categories.length === 0 && (
        <div className="text-center py-6 text-gray-500">
          No categories found.
        </div>
      )}
    </div>
  );
};

export default CategoryList;