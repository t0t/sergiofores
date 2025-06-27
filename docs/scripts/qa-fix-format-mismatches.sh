#!/bin/bash

# QA Automation Fix Script: Corrección de Format Mismatches
# Sergio Forés Portfolio - Production Ready Fix

echo "============================================="
echo "QA IMAGE FORMAT MISMATCH CORRECTION SCRIPT"
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

# Safety check - verify we're in the right directory
if [[ ! -f "index.html" || ! -d "img" ]]; then
    echo -e "${RED}❌ ERROR: Must be run from project root directory${NC}"
    echo "Expected files: index.html, img/ directory"
    exit 1
fi

# Create backup directory
BACKUP_DIR="backup-format-fix-$(date +%Y%m%d-%H%M%S)"
echo -e "${BLUE}Creating backup directory: $BACKUP_DIR${NC}"
mkdir -p "$BACKUP_DIR"

echo ""
echo "============================================="
echo "1. IDENTIFYING PROBLEMATIC FILES"
echo "============================================="

# Array to store problematic files
declare -a PROBLEM_FILES=()

# Find all PNG files with .jpg extension
while IFS= read -r -d '' file; do
    if file "$file" | grep -q "PNG image data"; then
        PROBLEM_FILES+=("$file")
        echo -e "${RED}❌ FOUND MISMATCH:${NC} $file"
    fi
done < <(find . -name "*.jpg" -print0)

if [ ${#PROBLEM_FILES[@]} -eq 0 ]; then
    echo -e "${GREEN}✅ No format mismatches found. All files are correct.${NC}"
    exit 0
fi

echo ""
echo -e "${YELLOW}Total problematic files found: ${#PROBLEM_FILES[@]}${NC}"

echo ""
echo "============================================="
echo "2. CREATING BACKUPS"
echo "============================================="

# Backup all problematic files
for file in "${PROBLEM_FILES[@]}"; do
    backup_path="$BACKUP_DIR/${file#./}"
    mkdir -p "$(dirname "$backup_path")"
    cp "$file" "$backup_path"
    echo -e "${GREEN}✅ Backed up:${NC} $file → $backup_path"
done

# Backup HTML files
cp index.html "$BACKUP_DIR/"
echo -e "${GREEN}✅ Backed up:${NC} index.html"

echo ""
echo "============================================="
echo "3. FIXING FORMAT MISMATCHES"
echo "============================================="

# Option 1: Rename files to .png extension (Recommended approach)
echo -e "${BLUE}Applying fix: Renaming PNG files to have .png extension${NC}"
echo ""

declare -a RENAMED_FILES=()

for file in "${PROBLEM_FILES[@]}"; do
    # Generate new filename with .png extension
    new_file="${file%.jpg}.png"
    
    # Rename the file
    mv "$file" "$new_file"
    
    if [[ $? -eq 0 ]]; then
        echo -e "${GREEN}✅ RENAMED:${NC} $file → $new_file"
        RENAMED_FILES+=("$file|$new_file")
    else
        echo -e "${RED}❌ FAILED TO RENAME:${NC} $file"
    fi
done

echo ""
echo "============================================="
echo "4. UPDATING HTML REFERENCES"
echo "============================================="

# Update index.html with new filenames
for pair in "${RENAMED_FILES[@]}"; do
    old_file=$(echo "$pair" | cut -d'|' -f1)
    new_file=$(echo "$pair" | cut -d'|' -f2)
    
    # Extract just the filename for replacement
    old_basename=$(basename "$old_file")
    new_basename=$(basename "$new_file")
    
    # Update HTML file
    sed -i '' "s|$old_basename|$new_basename|g" index.html
    
    if [[ $? -eq 0 ]]; then
        echo -e "${GREEN}✅ UPDATED HTML:${NC} $old_basename → $new_basename"
    else
        echo -e "${RED}❌ FAILED TO UPDATE HTML:${NC} $old_basename"
    fi
done

echo ""
echo "============================================="
echo "5. VERIFICATION"
echo "============================================="

echo -e "${BLUE}Running post-fix verification...${NC}"
echo ""

# Check if any PNG files with .jpg extension still exist
remaining_issues=0
while IFS= read -r -d '' file; do
    if file "$file" | grep -q "PNG image data"; then
        echo -e "${RED}❌ STILL PROBLEMATIC:${NC} $file"
        ((remaining_issues++))
    fi
done < <(find . -name "*.jpg" -print0)

if [ $remaining_issues -eq 0 ]; then
    echo -e "${GREEN}✅ All format mismatches have been resolved!${NC}"
else
    echo -e "${RED}❌ $remaining_issues issues remain${NC}"
fi

echo ""
echo "============================================="
echo "6. TESTING CHECKLIST"
echo "============================================="

cat << EOF
Manual testing required:

□ Open index.html in browser
□ Verify all images load correctly
□ Check browser developer tools for 404 errors
□ Test lazy loading functionality
□ Verify WebP fallbacks still work
□ Test on different browsers:
  □ Chrome (latest)
  □ Safari (latest)
  □ Firefox (latest)
  □ Edge (latest)
□ Test on mobile devices
□ Run Lighthouse performance audit
□ Check for any broken image references

Cross-browser testing commands:
# Chrome
open -a "Google Chrome" index.html

# Safari  
open -a Safari index.html

# Firefox
open -a Firefox index.html
EOF

echo ""
echo "============================================="
echo "7. ROLLBACK INSTRUCTIONS"
echo "============================================="

cat << EOF
If issues are found, rollback with:

# Restore original files
cp -r $BACKUP_DIR/* ./

# Or restore individual files:
cp $BACKUP_DIR/index.html ./
EOF

for file in "${PROBLEM_FILES[@]}"; do
    backup_path="$BACKUP_DIR/${file#./}"
    echo "cp \"$backup_path\" \"$file\""
done

echo ""
echo "============================================="
echo "8. SUMMARY"
echo "============================================="

echo -e "${GREEN}✅ Files processed: ${#PROBLEM_FILES[@]}${NC}"
echo -e "${GREEN}✅ Files renamed: ${#RENAMED_FILES[@]}${NC}"
echo -e "${GREEN}✅ HTML updated: index.html${NC}"
echo -e "${GREEN}✅ Backup created: $BACKUP_DIR${NC}"

if [ $remaining_issues -eq 0 ]; then
    echo ""
    echo -e "${GREEN}🎉 FORMAT MISMATCH CORRECTION COMPLETED SUCCESSFULLY!${NC}"
    echo -e "${YELLOW}⚠️  Remember to test thoroughly before deploying${NC}"
else
    echo ""
    echo -e "${RED}⚠️  SOME ISSUES REMAIN - MANUAL INTERVENTION REQUIRED${NC}"
fi

echo ""
echo "Script completed at: $(date)"
echo "============================================="