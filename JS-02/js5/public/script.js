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
        this.JaulaNumero = parseInt(JaulaNumero);
        this.IdTypeAnimal = parseInt(IdTypeAnimal);
        this.peso = parseFloat(peso);
    }
}

// espera a que el dom esté completamente cargado antes de ejecutar el código
document.addEventListener('DOMContentLoaded', () => {
    
    // array para almacenar todos los animales del zoológico
    const zooAnimals = [];
    
    // diccionario que mapea ids de tipos de animales a sus nombres
    const animalTypes = { 1: 'Felino', 2: 'Ave', 3: 'Reptil', 4: 'Otro' };
    
    // referencias a elementos del dom que se usarán frecuentemente
    const form = document.getElementById('animalForm');
    const generateReportBtn = document.getElementById('generateReportBtn');

    // referencias a los campos de entrada del formulario
    const nombreInput = document.getElementById('nombre');
    const jaulaInput = document.getElementById('jaula');
    const pesoInput = document.getElementById('peso');
    const tipoInput = document.getElementById('tipo');

    /**
     * agrega datos iniciales de animales al sistema
     */
    function addInitialData() {
        const initialData = [
            { id: 1, nombre: 'Simba', jaula: 2, tipo: 1, peso: 150 },
            { id: 2, nombre: 'Kaa', jaula: 4, tipo: 3, peso: 110 },
            { id: 3, nombre: 'Tico', jaula: 5, tipo: 2, peso: 2.5 },
            { id: 4, nombre: 'Rajah', jaula: 3, tipo: 1, peso: 180 },
            { id: 5, nombre: 'Zazú', jaula: 5, tipo: 2, peso: 1.2 },
        ];
        initialData.forEach(d => {
            zooAnimals.push(new CZooAnimal(d.id, d.nombre, d.jaula, d.tipo, d.peso));
        });
    }
    
    /**
     * genera un reporte completo en una nueva pestaña usando document.write.
     */
    function generateReport() {
        // b) mostrar la cantidad de animales de la Jaula 5 que el peso sea menor a 3 kg.
        const resultB = zooAnimals.filter(a => a.JaulaNumero === 5 && a.peso < 3).length;
        
        // c) listar cantidad de animales de tipo felinos que están entre las jaulas 2 a 5.
        const resultC = zooAnimals.filter(a => a.IdTypeAnimal === 1 && a.JaulaNumero >= 2 && a.JaulaNumero <= 5).length;
        
        // d) listar el nombre del animal de la Jaula 4 que el peso sea menor a 120.
        const animalsD = zooAnimals.filter(a => a.JaulaNumero === 4 && a.peso < 120);
        const resultD = animalsD.length > 0 ? animalsD.map(a => a.nombre).join(', ') : 'Ninguno';

        let reportHTML = `
            <!DOCTYPE html><html lang="es"><head><meta charset="UTF-8">
            <title>Reporte del Zoológico</title>
            <link rel="stylesheet" href="styles.css">
            </head><body><div class="container"><header><h1>Reporte de Animales</h1></header>
            <main><section class="card"><h2>Consultas Específicas</h2>
            <p><strong>b) Cantidad en Jaula 5 con peso &lt; 3 kg:</strong> ${resultB}</p>
            <p><strong>c) Cantidad de felinos entre Jaulas 2-5:</strong> ${resultC}</p>
            <p><strong>d) Nombre de animal en Jaula 4 con peso &lt; 120kg:</strong> ${resultD}</p>
            </section><section class="card"><h2>Tabla de Animales</h2>
            <table class="report-table">
            <thead><tr><th>ID</th><th>Nombre</th><th>Jaula N°</th><th>Tipo</th><th>Peso (kg)</th></tr></thead>
            <tbody>`;

        zooAnimals.forEach(animal => {
            reportHTML += `<tr><td>${animal.IdAnimal}</td><td>${animal.nombre}</td><td>${animal.JaulaNumero}</td><td>${animalTypes[animal.IdTypeAnimal]}</td><td>${animal.peso}</td></tr>`;
        });
        
        reportHTML += `</tbody></table></section></main></div></body></html>`;

        // se abre una nueva pestaña
        const reportWindow = window.open();
        // se escribe el contenido en el documento de la nueva pestaña
        reportWindow.document.open();
        reportWindow.document.write(reportHTML); //USO DOCUMENT WRITE :D :D :D :D :D :D
        reportWindow.document.close();
    }
    
    function showError(inputId, message) {
        document.getElementById(inputId + 'Error').textContent = message;
    }

    function clearErrors() {
        document.querySelectorAll('.error-message').forEach(el => el.textContent = '');
    }

    function validateForm() { //verificaciones
        clearErrors();
        let isValid = true; 
        const nombreValue = nombreInput.value.trim();
        if (nombreValue.length < 2) {
            showError('nombre', 'El nombre debe tener al menos 2 caracteres.');
            isValid = false;
        } else if (/\d/.test(nombreValue)) {
            showError('nombre', 'El nombre no puede contener números.');
            isValid = false;
        }
        if (!jaulaInput.value || parseInt(jaulaInput.value) < 1) {
            showError('jaula', 'El número de jaula es obligatorio y debe ser mayor a 0.');
            isValid = false;
        }
        if (!pesoInput.value || parseFloat(pesoInput.value) < 0) {
            showError('peso', 'El peso es obligatorio y no puede ser negativo.');
            isValid = false;
        }
        return isValid;
    }

    form.addEventListener('submit', (event) => { //para avisar que se agrego el animal
        event.preventDefault();
        if (validateForm()) {
            const newId = zooAnimals.length > 0 ? Math.max(...zooAnimals.map(a => a.IdAnimal)) + 1 : 1;
            const newAnimal = new CZooAnimal(newId, nombreInput.value, jaulaInput.value, tipoInput.value, pesoInput.value);
            zooAnimals.push(newAnimal);
            
            alert('Animal agregado con éxito. Presiona "Mostrar Reporte" para ver la lista actualizada.'); 
            
            form.reset();
            nombreInput.focus();
        }
    });

    if (generateReportBtn) {
        generateReportBtn.addEventListener('click', generateReport);
    }

    addInitialData();
});
