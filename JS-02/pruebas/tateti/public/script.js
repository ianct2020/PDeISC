const form = document.getElementById('formulario');
const areaJuego = document.getElementById('area-juego');
const tablero = document.getElementById('tablero');
const turnoTexto = document.getElementById('turno');
const resultado = document.getElementById('resultado');
const botonReiniciar = document.getElementById('boton-reiniciar');
const botonMenu = document.getElementById('boton-menu');
const botonPcInicia = document.getElementById('boton-pc-inicia');

let celdas = [];
let tableroEstado = Array(9).fill('');
let jugadorActual = 'X';
let modo = 'pvp';
let jugando = true;

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const seleccion = form.modo.value;
  modo = seleccion;
  jugadorActual = 'X';
  form.style.display = 'none';
  areaJuego.style.display = 'block';
  iniciarJuego();
});

function iniciarJuego(pcInicia = false) {
  tablero.innerHTML = '';
  tableroEstado = Array(9).fill('');
  jugadorActual = 'X';
  resultado.textContent = '';
  jugando = true;
  for (let i = 0; i < 9; i++) {
    const celda = document.createElement('div');
    celda.classList.add('celda');
    celda.dataset.index = i;
    celda.addEventListener('click', manejarTurno);
    tablero.appendChild(celda);
  }
  celdas = document.querySelectorAll('.celda');
  actualizarTurno();

  if (modo === 'pvc' && pcInicia) {
    setTimeout(turnoPC, 500);
  }
}

function manejarTurno(e) {
  const index = e.target.dataset.index;
  if (!jugando || tableroEstado[index] !== '') return;
  hacerMovimiento(index, jugadorActual);
  if (verificarGanador()) return;
  cambiarTurno();
  if (modo === 'pvc' && jugadorActual === 'O') {
    setTimeout(turnoPC, 500);
  }
}

function hacerMovimiento(index, jugador) {
  tableroEstado[index] = jugador;
  celdas[index].textContent = jugador;
}

function cambiarTurno() {
  jugadorActual = jugadorActual === 'X' ? 'O' : 'X';
  actualizarTurno();
}

function actualizarTurno() {
  turnoTexto.textContent = `Turno de ${jugadorActual}`;
}

function verificarGanador() {
  const combinaciones = [
    [0,1,2],[3,4,5],[6,7,8],
    [0,3,6],[1,4,7],[2,5,8],
    [0,4,8],[2,4,6]
  ];
  for (const [a,b,c] of combinaciones) {
    if (
      tableroEstado[a] &&
      tableroEstado[a] === tableroEstado[b] &&
      tableroEstado[a] === tableroEstado[c]
    ) {
      resultado.textContent = `¡Jugador ${tableroEstado[a]} ganó!`;
      jugando = false;
      return true;
    }
  }
  if (!tableroEstado.includes('')) {
    resultado.textContent = '¡Empate!';
    jugando = false;
    return true;
  }
  return false;
}

function turnoPC() {
  if (!jugando) return;

  // Lógica simple con if/else
  // Prioridad: ganar > bloquear > aleatorio
  const ganarBloquear = (letra) => {
    const combinaciones = [
      [0,1,2],[3,4,5],[6,7,8],
      [0,3,6],[1,4,7],[2,5,8],
      [0,4,8],[2,4,6]
    ];
    for (const [a,b,c] of combinaciones) {
      const valores = [tableroEstado[a], tableroEstado[b], tableroEstado[c]];
      const vacios = [a,b,c].filter(i => tableroEstado[i] === '');
      const cantidad = valores.filter(v => v === letra).length;
      if (cantidad === 2 && vacios.length === 1) {
        return vacios[0];
      }
    }
    return null;
  };

  let index = ganarBloquear('O');
  if (index === null) index = ganarBloquear('X');
  if (index === null) {
    const disponibles = tableroEstado.map((v, i) => v === '' ? i : null).filter(i => i !== null);
    index = disponibles[Math.floor(Math.random() * disponibles.length)];
  }

  hacerMovimiento(index, 'O');
  if (!verificarGanador()) cambiarTurno();
}

// Botones
botonReiniciar.addEventListener('click', () => {
  iniciarJuego(modo === 'pvc' && jugadorActual === 'O');
});

botonMenu.addEventListener('click', () => {
  form.style.display = 'block';
  areaJuego.style.display = 'none';
});

botonPcInicia.addEventListener('click', () => {
  jugadorActual = 'O';
  iniciarJuego(true);
});