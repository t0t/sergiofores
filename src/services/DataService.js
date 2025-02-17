// Servicio para gestionar datos y estado global
export class DataService {
    constructor() {
        if (DataService.instance) {
            return DataService.instance;
        }
        DataService.instance = this;
        
        this.state = {
            currentPage: null,
            isLoading: false,
            userData: null,
            cache: new Map()
        };
    }

    // Gestión de estado
    setState(key, value) {
        this.state[key] = value;
        this.notifyStateChange(key, value);
    }

    getState(key) {
        return this.state[key];
    }

    // Cache
    setCache(key, value, ttl = 3600000) { // 1 hora por defecto
        this.state.cache.set(key, {
            value,
            timestamp: Date.now(),
            ttl
        });
    }

    getCache(key) {
        const cached = this.state.cache.get(key);
        if (!cached) return null;

        const now = Date.now();
        if (now - cached.timestamp > cached.ttl) {
            this.state.cache.delete(key);
            return null;
        }

        return cached.value;
    }

    // Gestión de datos
    async fetchData(url, options = {}) {
        const cacheKey = `${url}-${JSON.stringify(options)}`;
        const cached = this.getCache(cacheKey);
        
        if (cached) return cached;

        try {
            this.setState('isLoading', true);
            const response = await fetch(url, options);
            const data = await response.json();
            
            this.setCache(cacheKey, data);
            return data;
        } catch (error) {
            console.error('Error fetching data:', error);
            throw error;
        } finally {
            this.setState('isLoading', false);
        }
    }

    // Eventos
    notifyStateChange(key, value) {
        // Implementar sistema de eventos si es necesario
        console.log(`Estado actualizado: ${key}`, value);
    }

    // Utilidades
    clearCache() {
        this.state.cache.clear();
    }

    resetState() {
        this.state = {
            currentPage: null,
            isLoading: false,
            userData: null,
            cache: new Map()
        };
    }
}
