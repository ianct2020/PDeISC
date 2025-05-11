const colores = [];
const tareas = [];
const tareasUrgentes = [];
const usuarios = [];

function agregarColor() {
  const color = document.getElementById("color").value.trim();
  if (color) {
    colores.unshift(color);
    document.getElementById("color").value = "";
    mostrarColores();
  }
}

function mostrarColores() {
  const coloresMostrados = document.getElementById("coloresMostrados");
  coloresMostrados.innerHTML = "<strong>Colores:</strong><br>";
  colores.forEach(c => {
    const colorDiv = document.createElement("div");
    colorDiv.textContent = c;
    colorDiv.style.backgroundColor = c;  // Esto le pone el color como fondo
    colorDiv.style.padding = "5px";
    colorDiv.style.margin = "5px";
    coloresMostrados.appendChild(colorDiv);
  });
}

function agregarTarea() {
  const tarea = document.getElementById("tarea").value.trim();
  if (tarea) {
    tareas.push(tarea);
    document.getElementById("tarea").value = "";
    mostrarTareas();
  }
}

function mostrarTareas() {
  const lista = document.getElementById("listaTareas");
  lista.innerHTML = "";
  tareasUrgentes.forEach((t) => {
    const li = document.createElement("li");
    li.textContent = `${t} (Urgente)`;  // Mostrar la etiqueta Urgente
    lista.appendChild(li);
  });
  tareas.forEach((t, i) => {
    const li = document.createElement("li");
    li.textContent = t;
    const btn = document.createElement("button");
    btn.textContent = "Urgente";
    btn.onclick = () => marcarUrgente(i);
    li.appendChild(btn);
    lista.appendChild(li);
  });
}

function marcarUrgente(index) {
  const tareaUrgente = tareas[index];
  tareasUrgentes.unshift(tareaUrgente);  // Usamos unshift para ponerlo al principio de las urgentes
  tareas.splice(index, 1);  // Eliminamos la tarea de la lista original
  mostrarTareas();
}

function agregarUsuario() {
  const usuario = document.getElementById("usuario").value.trim();
  if (usuario) {
    usuarios.push(usuario);
    document.getElementById("usuario").value = "";
    mostrarUsuarios();
  }
}

function agregarUsuarioPrincipal() {
  const principal = document.getElementById("usuarioPrimero").value.trim();
  if (principal) {
    usuarios.unshift(principal);
    document.getElementById("usuarioPrimero").value = "";
    mostrarUsuarios();
  }
}

function mostrarUsuarios() {
  const lista = document.getElementById("usuariosConectados");
  lista.innerHTML = "";
  usuarios.forEach(u => {
    const li = document.createElement("li");
    li.textContent = u;
    lista.appendChild(li);
  });
}

function mostrarConsola() {
  console.log("Colores:", colores);
  console.log("Tareas comunes:", tareas);
  console.log("Tareas urgentes:", tareasUrgentes);
  console.log("Usuarios:", usuarios);
}
