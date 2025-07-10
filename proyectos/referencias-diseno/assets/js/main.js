/**
 * Referencias de Diseño - JavaScript Principal
 * Funcionalidades: filtrado, lazy loading, smooth scroll
 */

document.addEventListener('DOMContentLoaded', function() {
    
    // Filtrado sofisticado
    document.querySelectorAll('.nav-filter').forEach(filter => {
        filter.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Update active state
            document.querySelectorAll('.nav-filter').forEach(f => f.classList.remove('active'));
            filter.classList.add('active');
            
            // Filter cards
            const category = filter.dataset.filter;
            const cards = document.querySelectorAll('.reference-card');
            
            cards.forEach(card => {
                const cardCategories = card.dataset.category || '';
                const shouldShow = category === 'all' || cardCategories.includes(category);
                
                if (shouldShow) {
                    card.style.display = 'block';
                    card.style.opacity = '1';
                } else {
                    card.style.opacity = '0';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 200);
                }
            });
        });
    });

    // Lazy loading elegante
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.style.opacity = '1';
                    imageObserver.unobserve(img);
                }
            });
        });

        document.querySelectorAll('.reference-image').forEach(img => {
            img.style.opacity = '0';
            img.style.transition = 'opacity 0.3s ease';
            imageObserver.observe(img);
        });
    }

    // Smooth scroll behavior
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

});