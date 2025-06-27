# Changelog

Todos los cambios notables en este proyecto serán documentados en este archivo.

El formato está basado en [Keep a Changelog](https://keepachangelog.com/es-ES/1.0.0/),
y este proyecto adhiere a [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.1.0] - 2025-01-27

### Añadido
- Sistema de debug para desarrollo local
  - Overlay de grid para visualización de estructura
  - Herramientas de inspección del DOM
  - Mensajes de consola mejorados
- Optimización de videos
  - Sistema de lazy loading para videos
  - Placeholders personalizados durante la carga
  - Posters para previsualización de videos
  - Gestión automática de memoria
- Nuevas funcionalidades de desarrollo
  - Atajos de teclado para herramientas de debug
  - Sistema de logging con colores
  - Overlay de información de depuración

### Cambiado
- Refactorización del sistema de grid
  - Eliminación de clases no utilizadas
  - Optimización de breakpoints
  - Mejora en la responsividad
- Optimización de rendimiento
  - Implementación de hardware acceleration
  - Prevención de reflows
  - Mejora en la gestión de eventos resize
- Sistema de lightbox
  - Mejor gestión de memoria
  - Optimización de transiciones
  - Corrección de bugs de navegación

### Eliminado
- Código CSS no utilizado en global.css
- Sistema de tabs EN/ES no utilizado
- Estilos duplicados y variables sin uso
- Grid areas no implementadas

### Arreglado
- Problemas de rendimiento con videos
  - Memory leaks en la galería de videos
  - Carga innecesaria de recursos
  - Layout shifting durante la carga
- Navegación y UX
  - Problemas al cambiar entre páginas
  - Gestión incorrecta de eventos
  - Conflictos con Masonry

## [1.0.0] - 2024

### Añadido
- Diseño inicial del portafolio
  - Página de inicio
  - Sección de obras
  - Sección de exposiciones
  - Página de biografía
- Funcionalidades base
  - Sistema de navegación
  - Galería de imágenes con lightbox
  - Soporte para videos
  - Grid system responsive
- Implementaciones técnicas
  - Integración con Masonry
  - Sistema de lazy loading básico
  - Estructura modular de CSS
  - Scripts de funcionalidad base
