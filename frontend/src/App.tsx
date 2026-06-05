import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom'; // Use BrowserRouter directly
import Home from "./pages/Home";
import { ToastContainer } from "react-toastify";
import Welcome from './pages/Welcome';
import Login from './pages/Login';
import Admin from './admin/Adminpage';
import Asked from './component/Asked';
import AdminLogin from './admin/AdminLogin';
import CategoryPage from './pages/CategoryPage';

const App = () => {
  return (
    <BrowserRouter> {/* Use BrowserRouter directly */}
      <div className="app">

        <main className="main-content">
          <ToastContainer position="top-right" autoClose={3000} />
          <Routes>
            <Route path="/" element={<Welcome />} />
            <Route path="/home" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/admin-login" element={<AdminLogin />} />
            <Route path="/asked" element={<Asked />} />
            <Route path="/category" element={<CategoryPage />} />
          </Routes>
        </main>

      </div>
    </BrowserRouter>
  );
};

export default App;