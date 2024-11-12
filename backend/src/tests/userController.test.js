const request = require("supertest");
const app = require("../index"); 
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

let token;

// Función para hacer login y obtener el token
const loginAndGetToken = async () => {
  const response = await request(app).post("/api/auth/login").send({
    usuario: "admin",
    password: "password",
  });
  return response.body.token;
};

beforeAll(async () => {
  token = await loginAndGetToken();
});

describe("GET /api/users", () => {
  it("Debería devolver una lista de usuarios con paginación", async () => {
    const response = await request(app)
      .get("/api/users?page=1&limit=10")
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("data");
    expect(response.body).toHaveProperty("total");
    expect(response.body).toHaveProperty("page");
    expect(response.body).toHaveProperty("limit");
  });

  it("Debería devolver error 401 si no hay token de autenticación", async () => {
    const response = await request(app).get("/api/users");

    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty("message", "Token no encontrado");
  });

  it("Debería devolver error 400 si los filtros son inválidos", async () => {
    const response = await request(app)
      .get("/api/users?page=1&limit=10&filterBy=nombre&filterValue=") // filterValue está vacío
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("error");
  });
});
