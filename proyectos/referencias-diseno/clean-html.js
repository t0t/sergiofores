const fs = require('fs');

// Leer el archivo HTML
let html = fs.readFileSync('index.html', 'utf8');

// Limpiar espacios excesivos en los contenedores de imagen
html = html.replace(/\s+<div class="reference-image-container">/g, '\n                <div class="reference-image-container">');

// Guardar el archivo limpio
fs.writeFileSync('index.html', html);

console.log('✅ HTML limpiado y formateado correctamente');