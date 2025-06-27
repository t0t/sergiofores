# 🏪 Tienda Peñíscola - E-commerce

Tienda online para el **local de Calle Mayor, 49 en Peñíscola** actualmente en reforma. Web que presenta el progreso de renovación del espacio histórico (1900) y ofrece carrito de compra funcional para productos mediterráneos.

## 🎯 **Características Principales**

- ✅ **Presentación de Reforma**: Información sobre la renovación de la tienda física
- ✅ **Catálogo Online**: Productos mediterráneos y artesanales locales
- ✅ **Carrito Funcional**: Sistema completo de compra con localStorage
- ✅ **Diseño Mediterráneo**: Estética que refleja la esencia de Peñíscola
- ✅ **Responsive**: Optimizado para móviles y tablets
- ✅ **Sistema 01234**: Aplicación del sistema de diseño unificado

## 🛠️ **Tecnologías**

- **HTML5** - Estructura semántica
- **CSS3** - Variables CSS del sistema de diseño 01234
- **JavaScript ES6+** - Carrito con localStorage, lazy loading
- **LocalStorage** - Persistencia del carrito entre sesiones

## 📁 **Estructura del Proyecto**

```
tienda-peniscola/
├── index.html              # Página principal con productos
├── carrito.html            # Página del carrito de compra
├── README.md               # Documentación
└── images/                 # Imágenes de productos (futura)
    ├── productos/
    └── reforma/
```

## 🎨 **Sistema de Diseño**

Utiliza el **sistema de diseño 01234** con:

### **Paleta de Colores**
- **Base Neutra (80%)**: Blancos, grises y tonos naturales
- **Énfasis (20%)**: Naranja mediterráneo (#FF6B35) para acciones importantes

### **Tipografía**
- **Primaria**: Futura, Avenir Next - Legible y moderna
- **Secundaria**: JetBrains Mono - Para elementos técnicos

### **Espaciado**
Sistema basado en 8px para consistencia visual perfecta.

## 🛒 **Funcionalidades del Carrito**

### **Gestión de Productos**
- Añadir productos al carrito
- Modificar cantidades (+/-)
- Eliminar productos individualmente
- Persistencia en localStorage

### **Cálculos Automáticos**
- Subtotal por producto
- Costos de envío
- IVA (21%)
- Total final

### **Sincronización**
- Carrito sincronizado entre pestañas
- Contador actualizado en tiempo real
- Estado persistente entre sesiones

## 🏪 **Información de la Tienda**

### **Ubicación Real**
- **Dirección**: **Calle Mayor, 49 - Planta Baja - 12598 Peñíscola (Castellón)**
- **Superficie**: 40 m² en el casco antiguo
- **Edificio**: Histórico (1900)
- **Estado**: Actualmente en reforma
- **Arquitecto**: Alberto X. López Martínez (CTAC 8638)
- **Propietarios**: 50% Sergio Forés - 50% Noelia Requena

### **Productos Destacados**
1. **Artesanía Local** - Productos únicos de artesanos de Peñíscola
2. **Recuerdos** - Memorias auténticas de la ciudad
3. **Gastronomía** - Sabores mediterráneos tradicionales
4. **Decoración** - Elementos inspirados en el mar Mediterráneo
5. **Textiles** - Patrones tradicionales de la región
6. **Cerámica** - Piezas artísticas de artistas locales

## 🚀 **Desarrollo y Despliegue**

### **Servidor Local**
```bash
# Servidor HTTP simple
python3 -m http.server 8080

# Acceder en: http://localhost:8080
```

### **Deploy en GitHub Pages**
1. Subir archivos al repositorio
2. Activar GitHub Pages en la configuración
3. La web estará disponible automáticamente

### **Configuración de Producción**
- Optimizar imágenes antes del deploy
- Implementar sistema de pagos real (Stripe/PayPal)
- Conectar con base de datos para productos
- Integrar con sistema de inventario

## 🔧 **Personalización**

### **Añadir Productos**
Editar el array `productos` en `index.html`:

```javascript
const productos = [
    {
        id: 7,
        nombre: "Nuevo Producto",
        precio: 29.99,
        descripcion: "Descripción del producto...",
        imagen: "nuevo-producto.jpg"
    }
    // ...
];
```

### **Modificar Costos**
Ajustar en `carrito.html`:

```javascript
const envio = carrito.length > 0 ? 5.00 : 0;  // Costo de envío
const iva = subtotal * 0.21;                   // IVA 21%
```

### **Personalizar Información**
- Actualizar datos de contacto en el footer
- Modificar textos de la reforma
- Ajustar horarios y ubicación

## 📱 **Responsive Design**

- **Desktop**: Grid de 3 columnas para productos
- **Tablet**: Grid de 2 columnas adaptativo  
- **Mobile**: Columna única con carrito optimizado

## 🏗️ **Información Real de la Reforma**

### **Datos del Proyecto:**
- **Arquitecto**: Alberto X. López Martínez (CTAC 8638)
- **Contacto**: 964 45 23 63 / 608 31 59 98 / axlm@ctac.es
- **Presupuesto local**: 5.000€ + 1.620€ (derribo) + IVA
- **Estado**: En ejecución

### **Características del Local:**
- **Superficie**: 40 m²
- **Ubicación**: Casco antiguo de Peñíscola
- **Año construcción**: 1900
- **Referencia catastral**: 9909515BE7790N0001SG

## 🎯 **Próximas Funcionalidades Web**

- [ ] Sistema de pagos integrado (Stripe/PayPal)
- [ ] Gestión de inventario
- [ ] Panel de administración
- [ ] Integración con redes sociales
- [ ] Sistema de reseñas de productos
- [ ] Newsletter para ofertas
- [ ] Galería de fotos de la reforma real
- [ ] Reserva de productos para recoger en tienda

## 🌊 **Filosofía del Proyecto**

Aplicando el **sistema 01234**:

- **Nivel 0**: Datos de productos y reforma
- **Nivel 1**: Claridad en la navegación y propósito
- **Nivel 2**: Análisis de la experiencia de usuario
- **Nivel 3**: Comunicación de la identidad mediterránea
- **Nivel 4**: Materialización de la tienda digital

---

**Desarrollado para la renovación de Peñíscola** | Sistema CEREBRO-DIGITAL | 2025