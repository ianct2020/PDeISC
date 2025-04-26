let h1Creado = false;
const textoOriginal = "Hola DOM";
const colorOriginal = "#000000";
const imagenOriginal = "img1.jpeg";
const imagenAlternativa = "img2.jpeg";
const tamañoOriginal = 300;
const tamañoAlternativo = 150;

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

function eliminarH1() {
  const h1 = document.getElementById("h1dinamico");
  if (h1) {
    h1.remove();
    h1Creado = false;
  }
}

function cambiarTexto() {
  const h1 = document.getElementById("h1dinamico");
  if (h1) {
    h1.textContent = "Chau DOM";
  }
}

function restaurarTexto() {
  const h1 = document.getElementById("h1dinamico");
  if (h1) {
    h1.textContent = textoOriginal;
  }
}

function cambiarColor() {
  const h1 = document.getElementById("h1dinamico");
  if (h1) {
    h1.style.color = getRandomColor();
  }
}

function restaurarColor() {
  const h1 = document.getElementById("h1dinamico");
  if (h1) {
    h1.style.color = colorOriginal;
  }
}

function agregarImagen() {
  const img = document.getElementById("imagen");
  img.style.display = "block";
  img.src = imagenOriginal;
  img.style.maxWidth = tamañoOriginal + "px";
}

function quitarImagen() {
  const img = document.getElementById("imagen");
  img.style.display = "none";
}

function cambiarImagen() {
  const img = document.getElementById("imagen");
  if (img.style.display === "block") {
    img.src = (img.src.includes(imagenOriginal)) ? imagenAlternativa : imagenOriginal;
  }
}

function restaurarImagen() {
  const img = document.getElementById("imagen");
  if (img.style.display === "block") {
    img.src = imagenOriginal;
  }
}

function cambiarTamaño() {
  const img = document.getElementById("imagen");
  if (img.style.display === "block") {
    img.style.maxWidth = (img.style.maxWidth === tamañoOriginal + "px") ? tamañoAlternativo + "px" : tamañoOriginal + "px";
  }
}

function restaurarTamaño() {
  const img = document.getElementById("imagen");
  if (img.style.display === "block") {
    img.style.maxWidth = tamañoOriginal + "px";
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
