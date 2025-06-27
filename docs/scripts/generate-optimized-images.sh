#!/bin/bash

# =============================================
# GENERATE OPTIMIZED IMAGES FOR PORTFOLIO
# Creates perfect resolution thumbnails
# =============================================

echo "🎯 GENERATING OPTIMIZED PORTFOLIO IMAGES"
echo "========================================"
echo ""

BASE_DIR="/Users/a01234/CEREBRO-DIGITAL/PROYECTOS/sergiofores"
IMG_DIR="$BASE_DIR/img"
BACKUP_DIR="$IMG_DIR/backup-originals"

cd "$BASE_DIR" || exit 1

# Create backup directory if it doesn't exist
mkdir -p "$BACKUP_DIR"

# Function to check dependencies
check_dependencies() {
    echo "🔧 Checking dependencies..."
    
    if ! command -v convert &> /dev/null; then
        echo "❌ ImageMagick not found"
        echo "   Install with: brew install imagemagick"
        exit 1
    fi
    
    if ! command -v cwebp &> /dev/null; then
        echo "❌ WebP tools not found"
        echo "   Install with: brew install webp"
        exit 1
    fi
    
    echo "✅ All dependencies found"
    echo ""
}

# Function to optimize image with proper sharpening
optimize_for_web() {
    local input="$1"
    local output_base="$2"
    local width="$3"
    local height="$4"
    local quality="$5"
    local label="$6"
    
    local jpg_output="${output_base}.jpg"
    local webp_output="${output_base}.webp"
    
    echo "   📸 $label: ${width}x${height} @ ${quality}%"
    
    # Advanced ImageMagick optimization for web thumbnails
    convert "$input" \
        -resize "${width}x${height}^" \
        -gravity center \
        -extent "${width}x${height}" \
        -colorspace sRGB \
        -strip \
        -unsharp 0x0.75+0.75+0.008 \
        -quality "$quality" \
        "$jpg_output"
    
    # Generate WebP with optimal settings
    cwebp -q "$quality" -m 6 -mt "$jpg_output" -o "$webp_output"
    
    # Get file sizes for reporting
    local jpg_size=$(stat -f%z "$jpg_output" 2>/dev/null || echo "0")
    local webp_size=$(stat -f%z "$webp_output" 2>/dev/null || echo "0")
    
    echo "      JPG: $(numfmt --to=iec-i --suffix=B $jpg_size)"
    echo "      WebP: $(numfmt --to=iec-i --suffix=B $webp_size)"
}

# Function to process single image into multiple resolutions
process_image() {
    local image_name="$1"
    local input_file="$IMG_DIR/$image_name"
    
    if [ ! -f "$input_file" ]; then
        echo "❌ Image not found: $image_name"
        return 1
    fi
    
    # Backup original
    cp "$input_file" "$BACKUP_DIR/" 2>/dev/null || true
    
    echo "🖼️ Processing: $image_name"
    
    # Get current dimensions
    local current_info=$(identify -format "%wx%h" "$input_file" 2>/dev/null || echo "0x0")
    echo "   Current: $current_info"
    
    # Target resolutions for modern displays
    # 400px display * device pixel ratios
    local base_name="${image_name%.*}"
    
    # 1x resolution (baseline) - 400x250 (16:10 ratio)
    optimize_for_web "$input_file" "$IMG_DIR/$base_name" 400 250 92 "1x (Standard)"
    
    # 2x resolution (Retina) - 800x500
    optimize_for_web "$input_file" "$IMG_DIR/${base_name}@2x" 800 500 90 "2x (Retina)"
    
    # 3x resolution (Ultra Retina) - 1200x750
    optimize_for_web "$input_file" "$IMG_DIR/${base_name}@3x" 1200 750 88 "3x (Ultra)"
    
    echo ""
}

# Main execution
main() {
    check_dependencies
    
    echo "📋 TARGET IMAGES FOR OPTIMIZATION"
    echo "================================="
    echo ""
    
    # List of critical images that need optimization
    critical_images=(
        "proceso-cognitivo.jpg"
        "sergio-dev.jpg"
        "sergio-arte-plastica.jpg"
        "landing-01234.jpg"
        "cerebro-digital-vault.jpg"
        "cerebro-digital.jpg"
        "cerebro-digital-ia.jpg"
        "o1234-lovable.jpg"
        "taller-01234-blanes.jpg"
        "noeliarequena-com.jpg"
        "github-t0t.jpg"
        "design-system.jpg"
        "gematria-app.jpg"
        "o1234-nng.jpg"
        "o1234-slidev.jpg"
        "podcast-api.jpg"
        "repositorio-01234-v4.jpg"
        "three-svelte.jpg"
        "castillo-peniscola-alquiler.jpg"
        "tienda-peniscola.jpg"
    )
    
    # Process each image
    for img in "${critical_images[@]}"; do
        if [ -f "$IMG_DIR/$img" ]; then
            process_image "$img"
        else
            echo "⚠️ Skipping missing: $img"
        fi
    done
    
    echo "📊 OPTIMIZATION SUMMARY"
    echo "======================"
    echo ""
    
    # Count generated files
    jpg_count=$(ls -1 "$IMG_DIR"/*.jpg 2>/dev/null | wc -l | tr -d ' ')
    webp_count=$(ls -1 "$IMG_DIR"/*.webp 2>/dev/null | wc -l | tr -d ' ')
    retina_count=$(ls -1 "$IMG_DIR"/*@2x.* 2>/dev/null | wc -l | tr -d ' ')
    ultra_count=$(ls -1 "$IMG_DIR"/*@3x.* 2>/dev/null | wc -l | tr -d ' ')
    
    echo "📈 Files generated:"
    echo "   Total JPG: $jpg_count"
    echo "   Total WebP: $webp_count"
    echo "   Retina (@2x): $retina_count"
    echo "   Ultra (@3x): $ultra_count"
    echo ""
    
    # Calculate total space usage
    if command -v du &> /dev/null; then
        local total_size=$(du -sh "$IMG_DIR" | cut -f1)
        echo "💾 Total image directory size: $total_size"
    fi
    
    echo ""
    echo "✅ OPTIMIZATION COMPLETE!"
    echo "========================"
    echo ""
    echo "📋 Next Steps:"
    echo "1. Update HTML to use responsive images"
    echo "2. Test portfolio at: http://localhost:8000"
    echo "3. Verify images are crystal clear on high-DPI displays"
    echo "4. Run performance audit with Lighthouse"
    echo ""
    echo "💡 The CSS has already been optimized for image sharpness"
    echo "🔧 Use responsive-images-implementation.html as template"
}

# Execute main function
main "$@"