const express = require('express');
const { getUsers, createUser, updateUser, deleteUser } = require('../controllers/userController');
const authenticateToken = require('../middleware/authenticateToken');
const router = express.Router();

/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Obtiene una lista de usuarios con paginación, ordenación, filtro y búsqueda
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: Número de la página (por defecto 1)
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: Número de usuarios por página (por defecto 10)
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: Búsqueda genérica en el nombre completo (nombre + apell_paterno + apell_materno)
 *       - in: query
 *         name: sort
 *         schema:
 *           type: string
 *         description: Columna para ordenar (por ejemplo, 'usuario' o 'correo')
 *       - in: query
 *         name: filterBy
 *         schema:
 *           type: string
 *         description: Columna específica para filtrar (por ejemplo, 'correo' o 'tipo_usuario')
 *       - in: query
 *         name: filterValue
 *         schema:
 *           type: string
 *         description: Valor a buscar en la columna especificada en filterBy
 *     responses:
 *       200:
 *         description: Lista de usuarios
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                       usuario:
 *                         type: string
 *                       correo:
 *                         type: string
 *                       nombre_completo:
 *                         type: string
 *                       tipo_usuario:
 *                         type: string
 *                 total:
 *                   type: integer
 *                   description: Total de usuarios encontrados
 *                 page:
 *                   type: integer
 *                   description: Número de página actual
 *                 limit:
 *                   type: integer
 *                   description: Límite de usuarios por página
 */
router.get('/', authenticateToken, getUsers);

/**
 * @swagger
 * /api/users:
 *   post:
 *     summary: Crea uno o varios usuarios
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             oneOf:
 *               - type: object
 *                 properties:
 *                   usuario:
 *                     type: string
 *                   correo:
 *                     type: string
 *                   nombre:
 *                     type: string
 *                   apell_paterno:
 *                     type: string
 *                   apell_materno:
 *                     type: string
 *                   contrasena:
 *                     type: string
 *                   tipo_usuario:
 *                     type: string
 *               - type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     usuario:
 *                       type: string
 *                     correo:
 *                       type: string
 *                     nombre:
 *                       type: string
 *                     apell_paterno:
 *                       type: string
 *                     apell_materno:
 *                       type: string
 *                     contrasena:
 *                       type: string
 *                     tipo_usuario:
 *                       type: string
 *     responses:
 *       200:
 *         description: Usuario(s) creado(s) exitosamente
 */
router.post('/' , createUser);

/**
 * @swagger
 * /api/users/{id}:
 *   put:
 *     summary: Actualiza un usuario por ID
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del usuario
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               usuario:
 *                 type: string
 *               correo:
 *                 type: string
 *               nombre:
 *                 type: string
 *               apell_paterno:
 *                 type: string
 *               apell_materno:
 *                 type: string
 *               contrasena:
 *                 type: string
 *               tipo_usuario:
 *                 type: string
 *     responses:
 *       200:
 *         description: Usuario actualizado exitosamente
 */
router.put('/:id', authenticateToken, updateUser);

/**
 * @swagger
 * /api/users/{id}:
 *   delete:
 *     summary: Elimina un usuario por ID
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del usuario
 *     responses:
 *       200:
 *         description: Usuario eliminado exitosamente
 */
router.delete('/:id', authenticateToken, deleteUser);

module.exports = router;
