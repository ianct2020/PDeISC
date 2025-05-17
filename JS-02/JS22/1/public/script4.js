// public/script4.js (TaTeTi - Refactorizado)
document.addEventListener('DOMContentLoaded', () => {
    const nombreJugadorGlobal = verificarNombreUsuario('index4.html'); // De script1.js

    // --- DOM Elements Cache ---
    const DOMElements = {
        setupJuegoDiv: document.getElementById('setupJuegoTateti'),
        formTateti: document.getElementById('formularioTateti'),
        areaJuegoDiv: document.getElementById('area-juego-tateti'),
        tableroDiv: document.getElementById('tableroTateti'),
        turnoTexto: document.getElementById('turnoTateti'),
        resultadoDiv: document.getElementById('resultadoTateti'),
        botonReiniciar: document.getElementById('boton-reiniciar-tateti'),
        botonMenuJuego: document.getElementById('boton-menu-tateti-juego'),
        botonPcInicia: document.getElementById('boton-pc-inicia-tateti'),
        nombreJugadorPrincipalSpan: document.getElementById('nombreJugadorPrincipalTateti'), // Actualizado por script1.js
        campoNombreJugadorODiv: document.getElementById('campoNombreJugadorOTateti'),
        nombreJugadorOInput: document.getElementById('nombreJugadorOTatetiInput')
    };

    if (!nombreJugadorGlobal) {
        // Si no hay nombre, ajustar UI y no inicializar completamente el juego
        if (DOMElements.setupJuegoDiv) {
            const h1Titulo = DOMElements.setupJuegoDiv.querySelector('h1 span#nombreJugadorPrincipalTateti');
            if (h1Titulo) h1Titulo.parentElement.innerHTML = "Bienvenido al TaTeTi, <br>¡identifícate en Inicio para jugar!"; // Modificar el H1
            DOMElements.formTateti?.classList.add('hidden'); // Ocultar formulario de setup
        }
        return;
    }

    // --- Game Constants & State ---
    const WINNING_COMBINATIONS = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Filas
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columnas
        [0, 4, 8], [2, 4, 6]             // Diagonales
    ];
    let cells = []; // Array de elementos div de celda
    let boardState = Array(9).fill('');
    let currentPlayer = 'X';
    let playerNameX = nombreJugadorGlobal;
    let playerNameO = 'Computadora'; // Default
    let gameMode = 'pvp';      // Default
    let isGameActive = false;

    // --- UI Helper Functions ---
    const setVisibility = (element, show, displayType = 'block') => {
        if (element) element.style.display = show ? displayType : 'none';
    };
    const updateText = (element, text) => { if (element) element.textContent = text; };
    const toggleClass = (element, className, force) => { if(element) element.classList.toggle(className, force); };


    // --- Game Setup ---
    function initializeSetup() {
        if (!DOMElements.formTateti || !DOMElements.formTateti.modoTateti) return;

        gameMode = DOMElements.formTateti.modoTateti.value; // Valor inicial del radio chequeado
        updatePlayerOInputVisibility();

        Array.from(DOMElements.formTateti.modoTateti).forEach(radio => {
            radio.addEventListener('change', function() {
                gameMode = this.value;
                updatePlayerOInputVisibility();
            });
        });

        DOMElements.formTateti.addEventListener('submit', handleGameStartSubmit);
    }

    function updatePlayerOInputVisibility() {
        const show = gameMode === 'pvp';
        toggleClass(DOMElements.campoNombreJugadorODiv, 'hidden', !show);
        if (show && DOMElements.nombreJugadorOInput) {
            DOMElements.nombreJugadorOInput.value = "";
            DOMElements.nombreJugadorOInput.placeholder = "Nombre Jugador O";
        }
    }

    function handleGameStartSubmit(event) {
        event.preventDefault();
        gameMode = DOMElements.formTateti.modoTateti.value;
        currentPlayer = 'X'; // X (jugador global) siempre inicia

        if (gameMode === 'pvp') {
            playerNameO = DOMElements.nombreJugadorOInput.value.trim() || 'Jugador O (Invitado)';
            if (playerNameO.toLowerCase() === playerNameX.toLowerCase() && playerNameO !== 'Jugador O (Invitado)') {
                alert("El Jugador O no puede tener el mismo nombre que el Jugador X.");
                DOMElements.nombreJugadorOInput?.focus();
                return;
            }
        } else {
            playerNameO = 'Computadora';
        }

        setVisibility(DOMElements.setupJuegoDiv, false);
        setVisibility(DOMElements.areaJuegoDiv, true);
        startGameLogic();
    }

    // --- Game Logic ---
    function startGameLogic(pcMakesFirstMove = false) {
        if (!DOMElements.tableroDiv || !DOMElements.resultadoDiv || !DOMElements.turnoTexto) {
            console.error("Faltan elementos del DOM para iniciar TaTeTi.");
            return;
        }
        DOMElements.tableroDiv.innerHTML = '';
        boardState.fill('');
        updateText(DOMElements.resultadoDiv, '');
        DOMElements.resultadoDiv.className = 'msg-exito-tateti'; // Reset class
        isGameActive = true;
        cells = []; // Limpiar array de celdas

        for (let i = 0; i < 9; i++) {
            const cell = document.createElement('div');
            cell.classList.add('celda-tateti');
            cell.dataset.index = i;
            cell.addEventListener('click', handleCellClick);
            DOMElements.tableroDiv.appendChild(cell);
            cells.push(cell); // Guardar referencia
        }

        toggleClass(DOMElements.botonPcInicia, 'hidden', !(gameMode === 'pvc'));

        if (pcMakesFirstMove && gameMode === 'pvc') {
            currentPlayer = 'O'; // PC (O) hace el primer movimiento
            updateTurnText();
            toggleClass(DOMElements.botonPcInicia, 'hidden', true); // Ocultar mientras PC piensa
            setTimeout(executePCTurn, 300);
        } else {
            currentPlayer = 'X'; // Humano (X) inicia
            updateTurnText();
        }
    }

    function handleCellClick(event) {
        if (!isGameActive) return;
        const clickedCell = event.target;
        const cellIndex = parseInt(clickedCell.dataset.index);

        if (gameMode === 'pvc' && currentPlayer === 'O') return; // No permitir clic si es turno de PC

        if (boardState[cellIndex] === '') {
            makeMove(cellIndex, currentPlayer);
            if (checkWinOrDraw()) {
                endGame();
                return;
            }
            switchPlayer();
            if (gameMode === 'pvc' && currentPlayer === 'O' && isGameActive) {
                toggleClass(DOMElements.botonPcInicia, 'hidden', true);
                setTimeout(executePCTurn, 500);
            }
        }
    }

    function makeMove(index, player) {
        if (boardState[index] === '' && isGameActive) {
            boardState[index] = player;
            cells[index].textContent = player;
            cells[index].classList.remove('jugador-x', 'jugador-o'); // Limpiar clases previas
            cells[index].classList.add(player === 'X' ? 'jugador-x' : 'jugador-o');
        }
    }

    function switchPlayer() {
        currentPlayer = (currentPlayer === 'X') ? 'O' : 'X';
        updateTurnText();
    }

    function updateTurnText() {
        const playerName = (currentPlayer === 'X') ? playerNameX : playerNameO;
        updateText(DOMElements.turnoTexto, `Turno de ${playerName} (${currentPlayer})`);
    }

    function checkWinOrDraw() {
        for (const combination of WINNING_COMBINATIONS) {
            const [a, b, c] = combination;
            if (boardState[a] && boardState[a] === boardState[b] && boardState[a] === boardState[c]) {
                const winnerSymbol = boardState[a];
                const winnerName = (winnerSymbol === 'X') ? playerNameX : playerNameO;
                updateText(DOMElements.resultadoDiv, `¡${winnerName} (${winnerSymbol}) ha ganado!`);
                DOMElements.resultadoDiv?.classList.add('visible');
                return true; // Hay ganador
            }
        }
        if (!boardState.includes('')) {
            updateText(DOMElements.resultadoDiv, '¡Es un empate!');
            DOMElements.resultadoDiv?.classList.add('visible');
            return true; // Es empate
        }
        return false; // No hay ganador ni empate
    }

    function endGame() {
        isGameActive = false;
        toggleClass(DOMElements.botonPcInicia, 'hidden', true);
    }

    function executePCTurn() {
        if (!isGameActive || currentPlayer !== 'O') return;

        const findWinningOrBlockingMove = (playerSymbol) => {
            for (const combination of WINNING_COMBINATIONS) {
                const [a, b, c] = combination;
                const line = [boardState[a], boardState[b], boardState[c]];
                const emptySpotIndex = combination.find((i, spot) => line[spot] === '');
                const symbolCount = line.filter(symbol => symbol === playerSymbol).length;

                if (symbolCount === 2 && emptySpotIndex !== undefined) {
                    return emptySpotIndex;
                }
            }
            return null;
        };

        let moveIndex = findWinningOrBlockingMove('O'); // 1. Try to win
        if (moveIndex === null) moveIndex = findWinningOrBlockingMove('X'); // 2. Try to block
        if (moveIndex === null && boardState[4] === '') moveIndex = 4; // 3. Take center
        if (moveIndex === null) { // 4. Take random corner
            const corners = [0, 2, 6, 8].filter(i => boardState[i] === '');
            if (corners.length > 0) moveIndex = corners[Math.floor(Math.random() * corners.length)];
        }
        if (moveIndex === null) { // 5. Take random side
            const sides = [1, 3, 5, 7].filter(i => boardState[i] === '');
            if (sides.length > 0) moveIndex = sides[Math.floor(Math.random() * sides.length)];
        }
        // 6. Fallback a cualquier disponible (debería ser raro si la lógica anterior es completa)
         if (moveIndex === null) {
            const available = boardState.map((val, idx) => val === '' ? idx : null).filter(val => val !== null);
            if (available.length > 0) moveIndex = available[Math.floor(Math.random() * available.length)];
        }


        if (moveIndex !== null && boardState[moveIndex] === '') {
            makeMove(moveIndex, 'O');
            if (checkWinOrDraw()) {
                endGame();
                return;
            }
            switchPlayer(); // A X
             // Mostrar botón de PC inicia solo si es modo PVC y es turno de X para una nueva partida
            toggleClass(DOMElements.botonPcInicia, 'hidden', !(gameMode === 'pvc' && currentPlayer === 'X' && isGameActive));
        }
    }

    // --- Event Listeners for Game Controls ---
    DOMElements.botonReiniciar?.addEventListener('click', () => {
        currentPlayer = 'X'; // X (humano) siempre empieza después de un reinicio de partida
        startGameLogic(false);
    });

    DOMElements.botonMenuJuego?.addEventListener('click', () => { // Volver al setup del TaTeTi
        setVisibility(DOMElements.setupJuegoDiv, true);
        setVisibility(DOMElements.areaJuegoDiv, false);
        isGameActive = false;
        updateText(DOMElements.resultadoDiv, ''); // Limpiar mensaje
        // Restaurar selección de modo y valor de input de Jugador O
        if (DOMElements.formTateti.modoTateti) DOMElements.formTateti.modoTateti.value = gameMode;
        updatePlayerOInputVisibility(); // Asegura que el input de P2 se muestre/oculte correctamente
        if(DOMElements.nombreJugadorOInput) {
            DOMElements.nombreJugadorOInput.value = (gameMode === 'pvp' && playerNameO !== 'Computadora' && playerNameO !== 'Jugador O (Invitado)') ? playerNameO : "";
        }
    });

    DOMElements.botonPcInicia?.addEventListener('click', () => {
        if (gameMode === 'pvc' && isGameActive && currentPlayer === 'X' && boardState.every(cell => cell === '')) {
            // Solo permitir si el tablero está vacío y es turno de X
            startGameLogic(true); // true indica que PC hace la primera jugada
        } else if (gameMode === 'pvc' && !isGameActive) {
            // Si el juego anterior terminó y se quiere que PC inicie la NUEVA partida
             currentPlayer = 'X'; // Resetear
             startGameLogic(true);
        }
    });

    // --- Initialize Setup Listeners ---
    initializeSetup();
});