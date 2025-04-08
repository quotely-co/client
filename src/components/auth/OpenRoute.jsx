// OpenRoute.js
import React from "react";
import { Navigate } from "react-router-dom";

const OpenRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  if (!token) {
    return children;
  }

  let payload;
  try {
    payload = JSON.parse(atob(token.split(".")[1])); // Decode JWT payload
  } catch (error) {
    console.error("Invalid token:", error);
    return children; // If token is invalid, treat user as unauthenticated
  }

  const host = import.meta.env.VITE_VENTOR_BASE_URL || "https://quotely.shop/";

  if (payload.role === "customer") {
    return <Navigate to="/customer" replace />;
  } else if (payload.role === "factory") {
    const subdomain = localStorage.getItem("subdomain");
    if (subdomain) {
      window.location.href = `http://${subdomain}.${host}?token=${token}`;
      return null; // Prevent React from rendering anything further
    }
    return <Navigate to="/factory" replace />; // Fallback in case no subdomain is set
  }

  return children;
};

export default OpenRoute;
