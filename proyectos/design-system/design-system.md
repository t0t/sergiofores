# Design System - Sergio Forés

**Sistema de diseño unificado para todos los proyectos web y prototipos del CEREBRO-DIGITAL**

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

*Design System v1.0 - Creado: 2025-06-26*  
*Estado: Definitivo y operativo*  
*Uso: Todos los proyectos web CEREBRO-DIGITAL*