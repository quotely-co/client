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
      // On local development redirect to client dashboard (not API host)
      window.location.href = `${window.location.origin}/dashboard`;
    } else {
      navigate("/register"); // fallback if token is missing
    }
  }, [navigate]);

  return <p>Signing you in...</p>;
};

export default LoginSuccess;
