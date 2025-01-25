// OpenRoute.js
import React from "react";
import { Navigate } from "react-router-dom";

const OpenRoute = ({ children }) => {
  const token = localStorage.getItem("token");

  // If the token exists, redirect to the dashboard
  return token ? <Navigate to="/factory" replace /> : children;
};

export default OpenRoute;
