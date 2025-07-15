/**
 * THEME SWITCHER - SISTEMA DE COLORES GENÉRICO
 * 
 * Funcionalidad para cambiar temas usando el sistema de tokens de color.
 * Compatible con el sistema de colores genérico del boilerplate.
 */

class ThemeSwitcher {
    constructor() {
        this.currentTheme = this.getStoredTheme() || 'light';
        this.themes = ['light', 'dark']; // Solo 2 temas para dark mode switcher
        
        this.init();
    }

    /**
     * Inicializar el switcher de temas
     */
    init() {
        // Aplicar tema almacenado
        this.applyTheme(this.currentTheme);
        
        // Crear botón de cambio de tema si no existe
        this.createThemeSwitcher();
        
        // Escuchar cambios del sistema
        this.watchSystemTheme();
        
        console.log(`🎨 Theme Switcher initialized. Current theme: ${this.currentTheme}`);
    }

    /**
     * Aplicar tema al documento
     */
    applyTheme(theme) {
        const html = document.documentElement;
        
        // Remover temas existentes
        this.themes.forEach(t => {
            html.removeAttribute(`data-theme-${t}`);
        });
        
        // Aplicar nuevo tema
        if (theme !== 'light') {
            html.setAttribute('data-theme', theme);
            console.log(`🎨 DARK MODE ACTIVATED: data-theme="${theme}" applied to <html>`);
        } else {
            html.removeAttribute('data-theme');
            console.log(`🎨 LIGHT MODE ACTIVATED: data-theme removed from <html>`);
        }
        
        this.currentTheme = theme;
        this.storeTheme(theme);
        
        // Actualizar label del botón
        this.updateSwitcherLabel();
        
        // Disparar evento personalizado
        this.dispatchThemeEvent(theme);
    }

    /**
     * Cambiar al siguiente tema (toggle entre light/dark)
     */
    nextTheme() {
        const nextTheme = this.currentTheme === 'light' ? 'dark' : 'light';
        console.log(`🎨 THEME TOGGLE: ${this.currentTheme} → ${nextTheme}`);
        this.applyTheme(nextTheme);
    }

    /**
     * Cambiar a tema específico
     */
    setTheme(theme) {
        if (this.themes.includes(theme)) {
            this.applyTheme(theme);
        } else {
            console.warn(`Theme "${theme}" not available. Available themes:`, this.themes);
        }
    }

    /**
     * Obtener tema almacenado
     */
    getStoredTheme() {
        try {
            return localStorage.getItem('theme');
        } catch (e) {
            return null;
        }
    }

    /**
     * Almacenar tema
     */
    storeTheme(theme) {
        try {
            localStorage.setItem('theme', theme);
        } catch (e) {
            console.warn('Could not store theme preference');
        }
    }

    /**
     * Crear botón de cambio de tema
     */
    createThemeSwitcher() {
        // Buscar botón existente en el header primero
        let btn = document.querySelector('.theme-switcher--header .theme-switcher__btn');
        
        if (btn) {
            // Usar botón existente del header
            console.log('🎨 Using existing theme switcher in header');
        } else {
            // Buscar contenedor existente
            let container = document.querySelector('.theme-switcher');
            
            if (!container) {
                // Crear contenedor como fallback
                container = document.createElement('div');
                container.className = 'theme-switcher';
                container.innerHTML = `
                    <button class="theme-switcher__btn" aria-label="Cambiar tema" title="Cambiar tema">
                        <svg class="theme-switcher__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <circle cx="12" cy="12" r="5"/>
                            <line x1="12" y1="1" x2="12" y2="3"/>
                            <line x1="12" y1="21" x2="12" y2="23"/>
                            <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
                            <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
                            <line x1="1" y1="12" x2="3" y2="12"/>
                            <line x1="21" y1="12" x2="23" y2="12"/>
                            <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/>
                            <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
                        </svg>
                        <span class="theme-switcher__label">${this.getThemeLabel(this.currentTheme)}</span>
                    </button>
                `;
                
                // Añadir estilos básicos (solo para fallback)
                this.addSwitcherStyles();
                
                // Insertar en el footer como fallback
                const footer = document.querySelector('.footer__bottom');
                if (footer) {
                    const footerThemeContainer = document.createElement('div');
                    footerThemeContainer.className = 'footer__theme-switcher';
                    footerThemeContainer.appendChild(container);
                    footer.appendChild(footerThemeContainer);
                } else {
                    document.body.appendChild(container);
                }
            }
            
            btn = container.querySelector('.theme-switcher__btn');
        }
        
        // Añadir evento al botón (header o fallback)
        if (btn) {
            btn.addEventListener('click', () => this.nextTheme());
        }
        
        // Actualizar label
        this.updateSwitcherLabel();
    }

    /**
     * Obtener label del tema
     */
    getThemeLabel(theme) {
        const labels = {
            light: 'Claro',
            dark: 'Oscuro',
            blue: 'Azul',
            green: 'Verde'
        };
        return labels[theme] || theme;
    }

    /**
     * Actualizar label e icono del switcher
     */
    updateSwitcherLabel() {
        // Buscar elementos en header primero, luego fallback
        const label = document.querySelector('.theme-switcher--header .theme-switcher__label') || 
                     document.querySelector('.theme-switcher__label');
        
        const sunIcon = document.querySelector('.theme-switcher--header .theme-switcher__icon--sun') || 
                       document.querySelector('.theme-switcher__icon--sun');
        
        const moonIcon = document.querySelector('.theme-switcher--header .theme-switcher__icon--moon') || 
                        document.querySelector('.theme-switcher__icon--moon');
        
        const btn = document.querySelector('.theme-switcher--header .theme-switcher__btn') || 
                   document.querySelector('.theme-switcher__btn');
        
        if (label) {
            label.textContent = this.getThemeLabel(this.currentTheme);
        }
        
        // Actualizar iconos y aria-label
        if (this.currentTheme === 'dark') {
            // Modo oscuro activo: mostrar luna, preparar para cambiar a claro
            if (sunIcon) sunIcon.style.display = 'none';
            if (moonIcon) moonIcon.style.display = 'block';
            if (btn) {
                btn.setAttribute('aria-label', 'Cambiar a modo claro');
                btn.setAttribute('title', 'Cambiar a modo claro');
            }
        } else {
            // Modo claro activo: mostrar sol, preparar para cambiar a oscuro
            if (sunIcon) sunIcon.style.display = 'block';
            if (moonIcon) moonIcon.style.display = 'none';
            if (btn) {
                btn.setAttribute('aria-label', 'Cambiar a modo oscuro');
                btn.setAttribute('title', 'Cambiar a modo oscuro');
            }
        }
        
        console.log(`🎨 Switcher updated: ${this.getThemeLabel(this.currentTheme)} theme active`);
    }

    /**
     * Añadir estilos básicos del switcher
     */
    addSwitcherStyles() {
        if (document.querySelector('#theme-switcher-styles')) return;
        
        const style = document.createElement('style');
        style.id = 'theme-switcher-styles';
        style.textContent = `
            .theme-switcher {
                position: fixed;
                top: 20px;
                right: 20px;
                z-index: 1000;
            }
            
            .theme-switcher__btn {
                display: flex;
                align-items: center;
                gap: 8px;
                padding: 8px 12px;
                background-color: var(--bg-surface);
                border: 1px solid var(--border-primary);
                border-radius: 6px;
                color: var(--text-primary);
                cursor: pointer;
                transition: all 0.2s ease;
                font-family: inherit;
                font-size: 14px;
            }
            
            .theme-switcher__btn:hover {
                background-color: var(--bg-tertiary);
                border-color: var(--border-focus);
            }
            
            .theme-switcher__icon {
                width: 16px;
                height: 16px;
            }
            
            .theme-switcher__label {
                font-weight: 500;
            }
            
            @media (max-width: 768px) {
                .theme-switcher {
                    top: 10px;
                    right: 10px;
                }
                
                .theme-switcher__btn {
                    padding: 6px 8px;
                    font-size: 12px;
                }
                
                .theme-switcher__icon {
                    width: 14px;
                    height: 14px;
                }
            }
        `;
        
        document.head.appendChild(style);
    }

    /**
     * Escuchar cambios del tema del sistema
     */
    watchSystemTheme() {
        if (window.matchMedia) {
            const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
            
            mediaQuery.addListener((e) => {
                // Solo aplicar si no hay preferencia manual
                if (!this.getStoredTheme()) {
                    this.applyTheme(e.matches ? 'dark' : 'light');
                }
            });
        }
    }

    /**
     * Disparar evento de cambio de tema
     */
    dispatchThemeEvent(theme) {
        const event = new CustomEvent('themeChanged', {
            detail: { theme, previousTheme: this.currentTheme }
        });
        
        document.dispatchEvent(event);
    }

    /**
     * Obtener tema actual
     */
    getCurrentTheme() {
        return this.currentTheme;
    }

    /**
     * Obtener temas disponibles
     */
    getAvailableThemes() {
        return [...this.themes];
    }
}

// Inicializar automáticamente CON SEGURIDAD ANTI-CONFLICTOS
let themeSwitcher;

document.addEventListener('DOMContentLoaded', function() {
    // Esperar a que otros scripts se inicialicen primero
    setTimeout(() => {
        themeSwitcher = new ThemeSwitcher();
        
        // Hacer disponible globalmente
        window.themeSwitcher = themeSwitcher;
        
        console.log('🎨 Theme Switcher initialized safely');
    }, 500); // Delay para evitar conflictos con navegación
});

// Escuchar eventos de cambio de tema
document.addEventListener('themeChanged', function(e) {
    console.log(`🎨 Theme changed to: ${e.detail.theme}`);
});

// Exportar para módulos
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ThemeSwitcher;
}