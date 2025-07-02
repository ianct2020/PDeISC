
// aca listeneamos a que se cargue toda la pagina antes de hacer nada, por las dudas
document.addEventListener('DOMContentLoaded', () => {

    // agarramos todos los elementos del html que vamos a necesitar manipular
    const form = document.getElementById('decode-form');
    const encodedTextInput = document.getElementById('encoded-text');
    const inputPreview = document.getElementById('input-preview');
    const resultDisplay = document.getElementById('decoded-result');
    const customAlert = document.getElementById('custom-alert');
    const alertMessage = document.getElementById('alert-message');

    // esta es la funcion para mostrar esa alerta fachera que armamos
    function showAlert(message) {
        alertMessage.textContent = message;
        customAlert.classList.add('show');
        
        // y despues de 3 segundos la hacemos desaparecer para que no joda
        setTimeout(() => {
            customAlert.classList.remove('show');
        }, 3000);
    }

    // aca listeneamos lo que el usuario escribe para mostrarlo en la vista previa al toque
    encodedTextInput.addEventListener('input', () => {
        const currentText = encodedTextInput.value;
        if (currentText.trim() === '') {
            inputPreview.textContent = '-';
        } else {
            inputPreview.textContent = currentText;
        }
    });

    // aca nos quedamos listeneando cuando el vago le da al boton de decodificar
    form.addEventListener('submit', async (event) => {
        // frenamos el formulario para que no recargue la pagina, clave
        event.preventDefault();

        // sacamos el texto que escribio el chabon en el cuadro grande
        const textoACodificar = encodedTextInput.value;

        // nos fijamos aca nomas si escribio algo, para no molestar al servidor al cuete
        if (textoACodificar.trim() === '') {
            showAlert('por favor, ingresa un mensaje para decodificar');
            return; // cortamos todo aca
        }

        // mostramos en la consola del navegador lo que vamos a mandar
        console.log('enviando al backend:', textoACodificar);

        try {
            // y aca viene el fetch, con esto le mandamos la data al servidor por post
            const response = await fetch('/decodificar', {
                method: 'POST',
                headers: {
                    // le avisamos que le estamos mandando un json
                    'Content-Type': 'application/json',
                },
                // y en el cuerpo del aparato va el texto que queremos decodificar
                body: JSON.stringify({ texto: textoACodificar }),
            });

            // guardamos la respuesta del servidor en esta variable
            const data = await response.json();

            // nos fijamos si el servidor nos dijo que salio todo bien o si hubo bardo
            if (!response.ok) {
                // si hubo bardo, mostramos el error que nos mando el mismo servidor
                console.error('error del servidor:', data.error);
                showAlert(data.error);
                return;
            }

            // si salio todo joya, mostramos el resultado en la pagina y en la consola del navegador
            console.log('respuesta recibida del backend:', data);
            
            // actualizamos el parrafo del resultado en el html
            resultDisplay.textContent = data.resultado;
            
        } catch (error) {
            // por si se cae internet o el servidor no responde, atajamos el error aca
            console.error('error de red o al contactar el servidor:', error);
            showAlert('no se pudo conectar con el servidor, proba de nuevo mas tarde');
        }
    });
});