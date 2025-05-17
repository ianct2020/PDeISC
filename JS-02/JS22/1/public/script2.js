// public/script2.js (Simón Dice - Integrado)
document.addEventListener('DOMContentLoaded', () => {
    // script1.js ya ha ejecutado verificarNombreUsuario y actualizado la navbar.
    // La función verificarNombreUsuario (de script1.js) también se encarga de actualizar
    // el saludo específico de esta página (#welcome-message-simon) si existe.
    const nombreJugadorGlobal = localStorage.getItem('nombreUsuarioGlobalJuegos');

    // Elementos del DOM específicos de Simón Dice
    const gameContainerSimon = document.querySelector('.game-container-simon'); // ID de tu HTML
    const startButtonSimon = document.getElementById('start-button-simon');     // ID de tu HTML
    const welcomeMessageDiv = document.getElementById('welcome-message-simon'); // ID de tu HTML

    // Si no hay nombre global, ajustar la UI y detener la inicialización del juego
    if (!nombreJugadorGlobal) {
        if (welcomeMessageDiv) {
            welcomeMessageDiv.textContent = "Por favor, identifícate en la página de Inicio para jugar.";
            welcomeMessageDiv.style.color = "var(--accent-color)"; // Usar un color de acento para el mensaje
        }
        if (startButtonSimon) {
            startButtonSimon.textContent = "Ir a Inicio";
            startButtonSimon.disabled = false;
            startButtonSimon.onclick = function() { window.location.href = 'index1.html'; };
            // Aplicar clases de botón genéricas para consistencia si las tienes
            startButtonSimon.classList.add('btn', 'btn-secondary'); // Ejemplo
        }
        // Ocultar el tablero y otros controles si es necesario
        const simonGameBoard = document.getElementById('simon-game');
        const controlPanel = document.getElementById('control-panel-simon');
        if(simonGameBoard) simonGameBoard.style.display = 'none';
        if(controlPanel && startButtonSimon) { // Si solo está el botón de inicio, no ocultar todo el panel
            Array.from(controlPanel.children).forEach(child => {
                if(child !== startButtonSimon && child !== welcomeMessageDiv && child.id !== 'message-display-simon') { // Mantener message-display para info
                    child.style.display = 'none';
                }
            });
            const messageDisplay = document.getElementById('message-display-simon');
            if(messageDisplay) messageDisplay.textContent = "Registro requerido en la página de Inicio.";
        }
        console.warn("Simón Dice: Nombre de usuario no disponible. Funcionalidad del juego limitada.");
        return;
    }

    // Si hay nombre, verificarNombreUsuario desde script1.js ya actualizó #welcome-message-simon

    // === LÓGICA DEL JUEGO SIMÓN DICE (BASADA EN TU CÓDIGO) ===
    const greenButton = document.getElementById('green');
    const redButton = document.getElementById('red');
    const yellowButton = document.getElementById('yellow');
    const blueButton = document.getElementById('blue');
    const levelDisplay = document.getElementById('level-display-simon');
    const messageDisplay = document.getElementById('message-display-simon');
    const errorDetailsDisplay = document.getElementById('error-details-display-simon');

    // Validar que todos los elementos del juego existan
    if (!greenButton || !redButton || !yellowButton || !blueButton || !levelDisplay || !messageDisplay || !errorDetailsDisplay || !startButtonSimon) {
        console.error("Error: Faltan elementos del DOM para el juego Simón Dice.");
        if(messageDisplay) messageDisplay.textContent = "Error al cargar el juego. Intenta recargar.";
        return;
    }

    const simonButtons = [greenButton, redButton, yellowButton, blueButton];
    const buttonColorNames = ["Verde", "Rojo", "Amarillo", "Azul"];

    let audioContext;
    const frequencies = [329.63, 261.63, 220.00, 164.81]; // G4, C4, A3, E3
    const soundDurations = [150, 150, 150, 150]; // Duraciones más cortas para clics rápidos

    function initAudio() {
        if (!audioContext) {
            try {
                audioContext = new (window.AudioContext || window.webkitAudioContext)();
                if (audioContext && audioContext.state === 'suspended') {
                    audioContext.resume();
                }
                if (!audioContext) {
                    messageDisplay.textContent = "Audio no soportado por el navegador.";
                    return false;
                }
            } catch (e) {
                messageDisplay.textContent = "Error al inicializar audio.";
                console.error("Error AudioContext:", e);
                return false;
            }
        }
        return true;
    }

    function playTone(colorIndex, durationMs) {
        if (!initAudio() || !audioContext || !frequencies[colorIndex] || !soundDurations[colorIndex]) return;
        // Crear oscilador y ganancia en cada llamada para evitar problemas con múltiples tonos rápidos
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();

        oscillator.type = 'sine'; // 'sine' o 'triangle' son buenas opciones
        oscillator.frequency.setValueAtTime(frequencies[colorIndex], audioContext.currentTime);
        
        gainNode.gain.setValueAtTime(0.2, audioContext.currentTime); // Volumen inicial
        gainNode.gain.exponentialRampToValueAtTime(0.0001, audioContext.currentTime + (durationMs / 1000)); // Fade out
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + (durationMs / 1000) + 0.05); // Un pequeño buffer para asegurar que pare
    }

    let nombreJugador = nombreJugadorGlobal; // Usar el nombre global directamente
    let sequence = [];
    let playerSequence = [];
    let level = 0;
    let playerTurn = false;
    let gameInProgress = false;

    let flashDuration = 320; // Duración del flash
    let pauseBetweenFlashes = 180; // Pausa entre flashes

    // Preparar juego (el saludo ya fue puesto por verificarNombreUsuario)
    if (messageDisplay) messageDisplay.textContent = 'Presiona "Iniciar Juego"';
    if (errorDetailsDisplay) errorDetailsDisplay.classList.add('hidden');
    // initAudio(); // Mejor llamar a initAudio dentro de playTone o al inicio del juego

    if (startButtonSimon) startButtonSimon.addEventListener('click', startGame);
    simonButtons.forEach(button => {
        if (button) button.addEventListener('click', handlePlayerClick);
    });

    function startGame() {
        level = 0;
        sequence = [];
        playerSequence = [];
        gameInProgress = true;
        if (startButtonSimon) {
            startButtonSimon.disabled = true;
            startButtonSimon.textContent = "En Juego...";
        }
        if (messageDisplay) messageDisplay.textContent = "¡Atención!";
        if (errorDetailsDisplay) {
            errorDetailsDisplay.classList.add('hidden');
            errorDetailsDisplay.innerHTML = '';
        }
        adjustSpeed();
        nextRound();
    }

    function adjustSpeed() {
        flashDuration = Math.max(100, 320 - level * 10);
        pauseBetweenFlashes = Math.max(70, 180 - level * 7);
    }

    function nextRound() {
        level++;
        if (levelDisplay) levelDisplay.textContent = level;
        playerSequence = [];
        playerTurn = false;
        adjustSpeed();
        const randomNumber = Math.floor(Math.random() * 4);
        sequence.push(randomNumber);
        playSequenceVisual(); // Renombrado para claridad
    }

    async function playSequenceVisual() {
        setButtonsClickable(false);
        if (messageDisplay) messageDisplay.textContent = `Memoriza la secuencia, ${nombreJugador}...`;
        await new Promise(resolve => setTimeout(resolve, 700)); // Más tiempo para prepararse

        for (let i = 0; i < sequence.length; i++) {
            const colorIndex = sequence[i];
            await flashButtonVisual(colorIndex, flashDuration);
            if (i < sequence.length - 1) {
                await new Promise(resolve => setTimeout(resolve, pauseBetweenFlashes));
            }
        }
        playerTurn = true;
        setButtonsClickable(true);
        if (messageDisplay) messageDisplay.textContent = `¡Tu Turno, ${nombreJugador}! Repite la secuencia.`;
    }

    function flashButtonVisual(colorIndex, duration) {
        return new Promise(resolve => {
            const button = simonButtons[colorIndex];
            if (!button) { resolve(); return; }
            button.classList.add('lit');
            playTone(colorIndex, soundDurations[colorIndex]); // Tono corto al iluminarse
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

        await flashButtonVisual(colorIndex, 150); // Flash rápido para feedback del jugador
        playerSequence.push(colorIndex);
        const currentStep = playerSequence.length - 1;

        if (playerSequence[currentStep] !== sequence[currentStep]) {
            gameOver();
            return;
        }
        if (playerSequence.length === sequence.length) {
            if (messageDisplay) messageDisplay.textContent = `¡Secuencia correcta, ${nombreJugador}!`;
            setButtonsClickable(false); // Deshabilitar mientras se prepara la siguiente ronda
            await new Promise(resolve => setTimeout(resolve, 1000)); // Pausa antes de la siguiente
            nextRound();
        }
    }

    function gameOver() {
        // playTone(0, 600); // Sonido de error más distintivo, quizás una frecuencia diferente
        if (audioContext && sequence.length > 0) { // Asegurar que audioContext esté inicializado
            const errorOscillator = audioContext.createOscillator();
            const errorGain = audioContext.createGain();
            errorOscillator.type = 'sawtooth';
            errorOscillator.frequency.setValueAtTime(100, audioContext.currentTime); // Frecuencia baja
            errorGain.gain.setValueAtTime(0.2, audioContext.currentTime);
            errorGain.gain.exponentialRampToValueAtTime(0.0001, audioContext.currentTime + 0.6);
            errorOscillator.connect(errorGain);
            errorGain.connect(audioContext.destination);
            errorOscillator.start();
            errorOscillator.stop(audioContext.currentTime + 0.6);
        }
        
        const mainMessage = `¡Juego Terminado, ${nombreJugador}! Nivel alcanzado: ${level}.`;
        if (messageDisplay) messageDisplay.textContent = mainMessage + (errorDetailsDisplay ? ' Revisa el detalle abajo.' : '');
        gameInProgress = false;
        playerTurn = false;
        if (startButtonSimon) {
            startButtonSimon.disabled = false;
            startButtonSimon.textContent = "Reiniciar Juego";
        }
        setButtonsClickable(false);

        // Guardar high score (ejemplo)
        let highScore = parseInt(localStorage.getItem('simon_highLevel')) || 0;
        if (level > highScore) {
            localStorage.setItem('simon_highLevel', level);
            // Podrías añadir un mensaje de "Nuevo récord!"
        }


        if (errorDetailsDisplay) {
            let detalleHtml = "<p><strong><u>Análisis del Error:</u></strong></p>";
            detalleHtml += `<p>Fallaste en la ronda ${level}, en el paso N° ${playerSequence.length}.</p>`;
            
            const secuenciaCorrectaNombres = sequence.map(idx => buttonColorNames[idx]);
            detalleHtml += `<p>Secuencia correcta esperada: <strong>${secuenciaCorrectaNombres.join(' &rarr; ')}</strong></p>`;
            
            const secuenciaJugadorNombres = playerSequence.map(idx => buttonColorNames[idx]);
            if (playerSequence.length > 0) {
                 detalleHtml += `<p>Tu secuencia fue: <strong>${secuenciaJugadorNombres.join(' &rarr; ')}</strong></p>`;
            }

            const indiceError = playerSequence.length - 1; // El último input fue el erróneo
            if (indiceError >= 0 && sequence[indiceError] !== undefined && playerSequence[indiceError] !== undefined) {
                 detalleHtml += `<p>Se esperaba <strong>${buttonColorNames[sequence[indiceError]]}</strong> pero presionaste <strong>${buttonColorNames[playerSequence[indiceError]]}</strong>.</p>`;
            } else if (sequence.length > 0 && sequence[0] !== undefined) { // Si no se presionó nada o el primer input fue erróneo
                detalleHtml += `<p>El primer color esperado era <strong>${buttonColorNames[sequence[0]]}</strong>.</p>`;
            } else {
                detalleHtml += `<p>Ocurrió un error al determinar la secuencia detallada.</p>`
            }
            
            errorDetailsDisplay.innerHTML = detalleHtml;
            errorDetailsDisplay.classList.remove('hidden');
        }
    }
    
    function setButtonsClickable(clickable) {
        simonButtons.forEach(button => {
            if (button) button.style.pointerEvents = clickable ? 'auto' : 'none';
            // Podrías también añadir/quitar una clase para cambiar la opacidad
            if (button) button.style.opacity = clickable ? '1' : '0.7';
        });
    }
    setButtonsClickable(false); // Inicialmente los botones no son clickables hasta que empiece el juego
});