/**
 * canvas.js — Punto de entrada (orquestador)
 *
 * Importa módulos, inicializa el canvas.
 * Toda la lógica vive en sus módulos respectivos.
 */

import { applyTransform, centerView } from './transform.js';
import { loadPositions } from './persist.js';
import { render } from './render.js';
import './events.js';
import './sidebar.js';

const hasView = loadPositions();
render();

// Guías de composición — dentro del canvas, se mueven con pan/zoom
const g = document.createElement('div');
g.id = 'guides';
g.setAttribute('aria-hidden', 'true');
// Trama áurea recursiva — φ = 0.618, subdivisiones hasta φ⁵
// Cada nivel divide el espacio anterior por φ
const lines = [
  // Márgenes exteriores
  ['guide guide--v', 'left:6%'],
  ['guide guide--v', 'right:6%'],
  ['guide guide--h', 'top:6%'],
  ['guide guide--h', 'bottom:6%'],
  // φ¹ — 38.2% / 61.8%
  ['guide guide--v guide--golden', 'left:38.2%'],
  ['guide guide--v guide--golden', 'left:61.8%'],
  ['guide guide--h guide--golden', 'top:38.2%'],
  ['guide guide--h guide--golden', 'top:61.8%'],
  // φ² — 23.6% / 76.4%
  ['guide guide--v guide--golden-sub', 'left:23.6%'],
  ['guide guide--v guide--golden-sub', 'left:76.4%'],
  ['guide guide--h guide--golden-sub', 'top:23.6%'],
  ['guide guide--h guide--golden-sub', 'top:76.4%'],
  // φ³ — 14.6% / 85.4%
  ['guide guide--v guide--golden-sub2', 'left:14.6%'],
  ['guide guide--v guide--golden-sub2', 'left:85.4%'],
  ['guide guide--h guide--golden-sub2', 'top:14.6%'],
  ['guide guide--h guide--golden-sub2', 'top:85.4%'],
  // φ⁴ — 9% / 91%
  ['guide guide--v guide--golden-sub3', 'left:9%'],
  ['guide guide--v guide--golden-sub3', 'left:91%'],
  ['guide guide--h guide--golden-sub3', 'top:9%'],
  ['guide guide--h guide--golden-sub3', 'top:91%'],
  // φ⁵ — 32.9% / 44.1% / 55.9% / 67.1% (subdivisiones interiores)
  ['guide guide--v guide--golden-sub3', 'left:32.9%'],
  ['guide guide--v guide--golden-sub3', 'left:67.1%'],
  ['guide guide--h guide--golden-sub3', 'top:32.9%'],
  ['guide guide--h guide--golden-sub3', 'top:67.1%'],
  ['guide guide--v guide--golden-sub2', 'left:44.1%'],
  ['guide guide--v guide--golden-sub2', 'left:55.9%'],
  ['guide guide--h guide--golden-sub2', 'top:44.1%'],
  ['guide guide--h guide--golden-sub2', 'top:55.9%'],
  // Centro
  ['guide guide--v guide--center', 'left:50%'],
  ['guide guide--h guide--center', 'top:50%'],
];
lines.forEach(([cls, style]) => {
  const d = document.createElement('div');
  d.className = cls;
  d.style.cssText = style;
  g.appendChild(d);
});
document.getElementById('universe').appendChild(g);

if (hasView) applyTransform();
else centerView();
