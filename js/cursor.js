// Cursor personalizado elegante
class CustomCursor {
    constructor() {
        this.cursor = null;
        this.cursorDot = null;
        this.mouseX = 0;
        this.mouseY = 0;
        this.cursorX = 0;
        this.cursorY = 0;
        this.dotX = 0;
        this.dotY = 0;
        
        this.init();
    }
    
    init() {
        // Crear elementos del cursor
        this.cursor = document.createElement('div');
        this.cursor.className = 'custom-cursor';
        document.body.appendChild(this.cursor);
        
        this.cursorDot = document.createElement('div');
        this.cursorDot.className = 'custom-cursor-dot';
        document.body.appendChild(this.cursorDot);
        
        // Event listeners
        document.addEventListener('mousemove', (e) => this.updatePosition(e));
        
        // Hover states para elementos interactivos
        const interactiveElements = document.querySelectorAll('a, button, .project-card, [role="button"]');
        
        interactiveElements.forEach(el => {
            el.addEventListener('mouseenter', () => {
                // Verificar si el enlace está en la sección 01234
                const is01234Section = el.closest('#sistema01234');
                this.setHoverState(true, is01234Section);
            });
            el.addEventListener('mouseleave', () => this.setHoverState(false));
        });
        
        // Iniciar animación
        this.animate();
    }
    
    updatePosition(e) {
        this.mouseX = e.clientX;
        this.mouseY = e.clientY;
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
            this.cursorDot.classList.add('hover');
        } else {
            this.cursor.classList.remove('hover', 'hover-01234');
            this.cursorDot.classList.remove('hover');
        }
    }
    
    animate() {
        // Animación suave con diferentes velocidades
        this.cursorX += (this.mouseX - this.cursorX) * 0.1;
        this.cursorY += (this.mouseY - this.cursorY) * 0.1;
        
        this.dotX += (this.mouseX - this.dotX) * 0.8;
        this.dotY += (this.mouseY - this.dotY) * 0.8;
        
        // Aplicar transformaciones
        this.cursor.style.transform = `translate(${this.cursorX - 10}px, ${this.cursorY - 10}px)`;
        this.cursorDot.style.transform = `translate(${this.dotX - 2}px, ${this.dotY - 2}px)`;
        
        requestAnimationFrame(() => this.animate());
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
        document.querySelector('.custom-cursor-dot')?.remove();
    }
});