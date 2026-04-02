/**
 * events.js — Mouse, touch, keyboard (delegados)
 *
 * Usa event delegation donde es posible.
 * Touch soporta tanto panning como drag de objetos individuales.
 */

import { state, objects, dom } from './state.js';
import { applyTransform, centerView, zoom } from './transform.js';
import { debounceSave } from './persist.js';

// ── HELPERS ──

function hideHint() {
  if (!dom.hint.classList.contains('gone')) {
    dom.hint.classList.add('gone');
    setTimeout(() => dom.hint.remove(), 1500);
  }
}

function isInteractive(target) {
  // Links dentro de details son interactivos (no arrastrar).
  // Links dentro de CTA NO son interactivos (permitir drag, descarga va por click sin move).
  const link = target.closest('a');
  if (!link) return target.closest('.obj__detail');
  return link.closest('.obj__detail') && !link.closest('.obj--cta');
}

function getObjEl(target) {
  return target.closest('.obj');
}

function syncObjPosition(el) {
  const i = parseInt(el.dataset.index, 10);
  objects[i].x = parseFloat(el.style.left);
  objects[i].y = parseFloat(el.style.top);
  debounceSave();
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
    state.dragging = obj;
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
    state.panning = true;
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
    state.dragging.style.top = (state.objStart.y + dy) + 'px';
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

// ── CTA: descarga solo si no hubo drag ──

dom.universe.addEventListener('click', e => {
  const ctaLink = e.target.closest('.obj--cta a');
  if (!ctaLink) return;
  if (state.hasMoved) {
    e.preventDefault();
    return;
  }
  // Sin movimiento → dejar que el click/download ocurra naturalmente
});

// ── DOUBLE CLICK (delegado en universe) ──

dom.universe.addEventListener('dblclick', e => {
  if (state.hasMoved) return;
  const obj = getObjEl(e.target);
  if (!obj) return;
  obj.classList.toggle('obj--expanded');
  if (obj.classList.contains('obj--expanded')) {
    state.topZ++;
    obj.style.zIndex = state.topZ;
  }
});

// ── TOUCH ──

const DRAG_THRESHOLD = 8;
let lastTap = 0;
let touchStartPos = { x: 0, y: 0 };
let touchTarget = null; // .obj bajo el dedo, o null para pan

window.addEventListener('touchstart', e => {
  hideHint();
  state.hasMoved = false;

  if (e.touches.length === 1) {
    const t = e.touches[0];
    touchStartPos.x = t.clientX;
    touchStartPos.y = t.clientY;

    const obj = getObjEl(e.target);
    if (obj && !isInteractive(e.target)) {
      // Drag de objeto individual
      touchTarget = obj;
      state.topZ++;
      obj.style.zIndex = state.topZ;
      state.objStart.x = parseFloat(obj.style.left);
      state.objStart.y = parseFloat(obj.style.top);
      state.panStart.x = t.clientX;
      state.panStart.y = t.clientY;
    } else {
      // Pan del canvas
      touchTarget = null;
      state.panning = true;
      state.panStart.x = t.clientX;
      state.panStart.y = t.clientY;
      state.stateStart.x = state.x;
      state.stateStart.y = state.y;
    }
  }

  if (e.touches.length === 2) {
    state.panning = false;
    touchTarget = null;
    const dx = e.touches[0].clientX - e.touches[1].clientX;
    const dy = e.touches[0].clientY - e.touches[1].clientY;
    state.pinchDist = Math.sqrt(dx * dx + dy * dy);
    state.pinchScale = state.scale;
  }
}, { passive: true });

window.addEventListener('touchmove', e => {
  if (e.touches.length === 2) {
    e.preventDefault();
    state.hasMoved = true;
    const dx = e.touches[0].clientX - e.touches[1].clientX;
    const dy = e.touches[0].clientY - e.touches[1].clientY;
    const dist = Math.sqrt(dx * dx + dy * dy);
    const cx = (e.touches[0].clientX + e.touches[1].clientX) / 2;
    const cy = (e.touches[0].clientY + e.touches[1].clientY) / 2;
    const newScale = Math.max(
      state.minScale,
      Math.min(state.maxScale, state.pinchScale * (dist / state.pinchDist))
    );
    const ratio = newScale / state.scale;
    state.x = cx - (cx - state.x) * ratio;
    state.y = cy - (cy - state.y) * ratio;
    state.scale = newScale;
    applyTransform();
  } else if (e.touches.length === 1) {
    const t = e.touches[0];
    const dx = t.clientX - touchStartPos.x;
    const dy = t.clientY - touchStartPos.y;

    if (Math.abs(dx) > DRAG_THRESHOLD || Math.abs(dy) > DRAG_THRESHOLD) {
      state.hasMoved = true;
    }

    e.preventDefault();

    if (touchTarget) {
      // Drag de objeto
      const mx = (t.clientX - state.panStart.x) / state.scale;
      const my = (t.clientY - state.panStart.y) / state.scale;
      touchTarget.style.left = (state.objStart.x + mx) + 'px';
      touchTarget.style.top = (state.objStart.y + my) + 'px';
    } else if (state.panning) {
      // Pan del canvas
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
      const t = e.changedTouches[0];
      const el = document.elementFromPoint(t.clientX, t.clientY);
      const obj = el && getObjEl(el);
      if (obj) {
        obj.classList.toggle('obj--expanded');
        if (obj.classList.contains('obj--expanded')) {
          state.topZ++;
          obj.style.zIndex = state.topZ;
        }
      }
    }
    lastTap = now;
  }
});

// ── KEYBOARD ──

window.addEventListener('keydown', e => {
  const step = 80;
  switch (e.key) {
    case 'Escape':
      document.querySelectorAll('.obj--expanded')
        .forEach(el => el.classList.remove('obj--expanded'));
      break;
    case '0': centerView(); break;
    case 'ArrowUp':    state.y += step; applyTransform(); break;
    case 'ArrowDown':  state.y -= step; applyTransform(); break;
    case 'ArrowLeft':  state.x += step; applyTransform(); break;
    case 'ArrowRight': state.x -= step; applyTransform(); break;
    case '+': case '=': zoom(1, innerWidth / 2, innerHeight / 2); break;
    case '-':            zoom(-1, innerWidth / 2, innerHeight / 2); break;
  }
});

// ── EVENT DELEGATION: links dentro de objetos ──
// stopPropagation para que click/dblclick en links no dispare drag/expand

dom.universe.addEventListener('click', e => {
  if (e.target.closest('a')) e.stopPropagation();
});

dom.universe.addEventListener('dblclick', e => {
  if (e.target.closest('a')) e.stopPropagation();
});
