#!/bin/bash

# =============================================
# GENERATE MISSING WEBP IMAGES
# Fix Chrome Preload Warnings - Sergio Forés Portfolio
# =============================================

echo "🔧 Generating missing WebP images to fix Chrome preload warnings..."

# Set quality and paths
QUALITY=85
IMG_DIR="img"

# Missing WebP files that cause preload warnings
MISSING_WEBP=(
    "proceso-cognitivo"
    "sergio-dev"
)

# Check if cwebp is available
if ! command -v cwebp &> /dev/null; then
    echo "❌ Error: cwebp not found. Installing via Homebrew..."
    brew install webp
fi

# Generate missing WebP files
for image in "${MISSING_WEBP[@]}"; do
    JPG_FILE="${IMG_DIR}/${image}.jpg"
    WEBP_FILE="${IMG_DIR}/${image}.webp"
    
    if [[ -f "$JPG_FILE" ]]; then
        if [[ ! -f "$WEBP_FILE" ]]; then
            echo "📸 Converting $JPG_FILE → $WEBP_FILE"
            cwebp -q $QUALITY "$JPG_FILE" -o "$WEBP_FILE"
            
            if [[ $? -eq 0 ]]; then
                # Get file sizes for comparison
                JPG_SIZE=$(stat -f%z "$JPG_FILE" 2>/dev/null || stat -c%s "$JPG_FILE")
                WEBP_SIZE=$(stat -f%z "$WEBP_FILE" 2>/dev/null || stat -c%s "$WEBP_FILE")
                REDUCTION=$(( (JPG_SIZE - WEBP_SIZE) * 100 / JPG_SIZE ))
                
                echo "✅ Generated: $WEBP_FILE"
                echo "   📊 Size reduction: ${REDUCTION}% (${JPG_SIZE} → ${WEBP_SIZE} bytes)"
            else
                echo "❌ Failed to convert $JPG_FILE"
            fi
        else
            echo "⚠️  $WEBP_FILE already exists"
        fi
    else
        echo "❌ Source file not found: $JPG_FILE"
    fi
done

echo ""
echo "📋 WebP Generation Summary:"
ls -la ${IMG_DIR}/*.webp | tail -n +1

echo ""
echo "🎯 Next Steps:"
echo "1. Test in Chrome DevTools - Network tab should show no 404s for preloaded resources"
echo "2. Check Console for elimination of preload warnings"
echo "3. Verify Lighthouse Performance score improvement"
echo "4. Test on mobile devices for bandwidth savings"

echo ""
echo "✅ Chrome Preload Warning Fix Complete!"