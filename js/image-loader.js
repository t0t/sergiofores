/**
 * IMAGE LOADER - Stop shimmer when images load
 * Adds 'loaded' class to images when they finish loading
 * This stops the shimmer animation via CSS selector
 */

document.addEventListener('DOMContentLoaded', function() {
    const images = document.querySelectorAll('.project-screenshot img');
    let loadedCount = 0;
    
    images.forEach((img, index) => {
        // Check if image is already loaded (cached)
        if (img.complete && img.naturalHeight > 0) {
            img.classList.add('loaded');
            
            // Also mark the container as image-loaded
            const container = img.closest('.project-screenshot');
            if (container) {
                container.classList.add('image-loaded');
            }
            
            loadedCount++;
        } else {
            // Listen for load event
            img.addEventListener('load', function() {
                this.classList.add('loaded');
                
                // Also mark the container as image-loaded (for browser compatibility)
                const container = this.closest('.project-screenshot');
                if (container) {
                    container.classList.add('image-loaded');
                }
                
                loadedCount++;
            });
            
            // Handle load errors
            img.addEventListener('error', function() {
                this.classList.add('loaded', 'error');
                loadedCount++;
                // Image failed to load - continue silently
            });
        }
    });
    
    // Initial state check complete
});