// public/script.js

// nos aseguramos de que todo el html se haya cargado antes de ejecutar nuestro código.
document.addEventListener('domcontentloaded', () => {

    // --- arrays para guardar lo que el usuario va metiendo ---
    // los declaramos acá para que estén disponibles para todas las funciones.
    let arraynumeros = [], arraypeliculas = [], arrayultimos = [];

    // --- agarramos todos los elementos del html que vamos a usar ---
    const forms = {
        numeros: document.getelementbyid('form-numeros'),
        peliculas: document.getelementbyid('form-peliculas'),
        ultimos: document.getelementbyid('form-ultimos'),
    };
    const inputs = {
        numeros: document.getelementbyid('input-numeros'),
        peliculas: document.getelementbyid('input-peliculas'),
        ultimos: document.getelementbyid('input-ultimos'),
    };
    const tagcontainers = {
        numeros: document.getelementbyid('tags-numeros'),
        peliculas: document.getelementbyid('tags-peliculas'),
        ultimos: document.getelementbyid('tags-ultimos'),
    };
    const btnsagregar = {
        numeros: document.getelementbyid('btn-agregar-numero'),
        peliculas: document.getelementbyid('btn-agregar-pelicula'),
        ultimos: document.getelementbyid('btn-agregar-ultimo'),
    };
    const displays = {
        numerosoriginal: document.getelementbyid('display-numeros-original'),
        numerosresultado: document.getelementbyid('display-numeros-resultado'),
        peliculasoriginal: document.getelementbyid('display-peliculas-original'),
        peliculasresultado: document.getelementbyid('display-peliculas-resultado'),
        ultimosoriginal: document.getelementbyid('display-ultimos-original'),
        ultimosresultado: document.getelementbyid('display-ultimos-resultado'),
    };
    const customalert = document.getelementbyid('custom-alert');

    // recibe el mensaje y si es de error o no.
    const mostraralerta = (mensaje, eserror = true) => {
        customalert.textcontent = mensaje;
        customalert.classname = 'show'; // le pone la clase para que se vea.
        // le agrega 'error' o 'success' para que tenga el color correcto.
        customalert.classlist.add(eserror ? 'error' : 'success');
        // después de 3 segundos, deja de mostrarla
        settimeout(() => { customalert.classname = ''; }, 3000);
    };

    // recibe el array con los datos y el div donde tiene que meter las etiquetas.
    const renderizartags = (array, container) => {
        container.innerhtml = ''; // primero, borra todo lo que había antes.
        // por cada elemento en el array, crea una etiqueta.
        array.foreach((item, index) => {
            const tag = document.createelement('span');
            tag.classname = 'tag';
            tag.textcontent = item;
            
            // crea el botoncito para borrar la etiqueta.
            const removebtn = document.createelement('button');
            removebtn.classname = 'remove-btn';
            removebtn.textcontent = 'x';
            // cuando le hacés clic, borra el elemento del array y vuelve a hacer todo.
            removebtn.onclick = () => {
                array.splice(index, 1); // el método splice modifica el array original.
                renderizartags(array, container); // volvemos a llamar a la función para actualizar la vista.
            };
            
            tag.appendchild(removebtn); // le mete el botón de borrar adentro de la etiqueta.
            container.appendchild(tag); // y mete la etiqueta completa en su contenedor.
        });
    };
    
    // --- función central para agregar un ítem a la lista ---
    // la llamamos tanto con el "enter" como con el botón "agregar".
    const agregaritem = (tipo, array, input, container) => {
        const valor = input.value.trim(); // agarra el valor del input y le saca los espacios de los costados.
        if (!valor) return; // si no hay nada escrito, no hace nada.

        // validaciones específicas para cada tipo de dato antes de agregarlo.
        if (tipo === 'numeros' && (isnan(number(valor)) || valor === '')) {
            mostraralerta('por favor, ingresá solo números válidos.');
            return;
        }
        if (tipo === 'peliculas' && !isnan(valor) && valor.trim() !== '') {
            mostraralerta('el nombre de una película no debería ser un número.');
            return;
        }

        array.push(valor); // mete el valor en el array que corresponde.
        renderizartags(array, container); // actualiza la vista con el nuevo tag.
        input.value = ''; // limpia el campo de texto.
        input.focus(); // deja el cursor titilando en el input, listo para escribir de nuevo.
    };

    
    // para agregar items con la tecla "enter" o el botón "agregar"
    inputs.numeros.addeventlistener('keydown', (e) => {
        if (e.key === 'enter') { e.preventdefault(); agregaritem('numeros', arraynumeros, inputs.numeros, tagcontainers.numeros); }
    });
    btnsagregar.numeros.addeventlistener('click', () => {
        agregaritem('numeros', arraynumeros, inputs.numeros, tagcontainers.numeros);
    });

    inputs.peliculas.addeventlistener('keydown', (e) => {
        if (e.key === 'enter') { e.preventdefault(); agregaritem('peliculas', arraypeliculas, inputs.peliculas, tagcontainers.peliculas); }
    });
    btnsagregar.peliculas.addeventlistener('click', () => {
        agregaritem('peliculas', arraypeliculas, inputs.peliculas, tagcontainers.peliculas);
    });

    inputs.ultimos.addeventlistener('keydown', (e) => {
        if (e.key === 'enter') { e.preventdefault(); agregaritem('ultimos', arrayultimos, inputs.ultimos, tagcontainers.ultimos); }
    });
    btnsagregar.ultimos.addeventlistener('click', () => {
        agregaritem('ultimos', arrayultimos, inputs.ultimos, tagcontainers.ultimos);
    });


    // --- función para manejar el envío final al servidor ---
    const manejarsubmit = async (tipo, arraydatos, displayoriginal, displayresultado, validacion) => {
        // primero, corre la validación final del array completo.
        const errorvalidacion = validacion(arraydatos);
        if (errorvalidacion) {
            mostraralerta(errorvalidacion); // si hay error, muestra la alerta y corta todo.
            return;
        }
        
        // si los datos son números, los convierte de string a number.
        let datosaenviar = tipo === 'numeros' ? arraydatos.map(number) : arraydatos;
        // muestra el array que se va a mandar en la pantalla.
        displayoriginal.textcontent = json.stringify(datosaenviar);
        displayresultado.textcontent = ''; // limpia el resultado anterior.

        // muestra en la consola del navegador lo que estamos por mandar.
        console.log(`[cliente] enviando al servidor (tipo: ${tipo}):`, datosaenviar);

        try {
            //le pega al servidor sin recargar la página.
            const respuesta = await fetch('/guardar', {
                method: 'post', // le decimos que es una petición post.
                headers: { 'content-type': 'application/json' }, // le avisamos que le mandamos data en formato json.
                body: json.stringify({ tipo: tipo, datos: datosaenviar }), // convertimos nuestro objeto a un string json.
            });

            const data = await respuesta.json(); // convierte la respuesta del servidor que es un string a un objeto javascript.
            if (!respuesta.ok) throw new error(data.message || 'error en el servidor.'); // si la respuesta no fue buena, tira un error.

            console.log('[cliente] respuesta del servidor:', data); // muestra la respuesta en la consola del navegador.
            displayresultado.textcontent = json.stringify(data.resultado); // muestra el resultado final en la pantalla.
            mostraralerta('datos procesados con éxito!', false); // tira la alerta verde de que todo salió bien.

        } catch (error) {
            // si algo falló en el fetch (ej: se cayó el servidor), lo agarramos acá.
            console.error('[cliente] error en fetch:', error);
            mostraralerta('hubo un problema al conectar con el servidor.');
        }
    };

    // 2. para procesar el formulario completo (cuando hacés clic en "procesar...")
    forms.numeros.addeventlistener('submit', (e) => {
        e.preventdefault(); // evita que la página se recargue, que es lo que hace un form por defecto.
        manejarsubmit('numeros', arraynumeros, displays.numerosoriginal, displays.numerosresultado, (arr) => {
            if (arr.length < 3) return 'debes ingresar al menos 3 números.';
            return null; // si todo está ok, devuelve null.
        });
    });

    forms.peliculas.addeventlistener('submit', (e) => {
        e.preventdefault();
        manejarsubmit('peliculas', arraypeliculas, displays.peliculasoriginal, displays.peliculasresultado, (arr) => {
            if (arr.length < 5) return 'debes ingresar al menos 5 películas para este ejemplo.';
            return null;
        });
    });
    
    forms.ultimos.addeventlistener('submit', (e) => {
        e.preventdefault();
        manejarsubmit('ultimos-elementos', arrayultimos, displays.ultimosoriginal, displays.ultimosresultado, (arr) => {
            if (arr.length < 3) return 'debes ingresar al menos 3 elementos.';
            return null;
        });
    });
});