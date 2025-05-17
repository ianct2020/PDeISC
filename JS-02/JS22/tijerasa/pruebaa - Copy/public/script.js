document.addEventListener('DOMContentLoaded', () => {
    // --- FUENTE DINÁMICA ---
    const fontLink = document.getElementById('font-link');
    const primaryFont = 'Share Tech Mono';
    const displayFont = 'Orbitron';
    // Asegurarse de que los nombres de fuente con espacios se reemplacen por '+' para la URL de Google Fonts
    fontLink.href = `https://fonts.googleapis.com/css2?family=${primaryFont.replace(' ', '+')}&family=${displayFont.replace(' ', '+')}:wght@400;700&display=swap`;

    // --- PANTALLA DE INICIO Y NOMBRES ---
    const startScreen = document.getElementById('startScreen');
    const selectVsPlayerBtn = document.getElementById('selectVsPlayerBtn');
    const selectVsComputerBtn = document.getElementById('selectVsComputerBtn');
    const playerNamesForm = document.getElementById('playerNamesForm');
    const player1NameInput = document.getElementById('player1NameInput');
    const player1NameInputContainer = document.getElementById('player1NameInputContainer');
    const player2NameInputContainer = document.getElementById('player2NameInputContainer');
    const player2NameInput = document.getElementById('player2NameInput');
    const startGameWithNameBtn = document.getElementById('startGameWithNameBtn');

    // --- ELEMENTOS DEL JUEGO ---
    const gameContainer = document.getElementById('gameContainer');
    const timerDisplay = document.getElementById('timerDisplay');
    const player1Panel = document.getElementById('player1Panel');
    const player1NameDisplayElement = document.getElementById('player1NameDisplay');
    const player1ChoiceButtons = player1Panel.querySelectorAll('.player1-choice');
    const player1ChoiceDisplay = document.getElementById('player1ChoiceDisplay');
    const player2Panel = document.getElementById('player2Panel');
    const player2NameDisplayElement = document.getElementById('player2NameDisplay');
    const player2ChoiceButtons = player2Panel.querySelectorAll('.player2-choice');
    const player2ChoiceDisplay = document.getElementById('player2ChoiceDisplay');
    const player2KeyboardHint = document.getElementById('player2KeyboardHint');
    const computerPanel = document.getElementById('computerPanel');
    const computerChoiceDisplay = document.getElementById('computerChoiceDisplay');
    const roundResultDisplay = document.getElementById('roundResult');
    const turnIndicator = document.getElementById('turnIndicator');
    const player1ScoreDisplay = document.getElementById('player1Score');
    const player2ScoreDisplay = document.getElementById('player2Score');
    const tiesDisplay = document.getElementById('ties');
    const nextRoundBtn = document.getElementById('nextRoundBtn');
    const revealBtnPVP = document.getElementById('revealBtnPVP');
    const endGameBtn = document.getElementById('endGameBtn');
    const resetGameBtn = document.getElementById('resetGameBtn');
    const changeModeBtn = document.getElementById('changeModeBtn');

    // --- PANTALLA DE PUNTUACIONES FINALES ---
    const finalScoreDisplay = document.getElementById('finalScoreDisplay');
    const finalPlayer1ScoreDisplay = document.getElementById('finalPlayer1Score');
    const finalPlayer2ScoreDisplay = document.getElementById('finalPlayer2Score');
    const finalTiesDisplay = document.getElementById('finalTies');
    const winnerMessageDisplay = document.getElementById('winnerMessage');

    // --- ESTADO DEL JUEGO ---
    const TIMER_DURATION = 10;
    let timerInterval;
    let timeLeft;
    let player1Choice = null;
    let player2Choice = null;
    let computerChoice = null;
    let gameMode = null;
    let currentPlayerTurn = null;
    let player1Name = "JUGADOR_1";
    let player2Name = "JUGADOR_2";
    let player1Score = 0;
    let player2Score = 0;
    let ties = 0;
    let gameEnded = false;

    const CHOICES = ['piedra', 'papel', 'tijeras'];
    const CHOICE_EMOJIS = { piedra: '✊', papel: '✋', tijeras: '✌️' };
    const KEY_MAP_P1 = { 'a': 'piedra', 's': 'papel', 'd': 'tijeras' };
    const KEY_MAP_P2 = { '4': 'piedra', '5': 'papel', '6': 'tijeras' };

    // --- LÓGICA DE INICIO Y NOMBRES ---
    // Evento: click
    selectVsPlayerBtn.addEventListener('click', () => prepareNameEntry('pvp'));
    selectVsComputerBtn.addEventListener('click', () => prepareNameEntry('pvc'));

    function prepareNameEntry(mode) {
        gameMode = mode;
        playerNamesForm.classList.remove('hidden');
        playerNamesForm.classList.add('active');
        player1NameInputContainer.classList.remove('hidden');

        if (mode === 'pvp') {
            player2NameInputContainer.classList.remove('hidden');
            player2NameInput.placeholder = "[NOMBRE_JUGADOR_2]";
        } else {
            player2NameInputContainer.classList.add('hidden');
            player1NameInput.placeholder = "[TU_ALIAS_DE_HACKER]";
        }
    }
    // Evento: click
    startGameWithNameBtn.addEventListener('click', () => {
        player1Name = player1NameInput.value.trim() || "JUGADOR_1";
        if (gameMode === 'pvp') {
            player2Name = player2NameInput.value.trim() || "JUGADOR_2";
        } else {
            player2Name = "IA_ADVERSARIA";
        }
        startGame();
    });

    function startGame() {
        startScreen.classList.remove('active');
        startScreen.classList.add('hidden');
        gameContainer.classList.remove('hidden');
        gameContainer.classList.add('active');
        finalScoreDisplay.classList.add('hidden');
        gameEnded = false;
        endGameBtn.classList.remove('hidden');

        player1NameDisplayElement.textContent = `// ${player1Name} //`;
        // Actualizar el span dentro del p para el score
        player1ScoreDisplay.querySelector('span').textContent = `${player1Name}`;
        player2NameDisplayElement.textContent = `// ${player2Name} //`;
        player2ScoreDisplay.querySelector('span').textContent = `${player2Name}`;


        if (gameMode === 'pvc') {
            computerPanel.querySelector('h2').textContent = `// ${player2Name} //`;
            player2Panel.classList.add('hidden');
            computerPanel.classList.remove('hidden');
            player2KeyboardHint.classList.add('hidden');
            currentPlayerTurn = 1;
            turnIndicator.classList.add('hidden');
        } else { // pvp
            player2Panel.classList.remove('hidden');
            computerPanel.classList.add('hidden');
            player2KeyboardHint.classList.remove('hidden');
            currentPlayerTurn = 1;
            updateTurnIndicator();
            enablePlayerControls(player2ChoiceButtons, false);
        }
        player1Panel.classList.remove('inactive-turn');
        player2Panel.classList.remove('inactive-turn');
        resetScores();
        resetRoundState();
        startPlayerTurn();
    }

    function startTimer() {
        if (gameEnded) return;
        timeLeft = TIMER_DURATION;
        timerDisplay.textContent = timeLeft;
        clearInterval(timerInterval);
        timerInterval = setInterval(() => {
            timeLeft--;
            timerDisplay.textContent = timeLeft;
            if (timeLeft <= 0) {
                clearInterval(timerInterval);
                handleTimeOut();
            }
        }, 1000);
    }

    function stopTimer() { clearInterval(timerInterval); }

    function handleTimeOut() {
        if (gameEnded) return;
        roundResultDisplay.textContent = `TIEMPO_EXPIRADO_PARA_${currentPlayerTurn === 1 ? player1Name : player2Name}!`;
        roundResultDisplay.className = 'result-text lose';
        disableAllChoiceButtons();

        if (gameMode === 'pvc') {
            player1Choice = player1Choice || null;
            computerChoice = CHOICES[Math.floor(Math.random() * CHOICES.length)];
            updateScores('player2'); // IA (player2) gana por timeout de P1
            displayResult( 'player2', player1Choice, computerChoice);
        } else if (gameMode === 'pvp') {
            if (currentPlayerTurn === 1 && !player1Choice) {
                updateScores('player2');
                roundResultDisplay.textContent = `${player1Name}_NO_EJECUTO_ACCIÓN. ${player2Name}_GANA_RONDA.`;
            } else if (currentPlayerTurn === 2 && !player2Choice) {
                updateScores('player1');
                roundResultDisplay.textContent = `${player2Name}_NO_EJECUTO_ACCIÓN. ${player1Name}_GANA_RONDA.`;
            }
        }
        nextRoundBtn.classList.remove('hidden');
        revealBtnPVP.classList.add('hidden');
    }

    function startPlayerTurn() {
        if (gameEnded) return;
        if (gameMode === 'pvp') {
            updateTurnIndicator();
            if (currentPlayerTurn === 1) {
                enablePlayerControls(player1ChoiceButtons, true);
                enablePlayerControls(player2ChoiceButtons, false);
                player1Panel.classList.remove('inactive-turn');
                player2Panel.classList.add('inactive-turn');
            } else {
                enablePlayerControls(player1ChoiceButtons, false);
                enablePlayerControls(player2ChoiceButtons, true);
                player1Panel.classList.add('inactive-turn');
                player2Panel.classList.remove('inactive-turn');
            }
        } else {
            enablePlayerControls(player1ChoiceButtons, true);
            turnIndicator.classList.add('hidden');
        }
        startTimer();
    }
    // Evento: click
    player1ChoiceButtons.forEach(button => button.addEventListener('click', () => handlePlayerChoice(1, button.dataset.choice, button)));
    player2ChoiceButtons.forEach(button => button.addEventListener('click', () => handlePlayerChoice(2, button.dataset.choice, button)));

    // Evento: keydown
    document.addEventListener('keydown', (event) => {
        if (gameEnded || !gameContainer.classList.contains('active')) return;
        const key = event.key.toLowerCase();
        if (gameMode === 'pvp') {
            if (currentPlayerTurn === 1 && KEY_MAP_P1[key] && !player1Choice) {
                handlePlayerChoice(1, KEY_MAP_P1[key], Array.from(player1ChoiceButtons).find(b => b.dataset.choice.toLowerCase() === KEY_MAP_P1[key]));
            } else if (currentPlayerTurn === 2 && KEY_MAP_P2[key] && !player2Choice) {
                handlePlayerChoice(2, KEY_MAP_P2[key], Array.from(player2ChoiceButtons).find(b => b.dataset.choice.toLowerCase() === KEY_MAP_P2[key]));
            }
        } else if (gameMode === 'pvc' && KEY_MAP_P1[key] && !player1Choice) {
            handlePlayerChoice(1, KEY_MAP_P1[key], Array.from(player1ChoiceButtons).find(b => b.dataset.choice.toLowerCase() === KEY_MAP_P1[key]));
        }
    });

    function handlePlayerChoice(playerNum, choice, buttonElement) {
        if (gameEnded) return;
        stopTimer();
        if (buttonElement) buttonElement.classList.add('selected');

        if (playerNum === 1) {
            player1Choice = choice.toLowerCase(); // Asegurar minúsculas para la lógica
            player1ChoiceDisplay.textContent = `INPUT_REGISTRADO: ${CHOICE_EMOJIS[player1Choice]}`;
            enablePlayerControls(player1ChoiceButtons, false);
            if (gameMode === 'pvc') {
                playRoundPVC();
            } else {
                player1ChoiceDisplay.textContent = `// ${player1Name}_ELIGIO //`;
                currentPlayerTurn = 2;
                startPlayerTurn();
            }
        } else if (playerNum === 2 && gameMode === 'pvp') {
            player2Choice = choice.toLowerCase(); // Asegurar minúsculas
            player2ChoiceDisplay.textContent = `INPUT_REGISTRADO: ${CHOICE_EMOJIS[player2Choice]}`;
            enablePlayerControls(player2ChoiceButtons, false);
            player2ChoiceDisplay.textContent = `// ${player2Name}_ELIGIO //`;
            revealBtnPVP.classList.remove('hidden');
            roundResultDisplay.textContent = 'AMBOS_INPUTS_RECIBIDOS. [DECODIFICAR_JUGADAS]';
            turnIndicator.textContent = `PULSAR [DECODIFICAR_JUGADAS]`;
        }
    }

    function enablePlayerControls(buttons, enable) {
        buttons.forEach(button => button.disabled = !enable);
    }
    function disableAllChoiceButtons() {
        enablePlayerControls(player1ChoiceButtons, false);
        enablePlayerControls(player2ChoiceButtons, false);
    }
    // Evento: click
    revealBtnPVP.addEventListener('click', () => {
        if (gameEnded) return;
        if (gameMode === 'pvp' && player1Choice && player2Choice) {
            player1ChoiceDisplay.textContent = `${player1Name}: ${CHOICE_EMOJIS[player1Choice]}`;
            player2ChoiceDisplay.textContent = `${player2Name}: ${CHOICE_EMOJIS[player2Choice]}`;
            playRoundPVP();
            revealBtnPVP.classList.add('hidden');
        }
    });

    function getComputerChoice() {
        computerChoice = CHOICES[Math.floor(Math.random() * CHOICES.length)];
        computerChoiceDisplay.textContent = CHOICE_EMOJIS[computerChoice];
    }

    function playRoundPVC() {
        getComputerChoice();
        const winner = determineWinner(player1Choice, computerChoice);
        updateScores(winner);
        displayResult(winner, player1Choice, computerChoice);
        nextRoundBtn.classList.remove('hidden');
        disableAllChoiceButtons();
    }

    function playRoundPVP() {
        const winner = determineWinner(player1Choice, player2Choice);
        updateScores(winner);
        displayResultPVP(winner, player1Choice, player2Choice);
        nextRoundBtn.classList.remove('hidden');
        disableAllChoiceButtons();
    }

    function determineWinner(p1, p2) {
        if (!p1 && p2) return 'player2';
        if (p1 && !p2) return 'player1';
        if (!p1 && !p2) return 'tie';
        if (p1 === p2) return 'tie';
        if ((p1 === 'piedra' && p2 === 'tijeras') || (p1 === 'papel' && p2 === 'piedra') || (p1 === 'tijeras' && p2 === 'papel')) {
            return 'player1';
        }
        return 'player2';
    }

    function updateScores(winner) {
        if (winner === 'player1') player1Score++;
        else if (winner === 'player2') player2Score++;
        else if (winner === 'tie') ties++;

        player1ScoreDisplay.innerHTML = `<span>${player1Name}</span>: ${player1Score}`;
        player2ScoreDisplay.innerHTML = `<span>${player2Name}</span>: ${player2Score}`;
        tiesDisplay.innerHTML = `<span>[SINCRONIZACIONES_NEUTRAS]</span>: ${ties}`;
    }

    function displayResult(winner, p1c, p2c) {
        roundResultDisplay.className = 'result-text';
        let p1cText = p1c ? capitalize(p1c) : "N/A";
        let p2cText = p2c ? capitalize(p2c) : "N/A";
        let p1cEmoji = p1c ? CHOICE_EMOJIS[p1c] : "X";
        let p2cEmoji = p2c ? CHOICE_EMOJIS[p2c] : "X";

        if (winner === 'tie') {
            roundResultDisplay.textContent = `SINCRONIZACIÓN_NEUTRA! AMBOS ${p1cEmoji}`;
            roundResultDisplay.classList.add('tie');
        } else if (winner === 'player1') {
            roundResultDisplay.textContent = `VICTORIA ${player1Name}! ${p1cText} ${getVerb(p1c)} ${p2cText}. (${p1cEmoji} > ${p2cEmoji})`;
            roundResultDisplay.classList.add('win');
        } else {
            roundResultDisplay.textContent = `DERROTA_DETECTADA. ${p2cText} ${getVerb(p2c)} ${p1cText}. (${p2cEmoji} > ${p1cEmoji})`;
            roundResultDisplay.classList.add('lose');
        }
    }

    function displayResultPVP(winner, p1c, p2c) {
        roundResultDisplay.className = 'result-text';
        if (winner === 'tie') {
            roundResultDisplay.textContent = `SINCRONIZACIÓN_NEUTRA! AMBOS ${CHOICE_EMOJIS[p1c]}`;
            roundResultDisplay.classList.add('tie');
        } else if (winner === 'player1') {
            roundResultDisplay.textContent = `VICTORIA ${player1Name}! ${capitalize(p1c)} ${getVerb(p1c)} ${p2c}.`;
            roundResultDisplay.classList.add('win');
        } else {
            roundResultDisplay.textContent = `VICTORIA ${player2Name}! ${capitalize(p2c)} ${getVerb(p2c)} ${p1c}.`;
            roundResultDisplay.classList.add('win');
        }
    }

    function updateTurnIndicator() {
        if (gameEnded) { turnIndicator.classList.add('hidden'); return; }
        if (gameMode === 'pvp') {
            turnIndicator.classList.remove('hidden');
            turnIndicator.textContent = `TURNO_DE: // ${currentPlayerTurn === 1 ? player1Name : player2Name} //`;
        } else {
            turnIndicator.classList.add('hidden');
        }
    }

    function resetRoundState() {
        if (gameEnded) return;
        stopTimer();
        player1Choice = null;
        player2Choice = null;
        computerChoice = null;
        player1ChoiceDisplay.textContent = 'ESPERANDO_INPUT...';
        player2ChoiceDisplay.textContent = 'ESPERANDO_INPUT...';
        if (gameMode === 'pvc') computerChoiceDisplay.textContent = '?';
        roundResultDisplay.textContent = '// INICIANDO_SECUENCIA //';
        roundResultDisplay.className = 'result-text';
        nextRoundBtn.classList.add('hidden');
        revealBtnPVP.classList.add('hidden');
        [...player1ChoiceButtons, ...player2ChoiceButtons].forEach(btn => btn.classList.remove('selected'));
        if (gameMode === 'pvp') {
            currentPlayerTurn = 1;
            startPlayerTurn();
        } else {
            enablePlayerControls(player1ChoiceButtons, true);
            startTimer();
        }
    }
    // Evento: click
    nextRoundBtn.addEventListener('click', resetRoundState);
    // Evento: click
    endGameBtn.addEventListener('click', () => {
        gameEnded = true;
        stopTimer();
        disableAllChoiceButtons();
        finalPlayer1ScoreDisplay.innerHTML = `<span>${player1Name}</span>: ${player1Score}`;
        finalPlayer2ScoreDisplay.innerHTML = `<span>${player2Name}</span>: ${player2Score}`;
        finalTiesDisplay.innerHTML = `<span>[EMPATES_FINALES]</span>: ${ties}`;

        if (player1Score > player2Score) {
            winnerMessageDisplay.textContent = `// ${player1Name} HA DOMINADO LA SESIÓN //`;
        } else if (player2Score > player1Score) {
            winnerMessageDisplay.textContent = `// ${player2Name} HA DOMINADO LA SESIÓN //`;
        } else {
            winnerMessageDisplay.textContent = "// LA SESIÓN CONCLUYE EN EQUILIBRIO //";
        }

        finalScoreDisplay.classList.remove('hidden');
        roundResultDisplay.textContent = "// SESIÓN_TERMINADA //";
        turnIndicator.classList.add('hidden');
        nextRoundBtn.classList.add('hidden');
        revealBtnPVP.classList.add('hidden');
        endGameBtn.classList.add('hidden');
    });
    // Evento: click
    resetGameBtn.addEventListener('click', () => {
        if (!gameEnded && gameContainer.classList.contains('active')) { // Permitir reiniciar si el juego está activo pero no terminado (ej. a mitad)
             // Esta lógica es más para un reinicio "en caliente" de la partida actual
            resetScores();
            resetRoundState();
            return;
        }
        // Si el juego había terminado (gameEnded = true), esta lógica no se ejecutaría sin un cambio.
        // Para un "Jugar de nuevo" después de finalizar, se podría llamar a startGame() o changeModeBtn.click()
        // Por simplicidad, este botón sigue oculto o su lógica se integra en "Cambiar Modo".
    });
    // Evento: click
    changeModeBtn.addEventListener('click', () => {
        stopTimer();
        gameContainer.classList.remove('active');
        gameContainer.classList.add('hidden');
        startScreen.classList.remove('hidden');
        startScreen.classList.add('active');
        playerNamesForm.classList.add('hidden');
        finalScoreDisplay.classList.add('hidden');
        gameEnded = false;
        // Los nombres se pedirán de nuevo, los puntajes se resetean al inicio del nuevo juego.
    });

    function resetScores() {
        player1Score = 0;
        player2Score = 0;
        ties = 0;
        player1ScoreDisplay.innerHTML = `<span>${player1Name}</span>: ${player1Score}`;
        player2ScoreDisplay.innerHTML = `<span>${player2Name}</span>: ${player2Score}`;
        tiesDisplay.innerHTML = `<span>[SINCRONIZACIONES_NEUTRAS]</span>: ${ties}`;
    }

    function capitalize(string) { if (!string) return ''; return string.charAt(0).toUpperCase() + string.slice(1); }
    function getVerb(choice) { if (choice === 'piedra') return 'DESTRUYE'; if (choice === 'papel') return 'ENVUELVE'; if (choice === 'tijeras') return 'CORTA'; return ''; }
});