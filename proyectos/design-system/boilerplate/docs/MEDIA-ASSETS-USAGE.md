# Guía de Uso - Media Assets

## 🎯 **Assets Incluidos en el Boilerplate**

Tu boilerplate incluye **15 imágenes + 2 videos** optimizados con naming genérico para desarrollo rápido.

## 📸 **Catálogo de Imágenes**

### **Hero Sections (Fondos principales)**
```html
<!-- Hero abstracto (por defecto) -->
<section style="background-image: url('assets/images/hero-abstract.jpg');">

<!-- Hero tecnológico IA -->
<section style="background-image: url('assets/images/hero-abstract-01.jpg');">

<!-- Fondo geométrico para secciones -->
<section style="background-image: url('assets/images/background-01-01.jpg');">
```

### **Features y Características**
```html
<!-- Característica tecnológica -->
<img src="assets/images/feature-01.jpg" alt="Tecnología">

<!-- Característica de diseño -->
<img src="assets/images/feature-01-01.jpg" alt="Diseño">

<!-- Característica IA -->
<img src="assets/images/feature-01-02.jpg" alt="Inteligencia Artificial">
```

### **Personas y Perfiles**
```html
<!-- Avatar de perfil -->
<img class="avatar" src="assets/images/avatar-01.jpg" alt="Perfil">
```

### **Galería y Portfolio**
```html
<!-- Galería de imágenes -->
<img src="assets/images/gallery-01.jpg" alt="Galería 1">
<img src="assets/images/gallery-01-01.jpg" alt="Galería 2">

<!-- Screenshots de proyectos -->
<img src="assets/images/project-01.jpg" alt="Sistema Conceptual 01234">
<img src="assets/images/gallery-01.jpg" alt="Portfolio">
```

## 🎬 **Videos Incluidos**

### **Video de Fondo (Hero)**
```html
<!-- Hero con video de fondo -->
<section class="hero">
    <video autoplay muted loop playsinline>
        <source src="assets/images/background-01.mp4" type="video/mp4">
        Tu navegador no soporta video HTML5.
    </video>
    <div class="hero-content">
        <h1>Título sobre video</h1>
    </div>
</section>
```

### **Video de Demostración**
```html
<!-- Video con controles para demos -->
<video controls width="100%">
    <source src="assets/images/demo-01.mp4" type="video/mp4">
    Tu navegador no soporta video HTML5.
</video>
```

## 🎨 **Implementación con CSS**

### **Fondos Responsivos**
```css
/* Hero con imagen responsiva */
.hero--abstract {
    background-image: url('../media/hero-abstract.jpg');
    background-size: cover;
    background-position: center;
    background-attachment: fixed; /* Parallax */
}

/* Fondo geométrico para secciones */
.section--geometric {
    background-image: url('../media/background-geometric.jpg');
    background-repeat: no-repeat;
    background-size: contain;
    background-position: right center;
}

/* Textura de fondo sutil */
.section--textured {
    background-image: url('../media/background-texture.jpg');
    background-repeat: repeat;
    background-size: 400px;
    opacity: 0.1;
}
```

### **Optimización Móvil**
```css
/* Diferentes imágenes según dispositivo */
@media (max-width: 768px) {
    .hero--abstract {
        background-attachment: scroll; /* Mejor performance móvil */
        background-size: cover;
    }
}

/* Lazy loading para galerías */
.gallery-img {
    loading: lazy;
    width: 100%;
    height: auto;
}
```

## 🚀 **Ejemplos de Uso Práctico**

### **1. Landing Page con Video Hero**
```html
<section class="hero hero--video">
    <video autoplay muted loop playsinline>
        <source src="assets/images/background-01.mp4" type="video/mp4">
    </video>
    <div class="hero-content">
        <h1>Innovación Digital</h1>
        <p>Creamos experiencias que transforman</p>
        <a href="#contact" class="btn btn--primary">Comenzar</a>
    </div>
</section>
```

### **2. Sección de Features con Imágenes**
```html
<section class="features">
    <div class="features-grid">
        <!-- [MAIN-03.02.01] Feature tecnológica -->
        <div class="feature">
            <img src="assets/images/feature-tech.jpg" alt="Tecnología">
            <h3>Tecnología Avanzada</h3>
            <p>Utilizamos las últimas tecnologías para crear soluciones innovadoras.</p>
        </div>
        
        <!-- [MAIN-03.02.02] Feature de diseño -->
        <div class="feature">
            <img src="assets/images/feature-design.jpg" alt="Diseño">
            <h3>Diseño Centrado en Usuario</h3>
            <p>Cada pixel está pensado para mejorar la experiencia del usuario.</p>
        </div>
        
        <!-- [MAIN-03.02.03] Feature de IA -->
        <div class="feature">
            <img src="assets/images/feature-ai.jpg" alt="IA">
            <h3>Inteligencia Artificial</h3>
            <p>Automatización inteligente que potencia tu productividad.</p>
        </div>
    </div>
</section>
```

### **3. Sección de Equipo**
```html
<section class="team">
    <h2>Nuestro Equipo</h2>
    <div class="team-grid">
        <div class="team-member">
            <img src="assets/images/team-member.jpg" alt="Miembro del equipo">
            <h3>Alex Rodriguez</h3>
            <p>Lead Developer</p>
        </div>
        <div class="team-member">
            <img src="assets/images/avatar-profile.jpg" alt="Miembro del equipo">
            <h3>Maria González</h3>
            <p>UX Designer</p>
        </div>
    </div>
</section>
```

### **4. Portfolio/Galería**
```html
<section class="portfolio">
    <h2>Nuestros Proyectos</h2>
    <div class="portfolio-grid">
        <div class="portfolio-item">
            <img src="assets/images/project-design-system.jpg" alt="Sistema Conceptual 01234">
            <div class="portfolio-info">
                <h3>Marco Filosófico 01234</h3>
                <p>Sistema conceptual para organización del conocimiento</p>
            </div>
        </div>
        <div class="portfolio-item">
            <img src="assets/images/project-portfolio.jpg" alt="Portfolio">
            <div class="portfolio-info">
                <h3>Portfolio Interactivo</h3>
                <p>Showcase moderno y responsive</p>
            </div>
        </div>
    </div>
</section>
```

## 🔧 **Personalización y Reemplazo**

### **Mantener Naming Convention**
```bash
# ✅ CORRECTO - Mantener nombres genéricos
mi-nueva-imagen.jpg → hero-abstract.jpg
mi-feature.jpg → feature-tech.jpg
mi-avatar.jpg → avatar-profile.jpg

# ❌ INCORRECTO - Cambiar naming
hero-abstract.jpg → mi-imagen-fea.jpg
```

### **Optimización de Nuevas Imágenes**
```bash
# Ejemplo con ImageMagick
convert original.jpg -resize 1920x1080^ -gravity center -extent 1920x1080 hero-abstract.jpg

# Para features (cuadradas)
convert original.jpg -resize 800x800^ -gravity center -extent 800x800 feature-tech.jpg

# Para avatares (círculo)
convert original.jpg -resize 400x400^ -gravity center -extent 400x400 avatar-profile.jpg
```

### **Formatos Recomendados**
- **Hero/Backgrounds:** 1920x1080 JPG (landscape)
- **Features:** 800x800 JPG (square)
- **Avatares:** 400x400 JPG (square)
- **Galería:** 1200x800 JPG (3:2 ratio)
- **Videos:** MP4 H.264, máximo 1080p

## ⚡ **Performance y Optimización**

### **Lazy Loading Automático**
```html
<!-- Añadir loading="lazy" para imágenes no críticas -->
<img src="assets/images/gallery-01.jpg" alt="Galería" loading="lazy">
```

### **Responsive Images**
```html
<!-- Diferentes tamaños según pantalla -->
<picture>
    <source media="(max-width: 768px)" srcset="assets/images/hero-abstract-mobile.jpg">
    <img src="assets/images/hero-abstract.jpg" alt="Hero">
</picture>
```

### **Preload para Críticos**
```html
<!-- Precargar hero image -->
<link rel="preload" as="image" href="assets/images/hero-abstract.jpg">
```

---

**🎯 Con estos assets y ejemplos tienes todo lo necesario para crear un proyecto visualmente atractivo desde el primer momento.**