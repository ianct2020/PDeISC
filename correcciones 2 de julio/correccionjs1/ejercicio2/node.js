//  acá traemos express para montar el servidor.

const express = require('express');
// creamos nuestra aplicación con express.

const path = require('path');
// le decimos que vamos a laburar en el puerto 3000.

const app = express();
const PORT = 3000;

// esto es clave para que express entienda el json que le manda el frontend desde el fetch.
app.use(express.json());
// con esto le decimos a express que la carpeta 'public' tiene los archivos que ve la gente (html, css, etc.).

app.use(express.static(path.join(__dirname, 'public')));

// Ruta para recibir los datos desde el frontend
app.post('/guardar', (req, res) => {
    // req.body contiene los datos enviados por fetch()
    const { tipo, data, eliminado } = req.body;

    console.log('-------------------------------------------');
    console.log(`[SERVIDOR] Se recibió una actualización para: ${tipo}`);
    
    if (eliminado) {
        console.log(`[SERVIDOR] Elemento eliminado: ${eliminado}`);
    }
    
    console.log(`[SERVIDOR] Estado actual del array: [${data.join(', ')}]`);
    
    // Respondemos al cliente para confirmar la recepción
    res.status(200).json({ message: 'Datos recibidos correctamente por el servidor.' });
});
// --- iniciar servidor ---
// acá prendemos el motor, ponemos el servidor a """""escuchar""""" en el puerto que le dijimos.
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});