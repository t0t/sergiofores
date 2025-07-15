# Scripts de Optimización - Boilerplate

## 📜 **Scripts Disponibles**

### **`rename-optimize.sh`**
Script principal de renombrado y optimización de media assets.

**Características:**
- ✅ Renombrado automático con naming web-optimized
- ✅ Categorización inteligente por contenido
- ✅ Backup automático de archivos originales
- ✅ Numeración secuencial para evitar duplicados
- ✅ Soporte para imágenes y videos

**Uso:**
```bash
cd scripts/
./rename-optimize.sh
```

**Funcionalidades:**
- **Detección automática** de tipo de contenido
- **Nombres genéricos** basados en función (hero, feature, tech, etc.)
- **Backup completo** en `backup_original/`
- **Reporte detallado** del proceso

### **`optimize-media.py`**
Script avanzado en Python con optimización real de archivos.

**Requisitos:**
- ImageMagick (para imágenes)
- FFmpeg (para videos)

**Instalación de dependencias:**
```bash
# macOS
brew install imagemagick ffmpeg

# Ubuntu/Debian
sudo apt install imagemagick ffmpeg

# Windows
# Descargar desde sitios oficiales
```

**Características:**
- ✅ Optimización real de calidad y tamaño
- ✅ Redimensionado automático a tamaños web
- ✅ Compresión inteligente
- ✅ Conversión de formatos
- ✅ Metadatos removidos

## 🔧 **Flujo de Trabajo Recomendado**

### **1. Añadir Nuevos Assets**
```bash
# Copiar nuevos archivos a assets/media/
cp ~/Downloads/nueva-imagen.jpg assets/media/

# Ejecutar optimización
cd scripts/
./rename-optimize.sh
```

### **2. Optimización Avanzada (Opcional)**
```bash
# Solo si tienes ImageMagick/FFmpeg instalados
python3 optimize-media.py
```

### **3. Verificación**
```bash
# Verificar resultado
ls -la ../assets/media/

# Ver backup
ls -la ../assets/media/backup_original/
```

## 🎯 **Convenciones de Naming**

### **Prefijos por Categoría:**
- `hero-` → Imágenes para secciones hero
- `feature-` → Características y funcionalidades
- `tech-` → Tecnología, IA, robots
- `abstract-` → Arte conceptual y abstracto
- `background-` → Fondos y texturas
- `gallery-` → Imágenes de galería
- `team-` → Miembros del equipo
- `avatar-` → Perfiles y avatares
- `project-` → Screenshots de proyectos
- `demo-` → Videos de demostración
- `asset-` → Contenido general

### **Numeración:**
- `01`, `02`, `03` → Numeración secuencial
- `-01`, `-02` → Variaciones del mismo tipo

### **Extensiones:**
- `.jpg` → Imágenes optimizadas
- `.jpeg` → Imágenes específicas
- `.mp4` → Videos universales

## 📊 **Estadísticas de Optimización**

### **Estado Actual:**
- **Total archivos:** 37+ assets
- **Categorías:** 8 tipos diferentes
- **Formato:** 100% web-optimized
- **Backup:** Completo y seguro

### **Beneficios Logrados:**
✅ **URLs limpias** → SEO-friendly  
✅ **Carga rápida** → Performance mejorado  
✅ **Compatibilidad** → Funciona en todos los servidores  
✅ **Escalabilidad** → Fácil añadir más assets  
✅ **Mantenibilidad** → Sistema claro y documentado  

## 🚀 **Próximas Mejoras**

### **Funcionalidades Planeadas:**
- [ ] Optimización automática de tamaño de archivo
- [ ] Generación automática de WebP
- [ ] Lazy loading automático
- [ ] Responsive images generation
- [ ] CDN optimization headers

### **Scripts Adicionales:**
- [ ] `generate-thumbnails.sh` → Miniaturas automáticas
- [ ] `compress-videos.sh` → Compresión específica de videos
- [ ] `validate-assets.sh` → Validación de integridad
- [ ] `deploy-cdn.sh` → Upload automático a CDN

---

**🎯 Estos scripts mantienen tu biblioteca de assets siempre optimizada y lista para producción.**