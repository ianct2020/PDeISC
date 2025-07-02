// public/script.js

// nos aseguramos de que todo el html se haya cargado antes de empezar 
document.addeventlistener('domcontentloaded', () => {

    // acá vamos a ir guardando en memoria los datos que el usuario vaya metiendo.
    const nombres = [];
    const numeros = [];
    const personas = [];

    // guardamos en variables los elementos del html con los que vamos a interactuar, para no tener que buscarlos a cada rato.
    
    // sección nombres
    const formnombres = document.getelementbyid('form-nombres');
    const nombreinput = document.getelementbyid('nombre-input');
    const listanombres = document.getelementbyid('lista-nombres');
    const procesarnombresbtn = document.getelementbyid('procesar-nombres');
    const resultadonombres = document.getelementbyid('resultado-nombres');

    // sección números
    const formnumeros = document.getelementbyid('form-numeros');
    const numeroinput = document.getelementbyid('numero-input');
    const listanumeros = document.getelementbyid('lista-numeros');
    const procesarnumerosbtn = document.getelementbyid('procesar-numeros');
    const resultadonumeros = document.getelementbyid('resultado-numeros');

    // sección personas
    const formpersonas = document.getelementbyid('form-personas');
    const personanombreinput = document.getelementbyid('persona-nombre-input');
    const personaedadinput = document.getelementbyid('persona-edad-input');
    const listapersonas = document.getelementbyid('lista-personas');
    const procesarpersonasbtn = document.getelementbyid('procesar-personas');
    const resultadopersonas = document.getelementbyid('resultado-personas');
    
    // alerta
    const alertadiv = document.getelementbyid('alerta');

    // creamos una función para mostrar mensajes en pantalla, más cheta que el alert() del navegador.
    const mostraralerta = (mensaje, tipo = 'error') => {
        alertadiv.textcontent = mensaje; // le ponemos el texto que nos pasen.
        alertadiv.classname = `alerta ${tipo}`; // le cambiamos el estilo para que se vea de error o de éxito.
        
        // con esto hacemos que la alerta desaparezca sola después de 3 segundos.
        settimeout(() => {
            alertadiv.classlist.add('oculto');
        }, 3000);
    };

    // estas funciones se encargan de dibujar en tiempo real lo que el usuario va agregando.
    const actualizarlistanombres = () => {
        listanombres.innerhtml = ''; // primero vaciamos la lista para no duplicar.
        nombres.foreach(nombre => { // recorremos el array de nombres...
            const li = document.createelement('li'); // ...y por cada uno, creamos un elemento de lista `<li>`.
            li.textcontent = nombre; // le ponemos el nombre adentro.
            listanombres.appendchild(li); // y lo metemos en la lista del html.
        });
    };

    const actualizarlistanumeros = () => {
        listanumeros.innerhtml = '';
        numeros.foreach(num => {
            const li = document.createelement('li');
            li.textcontent = num;
            listanumeros.appendchild(li);
        });
    };

    const actualizarlistapersonas = () => {
        listapersonas.innerhtml = '';
        personas.foreach(p => {
            const li = document.createelement('li');
            li.textcontent = `nombre: ${p.nombre}, edad: ${p.edad}`;
            listapersonas.appendchild(li);
        });
    };


    // formulario de nombres: escuchamos cuando el usuario lo envía.
    formnombres.addeventlistener('submit', (e) => {
        e.preventdefault(); // esto es clave: evita que la página se recargue, que es lo que hacen los formularios por defecto.
        const nombre = nombreinput.value.trim(); // agarramos el valor del input y le sacamos espacios en blanco de los costados.

        // validación: nos fijamos que el usuario no mande fruta.
        if (nombre === '') {
            mostraralerta('el campo de nombre no puede estar vacío.');
            return; // si hay error, cortamos la ejecución acá.
        }
        if (/\d/.test(nombre)) { // con una expresión regular, chequeamos si el nombre tiene algún número.
            mostraralerta('el nombre no puede contener números.');
            return;
        }

        nombres.push(nombre); // si está todo bien, lo metemos en nuestro array de nombres.
        actualizarlistanombres(); // actualizamos la lista en pantalla.
        nombreinput.value = ''; // vaciamos el campo para que pueda escribir otro nombre.
        nombreinput.focus(); // dejamos el cursor titilando en el input, listo para usar.
    });

    // formulario de números: misma lógica que el anterior.
    formnumeros.addeventlistener('submit', (e) => {
        e.preventdefault();
        const valor = numeroinput.value.trim();
        
        // validación
        if (valor === '') {
            mostraralerta('el campo de número no puede estar vacío.');
            return;
        }
        if (isnan(valor)) { // isnan() se fija si el valor no es un número.
            mostraralerta('por favor, ingresa un valor numérico válido.');
            return;
        }

        numeros.push(parsefloat(valor)); // lo guardamos como número, no como texto.
        actualizarlistanumeros();
        numeroinput.value = '';
        numeroinput.focus();
    });
    
    // formulario de personas: lo mismo pero con dos campos.
    formpersonas.addeventlistener('submit', (e) => {
        e.preventdefault();
        const nombre = personanombreinput.value.trim();
        const edad = personaedadinput.value.trim();

        // validación
        if (nombre === '' || edad === '') {
            mostraralerta('ambos campos, nombre y edad, son obligatorios.');
            return;
        }
        if (/\d/.test(nombre)) {
            mostraralerta('el nombre no puede contener números.');
            return;
        }
        if (isnan(edad) || parsefloat(edad) <= 0) {
            mostraralerta('la edad debe ser un número positivo.');
            return;
        }

        personas.push({ nombre: nombre, edad: parseint(edad) }); // guardamos un objeto con nombre y edad.
        actualizarlistapersonas();
        personanombreinput.value = '';
        personaedadinput.value = '';
        personanombreinput.focus();
    });


    // esta función se va a encargar de hablar con nuestro servidor usando fetch.
    const enviardatosalbackend = async (tipo, datos) => {
        try { // intentamos hacer lo siguiente...
            const respuesta = await fetch('/guardar', { // hacemos el pedido a la ruta /guardar
                method: 'post', // le decimos que es un pedido de tipo post
                headers: {
                    'content-type': 'application/json', // le avisamos que le vamos a mandar datos en formato json
                },
                body: json.stringify({ tipo, datos }), // convertimos nuestro objeto de javascript a un texto en formato json.
            });
            const resultado = await respuesta.json(); // la respuesta del servidor también viene en json, la convertimos a un objeto de javascript.
            console.log('✅ respuesta del servidor:', resultado); // la mostramos en la consola del navegador.
            mostraralerta(resultado.message, 'success'); // mostramos una alerta de que salió todo bien.

        } catch (error) { // si algo falla en el 'try' (ej: se cayó el servidor), se ejecuta esto.
            console.error('❌ error al enviar datos al backend:', error);
            mostraralerta('hubo un error de conexión con el servidor.');
        }
    };

    // procesar nombres: escuchamos el clic en el botón.
    procesarnombresbtn.addeventlistener('click', () => {
        if (nombres.length === 0) { // si no hay nombres, no hacemos nada.
            mostraralerta('agrega al menos un nombre para procesar.');
            return;
        }
        resultadonombres.innerhtml = ''; // limpiamos los resultados anteriores.
        console.log('--- procesando saludos (foreach) ---');

        // ¡acá está la magia del foreach! recorre cada elemento del array 'nombres'.
        nombres.foreach(nombre => {
            const saludo = `¡hola, ${nombre}!`;
            console.log(saludo); // lo mostramos en la consola del navegador.
            resultadonombres.innerhtml += `<p>${saludo}</p>`; // y lo agregamos al div de resultados en el html.
        });
        
        // una vez procesado en el navegador, mandamos los datos al servidor.
        enviardatosalbackend('nombres', nombres);
    });

    // procesar números: la misma mecánica.
    procesarnumerosbtn.addeventlistener('click', () => {
        if (numeros.length === 0) {
            mostraralerta('agrega al menos un número para procesar.');
            return;
        }
        resultadonumeros.innerhtml = '';
        console.log('--- procesando dobles (foreach) ---');

        // usamos foreach para recorrer el array de números.
        numeros.foreach(num => {
            const doble = num * 2;
            const texto = `el doble de ${num} es ${doble}.`;
            console.log(texto);
            resultadonumeros.innerhtml += `<p>${texto}</p>`;
        });
        
        enviardatosalbackend('numeros', numeros);
    });

    // procesar personas
    procesarpersonasbtn.addeventlistener('click', () => {
        if (personas.length === 0) {
            mostraralerta('agrega al menos una persona para procesar.');
            return;
        }
        resultadopersonas.innerhtml = '';
        console.log('--- procesando personas (foreach) ---');
        
        // usamos foreach para recorrer nuestro array de objetos 'personas'.
        personas.foreach(persona => {
            const descripcion = `${persona.nombre} tiene ${persona.edad} años.`;
            console.log(descripcion);
            resultadopersonas.innerhtml += `<p>${descripcion}</p>`;
        });
        
        enviardatosalbackend('personas', personas);
    });
});