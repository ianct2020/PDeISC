const formulario = document.querySelector('#formulario');
const listaUsuarios = document.querySelector('#usuarios-lista');

// Mostrar todos los usuarios al cargar la página
window.onload = function () {
    obtenerUsuarios();
};

// Función para obtener todos los usuarios y mostrarlos
function obtenerUsuarios() {
    fetch('/usuarios')
        .then(response => response.json())
        .then(data => {
            listaUsuarios.innerHTML = ''; // Limpiar la lista antes de agregar los nuevos usuarios
            data.forEach(usuario => {
                agregarUsuarioALista(usuario.usr);
            });
        })
        .catch(error => console.error('Error al obtener los usuarios:', error));
}

// Función para agregar un usuario a la lista
function agregarUsuarioALista(usuario) {
    const li = document.createElement('li');
    li.textContent = `Usuario: ${usuario}`;
    listaUsuarios.appendChild(li);
}

// Manejo del formulario de envío
formulario.addEventListener('submit', function (event) {
    event.preventDefault(); // Evita la recarga de la página

    // Obtener los datos del formulario
    const usuario = document.getElementById('usr').value;
    const contraseña = document.getElementById('pass').value;

    // Enviar los datos al servidor
    fetch('/enviar', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            usr: usuario,
            pass: contraseña
        })
    })
    .then(response => response.json()) // Esperamos la respuesta en formato JSON
    .then(data => {
        // Si la respuesta fue exitosa, actualizamos la lista de usuarios
        agregarUsuarioALista(data.usr);

        // Limpiar los campos de usuario y contraseña después de agregar el usuario
        document.getElementById('usr').value = '';
        document.getElementById('pass').value = '';
    })
    .catch(error => {
        console.error('Error:', error);
    });
});
