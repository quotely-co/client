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
    <div className="min-h-screen bg-white flex justify-center">
      <div className="w-full max-w-3xl px-4 py-12">
        {/* Progress Steps - Clean Design */}
        <div className="flex justify-center mb-16">
          <div className="flex items-center">
            <div className="flex items-center justify-center">
              <div className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center">1</div>
              <span className="ml-2 text-sm font-medium">Branding</span>
            </div>
            <div className="w-16 h-px bg-gray-200 mx-4"></div>
            <div className="flex items-center justify-center opacity-60">
              <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">2</div>
              <span className="ml-2 text-sm">Contact</span>
            </div>
            <div className="w-16 h-px bg-gray-200 mx-4"></div>
            <div className="flex items-center justify-center opacity-60">
              <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">3</div>
              <span className="ml-2 text-sm">Payment</span>
            </div>
          </div>
        </div>

        {/* Main Content Container */}
        <div className="max-w-xl mx-auto">
          {/* Header */}
          <div className="mb-12">
            <h1 className="text-2xl font-medium">Add Your Brand</h1>
            <p className="text-gray-500 mt-1">Let's upgrade your sales</p>
          </div>

          {/* Form */}
          <div className="space-y-3">
            {/* Business Name and Username */}
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block mb-2 font-medium">Business Name</label>
                <input
                  type="text"
                  name="businessName"
                  value={formData.businessName}
                  onChange={handleChange}
                  className="w-full p-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-black"
                  placeholder="Enter business name"
                />
              </div>
              <div>
                <label className="block mb-2 font-medium">Username</label>
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  className="w-full p-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-black"
                  placeholder="Enter username"
                />
              </div>
            </div>

            {/* Logo Upload */}
            <div>
              <label className="block mb-2 font-medium">Logo Upload</label>
              <div
                className={`border border-dashed rounded-md p-10 flex flex-col items-center justify-center ${
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
                      className="h-16 w-auto mb-2 object-contain"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        setPreviewLogo("");
                        handleChange({ target: { name: "logo", value: "" } });
                      }}
                      className="text-red-500 text-sm hover:text-red-600"
                    >
                      Remove
                    </button>
                  </div>
                ) : (
                  <>
                    <div className="mb-2">
                      <svg className="w-8 h-8 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <p className="text-gray-500">
                      Drag file or{" "}
                      <label className="cursor-pointer">
                        <span className="text-black font-medium hover:underline">browse</span>
                        <input
                          type="file"
                          className="hidden"
                          onChange={handleFileChange}
                          accept="image/*"
                          disabled={isUploading}
                        />
                      </label>
                    </p>
                    <p className="text-sm text-gray-400 mt-1">PNG, JPG, GIF</p>
                  </>
                )}
                {isUploading && (
                  <div className="absolute inset-0 bg-white/90 flex items-center justify-center rounded-md">
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
              <label className="block  font-medium">Brand Color</label>
              <div className="flex items-center space-x-3">
                <input
                  type="color"
                  name="brandColor"
                  value={formData.brandColor}
                  onChange={handleChange}
                  className="w-10 h-10 p-0 border-0 rounded cursor-pointer"
                />
                <input
                  type="text"
                  value={formData.brandColor}
                  onChange={(e) => handleChange({ target: { name: "brandColor", value: e.target.value } })}
                  className="w-28 p-2.5 border border-gray-300 rounded-md font-mono"
                  placeholder="#000000"
                />
              </div>
            </div>

            {/* Continue Button */}
            <div className="flex justify-end mt-10">
              <button
                type="button"
                onClick={nextStep}
                disabled={isUploading}
                className="px-6 py-2.5 bg-black text-white rounded-md hover:bg-gray-800 transition-colors"
              >
                Continue
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Step1;