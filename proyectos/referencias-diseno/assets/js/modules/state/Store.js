/**
 * Store - Sistema de estado global centralizado
 * Patrón Observer para reactividad simple
 */

class Store {
    constructor() {
        this.state = {
            favorites: [],
            activeFilters: {
                category: 'all',
                search: '',
                tags: [],
                onlyFavorites: false
            },
            ui: {
                sidebarOpen: false,
                viewMode: 'grid', // grid | list
                theme: 'light'    // light | dark
            }
        };
        
        this.subscribers = new Map();
        this.middleware = [];
    }

    // Suscribirse a cambios en una parte del estado
    subscribe(key, callback) {
        if (!this.subscribers.has(key)) {
            this.subscribers.set(key, []);
        }
        this.subscribers.get(key).push(callback);
        
        // Retornar función de cleanup
        return () => {
            const callbacks = this.subscribers.get(key);
            const index = callbacks.indexOf(callback);
            if (index > -1) {
                callbacks.splice(index, 1);
            }
        };
    }

    // Actualizar estado y notificar suscriptores
    setState(key, value, action = 'UPDATE') {
        const oldValue = this.getState(key);
        
        // Aplicar middleware (para logging, validación, etc.)
        this.middleware.forEach(fn => fn(action, key, oldValue, value));
        
        // Actualizar estado usando dot notation
        this.setDeepValue(this.state, key, value);
        
        // Notificar suscriptores
        this.notifySubscribers(key, value, oldValue);
    }

    // Obtener valor del estado
    getState(key) {
        return this.getDeepValue(this.state, key);
    }

    // Helper para acceso profundo con dot notation
    getDeepValue(obj, path) {
        return path.split('.').reduce((current, key) => current?.[key], obj);
    }

    setDeepValue(obj, path, value) {
        const keys = path.split('.');
        const lastKey = keys.pop();
        const target = keys.reduce((current, key) => current[key], obj);
        target[lastKey] = value;
    }

    // Notificar a suscriptores
    notifySubscribers(key, newValue, oldValue) {
        // Notificar suscriptores exactos
        const exactSubscribers = this.subscribers.get(key) || [];
        exactSubscribers.forEach(callback => callback(newValue, oldValue));
        
        // Notificar suscriptores de padres (ej: 'favorites' notifica a 'favorites.*')
        const parts = key.split('.');
        for (let i = parts.length - 1; i > 0; i--) {
            const parentKey = parts.slice(0, i).join('.');
            const parentSubscribers = this.subscribers.get(parentKey) || [];
            parentSubscribers.forEach(callback => callback(this.getState(parentKey), oldValue));
        }
    }

    // Añadir middleware
    use(middlewareFn) {
        this.middleware.push(middlewareFn);
    }

    // Actions helpers específicos
    dispatch(action, payload) {
        switch (action) {
            case 'ADD_FAVORITE':
                this.addFavorite(payload);
                break;
            case 'REMOVE_FAVORITE':
                this.removeFavorite(payload);
                break;
            case 'TOGGLE_FAVORITE':
                this.toggleFavorite(payload);
                break;
            case 'SET_FILTER':
                this.setState(`activeFilters.${payload.type}`, payload.value, 'SET_FILTER');
                break;
            case 'CLEAR_FILTERS':
                this.setState('activeFilters', {
                    category: 'all',
                    search: '',
                    tags: [],
                    onlyFavorites: false
                }, 'CLEAR_FILTERS');
                break;
            default:
                console.warn(`Unknown action: ${action}`);
        }
    }

    addFavorite(referenceId) {
        const favorites = this.getState('favorites');
        if (!favorites.includes(referenceId)) {
            this.setState('favorites', [...favorites, referenceId], 'ADD_FAVORITE');
        }
    }

    removeFavorite(referenceId) {
        const favorites = this.getState('favorites');
        this.setState('favorites', favorites.filter(id => id !== referenceId), 'REMOVE_FAVORITE');
    }

    toggleFavorite(referenceId) {
        const favorites = this.getState('favorites');
        if (favorites.includes(referenceId)) {
            this.removeFavorite(referenceId);
        } else {
            this.addFavorite(referenceId);
        }
    }
}

// Singleton instance
const store = new Store();

// Middleware para logging en desarrollo
if (process.env.NODE_ENV === 'development' || window.location.hostname === 'localhost') {
    store.use((action, key, oldValue, newValue) => {
        console.log(`🔄 Store [${action}] ${key}:`, { oldValue, newValue });
    });
}

export default store;