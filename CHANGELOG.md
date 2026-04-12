# CHANGELOG — sergiofores.es

---

## [2026-04-12] — Sección pinto: responsive y sistema de naming

### Añadido
- Convención de naming por cuadrante: `.a-` `.b-` `.c-` `.d-` mapean a los cuatro cuadrantes del hero. La `c` de `.c-pinto__*` no es prefijo BEM genérico, es coordenada de contenido.
- Aspect-ratio uniforme 16/9 para todas las imágenes en mobile (<48em). En desktop cada imagen mantiene su ratio específico.

### Corregido
- s5/s6/s7 (banda de 3 sliders) no tenían aspect-ratio en mobile — se disparaban a 1440–1920px de altura. Fix: `aspect-ratio: 16/9; height: auto` en base (anula `height: 100%` heredado de `.c-pinto__slider`).

---

## [2026-04-12] — Sección pinto: tipografía, sliders, mobile padding

### Añadido
- Tipografía global en selectores de elemento (`h2`, `h3`, `p`) — sin repetición en clases BEM.
- S1 convertida de slider a imagen fija (`s1-04.webp`).
- Padding horizontal mobile: `var(--gap)` en todos los bloques de texto por debajo de 48em.
- `prettier` aplicado al HTML (print-width 120, tab-width 2).

### Corregido
- Slider JS: `translateX` en px absolutos (`slider.offsetWidth`) en lugar de porcentajes — evita ambigüedad en grid con `span 2` + `margin-top: 30%`.
- `object-fit: cover` en slides — elimina espacio en blanco con imágenes portrait.
- CSS: `padding: 0` en base sobreescribía el breakpoint mobile. Reestructurado: base con padding, desktop lo anula.

---

## [2026-04-08] — Web canvas (proyecto anterior, archivado)

La web era un canvas 2D infinito tipo mesa de trabajo. Reemplazado por la arquitectura actual de página con secciones.
