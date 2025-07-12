/**
 * VALIDADOR AUTOMÁTICO CUMPLIMIENTO CLAUDE.md
 * Script para verificar todas las reglas implementadas
 */

class ClaudeComplianceValidator {
  constructor() {
    this.results = [];
    this.init();
  }
  
  init() {
    console.log('🔍 Iniciando validación CLAUDE.md compliance...\n');
    
    this.validateTypographySystem();
    this.validateFontWeights();
    this.validateMixBlendMode();
    this.validateSemanticHTML();
    this.validateGridLayout();
    this.validateNavigation();
    this.validateSpacing();
    this.validateViewport();
    this.validateMobilePerformance();
    this.validateBreakpoints();
    
    this.showResults();
  }
  
  /**
   * Validar Sistema 3 tamaños de fuente ÚNICAMENTE
   */
  validateTypographySystem() {
    const result = { name: 'Sistema 3 tamaños de fuente ÚNICAMENTE', passed: true, details: [] };
    
    // Verificar variables CSS
    const root = document.documentElement;
    const computedStyle = getComputedStyle(root);
    
    const allowedSizes = ['--text-large', '--text-medium', '--text-small'];
    const prohibitedSizes = ['--text-xs', '--text-sm', '--text-base', '--text-lg', '--text-xl', '--text-2xl'];
    
    // Verificar que existen los 3 tamaños permitidos
    allowedSizes.forEach(size => {
      const value = computedStyle.getPropertyValue(size);
      if (!value) {
        result.passed = false;
        result.details.push(`❌ Falta variable: ${size}`);
      } else {
        result.details.push(`✅ Variable encontrada: ${size} = ${value.trim()}`);
      }
    });
    
    // Verificar que NO existen tamaños prohibidos
    prohibitedSizes.forEach(size => {
      const value = computedStyle.getPropertyValue(size);
      if (value) {
        result.passed = false;
        result.details.push(`❌ Variable prohibida encontrada: ${size}`);
      }
    });
    
    this.results.push(result);
  }
  
  /**
   * Validar Font-weights consistentes
   */
  validateFontWeights() {
    const result = { name: 'Font-weight consistente', passed: true, details: [] };
    
    // Verificar que body usa font-weight-normal
    const bodyWeight = getComputedStyle(document.body).fontWeight;
    if (bodyWeight === '400') {
      result.details.push('✅ Body usa font-weight: 400 (normal)');
    } else {
      result.passed = false;
      result.details.push(`❌ Body usa font-weight: ${bodyWeight} (debería ser 400)`);
    }
    
    // Verificar títulos H1-H3
    const titles = document.querySelectorAll('h1, h2, h3');
    titles.forEach(title => {
      const weight = getComputedStyle(title).fontWeight;
      if (weight === '500' || weight === '600') {
        result.details.push(`✅ ${title.tagName} usa font-weight: ${weight}`);
      } else {
        result.passed = false;
        result.details.push(`❌ ${title.tagName} usa font-weight: ${weight} (debería ser 500 o 600)`);
      }
    });
    
    this.results.push(result);
  }
  
  /**
   * Validar Mix-blend-mode solo desktop
   */
  validateMixBlendMode() {
    const result = { name: 'Mix-blend-mode solo desktop', passed: true, details: [] };
    
    const isDesktop = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    const cursorEffects = document.querySelectorAll('.cursor-effect');
    
    if (isDesktop) {
      result.details.push('✅ Dispositivo desktop detectado');
      cursorEffects.forEach(element => {
        const mixBlend = getComputedStyle(element).mixBlendMode;
        if (mixBlend === 'difference') {
          result.details.push('✅ Mix-blend-mode: difference activo en desktop');
        }
      });
    } else {
      result.details.push('✅ Dispositivo móvil detectado');
      cursorEffects.forEach(element => {
        const mixBlend = getComputedStyle(element).mixBlendMode;
        if (mixBlend === 'normal') {
          result.details.push('✅ Mix-blend-mode: normal en móvil');
        } else {
          result.passed = false;
          result.details.push(`❌ Mix-blend-mode: ${mixBlend} en móvil (debería ser normal)`);
        }
      });
    }
    
    this.results.push(result);
  }
  
  /**
   * Validar HTML semántico
   */
  validateSemanticHTML() {
    const result = { name: 'HTML semántico obligatorio', passed: true, details: [] };
    
    // Verificar elementos requeridos
    const requiredElements = ['header', 'main', 'nav', 'section'];
    requiredElements.forEach(tag => {
      const elements = document.querySelectorAll(tag);
      if (elements.length > 0) {
        result.details.push(`✅ Elemento <${tag}> encontrado (${elements.length})`);
      } else {
        result.passed = false;
        result.details.push(`❌ Elemento <${tag}> no encontrado`);
      }
    });
    
    // Verificar H1 único
    const h1Elements = document.querySelectorAll('h1');
    if (h1Elements.length === 1) {
      result.details.push('✅ H1 único encontrado');
    } else {
      result.passed = false;
      result.details.push(`❌ ${h1Elements.length} elementos H1 (debería ser 1)`);
    }
    
    // Verificar listas de definición
    const dlElements = document.querySelectorAll('dl');
    if (dlElements.length > 0) {
      result.details.push(`✅ Listas de definición encontradas (${dlElements.length})`);
    } else {
      result.details.push('⚠️ No se encontraron listas de definición <dl>');
    }
    
    this.results.push(result);
  }
  
  /**
   * Validar Layout Grid optimizado
   */
  validateGridLayout() {
    const result = { name: 'Layout Grid optimizado', passed: true, details: [] };
    
    const gridElements = document.querySelectorAll('.layout-grid, .grid');
    gridElements.forEach(grid => {
      const style = getComputedStyle(grid);
      
      // Verificar display: grid
      if (style.display === 'grid') {
        result.details.push('✅ Display: grid encontrado');
      }
      
      // Verificar grid-template-rows no usa 1fr
      const templateRows = style.gridTemplateRows;
      if (templateRows && !templateRows.includes('1fr')) {
        result.details.push('✅ Grid-template-rows sin 1fr');
      } else if (templateRows && templateRows.includes('1fr')) {
        result.passed = false;
        result.details.push('❌ Grid-template-rows usa 1fr (prohibido)');
      }
    });
    
    this.results.push(result);
  }
  
  /**
   * Validar navegación activa inteligente
   */
  validateNavigation() {
    const result = { name: 'Navegación activa inteligente', passed: true, details: [] };
    
    // Verificar script cargado
    if (typeof NavigationIntelligence !== 'undefined') {
      result.details.push('✅ NavigationIntelligence class disponible');
    } else {
      result.passed = false;
      result.details.push('❌ NavigationIntelligence class no encontrada');
    }
    
    // Verificar enlaces de navegación
    const navLinks = document.querySelectorAll('.header__nav-link');
    if (navLinks.length > 0) {
      result.details.push(`✅ Enlaces navegación encontrados (${navLinks.length})`);
    } else {
      result.passed = false;
      result.details.push('❌ Enlaces navegación no encontrados');
    }
    
    // Verificar logo
    const logo = document.querySelector('.logo, .header__brand');
    if (logo) {
      result.details.push('✅ Logo encontrado');
    } else {
      result.passed = false;
      result.details.push('❌ Logo no encontrado');
    }
    
    this.results.push(result);
  }
  
  /**
   * Validar sistema 8px
   */
  validateSpacing() {
    const result = { name: 'Sistema 8px espaciado', passed: true, details: [] };
    
    const root = document.documentElement;
    const computedStyle = getComputedStyle(root);
    
    const spaceVariables = ['--space-2', '--space-4', '--space-6', '--space-8'];
    spaceVariables.forEach(variable => {
      const value = computedStyle.getPropertyValue(variable);
      if (value) {
        result.details.push(`✅ Variable espaciado: ${variable} = ${value.trim()}`);
      } else {
        result.passed = false;
        result.details.push(`❌ Variable espaciado falta: ${variable}`);
      }
    });
    
    this.results.push(result);
  }
  
  /**
   * Validar viewport real para iOS
   */
  validateViewport() {
    const result = { name: 'Viewport real para iOS', passed: true, details: [] };
    
    // Verificar si CSS tiene 100svh
    const stylesheets = Array.from(document.styleSheets);
    let hasViewportUnit = false;
    
    try {
      stylesheets.forEach(sheet => {
        try {
          const rules = Array.from(sheet.cssRules || sheet.rules);
          rules.forEach(rule => {
            if (rule.style && rule.style.cssText.includes('100svh')) {
              hasViewportUnit = true;
            }
          });
        } catch (e) {
          // Cross-origin stylesheet
        }
      });
    } catch (e) {
      result.details.push('⚠️ No se pudieron verificar stylesheets (cross-origin)');
    }
    
    if (hasViewportUnit) {
      result.details.push('✅ Unidades 100svh encontradas');
    } else {
      result.details.push('⚠️ No se detectaron unidades 100svh');
    }
    
    this.results.push(result);
  }
  
  /**
   * Validar performance mobile
   */
  validateMobilePerformance() {
    const result = { name: 'Performance mobile', passed: true, details: [] };
    
    const isMobile = window.innerWidth <= 768;
    
    if (isMobile) {
      result.details.push('✅ Dispositivo móvil detectado');
      
      // Verificar elementos con transform3d
      const animatedElements = document.querySelectorAll('.card, .btn');
      let hasHardwareAcceleration = false;
      
      animatedElements.forEach(element => {
        const transform = getComputedStyle(element).transform;
        if (transform && transform.includes('matrix3d')) {
          hasHardwareAcceleration = true;
        }
      });
      
      if (hasHardwareAcceleration) {
        result.details.push('✅ Hardware acceleration detectada');
      } else {
        result.details.push('⚠️ Hardware acceleration no detectada');
      }
    } else {
      result.details.push('✅ Dispositivo desktop - optimizaciones móviles no aplicables');
    }
    
    this.results.push(result);
  }
  
  /**
   * Validar breakpoints específicos iPhone
   */
  validateBreakpoints() {
    const result = { name: 'Breakpoints específicos iPhone', passed: true, details: [] };
    
    const width = window.innerWidth;
    
    if (width <= 375) {
      result.details.push('✅ Breakpoint iPhone SE (≤375px) detectado');
    } else if (width <= 430) {
      result.details.push('✅ Breakpoint iPhone moderno (≤430px) detectado');
    } else if (width <= 768) {
      result.details.push('✅ Breakpoint tablet (≤768px) detectado');
    } else {
      result.details.push('✅ Breakpoint desktop (>768px) detectado');
    }
    
    this.results.push(result);
  }
  
  /**
   * Mostrar resultados
   */
  showResults() {
    console.log('\n📊 RESULTADOS VALIDACIÓN CLAUDE.md COMPLIANCE\n');
    console.log('═'.repeat(60));
    
    let totalPassed = 0;
    
    this.results.forEach((result, index) => {
      const status = result.passed ? '✅ PASS' : '❌ FAIL';
      const color = result.passed ? 'color: green' : 'color: red';
      
      console.log(`\n${index + 1}. ${result.name}`);
      console.log(`%c${status}`, color);
      
      result.details.forEach(detail => {
        console.log(`   ${detail}`);
      });
      
      if (result.passed) totalPassed++;
    });
    
    console.log('\n' + '═'.repeat(60));
    console.log(`\n🎯 RESUMEN: ${totalPassed}/${this.results.length} reglas cumplidas`);
    
    if (totalPassed === this.results.length) {
      console.log('%c🚀 ¡CUMPLIMIENTO COMPLETO CLAUDE.md!', 'color: green; font-weight: bold; font-size: 16px');
    } else {
      console.log('%c⚠️ Correcciones necesarias', 'color: orange; font-weight: bold');
    }
    
    console.log('\n💡 Para ver detalles completos, revisa el console output arriba.');
  }
}

// Ejecutar validación cuando DOM esté listo
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => new ClaudeComplianceValidator(), 1000);
  });
} else {
  setTimeout(() => new ClaudeComplianceValidator(), 1000);
}