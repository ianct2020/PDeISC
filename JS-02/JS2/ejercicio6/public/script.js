document.addEventListener('DOMContentLoaded', () => {
    console.log('Ejemplos de slice() con formularios detallados');

    // 1. Copiar los primeros 3 números
    const formPrimerosTresNumeros = document.getElementById('formPrimerosTresNumeros');
    const resultadoPrimerosTresNumerosDiv = document.getElementById('resultadoPrimerosTresNumeros');

    formPrimerosTresNumeros.addEventListener('submit', (event) => {
        event.preventDefault();
        const num1 = document.getElementById('numero1').value;
        const num2 = document.getElementById('numero2').value;
        const num3 = document.getElementById('numero3').value;
        const num4 = document.getElementById('numero4').value;

        if (!isNaN(num1) && !isNaN(num2) && !isNaN(num3) && !isNaN(num4)) {
            const numeros = [Number(num1), Number(num2), Number(num3), Number(num4)];
            const primerosTres = numeros.slice(0, 3);
            resultadoPrimerosTresNumerosDiv.innerHTML = `<h3>Números copiados:</h3> <p>[${primerosTres}]</p>`;
            console.log('Array original de números:', numeros);
            console.log('Primeros 3 números copiados:', primerosTres);
        } else {
            resultadoPrimerosTresNumerosDiv.textContent = 'Por favor, ingrese solo números.';
            console.log('Error: Se intentó ingresar letras en el formulario de números.');
        }
        formPrimerosTresNumeros.reset();
    });

    // 2. Copia parcial de películas
    const formCopiaParcialPeliculas = document.getElementById('formCopiaParcialPeliculas');
    const resultadoCopiaParcialPeliculasDiv = document.getElementById('resultadoCopiaParcialPeliculas');

    formCopiaParcialPeliculas.addEventListener('submit', (event) => {
        event.preventDefault();
        const pelicula1 = document.getElementById('pelicula1').value.trim();
        const pelicula2 = document.getElementById('pelicula2').value.trim();
        const pelicula3 = document.getElementById('pelicula3').value.trim();
        const pelicula4 = document.getElementById('pelicula4').value.trim();

        const peliculas = [pelicula1, pelicula2, pelicula3, pelicula4];
        const copiaParcial = peliculas.slice(1, 4); // Recuerda que el índice final no se incluye (posición 2 es índice 1, posición 4 es índice 3)
        resultadoCopiaParcialPeliculasDiv.innerHTML = `<h3>Copia parcial:</h3> <p>[${copiaParcial}]</p>`;
        console.log('Array original de películas:', peliculas);
        console.log('Copia parcial de películas (posición 2 a 4):', copiaParcial);
        formCopiaParcialPeliculas.reset();
    });

    // 3. Últimos 3 elementos de cosas ricas
    const formUltimosTresRicos = document.getElementById('formUltimosTresRicos');
    const resultadoUltimosTresRicosDiv = document.getElementById('resultadoUltimosTresRicos');

    formUltimosTresRicos.addEventListener('submit', (event) => {
        event.preventDefault();
        const rico1 = document.getElementById('rico1').value.trim();
        const rico2 = document.getElementById('rico2').value.trim();
        const rico3 = document.getElementById('rico3').value.trim();
        const rico4 = document.getElementById('rico4').value.trim();
        const rico5 = document.getElementById('rico5').value.trim();

        const cosasRicas = [rico1, rico2, rico3, rico4, rico5];
        const ultimosTres = cosasRicas.slice(-3);
        resultadoUltimosTresRicosDiv.innerHTML = `<h3>Nuevo array con los últimos 3:</h3> <p>[${ultimosTres}]</p>`;
        console.log('Array original de cosas ricas:', cosasRicas);
        console.log('Últimos 3 elementos:', ultimosTres);
        formUltimosTresRicos.reset();
    });
});