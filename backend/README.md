# Grow Analytics - Backend

Este proyecto es el backend para la aplicación Grow Analytics. Proporciona una API REST para la gestión de usuarios, permitiendo operaciones CRUD con funcionalidades de paginación, ordenación, filtrado y búsqueda.

## Requisitos Previos

Asegúrate de tener los siguientes requisitos instalados antes de empezar:

- **Node.js** (versión 14 o superior)
- **Docker** (para levantar la base de datos MySQL)

## Configuración del Proyecto

### 1. Clona el repositorio

```   - 
cd grow-analytics-test/backend
2. Instala las dependencias
   -
 
npm install
3. Configura las variables de entorno
Crea un archivo .env en el directorio backend con el siguiente contenido:

   
 
DATABASE_URL="mysql://root:root@localhost:3307/grow_analytics"
Este archivo .env define la conexión a la base de datos MySQL que se levantará en Docker.

4. Levanta la base de datos con Docker
Ejecuta el siguiente comando en la raíz del proyecto (CARPETA BACKEND) (donde está el archivo docker-compose.yml):

   -
 
docker-compose up -d
Esto iniciará un contenedor de MySQL en el puerto 3307 en el host local y creará la base de datos grow_analytics.

5. Ejecuta las migraciones de Prisma
Asegúrate de estar en el directorio backend y ejecuta:

   -
 
npx prisma migrate dev --name init
Este comando aplicará todas las migraciones en el directorio prisma/migrations y creará las tablas necesarias en la base de datos.

6. Inicia el servidor
Finalmente, puedes iniciar el backend ejecutando:

   -
 
node src/index.js
El servidor estará corriendo en http://localhost:3000.

Documentación de la API
Crear Usuarios - POST /api/users
Este endpoint permite crear uno o varios usuarios. Acepta un objeto único o un array de usuarios.

Ejemplo:

Un solo usuario:

json
 
{
  "usuario": "usuario1",
  "correo": "usuario1@example.com",
  "nombre": "Juan",
  "apell_paterno": "Perez",
  "apell_materno": "Gonzalez",
  "contrasena": "password1",
  "tipo_usuario": "user"
}
Varios usuarios:

json
 
[
  {
    "usuario": "usuario1",
    "correo": "usuario1@example.com",
    "nombre": "Juan",
    "apell_paterno": "Perez",
    "apell_materno": "Gonzalez",
    "contrasena": "password1",
    "tipo_usuario": "user"
  },
  {
    "usuario": "usuario2",
    "correo": "usuario2@example.com",
    "nombre": "Maria",
    "apell_paterno": "Garcia",
    "apell_materno": "Martinez",
    "contrasena": "password2",
    "tipo_usuario": "user"
  }
]
Obtener Usuarios - GET /api/users
Este endpoint permite obtener una lista de usuarios con opciones de paginación, ordenación, filtrado y búsqueda.

Parámetros de consulta:

page: Número de página (por defecto es 1).
limit: Número de usuarios por página (por defecto es 10).
sort: Columna para ordenar (por ejemplo, usuario, correo).
search: Búsqueda en nombre completo (nombre, apellido paterno y apellido materno).
filterBy: Columna específica para filtrar (por ejemplo, correo, tipo_usuario).
filterValue: Valor a buscar en la columna especificada en filterBy.
Ejemplos de uso:

Obtener la primera página con 10 usuarios:

   
 
GET http://localhost:3000/api/users?page=1&limit=10
Ordenar por la columna usuario en orden ascendente:

   
 
GET http://localhost:3000/api/users?sort=usuario
Buscar usuarios cuyo nombre completo contenga "Juan":

   
 
GET http://localhost:3000/api/users?search=Juan
Filtrar usuarios por tipo_usuario = admin:

   
 
GET http://localhost:3000/api/users?filterBy=tipo_usuario&filterValue=admin
Actualizar Usuario - PUT /api/users/:id
Este endpoint permite actualizar un usuario específico por su ID.

Cuerpo de la solicitud (ejemplo):

json
 
{
  "usuario": "nuevoUsuario",
  "correo": "nuevoCorreo@example.com",
  "nombre": "NuevoNombre",
  "apell_paterno": "NuevoApellidoPaterno",
  "apell_materno": "NuevoApellidoMaterno",
  "contrasena": "nuevaPassword",
  "tipo_usuario": "user"
}
Eliminar Usuario - DELETE /api/users/:id
Este endpoint permite eliminar un usuario específico por su ID.

Ejemplo de solicitud:

   
 
DELETE http://localhost:3000/api/users/1
Notas adicionales
Migraciones en Prisma: Al agregar nuevos modelos o cambiar la estructura de los existentes en schema.prisma, recuerda ejecutar npx prisma migrate dev --name <nombre_de_la_migracion> para aplicar las migraciones a la base de datos.
Docker: El contenedor MySQL persistirá los datos en un volumen llamado db_data, por lo que la información no se perderá entre reinicios de Docker.