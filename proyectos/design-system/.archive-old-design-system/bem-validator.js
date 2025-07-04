/**
 * BEM VALIDATOR - Sistema de Diseño Sergio Forés
 * Validador automático de nomenclatura BEM
 * Verifica que todas las clases CSS sigan las convenciones BEM estrictas
 */

class BEMValidator {
    constructor(options = {}) {
        this.options = {
            logViolations: options.logViolations !== false,
            throwOnViolations: options.throwOnViolations || false,
            excludeClasses: options.excludeClasses || ['js-', 'is-', 'has-'],
            ...options
        };
        
        // Regex BEM estricto: block__element--modifier
        this.bemRegex = /^[a-z][a-z0-9]*(-[a-z0-9]+)*(__[a-z][a-z0-9]*(-[a-z0-9]+)*)?(--[a-z][a-z0-9]*(-[a-z0-9]+)*)?$/;
        
        // Regex para bloques válidos
        this.blockRegex = /^[a-z][a-z0-9]*(-[a-z0-9]+)*$/;
        
        // Regex para elementos válidos
        this.elementRegex = /^[a-z][a-z0-9]*(-[a-z0-9]+)*__[a-z][a-z0-9]*(-[a-z0-9]+)*$/;
        
        // Regex para modificadores válidos
        this.modifierRegex = /^[a-z][a-z0-9]*(-[a-z0-9]+)*((__[a-z][a-z0-9]*(-[a-z0-9]+)*)?--[a-z][a-z0-9]*(-[a-z0-9]+)*)$/;
    }

    /**
     * Valida si una clase sigue las convenciones BEM
     * @param {string} className - Nombre de la clase a validar
     * @returns {object} Resultado de la validación
     */
    validateClass(className) {
        if (!className || typeof className !== 'string') {
            return { valid: false, error: 'Clase vacía o no válida' };
        }

        // Excluir clases específicas (js-, is-, has-, etc.)
        if (this.shouldExclude(className)) {
            return { valid: true, type: 'excluded', reason: 'Clase excluida de validación BEM' };
        }

        // Validar con regex BEM
        if (!this.bemRegex.test(className)) {
            return { 
                valid: false, 
                error: 'No sigue nomenclatura BEM (block__element--modifier)',
                className
            };
        }

        // Determinar tipo BEM
        const type = this.getBEMType(className);
        
        return { 
            valid: true, 
            type,
            className,
            parts: this.parseBEMClass(className)
        };
    }

    /**
     * Determina si una clase debe ser excluida de la validación
     */
    shouldExclude(className) {
        return this.options.excludeClasses.some(prefix => className.startsWith(prefix));
    }

    /**
     * Determina el tipo de clase BEM (block, element, modifier)
     */
    getBEMType(className) {
        if (className.includes('__') && className.includes('--')) {
            return 'element-modifier';
        } else if (className.includes('__')) {
            return 'element';
        } else if (className.includes('--')) {
            return 'modifier';
        } else {
            return 'block';
        }
    }

    /**
     * Parsea una clase BEM en sus componentes
     */
    parseBEMClass(className) {
        const parts = { block: '', element: '', modifier: '' };
        
        let remaining = className;
        
        // Extraer modificador
        if (remaining.includes('--')) {
            const modifierIndex = remaining.lastIndexOf('--');
            parts.modifier = remaining.substring(modifierIndex + 2);
            remaining = remaining.substring(0, modifierIndex);
        }
        
        // Extraer elemento
        if (remaining.includes('__')) {
            const elementIndex = remaining.lastIndexOf('__');
            parts.element = remaining.substring(elementIndex + 2);
            remaining = remaining.substring(0, elementIndex);
        }
        
        // Lo que queda es el bloque
        parts.block = remaining;
        
        return parts;
    }

    /**
     * Valida todas las clases en el DOM
     */
    validateDOM() {
        const elements = document.querySelectorAll('*');
        const results = {
            total: 0,
            valid: 0,
            invalid: 0,
            excluded: 0,
            violations: [],
            blocks: new Set(),
            elements: new Set(),
            modifiers: new Set()
        };

        elements.forEach(element => {
            const classes = element.className.split(/\s+/).filter(cls => cls.length > 0);
            
            classes.forEach(className => {
                results.total++;
                const validation = this.validateClass(className);
                
                if (validation.valid) {
                    if (validation.type === 'excluded') {
                        results.excluded++;
                    } else {
                        results.valid++;
                        this.categorizeClass(className, validation, results);
                    }
                } else {
                    results.invalid++;
                    results.violations.push({
                        className,
                        element: element.tagName.toLowerCase(),
                        error: validation.error,
                        location: this.getElementSelector(element)
                    });
                }
            });
        });

        return results;
    }

    /**
     * Categoriza las clases válidas por tipo
     */
    categorizeClass(className, validation, results) {
        const { parts, type } = validation;
        
        results.blocks.add(parts.block);
        
        if (parts.element) {
            results.elements.add(`${parts.block}__${parts.element}`);
        }
        
        if (parts.modifier) {
            const base = parts.element ? `${parts.block}__${parts.element}` : parts.block;
            results.modifiers.add(`${base}--${parts.modifier}`);
        }
    }

    /**
     * Genera un selector único para un elemento
     */
    getElementSelector(element) {
        if (element.id) {
            return `#${element.id}`;
        }
        
        const path = [];
        let current = element;
        
        while (current && current.parentNode) {
            let selector = current.tagName.toLowerCase();
            
            if (current.className) {
                const bemClasses = current.className.split(' ')
                    .filter(cls => this.validateClass(cls).valid)
                    .slice(0, 2);
                    
                if (bemClasses.length > 0) {
                    selector += '.' + bemClasses.join('.');
                }
            }
            
            path.unshift(selector);
            current = current.parentNode;
            
            if (path.length > 3) break; // Limitar profundidad
        }
        
        return path.join(' > ');
    }

    /**
     * Genera reporte completo de validación
     */
    generateReport() {
        const results = this.validateDOM();
        
        const report = {
            summary: {
                total: results.total,
                valid: results.valid,
                invalid: results.invalid,
                excluded: results.excluded,
                compliance: results.total > 0 ? ((results.valid / results.total) * 100).toFixed(1) + '%' : '0%'
            },
            statistics: {
                uniqueBlocks: results.blocks.size,
                uniqueElements: results.elements.size,
                uniqueModifiers: results.modifiers.size,
                blocks: Array.from(results.blocks).sort(),
                elements: Array.from(results.elements).sort(),
                modifiers: Array.from(results.modifiers).sort()
            },
            violations: results.violations
        };

        if (this.options.logViolations) {
            this.logReport(report);
        }

        if (this.options.throwOnViolations && results.violations.length > 0) {
            throw new Error(`BEM Validation failed: ${results.violations.length} violations found`);
        }

        return report;
    }

    /**
     * Imprime reporte en consola con formato
     */
    logReport(report) {
        console.group('🎯 BEM VALIDATION REPORT');
        
        // Resumen
        console.log(`✅ Válidas: ${report.summary.valid}`);
        console.log(`❌ Inválidas: ${report.summary.invalid}`);
        console.log(`⚪ Excluidas: ${report.summary.excluded}`);
        console.log(`📊 Cumplimiento: ${report.summary.compliance}`);
        
        // Estadísticas
        console.group('📈 Estadísticas del Sistema');
        console.log(`Bloques únicos: ${report.statistics.uniqueBlocks}`);
        console.log(`Elementos únicos: ${report.statistics.uniqueElements}`);
        console.log(`Modificadores únicos: ${report.statistics.uniqueModifiers}`);
        
        if (report.statistics.blocks.length > 0) {
            console.log('Bloques:', report.statistics.blocks);
        }
        console.groupEnd();
        
        // Violaciones
        if (report.violations.length > 0) {
            console.group('🚨 Violaciones BEM');
            report.violations.forEach((violation, index) => {
                console.log(`${index + 1}. ${violation.className}`);
                console.log(`   Error: ${violation.error}`);
                console.log(`   Elemento: ${violation.element}`);
                console.log(`   Ubicación: ${violation.location}`);
            });
            console.groupEnd();
        }
        
        console.groupEnd();
    }

    /**
     * Valida clases específicas de componentes
     */
    validateComponent(componentSelector) {
        const component = document.querySelector(componentSelector);
        if (!component) {
            console.warn(`Componente no encontrado: ${componentSelector}`);
            return null;
        }

        const allElements = [component, ...component.querySelectorAll('*')];
        const violations = [];

        allElements.forEach(element => {
            const classes = element.className.split(/\s+/).filter(cls => cls.length > 0);
            
            classes.forEach(className => {
                const validation = this.validateClass(className);
                if (!validation.valid && !this.shouldExclude(className)) {
                    violations.push({
                        className,
                        element: element.tagName.toLowerCase(),
                        error: validation.error
                    });
                }
            });
        });

        return {
            component: componentSelector,
            valid: violations.length === 0,
            violations
        };
    }
}

// Auto-inicialización si está en el DOM
if (typeof document !== 'undefined') {
    document.addEventListener('DOMContentLoaded', function() {
        // Configuración por defecto para Sergio Forés Design System
        const validator = new BEMValidator({
            logViolations: true,
            excludeClasses: [
                'js-',      // JavaScript hooks
                'is-',      // Estado
                'has-',     // Estado
                'icon',     // Sistema de iconos
                'grid',     // Grid system
                'flex',     // Flex utilities
                'sr-',      // Screen reader
                'text-',    // Typography utilities
                'bg-',      // Background utilities
                'p-', 'm-', 'mt-', 'mb-', 'ml-', 'mr-', // Spacing utilities
                'w-', 'h-', // Size utilities
            ]
        });

        // Ejecutar validación automática
        const report = validator.generateReport();
        
        // Exponer validator globalmente para debugging
        window.BEMValidator = validator;
        window.bemReport = report;
        
        // Mensaje de estado
        if (report.summary.invalid === 0) {
            console.log('🎉 Todas las clases siguen convenciones BEM!');
        } else {
            console.warn(`⚠️  ${report.summary.invalid} clases no siguen BEM`);
        }
    });
}

// Exportar para uso en módulos
if (typeof module !== 'undefined' && module.exports) {
    module.exports = BEMValidator;
}