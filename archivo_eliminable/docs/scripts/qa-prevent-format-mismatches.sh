#!/bin/bash

# QA Automation: Prevention Script for Future Format Mismatches
# Sergio Forés Portfolio - Pre-commit Hook / CI/CD Integration

echo "============================================="
echo "QA FORMAT MISMATCH PREVENTION SCRIPT"
echo "============================================="
echo "Date: $(date)"
echo "Project: Sergio Forés Portfolio"
echo "Purpose: Prevent future format mismatches in images"
echo ""

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Exit codes
EXIT_SUCCESS=0
EXIT_FAILURE=1

# Validation functions
validate_image_formats() {
    local issues_found=0
    local total_images=0
    
    echo -e "${BLUE}Validating image format consistency...${NC}"
    echo ""
    
    # Check .jpg files for PNG format
    while IFS= read -r -d '' file; do
        ((total_images++))
        
        format_info=$(file "$file")
        
        if [[ $format_info == *"PNG image data"* ]]; then
            echo -e "${RED}❌ FORMAT MISMATCH:${NC} $file"
            echo -e "   ${YELLOW}Expected:${NC} JPEG"
            echo -e "   ${YELLOW}Actual:${NC} PNG"
            ((issues_found++))
        fi
    done < <(find . -name "*.jpg" -print0)
    
    # Check .png files for JPEG format
    while IFS= read -r -d '' file; do
        ((total_images++))
        
        format_info=$(file "$file")
        
        if [[ $format_info == *"JPEG image data"* ]]; then
            echo -e "${RED}❌ FORMAT MISMATCH:${NC} $file"
            echo -e "   ${YELLOW}Expected:${NC} PNG"
            echo -e "   ${YELLOW}Actual:${NC} JPEG"
            ((issues_found++))
        fi
    done < <(find . -name "*.png" -print0)
    
    echo ""
    echo -e "${BLUE}Scan Results:${NC}"
    echo -e "Total images checked: $total_images"
    echo -e "Format mismatches found: $issues_found"
    
    return $issues_found
}

validate_html_references() {
    local broken_refs=0
    
    echo -e "${BLUE}Validating HTML image references...${NC}"
    echo ""
    
    # Extract image sources from HTML
    image_refs=$(grep -o 'src="[^"]*\.\(jpg\|jpeg\|png\|gif\|webp\)"' index.html | sed 's/src="//g' | sed 's/"//g')
    
    for ref in $image_refs; do
        # Skip external URLs
        if [[ $ref == http* ]]; then
            continue
        fi
        
        # Check if file exists
        if [[ ! -f "$ref" ]]; then
            echo -e "${RED}❌ BROKEN REFERENCE:${NC} $ref"
            echo -e "   ${YELLOW}Referenced in:${NC} index.html"
            ((broken_refs++))
        else
            echo -e "${GREEN}✅ VALID REFERENCE:${NC} $ref"
        fi
    done
    
    echo ""
    echo -e "${BLUE}HTML Reference Check Results:${NC}"
    echo -e "Broken references found: $broken_refs"
    
    return $broken_refs
}

validate_webp_alternatives() {
    local missing_webp=0
    
    echo -e "${BLUE}Checking WebP optimization opportunities...${NC}"
    echo ""
    
    # Find images that could benefit from WebP alternatives
    while IFS= read -r -d '' file; do
        webp_file="${file%.*}.webp"
        
        if [[ ! -f "$webp_file" ]]; then
            file_size=$(stat -f%z "$file" 2>/dev/null || stat -c%s "$file" 2>/dev/null)
            
            # Suggest WebP for files larger than 50KB
            if [[ $file_size -gt 51200 ]]; then
                echo -e "${YELLOW}⚠️  OPTIMIZATION OPPORTUNITY:${NC} $file"
                echo -e "   ${YELLOW}Size:${NC} $(( file_size / 1024 ))KB"
                echo -e "   ${YELLOW}Suggestion:${NC} Create WebP version: $webp_file"
                ((missing_webp++))
            fi
        else
            echo -e "${GREEN}✅ WebP EXISTS:${NC} $webp_file"
        fi
    done < <(find . -name "*.jpg" -o -name "*.png" | head -20)
    
    echo ""
    echo -e "${BLUE}WebP Optimization Results:${NC}"
    echo -e "Images that could benefit from WebP: $missing_webp"
    
    return 0  # Don't fail build for missing WebP
}

generate_format_report() {
    local report_file="image-format-report-$(date +%Y%m%d-%H%M%S).txt"
    
    echo -e "${BLUE}Generating detailed format report...${NC}"
    
    {
        echo "======================================"
        echo "IMAGE FORMAT ANALYSIS REPORT"
        echo "======================================"
        echo "Date: $(date)"
        echo "Project: Sergio Forés Portfolio"
        echo ""
        
        echo "JPEG FILES (.jpg):"
        echo "=================="
        find . -name "*.jpg" -exec file {} \; | sort
        echo ""
        
        echo "PNG FILES (.png):"
        echo "================="
        find . -name "*.png" -exec file {} \; | sort
        echo ""
        
        echo "WEBP FILES (.webp):"
        echo "==================="
        find . -name "*.webp" -exec file {} \; | sort
        echo ""
        
        echo "FILE SIZE ANALYSIS:"
        echo "==================="
        find . \( -name "*.jpg" -o -name "*.png" -o -name "*.webp" \) -exec ls -lh {} \; | sort -k5 -hr | head -20
        echo ""
        
        echo "HTML IMAGE REFERENCES:"
        echo "======================"
        grep -n 'src="[^"]*\.\(jpg\|jpeg\|png\|gif\|webp\)"' index.html || echo "No image references found"
        echo ""
        
    } > "$report_file"
    
    echo -e "${GREEN}✅ Report generated: $report_file${NC}"
    echo ""
}

setup_git_hooks() {
    echo -e "${BLUE}Setting up Git pre-commit hook for format validation...${NC}"
    
    if [[ ! -d ".git" ]]; then
        echo -e "${YELLOW}⚠️  Not a Git repository. Skipping hook setup.${NC}"
        return 0
    fi
    
    mkdir -p .git/hooks
    
    cat > .git/hooks/pre-commit << 'EOF'
#!/bin/bash

# Pre-commit hook: Image format validation
echo "🔍 Checking image format consistency..."

# Run format validation
./qa-prevent-format-mismatches.sh --git-hook

exit_code=$?

if [ $exit_code -ne 0 ]; then
    echo ""
    echo "❌ COMMIT BLOCKED: Image format issues detected"
    echo "Run ./qa-fix-format-mismatches.sh to resolve issues"
    echo "Or fix manually and try committing again"
    exit 1
fi

echo "✅ Image format validation passed"
EOF
    
    chmod +x .git/hooks/pre-commit
    echo -e "${GREEN}✅ Pre-commit hook installed${NC}"
}

create_ci_config() {
    echo -e "${BLUE}Creating CI/CD configuration for format validation...${NC}"
    
    mkdir -p .github/workflows
    
    cat > .github/workflows/image-format-validation.yml << 'EOF'
name: Image Format Validation

on:
  push:
    branches: [ main, develop ]
  pull_request:
    branches: [ main ]

jobs:
  validate-images:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v3
    
    - name: Install dependencies
      run: |
        sudo apt-get update
        sudo apt-get install -y file
    
    - name: Validate image formats
      run: |
        chmod +x qa-prevent-format-mismatches.sh
        ./qa-prevent-format-mismatches.sh --ci
    
    - name: Upload format report
      if: always()
      uses: actions/upload-artifact@v3
      with:
        name: image-format-report
        path: image-format-report-*.txt
EOF
    
    echo -e "${GREEN}✅ GitHub Actions workflow created${NC}"
}

main() {
    local total_issues=0
    local run_mode="default"
    
    # Parse command line arguments
    case "${1:-}" in
        --git-hook)
            run_mode="git-hook"
            echo -e "${BLUE}Running in Git hook mode${NC}"
            ;;
        --ci)
            run_mode="ci"
            echo -e "${BLUE}Running in CI/CD mode${NC}"
            ;;
        --setup)
            setup_git_hooks
            create_ci_config
            echo -e "${GREEN}🎉 Setup completed!${NC}"
            exit $EXIT_SUCCESS
            ;;
        --help)
            cat << EOF
Usage: $0 [OPTIONS]

OPTIONS:
    --git-hook    Run in Git pre-commit hook mode
    --ci          Run in CI/CD mode
    --setup       Setup Git hooks and CI configuration
    --help        Show this help message

DESCRIPTION:
    Validates image format consistency to prevent mismatches
    between file extensions and actual image formats.

EXAMPLES:
    $0                    # Run full validation with report
    $0 --git-hook        # Quick validation for Git hook
    $0 --ci              # CI/CD validation mode
    $0 --setup           # Setup automation tools
EOF
            exit $EXIT_SUCCESS
            ;;
    esac
    
    echo ""
    echo "============================================="
    echo "1. FORMAT VALIDATION"
    echo "============================================="
    
    validate_image_formats
    local format_issues=$?
    total_issues=$((total_issues + format_issues))
    
    echo ""
    echo "============================================="
    echo "2. HTML REFERENCE VALIDATION"
    echo "============================================="
    
    validate_html_references
    local ref_issues=$?
    total_issues=$((total_issues + ref_issues))
    
    if [[ "$run_mode" != "git-hook" ]]; then
        echo ""
        echo "============================================="
        echo "3. OPTIMIZATION ANALYSIS"
        echo "============================================="
        
        validate_webp_alternatives
        
        echo ""
        echo "============================================="
        echo "4. GENERATING REPORT"
        echo "============================================="
        
        generate_format_report
    fi
    
    echo ""
    echo "============================================="
    echo "VALIDATION SUMMARY"
    echo "============================================="
    
    if [[ $total_issues -eq 0 ]]; then
        echo -e "${GREEN}🎉 ALL VALIDATIONS PASSED!${NC}"
        echo -e "${GREEN}✅ No format mismatches detected${NC}"
        echo -e "${GREEN}✅ No broken image references${NC}"
        
        if [[ "$run_mode" == "git-hook" ]]; then
            echo -e "${GREEN}✅ Safe to commit${NC}"
        fi
        
        exit $EXIT_SUCCESS
    else
        echo -e "${RED}❌ VALIDATION FAILED${NC}"
        echo -e "${RED}Total issues found: $total_issues${NC}"
        
        if [[ "$run_mode" == "git-hook" ]]; then
            echo -e "${RED}❌ Commit blocked${NC}"
        elif [[ "$run_mode" == "ci" ]]; then
            echo -e "${RED}❌ Build should fail${NC}"
        fi
        
        echo ""
        echo "RECOMMENDED ACTIONS:"
        echo "1. Run ./qa-fix-format-mismatches.sh to fix format issues"
        echo "2. Verify all image references in HTML"
        echo "3. Re-run validation after fixes"
        
        exit $EXIT_FAILURE
    fi
}

# Run main function with all arguments
main "$@"