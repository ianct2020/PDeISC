// public/script.js

// nos aseguramos de que todo el html se haya cargado antes de ejecutar el javascript.
document.addEventListener('DOMContentLoaded', () => {

    // acá agarramos todos los elementos del html con los que vamos a laburar.
    // los guardamos en constantes para usarlos más fácil después.
    const formWords = document.getElementById('form-words');
    const inputWord = document.getElementById('input-word');
    const wordsList = document.getElementById('words-list');
    const resultAdmin = document.getElementById('result-admin');

    const formColors = document.getElementById('form-colors');
    const inputColor = document.getElementById('input-color');
    const colorsList = document.getElementById('colors-list');
    const resultGreen = document.getElementById('result-green');

    const formNumbers = document.getElementById('form-numbers');
    const inputNumber = document.getElementById('input-number');
    const numbersList = document.getElementById('numbers-list');
    const resultNumberMessage = document.getElementById('result-number-message');

    const alertBox = document.getElementById('alert-custom');
    const alertMessage = document.getElementById('alert-message');

    // esta función "dibuja" la lista de ítems en la pantalla.
    const renderList = (element, array) => {
        // primero borramos lo que había antes para no duplicar.
        element.innerHTML = '';
        // recorremos el array y por cada ítem creamos un 'span' y lo metemos en el html.
        array.forEach(item => {
            const span = document.createElement('span');
            span.textContent = item;
            element.appendChild(span);
        });
    };

    // esta es la función para mostrar nuestra alerta personalizada.
    const showAlert = (message) => {
        alertMessage.textContent = message; // le ponemos el mensaje que queremos mostrar.
        alertBox.classList.remove('alert-hidden'); // le sacamos la clase que la oculta para que se vea.
        // después de 3 segundos, la volvemos a ocultar.
        setTimeout(() => {
            alertBox.classList.add('alert-hidden');
        }, 3000);
    };

    // --- función  para manejar el envío de formularios ---
    // esta es la función principal, se va a ejecutar cuando apretamos cualquier botón de "agregar".
    const handleFormSubmit = async (e, type, inputElement) => {
        // evitamos que la página se recargue, que es el comportamiento por defecto de un form.
        e.preventDefault();
        // agarramos el valor del input y le sacamos los espacios de los costados.
        const value = inputElement.value.trim();

        // --- validación ---
        // nos fijamos si el campo está vacío.
        if (!value) {
            showAlert('por favor, completá el campo antes de enviar.');
            return; // cortamos la ejecución de la función acá.
        }

        // si el tipo es 'number', chequeamos que sea un número de verdad.
        if (type === 'number') {
            if (isNaN(value)) {
                showAlert('por favor, ingresá solo números.');
                return;
            }
        } else {
            // para texto, usamos una expresión regular para permitir solo letras y espacios.
            if (!/^[a-zA-Z\s]+$/.test(value)) {
                showAlert('por favor, ingresá solo letras.');
                return;
            }
        }
        
        // armamos el objeto que le vamos a mandar al servidor.
        const dataToSend = { type: type, data: value.toLowerCase() };

        try {
            // mostramos en la consola del navegador lo que estamos por mandar.
            console.log(`[cliente] enviando al servidor:`, dataToSend);
            // acá está el fetch. hace el pedido post a la ruta '/guardar'.
            const response = await fetch('/guardar', {
                method: 'POST', // el método tiene que ser post.
                headers: { 'Content-Type': 'application/json' }, // le avisamos que le mandamos json.
                body: JSON.stringify(dataToSend) // convertimos nuestro objeto a un string de json.
            });

            // si la respuesta del servidor no es un 'ok' (ej: error 404 o 500), tiramos un error.
            if (!response.ok) {
                throw new Error(`error del servidor: ${response.statusText}`);
            }

            // si todo bien, convertimos la respuesta del servidor (que es json) a un objeto javascript.
            const result = await response.json();
            console.log(`[cliente] respuesta del servidor:`, result);

            // --- actualizar ui según el tipo ---
            // ahora actualizamos la pantalla con la data que nos devolvió el servidor.
            if (type === 'word') {
                renderList(wordsList, result.currentArray);
                resultAdmin.textContent = result.hasAdmin ? 'sí' : 'no';
                resultAdmin.className = result.hasAdmin ? 'yes' : '';
            } else if (type === 'color') {
                renderList(colorsList, result.currentArray);
                resultGreen.textContent = result.hasGreen ? 'sí' : 'no';
                resultGreen.className = result.hasGreen ? 'yes' : '';
            } else if (type === 'number') {
                renderList(numbersList, result.currentArray);
                resultNumberMessage.textContent = result.message;
            }

            // vaciamos el campo del input para que el usuario pueda escribir otra cosa.
            inputElement.value = '';

        } catch (error) {
            // si algo falla en el fetch (ej: se cayó el servidor), lo mostramos en la consola.
            console.error('[cliente] error en fetch:', error);
            showAlert('no se pudo conectar con el servidor. intentá de nuevo.');
        }
    };
    
    // --- event listeners ---
    // acá le decimos a cada formulario que, cuando se envíe (al apretar el botón),
    // ejecute nuestra función handleFormSubmit con los parámetros correctos.
    formWords.addEventListener('submit', (e) => handleFormSubmit(e, 'word', inputWord));
    formColors.addEventListener('submit', (e) => handleFormSubmit(e, 'color', inputColor));
    formNumbers.addEventListener('submit', (e) => handleFormSubmit(e, 'number', inputNumber));

});