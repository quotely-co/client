// LoginSuccess.js
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const LoginSuccess = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");
    if (token) {
      localStorage.setItem("token", token);
      window.location.href = `https://quotely.shop/dashboard` // redirect to protected page
    } else {
      navigate("/register"); // fallback if token is missing
    }
  }, [navigate]);

  return <p>Signing you in...</p>;
};

export default LoginSuccess;
