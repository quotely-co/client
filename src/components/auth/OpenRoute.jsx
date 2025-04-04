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

  console.log(payload);

  if (payload.role === "customer") {
    return <Navigate to="/customer" replace />;
  } else if (payload.role === "factory") {
    const subdomain = localStorage.getItem("subdomain");
    if (subdomain) {
      window.location.href = `http://${subdomain}.localhost:3000?token=${token}`;
      return null; // Prevent React from rendering anything further
    }
    return <Navigate to="/factory" replace />; // Fallback in case no subdomain is set
  }

  return children;
};

export default OpenRoute;
