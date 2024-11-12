const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { PrismaClient } = require("@prisma/client");

const router = express.Router();
const prisma = new PrismaClient();

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Inicia sesión y obtiene un token JWT
 *     description: Autentica al usuario usando su nombre de usuario o correo y contraseña. Devuelve un token JWT si las credenciales son correctas.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               usuario:
 *                 type: string
 *                 description: Nombre de usuario
 *                 example: "usuario123"
 *               correo:
 *                 type: string
 *                 description: Correo electrónico del usuario
 *                 example: "usuario@example.com"
 *               password:
 *                 type: string
 *                 description: Contraseña del usuario
 *                 example: "password123"
 *     responses:
 *       200:
 *         description: Token JWT
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   description: Token JWT para autenticar futuras solicitudes
 *                   example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *       401:
 *         description: Contraseña incorrecta
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Contraseña incorrecta"
 *       404:
 *         description: Usuario no encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Usuario no encontrado"
 *       500:
 *         description: Error en el servidor
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Error al procesar la solicitud"
 */

router.post("/login", async (req, res) => {
  const { usuario, correo, password } = req.body;

  try {
    // Buscar al usuario por nombre de usuario o correo
    const user = await prisma.usuario.findUnique({
      where: usuario ? { usuario } : { correo },
    });

    // Si el usuario no existe, devolver un error 404
    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    // Comparar la contraseña proporcionada con la almacenada en la base de datos
    const validPassword = await bcrypt.compare(password, user.contrasena);
    if (!validPassword) {
      return res.status(401).json({ message: "Contraseña incorrecta" });
    }

    // Crear un token JWT con el ID y correo del usuario
    const token = jwt.sign({ id: user.id, email: user.correo }, "secretKey", {
      expiresIn: "1h",
    });

    // Excluir la contraseña del objeto user antes de enviarlo
    const { contrasena, ...userWithoutPassword } = user;

    // Enviar la respuesta con el token y la información del usuario
    res.json({
      token,
      user: userWithoutPassword, // Enviar los datos del usuario sin la contraseña
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
