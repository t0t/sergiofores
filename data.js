/**
 * data.js — Contenido del canvas de sergiofores.es
 *
 * FUENTE ÚNICA DE VERDAD para todo el contenido visible.
 * Editar solo este archivo. Nunca tocar el HTML.
 *
 * ESTRUCTURA POR GRUPOS:
 *   1. Identidad        → avatar, nombre, tagline, social
 *   2. Textos           → frases nucleares (encuentros desperdigados)
 *   3. Símbolos 01234   → SVGs de los 5 nodos
 *   4. Obra plástica    → óleos + vídeo proceso (pila)
 *   5. Diagramas 01234  → gráficos del sistema (pila)
 *   6. IA generativa    → contenido generado con IA (pila)
 *   7. Personas          → retratos con contexto
 *   8. Miscelánea       → easter eggs, elementos sueltos
 *
 * TIPOS SOPORTADOS: avatar, text, img, video, svg, social
 *
 * PILAS: los elementos de una misma temática se apilan con offset
 * vertical ~70px entre sí, simulando documentos sobre una mesa.
 * El primer elemento del grupo marca la posición base.
 *
 * POSICIONES: coordenadas en espacio virtual del canvas (px).
 * Los textos van lejos del centro (>3000) para forzar exploración.
 * Las pilas de medios van a distancia media (~500-1000).
 *
 * ESCALABILIDAD: para añadir contenido, crear un objeto nuevo
 * dentro del grupo correspondiente, respetando el offset de pila
 * si aplica. Si se crea un grupo temático nuevo, documentarlo aquí.
 */

window.__DATA__ = {
  "objects": [

    // ─── 1. IDENTIDAD ───────────────────────────────────────

    {
      "type": "avatar",
      "src": "img/avatar.jpg",
      "x": -60,
      "y": -60,
      "w": 130
    },
    {
      "type": "text",
      "content": "Sergio Forés Raga",
      "x": 120,
      "y": -30,
      "cls": "large accent"
    },
    {
      "type": "text",
      "content": "Artista plástico · Orquestador de agentes y bufón que nadie escucha",
      "x": 120,
      "y": 60,
      "cls": "micro"
    },
    {
      "type": "social",
      "x": 300,
      "y": 200,
      "links": [
        { "platform": "instagram", "url": "https://www.instagram.com/sergio.01234/" },
        { "platform": "x", "url": "https://x.com/t0tinspire" },
        { "platform": "youtube", "url": "https://youtube.com/@0-1234" },
        { "platform": "github", "url": "https://github.com/t0t" }
      ]
    },

    // ─── 2. TEXTOS (encuentros) ─────────────────────────────
    // Frases nucleares. Pocas, densas, lejos del centro.
    // El silencio entre ellas es parte del diseño.

    {
      "type": "text",
      "content": "La forma más alineada no es salir al mundo a predicar. Es trabajar con la puerta abierta.",
      "x": -3800,
      "y": -2600,
      "cls": "large"
    },
    {
      "type": "text",
      "content": "01234 solo puede expresarse desde el lenguaje poético.",
      "x": 4200,
      "y": 2800
    },
    {
      "type": "text",
      "content": "Cuando creas, forjas. No es inspiración etérea — es fuego, martillo, yunque.",
      "x": -3500,
      "y": 3200
    },
    {
      "type": "text",
      "content": "La fuente creativa no está arriba. Está abajo. En las profundidades.",
      "x": 3600,
      "y": -3000
    },

    // ─── 3. SÍMBOLOS 01234 ──────────────────────────────────
    // Los 5 nodos como formas geométricas mínimas.

    {
      "type": "svg",
      "x": -150, "y": 280, "w": 50,
      "svg": "<svg viewBox='0 0 50 50' width='50' height='50'><circle cx='25' cy='25' r='21' fill='none' stroke='#e8e8e8' stroke-width='1'/></svg>",
      "detail": "0 — Potencial"
    },
    {
      "type": "svg",
      "x": -80, "y": 290, "w": 50,
      "svg": "<svg viewBox='0 0 50 50' width='50' height='50'><circle cx='25' cy='25' r='9' fill='#e8e8e8'/></svg>",
      "detail": "1 — Esencia"
    },
    {
      "type": "svg",
      "x": -10, "y": 300, "w": 50,
      "svg": "<svg viewBox='0 0 50 50' width='50' height='50'><line x1='8' y1='25' x2='42' y2='25' stroke='#e8e8e8' stroke-width='1.5'/></svg>",
      "detail": "2 — Diferenciación"
    },
    {
      "type": "svg",
      "x": 60, "y": 310, "w": 50,
      "svg": "<svg viewBox='0 0 50 50' width='50' height='50'><polygon points='25,6 46,44 4,44' fill='none' stroke='#e8e8e8' stroke-width='1'/></svg>",
      "detail": "3 — Conexión"
    },
    {
      "type": "svg",
      "x": 130, "y": 320, "w": 50,
      "svg": "<svg viewBox='0 0 50 50' width='50' height='50'><rect x='8' y='8' width='34' height='34' fill='none' stroke='#e8e8e8' stroke-width='1'/></svg>",
      "detail": "4 — Materialización"
    },

    // ─── 4. OBRA PLÁSTICA (pila) ────────────────────────────
    // Óleo sobre lino belga + vídeo de proceso.
    // Offset ~70px vertical entre elementos.

    {
      "type": "img",
      "src": "img/obras/gesto-primordial.webp",
      "x": -960, "y": -820, "w": 360
    },
    {
      "type": "img",
      "src": "img/obras/exploracion-tactil.webp",
      "x": -1060, "y": -750, "w": 340
    },
    {
      "type": "img",
      "src": "img/obras/proceso-creativo.webp",
      "x": -930, "y": -680, "w": 320
    },
    {
      "type": "img",
      "src": "img/obras/superficie-consciente.webp",
      "x": -1020, "y": -610, "w": 300
    },
    {
      "type": "video",
      "src": "img/obras/proceso-oleo.mp4",
      "x": -880, "y": -540, "w": 360
    },

    // ─── 5. DIAGRAMAS 01234 (pila) ─────────────────────────
    // Gráficos del Sistema 01234: estructura nodal, ontología.
    // Offset ~70px vertical entre elementos.

    {
      "type": "img",
      "src": "img/o1234/logo-01234.png",
      "x": 900, "y": -850, "w": 200
    },
    {
      "type": "img",
      "src": "img/o1234/grafico_003.png",
      "x": 960, "y": -780, "w": 340,
      "detail": "Estructura nodal del Sistema 01234. Cinco nodos, sus relaciones."
    },
    {
      "type": "img",
      "src": "img/o1234/grafico_004.png",
      "x": 870, "y": -710, "w": 300,
      "detail": "Espíritu, Alma, Mente, Cuerpo — y lo incognoscible."
    },
    {
      "type": "img",
      "src": "img/o1234/grafico_009.png",
      "x": 940, "y": -640, "w": 260,
      "detail": "Lo oculto se oculta de sí para verse. Del Absoluto incognoscible a tu cerebro."
    },
    {
      "type": "img",
      "src": "img/o1234/grafico-pardes.svg",
      "x": 890, "y": -570, "w": 280
    },
    {
      "type": "img",
      "src": "img/o1234/ontologia-condensada.svg",
      "x": 930, "y": -500, "w": 300
    },

    // ─── 6. IA GENERATIVA (pila) ────────────────────────────
    // Contenido generado con IA: imágenes y vídeos.
    // Offset ~70px vertical entre elementos.

    {
      "type": "img",
      "src": "img/sergio-arte-plastica.webp",
      "x": -400, "y": 700, "w": 340
    },
    {
      "type": "video",
      "src": "img/video-fondo.mp4",
      "x": -340, "y": 770, "w": 380
    },
    {
      "type": "video",
      "src": "img/proceso-cognitivo.webm",
      "x": -370, "y": 840, "w": 320
    },

    // ─── 7. PERSONAS ────────────────────────────────────────

    {
      "type": "img",
      "src": "img/noeliarequena.webp",
      "x": 1700, "y": 300, "w": 240,
      "detail": "Noelia Requena — <a href='https://noeliarequena.com' target='_blank' rel='noopener'>noeliarequena.com</a>"
    },

    // ─── 8. MISCELÁNEA ──────────────────────────────────────

    {
      "type": "img",
      "src": "img/john-travolta.gif",
      "x": -1500, "y": 1300, "w": 180,
      "detail": "John Travolta — Confuso. Buscando la verdad por la puerta de atrás."
    }
  ]
};
