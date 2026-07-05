const contenedorGlobal = document.getElementById('secciones-categorias-container');

function cargarProductosAgrupadosPorCategoria() {
    fetch(URL_API)
        .then(res => res.json())
        .then(productos => {
            const productosPorCategoria = agruparPorCategoria(productos);

            renderizarSecciones(productosPorCategoria);

            adjuntarEventos(productos);
        })

        .catch(error => console.error("Error al procesar la API:", error));
}

function agruparPorCategoria(productos) {
    let productosPorCategoria = {};

    productos.forEach(producto => {
        const categoria = producto.category;

        if (!productosPorCategoria[categoria]) {
            productosPorCategoria[categoria] = [];
        }

        productosPorCategoria[categoria].push(producto);
    });

    return productosPorCategoria;
}

function renderizarSecciones(productosPorCategoria) {
    contenedorGlobal.innerHTML = '';

    for (const categoria in productosPorCategoria) {
        const listaProductoPorCategoria = productosPorCategoria[categoria];
        const primerosTresProductos = listaProductoPorCategoria.slice(0, 3);

        const seccionCategoria = crearSeccionHTML(categoria);

        const containerProductos = seccionCategoria.querySelector('.productos-container');

        const cardsHTML = mapearProductosHTML(primerosTresProductos);
        containerProductos.innerHTML = cardsHTML;

        console.log(cardsHTML);
        if (contenedorGlobal) {
            contenedorGlobal.appendChild(seccionCategoria);
        }
    }
}

function crearSeccionHTML(categoria) {
    const seccionCategoria = document.createElement('section');
    seccionCategoria.className = 'categoria-seccion';

    const categoriaRefactorizada = categoria.replace(/\s+/g, '-');

    seccionCategoria.innerHTML = `
                    <div class="header-producto">
                        <h2 class="categoria-titulo">${categoria.toUpperCase()}</h2>
                        <a id="btn-ir-${categoriaRefactorizada}" class="btn-ver-mas" style="cursor: pointer;" href="./templates/tienda.html?category=${encodeURIComponent(categoria)}">
                            Ver mas productos<i class="fas fa-angle-double-right"></i> 
                        </a>
                    </div>
                    <div class="productos-container"></div>
                `;

    return seccionCategoria;
}

document.addEventListener('DOMContentLoaded', () => {
    cargarProductosAgrupadosPorCategoria();
    actualizarOverlay();
});

