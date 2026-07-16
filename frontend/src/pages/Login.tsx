import { useState } from 'react'
import { FiEye, FiEyeOff } from "react-icons/fi";
import { loginUser, registerUser } from "../api/userApi";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

const Login = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      if (isLogin) {
        const res = await loginUser({
          email: formData.email,
          password: formData.password
        });

        toast.success(res.data.message);
        localStorage.setItem("isLoggedIn", "true");

        navigate("/home"); // ✅ Only user redirect
      } else {
        await registerUser(formData);
        toast.success("Registered successfully");
        setIsLogin(true);
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data?.message || "Something went wrong");
      } else {
        toast.error("Something went wrong");
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">

        <h2 className="text-3xl font-bold text-center text-purple-600 mb-6">
          {isLogin ? "User Login" : "User Register"}
        </h2>

        <form className="space-y-6" onSubmit={handleSubmit}>

          {!isLogin && (
            <div>
              <label>Name</label>
              <input type="text" name="name" required onChange={handleChange}
                className="w-full px-4 py-2 border-2 border-purple-400 rounded-lg" />
            </div>
          )}

          <div>
            <label>Email</label>
            <input type="email" name="email" required onChange={handleChange}
              className="w-full px-4 py-2 border-2 border-purple-400 rounded-lg" />
          </div>

          <div>
            <label>Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                required
                onChange={handleChange}
                className="w-full px-4 py-2 border-2 border-purple-400 rounded-lg"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2"
              >
                {showPassword ? <FiEyeOff /> : <FiEye />}
              </button>
            </div>
          </div>

          {!isLogin && (
            <div>
              <label>Confirm Password</label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  required
                  onChange={handleChange}
                  className="w-full px-4 py-2 border-2 border-purple-400 rounded-lg"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2"
                >
                  {showConfirmPassword ? <FiEyeOff /> : <FiEye />}
                </button>
              </div>
            </div>
          )}

          <button type="submit" className="w-full bg-purple-600 text-white py-2 rounded-lg">
            {isLogin ? "Login" : "Register"}
          </button>
        </form>

        {/* SWITCH */}
        <p className="text-center mt-4">
          {isLogin ? "Don't have an account?" : "Already have an account?"}
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-purple-600 ml-2"
          >
            {isLogin ? "Register" : "Login"}
          </button>
        </p>

      </div>
    </div>
  );
};

export default Login;