# ESTRATEGIA DE OPTIMIZACIÓN JAVASCRIPT

## 🎯 CARGA PRIORITARIA ACTUAL vs OPTIMIZADA

### ❌ Estado Actual (Problemático)
```html
<!-- Todos los JS se cargan juntos, blocking -->
<script src="assets/js/toast-notifications.js"></script>  <!-- 12.5KB -->
<script src="assets/js/tooltips.js"></script>              <!-- 12.1KB -->
<script src="assets/js/main.js"></script>                  <!-- 2.9KB -->
<script src="assets/js/favorites.js"></script>             <!-- 17.9KB -->
<script src="assets/js/header-scroll.js"></script>         <!-- 5KB -->
<script src="assets/js/image-loader.js"></script>          <!-- 6.9KB -->
<script src="assets/js/mobile-menu.js"></script>           <!-- 6.9KB -->
<script src="assets/js/scroll-indicator.js"></script>      <!-- 6.5KB -->
```

### ✅ Optimizado (Carga Estratégica)
```html
<!-- CRITICAL: Cargar inmediatamente (sin defer/async) -->
<script src="assets/js/critical.min.js"></script>          <!-- 8KB: main + header-scroll + mobile-menu básico -->

<!-- IMPORTANT: Defer para después de DOMContentLoaded -->
<script defer src="assets/js/image-loader.min.js"></script> <!-- 6.9KB -->

<!-- NICE-TO-HAVE: Lazy load bajo demanda -->
<script>
// Cargar solo si se detecta interacción
window.addEventListener('scroll', () => {
    import('./assets/js/scroll-indicator.min.js');
}, { once: true });

// Cargar solo si hay elementos con tooltip
if (document.querySelector('[data-tooltip]')) {
    import('./assets/js/tooltips.min.js');
}

// Cargar solo si hay favoritos guardados
if (localStorage.getItem('favorites')) {
    import('./assets/js/favorites.min.js');
}
</script>
```

## 📊 BUNDLING ESTRATÉGICO

### Bundle 1: Critical (8KB) - Carga inmediata
- `main.js` (filtrado básico)
- `header-scroll.js` (scroll behavior)
- Mobile menu básico

### Bundle 2: Enhanced (15KB) - Defer
- `image-loader.js` (lazy loading)
- Toast system básico

### Bundle 3: Features (25KB) - Lazy load
- `favorites.js` completo
- `tooltips.js` completo  
- `scroll-indicator.js`
- `toast-notifications.js` completo

## 🔧 OPTIMIZACIONES ESPECÍFICAS

### Event Listener Optimization
```javascript
// ❌ Actual: Multiple listeners
document.querySelectorAll('.nav-filter').forEach(filter => {
    filter.addEventListener('click', handler);
});

// ✅ Optimizado: Event delegation
document.addEventListener('click', (e) => {
    if (e.target.matches('.nav-filter')) {
        handler(e);
    }
});
```

### Intersection Observer Optimization
```javascript
// ✅ Configuración optimizada
const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            loadImage(entry.target);
            observer.unobserve(entry.target); // ⚡ Cleanup automático
        }
    });
}, {
    rootMargin: '50px',    // ⚡ Preload antes de ser visible
    threshold: 0.1         // ⚡ Trigger temprano
});
```

## 📈 IMPACTO ESTIMADO

- **TTI**: De 4.8s a 2.8s (-41%)
- **FID**: De 180ms a 85ms (-53%)
- **Bundle principal**: De 70KB a 23KB (-67%)
- **JavaScript blocking time**: De 1.2s a 0.4s (-67%)