# Guía de Estilo CSS - Sistema Modular Sergio Forés

*Última actualización: 2025-07-13*  
*Arquitectura Modular Implementada*

---

## 🏗️ Principios de Arquitectura Modular

### 1. **Estructura Nuclear Atómica**
- **`tokens.css`** es el núcleo inmutable con todas las variables
- Cero duplicación de variables entre archivos
- Propagación desde el núcleo, nunca multiplicación
- Una sola fuente de verdad para cada concepto

### 2. **Modularidad y Responsabilidades**
- Cada archivo tiene una responsabilidad específica y clara
- Separación de concerns: tokens → typography → layout → components → utilities
- Importación selectiva permitida según necesidades del proyecto
- Orden crítico de carga: tokens SIEMPRE primero

### 3. **Consonancia Sistémica**
- Proporciones áureas en tipografía y espaciado
- Variables semánticas que reflejan la filosofía 01234
- Espaciado matemáticamente perfecto basado en Fibonacci
- Paleta sagrada Sergio Forés respetada

---

## 📁 Estructura de Archivos y Responsabilidades

### **`tokens.css`** - Núcleo Atómico
```css
/* ÚNICA DEFINICIÓN DE VARIABLES */
:root {
  /* Sistema 3 tamaños ÚNICAMENTE */
  --text-large: clamp(2.618rem, calc(2.4rem + 1.09vw), 3.236rem);
  --text-medium: clamp(1.618rem, calc(1.5rem + 0.59vw), 1.927rem);
  --text-small: clamp(1rem, calc(0.93rem + 0.35vw), 1.191rem);
  
  /* Paleta sagrada inmutable */
  --color-cyan: #00FFFF;
  --color-yellow: #FFFF00;
  --color-magenta: #FF00FF;
  
  /* Espaciado proporcional áureo */
  --space-4: 1rem;
  --space-6: 1.618rem; /* φ */
  --space-16: 4.236rem; /* φ³ */
}
```

### **`typography.css`** - Sistema Tipográfico
```css
/* Solo elementos HTML y utilidades tipográficas */
h1 { font-size: var(--text-large); }
h2, h3 { font-size: var(--text-medium); }
p, button, span { font-size: var(--text-small); }
```

### **`layout.css`** - Grids y Layout
```css
/* Grid system y containers */
.grid--responsive-phi {
  display: grid;
  gap: var(--space-6); /* Hereda del núcleo */
  margin: 0 var(--space-6); /* Respiración horizontal */
}
```

### **`components.css`** - Componentes UI
```css
/* Botones, cards, navegación */
.btn {
  padding: var(--space-2) var(--space-4);
  font-size: var(--text-small);
}
```

### **`utilities.css`** - Helpers y Específicos
```css
/* Clases utilitarias y elementos especializados */
.spacing-example-content {
  padding: var(--space-4);
  background: var(--color-surface-secondary);
}
```

---

## ⚡ Reglas de Importación

### **✅ Correcta - Importación Completa**
```html
<link rel="stylesheet" href="css/design-system.css">
```

### **✅ Correcta - Importación Selectiva**
```html
<!-- ORDEN CRÍTICO: tokens SIEMPRE primero -->
<link rel="stylesheet" href="css/tokens.css">
<link rel="stylesheet" href="css/typography.css">
<link rel="stylesheet" href="css/layout.css">
<!-- components.css y utilities.css son opcionales -->
```

### **❌ Incorrecta - Orden alterado**
```html
<!-- NUNCA: typography antes que tokens -->
<link rel="stylesheet" href="css/typography.css">
<link rel="stylesheet" href="css/tokens.css">
```

---

## 🎯 Nomenclatura y Convenciones

### **Variables CSS**
```css
/* ✅ Correcto - Semántico y sistemático */
--text-large     /* Escala tipográfica */
--space-16       /* Espaciado áureo */
--color-cyan     /* Paleta sagrada */

/* ❌ Incorrecto - Hardcoding o duplicación */
font-size: 24px;           /* Usar var(--text-medium) */
margin: 20px;              /* Usar var(--space-X) */
color: #00FFFF;            /* Usar var(--color-cyan) */
```

### **Clases CSS**
```css
/* ✅ Correcto - BEM modificado */
.component-name { }              /* Bloque */
.component-name__element { }     /* Elemento */
.component-name--modifier { }    /* Modificador */

/* Ejemplos del sistema */
.btn { }                /* Botón base */
.btn--primary { }       /* Botón primario */
.btn--cta-hero { }      /* Botón CTA hero */

.card { }               /* Card base */
.card__body { }         /* Cuerpo de card */
.card__title { }        /* Título de card */
```

### **Grid Classes**
```css
/* ✅ Sistema consonante - phi based */
.grid--responsive-phi { }     /* Grid con proporciones áureas */
.grid--responsive-compact { } /* Grid sin respiración */
.grid--responsive-wide { }    /* Grid con máxima respiración */

/* ✅ Container system - 3 escalas */
.container-master { }           /* Estándar */
.container-master--compact { }  /* Sin padding */
.container-master--wide { }     /* Máximo padding */
```

---

## 🔧 Patrones de Desarrollo

### **1. Añadir Nueva Variable**
```css
/* Solo en tokens.css - NUNCA en otros archivos */
:root {
  --nueva-variable: valor-calculado;
}

/* Usar en otros archivos */
.component {
  property: var(--nueva-variable);
}
```

### **2. Crear Nuevo Componente**
```css
/* En components.css */
.nuevo-componente {
  /* Usar SOLO variables del núcleo */
  padding: var(--space-4);
  font-size: var(--text-small);
  color: var(--color-text-primary);
}
```

### **3. Layout Responsive**
```css
/* En layout.css */
.nuevo-grid {
  display: grid;
  gap: var(--space-6);  /* Siempre variables */
  margin: 0 var(--space-6);  /* Respiración horizontal */
  grid-template-rows: auto auto auto;  /* NUNCA 1fr */
}
```

### **4. Utilidades Específicas**
```css
/* En utilities.css */
.helper-class {
  /* Para casos muy específicos */
  background: var(--color-surface-secondary);
  padding: var(--space-2);
}
```

---

## 📱 Responsive y Performance

### **Media Queries Estándar**
```css
/* Mobile first - breakpoints específicos iPhone */
@media (min-width: 375px) { /* iPhone SE */ }
@media (min-width: 430px) { /* iPhone moderno */ }
@media (min-width: 768px) { /* Tablet */ }
@media (min-width: 1024px) { /* Desktop */ }
```

### **Performance Mobile**
```css
/* Mix-blend-mode solo desktop */
@media (hover: hover) and (pointer: fine) {
  .custom-cursor {
    mix-blend-mode: difference;
  }
}

/* Hardware acceleration */
.animated-element {
  transform: translate3d(0, 0, 0);
  will-change: transform;
}
```

### **Viewport Real iOS**
```css
.hero {
  height: 100svh; /* Safe viewport */
  min-height: 40vh; /* Mínimo móvil */
}
```

---

## 🧪 Testing y Validación

### **Verificar Variables**
```javascript
// Console DevTools
getComputedStyle(document.documentElement).getPropertyValue('--text-large')
// Debe retornar: "clamp(2.618rem, calc(2.4rem + 1.09vw), 3.236rem)"
```

### **Checklist de Desarrollo**
- [ ] ✅ Variables del núcleo usadas, no hardcoding
- [ ] ✅ Grids con respiración horizontal
- [ ] ✅ Sistema 3 tamaños respetado
- [ ] ✅ Media queries móvil-first
- [ ] ✅ Performance optimizada
- [ ] ✅ HTML semántico correcto

### **Validación Automática**
```html
<!-- Test de variables cargándose -->
<script>
const testVariable = getComputedStyle(document.documentElement)
  .getPropertyValue('--color-cyan');
console.log(testVariable === '#00FFFF' ? '✅' : '❌');
</script>
```

---

## 🚫 Anti-Patrones - Lo que NO hacer

### **❌ Duplicar Variables**
```css
/* NUNCA hacer esto */
:root {
  --color-cyan: #00FFFF; /* Ya está en tokens.css */
}
```

### **❌ Hardcodear Valores**
```css
/* NUNCA hardcodear */
.component {
  font-size: 16px;     /* Usar var(--text-small) */
  margin: 20px;        /* Usar var(--space-X) */
  color: #00FFFF;      /* Usar var(--color-cyan) */
}
```

### **❌ Romper el Orden de Importación**
```html
<!-- NUNCA cambiar el orden -->
<link rel="stylesheet" href="css/components.css">
<link rel="stylesheet" href="css/tokens.css"> <!-- Demasiado tarde -->
```

### **❌ Grid con 1fr que Estira**
```css
/* NUNCA usar 1fr que estira contenido */
.grid {
  grid-template-rows: 1fr 1fr 1fr; /* ❌ INCORRECTO */
  grid-template-rows: auto auto auto; /* ✅ CORRECTO */
}
```

---

## 🎉 Beneficios del Sistema Modular

### **Mantenimiento**
- Editar tipografía → Solo `typography.css`
- Ajustar layout → Solo `layout.css`  
- Nuevos componentes → Solo `components.css`
- Debug específico por área

### **Performance**
- Importación selectiva según necesidades
- Cache granular por módulo
- Menor peso para proyectos simples

### **Escalabilidad**
- Módulos independientes
- Extensibilidad controlada
- Trabajo en equipo optimizado
- Reutilización inteligente

---

**La arquitectura modular mantiene la esencia del sistema atómico Sergio Forés mientras proporciona la flexibilidad y mantenibilidad de un design system profesional maduro.**