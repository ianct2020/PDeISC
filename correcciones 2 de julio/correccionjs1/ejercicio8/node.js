// server.js

const express = require('express');
// el 'path' nos ayuda a manejar las rutas de los archivos, para no hacer lío.

const path = require('path');
// creamos nuestra aplicación con express.

const app = express();
// le decimos que vamos a laburar en el puerto 3000.

const PORT = process.env.PORT || 3000;

//  middlewares (cosas que se ejecutan en el medio) 

// esto es clave para que express entienda el json que le manda el frontend desde el fetch.
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// arrays en el servidor para mantener el estado (simulando una base de datos)
let userWords = [];
let colors = [];
let numbers = [];

// ruta para recibir los datos del cliente
app.post('/guardar', (req, res) => {
    const { type, data } = req.body;
    let result = {};

    console.log(`\n[Servidor] Datos recibidos:`, req.body);

    switch (type) {
        case 'word':
            userWords.push(data);
            const hasAdmin = userWords.includes('admin');
            result = {
                message: `Palabra '${data}' agregada.`,
                currentArray: userWords,
                hasAdmin: hasAdmin
            };
            console.log(`[Servidor] Lista de palabras actualizada: [${userWords.join(', ')}]. ¿Contiene "admin"? ${hasAdmin}`);
            break;

        case 'color':
            colors.push(data);
            const hasGreen = colors.includes('verde');
            result = {
                message: `Color '${data}' agregado.`,
                currentArray: colors,
                hasGreen: hasGreen
            };
            console.log(`[Servidor] Lista de colores actualizada: [${colors.join(', ')}]. ¿Contiene "verde"? ${hasGreen}`);
            break;

        case 'number':
            const num = parseInt(data, 10);
            // comprueba si el número ya está presente antes de sumarlo
            if (numbers.includes(num)) {
                result = {
                    message: `El número ${num} ya existe en la lista.`,
                    alreadyExists: true,
                    currentArray: numbers
                };
                console.log(`[Servidor] Intento de agregar ${num}, pero ya existe.`);
            } else {
                numbers.push(num);
                result = {
                    message: `Número ${num} agregado.`,
                    alreadyExists: false,
                    currentArray: numbers
                };
                console.log(`[Servidor] Lista de números actualizada: [${numbers.join(', ')}]`);
            }
            break;

        default:
            console.log('[Servidor] Tipo de dato no reconocido');
            return res.status(400).json({ message: 'Tipo de dato no válido' });
    }

    res.status(200).json(result);
});


app.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
});