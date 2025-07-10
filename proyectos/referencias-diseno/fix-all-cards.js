const fs = require('fs');

// Leer el archivo HTML
let html = fs.readFileSync('index.html', 'utf8');

// Patrón para encontrar cards sin contenedor de imagen pero que tienen imagen
const pattern = /(<!--[^>]*-->\s*<div class="reference-card"[^>]*>\s*)(<img src="[^"]*"[^>]*>\s*)(<a href[^>]*>[^<]*<\/a>\s*)?(<div class="reference-content">)/g;

// Reemplazar con contenedor de imagen
html = html.replace(pattern, (match, cardStart, img, link, contentStart) => {
    // Si no tiene contenedor de imagen, añadirlo
    if (!cardStart.includes('reference-image-container')) {
        if (link) {
            // Caso con enlace: poner imagen y enlace dentro del contenedor
            return cardStart + 
                   '                <div class="reference-image-container">\n' +
                   '                    ' + img.trim() + '\n' +
                   '                    ' + link.trim() + '\n' +
                   '                </div>\n' +
                   '                ' + contentStart;
        } else {
            // Caso sin enlace: solo imagen en contenedor
            return cardStart + 
                   '                <div class="reference-image-container">\n' +
                   '                    ' + img.trim() + '\n' +
                   '                </div>\n' +
                   '                ' + contentStart;
        }
    }
    return match;
});

// También necesitamos arreglar cards que no tienen enlace pero deberían tenerlo
// Patrón para cards que solo tienen imagen sin enlace
const noLinkPattern = /(<!--[^>]*-->\s*<div class="reference-card"[^>]*>\s*)(<div class="reference-image-container">\s*<img src="[^"]*"[^>]*>\s*<\/div>)\s*(<div class="reference-content">)/g;

html = html.replace(noLinkPattern, (match, cardStart, imageContainer, contentStart) => {
    // Extraer el src de la imagen para generar un enlace placeholder
    const imgMatch = imageContainer.match(/src="screenshots\/([^"]*\.(?:png|jpg))"/);
    if (imgMatch) {
        const filename = imgMatch[1];
        // Generar URL basada en el nombre del archivo (esto es un placeholder)
        let url = '#'; // Default placeholder
        
        // Algunos mapeos conocidos basados en nombres de archivo
        if (filename.includes('seated')) url = 'https://seated.nyc';
        else if (filename.includes('mush')) url = 'https://mushstudios.co';
        else if (filename.includes('living')) url = 'https://livinghouse.nz';
        else if (filename.includes('clue')) url = 'https://clueperfumery.com';
        else if (filename.includes('oui')) url = 'https://ouiouiouistudio.fr';
        else if (filename.includes('medusmo')) url = 'https://medusmo.com';
        else if (filename.includes('caladan')) url = 'https://caladan.bio';
        else if (filename.includes('camila')) url = 'https://camilarosa.net';
        else if (filename.includes('lenzing')) url = 'https://studiolenzing.com';
        else if (filename.includes('banshies')) url = 'https://thebanshies.com';
        else if (filename.includes('elwyn')) url = 'https://elwyn.co';
        else if (filename.includes('readymag')) url = 'https://readymag.com/designs/5647067';
        else if (filename.includes('minimal-gallery')) url = 'https://minimal.gallery';
        
        const imgTag = imageContainer.match(/<img[^>]*>/)[0];
        
        return cardStart + 
               '                <div class="reference-image-container">\n' +
               '                    ' + imgTag + '\n' +
               '                    <a href="' + url + '" target="_blank" class="reference-link" \n' +
               '                       data-tooltip="Explorar sitio" data-tooltip-position="left">↗</a>\n' +
               '                </div>\n' +
               '                ' + contentStart;
    }
    return match;
});

// Guardar el archivo corregido
fs.writeFileSync('index.html', html);

console.log('✅ Todas las cards actualizadas con contenedores de imagen y enlaces');