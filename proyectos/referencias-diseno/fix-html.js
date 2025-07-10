const fs = require('fs');

// Leer el archivo HTML
let html = fs.readFileSync('index.html', 'utf8');

// Arreglar la estructura duplicada causada por el script anterior
// Buscar y corregir patrones como:
// <div class="reference-content"><a href="..." ...>↗</a>
// <div class="reference-content">
//   contenido...
// </div>

// Primero, limpiar los enlaces mal posicionados dentro de reference-content
html = html.replace(/<div class="reference-content"><a href="([^"]*)" target="_blank" class="reference-link"[^>]*>↗<\/a>\s*<div class="reference-content">/g, 
    '<div class="reference-content">');

// Luego mover todos los enlaces al lugar correcto (después de la imagen)
const cardPattern = /(<div class="reference-card"[^>]*>\s*<img[^>]*>\s*)(<div class="reference-content">[\s\S]*?<\/div>\s*<\/div>)/g;

html = html.replace(cardPattern, (match, beforeContent, contentSection) => {
    // Extraer el enlace del contenido si existe
    const linkPattern = /<a href="([^"]*)" target="_blank" class="reference-link"[^>]*>↗<\/a>/;
    const linkMatch = contentSection.match(linkPattern);
    
    if (linkMatch) {
        const link = linkMatch[0];
        // Limpiar el enlace del contenido
        const cleanContent = contentSection.replace(linkPattern, '').trim();
        
        // Retornar con el enlace en la posición correcta
        return beforeContent + link + '\n                ' + cleanContent;
    }
    
    return match;
});

// Guardar el archivo corregido
fs.writeFileSync('index.html', html);

console.log('✅ HTML estructura corregida');