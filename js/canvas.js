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

const hasView = loadPositions();
render();
if (hasView) applyTransform();
else centerView();
