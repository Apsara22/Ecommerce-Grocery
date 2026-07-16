import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { getProducts, deleteProduct } from "../api/userApi";
import { FaEye, FaEdit, FaTrash, FaTimes } from "react-icons/fa";

interface Product {
  _id: string;
  productName: string;
  desc: string;
  productPrice: number;
  productOffer?: number;
  finalPrice: number;
  image: string;
  category?: {
    _id: string;
    name: string;
  };
}

const ProductList = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [showModal, setShowModal] = useState(false);

  // Fetch Products
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

  // View Product
  const handleView = (product: Product) => {
    setSelectedProduct(product);
    setShowModal(true);
  };

  // Edit Product
  const handleEdit = (product: Product) => {
    console.log("Edit Product:", product);
  };

  // Delete Product
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

                {/* Product Image - Fixed Size */}
                <td className="px-6 py-4">
                  <div className="w-12 h-12 rounded-lg overflow-hidden bg-gray-100">
                    <img
                      src={product.image}
                      alt={product.productName}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </td>

                {/* Product Name */}
                <td className="px-6 py-4 text-sm text-gray-900">
                  {product.productName}
                </td>

                {/* Product Price */}
                <td className="px-6 py-4 text-sm text-gray-900">
                  ${product.productPrice}
                </td>

                {/* Actions */}
                <td className="px-6 py-4 flex gap-3 text-lg">
                  <button
                    onClick={() => handleView(product)}
                    className="text-green-600 hover:text-green-800 transition-colors"
                    title="View Product"
                  >
                    <FaEye />
                  </button>

                  <button
                    onClick={() => handleEdit(product)}
                    className="text-purple-600 hover:text-purple-800 transition-colors"
                    title="Edit Product"
                  >
                    <FaEdit />
                  </button>

                  <button
                    onClick={() => handleDelete(product._id)}
                    className="text-red-600 hover:text-red-800 transition-colors"
                    title="Delete Product"
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
        <p className="text-center py-6 text-gray-500">
          No products found.
        </p>
      )}


      {/* Product Details Modal */}
      {showModal && selectedProduct && (
        <div className="fixed inset-0 bg-purple-700 bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-md relative">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-3 right-3 text-gray-600 hover:text-red-500 transition-colors"
            >
              <FaTimes />
            </button>

            <h2 className="text-xl font-bold mb-4">
              Product Details
            </h2>

            <img
              src={selectedProduct.image}
              alt={selectedProduct.productName}
              className="w-40 h-40 object-cover rounded-lg mx-auto mb-4 border"
            />

            <div className="space-y-2 text-sm">
              <p>
                <strong>Name:</strong> {selectedProduct.productName}
              </p>

              <p>
                <strong>Price:</strong> ${selectedProduct.productPrice}
              </p>

              <p>
                <strong>Discount:</strong>{" "}
                {selectedProduct.productOffer || 0}%
              </p>
              <p>
                <strong>Final Price:</strong>{" "}
                $
                {(
                  selectedProduct.productPrice -
                  (selectedProduct.productPrice * (selectedProduct.productOffer || 0)) / 100
                ).toFixed(2)}
              </p>
              <p>
                <strong>Description:</strong>{" "}
                {selectedProduct.desc}
              </p>

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