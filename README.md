# Grow Analytics Project

Informe resumido : https://drive.google.com/file/d/1tFC6LU4Lfm30RDNaM2IM95ktcbd-rr2S/view?usp=sharing

Este proyecto contiene un sistema completo dividido en dos partes:

- **Backend**: Una API REST construida con Node.js, Express y Prisma, conectada a una base de datos MySQL.
- **Frontend**: Una aplicación frontend construida en React que consume la API del backend.

Este README proporciona instrucciones para instalar, configurar y ejecutar ambos.

## Requisitos

Asegúrate de tener instalados los siguientes requisitos previos:

- [Node.js](https://nodejs.org/) (versión recomendada: 14 o superior)
- [Docker](https://www.docker.com/) (para levantar la base de datos MySQL)

## Configuración del Proyecto

### Clonar el Repositorio

```  -
git clone https://github.com/kevinmore26/grow-analytics-proyect 
cd grow-analytics-proyect/
Configuración del Backend
Ve a la carpeta backend:

  -
  -
cd backend
Instala las dependencias del backend:

  -
  -
npm install
Configura las variables de entorno creando un archivo .env en la carpeta backend con el siguiente contenido (o modifica según tu configuración):

env
  -
DATABASE_URL="mysql://root:root@localhost:3307/grow_analytics"
Inicia el contenedor de Docker para la base de datos MySQL:

  -
  -
docker-compose up -d
Ejecuta las migraciones de la base de datos:

  -
  -
npx prisma migrate dev --name init
Inicia el servidor backend:

  -
  -
node src/index.js
El backend estará disponible en http://localhost:3000.

Configuración del Frontend
Abre una nueva terminal y ve a la carpeta frontend:

  -
  -
cd frontend
Instala las dependencias del frontend:

  -
  -
npm install
Crea un archivo .env en la carpeta frontend con las variables necesarias (modifica según la configuración de tu backend):

env
  -
REACT_APP_API_URL="http://localhost:3000/api"
Inicia la aplicación frontend:

  -
  -
npm start
La aplicación frontend estará disponible en http://localhost:3001.

Uso
Ejecutar el Proyecto Completo
Para ejecutar el proyecto completo (tanto el backend como el frontend):

Asegúrate de que la base de datos esté corriendo en Docker (consulta los pasos de configuración del backend).
Ejecuta el backend en una terminal.
Ejecuta el frontend en otra terminal.
Endpoints de la API
Consulta el archivo README.md en la carpeta backend para obtener detalles sobre los endpoints de la API, incluyendo los endpoints de creación, obtención, actualización y eliminación de usuarios.

Funcionalidades del Frontend
Consulta el archivo README.md en la carpeta frontend para detalles sobre las funcionalidades del frontend, incluyendo instrucciones de navegación y uso de la aplicación.

Estructura del Proyecto
plaintext
  -
grow-analytics-test/
├── backend/                  # Carpeta del backend (API y lógica del servidor)
│   ├── prisma/               # Configuración y migraciones de la base de datos
│   ├── src/                  # Código fuente del backend
│   ├── .env                  # Variables de entorno para el backend
│   ├── docker-compose.yml    # Configuración de Docker para MySQL
│   └── README.md             # Instrucciones detalladas del backend
├── frontend/                 # Carpeta del frontend (aplicación React)
│   ├── public/               # Archivos públicos de la aplicación
│   ├── src/                  # Código fuente del frontend
│   ├── .env                  # Variables de entorno para el frontend
│   └── README.md             # Instrucciones detalladas del frontend
└── README.md                 # Este archivo (instrucciones generales)
Notas
Asegúrate de que el backend y el frontend tengan la misma URL base configurada en el archivo .env para permitir que el frontend consuma la API sin problemas.
Si deseas modificar las configuraciones del contenedor MySQL, puedes hacerlo en el archivo docker-compose.yml en la carpeta backend.
css
 

Este archivo README en la raíz del proyecto orientará al usuario sobre cómo configurar y ejecutar ambos servicios (backend y frontend) y brindará una descripción general de la estructura del proyecto.
