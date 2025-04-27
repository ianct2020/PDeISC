const contenedor = document.getElementById('contenedor');

function agregarParrafo() {
  contenedor.innerHTML += `<p style="color:#03ffea;">Un párrafo se define como una unidad de sentido que da forma a un texto. Es una unidad visual puesto que es fácilmente reconocible por el lector como una porción de texto constituido por un conjunto de oraciones, pero además es una unidad de sentido porque en él se expone una idea que se desarrolla de principio a fin.</p>`;
}

function agregarImagen() {
  contenedor.innerHTML += `<img src="img1.jpeg" alt="Imagen dinámica" style="margin:10px;">`;
}

function agregarLista() {
  contenedor.innerHTML += `
    <ul style="list-style:none; padding:0;">
      <li style="color:#03ffea;">ronaldo</li>
      <li style="color:#03ffea;">messi</li>
      <li style="color:#03ffea;">neymar</li>
    </ul>
  `;
}

function agregarTabla() {
  contenedor.innerHTML += `
    <table border="1" style="margin:auto; border-collapse:collapse; color:#03ffea;">
      <tr>
        <th>Nombre</th><th>Edad</th>
      </tr>
      <tr>
        <td>pedro</td><td>22</td>
      </tr>
      <tr>
        <td>juan</td><td>25</td>
      </tr>
    </table>
  `;
}

function agregarVideo() {
  contenedor.innerHTML += `
    <video width="300" height="200" controls style="margin-top:10px;">
      <source src="video.mp4" type="video/mp4">
      Tu navegador no soporta la etiqueta de video.
    </video>
  `;
}

