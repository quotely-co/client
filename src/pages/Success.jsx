import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

const Success = () => {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const [progress, setProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  const steps = [
    "Verifying payment details...",
    "Setting up your custom dashboard...",
    "Configuring your domain...",
    "Preparing workspace...",
    "Almost ready..."
  ];

  useEffect(() => {
    if (!sessionId) return;

    // Simulate creation process with stepped progress
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        const newProgress = prev + 1;
        // Update the current step based on progress
        if (newProgress % 20 === 0 && currentStep < steps.length - 1) {
          setCurrentStep(prev => prev + 1);
        }
        return newProgress;
      });
    }, 50);

    // After progress reaches 100%, wait a moment then mark as complete
    setTimeout(() => {
      clearInterval(progressInterval);
      setProgress(100);
      setCurrentStep(steps.length - 1);
      setTimeout(() => {
        setIsComplete(true);
      }, 500);
    }, 5000);

    // Final redirect after completion animation
    setTimeout(() => {
      const subdomain = localStorage.getItem("subdomain");
      const token = localStorage.getItem("token");
      if (subdomain) {
        window.location.href = `https://${subdomain}.quotely.shop?token=${encodeURIComponent(token)}`;
      } else {
        // Fallback if subdomain isn't found
        window.location.href = "https://quotely.shop/dashboard";
      }
    }, 7000);

    return () => clearInterval(progressInterval);
  }, [sessionId, steps.length, currentStep]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-blue-50 to-white p-6">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8 text-center">
        {/* Success Icon with Animation */}
        <div className="mb-6">
          <div className="mx-auto w-20 h-20 rounded-full bg-green-100 flex items-center justify-center">
            <svg
              className={`w-12 h-12 text-green-500 ${isComplete ? 'animate-bounce' : ''}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
        </div>

        {/* Title and Description */}
        <h1 className="text-2xl font-bold text-gray-800 mb-2">
          {isComplete ? "Your Dashboard is Ready!" : "Payment Successful! 🎉"}
        </h1>
        <p className="text-gray-600 mb-6">
          {isComplete
            ? "We've created your custom workspace. Redirecting you now..."
            : "We're setting up your personalized dashboard. This will just take a moment."}
        </p>

        {/* Progress Bar */}
        <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4">
          <div
            className="bg-blue-600 h-2.5 rounded-full transition-all duration-300 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Current Step Text */}
        <p className="text-sm text-gray-500 min-h-[20px]">
          {steps[currentStep]}
        </p>

        {/* Dashboard Creation Animation */}
        <div className="my-6 relative h-32 bg-gray-50 rounded-lg overflow-hidden border border-gray-200">
          {/* Simulated dashboard elements appearing */}
          <div className={`absolute top-0 left-0 w-full h-8 bg-blue-500 transition-opacity duration-500 ${progress > 20 ? 'opacity-100' : 'opacity-0'}`}></div>
          <div className={`absolute top-8 left-0 w-1/4 h-24 bg-gray-200 transition-opacity duration-500 ${progress > 40 ? 'opacity-100' : 'opacity-0'}`}></div>
          <div className={`absolute top-8 left-1/4 w-3/4 h-6 bg-gray-300 transition-opacity duration-500 ${progress > 60 ? 'opacity-100' : 'opacity-0'}`}></div>
          <div className={`absolute top-14 left-1/4 w-3/4 h-18 grid grid-cols-3 gap-2 p-2 transition-opacity duration-500 ${progress > 80 ? 'opacity-100' : 'opacity-0'}`}>
            <div className="bg-blue-100 rounded"></div>
            <div className="bg-green-100 rounded"></div>
            <div className="bg-yellow-100 rounded"></div>
          </div>
        </div>

        {/* Additional Info */}
        <p className="text-xs text-gray-400 mt-4">
          Transaction ID: {sessionId?.substring(0, 8)}...
        </p>
      </div>
    </div>
  );
};

export default Success;