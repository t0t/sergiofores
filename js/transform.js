/**
 * transform.js — Pan, zoom, centrar vista
 */

import { state, dom } from './state.js';

let rafPending = false;

export function applyTransform() {
  if (rafPending) return;
  rafPending = true;
  requestAnimationFrame(() => {
    // zoom re-renderiza vectores (SVG, texto) nítidos a cualquier escala.
    // transform: translate gestiona la posición en coordenadas de pantalla.
    // No se usa scale() en transform para evitar rasterizar la capa GPU a 1×.
    dom.universe.style.zoom      = state.scale;
    dom.universe.style.transform = `translate(${state.x}px,${state.y}px)`;
    rafPending = false;
  });
}

export function centerView() {
  state.x = window.innerWidth / 2;
  state.y = window.innerHeight / 2;
  state.scale = 1;
  applyTransform();
}

const ZOOM_IN = 1.08;
const ZOOM_OUT = 0.92;

export function zoom(delta, cx, cy) {
  // delta > 0 = scroll abajo = acercar (zoom in)
  const factor = delta > 0 ? ZOOM_IN : ZOOM_OUT;
  const newScale = Math.max(
    state.minScale,
    Math.min(state.maxScale, state.scale * factor)
  );
  const ratio = newScale / state.scale;
  state.x = cx - (cx - state.x) * ratio;
  state.y = cy - (cy - state.y) * ratio;
  state.scale = newScale;
  applyTransform();
  showZoom();
}

let zoomTimeout;
function showZoom() {
  dom.zoomEl.textContent = Math.round(state.scale * 100) + '%';
  dom.zoomEl.classList.add('visible');
  clearTimeout(zoomTimeout);
  zoomTimeout = setTimeout(() => dom.zoomEl.classList.remove('visible'), 1200);
}
