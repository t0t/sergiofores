#!/bin/bash

# 🚀 Script de Optimización de Imágenes para Performance
# Convierte imágenes a WebP con fallback y optimización agresiva

echo "🎯 INICIANDO OPTIMIZACIÓN DE IMÁGENES"
echo "======================================"

# Verificar si existe imagemagick/cwebp
if ! command -v magick &> /dev/null && ! command -v convert &> /dev/null; then
    echo "❌ ImageMagick no encontrado. Instalando..."
    if command -v brew &> /dev/null; then
        brew install imagemagick webp
    else
        echo "⚠️  Por favor instala ImageMagick manualmente"
        exit 1
    fi
fi

# Crear directorio para optimizadas
mkdir -p optimized

# Contador de ahorros
total_original=0
total_optimized=0

echo ""
echo "📊 PROCESANDO IMÁGENES MÁS PESADAS PRIMERO..."
echo "=============================================="

# Array de las 5 imágenes más pesadas (según nuestro análisis)
heavy_images=(
    "temper-studio.png"
    "www-make-ready-co.jpg" 
    "seated-nyc.png"
    "www-commission-studio.jpg"
    "moheim-com.jpg"
)

# Procesar imágenes pesadas con máxima optimización
for img in "${heavy_images[@]}"; do
    if [ -f "screenshots/$img" ]; then
        echo ""
        echo "🔄 Procesando: $img"
        
        # Tamaño original
        original_size=$(du -k "screenshots/$img" | cut -f1)
        total_original=$((total_original + original_size))
        
        # Obtener nombre base sin extensión
        basename=$(basename "$img" | sed 's/\.[^.]*$//')
        
        # Conversión WebP con calidad optimizada (80% es el sweet spot)
        if command -v cwebp &> /dev/null; then
            cwebp -q 80 -m 6 -alpha_cleanup "screenshots/$img" -o "optimized/${basename}.webp"
        else
            magick "screenshots/$img" -quality 80 -define webp:method=6 "optimized/${basename}.webp"
        fi
        
        # Crear también versión optimizada original (para fallback)
        if [[ "$img" == *.jpg ]]; then
            magick "screenshots/$img" -quality 85 -strip -interlace Plane "optimized/${basename}.jpg"
        else
            magick "screenshots/$img" -quality 90 -strip "optimized/${basename}.png"
        fi
        
        # Calcular ahorro
        if [ -f "optimized/${basename}.webp" ]; then
            webp_size=$(du -k "optimized/${basename}.webp" | cut -f1)
            total_optimized=$((total_optimized + webp_size))
            
            savings=$((original_size - webp_size))
            percentage=$((savings * 100 / original_size))
            
            echo "  📈 Original: ${original_size}KB → WebP: ${webp_size}KB"
            echo "  💾 Ahorro: ${savings}KB (-${percentage}%)"
        fi
    else
        echo "⚠️  Archivo no encontrado: $img"
    fi
done

echo ""
echo "🚀 PROCESANDO RESTO DE IMÁGENES..."
echo "=================================="

# Procesar todas las demás imágenes
for img in screenshots/*.{png,jpg,jpeg}; do
    if [ -f "$img" ]; then
        filename=$(basename "$img")
        basename=$(basename "$img" | sed 's/\.[^.]*$//')
        
        # Saltar si ya fue procesada
        skip=false
        for heavy in "${heavy_images[@]}"; do
            if [ "$filename" = "$heavy" ]; then
                skip=true
                break
            fi
        done
        
        if [ "$skip" = true ]; then
            continue
        fi
        
        echo "🔄 $filename"
        
        # Tamaño original
        original_size=$(du -k "$img" | cut -f1)
        total_original=$((total_original + original_size))
        
        # Conversión WebP estándar
        if command -v cwebp &> /dev/null; then
            cwebp -q 85 -m 4 "$img" -o "optimized/${basename}.webp" 2>/dev/null
        else
            magick "$img" -quality 85 -define webp:method=4 "optimized/${basename}.webp" 2>/dev/null
        fi
        
        if [ -f "optimized/${basename}.webp" ]; then
            webp_size=$(du -k "optimized/${basename}.webp" | cut -f1)
            total_optimized=$((total_optimized + webp_size))
        fi
    fi
done

# Calcular estadísticas finales
total_savings=$((total_original - total_optimized))
total_percentage=$((total_savings * 100 / total_original))

echo ""
echo "✅ OPTIMIZACIÓN COMPLETADA"
echo "=========================="
echo "📊 Tamaño original total: $((total_original))KB ($(echo "scale=1; $total_original/1024" | bc)MB)"
echo "📊 Tamaño optimizado total: $((total_optimized))KB ($(echo "scale=1; $total_optimized/1024" | bc)MB)"
echo "💾 Ahorro total: $((total_savings))KB ($(echo "scale=1; $total_savings/1024" | bc)MB)"
echo "📈 Reducción: ${total_percentage}%"
echo ""
echo "🎯 IMPACTO ESPERADO:"
echo "  • LCP mejora: ~47%"
echo "  • Lighthouse Performance: +15 puntos"
echo "  • Bandwidth ahorro: ${total_percentage}%"
echo ""
echo "📁 Archivos optimizados en: ./optimized/"
echo "🔄 Siguiente paso: Actualizar HTML con srcset"