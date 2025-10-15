# Arquitectura del Proyecto

El sistema **Todo App** está diseñado bajo una arquitectura **cliente-servidor** compuesta por tres capas principales:

## 1. Frontend
- Desarrollado con **HTML**, **CSS (Bootstrap)** y **JavaScript**.
- Se ejecuta dentro de un contenedor **Nginx**, que sirve los archivos estáticos al usuario.
- Se comunica con el backend mediante peticiones HTTP (API REST).

## 2. Backend
- Implementado en **Node.js** con **Express**.
- Expone endpoints REST bajo la ruta base `http://localhost:3000/tasks`.
- Gestiona la lógica de negocio y la comunicación con la base de datos.

## 3. Base de Datos
- Utiliza **PostgreSQL** para almacenar las tareas.
- Cada tarea contiene los campos: `id`, `title`, `completed` y `created_at`.

## 4. Orquestación con Docker
- Se utiliza **Docker Compose** para levantar los servicios:
  - `backend` (Node.js)
  - `frontend` (Nginx)
  - `db` (PostgreSQL)
- La red de Docker permite la comunicación entre los contenedores de forma interna.

---

###  Diagrama de Arquitectura (esquemático)

```plaintext
        ┌──────────────────────────┐
        │        Usuario           │
        └────────────┬─────────────┘
                     │ (HTTP)
                     ▼
        ┌──────────────────────────┐
        │       Frontend (Nginx)   │
        │  HTML + CSS + JS         │
        └────────────┬─────────────┘
                     │ (API REST)
                     ▼
        ┌──────────────────────────┐
        │     Backend (Node.js)    │
        │  Express + PostgreSQL    │
        └────────────┬─────────────┘
                     │ (SQL)
                     ▼
        ┌──────────────────────────┐
        │     Base de Datos (DB)   │
        │      PostgreSQL          │
        └──────────────────────────┘
