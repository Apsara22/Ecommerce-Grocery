import { 
  FaHome, 
  FaStore, 
  FaEnvelope, 
  FaPhone, 
  FaMapMarkerAlt, 
  FaFacebook, 
  FaInstagram, 
  FaTwitter, 
  FaYoutube,
  FaHeart,
  FaArrowUp,
  FaProductHunt
} from 'react-icons/fa';
import { MdDeliveryDining } from 'react-icons/md';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-gradient-to-r from-gray-900 to-gray-800 text-white">
      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* Company Info Section */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <MdDeliveryDining className="text-3xl text-purple-400" />
              <h3 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Hamro Grocery
              </h3>
            </div>
            <p className="text-gray-300 mb-4 leading-relaxed">
              Your one-stop destination for fresh groceries, household essentials, and quality products at affordable prices.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="bg-gray-700 p-2 rounded-full hover:bg-purple-600 transition-colors duration-300">
                <FaFacebook className="text-blue-400 hover:text-white transition-colors" />
              </a>
              <a href="#" className="bg-gray-700 p-2 rounded-full hover:bg-purple-600 transition-colors duration-300">
                <FaInstagram className="text-pink-400 hover:text-white transition-colors" />
              </a>
              <a href="#" className="bg-gray-700 p-2 rounded-full hover:bg-purple-600 transition-colors duration-300">
                <FaTwitter className="text-blue-300 hover:text-white transition-colors" />
              </a>
              <a href="#" className="bg-gray-700 p-2 rounded-full hover:bg-purple-600 transition-colors duration-300">
                <FaYoutube className="text-red-500 hover:text-white transition-colors" />
              </a>
            </div>
          </div>

          {/* Quick Links Section */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-purple-400">Quick Links</h4>
            <ul className="space-y-3">
              <li>
                <a href="#" className="flex items-center gap-2 text-gray-300 hover:text-purple-400 transition-colors duration-300">
                  <FaHome className="text-sm" />
                  Home
                </a>
              </li>
              <li>
                <a href="#" className="flex items-center gap-2 text-gray-300 hover:text-purple-400 transition-colors duration-300">
                  <FaProductHunt className="text-sm" />
                  Products
                </a>
              </li>
              <li>
                <a href="#" className="flex items-center gap-2 text-gray-300 hover:text-purple-400 transition-colors duration-300">
                  <FaStore className="text-sm" />
                  Store
                </a>
              </li>
              <li>
                <a href="#" className="flex items-center gap-2 text-gray-300 hover:text-purple-400 transition-colors duration-300">
                  <FaEnvelope className="text-sm" />
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info Section */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-purple-400">Contact Us</h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-3 text-gray-300">
                <FaMapMarkerAlt className="text-purple-400 mt-1" />
                <span>123 Grocery Street, Kathmandu, Nepal</span>
              </li>
              <li className="flex items-center gap-3 text-gray-300">
                <FaPhone className="text-purple-400" />
                <span>+977 1 2345678</span>
              </li>
              <li className="flex items-center gap-3 text-gray-300">
                <FaEnvelope className="text-purple-400" />
                <span>info@hamrogrocery.com</span>
              </li>
            </ul>
          </div>

          {/* Newsletter Section */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-purple-400">Newsletter</h4>
            <p className="text-gray-300 mb-3 text-sm">
              Subscribe to get special offers and updates!
            </p>
            <div className="flex flex-col gap-3">
              <input 
                type="email" 
                placeholder="Your email address"
                className="px-4 py-2 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              <button className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-2 rounded-lg font-semibold hover:from-purple-700 hover:to-pink-700 transition-all duration-300">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-700 my-8"></div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-400 text-sm text-center">
            © 2024 Hamro Grocery. All rights reserved. Made with{' '}
            <FaHeart className="inline text-red-500 animate-pulse" /> for our customers
          </p>
          
          <div className="flex gap-6 text-sm">
            <a href="#" className="text-gray-400 hover:text-purple-400 transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="text-gray-400 hover:text-purple-400 transition-colors">
              Terms of Service
            </a>
            <a href="#" className="text-gray-400 hover:text-purple-400 transition-colors">
              Returns Policy
            </a>
          </div>
        </div>
      </div>

      {/* Scroll to Top Button */}
      <button
        onClick={scrollToTop}
        className="fixed bottom-8 right-8 bg-purple-600 hover:bg-purple-700 text-white p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110 z-50"
        aria-label="Scroll to top"
      >
        <FaArrowUp />
      </button>
    </footer>
  );
};

export default Footer;