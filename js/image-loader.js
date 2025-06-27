/**
 * IMAGE LOADER - Stop shimmer when images load
 * Adds 'loaded' class to images when they finish loading
 * This stops the shimmer animation via CSS selector
 */

document.addEventListener('DOMContentLoaded', function() {
    console.log('🖼️ Image Loader - Detecting image load states');
    
    const images = document.querySelectorAll('.project-screenshot img');
    let loadedCount = 0;
    
    console.log(`Found ${images.length} images to monitor`);
    
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
            console.log(`✅ Image ${index + 1} already loaded: ${img.alt}`);
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
                console.log(`✅ Image ${index + 1} loaded: ${this.alt} (${loadedCount}/${images.length})`);
                
                // All images loaded
                if (loadedCount === images.length) {
                    console.log('🎉 All images loaded - shimmer animations stopped');
                }
            });
            
            // Handle load errors
            img.addEventListener('error', function() {
                this.classList.add('loaded', 'error');
                loadedCount++;
                console.warn(`❌ Image ${index + 1} failed to load: ${this.src}`);
            });
        }
    });
    
    // Log initial state
    if (loadedCount === images.length) {
        console.log('🎉 All images already loaded - no shimmer needed');
    } else {
        console.log(`⏳ Monitoring ${images.length - loadedCount} images still loading...`);
    }
});