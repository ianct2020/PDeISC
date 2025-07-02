// server.js
const express = require('express');
// el 'path' nos ayuda a manejar las rutas de los archivos, para no hacer lío.

const path = require('path');
// creamos nuestra aplicación con express.

const app = express();
// le decimos que vamos a laburar en el puerto 3000.

const PORT = 3000;

//  middlewares (cosas que se ejecutan en el medio) 
app.use(express.json());
// con esto le decimos a express que la carpeta 'public' tiene los archivos que ve la gente (html, css, etc.).

app.use(express.static('public'));

//POST para recibir y procesar los datos
app.post('/guardar', (req, res) => {
    const { tipo, datos } = req.body;

    console.log(`\n-----------------------------------`);
    console.log(`[Servidor] Datos recibidos para tipo: "${tipo}"`);
    console.log('[Servidor] Array Original:', datos);

    let resultado;

    try {
        switch (tipo) {
            case 'numeros':
                // copia los primeros 3 elementos.
                resultado = datos.slice(0, 3);
                console.log('[Servidor] Resultado de slice(0, 3):', resultado);
                break;
            case 'peliculas':
                // copia desde la posición 2 hasta la 4.
                resultado = datos.slice(2, 5); // slice(inicio, fin) el 'fin' no se incluye.
                console.log('[Servidor] Resultado de slice(2, 5):', resultado);
                break;
            case 'ultimos-elementos':
                // crea un nuevo array con los últimos 3 elementos.
                resultado = datos.slice(-3);
                console.log('[Servidor] Resultado de slice(-3):', resultado);
                break;
            default:
                throw new Error('Tipo de operación no válida');
        }
        
        // devuelve el resultado al cliente en formato JSON
        res.json({ success: true, resultado: resultado });

    } catch (error) {
        console.error('[Servidor] Error procesando los datos:', error.message);
        res.status(400).json({ success: false, message: error.message });
    }
});

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});