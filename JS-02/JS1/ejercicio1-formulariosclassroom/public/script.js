document.getElementById('formulario').addEventListener('submit', async function(event) {
    event.preventDefault();
  
    const usr = document.getElementById('usr').value.trim();
    const pass = document.getElementById('pass').value.trim();
    const mensajeDiv = document.getElementById('mensaje');
    const listaUsuarios = document.getElementById('listaUsuarios');
  
    if (usr.length < 3 || pass.length < 6) {
      mensajeDiv.innerHTML = '<p class="error">Usuario mínimo 3 letras y contraseña mínimo 6.</p>';
      return;
    }
  
    try {
      const res = await fetch('/enviar', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ usr, pass })
      });
  
      const data = await res.json();
  
      if (data.success) {
        mensajeDiv.innerHTML = `<p class="success">${data.mensaje}</p>`;
        document.getElementById('usr').value = '';
        document.getElementById('pass').value = '';
  
        // Mostrar lista actualizada
        listaUsuarios.innerHTML = data.personas.map(p => `<li>${p.usr}</li>`).join('');
      } else {
        mensajeDiv.innerHTML = `<p class="error">${data.mensaje}</p>`;
      }
    } catch (error) {
      mensajeDiv.innerHTML = `<p class="error">Error de conexión con el servidor.</p>`;
    }
  });
  