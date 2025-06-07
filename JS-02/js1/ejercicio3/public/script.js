const colores = [];
const tareas = [];
const tareasUrgentes = [];
const usuarios = [];

function agregarColor() { //para agregar color
    const color = document.getElementById("color").value.trim();
    if (color) {
        colores.unshift(color);
        document.getElementById("color").value = "";
        mostrarColores();
    }
}

function mostrarColores() { //para mostrar
    const coloresMostrados = document.getElementById("coloresMostrados");
    coloresMostrados.innerHTML = "<strong>Colores:</strong><br>";
    colores.forEach(c => {
        const colorDiv = document.createElement("div");
        colorDiv.textContent = c;
        colorDiv.style.backgroundColor = c; 
        colorDiv.style.padding = "5px";
        colorDiv.style.margin = "5px";
        coloresMostrados.appendChild(colorDiv);
    });
}

function agregarTarea() { //agreagr tarea
    const tarea = document.getElementById("tarea").value.trim();
    if (tarea) {
        tareas.push(tarea);
        document.getElementById("tarea").value = "";
        mostrarTareas();
    }
}

function mostrarTareas() { //para mostrar
    const lista = document.getElementById("listaTareas");
    lista.innerHTML = "";
    tareasUrgentes.forEach((t) => {
        const li = document.createElement("li");
        li.textContent = `${t} (Urgente)`;
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

function marcarUrgente(index) { //mostrar la tarea como urgente
    const tareaUrgente = tareas[index];
    tareasUrgentes.unshift(tareaUrgente); 
    tareas.splice(index, 1); 
    mostrarTareas();
}

function agregarUsuario() { //agregar elk usuario
    const usuario = document.getElementById("usuario").value.trim();
    if (usuario) {
        usuarios.push(usuario);
        document.getElementById("usuario").value = "";
        mostrarUsuarios();
    }
}

function agregarUsuarioPrincipal() { //para ponerlo arriba de todo
    const principal = document.getElementById("usuarioPrimero").value.trim();
    if (principal) {
        usuarios.unshift(principal);
        document.getElementById("usuarioPrimero").value = "";
        mostrarUsuarios();
    }
}

function mostrarUsuarios() { //mostrarlo
    const lista = document.getElementById("usuariosConectados");
    lista.innerHTML = "";
    usuarios.forEach(u => {
        const li = document.createElement("li");
        li.textContent = u;
        lista.appendChild(li);
    });
}

function mostrarConsola() { //en consola
    console.log("Colores:", colores);
    console.log("Tareas comunes:", tareas);
    console.log("Tareas urgentes:", tareasUrgentes);
    console.log("Usuarios:", usuarios);
}