# 📦 Legacy - Design System Sergio Forés

Esta carpeta contiene archivos del sistema anterior, mantenidos por compatibilidad y referencia histórica.

## 📁 Contenido Legacy

### **🗃️ [main-system.css](./main-system.css)**
**Sistema CSS monolítico anterior (57.7KB)**
- ❌ **Deprecado**: Reemplazado por sistema modular
- ✅ **Funcional**: Todavía funciona pero no recomendado
- 📚 **Referencia**: Útil para migración y comparación

**Migración**:
```html
<!-- ANTES -->
<link rel="stylesheet" href="legacy/main-system.css">

<!-- AHORA -->
<link rel="stylesheet" href="css/design-system.css">
```

### **⚡ [sergio-interactions.js](./sergio-interactions.js)**
**JavaScript interacciones anteriores**
- ❌ **Deprecado**: Funcionalidad migrada a módulos JS actuales
- 📚 **Referencia**: Ver evolución del código

**Migración**:
```html
<!-- ANTES -->
<script src="legacy/sergio-interactions.js"></script>

<!-- AHORA -->
<script src="js/claude-navigation.js"></script>
<script src="js/dropdown-component.js"></script>
```

### **🧪 [validate-claude-compliance.js](./validate-claude-compliance.js)**
**Validador anterior**
- ❌ **Deprecado**: Validación integrada en tests actuales
- 📚 **Referencia**: Lógica de validación histórica

**Migración**:
```html
<!-- ANTES -->
<script src="legacy/validate-claude-compliance.js"></script>

<!-- AHORA -->
<!-- Validación automática integrada en tests/test-variables.html -->
```

## ⚠️ Estado de Deprecación

### **🚫 No Usar en Nuevos Proyectos**
- Estos archivos están **deprecados**
- Solo mantenidos por **compatibilidad temporal**
- **No reciben actualizaciones** ni mejoras

### **🔄 Migración Recomendada**
```bash
# 1. Backup actual
cp proyecto.html proyecto-backup.html

# 2. Cambiar imports
# legacy/main-system.css → css/design-system.css

# 3. Verificar funcionamiento
open http://localhost:8000/tests/test-variables.html

# 4. Optimizar con importación selectiva (opcional)
```

## 📊 Comparación Legacy vs Modular

### **📁 Antes (Legacy)**
```
main-system.css: 57.7KB (todo en uno)
sergio-interactions.js: Funcionalidad mezclada
validate-claude-compliance.js: Validación separada
```

### **📁 Ahora (Modular)**
```
tokens.css: 5.6KB      (variables núcleo)
typography.css: 6.3KB  (tipografía)
layout.css: 14.4KB     (grids)
components.css: 15.6KB (UI)
utilities.css: 17.3KB  (helpers)
design-system.css: 3.3KB (importador)
Total: 62.5KB (+8% por mejor documentación)
```

### **⚡ Ventajas del Sistema Modular**
- ✅ **Mantenimiento**: Editar áreas específicas
- ✅ **Performance**: Carga selectiva (-79% para proyectos mínimos)
- ✅ **Escalabilidad**: Desarrollo en paralelo
- ✅ **Claridad**: Responsabilidades específicas

## 🗓️ Timeline de Deprecación

### **📅 Enero 2025**
- ✅ Sistema modular implementado
- ✅ Archivos legacy movidos a carpeta
- ✅ Documentación de migración creada

### **📅 Marzo 2025** (Estimado)
- 🔄 Proyectos existentes migrados
- 🔄 Testing extensivo completado
- 🔄 Training de equipo realizado

### **📅 Junio 2025** (Estimado)
- 🗑️ Archivos legacy eliminados
- 🧹 Cleanup final del repositorio
- 📚 Documentación legacy archivada

## 🆘 Soporte Legacy

### **🔧 Si Necesitas Usar Legacy**
```html
<!-- Solo por compatibilidad temporal -->
<link rel="stylesheet" href="legacy/main-system.css">
<script src="legacy/sergio-interactions.js"></script>
```

### **📞 Problemas con Legacy**
1. **No se solucionarán bugs** en archivos legacy
2. **No habrá nuevas funcionalidades**
3. **Migración es la única solución** a largo plazo

### **🚀 Migración Asistida**
- Consultar [docs/VERIFICACION-IMPLEMENTACION.md](../docs/VERIFICACION-IMPLEMENTACION.md)
- Testing con [tests/test-variables.html](../tests/test-variables.html)
- Ejemplos en [examples/ejemplo-modular.html](../examples/ejemplo-modular.html)

## 🧭 Navegación

- **👆 [Volver al proyecto](../README.md)** - README principal
- **📚 [Ver documentación](../docs/)** - Guías de migración
- **🧪 [Ver tests](../tests/)** - Verificar nueva implementación
- **📋 [Ver ejemplos](../examples/)** - Casos de uso modular

---

*Archivos Legacy del Design System Sergio Forés*  
*Deprecados - Solo para Referencia y Migración*