/**
 * CURSOR PERSONALIZADO - SISTEMA 01234
 * Cursor personalizado con círculo amarillo y efectos interactivos
 */

class CustomCursor {
    constructor() {
        this.cursor = null;
        
        this.init();
    }
    
    init() {
        // Crear elemento del cursor
        this.cursor = document.createElement('div');
        this.cursor.className = 'custom-cursor';
        document.body.appendChild(this.cursor);
        
        // Event listeners
        document.addEventListener('mousemove', (e) => this.updatePosition(e));
        
        // Hover states para elementos interactivos
        const interactiveElements = document.querySelectorAll('a, button, .card, [role="button"]');
        
        interactiveElements.forEach(el => {
            el.addEventListener('mouseenter', () => {
                // Verificar si el elemento está en la sección 01234
                const is01234Section = el.closest('#sistema01234');
                this.setHoverState(true, is01234Section);
            });
            el.addEventListener('mouseleave', () => this.setHoverState(false));
        });
        
    }
    
    
    setHoverState(isHovering, is01234Section = false) {
        if (isHovering) {
            if (is01234Section) {
                this.cursor.classList.add('hover-01234');
                this.cursor.classList.remove('hover');
            } else {
                this.cursor.classList.add('hover');
                this.cursor.classList.remove('hover-01234');
            }
        } else {
            this.cursor.classList.remove('hover', 'hover-01234');
        }
    }
    
    updatePosition(e) {
        this.cursor.style.transform = `translate3d(${e.clientX - 15}px, ${e.clientY - 15}px, 0)`;
    }
}

// Inicializar cursor cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    // Solo inicializar en desktop
    if (window.innerWidth > 768) {
        new CustomCursor();
    }
});

// Recargar cursor en resize si se cambia a desktop
window.addEventListener('resize', () => {
    const existingCursor = document.querySelector('.custom-cursor');
    if (window.innerWidth > 768 && !existingCursor) {
        new CustomCursor();
    } else if (window.innerWidth <= 768 && existingCursor) {
        // Remover cursor en móvil
        document.documentElement.style.cursor = 'auto';
        existingCursor.remove();
    }
});
