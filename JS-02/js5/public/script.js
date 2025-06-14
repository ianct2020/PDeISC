/**
 * clase que representa un animal del zoológico
 * almacena toda la información relevante de cada animal
 */
class CZooAnimal {
    /**
     * constructor para crear un nuevo animal
     * @param {number} IdAnimal - identificador único del animal
     * @param {string} nombre - nombre del animal
     * @param {number|string} JaulaNumero - número de jaula donde se encuentra el animal
     * @param {number|string} IdTypeAnimal - identificador del tipo de animal (1:felino, 2:ave, etc.)
     * @param {number|string} peso - peso del animal en kilogramos
     */
    constructor(IdAnimal, nombre, JaulaNumero, IdTypeAnimal, peso) {
        this.IdAnimal = IdAnimal;
        this.nombre = nombre;
        this.JaulaNumero = parseInt(JaulaNumero); // convierte a número entero
        this.IdTypeAnimal = parseInt(IdTypeAnimal); // convierte a número entero
        this.peso = parseFloat(peso); // convierte a número decimal
    }
}

// espera a que el dom esté completamente cargado antes de ejecutar el código
document.addEventListener('DOMContentLoaded', () => {
    
    // array para almacenar todos los animales del zoológico
    const zooAnimals = [];
    
    // diccionario que mapea ids de tipos de animales a sus nombres
    const animalTypes = { 1: 'Felino', 2: 'Ave', 3: 'Reptil', 4: 'Otro' };
    
    // referencias a elementos del dom que se usarán frecuentemente
    const form = document.getElementById('animalForm'); // formulario para agregar animales
    const tableBody = document.getElementById('animalTableBody'); // cuerpo de la tabla donde se muestran los animales
    const resultB = document.getElementById('resultB'); // elemento para mostrar resultado de consulta b
    const resultC = document.getElementById('resultC'); // elemento para mostrar resultado de consulta c
    const resultD = document.getElementById('resultD'); // elemento para mostrar resultado de consulta d

    // referencias a los campos de entrada del formulario
    const nombreInput = document.getElementById('nombre'); // campo para el nombre
    const jaulaInput = document.getElementById('jaula'); // campo para el número de jaula
    const pesoInput = document.getElementById('peso'); // campo para el peso

    /**
     * agrega datos iniciales de animales al sistema
     * crea varios animales predefinidos para poblar la tabla
     */
    function addInitialData() {
        const initialData = [
            { id: 1, nombre: 'Simba', jaula: 2, tipo: 1, peso: 150 }, // león
            { id: 2, nombre: 'Kaa', jaula: 4, tipo: 3, peso: 110 },   // vibora
            { id: 3, nombre: 'Tico', jaula: 5, tipo: 2, peso: 2.5 },  // ave pequeña
            { id: 4, nombre: 'Rajah', jaula: 3, tipo: 1, peso: 180 },  // tigre
            { id: 5, nombre: 'Zazú', jaula: 5, tipo: 2, peso: 1.2 },  // ave pequeña
            { id: 6, nombre: 'Puma', jaula: 5, tipo: 1, peso: 90 },   // puma
        ];
        // convierte cada objeto de datos en una instancia de czooAnimal y lo agrega al array
        initialData.forEach(d => {
            zooAnimals.push(new CZooAnimal(d.id, d.nombre, d.jaula, d.tipo, d.peso));
        });
    }

    /**
     * actualiza toda la interfaz de usuario
     * llama a las funciones que actualizan la tabla y las consultas
     */
    function updateDisplay() {
        updateTable();
        runQueries();
    }

    /**
     * actualiza la tabla de animales en la interfaz
     * muestra todos los animales registrados en el sistema
     */
    function updateTable() {
        tableBody.innerHTML = ''; // limpia la tabla
        
        // si no hay animales, muestra un mensaje indicándolo
        if (zooAnimals.length === 0) {
            tableBody.innerHTML = `<tr><td colspan="5" class="empty-table">No hay animales registrados.</td></tr>`;
            return;
        }
        
        // crea una fila en la tabla para cada animal
        zooAnimals.forEach(animal => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${animal.IdAnimal}</td>
                <td>${animal.nombre}</td>
                <td>${animal.JaulaNumero}</td>
                <td>${animalTypes[animal.IdTypeAnimal]}</td>
                <td>${animal.peso} kg</td>
            `;
            tableBody.appendChild(row);
        });
    }

    /**
     * ejecuta las consultas requeridas y actualiza los resultados en la interfaz
     * realiza tres consultas específicas sobre los datos de animales
     */
    function runQueries() {
        // consulta b: cuenta animales en jaula 5 con peso menor a 3 kg
        resultB.textContent = zooAnimals.filter(a => a.JaulaNumero === 5 && a.peso < 3).length;
        
        // consulta c: cuenta felinos (tipo 1) entre las jaulas 2 y 5 (inclusive)
        resultC.textContent = zooAnimals.filter(a => a.IdTypeAnimal === 1 && a.JaulaNumero >= 2 && a.JaulaNumero <= 5).length;
        
        // consulta d: muestra nombres de animales en jaula 4 con peso menor a 120 kg
        const animalsInCage4 = zooAnimals.filter(a => a.JaulaNumero === 4 && a.peso < 120);
        if (animalsInCage4.length > 0) {
            resultD.textContent = animalsInCage4.map(animal => animal.nombre).join(', ');
        } else {
            resultD.textContent = 'Ninguno';
        }
    }

    /**
     * muestra un mensaje de error para un campo específico
     * @param {string} inputId - id del campo de entrada con error
     * @param {string} message - mensaje de error a mostrar
     */
    function showError(inputId, message) {
        document.getElementById(inputId + 'Error').textContent = message;
    }

    /**
     * limpia todos los mensajes de error en el formulario
     */
    function clearErrors() {
        document.querySelectorAll('.error-message').forEach(el => el.textContent = '');
    }

    /**
     * valida los datos del formulario antes de crear un nuevo animal
     * @returns {boolean} - true si todos los datos son válidos, false en caso contrario
     */
    function validateForm() {
        clearErrors(); // limpia errores previos
        let isValid = true; 
        
        // obtiene y prepara los valores de los campos
        const nombreValue = nombreInput.value.trim();
        const jaulaValue = jaulaInput.value;
        const pesoValue = pesoInput.value;

        // valida el nombre: debe tener al menos 2 caracteres y no contener números
        if (nombreValue.length < 2) {
            showError('nombre', 'El nombre debe tener al menos 2 caracteres.');
            isValid = false;
        } else if (/\d/.test(nombreValue)) {
            showError('nombre', 'El nombre no puede contener números.');
            isValid = false;
        }

        // valida la jaula: debe ser un número positivo
        if (!jaulaValue || parseInt(jaulaValue) < 1) {
            showError('jaula', 'El número de jaula es obligatorio y debe ser mayor a 0.');
            isValid = false;
        }

        // valida el peso: debe ser un número positivo
        if (!pesoValue || parseFloat(pesoValue) < 0) {
            showError('peso', 'El peso es obligatorio y no puede ser negativo.');
            isValid = false;
        }
        
        return isValid;
    }

    /**
     * manejador del evento de envío del formulario
     * crea un nuevo animal si los datos son válidos
     */
    form.addEventListener('submit', (event) => {
        event.preventDefault(); // evita que el formulario se envíe de forma tradicional

        // solo procede si los datos son válidos
        if (validateForm()) {
            // genera un nuevo id único para el animal (el máximo actual + 1)
            const newId = zooAnimals.length > 0 ? Math.max(...zooAnimals.map(a => a.IdAnimal)) + 1 : 1;
            
            // crea un nuevo objeto animal con los datos del formulario
            const newAnimal = new CZooAnimal(
                newId, 
                nombreInput.value, 
                jaulaInput.value, 
                document.getElementById('tipo').value, 
                pesoInput.value
            );
            
            // agrega el nuevo animal al array
            zooAnimals.push(newAnimal);
            
            // actualiza la interfaz para mostrar el nuevo animal
            updateDisplay();
            
            // limpia el formulario para permitir una nueva entrada
            form.reset();
        }
    });

    // inicialización de la aplicación
    addInitialData(); // carga los datos iniciales
    updateDisplay(); // actualiza la interfaz por primera vez
});