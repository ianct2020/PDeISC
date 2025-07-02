// server.js

const express = require('express');
// el 'path' nos ayuda a manejar las rutas de los archivos, para no hacer lío.

const app = express();
// creamos nuestra aplicación con express.

const port = 3000;
// le decimos que vamos a laburar en el puerto 3000.

app.use(express.json());
// con esto le decimos a express que la carpeta 'public' tiene los archivos que ve la gente (html, css, etc.).

app.use(express.static('public'));

///  middlewares (cosas que se ejecutan en el medio) 

// esto es clave para que express entienda el json que le manda el frontend desde el fetch.

const datos = {
    numeros: [],
    mensajes: [],
    clientes: []
};

// ruta para agregar un nuevo elemento a un array
app.post('/agregar', (req, res) => {
    const { tipo, valor } = req.body;

    console.log(`[Servidor] Recibido para agregar en '${tipo}':`, valor);

    // verificación simple en el backend
    if (!tipo || !valor || !datos.hasOwnProperty(tipo)) {
        return res.status(400).json({ exito: false, mensaje: 'Datos inválidos.' });
    }

    // agregamos el valor al array correspondiente
    datos[tipo].push(valor);

    // éxito y el array actualizado
    res.json({
        exito: true,
        mensaje: `Elemento '${valor}' agregado a '${tipo}'.`,
        datosActualizados: datos[tipo]
    });
});

// ruta para procesar (quitar) el primer elemento de un array usando shift()
app.post('/procesar', (req, res) => {
    const { tipo } = req.body;

    console.log(`[Servidor] Recibido para procesar primer elemento de '${tipo}'`);

    if (!tipo || !datos.hasOwnProperty(tipo)) {
        return res.status(400).json({ exito: false, mensaje: 'Tipo de dato inválido.' });
    }

    if (datos[tipo].length === 0) {
        return res.status(400).json({ exito: false, mensaje: `El array '${tipo}' está vacío.` });
    }

    // aquí usamos shift() como se pidió
    const elementoEliminado = datos[tipo].shift();

    console.log(`[Servidor] Elemento eliminado de '${tipo}':`, elementoEliminado);

    // respondemos con el elemento que se quitó y el estado final del array
    res.json({
        exito: true,
        elementoEliminado: elementoEliminado,
        datosActualizados: datos[tipo]
    });
});
// --- iniciar servidor ---
// acá prendemos el motor, ponemos el servidor a """""escuchar""""" en el puerto que le dijimos.
app.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
});