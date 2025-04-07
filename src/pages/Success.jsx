import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";

const Success = () => {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get("session_id");

  useEffect(() => {
    if (sessionId) {
      // Fetch session details from your backend if needed
      setTimeout(() => {
        const subdomain = localStorage.getItem("subdomain");
        window.location.href = `https://${subdomain}.quotely.shop`; // Change dynamically if needed
      }, 3000); // Redirect after 3 seconds
    }
  }, [sessionId]);

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-2xl font-bold text-green-600">Payment Successful! 🎉</h1>
      <p className="text-gray-700">Thank you for your purchase.</p>
      <p className="text-gray-500">Redirecting you shortly...</p>
    </div>
  );
};

export default Success;
