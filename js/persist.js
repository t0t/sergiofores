/**
 * persist.js — Persistencia de posiciones y vista en localStorage
 *
 * Cruza por ID estable (obj.id), no por índice.
 * Si un objeto no tiene id, se ignora en la persistencia.
 *
 * TOGGLE: poner ENABLED = false para desactivar sin tocar más código.
 */

import { STORAGE_KEY, state, objects } from './state.js';

const ENABLED = false; // ← cambiar a true para reactivar

export function loadPositions() {
  if (!ENABLED) return false;
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) return false;
    const data = JSON.parse(saved);
    const posMap = {};

    if (data.positions) {
      data.positions.forEach(p => { if (p.id) posMap[p.id] = p; });
    }

    objects.forEach(obj => {
      if (obj.id && posMap[obj.id]) {
        obj.x = posMap[obj.id].x;
        obj.y = posMap[obj.id].y;
      }
    });

    if (data.view) {
      state.x = data.view.x;
      state.y = data.view.y;
      state.scale = data.view.scale;
      return true;
    }
    return false;
  } catch (_) { return false; }
}

export function savePositions() {
  if (!ENABLED) return;
  try {
    const data = {
      view: { x: state.x, y: state.y, scale: state.scale },
      positions: objects
        .filter(obj => obj.id)
        .map(obj => ({ id: obj.id, x: obj.x, y: obj.y }))
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (_) { /* quota excedida o no disponible */ }
}

let saveTimeout;
export function debounceSave() {
  clearTimeout(saveTimeout);
  saveTimeout = setTimeout(savePositions, 500);
}
