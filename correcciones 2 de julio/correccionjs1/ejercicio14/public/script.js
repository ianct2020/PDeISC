// public/script.js

// esperamos a que se cargue toda la página antes de empezar a hacer cosas
document.addEventListener('DOMContentLoaded', () => {
    // agarramos el coso de las alertas para mostrar mensajes
    const alertContainer = document.getElementById('alert-container');
    // esta es la función que arma y muestra las alertas en pantalla
    const showAlert = (message, type = 'error') => {
        // le ponemos el texto que queremos mostrar
        alertContainer.textContent = message;
        // le cambiamos el estilo para que se vea de error o de éxito
        alertContainer.className = `alert alert-${type}`;
        // después de 4 segundos, hacemos que la alerta desaparezca sola
        setTimeout(() => {
            alertContainer.className = 'alert';
        }, 4000);
    };

    // la función principal que manda los datos al servidor para que los invierta
    const processData = async (dataArray, resultsContainer, joiner = ', ') => {
        try {
            // acá hacemos la llamada al servidor, le mandamos el array
            const response = await fetch('/reverse-data', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ data: dataArray }),
            });
            // si hay algún problema con la respuesta del servidor, cortamos todo
            if (!response.ok) throw new Error(`error del servidor`);
            // esperamos la respuesta del servidor y la convertimos en algo que podamos usar
            const result = await response.json();
            
            // un titulito para la consola del navegador, para no perdernos
            console.log('--- resultado en navegador ---');
            console.log('original:', result.originalData);
            console.log('invertido:', result.reversedData);

            // llamamos a la función que va a mostrar el resultado en la página
            displayFinalResult(result.originalData, result.reversedData, resultsContainer, joiner);
        } catch (error) {
            console.error('error en fetch:', error);
            showAlert('hubo un problema de conexión con el servidor');
        }
    };

    // esta función crea el html para mostrar el antes y el después
    const displayFinalResult = (original, reversed, container, joiner) => {
        const resultDiv = document.createElement('div');
        resultDiv.className = 'result-item';
        // armamos el html con el dato original y el que nos devolvió el servidor ya invertido
        resultDiv.innerHTML = `
            <p><strong>original:</strong> ${original.join(joiner)}</p>
            <p><strong>invertido:</strong> ${reversed.join(joiner)}</p>
        `;
        // metemos el resultado nuevo arriba de todo en la lista de resultados
        container.prepend(resultDiv);
    };

    const setupListSection = (formId, inputId, pendingListId, resultsId, validation) => {
        const form = document.getElementById(formId);
        const input = document.getElementById(inputId);
        const pendingList = document.getElementById(pendingListId);
        const resultsContainer = document.getElementById(resultsId);
        // un array vacío para ir guardando los items que el usuario va metiendo
        let items = [];

        // nos quedamos escuchando a ver si el usuario aprieta una tecla en el input
        input.addEventListener('keydown', (e) => {
            // si la tecla que apretó es 'enter', hacemos toda la movida
            if (e.key === 'Enter') {
                // frenamos el comportamiento normal del enter para que no se envíe el formulario
                e.preventDefault();
                // agarramos lo que escribió el usuario y le sacamos los espacios de los costados
                const value = input.value.trim();
                // nos fijamos si lo que escribió es válido, según las reglas que le pasamos
                if (validation.validate(value)) {
                    // si está todo ok, lo metemos en nuestro array de items
                    items.push(value);
                    // creamos un elemento de lista para mostrarlo en pantalla
                    const li = document.createElement('li');
                    li.textContent = value;
                    // lo agregamos a la lista visible para que el usuario lo vea
                    pendingList.appendChild(li);
                    // limpiamos el campo de texto para que pueda escribir otra cosa
                    input.value = '';
                } else {
                    showAlert(validation.errorMessage);
                }
            }
        });

        // ahora listeneamos cuando aprieta el botón de enviar el formulario
        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            // chequeamos si metió la cantidad mínima de items que le pedimos
            if (items.length < validation.minItems) {
                showAlert(`debes agregar al menos ${validation.minItems} ítems a la lista`);
                return;
            }
            // si está todo bien, llamamos a la función que manda todo al servidor
            await processData(items, resultsContainer, ', ');
            // vaciamos nuestro array de items para que pueda empezar de nuevo
            items = [];
            // borramos la lista visible de la pantalla
            pendingList.innerHTML = '';
        });
    };

    // acá configuramos la sección de letras con sus reglas
    setupListSection('letters-form', 'letters-input', 'letters-pending-list', 'letters-results', {
        validate: (value) => /^[a-zA-Z]$/.test(value) && value.length === 1,
        errorMessage: 'entrada inválida, ingresa una única letra (a-z)',
        minItems: 3
    });

    // y acá la de números, cada una con lo suyo
    setupListSection('numbers-form', 'numbers-input', 'numbers-pending-list', 'numbers-results', {
        validate: (value) => /^-?\d*\.?\d+$/.test(value) && !isNaN(parseFloat(value)),
        errorMessage: 'entrada inválida, ingresa un número válido',
        minItems: 2
    });

    // para la parte del texto, agarramos el formulario por separado
    const stringForm = document.getElementById('string-form');
    const stringInput = document.getElementById('string-input');
    const stringResults = document.getElementById('string-results');

    // escuchamos el envío del formulario del texto
    stringForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        // agarramos el texto que escribió
        const value = stringInput.value;

        // si no escribió nada, le tiramos una alerta
        if (!value) {
            showAlert('por favor, ingresa un texto para invertir');
            return;
        }

        // 1 lo cortamos en pedacitos, letra por letra, y lo hacemos un array
        const stringAsArray = value.split('');

        // 2 mandamos el array de letras al servidor y le decimos que al juntarlo no ponga comas
        await processData(stringAsArray, stringResults, '');
        
        // 3 limpiamos el campo de texto
        stringInput.value = '';
    });
});