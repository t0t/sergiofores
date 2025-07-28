/**
 * HEADER BEHAVIOR
 * Manejo de scroll effects y menú móvil para el header
 */

document.addEventListener('DOMContentLoaded', function() {
    const header = document.querySelector('header[role="banner"]');
    const menuButton = document.getElementById('menu');
    let lastScrollY = window.scrollY;

    // Header scroll effect
    function handleScroll() {
        const currentScrollY = window.scrollY;
        
        // Header transparente cuando scroll < 50px, blanco cuando scroll >= 50px
        if (currentScrollY >= 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        lastScrollY = currentScrollY;
    }

    // Menu toggle para móvil
    function toggleMenu() {
        menuButton.classList.toggle('active');
        // Aquí se podría añadir lógica para mostrar/ocultar navegación móvil
    }

    // Event listeners
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    if (menuButton) {
        menuButton.addEventListener('click', toggleMenu);
    }

    // Smooth scroll para enlaces de navegación
    const navLinks = document.querySelectorAll('nav[aria-label="Navegación principal"] a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const headerHeight = header.offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Inicializar estado del header
    handleScroll();
});
