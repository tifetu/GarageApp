import React, { useState, useEffect } from "react";
import { Eye, EyeOff, User, Lock, Car } from "lucide-react";
import axios from "../../utils/axios"; // Adjust the import path as necessary
import { useNavigate } from "react-router-dom"; // For redirection

function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    employee_email: "",
    employee_password_hashed: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  // Optional: Check if user is already logged in
  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
      navigate("/dashboard", { replace: true }); // Redirect if already logged in
    }
  }, [navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      // Replace with your actual API endpoint
      const response = await axios.post(
        "/auth/login",
        {
          employee_email: formData.employee_email,
          employee_password_hashed: formData.employee_password_hashed,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === StatusCodes.OK) {
        localStorage.setItem("authToken", response.data.data.token);
        localStorage.setItem(
          "employee",
          JSON.stringify(response.data.data.employee)
        ); // ✅ works now
        navigate("/dashboard"); // or wherever
      }
    } catch (err) {
      const message =
        err.response?.data?.message || "Invalid credentials. Please try again.";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Login Card */}
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
          {/* Header (Uncomment if you want it back) */}
          {/* 
          <div className="bg-gradient-to-r from-red-600 to-red-700 px-8 py-12 text-center">
            <div className="flex justify-center mb-6">
              <div className="bg-white rounded-full p-4 shadow-lg">
                <Car className="w-12 h-12 text-red-600" />
              </div>
            </div>
            <div className="flex items-center justify-center mb-4">
              <div className="bg-red-600 text-white px-4 py-2 rounded-l-full">
                <span className="font-bold text-2xl">ABE</span>
              </div>
              <div className="bg-gray-800 text-white px-4 py-2 rounded-r-full">
                <span className="font-bold text-2xl">GARAGE</span>
              </div>
            </div>
            <p className="text-red-100 text-sm font-medium tracking-wide">
              AUTO REPAIR MANAGEMENT
            </p>
          </div> 
          */}

          {/* Login Form */}
          <div className="px-8 py-10">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-2">
                Welcome Back
              </h2>
              <p className="text-gray-600">
                Sign in to access your admin panel
              </p>
            </div>

            {error && (
              <div className="mb-6 p-3 bg-red-50 border border-red-200 text-red-700 rounded-lg text-sm text-center">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Username Field */}
              <div>
                <label
                  htmlFor="employee_email"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Email
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="employee_email"
                    name="employee_email"
                    type="text"
                    required
                    value={formData.employee_email}
                    onChange={handleInputChange}
                    className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-colors"
                    placeholder="Enter your email"
                  />
                </div>
              </div>

              {/* Password Field */}
              <div>
                <label
                  htmlFor="employee_password_hashed"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="employee_password_hashed"
                    name="employee_password_hashed"
                    type={showPassword ? "text" : "password"}
                    required
                    value={formData.employee_password_hashed}
                    onChange={handleInputChange}
                    className="block w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-colors"
                    placeholder="Enter your password"
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                    ) : (
                      <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                    )}
                  </button>
                </div>
              </div>

              {/* Remember Me & Forgot Password */}
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300 rounded"
                  />
                  <label
                    htmlFor="remember-me"
                    className="ml-2 block text-sm text-gray-700"
                  >
                    Remember me
                  </label>
                </div>
                <div className="text-sm">
                  <a
                    href="#"
                    className="font-medium text-red-600 hover:text-red-500 transition-colors"
                  >
                    Forgot password?
                  </a>
                </div>
              </div>

              {/* Login Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {loading ? "Signing in..." : "Sign In"}
              </button>
            </form>

            {/* Support Link */}
            <div className="mt-8 text-center">
              <p className="text-sm text-gray-600">
                Need help? Contact{" "}
                <a
                  href="mailto:support@abegarage.com"
                  className="font-medium text-red-600 hover:text-red-500"
                >
                  support@abegarage.com
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginForm;
