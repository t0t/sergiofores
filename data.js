/**
 * data.js — Contenido del canvas de sergiofores.es
 *
 * FUENTE ÚNICA DE VERDAD para todo el contenido visible.
 * Editar solo este archivo. Nunca tocar el HTML.
 *
 * ESTRUCTURA POR GRUPOS:
 *   0. Video fondo     → fondo vivo del canvas
 *   1. Identidad       → avatar, nombre, tagline, social
 *   2. Textos          → frases nucleares (encuentros desperdigados)
 *   3. Símbolos 01234  → SVGs de los 5 nodos
 *   4. Obra plástica   → óleos + vídeo proceso (pila)
 *   5. Diagramas 01234 → gráficos del sistema (pila)
 *   6. IA generativa   → contenido generado con IA (pila)
 *   7. Personas        → retratos con contexto
 *   8. Miscelánea      → easter eggs, elementos sueltos
 *
 * TIPOS SOPORTADOS: avatar, text, img, video, svg, social, cta
 *
 * POSICIONES: cuadrícula áurea basada en viewport 1440x900.
 *   Centro: 0,0
 *   φ₁ (38.2%): ±550, ±344
 *   φ₂ (61.8%): ±890, ±556
 *   φ³: ±1440, ±900
 *   φ⁴: ±2330, ±1456
 *
 * IDs: cada objeto tiene un id estable (slug semántico).
 * La persistencia en localStorage cruza por id, no por índice.
 */

window.__DATA__ = {
  "objects": [

    // ─── 1. IDENTIDAD (centro, nodo 0,0) ────────────────────

    {
      "id": "id-avatar-sergio-disco",
      "type": "avatar",
      "src": "img/avatar-sergio-disco.webp",
      "alt": "Retrato de Sergio Forés",
      "x": -60, "y": -60, "w": 120
    },
    {
      "id": "id-nombre",
      "type": "text",
      "content": "Sergio Forés Raga",
      "x": -210, "y": -120,
      "cls": "large accent",
      "zIndex": 9999
    },
    {
      "id": "id-tagline",
      "type": "text",
      "content": "Artista plástico · Orquestando Agentes · Percibiendo en 01234",
      "x": 80, "y": 80,
      "cls": "micro"
    },
    {
      "id": "id-social",
      "type": "social",
      "x": -213, "y": 130,
      "links": [
        { "platform": "instagram", "label": "Instagram — obra plástica (@sergio.01234)", "url": "https://www.instagram.com/sergio.01234/" },
        { "platform": "instagram", "label": "Instagram — Sistema 01234 (@cuenta.01234)", "url": "https://www.instagram.com/cuenta.01234/" },
        { "platform": "x", "label": "X (@t0tinspire)", "url": "https://x.com/t0tinspire" },
        { "platform": "youtube", "label": "YouTube (@0-1234)", "url": "https://youtube.com/@0-1234" },
        { "platform": "github", "label": "GitHub (@t0t)", "url": "https://github.com/t0t" }
      ]
    },

    // ─── 2. TEXTOS (encuentros en nodos áureos) ─────────────

    {
      "id": "txt-forma",
      "type": "text",
      "content": "La forma no la pongo yo. Llego cuando ya está ocurriendo.",
      "x": -550, "y": -344
    },
    {
      "id": "txt-sistemas",
      "type": "text",
      "content": "Opero entrando en sistemas (materia, pensamiento, proceso), interactuando con ellos desde dentro, eliminando lo innecesario hasta que una estructura se hace evidente.",
      "x": 550, "y": 344
    },
    {
      "id": "txt-nombra",
      "type": "text",
      "content": "si lo preparas demasiado → no ocurre · si lo nombras → se cae<br>si lo explicas → se sustituye por otra cosa",
      "x": 890, "y": -344
    },
    {
      "id": "txt-existir",
      "type": "text",
      "content": "Trabajo porque necesito que ciertas cosas existan.",
      "x": -890, "y": 344
    },
    {
      "id": "txt-puerta-abierta",
      "type": "text",
      "content": "La forma más alineada no es salir al mundo a predicar. Es trabajar con la puerta abierta.",
      "x": -1440, "y": -900
    },
    {
      "id": "txt-lenguaje-poetico",
      "type": "text",
      "content": "01234 no se explica. Se muestra — como arte, como analogía.",
      "x": 1440, "y": 900
    },
    {
      "id": "txt-huerto",
      "type": "text",
      "content": "El huerto antes que el escaparate.",
      "x": -1440, "y": 556
    },
    {
      "id": "txt-forjas",
      "type": "text",
      "content": "Cuando creas, forjas. No es inspiración etérea — es fuego, martillo, yunque.",
      "x": -2330, "y": 900
    },
    {
      "id": "txt-profundidades",
      "type": "text",
      "content": "La fuente creativa no está arriba. Está abajo. En las profundidades.",
      "x": 1440, "y": -900
    },
    {
      "id": "txt-lenguaje-codigo",
      "type": "text",
      "content": "El lenguaje natural es el nuevo código.",
      "x": 2330, "y": -556
    },

    // ─── 3. SÍMBOLOS 01234 (nodo φ₂ superior derecho) ───────

    {
      "id": "sym-0-potencial",
      "type": "svg",
      "x": 890, "y": -556, "w": 50,
      "svg": "<svg viewBox='0 0 50 50' width='50' height='50'><circle cx='25' cy='25' r='21' fill='none' stroke='#e8e8e8' stroke-width='1'/></svg>",
      "detail": "0 — Potencial"
    },
    {
      "id": "sym-1-esencia",
      "type": "svg",
      "x": 950, "y": -556, "w": 50,
      "svg": "<svg viewBox='0 0 50 50' width='50' height='50'><circle cx='25' cy='25' r='9' fill='#e8e8e8'/></svg>",
      "detail": "1 — Esencia"
    },
    {
      "id": "sym-2-diferenciacion",
      "type": "svg",
      "x": 1010, "y": -556, "w": 50,
      "svg": "<svg viewBox='0 0 50 50' width='50' height='50'><line x1='8' y1='25' x2='42' y2='25' stroke='#e8e8e8' stroke-width='1.5'/></svg>",
      "detail": "2 — Diferenciación"
    },
    {
      "id": "sym-3-conexion",
      "type": "svg",
      "x": 1070, "y": -556, "w": 50,
      "svg": "<svg viewBox='0 0 50 50' width='50' height='50'><polygon points='25,6 46,44 4,44' fill='none' stroke='#e8e8e8' stroke-width='1'/></svg>",
      "detail": "3 — Conexión"
    },
    {
      "id": "sym-4-materializacion",
      "type": "svg",
      "x": 1130, "y": -556, "w": 50,
      "svg": "<svg viewBox='0 0 50 50' width='50' height='50'><rect x='8' y='8' width='34' height='34' fill='none' stroke='#e8e8e8' stroke-width='1'/></svg>",
      "detail": "4 — Materialización"
    },

    // ─── 4. OBRA PLÁSTICA (nodo φ₁ superior izquierdo) ──────

    {
      "id": "obra-gesto",
      "type": "img",
      "src": "img/obras/gesto-primordial.webp",
      "alt": "Óleo sobre lino — Gesto primordial",
      "x": -890, "y": -556, "w": 340
    },
    {
      "id": "obra-tactil",
      "type": "img",
      "src": "img/obras/exploracion-tactil.webp",
      "alt": "Óleo sobre lino — Exploración táctil",
      "x": -940, "y": -506, "w": 320
    },
    {
      "id": "obra-proceso",
      "type": "img",
      "src": "img/obras/proceso-creativo.webp",
      "alt": "Óleo sobre lino — Proceso creativo",
      "x": -870, "y": -456, "w": 300
    },
    {
      "id": "obra-superficie",
      "type": "img",
      "src": "img/obras/superficie-consciente.webp",
      "alt": "Óleo sobre lino — Superficie consciente",
      "x": -920, "y": -406, "w": 280
    },
    {
      "id": "obra-video-oleo",
      "type": "video",
      "src": "img/obras/proceso-oleo.mp4",
      "alt": "Vídeo del proceso de óleo sólido sobre lino belga",
      "x": -850, "y": -356, "w": 340
    },

    // ─── 5. DIAGRAMAS 01234 (nodo φ₂ derecho) ──────────────

    {
      "id": "diag-nodos",
      "type": "img",
      "src": "img/o1234/grafico-metamodelo-3.svg",
      "alt": "Diagrama del metamodelo 01234: cinco nodos y sus relaciones",
      "x": 940, "y": -456, "w": 300,
      "detail": "Estructura nodal del Sistema 01234. Cinco nodos, sus relaciones."
    },

    {
      "id": "cta-libro-01234",
      "type": "cta",
      "title": "01234: El Código Fuente de la Conciencia",
      "subtitle": "Un Sistema Vivo de Comprensión y Transformación",
      "icon": "<svg viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'><path d='M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20'/></svg>",
      "modal": {
        "title": "01234: El Código Fuente de la Conciencia",
        "body": "Un Sistema Vivo de Comprensión y Transformación",
        "actions": [
          {
            "label": "Descargar PDF",
            "href": "img/01234_El_Codigo_Fuente_de_la_Conciencia.pdf",
            "download": "01234_El_Codigo_Fuente_de_la_Conciencia.pdf"
          }
        ]
      },
      "x": 550, "y": -212
    },

    // ─── 6. IA GENERATIVA (nodo φ₁ inferior izquierdo) ──────

    {
      "id": "ia-plastica",
      "type": "img",
      "src": "img/sergio-arte-plastica.webp",
      "alt": "Imagen generada con IA a partir de la obra plástica de Sergio Forés",
      "x": -890, "y": 344, "w": 320
    },
    {
      "id": "ia-video-fondo",
      "type": "video",
      "src": "img/video-fondo.mp4",
      "alt": "Vídeo generativo de fondo",
      "x": -840, "y": 394, "w": 350
    },
    {
      "id": "ia-proceso-cognitivo",
      "type": "video",
      "src": "img/proceso-cognitivo.webm",
      "alt": "Vídeo sobre el proceso cognitivo con agentes IA",
      "x": -870, "y": 444, "w": 300
    },
    {
      "id": "ia-video-obra3d",
      "type": "video",
      "src": "img/video-fondo-obra3d-web.mp4",
      "alt": "Vídeo de obra tridimensional",
      "x": -850, "y": 494, "w": 280,
      "autoplay": true
    },

    // ─── 7. PERSONAS (nodo φ₂ inferior derecho) ─────────────

    {
      "id": "persona-noelia",
      "type": "img",
      "src": "img/noeliarequena.webp",
      "alt": "Retrato de Noelia Requena",
      "x": 890, "y": 556, "w": 220,
      "detail": "Noelia Requena — <a href='https://noeliarequena.com' target='_blank' rel='noopener'>noeliarequena.com</a>"
    },

    // ─── 8. MISCELÁNEA ──────────────────────────────────────

    {
      "id": "misc-travolta",
      "type": "img",
      "src": "img/john-travolta.gif",
      "alt": "GIF de John Travolta mirando a los lados, confuso",
      "x": 2330, "y": 1456, "w": 160, "zIndex": 101,
      "detail": "John Travolta — Confuso. Buscando la verdad por la puerta de atrás."
    }
  ]
};
