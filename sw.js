const CACHE_NAME = 'mythic-plus-v3';
const assetsToCache = [
    './index.html',
    './manifest.json',
    './sw.js'
];

// Instalación del Service Worker y almacenamiento en caché preliminar
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                console.log('Banda, instalando nuevo caché para Midnight...');
                return cache.addAll(assetsToCache);
            })
    );
    self.skipWaiting();
});

// Activación: Limpieza total de versiones viejas de caché para que no se queden atascados los diseños pasados
self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    if (cacheName !== CACHE_NAME) {
                        console.log('Borrando caché obsoleto:', cacheName);
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
    self.clients.claim();
});

// Intercepción de solicitudes: Estrategia Network-First para la interfaz principal
self.addEventListener('fetch', event => {
    // Si es una navegación (abrir la app o recargar index.html), buscamos primero en la red
    if (event.request.mode === 'navigate') {
        event.respondWith(
            fetch(event.request)
                .then(networkResponse => {
                    return caches.open(CACHE_NAME).then(cache => {
                        cache.put(event.request, networkResponse.clone());
                        return networkResponse;
                    });
                })
                .catch(() => {
                    // Si andamos offline en la arena, tiramos del caché local
                    return caches.match('./index.html');
                })
        );
        return;
    }

    // Para imágenes, fuentes y scripts externos: Cache-First con actualización en segundo plano
    event.respondWith(
        caches.match(event.request)
            .then(cachedResponse => {
                if (cachedResponse) {
                    return cachedResponse;
                }
                return fetch(event.request).then(networkResponse => {
                    return caches.open(CACHE_NAME).then(cache => {
                        cache.put(event.request, networkResponse.clone());
                        return networkResponse;
                    });
                });
            })
    );
});
