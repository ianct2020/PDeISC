const animales = [];
const compras = [];

function agregarAnimal() {
  const input = document.getElementById("animalInput");
  const valor = input.value.trim();
  if (valor) {
    animales.push(valor);
    input.value = "";
    mostrarResultado();
  }
}

function eliminarAnimal() {
  if (animales.length > 0) {
    const eliminado = animales.pop();
    alert("Animal eliminado: " + eliminado);
    mostrarResultado();
    guardarDatos();
  }
}

function agregarCompra() {
  const input = document.getElementById("compraInput");
  const valor = input.value.trim();
  if (valor) {
    compras.push(valor);
    input.value = "";
    mostrarResultado();
  }
}

function eliminarCompra() {
  if (compras.length > 0) {
    const eliminado = compras.pop();
    alert("Producto eliminado: " + eliminado);
    mostrarResultado();
    guardarDatos();
  }
}

function vaciarTodo() {
  while (animales.length > 0) {
    animales.pop();
  }
  while (compras.length > 0) {
    compras.pop();
  }
  alert("Arrays vaciados");
  mostrarResultado();
  guardarDatos();
}

function mostrarResultado() {
  document.getElementById("resultado").textContent =
    "Animales: " + JSON.stringify(animales) + "\n" +
    "Compras: " + JSON.stringify(compras);
}

function guardarDatos() {
  fetch("/guardar", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ animales, compras })
  })
    .then(res => res.json())
    .then(data => {
      console.log("Guardado:", data);
    });
}

function mostrarTodoEnConsola() {
  console.log("Animales:", animales);
  console.log("Compras:", compras);
}
