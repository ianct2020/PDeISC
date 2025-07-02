// --- Importación de módulos necesarios ---
// 'express' es el framework que nos facilita la creación del servidor.
// 'path' nos ayuda a trabajar con rutas de archivos y directorios de forma segura.
const express = require('express');
const path = require('path');

// --- Inicialización de la aplicación Express ---
const app = express();

// --- Definición del puerto ---
// Usamos el puerto que nos asigne el entorno (como en un hosting) o el 3000 si estamos en local.
const PORT = process.env.PORT || 3000;

// --- Middleware para servir archivos estáticos ---
// Esta es la parte clave: le decimos a Express que la carpeta 'public' contiene
// los archivos estáticos (HTML, CSS, JS) que el navegador debe poder solicitar.
// path.join(__dirname, 'public') crea una ruta absoluta a la carpeta 'public'.
app.use(express.static(path.join(__dirname, 'public')));

// --- Ruta principal ---
// Aunque el middleware anterior ya sirve el index.html por defecto, 
// esta ruta asegura que cualquier petición a la raíz ('/') reciba el archivo HTML.
// Es una buena práctica tenerla por si acaso.
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// --- Iniciar el servidor ---
// El servidor se pone a "escuchar" peticiones en el puerto que definimos.
// Mostramos un mensaje en la consola para saber que todo ha funcionado correctamente.
app.listen(PORT, () => {
    console.log(`¡Servidor corriendo exitosamente en http://localhost:${PORT}`);
});
