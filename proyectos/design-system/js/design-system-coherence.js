/**
 * DESIGN SYSTEM COHERENCE CHECKER
 * Verificación de coherencia del design system y funcionalidad de color palette
 */

// Verificación de coherencia del design system
document.addEventListener('DOMContentLoaded', function() {
    const atomicClasses = ['grid', 'mb-', 'mt-', 'p-', 'm-', 'text-'];
    const systemComponents = ['header', 'card', 'btn', 'badge', 'alert', 'hero', 'section', 'sidebar'];
    
    // Contar uso de clases atómicas
    let atomicCount = 0;
    atomicClasses.forEach(prefix => {
        const elements = document.querySelectorAll(`[class*="${prefix}"]`);
        atomicCount += elements.length;
    });
    
    // Contar componentes del sistema
    let componentCount = 0;
    systemComponents.forEach(component => {
        const elements = document.querySelectorAll(`[class*="${component}"]`);
        componentCount += elements.length;
    });
    
    // Mostrar métricas en consola
    console.log('=== DESIGN SYSTEM COHERENCE REPORT ===');
    console.log(`✓ Clases atómicas en uso: ${atomicCount}`);
    console.log(`✓ Componentes del sistema: ${componentCount}`);
    console.log(`✓ Esta documentación usa su propio sistema: ${atomicCount + componentCount > 50 ? 'SÍ' : 'NECESITA MEJORAS'}`);
    console.log('=======================================');
    
    // ===================================
    // COLOR PALETTE COPY FUNCTIONALITY
    // ===================================
    
    // Copy to clipboard function
    function copyToClipboard(text, element) {
        navigator.clipboard.writeText(text).then(() => {
            // Visual feedback
            const originalTransform = element.style.transform;
            element.style.transform = 'scale(0.95)';
            element.style.borderColor = 'var(--color-accent-secondary)';
            
            // Show temporary notification
            const notification = document.createElement('div');
            notification.textContent = 'Copiado!';
            notification.style.cssText = `
                position: fixed;
                top: 20px;
                right: 20px;
                background: var(--color-accent-secondary);
                color: white;
                padding: var(--space-2) var(--space-4);
                border-radius: var(--border-radius-base);
                font-size: var(--text-sm);
                font-family: var(--font-mono);
                z-index: 10000;
                box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
                animation: slideInRight 0.3s ease-out;
            `;
            
            document.body.appendChild(notification);
            
            // Reset visual feedback
            setTimeout(() => {
                element.style.transform = originalTransform;
                element.style.borderColor = '';
            }, 200);
            
            // Remove notification
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 2000);
            
        }).catch(err => {
            console.error('Error copying to clipboard:', err);
        });
    }
    
    // Add click handlers to color swatches
    const colorSwatches = document.querySelectorAll('.color-swatch[data-color]');
    colorSwatches.forEach(swatch => {
        swatch.style.cursor = 'pointer';
        swatch.setAttribute('title', 'Clic para copiar variable CSS');
        
        swatch.addEventListener('click', () => {
            const colorVariable = swatch.getAttribute('data-color');
            copyToClipboard(colorVariable, swatch);
        });
        
        // Add keyboard accessibility
        swatch.setAttribute('tabindex', '0');
        swatch.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                const colorVariable = swatch.getAttribute('data-color');
                copyToClipboard(colorVariable, swatch);
            }
        });
    });
    
    // Add CSS animation for notification
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideInRight {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
    `;
    document.head.appendChild(style);
});