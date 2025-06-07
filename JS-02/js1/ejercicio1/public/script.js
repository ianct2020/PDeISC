console.log("Sí.");

let frutas = [];
let amigos = [];
let numeros = [];

console.log("Script cargado. Arrays inicializados:", { frutas, amigos, numeros });

function agregarFruta() { //agregar fruta
  const frutaInput = document.getElementById("fruta");
  const fruta = frutaInput.value.trim();
  console.log("Intentando agregar fruta:", fruta);
  if (fruta !== "") {
    frutas.push(fruta);
    console.log("Fruta agregada. Array de frutas:", frutas);
    frutaInput.value = "";
    frutaInput.focus();
    mostrarResultado();
  } else {
    console.log("Intento de agregar fruta vacía.");
  }
}

function agregarAmigo() { //agregar amigo
  const amigoInput = document.getElementById("amigo");
  const amigo = amigoInput.value.trim();
  console.log("Intentando agregar amigo:", amigo);
  if (amigo !== "") {
    amigos.push(amigo);
    console.log("Amigo agregado. Array de amigos:", amigos);
    amigoInput.value = "";
    amigoInput.focus();
    mostrarResultado();
  } else {
    console.log("Intento de agregar amigo vacío.");
  }
}

function agregarNumero() { //agregar numero
  const numeroInput = document.getElementById("numero");
  const numero = parseInt(numeroInput.value.trim());
  console.log("Intentando agregar número (valor input):", numeroInput.value);
  if (!isNaN(numero)) {
    if (numeros.length === 1 && numero <= numeros[0]) {
      alert("El segundo número debe ser mayor que el primero.");
      console.warn("Validación fallida: el segundo número debe ser mayor que el primero. Actual:", numeros[0], "Nuevo:", numero);
      return;
    }
    numeros.push(numero);
    console.log("Número agregado. Array de números:", numeros);
    numeroInput.value = "";
    numeroInput.focus();
    mostrarResultado();
  } else {
    console.log("Intento de agregar número no válido:", numeroInput.value);
  }
}

document.getElementById("formulario").addEventListener("submit", function (e) { //check
  e.preventDefault();
  console.log("Evento submit del formulario capturado.");

  console.log("Validando datos antes de enviar:");
  console.log("Cantidad de frutas:", frutas.length, frutas);
  console.log("Cantidad de amigos:", amigos.length, amigos);
  console.log("Cantidad de números:", numeros.length, numeros);

  if (frutas.length < 3) { //validacion
    alert("Ingresá al menos 3 frutas.");
    console.warn("Validación fallida: se requieren al menos 3 frutas.");
    return;
  }

  if (amigos.length < 3) {
    alert("Ingresá al menos 3 amigos.");
    console.warn("Validación fallida: se requieren al menos 3 amigos.");
    return;
  }

  if (numeros.length < 2) { //validacion
    alert("Ingresá al menos 2 números.");
    console.warn("Validación fallida: se requieren al menos 2 números.");
    return;
  }

  const datosParaEnviar = { frutas, amigos, numeros }; 
  console.log("Datos listos para enviar al servidor:", datosParaEnviar);

 
  console.log("Iniciando solicitud fetch a /guardar...");
  fetch("/guardar", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(datosParaEnviar)
  })
    .then(res => { 
      console.log("Respuesta recibida del servidor (objeto Response):", res);
      if (!res.ok) {
      
        console.error("Respuesta del servidor no fue OK. Estado:", res.status, res.statusText);
     
        return res.text().then(text => {
          throw new Error(`Error del servidor: ${res.status} ${res.statusText}. Detalles: ${text}`);
        });
      }
      return res.json(); 
    })
    .then(data => {
      console.log("Datos JSON recibidos del servidor:", data);
      document.getElementById("respuesta").textContent = data.mensaje || "Respuesta recibida (sin mensaje específico)";
      mostrarResultado(); 
      limpiarTodo(); 
    })
    .catch(error => {
    
     
      console.error("Error en la solicitud fetch o al procesar la respuesta:", error);
      document.getElementById("respuesta").textContent = "Error al enviar datos. Revisá la consola para más detalles.";
     
    });
});

function mostrarResultado() { //mostrar todo
  const resultadoDiv = document.getElementById("resultado");
  console.log("Actualizando la sección 'resultado' en el DOM.");
  console.log("Estado actual de los datos a mostrar:", { frutas, amigos, numeros });
  resultadoDiv.innerHTML = `
    <h3>Frutas:</h3>
    <ul>${frutas.map(f => `<li>${f}</li>`).join('')}</ul>
    <h3>Amigos:</h3>
    <ul>${amigos.map(a => `<li>${a}</li>`).join('')}</ul>
    <h3>Números:</h3>
    <ul>${numeros.map(n => `<li>${n}</li>`).join('')}</ul>
  `;
  console.log("Sección 'resultado' actualizada.");
}

function limpiarTodo() { //limpiar formulario
  console.log("Iniciando limpieza de datos y formulario...");
  console.log("Datos antes de limpiar:", { frutas, amigos, numeros });
  frutas = [];
  amigos = [];
  numeros = [];
  console.log("Arrays limpiados:", { frutas, amigos, numeros });
  document.getElementById("formulario").reset();
  console.log("Formulario reseteado.");

  setTimeout(() => {
    console.log("Limpiando contenido de 'resultado' y 'respuesta' del DOM después de 3 segundos.");
    document.getElementById("resultado").innerHTML = "";
    document.getElementById("respuesta").innerHTML = "";
    console.log("'resultado' y 'respuesta' limpiados del DOM.");
  }, 3000);
}