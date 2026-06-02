import React, { useState } from 'react'
import { Link } from "react-router-dom";
import { CgProfile } from "react-icons/cg";
import { CiSearch } from "react-icons/ci";
import { FiMenu } from "react-icons/fi";
import { IoClose } from "react-icons/io5";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  const toggleProfileMenu = () => {
    setShowProfileMenu(!showProfileMenu);
  };

  // logout
  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    setShowProfileMenu(false);
    window.location.reload(); // refresh UI
  };
  return (
    <nav className="bg-purple-600 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo/Brand - Left Side */}
          <div className="flex-shrink-0">
            <h1 className="text-white text-2xl font-bold tracking-wide">
              Hamro Grocery
            </h1>
          </div>

          {/* Navigation Links - Right Side (Desktop) */}
          <div className="hidden md:flex items-center space-x-8">
            <a
              href="#home"
              className="text-white hover:text-purple-200 transition duration-300 ease-in-out font-medium"
            >
              Home
            </a>
            <a
              href="#products"
              className="text-white hover:text-purple-200 transition duration-300 ease-in-out font-medium"
            >
              Product
            </a>
            <a
              href="#store"
              className="text-white hover:text-purple-200 transition duration-300 ease-in-out font-medium"
            >
              Store
            </a>
            <a
              href="#contact"
              className="text-white hover:text-purple-200 transition duration-300 ease-in-out font-medium"
            >
              Contact
            </a>

            {/* Search Bar */}
            <div className="relative">
              <input
                type="text"
                placeholder="Search..."
                className="w-48 px-4 py-1.5 pl-10 pr-3 rounded-full bg-purple-500 text-white placeholder-purple-200 focus:outline-none focus:ring-2 focus:ring-purple-300 transition duration-300"
              />
              <CiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white text-xl" />
            </div>

            {/* Profile Icon */}
            <div className="relative">
              <button
                onClick={toggleProfileMenu}
                className="text-2xl text-white"
              >
                <CgProfile className={isLoggedIn ? "text-green-400" : "text-white"} />
              </button>

              {showProfileMenu && (
                <div className="absolute right-0 mt-2 w-32 bg-white rounded shadow-lg overflow-hidden z-50">

                  {isLoggedIn ? (
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 hover:bg-gray-100 text-red-500"
                    >
                      Logout
                    </button>
                  ) : (
                    <Link
                      to="/asked"
                      className="block px-4 py-2 hover:bg-gray-100 text-green-600"
                      onClick={() => setShowProfileMenu(false)}
                    >
                      Login
                    </Link>
                  )}

                </div>
              )}
            </div>
          </div>

          {/* Mobile menu button - Shows hamburger or cross icon */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="text-white focus:outline-none text-2xl"
            >
              {isMenuOpen ? <IoClose /> : <FiMenu />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu links (visible when menu is open) */}
      <div className={`md:hidden transition-all duration-300 ease-in-out ${isMenuOpen ? 'block' : 'hidden'}`}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-purple-600">
          <a
            href="#home"
            className="text-white block px-3 py-2 hover:bg-purple-700 rounded transition duration-200"
            onClick={() => setIsMenuOpen(false)}
          >
            Home
          </a>
          <a
            href="#products"
            className="text-white block px-3 py-2 hover:bg-purple-700 rounded transition duration-200"
            onClick={() => setIsMenuOpen(false)}
          >
            Product
          </a>
          <a
            href="#store"
            className="text-white block px-3 py-2 hover:bg-purple-700 rounded transition duration-200"
            onClick={() => setIsMenuOpen(false)}
          >
            Store
          </a>
          <a
            href="#contact"
            className="text-white block px-3 py-2 hover:bg-purple-700 rounded transition duration-200"
            onClick={() => setIsMenuOpen(false)}
          >
            Contact
          </a>

          {/* Search Bar in Mobile Menu */}
          <div className="relative px-3 py-2">
            <input
              type="text"
              placeholder="Search..."
              className="w-full px-4 py-1.5 pl-10 pr-3 rounded-full bg-purple-500 text-white placeholder-purple-200 focus:outline-none focus:ring-2 focus:ring-purple-300 transition duration-300"
            />
            <CiSearch className="absolute left-6 top-1/2 transform -translate-y-1/2 text-white text-xl" />
          </div>

          {/* Profile Icon in Mobile Menu */}
          <Link
            to={isLoggedIn ? "#" : "/asked"}
            onClick={() => {
              if (isLoggedIn) {
                handleLogout();
              }
              setIsMenuOpen(false);
            }}
            className="text-white block px-3 py-2 hover:bg-purple-700 rounded"
          >
            <div className="flex items-center gap-2">
              <CgProfile className={`text-xl ${isLoggedIn ? "text-green-400" : "text-white"}`} />
              <span>{isLoggedIn ? "Logout" : "Login"}</span>
            </div>
          </Link>
        </div>
      </div>
    </nav>
  )
}

export default Navbar