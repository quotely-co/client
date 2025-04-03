import React, { useState } from "react";
import Step1 from "./Step1";
import Step2 from "./Step2";
import Step3 from "./Step3";

const Onboarding = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    businessName: "",
    username: "",
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
    alert("Onboarding Complete!");
  };

  return (
    <div className="min-h-screen w-full bg-white">
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
  );
};

export default Onboarding;