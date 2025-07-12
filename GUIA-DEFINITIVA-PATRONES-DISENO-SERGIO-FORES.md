# GUÍA DEFINITIVA DE PATRONES DE DISEÑO SERGIO FORÉS

> **La única fuente de verdad para el desarrollo web consistente con la filosofía y estética de Sergio Forés**

*Versión: 2.0 | Fecha: 2025-07-12*

---

## 🏛️ ARQUITECTURA CONCEPTUAL

### **Filosofía de Diseño Fundamental**

El estilo Sergio Forés se basa en una **síntesis única entre minimalismo Bauhaus y filosofía cognitiva 01234**, creando una estética que refleja estructura mental y claridad conceptual.

**Principios Rectores:**
- **Minimalismo Inteligente**: Eliminar todo lo no esencial (Nivel 1 del sistema 01234)
- **Tipografía como Arquitectura**: La fuente es estructura, no decoración
- **Geometría Funcional**: Formas puras con toques orgánicos puntuales
- **Color con Propósito**: Base neutra absoluta, color solo cuando esté conceptualmente justificado
- **HTML Semántico**: La estructura debe reflejar el significado, no solo la apariencia

---

## 📐 SISTEMA TIPOGRÁFICO SAGRADO

### **REGLA CARDINAL: SOLO 3 TAMAÑOS DE FUENTE**

```css
/* SISTEMA OBLIGATORIO - JAMÁS DESVIARSE */
--text-large: var(--essence-text);    /* H1 principales (step-4) */
--text-medium: var(--analysis-text);  /* Subtítulos/navegación (step-1) */
--text-small: var(--fragment-text);   /* Todo el resto del contenido (step-0) */

/* ❌ PROHIBIDO ABSOLUTAMENTE: */
/* font-size-xs, font-size-sm, text-xl, text-2xl, etc. */
```

### **Jerarquía de Fuentes**

**Fuente Primaria**: `Avenir Next`, `Futura` (con fallbacks inteligentes)
```css
--font-primary: 'Avenir Next', 'Futura', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
--font-mono: 'JetBrains Mono', 'SF Mono', 'Courier New', monospace;
```

**Font-Weight Sistemático**:
- **Body**: `var(--font-weight-normal)` (400) por defecto SIEMPRE
- **Títulos H1-H3**: `var(--font-weight-medium)` (500) o `var(--font-weight-semibold)` (600)
- **Énfasis**: `var(--font-weight-bold)` (700) SOLO cuando sea estrictamente necesario

### **Letter-Spacing Característico**
```css
--letter-spacing-tight: -0.02em;    /* Títulos grandes */
--letter-spacing-normal: 0;         /* Base */
--letter-spacing-wide: 0.02em;      /* Navegación */
--letter-spacing-wider: 0.04em;     /* Elementos destacados */
```

---

## 🎨 SISTEMA DE COLOR DEFINITIVO

### **Paleta 01234 (Conceptual)**
```css
--color-0: #000000;  /* Campo Cuántico - Negro profundo */
--color-1: #FF6B35;  /* Determinación - Naranja vibrante */
--color-2: #4ECDC4;  /* Refinamiento - Turquesa */
--color-3: #45B7D1;  /* Relacionamiento - Azul cielo */
--color-4: #96CEB4;  /* Materialización - Verde salvia */
```

### **Paleta Monocromática (Base Diaria)**
```css
--black: #000000;
--gray-900: #111111;  /* Texto principal */
--gray-800: #1f1f1f;
--gray-700: #2d2d2d;
--gray-600: #404040;  /* Texto secundario */
--gray-500: #6b6b6b;
--gray-400: #9ca3af;  /* Texto muted */
--gray-300: #d1d5db;  /* Bordes */
--gray-200: #e5e7eb;
--gray-100: #f3f4f6;
--gray-50: #f9fafb;   /* Superficies */
--white: #ffffff;     /* Fondo principal */
```

### **Aplicación de Color**
- **Base neutra SIEMPRE**: Grises como paleta principal
- **Color solo conceptual**: Los colores 01234 aparecen únicamente cuando tienen significado semántico
- **Acentos mínimos**: Un solo color de acento por página máximo
- **Coherencia de superficie**: `--color-surface: var(--gray-50)` para fondos secundarios

---

## 📏 SISTEMA DE ESPACIADO UTOPIA

### **Escalas Fluidas Matemáticas**

**Espaciado Base (Sistema 8px + Utopia)**:
```css
/* UTOPIA SPACE SCALE - Espaciado fluido basado en tipografía */
--space-3xs: clamp(0.31rem, calc(0.31rem + 0.00vw), 0.31rem);
--space-2xs: clamp(0.56rem, calc(0.54rem + 0.11vw), 0.63rem);
--space-xs: clamp(0.69rem, calc(0.65rem + 0.22vw), 0.81rem);
--space-s: clamp(1.13rem, calc(1.08rem + 0.22vw), 1.25rem);
--space-m: clamp(1.69rem, calc(1.62rem + 0.33vw), 1.88rem);
--space-l: clamp(2.25rem, calc(2.16rem + 0.43vw), 2.50rem);
--space-xl: clamp(3.38rem, calc(3.24rem + 0.65vw), 3.75rem);
--space-2xl: clamp(4.50rem, calc(4.33rem + 0.87vw), 5.00rem);
--space-3xl: clamp(6.75rem, calc(6.49rem + 1.30vw), 7.50rem);
```

### **Mapping Semántico 01234**
```css
/* Filosofía aplicada al espaciado */
--quantum-space: var(--space-2xl-3xl);     /* Hero sections, separaciones cósmicas */
--essence-space: var(--space-l-xl);        /* Separación dramática de secciones */
--analysis-space: var(--space-s-m);        /* Espaciado interno de componentes */
--connection-space: var(--space-xs-s);     /* Gap entre elementos relacionados */
--detail-space: var(--space-3xs-2xs);      /* Padding interno, refinamientos */
```

---

## 🏗️ ARQUITECTURA DE LAYOUT

### **Grid Preferred sobre Flexbox**
```css
/* Para layouts principales SIEMPRE usar GRID */
.main-section {
    display: grid;
    grid-template-rows: auto auto auto;  /* ❌ NUNCA usar 1fr que estira */
    justify-items: center;               /* Centrar elementos */
    align-content: start;                /* Contenido arriba */
    gap: var(--analysis-space);
}
```

### **Sistema de Contenedores**
```css
.container {
    width: 100%;
    max-width: var(--container-max-width);  /* 1200px base, 1400px desktop */
    margin: 0 auto;
    padding: 0 var(--container-padding);
}
```

### **Breakpoints Específicos**
```css
/* Mobile First SIEMPRE */
--breakpoint-sm: 640px;
--breakpoint-md: 768px;   /* Cambio principal mobile/desktop */
--breakpoint-lg: 1024px;
--breakpoint-xl: 1280px;

/* Breakpoints iPhone específicos */
@media (max-width: 430px) { /* iPhone 14, 15, 16 */ }
@media (max-width: 375px) { /* iPhone SE */ }
```

---

## 📱 OPTIMIZACIONES MÓVILES CRÍTICAS

### **Viewport Real para iOS**
```css
/* Safe viewport para notch y barras */
.hero {
    height: 100vh;
    height: 100svh;  /* OBLIGATORIO para iOS real */
    min-height: 40vh; /* Mínimo móvil */
}

.hero-content {
    max-width: calc(100vw - 20px);  /* Evita scroll horizontal */
    width: calc(100vw - 20px);
}
```

### **Mix-Blend-Mode SOLO Desktop**
```css
/* ❌ PROHIBIDO en móviles - problemas de rendimiento iOS */
@media (hover: hover) and (pointer: fine) {
    .custom-cursor { mix-blend-mode: difference; }
    .hero-content { mix-blend-mode: color-burn; }
}
```

### **Performance Mobile**
```css
/* Hardware acceleration para animaciones */
.animated-element {
    will-change: transform;
    transform: translateZ(0);
    backface-visibility: hidden;
    transform: translate3d(x, y, 0); /* NO translate(x, y) */
}
```

---

## 🧭 NAVEGACIÓN Y UX DISTINTIVOS

### **Navegación Activa Inteligente**
```javascript
// Intersection Observer + Clear en scroll top
setupIntersectionObserver() {
    const observer = new IntersectionObserver((entries) => {
        // REGLA: Clear active cuando scroll < 100px
        if (window.scrollY < 100) {
            this.clearActiveStates();
            return;
        }
        
        // Activar sección con mayor intersección
        let maxRatio = 0;
        let activeSection = '';
        entries.forEach(entry => {
            if (entry.intersectionRatio > maxRatio) {
                maxRatio = entry.intersectionRatio;
                activeSection = entry.target.id;
            }
        });
        
        if (maxRatio > 0.1 && activeSection) {
            this.updateActiveLink(activeSection);
        }
    }, {
        rootMargin: '-80px 0px -40% 0px',  /* Offset para header */
        threshold: [0, 0.1, 0.25, 0.5, 0.75, 1.0]
    });
}
```

### **Logo Click Limpia Estados**
```javascript
// COMPORTAMIENTO ESPECÍFICO: Logo siempre resetea navegación
logoLink.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
    
    // Limpiar TODOS los estados active
    document.querySelectorAll('.main-nav a[href^="#"]')
        .forEach(link => link.classList.remove('active'));
});
```

---

## 🎯 ELEMENTOS VISUALES CARACTERÍSTICOS

### **Geometría Sistema 01234**
```html
<!-- Logo geométrico 01234 -->
<a href="#inicio" class="logo logo-link">
    <div class="geo-shape geo-circle-outline"></div>  <!-- 0 -->
    <div class="geo-shape geo-circle-solid"></div>    <!-- 1 -->
    <div class="geo-shape geo-line"></div>            <!-- 2 -->
    <div class="geo-shape geo-triangle"></div>        <!-- 3 -->
    <div class="geo-shape geo-square"></div>          <!-- 4 -->
</a>
```

```css
/* Formas geométricas específicas */
.geo-circle-outline {
    border: 2px solid var(--logo-0);
    border-radius: 50%;
}

.geo-square {
    background: var(--logo-4);
    border-radius: 0 !important;  /* NUNCA redondear cuadrados */
}

.geo-triangle {
    width: 0; height: 0;
    border-left: 10px solid transparent;
    border-right: 10px solid transparent;
    border-bottom: 20px solid var(--logo-3);
}
```

### **Sin Sombras, Sin Border-Radius**
```css
/* PROHIBIDO EN ESTILO SERGIO FORÉS */
/* box-shadow: ...; */
/* border-radius: ...; (excepto círculos perfectos) */

/* Estilo limpio sin efectos */
.project-card {
    background: var(--color-surface);
    border: 1px solid var(--color-border);
    /* NO sombras, NO border-radius */
}
```

---

## 🗂️ HTML SEMÁNTICO OBLIGATORIO

### **Listas de Definición para Conceptos**
```html
<!-- Estructura específica para sistema 01234 -->
<div class="sistema-grid">
    <div class="sistema-item">
        <svg class="sistema-svg" viewBox="0 0 60 60">
            <circle cx="30" cy="30" r="25" fill="none" stroke="currentColor" stroke-width="3"/>
        </svg>
        <div class="sistema-text">
            <dl>
                <dt>Potencial infinito</dt>
                <dd>Curiosidad</dd>
                <dd>Posibilidades</dd>
            </dl>
        </div>
    </div>
</div>
```

### **Estructura Jerárquica Correcta**
```html
<main class="main-container" role="main">
    <section id="sergio" class="section" role="region" aria-labelledby="sergio-title">
        <h2 id="sergio-title" class="section-title">Sergio Forés</h2>
        <p class="section-description">Descripción clara y concisa...</p>
        <!-- Contenido de la sección -->
    </section>
</main>
```

---

## 🚀 PERFORMANCE Y INTERACTIVIDAD

### **Cursor Personalizado (Solo Desktop)**
```css
/* Cursor solo donde tiene sentido funcional */
@media (hover: hover) and (pointer: fine) {
    body, * { cursor: none !important; }
    
    .custom-cursor {
        position: fixed;
        width: 20px; height: 20px;
        border: 2px solid var(--white);
        border-radius: 50%;
        mix-blend-mode: difference;
        pointer-events: none;
        z-index: 9999;
    }
    
    .custom-cursor.hover {
        width: 30px; height: 30px;
        background: var(--color-1);
        border: none;
        mix-blend-mode: normal;
    }
}
```

### **Microinteracciones Elegantes**
```css
/* Transiciones sistemáticas */
--duration-fast: 150ms;
--duration-base: 200ms;
--duration-slow: 300ms;
--ease-out: cubic-bezier(0.0, 0, 0.2, 1);

.project-card {
    transition: all var(--duration-slow) var(--ease-out);
    transform: translateZ(0);
    will-change: transform, opacity;
}

@media (hover: hover) {
    .project-card:hover {
        transform: perspective(1000px) rotateY(5deg) translateY(-4px);
        opacity: 0.95;
        border-color: var(--color-1);
    }
}
```

---

## 📐 ESPACIADO Y MÁRGENES ESPECÍFICOS

### **Márgenes Consistentes**
```css
/* Títulos y descripciones MISMO margin-bottom */
.section-title {
    font-size: var(--section-title-size);
    margin-bottom: var(--section-title-margin-bottom);
}

.section-description {
    font-size: var(--section-description-size);
    margin: 0 auto var(--section-description-margin);
    max-width: 800px;
}

/* Componentes sin padding excesivo */
.sistema-item {
    padding: var(--analysis-space);  /* Solo espaciado interno necesario */
}

/* Book-banner márgenes pequeños */
.book-banner {
    margin: var(--essence-space) 0;  /* Desktop */
    padding: var(--essence-space);
}

@media (max-width: 768px) {
    .book-banner {
        margin: var(--analysis-space) 0;  /* Móvil reducido */
        padding: var(--analysis-space);
    }
}
```

---

## ✅ PROTOCOLO DE VALIDACIÓN

### **Checklist Pre-Deploy OBLIGATORIO**

**Tipografía:**
- [ ] Solo 3 tamaños de fuente utilizados (`--text-large`, `--text-medium`, `--text-small`)
- [ ] Font-weight normal (400) en body por defecto
- [ ] Letter-spacing apropiado para cada contexto

**Layout:**
- [ ] Grid `template-rows: auto auto auto` (NO `1fr`)
- [ ] Container max-width y padding consistentes
- [ ] Responsive breakpoints específicos iPhone

**Móvil:**
- [ ] Viewport `100svh` para iOS
- [ ] Mix-blend-mode solo en desktop
- [ ] Hero content `calc(100vw - 20px)`
- [ ] Test en dispositivo iPhone real

**UX:**
- [ ] Navegación activa funcional con clear < 100px scroll
- [ ] Logo limpia estados active
- [ ] Smooth scrolling con offset correcto
- [ ] Intersection Observer configurado

**Visual:**
- [ ] Sin sombras, sin border-radius (excepto círculos)
- [ ] Cuadrados con `border-radius: 0 !important`
- [ ] HTML semántico con `dl/dt/dd` para conceptos
- [ ] Cursor personalizado solo desktop

**Performance:**
- [ ] Console sin errores JavaScript
- [ ] Imágenes WebP + fallback JPG
- [ ] Hardware acceleration en animaciones
- [ ] Lighthouse Performance > 90

---

## 📚 REFERENCIAS Y CONTEXTO

### **Archivos Fuente de Verdad**
- **Variables CSS**: `/css/main.css` - Sistema completo de design tokens
- **Implementación**: `/css/styles.css` - Aplicación práctica
- **Biografía**: `/notas/sergio_fores.md` - Contexto personal y profesional
- **Filosofía 01234**: `/PROYECTOS/libro-01234/` - Marco conceptual
- **Principios**: `/notas/principios_diseno_web_sergiofores.md` - Guía técnica

### **Proyectos de Referencia**
- **Portfolio Principal**: `/index.html` - Implementación completa
- **Arte Plástico**: `/proyectos/sergio_arte_plastica/` - Paleta museística
- **Sistema Cognitivo**: `/proyectos/landing_01234/` - Aplicación conceptual

### **Herramientas de Desarrollo**
- **Servidor local**: `python3 -m http.server 8000`
- **DevTools**: Console + Device Emulation + Network
- **Testing**: iPhone real + Chrome DevTools responsive
- **Validation**: Lighthouse + Accessibility + Performance

---

## 🎯 FILOSOFÍA Y PRINCIPIOS FINALES

**El estilo Sergio Forés NO es minimalismo vacío**. Es **minimalismo inteligente** que refleja la estructura mental del sistema cognitivo 01234:

- **Nivel 0**: Potencial ilimitado del lienzo en blanco
- **Nivel 1**: Claridad y esencia - eliminar lo no esencial
- **Nivel 2**: Análisis y diferenciación - estructura semántica
- **Nivel 3**: Comunicación y conexión - UX intuitiva
- **Nivel 4**: Materialización perfecta - código que funciona

**Cada decisión de diseño debe tener justificación conceptual**. No hay elementos decorativos sin propósito. La estética emerge de la función y la función emerge del significado.

**Este documento es un organismo vivo** que evoluciona con la práctica pero mantiene sus principios fundamentales inmutables.

---

**Desarrollado por y para Claude Code siguiendo el Sistema 01234**  
*La única fuente de verdad para el desarrollo web consistente con Sergio Forés*