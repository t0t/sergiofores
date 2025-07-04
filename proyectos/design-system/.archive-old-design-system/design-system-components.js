/**
 * SERGIO FORÉS - DESIGN SYSTEM COMPONENTS
 * JavaScript functionality for interactive components
 * Siguiendo criterios de accesibilidad y usabilidad
 */

// Design System Component Manager
class DesignSystemManager {
    constructor() {
        this.components = new Map();
        this.init();
    }

    init() {
        // Initialize all components when DOM is ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.initializeComponents());
        } else {
            this.initializeComponents();
        }
    }

    initializeComponents() {
        this.initializeTabs();
        this.initializeDropdowns();
        this.initializeTooltips();
        this.initializeBackToTop();
        console.log('✅ Design System components initialized');
    }

    // Tabs Component
    initializeTabs() {
        const tabContainers = document.querySelectorAll('.tabs');
        
        tabContainers.forEach(container => {
            const buttons = container.querySelectorAll('.tabs__button');
            const panels = container.querySelectorAll('.tabs__panel');

            buttons.forEach(button => {
                button.addEventListener('click', () => {
                    const targetTab = button.getAttribute('data-tab');
                    
                    // Remove active states
                    buttons.forEach(btn => btn.classList.remove('tabs__button--active'));
                    panels.forEach(panel => panel.classList.remove('tabs__panel--active'));
                    
                    // Add active state
                    button.classList.add('tabs__button--active');
                    const targetPanel = document.getElementById(targetTab);
                    if (targetPanel) {
                        targetPanel.classList.add('tabs__panel--active');
                    }
                });

                // Keyboard navigation
                button.addEventListener('keydown', (e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        button.click();
                    }
                });
            });
        });
    }

    // Dropdown Component
    initializeDropdowns() {
        const dropdowns = document.querySelectorAll('.dropdown');
        
        dropdowns.forEach(dropdown => {
            const trigger = dropdown.querySelector('.dropdown__trigger');
            const menu = dropdown.querySelector('.dropdown__menu');
            
            if (!trigger || !menu) return;

            // Toggle dropdown on click
            trigger.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                
                // Close other dropdowns
                this.closeAllDropdowns(dropdown);
                
                // Toggle current dropdown
                dropdown.classList.toggle('dropdown--active');
                
                // Focus management
                if (dropdown.classList.contains('dropdown--active')) {
                    const firstItem = menu.querySelector('.dropdown__item');
                    if (firstItem) firstItem.focus();
                }
            });

            // Keyboard navigation
            trigger.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    trigger.click();
                } else if (e.key === 'ArrowDown') {
                    e.preventDefault();
                    if (!dropdown.classList.contains('dropdown--active')) {
                        trigger.click();
                    }
                }
            });

            // Menu item navigation
            const items = menu.querySelectorAll('.dropdown__item');
            items.forEach((item, index) => {
                item.addEventListener('keydown', (e) => {
                    if (e.key === 'ArrowDown') {
                        e.preventDefault();
                        const nextItem = items[index + 1];
                        if (nextItem) nextItem.focus();
                    } else if (e.key === 'ArrowUp') {
                        e.preventDefault();
                        const prevItem = items[index - 1] || trigger;
                        prevItem.focus();
                    } else if (e.key === 'Escape') {
                        dropdown.classList.remove('dropdown--active');
                        trigger.focus();
                    }
                });
            });
        });

        // Close dropdowns on outside click
        document.addEventListener('click', () => {
            this.closeAllDropdowns();
        });

        // Close dropdowns on escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.closeAllDropdowns();
            }
        });
    }

    closeAllDropdowns(except = null) {
        const dropdowns = document.querySelectorAll('.dropdown');
        dropdowns.forEach(dropdown => {
            if (dropdown !== except) {
                dropdown.classList.remove('dropdown--active');
            }
        });
    }

    // Tooltip Component
    initializeTooltips() {
        const tooltips = document.querySelectorAll('.tooltip');
        
        tooltips.forEach(tooltip => {
            // Ensure accessibility
            if (!tooltip.getAttribute('aria-describedby')) {
                const tooltipId = `tooltip-${Math.random().toString(36).substr(2, 9)}`;
                tooltip.setAttribute('aria-describedby', tooltipId);
            }

            // Keyboard support
            tooltip.addEventListener('focus', () => {
                tooltip.classList.add('tooltip--visible');
            });

            tooltip.addEventListener('blur', () => {
                tooltip.classList.remove('tooltip--visible');
            });
        });
    }

    // Back to Top Component
    initializeBackToTop() {
        const backToTop = document.querySelector('.back-to-top');
        if (!backToTop) return;

        // Show/hide based on scroll position
        const toggleVisibility = () => {
            if (window.scrollY > 300) {
                backToTop.classList.add('back-to-top--visible');
            } else {
                backToTop.classList.remove('back-to-top--visible');
            }
        };

        // Optimized scroll listener
        let ticking = false;
        window.addEventListener('scroll', () => {
            if (!ticking) {
                requestAnimationFrame(() => {
                    toggleVisibility();
                    ticking = false;
                });
                ticking = true;
            }
        });

        // Smooth scroll to top
        backToTop.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });

        // Keyboard support
        backToTop.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                backToTop.click();
            }
        });
    }

    // Utility: Add component
    addComponent(name, instance) {
        this.components.set(name, instance);
    }

    // Utility: Get component
    getComponent(name) {
        return this.components.get(name);
    }

    // Utility: Debug info
    getDebugInfo() {
        return {
            components: Array.from(this.components.keys()),
            activeDropdowns: document.querySelectorAll('.dropdown--active').length,
            visibleTooltips: document.querySelectorAll('.tooltip--visible').length,
            activeTabs: document.querySelectorAll('.tabs__button--active').length
        };
    }
}

// Progress Bar Animation Utility
class ProgressBarAnimator {
    static animateProgress(progressBar, targetPercent, duration = 1000) {
        const bar = progressBar.querySelector('.progress__bar');
        const label = progressBar.querySelector('.progress__label');
        
        if (!bar) return;

        let startPercent = 0;
        const startTime = performance.now();

        const animate = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            // Easing function (ease-out)
            const easeOut = 1 - Math.pow(1 - progress, 3);
            const currentPercent = startPercent + (targetPercent - startPercent) * easeOut;
            
            bar.style.width = `${currentPercent}%`;
            
            if (label) {
                label.textContent = `${Math.round(currentPercent)}%`;
            }

            if (progress < 1) {
                requestAnimationFrame(animate);
            }
        };

        requestAnimationFrame(animate);
    }
}

// SVG Icon Loader Utility
class IconLoader {
    static async loadSpriteSheet(spritePath = 'sergio-icons.svg') {
        try {
            const response = await fetch(spritePath);
            if (!response.ok) throw new Error(`HTTP ${response.status}`);
            
            const svg = await response.text();
            const div = document.createElement('div');
            div.innerHTML = svg;
            div.style.display = 'none';
            document.body.insertBefore(div, document.body.firstChild);
            
            console.log('✅ SVG sprite sheet loaded successfully');
            return true;
        } catch (error) {
            console.warn('⚠️ SVG sprite sheet could not be loaded:', error);
            return false;
        }
    }

    static updateIconReferences(spritePath = 'sergio-icons.svg') {
        const icons = document.querySelectorAll('use[href^="#icon-"]');
        icons.forEach(use => {
            const href = use.getAttribute('href');
            if (href.startsWith('#')) {
                use.setAttribute('href', `${spritePath}${href}`);
            }
        });
    }
}

// Initialize Design System
const designSystem = new DesignSystemManager();

// Load SVG icons
IconLoader.loadSpriteSheet().then(success => {
    if (success) {
        IconLoader.updateIconReferences();
    }
});

// Export for global access
window.DesignSystem = {
    manager: designSystem,
    ProgressBarAnimator,
    IconLoader
};

// Debug mode
if (window.location.search.includes('debug')) {
    window.DesignSystemDebug = () => {
        console.table(designSystem.getDebugInfo());
    };
    console.log('🔧 Debug mode enabled. Use DesignSystemDebug() to see component status.');
}