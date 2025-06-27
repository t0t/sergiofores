#!/bin/bash

# PREVENT IMAGE MISMATCHES SCRIPT
# Automatización para prevenir referencias rotas de imágenes
# Mobile UX Specialist - Sergio Forés Portfolio

set -e

echo "🔍 Image Mismatch Prevention Script"
echo "=================================="

# Colores para output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Directorios
IMG_DIR="./img"
HTML_FILES="./index.html"
REPORT_FILE="./image-mismatch-report.txt"

# Función de logging
log() {
    echo -e "${BLUE}[$(date +'%H:%M:%S')]${NC} $1"
}

warn() {
    echo -e "${YELLOW}⚠️  WARNING:${NC} $1"
}

error() {
    echo -e "${RED}❌ ERROR:${NC} $1"
}

success() {
    echo -e "${GREEN}✅ SUCCESS:${NC} $1"
}

# Verificar dependencias
check_dependencies() {
    log "Checking dependencies..."
    
    if ! command -v grep &> /dev/null; then
        error "grep is required but not installed"
        exit 1
    fi
    
    if ! command -v find &> /dev/null; then
        error "find is required but not installed"
        exit 1
    fi
    
    success "All dependencies available"
}

# Escanear archivos de imagen existentes
scan_existing_images() {
    log "Scanning existing images in $IMG_DIR..."
    
    if [ ! -d "$IMG_DIR" ]; then
        error "Image directory $IMG_DIR does not exist"
        exit 1
    fi
    
    # Crear lista de archivos existentes
    find "$IMG_DIR" -name "*.jpg" -o -name "*.jpeg" -o -name "*.png" -o -name "*.webp" -o -name "*.svg" | sort > /tmp/existing_images.txt
    
    local count=$(wc -l < /tmp/existing_images.txt)
    success "Found $count images in $IMG_DIR"
}

# Extraer referencias de HTML
extract_html_references() {
    log "Extracting image references from HTML..."
    
    if [ ! -f "$HTML_FILES" ]; then
        error "HTML file $HTML_FILES does not exist"
        exit 1
    fi
    
    # Extraer src y srcset de HTML
    {
        grep -o 'src="[^"]*"' "$HTML_FILES" | sed 's/src="//g; s/"//g'
        grep -o 'srcset="[^"]*"' "$HTML_FILES" | sed 's/srcset="//g; s/"//g' | cut -d' ' -f1
    } | grep -E "\.(jpg|jpeg|png|webp|svg)$" | sort | uniq > /tmp/html_references.txt
    
    local count=$(wc -l < /tmp/html_references.txt)
    success "Found $count image references in HTML"
}

# Comparar referencias vs archivos existentes
compare_references() {
    log "Comparing HTML references vs existing files..."
    
    # Archivos referenciados pero no existentes
    comm -23 /tmp/html_references.txt /tmp/existing_images.txt > /tmp/missing_images.txt
    
    # Archivos existentes pero no referenciados (orphans)
    comm -13 /tmp/html_references.txt /tmp/existing_images.txt > /tmp/orphan_images.txt
    
    local missing_count=$(wc -l < /tmp/missing_images.txt)
    local orphan_count=$(wc -l < /tmp/orphan_images.txt)
    
    if [ $missing_count -gt 0 ]; then
        error "Found $missing_count missing images"
        echo "Missing images:"
        cat /tmp/missing_images.txt | sed 's/^/  - /'
    else
        success "No missing images found"
    fi
    
    if [ $orphan_count -gt 0 ]; then
        warn "Found $orphan_count orphan images"
        echo "Orphan images:"
        cat /tmp/orphan_images.txt | sed 's/^/  - /'
    else
        success "No orphan images found"
    fi
}

# Generar reporte detallado
generate_report() {
    log "Generating detailed report..."
    
    cat > "$REPORT_FILE" << EOF
IMAGE MISMATCH PREVENTION REPORT
Generated: $(date)
Portfolio: Sergio Forés - sergiofores
================================

SUMMARY:
- HTML file analyzed: $HTML_FILES
- Image directory: $IMG_DIR
- Total existing images: $(wc -l < /tmp/existing_images.txt)
- Total HTML references: $(wc -l < /tmp/html_references.txt)
- Missing images: $(wc -l < /tmp/missing_images.txt)
- Orphan images: $(wc -l < /tmp/orphan_images.txt)

MISSING IMAGES (referenced in HTML but file not found):
$(cat /tmp/missing_images.txt | sed 's/^/- /')

ORPHAN IMAGES (file exists but not referenced in HTML):
$(cat /tmp/orphan_images.txt | sed 's/^/- /')

EXISTING IMAGES:
$(cat /tmp/existing_images.txt | sed 's/^/- /')

HTML REFERENCES:
$(cat /tmp/html_references.txt | sed 's/^/- /')

MOBILE UX IMPACT:
- Missing images cause 404 errors and performance degradation
- Failed WebP loads force fallback delays on mobile networks
- Orphan files consume unnecessary storage space
- Picture element failures impact Core Web Vitals

RECOMMENDATIONS:
1. Fix missing image references immediately
2. Generate missing WebP files or remove HTML references
3. Consider using orphan images or remove unused files
4. Implement automated validation in CI/CD pipeline
5. Add error handling for robust mobile experience

EOF

    success "Report generated: $REPORT_FILE"
}

# Sugerir correcciones automáticas
suggest_fixes() {
    log "Analyzing potential fixes..."
    
    local missing_count=$(wc -l < /tmp/missing_images.txt)
    
    if [ $missing_count -gt 0 ]; then
        echo ""
        echo "🔧 AUTOMATED FIX SUGGESTIONS:"
        echo "=============================="
        
        # Analizar tipos de problemas
        local webp_missing=$(grep -c "\.webp$" /tmp/missing_images.txt || true)
        local jpg_missing=$(grep -c "\\.jpg$\\|\\.jpeg$" /tmp/missing_images.txt || true)
        local png_missing=$(grep -c "\.png$" /tmp/missing_images.txt || true)
        
        if [ $webp_missing -gt 0 ]; then
            echo "📝 WebP References ($webp_missing files):"
            echo "   Solution: Remove WebP <source> elements and use JPG fallbacks"
            echo "   Command: sed -i 's/<source[^>]*\\.webp[^>]*>//g' $HTML_FILES"
        fi
        
        if [ $jpg_missing -gt 0 ]; then
            echo "📝 JPG References ($jpg_missing files):"
            echo "   Solution: Check file names and paths, possibly rename files"
        fi
        
        if [ $png_missing -gt 0 ]; then
            echo "📝 PNG References ($png_missing files):"
            echo "   Solution: Convert from other formats or fix file paths"
        fi
        
        echo ""
        echo "🚀 QUICK FIX COMMANDS:"
        echo "====================="
        echo "# Remove broken WebP sources:"
        echo "sed -i 's/<source[^>]*srcset=\"[^\"]*\\.webp\"[^>]*>//g' $HTML_FILES"
        echo ""
        echo "# Clean up empty picture elements:"
        echo "sed -i '/<picture[^>]*>\\s*<img/,/<\\/picture>/c\\<img' $HTML_FILES"
    fi
}

# Validar correcciones
validate_fixes() {
    log "Validating HTML structure after potential fixes..."
    
    # Verificar que no hay picture elements vacíos
    local empty_pictures=$(grep -c '<picture[^>]*>\\s*</picture>' "$HTML_FILES" || true)
    if [ $empty_pictures -gt 0 ]; then
        warn "Found $empty_pictures empty picture elements"
    fi
    
    # Verificar que img tags tienen src
    local imgs_without_src=$(grep -c '<img[^>]*>' "$HTML_FILES" | grep -v 'src=' || true)
    if [ ! -z "$imgs_without_src" ] && [ $imgs_without_src -gt 0 ]; then
        warn "Found img tags without src attribute"
    fi
    
    success "HTML structure validation complete"
}

# Función principal
main() {
    echo "Starting image mismatch prevention check..."
    echo "Target: Mobile UX optimization for Sergio Forés Portfolio"
    echo ""
    
    check_dependencies
    scan_existing_images  
    extract_html_references
    compare_references
    generate_report
    suggest_fixes
    validate_fixes
    
    echo ""
    echo "🏁 IMAGE MISMATCH PREVENTION COMPLETE"
    echo "====================================="
    
    local missing_count=$(wc -l < /tmp/missing_images.txt)
    local orphan_count=$(wc -l < /tmp/orphan_images.txt)
    
    if [ $missing_count -eq 0 ] && [ $orphan_count -eq 0 ]; then
        success "Perfect! No image mismatches detected."
        success "Mobile UX should be optimal for image loading."
    else
        if [ $missing_count -gt 0 ]; then
            error "Action required: $missing_count missing images need attention"
        fi
        if [ $orphan_count -gt 0 ]; then
            warn "Optimization opportunity: $orphan_count orphan images could be cleaned up"
        fi
    fi
    
    echo ""
    echo "📊 Report saved to: $REPORT_FILE"
    echo "🔧 Run suggested fixes to optimize mobile performance"
    
    # Cleanup temp files
    rm -f /tmp/existing_images.txt /tmp/html_references.txt /tmp/missing_images.txt /tmp/orphan_images.txt
}

# Ejecutar función principal
main "$@"