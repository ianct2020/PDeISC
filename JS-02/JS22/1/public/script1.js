document.addEventListener('DOMContentLoaded', function() {
    const nombreUsuarioInput = document.getElementById('nombreUsuarioInput');
    const guardarNombreBtn = document.getElementById('guardarNombreBtn');
    const mensajeError = document.getElementById('mensajeError');
    const entradaNombreContainer = document.getElementById('entradaNombreContainer');
    const seleccionJuegosContainer = document.getElementById('seleccionJuegosContainer');
    const nombreUsuarioDisplay = document.getElementById('nombreUsuarioDisplay');
    const saludoUsuarioNav = document.getElementById('saludoUsuarioNav');
    const logoutBtn = document.getElementById('logoutBtn'); // Obtener el botón de logout

    const NOMBRE_STORAGE_KEY = 'nombreUsuarioGlobalJuegos';

    function cargarEstadoNombre() {
        const nombreGuardado = localStorage.getItem(NOMBRE_STORAGE_KEY);
        if (nombreGuardado) {
            nombreUsuarioDisplay.textContent = nombreGuardado;
            if (saludoUsuarioNav) saludoUsuarioNav.textContent = `Hola, ${nombreGuardado}`;
            if (logoutBtn) logoutBtn.classList.remove('hidden'); // Mostrar botón de logout
            
            entradaNombreContainer.classList.add('hidden');
            seleccionJuegosContainer.classList.remove('hidden');
        } else {
            if (saludoUsuarioNav) saludoUsuarioNav.textContent = "";
            if (logoutBtn) logoutBtn.classList.add('hidden'); // Ocultar botón de logout
            
            entradaNombreContainer.classList.remove('hidden');
            seleccionJuegosContainer.classList.add('hidden');
            if (nombreUsuarioInput) {
                nombreUsuarioInput.value = ''; // Limpiar input por si acaso
                nombreUsuarioInput.focus();
            }
        }
    }

    if (guardarNombreBtn) {
        guardarNombreBtn.addEventListener('click', function() {
            const nombre = nombreUsuarioInput.value.trim();
            if (nombre === "") {
                mensajeError.textContent = "Por favor, ingresa tu nombre.";
                if (nombreUsuarioInput) nombreUsuarioInput.focus();
            } else if (nombre.length < 2) { // Ejemplo de validación extra
                mensajeError.textContent = "El nombre debe tener al menos 2 caracteres.";
                if (nombreUsuarioInput) nombreUsuarioInput.focus();
            }
            else {
                localStorage.setItem(NOMBRE_STORAGE_KEY, nombre);
                mensajeError.textContent = "";
                cargarEstadoNombre();
            }
        });
    }

    // Event listener para el botón de logout
    if (logoutBtn) {
        logoutBtn.addEventListener('click', function() {
            localStorage.removeItem(NOMBRE_STORAGE_KEY);
            cargarEstadoNombre(); // Recargar estado para mostrar el formulario de nombre
        });
    }

    // Cargar estado al iniciar la página
    cargarEstadoNombre();
});

// Función global para ser usada por otras páginas para verificar el nombre
function verificarNombreUsuario(paginaActual) {
    const nombreGuardado = localStorage.getItem('nombreUsuarioGlobalJuegos');
    const saludoUsuarioNav = document.getElementById('saludoUsuarioNav');
    const nombreUsuarioDisplayPage = document.getElementById('nombreUsuarioDisplayPage');
    const logoutBtn = document.getElementById('logoutBtn'); // También en otras páginas

    if (nombreGuardado) {
        if (saludoUsuarioNav) saludoUsuarioNav.textContent = `Hola, ${nombreGuardado}`;
        if (logoutBtn) logoutBtn.classList.remove('hidden'); // Mostrar botón si está en otras páginas
        if (nombreUsuarioDisplayPage) nombreUsuarioDisplayPage.textContent = nombreGuardado;
        return nombreGuardado;
    } else {
        if (saludoUsuarioNav) saludoUsuarioNav.textContent = "";
        if (logoutBtn) logoutBtn.classList.add('hidden'); // Ocultar botón

        // Solo redirigir si NO estamos en la página de inicio
        const esPaginaInicio = window.location.pathname.endsWith('index1.html') || window.location.pathname === '/' || window.location.pathname.endsWith('/index.html');
        
        if (!esPaginaInicio) {
            alert("No se encontró un nombre de usuario. Serás redirigido a la página principal para ingresarlo.");
            window.location.href = 'index1.html'; // Ajusta si tu página principal tiene otro nombre o ruta
        }
        return null;
    }
}

// Asegúrate de que el botón de logout en otras páginas también funcione (si existe)
// Esto es una forma de hacerlo si el botón de logout está en el HTML de todas las páginas
// y comparten este script o una versión de él.
document.addEventListener('DOMContentLoaded', function() {
    // Esta parte es redundante si el script ya está configurado como arriba,
    // pero si `verificarNombreUsuario` es llamado antes de que el DOM esté cargado para el logoutBtn en otras páginas,
    // podrías necesitar una lógica similar o asegurar que `verificarNombreUsuario` se llame después.
    // La lógica actual en `verificarNombreUsuario` ya maneja mostrar/ocultar el botón.
    const logoutBtnGlobal = document.getElementById('logoutBtn');
    if (logoutBtnGlobal && !localStorage.getItem('nombreUsuarioGlobalJuegos')) {
        logoutBtnGlobal.classList.add('hidden');
    } else if (logoutBtnGlobal && localStorage.getItem('nombreUsuarioGlobalJuegos')) {
        logoutBtnGlobal.classList.remove('hidden');
        logoutBtnGlobal.addEventListener('click', function() { // Asegurar listener si no es index1
            if (!document.getElementById('guardarNombreBtn')) { // Solo si no estamos en la página de login
                localStorage.removeItem('nombreUsuarioGlobalJuegos');
                // Redirigir a login o actualizar UI de la página actual
                window.location.href = 'index1.html'; // O una función más genérica de reseteo de UI
            }
        });
    }
});