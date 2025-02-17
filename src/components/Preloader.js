export class Preloader {
    constructor() {
        this.preloader = document.getElementById('wrap-preloader');
        this.progressBar = document.getElementById('preloader');
        this.loadingText = document.querySelector('.loading-text');
        this.progress = 0;
        this.resources = [
            // Imágenes principales
            '/img/lab/geometria-sagrada.jpg',
            '/img/lab/codigos-creacion.jpg',
            '/img/lab/datos-cosmicos.jpg',
            '/img/vision/header.jpg',
            '/img/vision/proceso.jpg',
            '/img/vision/perspectiva.jpg',
            '/img/vision/metodologia.jpg',
            
            // Archivos JSON
            '/src/data/vision.json',
            '/src/data/lab.json',
            
            // CSS
            '/assets/styles/main.css',
            '/assets/styles/vision.css',
            '/assets/styles/lab.css'
        ];
    }

    async init() {
        try {
            await this.loadResources();
            this.hide();
        } catch (error) {
            console.error('Error en el preloader:', error);
            this.handleError();
        }
    }

    async loadResources() {
        const total = this.resources.length;
        let loaded = 0;

        const loadPromises = this.resources.map(async (resource) => {
            try {
                await this.loadResource(resource);
                loaded++;
                this.updateProgress((loaded / total) * 100);
            } catch (error) {
                console.error(`Error cargando ${resource}:`, error);
                throw error;
            }
        });

        await Promise.all(loadPromises);
    }

    async loadResource(resource) {
        if (resource.match(/\.(jpg|jpeg|png|gif|svg)$/i)) {
            return this.loadImage(resource);
        } else if (resource.match(/\.json$/i)) {
            return this.loadJSON(resource);
        } else if (resource.match(/\.css$/i)) {
            return this.loadCSS(resource);
        }
    }

    loadImage(src) {
        return new Promise((resolve, reject) => {
            const img = new Image();
            img.onload = () => resolve();
            img.onerror = () => reject(new Error(`Failed to load image: ${src}`));
            img.src = src;
        });
    }

    async loadJSON(url) {
        const response = await fetch(url);
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        await response.json();
    }

    loadCSS(href) {
        return new Promise((resolve, reject) => {
            const link = document.createElement('link');
            link.rel = 'stylesheet';
            link.href = href;
            link.onload = () => resolve();
            link.onerror = () => reject(new Error(`Failed to load CSS: ${href}`));
            document.head.appendChild(link);
        });
    }

    updateProgress(value) {
        this.progress = Math.min(100, Math.max(0, value));
        
        // Actualizar SVG
        const circle = this.progressBar.querySelector('circle');
        if (circle) {
            const radius = circle.r.baseVal.value;
            const circumference = radius * 2 * Math.PI;
            const offset = circumference - (this.progress / 100) * circumference;
            circle.style.strokeDashoffset = offset;
        }
        
        // Actualizar texto
        this.loadingText.textContent = `Cargando... ${Math.round(this.progress)}%`;
        
        // Actualizar ARIA
        this.preloader.setAttribute('aria-valuenow', this.progress);
    }

    hide() {
        this.preloader.classList.add('fade-out');
        setTimeout(() => {
            this.preloader.style.display = 'none';
            document.getElementById('app').classList.remove('fade-page-off');
        }, 500);
    }

    handleError() {
        this.loadingText.textContent = 'Error al cargar. Intentando de nuevo...';
        this.loadingText.classList.add('error');
        
        // Reintentar después de un delay
        setTimeout(() => {
            this.init();
        }, 3000);
    }
}
