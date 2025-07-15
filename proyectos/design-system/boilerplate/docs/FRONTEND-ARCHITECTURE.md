# Arquitectura Frontend - Boilerplate Sergio Forés

## 🏗️ **Visión General**

Este boilerplate implementa una **arquitectura frontend moderna y escalable** siguiendo las mejores prácticas de performance, accesibilidad y mantenibilidad, basada en el Sistema de Diseño Atómico Sergio Forés.

## 📁 **Estructura del Proyecto**

```
boilerplate/
├── index.html                 # HTML semántico optimizado
├── css/                       # Estilos organizados por capas
│   ├── variables-core.css     # Variables fundamentales del sistema
│   ├── color-system.css       # Sistema de tokens de color
│   ├── design-system.css      # Componentes del sistema atómico
│   ├── google-fonts.css       # Configuración tipográfica
│   ├── accessibility.css      # Mejoras de accesibilidad
│   └── project-main.css       # Estilos específicos del proyecto
├── js/                        # JavaScript modular
│   ├── claude-navigation.js   # Navegación inteligente
│   ├── pageheader-scroll.js   # Header dinámico
│   ├── smooth-scroll.js       # Navegación suave
│   ├── dropdown-component.js  # Componentes dropdown
│   ├── theme-switcher.js      # Cambio de temas
│   └── project-main.js        # Lógica específica del proyecto
├── assets/                    # Recursos estáticos
│   └── images/               # Imágenes optimizadas (36+ assets)
└── docs/                     # Documentación técnica
```

## 🎯 **Principios Arquitectónicos**

### **1. Performance First**
- **Critical CSS Inline**: Variables y sistema base primero
- **Resource Hints**: Preconnect, preload estratégico
- **JavaScript Defer**: Carga no-bloqueante
- **Lazy Loading**: Fuentes secundarias diferidas

### **2. Accessibility by Design**
- **ARIA Completo**: Roles, propiedades y estados
- **Focus Management**: Navegación con teclado optimizada
- **Screen Reader Support**: Contenido descriptivo
- **Skip Links**: Navegación rápida accesible

### **3. Progressive Enhancement**
- **HTML Semántico**: Base funcional sin JavaScript
- **CSS Layers**: Desde funcional hasta visual
- **JavaScript Enhancement**: Mejoras progresivas
- **Graceful Degradation**: Funcional en todos los escenarios

### **4. Modular Architecture**
- **Component-Based**: Cada funcionalidad en su archivo
- **Dependency Management**: Orden de carga optimizado
- **Separation of Concerns**: HTML, CSS, JS independientes
- **Scalable Structure**: Fácil añadir nuevos componentes

## ⚡ **Optimizaciones de Performance**

### **Critical Rendering Path**

```html
<!-- 1. DNS PRECONNECT - Conexiones externas más rápidas -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>

<!-- 2. CRITICAL CSS - Sistema de diseño (bloquea pero necesario) -->
<link rel="stylesheet" href="css/variables-core.css">
<link rel="stylesheet" href="css/color-system.css">
<link rel="stylesheet" href="css/design-system.css">

<!-- 3. PRELOAD CRÍTICO - Solo Inter para LCP -->
<link rel="preload" href="...Inter..." as="style" onload="...">

<!-- 4. ENHANCEMENT CSS - No crítico -->
<link rel="stylesheet" href="css/google-fonts.css">
<link rel="stylesheet" href="css/accessibility.css">
<link rel="stylesheet" href="css/project-main.css">
```

### **JavaScript Loading Strategy**

```html
<!-- CORE: Scripts fundamentales -->
<script src="js/claude-navigation.js" defer></script>
<script src="js/pageheader-scroll.js" defer></script>
<script src="js/smooth-scroll.js" defer></script>

<!-- COMPONENTES: Features específicos -->
<script src="js/dropdown-component.js" defer></script>
<script src="js/theme-switcher.js" defer></script>

<!-- PROYECTO: Último en cargar -->
<script src="js/project-main.js" defer></script>
```

### **Métricas Target**

| Métrica | Target | Implementación |
|---------|--------|----------------|
| **LCP** | < 1.5s | Preload Inter, CSS crítico |
| **FID** | < 100ms | JavaScript defer, event delegation |
| **CLS** | < 0.1 | Dimensiones definidas, font fallbacks |
| **TTI** | < 3s | Carga progresiva, lazy loading |

## 🎨 **Sistema CSS - Arquitectura por Capas**

### **Layer 1: Variables (variables-core.css)**
```css
:root {
  /* TIPOGRAFÍA */
  --font-primary: 'Inter', sans-serif;
  --font-mono: 'Source Code Pro', monospace;
  --font-display: 'Playfair Display', serif;
  
  /* COLORES SAGRADOS */
  --color-yellow: #FFFF00;
  --color-cyan: #00FFFF;
  --color-red: #FF0000;
  
  /* ESPACIADO UTOPIA */
  --space-s: clamp(1.00rem, calc(0.93rem + 0.37vw), 1.25rem);
}
```

### **Layer 2: Color System (color-system.css)**
```css
/* Base colors (cambiables) */
--base-primary-500: #FFFF00;

/* Semantic tokens (nunca cambian) */
--text-primary: var(--base-neutral-900);

/* Contextual uses */
--btn-primary-bg: var(--interactive-primary);
```

### **Layer 3: Design System (design-system.css)**
```css
/* Componentes atómicos del sistema Sergio Forés */
.btn { /* Botones del sistema */ }
.card { /* Tarjetas del sistema */ }
.form { /* Formularios del sistema */ }
```

### **Layer 4: Enhancements**
- **google-fonts.css**: Configuración tipográfica
- **accessibility.css**: Mejoras de accesibilidad
- **project-main.css**: Estilos específicos del proyecto

## 🔧 **Arquitectura JavaScript**

### **Patrón Module Pattern**

```javascript
// smooth-scroll.js
class SmoothScrollNavigation {
    constructor() {
        this.header = null;
        this.scrollOffset = 20;
        this.init();
    }
    
    init() {
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.setup());
        } else {
            this.setup();
        }
    }
    
    // Métodos específicos...
}

// Inicialización automática
const smoothScrollNav = new SmoothScrollNavigation();
```

### **Event Delegation Pattern**

```javascript
// project-main.js
document.addEventListener('DOMContentLoaded', function() {
    // Delegación de eventos para performance
    document.body.addEventListener('click', handleGlobalClicks);
    document.body.addEventListener('submit', handleFormSubmissions);
});

function handleGlobalClicks(e) {
    // Manejar clicks específicos según el target
    if (e.target.matches('.btn--special')) {
        handleSpecialButton(e);
    }
}
```

### **Error Handling Pattern**

```javascript
function handleContactForm(e) {
    try {
        e.preventDefault();
        
        const errors = validateContactForm(data);
        if (errors.length > 0) {
            displayFormErrors(form, errors);
            return;
        }
        
        // Procesamiento...
        
    } catch (error) {
        console.error('Error en formulario:', error);
        showFormStatus(form, 'Error inesperado. Inténtalo de nuevo.', 'error');
    }
}
```

## ♿ **Accesibilidad - WCAG 2.1 AA**

### **Navegación con Teclado**
```html
<!-- Skip Links -->
<a href="#main-content" class="skip-link">Saltar al contenido principal</a>

<!-- ARIA Navigation -->
<nav role="navigation" aria-label="Navegación principal">
    <ul role="menubar">
        <li role="none">
            <a href="#about" role="menuitem">ACERCA</a>
        </li>
    </ul>
</nav>
```

### **Formularios Accesibles**
```html
<form aria-label="Formulario de contacto" novalidate>
    <div class="form__field">
        <label for="email">Email:</label>
        <input type="email" id="email" name="email"
               aria-describedby="email-error"
               autocomplete="email" required>
        <div id="email-error" class="form__error" 
             role="alert" aria-live="polite"></div>
    </div>
</form>
```

### **Estados Dinámicos**
```css
/* Focus visible */
.focus-ring:focus::after {
    border-color: var(--color-accent);
    box-shadow: 0 0 0 2px var(--color-white), 
                0 0 0 4px var(--color-accent);
}

/* High contrast support */
@media (prefers-contrast: high) {
    .form__input {
        border-width: 2px;
    }
}

/* Reduced motion */
@media (prefers-reduced-motion: reduce) {
    *, *::before, *::after {
        animation-duration: 0.01ms !important;
        transition-duration: 0.01ms !important;
    }
}
```

## 📱 **Responsive Design**

### **Mobile-First Approach**
```css
/* Base: Mobile (375px+) */
.component {
    padding: var(--space-s);
    font-size: var(--fragment-text);
}

/* Tablet (768px+) */
@media (min-width: 768px) {
    .component {
        padding: var(--space-m);
        font-size: var(--analysis-text);
    }
}

/* Desktop (1024px+) */
@media (min-width: 1024px) {
    .component {
        padding: var(--space-l);
        font-size: var(--core-text);
    }
}
```

### **Touch Optimization**
```css
@media (max-width: 768px) {
    .btn, .menu__link {
        min-height: 44px; /* Touch target mínimo */
        min-width: 44px;
    }
}
```

## 🔍 **SEO & Meta Tags**

### **Estructura Semántica**
```html
<main id="main-content" role="main">
    <section id="hero">
        <h1>Título Principal</h1>
    </section>
    
    <section id="about">
        <h2>Sección Secundaria</h2>
    </section>
</main>
```

### **Meta Tags Optimizados**
```html
<!-- SEO Básico -->
<title>[NOMBRE_PROYECTO] - Sergio Forés</title>
<meta name="description" content="[DESCRIPCION_PROYECTO]">

<!-- Open Graph -->
<meta property="og:title" content="[NOMBRE_PROYECTO]">
<meta property="og:type" content="website">
<meta property="og:url" content="[URL_PROYECTO]">

<!-- Twitter Card -->
<meta name="twitter:card" content="summary_large_image">
```

## 🧪 **Testing Strategy**

### **Manual Testing Checklist**
- ✅ **Navegación con teclado**: Tab, Enter, Escape
- ✅ **Screen reader**: Lectores de pantalla funcionando
- ✅ **Responsive**: 375px, 768px, 1024px, 1440px
- ✅ **Performance**: Lighthouse > 90 en todas las métricas
- ✅ **Cross-browser**: Chrome, Firefox, Safari, Edge

### **Automated Testing**
```javascript
// project-main.js incluye exports para testing
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        validateContactForm,
        isValidEmail,
        handleContactForm
    };
}
```

## 🚀 **Deployment Best Practices**

### **Pre-deployment Checklist**
1. **Validación HTML**: W3C Validator
2. **CSS Lint**: Consistencia de variables
3. **JS Lint**: ESLint con reglas de accesibilidad
4. **Lighthouse Audit**: Performance > 90
5. **Accessibility Test**: axe-core, WAVE

### **Production Optimizations**
```bash
# Minificación CSS
cssnano css/ --output css-min/

# Optimización imágenes
imagemin assets/images/* --out-dir=assets/images-opt/

# JavaScript minification
terser js/*.js --compress --mangle --output js-min/
```

## 📈 **Métricas y Monitoring**

### **Core Web Vitals**
- **LCP**: Hero image optimizado, preload fonts
- **FID**: Event delegation, defer scripts
- **CLS**: Dimensiones definidas, font swaps

### **Accessibility Metrics**
- **Color Contrast**: Ratio > 4.5:1
- **Focus Indicators**: Visibles en todos los elementos
- **Screen Reader**: 100% contenido accesible

### **Performance Budget**
- **JavaScript**: < 200KB total
- **CSS**: < 100KB total
- **Images**: WebP cuando sea posible
- **Fonts**: Máximo 3 families

## 🔧 **Customization Guide**

### **Añadir Nueva Funcionalidad**

1. **Crear componente CSS** en `css/project-main.css`
2. **Crear lógica JS** en `js/project-main.js`
3. **Añadir al HTML** con identificadores AI
4. **Documentar uso** en comentarios

### **Cambiar Tema de Color**
```css
/* En css/project-main.css */
:root {
    --base-primary-500: #3B82F6; /* Azul en lugar de amarillo */
    /* Todo el sistema se actualiza automáticamente */
}
```

### **Añadir Nueva Font**
```html
<!-- En index.html -->
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;700&display=swap" media="print" onload="this.media='all'">
```

```css
/* En css/project-main.css */
:root {
    --font-custom: 'Roboto', sans-serif;
}

.custom-text {
    font-family: var(--font-custom);
}
```

## ⚠️ **Reglas Críticas**

### **DO's ✅**
- **Usar variables CSS** siempre
- **Mantener orden de carga** de recursos
- **Validar accesibilidad** en cada cambio
- **Testear responsive** en dispositivos reales
- **Seguir convenciones** del sistema Sergio Forés

### **DON'Ts ❌**
- **Hardcodear valores** directamente
- **Modificar archivos del sistema** base
- **Cargar recursos** sin optimización
- **Saltarse validación** de accesibilidad
- **Usar inline styles** sin justificación

---

**🎯 Esta arquitectura garantiza un boilerplate robusto, escalable y accesible que respeta la filosofía del Sistema de Diseño Atómico Sergio Forés mientras implementa las mejores prácticas modernas de desarrollo frontend.**