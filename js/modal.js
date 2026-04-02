/**
 * modal.js — Sistema de modales minimalistas
 *
 * API:
 *   openModal({ title, body, actions })
 *   closeModal()
 *
 * actions: [{ label, href, download? }]
 *
 * Se cierra con: botón X, clic en backdrop, tecla Escape.
 * Reutilizable para cualquier CTA con propiedad "modal".
 */

let backdropEl = null;
let dialogEl = null;

export function openModal({ title, body, actions = [] }) {
  if (backdropEl) closeModal();

  // ── Backdrop ──
  backdropEl = document.createElement('div');
  backdropEl.className = 'modal-backdrop';
  backdropEl.addEventListener('click', e => {
    if (e.target === backdropEl) closeModal();
  });

  // ── Dialog ──
  dialogEl = document.createElement('div');
  dialogEl.className = 'modal';
  dialogEl.setAttribute('role', 'dialog');
  dialogEl.setAttribute('aria-modal', 'true');

  // Cerrar (X)
  const closeBtn = document.createElement('button');
  closeBtn.className = 'modal__close';
  closeBtn.setAttribute('aria-label', 'Cerrar');
  closeBtn.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>';
  closeBtn.addEventListener('click', closeModal);

  // Contenido
  const content = document.createElement('div');
  content.className = 'modal__content';

  if (title) {
    const h = document.createElement('p');
    h.className = 'modal__title';
    h.textContent = title;
    content.appendChild(h);
  }

  if (body) {
    const p = document.createElement('p');
    p.className = 'modal__body';
    p.textContent = body;
    content.appendChild(p);
  }

  if (actions.length) {
    const footer = document.createElement('div');
    footer.className = 'modal__footer';
    actions.forEach(action => {
      const a = document.createElement('a');
      a.className = 'modal__action';
      a.href = action.href;
      if (action.download) a.download = action.download;
      a.textContent = action.label;
      footer.appendChild(a);
    });
    content.appendChild(footer);
  }

  dialogEl.appendChild(closeBtn);
  dialogEl.appendChild(content);
  backdropEl.appendChild(dialogEl);
  document.body.appendChild(backdropEl);

  // Animar entrada
  requestAnimationFrame(() => backdropEl.classList.add('modal-backdrop--visible'));
}

export function closeModal() {
  if (!backdropEl) return;
  backdropEl.classList.remove('modal-backdrop--visible');
  backdropEl.addEventListener('transitionend', () => {
    backdropEl?.remove();
    backdropEl = null;
    dialogEl = null;
  }, { once: true });
}

// Escape global
window.addEventListener('keydown', e => {
  if (e.key === 'Escape' && backdropEl) closeModal();
});
