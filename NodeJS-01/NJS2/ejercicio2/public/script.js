let h1Creado = false;
const textoOriginal = "Hola DOM";
const colorOriginal = "white";
const imagenOriginal = "img1.jpeg";
const imagenAlternativa = "img2.jpeg";
const tamañoOriginal = 300;
const tamañoAlternativo = 150;

const boton = document.getElementById("botonUnico");

boton.addEventListener("click", agregarH1);
boton.addEventListener("dblclick", cambiarTexto);
boton.addEventListener("mouseenter", cambiarColor);
boton.addEventListener("contextmenu", cambiarImagen); // Botón derecho

function agregarH1() {
  if (!h1Creado) {
    const h1 = document.createElement("h1");
    h1.textContent = textoOriginal;
    h1.id = "h1dinamico";
    h1.style.color = "white";
    document.getElementById("contenedor").appendChild(h1);
    h1Creado = true;
  }
}

function cambiarTexto() {
  const h1 = document.getElementById("h1dinamico");
  if (h1) {
    h1.textContent = "Chau DOM";
  }
}

function cambiarColor() {
  const h1 = document.getElementById("h1dinamico");
  if (h1) {
    h1.style.color = getRandomColor();
  }
}

function cambiarImagen(event) {
  event.preventDefault(); // Evita menú del click derecho
  const img = document.getElementById("imagen");
  img.style.display = "block";
  img.src = (img.src.includes(imagenOriginal)) ? imagenAlternativa : imagenOriginal;
}

function cambiarTamaño() {
  const img = document.getElementById("imagen");
  if (img.style.display === "block") {
    img.style.maxWidth = (img.style.maxWidth === tamañoOriginal + "px") ? tamañoAlternativo + "px" : tamañoOriginal + "px";
  }
}

function getRandomColor() {
  const letras = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letras[Math.floor(Math.random() * 16)];
  }
  return color;
}

let teclaGPresionada = false;

document.addEventListener('keydown', function(event) {
  if (event.key.toLowerCase() === 'g') {
    teclaGPresionada = true;
  }
});

document.addEventListener('keyup', function(event) {
  if (event.key.toLowerCase() === 'g') {
    teclaGPresionada = false;
  }
});

boton.addEventListener('click', function() {
  if (teclaGPresionada) {
    cambiarTamaño();
  }
});

let intervalE;
let coloresFondo = ["#00aaff", "#00ccff", "#3399ff", "#66b3ff", "#99ccff", "#c2e0ff"]; // Array de tonos celestes y azules
let colorIndex = 0;

document.addEventListener('keydown', function(event) {
  if (event.key.toLowerCase() === 'e') {
    // Solo iniciar el intervalo si no está ya activo
    if (!intervalE) {
      intervalE = setInterval(function() {
        document.body.style.backgroundColor = coloresFondo[colorIndex];
        colorIndex = (colorIndex + 1) % coloresFondo.length; // Esto asegura que ciclen los colores
      }, 500); // Cambiar cada 500 ms
    }
  }
});

document.addEventListener('keyup', function(event) {
  if (event.key.toLowerCase() === 'e') {
    // Detener el intervalo cuando se suelte la tecla
    clearInterval(intervalE);
    intervalE = null; // Resetear el intervalo para poder empezar de nuevo al presionar E
  }
});
