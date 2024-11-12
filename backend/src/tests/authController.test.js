const request = require("supertest");
const app = require("../index"); 
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const bcrypt = require("bcrypt");

beforeAll(async () => {
  const passwordHash = await bcrypt.hash("password123", 10);
  await prisma.usuario.upsert({
    where: { usuario: "testuser" },
    update: {},
    create: {
      usuario: "testuser",
      correo: "testuser@example.com",
      contrasena: passwordHash,
      nombre: "Test",
      apell_paterno: "User",
      apell_materno: "Example",
      tipo_usuario: "user",
    },
  });
});

afterAll(async () => {
  await prisma.usuario.deleteMany({ where: { usuario: "testuser" } });
  await prisma.$disconnect();
});

describe("POST /api/auth/login", () => {
  it("Debería devolver un token JWT con credenciales correctas", async () => {
    const response = await request(app).post("/api/auth/login").send({
      usuario: "testuser",
      password: "password123",
    });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("token");
    expect(response.body.user).toHaveProperty("usuario", "testuser"); 
  });

  it("Debería devolver error 404 si el usuario no existe", async () => {
    const response = await request(app).post("/api/auth/login").send({
      usuario: "nonexistentuser",
      password: "password123",
    });

    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty("message", "Usuario no encontrado");
  });

  it("Debería devolver error 401 si la contraseña es incorrecta", async () => {
    const response = await request(app).post("/api/auth/login").send({
      usuario: "testuser",
      password: "wrongpassword",
    });

    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty("message", "Contraseña incorrecta");
  });
});
