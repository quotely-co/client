import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

const RegisterPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ username: "", email: "", password: "" });
  const [otp, setOtp] = useState("");
  const [isOtpModalOpen, setIsOtpModalOpen] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await axios.post("http://localhost:5000/api/auth/register", formData);
      if (response.data.success) {
        toast.success(response.data.message);
        setIsOtpModalOpen(true);
      } else {
        toast.error(response.data.message || "Registration failed. Try again.");
      }
    } catch (err) {
      console.error("Error response:", err.response?.data);
      toast.error(err.response?.data?.message || "An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };


  const handleOtpSubmit = async () => {
    try {
      const response = await axios.post("http://localhost:5000/api/auth/verify-otp", { email: formData.email, otp });
      if (response.data.message === "User verified successfully") {
        const { token, id } = response.data;
        localStorage.setItem("token", token);
        toast.success("Verification successful!");
        navigate("/onboarding");
      } else {
        setError("Invalid OTP. Please try again.");
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
    }
  };

  return (
    <div className="flex h-screen">
      {/* Left Section */}
      <div className="hidden lg:block lg:w-1/3">
        <img
          src="/images/login.jpg"
          alt="Background"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Right Section */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md space-y-8">
          <h2 className="text-2xl font-bold mb-6 text-center">Create an Account</h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="username" className="block text-sm font-medium mb-2">
                Full Name
              </label>
              <input
                type="text"
                id="username"
                value={formData.username}
                onChange={handleInputChange}
                placeholder="Enter your full name"
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-2">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Enter your email"
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium mb-2">
                Password
              </label>
              <input
                type="password"
                id="password"
                value={formData.password}
                onChange={handleInputChange}
                placeholder="Enter your password"
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-[#1a1134] text-white p-3 rounded-lg hover:bg-[#2a1f44] transition-colors"
            >
              {isLoading ? "Registering..." : "Register"}
            </button>
          </form>

          <p className="text-center text-sm text-gray-600">
            Already have an account?{" "}
            <span
              onClick={() => navigate("/auth/login")}
              className="text-[#1a1134] hover:underline cursor-pointer font-medium"
            >
              Sign in
            </span>
          </p>
        </div>
      </div>

      {/* OTP Modal */}
      {isOtpModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-bold mb-4">Enter OTP</h2>
            <input
              type="text"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              placeholder="Enter OTP"
              className="w-full p-3 border rounded-lg mb-4"
            />
            <button
              onClick={handleOtpSubmit}
              className="w-full bg-[#1a1134] text-white p-3 rounded-lg hover:bg-[#2a1f44]"
            >
              Verify OTP
            </button>
            {error && <p className="text-red-600 mt-2">{error}</p>}
          </div>
        </div>
      )}
    </div>
  );
};

export default RegisterPage;
