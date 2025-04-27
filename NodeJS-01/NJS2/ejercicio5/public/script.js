const contenedor = document.getElementById('contenedor');

function agregarParrafo() {
  contenedor.innerHTML += `<p style="color:#03ffea;">Este es un párrafo agregado dinámicamente usando innerHTML.</p>`;
}

function agregarImagen() {
  contenedor.innerHTML += `<img src="https://via.placeholder.com/150" alt="Imagen dinámica" style="margin:10px;">`;
}

function agregarLista() {
  contenedor.innerHTML += `
    <ul style="list-style:none; padding:0;">
      <li style="color:#03ffea;">Item 1</li>
      <li style="color:#03ffea;">Item 2</li>
      <li style="color:#03ffea;">Item 3</li>
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
        <td>Ian</td><td>22</td>
      </tr>
      <tr>
        <td>Juan</td><td>25</td>
      </tr>
    </table>
  `;
}

function agregarVideo() {
  contenedor.innerHTML += `
    <iframe width="300" height="200" src="https://www.youtube.com/embed/dQw4w9WgXcQ" 
    frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
    allowfullscreen style="margin-top:10px;"></iframe>
  `;
}
