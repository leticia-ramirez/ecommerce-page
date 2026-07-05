document.addEventListener('DOMContentLoaded', () => {
    const bar = document.getElementById('bar');
    const close = document.getElementById('close');
    const navbar = document.getElementById('navbar');
    const carritoOverlay = document.getElementById('carrito-overlay')

    if (bar) bar.addEventListener('click', () => {
        navbar.classList.add('active');
        carritoOverlay.classList.add('active');
    });

    if (close) close.addEventListener('click', () => {
        navbar.classList.remove('active');
        carritoOverlay.classList.remove('active');
    }) 

    const carritoSidebar = document.getElementById('carrito-lateral');
    const botonesAbrir = document.querySelectorAll('.btn-abrir-carrito');
    const botonCerrar = document.getElementById('close-carrito');
    
    botonesAbrir.forEach(boton => {
        boton.addEventListener('click', (e) => {
            e.preventDefault();
            actualizarCarrito(); 
            carritoSidebar.classList.add('active');
            carritoOverlay.classList.add('active');
        });
    });

    if (botonCerrar) {
        botonCerrar.addEventListener('click', () => {
            carritoSidebar.classList.remove('active');
            carritoOverlay.classList.remove('active');
        });
    }

    if (carritoOverlay) {
        carritoOverlay.addEventListener('click', () => {
            carritoSidebar.classList.remove('active');
            carritoOverlay.classList.remove('active');
            navbar.classList.remove('active');
        });
    }
});

function actualizarCarrito() {
    const contenedorItems = document.getElementById('carrito-items-container');
    const contenedorTotal = document.getElementById('carrito-total');

    let carrito = JSON.parse(localStorage.getItem('carritoDeCompras')) || [];

    if (carrito.length === 0) {
        contenedorItems.innerHTML = '<p style="text-align:center; color:#777;">Tu carrito esta vacio.</p>';
        contenedorTotal.textContent = '$0.00';
        return;
    }

    let total = 0;
    const itemsHTML = carrito.map(producto => {
        total += producto.price * producto.cantidad;
        return construccionItem(producto);
    });

    contenedorItems.innerHTML = itemsHTML.join('');
    contenedorTotal.textContent = `$${total.toFixed(2)}`;

    adjuntarEventosCarritoLateral();
}

function construccionItem(producto){
        return `
            <div class="carrito-item">
                <button class="eliminar buttonCantidad" data-id="${producto.id}"></button>
                <img src="${producto.image}" alt="${producto.title}">
                <div class="item-detalles">
                    <h5>${producto.title}</h5>
                    <p>${producto.cantidad} x $${producto.price.toFixed(2)}</p>
                    <div class="container-cantidad">
                        <button class="menor buttonCantidad" data-id="${producto.id}"></button>
                        <div>
                            <input type="button" class="cantidad" value="${producto.cantidad}">
                        </div>
                        <button class="mayor buttonCantidad" data-id="${producto.id}"></button>
                    </div>
                </div>
            </div>
        `;
}

function adjuntarEventosCarritoLateral() {
    let carrito = JSON.parse(localStorage.getItem('carritoDeCompras')) || [];

    document.querySelectorAll('.eliminar').forEach(boton => {
        boton.addEventListener('click', () => {
            const id = boton.dataset.id;
            carrito = carrito.filter(item => String(item.id) !== String(id));
            localStorage.setItem('carritoDeCompras', JSON.stringify(carrito));

            actualizarCarrito(); 
        });
    });

    modificarCantidadProductos(carrito);
}

function modificarCantidadProductos(carrito){
    document.querySelectorAll('.menor').forEach(boton => {
        boton.addEventListener('click', () => {
            const id = boton.dataset.id;
            const producto = carrito.find(item => String(item.id) === String(id));
            
            if (producto) {
                if (producto.cantidad > 1) {
                    producto.cantidad--;
                } else {
                    carrito = carrito.filter(item => String(item.id) !== String(id));
                }

                localStorage.setItem('carritoDeCompras', JSON.stringify(carrito));
                actualizarCarrito();
            }
        });
    });

    document.querySelectorAll('.mayor').forEach(boton => {
        boton.addEventListener('click', () => {
            const id = boton.dataset.id;
            const producto = carrito.find(item => String(item.id) === String(id));
            
            if (producto) {
                producto.cantidad++;
                localStorage.setItem('carritoDeCompras', JSON.stringify(carrito));
                actualizarCarrito();
            }
        });
    });
}

