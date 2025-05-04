const express = require('express');
const app = express();
const port = 3000;

// configuración de EJS como motor de plantillas
app.set('view engine', 'ejs');

// servir archivos estáticos (CSS, JS, etc.)
app.use(express.static('public'));

// ruta para mostrar la página principal
app.get('/', (req, res) => {
  res.render('index');
});

// iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
