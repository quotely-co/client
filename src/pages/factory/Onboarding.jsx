import React, { useState } from "react";
import Step1 from "./Step1";
import Step2 from "./Step2";
import Step3 from "./Step3";

const Onboarding = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    businessName: "",
    logo: null,
    brandColor: "#000000",
    email: "",
    phone: "",
    address: "",
   
  });

  const nextStep = () => setStep((prev) => prev + 1);
  const prevStep = () => setStep((prev) => prev - 1);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, logo: e.target.files[0] });
  };

  const handleSubmit = () => {
    console.log("Onboarding Data:", formData);
    alert("Onboarding Complete!");
  };

  return (
    <div className="min-h-screen w-full bg-gray-100 flex items-center justify-center px-4">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-4xl">
        <h2 className="text-3xl font-bold mb-6 text-center">
          Step {step} of 3
        </h2>
        <div>
          {step === 1 && (
            <Step1
              formData={formData}
              handleChange={handleChange}
              handleFileChange={handleFileChange}
              nextStep={nextStep}
            />
          )}
          {step === 2 && (
            <Step2
              formData={formData}
              handleChange={handleChange}
              nextStep={nextStep}
              prevStep={prevStep}
            />
          )}
          {/* {step === 3 && (
            <Step3
              formData={formData}
              handleChange={handleChange}
              prevStep={prevStep}
              handleSubmit={handleSubmit}
            />
          )} */}
        </div>
      </div>
    </div>
  );
};

export default Onboarding;
