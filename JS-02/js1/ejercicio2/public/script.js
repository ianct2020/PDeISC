const animales = [];
const compras = [];

function agregarAnimal() { //para agregar animal
    const input = document.getElementById("animalInput");
    const valor = input.value.trim();
    if (valor) {
        animales.push(valor);
        input.value = "";
        mostrarResultado();
    }
}

function eliminarAnimal() { //borrarlo
    if (animales.length > 0) {
        const eliminado = animales.pop();
        alert("Animal eliminado: " + eliminado);
        mostrarResultado();
        
    }
}

function agregarCompra() {//agregar compra
    const input = document.getElementById("compraInput");
    const valor = input.value.trim();
    if (valor) {
        compras.push(valor);
        input.value = "";
        mostrarResultado();
    }
}

function eliminarCompra() { //para eliminar
    if (compras.length > 0) {
        const eliminado = compras.pop();
        alert("Producto eliminado: " + eliminado);
        mostrarResultado();
        
    }
}

function vaciarTodo() { //vaciar formulario
    while (animales.length > 0) {
        animales.pop();
    }
    while (compras.length > 0) {
        compras.pop();
    }
    alert("Arrays vaciados");
    mostrarResultado();
    
}

function mostrarResultado() { //mostrar
    document.getElementById("resultado").textContent =
        "Animales: " + JSON.stringify(animales) + "\n" +
        "Compras: " + JSON.stringify(compras);
}

function mostrarTodoEnConsola() { //mostrar
    console.log("Animales:", animales);
    console.log("Compras:", compras);
}

