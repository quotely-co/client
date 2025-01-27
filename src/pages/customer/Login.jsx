import axios from 'axios';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const HOST = import.meta.env.VITE_HOST_URL;

    const handleLogin = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            const response = await axios.post(`${HOST}/api/auth/login`, {
                email,
                password,
            });

            const { token } = response.data;

            // Store token in localStorage
            localStorage.setItem("authToken", token);

            toast.success("login successfull")
            navigate("/dashboard");
        } catch (err) {
            const errorMsg =
                err.response?.data?.message || "Something went wrong. Please try again.";
            toast.error(errorMsg)
        } finally {
            setLoading(false);
        }
    };
    return (
        <div className="flex h-screen bg-gray-50">
            {/* Left Section - Just Image */}
            <div className="hidden lg:block lg:w-1/3">
                <img
                    src="/images/hy.jpg"
                    alt="Login Background"
                    className="w-full h-full object-cover"
                />
            </div>

            {/* Right Section */}
            <div className="w-full lg:w-2/3 flex items-center justify-center px-6 py-8">
                <div className="w-full max-w-md">
                    {/* Heading */}
                    <div className="text-center mb-8">
                        <h1 className="text-3xl font-bold text-gray-800">Sign in to White Label</h1>
                        <p className="text-sm text-gray-500 mt-2">
                            Welcome back! Please login to your account.
                        </p>
                    </div>
                    {/* Error Message */}
                    {error && (
                        <div className="bg-red-100 text-red-600 border border-red-300 p-2 rounded mb-4">
                            {error}
                        </div>
                    )}

                    {/* Google Sign-in Button */}
                    <button
                        className="w-full flex items-center justify-center border border-gray-300 rounded-lg p-3 hover:bg-gray-100 focus:ring-2 focus:ring-gray-400 transition"
                        aria-label="Sign in with Google"
                    >
                        <img
                            src="https://img.icons8.com/?size=100&id=17949&format=png&color=000000"
                            alt="Google"
                            className="w-5 h-5 mr-2"
                        />

                        <span className="font-medium text-gray-700">Sign in with Google</span>
                    </button>

                    {/* Divider */}
                    <div className="relative my-6">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-gray-300"></div>
                        </div>
                        <div className="relative flex justify-center bg-gray-50 px-4">
                            <span className="text-sm text-gray-500">or sign in with email</span>
                        </div>
                    </div>

                    {/* Login Form */}
                    <form className="space-y-6" onSubmit={handleLogin}>
                        {/* Email Input */}
                        <div>
                            <label
                                htmlFor="email"
                                className="block text-sm font-medium text-gray-700"
                            >
                                Email
                            </label>
                            <input
                                id="email"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                placeholder="Enter your email"
                                className="w-full mt-1 p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                            />
                        </div>

                        {/* Password Input */}
                        <div>
                            <div className="flex items-center justify-between">
                                <label
                                    htmlFor="password"
                                    className="block text-sm font-medium text-gray-700"
                                >
                                    Password
                                </label>
                                <a
                                    href="#"
                                    className="text-sm text-blue-600 hover:underline focus:outline-none"
                                >
                                    Forgot Password?
                                </a>
                            </div>
                            <input
                                id="password"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                placeholder="Enter your password"
                                className="w-full mt-1 p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                            />
                        </div>

                        {/* Sign In Button */}
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-[#1a1134] text-white p-3 rounded-lg hover:bg-[#2a1f44] focus:ring-2 focus:ring-[#1a1134] transition disabled:opacity-50"
                        >
                            {loading ? "Signing In..." : "Sign In"}
                        </button>
                    </form>

                    {/* Sign Up Link */}
                    <p className="text-center text-sm text-gray-600 mt-6">
                        Don't have an account?{' '}
                        <button
                            type="button"
                            onClick={() => navigate('/auth/register')}
                            className="text-[#1a1134] font-medium hover:underline focus:outline-none"
                        >
                            Sign up
                        </button>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
