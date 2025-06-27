#!/bin/bash

# =====================================================
# SERGIO FORÉS PORTFOLIO - IMAGE OPTIMIZATION SCRIPT
# =====================================================
# Performance Engineering Script para reducir peso de imágenes
# Target: 26MB → 5MB (80% reducción manteniendo calidad visual)
# 
# CRITICAL IMAGES ANALYSIS:
# - sergio-arte-plastica.jpg: 6.2M (3840x1882 PNG → WebP optimizada)
# - repositorio-01234-v4.jpg: 4.9M (3840x1882 PNG → WebP optimizada)  
# - taller-01234-blanes.jpg: 4.7M (3840x1882 PNG → WebP optimizada)
# - o1234-slidev.jpg: 4.4M (3840x1882 PNG → WebP optimizada)
# - noeliarequena-com.jpg: 1.9M (3840x1882 PNG → WebP optimizada)
# - castillo-peniscola-alquiler.jpg: 1.6M (3840x1882 PNG → WebP optimizada)
# 
# STRATEGY:
# 1. Crear versiones WebP de alta calidad (85%)
# 2. Redimensionar a 1920x943 (50% smaller, aún retina)
# 3. Implementar lazy loading en HTML
# 4. Backup originals para rollback si es necesario
# =====================================================

set -e  # Exit on any error

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}=== SERGIO FORÉS PORTFOLIO - IMAGE OPTIMIZATION ===${NC}"
echo -e "${YELLOW}Target: Reduce 26MB → 5MB (80% reduction)${NC}\n"

# Create backup directory
BACKUP_DIR="/Users/a01234/CEREBRO-DIGITAL/PROYECTOS/sergiofores/img/backup-originals"
mkdir -p "$BACKUP_DIR"

# Define critical images (above 1MB)
declare -A CRITICAL_IMAGES=(
    ["sergio-arte-plastica.jpg"]="6.2M"
    ["repositorio-01234-v4.jpg"]="4.9M"
    ["taller-01234-blanes.jpg"]="4.7M"
    ["o1234-slidev.jpg"]="4.4M"
    ["noeliarequena-com.jpg"]="1.9M"
    ["castillo-peniscola-alquiler.jpg"]="1.6M"
    ["github-t0t.jpg"]="449K"
    ["o1234-lovable.jpg"]="411K"
)

IMG_DIR="/Users/a01234/CEREBRO-DIGITAL/PROYECTOS/sergiofores/img"
cd "$IMG_DIR"

echo -e "${GREEN}Phase 1: Creating backups...${NC}"
for image_name in "${!CRITICAL_IMAGES[@]}"; do
    if [ -f "$image_name" ]; then
        cp "$image_name" "$BACKUP_DIR/"
        echo -e "  ✓ Backed up: $image_name (${CRITICAL_IMAGES[$image_name]})"
    fi
done

echo -e "\n${GREEN}Phase 2: Optimizing critical images...${NC}"

# Function to optimize single image
optimize_image() {
    local input_file="$1"
    local original_size=$(du -h "$input_file" | cut -f1)
    
    echo -e "${YELLOW}Processing: $input_file ($original_size)${NC}"
    
    # Create optimized WebP version
    cwebp -q 85 -resize 1920 943 "$input_file" -o "${input_file%.*}.webp"
    
    # Create optimized JPEG version (fallback)
    convert "$input_file" -resize 1920x943 -quality 85 -strip "${input_file%.*}_optimized.jpg"
    
    # Replace original with optimized JPEG
    mv "${input_file%.*}_optimized.jpg" "$input_file"
    
    local new_size=$(du -h "$input_file" | cut -f1)
    local webp_size=$(du -h "${input_file%.*}.webp" | cut -f1)
    
    echo -e "  ✓ JPEG: $original_size → $new_size"
    echo -e "  ✓ WebP: $webp_size (preferred format)"
}

# Optimize each critical image
for image_name in "${!CRITICAL_IMAGES[@]}"; do
    if [ -f "$image_name" ]; then
        optimize_image "$image_name"
        echo ""
    else
        echo -e "${RED}Warning: $image_name not found${NC}"
    fi
done

echo -e "${GREEN}Phase 3: Optimizing medium-size images...${NC}"

# Optimize remaining images above 100KB
find . -name "*.jpg" -size +100k -not -path "./backup-originals/*" | while read img; do
    if [[ ! " ${!CRITICAL_IMAGES[@]} " =~ " $(basename "$img") " ]]; then
        original_size=$(du -h "$img" | cut -f1)
        echo -e "${YELLOW}Processing medium image: $(basename "$img") ($original_size)${NC}"
        
        # Create WebP version
        cwebp -q 80 "$img" -o "${img%.*}.webp"
        
        # Optimize JPEG
        convert "$img" -quality 80 -strip "${img%.*}_temp.jpg"
        mv "${img%.*}_temp.jpg" "$img"
        
        new_size=$(du -h "$img" | cut -f1)
        webp_size=$(du -h "${img%.*}.webp" | cut -f1)
        
        echo -e "  ✓ JPEG: $original_size → $new_size"
        echo -e "  ✓ WebP: $webp_size"
    fi
done

echo -e "\n${GREEN}Phase 4: Final analysis...${NC}"

# Calculate total size after optimization
TOTAL_ORIGINAL=$(du -ch "$BACKUP_DIR"/*.jpg 2>/dev/null | tail -1 | cut -f1 || echo "0")
TOTAL_OPTIMIZED=$(du -ch *.jpg 2>/dev/null | tail -1 | cut -f1 || echo "0")
TOTAL_WEBP=$(du -ch *.webp 2>/dev/null | tail -1 | cut -f1 || echo "0")

echo -e "${BLUE}=== OPTIMIZATION RESULTS ===${NC}"
echo -e "Original total:     $TOTAL_ORIGINAL"
echo -e "Optimized JPEG:     $TOTAL_OPTIMIZED"
echo -e "WebP total:         $TOTAL_WEBP"
echo -e "${GREEN}✓ Optimization completed successfully!${NC}"

echo -e "\n${YELLOW}Next steps:${NC}"
echo -e "1. Update HTML to use WebP with JPEG fallback"
echo -e "2. Implement lazy loading for non-critical images"
echo -e "3. Test Core Web Vitals improvements"
echo -e "4. Deploy and verify SEO score improvement"

echo -e "\n${BLUE}Rollback instructions (if needed):${NC}"
echo -e "cp $BACKUP_DIR/*.jpg $IMG_DIR/"
echo -e "rm $IMG_DIR/*.webp"