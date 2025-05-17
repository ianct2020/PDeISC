// Script para PPT Hacker (index3.html)
document.addEventListener('DOMContentLoaded', () => {
    const nombreJugador1Global = verificarNombreUsuario('index3.html');
    if (!nombreJugador1Global) {
        return; // Detener si no hay nombre
    }

    // Sufijar todos los IDs y clases referenciados en JS con "-ppt"
    const fontLink = document.getElementById('font-link-ppt');
    const primaryFont = 'Share Tech Mono'; // Fuentes como en tu original
    const displayFont = 'Orbitron';
    if (fontLink) {
        fontLink.href = `https://fonts.googleapis.com/css2?family=${primaryFont.replace(' ', '+')}&family=${displayFont.replace(' ', '+')}:wght@400;700&display=swap`;
    }

    const startScreen = document.getElementById('startScreenPpt');
    const saludoGlobalElemento = document.getElementById('saludoGlobalPpt');
    const selectVsPlayerBtn = document.getElementById('selectVsPlayerBtnPpt');
    const selectVsComputerBtn = document.getElementById('selectVsComputerBtnPpt');
    const playerNamesForm = document.getElementById('playerNamesFormPpt');
    // player1NameInputPpt ya no se usa para entrada
    const player2NameInputContainer = document.getElementById('player2NameInputContainerPpt');
    const player2NameInput = document.getElementById('player2NameInputPpt');
    const startGameWithNameBtn = document.getElementById('startGameWithNameBtnPpt');

    const gameContainer = document.getElementById('gameContainerPpt');
    const timerDisplay = document.getElementById('timerDisplayPpt');
    const player1Panel = document.getElementById('player1PanelPpt');
    const player1NameDisplayElement = document.getElementById('player1NameDisplayPpt');
    const player1ChoiceButtons = player1Panel.querySelectorAll('.player1-choice-ppt');
    const player1ChoiceDisplay = document.getElementById('player1ChoiceDisplayPpt');
    const player2Panel = document.getElementById('player2PanelPpt');
    const player2NameDisplayElement = document.getElementById('player2NameDisplayPpt');
    const player2ChoiceButtons = player2Panel.querySelectorAll('.player2-choice-ppt');
    const player2ChoiceDisplay = document.getElementById('player2ChoiceDisplayPpt');
    const player2KeyboardHint = document.getElementById('player2KeyboardHintPpt');
    const computerPanel = document.getElementById('computerPanelPpt');
    const computerChoiceDisplay = document.getElementById('computerChoiceDisplayPpt');
    const roundResultDisplay = document.getElementById('roundResultPpt');
    const turnIndicator = document.getElementById('turnIndicatorPpt');
    const player1ScoreDisplay = document.getElementById('player1ScorePpt');
    const player2ScoreDisplay = document.getElementById('player2ScorePpt');
    const tiesDisplay = document.getElementById('tiesPpt');
    const nextRoundBtn = document.getElementById('nextRoundBtnPpt');
    const revealBtnPVP = document.getElementById('revealBtnPVPPpt'); // ID corregido
    const endGameBtn = document.getElementById('endGameBtnPpt');
    const resetGameBtn = document.getElementById('resetGameBtnPpt');
    const changeModeBtn = document.getElementById('changeModeBtnPpt');

    const finalScoreDisplay = document.getElementById('finalScoreDisplayPpt');
    const finalPlayer1ScoreDisplay = document.getElementById('finalPlayer1ScorePpt');
    const finalPlayer2ScoreDisplay = document.getElementById('finalPlayer2ScorePpt');
    const finalTiesDisplay = document.getElementById('finalTiesPpt');
    const winnerMessageDisplay = document.getElementById('winnerMessagePpt');

    const TIMER_DURATION = 10;
    let timerInterval;
    let timeLeft;
    let player1Choice = null;
    let player2Choice = null;
    let computerChoice = null;
    let gameMode = null; // 'pvp' o 'pvc'
    let currentPlayerTurn = null; // 1 o 2
    let player1Name = nombreJugador1Global; // Usar el nombre global
    let player2Name = "JUGADOR_2";
    let player1Score = 0;
    let player2Score = 0;
    let ties = 0;
    let gameEnded = false;

    const CHOICES = ['piedra', 'papel', 'tijeras'];
    const CHOICE_EMOJIS = { piedra: '✊', papel: '✋', tijeras: '✌️' };
    const KEY_MAP_P1 = { 'a': 'piedra', 's': 'papel', 'd': 'tijeras' };
    const KEY_MAP_P2 = { '4': 'piedra', '5': 'papel', '6': 'tijeras' };

    if (saludoGlobalElemento) {
        saludoGlobalElemento.textContent = `Agente ${player1Name}, bienvenido al sistema PPT.`;
    }

    if (selectVsPlayerBtn) selectVsPlayerBtn.addEventListener('click', () => prepareNameEntry('pvp'));
    if (selectVsComputerBtn) selectVsComputerBtn.addEventListener('click', () => prepareNameEntry('pvc'));

    function prepareNameEntry(mode) {
        gameMode = mode;
        if (playerNamesForm) playerNamesForm.classList.remove('hidden-ppt');
        // No necesitamos mostrar el input para player1Name

        if (mode === 'pvp') {
            if (player2NameInputContainer) player2NameInputContainer.classList.remove('hidden-ppt');
            if (player2NameInput) {
                player2NameInput.placeholder = "[ALIAS_JUGADOR_2]";
                player2NameInput.value = ""; // Limpiar para nueva entrada
                player2NameInput.focus();
            }
        } else { // pvc
            if (player2NameInputContainer) player2NameInputContainer.classList.add('hidden-ppt');
            if (startGameWithNameBtn) startGameWithNameBtn.focus(); // Iniciar directamente vs IA
        }
    }

    if (startGameWithNameBtn) {
        startGameWithNameBtn.addEventListener('click', () => {
            // player1Name ya está seteado.
            if (gameMode === 'pvp') {
                player2Name = player2NameInput.value.trim() || "OPERADOR_2";
                if (player2Name.toLowerCase() === player1Name.toLowerCase()) {
                    alert("El Jugador 2 no puede tener el mismo alias que el Jugador 1. Modifica la identificación.");
                    if (player2NameInput) player2NameInput.focus();
                    return;
                }
            } else {
                player2Name = "IA_ADVERSARIA_X";
            }
            startGame();
        });
    }


    function startGame() {
        if (startScreen) startScreen.classList.add('hidden-ppt'); // Ocultar pantalla de inicio de PPT
        if (gameContainer) gameContainer.classList.remove('hidden-ppt');
        if (finalScoreDisplay) finalScoreDisplay.classList.add('hidden-ppt');
        gameEnded = false;
        if (endGameBtn) endGameBtn.classList.remove('hidden-ppt');

        if (player1NameDisplayElement) player1NameDisplayElement.textContent = `// ${player1Name} //`;
        if (player1ScoreDisplay) player1ScoreDisplay.querySelector('span').textContent = `${player1Name}`;
        if (player2NameDisplayElement) player2NameDisplayElement.textContent = `// ${player2Name} //`;
        if (player2ScoreDisplay) player2ScoreDisplay.querySelector('span').textContent = `${player2Name}`;

        if (gameMode === 'pvc') {
            if (computerPanel) {
                computerPanel.querySelector('h2').textContent = `// ${player2Name} //`;
                computerPanel.classList.remove('hidden-ppt');
            }
            if (player2Panel) player2Panel.classList.add('hidden-ppt');
            if (player2KeyboardHint) player2KeyboardHint.classList.add('hidden-ppt');
            currentPlayerTurn = 1;
            if (turnIndicator) turnIndicator.classList.add('hidden-ppt');
        } else { // pvp
            if (player2Panel) player2Panel.classList.remove('hidden-ppt');
            if (computerPanel) computerPanel.classList.add('hidden-ppt');
            if (player2KeyboardHint) player2KeyboardHint.classList.remove('hidden-ppt');
            currentPlayerTurn = 1;
            updateTurnIndicator();
            enablePlayerControls(player2ChoiceButtons, false);
        }
        if (player1Panel) player1Panel.classList.remove('inactive-turn-ppt');
        if (player2Panel) player2Panel.classList.remove('inactive-turn-ppt'); // Reset
        if (gameMode === 'pvp' && currentPlayerTurn === 1 && player2Panel) {
             player2Panel.classList.add('inactive-turn-ppt');
        }

        resetScores();
        resetRoundState();
    }

    function startTimer() {
        if (gameEnded || !timerDisplay) return;
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
        if (gameEnded || !roundResultDisplay) return;
        roundResultDisplay.textContent = `TIEMPO_EXPIRADO_PARA_${currentPlayerTurn === 1 ? player1Name : player2Name}!`;
        roundResultDisplay.className = 'result-text-ppt lose-ppt';
        disableAllChoiceButtons();

        if (gameMode === 'pvc') {
            updateScores('player2'); // IA (player2) gana por timeout de P1
            displayResult( 'player2', player1Choice, computerChoice || CHOICES[Math.floor(Math.random() * CHOICES.length)]); // P2 gana
        } else if (gameMode === 'pvp') {
            if (currentPlayerTurn === 1 && !player1Choice) {
                updateScores('player2'); // P2 gana
                roundResultDisplay.textContent = `${player1Name}_NO_EJECUTO_ACCIÓN. ${player2Name}_GANA_RONDA.`;
            } else if (currentPlayerTurn === 2 && !player2Choice) {
                updateScores('player1'); // P1 gana
                roundResultDisplay.textContent = `${player2Name}_NO_EJECUTO_ACCIÓN. ${player1Name}_GANA_RONDA.`;
            }
        }
        if (nextRoundBtn) nextRoundBtn.classList.remove('hidden-ppt');
        if (revealBtnPVP) revealBtnPVP.classList.add('hidden-ppt');
    }

    function startPlayerTurn() {
        if (gameEnded) return;
        if (gameMode === 'pvp') {
            updateTurnIndicator();
            if (currentPlayerTurn === 1) {
                enablePlayerControls(player1ChoiceButtons, true);
                enablePlayerControls(player2ChoiceButtons, false);
                if (player1Panel) player1Panel.classList.remove('inactive-turn-ppt');
                if (player2Panel) player2Panel.classList.add('inactive-turn-ppt');
            } else {
                enablePlayerControls(player1ChoiceButtons, false);
                enablePlayerControls(player2ChoiceButtons, true);
                if (player1Panel) player1Panel.classList.add('inactive-turn-ppt');
                if (player2Panel) player2Panel.classList.remove('inactive-turn-ppt');
            }
        } else { // pvc
            enablePlayerControls(player1ChoiceButtons, true);
            if (turnIndicator) turnIndicator.classList.add('hidden-ppt');
            if (player1Panel) player1Panel.classList.remove('inactive-turn-ppt');
        }
        startTimer();
    }

    player1ChoiceButtons.forEach(button => button.addEventListener('click', () => handlePlayerChoice(1, button.dataset.choice, button)));
    player2ChoiceButtons.forEach(button => button.addEventListener('click', () => handlePlayerChoice(2, button.dataset.choice, button)));

    document.addEventListener('keydown', (event) => {
        if (gameEnded || !gameContainer || gameContainer.classList.contains('hidden-ppt')) return;
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
        if (gameMode === 'pvp' && playerNum !== currentPlayerTurn) return;
        if (gameMode === 'pvc' && playerNum !== 1) return;

        stopTimer();
        if (buttonElement) buttonElement.classList.add('selected-ppt'); // Usar clase específica

        if (playerNum === 1) {
            player1Choice = choice.toLowerCase();
            if (player1ChoiceDisplay) player1ChoiceDisplay.textContent = `INPUT_REGISTRADO: ${CHOICE_EMOJIS[player1Choice]}`;
            enablePlayerControls(player1ChoiceButtons, false);
            if (gameMode === 'pvc') {
                playRoundPVC();
            } else { // pvp
                if (player1ChoiceDisplay) player1ChoiceDisplay.textContent = `// ${player1Name}_ENCRIPTANDO... //`;
                currentPlayerTurn = 2;
                startPlayerTurn();
            }
        } else if (playerNum === 2 && gameMode === 'pvp') {
            player2Choice = choice.toLowerCase();
            if (player2ChoiceDisplay) player2ChoiceDisplay.textContent = `INPUT_REGISTRADO: ${CHOICE_EMOJIS[player2Choice]}`;
            enablePlayerControls(player2ChoiceButtons, false);
            if (player2ChoiceDisplay) player2ChoiceDisplay.textContent = `// ${player2Name}_ENCRIPTANDO... //`;
            if (revealBtnPVP) revealBtnPVP.classList.remove('hidden-ppt');
            if (roundResultDisplay) roundResultDisplay.textContent = 'AMBOS_INPUTS_RECIBIDOS. [DECODIFICAR_JUGADAS]';
            if (turnIndicator) turnIndicator.textContent = `PULSAR [DECODIFICAR_JUGADAS]`;
        }
    }

    function enablePlayerControls(buttons, enable) {
        buttons.forEach(button => button.disabled = !enable);
    }
    function disableAllChoiceButtons() {
        enablePlayerControls(player1ChoiceButtons, false);
        enablePlayerControls(player2ChoiceButtons, false);
    }

    if (revealBtnPVP) {
        revealBtnPVP.addEventListener('click', () => {
            if (gameEnded) return;
            if (gameMode === 'pvp' && player1Choice && player2Choice) {
                if (player1ChoiceDisplay) player1ChoiceDisplay.textContent = `${player1Name}: ${CHOICE_EMOJIS[player1Choice]}`;
                if (player2ChoiceDisplay) player2ChoiceDisplay.textContent = `${player2Name}: ${CHOICE_EMOJIS[player2Choice]}`;
                playRoundPVP();
                revealBtnPVP.classList.add('hidden-ppt');
            }
        });
    }


    function getComputerChoice() {
        computerChoice = CHOICES[Math.floor(Math.random() * CHOICES.length)];
        if (computerChoiceDisplay) computerChoiceDisplay.textContent = CHOICE_EMOJIS[computerChoice];
    }

    function playRoundPVC() {
        if (!player1Choice) { handleTimeOut(); return; }
        getComputerChoice();
        const winner = determineWinner(player1Choice, computerChoice);
        updateScores(winner);
        displayResult(winner, player1Choice, computerChoice); // Usar displayResult para PVC
        if (nextRoundBtn) nextRoundBtn.classList.remove('hidden-ppt');
        disableAllChoiceButtons();
    }

    function playRoundPVP() {
        if (!player1Choice || !player2Choice) { handleTimeOut(); return; }
        const winner = determineWinner(player1Choice, player2Choice);
        updateScores(winner);
        displayResultPVP(winner, player1Choice, player2Choice); // Usar displayResultPVP
        if (nextRoundBtn) nextRoundBtn.classList.remove('hidden-ppt');
        disableAllChoiceButtons();
    }


    function determineWinner(p1, p2) { /* Sin cambios */
        if (!p1 && p2) return 'player2'; if (p1 && !p2) return 'player1';
        if (!p1 && !p2) return 'tie'; if (p1 === p2) return 'tie';
        if ((p1 === 'piedra' && p2 === 'tijeras') || (p1 === 'papel' && p2 === 'piedra') || (p1 === 'tijeras' && p2 === 'papel')) return 'player1';
        return 'player2';
    }

    function updateScores(winner) { /* Sin cambios, usa player1Name y player2Name */
        if (winner === 'player1') player1Score++; else if (winner === 'player2') player2Score++; else if (winner === 'tie') ties++;
        if (player1ScoreDisplay) player1ScoreDisplay.innerHTML = `<span>${player1Name}</span>: ${player1Score}`;
        if (player2ScoreDisplay) player2ScoreDisplay.innerHTML = `<span>${player2Name}</span>: ${player2Score}`;
        if (tiesDisplay) tiesDisplay.innerHTML = `<span>[SINCRONIZACIONES_NEUTRAS]</span>: ${ties}`;
    }

    function displayResult(winner, p1c, p2c) { // Para PVC
        if (!roundResultDisplay) return;
        roundResultDisplay.className = 'result-text-ppt'; // Clase base
        let p1cText = p1c ? capitalize(p1c) : "N/A";
        let p2cText = p2c ? capitalize(p2c) : "N/A";
        let p1cEmoji = p1c ? CHOICE_EMOJIS[p1c] : "X";
        let p2cEmoji = p2c ? CHOICE_EMOJIS[p2c] : "X";

        if (winner === 'tie') {
            roundResultDisplay.textContent = `SINCRONIZACIÓN_NEUTRA! ${player1Name} ${p1cEmoji} vs IA ${p2cEmoji}`;
            roundResultDisplay.classList.add('tie-ppt');
        } else if (winner === 'player1') {
            roundResultDisplay.textContent = `VICTORIA ${player1Name}! ${p1cText} ${getVerb(p1c)} ${p2cText}. (${p1cEmoji} > ${p2cEmoji})`;
            roundResultDisplay.classList.add('win-ppt');
        } else { // player2 (IA) gana
            roundResultDisplay.textContent = `IA GANA. ${p2cText} ${getVerb(p2c)} ${p1cText}. (${p2cEmoji} > ${p1cEmoji})`;
            roundResultDisplay.classList.add('lose-ppt');
        }
    }

    function displayResultPVP(winner, p1c, p2c) { // Para PVP
        if (!roundResultDisplay) return;
        roundResultDisplay.className = 'result-text-ppt'; // Clase base
        let p1cText = capitalize(p1c); let p2cText = capitalize(p2c);
        let p1cEmoji = CHOICE_EMOJIS[p1c]; let p2cEmoji = CHOICE_EMOJIS[p2c];

        if (winner === 'tie') {
            roundResultDisplay.textContent = `SINCRONIZACIÓN_NEUTRA! AMBOS ${p1cEmoji}`;
            roundResultDisplay.classList.add('tie-ppt');
        } else if (winner === 'player1') {
            roundResultDisplay.textContent = `VICTORIA ${player1Name}! ${p1cText} ${getVerb(p1c)} ${p2cText}. (${p1cEmoji} > ${p2cEmoji})`;
            roundResultDisplay.classList.add('win-ppt');
        } else { // player2 gana
            roundResultDisplay.textContent = `VICTORIA ${player2Name}! ${p2cText} ${getVerb(p2c)} ${p1cText}. (${p2cEmoji} > ${p1cEmoji})`;
            roundResultDisplay.classList.add('win-ppt'); // En pvp, la victoria del oponente es una "victoria" para ese jugador
        }
    }


    function updateTurnIndicator() { /* Sin cambios, usa player1Name y player2Name */
        if (gameEnded || !turnIndicator) { if (turnIndicator) turnIndicator.classList.add('hidden-ppt'); return; }
        if (gameMode === 'pvp') {
            turnIndicator.classList.remove('hidden-ppt');
            turnIndicator.textContent = `TURNO_DE: // ${currentPlayerTurn === 1 ? player1Name : player2Name} //`;
        } else { turnIndicator.classList.add('hidden-ppt'); }
    }

    function resetRoundState() {
        if (gameEnded) return; stopTimer();
        player1Choice = null; player2Choice = null; computerChoice = null;
        if (player1ChoiceDisplay) player1ChoiceDisplay.textContent = 'ESPERANDO_INPUT...';
        if (player2ChoiceDisplay) player2ChoiceDisplay.textContent = 'ESPERANDO_INPUT...';
        if (gameMode === 'pvc' && computerChoiceDisplay) computerChoiceDisplay.textContent = '?';
        if (roundResultDisplay) { roundResultDisplay.textContent = '// INICIANDO_SECUENCIA //'; roundResultDisplay.className = 'result-text-ppt'; }
        if (nextRoundBtn) nextRoundBtn.classList.add('hidden-ppt');
        if (revealBtnPVP) revealBtnPVP.classList.add('hidden-ppt');
        [...player1ChoiceButtons, ...player2ChoiceButtons].forEach(btn => btn.classList.remove('selected-ppt'));
        if (gameMode === 'pvp') { currentPlayerTurn = 1; }
        startPlayerTurn();
    }

    if (nextRoundBtn) nextRoundBtn.addEventListener('click', resetRoundState);
    if (endGameBtn) {
        endGameBtn.addEventListener('click', () => { /* Sin cambios, usa player1Name y player2Name */
            gameEnded = true; stopTimer(); disableAllChoiceButtons();
            if (finalPlayer1ScoreDisplay) finalPlayer1ScoreDisplay.innerHTML = `<span>${player1Name}</span>: ${player1Score}`;
            if (finalPlayer2ScoreDisplay) finalPlayer2ScoreDisplay.innerHTML = `<span>${player2Name}</span>: ${player2Score}`;
            if (finalTiesDisplay) finalTiesDisplay.innerHTML = `<span>[EMPATES_FINALES]</span>: ${ties}`;
            if (winnerMessageDisplay) {
                if (player1Score > player2Score) winnerMessageDisplay.textContent = `// ${player1Name} HA DOMINADO LA SESIÓN //`;
                else if (player2Score > player1Score) winnerMessageDisplay.textContent = `// ${player2Name} HA DOMINADO LA SESIÓN //`;
                else winnerMessageDisplay.textContent = "// LA SESIÓN CONCLUYE EN EQUILIBRIO //";
            }
            if (finalScoreDisplay) finalScoreDisplay.classList.remove('hidden-ppt');
            if (roundResultDisplay) roundResultDisplay.textContent = "// SESIÓN_TERMINADA //";
            if (turnIndicator) turnIndicator.classList.add('hidden-ppt');
            if (nextRoundBtn) nextRoundBtn.classList.add('hidden-ppt');
            if (revealBtnPVP) revealBtnPVP.classList.add('hidden-ppt');
            endGameBtn.classList.add('hidden-ppt');
        });
    }

    if (resetGameBtn) { // Este botón suele estar oculto, su lógica es para reiniciar la partida actual
        resetGameBtn.addEventListener('click', () => {
            if (!gameEnded && gameContainer && !gameContainer.classList.contains('hidden-ppt')) {
                resetScores(); resetRoundState();
                if (finalScoreDisplay) finalScoreDisplay.classList.add('hidden-ppt');
                if (endGameBtn) endGameBtn.classList.remove('hidden-ppt');
            }
        });
    }
    if (changeModeBtn) { // Volver a la selección de modo DENTRO de PPT
        changeModeBtn.addEventListener('click', () => {
            stopTimer();
            if (gameContainer) gameContainer.classList.add('hidden-ppt');
            if (startScreen) startScreen.classList.remove('hidden-ppt');
            if (playerNamesForm) playerNamesForm.classList.add('hidden-ppt');
            if (finalScoreDisplay) finalScoreDisplay.classList.add('hidden-ppt');
            gameEnded = false;
        });
    }

    function resetScores() { /* Sin cambios, usa player1Name y player2Name */
        player1Score = 0; player2Score = 0; ties = 0;
        if (player1ScoreDisplay) player1ScoreDisplay.innerHTML = `<span>${player1Name}</span>: ${player1Score}`;
        if (player2ScoreDisplay) player2ScoreDisplay.innerHTML = `<span>${player2Name}</span>: ${player2Score}`;
        if (tiesDisplay) tiesDisplay.innerHTML = `<span>[SINCRONIZACIONES_NEUTRAS]</span>: ${ties}`;
    }

    function capitalize(string) { if (!string) return ''; return string.charAt(0).toUpperCase() + string.slice(1); }
    function getVerb(choice) { if (choice === 'piedra') return 'DESTRUYE'; if (choice === 'papel') return 'ENVUELVE'; if (choice === 'tijeras') return 'CORTA'; return ''; }

});