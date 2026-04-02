# sergiofores.es

Canvas 2D infinito. Huerto/taller digital de Sergio Forés.

No es una web convencional. Es una vista cenital panorámica de todos (o casi todos) mis procesos: obra plástica, Sistema 01234, fragmentos de pensamiento, vídeos de proceso, gráficos, enlaces. Todo suelto por la ventana del navegador, como objetos en una mesa de trabajo.

## Para qué sirve

Uso principal: **herramienta propia**. Me permite recolocar elementos en pantalla (imágenes, textos, vídeos, audios, gráficos) y realizar screenshots para dar instrucciones a agentes IA, esbozar flujos de trabajo, slides, y acceder a visualizaciones a la velocidad de la luz de áreas específicas o conceptos. El público es efecto secundario.

## Interacción

- **Pan**: click + drag (ratón) / un dedo (móvil)
- **Zoom**: rueda del ratón / pinch (móvil)
- **Arrastrar objetos**: click + drag sobre un objeto
- **Inspeccionar**: doble click / doble tap
- **Reset vista**: tecla `0`
- **Cerrar detalles**: tecla `Escape`
- **Flechas**: pan con teclado
- **+/−**: zoom con teclado

Las posiciones de objetos y el nivel de zoom se persisten en `localStorage`.

## Estructura

```
index.html          → estructura (solo HTML, cero JS inline)
css/canvas.css      → presentación + responsive
js/canvas.js        → comportamiento (canvas, eventos, persistencia)
data.js             → contenido (editar aquí, nunca tocar HTML)
img/                → assets (webp comprimidos, posters de vídeo)
  obras/            → obra plástica (óleo sobre lino belga)
  o1234/            → gráficos del Sistema 01234
```

## Contenido

Todo el contenido está referenciado en `data.js` (`window.__DATA__`). Para añadir, quitar o mover elementos, editar solo ese archivo. Tipos soportados: `avatar`, `text`, `img`, `video`, `svg`, `social`.

**IMPORTANTE**: al tener todos los datos cargados en el navegador, el sistema de carga debe cuidarse y perfeccionarse para no saturar. Actualmente implementado: `loading="lazy"` + `decoding="async"` en imágenes, fade-in al completar carga, poster estático para vídeos con precarga en `requestIdleCallback`, `requestAnimationFrame` throttle en transforms.

## Stack

HTML5 + CSS3 + JS vanilla. Cero frameworks, cero dependencias. Hosting estático (GitHub Pages).

## Dev

```
npm run dev
```

Abre `http://localhost:3000` (Python http.server).

## Despliegue

```
git push origin main
```

GitHub Pages sirve directamente desde `main`.
