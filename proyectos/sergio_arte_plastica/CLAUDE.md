# CLAUDE.md

Este archivo proporciona guía a Claude Code (claude.ai/code) cuando trabaja con código en este repositorio.

## Reglas Generales

1. **Idioma**: Usar SIEMPRE español de España en todas las comunicaciones y comentarios.

2. **Diseño**: Seguir las reglas de diseño presentes en `GEMINI.md`. Si este archivo no existe o no es accesible, mantener la consistencia con el diseño actual del proyecto y la arquitectura establecida.

## Comandos de Desarrollo

### Comandos Principales
```bash
# Servidor de desarrollo (Servidor HTTP integrado de Python)
npm run dev  # o serve, start - Inicia servidor en puerto 8000

# Instalación
npm install  # Instalar dependencias
npm run setup  # Configuración completa incluyendo verificación de estructura de imágenes
```

### Gestión de Galería
```bash
# Procesamiento de galería
npm run gallery:full  # Procesamiento completo de galería
npm run gallery:optimize  # Optimizar imágenes de galería
npm run gallery:update  # Actualizar datos de galería
npm run gallery:audit  # Auditar estructura de galería

# Gestión de archivos
npm run files:normalize  # Normalizar nombres de archivos
npm run files:preview  # Previsualizar normalización de archivos
```

### Procesamiento de Imágenes
```bash
# Optimización de imágenes
npm run images:optimize  # Optimizar todas las imágenes
npm run images:webp  # Generar versiones WebP
npm run images:rename  # Renombrar imágenes con nombres semánticos

# Estructura y limpieza
npm run structure:organize  # Organizar estructura de archivos
npm run structure:clean  # Limpiar archivos duplicados
```

### Rendimiento
```bash
npm run performance:analyze  # Analizar rendimiento del sitio
```

## Descripción de la Arquitectura

### Tecnologías Principales
- Sitio estático usando JavaScript vanilla con características ES6+
- Componente Web model-viewer de Google para visualización 3D
- Pipeline de optimización de imágenes con soporte WebP
- Carga perezosa para imágenes de galería

### Sistemas Clave

1. **Sistema de Galería**
   - Gestionado por gallery-manager.js
   - Soporta múltiples categorías de obra (óleo, tinta, impresión 3D, dibujos)
   - Optimización automática de imágenes y conversión a WebP
   - Datos de galería almacenados en gallery-data.json

2. **Visor de Modelos 3D**
   - Usa @google/model-viewer para archivos GLB
   - Modelos almacenados en directorio /models con variantes optimizadas
   - Soporta visualización interactiva con controles de cámara
   - Carga automática de versiones comprimidas/descomprimidas

3. **Pipeline de Procesamiento de Imágenes**
   - Optimización automatizada de imágenes con límites de tamaño (máx. 500KB)
   - Generación de WebP para navegadores modernos
   - Sistema de renombrado semántico
   - Detección y limpieza de duplicados

4. **Categorías de Activos**
   - Pinturas al óleo: Obras sobre lino belga
   - Obras en tinta: Piezas sobre papel japonés
   - Impresión 3D: Esculturas digitales
   - Dibujos: Bocetos y trabajo preliminar