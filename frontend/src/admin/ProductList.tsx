import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { getProducts, deleteProduct } from "../api/userApi";
import { FaEye, FaEdit, FaTrash, FaTimes } from "react-icons/fa";

const IMAGE_BASE_URL = "http://localhost:5000/";

const ProductList = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<any | null>(null);
  const [showModal, setShowModal] = useState(false);

  // Fetch products
  const fetchProducts = async () => {
    try {
      const response = await getProducts();

      if (response.data.success) {
        setProducts(response.data.products);
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to fetch products");
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // View product
  const handleView = (product: any) => {
    setSelectedProduct(product);
    setShowModal(true);
  };

  // Edit product (future use)
  const handleEdit = (product: any) => {
    console.log("Edit product:", product);
  };

  // Delete product
  const handleDelete = async (productId: string) => {
    try {
      const response = await deleteProduct(productId);

      if (response.data.success) {
        toast.success("Product deleted successfully");

        setProducts((prev) =>
          prev.filter((product) => product._id !== productId)
        );
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to delete product");
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-bold text-gray-800 mb-4">
        Product List
      </h2>

      {/* TABLE */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Image
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Product Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Price
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Action
              </th>
            </tr>
          </thead>

          <tbody className="bg-white divide-y divide-gray-200">
            {products.map((product) => (
              <tr key={product._id} className="hover:bg-gray-50">

                {/* IMAGE */}
                <td className="px-6 py-4">
                  <img
                    src={product.image}
                    alt={product.productName}
                  />
                </td>

                {/* NAME */}
                <td className="px-6 py-4 text-sm text-gray-900">
                  {product.productName}
                </td>

                {/* PRICE */}
                <td className="px-6 py-4 text-sm text-gray-900">
                  ${product.productPrice}
                </td>

                {/* ACTION */}
                <td className="px-6 py-4 flex gap-3 text-lg">

                  {/* VIEW */}
                  <button
                    onClick={() => handleView(product)}
                    className="text-green-600 hover:text-green-800"
                  >
                    <FaEye />
                  </button>

                  {/* EDIT */}
                  <button
                    onClick={() => handleEdit(product)}
                    className="text-purple-600 hover:text-purple-800"
                  >
                    <FaEdit />
                  </button>

                  {/* DELETE */}
                  <button
                    onClick={() => handleDelete(product._id)}
                    className="text-red-600 hover:text-red-800"
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* EMPTY STATE */}
      {products.length === 0 && (
        <p className="text-center py-6 text-gray-500">
          No products found.
        </p>
      )}

      {/* MODAL */}
      {showModal && selectedProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md relative">

            {/* CLOSE BUTTON */}
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-3 right-3 text-gray-600 hover:text-red-500"
            >
              <FaTimes />
            </button>

            <h2 className="text-xl font-bold mb-4">
              Product Details
            </h2>

            {/* IMAGE */}
            <img
              src={`${IMAGE_BASE_URL}${selectedProduct.image}`}
              alt={selectedProduct.productName}
              className="w-32 h-32 object-cover rounded mx-auto mb-4"
            />

            {/* DETAILS */}
            <div className="space-y-2 text-sm">
              <p><strong>Name:</strong> {selectedProduct.productName}</p>
              <p><strong>Price:</strong> ${selectedProduct.productPrice}</p>
              <p><strong>Discount:</strong> {selectedProduct.productOffer || 0}%</p>
              <p><strong>Description:</strong> {selectedProduct.desc}</p>
              <p>
                <strong>Category:</strong>{" "}
                {selectedProduct.category?.name || "N/A"}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductList;