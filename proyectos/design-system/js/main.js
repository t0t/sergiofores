// SERGIO FORÉS - DESIGN SYSTEM MAIN JAVASCRIPT

// Load External SVG Sprite for better maintainability
function loadSvgSprite(url) {
    // Check if we're in a local file:// environment
    if (window.location.protocol === 'file:') {
        console.log('Local file environment detected. SVG sprite loading skipped.');
        return;
    }
    
    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP ${response.status}: ${response.statusText}`);
            }
            return response.text();
        })
        .then(svg => {
            const div = document.createElement('div');
            div.innerHTML = svg;
            div.style.display = 'none';
            document.body.insertBefore(div, document.body.firstChild);
            console.log('SVG sprite loaded successfully');
        })
        .catch(error => console.warn('SVG icons could not be loaded:', error));
}

// Back to top functionality
function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Show/hide back to top button
window.addEventListener('scroll', function() {
    const backToTop = document.querySelector('.back-to-top');
    if (backToTop) {
        if (window.scrollY > 300) {
            backToTop.classList.add('back-to-top--visible');
        } else {
            backToTop.classList.remove('back-to-top--visible');
        }
    }
});

// Initialize on DOM ready
document.addEventListener('DOMContentLoaded', function() {
    // SVG sprite loading (only for server environments)
    if (window.location.protocol !== 'file:') {
        loadSvgSprite('assets/sergio-icons.svg');
    }

    // Legacy menu toggle (mantener por compatibilidad)
    const legacyMenuToggle = document.querySelector('.header__menu-toggle');
    const legacyMainNavList = document.getElementById('main-nav-list');

    if (legacyMenuToggle && legacyMainNavList) {
        legacyMenuToggle.addEventListener('click', function() {
            legacyMainNavList.classList.toggle('is-open');
            this.setAttribute('aria-expanded', legacyMainNavList.classList.contains('is-open'));
        });
    }

    // NEW: PageHeader + Menu BEM toggle functionality
    const menuToggle = document.querySelector('.menu__toggle');
    const menu = document.querySelector('.menu--mobile-toggle');

    if (menuToggle && menu) {
        menuToggle.addEventListener('click', function() {
            const isOpen = menu.classList.contains('menu--open');
            
            // Toggle menu state
            menu.classList.toggle('menu--open');
            
            // Update aria-expanded
            this.setAttribute('aria-expanded', !isOpen);
            
            // Update icon if needed (optional)
            const icon = this.querySelector('.menu__icon');
            if (icon) {
                icon.style.transform = !isOpen ? 'rotate(90deg)' : 'rotate(0deg)';
            }
            
            console.log('Menu toggled:', !isOpen ? 'open' : 'closed');
        });

        // Close menu when clicking outside
        document.addEventListener('click', function(event) {
            if (!menu.contains(event.target) && menu.classList.contains('menu--open')) {
                menu.classList.remove('menu--open');
                menuToggle.setAttribute('aria-expanded', 'false');
                const icon = menuToggle.querySelector('.menu__icon');
                if (icon) {
                    icon.style.transform = 'rotate(0deg)';
                }
            }
        });

        // Close menu on escape key
        document.addEventListener('keydown', function(event) {
            if (event.key === 'Escape' && menu.classList.contains('menu--open')) {
                menu.classList.remove('menu--open');
                menuToggle.setAttribute('aria-expanded', 'false');
                menuToggle.focus(); // Return focus to toggle button
                const icon = menuToggle.querySelector('.menu__icon');
                if (icon) {
                    icon.style.transform = 'rotate(0deg)';
                }
            }
        });
    }

    console.log('Design System initialized successfully');
});