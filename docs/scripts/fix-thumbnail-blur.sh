#!/bin/bash

# =============================================
# THUMBNAIL BLUR FIX SCRIPT
# Sergio Forés Portfolio - Image Optimization
# =============================================

echo "🔧 FIXING THUMBNAIL BLUR ISSUES"
echo "================================="
echo ""

# Configuration
BASE_DIR="/Users/a01234/CEREBRO-DIGITAL/PROYECTOS/sergiofores"
IMG_DIR="$BASE_DIR/img"
BACKUP_DIR="$IMG_DIR/backup-originals"
TEMP_DIR="$BASE_DIR/temp-optimized"

# Create directories
mkdir -p "$BACKUP_DIR"
mkdir -p "$TEMP_DIR"

echo "📁 Directories created"
echo "   - Backup: $BACKUP_DIR"
echo "   - Temp: $TEMP_DIR"
echo ""

# Function to check if ImageMagick is installed
check_imagemagick() {
    if ! command -v convert &> /dev/null; then
        echo "❌ ImageMagick not found. Installing..."
        if command -v brew &> /dev/null; then
            brew install imagemagick
        else
            echo "Please install ImageMagick manually:"
            echo "   macOS: brew install imagemagick"
            echo "   Ubuntu: sudo apt install imagemagick"
            exit 1
        fi
    else
        echo "✅ ImageMagick found: $(convert -version | head -1)"
    fi
}

# Function to check if WebP tools are available
check_webp() {
    if ! command -v cwebp &> /dev/null; then
        echo "❌ WebP tools not found. Installing..."
        if command -v brew &> /dev/null; then
            brew install webp
        else
            echo "Please install WebP tools manually:"
            echo "   macOS: brew install webp"
            echo "   Ubuntu: sudo apt install webp"
            exit 1
        fi
    else
        echo "✅ WebP tools found: $(cwebp -version 2>&1 | head -1)"
    fi
}

# Function to optimize single image
optimize_image() {
    local input_file="$1"
    local output_base="$2"
    local target_width="$3"
    local target_height="$4"
    local quality="$5"
    
    local filename=$(basename "$input_file" .jpg)
    local output_jpg="$output_base/${filename}.jpg"
    local output_webp="$output_base/${filename}.webp"
    
    echo "   📷 Processing: $filename"
    echo "      Target: ${target_width}x${target_height} @ ${quality}% quality"
    
    # Generate optimized JPG with proper sharpening
    convert "$input_file" \
        -resize "${target_width}x${target_height}^" \
        -gravity center \
        -extent "${target_width}x${target_height}" \
        -unsharp 0x0.5+0.5+0.05 \
        -quality "$quality" \
        "$output_jpg"
    
    # Generate WebP version
    cwebp -q "$quality" "$output_jpg" -o "$output_webp"
    
    echo "      ✅ Created: $(basename "$output_jpg") & $(basename "$output_webp")"
}

# Function to analyze current image and determine optimal size
analyze_and_optimize() {
    local input_file="$1"
    local device_pixel_ratio="${2:-2}" # Default to 2x for Retina displays
    
    # Get current dimensions
    local current_info=$(identify -format "%wx%h" "$input_file")
    local current_width=$(echo "$current_info" | cut -d'x' -f1)
    local current_height=$(echo "$current_info" | cut -d'x' -f2)
    
    # Target display sizes based on CSS analysis
    # project-card: aspect-ratio 16/10, max-width 50vh
    # Estimated: ~400px width on desktop, ~350px on mobile
    local display_width_desktop=400
    local display_height_desktop=250  # 16:10 ratio
    local display_width_mobile=350
    local display_height_mobile=219   # 16:10 ratio
    
    # Calculate required dimensions for crisp display
    local required_width=$((display_width_desktop * device_pixel_ratio))
    local required_height=$((display_height_desktop * device_pixel_ratio))
    
    echo "   📊 Current: ${current_width}x${current_height}"
    echo "   📱 Required: ${required_width}x${required_height} (${device_pixel_ratio}x DPR)"
    
    # Determine if optimization is needed
    if [ "$current_width" -lt "$required_width" ] || [ "$current_height" -lt "$required_height" ]; then
        echo "   ⚠️  NEEDS OPTIMIZATION - Current resolution too low"
        return 1
    elif [ "$current_width" -gt $((required_width * 2)) ]; then
        echo "   📉 NEEDS OPTIMIZATION - Current resolution too high (file size)"
        return 1
    else
        echo "   ✅ RESOLUTION OK - No optimization needed"
        return 0
    fi
}

# Main optimization function
main() {
    echo "🔍 CHECKING DEPENDENCIES"
    check_imagemagick
    check_webp
    echo ""
    
    cd "$BASE_DIR" || exit 1
    
    echo "🎯 ANALYZING CURRENT IMAGES"
    echo "============================"
    
    # List of images that need optimization based on portfolio analysis
    images_to_optimize=(
        "cerebro-digital-vault.jpg"
        "cerebro-digital.jpg" 
        "cerebro-obsidian.jpg"
        "clarity-fintech.jpg"
        "design-system.jpg"
        "landing-01234.jpg"
        "modelo-01234.jpg"
        "noeliarequena-portfolio.jpg"
    )
    
    # Also check high-resolution images that might need downsizing
    high_res_images=(
        "castillo-peniscola-alquiler.jpg"
        "cerebro-digital-ia.jpg"
        "gematria-app.jpg"
        "github-t0t.jpg"
        "huerto-01234.jpg"
        "landing-sergio.jpg"
        "noeliarequena-com.jpg"
        "o1234-lovable.jpg"
        "o1234-nng.jpg"
        "o1234-slidev.jpg"
    )
    
    # Process images that need quality optimization
    echo ""
    echo "🔧 OPTIMIZING LOW-RESOLUTION IMAGES"
    echo "====================================="
    
    for img in "${images_to_optimize[@]}"; do
        if [ -f "$IMG_DIR/$img" ]; then
            echo "📷 $img"
            
            # Backup original
            cp "$IMG_DIR/$img" "$BACKUP_DIR/"
            
            # Optimize for 2x and 3x displays
            optimize_image "$IMG_DIR/$img" "$TEMP_DIR" 800 500 95
            optimize_image "$IMG_DIR/$img" "$TEMP_DIR" 1200 750 90  # 3x version
            
            echo ""
        fi
    done
    
    # Process high-resolution images that need downsizing
    echo "📉 OPTIMIZING HIGH-RESOLUTION IMAGES"
    echo "====================================="
    
    for img in "${high_res_images[@]}"; do
        if [ -f "$IMG_DIR/$img" ]; then
            echo "📷 $img"
            
            # Backup original
            cp "$IMG_DIR/$img" "$BACKUP_DIR/"
            
            # Create optimized versions
            optimize_image "$IMG_DIR/$img" "$TEMP_DIR" 800 500 90
            
            echo ""
        fi
    done
    
    echo "🔄 UPDATING ORIGINAL FILES"
    echo "=========================="
    
    # Copy optimized files back to img directory
    if [ "$(ls -A "$TEMP_DIR")" ]; then
        cp "$TEMP_DIR"/*.jpg "$IMG_DIR/" 2>/dev/null || true
        cp "$TEMP_DIR"/*.webp "$IMG_DIR/" 2>/dev/null || true
        echo "✅ Files updated in img/ directory"
    fi
    
    echo ""
    echo "📊 GENERATING SRCSET FOR RESPONSIVE IMAGES"
    echo "==========================================="
    
    # Generate srcset implementation
    cat > "$BASE_DIR/responsive-images.html" << 'EOF'
<!-- RESPONSIVE IMAGES IMPLEMENTATION -->
<!-- Replace current <picture> elements with these optimized versions -->

<picture class="project-screenshot">
    <source 
        srcset="img/proceso-cognitivo.webp 800w, img/proceso-cognitivo@2x.webp 1200w" 
        sizes="(max-width: 768px) 350px, 400px"
        type="image/webp">
    <img 
        src="img/proceso-cognitivo.jpg" 
        srcset="img/proceso-cognitivo.jpg 800w, img/proceso-cognitivo@2x.jpg 1200w"
        sizes="(max-width: 768px) 350px, 400px"
        alt="Proceso Cognitivo" 
        loading="lazy">
</picture>
EOF
    
    echo "✅ Responsive images template created: responsive-images.html"
    
    echo ""
    echo "🎨 CSS OPTIMIZATIONS NEEDED"
    echo "==========================="
    
    cat << 'EOF'
Add these CSS improvements to main.css:

/* Enhanced image rendering */
.project-screenshot img {
    image-rendering: -webkit-optimize-contrast;
    image-rendering: crisp-edges;
    transform: translateZ(0); /* Hardware acceleration */
}

/* Prevent blur from CSS transforms */
.project-card:hover {
    transform: translateY(-6px) translateZ(0);
}

/* Better object-fit handling */
.project-screenshot {
    object-fit: cover;
    object-position: center;
}

/* High-DPI display optimization */
@media (-webkit-min-device-pixel-ratio: 2), (min-resolution: 192dpi) {
    .project-screenshot img {
        image-rendering: -webkit-optimize-contrast;
    }
}
EOF
    
    echo ""
    echo "🧹 CLEANUP"
    echo "=========="
    
    # Clean up temp directory
    rm -rf "$TEMP_DIR"
    echo "✅ Temporary files cleaned up"
    
    echo ""
    echo "✨ OPTIMIZATION COMPLETE!"
    echo "========================="
    echo ""
    echo "📋 SUMMARY:"
    echo "   - Original images backed up to: $BACKUP_DIR"
    echo "   - Optimized images generated with proper resolution"
    echo "   - WebP versions created for modern browsers"
    echo "   - Responsive images template ready"
    echo ""
    echo "🔄 NEXT STEPS:"
    echo "   1. Test the portfolio visually"
    echo "   2. Implement responsive images HTML"
    echo "   3. Add CSS optimizations"
    echo "   4. Run lighthouse audit"
    echo ""
    echo "🌐 Test at: http://localhost:8000"
}

# Run main function
main "$@"