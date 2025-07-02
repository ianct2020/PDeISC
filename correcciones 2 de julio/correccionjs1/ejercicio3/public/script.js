// nos aseguramos de que todo el html esté cargado antes de empezar .
document.addeventlistener('domcontentloaded', () => {

    // agarramos todos los elementos del html con los que vamos a laburar y los guardamos en variables.
    // así es más fácil y rápido usarlos después.
    const formcolores = document.getelementbyid('form-colores');
    const inputcolor = document.getelementbyid('input-color');
    const listacolores = document.getelementbyid('lista-colores');

    const formtareas = document.getelementbyid('form-tareas');
    const inputtarea = document.getelementbyid('input-tarea');
    const listatareas = document.getelementbyid('lista-tareas');

    const formusuarios = document.getelementbyid('form-usuarios');
    const inputusuario = document.getelementbyid('input-usuario');
    const listausuarios = document.getelementbyid('lista-usuarios');
    
    const customalert = document.getelementbyid('custom-alert');

    // --- función para mostrar alertas personalizadas ---
    // función para mostrar alertas, más cheta que la del navegador.
    const showalert = (message) => {
        customalert.textcontent = message;
        customalert.classlist.add('show');
        // le damos 3 segundos de fama a la alerta y después la escondemos.
        settimeout(() => {
            customalert.classlist.remove('show');
        }, 3000);
    };

    // una función para dibujar la lista en la pantalla. la usamos para no repetir código.
    const renderlist = (listelement, items, placeholdertext) => {
        // primero, borramos todo lo que había antes para poner la lista nueva y limpita.
        listelement.innerhtml = '';
        if (items.length === 0) {
            // si no hay nada en la lista, ponemos un mensaje de onda.
            listelement.innerhtml = `<li class="placeholder">${placeholdertext}</li>`;
        } else {
            // si hay cosas, recorremos el array y creamos un 'li' por cada una.
            items.foreach(item => {
                const li = document.createelement('li');
                li.textcontent = item;
                listelement.appendchild(li);
            });
        }
    };
    
    // esta es la función principal del cliente.
    // es 'async' porque adentro usamos 'await' para esperar la respuesta del fetch.
    const handleformsubmit = async (event, inputelement, type, validationfn, listelement, placeholder) => {
        // fundamental, frena el envío del formulario para que no se recargue la página.
        event.preventdefault();

        const value = inputelement.value.trim();

        // primero validamos acá, en el navegador, para no mandar cualquier cosa al servidor.
        const validationresult = validationfn(value);
        if (!validationresult.isvalid) {
            showalert(validationresult.message);
            return; // si no es válido, mostramos la alerta y no hacemos más nada.
        }

        try {
            // 2. usamos fetch() para enviar los datos al servidor.
            // acá usamos fetch para mandarle los datos al backend, como si fuera un delivery.
            const response = await fetch('/guardar', {
                method: 'post', // le decimos que es una petición post.
                headers: {
                    'content-type': 'application/json', // le avisamos que le estamos mandando un json.
                },
                body: json.stringify({ type, value }), // convertimos nuestro objeto a un string de json.
            });

            // esperamos la respuesta del servidor y la convertimos a un objeto javascript.
            const result = await response.json();
            
            // un log en la consola del navegador para ver qué nos devolvió el servidor.
            console.log(`[cliente] respuesta del servidor para '${type}':`, result);

            if (result.success) {
                // si el server nos da el ok, dibujamos la lista actualizada que nos mandó.
                renderlist(listelement, result.data, placeholder);
                inputelement.value = ''; // limpiamos el input para que se pueda escribir de nuevo.
            } else {
                // si el server dice que algo falló, mostramos el error.
                showalert(result.message || 'ocurrió un error en el servidor.');
            }

        } catch (error) {
            // si hay un error de conexión (ej: el server está caído), lo agarramos acá.
            console.error('[cliente] error en fetch:', error);
            showalert('no se pudo conectar con el servidor.');
        }
    };

    // acá ponemos las reglas para cada tipo de dato.
    const validatecolor = (value) => {
        if (!value) return { isvalid: false, message: 'el campo de color no puede estar vacío.' };
        if (!/^[a-z\s]+$/i.test(value)) { // regex que solo permite letras y espacios.
            return { isvalid: false, message: 'el color solo puede contener letras y espacios.' };
        }
        return { isvalid: true };
    };

    const validatetask = (value) => {
        if (!value) return { isvalid: false, message: 'la tarea no puede estar vacía.' };
        return { isvalid: true }; // para las tareas, solo nos importa que no esté vacío.
    };

    const validateuser = (value) => {
        if (!value) return { isvalid: false, message: 'el nombre de usuario no puede estar vacío.' };
        // un regex un poco más complejo para un nombre de usuario típico.
        if (!/^[a-z0-9_]{3,16}$/i.test(value)) {
            return { isvalid: false, message: 'usuario no válido. usa letras, números o guiones bajos (3-16 caracteres).' };
        }
        return { isvalid: true };
    };
    // y finalmente, acá le decimos a cada formulario que cuando alguien lo envíe ('submit'),
    // llame a nuestra función grosa 'handleformsubmit' con los parámetros correctos para cada caso.
    formcolores.addeventlistener('submit', (e) => 
        handleformsubmit(e, inputcolor, 'color', validatecolor, listacolores, 'aún no hay colores...')
    );

    formtareas.addeventlistener('submit', (e) => 
        handleformsubmit(e, inputtarea, 'tarea', validatetask, listatareas, 'aún no hay tareas...')
    );

    formusuarios.addeventlistener('submit', (e) => 
        handleformsubmit(e, inputusuario, 'usuario', validateuser, listausuarios, 'aún no hay usuarios...')
    );
});