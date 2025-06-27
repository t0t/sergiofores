# MOBILE CROSS-BROWSER TEST PLAN
## Portfolio sergiofores - Testing Strategy para Image Loading

### OBJETIVO
Verificar que las correcciones de picture elements funcionen consistentemente en todos los dispositivos y browsers móviles, eliminando imágenes borrosas y failed requests.

### BROWSERS & DEVICES TARGET

#### iOS Testing
- **Safari iOS** (15.0+, 16.0+, 17.0+)
  - iPhone SE (2nd gen) - 4.7" screen
  - iPhone 12/13/14 - 6.1" screen  
  - iPhone 14 Pro Max - 6.7" screen
  - iPad Air - 10.9" screen

#### Android Testing
- **Chrome Mobile** (110+, 115+, latest)
  - Samsung Galaxy S22 - 6.1" screen
  - Google Pixel 7 - 6.3" screen
  - Samsung Galaxy A54 - 6.4" screen
  - OnePlus Nord - 6.44" screen

- **Samsung Internet** (20.0+, 21.0+)
  - Galaxy S22, Galaxy Tab S8

- **Firefox Mobile** (115+, latest)
  - Standard Android devices

#### Network Conditions
- **Fast 3G** (1.6 Mbps, 150ms RTT)
- **Slow 3G** (0.4 Mbps, 400ms RTT)  
- **4G LTE** (12 Mbps, 70ms RTT)
- **5G** (100+ Mbps, <50ms RTT)
- **WiFi** (variable speeds)

### TEST CASES ESPECÍFICOS

#### TC01: Picture Element Loading
**Descripción**: Verificar que picture elements cargan correctamente sin referencias WebP rotas
**Steps**:
1. Abrir portfolio en device target
2. Scroll through all project cards
3. Verificar que todas las imágenes cargan sin blur inicial
4. Comprobar Network tab - no debe haber 404s para WebP
5. Verificar tiempo de carga < 3s en Slow 3G

**Expected Result**: 
- ✅ Todas las imágenes cargan instantáneamente
- ✅ No hay requests fallidos en DevTools
- ✅ No hay blur/placeholder inicial
- ✅ Core Web Vitals: LCP < 2.5s

#### TC02: Lazy Loading Performance
**Descripción**: Verificar que lazy loading funciona eficientemente en mobile
**Steps**:
1. Abrir portfolio, medir initial load
2. Scroll lentamente observando carga progresiva
3. Verificar que imágenes off-screen no cargan inicialmente
4. Medir tiempo desde scroll hasta imagen visible

**Expected Result**:
- ✅ Initial page load < 1MB de imágenes
- ✅ Lazy images load 200ms antes de ser visibles
- ✅ Smooth scrolling sin interrupciones

#### TC03: Error Handling Robustness
**Descripción**: Simular condiciones de error para verificar fallbacks
**Steps**:
1. Block image domain en DevTools
2. Reload página
3. Verificar que placeholders aparecen correctamente
4. Unblock y reload - verificar recuperación

**Expected Result**:
- ✅ Placeholders SVG aparecen inmediatamente
- ✅ No broken image icons
- ✅ Graceful degradation

#### TC04: Cross-Browser Picture Element Support
**Descripción**: Verificar compatibilidad de picture elements
**Steps**:
1. Test en cada browser target
2. Verificar que WebP sources funcionan donde soportadas
3. Confirmar fallback a JPG/PNG en browsers sin WebP
4. Validar aspect ratio consistency

**Expected Result**:
- ✅ Consistent image display across browsers
- ✅ Proper format selection per browser capabilities
- ✅ No layout shifts (CLS < 0.1)

### HERRAMIENTAS DE TESTING

#### Browser-Based Testing
```bash
# Chrome DevTools Mobile Emulation
chrome --remote-debugging-port=9222 --user-data-dir=/tmp/chrome-mobile

# Firefox Responsive Design Mode
firefox --devtools --responsive-mode

# Safari Web Inspector (iOS Simulator)
xcrun simctl boot "iPhone 14"
```

#### Performance Testing Tools
```javascript
// Core Web Vitals measurement
import {getCLS, getFID, getFCP, getLCP, getTTFB} from 'web-vitals';

getCLS(console.log);
getFID(console.log);
getFCP(console.log);
getLCP(console.log);
getTTFB(console.log);
```

#### Network Simulation
```bash
# Chrome Network Throttling
chrome --enable-throttling --user-data-dir=/tmp/chrome-throttle

# Charles Proxy Mobile Testing
charles --throttle slow-3g
```

### AUTOMATED TESTING SCRIPT

```javascript
// mobile-browser-test.js
const puppeteer = require('puppeteer');

async function testMobileImageLoading() {
    const browser = await puppeteer.launch({
        headless: false,
        args: ['--enable-throttling']
    });
    
    const page = await browser.newPage();
    
    // Emulate mobile device
    await page.emulate(puppeteer.devices['iPhone 12']);
    
    // Network throttling
    await page.emulateNetworkConditions({
        offline: false,
        downloadThroughput: 1.6 * 1024 * 1024 / 8, // Slow 3G
        uploadThroughput: 750 * 1024 / 8,
        latency: 400
    });
    
    // Navigate and measure
    const response = await page.goto('http://localhost:3000');
    const metrics = await page.metrics();
    
    // Check for failed image requests
    const failedRequests = [];
    page.on('requestfailed', request => {
        if (request.url().includes('.webp') || request.url().includes('.jpg')) {
            failedRequests.push(request.url());
        }
    });
    
    // Wait for images to load
    await page.waitForSelector('img[loading="lazy"]', { timeout: 10000 });
    
    // Scroll to trigger lazy loading
    await page.evaluate(() => {
        window.scrollTo(0, document.body.scrollHeight);
    });
    
    await page.waitForTimeout(5000);
    
    // Capture final metrics
    const finalMetrics = await page.metrics();
    
    console.log('📊 Mobile Test Results:');
    console.log(`Failed Requests: ${failedRequests.length}`);
    console.log(`JavaScript Heap: ${(finalMetrics.JSHeapUsedSize / 1024 / 1024).toFixed(2)}MB`);
    
    await browser.close();
    
    return {
        success: failedRequests.length === 0,
        failedRequests,
        metrics: finalMetrics
    };
}
```

### PERFORMANCE BENCHMARKS

#### Target Metrics Mobile
- **Largest Contentful Paint (LCP)**: < 2.5s
- **Cumulative Layout Shift (CLS)**: < 0.1  
- **First Input Delay (FID)**: < 100ms
- **Total Blocking Time (TBT)**: < 300ms
- **Speed Index**: < 3.0s

#### Image-Specific Metrics
- **Failed Image Requests**: 0
- **Average Image Load Time**: < 1s on 3G
- **Total Image Payload**: < 2MB initial load
- **WebP Adoption Rate**: 60%+ where supported

### TESTING SCHEDULE

#### Phase 1: Core Functionality (Day 1)
- TC01: Picture Element Loading
- TC02: Lazy Loading Performance
- All major browsers iOS/Android

#### Phase 2: Edge Cases (Day 2)
- TC03: Error Handling
- TC04: Cross-Browser Compatibility
- Network condition variations

#### Phase 3: Performance Validation (Day 3)
- Core Web Vitals measurement
- Real device testing
- Performance regression checks

### ISSUE TRACKING TEMPLATE

```markdown
## Mobile Image Issue Template

**Browser**: Safari iOS 16.5
**Device**: iPhone 14 Pro
**Network**: Slow 3G
**Test Case**: TC01 - Picture Element Loading

**Issue Description**:
Image fails to load, shows broken icon

**Steps to Reproduce**:
1. Open portfolio
2. Navigate to project section
3. Observe project card #3

**Expected Result**:
Image loads correctly with fallback

**Actual Result**:
404 error for missing WebP file

**Screenshots**: [attach mobile screenshots]

**Priority**: High/Medium/Low
**Status**: Open/In Progress/Resolved
```

### SUCCESS CRITERIA

#### Functional Requirements
- ✅ 0 failed image requests across all browsers
- ✅ All images load within performance budgets
- ✅ Consistent visual experience cross-device
- ✅ Graceful degradation on slow networks

#### Performance Requirements  
- ✅ Core Web Vitals pass on all test devices
- ✅ Mobile Speed Index < 3.0s
- ✅ Image payload optimized for mobile bandwidth
- ✅ Lazy loading reduces initial load by 70%+

#### Accessibility Requirements
- ✅ Images have proper alt text
- ✅ Focus states work with keyboard navigation
- ✅ Screen reader compatibility
- ✅ High contrast mode support

### SIGN-OFF CHECKLIST

- [ ] All test cases executed on target devices
- [ ] Performance benchmarks met
- [ ] Cross-browser compatibility verified
- [ ] Error handling validated
- [ ] Accessibility compliance confirmed
- [ ] Documentation updated
- [ ] Monitoring dashboards configured

**Test Lead**: ___________________ **Date**: ___________
**UX Lead**: ____________________ **Date**: ___________  
**Dev Lead**: ___________________ **Date**: ___________