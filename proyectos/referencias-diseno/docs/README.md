# Referencias de Diseño

Showcase curado de sitios web excepcionales, seleccionados por su calidad estética y excelencia técnica para inspirar proyectos digitales de alta sofisticación.

## 🎯 Propósito

Base de referencias de diseño para:
- Inspiración visual y conceptual
- Definición del estilo ideal en UX/UI
- Análisis de tendencias en diseño digital
- Patrones de navegación y experiencia de usuario
- Estándares de calidad estética y técnica

## 🏗️ Arquitectura del Proyecto

### Estructura de Archivos
```
referencias-diseno/
├── index.html              # Showcase principal
├── screenshots/             # Capturas de pantalla automáticas
├── screenshot-generator.js  # Script Puppeteer para capturas
├── package.json            # Configuración del proyecto
└── README.md               # Este archivo
```

### Tecnologías Utilizadas
- **HTML/CSS/JS vanilla** - Experiencia nativa sin frameworks
- **Puppeteer** - Generación automática de screenshots
- **Design System** - Variables CSS y componentes Sergio Forés
- **Responsive Grid** - Layout adaptativo mobile-first

## 📝 Estilo de Diseño

### Filosofía: "Modernismo Digital Sofisticado"
- **Intelectualidad Visual** con confidence técnico
- **Minimalismo intencional** - cada elemento tiene propósito
- **Sofisticación** sin pretensión
- **Espaciado generoso** como statement de calidad

### Variables CSS Específicas
```css
/* Colores neutros sofisticados */
--color-primary: #000000;
--color-secondary: #1a1a1a;
--color-accent: #8b5cf6;

/* Sistema de espaciado 8px */
--space-xs: 0.5rem;   /* 8px */
--space-sm: 1rem;     /* 16px */
--space-md: 1.5rem;   /* 24px */
--space-lg: 2rem;     /* 32px */
--space-xl: 3rem;     /* 48px */
```

## 🔄 Cómo Añadir Nuevas Referencias

### 1. Capturar Screenshot
```bash
# Ejecutar desde el directorio del proyecto
node screenshot-generator.js
```

### 2. Añadir Nueva Referencia al HTML
Estructura de card de referencia:
```html
<div class="reference-card" data-category="[portfolio|agency|experimental|cultural]">
    <img src="screenshots/[nombre-archivo].jpg" alt="[Descripción]" class="reference-image">
    <div class="reference-content">
        <h3 class="reference-title">[Nombre del Sitio]</h3>
        <p class="reference-url">[dominio.com]</p>
        <p class="reference-description">[Descripción detallada del sitio]</p>
        <div class="reference-tags">
            <span class="reference-tag">[Tag1]</span>
            <span class="reference-tag">[Tag2]</span>
        </div>
        <a href="[URL]" target="_blank" class="reference-link">Explorar sitio</a>
    </div>
</div>
```

### 3. Categorización
- **portfolio** - Portfolios personales, creativos, arquitectos
- **agency** - Agencias digitales, estudios creativos
- **experimental** - Proyectos experimentales, conceptuales
- **cultural** - Fundaciones, instituciones culturales

### 4. Guidelines de Contenido

#### Títulos
- Nombre del sitio/proyecto/organización
- Máximo 3-4 palabras
- Sin artículos innecesarios

#### URLs
- Solo el dominio principal (sin www, sin https)
- Consistencia: `dominio.com` o `dominio.org`

#### Descripciones
- 1-2 frases máximo
- Enfoque en **qué hace único** al sitio
- Mencionar técnicas/enfoques destacables
- Lenguaje sofisticado pero accesible

#### Tags
- Máximo 4 tags por referencia
- Enfoque en características visuales/técnicas
- Ejemplos: `Minimal`, `Typography`, `Animation`, `Elegant`

### 5. Criterios de Selección

#### ✅ Incluir si tiene:
- **Excelencia visual** - Diseño memorable y sofisticado
- **Innovación técnica** - Implementación avanzada
- **Experiencia de usuario** excepcional
- **Coherencia conceptual** - Diseño alineado con propósito
- **Screenshot exitoso** - Captura visual de calidad

#### ❌ Evitar si tiene:
- Diseño genérico o corporativo básico
- Saturación visual excesiva
- Performance deficiente
- Experiencia de usuario confusa
- Sin screenshot disponible

## 🛠️ Mantenimiento

### Actualizar Screenshots
```bash
# Regenerar todos los screenshots
node screenshot-generator.js

# Verificar capturas exitosas
ls screenshots/ | wc -l
```

### Validar Referencias
- Verificar que todos los enlaces funcionen
- Comprobar que las imágenes cargan correctamente
- Revisar responsive en mobile/desktop
- Validar filtros por categoría

### Optimización
- Mantener máximo 20-25 referencias activas
- Rotar referencias menos relevantes
- Priorizar calidad sobre cantidad
- Actualizar anualmente

## 📊 Estado Actual

- **16 referencias curadas** actualmente
- **100% con screenshots** verificados
- **4 categorías** de clasificación
- **Filtrado dinámico** implementado

## 🎨 Inspiración del Prompt

Basado en `PROMPTS/design_prompt_complete.md`:
- Modernismo Digital Sofisticado
- Espaciado intencional y generoso
- Jerarquía tipográfica clara
- Interacciones sutiles pero presentes
- Performance y accesibilidad prioritarios

---

**Nota**: Este proyecto sirve como referencia visual para definir y mantener estándares de calidad en todos los desarrollos web del portfolio Sergio Forés.