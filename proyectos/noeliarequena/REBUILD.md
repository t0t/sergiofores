# Reconstrucción del Sitio Web de Noelia Requena

## Visión General
Este documento describe la nueva arquitectura propuesta para el sitio web de Noelia Requena, transformándolo en una Single Page Application (SPA) moderna utilizando ES6 modules.

## Tecnologías Propuestas

### Core
- Vite.js como bundler y dev server
- JavaScript ES6+ Modules
- CSS Modules
- HTML5

### Estructura de Archivos
```
noeliarequena/
├── src/
│   ├── js/
│   │   ├── modules/
│   │   │   ├── slider.js
│   │   │   ├── navigation.js
│   │   │   ├── lightbox.js
│   │   │   └── router.js
│   │   └── main.js
│   ├── css/
│   │   ├── modules/
│   │   │   ├── slider.css
│   │   │   ├── navigation.css
│   │   │   └── lightbox.css
│   │   └── main.css
│   ├── components/
│   │   ├── Header.js
│   │   ├── Navigation.js
│   │   ├── Slider.js
│   │   └── Footer.js
│   ├── views/
│   │   ├── Home.js
│   │   ├── Exposiciones.js
│   │   ├── Artworks.js
│   │   └── Bio.js
│   └── index.html
├── public/
│   ├── images/
│   ├── artworks/
│   └── favicon.png
├── package.json
└── vite.config.js
```

## Características Principales

### 1. Routing
- Implementación de router basado en History API
- Rutas principales: /, /exposiciones, /artworks, /bio
- Carga dinámica de contenido sin recargar la página

### 2. Componentes Modulares
- Header con logo SVG
- Navegación responsive
- Slider de imágenes con textos
- Sistema de grid modular
- Footer con enlaces sociales

### 3. Módulos JavaScript
```javascript
// router.js
export const router = {
  init() {},
  navigate(path) {},
  updateView() {}
};

// main.js
import { router } from './modules/router.js';
import { Navigation } from './components/Navigation.js';
import { Slider } from './components/Slider.js';
```

### 4. Estilos
- CSS Modules para evitar conflictos de nombres
- Sistema de grid flexible
- Variables CSS para temas
- Diseño responsive

## Configuración de Desarrollo

```json
{
  "name": "noeliarequena-web",
  "version": "2.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "vite": "^5.0.0"
  }
}
```

## Mejoras Propuestas

1. **Rendimiento**
   - Lazy loading de imágenes
   - Code splitting por rutas
   - Preload de recursos críticos

2. **UX/UI**
   - Transiciones suaves entre páginas
   - Animaciones de entrada/salida
   - Indicadores de carga
   - Mejor feedback visual

3. **SEO**
   - Meta tags dinámicos
   - Generación de sitemap
   - URLs amigables

4. **Mantenibilidad**
   - Arquitectura basada en componentes
   - Código modular y reutilizable
   - Sistema de tipos con JSDoc

## Contenido a Preservar
- Todas las imágenes y obras de arte existentes
- Textos y contenido actual
- Paleta de colores y estilo visual
- Logo y elementos de marca

## Pasos para la Implementación

1. Configurar el entorno de desarrollo con Vite
2. Migrar la estructura de archivos al nuevo formato
3. Implementar el sistema de routing
4. Crear componentes modulares
5. Migrar estilos a CSS Modules
6. Implementar lazy loading
7. Optimizar assets
8. Pruebas y ajustes

## Consideraciones de Despliegue

- Configurar CI/CD
- Optimizar para producción
- Configurar CDN para assets
- Implementar estrategia de caché
