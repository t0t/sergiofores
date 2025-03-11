// Importaciones para Vite
import { marked } from 'marked';

// Función para cargar el contenido Markdown
async function cargarContenidoMarkdown() {
    const contenedor = document.getElementById('content');
    const cargador = document.getElementById('loader');
    
    try {
        // Cargar el archivo Markdown
        const respuesta = await fetch('/contenido_web.md');
        
        if (!respuesta.ok) {
            throw new Error(`Error al cargar el archivo (${respuesta.status}): ${respuesta.statusText}`);
        }
        
        const contenidoMarkdown = await respuesta.text();
        
        // Configurar opciones de Marked
        marked.setOptions({
            gfm: true,
            breaks: true,
            sanitize: false,
            smartLists: true,
            smartypants: true
        });
        
        // Convertir Markdown a HTML
        const contenidoHTML = marked.parse(contenidoMarkdown);
        
        // Ocultar el cargador
        cargador.style.display = 'none';
        
        // Modificar el HTML para eliminar las etiquetas <p> alrededor de las imágenes
        const contenidoModificado = contenidoHTML.replace(/<p>(<img[^>]+>)<\/p>/g, '$1');
        
        // Insertar el HTML en el contenedor
        contenedor.innerHTML = contenidoModificado;
        
        console.log("Contenido Markdown cargado y convertido a HTML");
        
        // Iniciar Mermaid
        if (typeof mermaid !== 'undefined') {
            console.log("Inicializando diagramas Mermaid...");
            setTimeout(() => {
                try {
                    mermaid.init();
                    console.log("Mermaid inicializado correctamente");
                } catch (error) {
                    console.error("Error al inicializar Mermaid:", error);
                }
            }, 500);
        } else {
            console.error("La biblioteca Mermaid no está disponible");
        }
        
        // Procesar imágenes para comportamiento interactivo
        procesarImagenesProyectos();
        
        // Inicializar el botón de WhatsApp
        inicializarBotonWhatsApp();
        
    } catch (error) {
        console.error('Error al cargar el contenido Markdown:', error);
        cargador.style.display = 'none';
        contenedor.innerHTML = '<div class="error">Error al cargar el contenido: ' + error.message + '</div>';
    }
}

// Función para procesar imágenes de proyectos y agregar comportamiento interactivo
function procesarImagenesProyectos() {
    const imagenes = document.querySelectorAll('img');
    
    imagenes.forEach(imagen => {
        // Agregar atributo loading="lazy" para mejorar rendimiento
        imagen.setAttribute('loading', 'lazy');
    });
}

// Función para inicializar el botón de WhatsApp
function inicializarBotonWhatsApp() {
    const botonWhatsApp = document.getElementById('whatsappButton');
    
    if (botonWhatsApp) {
        botonWhatsApp.addEventListener('click', function() {
            window.open('https://wa.me/+34123456789', '_blank');
        });
    }
}

// Función para establecer el año actual en el footer
function actualizarAnio() {
    const elementoAnio = document.getElementById('year');
    if (elementoAnio) {
        elementoAnio.textContent = new Date().getFullYear();
    }
}

// Inicializar cuando el DOM esté cargado
document.addEventListener('DOMContentLoaded', () => {
    cargarContenidoMarkdown();
    actualizarAnio();
});
