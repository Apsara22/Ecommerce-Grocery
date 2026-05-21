import React, { useState } from 'react'
import { FiPlus, FiList, FiShoppingBag } from "react-icons/fi";
import AddProduct from './AddProduct';
import ProductList from './ProductList';
import Orderlist from './Orderlist';

const Adminpage = () => {
  const [activeTab, setActiveTab] = useState('welcome');

  const renderContent = () => {
    switch(activeTab) {
      case 'add-product':
        return <AddProduct />;
      case 'product-list':
        return <ProductList />;
      case 'order':
        return <Orderlist />;
      default:
        return null;
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-purple-700 text-white shadow-lg">
        <div className="p-6">
          <h2 className="text-2xl font-bold mb-8 text-center">Admin Panel</h2>
          
          <nav className="space-y-2">
            {/* Add Product */}
            <button
              onClick={() => setActiveTab('add-product')}
              className={`w-full flex items-center px-4 py-3 rounded-lg transition duration-300 group ${
                activeTab === 'add-product' ? 'bg-purple-600' : 'hover:bg-purple-600'
              }`}
            >
              <FiPlus className="w-5 h-5 mr-3" />
              <span className="font-medium">Add Product</span>
            </button>

            {/* Product List */}
            <button
              onClick={() => setActiveTab('product-list')}
              className={`w-full flex items-center px-4 py-3 rounded-lg transition duration-300 group ${
                activeTab === 'product-list' ? 'bg-purple-600' : 'hover:bg-purple-600'
              }`}
            >
              <FiList className="w-5 h-5 mr-3" />
              <span className="font-medium">Product List</span>
            </button>

            {/* Order */}
            <button
              onClick={() => setActiveTab('order')}
              className={`w-full flex items-center px-4 py-3 rounded-lg transition duration-300 group ${
                activeTab === 'order' ? 'bg-purple-600' : 'hover:bg-purple-600'
              }`}
            >
              <FiShoppingBag className="w-5 h-5 mr-3" />
              <span className="font-medium">Order</span>
            </button>
          </nav>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-6">
        {/* Welcome Message - Always Visible */}
        <div className="bg-white rounded-lg shadow-md p-4 mb-6">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Welcome to Admin Dashboard</h1>
          <p className="text-gray-600">Select an option from the sidebar to manage your products and orders.</p>
        </div>

        {/* Dynamic Content - Shows below welcome message */}
        {renderContent()}
      </main>
    </div>
  )
}

export default Adminpage