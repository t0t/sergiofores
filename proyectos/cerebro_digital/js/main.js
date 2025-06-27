// CEREBRO-DIGITAL - Script principal
// Sistema de interactividad basado en filosofía 01234

document.addEventListener('DOMContentLoaded', function() {
    initializeSystem();
});

function initializeSystem() {
    // Nivel 0: Inicialización del campo cuántico
    console.log('🧠 CEREBRO-DIGITAL - Inicializando sistema cognitivo...');
    
    // Nivel 1: Determinación de funcionalidades esenciales
    initNavigation();
    initBrainNetwork();
    initFlowVisualization();
    initScrollEffects();
    
    // Nivel 2: Refinamiento de interacciones
    addAdvancedInteractions();
    
    // Nivel 3: Relacionamiento entre elementos
    createSemanticConnections();
    
    // Nivel 4: Materialización completa
    console.log('✅ Sistema CEREBRO-DIGITAL completamente operativo');
}

// Nivel 1: Navegación suave
function initNavigation() {
    const navLinks = document.querySelectorAll('.nav__link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Nivel 1: Red neuronal del cerebro
function initBrainNetwork() {
    const nodes = document.querySelectorAll('.node');
    const connections = document.querySelectorAll('.connection');
    
    // Animación de activación neuronal
    setInterval(() => {
        const randomNode = nodes[Math.floor(Math.random() * nodes.length)];
        randomNode.style.transform = 'scale(1.2)';
        
        setTimeout(() => {
            randomNode.style.transform = 'scale(1)';
        }, 500);
        
        // Activar conexión correspondiente
        const randomConnection = connections[Math.floor(Math.random() * connections.length)];
        randomConnection.style.stroke = getComputedStyle(document.documentElement).getPropertyValue('--color-primary');
        
        setTimeout(() => {
            randomConnection.style.stroke = getComputedStyle(document.documentElement).getPropertyValue('--color-border');
        }, 1000);
        
    }, 3000);
}

// Nivel 2: Visualización del flujo cognitivo
function initFlowVisualization() {
    const flowLevels = document.querySelectorAll('.flow-level');
    
    // Observador de intersección para activar animaciones
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                
                // Activar secuencialmente
                const levelIndex = Array.from(flowLevels).indexOf(entry.target);
                setTimeout(() => {
                    entry.target.classList.add('active');
                }, levelIndex * 200);
            }
        });
    }, {
        threshold: 0.1
    });
    
    flowLevels.forEach(level => {
        level.style.opacity = '0';
        level.style.transform = 'translateY(20px)';
        level.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
        observer.observe(level);
    });
}

// Nivel 2: Efectos de scroll
function initScrollEffects() {
    const sections = document.querySelectorAll('.section');
    
    const scrollObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('section-visible');
                
                // Efectos específicos por sección
                const sectionId = entry.target.getAttribute('id');
                handleSectionEffects(sectionId);
            }
        });
    }, {
        threshold: 0.2
    });
    
    sections.forEach(section => {
        scrollObserver.observe(section);
    });
}

// Nivel 3: Efectos específicos por sección
function handleSectionEffects(sectionId) {
    switch(sectionId) {
        case 'sistema':
            animateArchitecture();
            break;
        case 'boveda':
            animateVaultStructure();
            break;
        case 'herramientas':
            animateToolsGrid();
            break;
    }
}

// Nivel 3: Animación de arquitectura
function animateArchitecture() {
    const archComponents = document.querySelectorAll('.arch-component');
    
    archComponents.forEach((component, index) => {
        setTimeout(() => {
            component.style.opacity = '1';
            component.style.transform = 'translateY(0) scale(1)';
        }, index * 150);
    });
}

// Nivel 3: Animación de estructura de bóveda
function animateVaultStructure() {
    const vaultItems = document.querySelectorAll('.vault-item');
    
    vaultItems.forEach((item, index) => {
        setTimeout(() => {
            item.style.opacity = '1';
            item.style.transform = 'translateX(0)';
        }, index * 100);
    });
}

// Nivel 3: Animación de herramientas
function animateToolsGrid() {
    const toolCategories = document.querySelectorAll('.tool-category');
    
    toolCategories.forEach((category, index) => {
        setTimeout(() => {
            category.style.opacity = '1';
            category.style.transform = 'scale(1)';
            
            // Animar herramientas individuales
            const toolItems = category.querySelectorAll('.tool-item');
            toolItems.forEach((tool, toolIndex) => {
                setTimeout(() => {
                    tool.style.opacity = '1';
                    tool.style.transform = 'scale(1)';
                }, toolIndex * 50);
            });
        }, index * 200);
    });
}

// Nivel 2: Interacciones avanzadas
function addAdvancedInteractions() {
    // Hover efectos en componentes de arquitectura
    const archComponents = document.querySelectorAll('.arch-component');
    archComponents.forEach(component => {
        component.style.opacity = '0.8';
        component.style.transform = 'translateY(10px) scale(0.95)';
        component.style.transition = 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)';
        
        component.addEventListener('mouseenter', function() {
            this.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.2)';
        });
        
        component.addEventListener('mouseleave', function() {
            this.style.boxShadow = getComputedStyle(document.documentElement).getPropertyValue('--shadow');
        });
    });
    
    // Efectos en elementos de bóveda
    const vaultItems = document.querySelectorAll('.vault-item');
    vaultItems.forEach(item => {
        item.style.opacity = '0.9';
        item.style.transform = 'translateX(-10px)';
        item.style.transition = 'all 0.3s ease';
    });
    
    // Efectos en herramientas
    const toolCategories = document.querySelectorAll('.tool-category');
    const toolItems = document.querySelectorAll('.tool-item');
    
    toolCategories.forEach(category => {
        category.style.opacity = '0.9';
        category.style.transform = 'scale(0.95)';
        category.style.transition = 'all 0.3s ease';
    });
    
    toolItems.forEach(tool => {
        tool.style.opacity = '0.8';
        tool.style.transform = 'scale(0.9)';
        tool.style.transition = 'all 0.2s ease';
    });
}

// Nivel 3: Conexiones semánticas
function createSemanticConnections() {
    // Crear conexiones visuales entre elementos relacionados
    const flowLevels = document.querySelectorAll('.flow-level');
    
    flowLevels.forEach((level, index) => {
        level.addEventListener('mouseenter', function() {
            // Resaltar elementos relacionados en otras secciones
            highlightRelatedElements(index);
        });
        
        level.addEventListener('mouseleave', function() {
            clearHighlights();
        });
    });
}

// Nivel 3: Resaltar elementos relacionados
function highlightRelatedElements(levelIndex) {
    const levelColors = [
        'var(--color-0)',
        'var(--color-1)', 
        'var(--color-2)',
        'var(--color-3)',
        'var(--color-4)'
    ];
    
    // Cambiar color de elementos relacionados
    document.documentElement.style.setProperty('--active-level-color', levelColors[levelIndex]);
    
    // Aplicar clase de activación
    document.body.classList.add(`level-${levelIndex}-active`);
}

// Nivel 3: Limpiar resaltados
function clearHighlights() {
    document.body.className = document.body.className.replace(/level-\d-active/g, '');
}

// Nivel 4: Funciones de utilidad y optimización
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Nivel 4: Optimización de rendimiento
function optimizePerformance() {
    // Lazy loading para imágenes futuras
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });
    }
    
    // Preconnect a dominios externos
    const preconnectDomains = [
        'https://fonts.googleapis.com',
        'https://fonts.gstatic.com'
    ];
    
    preconnectDomains.forEach(domain => {
        const link = document.createElement('link');
        link.rel = 'preconnect';
        link.href = domain;
        document.head.appendChild(link);
    });
}

// Nivel 0: Easter egg - Código Konami para desarrolladores
let konamiCode = [];
const konamiSequence = [
    'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
    'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
    'KeyB', 'KeyA'
];

document.addEventListener('keydown', function(e) {
    konamiCode.push(e.code);
    
    if (konamiCode.length > konamiSequence.length) {
        konamiCode.shift();
    }
    
    if (konamiCode.join(',') === konamiSequence.join(',')) {
        activateDevMode();
    }
});

function activateDevMode() {
    console.log('🎯 MODO DESARROLLADOR ACTIVADO');
    console.log('🔬 Sistema 01234 - Análisis cognitivo completo');
    console.log('📊 Métricas del sistema:', {
        niveles: 5,
        conexiones: 'infinitas',
        estado: 'operativo',
        filosofia: '01234',
        creador: 'Sergio Forés'
    });
    
    // Activar visualización de debug
    document.body.classList.add('debug-mode');
    
    // Mostrar estructura interna
    const debugInfo = document.createElement('div');
    debugInfo.innerHTML = `
        <div style="position: fixed; top: 10px; right: 10px; background: rgba(0,0,0,0.8); color: white; padding: 10px; border-radius: 5px; font-family: monospace; z-index: 9999;">
            <strong>🧠 CEREBRO-DIGITAL DEBUG</strong><br>
            Nivel Cognitivo: TODOS<br>
            Estado: OPERATIVO<br>
            Filosofía: 01234<br>
            Conexiones: ACTIVAS
        </div>
    `;
    document.body.appendChild(debugInfo);
}