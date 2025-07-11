// Script temporal para forzar visibilidad de proyectos
console.log('Force visibility script loaded');

const forceProjectsVisible = () => {
    console.log('Forcing projects visible...');
    
    // Forzar visibilidad de secciones
    const sections = document.querySelectorAll('section');
    sections.forEach((section, index) => {
        section.style.opacity = '1 !important';
        section.style.visibility = 'visible !important';
        section.style.display = 'block !important';
        section.style.transform = 'none !important';
        section.style.filter = 'none !important';
        console.log(`Section ${index} forced visible:`, section.id);
    });
    
    // Forzar visibilidad específica del grid de proyectos
    const projectsGrids = document.querySelectorAll('.projects-grid');
    projectsGrids.forEach((grid, index) => {
        grid.style.opacity = '1 !important';
        grid.style.visibility = 'visible !important';
        grid.style.display = 'grid !important';
        grid.style.transform = 'none !important';
        grid.style.filter = 'none !important';
        console.log(`Projects grid ${index} forced visible`);
    });
    
    // Forzar visibilidad de las cards individuales
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach((card, index) => {
        // PROBLEMA ENCONTRADO: Las cards tienen opacity: 0 por defecto y solo se ven con .in-view
        card.style.opacity = '1 !important';
        card.style.visibility = 'visible !important';
        card.style.display = 'block !important';
        card.style.transform = 'translateY(0) !important';
        card.style.filter = 'none !important';
        card.style.background = 'white !important';
        card.style.border = '1px solid #ccc !important';
        card.classList.add('in-view'); // Añadir la clase que las hace visibles
        console.log(`Project card ${index} forced visible with in-view class`);
        
        // Forzar visibilidad de las imágenes dentro de las cards
        const images = card.querySelectorAll('img');
        images.forEach((img, imgIndex) => {
            img.style.opacity = '1 !important';
            img.style.visibility = 'visible !important';
            img.style.display = 'block !important';
            img.style.width = '100% !important';
            img.style.height = '250px !important';
            img.style.objectFit = 'cover !important';
            console.log(`Image ${imgIndex} in card ${index} forced visible`);
        });
        
        // Ocultar el contenido overlay para que se vean las imágenes
        const projectContent = card.querySelector('.project-content');
        if (projectContent) {
            projectContent.style.opacity = '0 !important';
            projectContent.style.visibility = 'hidden !important';
            console.log(`Project content in card ${index} hidden to show images`);
        }
        
        // Forzar visibilidad del screenshot container (sin sobrescribir background para placeholders)
        const screenshot = card.querySelector('.project-screenshot');
        if (screenshot) {
            screenshot.style.opacity = '1 !important';
            screenshot.style.visibility = 'visible !important';
            screenshot.style.display = 'block !important';
            // NO sobrescribir background para permitir placeholders
            console.log(`Screenshot container in card ${index} forced visible`);
        }
    });
    
    // Forzar header
    const header = document.querySelector('.header');
    if (header) {
        header.style.opacity = '1 !important';
        header.style.visibility = 'visible !important';
        header.style.transform = 'none !important';
        console.log('Header forced visible');
    }
    
    console.log('Force visibility complete');
};

// Ejecutar inmediatamente
forceProjectsVisible();

// Ejecutar cuando DOM esté listo
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', forceProjectsVisible);
} else {
    forceProjectsVisible();
}

// Ejecutar después de un delay
setTimeout(forceProjectsVisible, 100);
setTimeout(forceProjectsVisible, 500);
setTimeout(forceProjectsVisible, 1000);

// Ejecutar cuando se dispare loadingComplete
document.addEventListener('loadingComplete', forceProjectsVisible);