# Sistema de Colores Genérico - Guía Completa

## 🎯 **Filosofía del Sistema**

El sistema de colores genérico permite **cambiar completamente los colores del proyecto sin renombrar una sola variable**. Está basado en **3 capas de abstracción**:

1. **Colores Base** → Valores específicos (pueden cambiar)
2. **Tokens Semánticos** → Nombres genéricos (NUNCA cambian) 
3. **Tokens Contextuales** → Usos específicos (se mapean automáticamente)

## 🏗️ **Estructura del Sistema**

### **Capa 1: Colores Base**
```css
/* ESTOS PUEDEN CAMBIAR en cada proyecto */
--base-primary-500: #FFFF00;    /* Color principal */
--base-neutral-0: #FFFFFF;      /* Blanco */
--base-neutral-900: #111111;    /* Negro */
```

### **Capa 2: Tokens Semánticos**
```css
/* ESTOS NUNCA CAMBIAN - Son genéricos */
--text-primary: var(--base-neutral-900);
--bg-primary: var(--base-neutral-0);
--interactive-primary: var(--base-primary-500);
```

### **Capa 3: Tokens Contextuales**
```css
/* MAPEO AUTOMÁTICO a contextos específicos */
--btn-primary-bg: var(--interactive-primary);
--card-bg: var(--bg-primary);
--nav-text: var(--text-primary);
```

## 🚀 **Cómo Usar el Sistema**

### **✅ CORRECTO - Usar tokens semánticos:**
```css
.mi-componente {
    background-color: var(--bg-surface);     /* ✅ */
    color: var(--text-primary);             /* ✅ */
    border: 1px solid var(--border-primary); /* ✅ */
}

.btn-custom {
    background-color: var(--interactive-primary);      /* ✅ */
    color: var(--text-inverse);                        /* ✅ */
}

.btn-custom:hover {
    background-color: var(--interactive-primary-hover); /* ✅ */
}
```

### **❌ INCORRECTO - NO hacer esto:**
```css
.mi-componente {
    background-color: #FFFFFF;               /* ❌ Hardcodeado */
    color: var(--base-neutral-900);          /* ❌ Usar base directamente */
    border: 1px solid var(--color-yellow);   /* ❌ Variable específica */
}
```

## 🎨 **Tokens Disponibles**

### **Backgrounds (Fondos)**
- `--bg-primary` → Fondo principal
- `--bg-secondary` → Fondo secundario  
- `--bg-surface` → Superficie elevada
- `--bg-brand` → Fondo de marca
- `--bg-accent` → Fondo de acento

### **Textos**
- `--text-primary` → Texto principal
- `--text-secondary` → Texto secundario
- `--text-muted` → Texto apagado
- `--text-inverse` → Texto inverso (sobre fondos oscuros)
- `--text-brand` → Texto de marca
- `--text-link` → Enlaces
- `--text-link-hover` → Enlaces hover

### **Bordes**
- `--border-primary` → Borde principal
- `--border-secondary` → Borde secundario
- `--border-focus` → Borde de foco
- `--border-error` → Borde de error

### **Interactivos**
- `--interactive-primary` → Estado normal
- `--interactive-primary-hover` → Hover
- `--interactive-primary-active` → Active
- `--interactive-primary-disabled` → Disabled

### **Contextuales**
- `--btn-primary-bg` → Fondo botón primario
- `--card-bg` → Fondo de cards
- `--nav-text` → Texto navegación
- `--form-border` → Bordes formularios

## 🔄 **Cambiar Tema Completo**

### **Paso 1: Modificar solo colores base**
```css
:root {
  /* Cambiar de amarillo a azul */
  --base-primary-100: #DBEAFE;    /* Azul claro */
  --base-primary-500: #3B82F6;    /* Azul base */
  --base-primary-900: #1E40AF;    /* Azul oscuro */
}
```

### **Paso 2: ¡Listo! Todo se actualiza automáticamente**
- Botones primarios → Azul
- Enlaces → Azul
- Texto de marca → Azul
- Bordes de foco → Azul

## 🌙 **Tema Oscuro**

Activar tema oscuro añadiendo `data-theme="dark"` al `<html>`:

```html
<html data-theme="dark">
```

### **Ejemplo: Switcher de tema**
```javascript
// Toggle tema oscuro
function toggleTheme() {
    const html = document.documentElement;
    const currentTheme = html.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? '' : 'dark';
    html.setAttribute('data-theme', newTheme);
}
```

## 🎨 **Temas Predefinidos**

### **Tema Azul**
```html
<html data-theme="blue">
```

### **Tema Verde**
```html
<html data-theme="green">
```

### **Crear Tema Personalizado**
```css
[data-theme="mi-tema"] {
  --base-primary-500: #FF6B6B;    /* Rosa */
  --base-secondary-500: #4ECDC4;  /* Turquesa */
}
```

## 📝 **Ejemplos Prácticos**

### **Botón Personalizado**
```css
.btn--highlight {
    background-color: var(--bg-brand);
    color: var(--text-inverse);
    border: 2px solid var(--border-accent);
    transition: all 0.3s ease;
}

.btn--highlight:hover {
    background-color: var(--interactive-primary-hover);
    transform: translateY(-2px);
}
```

### **Card Especial**
```css
.card--feature {
    background-color: var(--bg-surface);
    border: 1px solid var(--border-secondary);
    box-shadow: 0 4px 6px var(--card-shadow);
}

.card--feature__title {
    color: var(--text-brand);
}

.card--feature__text {
    color: var(--text-secondary);
}
```

### **Navegación Personalizada**
```css
.nav--custom {
    background-color: var(--nav-bg);
    border-bottom: 1px solid var(--nav-border);
}

.nav--custom__link {
    color: var(--nav-text);
}

.nav--custom__link:hover {
    color: var(--nav-text-hover);
}
```

## ⚠️ **Reglas Importantes**

### **SIEMPRE hacer:**
✅ Usar tokens semánticos: `var(--text-primary)`  
✅ Mapear nuevos usos a tokens existentes  
✅ Mantener la consistencia del naming  
✅ Probar en tema claro y oscuro  

### **NUNCA hacer:**
❌ Usar colores hardcodeados: `#FF0000`  
❌ Usar variables `--base-` directamente en componentes  
❌ Cambiar nombres de tokens semánticos  
❌ Crear variables de color fuera del sistema  

## 🔧 **Debugging de Colores**

### **Ver todos los tokens activos:**
```javascript
// Console browser
const styles = getComputedStyle(document.documentElement);
console.log('Color primario:', styles.getPropertyValue('--text-primary'));
console.log('Fondo primario:', styles.getPropertyValue('--bg-primary'));
```

### **Cambiar color temporalmente:**
```javascript
// Test rápido
document.documentElement.style.setProperty('--base-primary-500', '#FF0000');
```

---

**🎯 Con este sistema puedes cambiar completamente el aspecto visual sin tocar una sola línea de CSS de componentes.**