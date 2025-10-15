# TODO App - Sistema de Gestión de Tareas

## Descripción
La **TODO App** es una aplicación web diseñada para gestionar tareas de manera sencilla y eficiente.  
Permite al usuario **agregar**, **marcar como completadas** y **eliminar** tareas, almacenando los datos en una base de datos PostgreSQL.  
El proyecto utiliza una arquitectura basada en contenedores Docker para garantizar la portabilidad y el despliegue rápido.

---

## Arquitectura

La aplicación está dividida en tres componentes principales:

1. **Frontend:** Desarrollado con HTML, CSS y JavaScript, manejado desde un contenedor Nginx.  
2. **Backend:** API REST construida con Node.js y Express que se comunica con la base de datos.  
3. **Base de Datos:** PostgreSQL para almacenar las tareas.

**Flujo general:**

También se incluye una carpeta `docs/` donde se documenta la arquitectura del sistema (`docs/arquitectura.md`).

---

## Tecnologías
- **Backend:** Node.js + Express + PostgreSQL  
- **Frontend:** HTML + CSS + JavaScript + Nginx  
- **Orquestación:** Docker + Docker Compose  

---

## Requisitos Previos
Antes de ejecutar el proyecto, asegúrate de tener instaladas las siguientes herramientas:

- Docker **20+**
- Docker Compose **2+**
- Git

---

## Instalación y Ejecución

### 1. Clonar el repositorio
```bash
git clone https://github.com/frankns1/todo-app.git
cd todo-app

### 2. Levantar servicios
### Levantar servicios con Docker Compose
docker compose up -d --build

### 3. Acceder a la aplicación
Aplicación Web: http://localhost:8080
API Backend:http://localhost:3000/tasks
Base de Datos (PostgreSQL): Puerto 5432

## Comandos Útiles
| Acción                        | Comando                           |
| ----------------------------- | ----------------------------------|
| Iniciar servicios             | docker compose up -d              |
| Detener servicios             | docker compose down               |
| Ver logs                      | docker compose logs -f            |
| Reconstruir imágenes          | docker compose up -d --build      |
| Listar contenedores activos   | docker ps                         |
| Acceder al contenedor backend | docker exec -it todo-backend bash |

## Estructura del Proyecto

todo-app/
│
├── .gitignore
├── README.md
├── docker-compose.yml
│
├── docs/
│   └── arquitectura.md
│
├── backend/
│   ├── Dockerfile
│   ├── package.json
│   ├── .dockerignore
│   └── src/
│       └── index.js
│
├── frontend/
│   ├── Dockerfile
│   ├── index.html
│   ├── styles.css
│   └── nginx.conf

## API Endpoints

| Método     | Endpoint     |     Descripción                 |
| ---------- | -------------| ------------------------------- |
| **GET**    | `/tasks`     | Obtiene todas las tareas        |
| **POST**   | `/tasks`     | Crea una nueva tarea            |
| **PUT**    | `/tasks/:id` | Marca una tarea como completada |
| **DELETE** | `/tasks/:id` | Elimina una tarea               |


## Autores
- Estudiante 1: [TANIA PATRICIA CARABANTES GARCIA]
- Estudiante 2: [FRANKLIN ARISTIDES OLLA AGREDA]

## Fecha
15/10/2025

## Notas Finales

Este proyecto fue desarrollado como parte de la práctica de Contenedores Docker y Versionamiento con Git, integrando los conocimientos de:

Creación de imágenes personalizadas

Configuración de Docker Compose

Integración entre servicios

## Datos Importantes
## Backend

- Servidor Express con endpoints REST:
  - `GET /tasks`
  - `POST /tasks`
  - `PUT /tasks/:id`
  - `DELETE /tasks/:id`
- Base de datos PostgreSQL:
  - Tabla `tasks` con columnas: `id`, `title`, `completed`, `created_at`.
- Variables de entorno para configuración de la base de datos:
  - `DB_HOST`, `DB_USER`, `DB_PASSWORD`, `DB_NAME`, `DB_PORT`
- Comandos:
  - `npm install` → instala dependencias
  - `npm start` → iniciar servidor
  - `npm run dev` → iniciar con nodemon

## Frontend

- Interfaz web minimalista para gestionar tareas:
  - Crear, listar, completar y eliminar tareas.
- Conecta al backend mediante fetch API.

## Docker

- Backend Dockerfile optimizado para Node.js
- Dockerignore para ignorar archivos innecesarios (`node_modules/`, `.env`, etc.)

## Uso

1. Clonar el repositorio
   ```bash
   git clone https://github.com/frankns1/todo-app.git
