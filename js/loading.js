// Loading Screen Elegant
class LoadingScreen {
    constructor() {
        this.loadingElement = null;
        this.progressBar = null;
        this.progress = 0;
        this.isComplete = false;
        this.minDisplayTime = 4000; // Mínimo 4 segundos para la animación mejorada
        this.startTime = Date.now();
        
        this.createLoadingScreen();
        this.simulateProgress();
        this.waitForPageLoad();
    }
    
    createLoadingScreen() {
        // Crear estructura del loading
        this.loadingElement = document.createElement('div');
        this.loadingElement.className = 'loading-screen';
        
        const content = `
            <div class="loading-content">
                <div class="loading-logo">
                    <img src="img/logo2-negativo.svg" alt="Logo 01234" class="loading-logo-image">
                </div>
                <div class="loading-text-container">
                    <span class="loading-text">Me doy cuenta de mí</span>
                </div>
                <div class="loading-progress">
                    <div class="loading-progress-bar"></div>
                </div>
                <div class="loading-indicator">
                    <div class="loading-indicator-text">cargando experiencia</div>
                </div>
            </div>
        `;
        
        this.loadingElement.innerHTML = content;
        document.body.appendChild(this.loadingElement);
        
        this.progressBar = this.loadingElement.querySelector('.loading-progress-bar');
    }
    
    simulateProgress() {
        const updateProgress = () => {
            if (this.progress < 90 && !this.isComplete) {
                // Progreso más rápido al inicio, más lento al final
                const increment = Math.random() * (95 - this.progress) * 0.05;
                this.progress = Math.min(90, this.progress + increment);
                this.updateProgressBar();
                
                setTimeout(updateProgress, 100 + Math.random() * 200);
            }
        };
        
        updateProgress();
    }
    
    updateProgressBar() {
        if (this.progressBar) {
            this.progressBar.style.width = `${this.progress}%`;
        }
    }
    
    waitForPageLoad() {
        const checkComplete = () => {
            const isLoaded = document.readyState === 'complete';
            const minTimeElapsed = (Date.now() - this.startTime) >= this.minDisplayTime;
            
            if (isLoaded && minTimeElapsed) {
                this.completeLoading();
            } else {
                setTimeout(checkComplete, 100);
            }
        };
        
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', checkComplete);
        } else {
            checkComplete();
        }
    }
    
    completeLoading() {
        this.isComplete = true;
        this.progress = 100;
        this.updateProgressBar();
        
        // Pausa más larga para el efecto mejorado
        setTimeout(() => {
            this.hideLoading();
        }, 1000);
    }
    
    hideLoading() {
        if (this.loadingElement) {
            this.loadingElement.classList.add('fade-out');
            
            // Remover elemento después de la transición mejorada
            setTimeout(() => {
                if (this.loadingElement && this.loadingElement.parentNode) {
                    this.loadingElement.parentNode.removeChild(this.loadingElement);
                }
                
                // Trigger event para otras animaciones
                document.dispatchEvent(new CustomEvent('loadingComplete'));
            }, 1500);
        }
    }
}

// Verificar si la página necesita loading
const needsLoading = () => {
    // Solo mostrar loading si:
    // 1. La página está cargando Y
    // 2. No es un refresh (performance.navigation.type !== 1) Y  
    // 3. No viene del cache del navegador
    
    const isPageLoading = document.readyState === 'loading';
    const isRefresh = performance.navigation && performance.navigation.type === 1;
    const isBackForward = performance.navigation && performance.navigation.type === 2;
    const fromCache = performance.getEntriesByType('navigation')[0]?.transferSize === 0;
    
    // Mostrar loading solo en carga inicial real (no refresh, no cache, no back/forward)
    const shouldShow = isPageLoading && !isRefresh && !isBackForward && !fromCache;
    
    console.log('Loading decision:', {
        isPageLoading,
        isRefresh,
        isBackForward,
        fromCache,
        shouldShow
    });
    
    return shouldShow;
};

// Forzar visibilidad inmediata de todo el contenido
const forceVisibility = () => {
    const sections = document.querySelectorAll('section');
    const header = document.querySelector('.header');
    
    if (header) {
        header.style.opacity = '1';
        header.style.transform = 'translateY(0)';
    }
    
    sections.forEach(section => {
        section.style.opacity = '1';
        section.style.transform = 'translateY(0) scale(1)';
        section.style.filter = 'blur(0px)';
        section.style.transition = 'none';
    });
    
    console.log('Content forced visible');
};

// Ejecutar inmediatamente si el DOM ya está listo
if (document.readyState === 'complete' || document.readyState === 'interactive') {
    forceVisibility();
} else {
    document.addEventListener('DOMContentLoaded', forceVisibility);
}

// Backup: forzar visibilidad después de un tiempo
setTimeout(forceVisibility, 200);

// Inicializar loading solo si la página está cargando
if (needsLoading()) {
    console.log('Page is loading - showing loading screen');
    new LoadingScreen();
} else {
    console.log('Page already loaded - skipping loading screen');
    
    // Trigger el event inmediatamente para compatibilidad
    setTimeout(() => {
        document.dispatchEvent(new CustomEvent('loadingComplete'));
    }, 100);
}

// Event listener para animaciones post-loading mejoradas
document.addEventListener('loadingComplete', () => {
    // Animar elementos de la página con efectos más sofisticados
    const sections = document.querySelectorAll('section');
    const header = document.querySelector('.header');
    
    // Animar header primero
    if (header) {
        header.style.opacity = '0';
        header.style.transform = 'translateY(-20px)';
        setTimeout(() => {
            header.style.transition = 'all 1s cubic-bezier(0.165, 0.84, 0.44, 1)';
            header.style.opacity = '1';
            header.style.transform = 'translateY(0)';
        }, 100);
    }
    
    // Animar secciones con efectos escalonados
    sections.forEach((section, index) => {
        // Solo animar si no es el hero (que debe ser visible siempre)
        if (!section.classList.contains('hero')) {
            section.style.opacity = '0';
            section.style.transform = 'translateY(50px) scale(0.95)';
            section.style.filter = 'blur(5px)';
            
            setTimeout(() => {
                section.style.transition = 'all 1.2s cubic-bezier(0.165, 0.84, 0.44, 1)';
                section.style.opacity = '1';
                section.style.transform = 'translateY(0) scale(1)';
                section.style.filter = 'blur(0px)';
            }, 200 + (index * 200));
        }
    });
    
    // Animar projects cards con delay adicional
    setTimeout(() => {
        const projectCards = document.querySelectorAll('.project-card');
        projectCards.forEach((card, index) => {
            card.style.transition = 'all 0.8s cubic-bezier(0.165, 0.84, 0.44, 1)';
            card.style.transitionDelay = `${index * 100}ms`;
        });
    }, 1000);
});