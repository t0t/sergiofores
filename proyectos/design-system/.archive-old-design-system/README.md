# SERGIO FORÉS - SISTEMA DE DISEÑO ATÓMICO

Sistema de diseño centralizado que resuelve problemas de inconsistencia visual y mala maquetación en todos los proyectos web de CEREBRO-DIGITAL.

## 🎯 Problemas Que Resuelve

### ❌ Antes (Problemas Identificados)
- **Ritmos verticales incorrectos**: Spacing inconsistente entre elementos
- **Mal uso del viewport**: Desaprovechamiento del área visible
- **Colores de fondo inadecuados**: Uso sin criterio de backgrounds
- **Falta de componentes**: Repetición de código y estilos
- **Inconsistencia entre proyectos**: Cada web con criterios diferentes

### ✅ Después (Soluciones Implementadas)
- **Sistema de espaciado 8px**: Ritmo vertical perfecto y consistente
- **Viewport optimization**: Uso inteligente de vh/vw y clamp()
- **Paleta neutra centralizada**: Grises como base, color justificado
- **Componentes atómicos**: Reutilización y consistency absoluta
- **Design tokens centralizados**: Un solo archivo controla todo

## 🏗️ Arquitectura del Sistema

```
design-system/
├── sergio-design-tokens.css    # Variables centralizadas
├── sergio-components.css       # Componentes atómicos
├── README.md                  # Esta documentación
└── index.html                 # Documentación interactiva
```

## 📐 Criterios de Diseño Sergio Forés

### Tipografía
- **Fuente**: Avenir Next/Futura como primaria
- **Peso**: 300-400 preferido, nunca muy bold
- **Interletrado**: Amplio (2-4px) para breathing perfecto
- **Interlineado**: Generoso (1.6-1.8) para legibilidad

### Colores
- **Base**: Neutros y grises como foundation
- **Acento**: Color solo cuando está justificado
- **Backgrounds**: Sutiles, que apoyen sin distraer

### Espaciado
- **Sistema**: Base 8px matemático y sistemático
- **Breathing room**: Generous white space
- **Vertical rhythm**: Baseline grid consistente

### Estilo Visual
- **Líneas limpias**: Sin ornamentación innecesaria
- **Geometría funcional**: Bauhaus y Swiss design principles
- **Minimalismo inteligente**: Eliminar todo lo no esencial

## 🚀 Uso del Sistema

### 1. Importar Design Tokens (Siempre Primero)

```html
<link rel="stylesheet" href="sergio-design-tokens.css">
```

### 2. Importar Componentes

```html
<link rel="stylesheet" href="sergio-components.css">
```

### 3. Usar Variables CSS

```css
.mi-componente {
  padding: var(--space-md);
  font-size: var(--text-lg);
  color: var(--color-text-primary);
  background: var(--color-surface-secondary);
}
```

## 🧩 Componentes Disponibles

### Átomos
- **Botones**: `.btn`, `.btn--primary`, `.btn--secondary`, `.btn--ghost`, `.btn--sm`, `.btn--lg`
- **Inputs**: `.input`, `.label`
- **Links**: `.link`, `.link--accent`
- **Badges**: `.badge`, `.badge--primary`, `.badge--secondary`, `.badge--success`, `.badge--warning`, `.badge--error`
- **Loading**: `.loading`, `.loading--lg`
- **Switches**: `.switch`, `.switch__input`, `.switch__slider`

### Moléculas
- **Navegación**: `.nav`, `.nav__item`, `.nav__link`
- **Cards**: `.card`, `.card__header`, `.card__body`, `.card__footer`
- **Forms**: `.form-group`
- **Alerts**: `.alert`, `.alert--info`, `.alert--success`, `.alert--warning`, `.alert--error`
- **Progress**: `.progress`, `.progress__bar`, `.progress--sm`, `.progress--lg`
- **Tooltips**: `.tooltip`, `.tooltip__content`
- **Chips**: `.chip`, `.chip.is-selected`, `.chip__remove`
- **Breadcrumbs**: `.breadcrumbs`, `.breadcrumbs__item`, `.breadcrumbs__link`
- **Tabs**: `.tabs`, `.tabs__list`, `.tabs__trigger`, `.tabs__panel`
- **Dropdowns**: `.dropdown`, `.dropdown__menu`, `.dropdown__item`
- **Accordions**: `.accordion__item`, `.accordion__trigger`, `.accordion__content`

### Organismos
- **Header**: `.header`, `.header__container`, `.header__logo`
- **Hero**: `.hero`, `.hero__title`, `.hero__subtitle`
- **Sections**: `.section`, `.section--gray`
- **Footer**: `.footer`, `.footer__container`
- **Modals**: `.modal`, `.modal__content`, `.modal__header`, `.modal__body`, `.modal__footer`
- **Tables**: `.table`, `.table--striped`, `.table--bordered`, `.table__row`, `.table__cell`
- **Pagination**: `.pagination`, `.pagination__item`, `.pagination__link`
- **Skeleton**: `.skeleton`, `.skeleton--text`, `.skeleton--title`, `.skeleton--avatar`

### Componentes Heroes (Nuevos)
- **Hero Minimal**: `.hero--minimal` - Hero centrado con CTA
- **Hero Background**: `.hero--background` - Hero con imagen de fondo
- **Hero Split**: `.hero--split` - Hero dividido contenido + imagen
- **Elementos**: `.hero__content`, `.hero__title`, `.hero__subtitle`, `.hero__actions`, `.hero__features`, `.hero__feature`, `.hero__visual`, `.hero__image`

### Componentes Headers (Nuevos)
- **Header Simple**: `.header--simple` - Header básico con logo y navegación
- **Header CTA**: `.header--cta` - Header con botones de acción
- **Header Complete**: `.header--complete` - Header completo con top bar, search y account
- **Elementos**: `.header__nav`, `.header__nav-list`, `.header__nav-item`, `.header__nav-link`, `.header__actions`, `.header__top`, `.header__contact`, `.header__social`, `.header__search`, `.header__account`, `.header__utilities`

### Componentes Interactivos (con JavaScript)
- **Carousel**: `.carousel`, `.carousel__container`, `.carousel__slide`, `.carousel__btn`, `.carousel__indicators`
- **Slideshow**: `.slideshow`, `.slideshow__slide`, `.slideshow__controls`, `.slideshow__progress`
- **Range Slider**: `.slider-range`, `.slider-range__track`, `.slider-range__thumb`, `.slider-range__value`
- **Comparison Slider**: `.comparison-slider`, `.comparison-slider__handle`, `.comparison-slider__divider`
- **Image Gallery**: `.image-gallery`, `.image-gallery__item`, `.lightbox`
- **Animated Counter**: `.animated-counter`
- **Sidebar Navigation**: `.sidebar`, `.sidebar__nav`, `.sidebar__link`, `.sidebar__toggle`, `.sidebar--mobile`

## 🏗️ Sistema de Grid Completo

### Grid de 12 Columnas
```css
.grid-1 a .grid-12    /* Columnas fijas */
.grid-auto-fit-xs     /* Auto-fit responsive desde 150px */
.grid-auto-fit-sm     /* Auto-fit responsive desde 200px */
.grid-auto-fit-md     /* Auto-fit responsive desde 250px */
.grid-auto-fit-lg     /* Auto-fit responsive desde 300px */
```

### Spanning y Posicionamiento
```css
.col-span-1 a .col-span-12    /* Ocupar múltiples columnas */
.col-start-1 a .col-start-12  /* Posición de inicio */
.col-end-1 a .col-end-13      /* Posición de fin */
.row-span-1 a .row-span-6     /* Ocupar múltiples filas */
```

### Layouts Predefinidos
```css
.layout-sidebar-left    /* Sidebar izquierdo + contenido */
.layout-sidebar-right   /* Contenido + sidebar derecho */
.layout-holy-grail      /* Header + 3 columnas + footer */
.layout-masonry         /* Layout tipo Pinterest */
```

### Gaps Configurables
```css
.gap-none, .gap-xs, .gap-sm, .gap-md, .gap-lg, .gap-xl, .gap-2xl
```

## 📱 Sistema Responsive

### Breakpoints
```css
--bp-sm: 640px    /* Mobile large */
--bp-md: 768px    /* Tablet */
--bp-lg: 1024px   /* Desktop */
--bp-xl: 1280px   /* Desktop large */
```

### Contenedores Fluidos
```css
--container-fluid: min(90vw, 1200px)
--container-narrow: min(85vw, 800px)
--container-wide: min(95vw, 1400px)
```

## 🎨 Paletas de Color

### Paleta Base (Neutral)
```css
--color-gray-50: #fafafa    /* Backgrounds sutiles */
--color-gray-100: #f5f5f5   /* Backgrounds secundarios */
--color-gray-500: #737373   /* Textos secundarios */
--color-gray-900: #171717   /* Textos principales */
```

### Paleta Tech Verde (sergio-dev)
```css
--color-tech-primary: #00FF88   /* Verde principal */
--color-tech-glow: rgba(0, 255, 136, 0.3)  /* Efectos glow */
```

## 📏 Sistema de Espaciado Atómico

### Escala Granular Completa
Sistema basado en incrementos de 4px desde 0 hasta 384px, con nomenclatura intuitiva y soporte responsive completo.

### Variables Base
```css
/* Escala granular 4px-384px */
--space-0: 0;
--space-px: 1px;      /* Para bordes finos */
--space-1: 0.25rem;   /* 4px */
--space-2: 0.5rem;    /* 8px */
--space-3: 0.75rem;   /* 12px */
--space-4: 1rem;      /* 16px */
--space-6: 1.5rem;    /* 24px */
--space-8: 2rem;      /* 32px */
--space-12: 3rem;     /* 48px */
--space-16: 4rem;     /* 64px */
--space-20: 5rem;     /* 80px */
--space-24: 6rem;     /* 96px */
--space-32: 8rem;     /* 128px */
/* ... hasta --space-96: 24rem (384px) */

/* Aliases semánticos */
--space-xs: var(--space-2);    /* 8px */
--space-sm: var(--space-4);    /* 16px */
--space-md: var(--space-6);    /* 24px */
--space-lg: var(--space-8);    /* 32px */
--space-xl: var(--space-12);   /* 48px */
--space-2xl: var(--space-16);  /* 64px */
--space-3xl: var(--space-20);  /* 80px */
```

### Clases Atómicas de Margin
```css
/* Todas las direcciones */
.m-0, .m-1, .m-2, .m-3, .m-4, .m-6, .m-8, .m-12, .m-16, .m-20, .m-24, .m-32, .m-40, .m-48, .m-64, .m-80, .m-96
.m-auto

/* Ejes */
.mx-0, .mx-1, .mx-2, .mx-4, .mx-6, .mx-8, .mx-12, .mx-16, .mx-20, .mx-24, .mx-32, .mx-40, .mx-48, .mx-64, .mx-80, .mx-96
.mx-auto
.my-0, .my-1, .my-2, .my-4, .my-6, .my-8, .my-12, .my-16, .my-20, .my-24, .my-32, .my-40, .my-48, .my-64, .my-80, .my-96
.my-auto

/* Lados individuales */
.mt-*, .mr-*, .mb-*, .ml-* (todos los valores disponibles)
.mt-auto, .mr-auto, .mb-auto, .ml-auto
```

### Clases Atómicas de Padding  
```css
/* Todas las direcciones */
.p-0, .p-1, .p-2, .p-3, .p-4, .p-6, .p-8, .p-12, .p-16, .p-20, .p-24, .p-32, .p-40, .p-48, .p-64, .p-80, .p-96

/* Ejes */
.px-0, .px-1, .px-2, .px-4, .px-6, .px-8, .px-12, .px-16, .px-20, .px-24, .px-32, .px-40, .px-48, .px-64, .px-80, .px-96
.py-0, .py-1, .py-2, .py-4, .py-6, .py-8, .py-12, .py-16, .py-20, .py-24, .py-32, .py-40, .py-48, .py-64, .py-80, .py-96

/* Lados individuales */
.pt-*, .pr-*, .pb-*, .pl-* (todos los valores disponibles)
```

### Spacing Entre Elementos
```css
/* Vertical spacing */
.space-y-0, .space-y-1, .space-y-2, .space-y-4, .space-y-6, .space-y-8, .space-y-12, .space-y-16, .space-y-20, .space-y-24, .space-y-32, .space-y-40, .space-y-48, .space-y-64, .space-y-80, .space-y-96

/* Horizontal spacing */
.space-x-0, .space-x-1, .space-x-2, .space-x-4, .space-x-6, .space-x-8, .space-x-12, .space-x-16, .space-x-20, .space-x-24, .space-x-32, .space-x-40, .space-x-48, .space-x-64, .space-x-80, .space-x-96

/* Stack utilities */
.stack, .stack-xs, .stack-sm, .stack-md, .stack-lg, .stack-xl
.inline, .inline-xs, .inline-sm, .inline-md, .inline-lg, .inline-xl
```

### Responsive Variants
Todas las clases tienen variantes responsive:
```css
.sm:m-*, .sm:p-*, .sm:space-*     /* 640px+ */
.md:m-*, .md:p-*, .md:space-*     /* 768px+ */
.lg:m-*, .lg:p-*, .lg:space-*     /* 1024px+ */
```

### Ejemplos de Uso
```html
<!-- Margin responsive -->
<div class="mx-0 sm:mx-4 md:mx-8 lg:mx-16">
  Margin adaptativo por breakpoint
</div>

<!-- Padding combinado -->
<div class="p-0 px-4 py-6">
  Sin padding, pero con px-4 y py-6
</div>

<!-- Centrado automático -->
<div class="mx-auto" style="width: 300px;">
  Elemento centrado horizontalmente
</div>

<!-- Stack vertical -->
<div class="space-y-4">
  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div>
</div>

<!-- Inline horizontal -->
<div class="space-x-2" style="display: flex;">
  <span>Tag 1</span>
  <span>Tag 2</span>
  <span>Tag 3</span>
</div>
```

## ✅ Checklist de Validación

### Antes de Deploy
- [ ] **Design tokens importados** como primer CSS
- [ ] **Spacing sistemático** usando variables --space-*
- [ ] **Tipografía consistente** con variables --text-* y --font-*
- [ ] **Colores justificados** solo cuando aportan valor
- [ ] **Viewport optimizado** con unidades fluidas
- [ ] **Mobile-first** approach implementado
- [ ] **Componentes reutilizados** en lugar de CSS custom
- [ ] **Accesibilidad** con focus states y contraste adecuado

### Métricas de Calidad
- **Typography scale**: Coherente y fluida
- **Vertical rhythm**: Matemático basado en baseline
- **Color usage**: Neutros como base, acento justificado
- **Spacing consistency**: Todo múltiplo de 8px
- **Responsive behavior**: Perfecto en todos los devices
- **Component reusability**: Sin duplicación de CSS

## 🔧 Mantenimiento

### Actualizar Design Tokens
1. Modificar solo `sergio-design-tokens.css`
2. Los cambios se propagan automáticamente a todos los proyectos
3. Testear en proyectos principales antes de deploy

### Añadir Componentes
1. Crear nuevo componente en `sergio-components.css`
2. Documentar en este README
3. Usar design tokens existentes siempre que sea posible

### Validar Consistencia
1. Activar agente **UI Analyzer** para auditoría
2. Usar **Layout Specialist** para problemas de maquetación
3. **Design System Manager** para coherencia general

## 📱 Componentes Heroes - Secciones Principales

### Características de Heroes
Los componentes hero están diseñados para crear impacto inmediato en landing pages y páginas principales.

### Variantes Disponibles

#### Hero Minimal (.hero--minimal)
- **Propósito**: Landing page centrada y limpia
- **Características**: Centrado, fondo neutro, enfoque en tipografía
- **Uso ideal**: SaaS, servicios profesionales, portfolios minimalistas

#### Hero Background (.hero--background)
- **Propósito**: Impacto visual máximo con imagen
- **Características**: Imagen de fondo, overlay gradient, texto contrastado
- **Uso ideal**: Productos visuales, eventos, marcas emocionales

#### Hero Split (.hero--split)
- **Propósito**: Equilibrio entre contenido e imagen
- **Características**: Layout en dos columnas, features destacadas
- **Uso ideal**: Software, aplicaciones, productos digitales

### Estructura HTML Básica Heroes
```html
<div class="hero hero--minimal">
  <div class="container">
    <div class="hero__content">
      <h1 class="hero__title">Título Principal</h1>
      <p class="hero__subtitle">Subtítulo explicativo</p>
      <div class="hero__actions">
        <a href="#" class="btn btn--primary btn--lg">CTA Principal</a>
        <a href="#" class="btn btn--secondary btn--lg">CTA Secundario</a>
      </div>
    </div>
  </div>
</div>
```

## 📱 Componentes Headers - Cabeceras Principales

### Características de Headers
Sistema completo de cabeceras para diferentes tipos de sitios web y aplicaciones.

### Variantes Disponibles

#### Header Simple (.header--simple)
- **Propósito**: Navegación básica y elegante
- **Características**: Logo + navegación horizontal
- **Uso ideal**: Portfolios, blogs, sitios corporativos simples

#### Header CTA (.header--cta)
- **Propósito**: Conversión y llamadas a la acción
- **Características**: Logo + navegación + botones CTA prominentes
- **Uso ideal**: SaaS, ecommerce, landing pages comerciales

#### Header Complete (.header--complete)
- **Propósito**: Aplicaciones web complejas
- **Características**: Top bar + navegación + búsqueda + cuenta usuario
- **Uso ideal**: Dashboards, plataformas, aplicaciones enterprise

### Estructura HTML Básica Headers
```html
<header class="header header--cta">
  <div class="container">
    <div class="header__container">
      <div class="header__logo">Logo</div>
      <nav class="header__nav">
        <ul class="header__nav-list">
          <li class="header__nav-item">
            <a href="#" class="header__nav-link">Enlace</a>
          </li>
        </ul>
      </nav>
      <div class="header__actions">
        <a href="#" class="btn btn--primary">CTA</a>
      </div>
    </div>
  </div>
</header>
```

## 🎯 Roadmap

### Completado ✅
- [x] **Heroes y Headers**: 3 variantes de cada componente principal
- [x] **Componentes interactivos**: Carousels, sliders, galerías avanzadas
- [x] **Sidebar navigation**: Sistema completo con múltiples variantes
- [x] **Espaciado optimizado**: Sistema matemático basado en 8px

### Próximas Mejoras
- [ ] **Templates completos** para landing pages
- [ ] **Component library** con ejemplos interactivos
- [ ] **Dark mode tokens** para proyectos que lo requieran
- [ ] **Animation system** con micro-interactions
- [ ] **Icon system** con SVG sprites
- [ ] **Grid templates** avanzados para layouts complejos

## 📱 Componente Sidebar Navigation

### Características Principales
- **Navegación inteligente** con highlighting automático de sección activa
- **Responsive completo** con versión móvil hamburger
- **Grupos colapsables** para organizar navegaciones complejas
- **Múltiples variantes**: básico, móvil, tema oscuro, compacto
- **Accesibilidad completa** con navegación por teclado
- **IntersectionObserver** para sync automático con scroll

### Variantes Disponibles
```css
.sidebar                /* Sidebar básico sticky */
.sidebar--mobile        /* Versión móvil con overlay */
.sidebar--dark          /* Tema oscuro */
.sidebar--floating      /* Sombra flotante */
.sidebar--compact       /* Expandible al hover */
.sidebar__collapsible   /* Con grupos colapsables */
```

### Estructura HTML Básica
```html
<nav class="sidebar">
  <div class="sidebar__header">
    <h3 class="sidebar__title">Navigation</h3>
    <div class="sidebar__subtitle">Menu</div>
  </div>
  
  <ul class="sidebar__nav">
    <li class="sidebar__item">
      <a href="#section" class="sidebar__link is-active">
        <svg class="sidebar__icon">...</svg>
        Section
        <span class="sidebar__badge">5</span>
      </a>
    </li>
  </ul>
  
  <div class="sidebar__footer">
    App v2.0
  </div>
</nav>
```

### Funcionalidades JavaScript
- **Auto-inicialización** al cargar la página
- **Smooth scrolling** a secciones
- **URL sync** con hash fragments
- **Mobile auto-close** al seleccionar enlace
- **Keyboard navigation** (Arrow keys, Enter, Escape)
- **Touch/swipe support** en móvil

---

## 🆕 EXPANSIÓN V4.0 - COMPONENTES NUEVOS

### Footers (2 variantes)
- **Footer Simple**: `.footer--simple` - Minimalista con logo, redes y copyright
- **Footer Completo**: `.footer--complete` - Empresarial con múltiples secciones

### Features (3 variantes)  
- **Features Grid**: `.features--grid` - Cuadrícula con iconos centralizados
- **Features Cards**: `.features--cards` - Cards con imágenes y enlaces  
- **Features Highlight**: `.features--highlight` - Principal + secundarios

### Sistema de Iconos SVG
- **25+ iconos** categorizados: navegación, acciones, contacto, social, estado
- **Arquitectura modular**: tamaños, colores, fondos configurables
- **Sprite optimizado**: `sergio-icons.svg` con sistema `<use>`

### Funcionalidades JavaScript Nuevas
- **Icon System**: Gestión dinámica de iconos con fallbacks
- **Footer Social Links**: Efectos hover y ripple en redes sociales  
- **Features Animation**: Animaciones de entrada escalonadas
- **Copy to Clipboard**: Para ejemplos de código
- **Smooth Navigation**: Scroll suave entre secciones

### Ejemplo de Uso - Footer Simple
```html
<footer class="footer--simple">
  <div class="footer__content">
    <div class="footer__logo">SERGIO FORÉS</div>
    <p class="footer__tagline">Explorador de metodologías</p>
    <div class="footer__social">
      <a href="#" class="footer__social-link">
        <svg class="icon icon--base">
          <use href="sergio-icons.svg#icon-github"></use>
        </svg>
      </a>
    </div>
    <div class="footer__copyright">© 2025 Sergio Forés</div>
  </div>
</footer>
```

### Ejemplo de Uso - Features Grid
```html
<section class="features--grid">
  <div class="features__container">
    <div class="features__header">
      <h2 class="features__title">Características</h2>
      <p class="features__subtitle">Descripción</p>
    </div>
    <div class="features__grid">
      <div class="feature-item">
        <div class="feature-item__icon">
          <svg class="icon icon--lg">
            <use href="sergio-icons.svg#icon-star"></use>
          </svg>
        </div>
        <h3 class="feature-item__title">Título</h3>
        <p class="feature-item__description">Descripción</p>
      </div>
    </div>
  </div>
</section>
```

### Ejemplo de Uso - Iconos SVG
```html
<!-- Básico -->
<svg class="icon icon--lg">
  <use href="sergio-icons.svg#icon-name"></use>
</svg>

<!-- Con fondo y color -->
<div class="icon-bg icon-bg--primary icon-bg--circle">
  <svg class="icon icon--base icon--white">
    <use href="sergio-icons.svg#icon-star"></use>
  </svg>
</div>
```

---

**Creado para CEREBRO-DIGITAL** | **V4.0 - EXPANSIÓN COMPLETA** | Última actualización: 2025-06-28