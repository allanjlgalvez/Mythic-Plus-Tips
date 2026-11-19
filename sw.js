// Sube la versión cada vez que cambien los archivos precacheados.
const CACHE_NAME = 'mythic-plus-v5';

// Todo lo que la app necesita para funcionar sin conexión.
const PRECACHE_ASSETS = [
    './',
    './index.html',
    './manifest.json',
    './data/dungeons.json',
    './css/tailwind.css',
    './vendor/chart.umd.min.js',
    './vendor/fontawesome/css/all.min.css',
    './vendor/fontawesome/webfonts/fa-brands-400.woff2',
    './vendor/fontawesome/webfonts/fa-regular-400.woff2',
    './vendor/fontawesome/webfonts/fa-solid-900.woff2',
    './vendor/fontawesome/webfonts/fa-v4compatibility.woff2',
    './vendor/fonts/fonts.css',
    './vendor/fonts/cinzel-latin-600-normal.woff2',
    './vendor/fonts/cinzel-latin-700-normal.woff2',
    './vendor/fonts/cinzel-latin-800-normal.woff2',
    './vendor/fonts/inter-latin-300-normal.woff2',
    './vendor/fonts/inter-latin-400-normal.woff2',
    './vendor/fonts/inter-latin-500-normal.woff2',
    './vendor/fonts/inter-latin-600-normal.woff2',
    './vendor/fonts/inter-latin-700-normal.woff2',
    './images/altar-of-fangs.webp',
    './images/den-of-nalorakk.webp',
    './images/kings-rest.webp',
    './images/murder-row.webp',
    './images/ruby-life-pools.webp',
    './images/temple-of-sethraliss.webp',
    './images/the-blinding-vale.webp',
    './images/voidscar-arena.webp',
    './images/launchericon-144x144.png',
    './images/launchericon-192x192.png',
    './images/launchericon-48x48.png',
    './images/launchericon-512x512.png',
    './images/launchericon-72x72.png',
    './images/launchericon-96x96.png',
];

self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME).then(cache => cache.addAll(PRECACHE_ASSETS))
    );
    self.skipWaiting();
});

// Borra cachés de versiones anteriores para que no se queden diseños viejos.
self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys()
            .then(names => Promise.all(
                names.filter(n => n !== CACHE_NAME).map(n => caches.delete(n))
            ))
            .then(() => self.clients.claim())
    );
});

function putInCache(request, response) {
    if (response && response.ok && response.type === 'basic') {
        const copy = response.clone();
        caches.open(CACHE_NAME).then(cache => cache.put(request, copy));
    }
    return response;
}

self.addEventListener('fetch', event => {
    const { request } = event;
    if (request.method !== 'GET') return;

    // Navegación (abrir la app / recargar): red primero, caché si estás offline.
    if (request.mode === 'navigate') {
        event.respondWith(
            fetch(request)
                .then(response => putInCache(request, response))
                .catch(() => caches.match(request, { ignoreSearch: true })
                    .then(cached => cached || caches.match('./index.html')))
        );
        return;
    }

    // Solo manejamos recursos propios; lo externo (enlaces a Wowhead, etc.) pasa directo.
    if (new URL(request.url).origin !== self.location.origin) return;

    // Recursos estáticos: caché primero y se actualiza en segundo plano.
    event.respondWith(
        caches.match(request).then(cached => {
            const network = fetch(request)
                .then(response => putInCache(request, response))
                .catch(() => cached);
            return cached || network;
        })
    );
});
