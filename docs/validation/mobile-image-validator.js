#!/usr/bin/env node

/**
 * MOBILE IMAGE VALIDATOR
 * Script para detectar automáticamente referencias rotas de imágenes
 * Especializado en picture elements y mobile performance
 */

const fs = require('fs');
const path = require('path');

class MobileImageValidator {
    constructor() {
        this.errors = [];
        this.warnings = [];
        this.validImages = [];
        this.imageExtensions = ['.jpg', '.jpeg', '.png', '.webp', '.svg'];
    }

    // Escanear directorio img/ para mapear archivos existentes
    scanImageDirectory(imgDir = './img') {
        const imageFiles = new Set();
        
        try {
            const files = fs.readdirSync(imgDir);
            files.forEach(file => {
                const ext = path.extname(file).toLowerCase();
                if (this.imageExtensions.includes(ext)) {
                    imageFiles.add(`img/${file}`);
                }
            });
        } catch (error) {
            this.errors.push(`Error scanning image directory: ${error.message}`);
        }
        
        return imageFiles;
    }

    // Extraer todas las referencias de imágenes de HTML
    extractImageReferences(htmlFile) {
        const references = [];
        
        try {
            const content = fs.readFileSync(htmlFile, 'utf8');
            
            // Regex para picture > source srcset
            const sourceRegex = /<source[^>]+srcset="([^"]+)"/g;
            let match;
            
            while ((match = sourceRegex.exec(content)) !== null) {
                const srcset = match[1];
                // Extraer path de imagen (sin responsive sizes)
                const imagePath = srcset.split(' ')[0];
                references.push({
                    type: 'webp_source',
                    path: imagePath,
                    line: this.getLineNumber(content, match.index)
                });
            }
            
            // Regex para img src
            const imgRegex = /<img[^>]+src="([^"]+)"/g;
            while ((match = imgRegex.exec(content)) !== null) {
                references.push({
                    type: 'img_fallback',
                    path: match[1],
                    line: this.getLineNumber(content, match.index)
                });
            }
            
        } catch (error) {
            this.errors.push(`Error reading HTML file ${htmlFile}: ${error.message}`);
        }
        
        return references;
    }

    // Obtener número de línea para debugging
    getLineNumber(content, index) {
        return content.substring(0, index).split('\\n').length;
    }

    // Validar referencias contra archivos existentes
    validateReferences(references, existingImages) {
        const results = {
            missing: [],
            valid: [],
            orphanWebP: []
        };

        references.forEach(ref => {
            if (existingImages.has(ref.path)) {
                results.valid.push(ref);
                this.validImages.push(ref.path);
            } else {
                results.missing.push(ref);
                this.errors.push(`Missing image: ${ref.path} (line ${ref.line}, type: ${ref.type})`);
            }
        });

        // Detectar archivos WebP huérfanos
        existingImages.forEach(imagePath => {
            if (imagePath.endsWith('.webp') && !this.validImages.includes(imagePath)) {
                results.orphanWebP.push(imagePath);
                this.warnings.push(`Orphan WebP file: ${imagePath} (not referenced in HTML)`);
            }
        });

        return results;
    }

    // Generar reporte mobile-focused
    generateMobileReport(results) {
        const report = {
            timestamp: new Date().toISOString(),
            summary: {
                total_references: results.valid.length + results.missing.length,
                missing_images: results.missing.length,
                valid_images: results.valid.length,
                orphan_webp: results.orphanWebP.length,
                mobile_performance_impact: this.calculateMobileImpact(results)
            },
            mobile_issues: {
                failed_webp_loads: results.missing.filter(r => r.type === 'webp_source').length,
                missing_fallbacks: results.missing.filter(r => r.type === 'img_fallback').length,
                double_requests: results.missing.filter(r => r.type === 'webp_source').length
            },
            detailed_errors: this.errors,
            warnings: this.warnings,
            recommendations: this.generateMobileRecommendations(results)
        };

        return report;
    }

    // Calcular impacto en performance mobile
    calculateMobileImpact(results) {
        const failedWebP = results.missing.filter(r => r.type === 'webp_source').length;
        const totalImages = results.valid.length + results.missing.length;
        
        return {
            failed_webp_ratio: `${(failedWebP / totalImages * 100).toFixed(1)}%`,
            estimated_extra_requests: failedWebP,
            performance_score: failedWebP === 0 ? 'EXCELLENT' : 
                             failedWebP <= 3 ? 'GOOD' : 
                             failedWebP <= 6 ? 'NEEDS_IMPROVEMENT' : 'POOR'
        };
    }

    // Generar recomendaciones mobile-first
    generateMobileRecommendations(results) {
        const recommendations = [];

        if (results.missing.length > 0) {
            recommendations.push('CRITICAL: Fix missing image references to prevent failed HTTP requests');
            recommendations.push('Generate missing WebP files or remove WebP source elements');
        }

        if (results.orphanWebP.length > 0) {
            recommendations.push('Consider using orphan WebP files or remove them to clean up storage');
        }

        if (results.missing.filter(r => r.type === 'webp_source').length > 0) {
            recommendations.push('MOBILE PERFORMANCE: Failed WebP loads cause fallback delays on mobile networks');
            recommendations.push('Implement error handling for picture elements');
        }

        recommendations.push('Add preload hints for above-the-fold images');
        recommendations.push('Implement responsive images with srcset for mobile optimization');

        return recommendations;
    }

    // Ejecutar validación completa
    validate(htmlFile = './index.html') {
        console.log('🔍 Mobile Image Validator - Starting validation...');

        const existingImages = this.scanImageDirectory();
        console.log(`📁 Found ${existingImages.size} images in img/ directory`);

        const references = this.extractImageReferences(htmlFile);
        console.log(`🔗 Found ${references.length} image references in ${htmlFile}`);

        const results = this.validateReferences(references, existingImages);
        const report = this.generateMobileReport(results);

        // Escribir reporte
        fs.writeFileSync('./mobile-image-validation-report.json', JSON.stringify(report, null, 2));

        // Output consola
        console.log('\\n📊 VALIDATION RESULTS:');
        console.log(`✅ Valid images: ${results.valid.length}`);
        console.log(`❌ Missing images: ${results.missing.length}`);
        console.log(`⚠️  Orphan WebP files: ${results.orphanWebP.length}`);
        console.log(`🏠 Mobile Performance: ${report.mobile_issues.failed_webp_loads} failed WebP loads`);

        if (this.errors.length > 0) {
            console.log('\\n❌ ERRORS:');
            this.errors.forEach(error => console.log(`  • ${error}`));
        }

        if (this.warnings.length > 0) {
            console.log('\\n⚠️ WARNINGS:');
            this.warnings.forEach(warning => console.log(`  • ${warning}`));
        }

        console.log('\\n💡 MOBILE RECOMMENDATIONS:');
        report.recommendations.forEach(rec => console.log(`  • ${rec}`));

        const hasErrors = this.errors.length > 0;
        console.log(`\\n${hasErrors ? '❌' : '✅'} Validation ${hasErrors ? 'FAILED' : 'PASSED'}`);
        
        return !hasErrors;
    }
}

// Ejecutar si es llamado directamente
if (require.main === module) {
    const validator = new MobileImageValidator();
    const success = validator.validate();
    process.exit(success ? 0 : 1);
}

module.exports = MobileImageValidator;