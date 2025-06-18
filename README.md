# 🎨 Portfolio Sergio Forés

Portfolio personal con diseño **brutalista minimalista** desarrollado con tecnologías web modernas.

## 🚀 **Características**

- ✅ **Diseño Brutalista**: Bordes negros, tipografía en mayúsculas, efectos hover con translate
- ✅ **Responsive**: Grid CSS con `minmax()` y breakpoints optimizados
- ✅ **Performance**: Lazy loading, IntersectionObserver, cleanup automático
- ✅ **Interactividad**: Rotación de imágenes, scroll spy, navegación suave
- ✅ **Diagramas**: Integración con Mermaid para visualizaciones
- ✅ **Contacto**: Integración directa con WhatsApp

## 🛠️ **Tecnologías**

- **HTML5** - Estructura semántica
- **CSS3** - Variables CSS, Grid, Flexbox
- **JavaScript ES6+** - Vanilla JS moderno
- **Vite** - Build tool y servidor de desarrollo
- **PostCSS** - Autoprefixer para compatibilidad
- **Mermaid** - Diagramas interactivos

## 📁 **Estructura**

```
sergiofores/
├── src/
│   ├── js/main.js           # JavaScript optimizado
│   └── styles/main.css      # Estilos con variables CSS
├── public/
│   └── images/              # Assets del portfolio
├── archive/
│   └── index-original.html  # Backup
├── index.html               # Página principal
├── vite.config.js          # Configuración Vite
└── package.json            # Dependencias
```

## 🚀 **Desarrollo**

### **Instalación**
```bash
npm install
```

### **Desarrollo**
```bash
npm run dev          # Servidor desarrollo (puerto 3001)
```

### **Build**
```bash
npm run build        # Build para producción
npm run preview      # Preview del build (puerto 4173)
```

### **Utilidades**
```bash
npm run lint         # Linting del código
npm run clean        # Limpiar directorio dist
npm run serve        # Servidor HTTP simple (puerto 8080)
```

## 🎨 **Personalización**

### **Variables CSS**
El diseño utiliza variables CSS para fácil personalización:

```css
:root {
  --gray-9: #111111;           /* Color principal */
  --border-width: 3px;         /* Grosor bordes */
  --hover-transform: translate(-2px, -2px);
  --hover-shadow: 4px 4px 0 var(--gray-9);
}
```

### **Proyectos**
Configura las imágenes de proyectos en `src/js/main.js`:

```javascript
const PROJECT_IMAGES = {
  'desarrollo-web': [
    '/images/proyecto1.jpg',
    '/images/proyecto2.jpg'
  ]
};
```

## 📱 **Responsive Design**

- **Desktop**: Grid de 3 columnas con efectos hover completos
- **Tablet**: Grid de 2 columnas adaptativo
- **Mobile**: Columna única con interacciones optimizadas

## 🔧 **Optimizaciones**

- **JavaScript**: Estado centralizado, manejo de errores, cleanup automático
- **CSS**: Variables organizadas, efectos brutalistas consistentes
- **Performance**: Lazy loading, debounce, IntersectionObserver
- **Build**: Minificación, tree-shaking, chunks optimizados

## 📄 **Documentación**

- `README.md` - Documentación principal
- `REFACTORING.md` - Detalles de refactorización técnica
- `STRUCTURE.md` - Estructura de archivos y limpieza

## 🌐 **Deploy**

El proyecto está configurado para deploy automático con:
- **Vercel** (configuración incluida)
- **Netlify** (compatible)
- **GitHub Pages** (build estático)

---

**Desarrollado con ❤️ por Sergio Forés** | [Contacto WhatsApp](https://wa.me/34619549032)
