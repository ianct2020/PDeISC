document.addEventListener('DOMContentLoaded', () => {
    // Elementos del Modal de Nombre
    const nameEntryModal = document.getElementById('name-entry-modal');
    const playerNameInput = document.getElementById('player-name-input');
    const playButton = document.getElementById('play-button');
    const nameErrorMessage = document.getElementById('name-error-message');

    // Elementos del Juego Principal
    const gameContainer = document.querySelector('.game-container');
    const welcomeMessageDiv = document.getElementById('welcome-message');
    const greenButton = document.getElementById('green');
    const redButton = document.getElementById('red');
    const yellowButton = document.getElementById('yellow');
    const blueButton = document.getElementById('blue');
    const startButton = document.getElementById('start-button');
    const levelDisplay = document.getElementById('level-display');
    const messageDisplay = document.getElementById('message-display');
    const errorDetailsDisplay = document.getElementById('error-details-display');

    const simonButtons = [greenButton, redButton, yellowButton, blueButton];
    const buttonColorNames = ["Verde", "Rojo", "Amarillo", "Azul"]; // Para mensajes de error

    let audioContext;
    const frequencies = [329.63, 261.63, 220.00, 164.81];
    const soundDurations = [200, 200, 200, 200]; // Duración del tono más corta para animación rápida

    function initAudio() {
        if (!audioContext) {
            try {
                audioContext = new (window.AudioContext || window.webkitAudioContext)();
                if (audioContext && audioContext.state === 'suspended') {
                    audioContext.resume();
                }
                if (!audioContext) {
                    nameErrorMessage.textContent = "Web Audio API no soportada.";
                    return false;
                }
            } catch (e) {
                nameErrorMessage.textContent = "Error al iniciar audio.";
                console.error("Error al iniciar AudioContext:", e);
                return false;
            }
        }
        return true;
    }

    function playTone(colorIndex, durationMs) {
        if (!audioContext) return;
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        oscillator.type = 'triangle'; // Cambiado para un tono más "retro"
        oscillator.frequency.setValueAtTime(frequencies[colorIndex], audioContext.currentTime);
        gainNode.gain.setValueAtTime(0.25, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.0001, audioContext.currentTime + (durationMs / 1000));
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + (durationMs / 1000));
    }

    let nombreJugador = '';
    let sequence = [];
    let playerSequence = [];
    let level = 0;
    let playerTurn = false;
    let gameInProgress = false;

    let flashDuration = 350; // Reducido para la nueva animación
    let pauseBetweenFlashes = 200;

    // Flujo de inicio
    nameEntryModal.classList.add('visible'); // Mostrar modal al cargar
    playerNameInput.focus();

    playButton.addEventListener('click', submitNameAndPrepareGame);
    startButton.addEventListener('click', startGame); // Este es el "Iniciar" del panel de control
    simonButtons.forEach(button => button.addEventListener('click', handlePlayerClick));

    function submitNameAndPrepareGame() {
        const name = playerNameInput.value.trim();
        if (!name) {
            nameErrorMessage.textContent = "¡No olvides tu nombre!";
            playerNameInput.focus();
            return;
        }
        nombreJugador = name;
        nameErrorMessage.textContent = "";

        if (!initAudio()) {
            // Mensaje ya gestionado por initAudio
        }

        nameEntryModal.classList.remove('visible');
        gameContainer.classList.remove('hidden');
        welcomeMessageDiv.textContent = `¡A jugar, ${nombreJugador}!`;
        messageDisplay.textContent = 'Presiona "Iniciar"';
        errorDetailsDisplay.classList.add('hidden'); // Ocultar al preparar
    }

    function startGame() {
        level = 0;
        sequence = [];
        playerSequence = [];
        gameInProgress = true;
        startButton.disabled = true;
        startButton.textContent = "En Juego...";
        messageDisplay.textContent = "¡Atención!";
        errorDetailsDisplay.classList.add('hidden'); // Ocultar detalles de error
        errorDetailsDisplay.innerHTML = '';
        adjustSpeed();
        nextRound();
    }

    function adjustSpeed() {
        flashDuration = Math.max(120, 350 - level * 12);
        pauseBetweenFlashes = Math.max(80, 200 - level * 8);
    }

    function nextRound() {
        level++;
        levelDisplay.textContent = level;
        playerSequence = [];
        playerTurn = false;
        adjustSpeed();
        const randomNumber = Math.floor(Math.random() * 4);
        sequence.push(randomNumber);
        playSequence();
    }

    async function playSequence() {
        setButtonsClickable(false);
        messageDisplay.textContent = `Memoriza, ${nombreJugador}...`;
        await new Promise(resolve => setTimeout(resolve, 600));

        for (let i = 0; i < sequence.length; i++) {
            const colorIndex = sequence[i];
            await flashButton(colorIndex, flashDuration);
            if (i < sequence.length - 1) {
                await new Promise(resolve => setTimeout(resolve, pauseBetweenFlashes));
            }
        }
        playerTurn = true;
        setButtonsClickable(true);
        messageDisplay.textContent = `¡Tu Turno, ${nombreJugador}!`;
    }

    function flashButton(colorIndex, duration) {
        return new Promise(resolve => {
            const button = simonButtons[colorIndex];
            button.classList.add('lit');
            playTone(colorIndex, soundDurations[colorIndex]);
            setTimeout(() => {
                button.classList.remove('lit');
                resolve();
            }, duration);
        });
    }

    async function handlePlayerClick(event) {
        if (!playerTurn || !gameInProgress) return;
        const clickedButton = event.target;
        const colorIndex = parseInt(clickedButton.dataset.colorIndex);

        await flashButton(colorIndex, 120); // Flash rápido para el jugador
        playerSequence.push(colorIndex);
        const currentStep = playerSequence.length - 1;

        if (playerSequence[currentStep] !== sequence[currentStep]) {
            gameOver();
            return;
        }
        if (playerSequence.length === sequence.length) {
            messageDisplay.textContent = `¡Correcto, ${nombreJugador}!`;
            setButtonsClickable(false);
            await new Promise(resolve => setTimeout(resolve, 900));
            nextRound();
        }
    }

    function gameOver() {
        if(audioContext) playTone(0, 700); // Sonido de error (usando el primer tono pero más largo)
        
        const mainMessage = `¡Perdiste, ${nombreJugador}! Nivel alcanzado: ${level}.`;
        messageDisplay.textContent = mainMessage + ' Revisa el detalle abajo.';
        gameInProgress = false;
        playerTurn = false;
        startButton.disabled = false;
        startButton.textContent = "Reiniciar";
        setButtonsClickable(false);

        // Mostrar detalle del error
        let detalleHtml = "<p><strong><u>Análisis del error:</u></strong></p>";
        detalleHtml += `<p>Ronda ${level}, te equivocaste en el paso N° ${playerSequence.length}.</p>`;
        
        const secuenciaCorrectaNombres = sequence.map(idx => buttonColorNames[idx]);
        detalleHtml += `<p>Secuencia correcta: <strong>${secuenciaCorrectaNombres.join(' &rarr; ')}</strong></p>`;
        
        const secuenciaJugadorNombres = playerSequence.map(idx => buttonColorNames[idx]);
        if (playerSequence.length > 0) {
             detalleHtml += `<p>Tú presionaste: <strong>${secuenciaJugadorNombres.join(' &rarr; ')}</strong></p>`;
        }

        const indiceError = playerSequence.length - 1;
        if (indiceError >= 0) { // Asegurarse que hubo al menos un input
             detalleHtml += `<p>Se esperaba <strong>${buttonColorNames[sequence[indiceError]]}</strong> y presionaste <strong>${buttonColorNames[playerSequence[indiceError]]}</strong>.</p>`;
        } else { // Error en el primer paso, playerSequence estaría vacío (o con un elemento si el error es el primero)
            detalleHtml += `<p>Se esperaba <strong>${buttonColorNames[sequence[0]]}</strong> y no presionaste (o el primer input fue incorrecto).</p>`;
        }
        
        errorDetailsDisplay.innerHTML = detalleHtml;
        errorDetailsDisplay.classList.remove('hidden');
    }
    
    function setButtonsClickable(clickable) {
        simonButtons.forEach(button => {
            button.style.pointerEvents = clickable ? 'auto' : 'none';
        });
    }
    setButtonsClickable(false); // Inicialmente los botones de simon no son clickables
});