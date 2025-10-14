const API = 'http://localhost:3000';

async function loadTasks() {
  try {
    const res = await fetch(`${API}/tasks`);
    const tasks = await res.json();
    renderTasks(tasks);
  } catch (err) {
    console.error('Error cargando tareas', err);
  }
}

function renderTasks(tasks) {
  const list = document.getElementById('tasksList');
  list.innerHTML = '';
  tasks.forEach(t => {
    const li = document.createElement('li');
    li.className = 'task' + (t.completed ? ' completed' : '');
    const title = document.createElement('span');
    title.textContent = t.title;
    title.className = 'title';
    title.onclick = () => toggleTask(t.id, !t.completed);

    const del = document.createElement('button');
    del.textContent = 'Eliminar';
    del.className = 'delete-btn';
    del.onclick = () => deleteTask(t.id);

    li.appendChild(title);
    li.appendChild(del);
    list.appendChild(li);
  });
}

async function addTask(title) {
  try {
    const res = await fetch(`${API}/tasks`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({ title })
    });
    if (res.status === 201) {
      loadTasks();
    }
  } catch (err) {
    console.error('Error creando tarea', err);
  }
}

async function toggleTask(id, completed) {
  try {
    await fetch(`${API}/tasks/${id}`, {
      method: 'PUT',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({ completed })
    });
    loadTasks();
  } catch (err) {
    console.error('Error actualizando tarea', err);
  }
}

async function deleteTask(id) {
  try {
    await fetch(`${API}/tasks/${id}`, { method: 'DELETE' });
    loadTasks();
  } catch (err) {
    console.error('Error eliminando tarea', err);
  }
}

document.getElementById('btnAdd').addEventListener('click', () => {
  const input = document.getElementById('newTask');
  const val = input.value.trim();
  if (!val) return;
  addTask(val);
  input.value = '';
});

window.addEventListener('load', loadTasks);
