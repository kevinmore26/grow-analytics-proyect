// src/middleware/authenticateToken.js
const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
  // Obtener el token de los headers de la solicitud
  const token = req.headers['authorization']?.split(' ')[1];
  if (!token) {
    return res.status(401).json({ message: 'Token no encontrado' });
  }

  // Verificar el token usando la clave secreta
  jwt.verify(token, 'secretKey', (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Token no válido' });
    }
    req.user = user; // Adjuntar la información del usuario al request
    next(); // Continuar con la siguiente función
  });
};

module.exports = authenticateToken;
