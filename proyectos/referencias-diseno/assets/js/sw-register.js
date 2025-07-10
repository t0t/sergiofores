/**
 * 🔧 REGISTRO Y GESTIÓN DEL SERVICE WORKER
 * Sistema inteligente de caching para máxima performance
 */

class ServiceWorkerManager {
    constructor() {
        this.registration = null;
        this.isOnline = navigator.onLine;
        this.cacheStats = {};
        
        this.init();
    }
    
    async init() {
        console.log('🚀 Inicializando Service Worker Manager');
        
        // Verificar soporte
        if (!('serviceWorker' in navigator)) {
            console.log('❌ Service Worker no soportado');
            return;
        }
        
        // Registrar Service Worker
        await this.register();
        
        // Configurar event listeners
        this.setupEventListeners();
        
        // Monitorear estado de la red
        this.monitorNetworkStatus();
        
        // Obtener estadísticas iniciales
        setTimeout(() => this.updateCacheStats(), 1000);
    }
    
    async register() {
        try {
            console.log('📝 Registrando Service Worker...');
            
            // Verificar si sw.js existe antes de registrar
            const swExists = await this.checkServiceWorkerExists();
            if (!swExists) {
                console.log('⚠️ Service Worker no disponible en producción - funcionando sin cache');
                return;
            }
            
            this.registration = await navigator.serviceWorker.register('/sw.js', {
                scope: '/'
            });
            
            console.log('✅ Service Worker registrado exitosamente');
            
            // Manejar actualizaciones
            this.registration.addEventListener('updatefound', () => {
                console.log('🔄 Nueva versión del Service Worker disponible');
                this.handleUpdate();
            });
            
            // Verificar si hay una actualización disponible
            await this.registration.update();
            
        } catch (error) {
            console.warn('⚠️ Service Worker no disponible:', error.message);
            console.log('🔄 Sitio funcionando sin cache offline');
        }
    }
    
    async checkServiceWorkerExists() {
        try {
            const response = await fetch('/sw.js', { method: 'HEAD' });
            return response.ok;
        } catch (error) {
            return false;
        }
    }
    
    setupEventListeners() {
        // Escuchar mensajes del Service Worker
        navigator.serviceWorker.addEventListener('message', event => {
            const { type, data } = event.data;
            
            switch (type) {
                case 'CACHE_UPDATED':
                    console.log('📦 Cache actualizado:', data);
                    this.updateCacheStats();
                    break;
                    
                case 'OFFLINE_READY':
                    this.showOfflineNotification();
                    break;
            }
        });
        
        // Detectar cuando el SW toma control
        navigator.serviceWorker.addEventListener('controllerchange', () => {
            console.log('🎯 Service Worker tomó control');
            this.onControllerChange();
        });
    }
    
    monitorNetworkStatus() {
        window.addEventListener('online', () => {
            console.log('🌐 Conexión restaurada');
            this.isOnline = true;
            this.onNetworkChange(true);
        });
        
        window.addEventListener('offline', () => {
            console.log('📴 Sin conexión - modo offline');
            this.isOnline = false;
            this.onNetworkChange(false);
        });
    }
    
    async updateCacheStats() {
        if (!this.registration || !this.registration.active) return;
        
        try {
            const messageChannel = new MessageChannel();
            
            const statsPromise = new Promise(resolve => {
                messageChannel.port1.onmessage = event => {
                    resolve(event.data);
                };
            });
            
            this.registration.active.postMessage(
                { type: 'GET_CACHE_STATS' },
                [messageChannel.port2]
            );
            
            this.cacheStats = await statsPromise;
            console.log('📊 Cache stats:', this.cacheStats);
            
        } catch (error) {
            console.error('❌ Error obteniendo stats:', error);
        }
    }
    
    async prefetchCriticalResources() {
        if (!this.registration || !this.registration.active) return;
        
        console.log('🚀 Iniciando prefetch de recursos críticos...');
        
        this.registration.active.postMessage({
            type: 'PREFETCH_CRITICAL'
        });
    }
    
    async clearCache() {
        if (!this.registration || !this.registration.active) return;
        
        try {
            const messageChannel = new MessageChannel();
            
            const clearPromise = new Promise(resolve => {
                messageChannel.port1.onmessage = event => {
                    resolve(event.data);
                };
            });
            
            this.registration.active.postMessage(
                { type: 'CLEAR_CACHE' },
                [messageChannel.port2]
            );
            
            const result = await clearPromise;
            
            if (result.success) {
                console.log('🗑️ Cache limpiado exitosamente');
                this.updateCacheStats();
            }
            
        } catch (error) {
            console.error('❌ Error limpiando cache:', error);
        }
    }
    
    handleUpdate() {
        const newWorker = this.registration.installing;
        
        newWorker.addEventListener('statechange', () => {
            if (newWorker.state === 'installed') {
                if (navigator.serviceWorker.controller) {
                    // Hay una nueva versión disponible
                    this.showUpdateNotification();
                } else {
                    // Primera instalación
                    console.log('🎉 Service Worker instalado por primera vez');
                    this.onFirstInstall();
                }
            }
        });
    }
    
    showUpdateNotification() {
        console.log('📢 Nueva versión disponible');
        
        // Crear notificación visual simple
        const notification = document.createElement('div');
        notification.className = 'sw-update-notification';
        notification.innerHTML = `
            <div style="
                position: fixed;
                top: 20px;
                right: 20px;
                background: var(--color-primary);
                color: white;
                padding: 1rem;
                border-radius: 8px;
                box-shadow: var(--shadow-large);
                z-index: 10000;
                max-width: 300px;
                font-size: 14px;
            ">
                <div style="margin-bottom: 8px; font-weight: 600;">
                    ✨ Nueva versión disponible
                </div>
                <div style="margin-bottom: 12px; opacity: 0.9;">
                    Recarga la página para obtener las últimas mejoras
                </div>
                <button onclick="window.location.reload()" style="
                    background: white;
                    color: var(--color-primary);
                    border: none;
                    padding: 6px 12px;
                    border-radius: 4px;
                    cursor: pointer;
                    font-weight: 500;
                    margin-right: 8px;
                ">
                    Recargar
                </button>
                <button onclick="this.parentElement.parentElement.remove()" style="
                    background: transparent;
                    color: white;
                    border: 1px solid rgba(255,255,255,0.3);
                    padding: 6px 12px;
                    border-radius: 4px;
                    cursor: pointer;
                ">
                    Después
                </button>
            </div>
        `;
        
        document.body.appendChild(notification);
        
        // Auto-remove después de 10 segundos
        setTimeout(() => {
            if (notification.parentElement) {
                notification.remove();
            }
        }, 10000);
    }
    
    showOfflineNotification() {
        console.log('📴 Modo offline activado');
        
        // Solo mostrar si realmente estamos offline
        if (!this.isOnline) {
            const notification = document.createElement('div');
            notification.innerHTML = `
                <div style="
                    position: fixed;
                    bottom: 20px;
                    left: 20px;
                    background: var(--color-accent);
                    color: white;
                    padding: 0.75rem 1rem;
                    border-radius: 6px;
                    font-size: 14px;
                    z-index: 10000;
                ">
                    📴 Modo offline - contenido desde cache
                </div>
            `;
            
            document.body.appendChild(notification);
            
            setTimeout(() => notification.remove(), 3000);
        }
    }
    
    onFirstInstall() {
        console.log('🎉 Primera instalación completada');
        
        // Prefetch recursos críticos
        setTimeout(() => {
            this.prefetchCriticalResources();
        }, 2000);
    }
    
    onControllerChange() {
        console.log('🔄 Service Worker controller cambió');
        this.updateCacheStats();
    }
    
    onNetworkChange(isOnline) {
        // Emitir evento personalizado para que otros componentes puedan reaccionar
        const event = new CustomEvent('networkStatusChanged', {
            detail: { isOnline }
        });
        document.dispatchEvent(event);
        
        if (isOnline) {
            // Cuando volvemos online, prefetch recursos importantes
            setTimeout(() => {
                this.prefetchCriticalResources();
            }, 1000);
        }
    }
    
    // API pública para debugging y control
    getStats() {
        return {
            registration: !!this.registration,
            isOnline: this.isOnline,
            cacheStats: this.cacheStats,
            controller: !!navigator.serviceWorker.controller
        };
    }
    
    // Forzar actualización del Service Worker
    async forceUpdate() {
        if (this.registration) {
            await this.registration.update();
            console.log('🔄 Actualización forzada del Service Worker');
        }
    }
}

// ===== INICIALIZACIÓN AUTOMÁTICA =====

let swManager = null;

// Inicializar cuando el DOM esté listo
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initServiceWorker);
} else {
    initServiceWorker();
}

function initServiceWorker() {
    // Esperar un poco para no interferir con el critical path
    setTimeout(() => {
        swManager = new ServiceWorkerManager();
        
        // Exponer globalmente para debugging
        window.swManager = swManager;
        
        console.log('🎯 Service Worker Manager inicializado');
        
    }, 1000);
}

// Event listener para debugging
document.addEventListener('keydown', (event) => {
    // Ctrl/Cmd + Shift + S para ver stats del SW
    if ((event.ctrlKey || event.metaKey) && event.shiftKey && event.key === 'S') {
        if (swManager) {
            console.table(swManager.getStats());
        }
    }
    
    // Ctrl/Cmd + Shift + C para limpiar cache
    if ((event.ctrlKey || event.metaKey) && event.shiftKey && event.key === 'C') {
        if (swManager) {
            swManager.clearCache();
        }
    }
});

console.log('🔧 Service Worker Manager cargado - Ctrl+Shift+S para stats');