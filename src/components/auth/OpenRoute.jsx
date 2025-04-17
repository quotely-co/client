import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";

const OpenRoute = ({ children }) => {
  const urlParams = new URLSearchParams(window.location.search);
  const isLoggingOut = urlParams.get("logout") === "true";
  const [token, setToken] = useState(localStorage.getItem("token"));

  useEffect(() => {
    if (isLoggingOut) {
      // Clear token and subdomain on logout
      localStorage.removeItem("token");
      localStorage.removeItem("subdomain");

      // Update our state to reflect the removed token
      setToken(null);

      // Clean the URL by removing ?logout=true
      const newUrl = window.location.origin + window.location.pathname;
      window.history.replaceState({}, document.title, newUrl);
    }
  }, [isLoggingOut]);

  // If no token, render children (login page)
  if (!token) {
    return children;
  }

  let payload;
  try {
    payload = JSON.parse(atob(token.split(".")[1]));
  } catch (error) {
    console.error("Invalid token:", error);
    return children;
  }
  if (payload.role === "customer") {
    return <Navigate to="/dashboard" replace />;
  } else if (payload.role === "factory") {
    const subdomain = localStorage.getItem("subdomain");
    if (subdomain) {
      window.location.href = `http://${subdomain}.quotely.shop?token=${token}`;
      return null;
    }
    return <Navigate to="/factory" replace />;
  }

  return children;
};

export default OpenRoute;