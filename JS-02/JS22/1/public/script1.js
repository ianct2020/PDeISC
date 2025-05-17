// public/script1.js
document.addEventListener('DOMContentLoaded', function() {
    // Elementos de index1.html para manejo de nombre
    const nombreUsuarioInput = document.getElementById('nombreUsuarioInput');
    const guardarNombreBtn = document.getElementById('guardarNombreBtn');
    const mensajeError = document.getElementById('mensajeError');
    const entradaNombreContainer = document.getElementById('entradaNombreContainer');
    const seleccionJuegosContainer = document.getElementById('seleccionJuegosContainer');
    const nombreUsuarioDisplay = document.getElementById('nombreUsuarioDisplay'); // Span en la sección de juegos

    // Elementos de la Navbar (comunes a todas las páginas)
    const saludoUsuarioNav = document.getElementById('saludoUsuarioTopNav'); // Span en la top-navbar
    const logoutBtnNav = document.getElementById('logoutBtnNav');         // Botón de logout en la top-navbar

    const NOMBRE_STORAGE_KEY = 'nombreUsuarioGlobalJuegos';

    function actualizarUIConNombre(nombre) {
        if (nombreUsuarioDisplay) nombreUsuarioDisplay.textContent = nombre; // Para index1.html
        if (saludoUsuarioNav) saludoUsuarioNav.textContent = `Hola, ${nombre}`;
        if (logoutBtnNav) logoutBtnNav.classList.remove('hidden');

        if (entradaNombreContainer) entradaNombreContainer.classList.add('hidden'); // Solo en index1.html
        if (seleccionJuegosContainer) seleccionJuegosContainer.classList.remove('hidden'); // Solo en index1.html
    }

    function actualizarUIParaSinNombre() {
        if (saludoUsuarioNav) saludoUsuarioNav.textContent = "";
        if (logoutBtnNav) logoutBtnNav.classList.add('hidden');

        if (entradaNombreContainer) entradaNombreContainer.classList.remove('hidden'); // Solo en index1.html
        if (seleccionJuegosContainer) seleccionJuegosContainer.classList.add('hidden'); // Solo en index1.html
        if (nombreUsuarioInput) { // Solo en index1.html
            nombreUsuarioInput.value = "";
            nombreUsuarioInput.focus();
        }
        if (nombreUsuarioDisplay) nombreUsuarioDisplay.textContent = ""; // Solo en index1.html
    }

    function cargarEstadoNombreGlobal() {
        const nombreGuardado = localStorage.getItem(NOMBRE_STORAGE_KEY);
        if (nombreGuardado && nombreGuardado.trim() !== "") {
            actualizarUIConNombre(nombreGuardado);
        } else {
            localStorage.removeItem(NOMBRE_STORAGE_KEY); // Limpiar si es inválido
            actualizarUIParaSinNombre();
        }
    }

    // Solo configurar listeners si estamos en index1.html (donde existen estos elementos)
    if (guardarNombreBtn && nombreUsuarioInput && mensajeError && entradaNombreContainer && seleccionJuegosContainer) {
        guardarNombreBtn.addEventListener('click', function() {
            const nombre = nombreUsuarioInput.value.trim();
            if (nombre === "") {
                if (mensajeError) mensajeError.textContent = "Por favor, ingresa un nombre válido.";
                nombreUsuarioInput.focus();
            } else {
                localStorage.setItem(NOMBRE_STORAGE_KEY, nombre);
                if (mensajeError) mensajeError.textContent = "";
                cargarEstadoNombreGlobal(); // Actualizar UI de index1 y navbar
            }
        });
    }

    // El botón de logout en la navbar es global, pero su lógica de redirección es simple.
    // El onclick="ejecutarLogout()" en el HTML ya maneja esto.
    // Si se quisiera manejar aquí:
    // if (logoutBtnNav) {
    //     logoutBtnNav.addEventListener('click', ejecutarLogout);
    // }

    // Cargar estado del nombre en index1.html si estamos en esa página
    // Para otras páginas, verificarNombreUsuario() se llamará desde sus propios scripts
    const currentPageFileForLoad = window.location.pathname.split("/").pop() || 'index1.html';
    if (currentPageFileForLoad === 'index1.html') {
        cargarEstadoNombreGlobal();
    }
});

// --- FUNCIONES GLOBALES ---
// (Estas funciones son llamadas desde otras páginas y desde elementos onclick)

function verificarNombreUsuario(nombrePaginaActual = '') {
    const nombreGuardado = localStorage.getItem('nombreUsuarioGlobalJuegos');
    const saludoUsuarioNav = document.getElementById('saludoUsuarioTopNav');
    const logoutBtnNav = document.getElementById('logoutBtnNav');

    // Referencia al span específico en la página del juego actual (si existe)
    // Por ejemplo, para TaTeTi, el span en el H1 es 'nombreJugadorPrincipalTateti'
    // Para Simón, el div de bienvenida es 'welcome-message-simon'
    // Para PPT, el saludo es 'saludoGlobalPpt'
    let displayNombreEnPaginaJuego;
    if (nombrePaginaActual === 'index2.html') { // Simón Dice
        displayNombreEnPaginaJuego = document.getElementById('welcome-message-simon');
    } else if (nombrePaginaActual === 'index3.html') { // PPT Hacker
        displayNombreEnPaginaJuego = document.getElementById('saludoGlobalPpt');
    } else if (nombrePaginaActual === 'index4.html') { // TaTeTi
        displayNombreEnPaginaJuego = document.getElementById('nombreJugadorPrincipalTateti');
    }


    if (nombreGuardado && nombreGuardado.trim() !== "") {
        if (saludoUsuarioNav) saludoUsuarioNav.textContent = `Hola, ${nombreGuardado}`;
        if (logoutBtnNav) logoutBtnNav.classList.remove('hidden');

        // Actualizar el saludo específico de la página del juego
        if (displayNombreEnPaginaJuego) {
            if (nombrePaginaActual === 'index2.html') { // Simón
                displayNombreEnPaginaJuego.textContent = `¡A jugar Simón, ${nombreGuardado}!`;
            } else if (nombrePaginaActual === 'index3.html') { // PPT
                displayNombreEnPaginaJuego.textContent = `Agente ${nombreGuardado}, bienvenido al sistema PPT.`;
            } else if (nombrePaginaActual === 'index4.html') { // TaTeTi
                displayNombreEnPaginaJuego.textContent = nombreGuardado; // El H1 ya tiene "Bienvenido al TaTeTi, "
            }
        }
        return nombreGuardado;
    } else {
        localStorage.removeItem('nombreUsuarioGlobalJuegos'); // Limpiar si es inválido
        if (saludoUsuarioNav) saludoUsuarioNav.textContent = "";
        if (logoutBtnNav) logoutBtnNav.classList.add('hidden');

        if (displayNombreEnPaginaJuego) {
             if (nombrePaginaActual === 'index4.html') { // TaTeTi
                displayNombreEnPaginaJuego.textContent = "Invitado";
            } else if (nombrePaginaActual === 'index2.html' || nombrePaginaActual === 'index3.html'){
                displayNombreEnPaginaJuego.textContent = "Por favor, ingresa tu nombre en la página de Inicio.";
            }
        }

        // Redirigir solo si no estamos en index1.html
        const pathParts = window.location.pathname.split('/');
        const currentPageFile = pathParts.pop() || pathParts.pop() || 'index1.html'; // Maneja trailing slash y raíz

        if (currentPageFile !== 'index1.html') {
            // Comentado para evitar alerta y redirección si el usuario navega directamente
            // alert("No se encontró un nombre de usuario. Serás redirigido a la página principal.");
            // window.location.href = 'index1.html';
            console.warn("Nombre de usuario no encontrado. Se recomienda ir a Inicio para ingresar un nombre.");
        }
        return null;
    }
}

function ejecutarLogout() {
    localStorage.removeItem('nombreUsuarioGlobalJuegos');
    // Podrías querer borrar otros datos específicos de juegos aquí si los guardas en localStorage
    // localStorage.removeItem('simon_highLevel');
    // localStorage.removeItem('theme'); // No borrar el tema al cambiar usuario, a menos que sea una preferencia por usuario
    window.location.href = 'index1.html'; // Siempre redirigir a index1 al desloguear
}

// Llamada inicial a verificarNombreUsuario para actualizar la navbar en todas las páginas
// excepto en index1.html donde cargarEstadoNombreGlobal() ya lo hace.
document.addEventListener('DOMContentLoaded', function() {
    const pathParts = window.location.pathname.split('/');
    const currentPageFile = pathParts.pop() || pathParts.pop() || 'index1.html';
    if (currentPageFile !== 'index1.html') {
        verificarNombreUsuario(currentPageFile);
    }
});