# 🎨 Sergio Arte Plástica - Scripts de Gestión de Galería

Sistema completo de scripts utilitarios para gestión, optimización y rendimiento de la galería de arte.

## 🚀 Instalación Rápida

```bash
# Instalar dependencias
npm install

# Verificar estructura inicial
npm run setup

# Proceso completo de galería
npm run gallery:full
```

## 📁 Estructura de Scripts

```
js/
├── image-utils.js           # Utilidades básicas de imágenes
├── performance-optimizer.js # Optimización de rendimiento  
├── gallery-manager.js       # Manager principal
├── main.js                 # Frontend del portfolio
├── lazy-loading.js         # (Generado) Lazy loading optimizado
├── webp-support.js         # (Generado) Soporte WebP
└── gallery-data.js         # (Generado) Datos de galería
```

## 🛠️ Scripts Principales

### Proceso Completo
```bash
npm run gallery:full
```
Ejecuta todo el pipeline: organización → renombrado → optimización → formatos modernos → datos de galería → lazy loading → análisis de performance

### Optimización Rápida
```bash
npm run gallery:optimize
```
Optimiza todas las imágenes y genera reporte de performance

### Actualizar Galería
```bash
npm run gallery:update
```
Regenera datos de galería y fragmentos HTML

### Auditoría de Performance
```bash
npm run gallery:audit
```
Analiza rendimiento actual y genera recomendaciones

## 🔧 Scripts Específicos

### Gestión de Imágenes
```bash
# Renombrar todas las imágenes según convenciones
npm run images:rename

# Optimizar tamaño y calidad de imágenes
npm run images:optimize

# Generar versiones WebP
npm run images:webp

# Analizar performance
npm run performance:analyze
```

### Desarrollo
```bash
# Servidor local
npm run dev
# o
npm start

# Verificar estructura de imágenes
npm run lint:images
```

## 📊 Funcionalidades

### 🏷️ ImageRenamer
- **Renombrado inteligente** según convenciones semánticas
- **Categorización automática** (óleo, tinta, 3D, dibujo)
- **Limpieza de nombres** (espacios, caracteres especiales)
- **Prefijos por categoría** para organización

### 🎨 ImageOptimizer
- **Compresión inteligente** con Sharp
- **Redimensionado automático** según contexto
- **Backup de seguridad** antes de optimizar
- **Reportes de ahorro** de espacio
- **Calidad configurable** (85% por defecto)

### ⚡ PerformanceOptimizer
- **Lazy loading avanzado** con IntersectionObserver
- **Generación WebP/AVIF** para navegadores modernos
- **Preload de imágenes críticas**
- **Análisis de performance budget**
- **Reportes HTML detallados**

### 📊 GalleryGenerator
- **Escaneo automático** de todas las categorías
- **Metadatos completos** (dimensiones, fecha, técnica)
- **Generación de títulos** desde nombres de archivo
- **Ordenación cronológica** (más recientes primero)
- **Export JSON y JavaScript**

## 🎯 Configuración

### CONFIG (image-utils.js)
```javascript
const CONFIG = {
    THUMBNAIL_SIZE: 400,    // Tamaño de miniaturas
    GALLERY_SIZE: 1200,     // Tamaño máximo galería
    QUALITY: 85,            // Calidad de compresión
    SUPPORTED_FORMATS: ['.jpg', '.jpeg', '.png', '.webp']
};
```

### PERFORMANCE_CONFIG (performance-optimizer.js)
```javascript
const PERFORMANCE_CONFIG = {
    MAX_IMAGE_SIZE: 500,    // KB máximo por imagen
    MAX_TOTAL_SIZE: 2000,   // KB máximo total
    TARGET_LCP: 2500,       // Objetivo LCP (ms)
    WEBP_QUALITY: 85        // Calidad WebP
};
```

## 📈 Flujo de Trabajo

### 1. Preparación Inicial
```bash
# Estructura de directorios
images/
├── archive/        # Imágenes sin procesar
├── obras/
│   ├── oil/       # Óleos sobre lino
│   ├── ink/       # Tintas sobre papel
│   ├── 3dprinting/# Esculturas 3D
│   └── drawing/   # Dibujos y bocetos
├── gallery/       # Imágenes del sitio
└── videos/        # Videos del proceso
```

### 2. Procesamiento Automático
1. **Categorización** de imágenes del archivo
2. **Renombrado** según convenciones
3. **Optimización** de tamaño y calidad
4. **Generación WebP** para navegadores modernos
5. **Creación de datos** de galería
6. **Setup lazy loading** optimizado
7. **Análisis de performance**
8. **Generación de fragmentos HTML**

### 3. Integración Frontend
```html
<!-- Incluir scripts generados -->
<script src="js/gallery-data.js"></script>
<script src="js/lazy-loading.js"></script>
<script src="js/webp-support.js"></script>
<script src="js/main.js"></script>
```

### 4. Verificación
- Revisar `performance-report.html`
- Integrar `gallery-fragments.html`
- Probar en navegador con DevTools
- Validar métricas Web Vitals

## 🎨 Convenciones de Nomenclatura

### Prefijos por Categoría
- `oleo-*` → Óleos sobre lino belga
- `tinta-*` → Tintas sobre papel japonés  
- `escultura-*` → Impresión 3D
- `dibujo-*` → Dibujos y bocetos

### Formato Estándar
```
categoria-nombre-descriptivo-año.ext
```

Ejemplos:
- `oleo-proceso-interior-2024.jpg`
- `tinta-caligrafia-zen-2023.png`
- `escultura-forma-organica-2024.jpg`

## 🚨 Solución de Problemas

### Error: "Cannot find module 'sharp'"
```bash
npm install sharp
```

### Error: "Permission denied"
```bash
chmod +x js/*.js
npm run setup
```

### Imágenes muy grandes
```bash
# Configurar calidad más agresiva
# En CONFIG: QUALITY: 70
npm run images:optimize
```

### Performance issues
```bash
npm run gallery:audit
# Revisar performance-report.html
```

## 📋 Checklist de Verificación

### ✅ Antes del Proceso
- [ ] Todas las imágenes en `images/archive/`
- [ ] Node.js >= 16 instalado
- [ ] Dependencias instaladas (`npm install`)
- [ ] Backup de imágenes importantes

### ✅ Después del Proceso
- [ ] `gallery-data.js` generado correctamente
- [ ] Fragmentos HTML integrados en `index.html`
- [ ] Scripts incluidos en el HTML
- [ ] Performance report revisado
- [ ] Galería funciona en navegador
- [ ] Lazy loading operativo
- [ ] WebP funcionando en Chrome/Firefox

## 🎯 Performance Targets

- **LCP**: < 2.5s
- **FID**: < 100ms  
- **CLS**: < 0.1
- **Tamaño promedio imagen**: < 300KB
- **Reducción total**: > 40%
- **WebP adoption**: > 90%

## 🔮 Funcionalidades Futuras

- [ ] Generación AVIF
- [ ] Responsive images automáticas
- [ ] Análisis de colores dominantes
- [ ] Clasificación ML de estilos
- [ ] CDN integration
- [ ] Progressive Web App
- [ ] Offline gallery caching

---

**🎨 ¡Tu galería está lista para impresionar al mundo del arte digital!**