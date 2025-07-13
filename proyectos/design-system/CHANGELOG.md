# Changelog - Design System Sergio Forés

## [v2.1.0] - 2025-01-13

### 🚀 Sistema de Componentes Avanzado
- **PageHeader dinámico**: Implementado scroll-based color inversion con glassmorphism
- **Menu BEM modular**: Sistema completo con dropdowns y comportamiento móvil
- **Footer modular**: Arquitectura BEM con múltiples variantes (.footer--tall, .footer--light, .footer--accent)
- **Hero pixel perfect**: Implementado `100svh` para viewport real en dispositivos móviles

### 📱 Optimizaciones Responsive Críticas
- **Grid .grid--3-col**: Comportamiento mobile-first completo (1→2→3 columnas)
- **Mobile reset < 480px**: Layout unificado con `display: block !important`
- **Container system**: Eliminado `.section__container` redundante
- **Custom logo styles**: Integrados en sistema dinámico con `!important` apropiado

### 🎨 Design System Refinado
- **Codiseño con IA**: Enfoque en sistema atómico con consonancia matemática
- **Paleta inmutable**: Mantiene colores sagrados sin duplicación
- **Proporciones áureas**: Variables Utopia con progresión Fibonacci
- **Copy optimizado**: Footer simplificado con link inline a sergiofores.es

### 🐛 Fixes Técnicos
- **Viewport units**: Hero usa `100svh` + fallback `100vh` para compatibilidad
- **Color inversion**: Logo custom mantiene comportamiento dinámico
- **Footer grid**: Eliminado `.footer--grid` innecesario
- **Responsive breakpoints**: Mobile-first approach consistente

### 🧹 Limpieza de Código
- Eliminadas clases CSS redundantes
- Simplificado sistema de containers
- Mejorada documentación BEM inline
- Optimizada arquitectura modular

### 🔧 Archivos Modificados
- `css/components.css`: PageHeader, Menu, Footer completos
- `css/layout.css`: Grid responsive + mobile reset
- `css/tokens.css`, `css/typography.css`, `css/utilities.css`: Refinamientos
- `index.html`: Implementación completa del sistema
- `js/pageheader-scroll.js`: Nuevo - Comportamiento dinámico

---

## [v2.0.0] - 2025-01-12
### Arquitectura Base
- Sistema atómico inicial
- Paleta de colores sagrada
- Grid system con proporciones áureas
- Tipografía con 3 tamaños únicamente