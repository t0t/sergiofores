/**
 * state.js — Estado global del canvas + constantes
 */

export const STORAGE_KEY = 'sergiofores_positions';

export const state = {
  scale: 1, x: 0, y: 0,
  minScale: 1, maxScale: 5,
  dragging: null, panning: false, hasMoved: false,
  panStart: { x: 0, y: 0 },
  stateStart: { x: 0, y: 0 },
  objStart: { x: 0, y: 0 },
  topZ: 100,
  pinchDist: 0, pinchScale: 1
};

export const isTouch = 'ontouchstart' in window;

export const objects = window.__DATA__.objects;

export const dom = {
  universe: document.getElementById('universe'),
  zoomEl: document.getElementById('zoom-level'),
  hint: document.getElementById('hint')
};
