// server.js
// acá traemos el módulo de express para levantar el servidor
const express = require('express');
// el módulo path para manejar las rutas de los archivos
const path = require('path');
// creamos la aplicación de express, el aparato principal
const app = express();
// el puerto donde va a correr el servidor, el 3000 
const PORT = 3000;

// este coso es clave, hace que express entienda los json que le manda el front
app.use(express.json());
// con esto le decimos que la carpeta 'public' tiene los archivos que se pueden ver desde el navegador
app.use(express.static(path.join(__dirname, 'public')));

// acá armamos la ruta /guardar que espera datos por post
app.post('/guardar', (req, res) => {
    // avisamos en la consola del servidor que llegó algo
    console.log('✅ datos recibidos en el servidor:');
    // mostramos en la consola este aparato que nos llegó
    console.log(req.body);

    // le mandamos una respuesta al navegador para que sepa que salió todo bien
    res.status(200).json({ 
        status: 'ok', 
        mensaje: 'datos recibidos correctamente en el servidor',
        datosRecibidos: req.body
    });
});

// acá prendemos el motor, ponemos el servidor a """"escuchar""""" en el puerto que dijimos
app.listen(PORT, () => {
    // un mensajito en la terminal para saber que ya está andando
    console.log(`🚀 servidor corriendo en http://localhost:${PORT}`);
});