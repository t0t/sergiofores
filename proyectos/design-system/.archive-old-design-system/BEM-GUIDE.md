# Guía BEM - Sistema de Diseño Sergio Forés

## 📋 Índice
- [Introducción](#introducción)
- [Convenciones BEM](#convenciones-bem)
- [Estructura de Componentes](#estructura-de-componentes)
- [Patrones de Nomenclatura](#patrones-de-nomenclatura)
- [Mejores Prácticas](#mejores-prácticas)
- [Ejemplos Prácticos](#ejemplos-prácticos)
- [Migración del Sistema Actual](#migración-del-sistema-actual)

## Introducción

Esta guía documenta la implementación completa de la metodología BEM (Block Element Modifier) en el sistema de diseño de Sergio Forés. BEM proporciona una arquitectura CSS escalable, mantenible y predecible.

### ¿Por qué BEM?

- **🎯 Claridad**: Cada clase describe exactamente su propósito
- **🚀 Escalabilidad**: Permite crecimiento sin conflictos de especificidad
- **🔧 Mantenibilidad**: Código CSS organizado y predecible
- **👥 Colaboración**: Nomenclatura estándar que todo el equipo entiende

## Convenciones BEM

### Estructura Básica

```css
/* Block: Componente independiente */
.block { }

/* Element: Parte del block */
.block__element { }

/* Modifier: Variación del block o element */
.block--modifier { }
.block__element--modifier { }
```

### Reglas Estrictas

1. **Un solo separador**: `__` para elements, `--` para modifiers
2. **No anidamiento**: Selectores planos, sin jerarquía CSS
3. **Especificidad baja**: Todos los selectores tienen la misma especificidad
4. **Nombres descriptivos**: Cada clase debe ser auto-explicativa

## Estructura de Componentes

### Jerarquía de Archivos

```
sergio-components-bem.css
├── ÁTOMOS BEM
│   ├── .btn (Buttons)
│   ├── .input (Inputs) 
│   ├── .label (Labels)
│   └── .link (Links)
├── MOLÉCULAS BEM
│   ├── .nav (Navigation)
│   ├── .card (Cards)
│   ├── .badge (Badges)
│   └── .alert (Alerts)
└── ORGANISMOS BEM
    ├── .header (Headers)
    ├── .hero (Heroes)
    ├── .footer (Footers)
    └── .features (Features)
```

## Patrones de Nomenclatura

### 1. Buttons (.btn)

```css
/* Block */
.btn { }

/* Modifiers - Estados */
.btn--primary { }
.btn--secondary { }
.btn--ghost { }

/* Modifiers - Tamaños */
.btn--sm { }
.btn--lg { }

/* Modifiers - Estados especiales */
.btn--disabled { }
.btn--loading { }
.btn--full-width { }

/* Elements */
.btn__icon { }
.btn__icon--left { }
.btn__icon--right { }
```

**Uso en HTML:**
```html
<button class="btn btn--primary btn--lg">
    <span class="btn__icon btn__icon--left">
        <svg class="icon">...</svg>
    </span>
    Button Text
</button>
```

### 2. Cards (.card)

```css
/* Block */
.card { }

/* Modifiers */
.card--interactive { }
.card--elevated { }
.card--bordered { }

/* Elements */
.card__header { }
.card__body { }
.card__footer { }
.card__title { }
.card__subtitle { }
.card__content { }

/* Element Modifiers */
.card__header--no-border { }
.card__body--compact { }
.card__footer--no-border { }
```

**Uso en HTML:**
```html
<div class="card card--interactive">
    <div class="card__header">
        <h3 class="card__title">Título</h3>
        <p class="card__subtitle">Subtítulo</p>
    </div>
    <div class="card__body card__body--compact">
        <p class="card__content">Contenido...</p>
    </div>
    <div class="card__footer">
        <button class="btn btn--primary">Acción</button>
    </div>
</div>
```

### 3. Forms (.form, .form-field)

```css
/* Form Block */
.form { }
.form--horizontal { }
.form--inline { }

/* Form Field Block */
.form-field { }
.form-field--horizontal { }

/* Form Field Elements */
.form-field__label { }
.form-field__input { }
.form-field__help { }
.form-field__error { }

/* Element Modifiers */
.form-field__label--required { }
.form-field__input--error { }
```

### 4. Navigation (.nav)

```css
/* Block */
.nav { }

/* Modifiers */
.nav--vertical { }
.nav--center { }
.nav--space-between { }

/* Elements */
.nav__item { }
.nav__link { }
.nav__separator { }

/* Element Modifiers */
.nav__link--active { }
```

### 5. Headers (.header)

```css
/* Block */
.header { }

/* Modifiers */
.header--simple { }
.header--sticky { }
.header--fixed { }

/* Elements */
.header__container { }
.header__brand { }
.header__logo { }
.header__brand-text { }
.header__nav { }
.header__nav-item { }
.header__nav-link { }
.header__actions { }

/* Element Modifiers */
.header__nav-link--active { }
```

## Mejores Prácticas

### ✅ Correcto

```css
/* Nomenclatura clara y específica */
.btn--primary { }
.card__header { }
.nav__link--active { }

/* Un solo nivel de elementos */
.header__nav { }
.header__logo { }
```

```html
<!-- HTML semántico con clases BEM -->
<header class="header header--sticky">
    <div class="header__container">
        <a class="header__brand" href="/">
            <img class="header__logo" src="logo.svg" alt="Logo">
        </a>
    </div>
</header>
```

### ❌ Incorrecto

```css
/* Evitar anidamiento */
.header .nav .link { } /* ❌ */

/* Evitar múltiples elementos */
.card__header__title { } /* ❌ */

/* Evitar elementos de elementos */
.nav__item__link { } /* ❌ */
```

```html
<!-- Evitar clases no-BEM mezcladas -->
<div class="card big primary"> <!-- ❌ -->
```

### Reglas de Oro

1. **Block independiente**: Cada block debe funcionar por sí solo
2. **Element contextual**: Los elements solo existen dentro de su block
3. **Modifier descriptivo**: Los modifiers deben describir apariencia o comportamiento
4. **Sin cascada**: Evitar dependencias entre componentes
5. **Especificidad plana**: Todos los selectores tienen la misma especificidad

## Ejemplos Prácticos

### Ejemplo 1: Sistema de Botones

```html
<!-- Botones básicos -->
<button class="btn btn--primary">Primary</button>
<button class="btn btn--secondary">Secondary</button>
<button class="btn btn--ghost">Ghost</button>

<!-- Botones con tamaños -->
<button class="btn btn--primary btn--sm">Small</button>
<button class="btn btn--primary btn--lg">Large</button>

<!-- Botones con iconos -->
<button class="btn btn--primary">
    <span class="btn__icon btn__icon--left">
        <svg class="icon">...</svg>
    </span>
    Con Icono
</button>

<!-- Botones con estados -->
<button class="btn btn--primary btn--disabled">Disabled</button>
<button class="btn btn--primary btn--loading">Loading</button>
```

### Ejemplo 2: Grid de Features

```html
<section class="features">
    <div class="features__container">
        <div class="features__header">
            <h2 class="features__title">Características</h2>
            <p class="features__subtitle">Descripción general</p>
        </div>
        
        <div class="features__grid">
            <div class="features__item">
                <div class="features__icon">
                    <svg class="icon icon--lg">...</svg>
                </div>
                <h3 class="features__item-title">Título</h3>
                <p class="features__item-description">Descripción</p>
            </div>
            <!-- Más items... -->
        </div>
    </div>
</section>
```

### Ejemplo 3: Formulario Completo

```html
<form class="form">
    <div class="form-field">
        <label class="form-field__label form-field__label--required">
            Nombre
        </label>
        <input type="text" class="form-field__input" placeholder="Tu nombre">
        <p class="form-field__help">Campo obligatorio</p>
    </div>
    
    <div class="form-field">
        <label class="form-field__label">Email</label>
        <input type="email" class="form-field__input form-field__input--error" value="email-inválido">
        <p class="form-field__error">Email no válido</p>
    </div>
    
    <button type="submit" class="btn btn--primary btn--full-width">
        Enviar
    </button>
</form>
```

## Migración del Sistema Actual

### Paso 1: Mapeo de Clases Existentes

| Clase Actual | Clase BEM | Notas |
|--------------|-----------|-------|
| `.header.simple` | `.header.header--simple` | Usar modifier |
| `.btn.primary` | `.btn.btn--primary` | Separar block y modifier |
| `.card .header` | `.card__header` | Convertir a element |
| `.nav .item` | `.nav__item` | Usar element |
| `.nav .link.active` | `.nav__link.nav__link--active` | Element + modifier |

### Paso 2: Actualización de HTML

**Antes:**
```html
<div class="card">
    <div class="header">
        <h3 class="title">Título</h3>
    </div>
    <div class="content">
        <p>Contenido...</p>
    </div>
</div>
```

**Después:**
```html
<div class="card">
    <div class="card__header">
        <h3 class="card__title">Título</h3>
    </div>
    <div class="card__body">
        <p class="card__content">Contenido...</p>
    </div>
</div>
```

### Paso 3: Integración con Design Tokens

```css
/* Los design tokens siguen funcionando igual */
.btn {
    padding: var(--space-3) var(--space-6);
    font-family: var(--font-primary);
    border-radius: var(--border-radius-base);
    /* ... */
}

.btn--primary {
    background-color: var(--color-accent-primary);
    color: var(--color-white);
}
```

## Herramientas de Validación

### Script de Verificación BEM

```javascript
// Verificar que todas las clases sigan BEM
function validateBEM() {
    const bemRegex = /^[a-z][a-z0-9]*(-[a-z0-9]+)*(__[a-z][a-z0-9]*(-[a-z0-9]+)*)?(--[a-z][a-z0-9]*(-[a-z0-9]+)*)?$/;
    
    const elements = document.querySelectorAll('*');
    const violations = [];
    
    elements.forEach(el => {
        const classes = el.className.split(' ');
        classes.forEach(cls => {
            if (cls && !bemRegex.test(cls)) {
                violations.push(`${el.tagName.toLowerCase()}: ${cls}`);
            }
        });
    });
    
    if (violations.length > 0) {
        console.warn('BEM Violations:', violations);
    } else {
        console.log('✅ All classes follow BEM convention');
    }
}
```

## Conclusión

La implementación BEM en el sistema de Sergio Forés proporciona:

- **Escalabilidad**: Componentes que crecen sin conflictos
- **Mantenibilidad**: Código CSS predecible y organizado  
- **Reusabilidad**: Componentes verdaderamente modulares
- **Claridad**: Nomenclatura que describe exactamente el propósito

Esta arquitectura se alinea perfectamente con la filosofía minimalista y la búsqueda de perfección tipográfica de Sergio Forés, proporcionando una base sólida para futuros desarrollos.

---

**Archivo de implementación**: `sergio-components-bem.css`  
**Ejemplos prácticos**: `ejemplos-bem.html`  
**Última actualización**: 2024-06-28