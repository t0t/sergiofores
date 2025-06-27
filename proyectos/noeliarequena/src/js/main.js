import Router from './modules/Router.js';
import { Store } from './modules/Store.js';
import { EventBus } from './modules/EventBus.js';
import { Home } from '../views/Home.js';
import { Exposiciones } from '../views/Exposiciones.js';
import { Artworks } from '../views/Artworks.js';
import { Bio } from '../views/Bio.js';
import { Header } from './components/Header.js';
import { Navigation } from './components/Navigation.js';
import { Footer } from './components/Footer.js';
import { uiReducer } from './store/ui.js';
import { galleryReducer } from './store/gallery.js';

// Initialize EventBus
export const eventBus = new EventBus();

// Initialize Store
export const store = new Store();

// Add reducers
store.addReducer('ui', uiReducer);
store.addReducer('gallery', galleryReducer);

// Add middleware for async actions
store.addMiddleware(store => next => action => {
    if (typeof action === 'function') {
        return action(store.dispatch, store.getState);
    }
    return next(action);
});

// Create app container
const app = {
    router: null,
    store,
    eventBus
};

// Make app globally available
window.app = app;

// Wait for DOM to be loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initialize static components
    const header = new Header(document.getElementById('app-header'));
    const nav = new Navigation(document.getElementById('app-nav'));
    const footer = new Footer(document.getElementById('app-footer'));
    
    // Initialize router
    app.router = new Router({
        container: document.getElementById('app-main'),
        notFoundHandler: () => {
            app.router.navigate('/', true); // Redirect to home on 404
        }
    });

    // Make router globally available for legacy support
    window.router = app.router;

    // Add routes
    app.router
        .addRoute('/', Home)
        .addRoute('/exposiciones', Exposiciones)
        .addRoute('/artworks', Artworks)
        .addRoute('/bio', Bio)
        .init();
});
