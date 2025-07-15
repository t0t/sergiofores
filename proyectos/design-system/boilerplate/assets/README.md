# 🖼️ Assets - Design System Sergio Forés

Esta carpeta contiene todos los recursos visuales del sistema de diseño.

## 📁 Contenido de Assets

### **🎨 [sergio-icons.svg](./sergio-icons.svg)**
**Iconografía del sistema de diseño**
- ✅ Iconos SVG optimizados
- ✅ Símbolos coherentes con filosofía 01234
- ✅ Escalables y responsive
- ✅ Accesibles y semánticamente correctos

### **🖼️ [favicon.svg](./favicon.svg)**
**Favicon del design system**
- ✅ Logo "01" sobre fondo negro
- ✅ Color cyan (#00FFFF) identitario
- ✅ Tipografía monospace consonante
- ✅ 32x32px optimizado para navegadores

**Uso**:
```html
<!-- Referencia al sprite SVG -->
<svg class="icon">
  <use href="assets/sergio-icons.svg#icon-name"></use>
</svg>
```

## 🎯 Iconografía del Sistema

### **📐 Geometría Pura**
Los iconos siguen la filosofía de **geometría limpia** Sergio Forés:
- Sin ornamentación innecesaria
- Líneas rectas y formas puras
- Proporciones áureas
- Consistencia visual sistemática

### **🌀 Niveles 01234**
Iconos organizados según la filosofía fractal:
- **Nivel 0**: Círculos (potencial, infinito)
- **Nivel 1**: Triángulos (decisión, dirección)
- **Nivel 2**: Líneas (análisis, fragmentación)
- **Nivel 3**: Patrones (comunicación, conexión)
- **Nivel 4**: Cuadrados (materialización, acción)

## ⚙️ Uso Técnico

### **📱 Responsive Icons**
```css
.icon {
  width: 1em;
  height: 1em;
  fill: currentColor;
  stroke: currentColor;
  stroke-width: 2;
}

/* Escalas consonantes */
.icon--sm { width: 1.25em; height: 1.25em; }
.icon--lg { width: 1.5em; height: 1.5em; }
.icon--xl { width: 2em; height: 2em; }
```

### **🎨 Colores Semánticos**
```css
/* Usar variables del sistema */
.icon--primary { color: var(--color-cyan); }
.icon--secondary { color: var(--color-text-secondary); }
.icon--warning { color: var(--color-yellow); }
.icon--error { color: var(--color-magenta); }
```

### **🔧 Accesibilidad**
```html
<!-- Siempre incluir aria-label para iconos informativos -->
<svg class="icon" aria-label="Menú principal">
  <use href="assets/sergio-icons.svg#menu"></use>
</svg>

<!-- Iconos decorativos -->
<svg class="icon" aria-hidden="true">
  <use href="assets/sergio-icons.svg#decoration"></use>
</svg>
```

## 📋 Inventario de Iconos

### **🧭 Navegación**
- `menu` - Menú hamburguesa
- `close` - Cerrar/X
- `arrow-up` - Flecha arriba
- `arrow-down` - Flecha abajo
- `arrow-left` - Flecha izquierda
- `arrow-right` - Flecha derecha

### **📱 Interfaz**
- `search` - Búsqueda/lupa
- `settings` - Configuración/engranaje
- `user` - Usuario/perfil
- `notification` - Notificaciones/campana
- `filter` - Filtros
- `sort` - Ordenar

### **📄 Contenido**
- `edit` - Editar/lápiz
- `delete` - Eliminar/papelera
- `save` - Guardar/disco
- `download` - Descargar
- `upload` - Subir
- `copy` - Copiar

### **💬 Comunicación**
- `mail` - Email/sobre
- `phone` - Teléfono
- `chat` - Chat/conversación
- `share` - Compartir
- `link` - Enlace
- `external` - Enlace externo

### **📊 Estados**
- `check` - Correcto/verificado
- `warning` - Advertencia
- `error` - Error
- `info` - Información
- `loading` - Cargando

## 🔄 Actualización de Iconos

### **➕ Añadir Nuevo Icono**
1. Crear SVG con geometría pura
2. Optimizar con herramientas SVG
3. Añadir al sprite `sergio-icons.svg`
4. Documentar en este README
5. Actualizar ejemplos de uso

### **🎨 Criterios de Diseño**
- **Geometría limpia**: Sin curvas innecesarias
- **Grosor consistente**: stroke-width="2"
- **Grid base**: Alineado a grid 24x24px
- **Proporciones áureas**: Relaciones φ = 1.618
- **Accesibilidad**: Contraste mínimo AA

## 🧭 Navegación

- **👆 [Volver al proyecto](../README.md)** - README principal
- **📚 [Ver documentación](../docs/)** - Guías técnicas
- **🧪 [Ver tests](../tests/)** - Verificación automática
- **⚙️ [Ver código CSS](../css/)** - Módulos del sistema

---

*Assets del Design System Sergio Forés*  
*Iconografía Geométrica - Filosofía 01234*