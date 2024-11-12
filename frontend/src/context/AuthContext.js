// AuthContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    // Inicializamos isAuthenticated y token basados en localStorage
    const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('authToken'));
    const [token, setToken] = useState(localStorage.getItem('authToken'));

    const login = (token) => {
        setIsAuthenticated(true);
        setToken(token);
        localStorage.setItem('authToken', token); // Almacena el token en localStorage
    };

    const logout = () => {
        setIsAuthenticated(false);
        setToken(null);
        localStorage.removeItem('authToken'); // Elimina el token de localStorage
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, token, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
