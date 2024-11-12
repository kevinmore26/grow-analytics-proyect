// LoginPage.js
import React from "react";
import { useNavigate } from "react-router-dom";
import Login from "../components/Login";
import { login as loginService } from "../services/authService";
import { useAuth } from "../context/AuthContext";

const LoginPage = () => {
  const navigate = useNavigate();
  const { login } = useAuth(); // Utiliza login del contexto

  const handleLogin = async (credentials) => {
    const response = await loginService(credentials); // Asegúrate de que loginService sea la función de autenticación
    if (response.token) {
      login(response.token); // Usa el método login del contexto para actualizar el estado
      navigate("/dashboard");
    } else {
      alert("Credenciales incorrectas");
    }
  };

  return <Login onLogin={handleLogin} />;
};

export default LoginPage;
