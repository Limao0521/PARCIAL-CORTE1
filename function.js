const carrito = document.querySelector('.Carrito-compras');


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

function agregarProducto(nombre, precio) {
    const contenedorCarrito = document.querySelector('.productos-carrito');

    // Buscar si el producto ya existe en el carrito
    let productoExistente = null;
    const productos = contenedorCarrito.querySelectorAll('.producto');
    productos.forEach(producto => {
        if (producto.querySelector('.nombre-producto').textContent === nombre) {
            productoExistente = producto;
        }
    });

    if (productoExistente) {
        // Producto ya existe, actualizar la cantidad y el precio
        const cantidadSpan = productoExistente.querySelector('.cantidad-producto');
        const cantidadActual = parseInt(cantidadSpan.textContent) || 0;
        const nuevoCantidad = cantidadActual + 1;
        cantidadSpan.textContent = nuevoCantidad;

        // Actualizar el precio total del producto en el carrito
        const precioSpan = productoExistente.querySelector('.precio');
        const precioTotal = nuevoCantidad * precio;
        precioSpan.textContent = `Precio: $${precioTotal}`;
    } else {
        // Producto no existe, crear un nuevo div para el producto
        const nuevoProductoDiv = document.createElement('div');
        nuevoProductoDiv.classList.add('producto');

        nuevoProductoDiv.innerHTML = `
            <h4 class="nombre-producto">${nombre}</h4>
            <span class="cantidad">
                <p>Cantidad: </p>
                <button onclick="actualizarCantidad('${nombre}', 1)">+</button>
                <span class="cantidad-producto">1</span>
                <button onclick="actualizarCantidad('${nombre}', -1)">-</button>
            </span>
            <span class="precio">Precio: $${precio}</span>
            <button class="eliminar" onclick="eliminarProducto(this.parentElement)"><span class="material-symbols-outlined">delete</span></button>
        `;

        contenedorCarrito.appendChild(nuevoProductoDiv);
    }

    // Mostrar el carrito si está vacío
    if (contenedorCarrito.children.length > 0) {
        const asideCarrito = document.querySelector('aside');
        asideCarrito.style.display = 'block';
    }

    // Actualizar contador de botones agregar
    actualizarContador(nombre);
}

function actualizarContador(nombre) {
    const botonAgregar = document.querySelector(`#${nombre.replace(/\s+/g, '-')}`); // Ajustar el ID basado en el nombre del producto
    if (!botonAgregar) return; // Si el botón no existe, salir de la función

    const contadorAgregar = botonAgregar.querySelector('.contador');
    const cantidadActual = parseInt(contadorAgregar.textContent) || 0;
    contadorAgregar.textContent = cantidadActual + 1;

    // Actualizar el contador del botón de agregar principal
    const botonAgregarPrincipal = document.querySelector('.agregar-principal'); // Asegúrate de que la clase sea correcta
    const contadorPrincipal = botonAgregarPrincipal.querySelector('.contador-principal');
    const cantidadTotal = Array.from(document.querySelectorAll('.cantidad-producto'))
                                .reduce((sum, el) => sum + (parseInt(el.textContent) || 0), 0);
    contadorPrincipal.textContent = cantidadTotal;
}

function actualizarCantidad(nombre, incremento) {
    const contenedorCarrito = document.querySelector('.productos-carrito');
    const producto = Array.from(contenedorCarrito.querySelectorAll('.producto')).find(p => p.querySelector('.nombre-producto').textContent === nombre);

    if (producto) {
        const cantidadSpan = producto.querySelector('.cantidad-producto');
        const cantidadActual = parseInt(cantidadSpan.textContent) || 0;
        const nuevaCantidad = cantidadActual + incremento;

        if (nuevaCantidad > 0) {
            cantidadSpan.textContent = nuevaCantidad;

            // Actualizar el precio total del producto en el carrito
            const precio = parseFloat(producto.querySelector('.precio').textContent.replace('Precio: $', ''));
            const precioTotal = nuevaCantidad * precio / cantidadActual;
            producto.querySelector('.precio').textContent = `Precio: $${precioTotal}`;
        } else {
            eliminarProducto(producto);
        }
    }

    // Actualizar contador del botón agregar
    actualizarContador(nombre);
}   


function modificarCantidad(cantidadSpan, cambio, precio) {
    let cantidad = parseInt(cantidadSpan.textContent);
    cantidad += cambio;
    
    if (cantidad < 1) {
        cantidad = 1;
    }

    cantidadSpan.textContent = cantidad;

    // Actualizar el precio total basado en la cantidad
    const precioTotal = precio * cantidad;
    const precioProducto = cantidadSpan.closest('.producto').querySelector('.precio');
    precioProducto.textContent = `Precio: $${precioTotal}`;
}

function eliminarProducto(productoDiv) {
    // Obtener la cantidad del producto eliminado
    const cantidadProducto = parseInt(productoDiv.querySelector('.cantidad-producto').textContent);
    
    // Obtener el nombre del producto
    const nombreProducto = productoDiv.querySelector('.nombre-producto').textContent;

    // Disminuir el contador del botón de agregar producto en el carrito
    const botonAgregar = document.getElementById(`Carpaccio-veneciano`); // Asegúrate de que el ID sea correcto
    const contadorAgregar = botonAgregar.querySelector('.contador');
    const cantidadActual = parseInt(contadorAgregar.textContent) || 0;
    contadorAgregar.textContent = Math.max(0, cantidadActual - cantidadProducto);

    // Disminuir el contador del botón de agregar principal
    const botonAgregarPrincipal = document.querySelector('.agregar-principal'); // Asegúrate de que la clase sea correcta
    const contadorPrincipal = botonAgregarPrincipal.querySelector('.contador-principal');
    const cantidadPrincipalActual = parseInt(contadorPrincipal.textContent) || 0;
    contadorPrincipal.textContent = Math.max(0, cantidadPrincipalActual - cantidadProducto);

    // Eliminar el producto del contenedor
    productoDiv.remove();

    // Ocultar el contenedor del carrito si está vacío
    const contenedorCarrito = document.querySelector('.productos-carrito');
    if (contenedorCarrito.children.length === 0) {
        const asideCarrito = document.querySelector('aside');
        asideCarrito.style.display = 'none';
    }
}


function agregaraCarrito() {
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
