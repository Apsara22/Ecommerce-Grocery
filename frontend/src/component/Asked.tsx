import React from 'react';
import { useNavigate } from 'react-router-dom';

const Asked = () => {
  const navigate = useNavigate();

  const handleUserClick = () => {
    // Store user type in localStorage if needed
    localStorage.setItem("userType", "user");
    navigate("/login");
  };

  const handleAdminClick = () => {
    // Store user type in localStorage if needed
    localStorage.setItem("userType", "admin");
    navigate("/admin-login");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-purple-100">
      <div className="container mx-auto px-4 py-16">
        {/* Header/Navbar placeholder to maintain consistency */}
        <div className="max-w-7xl mx-auto">
          <h1 className="text-purple-600 text-2xl font-bold tracking-wide mb-8">
            Hamro Grocery
          </h1>
        </div>

        {/* Main Selection Container */}
        <div className="max-w-6xl mx-auto mt-20">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              Choose Your Role
            </h2>
            <p className="text-gray-600 text-lg">
              Please select whether you are a User or an Admin to continue
            </p>
          </div>

          {/* Two Column Layout for Admin and User Selection */}
          <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
            
            {/* Admin Card - Left Side */}
            <div 
              onClick={handleAdminClick}
              className="cursor-pointer group transform transition-all duration-300 hover:scale-105"
            >
              <div className="bg-white rounded-2xl shadow-xl overflow-hidden border-2 border-transparent hover:border-purple-500 transition-all duration-300">
                <div className="bg-gradient-to-r from-purple-600 to-purple-700 p-6">
                  <div className="flex justify-center">
                    <div className="bg-white rounded-full p-4">
                      <svg className="w-20 h-20 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"></path>
                      </svg>
                    </div>
                  </div>
                </div>
                <div className="p-8 text-center">
                  <h3 className="text-2xl font-bold text-gray-800 mb-3">Admin</h3>
                  <p className="text-gray-600 mb-6">
                    Manage products, view orders, and control the grocery store operations
                  </p>
                  <div className="inline-flex items-center text-purple-600 font-semibold group-hover:text-purple-700">
                    <span>Continue as Admin</span>
                    <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            {/* User Card - Right Side */}
            <div 
              onClick={handleUserClick}
              className="cursor-pointer group transform transition-all duration-300 hover:scale-105"
            >
              <div className="bg-white rounded-2xl shadow-xl overflow-hidden border-2 border-transparent hover:border-purple-500 transition-all duration-300">
                <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-6">
                  <div className="flex justify-center">
                    <div className="bg-white rounded-full p-4">
                      <svg className="w-20 h-20 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                      </svg>
                    </div>
                  </div>
                </div>
                <div className="p-8 text-center">
                  <h3 className="text-2xl font-bold text-gray-800 mb-3">User</h3>
                  <p className="text-gray-600 mb-6">
                    Browse products, add to cart, and order groceries for delivery
                  </p>
                  <div className="inline-flex items-center text-purple-600 font-semibold group-hover:text-purple-700">
                    <span>Continue as User</span>
                    <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Note */}
        <div className="text-center mt-16 text-gray-500 text-sm">
          <p>Select your role to access the appropriate dashboard</p>
        </div>
      </div>
    </div>
  );
};

export default Asked;