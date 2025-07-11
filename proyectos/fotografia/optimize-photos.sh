#!/bin/bash

# SERGIO FORÉS - FOTOGRAFÍA
# Script de Optimización de Imágenes
# 
# Optimiza todas las fotografías para web manteniendo calidad visual
# Usa herramientas nativas de macOS (sips) para máxima compatibilidad

set -e

PHOTOS_DIR="img/photographs"
BACKUP_DIR="img/photographs_backup"
LOG_FILE="optimization.log"

# Colores para output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}🎨 SERGIO FORÉS - OPTIMIZACIÓN DE FOTOGRAFÍAS${NC}"
echo "==============================================="
echo ""

# Función para mostrar tamaño de archivo
get_file_size() {
    stat -f%z "$1" 2>/dev/null || echo "0"
}

# Función para formatear bytes a KB/MB
format_size() {
    local bytes=$1
    if [ $bytes -lt 1024 ]; then
        echo "${bytes}B"
    elif [ $bytes -lt 1048576 ]; then
        echo "$((bytes / 1024))KB"
    else
        echo "$((bytes / 1048576))MB"
    fi
}

# Verificar que existe el directorio
if [ ! -d "$PHOTOS_DIR" ]; then
    echo -e "${RED}❌ Error: Directorio $PHOTOS_DIR no encontrado${NC}"
    exit 1
fi

# Crear backup si no existe
if [ ! -d "$BACKUP_DIR" ]; then
    echo -e "${YELLOW}📦 Creando backup de fotografías originales...${NC}"
    cp -R "$PHOTOS_DIR" "$BACKUP_DIR"
    echo -e "${GREEN}✅ Backup creado en $BACKUP_DIR${NC}"
    echo ""
fi

# Inicializar log
echo "SERGIO FORÉS - OPTIMIZACIÓN DE FOTOGRAFÍAS" > "$LOG_FILE"
echo "Inicio: $(date)" >> "$LOG_FILE"
echo "========================================" >> "$LOG_FILE"
echo "" >> "$LOG_FILE"

# Contadores
total_files=0
optimized_files=0
total_original_size=0
total_optimized_size=0

echo -e "${BLUE}🔍 Analizando fotografías...${NC}"
echo ""

# Procesar cada archivo JPG
for photo in "$PHOTOS_DIR"/*.jpg; do
    if [ -f "$photo" ]; then
        filename=$(basename "$photo")
        echo -e "${YELLOW}📸 Procesando: $filename${NC}"
        
        # Tamaño original
        original_size=$(get_file_size "$photo")
        original_formatted=$(format_size $original_size)
        
        # Verificar si la imagen necesita optimización (>500KB)
        if [ $original_size -gt 512000 ]; then
            echo "   🔧 Optimizando (tamaño actual: $original_formatted)..."
            
            # Crear archivo temporal
            temp_file="${photo}.tmp"
            
            # Optimización con sips (herramienta nativa de macOS)
            # - Redimensionar a máximo 1920px de ancho manteniendo aspecto
            # - Calidad JPEG 85% (buen balance calidad/tamaño)
            sips -Z 1920 "$photo" --setProperty formatOptions 85 --out "$temp_file" >/dev/null 2>&1
            
            if [ $? -eq 0 ] && [ -f "$temp_file" ]; then
                # Verificar que la optimización redujo el tamaño
                optimized_size=$(get_file_size "$temp_file")
                
                if [ $optimized_size -lt $original_size ]; then
                    # Reemplazar original con optimizado
                    mv "$temp_file" "$photo"
                    
                    optimized_formatted=$(format_size $optimized_size)
                    reduction=$((100 - (optimized_size * 100 / original_size)))
                    
                    echo "   ✅ Optimizado: $original_formatted → $optimized_formatted (-$reduction%)"
                    
                    # Log
                    echo "$filename: $original_formatted → $optimized_formatted (-$reduction%)" >> "$LOG_FILE"
                    
                    optimized_files=$((optimized_files + 1))
                    total_optimized_size=$((total_optimized_size + optimized_size))
                else
                    # Si no hubo reducción, mantener original
                    rm -f "$temp_file"
                    echo "   ⚪ No optimizado (ya estaba optimizada)"
                    total_optimized_size=$((total_optimized_size + original_size))
                fi
            else
                # Error en optimización
                rm -f "$temp_file"
                echo "   ❌ Error en optimización, manteniendo original"
                total_optimized_size=$((total_optimized_size + original_size))
            fi
        else
            echo "   ⚪ No requiere optimización (tamaño: $original_formatted)"
            total_optimized_size=$((total_optimized_size + original_size))
        fi
        
        total_files=$((total_files + 1))
        total_original_size=$((total_original_size + original_size))
        
        echo ""
    fi
done

# Verificar si hay archivos PNG para convertir
png_count=$(find "$PHOTOS_DIR" -name "*.png" | wc -l)
if [ $png_count -gt 0 ]; then
    echo -e "${YELLOW}🔄 Convirtiendo archivos PNG a JPG...${NC}"
    
    for png_file in "$PHOTOS_DIR"/*.png; do
        if [ -f "$png_file" ]; then
            filename=$(basename "$png_file" .png)
            jpg_file="$PHOTOS_DIR/${filename}.jpg"
            
            echo "   📸 Convirtiendo: $(basename "$png_file") → ${filename}.jpg"
            
            # Convertir PNG a JPG con calidad 90%
            sips -s format jpeg -s formatOptions 90 "$png_file" --out "$jpg_file" >/dev/null 2>&1
            
            if [ $? -eq 0 ] && [ -f "$jpg_file" ]; then
                original_size=$(get_file_size "$png_file")
                new_size=$(get_file_size "$jpg_file")
                
                if [ $new_size -lt $original_size ]; then
                    rm "$png_file"
                    echo "   ✅ Convertido: $(format_size $original_size) → $(format_size $new_size)"
                    echo "PNG→JPG $filename: $(format_size $original_size) → $(format_size $new_size)" >> "$LOG_FILE"
                else
                    rm "$jpg_file"
                    echo "   ⚪ Manteniendo PNG (menor tamaño)"
                fi
            else
                echo "   ❌ Error en conversión"
            fi
        fi
    done
fi

# Estadísticas finales
echo -e "${GREEN}🎉 OPTIMIZACIÓN COMPLETADA${NC}"
echo "=========================="
echo ""
echo "📊 Estadísticas:"
echo "   Total de archivos: $total_files"
echo "   Archivos optimizados: $optimized_files"
echo "   Tamaño original: $(format_size $total_original_size)"
echo "   Tamaño final: $(format_size $total_optimized_size)"

if [ $total_original_size -gt 0 ]; then
    total_reduction=$((100 - (total_optimized_size * 100 / total_original_size)))
    echo "   Reducción total: $total_reduction%"
    
    # Log final
    echo "" >> "$LOG_FILE"
    echo "RESUMEN FINAL:" >> "$LOG_FILE"
    echo "Total archivos: $total_files" >> "$LOG_FILE"
    echo "Archivos optimizados: $optimized_files" >> "$LOG_FILE"
    echo "Tamaño original: $(format_size $total_original_size)" >> "$LOG_FILE"
    echo "Tamaño final: $(format_size $total_optimized_size)" >> "$LOG_FILE"
    echo "Reducción total: $total_reduction%" >> "$LOG_FILE"
    echo "Fin: $(date)" >> "$LOG_FILE"
fi

echo ""
echo -e "${BLUE}📄 Log detallado guardado en: $LOG_FILE${NC}"
echo -e "${BLUE}💾 Backup disponible en: $BACKUP_DIR${NC}"
echo ""
echo -e "${GREEN}✨ ¡Galería optimizada para web!${NC}"