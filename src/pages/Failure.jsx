import { useEffect } from "react";

const Failure = () => {
  useEffect(() => {
    setTimeout(() => {
      window.location.href = `https://subdomain.maindomain.com`; // Change dynamically if needed
    }, 3000); // Redirect after 3 seconds
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-2xl font-bold text-red-600">Payment Failed ❌</h1>
      <p className="text-gray-700">Oops! Something went wrong.</p>
      <p className="text-gray-500">Redirecting you back to try again...</p>
    </div>
  );
};

export default Failure;
