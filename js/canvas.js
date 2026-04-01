(function() {
  'use strict';

  const SOCIAL_ICONS = {
    instagram: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="5"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/></svg>',
    x: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>',
    youtube: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12z"/></svg>',
    github: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>'
  };

  // ── STATE ──
  const state = {
    scale: 1, x: 0, y: 0,
    minScale: 0.08, maxScale: 5,
    dragging: null, panning: false, hasMoved: false,
    panStart: { x: 0, y: 0 },
    stateStart: { x: 0, y: 0 },
    objStart: { x: 0, y: 0 },
    topZ: 100,
    pinchDist: 0, pinchScale: 1
  };

  const universe = document.getElementById('universe');
  const zoomEl = document.getElementById('zoom-level');
  const hint = document.getElementById('hint');
  const objects = window.__DATA__.objects;

  // ── RENDER ──
  function render() {
    const frag = document.createDocumentFragment();

    objects.forEach((obj, i) => {
      const el = document.createElement('div');
      el.className = 'obj';
      el.dataset.index = i;
      el.style.left = obj.x + 'px';
      el.style.top = obj.y + 'px';
      el.style.zIndex = 10 + i;

      switch (obj.type) {
        case 'avatar': {
          el.classList.add('obj--avatar');
          el.style.width = el.style.height = (obj.w || 100) + 'px';
          const img = document.createElement('img');
          img.src = obj.src;
          img.alt = 'Sergio Forés';
          img.draggable = false;
          img.width = obj.w || 100;
          img.height = obj.w || 100;
          el.appendChild(img);
          break;
        }

        case 'img': {
          el.classList.add('obj--img');
          el.style.width = (obj.w || 280) + 'px';
          const img = document.createElement('img');
          img.src = obj.src;
          img.alt = '';
          img.draggable = false;
          img.loading = 'lazy';
          img.decoding = 'async';
          img.onerror = function() { this.style.display = 'none'; };
          el.appendChild(img);
          break;
        }

        case 'video': {
          el.classList.add('obj--video');
          el.style.width = (obj.w || 300) + 'px';
          const vid = document.createElement('video');
          vid.src = obj.src;
          vid.muted = true;
          vid.loop = true;
          vid.playsInline = true;
          vid.preload = 'metadata';
          vid.style.width = '100%';
          el.addEventListener('mouseenter', () => vid.play().catch(() => {}));
          el.addEventListener('mouseleave', () => { vid.pause(); vid.currentTime = 0; });
          el.appendChild(vid);
          break;
        }

        case 'text': {
          el.classList.add('obj--text');
          if (obj.cls) obj.cls.split(' ').forEach(c => c && el.classList.add(c));
          el.textContent = obj.content;
          break;
        }

        case 'svg': {
          el.classList.add('obj--svg');
          el.innerHTML = obj.svg;
          break;
        }

        case 'social': {
          el.classList.add('obj--social');
          el.style.cursor = 'default';
          obj.links.forEach(link => {
            const a = document.createElement('a');
            a.href = link.url;
            a.target = '_blank';
            a.rel = 'noopener';
            a.title = link.platform;
            a.innerHTML = SOCIAL_ICONS[link.platform] || '';
            a.addEventListener('click', e => e.stopPropagation());
            a.addEventListener('dblclick', e => e.stopPropagation());
            el.appendChild(a);
          });
          break;
        }
      }

      if (obj.detail) {
        const detail = document.createElement('div');
        detail.className = 'obj__detail';
        detail.innerHTML = obj.detail;
        el.appendChild(detail);
      }

      frag.appendChild(el);
    });

    universe.innerHTML = '';
    universe.appendChild(frag);
  }

  // ── TRANSFORM ──
  function applyTransform() {
    universe.style.transform = `translate(${state.x}px,${state.y}px) scale(${state.scale})`;
  }

  function centerView() {
    state.x = window.innerWidth / 2;
    state.y = window.innerHeight / 2;
    state.scale = 0.75;
    applyTransform();
  }

  // ── ZOOM ──
  function zoom(delta, cx, cy) {
    const factor = delta > 0 ? 0.92 : 1.08;
    const newScale = Math.max(state.minScale, Math.min(state.maxScale, state.scale * factor));
    const ratio = newScale / state.scale;
    state.x = cx - (cx - state.x) * ratio;
    state.y = cy - (cy - state.y) * ratio;
    state.scale = newScale;
    applyTransform();
    showZoom();
  }

  let zoomTimeout;
  function showZoom() {
    zoomEl.textContent = Math.round(state.scale * 100) + '%';
    zoomEl.classList.add('visible');
    clearTimeout(zoomTimeout);
    zoomTimeout = setTimeout(() => zoomEl.classList.remove('visible'), 1200);
  }

  // ── MOUSE ──
  window.addEventListener('wheel', e => {
    e.preventDefault();
    hideHint();
    zoom(e.deltaY, e.clientX, e.clientY);
  }, { passive: false });

  window.addEventListener('mousedown', e => {
    hideHint();
    const obj = e.target.closest('.obj');
    state.hasMoved = false;

    if (obj && !e.target.closest('.obj__detail') && !e.target.closest('a')) {
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
    } else if (!e.target.closest('.obj__detail') && !e.target.closest('a')) {
      state.panning = true;
      state.panStart.x = e.clientX;
      state.panStart.y = e.clientY;
      state.stateStart.x = state.x;
      state.stateStart.y = state.y;
    }
  });

  window.addEventListener('mousemove', e => {
    if (state.dragging) {
      state.hasMoved = true;
      const dx = (e.clientX - state.panStart.x) / state.scale;
      const dy = (e.clientY - state.panStart.y) / state.scale;
      state.dragging.style.left = (state.objStart.x + dx) + 'px';
      state.dragging.style.top = (state.objStart.y + dy) + 'px';
    } else if (state.panning) {
      state.hasMoved = true;
      state.x = state.stateStart.x + (e.clientX - state.panStart.x);
      state.y = state.stateStart.y + (e.clientY - state.panStart.y);
      applyTransform();
    }
  });

  window.addEventListener('mouseup', () => {
    if (state.dragging) {
      const i = parseInt(state.dragging.dataset.index);
      objects[i].x = parseFloat(state.dragging.style.left);
      objects[i].y = parseFloat(state.dragging.style.top);
      state.dragging.classList.remove('obj--focused');
      state.dragging = null;
      document.body.style.cursor = '';
    }
    state.panning = false;
  });

  // ── DOUBLE CLICK ──
  window.addEventListener('dblclick', e => {
    if (state.hasMoved) return;
    const obj = e.target.closest('.obj');
    if (!obj) return;
    obj.classList.toggle('obj--expanded');
    if (obj.classList.contains('obj--expanded')) {
      state.topZ++;
      obj.style.zIndex = state.topZ;
    }
  });

  // ── TOUCH ──
  let lastTap = 0;
  const DRAG_THRESHOLD = 8;
  let touchStartPos = { x: 0, y: 0 };

  window.addEventListener('touchstart', e => {
    hideHint();
    state.hasMoved = false;
    if (e.touches.length === 1) {
      const t = e.touches[0];
      touchStartPos.x = t.clientX;
      touchStartPos.y = t.clientY;
      state.panning = true;
      state.panStart.x = t.clientX;
      state.panStart.y = t.clientY;
      state.stateStart.x = state.x;
      state.stateStart.y = state.y;
    }
    if (e.touches.length === 2) {
      state.panning = false;
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
      const newScale = Math.max(state.minScale, Math.min(state.maxScale, state.pinchScale * (dist / state.pinchDist)));
      const ratio = newScale / state.scale;
      state.x = cx - (cx - state.x) * ratio;
      state.y = cy - (cy - state.y) * ratio;
      state.scale = newScale;
      applyTransform();
      showZoom();
    } else if (e.touches.length === 1 && state.panning) {
      const t = e.touches[0];
      const dx = t.clientX - touchStartPos.x;
      const dy = t.clientY - touchStartPos.y;
      if (Math.abs(dx) > DRAG_THRESHOLD || Math.abs(dy) > DRAG_THRESHOLD) {
        state.hasMoved = true;
      }
      e.preventDefault();
      state.x = state.stateStart.x + (t.clientX - state.panStart.x);
      state.y = state.stateStart.y + (t.clientY - state.panStart.y);
      applyTransform();
    }
  }, { passive: false });

  window.addEventListener('touchend', e => {
    state.panning = false;
    if (!state.hasMoved && e.changedTouches.length === 1) {
      const now = Date.now();
      if (now - lastTap < 350) {
        const t = e.changedTouches[0];
        const el = document.elementFromPoint(t.clientX, t.clientY);
        const obj = el && el.closest('.obj');
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
    if (e.key === 'Escape') document.querySelectorAll('.obj--expanded').forEach(el => el.classList.remove('obj--expanded'));
    if (e.key === '0') centerView();
    const step = 80;
    if (e.key === 'ArrowUp') { state.y += step; applyTransform(); }
    if (e.key === 'ArrowDown') { state.y -= step; applyTransform(); }
    if (e.key === 'ArrowLeft') { state.x += step; applyTransform(); }
    if (e.key === 'ArrowRight') { state.x -= step; applyTransform(); }
    if (e.key === '+' || e.key === '=') zoom(-1, innerWidth / 2, innerHeight / 2);
    if (e.key === '-') zoom(1, innerWidth / 2, innerHeight / 2);
  });

  // ── HINT ──
  function hideHint() {
    if (!hint.classList.contains('gone')) {
      hint.classList.add('gone');
      setTimeout(() => hint.remove(), 1500);
    }
  }

  // ── INIT ──
  render();
  centerView();
})();
