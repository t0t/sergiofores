# sergiofores.es

Canvas 2D infinito. Huerto/taller digital de Sergio Forés.

No es una web convencional. Es una vista cenital panorámica de todos (o casi todos) mis procesos: obra plástica, Sistema 01234, fragmentos de pensamiento, vídeos de proceso, gráficos, enlaces. Todo suelto por la ventana del navegador, como objetos en una mesa de trabajo.

## Para qué sirve

Uso principal: **herramienta propia**. Me permite recolocar elementos en pantalla (imágenes, textos, vídeos, audios, gráficos) y realizar screenshots para dar instrucciones a agentes IA, esbozar flujos de trabajo, slides, y acceder a visualizaciones a la velocidad de la luz de áreas específicas o conceptos. El público es efecto secundario.

## UX: encuentros, no lectura

Los textos, imágenes y demás elementos no se presentan — se encuentran. Están desperdigados por el canvas como piezas en una excavación. El visitante navega, explora, y tropieza con ellos. No hay recorrido guiado ni jerarquía de lectura. Cada elemento es un encuentro autónomo.

Los textos son frases nucleares: pocas, densas, colocadas lejos del centro y lejos entre sí. El silencio entre ellas es parte del diseño.

## Interacción

- **Pan**: click + drag (ratón) / un dedo en zona vacía (móvil)
- **Zoom**: rueda del ratón / pinch (móvil)
- **Arrastrar objetos**: click + drag sobre un objeto (desktop + móvil)
- **Inspeccionar**: doble click / doble tap
- **Reset vista**: tecla `0`
- **Cerrar detalles**: tecla `Escape`
- **Flechas**: pan con teclado
- **+/−**: zoom con teclado

Las posiciones de objetos y el nivel de zoom se persisten en `localStorage` (toggle en `persist.js`).

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
img/
  obras/                → obra plástica (óleo sobre lino belga)
  o1234/                → gráficos del Sistema 01234
```

Cada módulo tiene una responsabilidad única. `canvas.js` solo importa y llama init. Todos los módulos usan ES modules nativos (`import`/`export`).

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

**Pilas**: los elementos de una misma temática se apilan con offset vertical ~70px entre sí, simulando documentos sobre una mesa. El primer elemento del grupo marca la posición base.

**Tipos soportados**: `avatar`, `text`, `img`, `video`, `svg`, `social`.

### Cómo escalar

Para añadir contenido: crear un objeto nuevo con `id` único dentro del grupo correspondiente en `data.js`, respetando el offset de pila si aplica. Si se crea un grupo temático nuevo, documentarlo en el header del archivo y en esta tabla.

### Rendimiento

- `will-change: transform` en `#universe` (capa GPU dedicada)
- `loading="lazy"` + `decoding="async"` en imágenes
- Fade-in al completar carga (`.loaded`)
- `preload="metadata"` en vídeos (no descarga streams completos)
- Poster estático con precarga en `requestIdleCallback`
- Autoplay muted en móvil, hover play/pause en desktop
- `requestAnimationFrame` throttle en transforms
- `contain: layout style` en cada `.obj`

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
