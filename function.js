
function abrirCarrito() {
    const carritoElement = document.querySelector('.Carrito-compras');
    carritoElement.style.display = carritoElement.style.display === 'none' ? 'block' : 'none';
}

function agregaraCarrito(){
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
