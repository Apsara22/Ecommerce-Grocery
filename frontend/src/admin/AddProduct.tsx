import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { createProduct, getCategories } from '../api/userApi'

const AddProduct = () => {
  const [productName, setProductName] = useState('')
  const [productDesc, setProductDesc] = useState('')
  const [productCategory, setProductCategory] = useState('')
  const [productPrice, setProductPrice] = useState('')
  const [discountPercent, setDiscountPercent] = useState('')
  const [images, setImages] = useState([])
  const [categories, setCategories] = useState([])

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files)
    if (images.length + files.length <= 3) {
      const newImages = files.map(file => ({
        file,
        preview: URL.createObjectURL(file)
      }))
      setImages([...images, ...newImages])
    } else {
      alert('You can only upload up to 3 images')
    }
  }

  const removeImage = (index) => {
    const newImages = images.filter((_, i) => i !== index)
    setImages(newImages)
  }

  //Fetch the categories 
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
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const productData = {
        image: images[0]?.preview || "",
        productName,
        desc: productDesc,
        productPrice,
        productOffer: discountPercent,
        category: productCategory,
      };

      const response = await createProduct(productData);
      console.log(response.data);

      if (response.data.success) {
        toast.success("Product Added Successfully");
        // clear form
        setProductName('');
        setProductDesc('');
        setProductCategory('');
        setProductPrice('');
        setDiscountPercent('');
        setImages([]);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-bold text-gray-800 mb-4">Add Product</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Images Section - Fixed Image Boxes */}
        <div>
          <label className="block text-gray-700 font-semibold mb-2">
            Product Images (Max 3)
          </label>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {images.map((image, index) => (
              <div key={index} className="relative group">
                <div className="relative overflow-hidden rounded-lg shadow-md bg-gray-100 w-full h-48">
                  <img
                    src={image.preview}
                    alt={`Product ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                  <button
                    type="button"
                    onClick={() => removeImage(index)}
                    className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-7 h-7 flex items-center justify-center hover:bg-red-600 transition-colors shadow-lg"
                  >
                    ×
                  </button>
                </div>
                <p className="text-xs text-gray-500 text-center mt-2">Image {index + 1}</p>
              </div>
            ))}
            {images.length < 3 && (
              <label className="relative border-2 border-dashed border-purple-300 rounded-lg p-6 text-center cursor-pointer hover:border-purple-500 hover:bg-purple-50 transition-all duration-300 group w-full h-48 flex items-center justify-center">
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleImageUpload}
                  className="hidden"
                />
                <div className="text-gray-500 group-hover:text-purple-600 transition-colors duration-300">
                  <div className="text-4xl mb-2">📷</div>
                  <span className="text-sm font-medium">Upload Image</span>
                  <p className="text-xs text-gray-400 mt-2">Click to upload</p>
                  <p className="text-xs text-purple-500 mt-1">{images.length}/3 images used</p>
                </div>
              </label>
            )}
          </div>
          {images.length === 0 && (
            <p className="text-xs text-gray-400 mt-2 text-center">Upload up to 3 product images for better visibility</p>
          )}
        </div>

        {/* Product Name, Category, Price, Discount - All in one line */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Product Name
            </label>
            <input
              type="text"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              placeholder="Enter product name"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Product Category
            </label>
            <select
              value={productCategory}
              onChange={(e) => setProductCategory(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              required
            >
              <option value="">Select category</option>
              {
                categories.map((category) => (
                  <option
                    key={category._id}
                    value={category._id}
                  >
                    {category.name}
                  </option>
                ))
              }
            </select>
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Product Price ($)
            </label>
            <input
              type="number"
              step="0.01"
              value={productPrice}
              onChange={(e) => setProductPrice(e.target.value)}
              placeholder="Enter price"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Discount (%)
            </label>
            <input
              type="number"
              step="1"
              min="0"
              max="100"
              value={discountPercent}
              onChange={(e) => setDiscountPercent(e.target.value)}
              placeholder="Enter discount"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Product Description */}
        <div>
          <label className="block text-gray-700 font-semibold mb-2">
            Product Description
          </label>
          <textarea
            value={productDesc}
            onChange={(e) => setProductDesc(e.target.value)}
            placeholder="Enter product description"
            rows="4"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            required
          />
        </div>

        {/* Add Product Button */}
        <button
          type="submit"
          className="w-full bg-purple-700 text-white font-semibold py-2 px-4 rounded-lg hover:bg-purple-800 transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
        >
          Add Product
        </button>
      </form>
    </div>
  )
}

export default AddProduct