// main.js - Servidor Backend con Express.js

const express = require('express');
const path = require('path');

const app = express();
const PORT = 3000;

// Le decimos a Express que todo lo que el navegador pida,
// lo busque dentro de la carpeta 'public'.
app.use(express.static(path.join(__dirname, 'public')));

app.listen(PORT, () => {
    console.log(`🚀 Servidor con Express corriendo en http://localhost:${PORT}`);
});
