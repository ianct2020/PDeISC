// script.js (con comentarios)

document.addeventlistener('domcontentloaded', () => {

    // agarramos los elementos del html para manipularlos después.
    const alertdiv = document.getelementbyid('custom-alert');
    const alertmessage = document.getelementbyid('alert-message');
    let alerttimeout; // una variable para controlar el tiempo que se muestra la alerta.

    // esta es la función que muestra las alertas. le pasas el mensaje y si es de error o no.
    const showalert = (message, iserror = true) => {
        cleartimeout(alerttimeout); // si había otra alerta, la limpiamos.
        alertmessage.textcontent = message; // ponemos el mensaje.
        alertdiv.classname = 'alert'; // reseteamos las clases css.
        alertdiv.classlist.add(iserror ? 'error' : 'success', 'show'); // le ponemos la clase de error/éxito y la clase 'show' para que aparezca.
        // después de 3 segundos, la alerta se va sola.
        alerttimeout = settimeout(() => alertdiv.classlist.remove('show'), 3000);
    };

    // --- acá guardamos los datos que el usuario va metiendo en cada lista ---
    let doglist = [];
    let numberlist = [];
    let citylist = [];

    /**
     * esta es la función principal que arma toda la lógica de una de las tarjetas (la de perro, la de 50, etc.).
     * la hacemos reutilizable para no escribir el mismo código tres veces.
     * le pasamos como un gran objeto todos los elementos y datos que necesita.
     */
    function setupinteractivelist({ form, input, addbutton, listelement, resultarray, datastore, validationregex, type, taskname }) { 
        
        // --- lógica para añadir un ítem a la lista ---
        const additem = () => {
            let value = input.value.trim(); // agarramos el valor del input y le sacamos espacios extra.
            if (!value) return; // si está vacío, no hacemos nada.

            // validamos que el formato sea correcto (letras o números, según corresponda).
            if (validationregex && !validationregex.test(value)) {
                const expected = type === 'number' ? 'un número válido' : 'una palabra válida';
                showalert(`por favor, ingresa ${expected}.`, true);
                return;
            }
            // si es un número, lo convertimos a tipo number.
            if (type === 'number') value = number(value);

            datastore.push(value); // metemos el valor en el array que le corresponde (ej: doglist).
            renderlist(); // llamamos a la función para que actualice la lista en pantalla.
            input.value = ''; // limpiamos el campo de texto.
            input.focus(); // dejamos listo para el próximo ítem.
        };
        
        // --- lógica para mostrar la lista en el html ---
        const renderlist = () => {
            listelement.innerhtml = ''; // vaciamos la lista visual para dibujarla de nuevo.
            // por cada ítem en nuestro array de datos...
            datastore.foreach((item, index) => {
                const li = document.createelement('li'); // ...creamos un elemento <li>.
                li.classname = 'list-item'; // le ponemos su clase css.
                li.textcontent = item; // le ponemos el texto.
                
                // creamos el botoncito con la 'x' para borrar.
                const removebtn = document.createelement('button');
                removebtn.classname = 'remove-btn';
                removebtn.innerhtml = '&times;'; // este es el código html para el símbolo '×'.
                // le decimos qué hacer cuando le hagan clic: llamar a la función de borrar pasándole su propio índice.
                removebtn.onclick = () => removeitem(index);
                
                li.appendchild(removebtn); // metemos el botón de borrar adentro del <li>.
                listelement.appendchild(li); // y metemos el <li> en la lista <ul>.
            });
        };

        const removeitem = (indextoremove) => {
            datastore.splice(indextoremove, 1); // usamos splice para sacar el elemento del array de datos.
            renderlist(); // volvemos a hacer la lista ya actualizada.
        };

        addbutton.addeventlistener('click', additem); // si hacen clic en el botón "añadir".
        input.addeventlistener('keydown', (e) => { // si presionan una tecla en el input.
            if (e.key === 'enter') { // si esa tecla es "enter"...
                e.preventdefault(); // ...frenamos la acción por defecto (que sería enviar el formulario)...
                additem(); // ...y llamamos a nuestra función para añadir el ítem.
            }
        });

        // --- "escuchador" de evento para procesar la lista final (cuando se envía el formulario) ---
        form.addeventlistener('submit', async (e) => {
            e.preventdefault(); //  evitamos que la página se recargue.
            // si la lista está vacía, avisamos y no hacemos nada.
            if (datastore.length === 0) {
                showalert('la lista está vacía. añade al menos un elemento.', true);
                return;
            }

            const task = taskname; // agarramos el nombre de la tarea que le pasamos.
            
            // mostramos un mensaje de "procesando" y logueamos en la consola del navegador lo que vamos a mandar.
            resultarray.textcontent = `lista enviada: [${datastore.join(', ')}] \nprocesando...`;
            console.log(`[frontend] enviando al servidor:`, { dataarray: datastore, task: task });

            // acá usamos fetch para mandar los datos al servidor. es una promesa, por eso el async/await.
            try {
                const response = await fetch('/guardar', {
                    method: 'post', // le decimos que es una petición post.
                    headers: { 'content-type': 'application/json' }, // le avisamos que le estamos mandando json.
                    body: json.stringify({ dataarray: datastore, task: task }) // convertimos nuestro objeto de js a un string de json.
                });

                if (!response.ok) throw new error(`error del servidor: ${response.statustext}`);

                const result = await response.json(); // convertimos la respuesta del servidor (que es json) a un objeto de js.
                // mostramos la respuesta en la consola del navegador y en la pantalla.
                console.log('[frontend] respuesta del servidor:', result);
                resultarray.textcontent = `lista enviada: [${datastore.join(', ')}] \nresultado: ${result.message}`;

            } catch (error) {
                // si algo sale mal en la comunicación, lo mostramos en la consola y con una alerta.
                console.error('[frontend] error en la petición fetch:', error);
                showalert('no se pudo contactar al servidor. inténtalo de nuevo.', true);
                resultarray.textcontent = 'error al procesar la solicitud.';
            }
        });
    }

    // --- acá es donde llamamos a la función principal para configurar cada una de las tres tarjetas ---
    // le pasamos todos los elementos del dom, el array donde guardar los datos, las reglas de validación y el nombre de la tarea.

    //      configuración para la lista de "perro".
    setupinteractivelist({
        form: document.getelementbyid('form-dog'),
        input: document.getelementbyid('input-dog'),
        addbutton: document.getelementbyid('add-dog-btn'),
        listelement: document.getelementbyid('list-dog'),
        resultarray: document.getelementbyid('result-dog'),
        datastore: doglist,
        validationregex: /^[a-záéíóúñ]+$/i, // solo permite letras. la 'i' al final la hace insensible a mayúsculas.
        type: 'string',
        taskname: 'finddog'
    });

    // configuración para la lista de números.
    setupinteractivelist({
        form: document.getelementbyid('form-50'),
        input: document.getelementbyid('input-50'),
        addbutton: document.getelementbyid('add-50-btn'),
        listelement: document.getelementbyid('list-50'),
        resultarray: document.getelementbyid('result-50'),
        datastore: numberlist,
        validationregex: /^-?\d+$/, // regex que solo permite números enteros (positivos o negativos).
        type: 'number',
        taskname: 'find50'
    });

    // 3. configuración para la lista de ciudades.
    setupinteractivelist({
        form: document.getelementbyid('form-madrid'),
        input: document.getelementbyid('input-madrid'),
        addbutton: document.getelementbyid('add-madrid-btn'),
        listelement: document.getelementbyid('list-madrid'),
        resultarray: document.getelementbyid('result-madrid'),
        datastore: citylist,
        validationregex: /^[a-záéíóúñ\s]+$/i, // regex que permite letras y espacios.
        type: 'string',
        taskname: 'findmadrid'
    });
});