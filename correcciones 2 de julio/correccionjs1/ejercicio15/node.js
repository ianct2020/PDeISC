
// aca traemos el aparato de express
const express = require('express');
// este otro coso es para manejar las rutas de los archivos
const path = require('path');

// creamos la aplicacion con esa cosa de express
const app = express();
// le decimos que el puerto va a ser el 3000 si no hay otro disponible
const PORT = process.env.PORT || 3000;

// esto es para que el servidor entienda el json que le llega, si no, no caza una
app.use(express.json());
// con esto le decimos que los archivos fijos, los que no cambian, estan en la carpeta 'public'
app.use(express.static(path.join(__dirname, 'public')));

// aca armamos la ruta post para cuando nos pidan decodificar algo
app.post('/decodificar', (req, res) => {
    // sacamos el texto que nos mandaron en el coso del body
    const { texto } = req.body;
    // lo mostramos en la consola del servidor para chusmear que llego bien
    console.log('texto recibido en el servidor:', texto);

    // aca nos fijamos si el texto no vino vacio, viste
    if (!texto || texto.trim() === '') {
        console.log('error: el texto está vacío');
        // si esta vacio, le mandamos un error 400 al pibe
        return res.status(400).json({ error: 'el texto para decodificar no puede estar vacío' });
    }

    // contamos que haya la misma cantidad de parentesis que abren y que cierran, sino esta todo mal
    const openParenCount = (texto.match(/\(/g) || []).length;
    const closeParenCount = (texto.match(/\)/g) || []).length;

    if (openParenCount !== closeParenCount) {
        console.log('error: paréntesis no balanceados');
        return res.status(400).json({ error: 'error de sintaxis. el número de paréntesis no coincide' });
    }

    //  convertimos el string en un array de letras
    const charArray = texto.split('');

    // usamos el reduce para recorrer letra por letra y armar el choclo final
    const decodedObject = charArray.reduce((accumulator, currentChar) => {
        
        // si el caracter es un parentesis que abre, cambiamos la banderita 'inparen' a true
        if (currentChar === '(') {
            accumulator.inParen = true;
        // si es uno que cierra, la banderita la ponemos en false
        } else if (currentChar === ')') {
            accumulator.inParen = false;
            // y aca damos vuelta el buffer con reverse y lo sumamos al resultado final
            accumulator.finalString += accumulator.buffer.reverse().join('');
            // vaciamos el buffer para lo que siga
            accumulator.buffer = [];
        // si la banderita 'inparen' esta en true, metemos la letra en el buffer
        } else if (accumulator.inParen) {
            accumulator.buffer.push(currentChar);
        // y si no es nada de lo anterior, la letra va derecho al resultado final
        } else {
            accumulator.finalString += currentChar;
        }

        // devolvemos el acumulador para la proxima vuelta
        return accumulator;

    }, { finalString: '', buffer: [], inParen: false }); // este es el objeto que usamos para empezar, con todo limpito

    // al final de todo, el string bueno es una parte del objeto que devolvio el reduce
    const textoDecodificado = decodedObject.finalString;


    // mostramos en la consola como quedo el texto para ver si esta todo ok
    console.log('texto decodificado:', textoDecodificado);
    // y aca le mandamos la respuesta al cliente
    res.json({ resultado: textoDecodificado });
});

// y finalmente ponemos a listenear al servidor en el puerto que definimos arriba
app.listen(PORT, () => {
    console.log(`servidor corriendo en http://localhost:${PORT}`);
    console.log('lógica de decodificación actualizada para usar métodos de array');
});