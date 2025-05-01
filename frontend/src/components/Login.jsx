import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useAppContext } from "../context/AppContext";

export default function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    role: "",
    rememberMe: false,
  });

  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const { setShowUserLogin, setUser } = useAppContext();

  const [message, setMessage] = useState(location.state?.message || "");
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => setMessage(""), 5000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleCheckboxChange = (e) =>
    setFormData({ ...formData, rememberMe: e.target.checked });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isLoading) return;

    if (!formData.role) {
      setError("Please select a role: Customer or Farmer");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await axios.post("http://127.0.0.1:8000/api/login/", formData);
      const { tokens, user } = response.data;

      // Store tokens and login state
      localStorage.setItem("accessToken", tokens.access);
      localStorage.setItem("refreshToken", tokens.refresh);
      localStorage.setItem("rememberMe", formData.rememberMe);

      // Store user globally if needed
    //   localStorage.setItem("user", JSON.stringify(user)); 
      setUser(user);  // assuming user data is returned from the backend
      login(formData.role);  // if your AuthContext tracks role

      setSuccessMessage("Login Successful!");

      // Navigate based on role
      if (formData.role === "customer") {
        navigate("/"); // ✅ you can change this to "/" or another route
      } else if (formData.role === "farmer") {
        navigate("/farmer-dashboard");
      }
    } catch (error) {
      const err = error.response?.data;
      const firstError = err ? Object.values(err)[0]?.[0] : "Login failed.";
      setError(firstError);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div onClick={() => setShowUserLogin(false)} className="flex flex-col justify-center items-center h-full">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-green-700">
          Farms2Basket
        </h2>
        <h3 className="mt-2 text-center text-sm text-gray-600">
          "Connecting Farmers with the Future of Agriculture"
        </h3>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white bg-opacity-90 backdrop-blur-md py-8 px-4 shadow-lg sm:rounded-lg sm:px-10">
          {message && <div className="mb-4 text-red-600 text-sm">{message}</div>}
          {error && <div className="mb-4 text-red-600 text-sm">{error}</div>}
          {successMessage && <div className="mb-4 text-green-600 text-sm">{successMessage}</div>}

          <form onClick={(e) => e.stopPropagation()} className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                required
                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
              />
            </div>

            <div>
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                required
                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
              />
            </div>

            <div className="flex items-center justify-center space-x-6">
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  name="role"
                  value="customer"
                  checked={formData.role === "customer"}
                  onChange={handleChange}
                  className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300"
                />
                <span className="ml-2 text-sm text-gray-700">Customer</span>
              </label>
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  name="role"
                  value="farmer"
                  checked={formData.role === "farmer"}
                  onChange={handleChange}
                  className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300"
                />
                <span className="ml-2 text-sm text-gray-700">Farmer</span>
              </label>
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  name="rememberMe"
                  checked={formData.rememberMe}
                  onChange={handleCheckboxChange}
                  className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                />
                <span className="ml-2 text-sm text-gray-700">Remember me</span>
              </label>

              <div className="text-sm">
                <Link to="/forgot-password" className="font-medium text-green-600 hover:text-green-500">
                  Forgot password?
                </Link>
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={isLoading}
                className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 
                hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 ${
                  isLoading ? "opacity-70 cursor-not-allowed" : ""
                }`}
              >
                {isLoading ? "Logging in..." : "Login"}
              </button>
            </div>
          </form>

          {!error && (
            <div className="mt-6 text-center text-sm text-gray-600">
              Don't have an account?{" "}
              <Link to="/register" className="font-medium text-green-600 hover:text-green-500">
                Register here
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
