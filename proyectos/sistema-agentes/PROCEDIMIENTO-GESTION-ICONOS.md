# PROCEDIMIENTO DE GESTIÓN DE ICONOS - TOT BOILERPLATE

## FILOSOFÍA: ICONOS OPTIMIZADOS CON STROKE-WIDTH 2PX

Para mantener totboilerplate **minimalista y eficiente**, generamos únicamente los iconos necesarios con stroke-width 2px optimizado desde la fuente Lucide.

## FLUJO DE TRABAJO

### 1. CONFIGURACIÓN INICIAL (Una sola vez)
```bash
# Ir al directorio boilerplate del design-system
cd /CEREBRO-DIGITAL/PROYECTOS/sergiofores/proyectos/design-system/boilerplate

# Instalar lucide si no está
npm install lucide
```

### 2. GENERACIÓN DE ICONOS
```bash
# Ejecutar el script extractor
node extract-lucide-icons.js

# Resultado: 23 iconos SVG optimizados con stroke-width 2px en:
# ../totboilerplate/assets/icons/
```

### 3. ICONOS DISPONIBLES
- **Principales**: heart, sparkles, code, house, user, mail
- **Sociales**: github, linkedin  
- **Navegación**: settings, search, star, bookmark, bell
- **Temporales**: calendar, clock
- **Archivos**: folder, camera, map-pin, phone
- **Comunicación**: message-circle, download, upload, share

### 4. IMPLEMENTACIÓN EN HTML
```html
<!-- Iconos grandes (stroke-width 2px) -->
<li class="tac icon-lg">
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-heart">
    <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
  </svg>
  <h3>Título</h3>
  <p>Descripción</p>
</li>
```

## VENTAJAS DEL SISTEMA

### ✅ EFICIENCIA
- **Solo iconos necesarios**: 23 SVG específicos vs librería completa
- **Optimización**: stroke-width 2px consistente para iconos grandes
- **Minimalismo**: totboilerplate permanece ligero

### ✅ CONTROL TOTAL
- **Paths reales**: Extraídos desde node_modules/lucide
- **Configuración**: stroke-width 2px matemáticamente preciso
- **Consistencia**: Todos los iconos siguen el mismo patrón

### ✅ MANTENIBILIDAD
- **Fuente única**: design-system/boilerplate maneja la instalación
- **Generación automática**: Script reutilizable
- **Versionado**: Controlado por package.json

## ADDING NUEVOS ICONOS

### Paso 1: Verificar disponibilidad
```bash
# Buscar icono en node_modules
find node_modules/lucide -name "*nombre-icono*"
```

### Paso 2: Añadir a la lista
```javascript
// En extract-lucide-icons.js
const ICONOS_NECESARIOS = [
    'heart', 'sparkles', 'code', 'nuevo-icono' // ← Añadir aquí
];
```

### Paso 3: Regenerar
```bash
node extract-lucide-icons.js
```

## REGLAS CRÍTICAS

### 🚫 PROHIBIDO
- **CDN Lucide**: No usar `<script src="https://unpkg.com/lucide@latest/dist/umd/lucide.js">`
- **Stroke-width dinámico**: Todos los iconos grandes deben tener stroke-width 2px
- **Duplicación**: No crear iconos manualmente

### ✅ OBLIGATORIO
- **Generación automática**: Siempre usar extract-lucide-icons.js
- **Stroke-width 2px**: Para iconos grandes (.icon-lg)
- **Paths reales**: Extraídos desde la fuente oficial

## ARCHIVOS CLAVE

- `extract-lucide-icons.js` - Script generador principal
- `../totboilerplate/assets/icons/` - Directorio de iconos generados
- `package.json` - Configuración con dependencia lucide

## MEMORIA SISTÉMICA

**Cada vez que se requieran iconos optimizados:**
1. Usar design-system/boilerplate como base
2. Ejecutar extract-lucide-icons.js
3. Verificar stroke-width 2px en iconos grandes
4. Copiar solo iconos necesarios a destino
5. Mantener totboilerplate minimalista

Esta metodología asegura iconos optimizados, stroke-width consistente y proyectos ligeros.