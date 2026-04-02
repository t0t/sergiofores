# sergiofores.es

Canvas 2D infinito. Huerto/taller digital de Sergio Forés.

No es una web convencional. Es una vista cenital panorámica de todos (o casi todos) mis procesos: obra plástica, Sistema 01234, fragmentos de pensamiento, vídeos de proceso, gráficos, enlaces. Todo suelto por la ventana del navegador, como objetos en una mesa de trabajo.

## Para qué sirve

Uso principal: **herramienta propia**. Me permite recolocar elementos en pantalla (imágenes, textos, vídeos, audios, gráficos) y realizar screenshots para dar instrucciones a agentes IA, esbozar flujos de trabajo, slides, y acceder a visualizaciones a la velocidad de la luz de áreas específicas o conceptos. El público es efecto secundario.

## UX: encuentros, no lectura

Los textos, imágenes y demás elementos no se presentan — se encuentran. Están desperdigados por el canvas como piezas en una excavación. El visitante navega, explora, y tropieza con ellos. No hay recorrido guiado ni jerarquía de lectura. Cada elemento es un encuentro autónomo.

Los textos son frases nucleares: pocas, densas, colocadas lejos del centro y lejos entre sí. El silencio entre ellas es parte del diseño.

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

## Contenido — `data.js`

Fuente única de verdad para todo el contenido visible. Los objetos están organizados en **8 grupos temáticos**:

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

Para añadir contenido: crear un objeto nuevo dentro del grupo correspondiente en `data.js`, respetando el offset de pila si aplica. Si se crea un grupo temático nuevo, documentarlo en el header del archivo y en esta tabla.

### Rendimiento

Al tener todos los datos cargados en el navegador, el sistema de carga debe cuidarse para no saturar. Actualmente implementado: `loading="lazy"` + `decoding="async"` en imágenes, fade-in al completar carga, poster estático para vídeos con precarga en `requestIdleCallback`, `requestAnimationFrame` throttle en transforms.

## Stack

HTML5 + CSS3 + JS vanilla. Cero frameworks, cero dependencias. Hosting estático (GitHub Pages).

Tipografía: Montserrat (Google Fonts) con fallback a Futura/Avenir.

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

## Estado actual

- **localStorage**: temporalmente desactivado en `canvas.js` (funciones comentadas) para iterar posiciones sin persistencia. Reactivar cuando la composición sea definitiva.
