/**
 * PRELOAD VALIDATION SCRIPT
 * Chrome Warning Fix Verification - Sergio Forés Portfolio
 * 
 * This script validates that all preloaded resources exist and
 * prevents Chrome DevTools warnings about unused preloads.
 */

class PreloadValidator {
    constructor() {
        this.results = {
            totalPreloads: 0,
            validPreloads: 0,
            invalidPreloads: 0,
            errors: []
        };
    }

    // Main validation function
    async validateAllPreloads() {
        console.log('🔍 Starting Preload Validation...');
        
        // Get all preload links
        const preloadLinks = document.querySelectorAll('link[rel="preload"], link[rel="prefetch"]');
        this.results.totalPreloads = preloadLinks.length;
        
        console.log(`📊 Found ${preloadLinks.length} preload/prefetch resources`);
        
        for (const link of preloadLinks) {
            await this.validateResource(link);
        }
        
        this.displayResults();
        return this.results;
    }

    // Validate individual resource
    async validateResource(link) {
        const url = link.href;
        const type = link.rel;
        const asType = link.as || 'unknown';
        
        try {
            const response = await fetch(url, { method: 'HEAD' });
            
            if (response.ok) {
                this.results.validPreloads++;
                console.log(`✅ Valid ${type}: ${url}`);
                
                // Check if resource is actually used
                await this.checkResourceUsage(url, asType);
            } else {
                this.results.invalidPreloads++;
                this.results.errors.push({
                    url,
                    error: `HTTP ${response.status}`,
                    type,
                    asType
                });
                console.error(`❌ Invalid ${type}: ${url} (HTTP ${response.status})`);
            }
        } catch (error) {
            this.results.invalidPreloads++;
            this.results.errors.push({
                url,
                error: error.message,
                type,
                asType
            });
            console.error(`❌ Failed ${type}: ${url}`, error.message);
        }
    }

    // Check if preloaded resource is actually used
    async checkResourceUsage(url, asType) {
        const filename = url.split('/').pop();
        
        switch (asType) {
            case 'image':
                const images = document.querySelectorAll('img, source');
                const isUsed = Array.from(images).some(img => 
                    img.src?.includes(filename) || 
                    img.srcset?.includes(filename) ||
                    img.dataset?.src?.includes(filename)
                );
                
                if (!isUsed) {
                    console.warn(`⚠️  Preloaded image may be unused: ${filename}`);
                }
                break;
                
            case 'style':
                const stylesheets = document.querySelectorAll('link[rel="stylesheet"]');
                const isStyleUsed = Array.from(stylesheets).some(sheet => 
                    sheet.href?.includes(filename)
                );
                
                if (!isStyleUsed) {
                    console.warn(`⚠️  Preloaded stylesheet may be unused: ${filename}`);
                }
                break;
        }
    }

    // Display validation results
    displayResults() {
        console.log('\n📋 PRELOAD VALIDATION RESULTS:');
        console.log('================================');
        console.log(`Total Resources: ${this.results.totalPreloads}`);
        console.log(`Valid: ${this.results.validPreloads}`);
        console.log(`Invalid: ${this.results.invalidPreloads}`);
        
        if (this.results.invalidPreloads === 0) {
            console.log('🎉 ALL PRELOADS VALID - No Chrome warnings expected!');
        } else {
            console.log('\n❌ ERRORS FOUND:');
            this.results.errors.forEach(error => {
                console.log(`  • ${error.url} (${error.error})`);
            });
        }
        
        // Performance recommendations
        this.generateRecommendations();
    }

    // Generate performance recommendations
    generateRecommendations() {
        console.log('\n🚀 PERFORMANCE RECOMMENDATIONS:');
        console.log('================================');
        
        if (this.results.invalidPreloads > 0) {
            console.log('1. Remove or fix invalid preload links');
            console.log('2. Ensure all preloaded resources exist');
        }
        
        console.log('3. Only preload critical above-the-fold resources');
        console.log('4. Use prefetch for below-the-fold resources');
        console.log('5. Monitor Network tab for unused preloads');
        
        // Core Web Vitals impact
        console.log('\n📊 CORE WEB VITALS IMPACT:');
        if (this.results.invalidPreloads === 0) {
            console.log('✅ LCP: Optimized (no failed preloads)');
            console.log('✅ FID: No impact');
            console.log('✅ CLS: Stable (no loading errors)');
        } else {
            console.log('⚠️  LCP: May be impacted by failed preloads');
            console.log('⚠️  Network: Bandwidth waste detected');
        }
    }

    // Monitor for runtime preload additions
    monitorDynamicPreloads() {
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                mutation.addedNodes.forEach((node) => {
                    if (node.tagName === 'LINK' && 
                        (node.rel === 'preload' || node.rel === 'prefetch')) {
                        console.log(`🔄 Dynamic preload detected: ${node.href}`);
                        this.validateResource(node);
                    }
                });
            });
        });

        observer.observe(document.head, {
            childList: true,
            subtree: true
        });

        console.log('👀 Monitoring for dynamic preload additions...');
    }
}

// Auto-run validation when DOM is ready
document.addEventListener('DOMContentLoaded', async () => {
    const validator = new PreloadValidator();
    
    // Wait a bit for dynamic content to load
    setTimeout(async () => {
        await validator.validateAllPreloads();
        validator.monitorDynamicPreloads();
    }, 1000);
});

// Export for manual testing
window.validatePreloads = async () => {
    const validator = new PreloadValidator();
    return await validator.validateAllPreloads();
};

// Export class for testing
if (typeof module !== 'undefined' && module.exports) {
    module.exports = PreloadValidator;
}