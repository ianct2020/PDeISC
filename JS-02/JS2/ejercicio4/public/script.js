// 1. Quitar primer dígito
let numeros = [];

function agregarNumero() {
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

function quitarPrimerDigito() {
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
  

// 2. Mensajes de chat
let mensajes = [];

function agregarMensaje() {
  const input = document.getElementById('mensajeInput');
  const mensaje = input.value.trim();
  if (mensaje !== '') {
    mensajes.push(mensaje);
    console.log("Mensaje agregado:", mensaje);
    mostrar(mensajes, 'mensajes');
  }
  input.value = '';
}

function borrarPrimerMensaje() {
  const borrado = mensajes.shift();
  console.log("Mensaje eliminado:", borrado);
  mostrar(mensajes, 'mensajes');
}

// 3. Cola de atención
let cola = [];

function agregarCliente() {
  const input = document.getElementById('clienteInput');
  const cliente = input.value.trim();
  if (cliente !== '') {
    cola.push(cliente);
    console.log("Cliente en cola:", cliente);
    mostrar(cola, 'cola');
  }
  input.value = '';
}

function atenderCliente() {
  const atendido = cola.shift();
  console.log("Cliente atendido:", atendido);
  mostrar(cola, 'cola');
}

// Mostrar arrays en consola y en pantalla
function mostrar(arr, id) {
  document.getElementById(id).innerText = "Actual: " + arr.join(", ");
}
