import { useState } from "react";
import { FaImage, FaTrash } from "react-icons/fa";
import { toast } from "react-toastify";
import { createCategory } from "../api/userApi";

const AddCategory = () => {
  const [categoryName, setCategoryName] = useState<string>("");
  const [categoryImage, setCategoryImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>("");

  // Handle image upload
  const handleImageChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const file = e.target.files?.[0];

    if (!file) return;

    setCategoryImage(file);

    const reader = new FileReader();

    reader.onloadend = () => {
      if (typeof reader.result === "string") {
        setImagePreview(reader.result);
      }
    };

    reader.readAsDataURL(file);
  };

  // Remove image
  const handleRemoveImage = (): void => {
    setCategoryImage(null);
    setImagePreview("");
  };

  // Submit form
  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
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
        image: imagePreview,
      };

      const response = await createCategory(categoryData);

      if (response.data.success) {
        toast.success("Category Added Successfully");

        // Reset form
        setCategoryName("");
        setCategoryImage(null);
        setImagePreview("");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message);
      } else {
        console.error(error);
      }

      toast.error("Something went wrong");
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-4 text-gray-800">
        Add Category
      </h2>

      <form onSubmit={handleSubmit}>
        {/* Category Name */}
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">
            Category Name
          </label>

          <input
            type="text"
            placeholder="Enter Category Name"
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
            required
          />
        </div>

        {/* Image Upload */}
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">
            Category Image
          </label>

          {!imagePreview ? (
            <div className="relative">
              <input
                id="image-upload"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />

              <label
                htmlFor="image-upload"
                className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-purple-500 bg-gray-50 hover:bg-gray-100 transition"
              >
                <FaImage className="text-4xl text-gray-400 mb-2" />
                <p className="text-gray-500">
                  Click to upload category image
                </p>
                <p className="text-sm text-gray-400 mt-1">
                  PNG, JPG, JPEG, GIF
                </p>
              </label>
            </div>
          ) : (
            <div className="relative group">
              <img
                src={imagePreview}
                alt="Category Preview"
                className="w-full h-48 object-cover rounded-lg border"
              />

              <button
                type="button"
                onClick={handleRemoveImage}
                className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 hover:bg-red-600 transition"
              >
                <FaTrash />
              </button>
            </div>
          )}
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full bg-purple-700 text-white py-2 rounded-lg hover:bg-purple-800 transition"
        >
          Add Category
        </button>
      </form>
    </div>
  );
};

export default AddCategory;