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
        loadSvgSprite('sergio-icons.svg');
    }

    const menuToggle = document.querySelector('.header__menu-toggle');
    const mainNavList = document.getElementById('main-nav-list');

    if (menuToggle && mainNavList) {
        menuToggle.addEventListener('click', function() {
            mainNavList.classList.toggle('is-open');
            this.setAttribute('aria-expanded', mainNavList.classList.contains('is-open'));
        });
    }

    console.log('Design System initialized successfully');
});