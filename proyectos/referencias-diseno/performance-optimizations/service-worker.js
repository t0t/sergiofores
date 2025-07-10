/**
 * SERVICE WORKER OPTIMIZADO - REFERENCIAS DE DISEÑO
 * Estrategia de cache híbrida para máximo performance
 */

const CACHE_NAME = 'referencias-diseno-v1.2';
const STATIC_CACHE = 'static-v1.2';
const IMAGE_CACHE = 'images-v1.2';
const API_CACHE = 'api-v1.2';

// Assets críticos para precachear
const STATIC_ASSETS = [
    '/',
    '/index.html',
    '/assets/css/style.css',
    '/assets/js/critical.min.js',
    '/assets/js/image-loader.min.js',
    // Primeras 6 imágenes (above-the-fold)
    '/screenshots/webp/medium/verde-io.webp',
    '/screenshots/webp/medium/olivier-guilleux.webp',
    '/screenshots/webp/medium/temper-studio.webp',
    '/screenshots/webp/medium/seated-nyc.webp',
    '/screenshots/webp/medium/mushstudios-co.webp',
    '/screenshots/webp/medium/livinghouse-nz.webp'
];

// Assets de baja prioridad (lazy cache)
const LAZY_ASSETS = [
    '/assets/js/favorites.min.js',
    '/assets/js/tooltips.min.js',
    '/assets/js/scroll-indicator.min.js'
];

// =============================================================================
// INSTALL EVENT - Precache de assets críticos
// =============================================================================
self.addEventListener('install', event => {
    console.log('🔧 Service Worker: Instalando...');
    
    event.waitUntil(
        Promise.all([
            // Cache de assets estáticos críticos
            caches.open(STATIC_CACHE).then(cache => {
                console.log('📦 Precacheando assets críticos');
                return cache.addAll(STATIC_ASSETS);
            }),
            
            // Cache de imágenes vacío (se llena dinámicamente)
            caches.open(IMAGE_CACHE).then(cache => {
                console.log('🖼️ Inicializando cache de imágenes');
                return Promise.resolve();
            })
        ]).then(() => {
            console.log('✅ Service Worker instalado exitosamente');
            return self.skipWaiting(); // Activar inmediatamente
        })
    );
});

// =============================================================================
// ACTIVATE EVENT - Cleanup de caches antiguos
// =============================================================================
self.addEventListener('activate', event => {
    console.log('🚀 Service Worker: Activando...');
    
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    // Eliminar caches antiguos
                    if (cacheName !== STATIC_CACHE && 
                        cacheName !== IMAGE_CACHE && 
                        cacheName !== API_CACHE) {
                        console.log('🗑️ Eliminando cache antiguo:', cacheName);
                        return caches.delete(cacheName);
                    }
                })
            );
        }).then(() => {
            console.log('✅ Service Worker activado');
            return self.clients.claim(); // Controlar inmediatamente
        })
    );
});

// =============================================================================
// FETCH EVENT - Estrategias de cache híbridas
// =============================================================================
self.addEventListener('fetch', event => {
    const { request } = event;
    const url = new URL(request.url);
    
    // Solo interceptar requests del mismo origen
    if (url.origin !== location.origin) {
        return;
    }
    
    // Estrategia basada en tipo de recurso
    if (request.destination === 'image') {
        event.respondWith(handleImageRequest(request));
    } else if (url.pathname.endsWith('.css') || url.pathname.endsWith('.js')) {
        event.respondWith(handleStaticAsset(request));
    } else if (url.pathname === '/' || url.pathname.endsWith('.html')) {
        event.respondWith(handleHTMLRequest(request));
    } else {
        event.respondWith(handleGenericRequest(request));
    }
});

// =============================================================================
// ESTRATEGIAS DE CACHE ESPECÍFICAS
// =============================================================================

/**
 * Imágenes: Cache First con fallback a red
 * Las imágenes cambian poco, priorizamos cache
 */
async function handleImageRequest(request) {
    try {
        const cache = await caches.open(IMAGE_CACHE);
        const cachedResponse = await cache.match(request);
        
        if (cachedResponse) {
            console.log('🖼️ Imagen desde cache:', request.url);
            return cachedResponse;
        }
        
        // No está en cache, fetch y cachear
        const networkResponse = await fetch(request);
        
        if (networkResponse.ok) {
            console.log('🌐 Imagen desde red (cacheando):', request.url);
            cache.put(request, networkResponse.clone());
        }
        
        return networkResponse;
        
    } catch (error) {
        console.error('❌ Error cargando imagen:', error);
        // Retornar imagen placeholder en caso de error
        return new Response('', { status: 404 });
    }
}

/**
 * Assets estáticos (CSS/JS): Stale While Revalidate
 * Balance entre velocidad y frescura
 */
async function handleStaticAsset(request) {
    try {
        const cache = await caches.open(STATIC_CACHE);
        const cachedResponse = await cache.match(request);
        
        // Siempre retornar desde cache si está disponible
        const fetchPromise = fetch(request).then(networkResponse => {
            if (networkResponse.ok) {
                cache.put(request, networkResponse.clone());
            }
            return networkResponse;
        }).catch(() => cachedResponse); // Fallback a cache en error de red
        
        if (cachedResponse) {
            console.log('⚡ Asset desde cache (revalidando):', request.url);
            return cachedResponse;
        }
        
        console.log('🌐 Asset desde red:', request.url);
        return await fetchPromise;
        
    } catch (error) {
        console.error('❌ Error cargando asset:', error);
        return new Response('', { status: 500 });
    }
}

/**
 * HTML: Network First con cache fallback
 * HTML puede cambiar, priorizamos contenido fresco
 */
async function handleHTMLRequest(request) {
    try {
        console.log('🌐 HTML desde red:', request.url);
        const networkResponse = await fetch(request);
        
        if (networkResponse.ok) {
            const cache = await caches.open(STATIC_CACHE);
            cache.put(request, networkResponse.clone());
        }
        
        return networkResponse;
        
    } catch (error) {
        console.log('📦 HTML desde cache (offline):', request.url);
        const cache = await caches.open(STATIC_CACHE);
        const cachedResponse = await cache.match(request);
        
        return cachedResponse || new Response(
            '<h1>Offline</h1><p>Sin conexión. Algunas funciones pueden no estar disponibles.</p>',
            { headers: { 'Content-Type': 'text/html' } }
        );
    }
}

/**
 * Otros recursos: Cache First básico
 */
async function handleGenericRequest(request) {
    try {
        const cache = await caches.open(STATIC_CACHE);
        const cachedResponse = await cache.match(request);
        
        return cachedResponse || fetch(request);
        
    } catch (error) {
        console.error('❌ Error request genérico:', error);
        return new Response('', { status: 500 });
    }
}

// =============================================================================
// UTILS Y EVENTOS ADICIONALES
// =============================================================================

/**
 * Mensaje de comunicación con el cliente
 */
self.addEventListener('message', event => {
    if (event.data && event.data.type === 'SKIP_WAITING') {
        self.skipWaiting();
    }
    
    if (event.data && event.data.type === 'CACHE_STATS') {
        getCacheStats().then(stats => {
            event.ports[0].postMessage(stats);
        });
    }
});

/**
 * Obtener estadísticas de cache
 */
async function getCacheStats() {
    const cacheNames = await caches.keys();
    const stats = {};
    
    for (const name of cacheNames) {
        const cache = await caches.open(name);
        const keys = await cache.keys();
        stats[name] = keys.length;
    }
    
    return stats;
}

/**
 * Limpieza periódica de cache de imágenes
 */
async function cleanupImageCache() {
    const cache = await caches.open(IMAGE_CACHE);
    const requests = await cache.keys();
    
    // Mantener solo las últimas 50 imágenes
    if (requests.length > 50) {
        const toDelete = requests.slice(0, requests.length - 50);
        await Promise.all(toDelete.map(request => cache.delete(request)));
        console.log(`🧹 Limpieza: ${toDelete.length} imágenes eliminadas del cache`);
    }
}

// Limpieza cada 6 horas
setInterval(cleanupImageCache, 6 * 60 * 60 * 1000);