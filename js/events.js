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
  // Texto en edición: interactivo
  if (target.closest('.obj--editing')) return true;
  // Resize handle: se gestiona aparte
  if (target.closest('.obj__resize-handle')) return true;
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

// ── WHEEL (zoom desactivado — se controla desde sidebar) ──

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
  if (!obj) return;

  // Textos: edición inline
  if (obj.classList.contains('obj--text')) {
    startTextEdit(obj);
    return;
  }

  toggleExpanded(obj);
});

// ── EDICIÓN INLINE DE TEXTO ──

function startTextEdit(el) {
  if (el.classList.contains('obj--editing')) return;
  el.classList.add('obj--editing');
  el.contentEditable = 'true';
  el.focus();

  // Seleccionar todo el contenido
  const range = document.createRange();
  range.selectNodeContents(el);
  const sel = window.getSelection();
  sel.removeAllRanges();
  sel.addRange(range);
}

function stopTextEdit(el) {
  if (!el?.classList.contains('obj--editing')) return;
  el.classList.remove('obj--editing');
  el.contentEditable = 'false';

  // Sincronizar contenido editado con __DATA__
  const i = parseInt(el.dataset.index, 10);
  if (objects[i]) {
    objects[i].content = el.innerHTML;
    debounceSave();
  }
}

// Salir de edición al clicar fuera o presionar Escape
window.addEventListener('mousedown', e => {
  const editing = document.querySelector('.obj--editing');
  if (editing && !editing.contains(e.target)) {
    stopTextEdit(editing);
  }
});

window.addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    const editing = document.querySelector('.obj--editing');
    if (editing) { stopTextEdit(editing); e.stopPropagation(); }
  }
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

  // Pinch-zoom desactivado — se controla desde sidebar
  if (e.touches.length === 2) {
    state.panning = false;
    touchTarget   = null;
  }
}, { passive: true });

window.addEventListener('touchmove', e => {
  if (e.touches.length === 2) {
    // Pinch-zoom desactivado
    return;
  }

  if (e.touches.length === 1) {
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

// ── RESIZE DESDE HANDLE ──

let resizing = null;
let resizeStart = { x: 0, y: 0, w: 0 };

window.addEventListener('mousedown', e => {
  const handle = e.target.closest('.obj__resize-handle');
  if (!handle) return;

  e.preventDefault();
  e.stopPropagation();

  const obj = handle.closest('.obj');
  obj.classList.add('obj--resizing');
  resizing = obj;
  resizeStart.x = e.clientX;
  resizeStart.y = e.clientY;
  resizeStart.w = obj.offsetWidth;
  document.body.style.cursor = 'nwse-resize';
});

window.addEventListener('mousemove', e => {
  if (!resizing) return;
  const dx = (e.clientX - resizeStart.x) / state.scale;
  const newW = Math.max(60, resizeStart.w + dx);
  resizing.style.width = newW + 'px';
});

window.addEventListener('mouseup', () => {
  if (!resizing) return;

  // Sincronizar ancho con __DATA__
  const i = parseInt(resizing.dataset.index, 10);
  if (objects[i]) {
    objects[i].w = Math.round(parseFloat(resizing.style.width));
    debounceSave();
  }

  resizing.classList.remove('obj--resizing');
  resizing = null;
  document.body.style.cursor = '';
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

// ── GUARDAR POSICIONES EN data.js (Cmd+S / Ctrl+S) ──

export function exportDataJS() {
  // Actualizar coordenadas en __DATA__ desde el DOM actual
  const els = document.querySelectorAll('.obj[data-id]');
  const posMap = {};
  els.forEach(el => {
    posMap[el.dataset.id] = {
      x: Math.round(parseFloat(el.style.left)),
      y: Math.round(parseFloat(el.style.top))
    };
  });

  const updated = window.__DATA__.objects.map(obj => {
    if (obj.id && posMap[obj.id]) {
      return { ...obj, x: posMap[obj.id].x, y: posMap[obj.id].y };
    }
    return obj;
  });

  // Serializar con formato legible
  const header = `/**
 * data.js — Contenido del canvas de sergiofores.es
 *
 * FUENTE ÚNICA DE VERDAD para todo el contenido visible.
 * Posiciones exportadas desde el canvas con Cmd+S.
 */

`;
  const json = JSON.stringify({ objects: updated }, null, 2);
  const content = header + 'window.__DATA__ = ' + json + ';\n';

  // Descargar como archivo
  const blob = new Blob([content], { type: 'text/javascript' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = 'data.js';
  a.click();
  URL.revokeObjectURL(a.href);

  // Feedback visual
  const el = document.getElementById('zoom-level');
  el.textContent = 'posiciones guardadas ✓';
  el.classList.add('visible');
  setTimeout(() => el.classList.remove('visible'), 2000);
}

window.addEventListener('keydown', e => {
  // Alt+S → exportar data.js con posiciones actuales
  if (e.altKey && e.key === 's') {
    e.preventDefault();
    exportDataJS();
    return;
  }

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
    // Zoom por teclado desactivado — se controla desde sidebar
  }
});
