#!/bin/bash

# =============================================
# IMAGE QUALITY COMPARISON SCRIPT
# Before/After Analysis for Blur Fix
# =============================================

echo "📊 IMAGE QUALITY COMPARISON ANALYSIS"
echo "====================================="
echo ""

BASE_DIR="/Users/a01234/CEREBRO-DIGITAL/PROYECTOS/sergiofores"
IMG_DIR="$BASE_DIR/img"
BACKUP_DIR="$IMG_DIR/backup-originals"

cd "$BASE_DIR" || exit 1

# Function to analyze image quality metrics
analyze_image_quality() {
    local image_path="$1"
    local label="$2"
    
    if [ ! -f "$image_path" ]; then
        echo "❌ Image not found: $image_path"
        return 1
    fi
    
    echo "🔍 $label"
    echo "   File: $(basename "$image_path")"
    
    # Get basic info
    local info=$(identify -format "%wx%h %Q %b" "$image_path" 2>/dev/null)
    local dimensions=$(echo "$info" | cut -d' ' -f1)
    local quality=$(echo "$info" | cut -d' ' -f2)
    local filesize=$(echo "$info" | cut -d' ' -f3)
    
    echo "   Dimensions: $dimensions"
    echo "   Quality: ${quality}%"
    echo "   File Size: $filesize"
    
    # Calculate pixel density for common display sizes
    local width=$(echo "$dimensions" | cut -d'x' -f1)
    local height=$(echo "$dimensions" | cut -d'x' -f2)
    
    # Display sizes (typical for portfolio thumbnails)
    local display_width_desktop=400
    local display_width_mobile=350
    
    local desktop_ratio=$(echo "scale=2; $width / $display_width_desktop" | bc -l 2>/dev/null || echo "N/A")
    local mobile_ratio=$(echo "scale=2; $width / $display_width_mobile" | bc -l 2>/dev/null || echo "N/A")
    
    echo "   Desktop Ratio: ${desktop_ratio}x (${display_width_desktop}px target)"
    echo "   Mobile Ratio: ${mobile_ratio}x (${display_width_mobile}px target)"
    
    # Sharpness assessment
    if command -v convert >/dev/null 2>&1; then
        local sharpness=$(convert "$image_path" -colorspace Gray -resize 50% -blur 0x0.5 -evaluate subtract 50% -evaluate multiply 2 -evaluate add 50% -format "%[fx:standard_deviation]" info: 2>/dev/null || echo "N/A")
        echo "   Sharpness Score: $sharpness"
    fi
    
    echo ""
}

# Function to compare before/after
compare_images() {
    local original="$1"
    local optimized="$2"
    local name="$3"
    
    echo "🔄 COMPARISON: $name"
    echo "$(printf '%.0s-' {1..40})"
    
    if [ -f "$original" ] && [ -f "$optimized" ]; then
        analyze_image_quality "$original" "BEFORE (Original)"
        analyze_image_quality "$optimized" "AFTER (Optimized)"
        
        # Calculate improvement metrics
        local orig_info=$(identify -format "%wx%h %Q %b" "$original" 2>/dev/null)
        local opt_info=$(identify -format "%wx%h %Q %b" "$optimized" 2>/dev/null)
        
        local orig_width=$(echo "$orig_info" | cut -d' ' -f1 | cut -d'x' -f1)
        local opt_width=$(echo "$opt_info" | cut -d' ' -f1 | cut -d'x' -f1)
        
        local orig_size_bytes=$(stat -f%z "$original" 2>/dev/null || echo "0")
        local opt_size_bytes=$(stat -f%z "$optimized" 2>/dev/null || echo "0")
        
        if [ "$orig_size_bytes" -gt 0 ] && [ "$opt_size_bytes" -gt 0 ]; then
            local size_change=$(echo "scale=1; ($opt_size_bytes - $orig_size_bytes) * 100 / $orig_size_bytes" | bc -l 2>/dev/null || echo "N/A")
            echo "📈 IMPROVEMENTS:"
            echo "   Resolution Change: ${orig_width}px → ${opt_width}px"
            echo "   File Size Change: ${size_change}%"
            
            if [ "$opt_width" -gt "$orig_width" ]; then
                echo "   ✅ Resolution INCREASED - Better quality"
            elif [ "$opt_width" -eq "$orig_width" ]; then
                echo "   ➡️ Resolution SAME - Quality maintained"
            else
                echo "   ⚠️ Resolution DECREASED - Check if intentional"
            fi
        fi
    else
        echo "❌ Cannot compare - missing files"
        [ ! -f "$original" ] && echo "   Missing: $original"
        [ ! -f "$optimized" ] && echo "   Missing: $optimized"
    fi
    
    echo ""
}

# Main analysis
echo "📋 ANALYZING CURRENT IMAGE QUALITY"
echo "=================================="
echo ""

# Check if we have backup directory (means optimization was run)
if [ -d "$BACKUP_DIR" ]; then
    echo "✅ Backup directory found - running before/after comparison"
    echo ""
    
    # Compare key images
    compare_images "$BACKUP_DIR/proceso-cognitivo.jpg" "$IMG_DIR/proceso-cognitivo.jpg" "Proceso Cognitivo"
    compare_images "$BACKUP_DIR/sergio-dev.jpg" "$IMG_DIR/sergio-dev.jpg" "Sergio Dev"
    compare_images "$BACKUP_DIR/sergio-arte-plastica.jpg" "$IMG_DIR/sergio-arte-plastica.jpg" "Sergio Arte Plástica"
    compare_images "$BACKUP_DIR/landing-01234.jpg" "$IMG_DIR/landing-01234.jpg" "Landing 01234"
    
else
    echo "ℹ️ No backup directory found - analyzing current images only"
    echo ""
    
    # Analyze current images
    key_images=(
        "proceso-cognitivo.jpg"
        "sergio-dev.jpg"
        "sergio-arte-plastica.jpg"
        "landing-01234.jpg"
        "cerebro-digital-vault.jpg"
        "o1234-lovable.jpg"
        "taller-01234-blanes.jpg"
    )
    
    for img in "${key_images[@]}"; do
        if [ -f "$IMG_DIR/$img" ]; then
            analyze_image_quality "$IMG_DIR/$img" "$img"
        fi
    done
fi

echo "🎯 BLUR ASSESSMENT CRITERIA"
echo "==========================="
echo ""
echo "For crystal-clear thumbnails on modern displays:"
echo ""
echo "📱 MOBILE (350px display):"
echo "   - 1x display: 350px width minimum"
echo "   - 2x display (Retina): 700px width minimum"  
echo "   - 3x display: 1050px width minimum"
echo ""
echo "🖥️ DESKTOP (400px display):"
echo "   - 1x display: 400px width minimum"
echo "   - 2x display (Retina): 800px width minimum"
echo "   - 3x display: 1200px width minimum"
echo ""
echo "✅ QUALITY TARGETS:"
echo "   - Ratio ≥ 2.0x = Excellent (crystal clear on all devices)"
echo "   - Ratio ≥ 1.5x = Good (sharp on most devices)"
echo "   - Ratio ≥ 1.0x = Acceptable (sharp on 1x displays)"
echo "   - Ratio < 1.0x = Poor (will appear blurry)"
echo ""

# WebP analysis
echo "🔧 WEBP OPTIMIZATION STATUS"
echo "==========================="
echo ""

webp_count=$(ls -1 "$IMG_DIR"/*.webp 2>/dev/null | wc -l | tr -d ' ')
jpg_count=$(ls -1 "$IMG_DIR"/*.jpg 2>/dev/null | wc -l | tr -d ' ')

echo "📊 Format Distribution:"
echo "   WebP files: $webp_count"
echo "   JPG files: $jpg_count"

if [ "$webp_count" -gt 0 ] && [ "$jpg_count" -gt 0 ]; then
    echo "   ✅ WebP optimization appears to be implemented"
    
    # Sample size comparison
    sample_jpg=$(ls "$IMG_DIR"/*.jpg 2>/dev/null | head -1)
    sample_webp=$(echo "$sample_jpg" | sed 's/\.jpg$/.webp/')
    
    if [ -f "$sample_jpg" ] && [ -f "$sample_webp" ]; then
        jpg_size=$(stat -f%z "$sample_jpg" 2>/dev/null || echo "0")
        webp_size=$(stat -f%z "$sample_webp" 2>/dev/null || echo "0")
        
        if [ "$jpg_size" -gt 0 ] && [ "$webp_size" -gt 0 ]; then
            savings=$(echo "scale=1; ($jpg_size - $webp_size) * 100 / $jpg_size" | bc -l 2>/dev/null || echo "N/A")
            echo "   💾 WebP Savings: ~${savings}% smaller than JPG"
        fi
    fi
else
    echo "   ⚠️ WebP optimization missing or incomplete"
fi

echo ""
echo "🚀 NEXT STEPS RECOMMENDATIONS"
echo "============================="
echo ""

# Generate recommendations based on analysis
if [ -d "$BACKUP_DIR" ]; then
    echo "1. ✅ Image optimization completed"
    echo "2. 🔄 Test visual quality in browser at http://localhost:8000"
    echo "3. 📱 Test on high-DPI devices (iPhone, Retina displays)"
    echo "4. 🎨 Apply CSS fixes from blur-fix.css"
    echo "5. 🖼️ Implement responsive images from responsive-images-implementation.html"
else
    echo "1. 🔧 Run the blur fix script: ./fix-thumbnail-blur.sh"
    echo "2. 📊 Re-run this analysis after optimization"
    echo "3. 🎨 Apply CSS improvements"
    echo "4. 📱 Test on multiple devices"
fi

echo ""
echo "📈 PERFORMANCE IMPACT"
echo "===================="
echo ""
echo "Expected improvements after full optimization:"
echo "• 🔍 Crystal-clear images on all device types"
echo "• ⚡ Faster loading with optimized file sizes"
echo "• 📱 Perfect rendering on Retina/high-DPI displays"
echo "• 🌐 Better WebP compression for modern browsers"
echo "• 🎯 Improved Core Web Vitals scores"
echo ""