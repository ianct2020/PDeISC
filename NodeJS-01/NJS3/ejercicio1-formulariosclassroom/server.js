const express = require('express');
const app = express();
const path = require('path');
const port = 3001;

// Array para almacenar los usuarios
const usuarios = [];

app.use(express.urlencoded({ extended: true }));
app.use(express.json()); // Middleware para parsear JSON

// Servir archivos estáticos (HTML, CSS, JS)
app.use(express.static(path.join(__dirname, 'public')));

// Ruta para manejar el formulario (POST)
app.post('/enviar', (req, res) => {
    const usuario = {
        usr: req.body.usr,
        pass: req.body.pass
    };

    // Agregar el usuario al array
    usuarios.push(usuario);
    console.log('Nuevo usuario agregado:', usuario);

    // Enviar la respuesta con el nuevo usuario
    res.json({ usr: usuario.usr });
});

// Ruta para obtener todos los usuarios (GET)
app.get('/usuarios', (req, res) => {
    res.json(usuarios); // Devuelve la lista de usuarios como respuesta
});

// Iniciar el servidor
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
