# Referencias de Diseño

Galería curada de sitios web excepcionales seleccionados por su calidad estética y excelencia técnica.

## 📁 Estructura del Proyecto

```
referencias-diseno/
├── README.md                    # Este archivo
├── index.html                   # Página principal
├── package.json                 # Dependencias Node.js
├── assets/                      # Recursos estáticos
│   ├── css/
│   │   └── style.css           # Estilos principales
│   └── js/
│       └── main.js             # JavaScript funcional
├── screenshots/                 # Capturas de pantalla
│   ├── *.jpg                   # Imágenes de sitios web
│   └── *.png                   # Imágenes de sitios web
├── scripts/                     # Scripts de automatización
│   ├── screenshot_generator.py  # Generador principal Python
│   ├── screenshot-generator.js  # Generador Node.js
│   ├── verify_screenshots.py   # Verificador de integridad
│   └── fix_filenames.py        # Corrector de nombres
└── docs/                       # Documentación
    ├── README_SCREENSHOTS.md   # Documentación de capturas
    └── (otros docs)
```

## 🎯 Características

### Diseño y UX
- **Minimalismo sofisticado**: Interface limpia centrada en el contenido
- **Responsive**: Optimizado para móvil, tablet y desktop
- **Grid inteligente**: Layout adaptativo que se ajusta automáticamente
- **Micro-animaciones**: Transiciones suaves y elegantes

### Funcionalidades
- **Filtrado por categorías**: Portfolio, Agency, Experimental, Cultural
- **Lazy loading**: Carga progresiva de imágenes para mejor performance
- **Screenshots automatizados**: Sistema de captura automática
- **SEO optimizado**: Meta tags y estructura semántica

### Sistema de Variables CSS
- **Colores**: Paleta neutra sofisticada
- **Espaciado**: Sistema 8px matemático consistente
- **Tipografía**: Jerarquía clara con escalas fluidas
- **Componentes**: Elementos reutilizables y modulares

## 🚀 Uso

### Desarrollo Local
```bash
# Servidor local simple
python3 -m http.server 8000

# Acceder en navegador
open http://localhost:8000
```

### Generar Screenshots
```bash
# Python (recomendado)
python3 scripts/screenshot_generator.py

# Node.js alternativo
node scripts/screenshot-generator.js
```

### Verificar Integridad
```bash
python3 scripts/verify_screenshots.py
```

## 📊 Referencias Incluidas

La galería incluye **32 sitios web** cuidadosamente seleccionados:

### Por Categoría
- **Portfolio** (8): Showcases personales de diseñadores/desarrolladores
- **Agency** (12): Estudios y agencias de diseño/desarrollo
- **Experimental** (6): Proyectos innovadores y conceptuales
- **Cultural** (4): Instituciones, arte y proyectos culturales
- **E-commerce** (2): Tiendas online con diseño excepcional

### Criterios de Selección
- ✅ **Calidad estética**: Diseño visual excepcional
- ✅ **Excelencia técnica**: Implementación técnica sólida
- ✅ **Innovación**: Enfoques creativos únicos
- ✅ **Usabilidad**: Experiencia de usuario excelente
- ✅ **Performance**: Optimización y velocidad

## 🛠️ Tecnologías

### Frontend
- **HTML5**: Estructura semántica
- **CSS3**: Variables custom, Grid, Flexbox
- **JavaScript ES6+**: Vanilla JS moderno
- **Intersection Observer**: Lazy loading nativo

### Automatización
- **Python**: Selenium para capturas de screenshots
- **Node.js**: Puppeteer para sitios complejos
- **Scripts**: Verificación y mantenimiento automático

## 📈 Performance

### Optimizaciones
- **Lazy loading**: Imágenes cargan bajo demanda
- **Compresión**: JPG 90% calidad para balance óptimo
- **CSS/JS externos**: Separación de concerns
- **Minimalismo**: Solo funcionalidades esenciales

### Métricas Objetivo
- **First Contentful Paint**: < 1.5s
- **Largest Contentful Paint**: < 2.5s
- **Cumulative Layout Shift**: < 0.1
- **First Input Delay**: < 100ms

## 🔄 Mantenimiento

### Actualización de Referencias
1. Editar `index.html` para agregar nueva referencia
2. Ejecutar `python3 scripts/screenshot_generator.py`
3. Verificar con `python3 scripts/verify_screenshots.py`
4. Commit y push cambios

### Monitoreo
- Screenshots se regeneran automáticamente si faltan
- Verificación de integridad detecta problemas
- Scripts incluyen manejo robusto de errores

## 📄 Licencia

Proyecto personal de Sergio Forés para propósitos educativos y de referencia.

---

**Última actualización**: Julio 2025  
**Versión**: 2.0.0  
**Mantenedor**: Sergio Forés