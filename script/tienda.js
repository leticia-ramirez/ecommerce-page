function cargarProductos() {
    const parametrosURL = new URLSearchParams(window.location.search);
    const categoriaSeleccionada = parametrosURL.get('category');

    let urlDestino = URL_API;
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
            const cardsHTML = mapearProductosHTML(productos);
            const contenedor = document.querySelector('.productos-container');
            
            if (contenedor) {
                contenedor.innerHTML = cardsHTML;
                adjuntarEventos(productos);
            }
        })

        .catch(error => console.error("Error al procesar la API:", error));
}

document.addEventListener('DOMContentLoaded', () => {
    cargarProductos();
    actualizarOverlay();
});