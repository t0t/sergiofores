import Animator from './Animator.js';

export class Router {
    constructor(options = {}) {
        this.routes = new Map();
        this.notFoundHandler = options.notFoundHandler || (() => {
            console.error('Route not found');
        });
        this.container = options.container;
        if (!this.container) {
            throw new Error('Router container not found');
        }
        this.currentView = null;
        this.isTransitioning = false;
        this.pendingNavigation = null;

        // Create a wrapper for view transitions
        this.viewWrapper = document.createElement('div');
        this.viewWrapper.className = 'view-wrapper';
        this.container.appendChild(this.viewWrapper);

        // Handle navigation
        window.addEventListener('popstate', () => this.handleRoute());
        document.addEventListener('click', (e) => {
            const link = e.target.closest('[data-link]');
            if (link) {
                e.preventDefault();
                this.navigate(link.getAttribute('href'));
            }
        });
    }

    addRoute(path, view) {
        path = this.normalizePath(path);
        this.routes.set(path, view);
        return this;
    }

    normalizePath(path) {
        if (!path.startsWith('/')) {
            path = '/' + path;
        }
        if (path !== '/' && path.endsWith('/')) {
            path = path.slice(0, -1);
        }
        return path;
    }

    async cleanupCurrentView() {
        if (this.currentView) {
            try {
                await Animator.fadeOut(this.currentView.container);
                this.currentView.destroy();
                this.currentView = null;
            } catch (error) {
                console.error('Error cleaning up current view:', error);
            }
        }
    }

    async handleRoute() {
        if (this.isTransitioning) {
            // Si hay una transición en curso, guardar la navegación pendiente
            const path = this.normalizePath(window.location.pathname);
            this.pendingNavigation = path;
            return;
        }
        
        let path = this.normalizePath(window.location.pathname);
        let View = this.routes.get(path);

        if (!View && path.endsWith('/')) {
            path = path.slice(0, -1);
            View = this.routes.get(path);
        }

        if (!View && !path.endsWith('/')) {
            View = this.routes.get(path + '/');
        }

        if (!View) {
            console.warn(`Route not found: ${path}`);
            this.notFoundHandler();
            return;
        }

        this.isTransitioning = true;

        try {
            // Limpiar la vista actual
            await this.cleanupCurrentView();

            // Limpiar el contenedor
            this.viewWrapper.innerHTML = '';

            // Crear e inicializar la nueva vista
            const newView = new View(this.viewWrapper);
            await newView.init();
            
            // Mostrar la nueva vista con animación
            await Animator.fadeIn(newView.container);
            
            this.currentView = newView;
        } catch (error) {
            console.error('Error handling route:', error);
            this.notFoundHandler();
        } finally {
            this.isTransitioning = false;

            // Si hay una navegación pendiente, procesarla
            if (this.pendingNavigation) {
                const pendingPath = this.pendingNavigation;
                this.pendingNavigation = null;
                if (pendingPath !== path) {
                    this.navigate(pendingPath, true);
                }
            }
        }
    }

    async navigate(url, replace = false) {
        try {
            const newPath = new URL(url, window.location.origin).pathname;
            const normalizedNewPath = this.normalizePath(newPath);
            const normalizedCurrentPath = this.normalizePath(window.location.pathname);
            
            if (normalizedNewPath === normalizedCurrentPath) {
                return;
            }

            // Si hay una transición en curso, actualizar solo la URL
            if (this.isTransitioning) {
                if (replace) {
                    history.replaceState(null, '', normalizedNewPath);
                } else {
                    history.pushState(null, '', normalizedNewPath);
                }
                return;
            }

            if (replace) {
                history.replaceState(null, '', normalizedNewPath);
            } else {
                history.pushState(null, '', normalizedNewPath);
            }

            await this.handleRoute();
        } catch (error) {
            console.error('Error navigating:', error);
            this.notFoundHandler();
        }
    }

    init() {
        this.handleRoute();
        return this;
    }
}

export default Router;
