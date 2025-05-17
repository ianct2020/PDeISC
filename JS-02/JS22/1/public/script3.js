// public/script3.js (PPT Hacker - Refactorizado)
document.addEventListener('DOMContentLoaded', () => {
    const nombreJugador1Global = verificarNombreUsuario('index3.html'); // De script1.js

    // --- DOM Elements Cache ---
    const DOMElements = {
        fontLink: document.getElementById('font-link-ppt'),
        startScreen: document.getElementById('startScreenPpt'),
        saludoGlobal: document.getElementById('saludoGlobalPpt'),
        selectVsPlayerBtn: document.getElementById('selectVsPlayerBtnPpt'),
        selectVsComputerBtn: document.getElementById('selectVsComputerBtnPpt'),
        playerNamesForm: document.getElementById('playerNamesFormPpt'),
        player2NameInputContainer: document.getElementById('player2NameInputContainerPpt'),
        player2NameInput: document.getElementById('player2NameInputPpt'),
        startGameWithNameBtn: document.getElementById('startGameWithNameBtnPpt'),
        gameContainer: document.getElementById('gameContainerPpt'),
        timerDisplay: document.getElementById('timerDisplayPpt'),
        player1Panel: document.getElementById('player1PanelPpt'),
        player1NameDisplay: document.getElementById('player1NameDisplayPpt'),
        player1ChoiceDisplay: document.getElementById('player1ChoiceDisplayPpt'),
        player2Panel: document.getElementById('player2PanelPpt'),
        player2NameDisplay: document.getElementById('player2NameDisplayPpt'),
        player2ChoiceDisplay: document.getElementById('player2ChoiceDisplayPpt'),
        player2KeyboardHint: document.getElementById('player2KeyboardHintPpt'),
        computerPanel: document.getElementById('computerPanelPpt'),
        computerChoiceDisplay: document.getElementById('computerChoiceDisplayPpt'),
        roundResultDisplay: document.getElementById('roundResultPpt'),
        turnIndicator: document.getElementById('turnIndicatorPpt'),
        player1ScoreDisplay: document.getElementById('player1ScorePpt'),
        player2ScoreDisplay: document.getElementById('player2ScorePpt'),
        tiesDisplay: document.getElementById('tiesPpt'),
        nextRoundBtn: document.getElementById('nextRoundBtnPpt'),
        revealBtnPVP: document.getElementById('revealBtnPVPPpt'),
        endGameBtn: document.getElementById('endGameBtnPpt'),
        resetGameBtn: document.getElementById('resetGameBtnPpt'), // Considerar si este botón es realmente necesario
        changeModeBtn: document.getElementById('changeModeBtnPpt'),
        finalScoreDisplay: document.getElementById('finalScoreDisplayPpt'),
        finalPlayer1Score: document.getElementById('finalPlayer1ScorePpt'),
        finalPlayer2Score: document.getElementById('finalPlayer2ScorePpt'),
        finalTies: document.getElementById('finalTiesPpt'),
        winnerMessage: document.getElementById('winnerMessagePpt')
    };
    const player1ChoiceButtons = DOMElements.player1Panel?.querySelectorAll('.player1-choice-ppt');
    const player2ChoiceButtons = DOMElements.player2Panel?.querySelectorAll('.player2-choice-ppt');

    if (!nombreJugador1Global) {
        if (DOMElements.saludoGlobal) DOMElements.saludoGlobal.textContent = "Acceso denegado. Identifícate en Inicio.";
        [DOMElements.selectVsPlayerBtn, DOMElements.selectVsComputerBtn].forEach(btn => btn && (btn.disabled = true));
        if (DOMElements.playerNamesForm) DOMElements.playerNamesForm.classList.add('hidden-ppt');
        // Considerar añadir botón para ir a index1.html aquí si se desea
        return;
    }

    // --- Game Constants & State ---
    const TIMER_DURATION = 10;
    const CHOICES = ['piedra', 'papel', 'tijeras'];
    const CHOICE_EMOJIS = { piedra: '✊', papel: '✋', tijeras: '✌️' };
    const KEY_MAP_P1 = { 'a': 'piedra', 's': 'papel', 'd': 'tijeras' };
    const KEY_MAP_P2 = { '4': 'piedra', '5': 'papel', '6': 'tijeras' }; // Para numpad si se desea

    let timerInterval;
    let timeLeft;
    let player1Choice = null;
    let player2Choice = null;
    let computerChoice = null;
    let gameMode = null; // 'pvp' o 'pvc'
    let currentPlayerTurn = null; // 1 o 2
    let player1Name = nombreJugador1Global;
    let player2Name = "Adversario"; // Default
    let scores = { player1: 0, player2: 0, ties: 0 };
    let gameEnded = false;

    // --- Initialization ---
    function initializeGame() {
        if (DOMElements.fontLink) {
            const primaryFont = 'Share Tech Mono';
            const displayFont = 'Orbitron';
            DOMElements.fontLink.href = `https://fonts.googleapis.com/css2?family=${primaryFont.replace(' ', '+')}&family=${displayFont.replace(' ', '+')}:wght@400;700&display=swap`;
        }
        if (DOMElements.saludoGlobal) DOMElements.saludoGlobal.textContent = `Agente ${player1Name}, bienvenido al sistema PPT.`;

        // Event Listeners para selección de modo
        DOMElements.selectVsPlayerBtn?.addEventListener('click', () => setupMode('pvp'));
        DOMElements.selectVsComputerBtn?.addEventListener('click', () => setupMode('pvc'));
        DOMElements.startGameWithNameBtn?.addEventListener('click', handleStartGameWithName);

        // Event Listeners para controles del juego
        player1ChoiceButtons?.forEach(button => button.addEventListener('click', () => handlePlayerAction(1, button.dataset.choice, button)));
        player2ChoiceButtons?.forEach(button => button.addEventListener('click', () => handlePlayerAction(2, button.dataset.choice, button)));
        document.addEventListener('keydown', handleKeyPress);

        DOMElements.revealBtnPVP?.addEventListener('click', processPVPRevealedChoices);
        DOMElements.nextRoundBtn?.addEventListener('click', resetRound);
        DOMElements.endGameBtn?.addEventListener('click', finalizeGame);
        DOMElements.changeModeBtn?.addEventListener('click', returnToModeSelection);
        // DOMElements.resetGameBtn?.addEventListener('click', () => {/* Lógica si se mantiene este botón */});
    }

    // --- UI Update Functions ---
    function toggleVisibility(element, show, displayType = 'block') {
        if (element) element.style.display = show ? displayType : 'none';
    }
    function updateText(element, text) {
        if (element) element.textContent = text;
    }
    function updateHTML(element, html) {
        if (element) element.innerHTML = html;
    }
    function toggleClass(element, className, force) {
        if(element) element.classList.toggle(className, force);
    }

    // --- Game Setup Logic ---
    function setupMode(mode) {
        gameMode = mode;
        toggleClass(DOMElements.playerNamesForm, 'hidden-ppt', false);
        const isPvp = mode === 'pvp';
        toggleClass(DOMElements.player2NameInputContainer, 'hidden-ppt', !isPvp);
        if (isPvp && DOMElements.player2NameInput) {
            DOMElements.player2NameInput.placeholder = "[ALIAS_JUGADOR_2]";
            DOMElements.player2NameInput.value = "";
            DOMElements.player2NameInput.focus();
        } else if (DOMElements.startGameWithNameBtn) {
            DOMElements.startGameWithNameBtn.focus();
        }
    }

    function handleStartGameWithName() {
        if (gameMode === 'pvp') {
            player2Name = DOMElements.player2NameInput.value.trim() || "Operador_2";
            if (player2Name.toLowerCase() === player1Name.toLowerCase() && player2Name !== "Operador_2") {
                alert("Los alias de los agentes deben ser únicos. Modifique la identificación del Operador 2.");
                DOMElements.player2NameInput?.focus();
                return;
            }
        } else {
            player2Name = "IA Némesis";
        }
        launchGame();
    }

    function launchGame() {
        toggleVisibility(DOMElements.startScreen, false);
        toggleVisibility(DOMElements.gameContainer, true, 'flex'); // Asumiendo que gameContainer es flex
        toggleVisibility(DOMElements.finalScoreDisplay, false);
        toggleVisibility(DOMElements.endGameBtn, true);
        gameEnded = false;

        updateText(DOMElements.player1NameDisplay, `// ${player1Name} //`);
        updateHTML(DOMElements.player1ScoreDisplay, `<span>${player1Name}</span>: 0`);
        updateText(DOMElements.player2NameDisplay, `// ${player2Name} //`);
        updateHTML(DOMElements.player2ScoreDisplay, `<span>${player2Name}</span>: 0`);
        updateHTML(DOMElements.tiesDisplay, `<span>[SINCRONIZACIONES_NEUTRAS]</span>: 0`);


        const isPvp = gameMode === 'pvp';
        toggleVisibility(DOMElements.computerPanel, !isPvp);
        toggleVisibility(DOMElements.player2Panel, isPvp);
        toggleVisibility(DOMElements.player2KeyboardHint, isPvp);
        toggleVisibility(DOMElements.turnIndicator, isPvp);

        if (isPvp) {
            currentPlayerTurn = 1;
            updateTurnIndicatorText();
            setPlayerControlsState(player2ChoiceButtons, false);
        } else {
            currentPlayerTurn = 1; // Humano siempre es jugador 1
        }
        
        toggleClass(DOMElements.player1Panel, 'inactive-turn-ppt', false);
        toggleClass(DOMElements.player2Panel, 'inactive-turn-ppt', isPvp && currentPlayerTurn !== 2);

        resetScoresState();
        resetRound();
    }

    // --- Timer Logic ---
    function startTimer() {
        if (gameEnded || !DOMElements.timerDisplay) return;
        timeLeft = TIMER_DURATION;
        updateText(DOMElements.timerDisplay, timeLeft);
        clearInterval(timerInterval);
        timerInterval = setInterval(() => {
            timeLeft--;
            updateText(DOMElements.timerDisplay, timeLeft);
            if (timeLeft <= 0) {
                clearInterval(timerInterval);
                processTimeOut();
            }
        }, 1000);
    }
    function stopTimer() { clearInterval(timerInterval); }

    function processTimeOut() {
        if (gameEnded) return;
        updateText(DOMElements.roundResultDisplay, `TIEMPO_AGOTADO_PARA_${currentPlayerTurn === 1 ? player1Name : player2Name}!`);
        DOMElements.roundResultDisplay?.classList.add('lose-ppt'); // Asumir clase de derrota
        setAllChoiceButtonsState(false);

        const loser = currentPlayerTurn === 1 ? 'player1' : 'player2';
        const winner = loser === 'player1' ? 'player2' : 'player1';
        updateScoresState(winner);
        
        // Lógica específica de timeout
        if (gameMode === 'pvc') { // Si P1 (humano) se quedó sin tiempo
            displayRoundOutcome(winner, player1Choice, computerChoice || CHOICES[Math.floor(Math.random() * CHOICES.length)]);
        } else { // PvP
            const timedOutPlayer = currentPlayerTurn === 1 ? player1Name : player2Name;
            const otherPlayer = currentPlayerTurn === 1 ? player2Name : player1Name;
            updateText(DOMElements.roundResultDisplay, `${timedOutPlayer}_NO_COMPLETO_ACCIÓN. ${otherPlayer}_GANA_ESTA_RONDA.`);
        }

        toggleVisibility(DOMElements.nextRoundBtn, true);
        toggleVisibility(DOMElements.revealBtnPVP, false);
    }

    // --- Player Actions & Turn Management ---
    function setPlayerControlsState(buttons, enabled) {
        buttons?.forEach(button => button.disabled = !enabled);
    }
    function setAllChoiceButtonsState(enabled) {
        setPlayerControlsState(player1ChoiceButtons, enabled);
        setPlayerControlsState(player2ChoiceButtons, enabled);
    }

    function initiatePlayerTurn() {
        if (gameEnded) return;
        const isPvp = gameMode === 'pvp';
        if (isPvp) updateTurnIndicatorText();

        setPlayerControlsState(player1ChoiceButtons, currentPlayerTurn === 1 || !isPvp);
        setPlayerControlsState(player2ChoiceButtons, isPvp && currentPlayerTurn === 2);
        
        toggleClass(DOMElements.player1Panel, 'inactive-turn-ppt', isPvp && currentPlayerTurn === 2);
        toggleClass(DOMElements.player2Panel, 'inactive-turn-ppt', isPvp && currentPlayerTurn === 1);
        startTimer();
    }

    function handleKeyPress(event) {
        if (gameEnded || !DOMElements.gameContainer || DOMElements.gameContainer.classList.contains('hidden-ppt')) return;
        const key = event.key.toLowerCase();
        const targetPlayer = gameMode === 'pvc' || (gameMode === 'pvp' && currentPlayerTurn === 1) ? 1 : 2;
        const keyMap = targetPlayer === 1 ? KEY_MAP_P1 : KEY_MAP_P2;
        const choiceButtons = targetPlayer === 1 ? player1ChoiceButtons : player2ChoiceButtons;
        const playerMadeChoice = targetPlayer === 1 ? player1Choice : player2Choice;

        if (keyMap[key] && !playerMadeChoice) {
            const button = Array.from(choiceButtons || []).find(b => b.dataset.choice.toLowerCase() === keyMap[key]);
            handlePlayerAction(targetPlayer, keyMap[key], button);
        }
    }

    function handlePlayerAction(playerNum, choice, buttonElement) {
        if (gameEnded || (gameMode === 'pvp' && playerNum !== currentPlayerTurn) || (gameMode === 'pvc' && playerNum !== 1)) return;

        stopTimer();
        buttonElement?.classList.add('selected-ppt');
        choice = choice.toLowerCase();

        if (playerNum === 1) {
            player1Choice = choice;
            updateText(DOMElements.player1ChoiceDisplay, `REGISTRADO: ${CHOICE_EMOJIS[choice]}`);
            setPlayerControlsState(player1ChoiceButtons, false);
            if (gameMode === 'pvc') {
                processRoundPVC();
            } else { // pvp
                updateText(DOMElements.player1ChoiceDisplay, `// ${player1Name}_ENCRIPTANDO... //`);
                currentPlayerTurn = 2;
                initiatePlayerTurn();
            }
        } else { // playerNum === 2 (solo en PvP)
            player2Choice = choice;
            updateText(DOMElements.player2ChoiceDisplay, `REGISTRADO: ${CHOICE_EMOJIS[choice]}`);
            setPlayerControlsState(player2ChoiceButtons, false);
            updateText(DOMElements.player2ChoiceDisplay, `// ${player2Name}_ENCRIPTANDO... //`);
            toggleVisibility(DOMElements.revealBtnPVP, true);
            updateText(DOMElements.roundResultDisplay, 'INPUTS_RECIBIDOS. [DECODIFICAR_TRANSMISIONES]');
            updateText(DOMElements.turnIndicator, `ESPERANDO_DECODIFICACIÓN...`);
        }
    }
    
    function processPVPRevealedChoices() {
        if (gameEnded || !(gameMode === 'pvp' && player1Choice && player2Choice)) return;
        updateText(DOMElements.player1ChoiceDisplay, `${player1Name}: ${CHOICE_EMOJIS[player1Choice]}`);
        updateText(DOMElements.player2ChoiceDisplay, `${player2Name}: ${CHOICE_EMOJIS[player2Choice]}`);
        processRoundPVP();
        toggleVisibility(DOMElements.revealBtnPVP, false);
    }

    // --- Round Processing ---
    function generateComputerChoice() {
        computerChoice = CHOICES[Math.floor(Math.random() * CHOICES.length)];
        updateText(DOMElements.computerChoiceDisplay, CHOICE_EMOJIS[computerChoice]);
    }

    function processRoundPVC() {
        if (!player1Choice) { processTimeOut(); return; } // Debería ser manejado por timeout, pero por si acaso
        generateComputerChoice();
        const winner = determineRoundWinner(player1Choice, computerChoice);
        updateScoresState(winner);
        displayRoundOutcome(winner, player1Choice, computerChoice);
        toggleVisibility(DOMElements.nextRoundBtn, true);
        setAllChoiceButtonsState(false);
    }

    function processRoundPVP() {
        if (!player1Choice || !player2Choice) { processTimeOut(); return; }
        const winner = determineRoundWinner(player1Choice, player2Choice);
        updateScoresState(winner);
        displayRoundOutcome(winner, player1Choice, player2Choice);
        toggleVisibility(DOMElements.nextRoundBtn, true);
        setAllChoiceButtonsState(false);
    }

    function determineRoundWinner(p1, p2) {
        if (!p1 && p2) return 'player2'; 
        if (p1 && !p2) return 'player1';
        if (!p1 && !p2 || p1 === p2) return 'tie';
        return ((p1 === 'piedra' && p2 === 'tijeras') || 
                (p1 === 'papel' && p2 === 'piedra') || 
                (p1 === 'tijeras' && p2 === 'papel')) ? 'player1' : 'player2';
    }

    // --- Score & Display Updates ---
    function updateScoresState(winner) {
        if (winner === 'player1') scores.player1++;
        else if (winner === 'player2') scores.player2++;
        else if (winner === 'tie') scores.ties++;
        updateHTML(DOMElements.player1ScoreDisplay, `<span>${player1Name}</span>: ${scores.player1}`);
        updateHTML(DOMElements.player2ScoreDisplay, `<span>${player2Name}</span>: ${scores.player2}`);
        updateHTML(DOMElements.tiesDisplay, `<span>[SINCRONIZACIONES_NEUTRAS]</span>: ${scores.ties}`);
    }

    function displayRoundOutcome(winner, p1c, p2c) {
        if (!DOMElements.roundResultDisplay) return;
        DOMElements.roundResultDisplay.className = 'result-text-ppt'; // Reset class
        const p1 = { choice: p1c, name: player1Name, emoji: p1c ? CHOICE_EMOJIS[p1c] : "X", text: p1c ? capitalize(p1c) : "N/A" };
        const p2 = { choice: p2c, name: player2Name, emoji: p2c ? CHOICE_EMOJIS[p2c] : "X", text: p2c ? capitalize(p2c) : "N/A" };
        const isPvcAndP2Wins = gameMode === 'pvc' && winner === 'player2';

        let message = "";
        let outcomeClass = "";

        if (winner === 'tie') {
            message = `SINCRONIZACIÓN_NEUTRA! ${p1.name} ${p1.emoji} vs ${p2.name} ${p2.emoji}`;
            outcomeClass = 'tie-ppt';
        } else if (winner === 'player1') {
            message = `VICTORIA ${p1.name}! ${p1.text} ${getVerb(p1.choice)} ${p2.text}. (${p1.emoji} > ${p2.emoji})`;
            outcomeClass = 'win-ppt';
        } else { // player2 wins
            message = `VICTORIA ${p2.name}! ${p2.text} ${getVerb(p2.choice)} ${p1.text}. (${p2.emoji} > ${p1.emoji})`;
            outcomeClass = isPvcAndP2Wins ? 'lose-ppt' : 'win-ppt'; // 'lose' si la IA gana al humano
        }
        updateText(DOMElements.roundResultDisplay, message);
        DOMElements.roundResultDisplay.classList.add(outcomeClass);
    }

    function updateTurnIndicatorText() {
        if (gameEnded || !DOMElements.turnIndicator) { toggleVisibility(DOMElements.turnIndicator, false); return; }
        if (gameMode === 'pvp') {
            toggleVisibility(DOMElements.turnIndicator, true);
            updateText(DOMElements.turnIndicator, `TURNO_DE: // ${currentPlayerTurn === 1 ? player1Name : player2Name} //`);
        } else {
            toggleVisibility(DOMElements.turnIndicator, false);
        }
    }

    // --- Game State Management ---
    function resetRound() {
        if (gameEnded) return;
        stopTimer();
        player1Choice = null; player2Choice = null; computerChoice = null;
        updateText(DOMElements.player1ChoiceDisplay, 'ESPERANDO_INPUT...');
        updateText(DOMElements.player2ChoiceDisplay, 'ESPERANDO_INPUT...');
        if (gameMode === 'pvc') updateText(DOMElements.computerChoiceDisplay, '?');
        
        updateText(DOMElements.roundResultDisplay, '// INICIANDO_TRANSMISIÓN_DE_RONDA //');
        if(DOMElements.roundResultDisplay) DOMElements.roundResultDisplay.className = 'result-text-ppt';
        
        toggleVisibility(DOMElements.nextRoundBtn, false);
        toggleVisibility(DOMElements.revealBtnPVP, false);
        
        player1ChoiceButtons?.forEach(btn => btn.classList.remove('selected-ppt'));
        player2ChoiceButtons?.forEach(btn => btn.classList.remove('selected-ppt'));

        currentPlayerTurn = 1; // P1 siempre inicia la nueva ronda (o es el primero en PvP)
        initiatePlayerTurn();
    }

    function resetScoresState() {
        scores = { player1: 0, player2: 0, ties: 0 };
        updateScoresState(null); // Actualiza el display con scores en 0
    }

    function finalizeGame() {
        gameEnded = true;
        stopTimer();
        setAllChoiceButtonsState(false);

        updateHTML(DOMElements.finalPlayer1Score, `<span>${player1Name}</span>: ${scores.player1}`);
        updateHTML(DOMElements.finalPlayer2Score, `<span>${player2Name}</span>: ${scores.player2}`);
        updateHTML(DOMElements.finalTies, `<span>[EMPATES_FINALES]</span>: ${scores.ties}`);

        let winnerMsgText = "// ANÁLISIS_DE_SESIÓN_CONCLUIDO //";
        if (scores.player1 > scores.player2) winnerMsgText = `// ${player1Name} HA_DEMOSTRADO_SUPERIORIDAD_TÁCTICA //`;
        else if (scores.player2 > scores.player1) winnerMsgText = `// ${player2Name} HA_LOGRADO_LA_DOMINACIÓN //`;
        else winnerMsgText = "// LA_CONTIENDA_FINALIZA_EN_PUNTO_MUERTO_ESTRATÉGICO //";
        updateText(DOMElements.winnerMessage, winnerMsgText);

        toggleVisibility(DOMElements.finalScoreDisplay, true);
        updateText(DOMElements.roundResultDisplay, "// TRANSMISIÓN_DE_SESIÓN_COMPLETADA //");
        [DOMElements.turnIndicator, DOMElements.nextRoundBtn, DOMElements.revealBtnPVP, DOMElements.endGameBtn].forEach(el => toggleVisibility(el, false));
    }

    function returnToModeSelection() {
        stopTimer();
        toggleVisibility(DOMElements.gameContainer, false);
        toggleVisibility(DOMElements.startScreen, true);
        toggleVisibility(DOMElements.playerNamesForm, true); // Mostrar para reconfigurar
        toggleVisibility(DOMElements.finalScoreDisplay, false);
        gameEnded = false;
        // Resetear nombres y elecciones para la nueva configuración
        player1Choice = null; player2Choice = null; computerChoice = null;
        setupMode(gameMode || 'pvp'); // Volver al último modo o pvp por defecto
    }

    // --- Utility Functions ---
    function capitalize(string) { return string ? string.charAt(0).toUpperCase() + string.slice(1) : ''; }
    function getVerb(choice) {
        const verbs = { piedra: 'DESTRUYE', papel: 'ENVUELVE', tijeras: 'CORTA' };
        return verbs[choice] || '';
    }

    // --- Start Everything ---
    initializeGame();
});