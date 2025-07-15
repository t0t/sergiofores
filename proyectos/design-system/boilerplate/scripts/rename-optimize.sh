#!/bin/bash

# OPTIMIZADOR Y RENOMBRADOR DE MEDIA ASSETS
# Script para renombrar y optimizar archivos media del boilerplate

MEDIA_DIR="/Users/a01234/CEREBRO-DIGITAL/PROYECTOS/sergiofores/proyectos/design-system/boilerplate/assets/images"
BACKUP_DIR="$MEDIA_DIR/backup_original"

# Colores para output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}🚀 OPTIMIZADOR DE MEDIA ASSETS - SERGIO FORÉS${NC}"
echo -e "${BLUE}===============================================${NC}"

# Crear backup
mkdir -p "$BACKUP_DIR"

# Contadores
counter_hero=1
counter_feature=1
counter_gallery=1
counter_team=1
counter_avatar=1
counter_background=1
counter_abstract=1
counter_tech=1
counter_demo=1
counter_project=1
counter_asset=1

# Función para sanitizar nombres
sanitize_name() {
    local name="$1"
    # Convertir a minúsculas
    name=$(echo "$name" | tr '[:upper:]' '[:lower:]')
    # Reemplazar espacios y caracteres especiales con guiones
    name=$(echo "$name" | sed 's/[^a-z0-9]/-/g')
    # Múltiples guiones a uno solo
    name=$(echo "$name" | sed 's/-\+/-/g')
    # Remover guiones al inicio y final
    name=$(echo "$name" | sed 's/^-\+\|-\+$//g')
    # Truncar si es muy largo
    name=$(echo "$name" | cut -c1-30)
    echo "$name"
}

# Función para detectar tipo de contenido
detect_content_type() {
    local filename="$1"
    filename_lower=$(echo "$filename" | tr '[:upper:]' '[:lower:]')
    
    if [[ $filename_lower =~ (hero|banner|main|principal) ]]; then
        echo "hero"
    elif [[ $filename_lower =~ (feature|caracteristica|funcionalidad) ]]; then
        echo "feature"
    elif [[ $filename_lower =~ (gallery|galeria|portfolio) ]]; then
        echo "gallery"
    elif [[ $filename_lower =~ (team|member|equipo|persona) ]]; then
        echo "team"
    elif [[ $filename_lower =~ (avatar|profile|perfil) ]]; then
        echo "avatar"
    elif [[ $filename_lower =~ (background|fondo|texture) ]]; then
        echo "background"
    elif [[ $filename_lower =~ (abstract|art|arte) ]]; then
        echo "abstract"
    elif [[ $filename_lower =~ (tech|technology|ia|ai|robot|humanoid) ]]; then
        echo "tech"
    elif [[ $filename_lower =~ (demo|muestra|ejemplo) ]]; then
        echo "demo"
    elif [[ $filename_lower =~ (project|proyecto|work) ]]; then
        echo "project"
    else
        echo "asset"
    fi
}

# Función para generar nombre genérico
generate_generic_name() {
    local content_type="$1"
    local extension="$2"
    
    case $content_type in
        "hero")
            if [ $counter_hero -eq 1 ]; then
                echo "hero-abstract$extension"
            else
                echo "hero-$(printf "%02d" $counter_hero)$extension"
            fi
            ((counter_hero++))
            ;;
        "feature")
            echo "feature-$(printf "%02d" $counter_feature)$extension"
            ((counter_feature++))
            ;;
        "gallery")
            echo "gallery-$(printf "%02d" $counter_gallery)$extension"
            ((counter_gallery++))
            ;;
        "team")
            echo "team-$(printf "%02d" $counter_team)$extension"
            ((counter_team++))
            ;;
        "avatar")
            echo "avatar-$(printf "%02d" $counter_avatar)$extension"
            ((counter_avatar++))
            ;;
        "background")
            echo "background-$(printf "%02d" $counter_background)$extension"
            ((counter_background++))
            ;;
        "abstract")
            echo "abstract-$(printf "%02d" $counter_abstract)$extension"
            ((counter_abstract++))
            ;;
        "tech")
            echo "tech-$(printf "%02d" $counter_tech)$extension"
            ((counter_tech++))
            ;;
        "demo")
            echo "demo-$(printf "%02d" $counter_demo)$extension"
            ((counter_demo++))
            ;;
        "project")
            echo "project-$(printf "%02d" $counter_project)$extension"
            ((counter_project++))
            ;;
        *)
            echo "asset-$(printf "%02d" $counter_asset)$extension"
            ((counter_asset++))
            ;;
    esac
}

echo -e "${YELLOW}📁 Procesando archivos en: $MEDIA_DIR${NC}"
echo ""

# Procesar archivos
cd "$MEDIA_DIR" || exit 1

for file in *; do
    # Saltar si es directorio o README
    if [[ -d "$file" ]] || [[ "$file" == "README.md" ]]; then
        continue
    fi
    
    # Obtener extensión
    extension="${file##*.}"
    extension_lower=$(echo ".$extension" | tr '[:upper:]' '[:lower:]')
    
    # Detectar tipo de contenido
    content_type=$(detect_content_type "$file")
    
    # Generar nuevo nombre
    new_name=$(generate_generic_name "$content_type" "$extension_lower")
    
    # Verificar si ya existe
    counter_duplicate=1
    original_new_name="$new_name"
    while [[ -f "$new_name" ]] && [[ "$new_name" != "$file" ]]; do
        base_name="${original_new_name%.*}"
        ext="${original_new_name##*.}"
        new_name="${base_name}-$(printf "%02d" $counter_duplicate).${ext}"
        ((counter_duplicate++))
    done
    
    # Si el nombre ya es correcto, saltar
    if [[ "$file" == "$new_name" ]]; then
        echo -e "${GREEN}✓${NC} $file (ya optimizado)"
        continue
    fi
    
    # Hacer backup del original
    cp "$file" "$BACKUP_DIR/"
    
    # Renombrar archivo
    mv "$file" "$new_name"
    
    # Mostrar progreso
    echo -e "${GREEN}✅${NC} $file → $new_name"
done

echo ""
echo -e "${GREEN}🎉 PROCESO COMPLETADO${NC}"
echo -e "${BLUE}📊 RESUMEN:${NC}"
echo -e "   Heroes: $((counter_hero-1))"
echo -e "   Features: $((counter_feature-1))"
echo -e "   Galería: $((counter_gallery-1))"
echo -e "   Team: $((counter_team-1))"
echo -e "   Avatares: $((counter_avatar-1))"
echo -e "   Backgrounds: $((counter_background-1))"
echo -e "   Abstract: $((counter_abstract-1))"
echo -e "   Tech: $((counter_tech-1))"
echo -e "   Demo: $((counter_demo-1))"
echo -e "   Proyectos: $((counter_project-1))"
echo -e "   Assets: $((counter_asset-1))"
echo ""
echo -e "${YELLOW}💾 Backup original en: $BACKUP_DIR${NC}"
echo -e "${BLUE}📝 Recomendación: Revisar el README.md para actualizar referencias${NC}"