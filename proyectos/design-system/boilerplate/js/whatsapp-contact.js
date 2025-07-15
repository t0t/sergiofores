/**
 * WHATSAPP CONTACT - Sistema de contacto seguro
 * 
 * CARACTERÍSTICAS:
 * ✅ Encriptación simple del número de teléfono
 * ✅ Protección contra scraping de bots
 * ✅ Apertura directa de WhatsApp
 * ✅ Mensaje predefinido personalizable
 */

class WhatsAppContact {
    constructor() {
        this.init();
    }

    /**
     * Inicializar el sistema de contacto
     */
    init() {
        const whatsappBtn = document.getElementById('whatsapp-btn');
        if (whatsappBtn) {
            whatsappBtn.addEventListener('click', (e) => {
                e.preventDefault();
                this.openWhatsApp(whatsappBtn);
            });
            
            console.log('📱 WhatsApp Contact initialized');
        }
    }

    /**
     * Sistema de encriptación simple - ROT13 + Base64
     * Suficiente para proteger contra scraping básico
     */
    encryptPhone(phone) {
        // ROT13 para caracteres
        const rot13 = phone.replace(/[0-9]/g, (char) => {
            return String.fromCharCode(((parseInt(char) + 5) % 10) + 48);
        });
        
        // Base64 para ofuscar más
        return btoa(rot13);
    }

    /**
     * Desencriptar número de teléfono
     */
    decryptPhone(encryptedPhone) {
        try {
            // Decodificar Base64
            const decoded = atob(encryptedPhone);
            
            // Revertir ROT13
            const phone = decoded.replace(/[0-9]/g, (char) => {
                return String.fromCharCode(((parseInt(char) - 5 + 10) % 10) + 48);
            });
            
            return phone;
        } catch (error) {
            console.error('Error decrypting phone:', error);
            return null;
        }
    }

    /**
     * Abrir WhatsApp con número desencriptado
     */
    openWhatsApp(button) {
        const encryptedPhone = button.getAttribute('data-phone');
        
        if (encryptedPhone === 'encoded-phone-here') {
            console.warn('📱 WhatsApp: Número no configurado. Actualiza data-phone con número encriptado.');
            alert('Número de WhatsApp no configurado. Contacta por email.');
            return;
        }

        const phone = this.decryptPhone(encryptedPhone);
        
        if (!phone) {
            console.error('📱 WhatsApp: Error al desencriptar número');
            return;
        }

        // Limpiar número (solo dígitos)
        const cleanPhone = phone.replace(/\D/g, '');
        
        // Mensaje predefinido
        const message = encodeURIComponent(
            '¡Hola! He visto tu portfolio y me gustaría hablar contigo sobre un proyecto. ¿Tienes un momento?'
        );
        
        // URL de WhatsApp
        const whatsappUrl = `https://wa.me/${cleanPhone}?text=${message}`;
        
        // Abrir WhatsApp
        window.open(whatsappUrl, '_blank');
        
        console.log('📱 WhatsApp opened successfully');
    }

    /**
     * Método público para generar número encriptado
     * USO: whatsAppContact.generateEncryptedPhone('+34123456789')
     */
    generateEncryptedPhone(phone) {
        const encrypted = this.encryptPhone(phone);
        console.log(`📱 Número encriptado para: ${phone}`);
        console.log(`📱 Usar en HTML: data-phone="${encrypted}"`);
        return encrypted;
    }
}

// Auto-inicialización
document.addEventListener('DOMContentLoaded', () => {
    window.whatsAppContact = new WhatsAppContact();
});

// Exportar para módulos
if (typeof module !== 'undefined' && module.exports) {
    module.exports = WhatsAppContact;
}

/**
 * ==========================================================================
 * INSTRUCCIONES DE USO
 * ==========================================================================
 * 
 * 1. ENCRIPTAR TU NÚMERO:
 *    - Abre la consola del navegador (F12)
 *    - Ejecuta: whatsAppContact.generateEncryptedPhone('+34123456789')
 *    - Copia el resultado
 * 
 * 2. ACTUALIZAR HTML:
 *    - Reemplaza 'encoded-phone-here' por tu número encriptado
 *    - Ejemplo: data-phone="MTIzNDU2Nzg5"
 * 
 * 3. PERSONALIZAR MENSAJE:
 *    - Modifica la variable 'message' en el método openWhatsApp()
 * 
 * 4. SEGURIDAD:
 *    - El número real no aparece en el código fuente
 *    - Protección básica contra scraping automatizado
 *    - Para mayor seguridad, usar server-side encryption
 */