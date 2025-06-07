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
 * Crea y descarga un archivo .txt con los números.
 */
function saveToFile() {
    // Convertir el array de números en un string, con cada número en una nueva línea
    const fileContent = numbers.join('\n');
    
    // Crear un objeto Blob, que representa el archivo en memoria
    const blob = new Blob([fileContent], { type: 'text/plain;charset=utf-8' });
    
    // Crear una URL temporal para el Blob
    const url = URL.createObjectURL(blob);
    
    // Crear un enlace <a> temporal para iniciar la descarga
    const link = document.createElement('a');
    link.href = url;
    link.download = 'numeros_ingresados.txt'; // Nombre del archivo
    
    // Simular un clic en el enlace para que el navegador muestre el diálogo de guardado
    document.body.appendChild(link);
    link.click();
    
    // Limpiar: remover el enlace y la URL temporal de la memoria
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    messageArea.textContent = 'Archivo generado exitosamente.';
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
