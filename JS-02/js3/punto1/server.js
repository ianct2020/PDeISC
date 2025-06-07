// 1. Importar los módulos necesarios
const express = require('express'); // Framework para crear el servidor
const fs = require('fs');         // Módulo 'File System' para trabajar con archivos
const path = require('path');     // Módulo para trabajar con rutas de archivos y directorios

// 2. Inicializar la aplicación de Express
const app = express();
const PORT = 3000; // Puedes usar el puerto que prefieras

// 3. Configurar 'middlewares'
// Middleware para que el servidor entienda JSON que llega en las peticiones (requests)
app.use(express.json());
// Middleware para servir archivos estáticos (HTML, CSS, JS del cliente) desde una carpeta 'public'
app.use(express.static(path.join(__dirname, 'public')));

// 4. Definir la ruta (endpoint) para guardar los números
// Escuchará peticiones POST en la URL http://localhost:3000/guardar-numeros
app.post('/guardar-numeros', (req, res) => {
    // Obtenemos el array de 'numeros' del cuerpo (body) de la petición
    const { numeros } = req.body;

    // --- Validación en el servidor ---
    // Verificar si recibimos un array y si tiene contenido
    if (!numeros || !Array.isArray(numeros) || numeros.length === 0) {
        // Si no es válido, enviamos una respuesta de error
        return res.status(400).json({ message: 'Error: No se recibieron números para guardar.' });
    }

    // Convertir el array de números en un string, con cada número en una línea nueva
    const fileContent = numeros.join('\n');
    const filePath = path.join(__dirname, 'numeros_guardados.txt'); // Nombre y ruta del archivo a guardar

    // --- Escritura del archivo ---
    // Usamos fs.writeFile para crear/escribir en el archivo
    fs.writeFile(filePath, fileContent, 'utf8', (err) => {
        if (err) {
            // Si hay un error al escribir el archivo, lo registramos y enviamos una respuesta de error
            console.error('Error al escribir el archivo:', err);
            return res.status(500).json({ message: 'Error interno del servidor al guardar el archivo.' });
        }

        // Si todo sale bien, registramos en la consola y enviamos una respuesta de éxito
        console.log(`Archivo "numeros_guardados.txt" guardado correctamente.`);
        res.status(200).json({ message: 'Archivo guardado en el servidor con éxito.' });
    });
});

// 5. Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
