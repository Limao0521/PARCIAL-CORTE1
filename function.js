const carrito = document.querySelector('.Carrito-compras');
function abrirCarrito() {
    const carritoVisible = carrito.classList.contains('visible'); // 2
    const body = document.body; // 3

    if (carritoVisible) { // 4
        carrito.classList.remove('visible'); // 5
        body.classList.remove('no-scroll'); // 6
    } else { // 7
        carrito.classList.add('visible'); // 8
        body.classList.add('no-scroll'); // 9
    }
}


function agregaraCarrito(){
    const button = event.currentTarget;
    const contadorSpan = button.querySelector('.contador');
    let currentCount = parseInt(contadorSpan.textContent) || 0;
    contadorSpan.textContent = currentCount + 1;
    contadorSpan.classList.remove('oculto_contador');

    const contadorElements = document.querySelectorAll('.contador');
    let totalSum = 0;

    contadorElements.forEach(element => {
         totalSum += parseInt(element.textContent) || 0;
    });

    const contadorPrincipal = document.querySelector('.contador-principal');
    contadorPrincipal.textContent = totalSum;
}
function vaciar_carrito() {
    // Selecciona todos los elementos con clase 'contador'
    const contadorElements = document.querySelectorAll('.contador');
    
    // Oculta los contadores
    contadorElements.forEach(element => {
      element.classList.add('oculto_contador');
      element.textContent = "";
    });
    
    // Actualiza el contador principal
    const contadorPrincipal = document.querySelector('.contador-principal');
    contadorPrincipal.textContent = "";
  }

function cerrarCarrito() {
    carrito.classList.remove('visible');
    document.body.classList.remove('no-scroll');
    console.log('Carrito cerrado, desplazamiento habilitado');
}
