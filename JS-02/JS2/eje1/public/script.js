let frutas = [];
let amigos = [];
let numeros = [];

function agregarFruta() {
  const fruta = document.getElementById("fruta").value.trim();
  if (fruta !== "") {
    frutas.push(fruta);
    document.getElementById("fruta").value = "";
    mostrarResultado();
  }
}

function agregarAmigo() {
  const amigo = document.getElementById("amigo").value.trim();
  if (amigo !== "") {
    amigos.push(amigo);
    document.getElementById("amigo").value = "";
    mostrarResultado();
  }
}

function agregarNumero() {
  const numero = parseInt(document.getElementById("numero").value.trim());
  if (!isNaN(numero)) {
    if (numeros.length === 1 && numero <= numeros[0]) {
      alert("El segundo número debe ser mayor que el primero.");
      return;
    }
    numeros.push(numero);
    document.getElementById("numero").value = "";
    mostrarResultado();
  }
}

document.getElementById("formulario").addEventListener("submit", function (e) {
  e.preventDefault();

  if (frutas.length < 3) {
    alert("Ingresá al menos 3 frutas.");
    return;
  }

  if (amigos.length < 3) {
    alert("Ingresá al menos 3 amigos.");
    return;
  }

  if (numeros.length < 2) {
    alert("Ingresá al menos 2 números.");
    return;
  }

  fetch("/guardar", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ frutas, amigos, numeros })
  })
    .then(res => res.json())
    .then(data => {
      document.getElementById("respuesta").textContent = data.mensaje;
      mostrarResultado();
      limpiarTodo();
    });
});

function mostrarResultado() {
  const resultado = document.getElementById("resultado");
  resultado.innerHTML = `
    <h3>Frutas:</h3>
    <ul>${frutas.map(f => `<li>${f}</li>`).join('')}</ul>
    <h3>Amigos:</h3>
    <ul>${amigos.map(a => `<li>${a}</li>`).join('')}</ul>
    <h3>Números:</h3>
    <ul>${numeros.map(n => `<li>${n}</li>`).join('')}</ul>
  `;
}

function limpiarTodo() {
  frutas = [];
  amigos = [];
  numeros = [];
  document.getElementById("formulario").reset();
  setTimeout(() => {
    document.getElementById("resultado").innerHTML = "";
    document.getElementById("respuesta").innerHTML = "";
  }, 3000);
}
