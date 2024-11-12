const bcrypt = require("bcrypt");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const getUsers = async (req, res) => {
  const {
    page = 1,
    limit = 10,
    search,
    sort,
    filterBy,
    filterValue,
  } = req.query;

  // Desglosar el campo y el orden de 'sort'
  const [sortField, sortOrder] = sort ? sort.split("_") : [];

  try {
    // Validación de filtros
    if (filterBy && !filterValue) {
      return res
        .status(400)
        .json({
          error:
            "El valor del filtro es requerido cuando se especifica el campo de filtro.",
        });
    }

    const where = {};
    if (search) {
      where.OR = [
        { nombre: { contains: search } },
        { apell_paterno: { contains: search } },
        { apell_materno: { contains: search } },
      ];
    }

    if (filterBy && filterValue) {
      where[filterBy] = { contains: filterValue };
    }

    // Total de usuarios sin aplicar paginación
    const totalUsers = await prisma.usuario.count({ where });

    // Obtener usuarios con paginación y ordenamiento
    const users = await prisma.usuario.findMany({
      where,
      skip: (page - 1) * limit,
      take: parseInt(limit),
      orderBy: sortField
        ? { [sortField]: sortOrder === "desc" ? "desc" : "asc" }
        : undefined,
    });

    const usersWithFullName = users.map((user) => ({
      ...user,
      nombre_completo: `${user.nombre} ${user.apell_paterno} ${user.apell_materno}`,
    }));

    res.json({
      data: usersWithFullName,
      total: totalUsers,
      page: parseInt(page),
      limit: parseInt(limit),
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Crear un nuevo usuario con hasheo de contraseñas
const createUser = async (req, res) => {
  const data = req.body;

  try {
    // Desestructurar datos y verificar que `usuario` y `correo` existan
    const { usuario, correo, contrasena } = data;
    if (!usuario || !correo || !contrasena) {
      return res
        .status(400)
        .json({ error: "Usuario, correo y contraseña son obligatorios" });
    }

    // Verificar duplicados
    const existingUser = await prisma.usuario.findUnique({
      where: { usuario },
    });
    const existingEmail = await prisma.usuario.findUnique({
      where: { correo },
    });

    if (existingUser) {
      return res.status(400).json({ error: "El usuario ya está registrado." });
    }
    if (existingEmail) {
      return res.status(400).json({ error: "El correo ya está registrado." });
    }

    // Hashear la contraseña y crear el usuario
    const hashedPassword = await bcrypt.hash(contrasena, 10);
    const newUser = await prisma.usuario.create({
      data: { ...data, contrasena: hashedPassword, tipo_usuario: "user" },
    });
    res.json(newUser);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Actualizar un usuario por ID (con hasheo opcional de contraseña)
const updateUser = async (req, res) => {
  const { id } = req.params;
  const {
    usuario,
    correo,
    nombre,
    apell_paterno,
    apell_materno,
    contrasena,
    tipo_usuario,
  } = req.body;

  try {
    // Hashea la contraseña solo si está incluida en la actualización
    const updateData = {
      usuario,
      correo,
      nombre,
      apell_paterno,
      apell_materno,
      tipo_usuario,
    };

    if (contrasena) {
      updateData.contrasena = await bcrypt.hash(contrasena, 10);
    }

    const updatedUser = await prisma.usuario.update({
      where: { id: parseInt(id) },
      data: updateData,
    });
    res.json(updatedUser);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Eliminar un usuario por ID
const deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.usuario.delete({
      where: { id: parseInt(id) },
    });
    res.json({ message: "Usuario eliminado con éxito" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getUsers,
  createUser,
  updateUser,
  deleteUser,
};
