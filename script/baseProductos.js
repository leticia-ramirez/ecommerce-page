const URL_API = 'https://fakestoreapi.com/products';

function actualizarProductos(carrito, producto){
    const indiceExistente = carrito.findIndex(item => item.id === producto.id);

    if (indiceExistente !== -1) {
        carrito[indiceExistente].cantidad++;
    } else {
        carrito.push({
            id: producto.id,
            title: producto.title,
            price: producto.price,
            image: producto.image,
            cantidad: 1
        });
    }

    return carrito;
}

function agregarAlCarrito(producto) {
    let carrito = obtenerCarrito();

    carrito = actualizarProductos(carrito, producto);

    guardarCarrito(carrito);
}

function adjuntarEventos(productos) {
    productos.forEach(producto => {
        const boton = document.getElementById(`btn-agregar-${producto.id}`);
        if (boton) {
            boton.addEventListener('click', () => {
                agregarAlCarrito(producto);
            });
        }

        const btnVer = document.getElementById(`btn-ver-${producto.id}`);
        if (btnVer) {
            btnVer.addEventListener('click', () => {
                abrirModal(producto);
            });
        }
    });
}

function abrirModal(producto) {
    document.getElementById('modalImagen').src = producto.image;
    document.getElementById('modalImagen').alt = producto.title;
    document.getElementById('modalTitulo').textContent = producto.title;
    document.getElementById('modalDescripcion').textContent = producto.description;
    document.getElementById('modalPrecio').textContent = `$${producto.price.toFixed(2)}`;

    document.getElementById('overlayModal').classList.add('visible');
}

function cerrarModal() {
    document.getElementById('overlayModal').classList.remove('visible');
}

function actualizarOverlay(){
    const btnCerrar = document.getElementById('btnCerrarModal');
    if (btnCerrar) btnCerrar.addEventListener('click', cerrarModal);

    const overlay = document.getElementById('overlayModal');
    if (overlay) {
        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) {
                cerrarModal();
            }
        });
    }
}

function mapearProductosHTML(productos) {
    return productos.map(producto => productoHTML(producto)).join('');
}

const productoHTML = (producto) => {
    return `
            <div class="card">
                <img src="${producto.image}" alt="${producto.title}">
                <div class="producto-descripcion">
                    <span>${producto.category}</span>
                    <h5>${producto.title}</h5>
                    <h4 class= "text-center">$${producto.price.toFixed(2)}</h4>
                </div>
                <a id="btn-ver-${producto.id}" class="ver-descripcion" style="cursor: pointer;">
                    Ver descripción
                </a>
                <a id="btn-agregar-${producto.id}" class="carrito" style="cursor: pointer;">
                    <i class="fal fa-shopping-cart"></i> Agregar
                </a>
            </div>
            `;
}
    