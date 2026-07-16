import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { createProduct, getCategories } from "../api/userApi";
import type { ProductData } from "../api/userApi";
import { FiUpload, FiX, FiImage, FiStar } from "react-icons/fi";

interface Category {
  _id: string;
  name: string;
  image: string;
}

interface ImagePreview {
  file: File;
  preview: string;
}

const AddProduct = () => {
  const [productName, setProductName] = useState("");
  const [productDesc, setProductDesc] = useState("");
  const [productCategory, setProductCategory] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [discountPercent, setDiscountPercent] = useState("");
  const [images, setImages] = useState<ImagePreview[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);

  const toBase64 = (file: File) => {
    return new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
    });
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);

    if (images.length + files.length > 3) {
      toast.error("You can only upload up to 3 images");
      return;
    }

    const converted = await Promise.all(
      files.map(async (file) => ({
        file,
        preview: await toBase64(file),
      }))
    );

    setImages([...images, ...converted]);
    e.target.value = "";
  };

  const removeImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index));
  };

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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const price = Number(productPrice);
      const offer = Number(discountPercent) || 0;
      const finalPrice = price - (price * offer) / 100;

      const productData: ProductData = {
        productName,
        desc: productDesc,
        productPrice: price,
        productOffer: offer,
        finalPrice,
        category: productCategory,
        image: images.length > 0 ? images[0].preview : "",
      };

      const response = await createProduct(productData);

      if (response.data.success) {
        toast.success("Product Added Successfully");

        setProductName("");
        setProductDesc("");
        setProductCategory("");
        setProductPrice("");
        setDiscountPercent("");
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
      <h2 className="text-xl font-bold text-gray-800 mb-4">
        Add Product
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* BEAUTIFUL IMAGE UPLOAD SECTION WITH REACT ICONS */}
        <div>
          <label className="block font-semibold mb-3 text-gray-700">
            Product Images (Max 3)
          </label>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {images.map((img, index) => (
              <div key={index} className="relative group">
                {/* IMAGE CONTAINER */}
                <div className="relative rounded-xl overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100 shadow-md">
                  <img
                    src={img.preview}
                    alt={`Product ${index + 1}`}
                    className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
                  />

                  {/* OVERLAY */}
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all duration-300"></div>

                  {/* DELETE BUTTON */}
                  <button
                    type="button"
                    onClick={() => removeImage(index)}
                    className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-8 h-8 flex items-center justify-center hover:bg-red-600 transition-all duration-200 shadow-lg opacity-0 group-hover:opacity-100"
                  >
                    <FiX className="w-4 h-4" />
                  </button>

                  {/* IMAGE LABEL */}
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-3">
                    <div className="flex items-center justify-center gap-1 text-white text-sm font-medium">
                      {index === 0 ? (
                        <>
                          <FiStar className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                          <span>Main Image</span>
                        </>
                      ) : (
                        <>
                          <FiImage className="w-4 h-4" />
                          <span>Image {index + 1}</span>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {/* UPLOAD BUTTON */}
            {images.length < 3 && (
              <label className="relative border-2 border-dashed border-purple-300 rounded-xl p-6 text-center cursor-pointer hover:border-purple-500 hover:bg-purple-50 transition-all duration-300 group min-h-[192px] flex items-center justify-center">
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleImageUpload}
                  className="hidden"
                />
                <div className="text-gray-500 group-hover:text-purple-600 transition-colors duration-300">
                  <FiUpload className="w-12 h-12 mx-auto mb-3 text-purple-400 group-hover:text-purple-600 transition-colors duration-300" />
                  <span className="text-sm font-medium block">Upload Image</span>
                  <p className="text-xs text-gray-400 mt-2">Click or drag to upload</p>
                  <p className="text-xs text-purple-500 mt-1">{images.length}/3 images used</p>
                </div>
              </label>
            )}
          </div>

          {images.length === 0 && (
            <p className="text-xs text-gray-400 mt-3 text-center flex items-center justify-center gap-1">
              <FiImage className="w-3 h-3" />
              Upload up to 3 product images for better visibility
            </p>
          )}
        </div>

        {/* FORM GRID */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <input
            type="text"
            placeholder="Product Name"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            className="border p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            required
          />

          <select
            value={productCategory}
            onChange={(e) => setProductCategory(e.target.value)}
            className="border p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            required
          >
            <option value="">Select Category</option>
            {categories.map((cat) => (
              <option key={cat._id} value={cat._id}>
                {cat.name}
              </option>
            ))}
          </select>

          <input
            type="number"
            placeholder="Price"
            value={productPrice}
            onChange={(e) => setProductPrice(e.target.value)}
            className="border p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            required
          />

          <input
            type="number"
            placeholder="Discount %"
            value={discountPercent}
            onChange={(e) => setDiscountPercent(e.target.value)}
            className="border p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          />
        </div>

        {/* DESCRIPTION */}
        <textarea
          placeholder="Product Description"
          value={productDesc}
          onChange={(e) => setProductDesc(e.target.value)}
          className="w-full border p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          rows={4}
          required
        />

        {/* FIXED WIDTH ADD PRODUCT BUTTON */}
        <div className="flex justify-center">
          <button
            type="submit"
            className="bg-purple-700 text-white font-semibold py-2 px-8 rounded-lg hover:bg-purple-800 transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 w-full md:w-auto min-w-[200px]"
          >
            Add Product
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddProduct;