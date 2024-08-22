const carrito = document.querySelector('.Carrito-compras');
const productos = document.querySelectorAll('.Producto');

function abrirCarrito() {
    const carritoVisible = carrito.classList.contains('visible'); 
    const body = document.body; 

    if (carritoVisible) { 
        carrito.classList.remove('visible'); 
        body.classList.remove('no-scroll'); 
    } else { 
        carrito.classList.add('visible'); 
        body.classList.add('no-scroll'); 
    }
}


function agregaraCarrito() {
    const button = event.currentTarget;
    const contadorSpan = button.querySelector('.contador');
    let currentCount = parseInt(contadorSpan.textContent) || 0;
    contadorSpan.textContent = currentCount + 1;

    const contadorElements = document.querySelectorAll('.contador');
    let totalSum = 0;

    contadorElements.forEach(element => {
        totalSum += parseInt(element.textContent) || 0;
    });

    const contadorPrincipal = document.querySelector('.contador-principal');
    contadorPrincipal.textContent = totalSum;
}

function cerrarCarrito() {
    carrito.classList.remove('visible');
    document.body.classList.remove('no-scroll');
    console.log('Carrito cerrado, desplazamiento habilitado');
}
