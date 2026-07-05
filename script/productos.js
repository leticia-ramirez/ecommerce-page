const contenedorGlobal = document.getElementById('secciones-categorias-container');
let productosGlobales = [];

function cargarProductosAgrupadosPorCategoria() {
    fetch('https://fakestoreapi.com/products') // URL de tu API
        .then(res => res.json())
        .then(todosLosProductos => {
            const productosPorCategoria = {};

            todosLosProductos.forEach(producto => {
                const cat = producto.category;
                if (!productosPorCategoria[cat]) {
                    productosPorCategoria[cat] = [];
                }
                productosPorCategoria[cat].push(producto);
            });

            contenedorGlobal.innerHTML = ''; // Limpiamos por si acaso

            for (const nombreCategoria in productosPorCategoria) {
                const listaCompletaCat = productosPorCategoria[nombreCategoria];
                const primerosTres = listaCompletaCat.slice(0, 3);

                const seccionCategoria = document.createElement('section');
                seccionCategoria.className = 'categoria-seccion';

                const categoriaLimpia = nombreCategoria.replace(/\s+/g, '-');
                seccionCategoria.innerHTML = `
                    <div class="header-producto">
                        <h2 class="categoria-titulo">${nombreCategoria.toUpperCase()}</h2>
                        <a id="btn-ir-${categoriaLimpia}" class="btn-ver-mas" style="cursor: pointer;" href="../templates/tienda.html?category=${encodeURIComponent(nombreCategoria)}">
                            Ver mas productos<i class="fas fa-angle-double-right"></i> 
                        </a>
                    </div>
                    <div class="productos-container"></div>
                `;

                const gridDeProductos = seccionCategoria.querySelector('.productos-container');

                primerosTres.forEach(producto => {
                    const tarjetaHTML = `
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
                    gridDeProductos.innerHTML += tarjetaHTML;
                });
                if (contenedorGlobal) {
                    contenedorGlobal.appendChild(seccionCategoria);
                }
            }
            adjuntarEventos(todosLosProductos);
        })

        .catch(error => console.error("Error al procesar y agrupar la API:", error));
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

document.addEventListener('DOMContentLoaded', () => {
    cargarProductosAgrupadosPorCategoria();

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