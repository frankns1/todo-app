const apiUrl = "http://localhost:3000/tasks";


const taskList = document.getElementById("taskList");
const addTaskBtn = document.getElementById("addTaskBtn");
const newTaskInput = document.getElementById("newTask");

// Función para obtener todas las tareas
async function fetchTasks() {
  const res = await fetch(apiUrl);
  const tasks = await res.json();
  renderTasks(tasks);
}

// Renderizar las tareas en la lista
function renderTasks(tasks) {
  taskList.innerHTML = "";
  tasks.forEach(task => {
    // Crear contenedor de tarea
    const li = document.createElement("li");
    li.className = "list-group-item d-flex justify-content-between align-items-center";

    // Título de la tarea
    const title = document.createElement("span");
    title.textContent = task.title;
    title.className = task.completed ? "text-decoration-line-through text-muted" : "";
    title.style.flex = "1"; // Ocupa espacio disponible
    title.style.cursor = "pointer";

    // Botón completar/desmarcar
    const completeBtn = document.createElement("button");
    completeBtn.textContent = task.completed ? "Desmarcar" : "Completar";
    completeBtn.className = "btn btn-sm btn-success ms-2";
    completeBtn.onclick = () => toggleComplete(task);

    // Botón eliminar
    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Eliminar";
    deleteBtn.className = "btn btn-sm btn-danger ms-2";
    deleteBtn.onclick = () => deleteTask(task.id);

    // Agregar elementos al li
    li.appendChild(title);
    li.appendChild(completeBtn);
    li.appendChild(deleteBtn);

    // Agregar li a la lista
    taskList.appendChild(li);
  });
}

// Crear nueva tarea
addTaskBtn.addEventListener("click", async () => {
  const title = newTaskInput.value.trim();
  if (!title) return alert("Escribe algo");
  await fetch(apiUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title })
  });
  newTaskInput.value = "";
  fetchTasks();
});

// Cambiar estado completado
async function toggleComplete(task) {
  await fetch(`${apiUrl}/${task.id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ completed: !task.completed })
  });
  fetchTasks();
}

// Eliminar tarea
async function deleteTask(id) {
  await fetch(`${apiUrl}/${id}`, { method: "DELETE" });
  fetchTasks();
}

// Inicializar
fetchTasks();
