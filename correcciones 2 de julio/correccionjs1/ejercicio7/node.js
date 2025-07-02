// server.js (ACTUALIZADO para que 'perro' sea insensible a mayúsculas)

const express = require('express');
// el 'path' nos ayuda a manejar las rutas de los archivos, para no hacer lío.

const app = express();
// creamos nuestra aplicación con express.
const PORT = 3000;
// le decimos que vamos a laburar en el puerto 3000.
app.use(express.json());
// esto es clave para que express entienda el json que le manda el frontend desde el fetch.

app.use(express.static('public'));
// con esto le decimos a express que la carpeta 'public' tiene los archivos que ve la gente (html, css, etc.).


app.post('/guardar', (req, res) => {
  console.log('------------------------------------');
  console.log('Datos recibidos en el servidor:', req.body);

  const { dataArray, task } = req.body;
  
  let message;
  const foundIndices = [];
  let fromIndex = 0; 

  switch (task) {
    // 'findDog'  
    case 'findDog': {
      // creamos un array temporal con todas las palabras en minúsculas.
      const lowerCaseArray = dataArray.map(word => word.toLowerCase());
      const searchTerm = 'perro'; // buscamos siempre la versión en minúsculas.

      // usamos la misma lógica 'while' sobre el array en minúsculas.
      while ((fromIndex = lowerCaseArray.indexOf(searchTerm, fromIndex)) !== -1) {
        foundIndices.push(fromIndex); // guardamos el índice encontrado
        fromIndex++; // preparamos la próxima búsqueda
      }
      break;
    }

    case 'find50': {
      const searchTerm = 50;
      
      while ((fromIndex = dataArray.indexOf(searchTerm, fromIndex)) !== -1) {
        foundIndices.push(fromIndex);
        fromIndex++;
      }
      break;
    }

    case 'findMadrid': {
      const lowerCaseArray = dataArray.map(city => city.toLowerCase());
      const searchTerm = 'madrid';

      while ((fromIndex = lowerCaseArray.indexOf(searchTerm, fromIndex)) !== -1) {
        foundIndices.push(fromIndex);
        fromIndex++;
      }
      break;
    }

    default:
      message = 'Tarea no reconocida.';
      return res.json({ success: false, message });
  }

  if (foundIndices.length === 0) {
    let item = task === 'findDog' ? '"perro"' : task === 'find50' ? 'el número 50' : '"Madrid"';
    message = `El elemento ${item} no se encontró en la lista.`;
  } else if (foundIndices.length === 1) {
    let item = task === 'findDog' ? 'La palabra "perro"' : task === 'find50' ? 'El número 50' : '"Madrid"';
    message = `¡Encontrado! ${item} está en la posición ${foundIndices[0]}.`;
  } else {
    let item = task === 'findDog' ? 'La palabra "perro"' : task === 'find50' ? 'El número 50' : '"Madrid"';
    message = `¡Múltiples apariciones! ${item} se encontró en las posiciones: ${foundIndices.join(', ')}.`;
  }

  console.log('Resultado del procesamiento:', message);
  console.log('------------------------------------\n');

  res.json({
    success: true,
    message: message
  });
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});