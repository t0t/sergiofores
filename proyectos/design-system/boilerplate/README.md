# Boilerplate - Sistema de Diseño Sergio Forés

## 🎯 Descripción

Plantilla base para iniciar proyectos web con el **Sistema de Diseño Atómico Sergio Forés**. Incluye estructura HTML5 semántica, configuración CSS del sistema nuclear, scripts básicos y SEO optimizado.

## ⚠️ Reglas Fundamentales

### 🎨 **PALETA SAGRADA** - ÚNICA FUENTE DE VERDAD
```css
/* COLORES PUROS - INMUTABLES */
--color-yellow: #FFFF00;   /* Amarillo puro */
--color-cyan: #00FFFF;     /* Cyan puro */  
--color-red: #FF0000;      /* Rojo puro */
--color-black: #000000;    /* Negro puro */
--color-white: #FFFFFF;    /* Blanco puro */

/* ESCALA MONOCROMÁTICA - 5 GRISES EXACTOS */
--gray-1: #333333;         /* Gris oscuro */
--gray-2: #666666;         /* Gris medio-oscuro */
--gray-3: #999999;         /* Gris medio */
--gray-4: #CCCCCC;         /* Gris medio-claro */
--gray-5: #EEEEEE;         /* Gris claro */
```

### 🏗️ **ESTRUCTURA NUCLEAR**
- `../../css/main.css` → **NÚCLEO SAGRADO** (variables base)
- `../css/design-system.css` → **SISTEMA ATÓMICO** (componentes)
- `css/main.css` → **ESPECÍFICO DEL PROYECTO** (solo lo necesario)

### 📐 **ESPACIADO FIBONACCI + UTOPIA**
```css
/* TIPOGRAFÍA - Solo 3 tamaños */
--text-large: var(--essence-text);    /* H1 */
--text-medium: var(--analysis-text);  /* H2, nav */
--text-small: var(--fragment-text);   /* body, p */

/* ESPACIADO ÁUREO */
--space-s: clamp(1.00rem, calc(0.93rem + 0.37vw), 1.25rem);
--space-m: clamp(1.50rem, calc(1.39rem + 0.56vw), 1.88rem);
--space-l: clamp(2.00rem, calc(1.85rem + 0.74vw), 2.50rem);
--space-xl: clamp(3.00rem, calc(2.78rem + 1.11vw), 3.75rem);
```

## 🚀 Uso Rápido

### 1. **Personalizar Contenido**
Reemplazar todos los `[PLACEHOLDER]` en `index.html`:

```html
[NOMBRE_PROYECTO] → Mi Proyecto Web
[DESCRIPCION_PROYECTO] → Descripción del proyecto
[TITULO_PRINCIPAL] → Título principal del hero
[EMAIL_CONTACTO] → contacto@miproyecto.com
[URL_PROYECTO] → https://miproyecto.com
[IMAGEN_HERO] → hero-image.jpg
```

### 2. **Sistema de Identificadores para Desarrollo con IA**
Cada elemento HTML hasta el 3er nivel tiene un **identificador único comentado**:

```html
<!-- [MAIN-01] Sección principal -->
<section>
    <!-- [MAIN-01.01] Contenedor interno -->
    <div>
        <!-- [MAIN-01.01.01] Elemento específico -->
        <h1>Contenido</h1>
    </div>
</section>
```

**Cómo usarlo con agentes IA:**
- **"Modifica el elemento [MAIN-03.02.01]"** → Referencia exacta al primer feature item
- **"Añade contenido después de [MAIN-02.01.03]"** → Insertar después de la tarjeta 3
- **"Cambia el color de [MAIN-04.02.02.01.02]"** → Modificar el formulario específico

**Ventajas:**
✅ **Referencia exacta** sin ambigüedades  
✅ **Desarrollo más rápido** con agentes IA  
✅ **Mantenimiento preciso** del código  
✅ **Colaboración eficiente** en equipo

### 3. **Media Assets Optimizados**
**🎯 BIBLIOTECA COMPLETA:** 36+ assets profesionales con naming optimizado automáticamente:

```
assets/images/
├── hero-abstract.jpg          # Hero principal (configurado)
├── hero-abstract-01.jpg       # Hero alternativo IA
├── background-01.jpg          # Fondo minimalista
├── background-01-01.jpg       # Fondo geométrico  
├── background-01-02.jpg       # Textura sutil
├── tech-01.jpg               # Robot doméstico
├── tech-01-01.jpg            # Humanoide futurista
├── tech-01-02.jpg            # Transhumanista
├── abstract-01.jpg           # Arte conceptual
├── abstract-01-01.jpg        # Retrato artístico
├── abstract-01-02.jpg        # Red bioluminiscente
├── feature-01.jpg            # Característica IA
├── feature-01-01.jpg         # Característica diseño
├── feature-01-02.jpg         # Característica tech
├── avatar-01.jpg             # Avatar perfil
├── gallery-01.jpg            # Galería principal
├── gallery-01-01.jpg         # Galería secundaria
├── project-01.jpg            # Diagrama 01234
├── background-01.mp4         # Video de fondo
├── demo-01.mp4               # Video demo
├── asset-01 a 10.jpg         # 15+ assets generales
└── 4 videos adicionales      # Contenido multimedia
```

**✅ Optimización automática realizada:**
- Naming web-optimized (sin espacios, acentos, caracteres especiales)
- Categorización sistemática con prefijos descriptivos
- Backup completo de originales preservado
- Inventario completo documentado

### 4. **Google Fonts Preconfiguradas**
**🔤 NUEVA CARACTERÍSTICA:** Sistema tipográfico completo con 3 Google Fonts optimizadas para desarrollo rápido.

**🎯 FUENTES INCLUIDAS:**
```css
/* Inter - Moderna, legible, perfecta para UI/UX */
--font-primary: 'Inter', 'Avenir Next', 'Futura', sans-serif;

/* Source Code Pro - Monospace profesional para código */
--font-mono: 'Source Code Pro', 'JetBrains Mono', monospace;

/* Playfair Display - Elegante, ideal para títulos premium */
--font-display: 'Playfair Display', 'Georgia', serif;
```

**✅ OPTIMIZACIONES INCLUIDAS:**
- **Preload optimization** para Inter (LCP mejorado)
- **Carga diferida** para Source Code Pro y Playfair Display
- **Preconnect** a Google Fonts para DNS optimization
- **Fallbacks** a fuentes del sistema Sergio Forés

**🚀 USO RÁPIDO:**
```html
<!-- Título elegante con Playfair Display -->
<h1 class="title-display">Título Premium</h1>

<!-- Navegación moderna con Inter -->
<nav class="nav-modern">MENÚ</nav>

<!-- Código con Source Code Pro -->
<code class="code-inline">function()</code>
<pre class="code-block">Bloque de código</pre>

<!-- Clases utilitarias -->
<p class="font-inter">Texto con Inter</p>
<p class="font-code">Texto monospace</p>
<p class="font-display">Texto elegante</p>
```

Ver guía completa: `css/google-fonts.css`

### 5. **Sistema de Colores Genérico**
**🎨 NUEVA CARACTERÍSTICA:** Sistema de tokens de color flexibles que permite cambiar temas completos sin renombrar variables.

```css
/* ✅ CORRECTO - Usar tokens semánticos genéricos */
.mi-componente-especifico {
    background-color: var(--bg-surface);     /* Genérico */
    color: var(--text-primary);             /* Genérico */
    border: 1px solid var(--border-primary); /* Genérico */
    padding: var(--space-m);
}

/* ✅ CAMBIAR TEMA COMPLETO - Solo modificar colores base */
:root {
    --base-primary-500: #3B82F6;  /* De amarillo a azul */
    /* Todo el sistema se actualiza automáticamente */
}

/* ❌ PROHIBIDO - Hardcodear valores */
.component {
    background-color: #f5f5f5;  /* NO */
    color: #333;                /* NO */
}
```

**Ventajas del sistema:**
✅ **Cambio de tema instantáneo** modificando solo variables base  
✅ **Naming consistente** que nunca cambia  
✅ **Temas predefinidos** (claro, oscuro, azul, verde)  
✅ **Tokens contextuales** para casos específicos  

Ver guía completa: `docs/COLOR-SYSTEM-GUIDE.md`

### 6. **Personalización CSS**
Solo en `css/project-main.css` y SOLO si es necesario con tokens genéricos.

### 7. **JavaScript Específico**
En `js/project-main.js` añadir solo funcionalidades específicas del proyecto.

## 📁 Estructura de Archivos - REFACTORIZADA ✨

```
boilerplate/
├── index.html                 # HTML semántico optimizado ⚡
├── css/                       # CSS por capas de performance
│   ├── variables-core.css     # ⚠️ Variables fundamentales sistema
│   ├── color-system.css       # 🎨 Tokens de color genéricos
│   ├── design-system.css      # 🏗️ Componentes atómicos
│   ├── google-fonts.css       # 🔤 Sistema tipográfico
│   ├── accessibility.css      # ♿ Mejoras WCAG 2.1 AA
│   └── project-main.css       # 🎯 Estilos específicos proyecto
├── js/                        # JavaScript modular
│   ├── claude-navigation.js   # 🧠 Navegación inteligente
│   ├── pageheader-scroll.js   # 📜 Header dinámico
│   ├── smooth-scroll.js       # ✨ Navegación suave (nuevo)
│   ├── dropdown-component.js  # 📋 Componentes dropdown
│   ├── theme-switcher.js      # 🎨 Cambio de temas
│   └── project-main.js        # 🚀 Lógica proyecto + validación
├── assets/images/             # 36+ assets optimizados
└── docs/                      # Documentación técnica
    ├── GOOGLE-FONTS-GUIDE.md      # 🔤 Guía tipográfica
    ├── FRONTEND-ARCHITECTURE.md   # 🏗️ Arquitectura completa
    └── MEDIA-ASSETS-USAGE.md      # 📸 Uso de assets
```

**🆕 MEJORAS IMPLEMENTADAS:**
- ✅ **JavaScript inline eliminado** - Código modular sin conflictos
- ✅ **CSS optimizado por capas** - Performance mejorada  
- ✅ **Accesibilidad WCAG 2.1** - Skip links, ARIA completo
- ✅ **Orden de carga optimizado** - Critical path prioritario
- ✅ **Toggle móvil perfecto** - Sin interferencias, completamente funcional
- ✅ **Theme switcher integrado** - En footer, sin conflictos
- ✅ **Arquitectura limpia** - Scripts duplicados eliminados
- ✅ **Validación de formularios** - Estados accesibles
- ✅ **Smooth scroll moderno** - Clase SmoothScrollNavigation

## 🎭 Componentes Incluidos

### **Navegación**
```html
<header class="pageheader pageheader--sticky pageheader--dynamic">
    <!-- Navegación responsive con hamburger menu -->
</header>
```

### **Hero Section**
```html
<section class="hero-master hero-master--fullscreen hero-master--image">
    <!-- Hero con imagen de fondo y CTA -->
</section>
```

### **Grid Responsive**
```html
<div class="grid-flex m0 p3">
    <!-- Grid automático con proporción áurea -->
</div>
```

### **Tarjetas de Contenido**
```html
<div class="card">
    <div class="card__body m0">
        <!-- Contenido de la tarjeta -->
    </div>
</div>
```

### **Formularios**
```html
<form class="form form--constrained">
    <div class="form__field">
        <label class="form__label">Label</label>
        <input class="form__input" type="text">
    </div>
</form>
```

### **Botones**
```html
<button class="btn btn--primary">Primario</button>
<button class="btn btn--secondary">Secundario</button>
<button class="btn btn--ghost">Ghost</button>
```

## 🔧 Personalización Avanzada

### **Añadir Nueva Sección**
```html
<section id="nueva-seccion" class="section">
    <header class="section__header">
        <h2 class="section__title">Título</h2>
        <p class="section__subtitle">Descripción</p>
    </header>
    
    <div class="grid-flex">
        <!-- Contenido en grid -->
    </div>
</section>
```

### **Grid de 3 Columnas**
```html
<div class="grid--3-col">
    <div class="features__item">...</div>
    <div class="features__item">...</div>
    <div class="features__item">...</div>
</div>
```

### **Iconos SVG**
```html
<svg class="icon icon--lg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
    <!-- Path del icono -->
</svg>
```

## ⚠️ Prohibiciones Absolutas

### **NUNCA HACER:**
- ❌ Inventar colores fuera de la paleta sagrada
- ❌ Hardcodear valores de espaciado o tipografía
- ❌ Duplicar código que ya existe en el sistema
- ❌ Modificar archivos del sistema base
- ❌ Crear CSS sin usar variables del núcleo

### **SIEMPRE HACER:**
- ✅ Usar variables CSS del sistema atómico
- ✅ Seguir nomenclatura BEM
- ✅ Respetar la jerarquía HTML semántica
- ✅ Mantener consonancia visual
- ✅ Probar en móvil y desktop

## 🧪 Testing y Validación

### **Antes de Deploy:**
1. ✅ Abrir en navegador: **http://localhost:3000** (servidor incluido)
2. ✅ Probar responsive: 375px (móvil), 768px (tablet), 1024px+ (desktop)
3. ✅ **Verificar toggle móvil:** Hamburger abre/cierra menú sin cambiar temas
4. ✅ **Probar theme switcher:** Botón en footer cambia temas correctamente
5. ✅ Comprobar que no hay errores en consola
6. ✅ Validar todas las funcionalidades (formulario, smooth scroll, back-to-top)
7. ✅ Validar SEO básico y accesibilidad

### **Comandos Útiles:**
```bash
# Servir localmente (puerto 3000 recomendado)
cd ruta/al/boilerplate
python3 -m http.server 3000

# O con Node.js
npx serve . -p 3000

# Verificar en navegador
open http://localhost:3000
```

### **🧪 Testing Checklist:**
- [ ] **Toggle móvil funciona** sin cambiar temas
- [ ] **Theme switcher** visible en footer
- [ ] **Smooth scroll** funciona en enlaces internos
- [ ] **Formulario** valida correctamente
- [ ] **Back-to-top** aparece al hacer scroll
- [ ] **No errores** en consola del navegador

## 📞 Soporte

Este boilerplate está basado en el **Sistema de Diseño Atómico Sergio Forés** siguiendo la filosofía **01234**.

Para más información sobre el sistema:
- **Documentación completa:** `../docs/`
- **Sistema base:** `../index.html`
- **Variables CSS:** `../../css/main.css`

---

## 📋 RESUMEN FINAL - TOT0 Matrix System

### 🚀 **TOT0 Matrix System - Revolución CSS Completada**

**✅ Sistema Implementado:**
- **5 variables controlan TODO**: `--u`, `--φ`, escalas tipográficas, colores, spacing Fibonacci
- **Progresión áurea φ=1.618**: Armonía matemática perfecta en todas las proporciones
- **Clases atómicas**: `.pt0-.pt5`, `.gap0-.gap2`, `.cols1-.cols6`, grid utilities
- **Wireframe debug**: Visualización inteligente con data-tags y clases CSS

**✅ Componentes Perfeccionados:**
- **Hero full-width**: Stack vertical centrado con imagen de fondo
- **Header compacto**: Sin padding, centrado vertical, logo SVG animado
- **Grid de iconos**: Flex-wrap automático que crece horizontalmente
- **Navegación funcional**: Scroll suave a secciones específicas

**✅ Git & Deploy:**
- **Commit 81bb932** subido a GitHub sergiofores
- **82 archivos** actualizados con boilerplate completo
- **Documentación** actualizada en CLAUDE.md

### 🎯 **Próximos Pasos Sugeridos:**
1. Expandir sistema TOT0 a otros proyectos
2. Documentar mejores prácticas de implementación
3. Crear guías de uso para desarrolladores

**¡El sistema TOT0 Matrix está listo para revolucionar el desarrollo CSS!** 🎨✨

---

**🎯 ¡Tu proyecto está listo para despegar con consonancia matemática perfecta!**