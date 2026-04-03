/**
 * render.js — Creación de DOM por tipo de objeto
 */

import { state, objects, dom, isTouch } from './state.js';
import { openModal } from './modal.js';

const SOCIAL_ICONS = {
  instagram: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="5"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/></svg>',
  x:         '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>',
  youtube:   '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12z"/></svg>',
  github:    '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>'
};

const builders = {

  avatar(el, obj) {
    el.classList.add('obj--avatar');
    el.style.width = el.style.height = (obj.w || 100) + 'px';
    const img = document.createElement('img');
    img.src    = obj.src;
    img.alt    = 'Sergio Forés';
    img.width  = obj.w || 100;
    img.height = obj.w || 100;
    img.draggable = false;
    el.appendChild(img);
  },

  img(el, obj) {
    el.classList.add('obj--img');
    el.style.width = (obj.w || 280) + 'px';

    if (obj.src.endsWith('.svg')) {
      // SVG inlineado → vector nítido a cualquier zoom (no se rasteriza)
      fetch(obj.src)
        .then(r => r.text())
        .then(markup => {
          el.innerHTML = markup;
          const s = el.querySelector('svg');
          if (s) {
            s.removeAttribute('width');
            s.removeAttribute('height');
            s.style.cssText = 'width:100%;height:auto;display:block;pointer-events:none;';
          }
        })
        .catch(() => {});
      return;
    }

    const img = document.createElement('img');
    img.src       = obj.src;
    img.alt       = '';
    img.draggable = false;
    img.loading   = 'lazy';
    img.decoding  = 'async';
    img.addEventListener('load',  () => img.classList.add('loaded'), { once: true });
    img.addEventListener('error', () => img.style.display = 'none',  { once: true });
    el.appendChild(img);
  },

  video(el, obj) {
    el.classList.add('obj--video');
    el.style.width = (obj.w || 300) + 'px';

    const posterSrc = obj.poster ?? obj.src.replace(/\.\w+$/, '-poster.webp');

    const poster = document.createElement('img');
    poster.src       = posterSrc;
    poster.alt       = '';
    poster.draggable = false;
    poster.loading   = 'lazy';
    poster.decoding  = 'async';
    poster.addEventListener('load', () => poster.classList.add('loaded'), { once: true });
    el.appendChild(poster);

    const vid = document.createElement('video');
    vid.muted      = obj.audio !== true;
    vid.loop       = true;
    vid.controls   = obj.controls === true;
    if (obj.controls) {
      vid.poster = posterSrc;
      vid.style.pointerEvents = 'auto';
      // Overlay transparente que absorbe clics en el área de vídeo,
      // dejando libre la barra de controles nativa (≈40px en la base)
      const clickGuard = document.createElement('div');
      clickGuard.style.cssText = 'position:absolute;inset:0;bottom:40px;z-index:1;cursor:default;';
      clickGuard.addEventListener('click', e => e.stopPropagation());
      el.style.position = 'relative';
      el.appendChild(clickGuard);
    }
    vid.playsInline = true;
    vid.preload    = 'metadata';
    vid.classList.add('loaded');

    let swapped = false;
    const swapAndPlay = () => {
      if (!swapped && vid.readyState >= 2) {
        el.replaceChild(vid, poster);
        swapped = true;
      }
      if (swapped) vid.play().catch(() => {});
    };

    const idleCb = window.requestIdleCallback || (fn => setTimeout(fn, 2000));
    idleCb(() => {
      vid.src = obj.src;
      if (obj.controls) {
        // Swap inmediato al cargar — el usuario controla la reproducción
        vid.addEventListener('canplay', () => {
          if (!swapped) { el.replaceChild(vid, poster); swapped = true; }
        }, { once: true });
      } else if (obj.autoplay || isTouch) {
        vid.addEventListener('canplay', swapAndPlay, { once: true });
      }
    });

    if (!obj.autoplay && !obj.controls && !isTouch) {
      el.addEventListener('mouseenter', swapAndPlay);
      el.addEventListener('mouseleave', () => {
        if (swapped) { vid.pause(); vid.currentTime = 0; }
      });
    }
  },

  text(el, obj) {
    el.classList.add('obj--text');
    if (obj.cls) obj.cls.split(' ').forEach(c => c && el.classList.add(c));
    el.textContent = obj.content;
  },

  svg(el, obj) {
    el.classList.add('obj--svg');
    el.innerHTML = obj.svg;
  },

  social(el, obj) {
    el.classList.add('obj--social');
    el.style.cursor = 'default';
    obj.links.forEach(link => {
      const a = document.createElement('a');
      a.href      = link.url;
      a.target    = '_blank';
      a.rel       = 'noopener';
      a.title     = link.platform;
      a.innerHTML = SOCIAL_ICONS[link.platform] || '';
      el.appendChild(a);
    });
  },

  cta(el, obj) {
    el.classList.add('obj--cta');

    // Modal → <button>  |  Descarga/enlace → <a>
    const trigger = obj.modal
      ? document.createElement('button')
      : document.createElement('a');

    trigger.className = 'obj--cta__trigger';
    trigger.draggable = false;

    if (obj.modal) {
      trigger.type = 'button';
      trigger.addEventListener('click', () => {
        // Ignorar si el usuario estaba arrastrando
        if (state.hasMoved) return;
        openModal(obj.modal);
      });
    } else {
      trigger.href     = obj.href || '#';
      trigger.download = obj.download || '';
    }

    if (obj.icon) {
      const wrap = document.createElement('span');
      wrap.className = 'obj--cta__icon-wrap';

      const icon = document.createElement('span');
      icon.className = 'obj--cta__icon';
      icon.innerHTML = obj.icon;
      wrap.appendChild(icon);

      // Badge *.ext — extrae del action modal o del href/download directo
      const extSrc = obj.modal?.actions?.[0]?.href || obj.download || obj.href || '';
      const ext    = extSrc.split('.').pop();
      if (ext && ext !== extSrc) {
        const badge = document.createElement('span');
        badge.className   = 'obj--cta__badge';
        badge.textContent = `*.${ext}`;
        wrap.appendChild(badge);
      }

      trigger.appendChild(wrap);
    }

    const text = document.createElement('span');
    text.className = 'obj--cta__text';

    const title = document.createElement('span');
    title.className   = 'obj--cta__title';
    title.textContent = obj.title;
    text.appendChild(title);

    if (obj.subtitle) {
      const sub = document.createElement('span');
      sub.className   = 'obj--cta__subtitle';
      sub.textContent = obj.subtitle;
      text.appendChild(sub);
    }

    trigger.appendChild(text);
    el.appendChild(trigger);
  }
};

export function render() {
  const frag = document.createDocumentFragment();

  objects.forEach((obj, i) => {
    const el = document.createElement('div');
    el.className    = 'obj';
    el.dataset.index = i;
    if (obj.id) el.dataset.id = obj.id;
    el.style.left   = obj.x + 'px';
    el.style.top    = obj.y + 'px';
    // zIndex explícito en data.js tiene prioridad sobre el orden natural
    el.style.zIndex = obj.zIndex ?? (10 + i);

    const build = builders[obj.type];
    if (build) build(el, obj);

    if (obj.detail) {
      const detail = document.createElement('div');
      detail.className = 'obj__detail';
      detail.innerHTML = obj.detail;
      el.appendChild(detail);
    }

    frag.appendChild(el);
  });

  dom.universe.innerHTML = '';
  dom.universe.appendChild(frag);
}
