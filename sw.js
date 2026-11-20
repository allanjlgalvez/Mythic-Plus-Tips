// CACHE_NAME y PRECACHE_ASSETS los genera tools/build-sw.js (npm run build:sw).
const CACHE_NAME = 'mythic-plus-6d54f0d0b6';

// Todo lo que la app necesita para funcionar sin conexión.
const PRECACHE_ASSETS = [
    './',
    './index.html',
    './manifest.json',
    './css/tailwind.css',
    './data/dungeons.json',
    './vendor/chart.umd.min.js',
    './vendor/fontawesome/css/all.min.css',
    './vendor/fontawesome/webfonts/fa-brands-400.woff2',
    './vendor/fontawesome/webfonts/fa-regular-400.woff2',
    './vendor/fontawesome/webfonts/fa-solid-900.woff2',
    './vendor/fontawesome/webfonts/fa-v4compatibility.woff2',
    './vendor/fonts/cinzel-latin-600-normal.woff2',
    './vendor/fonts/cinzel-latin-700-normal.woff2',
    './vendor/fonts/cinzel-latin-800-normal.woff2',
    './vendor/fonts/fonts.css',
    './vendor/fonts/inter-latin-300-normal.woff2',
    './vendor/fonts/inter-latin-400-normal.woff2',
    './vendor/fonts/inter-latin-500-normal.woff2',
    './vendor/fonts/inter-latin-600-normal.woff2',
    './vendor/fonts/inter-latin-700-normal.woff2',
    './images/altar-of-fangs.webp',
    './images/den-of-nalorakk.webp',
    './images/kings-rest.webp',
    './images/launchericon-144x144.png',
    './images/launchericon-192x192.png',
    './images/launchericon-48x48.png',
    './images/launchericon-512x512.png',
    './images/launchericon-72x72.png',
    './images/launchericon-96x96.png',
    './images/murder-row.webp',
    './images/ruby-life-pools.webp',
    './images/spells/ability_creature_poison_01.jpg',
    './images/spells/ability_creature_poison_03.jpg',
    './images/spells/ability_creature_poison_05.jpg',
    './images/spells/ability_fixated_state_red.jpg',
    './images/spells/ability_mount_voidelfstridermount.jpg',
    './images/spells/ability_paladin_infusionoflight.jpg',
    './images/spells/ability_priest_flashoflight.jpg',
    './images/spells/ability_racial_darkflight.jpg',
    './images/spells/inv_-misc_herb_marrowroot_leaf.jpg',
    './images/spells/inv_111_hunter_ability_harrierscall.jpg',
    './images/spells/inv_1205_voidforge_sovereignvoidcores_cosmicvoid.jpg',
    './images/spells/inv_ability_druid_convokethespirits.jpg',
    './images/spells/inv_ability_holyfire_buff.jpg',
    './images/spells/inv_ability_holyfire_missile.jpg',
    './images/spells/inv_ability_holyfire_orb.jpg',
    './images/spells/inv_ability_voidweaverpriest_entropicrift.jpg',
    './images/spells/inv_cosmicvoid_groundsate.jpg',
    './images/spells/inv_cosmicvoid_missile.jpg',
    './images/spells/inv_cosmicvoid_orb.jpg',
    './images/spells/inv_cosmicvoid_wave.jpg',
    './images/spells/inv_desertlasherorchid_yellow.jpg',
    './images/spells/inv_enchant_voidsphere.jpg',
    './images/spells/inv_herbalism_70_dreamleaf.jpg',
    './images/spells/inv_raptortravelform.jpg',
    './images/spells/spell_nature_corrosivebreath.jpg',
    './images/spells/spell_nature_earthquake.jpg',
    './images/spells/spell_nature_wispsplodegreen.jpg',
    './images/spells/spell_shadow_psychicscream.jpg',
    './images/spells/spell_shaman_earthquake.jpg',
    './images/temple-of-sethraliss.webp',
    './images/the-blinding-vale.webp',
    './images/voidscar-arena.webp',
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
