const fs = require('fs');

// Leer el archivo HTML
let html = fs.readFileSync('index.html', 'utf8');

// Patrón para encontrar y mover los botones
const pattern = /(.*?<div class="reference-content">)(.*?)(<a href="[^"]*" target="_blank" class="reference-link"[^>]*>↗<\/a>)(.*?)(<\/div>\s*<\/div>)/gs;

// Reemplazar moviendo el botón fuera del reference-content
html = html.replace(pattern, (match, before, content, button, afterButton, ending) => {
    // Quitar el botón del contenido y ponerlo después de la imagen
    const cleanContent = content.replace(/\s*<a href="[^"]*" target="_blank" class="reference-link"[^>]*>↗<\/a>\s*/, '');
    
    return before + 
           button + '\n                ' +
           '<div class="reference-content">' +
           cleanContent + 
           afterButton + 
           ending;
});

// Guardar el archivo
fs.writeFileSync('index.html', html);

console.log('✅ Botones movidos correctamente fuera del reference-content');