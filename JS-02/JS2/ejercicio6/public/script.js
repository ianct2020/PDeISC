document.addEventListener('DOMContentLoaded', () => {
    console.log('Ejemplos de slice() con formularios detallados (Modificado)');

    
    const formPrimerosTresNumeros = document.getElementById('formPrimerosTresNumeros');
    const resultadoPrimerosTresNumerosDiv = document.getElementById('resultadoPrimerosTresNumeros');

    formPrimerosTresNumeros.addEventListener('submit', (event) => {  
        event.preventDefault();
        const numInputs = [
            document.getElementById('numero1').value, //obtener valores
            document.getElementById('numero2').value,
            document.getElementById('numero3').value,
            document.getElementById('numero4').value
        ];

        if (numInputs.every(num => !isNaN(num))) { //check
            const numeros = numInputs.map(Number);
            const primerosTres = numeros.slice(0, 3);
            resultadoPrimerosTresNumerosDiv.innerHTML = `<h3>Números copiados:</h3> <p class="result-text">[${primerosTres}]</p>`;
            console.log('Array original de números:', numeros);
            console.log('Primeros 3 números copiados (usando slice):', primerosTres);
        } else {
            resultadoPrimerosTresNumerosDiv.textContent = 'Por favor, ingrese solo números.';
            console.log('Error: Se intentó ingresar letras en el formulario de números.');
        }
        formPrimerosTresNumeros.reset();
    });

 
    const formCopiaParcialPeliculas = document.getElementById('formCopiaParcialPeliculas');
    const resultadoCopiaParcialPeliculasDiv = document.getElementById('resultadoCopiaParcialPeliculas');

    formCopiaParcialPeliculas.addEventListener('submit', (event) => {
        event.preventDefault();
        const peliculasInputs = [
            document.getElementById('pelicula1').value.trim(), //obtener valores
            document.getElementById('pelicula2').value.trim(),
            document.getElementById('pelicula3').value.trim(),
            document.getElementById('pelicula4').value.trim()
        ];

        const peliculas = peliculasInputs.slice(); 
        const copiaParcial = peliculas.slice(1, 4); 
        resultadoCopiaParcialPeliculasDiv.innerHTML = `<h3>Copia parcial:</h3> <p class="result-text">[${copiaParcial}]</p>`;
        console.log('Array original de películas (desde inputs):', peliculas);
        console.log('Copia parcial de películas (posición 2 a 4) (usando slice):', copiaParcial);
        formCopiaParcialPeliculas.reset();
    });

    
    const formUltimosTresRicos = document.getElementById('formUltimosTresRicos');
    const resultadoUltimosTresRicosDiv = document.getElementById('resultadoUltimosTresRicos');

    formUltimosTresRicos.addEventListener('submit', (event) => {
        event.preventDefault();
        const ricosInputs = [
            document.getElementById('rico1').value.trim(), //obtener valores
            document.getElementById('rico2').value.trim(),
            document.getElementById('rico3').value.trim(),
            document.getElementById('rico4').value.trim(),
            document.getElementById('rico5').value.trim()
        ];

        const soloLetras = ricosInputs.every(rico => /^[a-zA-Z\s]+$/.test(rico)); //solo de la a la z en mayuscula o minuscula

        if (soloLetras) {
            const cosasRicas = ricosInputs.slice(); //check
            const ultimosTres = cosasRicas.slice(-3);
            resultadoUltimosTresRicosDiv.innerHTML = `<h3>Nuevo array con los últimos 3:</h3> <p class="result-text">[${ultimosTres}]</p>`;
            console.log('Array original de cosas ricas (desde inputs):', cosasRicas);
            console.log('Últimos 3 elementos (usando slice):', ultimosTres);
        } else {
            resultadoUltimosTresRicosDiv.textContent = 'Por favor, ingrese solo letras y espacios en las cosas ricas.';
            console.log('Error: Se intentó ingresar números u otros caracteres en el formulario de cosas ricas.');
        }
        formUltimosTresRicos.reset();
    });
});