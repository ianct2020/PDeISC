// server.js

// acá nos traemos las herramientas que necesitamos.
// 'express' es el framework para montar el servidor de forma sencilla.
// 'path' nos ayuda a manejar las rutas de los archivos, para que funcione en cualquier compu.
const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

// --- middlewares ---
// los middlewares son funciones que se ejecutan en el medio, entre que llega el pedido y te doy una respuesta.

//  le dice a express cómo leer los datos json que nos va a mandar el frontend.
app.use(express.json());
// y este otro le dice a express que la carpeta 'public' tiene archivos que se pueden ver desde el navegador (html, css, js).
app.use(express.static(path.join(__dirname, 'public')));

// --- ruta principal para procesar los datos ---
// acá creamos la ruta '/guardar' que va a recibir los datos por el método post.
app.post('/guardar', (req, res) => {
    // desarmamos el objeto que nos llega en el 'body' del pedido.
    // esperamos que tenga un 'type' (para saber qué hacer) y la 'data' (el array con los datos).
    const { type, data } = req.body;

    console.log(`\n---------------------------------`);
    console.log(`[servidor] datos recibidos:`);
    console.log(`tipo de operación: ${type}`);
    console.log(`datos:`, data);

    // nos fijamos que todo exista y que la data sea un array con cosas adentro.
    if (!type || !data || !array.isarray(data) || data.length === 0) {
        return res.status(400).json({ success: false, message: 'datos inválidos o incompletos.' });
    }

    // preparamos una variable para guardar el resultado del map.
    let resultado;

    // usamos un try...catch por si algo explota en el medio, para que no se caiga el servidor.
    try {
        //  se fija en el 'type' y hace lo que corresponde.
        switch (type) {
            case 'multiplicar':
                // acá usamos map() para crear un nuevo array con cada número multiplicado por 3.
                resultado = data.map(numero => {
                    // lo convertimos a número por si las dudas.
                    const num = number(numero);
                    return !isnan(num) ? num * 3 : 0;
                });
                break;

            case 'mayusculas':
                // acá usamos map() para convertir cada nombre del array a mayúsculas.
                resultado = data.map(nombre => string(nombre).touppercase());
                break;

            case 'iva':
                // y acá, con map() de nuevo, calculamos el 21% de iva para cada precio.
                resultado = data.map(precio => {
                    const num = number(precio);
                    const precioconiva = !isnan(num) ? num * 1.21 : 0;
                    // lo dejamos con 2 decimales para que se vea prolijo como un precio real.
                    return parsefloat(precioconiva.tofixed(2));
                });
                break;

            default:
                // si nos mandan un 'type' que no conocemos, avisamos el error.
                console.log(`[servidor] error: tipo de operación '${type}' no reconocido.`);
                return res.status(400).json({ success: false, message: 'tipo de operación no válida.' });
        }

        console.log(`[servidor] resultado del procesamiento:`, resultado);
        // si todo salió joya, le mandamos al frontend el resultado en un json.
        res.json({ success: true, processeddata: resultado });

    } catch (error) {
        // si hubo algún error en el 'try', lo agarramos acá y avisamos.
        console.error(`[servidor] error durante el procesamiento:`, error);
        res.status(500).json({ success: false, message: 'error interno del servidor.' });
    }
});


// acá le damos arranque al servidor para que se quede escuchando en el puerto que definimos.
app.listen(port, () => {
    console.log(`servidor corriendo en http://localhost:${port}`);
});