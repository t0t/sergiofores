# CHANGELOG — sergiofores.es

Registro de cambios significativos, deuda técnica y evolución del proyecto.

---

## [2026-04-08] — Accesibilidad, marca y documentación

### Añadido

- **Navegación por teclado estándar:** Tab/Shift+Tab cicla por objetos con center-on-focus automático. Enter/Space expande detalles. Escape cierra y libera foco.
- **Foco visible accesible:** outline amarillo de 2px con offset 6px (solo `:focus-visible`, no en clic).
- **Alt text en todas las imágenes/vídeos:** derivado de `obj.alt` en `data.js`.
- **Aria-labels estructurados:** cada `.obj` es `role="button"`, `tabIndex=0`, con etiqueta legible (strip HTML, max 140 chars).
- **Dos cuentas Instagram diferenciadas:** `@sergio.01234` (obra plástica) vs `@cuenta.01234` (Sistema 01234), con `label` explícito en social links.
- **Frases nuevas en canvas:** *"El lenguaje natural es el nuevo código"*, *"Trabajo porque necesito que ciertas cosas existan"*.
- **Tagline vigente en todos los sitios:** `<title>`, Open Graph, Twitter Card, canvas, metadatos.
- **README completo:** descripción técnica, visual, interacción, accesibilidad, arquitectura, responsive, rendimiento.
- **CHANGELOG.md:** este archivo. Registro de deuda y evolución.

### Mejorado

- **Contraste:** `--fg-dim` de `#999` a `#b8b8b8`. Cumple **WCAG AAA** (~10.7:1 sobre `#0a0a0a`).
- **Render.js:** soporte para `obj.alt` en imágenes y videos. Aria-labels en social links.
- **CSS:** foco visible solo con teclado (evita flash visual en clic).

### Documentación

- README reescrito con descripción completa de paradigma, visual, contenido, interacción, accesibilidad.
- Marca personal: añadida sección **3c. Frases-tesis** con *"El lenguaje natural es el nuevo código"*.
- Memoria de feedback: *"No abrir carriles paralelos cuando la instrucción es clara"* (cambios de marca se aplican en todos los sitios).

---

## En deuda (priorizado)

### 1. Accesibilidad — Orden de tabulación

**Problema:** Navegación por teclado (Tab) sigue el orden DOM, no el orden de lectura lógico. Los objetos en `data.js` no están ordenados de forma que tenga sentido para un usuario que navega por teclado.

**Impacto:** Un visitante con lector de pantalla saltará de *"Gesto primordial"* (obra plástica) a *"Ontología condensada"* (diagrama 01234), sin un flujo claro.

**Solución propuesta:** Reordenar objetos en `data.js` por flujo lógico (identidad → textos nucleares → obra → sistema → símbolos → IA → personas), o implementar `tabindex` explícito con prioridades (núcleo central primero, encuentros después).

**Esfuerzo:** Bajo-medio (revisión del orden, sin cambios en JS).

---

### 2. Descubrimiento — Visualización de límites del canvas

**Problema:** Las frases nuevas viven a ±1500px. Sin instrucción explícita, un visitante podría nunca descubrirlas.

**Impacto:** Obra "oculta" en los extremos. Solo quien explore activamente (o sepa que está ahí) la encuentra.

**Tradeoff actual:** Deliberado — el huerto crece inward, el descubrimiento es privado. Pero es arquitectónicamente opaco.

**Soluciones posibles:**
- Añadir migas visuales sutiles (líneas, puntos) en los extremos del viewport visible que sugieran contenido más allá.
- Expandir la hint inicial: *"scroll · arrastra · explora — hay más en los extremos"*.
- Implementar "mini-map" que muestre la densidad del canvas (overlay fijo, opt-in).

**Esfuerzo:** Bajo (hint mejorada) a medio (mini-map).

---

### 3. Persistencia

**Estado actual:** localStorage desactivado (`ENABLED = false` en `persist.js`).

**Cuándo activar:** Cuando la composición sea definitiva. Ahora, mientras se añada contenido frecuente, es riesgo que persistan posiciones anticuadas.

---

### 4. Screen reader — Contenido en SVG

**Problema:** Los símbolos 01234 (5 SVGs) y diagramas SVG no tienen descripción textual alternativa. Un lector de pantalla dirá "group" sin más.

**Solución:** Añadir `<title>` y `<desc>` dentro del SVG, o vincular con `aria-labelledby`.

**Esfuerzo:** Bajo (30 mins).

---

### 5. Performance — Lazy loading avanzado

**Estado actual:** Imágenes con `loading="lazy"`, vídeos con `preload="metadata"`, Poster en `requestIdleCallback`.

**Oportunidad:** Intersection Observer para descargar vídeos solo cuando están a punto de entrar en viewport (ahora no se cargan hasta hover/autoplay).

**Esfuerzo:** Medio (refactor de video.js en render.js).

---

### 6. Rediseño de modal CTA

**Problema:** El modal es minimalista, pero visual (backdrop blur, transiciones suaves). La accesibilidad está cubierta (`role="dialog"`, close button), pero no hay focus trap ni gestión de scroll.

**Solución:** Añadir focus trap (Tab cycles dentro del modal), `aria-modal="true"`, prevent scroll en body mientras está abierto.

**Esfuerzo:** Bajo (20 mins, modal.js).

---

## Notas de visión

- **Escala:** El canvas puede crecer indefinidamente. La arquitectura lo soporta (objetos sin límite en `data.js`). El riesgo es la densidad: demasiados objetos hacen que el descubrimiento sea caos.
- **Mobile:** Funciona, pero la UX es distinta — es más exploración/discovery que en desktop. Podría beneficiarse de gestos adicionales (long-press para expandir).
- **Futuro:** Sincronización con Obsidian o CMS para mantener `data.js` actualizado sin tocar archivos. O exportar selecciones del canvas como imágenes/PDFs (ya es herramienta de work, dar un step más).

