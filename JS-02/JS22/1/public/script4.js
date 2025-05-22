document.addEventListener('DOMContentLoaded', () => {
    const nombreJugadorGlobal = verificarNombreUsuario('index4.html');
    if (!nombreJugadorGlobal) {
        return;
    }

    const setupJuegoDiv = document.getElementById('setupJuegoTateti');
    const formTateti = document.getElementById('formularioTateti');
    const areaJuegoDiv = document.getElementById('area-juego-tateti');
    const tableroDiv = document.getElementById('tableroTateti');
    const turnoTexto = document.getElementById('turnoTateti');
    const resultadoDiv = document.getElementById('resultadoTateti');
    const botonReiniciar = document.getElementById('boton-reiniciar-tateti');
    const botonMenuJuego = document.getElementById('boton-menu-tateti-juego');
    const botonPcInicia = document.getElementById('boton-pc-inicia-tateti');

    const nombreJugadorPrincipalSpan = document.getElementById('nombreJugadorPrincipalTateti');
    const campoNombreJugadorODiv = document.getElementById('campoNombreJugadorOTateti');
    const nombreJugadorOInput = document.getElementById('nombreJugadorOTatetiInput');

    let celdas = [];
    let tableroEstado = Array(9).fill('');
    let jugadorActual = 'X';
    let nombreJugadorX = nombreJugadorGlobal;
    let nombreJugadorO = 'Computadora';
    let modo = 'pvp';
    let jugando = false;

    if (nombreJugadorPrincipalSpan) {
         nombreJugadorPrincipalSpan.textContent = nombreJugadorGlobal;
    }

    if (formTateti && formTateti.modoTateti) {
        modo = formTateti.modoTateti.value;
        if (modo === 'pvp') {
            campoNombreJugadorODiv.classList.remove('hidden');
        } else {
            campoNombreJugadorODiv.classList.add('hidden');
        }

        Array.from(formTateti.modoTateti).forEach(radio => {
            radio.addEventListener('change', function() {
                modo = this.value;
                if (this.value === 'pvp') {
                    campoNombreJugadorODiv.classList.remove('hidden');
                    nombreJugadorOInput.value = "";
                    nombreJugadorOInput.placeholder = "Nombre Jugador O";
                } else {
                    campoNombreJugadorODiv.classList.add('hidden');
                }
            });
        });
    }

    if (formTateti) {
        formTateti.addEventListener('submit', (e) => {
            e.preventDefault();
            modo = formTateti.modoTateti.value;
            jugadorActual = 'X';

            if (modo === 'pvp') {
                nombreJugadorO = nombreJugadorOInput.value.trim() || 'Jugador O';
                if (nombreJugadorO.toLowerCase() === nombreJugadorX.toLowerCase() && nombreJugadorO !== "Jugador O" && nombreJugadorX !== "") {
                    alert("Jugador O no puede tener el mismo nombre que Jugador X. Elige otro.");
                    nombreJugadorOInput.focus();
                    return;
                }
            } else {
                nombreJugadorO = 'Computadora';
            }

            if (setupJuegoDiv) setupJuegoDiv.style.display = 'none';
            if (areaJuegoDiv) areaJuegoDiv.style.display = 'flex';

            iniciarJuego();
        });
    }

    function iniciarJuego(pcInicia = false) {
        tableroDiv.innerHTML = '';
        tableroEstado = Array(9).fill('');
        resultadoDiv.textContent = '';
        resultadoDiv.className = 'msg-resultado-tateti';
        jugando = true;

        for (let i = 0; i < 9; i++) {
            const celda = document.createElement('div');
            celda.classList.add('celda-tateti');
            celda.dataset.index = i;
            celda.addEventListener('click', manejarTurno);
            tableroDiv.appendChild(celda);
        }
        celdas = document.querySelectorAll('.celda-tateti');

        botonPcInicia.classList.toggle('hidden', !(modo === 'pvc' && jugadorActual === 'X'));

        if (modo === 'pvc' && pcInicia && jugadorActual === 'X') {
            jugadorActual = 'O';
            actualizarTurno();
            setTimeout(() => {
                turnoPC();
            }, 300);
        } else {
            jugadorActual = 'X';
            actualizarTurno();
        }
    }

    function manejarTurno(e) {
        if (!jugando) return;
        const index = parseInt(e.target.dataset.index);

        if (modo === 'pvc' && jugadorActual === 'O') {
            return;
        }

        if (tableroEstado[index] === '') {
            hacerMovimiento(index, jugadorActual);

            if (verificarGanador()) {
                jugando = false;
                botonPcInicia.classList.add('hidden');
                return;
            }

            cambiarTurno();

            if (modo === 'pvc' && jugadorActual === 'O' && jugando) {
                botonPcInicia.classList.add('hidden');
                setTimeout(turnoPC, 500);
            }
        }
    }

    function hacerMovimiento(index, jugador) {
        if (tableroEstado[index] === '' && jugando) {
            tableroEstado[index] = jugador;
            celdas[index].textContent = jugador;
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
        if (nombreJugadorX === "" && jugadorActual === 'X') nombreTurno = "Jugador X"; // Fallback si el nombre global no cargó
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
                let nombreGanador = (ganadorSimbolo === 'X') ? nombreJugadorX : nombreJugadorO;
                if (nombreJugadorX === "" && ganadorSimbolo === 'X') nombreGanador = "Jugador X";

                resultadoDiv.textContent = `¡${nombreGanador} (${ganadorSimbolo}) ha ganado!`;
                resultadoDiv.classList.add('visible');
                jugando = false;
                return true;
            }
        }
        if (!tableroEstado.includes('')) {
            resultadoDiv.textContent = '¡Es un empate!';
            resultadoDiv.classList.add('visible');
            jugando = false;
            return true;
        }
        return false;
    }

    function turnoPC() {
        if (!jugando || jugadorActual !== 'O') return;

        const ganarBloquear = (jugadorConsiderado) => {
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

        let indiceMovimiento = ganarBloquear('O');
        if (indiceMovimiento === null) {
            indiceMovimiento = ganarBloquear('X');
        }
        if (indiceMovimiento === null) {
            if (tableroEstado[4] === '') {
                indiceMovimiento = 4;
            } else {
                const esquinas = [0, 2, 6, 8].filter(i => tableroEstado[i] === '');
                if (esquinas.length > 0) {
                    indiceMovimiento = esquinas[Math.floor(Math.random() * esquinas.length)];
                }
            }
        }
        if (indiceMovimiento === null) {
            const lados = [1, 3, 5, 7].filter(i => tableroEstado[i] === '');
            if (lados.length > 0) {
                indiceMovimiento = lados[Math.floor(Math.random() * lados.length)];
            }
        }
        if (indiceMovimiento === null) {
            const disponibles = tableroEstado.map((v, i) => (v === '') ? i : null).filter(i => i !== null);
            if (disponibles.length > 0) {
                indiceMovimiento = disponibles[Math.floor(Math.random() * disponibles.length)];
            } else {
                return;
            }
        }

        if (indiceMovimiento !== null && tableroEstado[indiceMovimiento] === '') {
            hacerMovimiento(indiceMovimiento, 'O');
            if (!verificarGanador()) {
                cambiarTurno();
                if (jugando) botonPcInicia.classList.remove('hidden');
            } else {
                jugando = false;
                botonPcInicia.classList.add('hidden');
            }
        }
    }

    if (botonReiniciar) {
        botonReiniciar.addEventListener('click', () => {
            jugadorActual = 'X';
            iniciarJuego(false);
        });
    }

    if (botonMenuJuego) {
        botonMenuJuego.addEventListener('click', () => {
            if (setupJuegoDiv) setupJuegoDiv.style.display = 'block';
            if (areaJuegoDiv) areaJuegoDiv.style.display = 'none';
            jugando = false;
            if (formTateti.modoTateti) {
                formTateti.modoTateti.value = modo;
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
            if (modo === 'pvc' && jugando && jugadorActual === 'X') {
                jugadorActual = 'O';
                actualizarTurno();
                botonPcInicia.classList.add('hidden');
                setTimeout(turnoPC, 300);
            }
        });
    }
    // Menú hamburguesa
    const navToggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (navToggle && navLinks) { // Asegúrate de que ambos elementos existen
        navToggle.addEventListener('click', () => {
            navLinks.classList.toggle('open');
        });
    }

    // Cerrar menú al hacer clic en un enlace (opcional, pero bueno para UX en móviles)
    if (navLinks) {
        navLinks.querySelectorAll('a').forEach(a => {
            a.addEventListener('click', () => {
                // Solo cierra si el menú está abierto y estamos en vista móvil (donde el toggle es visible)
                if (navLinks.classList.contains('open') && window.innerWidth <= 768) {
                    navLinks.classList.remove('open');
                }
            });
        });
    }
}); // Este es el cierre del 'DOMContentLoaded' event listener principal
