#!/bin/bash

# =====================================================
# DEPLOY PERFORMANCE OPTIMIZATIONS
# Sergio Forés Portfolio - Final deployment script
# =====================================================

set -e

echo "🚀 Deploying performance optimizations for Sergio Forés Portfolio..."

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m'

PORTFOLIO_DIR="/Users/a01234/CEREBRO-DIGITAL/PROYECTOS/sergiofores"
cd "$PORTFOLIO_DIR"

echo -e "${BLUE}Step 1: Backing up current files...${NC}"
mkdir -p backups/pre-optimization
cp index.html backups/pre-optimization/
cp css/main.css backups/pre-optimization/
cp js/main.js backups/pre-optimization/

echo -e "${GREEN}✓ Current files backed up${NC}"

echo -e "${BLUE}Step 2: Deploying optimized HTML...${NC}"
cp index.html index-original.html
cp index-optimized.html index.html

echo -e "${GREEN}✓ Optimized HTML deployed${NC}"

echo -e "${BLUE}Step 3: Adding performance CSS...${NC}"
echo "" >> css/main.css
echo "/* ===== PERFORMANCE OPTIMIZATIONS ===== */" >> css/main.css
cat css/image-optimization.css >> css/main.css

echo -e "${GREEN}✓ Performance CSS integrated${NC}"

echo -e "${BLUE}Step 4: Adding performance JavaScript...${NC}"
echo "" >> js/main.js
echo "// ===== PERFORMANCE OPTIMIZATIONS =====" >> js/main.js
cat js/image-optimization.js >> js/main.js

echo -e "${GREEN}✓ Performance JavaScript integrated${NC}"

echo -e "${BLUE}Step 5: Verifying optimization results...${NC}"

# Check file sizes
JPEG_SIZE=$(du -ch img/*.jpg | tail -1 | cut -f1)
WEBP_SIZE=$(du -ch img/*.webp | tail -1 | cut -f1)
TOTAL_CSS_SIZE=$(du -h css/main.css | cut -f1)
TOTAL_JS_SIZE=$(du -h js/main.js | cut -f1)

echo -e "${YELLOW}Optimization Results:${NC}"
echo -e "📸 JPEG images: $JPEG_SIZE"
echo -e "🌐 WebP images: $WEBP_SIZE"
echo -e "🎨 CSS total: $TOTAL_CSS_SIZE"
echo -e "⚡ JS total: $TOTAL_JS_SIZE"

# Count optimized images
WEBP_COUNT=$(ls img/*.webp 2>/dev/null | wc -l | tr -d ' ')
echo -e "📊 WebP images generated: $WEBP_COUNT"

echo -e "\n${GREEN}🎉 DEPLOYMENT COMPLETE!${NC}"

echo -e "\n${BLUE}Next steps:${NC}"
echo "1. Test the website locally: open index.html"
echo "2. Check Core Web Vitals: npx lighthouse http://localhost:8000 --only-categories=performance"
echo "3. Deploy to production server"
echo "4. Verify SEO score improvement (87 → 100)"

echo -e "\n${YELLOW}Performance monitoring:${NC}"
echo "• Open browser dev tools → Performance tab"
echo "• Check Network tab for WebP loading"
echo "• Verify lazy loading in action"

echo -e "\n${BLUE}Rollback instructions (if needed):${NC}"
echo "cp backups/pre-optimization/* ./"
echo "rm img/*.webp"

echo -e "\n✅ Ready for production deployment!"