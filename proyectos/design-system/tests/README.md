# 🧪 Tests - Design System Sergio Forés

Esta carpeta contiene todos los archivos de testing y verificación del sistema de diseño modular.

## 📋 Archivos de Testing

### **🔬 [test-variables.html](./test-variables.html)**
**Verificación automática de variables CSS**
- ✅ Auto-verificación de carga de variables
- ✅ Test visual de componentes
- ✅ Console logging automático
- ✅ Verificación del sistema modular completo

**Uso**:
```bash
open http://localhost:8000/tests/test-variables.html
```

### **🎮 [demo-claude-compliance.html](./demo-claude-compliance.html)**
**Demo completa con validación CLAUDE.md**
- ✅ Todos los componentes funcionando
- ✅ Validación en tiempo real
- ✅ Ejemplos de uso prácticos
- ✅ Cumplimiento estricto CLAUDE.md

**Uso**:
```bash
open http://localhost:8000/tests/demo-claude-compliance.html
```

### **📐 [demo-grid-system.html](./demo-grid-system.html)**
**Testing específico del sistema grid**
- ✅ Grid responsive phi
- ✅ Container system (3 escalas)
- ✅ Respiración horizontal
- ✅ Breakpoints iPhone específicos

**Uso**:
```bash
open http://localhost:8000/tests/demo-grid-system.html
```

## ⚡ Cómo Ejecutar los Tests

### **1. Servidor Local**
```bash
cd design-system/
python3 -m http.server 8000
```

### **2. Abrir Tests**
```bash
# Test principal de variables
open http://localhost:8000/tests/test-variables.html

# Demo completa
open http://localhost:8000/tests/demo-claude-compliance.html

# Sistema grid
open http://localhost:8000/tests/demo-grid-system.html
```

### **3. Verificación Manual**
- ✅ **Variables CSS**: Abrir DevTools → Console (auto-verificación)
- ✅ **Responsive**: Cambiar viewport en DevTools
- ✅ **Performance**: Network tab sin errores
- ✅ **Accesibilidad**: Navegación por teclado

## 🎯 Qué Verifican los Tests

### **Variables CSS (test-variables.html)**
```javascript
// Verificación automática de:
--text-large, --text-medium, --text-small    // Sistema 3 tamaños
--color-cyan, --color-yellow, --color-magenta // Paleta sagrada
--space-4, --space-6, --space-8, --space-16  // Espaciado áureo
```

### **Compliance CLAUDE.md (demo-claude-compliance.html)**
- ✅ Sistema 3 tamaños únicamente
- ✅ Font-weight consistente
- ✅ Mix-blend-mode solo desktop
- ✅ HTML semántico obligatorio
- ✅ Grid template-rows auto (nunca 1fr)
- ✅ Navegación activa inteligente
- ✅ Viewport real iOS (100svh)
- ✅ Performance mobile optimizada

### **Grid System (demo-grid-system.html)**
- ✅ Grids con respiración horizontal universal
- ✅ Container system 3 escalas consonantes
- ✅ Responsive breakpoints específicos iPhone
- ✅ Proporciones áureas mantenidas

## 🐛 Debugging Común

### **❌ Variables no se cargan**
```javascript
// En Console, verificar:
getComputedStyle(document.documentElement).getPropertyValue('--text-large')
// Si retorna vacío → verificar orden de importación CSS
```

### **❌ Grid sin respiración**
```css
/* Verificar que el grid tiene margin horizontal */
.grid { margin: 0 var(--space-xl); }
```

### **❌ Responsive no funciona**
```bash
# Verificar breakpoints en DevTools
# iPhone SE: 375px
# iPhone moderno: 430px  
# Tablet: 768px
# Desktop: 1024px+
```

## 🧭 Navegación

- **👆 [Volver al proyecto](../README.md)** - README principal
- **📚 [Ver documentación](../docs/)** - Guías técnicas
- **📋 [Ver ejemplos](../examples/)** - Demos de uso
- **⚙️ [Ver código CSS](../css/)** - Módulos del sistema

---

*Tests del Design System Sergio Forés*  
*Verificación Automática - Arquitectura Modular Atómica*