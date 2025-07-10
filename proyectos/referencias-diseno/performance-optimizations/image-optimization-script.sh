#!/bin/bash

# =============================================================================
# SCRIPT DE OPTIMIZACIÓN MASIVA DE IMÁGENES
# Convierte todas las imágenes a formatos modernos con diferentes calidades
# =============================================================================

echo "🖼️  INICIANDO OPTIMIZACIÓN DE IMÁGENES..."

# Crear directorios para formatos optimizados
mkdir -p screenshots/webp/{high,medium,low}
mkdir -p screenshots/avif/{high,medium,low}
mkdir -p screenshots/responsive/{320,640,1024,1400}

echo "📁 Directorios creados"

# Función para optimizar a WebP
optimize_webp() {
    local input=$1
    local output_dir=$2
    local quality=$3
    
    filename=$(basename "$input" | sed 's/\.[^.]*$//')
    
    # Convertir a WebP con diferentes calidades
    cwebp -q $quality "$input" -o "$output_dir/${filename}.webp"
}

# Función para optimizar a AVIF  
optimize_avif() {
    local input=$1
    local output_dir=$2
    local quality=$3
    
    filename=$(basename "$input" | sed 's/\.[^.]*$//')
    
    # Convertir a AVIF (requiere ImageMagick con soporte AVIF)
    magick "$input" -quality $quality "$output_dir/${filename}.avif"
}

# Función para crear responsive images
create_responsive() {
    local input=$1
    local filename=$(basename "$input" | sed 's/\.[^.]*$//')
    
    # Diferentes tamaños responsive
    magick "$input" -resize 320x174^ -gravity center -extent 320x174 "screenshots/responsive/320/${filename}_320.webp"
    magick "$input" -resize 640x348^ -gravity center -extent 640x348 "screenshots/responsive/640/${filename}_640.webp"
    magick "$input" -resize 1024x557^ -gravity center -extent 1024x557 "screenshots/responsive/1024/${filename}_1024.webp"
    magick "$input" -resize 1400x761^ -gravity center -extent 1400x761 "screenshots/responsive/1400/${filename}_1400.webp"
}

# Procesar todas las imágenes PNG y JPG
echo "🔄 Procesando imágenes..."

for img in screenshots/*.{png,jpg,jpeg}; do
    if [[ -f "$img" ]]; then
        echo "   Procesando: $(basename "$img")"
        
        # WebP - Diferentes calidades
        optimize_webp "$img" "screenshots/webp/high" 85
        optimize_webp "$img" "screenshots/webp/medium" 75  
        optimize_webp "$img" "screenshots/webp/low" 60
        
        # AVIF - Solo alta calidad (más eficiente)
        optimize_avif "$img" "screenshots/avif/high" 50
        
        # Responsive images
        create_responsive "$img"
    fi
done

echo "📊 RESULTADOS DE OPTIMIZACIÓN:"
echo "Original size: $(du -sh screenshots/*.{png,jpg,jpeg} 2>/dev/null | awk '{sum+=$1} END {print sum "MB"}')"
echo "WebP High (85%): $(du -sh screenshots/webp/high/ | awk '{print $1}')"
echo "WebP Medium (75%): $(du -sh screenshots/webp/medium/ | awk '{print $1}')"
echo "WebP Low (60%): $(du -sh screenshots/webp/low/ | awk '{print $1}')"
echo "AVIF: $(du -sh screenshots/avif/high/ | awk '{print $1}')"

echo "✅ OPTIMIZACIÓN COMPLETADA"
echo ""
echo "📋 SIGUIENTES PASOS:"
echo "1. Actualizar HTML para usar <picture> con fallbacks"
echo "2. Implementar lazy loading responsive"
echo "3. Configurar CDN con compresión automática"

# Generar código HTML responsive automáticamente
echo "🔧 Generando código HTML optimizado..."

cat > performance-optimizations/responsive-image-template.html << 'EOF'
<!-- TEMPLATE DE IMAGEN RESPONSIVE OPTIMIZADA -->
<picture class="reference-image-container">
    <!-- AVIF - Mejor compresión (si está soportado) -->
    <source 
        type="image/avif"
        srcset="screenshots/avif/high/{filename}.avif"
        media="(min-width: 1024px)">
    
    <!-- WebP - Excelente compresión -->
    <source 
        type="image/webp"
        srcset="screenshots/responsive/320/{filename}_320.webp 320w,
                screenshots/responsive/640/{filename}_640.webp 640w,
                screenshots/responsive/1024/{filename}_1024.webp 1024w,
                screenshots/responsive/1400/{filename}_1400.webp 1400w"
        sizes="(max-width: 768px) 100vw, 
               (max-width: 1024px) 50vw, 
               33vw">
    
    <!-- Fallback original -->
    <img 
        src="screenshots/{filename}.{ext}"
        alt="{alt_text}"
        class="reference-image"
        loading="lazy"
        decoding="async"
        width="1400"
        height="761">
</picture>
EOF

echo "✅ Template HTML generado en performance-optimizations/responsive-image-template.html"