/**
 * StorageService - Gestión de persistencia local
 * Sincronización automática con localStorage
 */

class StorageService {
    constructor() {
        this.prefix = 'referencias-diseno_';
        this.version = '1.0';
        this.storageKey = `${this.prefix}v${this.version}`;
        
        // Configuración de qué partes del estado persistir
        this.persistConfig = {
            favorites: true,
            'activeFilters.category': true,
            'ui.viewMode': true,
            'ui.theme': true,
            // No persistir búsqueda ni sidebar abierto
            'activeFilters.search': false,
            'ui.sidebarOpen': false
        };
    }

    // Cargar estado desde localStorage
    loadState() {
        try {
            const saved = localStorage.getItem(this.storageKey);
            if (!saved) return {};
            
            const parsed = JSON.parse(saved);
            
            // Validar estructura y versión
            if (parsed.version !== this.version) {
                console.log('🔄 Storage version mismatch, resetting...');
                this.clearStorage();
                return {};
            }
            
            return parsed.data || {};
        } catch (error) {
            console.error('❌ Error loading from localStorage:', error);
            this.clearStorage();
            return {};
        }
    }

    // Guardar estado en localStorage
    saveState(state) {
        try {
            // Solo persistir las partes configuradas
            const dataToSave = this.filterPersistableData(state);
            
            const payload = {
                version: this.version,
                timestamp: Date.now(),
                data: dataToSave
            };
            
            localStorage.setItem(this.storageKey, JSON.stringify(payload));
            return true;
        } catch (error) {
            console.error('❌ Error saving to localStorage:', error);
            
            // Si es quota exceeded, limpiar y reintentar
            if (error.name === 'QuotaExceededError') {
                this.clearOldData();
                return this.saveState(state);
            }
            return false;
        }
    }

    // Filtrar solo los datos que deben persistirse
    filterPersistableData(state) {
        const result = {};
        
        Object.entries(this.persistConfig).forEach(([key, shouldPersist]) => {
            if (shouldPersist) {
                const value = this.getDeepValue(state, key);
                if (value !== undefined) {
                    this.setDeepValue(result, key, value);
                }
            }
        });
        
        return result;
    }

    // Limpiar storage
    clearStorage() {
        try {
            localStorage.removeItem(this.storageKey);
            return true;
        } catch (error) {
            console.error('❌ Error clearing localStorage:', error);
            return false;
        }
    }

    // Limpiar datos antiguos (diferentes versiones)
    clearOldData() {
        const keysToRemove = [];
        
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            if (key && key.startsWith(this.prefix) && key !== this.storageKey) {
                keysToRemove.push(key);
            }
        }
        
        keysToRemove.forEach(key => localStorage.removeItem(key));
        console.log(`🧹 Cleaned ${keysToRemove.length} old storage keys`);
    }

    // Exportar favoritos (para backup o compartir)
    exportFavorites(favorites, references) {
        const exportData = {
            version: this.version,
            timestamp: Date.now(),
            favorites: favorites.map(id => {
                const ref = references.find(r => r.id === id);
                return {
                    id,
                    title: ref?.title,
                    url: ref?.url
                };
            })
        };
        
        return JSON.stringify(exportData, null, 2);
    }

    // Importar favoritos
    importFavorites(jsonString) {
        try {
            const data = JSON.parse(jsonString);
            
            if (!data.favorites || !Array.isArray(data.favorites)) {
                throw new Error('Invalid format');
            }
            
            return data.favorites.map(item => item.id);
        } catch (error) {
            console.error('❌ Error importing favorites:', error);
            return null;
        }
    }

    // Obtener estadísticas de uso
    getStorageStats() {
        const used = new Blob([localStorage.getItem(this.storageKey) || '']).size;
        const quota = this.getStorageQuota();
        
        return {
            used: used,
            usedFormatted: this.formatBytes(used),
            quota: quota,
            quotaFormatted: this.formatBytes(quota),
            percentage: quota ? (used / quota * 100).toFixed(1) : 0
        };
    }

    // Estimar quota disponible
    getStorageQuota() {
        try {
            // Método moderno
            if ('storage' in navigator && 'estimate' in navigator.storage) {
                return navigator.storage.estimate().then(estimate => estimate.quota);
            }
            
            // Fallback: estimar con pruebas
            return this.estimateStorageQuota();
        } catch (error) {
            return 5 * 1024 * 1024; // 5MB fallback
        }
    }

    estimateStorageQuota() {
        const testKey = '__quota_test__';
        let low = 0;
        let high = 50 * 1024 * 1024; // 50MB max test
        
        while (low < high) {
            const mid = Math.floor((low + high) / 2);
            try {
                localStorage.setItem(testKey, 'x'.repeat(mid));
                localStorage.removeItem(testKey);
                low = mid + 1;
            } catch (e) {
                high = mid;
            }
        }
        
        return low;
    }

    formatBytes(bytes) {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    }

    // Helpers para acceso profundo
    getDeepValue(obj, path) {
        return path.split('.').reduce((current, key) => current?.[key], obj);
    }

    setDeepValue(obj, path, value) {
        const keys = path.split('.');
        const lastKey = keys.pop();
        const target = keys.reduce((current, key) => {
            if (!current[key]) current[key] = {};
            return current[key];
        }, obj);
        target[lastKey] = value;
    }
}

export default new StorageService();