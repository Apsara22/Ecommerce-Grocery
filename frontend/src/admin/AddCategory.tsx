import React, { useState } from 'react';
import { FaImage, FaTrash } from 'react-icons/fa';
import { createCategory } from "../api/userApi";
import { toast } from "react-toastify";
const AddCategory = () => {
  const [categoryName, setCategoryName] = useState('');
  const [categoryImage, setCategoryImage] = useState(null);
  const [imagePreview, setImagePreview] = useState('');

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setCategoryImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setCategoryImage(null);
    setImagePreview('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!categoryName.trim()) {
      toast.error("Please enter category name");
      return;
    }

    if (!categoryImage) {
      toast.error("Please select category image");
      return;
    }

    try {
      const categoryData = {
        name: categoryName,
        image: imagePreview, // base64 image
      };

      const response = await createCategory(categoryData);

      if (response.data.success) {
        toast.success("Category Added Successfully");

        // Reset Form
        setCategoryName("");
        setCategoryImage(null);
        setImagePreview("");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-4 text-gray-800">
        Add Category
      </h2>

      <form onSubmit={handleSubmit}>
        {/* Category Name Input */}
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">
            Category Name
          </label>
          <input
            type="text"
            placeholder="Enter Category Name"
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            required
          />
        </div>

        {/* Image Upload Box */}
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">
            Category Image
          </label>

          {!imagePreview ? (
            <div className="relative">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
                id="image-upload"
              />
              <label
                htmlFor="image-upload"
                className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-purple-500 transition-colors bg-gray-50 hover:bg-gray-100"
              >
                <FaImage className="text-4xl text-gray-400 mb-2" />
                <p className="text-gray-500 text-center">
                  Click to upload category image
                </p>
                <p className="text-gray-400 text-sm mt-1">
                  PNG, JPG, GIF up to 5MB
                </p>
              </label>
            </div>
          ) : (
            <div className="relative group">
              <img
                src={imagePreview}
                alt="Category preview"
                className="w-full h-48 object-cover rounded-lg border border-gray-300"
              />
              <button
                type="button"
                onClick={handleRemoveImage}
                className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition-colors opacity-0 group-hover:opacity-100"
              >
                <FaTrash />
              </button>
            </div>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-purple-700 text-white px-4 py-2 rounded-lg hover:bg-purple-800 transition-colors font-medium"
        >
          Add Category
        </button>
      </form>
    </div>
  );
};

export default AddCategory;