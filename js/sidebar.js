/**
 * sidebar.js — Panel lateral de herramientas
 *
 * Toggle con botón bottom-right. Cierra con X o click fuera.
 * Controles: zoom +/−/reset, dark mode.
 */

import { state } from './state.js';
import { applyTransform, centerView, zoom } from './transform.js';
import { exportDataJS } from './events.js';

const toggle    = document.getElementById('sidebar-toggle');
const sidebar   = document.getElementById('sidebar');
const closeBtn  = document.getElementById('sidebar-close');
const zoomVal   = document.getElementById('sidebar-zoom-val');
const darkmode  = document.getElementById('darkmode-toggle');

function open() {
  state.sidebarOpen = true;
  document.body.classList.add('sidebar-open');
  sidebar.setAttribute('aria-hidden', 'false');
  toggle.setAttribute('aria-expanded', 'true');
  applyTransform();
}

function close() {
  state.sidebarOpen = false;
  document.body.classList.remove('sidebar-open');
  sidebar.setAttribute('aria-hidden', 'true');
  toggle.setAttribute('aria-expanded', 'false');
  applyTransform();
}

function updateZoomDisplay() {
  zoomVal.textContent = Math.round(state.scale * 100) + '%';
}

// ── Toggle / Close ──

toggle.addEventListener('click', () => state.sidebarOpen ? close() : open());
closeBtn.addEventListener('click', close);

// Cerrar al clicar fuera del sidebar
window.addEventListener('mousedown', e => {
  if (!state.sidebarOpen) return;
  if (sidebar.contains(e.target) || toggle.contains(e.target)) return;
  close();
});

// Escape cierra sidebar
window.addEventListener('keydown', e => {
  if (e.key === 'Escape' && state.sidebarOpen) close();
});

// ── Zoom buttons ──

sidebar.addEventListener('click', e => {
  const btn = e.target.closest('[data-zoom]');
  if (!btn) return;

  const action = btn.dataset.zoom;
  const cx = window.innerWidth / 2;
  const cy = window.innerHeight / 2;

  if (action === 'in')    zoom( 1, cx, cy);
  if (action === 'out')   zoom(-1, cx, cy);
  if (action === 'reset') centerView();

  updateZoomDisplay();
});

// ── Dark mode ──

if (localStorage.getItem('sf_darkmode') === 'true') {
  document.documentElement.classList.add('dark');
  darkmode.checked = true;
}

darkmode.addEventListener('change', () => {
  document.documentElement.classList.toggle('dark', darkmode.checked);
  localStorage.setItem('sf_darkmode', darkmode.checked);
});

// ── Guías ──

const guidesToggle = document.getElementById('guides-toggle');

if (localStorage.getItem('sf_guides') === 'false') {
  document.getElementById('guides')?.classList.add('guides--hidden');
  guidesToggle.checked = false;
}

guidesToggle.addEventListener('change', () => {
  document.getElementById('guides')?.classList.toggle('guides--hidden', !guidesToggle.checked);
  localStorage.setItem('sf_guides', guidesToggle.checked);
});

// ── Guardar posiciones ──

document.getElementById('save-btn').addEventListener('click', exportDataJS);

// ── Sync zoom display ──

export function syncZoomDisplay() { updateZoomDisplay(); }
updateZoomDisplay();
