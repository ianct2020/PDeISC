const formulario = document.querySelector('#formulario');
const listaUsuarios = document.querySelector('#usuarios-lista');

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
    })
    .catch(error => {
        console.error('Error:', error);
    });
});

// Función para agregar un usuario a la lista
function agregarUsuarioALista(usuario) {
    const li = document.createElement('li');
    li.textContent = `Usuario: ${usuario}`;
    listaUsuarios.appendChild(li);
}
