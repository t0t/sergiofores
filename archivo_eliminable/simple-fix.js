/**
 * SIMPLE PRODUCTION FIX - No Blur Lazy Loading
 * Removes all blur effects and ensures images load clearly
 */

// Wait for DOM to be ready
document.addEventListener('DOMContentLoaded', function() {
    
    // Remove blur from all images immediately
    const allImages = document.querySelectorAll('img');
    
    allImages.forEach((img, index) => {
        // Force remove any blur or filters
        img.style.filter = 'none !important';
        img.style.transition = 'none';
        img.classList.remove('lazy-loading');
        
        // Remove loading="lazy" attribute that might be causing issues
        img.removeAttribute('loading');
        
    });
    
    // Also remove blur from CSS
    const style = document.createElement('style');
    style.textContent = `
        img {
            filter: none !important;
            opacity: 1 !important;
        }
        .project-screenshot img {
            filter: none !important;
            opacity: 1 !important;
        }
    `;
    document.head.appendChild(style);
    
});