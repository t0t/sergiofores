// SERGIO FORÉS - DESIGN SYSTEM MAIN JAVASCRIPT

// Load External SVG Sprite for better maintainability
function loadSvgSprite(url) {
    fetch(url)
        .then(response => response.text())
        .then(svg => {
            const div = document.createElement('div');
            div.innerHTML = svg;
            div.style.display = 'none';
            document.body.insertBefore(div, document.body.firstChild);
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
    loadSvgSprite('sergio-icons.svg');

    const menuToggle = document.querySelector('.header__menu-toggle');
    const mainNavList = document.getElementById('main-nav-list');

    if (menuToggle && mainNavList) {
        menuToggle.addEventListener('click', function() {
            mainNavList.classList.toggle('is-open');
            this.setAttribute('aria-expanded', mainNavList.classList.contains('is-open'));
        });
    }
});