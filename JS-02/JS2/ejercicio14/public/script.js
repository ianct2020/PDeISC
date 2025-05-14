document.addEventListener('DOMContentLoaded', () => {

    const inputLetra = document.getElementById('inputLetra');
    const agregarLetraBtn = document.getElementById('agregarLetra');
    const reiniciarLetrasBtn = document.getElementById('reiniciarLetras');
    const mostrarLetrasBtn = document.getElementById('mostrarLetras');
    const caracteresIngresadosSpan = document.getElementById('caracteresIngresados');
    const caracteresInvertidosSpan = document.getElementById('caracteresInvertidos');
    const formLetras = document.getElementById('formLetras');
    let letras = [];

    agregarLetraBtn.addEventListener('click', () => { // agregar letra
        if (formLetras.checkValidity()) {
            const letra = inputLetra.value;
            letras.push(letra);
            console.log('Letra agregada:', letra);
            console.log('Array de letras:', letras);
            caracteresIngresadosSpan.textContent = letras.join('');
            inputLetra.value = '';
        }
    });

    reiniciarLetrasBtn.addEventListener('click', () => { // formulario reiniciar
        console.log('Reiniciando array de letras. Anterior:', letras);
        letras = [];
        caracteresIngresadosSpan.textContent = '';
        caracteresInvertidosSpan.textContent = '';
        console.log('Array de letras reiniciado:', letras);
    });

    mostrarLetrasBtn.addEventListener('click', () => { //mostrarlo
        const letrasInvertidas = [...letras].reverse();
        console.log('Array de letras original:', letras);
        console.log('Array de letras invertido:', letrasInvertidas);
        caracteresInvertidosSpan.textContent = letrasInvertidas.join('');
    });

   
    const inputNumero = document.getElementById('inputNumero');
    const agregarNumeroBtn = document.getElementById('agregarNumero');
    const reiniciarNumerosBtn = document.getElementById('reiniciarNumeros');
    const mostrarNumerosBtn = document.getElementById('mostrarNumeros');
    const numerosIngresadosSpan = document.getElementById('numerosIngresados');
    const numerosInvertidosSpan = document.getElementById('numerosInvertidos');
    const formNumeros = document.getElementById('formNumeros');
    let numeros = [];

    agregarNumeroBtn.addEventListener('click', () => { //agregar numero
        if (formNumeros.checkValidity()) {
            const numero = inputNumero.value;
            numeros.push(numero);
            console.log('Número agregado:', numero);
            console.log('Array de números:', numeros);
            numerosIngresadosSpan.textContent = numeros.join('');
            inputNumero.value = '';
        }
    });

    reiniciarNumerosBtn.addEventListener('click', () => { //reiniciar form
        console.log('Reiniciando array de números. Anterior:', numeros);
        numeros = [];
        numerosIngresadosSpan.textContent = '';
        numerosInvertidosSpan.textContent = '';
        console.log('Array de números reiniciado:', numeros);
    });

    mostrarNumerosBtn.addEventListener('click', () => { // mostrar resultados
        const numerosInvertidos = [...numeros].reverse();
        console.log('Array de números original:', numeros);
        console.log('Array de números invertido:', numerosInvertidos);
        numerosInvertidosSpan.textContent = numerosInvertidos.join('');
    });

    
    const inputText = document.getElementById('inputText');
    const invertirTextoBtn = document.getElementById('invertirTextoBtn');
    const textoOriginalSpan = document.getElementById('textoOriginal');
    const textoInvertidoSpan = document.getElementById('textoInvertido');
    const formTexto = document.getElementById('formTexto');

    invertirTextoBtn.addEventListener('click', () => { // invertir
        if (formTexto.checkValidity()) {
            const texto = inputText.value;
            textoOriginalSpan.textContent = texto;
            const arrayTexto = texto.split('');
            const arrayTextoInvertido = arrayTexto.reverse();
            const textoInvertido = arrayTextoInvertido.join('');
            textoInvertidoSpan.textContent = textoInvertido;
            console.log('Texto original:', texto);
            console.log('Array de texto:', arrayTexto);
            console.log('Array de texto invertido:', arrayTextoInvertido);
            console.log('Texto invertido:', textoInvertido);
            formTexto.reset();
        }
    });
});