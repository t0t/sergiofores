#!/bin/bash

# QA Automation: Cross-Browser Image Format Testing
# Sergio Forés Portfolio - Comprehensive Browser Testing

echo "============================================="
echo "QA CROSS-BROWSER IMAGE FORMAT TEST SUITE"
echo "============================================="
echo "Date: $(date)"
echo "Project: Sergio Forés Portfolio"
echo ""

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Test configuration
TEST_PORT=8081
TEST_URL="http://localhost:$TEST_PORT"

echo "============================================="
echo "1. PRE-TEST VALIDATION"
echo "============================================="

# Verify we're in the right directory
if [[ ! -f "index.html" ]]; then
    echo -e "${RED}❌ ERROR: index.html not found. Run from project root.${NC}"
    exit 1
fi

# Check for remaining format mismatches
echo -e "${BLUE}Checking for remaining format mismatches...${NC}"
mismatches=$(find . -name "*.jpg" -exec file {} \; | grep "PNG image data" | wc -l)

if [ $mismatches -gt 0 ]; then
    echo -e "${RED}⚠️  WARNING: $mismatches format mismatches still detected${NC}"
    echo -e "${YELLOW}Consider running qa-fix-format-mismatches.sh first${NC}"
    echo ""
    find . -name "*.jpg" -exec file {} \; | grep "PNG image data" | head -5
    echo ""
else
    echo -e "${GREEN}✅ No format mismatches detected${NC}"
fi

echo ""
echo "============================================="
echo "2. STARTING LOCAL TEST SERVER"
echo "============================================="

# Start local server in background
echo -e "${BLUE}Starting HTTP server on port $TEST_PORT...${NC}"
python3 -m http.server $TEST_PORT > /dev/null 2>&1 &
SERVER_PID=$!

# Wait for server to start
sleep 2

# Check if server is running
if kill -0 $SERVER_PID 2>/dev/null; then
    echo -e "${GREEN}✅ Server started successfully (PID: $SERVER_PID)${NC}"
else
    echo -e "${RED}❌ Failed to start server${NC}"
    exit 1
fi

echo ""
echo "============================================="
echo "3. HTTP HEADER ANALYSIS"
echo "============================================="

# Test specific problematic files that should now be fixed
CRITICAL_IMAGES=(
    "img/sergio-arte-plastica.jpg"
    "img/gematria-app.jpg" 
    "img/three-svelte.jpg"
    "img/o1234-nng.jpg"
    "img/castillo-peniscola-alquiler.jpg"
    "img/cerebro-digital-ia.jpg"
)

echo -e "${BLUE}Testing HTTP headers for critical images...${NC}"
echo ""

for img in "${CRITICAL_IMAGES[@]}"; do
    # Check if file exists (might be renamed to .png)
    if [[ -f "$img" ]]; then
        echo -e "${YELLOW}Testing:${NC} $img"
        response=$(curl -s -I "$TEST_URL/$img" 2>/dev/null)
        
        if echo "$response" | grep -q "200 OK"; then
            content_type=$(echo "$response" | grep -i "content-type" | cut -d: -f2- | tr -d ' \r')
            echo -e "${GREEN}  ✅ Status: 200 OK${NC}"
            echo -e "${GREEN}  ✅ Content-Type: $content_type${NC}"
            
            # Check if content-type matches file extension
            if [[ "$img" == *.jpg ]] && [[ "$content_type" != *"jpeg"* ]]; then
                echo -e "${RED}  ⚠️  MIME type mismatch detected${NC}"
            fi
        else
            status=$(echo "$response" | head -1 | cut -d' ' -f2-)
            echo -e "${RED}  ❌ Status: $status${NC}"
        fi
        echo ""
    else
        # Check if it was renamed to .png
        png_version="${img%.jpg}.png"
        if [[ -f "$png_version" ]]; then
            echo -e "${GREEN}✅ File renamed to PNG:${NC} $png_version"
        else
            echo -e "${RED}❌ File not found:${NC} $img"
        fi
        echo ""
    fi
done

echo ""
echo "============================================="
echo "4. BROWSER COMPATIBILITY TESTING"
echo "============================================="

# Create a simple test HTML page with JavaScript detection
cat > test-browser-support.html << 'EOF'
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Image Format Test - Sergio Forés Portfolio</title>
    <style>
        body { font-family: Arial, sans-serif; margin: 20px; }
        .test-result { margin: 10px 0; padding: 10px; border-radius: 5px; }
        .success { background-color: #d4edda; color: #155724; }
        .error { background-color: #f8d7da; color: #721c24; }
        .warning { background-color: #fff3cd; color: #856404; }
        .image-test { margin: 20px 0; }
        img { max-width: 200px; height: auto; margin: 10px; border: 2px solid #ddd; }
        .loaded { border-color: #28a745; }
        .failed { border-color: #dc3545; }
    </style>
</head>
<body>
    <h1>Image Format Compatibility Test</h1>
    <p>Testing image loading for browser compatibility...</p>
    
    <div id="results"></div>
    
    <div class="image-test">
        <h3>Critical Images Test:</h3>
EOF

# Add critical images to test HTML
for img in "${CRITICAL_IMAGES[@]}"; do
    if [[ -f "$img" ]]; then
        echo "        <img src=\"$img\" alt=\"Test $(basename "$img")\" id=\"$(basename "$img" .jpg)\">" >> test-browser-support.html
    else
        png_version="${img%.jpg}.png"
        if [[ -f "$png_version" ]]; then
            echo "        <img src=\"$png_version\" alt=\"Test $(basename "$png_version")\" id=\"$(basename "$png_version" .png)\">" >> test-browser-support.html
        fi
    fi
done

cat >> test-browser-support.html << 'EOF'
    </div>

    <script>
        const results = document.getElementById('results');
        const images = document.querySelectorAll('img');
        let loadedCount = 0;
        let failedCount = 0;
        
        function addResult(message, type) {
            const div = document.createElement('div');
            div.className = `test-result ${type}`;
            div.textContent = message;
            results.appendChild(div);
        }
        
        function testComplete() {
            addResult(`Test Complete: ${loadedCount} images loaded, ${failedCount} failed`, 
                      failedCount === 0 ? 'success' : 'warning');
            
            // Browser detection
            const userAgent = navigator.userAgent;
            let browser = 'Unknown';
            if (userAgent.includes('Chrome')) browser = 'Chrome';
            else if (userAgent.includes('Firefox')) browser = 'Firefox';
            else if (userAgent.includes('Safari')) browser = 'Safari';
            else if (userAgent.includes('Edge')) browser = 'Edge';
            
            addResult(`Browser: ${browser}`, 'success');
            addResult(`User Agent: ${userAgent}`, 'success');
        }
        
        images.forEach((img, index) => {
            img.onload = function() {
                this.classList.add('loaded');
                loadedCount++;
                addResult(`✅ Loaded: ${this.src}`, 'success');
                if (loadedCount + failedCount === images.length) testComplete();
            };
            
            img.onerror = function() {
                this.classList.add('failed');
                failedCount++;
                addResult(`❌ Failed: ${this.src}`, 'error');
                if (loadedCount + failedCount === images.length) testComplete();
            };
        });
        
        // Timeout test
        setTimeout(() => {
            if (loadedCount + failedCount < images.length) {
                addResult(`⚠️ Timeout: Some images didn't load within 10 seconds`, 'warning');
                testComplete();
            }
        }, 10000);
        
        addResult('🔄 Starting image load test...', 'success');
    </script>
</body>
</html>
EOF

echo -e "${GREEN}✅ Created test page: test-browser-support.html${NC}"

echo ""
echo "============================================="
echo "5. AUTOMATED BROWSER TESTING"
echo "============================================="

echo -e "${BLUE}Opening test page in available browsers...${NC}"
echo ""

# Test in Chrome
if command -v "Google Chrome" &> /dev/null || [[ -d "/Applications/Google Chrome.app" ]]; then
    echo -e "${GREEN}🌐 Opening in Chrome...${NC}"
    open -a "Google Chrome" "$TEST_URL/test-browser-support.html" 2>/dev/null || echo -e "${YELLOW}⚠️  Chrome not available${NC}"
fi

# Test in Safari
if [[ -d "/Applications/Safari.app" ]]; then
    echo -e "${GREEN}🌐 Opening in Safari...${NC}"
    open -a Safari "$TEST_URL/test-browser-support.html" 2>/dev/null || echo -e "${YELLOW}⚠️  Safari not available${NC}"
fi

# Test in Firefox
if [[ -d "/Applications/Firefox.app" ]]; then
    echo -e "${GREEN}🌐 Opening in Firefox...${NC}"
    open -a Firefox "$TEST_URL/test-browser-support.html" 2>/dev/null || echo -e "${YELLOW}⚠️  Firefox not available${NC}"
fi

# Test in Edge
if [[ -d "/Applications/Microsoft Edge.app" ]]; then
    echo -e "${GREEN}🌐 Opening in Edge...${NC}"
    open -a "Microsoft Edge" "$TEST_URL/test-browser-support.html" 2>/dev/null || echo -e "${YELLOW}⚠️  Edge not available${NC}"
fi

echo ""
echo "============================================="
echo "6. PERFORMANCE TESTING"
echo "============================================="

echo -e "${BLUE}Running basic performance tests...${NC}"

# Test main page load time
start_time=$(date +%s%N)
response=$(curl -s -w "%{http_code},%{time_total}" "$TEST_URL" | tail -1)
end_time=$(date +%s%N)

http_code=$(echo $response | cut -d, -f1)
load_time=$(echo $response | cut -d, -f2)

if [[ "$http_code" == "200" ]]; then
    echo -e "${GREEN}✅ Main page load: ${load_time}s (HTTP $http_code)${NC}"
else
    echo -e "${RED}❌ Main page load failed: HTTP $http_code${NC}"
fi

# Test image load times
echo ""
echo -e "${BLUE}Testing individual image load times...${NC}"

for img in "${CRITICAL_IMAGES[@]}"; do
    if [[ -f "$img" ]] || [[ -f "${img%.jpg}.png" ]]; then
        # Use existing file or PNG version
        test_img="$img"
        [[ ! -f "$img" ]] && test_img="${img%.jpg}.png"
        
        response=$(curl -s -w "%{http_code},%{time_total},%{size_download}" "$TEST_URL/$test_img" -o /dev/null | tail -1)
        http_code=$(echo $response | cut -d, -f1)
        load_time=$(echo $response | cut -d, -f2)
        size=$(echo $response | cut -d, -f3)
        
        if [[ "$http_code" == "200" ]]; then
            echo -e "${GREEN}✅ $(basename "$test_img"): ${load_time}s (${size} bytes)${NC}"
        else
            echo -e "${RED}❌ $(basename "$test_img"): HTTP $http_code${NC}"
        fi
    fi
done

echo ""
echo "============================================="
echo "7. ACCESSIBILITY TESTING"
echo "============================================="

echo -e "${BLUE}Checking accessibility compliance...${NC}"

# Check for alt attributes
missing_alt=$(grep -c '<img[^>]*src[^>]*>' index.html) 2>/dev/null || 0
has_alt=$(grep -c '<img[^>]*alt=' index.html) 2>/dev/null || 0

echo -e "${GREEN}Images with alt attributes: $has_alt${NC}"

if [[ $missing_alt -gt $has_alt ]]; then
    echo -e "${YELLOW}⚠️  Some images may be missing alt attributes${NC}"
else
    echo -e "${GREEN}✅ All images appear to have alt attributes${NC}"
fi

echo ""
echo "============================================="
echo "8. CLEANUP AND SUMMARY"
echo "============================================="

# Stop server
echo -e "${BLUE}Stopping test server...${NC}"
kill $SERVER_PID 2>/dev/null
echo -e "${GREEN}✅ Server stopped${NC}"

# Cleanup test file
rm -f test-browser-support.html
echo -e "${GREEN}✅ Test files cleaned up${NC}"

echo ""
echo "============================================="
echo "TESTING SUMMARY"
echo "============================================="

cat << EOF
✅ HTTP server testing completed
✅ Cross-browser compatibility testing initiated  
✅ Performance benchmarks recorded
✅ Accessibility checks performed
✅ Test artifacts cleaned up

MANUAL VERIFICATION REQUIRED:
□ Check browser windows that opened for visual inspection
□ Verify no broken images in any browser
□ Confirm lazy loading works correctly
□ Test responsive behavior on mobile
□ Run Lighthouse audit for performance scores

NEXT STEPS:
1. Review test results in opened browser windows
2. Address any failed image loads
3. Run production deployment if all tests pass
4. Monitor for 404 errors in production logs

Test completed at: $(date)
EOF

echo "============================================="