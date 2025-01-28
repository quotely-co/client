import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { X } from "lucide-react";

const RegisterPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ username: "", email: "", password: "" });
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [isOtpModalOpen, setIsOtpModalOpen] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const HOST = import.meta.env.VITE_HOST_URL;
  const otpRefs = useRef([]);

  useEffect(() => {
    otpRefs.current = otpRefs.current.slice(0, 6);
  }, []);

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleOtpChange = (element, index) => {
    if (isNaN(element.value)) return false;

    setOtp([...otp.map((d, idx) => (idx === index ? element.value : d))]);

    if (element.value && index < 5) {
      otpRefs.current[index + 1].focus();
    }
  };

  const handleOtpKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      otpRefs.current[index - 1].focus();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await axios.post(`${HOST}/api/auth/register?type=factory`, formData);
      if (response.data.success) {
        const userId = response.data.user.id;
        localStorage.setItem('UserId', userId);
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
    const otpValue = otp.join("");
    if (otpValue.length !== 6) {
      setError("Please enter complete OTP");
      return;
    }

    try {
      const response = await axios.post(`${HOST}/api/auth/verify-otp`, { 
        email: formData.email, 
        otp: otpValue 
      });
      if (response.data.message === "User verified successfully") {
        const { token, id } = response.data;
        localStorage.setItem("token", token);
        toast.success("Verification successful!");
        navigate("/factory/onboarding");
      } else {
        setError("Invalid OTP. Please try again.");
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Left Section */}
      <div className="hidden lg:block lg:w-1/3 relative">
        <img
          src="/images/login.jpg"
          alt="Background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/30" />
      </div>

      {/* Right Section */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md space-y-8">
          <h2 className="text-2xl font-bold mb-6 text-center">Create an Account</h2>

          <form onSubmit={handleSubmit} className="space-y-6 mt-8">
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-2">
                Full Name
              </label>
              <input
                type="text"
                id="username"
                value={formData.username}
                onChange={handleInputChange}
                placeholder="Enter your full name"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all duration-200 bg-gray-50"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Enter your email"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all duration-200 bg-gray-50"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <input
                type="password"
                id="password"
                value={formData.password}
                onChange={handleInputChange}
                placeholder="Enter your password"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all duration-200 bg-gray-50"
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-[#1a1134] text-white p-4 rounded-lg hover:bg-[#2a1f44] transition-colors duration-200 font-medium text-sm disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? "Creating Account..." : "Create Account"}
            </button>
          </form>

          <p className="text-center text-sm text-gray-600">
            Already have an account?{" "}
            <button
              onClick={() => navigate("/auth/factory/login")}
              className="text-[#1a1134] hover:text-[#2a1f44] font-medium transition-colors duration-200"
            >
              Sign in
            </button>
          </p>
        </div>
      </div>

      {/* Enhanced OTP Modal */}
      {isOtpModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-8 rounded-2xl shadow-xl w-[400px] relative">
            <button
              onClick={() => setIsOtpModalOpen(false)}
              className="absolute right-4 top-4 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X size={20} />
            </button>
            
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Enter Verification Code</h2>
              <p className="text-gray-600 text-sm">
                We've sent a verification code to your email
              </p>
            </div>

            <div className="flex justify-center gap-2 mb-6">
              {[0, 1, 2, 3, 4, 5].map((index) => (
                <input
                  key={index}
                  type="text"
                  maxLength="1"
                  ref={(ref) => (otpRefs.current[index] = ref)}
                  value={otp[index]}
                  onChange={(e) => handleOtpChange(e.target, index)}
                  onKeyDown={(e) => handleOtpKeyDown(e, index)}
                  className="w-12 h-12 border-2 rounded-lg text-center text-xl font-semibold text-gray-900 focus:border-[#1a1134] focus:ring-2 focus:ring-[#1a1134] outline-none transition-all"
                />
              ))}
            </div>

            {error && (
              <p className="text-red-500 text-sm text-center mb-4">{error}</p>
            )}

            <button
              onClick={handleOtpSubmit}
              className="w-full bg-[#1a1134] text-white p-4 rounded-lg hover:bg-[#2a1f44] transition-colors duration-200 font-medium"
            >
              Verify Code
            </button>

            <p className="text-center text-sm text-gray-600 mt-4">
              Didn't receive the code?{" "}
              <button className="text-[#1a1134] hover:text-[#2a1f44] font-medium">
                Resend
              </button>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default RegisterPage;