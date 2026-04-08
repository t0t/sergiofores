# sergiofores.es

Canvas 2D infinito. Huerto/taller digital de Sergio Forés.

No es una web convencional. Es una vista cenital panorámica de todos (o casi todos) mis procesos: obra plástica, Sistema 01234, fragmentos de pensamiento, vídeos de proceso, gráficos, enlaces. Todo suelto por la ventana del navegador, como objetos en una mesa de trabajo.

## Para qué sirve

Uso principal: **herramienta propia**. Me permite recolocar elementos en pantalla (imágenes, textos, vídeos, audios, gráficos) y realizar screenshots para dar instrucciones a agentes IA, esbozar flujos de trabajo, slides, y acceder a visualizaciones a la velocidad de la luz de áreas específicas o conceptos. El público es efecto secundario.

## UX: encuentros, no lectura

Los textos, imágenes y demás elementos no se presentan — se encuentran. Están desperdigados por el canvas como piezas en una excavación. El visitante navega, explora, y tropieza con ellos. No hay recorrido guiado ni jerarquía de lectura. Cada elemento es un encuentro autónomo.

Los textos son frases nucleares: pocas, densas, colocadas lejos del centro y lejos entre sí. El silencio entre ellas es parte del diseño.

## Estructura HTML

`index.html` declara solo un `<main id="universe">` vacío — toda la interfaz se construye en runtime por JS a partir de `data.js`. El HTML es inerte, sin contenido literal. Incluye:

- `<h1 class="sr-only">` oculto visualmente para lectores de pantalla
- `#zoom-level` (indicador efímero del zoom actual)
- `#hint` con la instrucción inicial "scroll · arrastra · explora"
- Metadatos Open Graph y Twitter Card completos
- JSON-LD `Schema.org/Person`
- `manifest`, `robots.txt`, `sitemap.xml`, `theme-color` `#0a0a0a`

## Paradigma de interfaz

Canvas 2D infinito tipo "mesa de trabajo". No hay scroll vertical, ni menú, ni jerarquía de páginas. `body` tiene `overflow: hidden` y cursor `grab`/`grabbing`. El espacio virtual se extiende en todas direcciones desde un origen central; los objetos viven en coordenadas (x, y) en píxeles.

A zoom 100%, el viewport visible (~1440×900) cubre aproximadamente de (−720, −450) a (720, 450). Los grupos de medios caben dentro de ese rango con clip parcial; los textos nucleares se colocan fuera (>1200) — son encuentros, no cartel.

## Sistema visual

**Paleta.** Mínima, controlada por variables CSS:

| Token       | Valor      | Uso                                                        |
|-------------|-----------|------------------------------------------------------------|
| `--bg`      | `#0a0a0a` | Fondo del canvas                                           |
| `--fg`      | `#e8e8e8` | Texto principal, estados hover                             |
| `--fg-dim`  | `#b8b8b8` | Texto atenuado (cumple WCAG AAA sobre `--bg` a ~10.7:1)    |
| `--accent`  | `#FFFF00` | Nombre, enlaces en detalles, outline de foco por teclado   |

**Tipografía.** `Montserrat` (300/400/600) con fallback a Futura/Avenir. Tres escalas:

- `.obj--text.large` — 36px, peso 600, `letter-spacing: -0.02em`
- `.obj--text` (base) — 18px, 400
- `.obj--text.micro` — 13px uppercase, `letter-spacing: 0.1em`

**Feedback.** El único cambio visual en hover es el paso de `--fg-dim` a `--fg`. No hay animaciones, ni shadows, ni bordes decorativos.

## Contenido — `data.js`

Fuente única de verdad para todo el contenido visible. Cada objeto tiene un `id` estable (slug semántico) que la persistencia usa para cruzar posiciones. Los objetos están organizados en **8 grupos temáticos**:

| #  | Grupo            | Descripción                                    | Patrón         |
|----|------------------|------------------------------------------------|----------------|
| 1  | Identidad        | Avatar, nombre, tagline, social links          | Zona centro    |
| 2  | Textos           | Frases nucleares (encuentros)                  | Desperdigados  |
| 3  | Símbolos 01234   | SVGs de los 5 nodos geométricos                | Zona centro    |
| 4  | Obra plástica    | Óleos + vídeo proceso                          | Pila           |
| 5  | Diagramas 01234  | Gráficos del sistema filosófico                | Pila           |
| 6  | IA generativa    | Contenido generado con IA                      | Pila           |
| 7  | Personas         | Retratos con contexto/enlace                   | Sueltos        |
| 8  | Miscelánea       | Easter eggs, elementos independientes          | Sueltos        |

**Pilas**: los elementos de una misma temática se apilan con offset vertical ~50px entre sí, simulando documentos sobre una mesa. El primer elemento del grupo marca la posición base.

**Tipos soportados**: `avatar`, `text`, `img`, `video`, `svg`, `social`, `cta`.

**Identidad.** Nombre *"Sergio Forés Raga"* en amarillo acento, tagline actual *"Artista plástico · Orquestando Agentes · Percibiendo en 01234"*, avatar circular y bloque social con dos cuentas de Instagram diferenciadas por `label` (obra plástica vs Sistema 01234), X, YouTube y GitHub.

**Símbolos 01234.** Cinco SVG en fila horizontal: círculo vacío (0 — Potencial), punto (1 — Esencia), línea (2 — Diferenciación), triángulo (3 — Conexión), cuadrado (4 — Materialización).

**CTA modal.** Una pastilla de descarga para el PDF *"01234: El Código Fuente de la Conciencia"*, renderizada como `<button>` que abre un modal con backdrop blur.

### Cómo escalar

Para añadir contenido: crear un objeto nuevo con `id` único dentro del grupo correspondiente en `data.js`, respetando el offset de pila si aplica. Si se crea un grupo temático nuevo, documentarlo en el header del archivo y en esta tabla.

## Interacción

### Ratón

| Acción               | Gesto                                       |
|----------------------|---------------------------------------------|
| Pan                  | click + drag en zona vacía                  |
| Zoom                 | rueda del ratón                             |
| Arrastrar objeto     | click + drag sobre un objeto                |
| Inspeccionar         | doble clic                                  |

### Táctil

| Acción               | Gesto                                       |
|----------------------|---------------------------------------------|
| Pan                  | un dedo en zona vacía                       |
| Zoom                 | pinch con dos dedos                         |
| Arrastrar objeto     | un dedo sobre un objeto                     |
| Inspeccionar         | doble tap                                   |

### Teclado (navegación estándar)

| Tecla                   | Acción                                                  |
|-------------------------|---------------------------------------------------------|
| `Tab` / `Shift`+`Tab`   | Cicla por los objetos. El canvas se centra automáticamente sobre el objeto enfocado. |
| `Enter` / `Space`       | Expande/colapsa el objeto enfocado                      |
| `Escape`                | Cierra detalles expandidos y libera foco                |
| Flechas                 | Paneo manual                                            |
| `+` / `-`               | Zoom in / out                                           |
| `0`                     | Recentrar vista                                         |

Las posiciones de objetos y el nivel de zoom se persisten en `localStorage` por `id` estable (toggle en `persist.js`). El estado sobrevive a recargas y a reordenaciones del `data.js`.

## Accesibilidad

- Cada `.obj` es `tabIndex=0`, `role="button"`, con `aria-label` derivado de `alt`, `content`, `detail` o `title` (strip de HTML, recorte a 140 chars).
- Foco visible solo con teclado (`:focus-visible`): outline de 2px en `--accent` con `outline-offset: 6px`.
- Contraste de `--fg-dim` sobre `--bg` ≈ 10.7:1 — **WCAG AAA** para texto normal y pequeño.
- `<h1>` con `.sr-only` para lectores de pantalla.
- `role="application"` y `aria-label="Canvas interactivo"` en el `<main>`.
- `aria-hidden` en UI decorativa (`#zoom-level`, `#hint`).
- Todos los `<img>` y `<video>` (poster) tienen `alt` derivado de `obj.alt` en `data.js`.
- Cada enlace social usa `aria-label` explícito que distingue las dos cuentas de Instagram.

## Arquitectura

```
index.html              → estructura (solo HTML, cero JS inline)
css/canvas.css          → presentación + responsive + will-change
data.js                 → contenido (fuente única, nunca tocar HTML)
js/
  canvas.js             → punto de entrada (orquestador, importa módulos)
  state.js              → estado global + constantes + refs al DOM
  transform.js          → pan, zoom, centrar vista
  render.js             → creación de DOM por tipo (builders)
  events.js             → mouse, touch, keyboard (delegados)
  persist.js            → localStorage con toggle on/off
  modal.js              → sistema de modales minimalistas (CTA)
img/
  obras/                → obra plástica (óleo sobre lino belga)
  o1234/                → gráficos del Sistema 01234
```

Cada módulo tiene una responsabilidad única. `canvas.js` solo importa y llama init. Todos los módulos usan ES modules nativos (`import`/`export`).

## Responsive

Dos breakpoints en `canvas.css`:

- `max-width: 48em` — reduce tipografías, imágenes (200px), vídeos (220px), avatar (90px). Iconos sociales crecen a 44px (touch target).
- `max-width: 30em` — reducción adicional para móviles pequeños.

## Rendimiento

- `will-change: transform` en `#universe` (capa GPU dedicada)
- `loading="lazy"` + `decoding="async"` en imágenes
- Fade-in al completar carga (`.loaded`)
- `preload="metadata"` en vídeos (no descarga streams completos)
- Poster estático con precarga en `requestIdleCallback`
- Autoplay muted en móvil, hover play/pause en desktop
- `requestAnimationFrame` throttle en transforms
- `contain: layout style` en cada `.obj`
- Para SVG, inlineado vía `fetch` para mantener nitidez vectorial a cualquier zoom

## Stack

HTML5 + CSS3 + JS vanilla (ES modules nativos). Cero frameworks, cero dependencias, cero build. Hosting estático (GitHub Pages).

Tipografía: Montserrat (Google Fonts) con fallback a Futura/Avenir.

## Dev

```
npm run dev
```

Abre `http://localhost:3000` (Python http.server). Requiere navegador con soporte ES modules (todos los modernos).

## Despliegue

```
git push origin main
```

GitHub Pages sirve directamente desde `main`.

## Estado actual

- **localStorage**: desactivado (`ENABLED = false` en `persist.js`). Cambiar a `true` cuando la composición sea definitiva.
- **Roadmap y deuda técnica**: ver [CHANGELOG.md](CHANGELOG.md)
