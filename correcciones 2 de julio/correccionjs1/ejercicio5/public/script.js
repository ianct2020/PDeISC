// public/script.js

// nos aseguramos de que todo el html se haya cargado antes de ejecutar el script.
document.addEventListener('domcontentloaded', () => {
    // este es nuestro array principal, arranca vacío y lo vamos llenando con lo que ponga el usuario.
    let letrasarray = [];

    // acá guardamos en variables los elementos del html con los que vamos a laburar.
    const arraydisplay = document.getelementbyid('arraydisplay');
    const customalert = document.getelementbyid('custom-alert');

    // formularios
    const formagregarletra = document.getelementbyid('formagregarletra');
    const formeliminar = document.getelementbyid('formeliminar');
    const forminsertar = document.getelementbyid('forminsertar');
    const formreemplazar = document.getelementbyid('formreemplazar');

    // inputs (los campos donde el usuario escribe)
    const inputletra = document.getelementbyid('inputletra');
    const inputinsertar = document.getelementbyid('inputinsertar');
    const inputreemplazarposicion = document.getelementbyid('inputreemplazarposicion');
    const inputreemplazarnuevo1 = document.getelementbyid('inputreemplazarnuevo1');
    const inputreemplazarnuevo2 = document.getelementbyid('inputreemplazarnuevo2');
    

    /**
     * actualiza la visualización del array en la pantalla.
     * la llamamos cada vez que el array cambia para que el usuario vea el resultado.
     */
    const actualizarvista = () => {
        if (letrasarray.length === 0) {
            arraydisplay.textcontent = '[ el array está vacío. agregá algunas letras. ]';
        } else {
            // mostramos el array formateado, con comillas y comas.
            arraydisplay.textcontent = `[ "${letrasarray.join('", "')}" ]`;
        }
        // también lo mostramos en la consola del navegador para ir viendo cómo queda.
        console.log('estado actual del array:', letrasarray);
    };

    /**
     * muestra una alerta personalizada.
     * @param {string} message - el mensaje a mostrar.
     * @param {string} type - el tipo de alerta ('error' o 'success').
     */
    const mostraralerta = (message, type = 'error') => {
        customalert.textcontent = message;
        // le cambiamos la clase para que el css le ponga el color correcto (rojo para error, verde para éxito).
        customalert.classname = `custom-alert ${type}`;
        customalert.classlist.add('show');
        // después de 3 segundos, la hacemos desaparecer.
        settimeout(() => {
            customalert.classlist.remove('show');
        }, 3000);
    };

    /**
     * envía los datos al backend usando fetch.
     * @param {object} datos - los datos a enviar en formato json.
     */
    const enviardatosalbackend = async (datos) => {
        try {
            // usamos fetch para hacer un pedido post a nuestro servidor.
            const response = await fetch('/guardar', {
                method: 'post',
                headers: {
                    'content-type': 'application/json',
                },
                // convertimos nuestro objeto de javascript a un string en formato json.
                body: json.stringify(datos),
            });
            const result = await response.json();
            // mostramos la respuesta del servidor en la consola del navegador.
            console.log('respuesta del servidor:', result.message);
        } catch (error) {
            console.error('error al enviar datos al backend:', error);
            mostraralerta('no se pudo conectar con el servidor.', 'error');
        }
    };
    
    /**
     * valida que una cadena contenga solo letras.
     * usamos una expresión regular (regex) para chequear esto.
     * @param {string} str - la cadena a validar.
     * @returns {boolean}
     */
    const essololetras = (str) => /^[a-za-z]+$/.test(str);


    // acá es donde respondemos a las acciones del usuario (clicks, enviar formularios).

    formagregarletra.addeventlistener('submit', (e) => {
        e.preventdefault(); // evitamos que la página se recargue al enviar el formulario.
        const nuevaletra = inputletra.value.trim(); // agarramos el valor del input y le sacamos espacios extra.

        // validaciones básicas antes de agregar.
        if (!nuevaletra) {
            mostraralerta('el campo no puede estar vacío.');
            return;
        }
        if (!essololetras(nuevaletra)) {
            mostraralerta('por favor, ingresá solo letras, sin números ni espacios.');
            return;
        }

        // si pasa las validaciones, lo agregamos al array.
        letrasarray.push(nuevaletra);
        actualizarvista();
        enviardatosalbackend({
            accion: 'agregar elemento',
            elemento: nuevaletra,
            arrayactual: letrasarray
        });
        inputletra.value = ''; // limpiamos el campo de texto.
        inputletra.focus(); // dejamos listo para escribir de nuevo.
    });

    // eliminar dos elementos desde la posición 1
    formeliminar.addeventlistener('submit', (e) => {
        e.preventdefault();
        // chequeamos si podemos. necesitamos al menos 3 elementos.
        if (letrasarray.length < 3) {
            mostraralerta('necesitás al menos 3 elementos en el array para eliminar desde la posición 1.');
            return;
        }

        // splice(índice_de_inicio, cantidad_a_eliminar).
        const elementoseliminados = letrasarray.splice(1, 2);
        
        console.log('elementos eliminados:', elementoseliminados);
        mostraralerta(`se eliminaron los elementos: "${elementoseliminados.join('", "')}"`, 'success');
        actualizarvista();
        enviardatosalbackend({
            accion: 'splice - eliminar',
            posicion: 1,
            cantidad: 2,
            eliminados: elementoseliminados,
            arrayresultante: letrasarray
        });
    });

    //insertar un nuevo nombre en la segunda posición (índice 1)
    forminsertar.addeventlistener('submit', (e) => {
        e.preventdefault();
        const nuevonombre = inputinsertar.value.trim();

        // validaciones.
        if (letrasarray.length < 1) {
            mostraralerta('necesitás al menos 1 elemento para poder insertar en la segunda posición.');
            return;
        }
        if (!nuevonombre) {
            mostraralerta('debes ingresar un nombre para insertar.');
            return;
        }
        if (!essololetras(nuevonombre)) {
            mostraralerta('el nombre solo debe contener letras.');
            return;
        }

        // splice para insertar: splice(inicio, 0_para_no_borrar_nada, elemento_a_insertar).
        letrasarray.splice(1, 0, nuevonombre); 

        mostraralerta(`se insertó "${nuevonombre}" en la segunda posición.`, 'success');
        actualizarvista();
        enviardatosalbackend({
            accion: 'splice - insertar',
            posicion: 1,
            elemento: nuevonombre,
            arrayresultante: letrasarray
        });
        inputinsertar.value = '';
    });

    // splice: reemplazar dos elementos por otros nuevos
    formreemplazar.addeventlistener('submit', (e) => {
        e.preventdefault();
        const posicion = parseint(inputreemplazarposicion.value);
        const nuevo1 = inputreemplazarnuevo1.value.trim();
        const nuevo2 = inputreemplazarnuevo2.value.trim();

        // validaciones de todo lo que ingresó el usuario.
        if (isnan(posicion)) {
            mostraralerta('la posición debe ser un número válido.');
            return;
        }
        if (!nuevo1 || !nuevo2) {
            mostraralerta('debes ingresar los dos elementos nuevos.');
            return;
        }
        if (!essololetras(nuevo1) || !essololetras(nuevo2)) {
            mostraralerta('los nuevos elementos solo deben contener letras.');
            return;
        }
        if (posicion < 0 || posicion > letrasarray.length - 2) {
             mostraralerta(`posición inválida. debe estar entre 0 y ${letrasarray.length - 2} para reemplazar 2 elementos.`);
             return;
        }
        
        // splice para reemplazar: splice(inicio, cant_a_borrar, nuevo_elem1, nuevo_elem2, ...).
        const reemplazados = letrasarray.splice(posicion, 2, nuevo1, nuevo2);
        
        mostraralerta(`se reemplazaron "${reemplazados.join('", "')}" por "${nuevo1}, ${nuevo2}".`, 'success');
        console.log('elementos reemplazados:', reemplazados);
        actualizarvista();
        enviardatosalbackend({
            accion: 'splice - reemplazar',
            posicion: posicion,
            reemplazados: reemplazados,
            nuevos: [nuevo1, nuevo2],
            arrayresultante: letrasarray
        });
        formreemplazar.reset(); // resetea todos los campos del formulario.
    });

    // llamamos a esta función apenas carga la página para mostrar el estado inicial del array (vacío).
    actualizarvista();
});