// --- Selección de Elementos del DOM ---
const numberInput = document.getElementById('number-input');
const addBtn = document.getElementById('add-btn');
const saveBtn = document.getElementById('save-btn');
const numbersListContainer = document.getElementById('numbers-list-container');
const messageArea = document.getElementById('message-area');

// --- Variables Globales ---
const numbers = []; // Array para almacenar los números ingresados
const MIN_NUMBERS = 10;
const MAX_NUMBERS = 20;

// --- Funciones ---

/**
 * Actualiza la interfaz de usuario (botones y mensajes) según el estado actual.
 */
function updateUI() {
    // Actualizar mensaje con la cantidad de números
    messageArea.textContent = `Números ingresados: ${numbers.length} de ${MAX_NUMBERS}.`;

    // Habilitar/deshabilitar el botón de agregar
    if (numbers.length >= MAX_NUMBERS) {
        addBtn.disabled = true;
        numberInput.disabled = true;
        messageArea.textContent = `Límite de ${MAX_NUMBERS} números alcanzado.`;
    } else {
        addBtn.disabled = false;
        numberInput.disabled = false;
    }

    // Habilitar/deshabilitar el botón de guardar
    if (numbers.length >= MIN_NUMBERS) {
        saveBtn.disabled = false;
    } else {
        saveBtn.disabled = true;
    }
}

/**
 * Renderiza la lista de números en la pantalla.
 */
function renderNumbers() {
    // Limpiar el contenedor actual
    numbersListContainer.innerHTML = '';
    
    // Crear y añadir un elemento por cada número en el array
    numbers.forEach(num => {
        const numberElement = document.createElement('div');
        numberElement.className = 'number-item';
        numberElement.textContent = num;
        numbersListContainer.appendChild(numberElement);
    });
}

/**
 * Maneja la lógica para agregar un nuevo número.
 */
function addNumber() {
    // Obtener y validar el valor del input
    const value = numberInput.value;
    if (value === '') {
        messageArea.textContent = 'Por favor, ingresa un número.';
        return;
    }

    const numberValue = parseInt(value, 10);
    
    // Añadir el número al array
    numbers.push(numberValue);

    // Limpiar el campo de entrada
    numberInput.value = '';

    // Actualizar la vista
    renderNumbers();
    updateUI();

    // Devolver el foco al input
    numberInput.focus();
}

/**
 * Envía los números al servidor para que los guarde en un archivo.
 */
async function saveToFile() {
    // Deshabilitar el botón para evitar múltiples clics mientras se procesa
    saveBtn.disabled = true;
    messageArea.textContent = 'Guardando en el servidor...';

    try {
        // Usamos fetch para enviar una petición POST al endpoint que creamos en Node.js
        const response = await fetch('/guardar-numeros', {
            method: 'POST', // El tipo de petición
            headers: {
                'Content-Type': 'application/json' // Indicamos que enviaremos datos en formato JSON
            },
            body: JSON.stringify({ numeros: numbers }) // Convertimos el array a un string JSON y lo ponemos en el cuerpo de la petición
        });

        // Obtenemos la respuesta del servidor en formato JSON
        const result = await response.json();

        // Verificamos si la respuesta del servidor fue exitosa (código 200-299)
        if (response.ok) {
            messageArea.textContent = result.message; // Mostramos el mensaje de éxito del servidor
        } else {
            // Si hubo un error, mostramos el mensaje de error del servidor
            throw new Error(result.message);
        }

    } catch (error) {
        // Si hay un error en la comunicación (ej: servidor caído) o un error del servidor
        console.error('Error al contactar al servidor:', error);
        messageArea.textContent = `Error: ${error.message}`;
    } finally {
        // Volvemos a habilitar el botón si aún no se ha alcanzado el máximo de números
        if (numbers.length >= MIN_NUMBERS && numbers.length < MAX_NUMBERS) {
            saveBtn.disabled = false;
        }
    }
}


// --- Asignación de Eventos ---

// Evento para el botón "Agregar"
addBtn.addEventListener('click', addNumber);

// Evento para la tecla "Enter" en el campo de número
numberInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        // Prevenir que el formulario se envíe (si lo hubiera)
        event.preventDefault(); 
        // Si el botón de agregar está activo, ejecuta la función
        if (!addBtn.disabled) {
            addNumber();
        }
    }
});

// Evento para el botón "Guardar"
saveBtn.addEventListener('click', saveToFile);


// --- Inicialización ---
// Establecer el estado inicial de la UI al cargar la página
updateUI();
messageArea.textContent = 'Ingresa al menos 10 números para poder guardar.';
