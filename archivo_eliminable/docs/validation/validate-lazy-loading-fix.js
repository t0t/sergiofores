/**
 * LAZY LOADING FIX VALIDATION SCRIPT
 * Performance Engineer - Automated Testing
 * 
 * Validates that the blur fix is working correctly
 * Tests image loading performance
 * Verifies cross-browser compatibility
 */

class LazyLoadingValidator {
    constructor() {
        this.testResults = {
            blurStateTests: [],
            loadingTests: [],
            performanceTests: [],
            crossBrowserTests: []
        };
        
        this.init();
    }

    init() {
        console.group('🧪 LAZY LOADING FIX VALIDATION');
        console.log('Starting comprehensive validation...');
        
        // Wait for page to load
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => {
                setTimeout(() => this.runValidation(), 1000);
            });
        } else {
            setTimeout(() => this.runValidation(), 1000);
        }
    }

    async runValidation() {
        console.log('🚀 Running validation tests...');
        
        try {
            // Test 1: Verify no permanent blur
            await this.testNoPermamentBlur();
            
            // Test 2: Check loading states
            await this.testLoadingStates();
            
            // Test 3: Performance validation
            await this.testPerformance();
            
            // Test 4: Browser compatibility
            await this.testBrowserCompatibility();
            
            // Test 5: Image quality
            await this.testImageQuality();
            
            // Generate final report
            this.generateValidationReport();
            
        } catch (error) {
            console.error('❌ Validation failed:', error);
        }
        
        console.groupEnd();
    }

    async testNoPermamentBlur() {
        console.group('Test 1: No Permanent Blur');
        
        const images = document.querySelectorAll('.project-screenshot img');
        let permanentBlurFound = false;
        
        images.forEach((img, index) => {
            const computedStyle = window.getComputedStyle(img);
            const filter = computedStyle.filter;
            const hasLazyAttribute = img.hasAttribute('loading') && img.getAttribute('loading') === 'lazy';
            
            // Check if image has permanent blur
            if (hasLazyAttribute && filter.includes('blur') && !img.classList.contains('lazy-loading')) {
                console.error(`❌ Image ${index + 1} has permanent blur: ${filter}`);
                permanentBlurFound = true;
            } else {
                console.log(`✅ Image ${index + 1}: No permanent blur detected`);
            }
        });
        
        this.testResults.blurStateTests.push({
            test: 'No Permanent Blur',
            passed: !permanentBlurFound,
            details: `${images.length} images tested`
        });
        
        console.log(permanentBlurFound ? '❌ FAILED: Permanent blur detected' : '✅ PASSED: No permanent blur');
        console.groupEnd();
    }

    async testLoadingStates() {
        console.group('Test 2: Loading States');
        
        // Test transition from blur to clear
        const testImage = document.querySelector('.project-screenshot img');
        
        if (testImage) {
            console.log('Testing loading state transitions...');
            
            // Simulate loading state
            testImage.classList.add('lazy-loading');
            
            await new Promise(resolve => setTimeout(resolve, 100));
            
            const loadingStyle = window.getComputedStyle(testImage);
            const hasBlurInLoadingState = loadingStyle.filter.includes('blur');
            
            console.log(hasBlurInLoadingState ? '✅ Loading state has blur' : '❌ Loading state missing blur');
            
            // Simulate loaded state
            testImage.classList.remove('lazy-loading');
            testImage.classList.add('loaded');
            
            await new Promise(resolve => setTimeout(resolve, 100));
            
            const loadedStyle = window.getComputedStyle(testImage);
            const hasBlurInLoadedState = loadedStyle.filter.includes('blur');
            
            console.log(!hasBlurInLoadedState ? '✅ Loaded state has no blur' : '❌ Loaded state still has blur');
            
            this.testResults.loadingTests.push({
                test: 'Loading State Transitions',
                passed: hasBlurInLoadingState && !hasBlurInLoadedState,
                details: 'Loading → Loaded transition tested'
            });
        }
        
        console.groupEnd();
    }

    async testPerformance() {
        console.group('Test 3: Performance Validation');
        
        const performanceStart = performance.now();
        
        // Test image loading speed
        const images = document.querySelectorAll('.project-screenshot img');
        let allImagesLoaded = true;
        
        const loadPromises = Array.from(images).map(img => {
            return new Promise((resolve) => {
                if (img.complete) {
                    resolve(true);
                } else {
                    img.onload = () => resolve(true);
                    img.onerror = () => resolve(false);
                    
                    // Timeout after 5 seconds
                    setTimeout(() => resolve(false), 5000);
                }
            });
        });
        
        const results = await Promise.all(loadPromises);
        const successRate = results.filter(Boolean).length / results.length;
        
        const performanceEnd = performance.now();
        const totalTime = performanceEnd - performanceStart;
        
        console.log(`📊 Image load success rate: ${(successRate * 100).toFixed(1)}%`);
        console.log(`⏱️ Total validation time: ${totalTime.toFixed(2)}ms`);
        
        this.testResults.performanceTests.push({
            test: 'Image Loading Performance',
            passed: successRate > 0.9, // 90% success rate required
            details: `${(successRate * 100).toFixed(1)}% success rate in ${totalTime.toFixed(2)}ms`
        });
        
        console.groupEnd();
    }

    async testBrowserCompatibility() {
        console.group('Test 4: Browser Compatibility');
        
        const userAgent = navigator.userAgent;
        const isChrome = userAgent.includes('Chrome');
        const isSafari = userAgent.includes('Safari') && !userAgent.includes('Chrome');
        const isFirefox = userAgent.includes('Firefox');
        
        console.log(`🌐 Browser detected: ${isChrome ? 'Chrome' : isSafari ? 'Safari' : isFirefox ? 'Firefox' : 'Other'}`);
        
        // Test IntersectionObserver support
        const hasIntersectionObserver = 'IntersectionObserver' in window;
        console.log(`👁️ IntersectionObserver support: ${hasIntersectionObserver ? '✅' : '❌'}`);
        
        // Test CSS properties support
        const testElement = document.createElement('div');
        testElement.style.filter = 'blur(5px)';
        const supportsFilter = testElement.style.filter === 'blur(5px)';
        console.log(`🎨 CSS filter support: ${supportsFilter ? '✅' : '❌'}`);
        
        // Test performance API
        const hasPerformanceAPI = 'performance' in window;
        console.log(`📊 Performance API: ${hasPerformanceAPI ? '✅' : '❌'}`);
        
        this.testResults.crossBrowserTests.push({
            test: 'Browser Compatibility',
            passed: hasIntersectionObserver && supportsFilter,
            details: `${userAgent.split(' ')[0]} - IO:${hasIntersectionObserver} Filter:${supportsFilter}`
        });
        
        console.groupEnd();
    }

    async testImageQuality() {
        console.group('Test 5: Image Quality');
        
        const images = document.querySelectorAll('.project-screenshot img');
        let qualityIssues = 0;
        
        images.forEach((img, index) => {
            const naturalWidth = img.naturalWidth;
            const naturalHeight = img.naturalHeight;
            const displayWidth = img.offsetWidth;
            const displayHeight = img.offsetHeight;
            
            const devicePixelRatio = window.devicePixelRatio || 1;
            const requiredWidth = displayWidth * devicePixelRatio;
            const requiredHeight = displayHeight * devicePixelRatio;
            
            const qualityRatio = Math.min(naturalWidth / requiredWidth, naturalHeight / requiredHeight);
            
            if (qualityRatio < 1) {
                console.warn(`⚠️ Image ${index + 1} low quality: ${qualityRatio.toFixed(2)}x`);
                qualityIssues++;
            } else {
                console.log(`✅ Image ${index + 1} quality: ${qualityRatio.toFixed(2)}x`);
            }
        });
        
        this.testResults.performanceTests.push({
            test: 'Image Quality',
            passed: qualityIssues === 0,
            details: `${qualityIssues} quality issues found in ${images.length} images`
        });
        
        console.groupEnd();
    }

    generateValidationReport() {
        console.group('📋 VALIDATION REPORT');
        
        const allTests = [
            ...this.testResults.blurStateTests,
            ...this.testResults.loadingTests,
            ...this.testResults.performanceTests,
            ...this.testResults.crossBrowserTests
        ];
        
        const passedTests = allTests.filter(test => test.passed).length;
        const totalTests = allTests.length;
        const successRate = (passedTests / totalTests) * 100;
        
        console.log(`🎯 Overall Success Rate: ${successRate.toFixed(1)}% (${passedTests}/${totalTests})`);
        
        // Detailed results
        allTests.forEach(test => {
            const icon = test.passed ? '✅' : '❌';
            console.log(`${icon} ${test.test}: ${test.details}`);
        });
        
        // Final verdict
        if (successRate >= 90) {
            console.log('🎉 VALIDATION PASSED: Lazy loading fix is working correctly!');
        } else if (successRate >= 70) {
            console.log('⚠️ VALIDATION WARNING: Some issues detected, but major fixes are working');
        } else {
            console.log('❌ VALIDATION FAILED: Significant issues remain');
        }
        
        // Recommendations
        if (successRate < 100) {
            console.group('💡 RECOMMENDATIONS');
            
            const failedTests = allTests.filter(test => !test.passed);
            failedTests.forEach(test => {
                console.log(`- Fix: ${test.test} - ${test.details}`);
            });
            
            console.groupEnd();
        }
        
        console.groupEnd();
        
        // Make report available globally
        window.validationReport = {
            successRate,
            passedTests,
            totalTests,
            allTests,
            timestamp: new Date().toISOString()
        };
        
        console.log('📊 Full report available at: window.validationReport');
    }

    // Manual testing helpers
    simulateSlowLoading() {
        console.log('🐌 Simulating slow loading conditions...');
        
        const images = document.querySelectorAll('.project-screenshot img:not(.loaded)');
        images.forEach(img => {
            img.classList.add('lazy-loading');
            
            setTimeout(() => {
                img.classList.remove('lazy-loading');
                img.classList.add('loaded');
            }, 3000);
        });
    }

    testErrorStates() {
        console.log('❌ Testing error states...');
        
        const testImage = document.querySelector('.project-screenshot img');
        if (testImage) {
            testImage.classList.add('error');
            console.log('Error state applied to first image');
        }
    }
}

// Auto-run validation
document.addEventListener('DOMContentLoaded', () => {
    // Wait for other scripts to initialize
    setTimeout(() => {
        window.lazyLoadingValidator = new LazyLoadingValidator();
        
        // Make manual testing available
        window.testSlowLoading = () => window.lazyLoadingValidator.simulateSlowLoading();
        window.testErrorStates = () => window.lazyLoadingValidator.testErrorStates();
        
        console.log('🛠️ Manual test functions available:');
        console.log('  window.testSlowLoading() - Simulate slow loading');
        console.log('  window.testErrorStates() - Test error handling');
    }, 2000);
});