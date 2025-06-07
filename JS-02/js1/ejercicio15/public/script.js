document.getElementById('formulario').addEventListener('submit', async function (e) {
    e.preventDefault();
    const mensaje = document.getElementById('mensaje').value;
  
    const res = await fetch('/decodificar', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ mensaje })
    });
  
    const data = await res.json();
    console.log("Mensaje decodificado:", data.resultado);
    document.getElementById('resultado').innerText = data.resultado;
  });
  //invertir