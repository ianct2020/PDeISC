document.addEventListener('DOMContentLoaded', function() {
    const nombreUsuarioInput = document.getElementById('nombreUsuarioInput');
    const guardarNombreBtn = document.getElementById('guardarNombreBtn');
    const mensajeError = document.getElementById('mensajeError');
    const entradaNombreContainer = document.getElementById('entradaNombreContainer');
    const seleccionJuegosContainer = document.getElementById('seleccionJuegosContainer');
    const nombreUsuarioDisplay = document.getElementById('nombreUsuarioDisplay');
    const saludoUsuarioNav = document.getElementById('saludoUsuarioNav');

    const NOMBRE_STORAGE_KEY = 'nombreUsuarioGlobalJuegos';

    function cargarEstadoNombre() {
        const nombreGuardado = localStorage.getItem(NOMBRE_STORAGE_KEY);
        if (nombreGuardado) {
            nombreUsuarioDisplay.textContent = nombreGuardado;
            if (saludoUsuarioNav) saludoUsuarioNav.textContent = `Hola, ${nombreGuardado}`;
            entradaNombreContainer.classList.add('hidden');
            seleccionJuegosContainer.classList.remove('hidden');
        } else {
            if (saludoUsuarioNav) saludoUsuarioNav.textContent = "";
            entradaNombreContainer.classList.remove('hidden');
            seleccionJuegosContainer.classList.add('hidden');
            if (nombreUsuarioInput) nombreUsuarioInput.focus();
        }
    }

    if (guardarNombreBtn) {
        guardarNombreBtn.addEventListener('click', function() {
            const nombre = nombreUsuarioInput.value.trim();
            if (nombre === "") {
                mensajeError.textContent = "Por favor, ingresa tu nombre.";
                nombreUsuarioInput.focus();
            } else {
                localStorage.setItem(NOMBRE_STORAGE_KEY, nombre);
                mensajeError.textContent = "";
                cargarEstadoNombre();
            }
        });
    }

    // Cargar estado al iniciar la página
    cargarEstadoNombre();
});

// Función global para ser usada por otras páginas para verificar el nombre
function verificarNombreUsuario(paginaActual) {
    const nombreGuardado = localStorage.getItem('nombreUsuarioGlobalJuegos');
    const saludoUsuarioNav = document.getElementById('saludoUsuarioNav');
    const nombreUsuarioDisplayPage = document.getElementById('nombreUsuarioDisplayPage'); // Para saludo en la página

    if (nombreGuardado) {
        if (saludoUsuarioNav) saludoUsuarioNav.textContent = `Hola, ${nombreGuardado}`;
        if (nombreUsuarioDisplayPage) nombreUsuarioDisplayPage.textContent = nombreGuardado;
        return nombreGuardado;
    } else {
        alert("No se encontró un nombre de usuario. Serás redirigido a la página principal para ingresarlo.");
        // Redirigir a index1.html si no estamos ya allí
        if (!window.location.pathname.endsWith('index1.html') && !window.location.pathname.endsWith('/')) {
             window.location.href = 'index1.html';
        }
        return null;
    }
}
