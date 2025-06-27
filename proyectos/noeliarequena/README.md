# Noelia Requena - Portfolio Web

Portfolio web minimalista para la artista Noelia Requena, desarrollado con Vite, HTML, CSS y JavaScript vanilla.

## Características

- Diseño limpio y minimalista
- Galería de obras con lightbox
- Soporte completo para dispositivos móviles
- Optimización de rendimiento

## Estructura del Proyecto

```
noeliarequena/
├── src/           # Código fuente (Vite)
├── public/        # Archivos estáticos (imágenes, CNAME)
├── docs/          # Carpeta de build para producción (desplegada)
└── package.json   # Dependencias y scripts
```

## Desarrollo Local

1.  Clona el repositorio.
2.  Instala las dependencias: `npm install`.
3.  Ejecuta el servidor de desarrollo: `npm run dev`.

## Despliegue en GitHub Pages

Este proyecto está configurado para un despliegue manual y controlado en GitHub Pages.

**Pasos para desplegar:**

1.  **Construir el proyecto:**
    Ejecuta el siguiente comando para generar la versión de producción del sitio en la carpeta `/docs`.
    ```bash
    npm run build
    ```

2.  **Subir los cambios:**
    Añade la carpeta `/docs` al commit y sube los cambios a la rama `main`.
    ```bash
    git add .
    git commit -m "Deploy: Actualizar build de producción"
    git push origin main
    ```

3.  **Configurar GitHub Pages:**
    En la configuración del repositorio (`Settings > Pages`), asegúrate de que la fuente de despliegue ("Source") sea **Deploy from a branch** y que la rama ("Branch") esté configurada en **main** y la carpeta **`/docs`**.

## Tecnologías

- Vite.js
- HTML5
- CSS3 (Grid, Flexbox)
- JavaScript (ES6+)

## Versión

Ver [CHANGELOG.md](CHANGELOG.md) para detalles de los cambios en cada versión.