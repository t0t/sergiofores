/**
 * BLUR DIAGNOSIS SCRIPT
 * Sergio Forés Portfolio Image Quality Analysis
 * 
 * Este script analiza las miniaturas del portfolio para identificar:
 * 1. Problemas de resolución vs tamaño de display
 * 2. Issues de CSS scaling que causan blur
 * 3. Problemas de pixel density ratio
 * 4. Quality de compresión
 */

class BlurDiagnostics {
    constructor() {
        this.issues = [];
        this.devicePixelRatio = window.devicePixelRatio || 1;
        this.init();
    }

    init() {
        console.group('🔍 PORTFOLIO BLUR DIAGNOSTICS');
        this.analyzeViewport();
        this.analyzeImageElements();
        this.analyzeCSSScaling();
        this.generateReport();
        console.groupEnd();
    }

    analyzeViewport() {
        console.group('📱 VIEWPORT ANALYSIS');
        console.log('Device Pixel Ratio:', this.devicePixelRatio);
        console.log('Viewport Width:', window.innerWidth);
        console.log('Viewport Height:', window.innerHeight);
        
        if (this.devicePixelRatio > 1) {
            this.issues.push({
                type: 'HIGH_DPI',
                severity: 'HIGH',
                message: `High DPI display (${this.devicePixelRatio}x) requires higher resolution images`,
                solution: 'Generate @2x and @3x versions of all thumbnails'
            });
        }
        console.groupEnd();
    }

    analyzeImageElements() {
        console.group('🖼️ IMAGE ELEMENT ANALYSIS');
        
        const projectImages = document.querySelectorAll('.project-screenshot img');
        
        projectImages.forEach((img, index) => {
            const computedStyle = window.getComputedStyle(img);
            const displayWidth = parseInt(computedStyle.width);
            const displayHeight = parseInt(computedStyle.height);
            
            // Analyze each image
            this.analyzeIndividualImage(img, displayWidth, displayHeight, index);
        });
        
        console.groupEnd();
    }

    analyzeIndividualImage(img, displayWidth, displayHeight, index) {
        const naturalWidth = img.naturalWidth;
        const naturalHeight = img.naturalHeight;
        const src = img.src;
        const alt = img.alt;
        
        // Required resolution for sharp display
        const requiredWidth = displayWidth * this.devicePixelRatio;
        const requiredHeight = displayHeight * this.devicePixelRatio;
        
        console.group(`Image ${index + 1}: ${alt}`);
        console.log('📏 Display Size:', `${displayWidth}x${displayHeight}px`);
        console.log('🖼️ Natural Size:', `${naturalWidth}x${naturalHeight}px`);
        console.log('✨ Required for Sharp:', `${requiredWidth}x${requiredHeight}px`);
        
        // Calculate quality ratio
        const widthRatio = naturalWidth / requiredWidth;
        const heightRatio = naturalHeight / requiredHeight;
        const qualityRatio = Math.min(widthRatio, heightRatio);
        
        console.log('📊 Quality Ratio:', qualityRatio.toFixed(2));
        
        // Identify issues
        if (qualityRatio < 1) {
            this.issues.push({
                type: 'LOW_RESOLUTION',
                severity: 'HIGH',
                image: alt,
                src: src,
                message: `Image too small: ${naturalWidth}x${naturalHeight} for ${requiredWidth}x${requiredHeight} display`,
                currentSize: `${naturalWidth}x${naturalHeight}`,
                requiredSize: `${requiredWidth}x${requiredHeight}`,
                solution: `Regenerate at ${Math.ceil(requiredWidth)}x${Math.ceil(requiredHeight)} minimum`
            });
        } else if (qualityRatio < 1.5) {
            this.issues.push({
                type: 'MARGINAL_RESOLUTION',
                severity: 'MEDIUM',
                image: alt,
                src: src,
                message: `Marginal resolution quality: ${qualityRatio.toFixed(2)}x`,
                solution: 'Consider higher resolution for crystal-clear display'
            });
        }
        
        // Check if image is being scaled by CSS
        const scaleX = displayWidth / naturalWidth;
        const scaleY = displayHeight / naturalHeight;
        
        if (Math.abs(scaleX - 1) > 0.1 || Math.abs(scaleY - 1) > 0.1) {
            console.log('⚠️ CSS Scaling detected:', `${scaleX.toFixed(2)}x, ${scaleY.toFixed(2)}x`);
            
            if (scaleX > 1 || scaleY > 1) {
                this.issues.push({
                    type: 'CSS_UPSCALING',
                    severity: 'HIGH',
                    image: alt,
                    message: `Image being upscaled by CSS: ${scaleX.toFixed(2)}x, ${scaleY.toFixed(2)}x`,
                    solution: 'Use larger source image to avoid CSS upscaling'
                });
            }
        }
        
        console.groupEnd();
    }

    analyzeCSSScaling() {
        console.group('🎨 CSS SCALING ANALYSIS');
        
        // Check project card sizing
        const projectCards = document.querySelectorAll('.project-card');
        const firstCard = projectCards[0];
        
        if (firstCard) {
            const computedStyle = window.getComputedStyle(firstCard);
            console.log('Project Card Computed Style:');
            console.log('- Width:', computedStyle.width);
            console.log('- Height:', computedStyle.height);
            console.log('- Aspect Ratio:', computedStyle.aspectRatio);
            console.log('- Object Fit:', computedStyle.objectFit);
            
            // Check for problematic CSS properties
            const screenshot = firstCard.querySelector('.project-screenshot');
            if (screenshot) {
                const screenshotStyle = window.getComputedStyle(screenshot);
                console.log('Screenshot Container:');
                console.log('- Object Fit:', screenshotStyle.objectFit);
                console.log('- Width:', screenshotStyle.width);
                console.log('- Height:', screenshotStyle.height);
                
                if (screenshotStyle.objectFit === 'cover') {
                    this.issues.push({
                        type: 'OBJECT_FIT_COVER',
                        severity: 'MEDIUM',
                        message: 'object-fit: cover may crop important content',
                        solution: 'Consider using object-fit: contain or adjust aspect ratios'
                    });
                }
            }
        }
        
        console.groupEnd();
    }

    generateReport() {
        console.group('📋 DIAGNOSTIC REPORT');
        
        if (this.issues.length === 0) {
            console.log('✅ No image quality issues detected!');
            console.groupEnd();
            return;
        }
        
        // Group issues by severity
        const highSeverity = this.issues.filter(issue => issue.severity === 'HIGH');
        const mediumSeverity = this.issues.filter(issue => issue.severity === 'MEDIUM');
        const lowSeverity = this.issues.filter(issue => issue.severity === 'LOW');
        
        console.log(`🚨 Found ${this.issues.length} image quality issues:`);
        console.log(`   - ${highSeverity.length} HIGH priority`);
        console.log(`   - ${mediumSeverity.length} MEDIUM priority`);
        console.log(`   - ${lowSeverity.length} LOW priority`);
        
        // Detailed report
        if (highSeverity.length > 0) {
            console.group('🚨 HIGH PRIORITY ISSUES');
            highSeverity.forEach((issue, index) => {
                console.group(`${index + 1}. ${issue.type}`);
                console.log('Image:', issue.image || 'General');
                console.log('Problem:', issue.message);
                console.log('Solution:', issue.solution);
                if (issue.currentSize) console.log('Current:', issue.currentSize);
                if (issue.requiredSize) console.log('Required:', issue.requiredSize);
                console.groupEnd();
            });
            console.groupEnd();
        }
        
        if (mediumSeverity.length > 0) {
            console.group('⚠️ MEDIUM PRIORITY ISSUES');
            mediumSeverity.forEach((issue, index) => {
                console.group(`${index + 1}. ${issue.type}`);
                console.log('Problem:', issue.message);
                console.log('Solution:', issue.solution);
                console.groupEnd();
            });
            console.groupEnd();
        }
        
        // Generate fix commands
        this.generateFixCommands();
        
        console.groupEnd();
    }

    generateFixCommands() {
        console.group('🛠️ AUTOMATED FIX COMMANDS');
        
        const lowResIssues = this.issues.filter(issue => issue.type === 'LOW_RESOLUTION');
        
        if (lowResIssues.length > 0) {
            console.log('ImageMagick commands to regenerate thumbnails:');
            console.log('');
            
            lowResIssues.forEach(issue => {
                const filename = issue.src.split('/').pop().replace(/\.[^/.]+$/, "");
                const extension = issue.src.split('.').pop();
                const [width, height] = issue.requiredSize.split('x');
                
                console.log(`# ${issue.image}`);
                console.log(`convert "original/${filename}.${extension}" -resize ${width}x${height}^ -gravity center -extent ${width}x${height} "img/${filename}.jpg"`);
                console.log(`cwebp -q 92 "img/${filename}.jpg" -o "img/${filename}.webp"`);
                console.log('');
            });
        }
        
        // CSS fixes
        const cssIssues = this.issues.filter(issue => issue.type.includes('CSS'));
        if (cssIssues.length > 0) {
            console.log('CSS Fixes needed:');
            cssIssues.forEach(issue => {
                console.log(`- ${issue.message}`);
                console.log(`  Solution: ${issue.solution}`);
            });
        }
        
        console.groupEnd();
    }

    // Export report as JSON
    exportReport() {
        return {
            timestamp: new Date().toISOString(),
            devicePixelRatio: this.devicePixelRatio,
            viewport: {
                width: window.innerWidth,
                height: window.innerHeight
            },
            issues: this.issues,
            summary: {
                total: this.issues.length,
                high: this.issues.filter(i => i.severity === 'HIGH').length,
                medium: this.issues.filter(i => i.severity === 'MEDIUM').length,
                low: this.issues.filter(i => i.severity === 'LOW').length
            }
        };
    }
}

// Auto-run when loaded
document.addEventListener('DOMContentLoaded', () => {
    // Wait for images to load
    setTimeout(() => {
        window.blurDiagnostics = new BlurDiagnostics();
        
        // Make report available globally
        window.getBlurReport = () => window.blurDiagnostics.exportReport();
        
        console.log('💡 Use window.getBlurReport() to export detailed JSON report');
    }, 2000);
});