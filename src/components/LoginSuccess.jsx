// LoginSuccess.js
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

const LoginSuccess = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");
    if (token) {
      localStorage.setItem("token", token);
      window.location.href = `${API_URL}/dashboard` // redirect to protected page
    } else {
      navigate("/register"); // fallback if token is missing
    }
  }, [navigate]);

  return <p>Signing you in...</p>;
};

export default LoginSuccess;
