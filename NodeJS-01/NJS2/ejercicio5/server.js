const express = require('express');
const app = express();
const port = 3000;

// Configuración de EJS como motor de plantillas
app.set('view engine', 'ejs');

// Servir archivos estáticos (CSS, JS, etc.)
app.use(express.static('public'));

// Ruta para mostrar la página principal
app.get('/', (req, res) => {
  res.render('index');
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
