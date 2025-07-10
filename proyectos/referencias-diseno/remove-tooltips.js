const fs = require('fs');

// Leer el archivo HTML
let html = fs.readFileSync('index.html', 'utf8');

// Eliminar atributos de tooltip de los enlaces de explorar
html = html.replace(
    /<a href="([^"]*)" target="_blank" class="reference-link"\s*data-tooltip="[^"]*"\s*data-tooltip-position="[^"]*">↗<\/a>/g,
    '<a href="$1" target="_blank" class="reference-link">↗</a>'
);

// Guardar el archivo
fs.writeFileSync('index.html', html);

console.log('✅ Tooltips eliminados de todos los botones de explorar');