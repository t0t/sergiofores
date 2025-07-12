# SERGIO FORÉS - ESTRUCTURA LIMPIA

## 📁 Archivos Principales (FUNCIONALES)

### Core del Portfolio
```
/index.html                     # Portfolio principal - FUNCIONAL
/css/
  ├── sergio-design-tokens.css  # Variables del design system
  └── main-refactored.css       # CSS principal optimizado
/js/
  └── main-optimized.js         # JavaScript consolidado
/img/                           # Imágenes optimizadas (sin duplicados)
```

### Proyectos (MANTENER)
```
/proyectos/
  ├── 01234_ El Código Fuente de la Conciencia.pdf
  ├── blog-cerebro-digital/     # Blog estático generado
  ├── castillo_peniscola_alquiler/
  ├── cerebro_digital/
  ├── cerebro_digital_ia/
  ├── cerebro_digital_vault/
  ├── design-system/
  ├── fotografia/
  ├── landing_01234/
  ├── noeliarequena/           # Portfolio externo completo
  ├── proceso-cognitivo/
  ├── prototipos-01234/
  ├── referencias-diseno/
  ├── sergio-dev/
  ├── sergio_arte_plastica/
  ├── taller_01234_blanes/
  └── tienda-peniscola/
```

## 🗑️ Archivos Movidos a /archivo_eliminable/

### Documentación Redundante
- `PLAN-IMPLEMENTACION-UTOPIA.md`
- `UTOPIA-*.md` (4 archivos)
- `README.md`

### Reportes y Backups
- `docs/` (reportes de optimización completos)
- `backups/` (backups pre-optimización)
- `proyectos-backups/`
- `temp/` (screenshots temporales)

### CSS Redundantes
- `main.css` y `main.css.backup`
- `*utopia*.css` (4 archivos)
- `blur-fix.css`
- `image-*.css` (3 archivos)
- `lazy-loading-fix.css`
- `loading.css`

### JavaScript Redundantes
- `main.js` y `main.js.backup`
- `main-improved.js`
- `cursor.js`
- `image-*.js` (3 archivos)
- `lazy-loading-fix.js`
- `loading.js`
- `simple-fix.js`
- `video-optimizer.js`

### Imágenes Duplicadas
- Todas las imágenes con guiones bajos (`*_*.jpg/webp`)
- Mantener solo formato con guiones (`landing-01234.jpg`)

## ✅ Estado Final

### Funcionalidad Verificada
- ✅ `index.html` abre correctamente en navegador
- ✅ CSS design tokens funcionando (`sergio-design-tokens.css`)
- ✅ CSS principal optimizado (`main-refactored.css`)
- ✅ JavaScript consolidado (`main-optimized.js`)
- ✅ Imágenes sin duplicados
- ✅ Todos los proyectos mantienen su funcionalidad

### Beneficios Conseguidos
1. **Reducción significativa** de archivos redundantes
2. **Estructura clara** y mantenible
3. **Performance mejorado** (menos archivos CSS/JS)
4. **Navegación simplificada** del proyecto
5. **Backup seguro** en `/archivo_eliminable/`

### Archivos Core (NUNCA TOCAR)
- `index.html`
- `css/sergio-design-tokens.css`
- `css/main-refactored.css`  
- `js/main-optimized.js`
- `img/` (imágenes sin duplicados)
- `proyectos/` (todos los subproyectos)

## 📋 Próximos Pasos Recomendados

1. **Test completo** en diferentes navegadores
2. **Validación responsive** móvil/desktop
3. **Optimización de imágenes** si es necesario
4. **Backup final** antes de deploy
5. **Git commit** de la estructura limpia

---

**Total archivos movidos a archivo_eliminable**: ~50+ archivos redundantes
**Estructura final**: Limpia, funcional, robusta y mantenible