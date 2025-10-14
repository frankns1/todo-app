const express = require("express");
const cors = require("cors");
const { Pool } = require("pg");

require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

// Configuración de la base de datos con variables de entorno
const pool = new Pool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT || 5432
});

// Crear tabla si no existe
const createTable = async () => {
  const query = `
    CREATE TABLE IF NOT EXISTS tasks (
      id SERIAL PRIMARY KEY,
      title VARCHAR(255) NOT NULL,
      completed BOOLEAN DEFAULT false,
      created_at TIMESTAMP DEFAULT NOW()
    )
  `;
  await pool.query(query);
};

createTable().catch(err => console.error("Error creando tabla:", err));

// Endpoints

// GET /tasks
app.get("/tasks", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM tasks ORDER BY id ASC");
    res.status(200).json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error al obtener tareas" });
  }
});

// POST /tasks
app.post("/tasks", async (req, res) => {
  const { title } = req.body;
  try {
    const result = await pool.query(
      "INSERT INTO tasks(title) VALUES($1) RETURNING *",
      [title]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error al crear tarea" });
  }
});

// PUT /tasks/:id
app.put("/tasks/:id", async (req, res) => {
  const { id } = req.params;
  const { completed } = req.body;
  try {
    const result = await pool.query(
      "UPDATE tasks SET completed=$1 WHERE id=$2 RETURNING *",
      [completed, id]
    );
    res.status(200).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error al actualizar tarea" });
  }
});

// DELETE /tasks/:id
app.delete("/tasks/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query("DELETE FROM tasks WHERE id=$1", [id]);
    res.sendStatus(204);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error al eliminar tarea" });
  }
});

// Iniciar servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor backend escuchando en puerto ${PORT}`);
});
