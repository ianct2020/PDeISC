const crearBtn = document.getElementById('crearEnlaces');
const enlacesDiv = document.getElementById('enlaces');
const botonesDiv = document.getElementById('botonesModificar');
const resultadosDiv = document.getElementById('resultados');

let urls = [
  { texto: "Google", href: "https://www.google.com" },
  { texto: "YouTube", href: "https://www.youtube.com" },
  { texto: "Facebook", href: "https://www.facebook.com" },
  { texto: "Twitter", href: "https://www.twitter.com" },
  { texto: "Instagram", href: "https://www.instagram.com" }
];

let nuevasUrls = [
  "https://www.wikipedia.org",
  "https://www.netflix.com",
  "https://www.reddit.com",
  "https://www.github.com",
  "https://www.spotify.com"
];

crearBtn.addEventListener('click', function() {
  enlacesDiv.innerHTML = "";
  botonesDiv.innerHTML = "";
  resultadosDiv.innerHTML = "";

  urls.forEach((info, index) => {
    const enlace = document.createElement('a');
    enlace.textContent = info.texto;
    enlace.href = info.href;
    enlace.target = "_blank";
    enlace.id = `enlace${index}`;
    enlacesDiv.appendChild(enlace);

    const botonModificar = document.createElement('button');
    botonModificar.textContent = `Modificar ${info.texto}`;
    botonModificar.addEventListener('click', function() {
      modificarEnlace(index);
    });
    botonesDiv.appendChild(botonModificar);
  });
});

function modificarEnlace(index) {
  const enlace = document.getElementById(`enlace${index}`);
  if (enlace) {
    const viejoHref = enlace.href;
    let nuevaHref = nuevasUrls[index];

    // Aseguramos que tenga https://
    if (!nuevaHref.startsWith('https://')) {
      nuevaHref = 'https://' + nuevaHref;
    }

    enlace.href = nuevaHref;
    const resultado = document.createElement('div');
    resultado.innerHTML = `<strong>${enlace.textContent}</strong>: cambiado de <span style="color:#03ffea;">${viejoHref}</span> a <span style="color:#03ffea;">${nuevaHref}</span>`;
    resultadosDiv.appendChild(resultado);
  }
}
