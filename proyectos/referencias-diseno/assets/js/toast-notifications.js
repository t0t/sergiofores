/**
 * Sistema de Toast Notifications Avanzado
 * Notificaciones elegantes y profesionales
 */

class ToastNotifications {
    constructor() {
        this.container = null;
        this.toasts = new Map();
        this.maxToasts = 5;
        this.defaultDuration = 4000;
        
        this.init();
    }

    init() {
        this.createContainer();
        this.setupStyles();
        
        console.log('🔔 Sistema de notificaciones inicializado');
    }

    createContainer() {
        this.container = document.createElement('div');
        this.container.className = 'toast-container';
        this.container.setAttribute('aria-live', 'polite');
        this.container.setAttribute('aria-label', 'Notificaciones');
        
        document.body.appendChild(this.container);
    }

    setupStyles() {
        if (document.getElementById('toast-styles')) return;
        
        const style = document.createElement('style');
        style.id = 'toast-styles';
        style.textContent = `
            .toast-container {
                position: fixed;
                top: 20px;
                right: 20px;
                z-index: 10000;
                display: flex;
                flex-direction: column;
                gap: var(--space-sm);
                pointer-events: none;
                max-width: 400px;
            }
            
            .toast {
                background: white;
                border: 1px solid var(--color-border);
                border-radius: 8px;
                padding: var(--space-md);
                box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1), 
                           0 4px 12px rgba(0, 0, 0, 0.05);
                transform: translateX(120%);
                transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
                pointer-events: auto;
                position: relative;
                overflow: hidden;
                backdrop-filter: blur(10px);
                border-left: 4px solid var(--color-primary);
            }
            
            .toast.show {
                transform: translateX(0);
            }
            
            .toast.hiding {
                transform: translateX(120%);
                opacity: 0;
            }
            
            .toast-success {
                border-left-color: #10b981;
                background: linear-gradient(135deg, #ecfdf5, #ffffff);
            }
            
            .toast-error {
                border-left-color: #ef4444;
                background: linear-gradient(135deg, #fef2f2, #ffffff);
            }
            
            .toast-warning {
                border-left-color: #f59e0b;
                background: linear-gradient(135deg, #fffbeb, #ffffff);
            }
            
            .toast-info {
                border-left-color: #3b82f6;
                background: linear-gradient(135deg, #eff6ff, #ffffff);
            }
            
            .toast-header {
                display: flex;
                align-items: center;
                justify-content: space-between;
                margin-bottom: var(--space-xs);
            }
            
            .toast-title {
                display: flex;
                align-items: center;
                gap: var(--space-xs);
                font-weight: 600;
                font-size: var(--font-size-sm);
                color: var(--color-text);
            }
            
            .toast-icon {
                width: 20px;
                height: 20px;
                display: flex;
                align-items: center;
                justify-content: center;
            }
            
            .toast-success .toast-icon {
                color: #10b981;
            }
            
            .toast-error .toast-icon {
                color: #ef4444;
            }
            
            .toast-warning .toast-icon {
                color: #f59e0b;
            }
            
            .toast-info .toast-icon {
                color: #3b82f6;
            }
            
            .toast-close {
                background: none;
                border: none;
                color: var(--color-text-meta);
                cursor: pointer;
                padding: 4px;
                border-radius: 4px;
                transition: all 0.2s ease;
                display: flex;
                align-items: center;
                justify-content: center;
            }
            
            .toast-close:hover {
                background: rgba(0, 0, 0, 0.05);
                color: var(--color-text);
            }
            
            .toast-message {
                font-size: var(--font-size-sm);
                color: var(--color-text-light);
                line-height: 1.5;
                margin: 0;
            }
            
            .toast-actions {
                display: flex;
                gap: var(--space-xs);
                margin-top: var(--space-sm);
            }
            
            .toast-action {
                background: var(--color-primary);
                color: white;
                border: none;
                padding: var(--space-xs) var(--space-sm);
                border-radius: 4px;
                font-size: var(--font-size-xs);
                cursor: pointer;
                transition: all 0.2s ease;
            }
            
            .toast-action:hover {
                background: var(--color-secondary);
                transform: translateY(-1px);
            }
            
            .toast-action.secondary {
                background: transparent;
                color: var(--color-text-light);
                border: 1px solid var(--color-border);
            }
            
            .toast-action.secondary:hover {
                background: var(--color-surface-alt);
                border-color: var(--color-text-light);
            }
            
            .toast-progress {
                position: absolute;
                bottom: 0;
                left: 0;
                height: 3px;
                background: currentColor;
                opacity: 0.3;
                transition: width linear;
                border-radius: 0 0 8px 8px;
            }
            
            .toast-progress::after {
                content: '';
                position: absolute;
                top: 0;
                left: 0;
                height: 100%;
                width: 100%;
                background: linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent);
                animation: progress-shimmer 1.5s infinite;
            }
            
            @keyframes progress-shimmer {
                0% { transform: translateX(-100%); }
                100% { transform: translateX(100%); }
            }
            
            @media (max-width: 480px) {
                .toast-container {
                    top: 10px;
                    right: 10px;
                    left: 10px;
                    max-width: none;
                }
                
                .toast {
                    margin: 0;
                }
            }
        `;
        
        document.head.appendChild(style);
    }

    show(options) {
        const config = {
            type: 'info',
            title: '',
            message: '',
            duration: this.defaultDuration,
            actions: [],
            persistent: false,
            ...options
        };

        // Limitar número de toasts
        if (this.toasts.size >= this.maxToasts) {
            const firstToast = this.toasts.keys().next().value;
            this.hide(firstToast);
        }

        const id = this.generateId();
        const toast = this.createToast(id, config);
        
        this.container.appendChild(toast);
        this.toasts.set(id, { element: toast, config });

        // Mostrar con animación
        setTimeout(() => {
            toast.classList.add('show');
        }, 100);

        // Auto-hide si no es persistente
        if (!config.persistent && config.duration > 0) {
            this.scheduleHide(id, config.duration);
        }

        return id;
    }

    createToast(id, config) {
        const toast = document.createElement('div');
        toast.className = `toast toast-${config.type}`;
        toast.setAttribute('data-toast-id', id);
        toast.setAttribute('role', 'alert');

        const icons = {
            success: '✓',
            error: '✕',
            warning: '⚠',
            info: 'ℹ'
        };

        toast.innerHTML = `
            <div class="toast-header">
                <div class="toast-title">
                    <span class="toast-icon">${icons[config.type]}</span>
                    ${config.title || this.getDefaultTitle(config.type)}
                </div>
                <button class="toast-close" aria-label="Cerrar notificación">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <line x1="18" y1="6" x2="6" y2="18"></line>
                        <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                </button>
            </div>
            ${config.message ? `<p class="toast-message">${config.message}</p>` : ''}
            ${config.actions.length > 0 ? this.createActions(config.actions) : ''}
            ${!config.persistent && config.duration > 0 ? `<div class="toast-progress"></div>` : ''}
        `;

        // Event listeners
        const closeBtn = toast.querySelector('.toast-close');
        closeBtn.addEventListener('click', () => this.hide(id));

        // Progress bar animation
        if (!config.persistent && config.duration > 0) {
            const progress = toast.querySelector('.toast-progress');
            setTimeout(() => {
                progress.style.width = '0%';
                progress.style.transition = `width ${config.duration}ms linear`;
            }, 100);
        }

        return toast;
    }

    createActions(actions) {
        const actionsHtml = actions.map(action => {
            const className = action.style === 'secondary' ? 'toast-action secondary' : 'toast-action';
            return `<button class="${className}" data-action="${action.id}">${action.label}</button>`;
        }).join('');

        return `<div class="toast-actions">${actionsHtml}</div>`;
    }

    getDefaultTitle(type) {
        const titles = {
            success: 'Éxito',
            error: 'Error',
            warning: 'Advertencia',
            info: 'Información'
        };
        return titles[type] || 'Notificación';
    }

    hide(id) {
        const toastData = this.toasts.get(id);
        if (!toastData) return;

        const { element } = toastData;
        element.classList.add('hiding');

        setTimeout(() => {
            if (element.parentNode) {
                this.container.removeChild(element);
            }
            this.toasts.delete(id);
        }, 400);
    }

    scheduleHide(id, duration) {
        setTimeout(() => {
            this.hide(id);
        }, duration);
    }

    generateId() {
        return 'toast-' + Date.now() + '-' + Math.random().toString(36).substr(2, 9);
    }

    // Métodos de conveniencia
    success(message, options = {}) {
        return this.show({ ...options, type: 'success', message });
    }

    error(message, options = {}) {
        return this.show({ ...options, type: 'error', message });
    }

    warning(message, options = {}) {
        return this.show({ ...options, type: 'warning', message });
    }

    info(message, options = {}) {
        return this.show({ ...options, type: 'info', message });
    }

    // Limpiar todas las notificaciones
    clear() {
        this.toasts.forEach((_, id) => this.hide(id));
    }

    // Destructor para cleanup
    destroy() {
        this.clear();
        if (this.container && this.container.parentNode) {
            document.body.removeChild(this.container);
        }
        this.toasts.clear();
    }
}

// ===== INICIALIZACIÓN AUTOMÁTICA =====

let toastNotifications = null;

document.addEventListener('DOMContentLoaded', () => {
    toastNotifications = new ToastNotifications();
    
    // Exponer globalmente para uso fácil
    window.toast = toastNotifications;
    window.notify = toastNotifications; // Alias alternativo
});

// Export para módulos
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ToastNotifications;
}