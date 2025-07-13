# 📋 Ejemplos - Design System Sergio Forés

Esta carpeta contiene ejemplos prácticos de uso del sistema de diseño modular atómico.

## 📁 Contenido de esta Carpeta

### **🎯 [ejemplo-modular.html](./ejemplo-modular.html)**
**Demo de importación selectiva del sistema modular**

**Qué demuestra**:
- ✅ Importación selectiva de solo 3 módulos CSS
- ✅ Uso de tokens + typography + layout únicamente
- ✅ CSS específico del proyecto sin duplicar variables
- ✅ Performance optimizada (solo 26.3KB vs 62.5KB completo)

**Módulos utilizados**:
```html
<!-- NÚCLEO OBLIGATORIO -->
<link rel="stylesheet" href="../css/tokens.css">

<!-- MÓDULOS SELECTIVOS -->
<link rel="stylesheet" href="../css/typography.css">
<link rel="stylesheet" href="../css/layout.css">

<!-- components.css y utilities.css NO importados -->
```

**Uso**:
```bash
cd design-system/
python3 -m http.server 8000
open http://localhost:8000/examples/ejemplo-modular.html
```

## 🎨 Lo que Aprenderás

### **📐 Grid System Consonante**
```html
<!-- Grid responsive con proporciones áureas -->
<div class="grid--responsive-phi">
  <div class="demo-card">Item 1</div>
  <div class="demo-card">Item 2</div>
  <div class="demo-card">Item 3</div>
</div>
```

### **⚛️ Variables del Núcleo Atómico**
```css
.demo-card {
  /* Usando SOLO variables del núcleo */
  background: var(--color-surface-secondary);
  padding: var(--space-6);
  margin-bottom: var(--space-4);
  border: var(--border-width-base) solid var(--color-gray-300);
}
```

### **📝 Sistema 3 Tamaños**
```html
<h1>Título H1 - var(--text-large)</h1>
<h2>Título H2 - var(--text-medium)</h2>
<p>Párrafo - var(--text-small)</p>
```

## ⚡ Ventajas Demostradas

### **🔧 Mantenimiento**
- Solo importas lo que necesitas
- CSS específico del proyecto sin duplicar variables
- Debugging más sencillo por módulos

### **📈 Performance**
```
Ejemplo modular: 26.3KB (-54% vs sistema completo)
├── tokens.css: 5.6KB (variables fundamentales)
├── typography.css: 6.3KB (sistema tipográfico)  
└── layout.css: 14.4KB (grids y containers)

VS Sistema completo: 62.5KB
```

### **🧠 Claridad**
- Está claro qué funcionalidades usas
- Fácil identificar dependencias
- Mejor comprensión del sistema

## 🚀 Casos de Uso

### **📝 Proyecto Blog Simple**
```html
<!-- Solo texto y layout básico -->
<link rel="stylesheet" href="css/tokens.css">
<link rel="stylesheet" href="css/typography.css">
<link rel="stylesheet" href="css/layout.css">
```

### **🎨 Landing Page**
```html
<!-- Añadir componentes UI -->
<link rel="stylesheet" href="css/tokens.css">
<link rel="stylesheet" href="css/typography.css">
<link rel="stylesheet" href="css/layout.css">
<link rel="stylesheet" href="css/components.css">
```

### **📋 Aplicación Completa**
```html
<!-- Sistema completo -->
<link rel="stylesheet" href="css/design-system.css">
```

## 🧭 Navegación

- **👆 [Volver al proyecto](../README.md)** - README principal
- **📚 [Ver documentación](../docs/)** - Guías técnicas
- **🧪 [Ver tests](../tests/)** - Verificación automática
- **⚙️ [Ver código CSS](../css/)** - Módulos del sistema

## 🎯 Próximos Ejemplos

### **🔄 En Desarrollo**
- `ejemplo-landing-page.html` - Landing completa con componentes
- `ejemplo-blog-minimal.html` - Blog con solo tipografía
- `ejemplo-app-dashboard.html` - Dashboard con utilidades

### **📝 Cómo Contribuir**
1. Crear nuevo archivo `ejemplo-[nombre].html`
2. Usar importación selectiva específica
3. Documentar qué módulos se utilizan
4. Añadir al README de ejemplos

---

*Ejemplos del Design System Sergio Forés*  
*Importación Selectiva - Arquitectura Modular Atómica*