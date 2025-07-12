#!/bin/bash

# QA Automation Script: Image Format Mismatch Detection
# Sergio Forés Portfolio - Comprehensive Testing

echo "============================================="
echo "QA IMAGE FORMAT MISMATCH ANALYSIS REPORT"
echo "============================================="
echo "Date: $(date)"
echo "Project: Sergio Forés Portfolio"
echo "Issue: PNG files with .jpg extension causing loading issues"
echo ""

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Counter variables
MISMATCH_COUNT=0
TOTAL_JPG_COUNT=0
CRITICAL_ISSUES=0

echo "============================================="
echo "1. COMPLETE FILE ANALYSIS"
echo "============================================="

echo -e "${BLUE}Scanning all .jpg files in project...${NC}"
echo ""

# Find all .jpg files and analyze them
while IFS= read -r -d '' file; do
    TOTAL_JPG_COUNT=$((TOTAL_JPG_COUNT + 1))
    format_info=$(file "$file")
    
    if [[ $format_info == *"PNG image data"* ]]; then
        MISMATCH_COUNT=$((MISMATCH_COUNT + 1))
        echo -e "${RED}❌ FORMAT MISMATCH:${NC} $file"
        echo -e "   ${YELLOW}Declared:${NC} .jpg"
        echo -e "   ${YELLOW}Actual:${NC} PNG"
        echo -e "   ${YELLOW}Details:${NC} $(echo "$format_info" | cut -d: -f2-)"
        
        # Check if it's referenced in main HTML
        if grep -q "$(basename "$file")" index.html; then
            CRITICAL_ISSUES=$((CRITICAL_ISSUES + 1))
            echo -e "   ${RED}🚨 CRITICAL: Referenced in main HTML!${NC}"
        fi
        echo ""
    elif [[ $format_info == *"JPEG image data"* ]]; then
        echo -e "${GREEN}✅ FORMAT OK:${NC} $file"
    else
        echo -e "${YELLOW}⚠️  UNKNOWN FORMAT:${NC} $file"
        echo -e "   ${YELLOW}Details:${NC} $(echo "$format_info" | cut -d: -f2-)"
    fi
done < <(find . -name "*.jpg" -print0)

echo ""
echo "============================================="
echo "2. IMPACT ANALYSIS"
echo "============================================="

echo -e "${BLUE}Files analyzed:${NC} $TOTAL_JPG_COUNT"
echo -e "${RED}Format mismatches found:${NC} $MISMATCH_COUNT"
echo -e "${RED}Critical issues (in main HTML):${NC} $CRITICAL_ISSUES"
echo ""

# Browser compatibility analysis
echo "BROWSER COMPATIBILITY IMPACT:"
echo "• Chrome: May display with warnings, inconsistent MIME type handling"
echo "• Safari: Strict MIME type checking, potential loading failures"
echo "• Firefox: May work but with performance penalties"
echo "• Edge: Similar to Chrome, potential caching issues"
echo ""

# Performance impact
echo "PERFORMANCE IMPACT:"
echo "• Incorrect MIME type detection causes processing delays"
echo "• Browser may need multiple attempts to decode"
echo "• Lazy loading may malfunction with format confusion"
echo "• CDN/caching issues with incorrect Content-Type headers"
echo ""

echo "============================================="
echo "3. REFERENCES IN HTML"
echo "============================================="

echo "Checking main HTML for problematic references..."
echo ""

# Check specific problematic files
PROBLEM_FILES=(
    "sergio-arte-plastica.jpg"
    "gematria-app.jpg" 
    "three-svelte.jpg"
    "o1234-nng.jpg"
    "castillo-peniscola-alquiler.jpg"
    "cerebro-digital-ia.jpg"
    "noeliarequena-fixed.jpg"
)

for prob_file in "${PROBLEM_FILES[@]}"; do
    if grep -q "$prob_file" index.html; then
        line_num=$(grep -n "$prob_file" index.html | cut -d: -f1)
        echo -e "${RED}🚨 FOUND:${NC} $prob_file at line $line_num"
        grep -n "$prob_file" index.html | head -1
        echo ""
    fi
done

echo "============================================="
echo "4. RECOMMENDED FIXES"
echo "============================================="

echo "OPTION 1 - Rename extensions (Recommended):"
echo "# Rename PNG files to have .png extension"
for prob_file in "${PROBLEM_FILES[@]}"; do
    # Find the actual problematic files
    actual_files=$(find . -name "$prob_file" -exec file {} \; | grep "PNG image data" | cut -d: -f1)
    for actual_file in $actual_files; do
        new_name=$(echo "$actual_file" | sed 's/\.jpg$/.png/')
        echo "mv '$actual_file' '$new_name'"
    done
done
echo ""

echo "OPTION 2 - Convert to JPEG:"
echo "# Convert PNG files to actual JPEG format"
for prob_file in "${PROBLEM_FILES[@]}"; do
    actual_files=$(find . -name "$prob_file" -exec file {} \; | grep "PNG image data" | cut -d: -f1)
    for actual_file in $actual_files; do
        echo "sips -s format jpeg '$actual_file' --out '$actual_file'"
    done
done
echo ""

echo "UPDATE HTML REFERENCES (if using Option 1):"
echo "# Update HTML files to use .png extension"
for prob_file in "${PROBLEM_FILES[@]}"; do
    new_name=$(echo "$prob_file" | sed 's/\.jpg$/.png/')
    echo "sed -i '' 's/$prob_file/$new_name/g' index.html"
done

echo ""
echo "============================================="
echo "5. TESTING CHECKLIST"
echo "============================================="

cat << EOF
□ Fix format mismatches using one of the recommended options
□ Update HTML references if changing extensions
□ Test in Chrome (latest)
□ Test in Safari (latest) 
□ Test in Firefox (latest)
□ Test in Edge (latest)
□ Verify lazy loading works correctly
□ Check browser developer tools for errors
□ Validate no 404s or loading issues
□ Test on mobile devices
□ Verify picture element fallbacks work
□ Check WebP alternatives load correctly
□ Performance test with Lighthouse
□ Cross-browser screenshot comparison
EOF

echo ""
echo "============================================="
echo "6. PREVENTION MEASURES"
echo "============================================="

cat << EOF
□ Set up pre-commit hook to check file format consistency
□ Add automated testing for image format validation
□ Create build script that verifies MIME types
□ Document file naming conventions
□ Add file format validation to CI/CD pipeline
□ Regular audit script for format consistency
EOF

echo ""
if [ $CRITICAL_ISSUES -gt 0 ]; then
    echo -e "${RED}🚨 CRITICAL ISSUES DETECTED: $CRITICAL_ISSUES files need immediate attention${NC}"
    echo -e "${RED}Priority: HIGH - These files are referenced in main HTML${NC}"
else
    echo -e "${GREEN}✅ No critical issues in main HTML references${NC}"
fi

echo ""
echo "Report generated by: QA Automation Engineer"
echo "============================================="