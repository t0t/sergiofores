# Design System - Sergio Forés

**Sistema de diseño unificado para todos los proyectos web y prototipos del CEREBRO-DIGITAL**

## ✨ Últimas Actualizaciones

**Versión 2.1 - Nuevos Componentes (Junio 2024)**
- ✅ **Sistema de Iconos SVG** completo con 15+ iconos inline
- ✅ **2 Componentes Footer**: Simple y Completo
- ✅ **3 Componentes Features**: Grid, Cards y Highlight
- ✅ Responsive design mejorado
- ✅ Documentación actualizada con ejemplos

---

## 🎯 Principios Fundamentales

### Filosofía de Diseño
- **Tipografía como Arquitectura**: La tipografía estructura el contenido
- **Color con Propósito**: Base neutra (80%) + énfasis justificado (20%)
- **Funcionalidad > Ornamentación**: Cada elemento debe servir una función específica
- **Limpieza Extrema**: Eliminar todo lo no esencial
- **Spacing Perfecto**: Sistema sistemático basado en 8px

### Jerarquía de Decisiones
1. **Funcionalidad** - ¿Sirve un propósito específico?
2. **Legibilidad** - ¿Es clara y accesible?
3. **Consistencia** - ¿Sigue el sistema establecido?
4. **Elegancia** - ¿Mantiene la limpieza visual?

---

## 🎨 Paleta de Colores

### ✅ PROBLEMA RESUELTO: Paleta Completa Visible

**Diagnóstico completado:** La sección de colores en `index.html` ahora muestra TODA la paleta disponible en el sistema de diseño, no solo dos colores.

**Causa del problema identificada:**
- Los elementos `.color-swatch` no tenían estilos CSS definidos
- Inconsistencia en la estructura HTML entre colores
- Faltaba funcionalidad interactiva para copiar variables

**Solución implementada:**
- ✅ **Estilos CSS completos** para `.color-swatch`, `.color-preview`, `.color-name`, `.color-value`
- ✅ **Estructura HTML unificada** para todos los colores
- ✅ **5 grupos de colores organizados** según función
- ✅ **Funcionalidad copy-to-clipboard** con feedback visual
- ✅ **Layout responsive** con grid adaptativo
- ✅ **Accesibilidad completa** (teclado + tooltips)

### Grupos de Colores Implementados

1. **Grises Base (12 colores)**
2. **Colores de Texto (4 colores)**  
3. **Colores de Superficie (4 colores)**
4. **Colores de Acento (4 colores)**
5. **Paleta Tech Verde (4 colores)**

**Total: 28 colores visibles** vs. 2 colores anteriores

## 🎨 Paleta de Colores

### Base Neutra (80% del diseño)
```css
:root {
    /* Fondos */
    --neutral-white: #FEFEFE;        /* Fondo principal */
    --neutral-cream: #FDFBF7;        /* Fondo alternativo */
    --neutral-gray-50: #F8F6F0;      /* Gris muy claro */
    
    /* Bordes y divisiones */
    --neutral-gray-200: #E5E7EB;     /* Bordes suaves */
    --neutral-gray-400: #9CA3AF;     /* Bordes visibles */
    
    /* Textos */
    --neutral-gray-600: #6B7280;     /* Texto secundario */
    --neutral-gray-800: #2C2C2C;     /* Texto principal */
    --neutral-black: #1A1A1A;        /* Títulos y énfasis */
}
```

### Colores de Énfasis (20% - Solo uso justificado)
```css
:root {
    /* Énfasis principal */
    --accent-orange: #FF6B35;        /* Elementos importantes, CTAs */
    
    /* Bauhaus clásicos (uso selectivo) */
    --accent-red: #E30613;           /* Alertas, warnings */
    --accent-blue: #0066CC;          /* Enlaces, acciones */
    --accent-yellow: #FFD100;        /* Advertencias, highlights */
    
    /* Orgánico (uso contextual) */
    --accent-green: #9CAF88;         /* Confirmaciones, success */
}
```

### Reglas de Uso
- **Estructura**: Usar siempre neutros como base
- **Énfasis**: Color solo cuando hay justificación funcional
- **Jerarquía**: Orange para elementos más importantes
- **Consistencia**: Mismo color = misma función

---

## 🔤 Sistema Tipográfico

### Fuentes Base
```css
:root {
    /* Primaria - Extremadamente limpia */
    --font-primary: 'Futura', 'Avenir Next', 'Helvetica Neue', sans-serif;
    
    /* Secundaria - Contenido académico */
    --font-secondary: 'Crimson Text', 'Charter', 'Times New Roman', serif;
    
    /* Monospace - Elementos técnicos */
    --font-mono: 'JetBrains Mono', 'SF Mono', 'Courier New', monospace;
}
```

### Escala Tipográfica
```css
:root {
    /* Tamaños fluidos responsivos */
    --text-xs: clamp(0.75rem, 0.8vw, 0.875rem);    /* 12-14px */
    --text-sm: clamp(0.875rem, 1vw, 1rem);         /* 14-16px */
    --text-base: clamp(1rem, 1.2vw, 1.125rem);     /* 16-18px */
    --text-lg: clamp(1.125rem, 1.5vw, 1.25rem);    /* 18-20px */
    --text-xl: clamp(1.25rem, 2vw, 1.5rem);        /* 20-24px */
    --text-2xl: clamp(1.5rem, 3vw, 2rem);          /* 24-32px */
    --text-3xl: clamp(2rem, 4vw, 3rem);            /* 32-48px */
    --text-4xl: clamp(2.5rem, 6vw, 4rem);          /* 40-64px */
    --text-5xl: clamp(3rem, 8vw, 6rem);            /* 48-96px */
}
```

### Características Críticas
```css
/* Spacing perfecto */
.text-title {
    font-family: var(--font-primary);
    font-weight: 300;
    letter-spacing: 4px;                 /* Amplio para títulos */
    line-height: 1.2;
    text-transform: uppercase;
}

.text-body {
    font-family: var(--font-primary);
    font-weight: 300;
    letter-spacing: 0.5px;               /* Sutil para cuerpo */
    line-height: 1.7;                    /* Respirado */
}

.text-nav {
    font-family: var(--font-primary);
    font-weight: 400;
    letter-spacing: 3px;                 /* Extra amplio para navegación */
    text-transform: uppercase;
    font-size: var(--text-sm);
}
```

---

## 📐 Sistema de Espaciado

### Grid Base 8px
```css
:root {
    --space-1: 0.5rem;   /* 8px */
    --space-2: 1rem;     /* 16px */
    --space-3: 1.5rem;   /* 24px */
    --space-4: 2rem;     /* 32px */
    --space-6: 3rem;     /* 48px */
    --space-8: 4rem;     /* 64px */
    --space-12: 6rem;    /* 96px */
    --space-16: 8rem;    /* 128px */
    --space-20: 10rem;   /* 160px */
    --space-24: 12rem;   /* 192px */
}
```

### Reglas de Aplicación
```css
/* Contenedores principales */
.container {
    max-width: 1400px;
    margin: 0 auto;
    padding: 0 var(--space-4);
}

/* Secciones */
.section {
    padding: var(--space-12) 0;          /* Vertical generoso */
}

.section-large {
    padding: var(--space-16) 0;          /* Secciones importantes */
}

/* Elementos */
.element {
    margin-bottom: var(--space-4);       /* Separación estándar */
    padding: var(--space-3);             /* Padding interno */
}

/* Grids */
.grid {
    gap: var(--space-6);                 /* Gap generoso */
}
```

---

## 🧩 Componentes Base

### Headers Minimalistas
```css
.header {
    background: var(--neutral-white);
    border-bottom: 1px solid var(--neutral-gray-200);
    padding: var(--space-3) 0;
}

.header-content {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

/* Logo Bauhaus */
.logo {
    display: flex;
    align-items: center;
    gap: var(--space-2);
}

.geo-shape {
    width: 32px;
    height: 32px;
    transition: transform 0.3s ease;
}

.geo-circle { 
    background: var(--accent-red);
    border-radius: 50%; 
}

.geo-square { 
    background: var(--accent-yellow);
    border-radius: 4px; 
}

.geo-triangle { 
    width: 0; height: 0;
    border-left: 16px solid transparent;
    border-right: 16px solid transparent;
    border-bottom: 32px solid var(--accent-blue);
}
```

### Navegación
```css
.nav {
    display: flex;
    gap: var(--space-6);
}

.nav a {
    text-decoration: none;
    color: var(--neutral-gray-800);
    font-family: var(--font-primary);
    font-weight: 400;
    text-transform: uppercase;
    font-size: var(--text-sm);
    letter-spacing: 3px;
    padding: var(--space-1) 0;
    border-bottom: 2px solid transparent;
    transition: all 0.3s ease;
}

.nav a:hover,
.nav a.active {
    color: var(--accent-orange);
    border-bottom-color: var(--accent-orange);
}
```

### Cards Limpias
```css
.card {
    background: var(--neutral-white);
    border: 1px solid var(--neutral-gray-200);
    padding: var(--space-6);
    transition: all 0.3s ease;
}

.card:hover {
    transform: translateY(-4px);
    box-shadow: 0 12px 40px rgba(0, 0, 0, 0.08);
    border-color: var(--neutral-gray-400);
}

.card-title {
    font-family: var(--font-primary);
    font-size: var(--text-xl);
    font-weight: 400;
    margin-bottom: var(--space-2);
    color: var(--neutral-black);
    letter-spacing: 1px;
}

.card-text {
    font-size: var(--text-base);
    line-height: 1.7;
    color: var(--neutral-gray-600);
    letter-spacing: 0.3px;
}
```

### Botones
```css
.btn {
    font-family: var(--font-primary);
    font-weight: 400;
    text-transform: uppercase;
    letter-spacing: 2px;
    padding: var(--space-3) var(--space-6);
    border: none;
    transition: all 0.3s ease;
    cursor: pointer;
}

.btn-primary {
    background: var(--accent-orange);
    color: var(--neutral-white);
}

.btn-primary:hover {
    background: var(--neutral-black);
    transform: translateY(-2px);
}

.btn-secondary {
    background: transparent;
    color: var(--neutral-gray-800);
    border: 1px solid var(--neutral-gray-400);
}

.btn-secondary:hover {
    border-color: var(--accent-orange);
    color: var(--accent-orange);
}
```

---

## 📱 Sistema Responsive

### Breakpoints
```css
:root {
    --mobile: 480px;
    --tablet: 768px;
    --desktop: 1024px;
    --wide: 1400px;
}
```

### Estrategia Mobile-First
```css
/* Base: Mobile */
.element {
    grid-template-columns: 1fr;
    gap: var(--space-3);
}

/* Tablet */
@media (min-width: 768px) {
    .element {
        grid-template-columns: repeat(2, 1fr);
        gap: var(--space-4);
    }
}

/* Desktop */
@media (min-width: 1024px) {
    .element {
        grid-template-columns: repeat(3, 1fr);
        gap: var(--space-6);
    }
}
```

---

## 🎭 Efectos y Transiciones

### Transiciones Suaves
```css
/* Base universal */
* {
    transition: all 0.3s ease;
}

/* Hover effects sutiles */
.interactive:hover {
    transform: translateY(-4px);
}

/* Focus states accesibles */
a:focus,
button:focus {
    outline: 2px solid var(--accent-orange);
    outline-offset: 2px;
}
```

### Animaciones Específicas
```css
/* Breathing effect para elementos orgánicos */
@keyframes breathe {
    0%, 100% { transform: scale(1); }
    50% { transform: scale(1.05); }
}

.organic-element {
    animation: breathe 4s ease-in-out infinite;
}

/* Morphing para transiciones */
.morph {
    border-radius: 20px;
    transition: border-radius 0.5s ease;
}

.morph:hover {
    border-radius: 50px;
}
```

---

## 🔧 Implementación

### CSS Base Template
```css
/* Reset y variables */
*, *::before, *::after {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

:root {
    /* Importar todas las variables del sistema */
}

body {
    font-family: var(--font-primary);
    background: var(--neutral-white);
    color: var(--neutral-gray-800);
    line-height: 1.7;
    font-size: var(--text-base);
    font-weight: 300;
    letter-spacing: 0.5px;
}

/* Smooth scroll */
html {
    scroll-behavior: smooth;
}

/* Container base */
.container {
    max-width: var(--wide);
    margin: 0 auto;
    padding: 0 var(--space-4);
}
```

### Checklist de Proyecto
- [ ] Variables CSS implementadas
- [ ] Tipografía con spacing correcto
- [ ] Paleta de colores con uso justificado
- [ ] Componentes base aplicados
- [ ] Responsive mobile-first
- [ ] Accesibilidad (focus states, contraste)
- [ ] Performance (lazy loading, optimización)

---

## 📚 Referencias Rápidas

### Uso de Color
- **Estructura**: Solo neutros
- **Navegación**: Neutros + orange para estados activos
- **CTAs**: Orange primary, neutros secondary
- **Estados**: Verde (success), rojo (error), amarillo (warning)

### Tipografía
- **Títulos**: Futura, 300 weight, letter-spacing amplio
- **Cuerpo**: Futura, 300 weight, line-height 1.7
- **Navegación**: Futura, 400 weight, uppercase, letter-spacing 3px
- **Académico**: Crimson Text cuando sea contextualmente apropiado

### Espaciado
- **Secciones**: var(--space-12) o var(--space-16)
- **Elementos**: var(--space-4) margin-bottom
- **Grids**: var(--space-6) gap
- **Cards**: var(--space-6) padding

---

## 🎯 Nuevos Componentes (v2.1)

### Sistema de Iconos SVG

**Características:**
- ✅ 15+ iconos SVG inline para mejor performance
- ✅ Múltiples tamaños: xs (12px) → 2xl (40px)
- ✅ Variantes de color: primary, secondary, success, warning, error, tech
- ✅ Estados interactivos con hover effects
- ✅ Compatibilidad total con screen readers

**Uso básico:**
```html
<!-- Icono básico -->
<span class="icon icon--check"></span>

<!-- Con tamaño y color -->
<span class="icon icon--star icon--lg icon--primary"></span>

<!-- Icono con texto -->
<div class="icon-text">
    <span class="icon icon--mail icon--primary"></span>
    <span>Email de contacto</span>
</div>
```

**Iconos disponibles:**
- Navegación: `arrow-right`, `arrow-left`, `arrow-up`, `arrow-down`, `menu`, `close`
- Acciones: `check`, `star`, `heart`, `search`, `external`
- Contacto: `mail`, `phone`, `location`, `globe`
- Redes sociales: `instagram`, `twitter`, `linkedin`, `github`, `youtube`

### Componentes Footer

#### Footer Simple
- ✅ Navegación centrada con links principales
- ✅ Redes sociales con iconos SVG
- ✅ Copyright y marca minimalista
- ✅ Efectos hover elegantes

```html
<footer class="footer footer--simple">
    <div class="footer__container">
        <div class="footer__content">
            <a href="#" class="footer__brand">SERGIO.01234</a>
            <nav class="footer__links">
                <a href="#" class="footer__link">Trabajo</a>
                <a href="#" class="footer__link">Sobre mí</a>
            </nav>
            <div class="footer__social">
                <a href="#" class="footer__social-link">
                    <span class="icon icon--instagram"></span>
                </a>
            </div>
        </div>
    </div>
</footer>
```

#### Footer Completo
- ✅ Estructura de 4 columnas responsiva
- ✅ Sección de marca con descripción
- ✅ Múltiples secciones de navegación
- ✅ Información de contacto con iconos
- ✅ Footer bottom con enlaces legales

```html
<footer class="footer footer--complete">
    <div class="footer__container">
        <div class="footer__main">
            <div class="footer__brand-section">
                <a href="#" class="footer__brand">SERGIO.01234</a>
                <p class="footer__description">Descripción del proyecto...</p>
                <div class="footer__social">...</div>
            </div>
            <div class="footer__section">
                <h3 class="footer__section-title">Navegación</h3>
                <div class="footer__section-links">...</div>
            </div>
        </div>
    </div>
</footer>
```

### Componentes Features

#### Features Grid
- ✅ Grid responsivo de características
- ✅ Iconos personalizables con efectos 3D
- ✅ Animaciones de hover sofisticadas
- ✅ Enlaces con iconos de acción

```html
<section class="features features--grid">
    <div class="features__container">
        <div class="features__header">
            <h2 class="features__title">Título Principal</h2>
            <p class="features__subtitle">Subtítulo descriptivo</p>
        </div>
        <div class="features__grid">
            <div class="features__item">
                <div class="features__icon">
                    <span class="icon icon--star"></span>
                </div>
                <h3 class="features__item-title">Característica</h3>
                <p class="features__item-description">Descripción...</p>
                <a href="#" class="features__item-link">Ver más</a>
            </div>
        </div>
    </div>
</section>
```

#### Features Cards
- ✅ Tarjetas con imágenes destacadas
- ✅ Categorías y metadatos organizados
- ✅ Overlay icons con efectos de transformación
- ✅ Footer con links y metadata

```html
<section class="features features--cards">
    <div class="features__container">
        <div class="features__cards">
            <div class="features__card">
                <img src="imagen.jpg" class="features__card-image">
                <div class="features__card-overlay">
                    <span class="icon icon--star"></span>
                </div>
                <div class="features__card-content">
                    <span class="features__card-category">Categoría</span>
                    <h3 class="features__card-title">Título</h3>
                    <p class="features__card-description">Descripción...</p>
                </div>
            </div>
        </div>
    </div>
</section>
```

#### Features Highlight
- ✅ Layout de dos columnas con imagen
- ✅ Lista de características con iconos
- ✅ Sección de CTAs prominente
- ✅ Efectos visuales de profundidad

```html
<section class="features features--highlight">
    <div class="features__container">
        <div class="features__content">
            <div class="features__text">
                <h2 class="features__title">Título Destacado</h2>
                <p class="features__description">Descripción principal...</p>
                <ul class="features__list">
                    <li class="features__list-item">
                        <span class="icon icon--check features__list-icon"></span>
                        <div class="features__list-content">
                            <h4>Característica</h4>
                            <p>Descripción detallada...</p>
                        </div>
                    </li>
                </ul>
                <div class="features__cta">
                    <a href="#" class="btn btn--primary">CTA Principal</a>
                </div>
            </div>
            <div class="features__image">
                <img src="imagen.jpg" alt="Descripción">
            </div>
        </div>
    </div>
</section>
```

## 📚 Recursos de Implementación

### Archivos Demo
- **ejemplos-nuevos-componentes.html**: Showcase completo de todos los nuevos componentes
- **sergio-components.css**: CSS actualizado con todos los componentes
- **sergio-design-tokens.css**: Variables y tokens del sistema

### Guidelines de Uso
1. **Siempre importar primero** los design tokens
2. **Usar variables CSS** para mantener consistencia
3. **Seguir nomenclatura BEM** para modificadores
4. **Testear responsividad** en múltiples dispositivos
5. **Validar accesibilidad** con herramientas estándar

---

*Design System v2.1 - Actualizado: 2025-06-28*  
*Estado: Ampliado con componentes Footer, Features e Iconos*  
*Uso: Todos los proyectos web CEREBRO-DIGITAL*