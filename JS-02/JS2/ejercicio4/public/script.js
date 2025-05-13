
let numeros = [];

function agregarNumero() { //agregar el numero
    const input = document.getElementById('numeroInput');
    const valor = input.value.trim();
    if (valor.length >= 2 && !isNaN(valor)) {
        numeros.push(valor);
        console.log("Número agregado:", valor);
        mostrar(numeros, 'numeros');
    } else {
        alert("Ingresá un número con al menos 2 dígitos.");
    }
    input.value = '';
}

function quitarPrimerDigito() { //eliminar
        const resultado = numeros.map(num => {
            if (num.length > 1) {
                const borrado = num[0];
                const nuevo = num.slice(1);
                console.log(`Se borró el dígito '${borrado}' de ${num}, quedó: ${nuevo}`);
                return nuevo;
            } else {
                console.log(`No se borró nada de ${num} (solo tiene un dígito)`);
                return num;
            }
        });
        numeros = resultado;
        mostrar(numeros, 'numeros');
    }
    


let mensajes = [];

function agregarMensaje() { //para el mensaje que sale
    const input = document.getElementById('mensajeInput');
    const mensaje = input.value.trim();
    if (mensaje !== '') {
        mensajes.push(mensaje);
        console.log("Mensaje agregado:", mensaje);
        mostrar(mensajes, 'mensajes');
    }
    input.value = '';
}

function borrarPrimerMensaje() { //borrarlo
    const borrado = mensajes.shift();
    console.log("Mensaje eliminado:", borrado);
    mostrar(mensajes, 'mensajes');
}


let cola = [];

function agregarCliente() { //para agreagr cliente
    const input = document.getElementById('clienteInput');
    const cliente = input.value.trim();
    if (cliente !== '') {
        cola.push(cliente);
        console.log("Cliente en cola:", cliente);
        mostrar(cola, 'cola');
    }
    input.value = '';
}

function atenderCliente() { //marcarlo como atendido
    const atendido = cola.shift();
    console.log("Cliente atendido:", atendido);
    mostrar(cola, 'cola');
}


function mostrar(arr, id) {
    document.getElementById(id).innerText = "Actual: " + arr.join(", ");
}