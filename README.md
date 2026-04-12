# sergiofores.es

Web personal de Sergio Forés. Página única con cuatro secciones que corresponden a los cuatro cuadrantes del hero.

## Estructura de secciones

| Prefijo CSS | Apartado | Contenido |
|-------------|----------|-----------|
| `.a-`       | 1º       | — (pendiente) |
| `.b-`       | 2º       | — (pendiente) |
| `.c-`       | 3º       | Pinto — obra plástica, óleo sólido sobre lino belga |
| `.d-`       | 4º       | — (pendiente) |

El prefijo de clase indica el apartado del site (orden alfabético = orden de sección).

## Arquitectura

```
index.html        → todo en un único archivo (HTML + CSS inline + JS inline)
img/
  obras/pinto/    → imágenes de la sección pinto (s1-s7, webp)
  cursor-*.svg    → cursores personalizados
```

Sin build, sin dependencias, sin frameworks.

## Sistema visual

Tokens en `:root`:

| Token | Uso |
|-------|-----|
| `--color-bg` | Fondo |
| `--color-fg` | Texto y elementos |
| `--gap` | Gap del grid y padding horizontal de textos |
| `--pad` | Padding interno de bloques de texto |
| `--font-size-heading` | H2 y H3 |

Tipografía en selectores de elemento (`h2`, `h3`, `p`) — sin repetición en clases BEM.

## Layout

Grid de dos columnas `minmax(0, 55fr) minmax(0, 45fr)` en desktop (≥48em). Mobile: columna única.

**Respiración asimétrica:** S1 tiene `margin-top: 30%` — elemento dominante, siempre desplazado hacia abajo respecto al grid.

**Padding horizontal:** `var(--gap)` por defecto en todos los bloques de texto. En desktop se elimina donde el grid ya provee el espacio.

## Responsive — aspect-ratios

| Breakpoint | Todas las imágenes |
|------------|--------------------|
| Mobile (<48em) | `16/9` — formato cine uniforme |
| Desktop (≥48em) | s1: `1/1`, s2: `4/3`, s3: `5/4`, s4: `4/5`, s5/s6/s7: `4/3` |

## Sliders

JS inline al final del `<body>`. Cada slider con `[data-slider]` y `[data-track]`. Transición por `translateX` en píxeles absolutos (`slider.offsetWidth`) — no porcentajes, para evitar ambigüedad en grids complejos. `object-fit: cover` en slides.

## Dev

Servidor de preview en puerto 8001 (gestionado por Claude Code).

## Estado

En construcción. Solo la sección `.c-pinto` está implementada.
