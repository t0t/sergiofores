/**
 * 🚀 SERVICE WORKER PARA PERFORMANCE MÁXIMA
 * Estrategia de caching híbrida optimizada para referencias de diseño
 */

const CACHE_NAME = 'refs-v1.2.0';
const CRITICAL_CACHE = 'refs-critical-v1.0';
const IMAGES_CACHE = 'refs-images-v1.0';
const STATIC_CACHE = 'refs-static-v1.0';

// Assets críticos que deben cachearse inmediatamente
const CRITICAL_ASSETS = [
    '/',
    '/index.html',
    '/assets/css/style.css'
];

// Assets estáticos con cache largo
const STATIC_ASSETS = [
    '/assets/js/main.js',
    '/assets/js/favorites.js',
    '/assets/js/mobile-menu.js',
    '/assets/js/scroll-indicator.js',
    '/assets/js/header-scroll.js',
    '/assets/js/image-loader.js',
    '/assets/js/toast-notifications.js',
    '/assets/js/tooltips.js'
];

// Patrones de imágenes optimizadas
const IMAGE_PATTERNS = [
    /\/optimized\/.*\.webp$/,
    /\/screenshots\/.*\.(png|jpg|jpeg)$/
];

self.addEventListener('install', event => {
    console.log('🔧 Service Worker instalando...');
    
    event.waitUntil(
        Promise.all([
            // Cache crítico
            caches.open(CRITICAL_CACHE).then(cache => {
                console.log('📦 Cacheando assets críticos');
                return cache.addAll(CRITICAL_ASSETS);
            }),
            
            // Cache estático
            caches.open(STATIC_CACHE).then(cache => {
                console.log('📦 Cacheando assets estáticos');
                return cache.addAll(STATIC_ASSETS);
            })
        ]).then(() => {
            console.log('✅ Service Worker instalado exitosamente');
            // Activar inmediatamente sin esperar
            return self.skipWaiting();
        })
    );
});

self.addEventListener('activate', event => {
    console.log('🎯 Service Worker activando...');
    
    event.waitUntil(
        Promise.all([
            // Limpiar caches antiguos
            cleanupOldCaches(),
            // Tomar control inmediato
            self.clients.claim()
        ]).then(() => {
            console.log('✅ Service Worker activado y en control');
        })
    );
});

self.addEventListener('fetch', event => {
    const request = event.request;
    const url = new URL(request.url);
    
    // Solo interceptar requests GET
    if (request.method !== 'GET') return;
    
    // Estrategia según tipo de recurso
    if (isCriticalAsset(url.pathname)) {
        event.respondWith(cacheFirstStrategy(request, CRITICAL_CACHE));
    } else if (isStaticAsset(url.pathname)) {
        event.respondWith(cacheFirstStrategy(request, STATIC_CACHE));
    } else if (isImageAsset(url.pathname)) {
        event.respondWith(imageStrategy(request));
    } else if (isHTMLRequest(request)) {
        event.respondWith(networkFirstStrategy(request, CRITICAL_CACHE));
    } else {
        // Estrategia por defecto: network first con fallback
        event.respondWith(networkFirstStrategy(request, CACHE_NAME));
    }
});

// ===== ESTRATEGIAS DE CACHING =====

async function cacheFirstStrategy(request, cacheName) {
    try {
        const cache = await caches.open(cacheName);
        const cachedResponse = await cache.match(request);
        
        if (cachedResponse) {
            console.log(`📦 Cache hit: ${request.url}`);
            
            // Actualizar en background si el recurso es viejo
            if (isStale(cachedResponse)) {
                updateInBackground(request, cache);
            }
            
            return cachedResponse;
        }
        
        // No está en cache, buscar en red
        console.log(`🌐 Cache miss, fetching: ${request.url}`);
        const networkResponse = await fetch(request);
        
        if (networkResponse.ok) {
            await cache.put(request, networkResponse.clone());
        }
        
        return networkResponse;
        
    } catch (error) {
        console.log(`❌ Error en cache-first: ${error.message}`);
        return new Response('Recurso no disponible offline', { status: 503 });
    }
}

async function networkFirstStrategy(request, cacheName) {
    try {
        const cache = await caches.open(cacheName);
        
        // Intentar red primero
        const networkResponse = await fetch(request);
        
        if (networkResponse.ok) {
            console.log(`🌐 Network success: ${request.url}`);
            await cache.put(request, networkResponse.clone());
            return networkResponse;
        }
        
        throw new Error('Network response not ok');
        
    } catch (error) {
        console.log(`🌐 Network failed, trying cache: ${request.url}`);
        
        const cache = await caches.open(cacheName);
        const cachedResponse = await cache.match(request);
        
        if (cachedResponse) {
            console.log(`📦 Fallback cache hit: ${request.url}`);
            return cachedResponse;
        }
        
        console.log(`❌ Total miss: ${request.url}`);
        return new Response('Recurso no disponible', { status: 503 });
    }
}

async function imageStrategy(request) {
    try {
        const cache = await caches.open(IMAGES_CACHE);
        const cachedResponse = await cache.match(request);
        
        if (cachedResponse) {
            console.log(`🖼️ Image cache hit: ${request.url}`);
            return cachedResponse;
        }
        
        // Fetch con timeout para imágenes
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 5000);
        
        const networkResponse = await fetch(request, {
            signal: controller.signal
        });
        
        clearTimeout(timeoutId);
        
        if (networkResponse.ok) {
            console.log(`🖼️ Image fetched: ${request.url}`);
            await cache.put(request, networkResponse.clone());
            return networkResponse;
        }
        
        throw new Error('Image fetch failed');
        
    } catch (error) {
        console.log(`❌ Image error: ${error.message}`);
        // Retornar placeholder o imagen por defecto
        return generatePlaceholderImage();
    }
}

// ===== FUNCIONES DE UTILIDAD =====

function isCriticalAsset(pathname) {
    return CRITICAL_ASSETS.some(asset => 
        pathname === asset || pathname.endsWith(asset)
    );
}

function isStaticAsset(pathname) {
    return STATIC_ASSETS.some(asset => 
        pathname.endsWith(asset)
    ) || pathname.match(/\.(js|css)$/);
}

function isImageAsset(pathname) {
    return IMAGE_PATTERNS.some(pattern => pattern.test(pathname)) ||
           pathname.match(/\.(png|jpg|jpeg|webp|gif|svg)$/);
}

function isHTMLRequest(request) {
    return request.headers.get('accept')?.includes('text/html');
}

function isStale(response) {
    const cacheDate = new Date(response.headers.get('date'));
    const now = new Date();
    const maxAge = 60 * 60 * 1000; // 1 hora
    
    return (now - cacheDate) > maxAge;
}

async function updateInBackground(request, cache) {
    try {
        console.log(`🔄 Updating in background: ${request.url}`);
        const response = await fetch(request);
        if (response.ok) {
            await cache.put(request, response);
        }
    } catch (error) {
        console.log(`⚠️ Background update failed: ${error.message}`);
    }
}

async function cleanupOldCaches() {
    const cacheNames = await caches.keys();
    const currentCaches = [CACHE_NAME, CRITICAL_CACHE, IMAGES_CACHE, STATIC_CACHE];
    
    return Promise.all(
        cacheNames.map(cacheName => {
            if (!currentCaches.includes(cacheName)) {
                console.log(`🗑️ Eliminando cache antiguo: ${cacheName}`);
                return caches.delete(cacheName);
            }
        })
    );
}

function generatePlaceholderImage() {
    // SVG placeholder simple
    const svg = `<svg width="400" height="300" xmlns="http://www.w3.org/2000/svg">
        <rect width="100%" height="100%" fill="#f3f4f6"/>
        <text x="50%" y="50%" text-anchor="middle" dy=".3em" fill="#6b7280">
            Imagen no disponible
        </text>
    </svg>`;
    
    return new Response(svg, {
        headers: {
            'Content-Type': 'image/svg+xml',
            'Cache-Control': 'no-cache'
        }
    });
}

// ===== ANALYTICS Y MONITORING =====

self.addEventListener('message', event => {
    if (event.data && event.data.type) {
        switch (event.data.type) {
            case 'GET_CACHE_STATS':
                getCacheStats().then(stats => {
                    event.ports[0].postMessage(stats);
                });
                break;
                
            case 'CLEAR_CACHE':
                clearAllCaches().then(() => {
                    event.ports[0].postMessage({ success: true });
                });
                break;
                
            case 'PREFETCH_CRITICAL':
                prefetchCriticalResources();
                break;
        }
    }
});

async function getCacheStats() {
    const stats = {};
    const cacheNames = [CRITICAL_CACHE, STATIC_CACHE, IMAGES_CACHE];
    
    for (const cacheName of cacheNames) {
        try {
            const cache = await caches.open(cacheName);
            const keys = await cache.keys();
            stats[cacheName] = keys.length;
        } catch (error) {
            stats[cacheName] = 0;
        }
    }
    
    return stats;
}

async function clearAllCaches() {
    const cacheNames = await caches.keys();
    return Promise.all(cacheNames.map(name => caches.delete(name)));
}

async function prefetchCriticalResources() {
    console.log('🚀 Prefetching critical resources...');
    
    const criticalImages = [
        '/optimized/temper-studio.webp',
        '/optimized/seated-nyc.webp',
        '/optimized/www-make-ready-co.webp'
    ];
    
    const cache = await caches.open(IMAGES_CACHE);
    
    return Promise.all(
        criticalImages.map(async (url) => {
            try {
                const response = await fetch(url);
                if (response.ok) {
                    await cache.put(url, response);
                    console.log(`✅ Prefetched: ${url}`);
                }
            } catch (error) {
                console.log(`❌ Prefetch failed: ${url}`);
            }
        })
    );
}

console.log('🚀 Service Worker script cargado');