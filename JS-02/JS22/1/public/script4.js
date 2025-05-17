// public/script4.js
document.addEventListener('DOMContentLoaded', () => {
    const nombreJugadorGlobal = verificarNombreUsuario('index4.html');
    if (!nombreJugadorGlobal) {
        return;
    }

    // Referencias a elementos (asegúrate que los IDs coincidan 100% con tu index4.html)
    const setupJuegoDiv = document.getElementById('setupJuegoTateti');
    const formTateti = document.getElementById('formularioTateti'); // ID del form
    const areaJuegoDiv = document.getElementById('area-juego-tateti'); // ID del div del área de juego
    const tableroDiv = document.getElementById('tableroTateti');
    const turnoTexto = document.getElementById('turnoTateti');
    const resultadoDiv = document.getElementById('resultadoTateti');
    const botonReiniciar = document.getElementById('boton-reiniciar-tateti');
    const botonMenuJuego = document.getElementById('boton-menu-tateti-juego');
    const botonPcInicia = document.getElementById('boton-pc-inicia-tateti');

    const nombreJugadorPrincipalSpan = document.getElementById('nombreJugadorPrincipalTateti'); // Ya se actualiza por script1.js
    const campoNombreJugadorODiv = document.getElementById('campoNombreJugadorOTateti');
    const nombreJugadorOInput = document.getElementById('nombreJugadorOTatetiInput');

    // Variables del juego TaTeTi
    let celdas = [];
    let tableroEstado = Array(9).fill('');
    let jugadorActual = 'X';
    let nombreJugadorX = nombreJugadorGlobal;
    let nombreJugadorO = 'Computadora'; // Default
    let modo = 'pvp'; // Default
    let jugando = false; // El juego no está activo hasta que se presiona "Comenzar"

    // Mostrar/ocultar campo para nombre Jugador O según modo PvP
    if (formTateti.modoTateti) {
        // Establecer modo inicial basado en el radio button chequeado por defecto
        modo = formTateti.modoTateti.value;
        if (modo === 'pvp') {
            campoNombreJugadorODiv.classList.remove('hidden');
        } else {
            campoNombreJugadorODiv.classList.add('hidden');
        }

        Array.from(formTateti.modoTateti).forEach(radio => {
            radio.addEventListener('change', function() {
                modo = this.value; // Actualizar el modo cuando cambia el radio
                if (this.value === 'pvp') {
                    campoNombreJugadorODiv.classList.remove('hidden');
                    nombreJugadorOInput.value = ""; // Limpiar por si había algo
                    nombreJugadorOInput.placeholder = "Nombre Jugador O";
                } else {
                    campoNombreJugadorODiv.classList.add('hidden');
                }
            });
        });
    }

    // Event Listener para el formulario de configuración del TaTeTi
    if (formTateti) {
        formTateti.addEventListener('submit', (e) => {
            e.preventDefault();
            modo = formTateti.modoTateti.value; // Asegurar que modo se toma del valor actual
            jugadorActual = 'X'; // X siempre inicia

            if (modo === 'pvp') {
                nombreJugadorO = nombreJugadorOInput.value.trim() || 'Jugador O'; // Nombre por defecto si está vacío
                if (nombreJugadorO.toLowerCase() === nombreJugadorX.toLowerCase() && nombreJugadorO !== "Jugador O") {
                    alert("Jugador O no puede tener el mismo nombre que Jugador X. Elige otro.");
                    nombreJugadorOInput.focus();
                    return; // No iniciar juego
                }
            } else { // PvC
                nombreJugadorO = 'Computadora';
            }

            // Ocultar setup y mostrar área de juego
            if (setupJuegoDiv) setupJuegoDiv.style.display = 'none';
            if (areaJuegoDiv) areaJuegoDiv.style.display = 'block'; // O 'flex' si .lado-tateti es flex container

            iniciarJuego(); // Iniciar la lógica del tablero
        });
    }


    function iniciarJuego(pcInicia = false) {
        tableroDiv.innerHTML = ''; // Limpiar tablero
        tableroEstado = Array(9).fill('');
        // jugadorActual se establece antes de llamar a iniciarJuego o se resetea a 'X'
        resultadoDiv.textContent = '';
        jugando = true; // El juego está activo

        for (let i = 0; i < 9; i++) {
            const celda = document.createElement('div');
            celda.classList.add('celda-tateti');
            celda.dataset.index = i;
            celda.addEventListener('click', manejarTurno);
            tableroDiv.appendChild(celda);
        }
        celdas = document.querySelectorAll('.celda-tateti'); // Actualizar la colección de celdas

        // Botón "Dejar que PC inicie" visible solo en modo PvC y si no es ya el turno de la PC
        botonPcInicia.classList.toggle('hidden', !(modo === 'pvc' && jugadorActual === 'X'));

        if (modo === 'pvc' && pcInicia && jugadorActual === 'X') { // PC solo inicia si es su turno conceptual
            // En TaTeTi, si PC inicia, es como si 'O' hiciera el primer movimiento.
            // La lógica actual asume que X siempre hace el primer movimiento visible del juego.
            // Si queremos que PC haga la primera marca, lo llamamos aquí.
            jugadorActual = 'O'; // Temporalmente para que turnoPC juegue como O
            actualizarTurno(); // Muestra "Turno de Computadora (O)"
            setTimeout(() => {
                turnoPC(); // PC hace su jugada
                // verificarGanador() se llama dentro de turnoPC, y luego cambiarTurno() si no hay ganador.
                // Esto debería dejar el turno a 'X' (humano)
            }, 300);
        } else {
            jugadorActual = 'X'; // Asegurar que X (humano) comience si PC no inicia
            actualizarTurno();
        }
    }

    function manejarTurno(e) {
        if (!jugando) return;
        const index = parseInt(e.target.dataset.index); // Convertir a número

        // Prevenir jugada si es el turno de la PC en modo PvC
        if (modo === 'pvc' && jugadorActual === 'O') {
            console.log("Espera, es turno de la PC.");
            return;
        }

        if (tableroEstado[index] === '') { // Solo si la celda está vacía
            hacerMovimiento(index, jugadorActual);

            if (verificarGanador()) {
                jugando = false; // El juego termina
                botonPcInicia.classList.add('hidden'); // Ocultar botón si el juego terminó
                return;
            }

            cambiarTurno(); // Cambia a 'O' (o al siguiente jugador)

            if (modo === 'pvc' && jugadorActual === 'O' && jugando) {
                botonPcInicia.classList.add('hidden'); // Ocultar mientras la PC piensa
                setTimeout(turnoPC, 500);
            }
        }
    }

    function hacerMovimiento(index, jugador) {
        if (tableroEstado[index] === '' && jugando) { // Doble chequeo
            tableroEstado[index] = jugador;
            celdas[index].textContent = jugador;
            // Quitar clases anteriores y añadir la nueva para evitar XOXO en la misma celda
            celdas[index].classList.remove('jugador-x', 'jugador-o');
            celdas[index].classList.add(jugador === 'X' ? 'jugador-x' : 'jugador-o');
        }
    }

    function cambiarTurno() {
        jugadorActual = (jugadorActual === 'X') ? 'O' : 'X';
        actualizarTurno();
    }

    function actualizarTurno() {
        let nombreTurno = (jugadorActual === 'X') ? nombreJugadorX : nombreJugadorO;
        turnoTexto.textContent = `Turno de ${nombreTurno} (${jugadorActual})`;
    }

    function verificarGanador() {
        const combinaciones = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8],
            [0, 3, 6], [1, 4, 7], [2, 5, 8],
            [0, 4, 8], [2, 4, 6]
        ];
        for (const combinacion of combinaciones) {
            const [a, b, c] = combinacion;
            if (tableroEstado[a] && tableroEstado[a] === tableroEstado[b] && tableroEstado[a] === tableroEstado[c]) {
                const ganadorSimbolo = tableroEstado[a];
                const nombreGanador = (ganadorSimbolo === 'X') ? nombreJugadorX : nombreJugadorO;
                resultadoDiv.textContent = `¡${nombreGanador} (${ganadorSimbolo}) ha ganado!`;
                resultadoDiv.className = 'msg-exito-tateti visible'; // Asegurar que se muestre
                jugando = false;
                return true;
            }
        }
        if (!tableroEstado.includes('')) {
            resultadoDiv.textContent = '¡Es un empate!';
            resultadoDiv.className = 'msg-exito-tateti visible';
            jugando = false;
            return true;
        }
        return false;
    }

    function turnoPC() {
        if (!jugando || jugadorActual !== 'O') return; // PC solo juega si es su turno 'O' y el juego está activo

        // Lógica simple (ganar > bloquear > aleatorio)
        const ganarBloquear = (jugadorConsiderado) => {
            // ... (lógica de ganarBloquear como la tenías)
             const combinaciones = [
                [0,1,2],[3,4,5],[6,7,8], [0,3,6],[1,4,7],[2,5,8],
                [0,4,8],[2,4,6]
            ];
            for (const [a,b,c] of combinaciones) {
                const casillas = [tableroEstado[a], tableroEstado[b], tableroEstado[c]];
                const vaciosIndices = [a,b,c].filter(i => tableroEstado[i] === '');
                const cuentaLetra = casillas.filter(v => v === jugadorConsiderado).length;
                if (cuentaLetra === 2 && vaciosIndices.length === 1) {
                    return vaciosIndices[0];
                }
            }
            return null;
        };

        let indiceMovimiento = ganarBloquear('O'); // 1. Intentar ganar
        if (indiceMovimiento === null) {
            indiceMovimiento = ganarBloquear('X'); // 2. Intentar bloquear al oponente
        }
        // 3. Estrategia adicional (ej. tomar centro, luego esquinas, luego lados)
        if (indiceMovimiento === null) {
            if (tableroEstado[4] === '') { // Tomar el centro si está libre
                indiceMovimiento = 4;
            } else {
                // Tomar una esquina aleatoria si está libre
                const esquinas = [0, 2, 6, 8].filter(i => tableroEstado[i] === '');
                if (esquinas.length > 0) {
                    indiceMovimiento = esquinas[Math.floor(Math.random() * esquinas.length)];
                }
            }
        }
        // 4. Si no, tomar un lado aleatorio si está libre
        if (indiceMovimiento === null) {
            const lados = [1, 3, 5, 7].filter(i => tableroEstado[i] === '');
            if (lados.length > 0) {
                indiceMovimiento = lados[Math.floor(Math.random() * lados.length)];
            }
        }
        // 5. Movimiento aleatorio como último recurso si todo lo demás falla
        if (indiceMovimiento === null) {
            const disponibles = tableroEstado.map((v, i) => (v === '') ? i : null).filter(i => i !== null);
            if (disponibles.length > 0) {
                indiceMovimiento = disponibles[Math.floor(Math.random() * disponibles.length)];
            } else {
                return; // No hay movimientos, el juego debería haber terminado (empate)
            }
        }

        if (indiceMovimiento !== null && tableroEstado[indiceMovimiento] === '') {
            hacerMovimiento(indiceMovimiento, 'O'); // PC siempre es 'O'
            if (!verificarGanador()) {
                cambiarTurno(); // Cambia a 'X'
                botonPcInicia.classList.remove('hidden'); // Volver a mostrar si el humano debe jugar
            } else {
                jugando = false;
                botonPcInicia.classList.add('hidden');
            }
        }
    }

    // Event Listeners para botones del juego
    if (botonReiniciar) {
        botonReiniciar.addEventListener('click', () => {
            // Al reiniciar, el setup del juego (modo, nombres) se mantiene.
            // Simplemente se reinicia el tablero.
            // X siempre comienza después de un reinicio manual, a menos que PC deba iniciar.
            let pcDebeIniciar = modo === 'pvc' && document.getElementById('forzarInicioPcCheckbox') && document.getElementById('forzarInicioPcCheckbox').checked; // Ejemplo si hubiera un checkbox
            // Por ahora, simple reinicio, X empieza.
            jugadorActual = 'X';
            iniciarJuego(false); // false: no forzar a PC a iniciar en este reinicio simple
        });
    }

    if (botonMenuJuego) { // Botón para volver al setup del TaTeTi
        botonMenuJuego.addEventListener('click', () => {
            if (setupJuegoDiv) setupJuegoDiv.style.display = 'block';
            if (areaJuegoDiv) areaJuegoDiv.style.display = 'none';
            jugando = false; // Detener lógica del juego activo
            // Resetear el estado del formulario de modo si es necesario
            if (formTateti.modoTateti) {
                formTateti.modoTateti.value = modo; // Restaurar el modo seleccionado
                 if (modo === 'pvp') {
                    campoNombreJugadorODiv.classList.remove('hidden');
                } else {
                    campoNombreJugadorODiv.classList.add('hidden');
                }
            }
            if(nombreJugadorOInput) nombreJugadorOInput.value = (modo === 'pvp' && nombreJugadorO !== 'Computadora') ? nombreJugadorO : "";
        });
    }

    if (botonPcInicia) {
        botonPcInicia.addEventListener('click', () => {
            if (modo === 'pvc' && jugando && jugadorActual === 'X') { // Solo si es turno del humano X
                jugadorActual = 'O'; // Temporalmente para que PC juegue
                actualizarTurno();
                botonPcInicia.classList.add('hidden');
                setTimeout(turnoPC, 300);
            }
        });
    }

});