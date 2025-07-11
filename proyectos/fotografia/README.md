# Sergio Forés • Exploración Fotográfica

Landing excepcional para la colección personal de fotografías de Sergio Forés. Diseñada con los máximos estándares de calidad técnica y estética, inspirada en las mejores referencias de diseño web contemporáneo.

## 🎯 Concepto

**Archivo Visual Personal** - Una plataforma minimalista y sofisticada para presentar momentos significativos capturados a través del lente. Cada fotografía documenta un fragmento de la exploración continua entre contemplación y transformación personal.

### Filosofía de Diseño
- **Minimalismo Inteligente**: Interfaz limpia que permite al contenido fotográfico ser protagonista
- **Experiencia Cinematográfica**: Navegación fluida y transiciones suaves inspiradas en referencias premium
- **Contemplación Digital**: Espacios generosos y ritmos visuales que invitan a la pausa reflexiva

## 🚀 Características Técnicas

### Sistema de Galería Avanzada
- **Filtrado Dinámico**: Categorías por tipo de fotografía (Retratos, Paisajes, Abstractas, Urbanas)
- **Lightbox Modal**: Visualización inmersiva con navegación por teclado
- **Lazy Loading**: Carga optimizada de imágenes para performance máxima
- **Responsive Design**: Experiencia perfecta en todos los dispositivos

### Arquitectura de Performance
- **Critical CSS Inline**: Render inmediato del above-the-fold
- **Design System Integration**: Basado en `sergio-design-tokens.css`
- **Progressive Enhancement**: Funciona sin JavaScript, se mejora con él
- **Accessibility First**: WCAG 2.1 AA compliance, navegación por teclado

### Stack Tecnológico
```
Frontend Optimizado:
├── HTML5 semántico + Critical CSS inline
├── CSS3 con variables custom + Sistema 8px
├── JavaScript ES6+ modular + Performance APIs
└── Integración con Design System de Sergio Forés

Performance Stack:
├── Lazy loading nativo + Intersection Observer
├── Optimización de imágenes + WebP support
├── Service Worker ready + PWA capabilities
└── Core Web Vitals optimization
```

## 📁 Estructura del Proyecto

```
fotografia/
├── README.md                 # Este archivo
├── index.html                # Página principal optimizada
├── css/
│   └── main.css              # Estilos específicos del proyecto
├── js/
│   ├── gallery-data.js       # Base de datos de fotografías
│   └── main.js               # Lógica principal de la galería
├── images/
│   └── photographs/          # Colección de fotografías
│       ├── reflexion-interior.jpg
│       ├── geometria-urbana.jpg
│       ├── ritual-cotidiano.jpg
│       └── [...más fotografías]
└── img/
    └── fotografia.jpg        # Thumbnail para portfolio
```

## 🎨 Sistema de Diseño Integrado

### Paleta de Colores Fotográfica
```css
--color-dark: #0a0a0a;        /* Negro profundo */
--color-charcoal: #1a1a1a;    /* Carboncillo */
--color-silver: #8e8e93;      /* Plata */
--color-platinum: #f2f2f7;    /* Platino */
--color-accent: #007aff;      /* Azul sistema */
--color-warm: #ff9500;        /* Naranja cálido */
```

### Tipografía Fluida
```css
--font-primary: SF Pro Display, Inter, system-ui
--font-mono: SF Mono, Monaco, monospace
--text-4xl: clamp(2.5rem, 8vw, 4rem)    /* Hero title */
--text-2xl: clamp(1.5rem, 5vw, 2rem)    /* Section titles */
--text-base: clamp(1rem, 2.5vw, 1.125rem) /* Body text */
```

### Espaciado Matemático (Sistema 8px)
```css
--space-2: 0.5rem;     /* 8px */
--space-4: 1rem;       /* 16px */
--space-6: 1.5rem;     /* 24px */
--space-8: 2rem;       /* 32px */
--space-12: 3rem;      /* 48px */
--space-16: 4rem;      /* 64px */
```

## 📊 Estructura de Datos

### Modelo de Fotografía
```javascript
{
    id: "momento-01",
    filename: "reflexion-interior.jpg",
    title: "Reflexión Interior",
    category: "portraits",
    date: "2024-03-15",
    location: "Estudio Personal",
    description: "Un momento de introspección...",
    camera: "Canon EOS R6",
    lens: "RF 85mm f/1.2L",
    settings: "f/2.8, 1/125s, ISO 400",
    tags: ["retrato", "luz natural"],
    featured: true
}
```

### Categorías Disponibles
- **portraits**: Exploraciones del rostro humano y la expresión
- **landscapes**: Geografías externas e internas  
- **abstracts**: Forma, luz y textura como lenguaje visual
- **street**: La vida cotidiana en el espacio público

## 🛠️ Uso y Desarrollo

### Instalación Local
```bash
# Clonar o navegar al directorio
cd proyectos/fotografia

# Servidor local simple
python3 -m http.server 8000

# Acceder en navegador
open http://localhost:8000
```

### Agregar Nuevas Fotografías
1. **Subir imagen** a `images/photographs/`
2. **Actualizar datos** en `js/gallery-data.js`:
```javascript
const nuevaFoto = {
    id: "momento-nuevo",
    filename: "nueva-foto.jpg",
    path: "images/photographs/nueva-foto.jpg",
    title: "Título Significativo",
    category: "abstracts", // portraits|landscapes|abstracts|street
    date: "2025-01-11",
    location: "Lugar de Captura",
    description: "Descripción contemplativa...",
    // ... resto de metadatos
};

// Agregar a PHOTOGRAPHY_DATA array
PHOTOGRAPHY_DATA.push(nuevaFoto);
```

### Optimización de Imágenes
```bash
# Recomendaciones para nuevas fotografías:
# - Formato: JPG para fotografías, WebP cuando sea posible
# - Resolución: 1920x1280px (aspect ratio 3:2)
# - Calidad: 85-90% para balance size/quality
# - Peso objetivo: <500KB por imagen
```

## 🎯 Funcionalidades Implementadas

### Navegación y UX
- ✅ **Filtrado por categorías** con contadores dinámicos
- ✅ **Lightbox modal** con navegación fluida
- ✅ **Navegación por teclado** (Escape, flechas)
- ✅ **Lazy loading** para performance optimizada
- ✅ **Responsive design** mobile-first
- ✅ **Estados de carga** con animaciones shimmer

### Accesibilidad
- ✅ **ARIA labels** y roles semánticos
- ✅ **Navegación por teclado** completa
- ✅ **Focus management** en modal
- ✅ **Contrast ratios** WCAG AA
- ✅ **Screen reader** compatible

### Performance
- ✅ **Critical CSS inline** para FCP optimizado
- ✅ **Intersection Observer** para lazy loading
- ✅ **Performance monitoring** con métricas
- ✅ **Service Worker ready** para PWA

## 📈 Métricas Objetivo

### Core Web Vitals Target
```
LCP (Largest Contentful Paint): < 2.5s
FID (First Input Delay): < 100ms
CLS (Cumulative Layout Shift): < 0.1
FCP (First Contentful Paint): < 1.8s
TTI (Time to Interactive): < 3.8s
```

### Lighthouse Scores Target
```
Performance: 90+
Accessibility: 95+
Best Practices: 90+
SEO: 95+
```

## 🔄 Roadmap Futuro

### Funcionalidades Planificadas
- [ ] **Búsqueda avanzada** por tags y metadatos
- [ ] **Modo slideshow** automático
- [ ] **Metadata EXIF** extraction y display
- [ ] **Favoritos personales** con localStorage
- [ ] **Compartir individual** de fotografías
- [ ] **Zoom avanzado** en lightbox

### Optimizaciones Técnicas
- [ ] **WebP + AVIF** conversion pipeline
- [ ] **Image CDN** integration
- [ ] **PWA completa** con offline support
- [ ] **Analytics** de engagement
- [ ] **Performance budget** enforcement

## 📄 Inspiración y Referencias

Basado en el análisis de las mejores referencias de diseño web:

### Referencias de Excelencia
- **Portfolio sites**: Minimalismo sofisticado y presentación premium
- **Agency showcases**: Navegación fluida y micro-interacciones
- **Cultural sites**: Espaciado generoso y tipografía elegante
- **Experimental projects**: Innovación técnica y creatividad visual

### Criterios de Calidad Aplicados
- ✅ **Calidad estética**: Diseño visual excepcional
- ✅ **Excelencia técnica**: Implementación sólida y performante
- ✅ **Innovación**: Enfoques creativos únicos
- ✅ **Usabilidad**: Experiencia de usuario excelente
- ✅ **Performance**: Optimización y velocidad

## 📄 Licencia y Créditos

**Proyecto personal** de Sergio Forés para presentación de obra fotográfica.

- **Diseño y Desarrollo**: Sergio Forés
- **Sistema de Diseño**: Integrado con sergio-design-tokens.css
- **Inspiración**: Referencias curadas de diseño web excepcional
- **Fotografías**: Colección personal de Sergio Forés

---

**🎯 Performance Optimized** | **📱 Mobile First** | **♿ Accessibility Ready**  
**📅 Última actualización**: Enero 2025  
**🏷️ Versión**: 1.0.0  
**👨‍💻 Autor**: Sergio Forés