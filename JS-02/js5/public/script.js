class CZooAnimal {
    constructor(IdAnimal, nombre, JaulaNumero, IdTypeAnimal, peso) {
        this.IdAnimal = IdAnimal;
        this.nombre = nombre;
        this.JaulaNumero = parseInt(JaulaNumero);
        this.IdTypeAnimal = parseInt(IdTypeAnimal);
        this.peso = parseFloat(peso);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    
    const zooAnimals = [];
    const animalTypes = { 1: 'Felino', 2: 'Ave', 3: 'Reptil', 4: 'Otro' };
    
    const form = document.getElementById('animalForm');
    const tableBody = document.getElementById('animalTableBody');
    const resultB = document.getElementById('resultB');
    const resultC = document.getElementById('resultC');
    const resultD = document.getElementById('resultD');

    const nombreInput = document.getElementById('nombre');
    const jaulaInput = document.getElementById('jaula');
    const pesoInput = document.getElementById('peso');

    function addInitialData() {
        const initialData = [
            { id: 1, nombre: 'Simba', jaula: 2, tipo: 1, peso: 150 },
            { id: 2, nombre: 'Kaa', jaula: 4, tipo: 3, peso: 110 },
            { id: 3, nombre: 'Tico', jaula: 5, tipo: 2, peso: 2.5 },
            { id: 4, nombre: 'Rajah', jaula: 3, tipo: 1, peso: 180 },
            { id: 5, nombre: 'Zazú', jaula: 5, tipo: 2, peso: 1.2 },
            { id: 6, nombre: 'Puma', jaula: 5, tipo: 1, peso: 90 },
        ];
        initialData.forEach(d => {
            zooAnimals.push(new CZooAnimal(d.id, d.nombre, d.jaula, d.tipo, d.peso));
        });
    }

    function updateDisplay() {
        updateTable();
        runQueries();
    }

    function updateTable() {
        tableBody.innerHTML = '';
        if (zooAnimals.length === 0) {
            tableBody.innerHTML = `<tr><td colspan="5" class="empty-table">No hay animales registrados.</td></tr>`;
            return;
        }
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

    function runQueries() {
        // b) Animales en Jaula 5 (peso < 3 kg)
        resultB.textContent = zooAnimals.filter(a => a.JaulaNumero === 5 && a.peso < 3).length;
        
        // c) Felinos entre Jaulas 2 y 5
        resultC.textContent = zooAnimals.filter(a => a.IdTypeAnimal === 1 && a.JaulaNumero >= 2 && a.JaulaNumero <= 5).length;
        
        // d) Animal en Jaula 4 (peso < 120 kg) - CORREGIDO
        // Ahora busca todos los animales que coincidan y los muestra en una lista.
        const animalsInCage4 = zooAnimals.filter(a => a.JaulaNumero === 4 && a.peso < 120);
        if (animalsInCage4.length > 0) {
            resultD.textContent = animalsInCage4.map(animal => animal.nombre).join(', ');
        } else {
            resultD.textContent = 'Ninguno';
        }
    }

    function showError(inputId, message) {
        document.getElementById(inputId + 'Error').textContent = message;
    }

    function clearErrors() {
        document.querySelectorAll('.error-message').forEach(el => el.textContent = '');
    }

    function validateForm() {
        clearErrors();
        let isValid = true;
        const nombreValue = nombreInput.value.trim();
        const jaulaValue = jaulaInput.value;
        const pesoValue = pesoInput.value;

        if (nombreValue.length < 2) {
            showError('nombre', 'El nombre debe tener al menos 2 caracteres.');
            isValid = false;
        } else if (/\d/.test(nombreValue)) {
            showError('nombre', 'El nombre no puede contener números.');
            isValid = false;
        }

        if (!jaulaValue || parseInt(jaulaValue) < 1) {
            showError('jaula', 'El número de jaula es obligatorio y debe ser mayor a 0.');
            isValid = false;
        }

        if (!pesoValue || parseFloat(pesoValue) < 0) {
            showError('peso', 'El peso es obligatorio y no puede ser negativo.');
            isValid = false;
        }
        
        return isValid;
    }

    form.addEventListener('submit', (event) => {
        event.preventDefault();

        if (validateForm()) {
            const newId = zooAnimals.length > 0 ? Math.max(...zooAnimals.map(a => a.IdAnimal)) + 1 : 1;
            const newAnimal = new CZooAnimal(newId, nombreInput.value, jaulaInput.value, document.getElementById('tipo').value, pesoInput.value);
            zooAnimals.push(newAnimal);
            
            // Esta función se encarga de actualizar tanto la tabla como las consultas.
            updateDisplay();
            
            form.reset();
        }
    });

    // Carga inicial de datos y visualización
    addInitialData();
    updateDisplay();
});
