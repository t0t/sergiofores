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
 *   7. Personas         → retratos con contexto
 *   8. Miscelánea       → easter eggs, elementos sueltos
 *
 * TIPOS SOPORTADOS: avatar, text, img, video, svg, social, cta
 *
 * PILAS: los elementos de una misma temática se apilan con offset
 * vertical ~50px entre sí, simulando documentos sobre una mesa.
 *
 * POSICIONES: coordenadas en espacio virtual del canvas (px).
 * Al 100% de zoom, el viewport visible (~1440x900) cubre
 * aproximadamente de (-720,-450) a (720,450) desde el centro.
 * Los grupos de medios caben dentro de este rango (con clip parcial).
 * Los textos van fuera (>1200) — son encuentros.
 *
 * IDs: cada objeto tiene un id estable (slug semántico).
 * La persistencia en localStorage cruza por id, no por índice.
 *
 * ESCALABILIDAD: para añadir contenido, crear un objeto nuevo
 * dentro del grupo correspondiente, respetando el offset de pila.
 */

window.__DATA__ = {
  "objects": [

    // ─── 1. IDENTIDAD ───────────────────────────────────────
    // Centro del canvas. Punto de partida visual.

    {
      "id": "id-nombre",
      "type": "text",
      "content": "Sergio Forés Raga",
      "x": -183, "y": -200,
      "cls": "large accent",
      "zIndex": 9999
    },
    {
      "id": "id-tagline",
      "type": "text",
      "content": "Artista plástico · Orquestando Agentes · Percibiendo en 01234",
      "x": 130, "y": 60,
      "cls": "micro"
    },
    {
      "id": "id-social",
      "type": "social",
      "x": -284, "y": 113,
      "links": [
        { "platform": "instagram", "label": "Instagram — obra plástica (@sergio.01234)", "url": "https://www.instagram.com/sergio.01234/" },
        { "platform": "instagram", "label": "Instagram — Sistema 01234 (@cuenta.01234)", "url": "https://www.instagram.com/cuenta.01234/" },
        { "platform": "x", "label": "X (@t0tinspire)", "url": "https://x.com/t0tinspire" },
        { "platform": "youtube", "label": "YouTube (@0-1234)", "url": "https://youtube.com/@0-1234" },
        { "platform": "github", "label": "GitHub (@t0t)", "url": "https://github.com/t0t" }
      ]
    },

    // ─── 2. TEXTOS (encuentros) ─────────────────────────────
    // Fuera del viewport inicial. Se descubren navegando.

    {
      "id": "txt-puerta-abierta",
      "type": "text",
      "content": "La forma más alineada no es salir al mundo a predicar. Es trabajar con la puerta abierta.",
      "x": -1400, "y": -1000,
      "cls": "large"
    },
    {
      "id": "txt-lenguaje-poetico",
      "type": "text",
      "content": "01234 no se explica. Se muestra — como arte, como analogía.",
      "x": 1500, "y": 1100
    },
    {
      "id": "txt-huerto",
      "type": "text",
      "content": "El huerto antes que el escaparate.",
      "x": -1600, "y": 700,
      "cls": "large"
    },
    {
      "id": "txt-forjas",
      "type": "text",
      "content": "Cuando creas, forjas. No es inspiración etérea — es fuego, martillo, yunque.",
      "x": -1300, "y": 1200
    },
    {
      "id": "txt-profundidades",
      "type": "text",
      "content": "La fuente creativa no está arriba. Está abajo. En las profundidades.",
      "x": 1400, "y": -1100
    },
    {
      "id": "txt-sistemas",
      "type": "text",
      "content": "Opero entrando en sistemas (materia, pensamiento, proceso), interactuando con ellos desde dentro, eliminando lo innecesario hasta que una estructura se hace evidente.",
      "x": -200, "y": 250
    },
    {
      "id": "txt-forma",
      "type": "text",
      "content": "La forma no la pongo yo. Llego cuando ya está ocurriendo.",
      "x": -80, "y": -280
    },
    {
      "id": "txt-nombra",
      "type": "text",
      "content": "si lo preparas demasiado → no ocurre · si lo nombras → se cae<br>si lo explicas → se sustituye por otra cosa",
      "x": 600, "y": -150
    },
    {
      "id": "txt-lenguaje-codigo",
      "type": "text",
      "content": "El lenguaje natural es el nuevo código.",
      "x": 1500, "y": -900,
      "cls": "large"
    },
    {
      "id": "txt-existir",
      "type": "text",
      "content": "Trabajo porque necesito que ciertas cosas existan.",
      "x": -1500, "y": 300
    },

    // ─── 3. SÍMBOLOS 01234 ──────────────────────────────────
    // Fila horizontal encima de la pila de diagramas.

    {
      "id": "sym-0-potencial",
      "type": "svg",
      "x": 380, "y": -390, "w": 50,
      "svg": "<svg viewBox='0 0 50 50' width='50' height='50'><circle cx='25' cy='25' r='21' fill='none' stroke='#e8e8e8' stroke-width='1'/></svg>",
      "detail": "0 — Potencial"
    },
    {
      "id": "sym-1-esencia",
      "type": "svg",
      "x": 440, "y": -390, "w": 50,
      "svg": "<svg viewBox='0 0 50 50' width='50' height='50'><circle cx='25' cy='25' r='9' fill='#e8e8e8'/></svg>",
      "detail": "1 — Esencia"
    },
    {
      "id": "sym-2-diferenciacion",
      "type": "svg",
      "x": 500, "y": -390, "w": 50,
      "svg": "<svg viewBox='0 0 50 50' width='50' height='50'><line x1='8' y1='25' x2='42' y2='25' stroke='#e8e8e8' stroke-width='1.5'/></svg>",
      "detail": "2 — Diferenciación"
    },
    {
      "id": "sym-3-conexion",
      "type": "svg",
      "x": 560, "y": -390, "w": 50,
      "svg": "<svg viewBox='0 0 50 50' width='50' height='50'><polygon points='25,6 46,44 4,44' fill='none' stroke='#e8e8e8' stroke-width='1'/></svg>",
      "detail": "3 — Conexión"
    },
    {
      "id": "sym-4-materializacion",
      "type": "svg",
      "x": 620, "y": -390, "w": 50,
      "svg": "<svg viewBox='0 0 50 50' width='50' height='50'><rect x='8' y='8' width='34' height='34' fill='none' stroke='#e8e8e8' stroke-width='1'/></svg>",
      "detail": "4 — Materialización"
    },

    // ─── 4. OBRA PLÁSTICA (pila) ────────────────────────────
    // Cuadrante superior izquierdo.

    {
      "id": "obra-gesto",
      "type": "img",
      "src": "img/obras/gesto-primordial.webp",
      "alt": "Óleo sobre lino — Gesto primordial",
      "x": -600, "y": -380, "w": 340
    },
    {
      "id": "obra-tactil",
      "type": "img",
      "src": "img/obras/exploracion-tactil.webp",
      "alt": "Óleo sobre lino — Exploración táctil",
      "x": -650, "y": -330, "w": 320
    },
    {
      "id": "obra-proceso",
      "type": "img",
      "src": "img/obras/proceso-creativo.webp",
      "alt": "Óleo sobre lino — Proceso creativo",
      "x": -580, "y": -280, "w": 300
    },
    {
      "id": "obra-superficie",
      "type": "img",
      "src": "img/obras/superficie-consciente.webp",
      "alt": "Óleo sobre lino — Superficie consciente",
      "x": -630, "y": -230, "w": 280
    },
    {
      "id": "obra-video-oleo",
      "type": "video",
      "src": "img/obras/proceso-oleo.mp4",
      "alt": "Vídeo del proceso de óleo sólido sobre lino belga",
      "x": -560, "y": -180, "w": 340
    },

    // ─── 5. DIAGRAMAS 01234 (pila) ─────────────────────────
    // Cuadrante superior derecho, bajo los símbolos.

    {
      "id": "diag-logo",
      "type": "img",
      "src": "img/o1234/logo-01234.png",
      "alt": "Logotipo del Sistema 01234",
      "x": 400, "y": -340, "w": 180
    },
    {
      "id": "diag-nodos",
      "type": "img",
      "src": "img/o1234/grafico-metamodelo-3.svg",
      "alt": "Diagrama del metamodelo 01234: cinco nodos y sus relaciones",
      "x": 450, "y": -290, "w": 300,
      "detail": "Estructura nodal del Sistema 01234. Cinco nodos, sus relaciones."
    },
    {
      "id": "diag-espiritu",
      "type": "img",
      "src": "img/o1234/grafico_004.png",
      "alt": "Diagrama: Espíritu, Alma, Mente, Cuerpo y lo incognoscible",
      "x": 380, "y": -240, "w": 280,
      "detail": "Espíritu, Alma, Mente, Cuerpo — y lo incognoscible."
    },
    {
      "id": "diag-oculto",
      "type": "img",
      "src": "img/o1234/grafico_009.png",
      "alt": "Diagrama: del Absoluto incognoscible al cerebro",
      "x": 430, "y": -190, "w": 240,
      "detail": "Lo oculto se oculta de sí para verse. Del Absoluto incognoscible a tu cerebro."
    },
    {
      "id": "diag-pardes",
      "type": "img",
      "src": "img/o1234/grafico-pardes.svg",
      "alt": "Diagrama Pardes aplicado al Sistema 01234",
      "x": 390, "y": -140, "w": 260
    },
    {
      "id": "diag-ontologia",
      "type": "img",
      "src": "img/o1234/ontologia-condensada.svg",
      "alt": "Ontología condensada del Sistema 01234",
      "x": 420, "y": -90, "w": 280
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
      "x": 380, "y": -30
    },

    // ─── 6. IA GENERATIVA (pila) ────────────────────────────
    // Cuadrante inferior izquierdo.

    {
      "id": "ia-plastica",
      "type": "img",
      "src": "img/sergio-arte-plastica.webp",
      "alt": "Imagen generada con IA a partir de la obra plástica de Sergio Forés",
      "x": -520, "y": 200, "w": 320
    },
    {
      "id": "ia-video-fondo",
      "type": "video",
      "src": "img/video-fondo.mp4",
      "alt": "Vídeo generativo de fondo",
      "x": -470, "y": 250, "w": 350
    },
    {
      "id": "ia-proceso-cognitivo",
      "type": "video",
      "src": "img/proceso-cognitivo.webm",
      "alt": "Vídeo sobre el proceso cognitivo con agentes IA",
      "x": -500, "y": 300, "w": 300
    },
    {
      "id": "ia-video-obra3d",
      "type": "video",
      "src": "img/video-fondo-obra3d-web.mp4",
      "alt": "Vídeo de obra tridimensional",
      "x": -480, "y": 350, "w": 280,
      "autoplay": true
    },

    // ─── 7. PERSONAS ────────────────────────────────────────
    // Cuadrante inferior derecho.

    {
      "id": "id-avatar-sergio-disco",
      "type": "avatar",
      "src": "img/avatar-sergio-disco.webp",
      "alt": "Retrato de Sergio Forés",
      "x": -120, "y": -213, "w": 120
    },

    {
      "id": "persona-noelia",
      "type": "img",
      "src": "img/noeliarequena.webp",
      "alt": "Retrato de Noelia Requena",
      "x": 480, "y": 220, "w": 220,
      "detail": "Noelia Requena — <a href='https://noeliarequena.com' target='_blank' rel='noopener'>noeliarequena.com</a>"
    },

    // ─── 8. MISCELÁNEA ──────────────────────────────────────

    {
      "id": "misc-travolta",
      "type": "img",
      "src": "img/john-travolta.gif",
      "alt": "GIF de John Travolta mirando a los lados, confuso",
      "x": 570, "y": 268, "w": 160, "zIndex": 101,
      "detail": "John Travolta — Confuso. Buscando la verdad por la puerta de atrás."
    }
  ]
};
