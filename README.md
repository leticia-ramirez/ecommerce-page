# 🛒 Tienda - eCommerce (Talento Tech)

¡Bienvenido al repositorio de nuestra tienda virtual! Este proyecto es una aplicación web dinámica de comercio electrónico que consume productos en tiempo real desde una API externa y simula la experiencia completa de un carrito de compras.

Desarrollado como parte del programa **Talento Tech**.

---

## 🚀 Características principales

* **Carga Dinámica de Productos:** Consumo de datos asíncrono desde la API de [Fake Store API](https://fakestoreapi.com/).
* **Filtrado por Categorías:** Detección automática de categorías mediante parámetros en la URL (`?category=...`).
* **Modal de Detalles (Custom):** Vista rápida e interactiva de la descripción, precio e imagen completa de cada producto.
* **Carrito de Compras Lateral:** Agregar productos, control de cantidades duplicadas y cálculo del total en tiempo real.
* **Diseño Responsivo:** Interfaz adaptada para dispositivos móviles y computadoras utilizando CSS nativo y Bootstrap 5.

---

## 🛠️ Tecnologías utilizadas

* **HTML5** - Estructura semántica del sitio.
* **CSS3** - Estilos personalizados, variables, transiciones y maquetación (Flexbox/Grid).
* **JavaScript** - Lógica de negocio, manipulación del DOM, promesas y manejo de eventos.
* **Bootstrap 5** - Framework para la base del diseño e iconografía ligera.
* **FontAwesome** - Iconos de la interfaz y redes sociales.

---

## 📂 Estructura del proyecto

```text
├── css/
│   ├── base.css              # Estilos compartidos (header, footer, etc.)
│   └── tienda.css            # Estilos específicos de la tienda y modales
├── img/                      # Elementos visuales y logotipos
├── templates/
│   ├── tienda.html           # Página principal de la tienda (eCommerce)
│   └── contacto.html         # Formulario de contacto
├── script/
│   ├── base.js               # Lógica global y del carrito
│   ├── baseProductos.js      # Datos auxiliares entre tienda y producto
|   ├── productos.js          # Renderizado de productos, eventos en home
│   └── tienda.js             # Renderizado de productos, API y eventos del modal
├── index.html                # Página de inicio del sitio (Home)
└── README.md                 # Documentación del proyecto
