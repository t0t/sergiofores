/**
 * HIGHLIGHT SELECTION - Sistema de texto pre-seleccionado
 * ====================================================
 * 
 * Utiliza la API nativa CSS ::highlight() para crear texto que aparezca
 * seleccionado por defecto usando la propiedad CSS más rara y moderna.
 */

// Función para inicializar highlights automáticos
function initializeHighlights() {
    // Verificar soporte para la API Highlight
    if (!CSS.highlights) {
        console.log('CSS Highlights API no soportada - usando fallback CSS');
        return;
    }

    // Buscar todos los elementos con clase .dark-selection
    const elementsToHighlight = document.querySelectorAll('.dark-selection');
    
    if (elementsToHighlight.length === 0) {
        return;
    }

    // Crear ranges para cada elemento
    const ranges = [];
    
    elementsToHighlight.forEach(element => {
        const range = new Range();
        range.selectNodeContents(element);
        ranges.push(range);
    });

    // Crear y registrar el highlight personalizado
    const darkSelectionHighlight = new Highlight(...ranges);
    CSS.highlights.set('dark-selection', darkSelectionHighlight);
    
    console.log(`✅ Highlight aplicado a ${ranges.length} elementos usando CSS ::highlight()`);
}

// Inicializar cuando el DOM esté listo
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeHighlights);
} else {
    initializeHighlights();
}

// Re-inicializar si se añaden elementos dinámicamente
const observer = new MutationObserver((mutations) => {
    let shouldReinitialize = false;
    
    mutations.forEach((mutation) => {
        mutation.addedNodes.forEach((node) => {
            if (node.nodeType === Node.ELEMENT_NODE) {
                if (node.classList?.contains('dark-selection') || 
                    node.querySelector?.('.dark-selection')) {
                    shouldReinitialize = true;
                }
            }
        });
    });
    
    if (shouldReinitialize) {
        initializeHighlights();
    }
});

// Observar cambios en el DOM
observer.observe(document.body, {
    childList: true,
    subtree: true
});
