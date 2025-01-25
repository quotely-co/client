import React, { useState } from "react";
import axios from "axios";

const Step1 = ({ formData, handleChange, nextStep }) => {
  const [isUploading, setIsUploading] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const [previewLogo, setPreviewLogo] = useState(formData.logo || "");

  const handleFileChange = async (e) => {
    const file = e.target.files?.[0];
    await handleFileUpload(file);
  };

  const handleFileUpload = async (file) => {
    if (file) {
      try {
        setIsUploading(true);
        const cloudinaryFormData = new FormData();
        cloudinaryFormData.append("file", file);
        cloudinaryFormData.append("upload_preset", "WhiteLabel");

        const response = await axios.post(
          "https://api.cloudinary.com/v1_1/didflfhb4/image/upload",
          cloudinaryFormData
        );

        if (response.data.secure_url) {
          setPreviewLogo(response.data.secure_url);
          handleChange({
            target: { name: "logo", value: response.data.secure_url },
          });
        }
      } catch (error) {
        console.error("Error uploading image to Cloudinary", error);
        alert("Failed to upload image. Please try again.");
      } finally {
        setIsUploading(false);
      }
    }
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      await handleFileUpload(e.dataTransfer.files[0]);
    }
  };

  const handleSubmit = async () => {
    try {
      
      const HOST = import.meta.env.VITE_HOST_URL;
      const token = localStorage.getItem("token");

      if (!token) {
        console.error("No access token found!");
        return;
      }

      const response = await axios.post(
        `${HOST}/api/user/branding1`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        nextStep();
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
            <div className="flex items-center">
              <div className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center">1</div>
              <div className="ml-2 font-medium">Branding</div>
            </div>
            <div className="w-16 h-0.5 bg-gray-300"></div>
            <div className="flex items-center opacity-50">
              <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center">2</div>
              <div className="ml-2">Contact</div>
            </div>
            <div className="w-16 h-0.5 bg-gray-300"></div>
            <div className="flex items-center opacity-50">
              <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center">3</div>
              <div className="ml-2">Payment</div>
            </div>
          </div>
        </div>

        <div className="section-heading mb-12">
          <h2 className="section-title">Add Your Brand</h2>
          <p className="section-description mt-4">Let's Upgrade your sales</p>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
          <form className="space-y-8">
            {/* Business Name */}
            <div>
              <label className="block mb-2 font-medium">Business Name</label>
              <input
                type="text"
                name="businessName"
                value={formData.businessName}
                onChange={handleChange}
                className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition"
                placeholder="Enter your business name"
              />
            </div>

            {/* Logo Upload */}
            <div>
              <label className="block mb-2 font-medium">Logo Upload</label>
              <div
                className={`relative border-2 border-dashed rounded-lg p-8 text-center transition-all ${
                  dragActive ? "border-black bg-gray-50" : "border-gray-300"
                }`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
              >
                {previewLogo ? (
                  <div className="flex flex-col items-center">
                    <img 
                      src={previewLogo} 
                      alt="Logo preview" 
                      className="h-24 w-auto mb-4 object-contain"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        setPreviewLogo("");
                        handleChange({ target: { name: "logo", value: "" } });
                      }}
                      className="text-red-500 text-sm hover:text-red-600"
                    >
                      Remove Logo
                    </button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="flex justify-center">
                      <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-gray-600">Drag and drop your logo here, or</p>
                      <label className="mt-2 cursor-pointer">
                        <span className="text-black font-medium hover:underline">browse files</span>
                        <input
                          type="file"
                          className="hidden"
                          onChange={handleFileChange}
                          accept="image/*"
                          disabled={isUploading}
                        />
                      </label>
                    </div>
                    <p className="text-sm text-gray-500">Supported formats: PNG, JPG, GIF</p>
                  </div>
                )}
                {isUploading && (
                  <div className="absolute inset-0 bg-white/80 flex items-center justify-center rounded-lg">
                    <div className="flex items-center space-x-2">
                      <svg className="animate-spin h-5 w-5 text-black" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      <span>Uploading...</span>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Brand Color */}
            <div>
              <label className="block mb-2 font-medium">Brand Color</label>
              <div className="flex items-center space-x-4">
                <input
                  type="color"
                  name="brandColor"
                  value={formData.brandColor}
                  onChange={handleChange}
                  className="w-16 h-16 p-1 rounded-lg cursor-pointer"
                />
                <input
                  type="text"
                  value={formData.brandColor}
                  onChange={(e) => handleChange({ target: { name: "brandColor", value: e.target.value } })}
                  className="w-32 p-3 border border-gray-200 rounded-lg font-mono"
                  placeholder="#000000"
                />
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-end pt-4">
              <button
                type="button"
                onClick={nextStep}
                disabled={isUploading}
                className="btn btn-primary inline-flex items-center space-x-2"
              >
                <span>Continue to Subscription</span>
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

export default Step1;