# Design System Sergio Forés - CLAUDE.md Compliant V3

Sistema de diseño atómico **completamente adaptado** a las reglas CLAUDE.md para consonancia sistémica fractal perfecta.

## 🎯 CARACTERÍSTICAS CLAUDE.md COMPLIANT

### ✅ **CUMPLIMIENTO ESTRICTO VERIFICADO**

- **Sistema 3 tamaños de fuente ÚNICAMENTE**: `--text-large`, `--text-medium`, `--text-small`
- **Font-weight consistente**: Normal por defecto, medium/semibold para títulos
- **Mix-blend-mode solo desktop**: `(hover: hover) and (pointer: fine)`
- **HTML semántico obligatorio**: `<header>`, `<main>`, `<section>`, `<nav>`, `<footer>`
- **Layout Grid optimizado**: Template rows auto, NO 1fr que estira
- **Navegación activa inteligente**: Intersection Observer + scroll detection
- **Sistema 8px matemático**: Variables espaciado perfectamente consonantes
- **Viewport real iOS**: `100svh` en lugar de `100vh`
- **Performance mobile**: Hardware acceleration + will-change cleanup
- **Breakpoints iPhone específicos**: 375px, 430px, 768px, 1024px

## 🚀 INSTALACIÓN Y USO

### 1. **Importar Archivos CSS (Orden crítico)**

```html
<!-- Sistema completo CLAUDE.md compliant -->
<link rel="stylesheet" href="../../css/main.css">
<link rel="stylesheet" href="css/sergio-design-tokens.css">
<link rel="stylesheet" href="css/sergio-components-refined.css">
<link rel="stylesheet" href="css/main.css">
```

### 2. **JavaScript Navegación Inteligente**

```html
<script src="js/navigation-intelligence.js" defer></script>
```

### 3. **Validación Automática (Opcional)**

```html
<script src="validate-claude-compliance.js" defer></script>
```

## 📁 ESTRUCTURA DE ARCHIVOS

```
design-system/
├── css/
│   ├── sergio-design-tokens.css     # Design tokens CLAUDE.md compliant
│   ├── sergio-components-refined.css # Componentes refinados
│   └── main.css                     # Sistema principal adaptado
├── js/
│   ├── navigation-intelligence.js   # Navegación activa inteligente
│   └── main.js                     # Scripts adicionales
├── demo-claude-compliance.html      # Demo completa con ejemplos
├── index.html                      # Documentación original
├── validate-claude-compliance.js   # Validador automático
└── CLAUDE-MD-COMPLIANCE-REPORT.md  # Reporte técnico completo
```

## 🎨 USO DEL SISTEMA

### **Tipografía - Solo 3 tamaños permitidos**

```html
<!-- Títulos principales (H1) -->
<h1>--text-large únicamente</h1>

<!-- Subtítulos y navegación -->
<h2>--text-medium para subtítulos</h2>
<nav><a href="#">--text-medium para navegación</a></nav>

<!-- Todo el resto del contenido -->
<p>--text-small para párrafos</p>
<button>--text-small para botones</button>
```

### **Componentes Principales**

```html
<!-- Hero Section -->
<section class="hero">
  <div class="hero__container">
    <h1 class="hero-title">Título Principal</h1>
    <p class="hero-subtitle">Descripción</p>
  </div>
</section>

<!-- Cards con Layout Grid -->
<div class="layout-grid grid-cols-3">
  <div class="card">
    <div class="card__body">
      <h3 class="card-title">Título Card</h3>
      <p class="card-content">Contenido</p>
    </div>
  </div>
</div>

<!-- Botones -->
<button class="btn btn-primary">Primario</button>
<button class="btn btn-secondary">Secundario</button>
```

### **Navegación Activa Inteligente**

```html
<header class="header nav-intersection">
  <nav class="header__nav">
    <ul>
      <li><a href="#section1" class="header__nav-link">Sección 1</a></li>
      <li><a href="#section2" class="header__nav-link">Sección 2</a></li>
    </ul>
  </nav>
</header>
```

## 🧪 TESTING Y VALIDACIÓN

### **1. Servidor Local**

```bash
cd design-system/
python3 -m http.server 8000
open http://localhost:8000/demo-claude-compliance.html
```

### **2. Validación Automática**

Abre DevTools Console para ver resultados de validación automática:

```javascript
// Se ejecuta automáticamente con validate-claude-compliance.js
// Verifica todas las reglas CLAUDE.md
```

### **3. Testing Manual**

- ✅ **Scroll hacia arriba**: Estados active se limpian < 100px
- ✅ **Logo click**: Reset automático navegación  
- ✅ **Responsive**: iPhone SE (375px), iPhone moderno (430px), tablet, desktop
- ✅ **Mix-blend-mode**: Solo activo en desktop con hover
- ✅ **Performance**: Sin lag en móviles

## 📱 OPTIMIZACIONES MÓVILES

### **Viewport Real iOS**
```css
min-height: 100svh; /* Safe viewport */
calc(100vw - 20px); /* Sin scroll horizontal */
```

### **Performance Mobile**
```css
transform: translate3d(0, 0, 0); /* Hardware acceleration */
will-change: transform; /* Con cleanup automático */
```

### **Breakpoints iPhone Específicos**
```css
@media (max-width: 375px) { /* iPhone SE */ }
@media (min-width: 430px) { /* iPhone 14, 15, 16 */ }
@media (min-width: 768px) { /* Tablet */ }
@media (min-width: 1024px) { /* Desktop */ }
```

## 🎯 CRITERIOS SERGIO FORÉS

- **Tipografía**: Avenir Next/Futura, pesos 300-400
- **Colores**: Base neutra (grises), color solo cuando justificado
- **Espaciado**: Sistema 8px matemático
- **Layout**: Aprovechamiento inteligente del viewport
- **Estilo**: Bauhaus, líneas limpias, geometría funcional

## 📊 VALIDACIÓN CLAUDE.md

El sistema incluye validación automática que verifica:

1. ✅ Sistema 3 tamaños de fuente ÚNICAMENTE
2. ✅ Font-weight consistente
3. ✅ Mix-blend-mode solo desktop
4. ✅ HTML semántico obligatorio
5. ✅ Layout Grid optimizado
6. ✅ Navegación activa inteligente
7. ✅ Sistema 8px espaciado
8. ✅ Viewport real para iOS
9. ✅ Performance mobile
10. ✅ Breakpoints específicos iPhone

## 🚀 RESULTADO

**La arquitectura atómica funciona**: eliminamos ruido, mantenemos solo fuentes de verdad, y el sistema se propaga sin duplicación con consonancia matemáticamente perfecta.

---

*Design System Sergio Forés V3 - CLAUDE.md Compliant*  
*Sistema CEREBRO-DIGITAL - Consonancia Sistémica Fractal*