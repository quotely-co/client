import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Step2 = ({ formData, handleChange, nextStep, prevStep }) => {
  const navigate = useNavigate()
  const [focused, setFocused] = useState("");

  const validateEmail = (email) => {
    return email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
  };

  const validatePhone = (phone) => {
    return phone.match(/^[\d\s\-\+\(\)]{10,}$/);
  };

  const isFormValid = () => {
    return (
      validateEmail(formData.email || "") &&
      validatePhone(formData.phone || "") &&
      (formData.address || "").length > 0
    );
  };
  const handleSubmit = async () => {
    try {

      const HOST = import.meta.env.VITE_HOST_URL;
      const token = localStorage.getItem("token");

      if (!token) {
        console.error("No access token found!");
        return;
      }
      const userID = localStorage.getItem("UserId")
      const response = await axios.post(
        `${HOST}/api/factory/add-factory`,
        { formData, userID },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        console.log(response.data);
        
        localStorage.setItem("token" , response.data.token)
        toast.success("Onborded SuccesFully")
        navigate("/factory ")
      }
    } catch (error) {
      console.error("Error saving branding details", error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-12">
      <div className="max-w-3xl mx-auto px-4">
        {/* Progress Steps */}
        <div className="flex justify-center mb-12">
          <div className="flex items-center space-x-4">
            <div className="flex items-center opacity-50">
              <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center">
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div className="ml-2">Branding</div>
            </div>
            <div className="w-16 h-0.5 bg-gray-300"></div>
            <div className="flex items-center">
              <div className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center">2</div>
              <div className="ml-2 font-medium">Contact</div>
            </div>
            <div className="w-16 h-0.5 bg-gray-300"></div>
            <div className="flex items-center opacity-50">
              <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center">3</div>
              <div className="ml-2">Payment</div>
            </div>
          </div>
        </div>

        <div className="section-heading mb-12">
          <h2 className="section-title">Contact Information</h2>
          <p className="section-description mt-4">How can your customers reach you?</p>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
          <form className="space-y-6">
            {/* Email Field */}
            <div>
              <label className="block mb-2 font-medium">Email Address</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  onFocus={() => setFocused("email")}
                  onBlur={() => setFocused("")}
                  className={`w-full pl-12 pr-4 py-3 border rounded-lg transition-all focus:ring-2 focus:ring-black focus:border-transparent ${focused === "email" ? "border-black" : "border-gray-200"
                    }`}
                  placeholder="your@email.com"
                />
              </div>
            </div>

            {/* Phone Field */}
            <div>
              <label className="block mb-2 font-medium">Phone Number</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  onFocus={() => setFocused("phone")}
                  onBlur={() => setFocused("")}
                  className={`w-full pl-12 pr-4 py-3 border rounded-lg transition-all focus:ring-2 focus:ring-black focus:border-transparent ${focused === "phone" ? "border-black" : "border-gray-200"
                    }`}
                  placeholder="+1 (555) 000-0000"
                />
              </div>
            </div>

            {/* Address Field */}
            <div>
              <label className="block mb-2 font-medium">Business Address</label>
              <div className="relative">
                <div className="absolute top-3 left-4 pointer-events-none">
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <textarea
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  onFocus={() => setFocused("address")}
                  onBlur={() => setFocused("")}
                  rows="4"
                  className={`w-full pl-12 pr-4 py-3 border rounded-lg transition-all focus:ring-2 focus:ring-black focus:border-transparent ${focused === "address" ? "border-black" : "border-gray-200"
                    }`}
                  placeholder="Enter your complete business address"
                />
              </div>
            </div>

            {/* Navigation Buttons */}
            <div className="flex justify-between pt-6">
              <button
                type="button"
                onClick={prevStep}
                className="btn btn-text inline-flex items-center space-x-2"
              >
                <svg className="w-4 h-4 transform rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                </svg>
                <span>Back to Branding</span>
              </button>
              <button
                type="button"
                onClick={handleSubmit}
                // disabled={!isFormValid()}
                className="btn btn-primary inline-flex items-center space-x-2"
              >
                <span>Submit</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Step2;