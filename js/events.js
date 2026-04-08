/**
 * events.js — Mouse, touch, keyboard (delegados)
 *
 * Usa event delegation donde es posible.
 * Touch soporta tanto panning como drag de objetos individuales.
 */

import { state, objects, dom } from './state.js';
import { applyTransform, centerView, zoom } from './transform.js';
import { debounceSave } from './persist.js';

// ── Centrar la vista sobre un objeto (uso del focus por teclado) ──
function centerOnObject(el) {
  const i = parseInt(el.dataset.index, 10);
  const obj = objects[i];
  if (!obj) return;
  // Estima el centro del objeto (x/y son su esquina superior-izquierda en el
  // espacio virtual; añadimos la mitad del tamaño renderizado).
  const rect = el.getBoundingClientRect();
  const halfW = (rect.width / state.scale) / 2;
  const halfH = (rect.height / state.scale) / 2;
  const targetX = window.innerWidth  / 2 - (obj.x + halfW) * state.scale;
  const targetY = window.innerHeight / 2 - (obj.y + halfH) * state.scale;
  state.x = targetX;
  state.y = targetY;
  applyTransform();
  debounceSave();
}

// ── HELPERS ──

function hideHint() {
  if (!dom.hint.classList.contains('gone')) {
    dom.hint.classList.add('gone');
    setTimeout(() => dom.hint.remove(), 1500);
  }
}

function isInteractive(target) {
  // Detail panel (y sus links): interactivo — no se arrastra
  if (target.closest('.obj__detail')) return true;
  // Links en general: interactivos, excepto los del CTA (se draggean; acción va por click)
  const link = target.closest('a');
  return !!(link && !link.closest('.obj--cta'));
}

function getObjEl(target) {
  return target.closest('.obj');
}

function syncObjPosition(el) {
  const i    = parseInt(el.dataset.index, 10);
  objects[i].x = parseFloat(el.style.left);
  objects[i].y = parseFloat(el.style.top);
  debounceSave();
}

function toggleExpanded(el) {
  el.classList.toggle('obj--expanded');
  if (el.classList.contains('obj--expanded')) {
    state.topZ++;
    el.style.zIndex = state.topZ;
  }
}

// ── WHEEL ──

window.addEventListener('wheel', e => {
  e.preventDefault();
  hideHint();
  zoom(e.deltaY, e.clientX, e.clientY);
}, { passive: false });

// ── MOUSE ──

window.addEventListener('mousedown', e => {
  hideHint();
  state.hasMoved = false;

  if (isInteractive(e.target)) return;

  const obj = getObjEl(e.target);
  if (obj) {
    state.dragging  = obj;
    state.topZ++;
    obj.style.zIndex = state.topZ;
    obj.classList.add('obj--focused');
    state.objStart.x = parseFloat(obj.style.left);
    state.objStart.y = parseFloat(obj.style.top);
    state.panStart.x = e.clientX;
    state.panStart.y = e.clientY;
    document.body.style.cursor = 'grabbing';
    e.preventDefault();
  } else {
    state.panning    = true;
    state.panStart.x = e.clientX;
    state.panStart.y = e.clientY;
    state.stateStart.x = state.x;
    state.stateStart.y = state.y;
  }
});

window.addEventListener('mousemove', e => {
  if (!state.dragging && !state.panning) return;
  state.hasMoved = true;

  if (state.dragging) {
    const dx = (e.clientX - state.panStart.x) / state.scale;
    const dy = (e.clientY - state.panStart.y) / state.scale;
    state.dragging.style.left = (state.objStart.x + dx) + 'px';
    state.dragging.style.top  = (state.objStart.y + dy) + 'px';
  } else {
    state.x = state.stateStart.x + (e.clientX - state.panStart.x);
    state.y = state.stateStart.y + (e.clientY - state.panStart.y);
    applyTransform();
  }
});

window.addEventListener('mouseup', () => {
  if (state.dragging) {
    syncObjPosition(state.dragging);
    state.dragging.classList.remove('obj--focused');
    state.dragging = null;
    document.body.style.cursor = '';
  }
  if (state.panning) {
    state.panning = false;
    debounceSave();
  }
});

// ── CLICK (delegado) ──

dom.universe.addEventListener('click', e => {
  // Bloquear acción del CTA si hubo movimiento
  if (state.hasMoved && e.target.closest('.obj--cta')) {
    e.preventDefault();
    return;
  }
  // Detener propagación en links para no disparar expand
  if (e.target.closest('a')) e.stopPropagation();
});

// ── DOUBLE CLICK (delegado) ──

dom.universe.addEventListener('dblclick', e => {
  if (e.target.closest('a')) { e.stopPropagation(); return; }
  if (state.hasMoved) return;
  const obj = getObjEl(e.target);
  if (obj) toggleExpanded(obj);
});

// ── TOUCH ──

const DRAG_THRESHOLD = 8;
let lastTap        = 0;
let touchStartPos  = { x: 0, y: 0 };
let touchTarget    = null;

window.addEventListener('touchstart', e => {
  hideHint();
  state.hasMoved = false;

  if (e.touches.length === 1) {
    const t = e.touches[0];
    touchStartPos.x = t.clientX;
    touchStartPos.y = t.clientY;

    const obj = getObjEl(e.target);
    if (obj && !isInteractive(e.target)) {
      touchTarget = obj;
      state.topZ++;
      obj.style.zIndex = state.topZ;
      state.objStart.x = parseFloat(obj.style.left);
      state.objStart.y = parseFloat(obj.style.top);
      state.panStart.x = t.clientX;
      state.panStart.y = t.clientY;
    } else {
      touchTarget      = null;
      state.panning    = true;
      state.panStart.x = t.clientX;
      state.panStart.y = t.clientY;
      state.stateStart.x = state.x;
      state.stateStart.y = state.y;
    }
  }

  if (e.touches.length === 2) {
    state.panning = false;
    touchTarget   = null;
    const dx = e.touches[0].clientX - e.touches[1].clientX;
    const dy = e.touches[0].clientY - e.touches[1].clientY;
    state.pinchDist  = Math.sqrt(dx * dx + dy * dy);
    state.pinchScale = state.scale;
  }
}, { passive: true });

window.addEventListener('touchmove', e => {
  if (e.touches.length === 2) {
    e.preventDefault();
    state.hasMoved = true;
    const dx   = e.touches[0].clientX - e.touches[1].clientX;
    const dy   = e.touches[0].clientY - e.touches[1].clientY;
    const dist = Math.sqrt(dx * dx + dy * dy);
    const cx   = (e.touches[0].clientX + e.touches[1].clientX) / 2;
    const cy   = (e.touches[0].clientY + e.touches[1].clientY) / 2;
    const newScale = Math.max(
      state.minScale,
      Math.min(state.maxScale, state.pinchScale * (dist / state.pinchDist))
    );
    const ratio = newScale / state.scale;
    state.x     = cx - (cx - state.x) * ratio;
    state.y     = cy - (cy - state.y) * ratio;
    state.scale = newScale;
    applyTransform();

  } else if (e.touches.length === 1) {
    const t  = e.touches[0];
    const dx = t.clientX - touchStartPos.x;
    const dy = t.clientY - touchStartPos.y;

    if (Math.abs(dx) > DRAG_THRESHOLD || Math.abs(dy) > DRAG_THRESHOLD) {
      state.hasMoved = true;
    }

    e.preventDefault();

    if (touchTarget) {
      const mx = (t.clientX - state.panStart.x) / state.scale;
      const my = (t.clientY - state.panStart.y) / state.scale;
      touchTarget.style.left = (state.objStart.x + mx) + 'px';
      touchTarget.style.top  = (state.objStart.y + my) + 'px';
    } else if (state.panning) {
      state.x = state.stateStart.x + (t.clientX - state.panStart.x);
      state.y = state.stateStart.y + (t.clientY - state.panStart.y);
      applyTransform();
    }
  }
}, { passive: false });

window.addEventListener('touchend', e => {
  if (touchTarget) {
    syncObjPosition(touchTarget);
    touchTarget = null;
  }
  state.panning = false;

  // Double-tap para expandir
  if (!state.hasMoved && e.changedTouches.length === 1) {
    const now = Date.now();
    if (now - lastTap < 350) {
      const t   = e.changedTouches[0];
      const el  = document.elementFromPoint(t.clientX, t.clientY);
      const obj = el && getObjEl(el);
      if (obj) toggleExpanded(obj);
    }
    lastTap = now;
  }
});

// ── KEYBOARD ──
//
// Navegación estándar:
//   Tab / Shift+Tab  → siguiente / anterior objeto (foco nativo del navegador)
//   Enter / Space    → expande/colapsa el objeto enfocado
//   Escape           → cierra todos los detalles expandidos y libera foco
//   Flechas          → paneo manual del canvas
//   + / -            → zoom
//   0                → recentrar vista

// Cuando un .obj recibe foco por teclado, lo traemos al centro del viewport.
document.addEventListener('focusin', e => {
  const el = e.target.closest?.('.obj');
  if (!el) return;
  hideHint();
  centerOnObject(el);
});

window.addEventListener('keydown', e => {
  const step = 80;
  const focused = document.activeElement?.closest?.('.obj');

  // Enter / Space sobre objeto enfocado → expandir
  if ((e.key === 'Enter' || e.key === ' ') && focused) {
    e.preventDefault();
    toggleExpanded(focused);
    return;
  }

  switch (e.key) {
    case 'Escape':
      document.querySelectorAll('.obj--expanded')
        .forEach(el => el.classList.remove('obj--expanded'));
      if (focused) focused.blur();
      break;
    case '0':          centerView(); break;
    case 'ArrowUp':    state.y += step; applyTransform(); break;
    case 'ArrowDown':  state.y -= step; applyTransform(); break;
    case 'ArrowLeft':  state.x += step; applyTransform(); break;
    case 'ArrowRight': state.x -= step; applyTransform(); break;
    case '+': case '=': zoom( 1, innerWidth / 2, innerHeight / 2); break;
    case '-':            zoom(-1, innerWidth / 2, innerHeight / 2); break;
  }
});
