import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Register from '../components/Register';
import { register } from '../services/authService';

const RegisterPage = () => {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState('');

  const handleRegister = async (userData) => {
    try {
      const response = await register(userData);
      if (response.success) {
        navigate('/login'); // Redirige al login tras el registro exitoso
      } else {
        setErrorMessage(response.message); // Muestra el mensaje de error del servicio
      }
    } catch (error) {
      setErrorMessage('Ocurrió un error en el registro. Inténtalo de nuevo.'); // Error genérico
    }
  };

  return <Register onRegister={handleRegister} errorMessage={errorMessage} />;
};

export default RegisterPage;
