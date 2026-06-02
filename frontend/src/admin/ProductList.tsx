import { FaTimes } from "react-icons/fa";
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { getProducts, deleteProduct } from '../api/userApi'
import { FaEye, FaEdit, FaTrash } from "react-icons/fa";
const ProductList = () => {
  // Sample product data - you can replace this with your actual data
  const [products, setProducts] = useState([])

  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const handleEdit = (product) => {
    console.log('Edit product:', product)
  }

  const handleView = (product) => {
    setSelectedProduct(product);
    setShowModal(true);
  };

  const handleDelete = async (productId) => {
    try {
      const response = await deleteProduct(productId);

      if (response.data.success) {
        toast.success("Product deleted successfully");

        // Remove deleted product from state
        setProducts(
          products.filter((product) => product._id !== productId)
        );
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to delete product");
    }
  };
  useEffect(() => {
    fetchProducts()
  }, [])

  //fetch Product
  const fetchProducts = async () => {
    try {
      const response = await getProducts()

      if (response.data.success) {
        setProducts(response.data.products)
      }

    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-bold text-gray-800 mb-4">Product List</h2>

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
                Product Price
              </th>

              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Action
              </th>

            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {products.map((product) => (
              <tr key={product._id} className="hover:bg-gray-50 transition-colors">

                {/* IMAGE */}
                <td className="px-6 py-4 whitespace-nowrap">
                  <img
                    src={product.image}
                    alt={product.productName}
                    className="w-12 h-12 object-cover rounded-lg"
                  />
                </td>

                {/* NAME */}
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {product.productName}
                </td>

                {/* PRICE */}
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  ${product.productPrice}
                </td>

                {/* ACTION */}
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium flex gap-3">


                  {showModal && selectedProduct && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">

                      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md relative">

                        {/* CLOSE ICON */}
                        <button
                          onClick={() => setShowModal(false)}
                          className="absolute top-3 right-3 text-gray-600 hover:text-red-500 text-xl"
                        >
                          <FaTimes />
                        </button>

                        <h2 className="text-xl font-bold mb-4">
                          Product Details
                        </h2>

                        <img
                          src={selectedProduct.image}
                          alt={selectedProduct.productName}
                          className="w-32 h-32 object-cover rounded mx-auto mb-4"
                        />

                        <div className="space-y-2">
                          <p>
                            <strong>Name:</strong> {selectedProduct.productName}
                          </p>

                          <p>
                            <strong>Price:</strong> ${selectedProduct.productPrice}
                          </p>

                          <p>
                            <strong>Discount:</strong> {selectedProduct.productOffer || 0}%
                          </p>

                          <p>
                            <strong>Description:</strong> {selectedProduct.desc}
                          </p>

                          <p>
                            <strong>Category:</strong>{" "}
                            {selectedProduct.category?.name || "N/A"}
                          </p>
                        </div>

                      </div>
                    </div>
                  )}

                  {/* VIEW */}
                  <button
                    onClick={() => handleView(product)}
                    className="text-green-600 hover:text-green-800 text-lg"
                  >
                    <FaEye />
                  </button>

                  {/* EDIT */}
                  <button
                    onClick={() => handleEdit(product)}
                    className="text-purple-600 hover:text-purple-800 text-lg"
                  >
                    <FaEdit />
                  </button>

                  {/* DELETE */}
                  <button
                    onClick={() => handleDelete(product._id)}
                    className="text-red-600 hover:text-red-800 text-lg"
                  >
                    <FaTrash />
                  </button>

                </td>

              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {products.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          No products found. Add some products to get started.
        </div>
      )}
    </div>
  )
}

export default ProductList