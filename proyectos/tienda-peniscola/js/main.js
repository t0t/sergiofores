// Alert de desarrollo al cargar la página
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        showAlert('development', 'Tienda en Desarrollo', 'Esta tienda online está actualmente en desarrollo. Los productos mostrados son únicamente de demostración. Próximamente estará disponible con productos reales y sistema de pago. ¡Gracias por tu paciencia!');
    }, 1000);
});

// Datos de productos (esto se conectaría a una base de datos real)
const productos = [
    {
        id: 1,
        nombre: "Producto Artesanal Local",
        precio: 24.99,
        descripcion: "Producto único elaborado por artesanos locales de Peñíscola.",
        imagen: "producto1.jpg"
    },
    {
        id: 2,
        nombre: "Recuerdo de Peñíscola",
        precio: 15.50,
        descripcion: "Perfecto recuerdo de tu visita a nuestra hermosa ciudad.",
        imagen: "producto2.jpg"
    },
    {
        id: 3,
        nombre: "Gastronomía Local",
        precio: 32.00,
        descripcion: "Sabores auténticos de la cocina mediterránea de Peñíscola.",
        imagen: "producto3.jpg"
    },
    {
        id: 4,
        nombre: "Decoración Mediterránea",
        precio: 45.99,
        descripcion: "Elementos decorativos inspirados en el mar Mediterráneo.",
        imagen: "producto4.jpg"
    },
    {
        id: 5,
        nombre: "Textil Tradicional",
        precio: 38.75,
        descripcion: "Textiles con patrones tradicionales de la región.",
        imagen: "producto5.jpg"
    },
    {
        id: 6,
        nombre: "Cerámica Artística",
        precio: 52.00,
        descripcion: "Piezas únicas de cerámica creadas por artistas locales.",
        imagen: "producto6.jpg"
    }
];

// Estado del carrito
let carrito = [];

// Función para renderizar productos
function renderProductos() {
    const grid = document.getElementById('productosGrid');
    grid.innerHTML = '';

    productos.forEach(producto => {
        const productoCard = document.createElement('div');
        productoCard.className = 'producto-card';
        productoCard.innerHTML = `
            <div class="producto-imagen">
                Imagen ${producto.nombre}
            </div>
            <div class="producto-info">
                <h3 class="producto-nombre">${producto.nombre}</h3>
                <div class="producto-precio">€${producto.precio.toFixed(2)}</div>
                <p class="producto-descripcion">${producto.descripcion}</p>
                <button class="add-to-cart" onclick="agregarAlCarrito(${producto.id})">
                    Añadir al Carrito
                </button>
            </div>
        `;
        grid.appendChild(productoCard);
    });
}

// Función para agregar productos al carrito
function agregarAlCarrito(productId) {
    const producto = productos.find(p => p.id === productId);
    if (producto) {
        // Obtener carrito del localStorage
        let carrito = JSON.parse(localStorage.getItem('carritoTienda') || '[]');
        
        const itemExistente = carrito.find(item => item.id === productId);
        
        if (itemExistente) {
            itemExistente.cantidad += 1;
        } else {
            carrito.push({
                ...producto,
                cantidad: 1
            });
        }
        
        // Guardar en localStorage
        localStorage.setItem('carritoTienda', JSON.stringify(carrito));
        
        actualizarContadorCarrito();
        
        // Feedback visual
        const button = event.target;
        const originalText = button.textContent;
        button.textContent = '¡Añadido!';
        button.style.background = 'var(--accent-green)';
        
        setTimeout(() => {
            button.textContent = originalText;
            button.style.background = '';
        }, 1000);
    }
}

// Función para actualizar el contador del carrito
function actualizarContadorCarrito() {
    const carrito = JSON.parse(localStorage.getItem('carritoTienda') || '[]');
    const totalItems = carrito.reduce((total, item) => total + item.cantidad, 0);
    document.getElementById('cartCount').textContent = totalItems;
}

// Navegación suave
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Inicializar la página
document.addEventListener('DOMContentLoaded', function() {
    renderProductos();
    actualizarContadorCarrito();
});

// Escuchar cambios en el localStorage para sincronizar pestañas
window.addEventListener('storage', function(e) {
    if (e.key === 'carritoTienda') {
        actualizarContadorCarrito();
    }
});

// Lazy loading para optimización
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
});

// Observar elementos para lazy loading
document.addEventListener('DOMContentLoaded', function() {
    const cards = document.querySelectorAll('.producto-card');
    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });
});

// Sistema de Alert Elegante
function showAlert(type, title, message) {
    const overlay = document.getElementById('alertOverlay');
    const icon = document.getElementById('alertIcon');
    const titleEl = document.getElementById('alertTitle');
    const messageEl = document.getElementById('alertMessage');
    
    // Configurar contenido
    titleEl.textContent = title;
    messageEl.textContent = message;
    
    // Configurar icono y estilo según tipo
    icon.className = `alert-icon ${type}`;
    switch(type) {
        case 'development':
            icon.textContent = '🚧';
            break;
        case 'info':
            icon.textContent = 'ℹ️';
            break;
        case 'warning':
            icon.textContent = '⚠️';
            break;
        default:
            icon.textContent = '📢';
    }
    
    // Mostrar alert
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function hideAlert() {
    const overlay = document.getElementById('alertOverlay');
    overlay.classList.remove('active');
    document.body.style.overflow = '';
}

// Cerrar alert al hacer clic en el overlay
document.getElementById('alertOverlay').addEventListener('click', (e) => {
    if (e.target.id === 'alertOverlay') {
        hideAlert();
    }
});

// Cerrar alert con ESC
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        hideAlert();
    }
});