/**
 * SISTEMA AGENTES 01234 - JavaScript
 * Funcionalidad interactiva para navegación entre agentes
 * Filosofía: Transiciones suaves que reflejan la fluidez cognitiva 01234
 */

// ==========================================================================
// CONFIGURACIÓN GLOBAL
// ==========================================================================

const CONFIG = {
    // Duraciones de animación (ms)
    TRANSITION_DURATION: 300,
    FADE_DURATION: 200,
    
    // Selectores
    SELECTORS: {
        navButtons: '.agent-nav-btn',
        sections: '.agent-section',
        constellationNodes: '.agent-node',
        connectionLines: '.connection-line'
    },
    
    // Clases CSS
    CLASSES: {
        active: 'agent-section--active',
        navActive: 'agent-nav-btn--active'
    }
};

// ==========================================================================
// ESTADO GLOBAL
// ==========================================================================

let currentAgent = 'cero'; // Agente activo por defecto
let isTransitioning = false; // Prevenir múltiples transiciones simultáneas

// ==========================================================================
// NAVEGACIÓN PRINCIPAL
// ==========================================================================

/**
 * Inicializa la navegación entre agentes
 */
function initAgentNavigation() {
    const navButtons = document.querySelectorAll(CONFIG.SELECTORS.navButtons);
    
    navButtons.forEach(button => {
        button.addEventListener('click', handleAgentSwitch);
        
        // Accesibilidad: navegación por teclado
        button.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                handleAgentSwitch.call(button, e);
            }
        });
    });
    
    // Navegación por teclado global (1-5 para cambiar agentes)
    document.addEventListener('keydown', handleKeyboardNavigation);
}

/**
 * Maneja el cambio entre agentes
 */
function handleAgentSwitch(e) {
    if (isTransitioning) return;
    
    const targetAgent = e.currentTarget.dataset.target;
    
    if (targetAgent === currentAgent) return;
    
    switchToAgent(targetAgent);
}

/**
 * Cambia al agente especificado con animación
 */
async function switchToAgent(targetAgent) {
    if (isTransitioning) return;
    
    isTransitioning = true;
    
    try {
        // 1. Actualizar navegación
        updateNavigation(targetAgent);
        
        // 2. Animar constelación
        animateConstellation(targetAgent);
        
        // 3. Cambiar secciones con fade
        await transitionSections(currentAgent, targetAgent);
        
        // 4. Actualizar estado
        currentAgent = targetAgent;
        
        // 5. Scroll suave al contenido (opcional)
        scrollToContent();
        
    } catch (error) {
        console.error('Error en transición de agente:', error);
    } finally {
        isTransitioning = false;
    }
}

/**
 * Actualiza el estado visual de la navegación
 */
function updateNavigation(targetAgent) {
    const navButtons = document.querySelectorAll(CONFIG.SELECTORS.navButtons);
    
    navButtons.forEach(button => {
        const isActive = button.dataset.target === targetAgent;
        button.classList.toggle(CONFIG.CLASSES.navActive, isActive);
        button.setAttribute('aria-selected', isActive);
    });
}

/**
 * Transición entre secciones con fade effect
 */
function transitionSections(fromAgent, toAgent) {
    return new Promise((resolve) => {
        const fromSection = document.getElementById(`agent-${fromAgent}`);
        const toSection = document.getElementById(`agent-${toAgent}`);
        
        if (!fromSection || !toSection) {
            resolve();
            return;
        }
        
        // Fade out sección actual
        fromSection.style.opacity = '0';
        
        setTimeout(() => {
            // Cambiar secciones
            fromSection.classList.remove(CONFIG.CLASSES.active);
            toSection.classList.add(CONFIG.CLASSES.active);
            
            // Fade in nueva sección
            toSection.style.opacity = '0';
            toSection.offsetHeight; // Force reflow
            toSection.style.transition = `opacity ${CONFIG.FADE_DURATION}ms ease-out`;
            toSection.style.opacity = '1';
            
            // Reset transition después
            setTimeout(() => {
                toSection.style.transition = '';
                fromSection.style.opacity = '';
                resolve();
            }, CONFIG.FADE_DURATION);
            
        }, CONFIG.FADE_DURATION);
    });
}

// ==========================================================================
// ANIMACIÓN DE CONSTELACIÓN
// ==========================================================================

/**
 * Anima la constelación visual según el agente activo
 */
function animateConstellation(targetAgent) {
    const nodes = document.querySelectorAll(CONFIG.SELECTORS.constellationNodes);
    const lines = document.querySelectorAll(CONFIG.SELECTORS.connectionLines);
    
    // Reset todos los nodos
    nodes.forEach(node => {
        node.style.transform = getNodeBaseTransform(node);
        node.style.opacity = '0.7';
        node.style.boxShadow = 'none';
    });
    
    // Destacar nodo activo
    const activeNode = document.querySelector(`[data-agent="${targetAgent}"]`);
    if (activeNode) {
        const transform = getNodeBaseTransform(activeNode);
        activeNode.style.transform = `${transform} scale(1.2)`;
        activeNode.style.opacity = '1';
        activeNode.style.boxShadow = '0 8px 24px rgba(0, 0, 0, 0.2)';
    }
    
    // Animar líneas de conexión
    animateConnections(targetAgent, lines);
}

/**
 * Obtiene la transformación base de un nodo
 */
function getNodeBaseTransform(node) {
    if (node.classList.contains('agent-node--cero') || 
        node.classList.contains('agent-node--uno') || 
        node.classList.contains('agent-node--cuatro')) {
        return 'translateX(-50%)';
    }
    return '';
}

/**
 * Anima las líneas de conectividad
 */
function animateConnections(targetAgent, lines) {
    const opacityMap = {
        'cero': [0.8, 0.3, 0.3], // Destaca línea vertical principal
        'uno': [0.8, 0.8, 0.3],  // Destaca líneas de coordinación
        'dos': [0.3, 0.8, 0.8],  // Destaca líneas de análisis
        'tres': [0.3, 0.8, 0.8], // Destaca líneas de comunicación
        'cuatro': [0.8, 0.3, 0.3] // Destaca línea de materialización
    };
    
    const opacities = opacityMap[targetAgent] || [0.3, 0.3, 0.3];
    
    lines.forEach((line, index) => {
        if (index < opacities.length) {
            line.style.transition = `opacity ${CONFIG.TRANSITION_DURATION}ms ease-out`;
            line.style.opacity = opacities[index];
        }
    });
}

// ==========================================================================
// NAVEGACIÓN POR TECLADO
// ==========================================================================

/**
 * Maneja la navegación global por teclado
 */
function handleKeyboardNavigation(e) {
    // Solo activar si no estamos en un input o textarea
    if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
    
    const agentMap = {
        '1': 'cero',
        '2': 'uno', 
        '3': 'dos',
        '4': 'tres',
        '5': 'cuatro'
    };
    
    const targetAgent = agentMap[e.key];
    if (targetAgent && targetAgent !== currentAgent) {
        e.preventDefault();
        switchToAgent(targetAgent);
    }
    
    // Navegación con flechas
    if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
        e.preventDefault();
        navigateWithArrows(e.key === 'ArrowLeft' ? -1 : 1);
    }
}

/**
 * Navegación secuencial con flechas
 */
function navigateWithArrows(direction) {
    const agents = ['cero', 'uno', 'dos', 'tres', 'cuatro'];
    const currentIndex = agents.indexOf(currentAgent);
    let newIndex = currentIndex + direction;
    
    // Wrap around
    if (newIndex < 0) newIndex = agents.length - 1;
    if (newIndex >= agents.length) newIndex = 0;
    
    switchToAgent(agents[newIndex]);
}

// ==========================================================================
// UTILIDADES
// ==========================================================================

/**
 * Scroll suave al contenido principal
 */
function scrollToContent() {
    const mainContent = document.querySelector('.main-content');
    if (mainContent) {
        const headerHeight = document.querySelector('.header-main')?.offsetHeight || 0;
        const navHeight = document.querySelector('.agents-nav')?.offsetHeight || 0;
        const targetY = mainContent.offsetTop - headerHeight - navHeight;
        
        window.scrollTo({
            top: targetY,
            behavior: 'smooth'
        });
    }
}

/**
 * Detecta si el usuario prefiere reducir movimiento
 */
function prefersReducedMotion() {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/**
 * Ajusta animaciones según preferencias de accesibilidad
 */
function adjustAnimationsForAccessibility() {
    if (prefersReducedMotion()) {
        CONFIG.TRANSITION_DURATION = 0;
        CONFIG.FADE_DURATION = 0;
        
        // Deshabilitar transiciones CSS
        document.documentElement.style.setProperty('--transition-duration', '0ms');
    }
}

// ==========================================================================
// INTERACCIONES ADICIONALES
// ==========================================================================

/**
 * Inicializa interacciones de la constelación
 */
function initConstellationInteractions() {
    const nodes = document.querySelectorAll(CONFIG.SELECTORS.constellationNodes);
    
    nodes.forEach(node => {
        node.addEventListener('click', (e) => {
            const targetAgent = e.currentTarget.dataset.agent;
            if (targetAgent && targetAgent !== currentAgent) {
                switchToAgent(targetAgent);
            }
        });
        
        // Efectos hover mejorados
        node.addEventListener('mouseenter', () => {
            if (!isTransitioning) {
                node.style.transition = 'transform 200ms ease-out';
                const baseTransform = getNodeBaseTransform(node);
                node.style.transform = `${baseTransform} scale(1.1)`;
            }
        });
        
        node.addEventListener('mouseleave', () => {
            if (!isTransitioning) {
                const baseTransform = getNodeBaseTransform(node);
                node.style.transform = baseTransform;
            }
        });
    });
}

/**
 * Inicializa tooltips para nodos de constelación
 */
function initTooltips() {
    const agentNames = {
        'cero': 'CERO - Datos/Potencial',
        'uno': 'UNO - Modelo/Esencia', 
        'dos': 'DOS - Análisis/Memoria',
        'tres': 'TRES - Comunicación/Relación',
        'cuatro': 'CUATRO - Materialización/Acción'
    };
    
    const nodes = document.querySelectorAll(CONFIG.SELECTORS.constellationNodes);
    
    nodes.forEach(node => {
        const agent = node.dataset.agent;
        if (agentNames[agent]) {
            node.title = agentNames[agent];
            node.setAttribute('aria-label', agentNames[agent]);
        }
    });
}

// ==========================================================================
// INICIALIZACIÓN
// ==========================================================================

/**
 * Inicialización principal
 */
function init() {
    // Ajustar animaciones según preferencias
    adjustAnimationsForAccessibility();
    
    // Inicializar componentes
    initAgentNavigation();
    initConstellationInteractions(); 
    initTooltips();
    
    // Estado inicial
    animateConstellation(currentAgent);
    
    console.log('Sistema Agentes 01234 inicializado correctamente');
}

// ==========================================================================
// ARRANQUE
// ==========================================================================

// Inicializar cuando el DOM esté listo
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}

// Exportar funciones para uso externo (opcional)
window.SistemaAgentes01234 = {
    switchToAgent,
    getCurrentAgent: () => currentAgent,
    config: CONFIG
};