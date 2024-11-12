const API_URL = "http://localhost:3000/api";

export const login = async (credentials) => {
  const response = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(credentials),
  });
  const data = await response.json();
  if (response.ok) {
    localStorage.setItem("token", data.token);
    localStorage.setItem("userRole", data.user.tipo_usuario); // Guarda el rol del usuario
    localStorage.setItem("userName", `${data.user.usuario}`); // Guarda el nombre del usuario
    localStorage.setItem(
      "nombreapellido",
      `${data.user.nombre} ${data.user.apell_paterno} ${data.user.apell_materno}`
    ); // Guarda el nombre del usuario
  }
  return data;
};

export const register = async (formData) => {
  // Asegurarse de que el rol sea siempre 'user' antes de enviar
  const userData = {
    ...formData,
    tipo_usuario: "user",
  };

  const response = await fetch(`${API_URL}/users`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      usuario: userData.usuario,
      correo: userData.correo,
      nombre: userData.nombre,
      apell_paterno: userData.apell_paterno,
      apell_materno: userData.apell_materno,
      contrasena: userData.contrasena,
      tipo_usuario: "user", // Asegúrate de que se envíe siempre como "user"
    }),
  });

  const data = await response.json();

  if (response.ok) {
    return { success: true, message: "Registro exitoso." };
  } else {
    // Si el backend devuelve un error, lo muestra como parte de la respuesta
    return { success: false, message: data.error || "Error en el registro." };
  }
};

export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("userRole");
  localStorage.removeItem("userName");
};
