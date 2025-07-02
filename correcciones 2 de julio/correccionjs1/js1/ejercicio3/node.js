const express = require('express');
// el 'path' nos ayuda a manejar las rutas de los archivos, para no hacer lío.

const path = require('path');
// creamos nuestra aplicación con express.

const app = express();
// le decimos que vamos a laburar en el puerto 3000.

const PORT = 3000;
//  middlewares (cosas que se ejecutan en el medio) 
// esto es clave para que express entienda el json que le manda el frontend desde el fetch.

app.use(express.json());
// Para servir archivos estáticos (como nuestro script.js y css)
app.use(express.static(path.join(__dirname, 'public')));
// con esto le decimos a express que la carpeta 'public' tiene los archivos que ve la gente (html, css, etc.).
// acá guardamos los datos mientras el server está prendido.
// arranca todo vacío.
let colores = [];
let tareas = [];
let usuariosConectados = [];



// ruta principal que sirve el archivo HTML
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// ruta para guardar datos usando unshift()
app.post('/guardar', (req, res) => {
  const { type, value } = req.body;

  console.log(`\n[Servidor] Petición recibida en /guardar`);
  console.log(`[Servidor] Tipo: ${type}, Valor: ${value}`);

  let updatedArray;

  switch (type) {
    case 'color':
      // el método principal de la solicitud: unshift()
      colores.unshift(value);
      updatedArray = colores;
      console.log('[Servidor] Array de colores actualizado:', colores);
      break;
    case 'tarea':
      // el método principal de la solicitud: unshift()
      tareas.unshift(value);
      updatedArray = tareas;
      console.log('[Servidor] Array de tareas actualizado:', tareas);
      break;
    case 'usuario':
      // el método principal de la solicitud: unshift()
      usuariosConectados.unshift(value);
      updatedArray = usuariosConectados;
      console.log('[Servidor] Array de usuarios actualizado:', usuariosConectados);
      break;
    default:
      console.log('[Servidor] Error: Tipo no válido.');
      return res.status(400).json({ success: false, message: 'Tipo de dato no válido' });
  }

  // enviamos una respuesta exitosa con el array completo y actualizado
  res.status(200).json({ success: true, data: updatedArray });
});


// --- iniciar Servidor ---
app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});2