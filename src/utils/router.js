// Router moderno usando History API
export class Router {
    constructor(routes) {
        this.routes = {
            '/': 'home',
            '/obra': 'obra',
            '/vision': 'vision',
            '/lab': 'lab',
            '/404': 'notFound'
        };
        this.currentPath = window.location.pathname;
        
        // Manejar navegación
        window.addEventListener('popstate', () => this.handleRoute());
        document.addEventListener('DOMContentLoaded', () => this.handleRoute());
        
        // Interceptar clicks en enlaces
        document.addEventListener('click', (e) => {
            if (e.target.matches('[data-link]')) {
                e.preventDefault();
                this.navigate(e.target.href);
            }
        });
    }

    async handleRoute() {
        const path = window.location.pathname;
        const page = this.routes[path] || this.routes['/404'];
        
        try {
            // Cargar controlador y vista
            await this.loadRoute(path);
        } catch (error) {
            console.error('Error al cargar la ruta:', error);
            // Redirigir a página de error si es necesario
        }
    }

    async loadRoute(path) {
        try {
            const page = this.routes[path] || this.routes['/404'];
            const response = await fetch(`/src/views/pages/${page}.html`);
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
            const content = await response.text();
            
            // Limpiar contenido anterior y cargar nueva página
            this.app.innerHTML = content;
            
            // Inicializar controladores específicos de la página
            switch (page) {
                case 'obra':
                    await this.initObraPage();
                    break;
                case 'vision':
                    await this.initVisionPage();
                    break;
                case 'lab':
                    await this.initLabPage();
                    break;
            }
            
            // Actualizar navegación
            this.updateNavigation();
            
        } catch (error) {
            console.error('Error loading route:', error);
            this.navigateTo('/404');
        }
    }

    async initVisionPage() {
        const { VisionService } = await import('../services/VisionService.js');
        const { VisionSlider } = await import('../components/VisionSlider.js');
        const { CodigosSearch } = await import('../components/CodigosSearch.js');
        
        const visionService = new VisionService();
        
        // Inicializar slider
        const sliderContainer = document.getElementById('vision-slider');
        const sliderData = await visionService.getSliderContent();
        new VisionSlider(sliderContainer, sliderData);
        
        // Inicializar búsqueda de códigos
        const searchInput = document.getElementById('codigos-search');
        const resultsContainer = document.getElementById('codigos-container');
        new CodigosSearch(searchInput, resultsContainer, visionService);
    }

    async initLabPage() {
        const { LabService } = await import('../services/LabService.js');
        const { LabProjects } = await import('../components/LabProjects.js');
        
        const labService = new LabService();
        
        // Inicializar proyectos
        const projectsContainer = document.getElementById('projects-container');
        const modal = document.getElementById('project-modal');
        new LabProjects(projectsContainer, modal, labService);
    }

    navigate(url) {
        window.history.pushState(null, null, url);
        this.handleRoute();
    }
}
