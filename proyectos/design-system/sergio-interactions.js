/**
 * SERGIO FORÉS - INTERACTIVE COMPONENTS
 * JavaScript para componentes avanzados del design system
 * Funcionalidades: Carousel, Slideshow, Sliders, Galleries
 */

/* ==========================================================================
   CAROUSEL - Navegación manual y automática
   ========================================================================== */

class Carousel {
  constructor(element, options = {}) {
    this.carousel = element;
    this.container = element.querySelector('.carousel__container');
    this.slides = element.querySelectorAll('.carousel__slide');
    this.prevBtn = element.querySelector('.carousel__prev');
    this.nextBtn = element.querySelector('.carousel__next');
    this.indicators = element.querySelectorAll('.carousel__indicator');
    
    this.currentIndex = 0;
    this.slideCount = this.slides.length;
    this.autoPlay = options.autoPlay || false;
    this.interval = options.interval || 5000;
    this.autoPlayTimer = null;
    
    this.init();
  }
  
  init() {
    this.updateSlide();
    this.bindEvents();
    
    if (this.autoPlay) {
      this.startAutoPlay();
    }
  }
  
  bindEvents() {
    if (this.prevBtn) {
      this.prevBtn.addEventListener('click', () => this.prevSlide());
    }
    
    if (this.nextBtn) {
      this.nextBtn.addEventListener('click', () => this.nextSlide());
    }
    
    this.indicators.forEach((indicator, index) => {
      indicator.addEventListener('click', () => this.goToSlide(index));
    });
    
    // Pausar autoplay en hover
    if (this.autoPlay) {
      this.carousel.addEventListener('mouseenter', () => this.stopAutoPlay());
      this.carousel.addEventListener('mouseleave', () => this.startAutoPlay());
    }
    
    // Soporte para touch/swipe
    this.addSwipeSupport();
  }
  
  updateSlide() {
    const translateX = -this.currentIndex * 100;
    this.container.style.transform = `translateX(${translateX}%)`;
    
    // Actualizar indicadores
    this.indicators.forEach((indicator, index) => {
      indicator.classList.toggle('is-active', index === this.currentIndex);
    });
    
    // Actualizar botones
    if (this.prevBtn) {
      this.prevBtn.disabled = this.currentIndex === 0;
    }
    if (this.nextBtn) {
      this.nextBtn.disabled = this.currentIndex === this.slideCount - 1;
    }
  }
  
  nextSlide() {
    if (this.currentIndex < this.slideCount - 1) {
      this.currentIndex++;
      this.updateSlide();
    }
  }
  
  prevSlide() {
    if (this.currentIndex > 0) {
      this.currentIndex--;
      this.updateSlide();
    }
  }
  
  goToSlide(index) {
    this.currentIndex = index;
    this.updateSlide();
  }
  
  startAutoPlay() {
    this.stopAutoPlay();
    this.autoPlayTimer = setInterval(() => {
      if (this.currentIndex < this.slideCount - 1) {
        this.nextSlide();
      } else {
        this.currentIndex = 0;
        this.updateSlide();
      }
    }, this.interval);
  }
  
  stopAutoPlay() {
    if (this.autoPlayTimer) {
      clearInterval(this.autoPlayTimer);
      this.autoPlayTimer = null;
    }
  }
  
  addSwipeSupport() {
    let startX = 0;
    let moveX = 0;
    
    this.carousel.addEventListener('touchstart', (e) => {
      startX = e.touches[0].clientX;
    });
    
    this.carousel.addEventListener('touchmove', (e) => {
      e.preventDefault();
      moveX = e.touches[0].clientX;
    });
    
    this.carousel.addEventListener('touchend', () => {
      const deltaX = startX - moveX;
      const threshold = 50;
      
      if (deltaX > threshold) {
        this.nextSlide();
      } else if (deltaX < -threshold) {
        this.prevSlide();
      }
    });
  }
}

/* ==========================================================================
   SLIDESHOW - Presentación automática con controles
   ========================================================================== */

class Slideshow {
  constructor(element, options = {}) {
    this.slideshow = element;
    this.slides = element.querySelectorAll('.slideshow__slide');
    this.playBtn = element.querySelector('.slideshow__play');
    this.pauseBtn = element.querySelector('.slideshow__pause');
    this.progressBar = element.querySelector('.slideshow__progress-bar');
    
    this.currentIndex = 0;
    this.slideCount = this.slides.length;
    this.interval = options.interval || 4000;
    this.isPlaying = options.autoPlay !== false;
    this.timer = null;
    this.progressTimer = null;
    this.wasPlayingBeforeHover = false;
    
    this.init();
  }
  
  init() {
    this.updateSlide();
    this.bindEvents();
    
    if (this.isPlaying) {
      this.play();
    }
  }
  
  bindEvents() {
    if (this.playBtn) {
      this.playBtn.addEventListener('click', () => {
        if (this.isPlaying) {
          this.pause();
        } else {
          this.play();
        }
      });
    }
    
    if (this.pauseBtn) {
      this.pauseBtn.addEventListener('click', () => {
        if (this.isPlaying) {
          this.pause();
        } else {
          this.play();
        }
      });
    }
    
    // Pausar en hover (pero mantener estado)
    this.slideshow.addEventListener('mouseenter', () => {
      if (this.isPlaying) {
        this.pauseForHover();
      }
    });
    this.slideshow.addEventListener('mouseleave', () => {
      if (this.isPlaying && this.wasPlayingBeforeHover) {
        this.resumeFromHover();
      }
    });
  }
  
  updateSlide() {
    this.slides.forEach((slide, index) => {
      slide.classList.toggle('is-active', index === this.currentIndex);
    });
  }
  
  nextSlide() {
    this.currentIndex = (this.currentIndex + 1) % this.slideCount;
    this.updateSlide();
  }
  
  play() {
    this.isPlaying = true;
    this.updateControls();
    
    this.timer = setInterval(() => {
      this.nextSlide();
    }, this.interval);
    
    this.startProgress();
  }
  
  pause() {
    this.isPlaying = false;
    this.updateControls();
    
    if (this.timer) {
      clearInterval(this.timer);
      this.timer = null;
    }
    
    this.stopProgress();
  }
  
  updateControls() {
    if (this.playBtn) {
      this.playBtn.style.display = this.isPlaying ? 'none' : 'block';
    }
    if (this.pauseBtn) {
      this.pauseBtn.style.display = this.isPlaying ? 'block' : 'none';
    }
  }
  
  pauseForHover() {
    this.wasPlayingBeforeHover = true;
    if (this.timer) {
      clearInterval(this.timer);
      this.timer = null;
    }
    this.stopProgress();
  }
  
  resumeFromHover() {
    if (this.wasPlayingBeforeHover) {
      this.timer = setInterval(() => {
        this.nextSlide();
      }, this.interval);
      this.startProgress();
      this.wasPlayingBeforeHover = false;
    }
  }
  
  startProgress() {
    if (!this.progressBar) return;
    
    this.progressBar.style.width = '0%';
    this.progressBar.style.transition = `width ${this.interval}ms linear`;
    
    requestAnimationFrame(() => {
      this.progressBar.style.width = '100%';
    });
  }
  
  stopProgress() {
    if (!this.progressBar) return;
    
    const currentWidth = this.progressBar.offsetWidth;
    const parentWidth = this.progressBar.parentElement.offsetWidth;
    const percentage = (currentWidth / parentWidth) * 100;
    
    this.progressBar.style.transition = 'none';
    this.progressBar.style.width = `${percentage}%`;
  }
}

/* ==========================================================================
   RANGE SLIDER - Control deslizante de valores
   ========================================================================== */

class RangeSlider {
  constructor(element, options = {}) {
    this.slider = element;
    this.track = element.querySelector('.slider-range__track');
    this.fill = element.querySelector('.slider-range__fill');
    this.thumb = element.querySelector('.slider-range__thumb');
    this.input = element.querySelector('.slider-range__input');
    this.valueDisplay = element.querySelector('.slider-range__value');
    
    this.min = options.min || parseInt(this.input.min) || 0;
    this.max = options.max || parseInt(this.input.max) || 100;
    this.step = options.step || parseInt(this.input.step) || 1;
    this.value = options.value || parseInt(this.input.value) || this.min;
    this.suffix = options.suffix || '';
    
    this.isDragging = false;
    
    this.init();
  }
  
  init() {
    this.updateSlider();
    this.bindEvents();
  }
  
  bindEvents() {
    // Input nativo
    this.input.addEventListener('input', (e) => {
      this.value = parseInt(e.target.value);
      this.updateSlider();
    });
    
    // Click en track
    this.track.addEventListener('click', (e) => this.handleTrackClick(e));
    
    // Drag del thumb
    this.thumb.addEventListener('mousedown', (e) => this.startDrag(e));
    document.addEventListener('mousemove', (e) => this.handleDrag(e));
    document.addEventListener('mouseup', () => this.endDrag());
    
    // Touch support
    this.thumb.addEventListener('touchstart', (e) => this.startDrag(e.touches[0]));
    document.addEventListener('touchmove', (e) => this.handleDrag(e.touches[0]));
    document.addEventListener('touchend', () => this.endDrag());
  }
  
  handleTrackClick(e) {
    if (e.target === this.thumb) return;
    
    const rect = this.track.getBoundingClientRect();
    const percentage = (e.clientX - rect.left) / rect.width;
    const newValue = this.min + (percentage * (this.max - this.min));
    
    this.setValue(Math.round(newValue / this.step) * this.step);
  }
  
  startDrag(e) {
    this.isDragging = true;
    this.thumb.classList.add('is-dragging');
    e.preventDefault();
  }
  
  handleDrag(e) {
    if (!this.isDragging) return;
    
    const rect = this.track.getBoundingClientRect();
    const percentage = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    const newValue = this.min + (percentage * (this.max - this.min));
    
    this.setValue(Math.round(newValue / this.step) * this.step);
  }
  
  endDrag() {
    this.isDragging = false;
    this.thumb.classList.remove('is-dragging');
  }
  
  setValue(value) {
    this.value = Math.max(this.min, Math.min(this.max, value));
    this.input.value = this.value;
    this.updateSlider();
    
    // Dispatch change event
    this.input.dispatchEvent(new Event('change', { bubbles: true }));
  }
  
  updateSlider() {
    const percentage = ((this.value - this.min) / (this.max - this.min)) * 100;
    
    this.fill.style.width = `${percentage}%`;
    this.thumb.style.left = `${percentage}%`;
    
    if (this.valueDisplay) {
      this.valueDisplay.textContent = this.value + this.suffix;
    }
  }
}

/* ==========================================================================
   COMPARISON SLIDER - Comparador de imágenes
   ========================================================================== */

class ComparisonSlider {
  constructor(element, options = {}) {
    this.slider = element;
    this.container = element.querySelector('.comparison-slider__container');
    this.afterImage = element.querySelector('.comparison-slider__after');
    this.divider = element.querySelector('.comparison-slider__divider');
    this.handle = element.querySelector('.comparison-slider__handle');
    
    this.position = options.position || 50; // Posición inicial en %
    this.isDragging = false;
    
    this.init();
  }
  
  init() {
    this.updatePosition();
    this.bindEvents();
  }
  
  bindEvents() {
    // Mouse events
    this.handle.addEventListener('mousedown', (e) => this.startDrag(e));
    this.container.addEventListener('click', (e) => this.handleClick(e));
    document.addEventListener('mousemove', (e) => this.handleDrag(e));
    document.addEventListener('mouseup', () => this.endDrag());
    
    // Touch events
    this.handle.addEventListener('touchstart', (e) => this.startDrag(e.touches[0]));
    document.addEventListener('touchmove', (e) => this.handleDrag(e.touches[0]));
    document.addEventListener('touchend', () => this.endDrag());
    
    // Prevent drag on images
    this.slider.querySelectorAll('img').forEach(img => {
      img.addEventListener('dragstart', (e) => e.preventDefault());
    });
  }
  
  startDrag(e) {
    this.isDragging = true;
    e.preventDefault();
  }
  
  handleDrag(e) {
    if (!this.isDragging) return;
    
    const rect = this.container.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    
    this.setPosition(percentage);
  }
  
  handleClick(e) {
    if (e.target === this.handle) return;
    
    const rect = this.container.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percentage = (x / rect.width) * 100;
    
    this.setPosition(percentage);
  }
  
  endDrag() {
    this.isDragging = false;
  }
  
  setPosition(percentage) {
    this.position = Math.max(0, Math.min(100, percentage));
    this.updatePosition();
  }
  
  updatePosition() {
    this.afterImage.style.clipPath = `inset(0 ${100 - this.position}% 0 0)`;
    this.divider.style.left = `${this.position}%`;
    this.handle.style.left = `${this.position}%`;
  }
}

/* ==========================================================================
   IMAGE GALLERY - Galería con lightbox
   ========================================================================== */

class ImageGallery {
  constructor(element, options = {}) {
    this.gallery = element;
    this.items = element.querySelectorAll('.image-gallery__item');
    this.lightbox = null;
    this.currentIndex = 0;
    
    this.init();
  }
  
  init() {
    this.createLightbox();
    this.bindEvents();
  }
  
  bindEvents() {
    this.items.forEach((item, index) => {
      item.addEventListener('click', () => this.openLightbox(index));
    });
  }
  
  createLightbox() {
    this.lightbox = document.createElement('div');
    this.lightbox.className = 'lightbox';
    this.lightbox.innerHTML = `
      <div class="lightbox__content">
        <img class="lightbox__image" src="" alt="">
        <button class="lightbox__close" aria-label="Cerrar">&times;</button>
      </div>
    `;
    
    document.body.appendChild(this.lightbox);
    
    // Bind lightbox events
    this.lightbox.querySelector('.lightbox__close').addEventListener('click', () => this.closeLightbox());
    this.lightbox.addEventListener('click', (e) => {
      if (e.target === this.lightbox) this.closeLightbox();
    });
    
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
      if (!this.lightbox.classList.contains('is-open')) return;
      
      switch (e.key) {
        case 'Escape':
          this.closeLightbox();
          break;
        case 'ArrowLeft':
          this.prevImage();
          break;
        case 'ArrowRight':
          this.nextImage();
          break;
      }
    });
  }
  
  openLightbox(index) {
    this.currentIndex = index;
    const img = this.items[index].querySelector('.image-gallery__image');
    const lightboxImg = this.lightbox.querySelector('.lightbox__image');
    
    lightboxImg.src = img.src;
    lightboxImg.alt = img.alt;
    
    this.lightbox.classList.add('is-open');
    document.body.style.overflow = 'hidden';
  }
  
  closeLightbox() {
    this.lightbox.classList.remove('is-open');
    document.body.style.overflow = '';
  }
  
  nextImage() {
    this.currentIndex = (this.currentIndex + 1) % this.items.length;
    this.updateLightboxImage();
  }
  
  prevImage() {
    this.currentIndex = this.currentIndex === 0 ? this.items.length - 1 : this.currentIndex - 1;
    this.updateLightboxImage();
  }
  
  updateLightboxImage() {
    const img = this.items[this.currentIndex].querySelector('.image-gallery__image');
    const lightboxImg = this.lightbox.querySelector('.lightbox__image');
    
    lightboxImg.src = img.src;
    lightboxImg.alt = img.alt;
  }
}

/* ==========================================================================
   ANIMATED COUNTER - Contador con animación
   ========================================================================== */

class AnimatedCounter {
  constructor(element, options = {}) {
    this.counter = element;
    this.target = options.target || parseInt(element.dataset.target) || 100;
    this.duration = options.duration || 2000;
    this.suffix = options.suffix || element.dataset.suffix || '';
    this.prefix = options.prefix || element.dataset.prefix || '';
    
    this.current = 0;
    this.increment = this.target / (this.duration / 16); // ~60fps
    this.isVisible = false;
    
    this.init();
  }
  
  init() {
    this.setupIntersectionObserver();
  }
  
  setupIntersectionObserver() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !this.isVisible) {
          this.isVisible = true;
          this.animate();
        }
      });
    }, { threshold: 0.5 });
    
    observer.observe(this.counter);
  }
  
  animate() {
    const timer = setInterval(() => {
      this.current += this.increment;
      
      if (this.current >= this.target) {
        this.current = this.target;
        clearInterval(timer);
      }
      
      this.counter.textContent = this.prefix + Math.floor(this.current) + this.suffix;
    }, 16);
  }
}

/* ==========================================================================
   SIDEBAR NAVIGATION - Navegación lateral inteligente
   ========================================================================== */

class SidebarNavigation {
  constructor(element, options = {}) {
    this.sidebar = element;
    this.toggle = document.querySelector(options.toggle || '.sidebar__toggle');
    this.overlay = document.querySelector('.sidebar__overlay');
    this.closeBtn = this.sidebar.querySelector('.sidebar__close');
    this.links = this.sidebar.querySelectorAll('.sidebar__link');
    this.collapsibleGroups = this.sidebar.querySelectorAll('.sidebar__collapsible .sidebar__group');
    
    this.isOpen = false;
    this.activeLink = null;
    this.smoothScroll = options.smoothScroll !== false;
    this.autoClose = options.autoClose !== false;
    
    this.init();
  }
  
  init() {
    this.bindEvents();
    this.setActiveFromUrl();
    this.setupIntersectionObserver();
  }
  
  bindEvents() {
    // Mobile toggle
    if (this.toggle) {
      this.toggle.addEventListener('click', () => this.toggleSidebar());
    }
    
    // Close button
    if (this.closeBtn) {
      this.closeBtn.addEventListener('click', () => this.closeSidebar());
    }
    
    // Overlay click
    if (this.overlay) {
      this.overlay.addEventListener('click', () => this.closeSidebar());
    }
    
    // Navigation links
    this.links.forEach(link => {
      link.addEventListener('click', (e) => this.handleLinkClick(e, link));
    });
    
    // Collapsible groups
    this.collapsibleGroups.forEach(group => {
      const title = group.querySelector('.sidebar__group-title');
      if (title) {
        title.addEventListener('click', () => this.toggleGroup(group));
      }
    });
    
    // Keyboard navigation
    document.addEventListener('keydown', (e) => this.handleKeydown(e));
    
    // Responsive behavior
    window.addEventListener('resize', () => this.handleResize());
  }
  
  handleLinkClick(e, link) {
    const href = link.getAttribute('href');
    
    // Handle anchor links
    if (href && href.startsWith('#')) {
      e.preventDefault();
      const target = document.querySelector(href);
      
      if (target) {
        this.setActiveLink(link);
        this.scrollToSection(target);
        
        // Auto-close on mobile
        if (this.autoClose && window.innerWidth <= 768) {
          this.closeSidebar();
        }
      }
    }
  }
  
  scrollToSection(target) {
    if (!this.smoothScroll) {
      target.scrollIntoView();
      return;
    }
    
    const headerHeight = 80; // Adjust based on your header
    const targetPosition = target.offsetTop - headerHeight;
    
    window.scrollTo({
      top: targetPosition,
      behavior: 'smooth'
    });
  }
  
  setActiveLink(link) {
    // Remove active from all links
    this.links.forEach(l => l.classList.remove('is-active'));
    
    // Add active to current link
    link.classList.add('is-active');
    this.activeLink = link;
    
    // Update URL without triggering scroll
    const href = link.getAttribute('href');
    if (href && href.startsWith('#')) {
      history.replaceState(null, null, href);
    }
  }
  
  setActiveFromUrl() {
    const hash = window.location.hash;
    if (hash) {
      const link = this.sidebar.querySelector(`[href="${hash}"]`);
      if (link) {
        this.setActiveLink(link);
      }
    }
  }
  
  setupIntersectionObserver() {
    const sections = Array.from(this.links)
      .map(link => {
        const href = link.getAttribute('href');
        return href && href.startsWith('#') ? document.querySelector(href) : null;
      })
      .filter(section => section !== null);
    
    if (sections.length === 0) return;
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          const link = this.sidebar.querySelector(`[href="#${id}"]`);
          if (link) {
            this.setActiveLink(link);
          }
        }
      });
    }, {
      threshold: 0.3,
      rootMargin: '-80px 0px -60% 0px'
    });
    
    sections.forEach(section => observer.observe(section));
  }
  
  toggleSidebar() {
    if (this.isOpen) {
      this.closeSidebar();
    } else {
      this.openSidebar();
    }
  }
  
  openSidebar() {
    this.isOpen = true;
    this.sidebar.classList.add('is-open');
    if (this.overlay) {
      this.overlay.classList.add('is-open');
    }
    document.body.style.overflow = 'hidden';
  }
  
  closeSidebar() {
    this.isOpen = false;
    this.sidebar.classList.remove('is-open');
    if (this.overlay) {
      this.overlay.classList.remove('is-open');
    }
    document.body.style.overflow = '';
  }
  
  toggleGroup(group) {
    group.classList.toggle('is-collapsed');
  }
  
  handleKeydown(e) {
    if (!this.isOpen) return;
    
    switch (e.key) {
      case 'Escape':
        this.closeSidebar();
        break;
      case 'ArrowUp':
        e.preventDefault();
        this.navigateLinks(-1);
        break;
      case 'ArrowDown':
        e.preventDefault();
        this.navigateLinks(1);
        break;
      case 'Enter':
        if (document.activeElement && document.activeElement.classList.contains('sidebar__link')) {
          document.activeElement.click();
        }
        break;
    }
  }
  
  navigateLinks(direction) {
    const visibleLinks = Array.from(this.links).filter(link => {
      return link.offsetParent !== null; // Only visible links
    });
    
    const currentIndex = visibleLinks.indexOf(document.activeElement);
    let nextIndex = currentIndex + direction;
    
    if (nextIndex < 0) nextIndex = visibleLinks.length - 1;
    if (nextIndex >= visibleLinks.length) nextIndex = 0;
    
    visibleLinks[nextIndex].focus();
  }
  
  handleResize() {
    // Auto-close sidebar on desktop
    if (window.innerWidth > 768 && this.isOpen) {
      this.closeSidebar();
    }
  }
  
  // Public API
  goToSection(sectionId) {
    const link = this.sidebar.querySelector(`[href="#${sectionId}"]`);
    if (link) {
      link.click();
    }
  }
  
  highlightSection(sectionId) {
    const link = this.sidebar.querySelector(`[href="#${sectionId}"]`);
    if (link) {
      this.setActiveLink(link);
    }
  }
}

/* ==========================================================================
   NUEVOS COMPONENTES - Funcionalidades para expansión del sistema
   ========================================================================== */

/* ICON SYSTEM - Gestión dinámica de iconos SVG */
class IconSystem {
  constructor() {
    this.iconsLoaded = false;
    this.iconSprite = 'sergio-icons.svg';
    this.fallbackIcon = 'icon-info';
    
    this.init();
  }
  
  init() {
    this.preloadIcons();
    this.setupFallbacks();
  }
  
  preloadIcons() {
    // Precargar el sprite de iconos para mejor performance
    fetch(this.iconSprite)
      .then(response => response.text())
      .then(svgContent => {
        // Insertar iconos en el DOM si no están ya
        if (!document.querySelector('#sergio-icons-sprite')) {
          const div = document.createElement('div');
          div.id = 'sergio-icons-sprite';
          div.style.display = 'none';
          div.innerHTML = svgContent;
          document.body.insertBefore(div, document.body.firstChild);
        }
        this.iconsLoaded = true;
      })
      .catch(err => {
        console.warn('Error loading icon sprite:', err);
      });
  }
  
  setupFallbacks() {
    // Configurar fallbacks para iconos no encontrados
    document.querySelectorAll('.icon use').forEach(use => {
      use.addEventListener('error', () => {
        use.setAttribute('href', `${this.iconSprite}#${this.fallbackIcon}`);
      });
    });
  }
  
  // API pública para crear iconos dinámicamente
  createIcon(iconName, className = 'icon icon--base') {
    const svg = document.createElement('svg');
    svg.className = className;
    svg.innerHTML = `<use href="${this.iconSprite}#${iconName}"></use>`;
    return svg;
  }
  
  // Cambiar icono existente
  changeIcon(element, newIconName) {
    const use = element.querySelector('use');
    if (use) {
      use.setAttribute('href', `${this.iconSprite}#${newIconName}`);
    }
  }
}

/* FOOTER SOCIAL LINKS - Efectos de hover mejorados */
class FooterSocialLinks {
  constructor(footerElement) {
    this.footer = footerElement;
    this.socialLinks = footerElement.querySelectorAll('.footer__social-link');
    
    this.init();
  }
  
  init() {
    this.addHoverEffects();
    this.addRippleEffect();
  }
  
  addHoverEffects() {
    this.socialLinks.forEach(link => {
      link.addEventListener('mouseenter', () => {
        // Añadir clase para animación especial
        link.classList.add('is-hovered');
      });
      
      link.addEventListener('mouseleave', () => {
        link.classList.remove('is-hovered');
      });
    });
  }
  
  addRippleEffect() {
    this.socialLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        // Crear efecto ripple en click
        const ripple = document.createElement('span');
        ripple.className = 'ripple-effect';
        
        const rect = link.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        
        link.appendChild(ripple);
        
        setTimeout(() => {
          ripple.remove();
        }, 600);
      });
    });
  }
}

/* FEATURES ANIMATION - Animaciones de entrada para features */
class FeaturesAnimation {
  constructor() {
    this.features = document.querySelectorAll('.feature-item, .feature-card, .feature-secondary');
    this.observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };
    
    this.init();
  }
  
  init() {
    this.setupIntersectionObserver();
    this.addStaggeredAnimation();
  }
  
  setupIntersectionObserver() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          // Añadir delay escalonado
          setTimeout(() => {
            entry.target.classList.add('is-animated');
          }, index * 100);
          
          observer.unobserve(entry.target);
        }
      });
    }, this.observerOptions);
    
    this.features.forEach(feature => {
      // Añadir clase inicial
      feature.classList.add('animate-on-scroll');
      observer.observe(feature);
    });
  }
  
  addStaggeredAnimation() {
    // Agregar CSS para animaciones si no existe
    if (!document.querySelector('#features-animations')) {
      const style = document.createElement('style');
      style.id = 'features-animations';
      style.textContent = `
        .animate-on-scroll {
          opacity: 0;
          transform: translateY(20px);
          transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .animate-on-scroll.is-animated {
          opacity: 1;
          transform: translateY(0);
        }
        .ripple-effect {
          position: absolute;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.3);
          animation: ripple 0.6s linear;
        }
        @keyframes ripple {
          to {
            transform: scale(2);
            opacity: 0;
          }
        }
      `;
      document.head.appendChild(style);
    }
  }
}

/* COPY TO CLIPBOARD - Para ejemplos de código */
class CopyToClipboard {
  constructor() {
    this.codeBlocks = document.querySelectorAll('pre code');
    this.init();
  }
  
  init() {
    this.addCopyButtons();
  }
  
  addCopyButtons() {
    this.codeBlocks.forEach(codeBlock => {
      const pre = codeBlock.parentElement;
      if (pre.tagName === 'PRE') {
        const copyBtn = document.createElement('button');
        copyBtn.className = 'copy-code-btn';
        copyBtn.innerHTML = `
          <svg class="icon icon--sm"><use href="sergio-icons.svg#icon-copy"></use></svg>
          Copiar
        `;
        
        copyBtn.addEventListener('click', () => {
          this.copyCode(codeBlock, copyBtn);
        });
        
        pre.style.position = 'relative';
        pre.appendChild(copyBtn);
      }
    });
    
    // Agregar estilos para el botón de copiar
    if (!document.querySelector('#copy-button-styles')) {
      const style = document.createElement('style');
      style.id = 'copy-button-styles';
      style.textContent = `
        .copy-code-btn {
          position: absolute;
          top: var(--space-2);
          right: var(--space-2);
          background: var(--color-surface-primary);
          border: 1px solid var(--color-gray-300);
          border-radius: var(--border-radius-base);
          padding: var(--space-1) var(--space-2);
          font-size: var(--text-xs);
          color: var(--color-text-secondary);
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: var(--space-1);
          transition: all var(--duration-base) var(--ease-custom);
          opacity: 0;
        }
        pre:hover .copy-code-btn {
          opacity: 1;
        }
        .copy-code-btn:hover {
          background: var(--color-accent-primary);
          color: var(--color-white);
          border-color: var(--color-accent-primary);
        }
        .copy-code-btn.copied {
          background: var(--color-accent-secondary);
          color: var(--color-white);
          border-color: var(--color-accent-secondary);
        }
      `;
      document.head.appendChild(style);
    }
  }
  
  async copyCode(codeBlock, button) {
    try {
      await navigator.clipboard.writeText(codeBlock.textContent);
      
      // Feedback visual
      button.classList.add('copied');
      button.innerHTML = `
        <svg class="icon icon--sm"><use href="sergio-icons.svg#icon-check"></use></svg>
        ¡Copiado!
      `;
      
      setTimeout(() => {
        button.classList.remove('copied');
        button.innerHTML = `
          <svg class="icon icon--sm"><use href="sergio-icons.svg#icon-copy"></use></svg>
          Copiar
        `;
      }, 2000);
    } catch (err) {
      console.warn('Error al copiar:', err);
    }
  }
}

/* SMOOTH SCROLL NAVIGATION - Navegación suave entre secciones */
class SmoothScrollNavigation {
  constructor() {
    this.links = document.querySelectorAll('a[href^="#"]');
    this.headerHeight = 80; // Ajustar según altura del header
    
    this.init();
  }
  
  init() {
    this.bindEvents();
  }
  
  bindEvents() {
    this.links.forEach(link => {
      link.addEventListener('click', (e) => {
        const href = link.getAttribute('href');
        const target = document.querySelector(href);
        
        if (target && href !== '#') {
          e.preventDefault();
          this.scrollToSection(target);
          
          // Actualizar URL
          history.pushState(null, null, href);
        }
      });
    });
  }
  
  scrollToSection(target) {
    const targetPosition = target.offsetTop - this.headerHeight;
    
    window.scrollTo({
      top: targetPosition,
      behavior: 'smooth'
    });
  }
}

/* ==========================================================================
   MEJORAS UX - Funcionalidades de experiencia de usuario
   ========================================================================== */

// Función copy-to-clipboard
function copyCode(button) {
  const codeBlock = button.closest('.code-example').querySelector('code');
  const originalHTML = button.innerHTML;
  
  navigator.clipboard.writeText(codeBlock.textContent.trim()).then(() => {
    // Feedback visual exitoso
    button.classList.add('copied');
    button.innerHTML = '<svg class="icon icon--sm"><use href="#icon-check"></use></svg>¡Copiado!';
    
    setTimeout(() => {
      button.classList.remove('copied');
      button.innerHTML = originalHTML;
    }, 2000);
  }).catch(err => {
    // Fallback para navegadores que no soportan clipboard API
    console.warn('Error al copiar:', err);
    
    // Crear elemento temporal para seleccionar el texto
    const textArea = document.createElement('textarea');
    textArea.value = codeBlock.textContent.trim();
    document.body.appendChild(textArea);
    textArea.select();
    
    try {
      document.execCommand('copy');
      button.classList.add('copied');
      button.innerHTML = '<svg class="icon icon--sm"><use href="#icon-check"></use></svg>¡Copiado!';
      
      setTimeout(() => {
        button.classList.remove('copied');
        button.innerHTML = originalHTML;
      }, 2000);
    } catch (fallbackErr) {
      console.warn('Fallback copy también falló:', fallbackErr);
    } finally {
      document.body.removeChild(textArea);
    }
  });
}

// Búsqueda instantánea
function initSearch() {
  const searchInput = document.getElementById('component-search');
  if (!searchInput) return;
  
  searchInput.addEventListener('input', filterComponents);
}

function filterComponents() {
  const searchTerm = document.getElementById('component-search').value.toLowerCase();
  const sidebarGroups = document.querySelectorAll('.sidebar__group');
  
  sidebarGroups.forEach(group => {
    const links = group.querySelectorAll('.sidebar__link');
    let hasVisibleLinks = false;
    
    links.forEach(link => {
      const text = link.textContent.toLowerCase();
      const shouldShow = text.includes(searchTerm);
      
      link.closest('.sidebar__item').style.display = shouldShow ? 'block' : 'none';
      
      if (shouldShow) {
        hasVisibleLinks = true;
      }
    });
    
    // Mostrar/ocultar grupo completo basado en si tiene enlaces visibles
    group.style.display = hasVisibleLinks ? 'block' : 'none';
    
    // Si hay término de búsqueda y el grupo tiene resultados, expandirlo
    if (searchTerm && hasVisibleLinks && group.classList.contains('is-collapsed')) {
      group.classList.remove('is-collapsed');
    }
  });
}

// Mobile menu
function toggleMobileMenu() {
  const sidebar = document.querySelector('.sidebar');
  const overlay = document.getElementById('mobile-overlay');
  
  if (sidebar && overlay) {
    sidebar.classList.toggle('sidebar--mobile-open');
    overlay.classList.toggle('active');
    
    // Prevent body scroll when menu is open
    if (sidebar.classList.contains('sidebar--mobile-open')) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }
}

function closeMobileMenu() {
  const sidebar = document.querySelector('.sidebar');
  const overlay = document.getElementById('mobile-overlay');
  
  if (sidebar && overlay) {
    sidebar.classList.remove('sidebar--mobile-open');
    overlay.classList.remove('active');
    document.body.style.overflow = '';
  }
}

// Collapsible groups
function toggleGroup(button) {
  const group = button.closest('.sidebar__group');
  if (group) {
    group.classList.toggle('is-collapsed');
  }
}

// Auto-close mobile menu on link click
function setupMobileMenuAutoClose() {
  const sidebarLinks = document.querySelectorAll('.sidebar__link');
  
  sidebarLinks.forEach(link => {
    link.addEventListener('click', () => {
      // Check if we're in mobile view
      if (window.innerWidth <= 768) {
        closeMobileMenu();
      }
    });
  });
}

// Keyboard navigation support
function setupKeyboardNavigation() {
  document.addEventListener('keydown', (e) => {
    // Close mobile menu with Escape key
    if (e.key === 'Escape') {
      const sidebar = document.querySelector('.sidebar');
      if (sidebar && sidebar.classList.contains('sidebar--mobile-open')) {
        closeMobileMenu();
      }
    }
    
    // Focus search with Ctrl/Cmd + K
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
      e.preventDefault();
      const searchInput = document.getElementById('component-search');
      if (searchInput) {
        searchInput.focus();
      }
    }
  });
}

// Smooth scrolling for anchor links with header offset
function setupSmoothScrolling() {
  const headerHeight = 80; // Adjust based on your header height
  
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href === '#') return;
      
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        
        const targetPosition = target.offsetTop - headerHeight;
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
        
        // Update URL without triggering scroll
        history.pushState(null, null, href);
      }
    });
  });
}

// Active section highlighting
function setupActiveNavigation() {
  const observerOptions = {
    threshold: 0.3,
    rootMargin: '-80px 0px -60% 0px'
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.id;
        const links = document.querySelectorAll('.sidebar__link');
        
        // Remove active class from all links
        links.forEach(link => link.classList.remove('is-active'));
        
        // Add active class to current section link
        const activeLink = document.querySelector(`.sidebar__link[href="#${id}"]`);
        if (activeLink) {
          activeLink.classList.add('is-active');
        }
      }
    });
  }, observerOptions);
  
  // Observe all sections
  document.querySelectorAll('section[id]').forEach(section => {
    observer.observe(section);
  });
}

/* ==========================================================================
   INITIALIZATION - Auto-inicialización de componentes
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // Initialize Carousels
  document.querySelectorAll('.carousel').forEach(carousel => {
    const autoPlay = carousel.dataset.autoplay === 'true';
    const interval = parseInt(carousel.dataset.interval) || 5000;
    
    new Carousel(carousel, { autoPlay, interval });
  });
  
  // Initialize Slideshows
  document.querySelectorAll('.slideshow').forEach(slideshow => {
    const autoPlay = slideshow.dataset.autoplay !== 'false';
    const interval = parseInt(slideshow.dataset.interval) || 4000;
    
    new Slideshow(slideshow, { autoPlay, interval });
  });
  
  // Initialize Range Sliders
  document.querySelectorAll('.slider-range').forEach(slider => {
    new RangeSlider(slider);
  });
  
  // Initialize Comparison Sliders
  document.querySelectorAll('.comparison-slider').forEach(slider => {
    new ComparisonSlider(slider);
  });
  
  // Initialize Image Galleries
  document.querySelectorAll('.image-gallery').forEach(gallery => {
    new ImageGallery(gallery);
  });
  
  // Initialize Animated Counters
  document.querySelectorAll('.animated-counter').forEach(counter => {
    new AnimatedCounter(counter);
  });
  
  // Initialize Sidebar Navigation
  document.querySelectorAll('.sidebar').forEach(sidebar => {
    new SidebarNavigation(sidebar);
  });
  
  // Initialize Icon System
  window.iconSystem = new IconSystem();
  
  // Initialize Footer Social Links
  document.querySelectorAll('.footer--simple, .footer--complete').forEach(footer => {
    new FooterSocialLinks(footer);
  });
  
  // Initialize Features Animation
  new FeaturesAnimation();
  
  // Initialize Copy to Clipboard
  new CopyToClipboard();
  
  // Initialize Smooth Scroll Navigation
  new SmoothScrollNavigation();
  
  // ===== INITIALIZE UX IMPROVEMENTS =====
  
  // Initialize search functionality
  initSearch();
  
  // Setup mobile menu auto-close
  setupMobileMenuAutoClose();
  
  // Setup keyboard navigation
  setupKeyboardNavigation();
  
  // Setup smooth scrolling
  setupSmoothScrolling();
  
  // Setup active navigation highlighting
  setupActiveNavigation();
  
  // Setup responsive behavior
  window.addEventListener('resize', () => {
    // Auto-close mobile menu on desktop
    if (window.innerWidth > 768) {
      closeMobileMenu();
    }
  });
  
  console.log('✅ UX Improvements initialized successfully');
});

/* ==========================================================================
   UTILITY FUNCTIONS - Funciones auxiliares
   ========================================================================== */

// Debounce function para performance
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Throttle function para eventos de scroll/resize
function throttle(func, limit) {
  let inThrottle;
  return function(...args) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}

// Export para uso como módulos si es necesario
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    Carousel,
    Slideshow,
    RangeSlider,
    ComparisonSlider,
    ImageGallery,
    AnimatedCounter
  };
}