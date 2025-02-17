// Preloader Controller
class PreloaderController {
  constructor() {
    this.preloader = document.getElementById('wrap-preloader');
    this.site = document.getElementById('theSite');
    this.loadingText = document.querySelector('.loading-text');
    this.progress = 0;
    this.totalResources = 0;
    this.loadedResources = 0;

    this.init();
  }

  init() {
    // Inicializar estado
    this.site.style.display = 'none';
    document.documentElement.style.overflow = 'hidden';
    
    // Contar recursos a cargar
    this.totalResources = document.images.length + 
                         document.querySelectorAll('video').length +
                         document.querySelectorAll('script').length;
    
    // Observar carga de recursos
    this.observeResources();
    
    // Manejar eventos DOM
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => this.updateProgress('DOM cargado'));
    } else {
      this.updateProgress('DOM cargado');
    }

    // Evento load final
    window.addEventListener('load', () => this.onLoadComplete());
  }

  observeResources() {
    // Observar imágenes
    document.images.forEach(img => {
      if (img.complete) {
        this.resourceLoaded();
      } else {
        img.addEventListener('load', () => this.resourceLoaded());
        img.addEventListener('error', () => this.resourceLoaded());
      }
    });

    // Observar videos
    document.querySelectorAll('video').forEach(video => {
      if (video.readyState >= 4) {
        this.resourceLoaded();
      } else {
        video.addEventListener('loadeddata', () => this.resourceLoaded());
        video.addEventListener('error', () => this.resourceLoaded());
      }
    });
  }

  resourceLoaded() {
    this.loadedResources++;
    this.updateProgress();
  }

  updateProgress(message = '') {
    this.progress = Math.min((this.loadedResources / this.totalResources) * 100, 100);
    
    // Actualizar ARIA
    this.preloader.setAttribute('aria-valuenow', Math.round(this.progress));
    
    // Actualizar texto
    if (message) {
      this.loadingText.textContent = message;
    } else {
      this.loadingText.textContent = `Cargando... ${Math.round(this.progress)}%`;
    }
  }

  onLoadComplete() {
    // Asegurar 100%
    this.updateProgress('¡Listo!');
    
    // Animación de salida
    setTimeout(() => {
      this.preloader.style.opacity = '0';
      this.site.style.display = 'block';
      document.documentElement.style.overflow = 'auto';
      
      // Animar entrada del contenido
      requestAnimationFrame(() => {
        this.site.classList.add('fade-page-on');
      });

      // Limpiar preloader
      setTimeout(() => {
        this.preloader.style.display = 'none';
      }, 500);
    }, 500);
  }
}

// Iniciar preloader
new PreloaderController();
