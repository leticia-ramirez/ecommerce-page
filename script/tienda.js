const contenedor = document.querySelector('.productos-container');
let productosGlobales = [];

function cargarProductos() {
    const parametrosURL = new URLSearchParams(window.location.search);
    const categoriaSeleccionada = parametrosURL.get('category');
    
    let urlDestino = "https://fakestoreapi.com/products";
    if (categoriaSeleccionada) {
        urlDestino = `https://fakestoreapi.com/products/category/${encodeURIComponent(categoriaSeleccionada)}`;
    }

    fetch(urlDestino)
        .then(response => {
            if (!response.ok) {
                throw new Error("Error al conectar con la API");
            }
            return response.json();
        })
        .then(productos => {
            productosGlobales = productos;

            const cardsHTML = productos.map(({ id, title, category, price, image }) => {
                return `
                    <div class="card">
                        <img src="${image}" alt="${title}">
                        <div class="producto-descripcion">
                            <span>${category}</span>
                            <h5>${title}</h5>
                            <h4 class= "text-center">$${price.toFixed(2)}</h4>
                        </div>
                        <a id="btn-ver-${id}" class="ver-descripcion" style="cursor: pointer;">
                            Ver descripción
                        </a>
                        <a id="btn-agregar-${id}" class="carrito" style="cursor: pointer;">
                            <i class="fal fa-shopping-cart"></i> Agregar
                        </a>
                    </div>
                `;
            });

            if (contenedor) {
                contenedor.innerHTML = cardsHTML.join('');
                adjuntarEventos();
            }
        })
}

function agregarAlCarrito(producto) {
    let carrito = JSON.parse(localStorage.getItem('carritoDeCompras')) || [];
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

    localStorage.setItem('carritoDeCompras', JSON.stringify(carrito));
}

function adjuntarEventos() {
    productosGlobales.forEach(producto => {
        const boton = document.getElementById(`btn-agregar-${producto.id}`);
        if (boton) {
            boton.addEventListener('click', () => {
                agregarAlCarrito(producto);
            });
        }

        const btnVer = document.getElementById(`btn-ver-${producto.id}`);
        btnVer.addEventListener('click', () => {
            abrirModal(producto);
        });
    }
    );
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

document.addEventListener('DOMContentLoaded', () => {
    cargarProductos();

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
});