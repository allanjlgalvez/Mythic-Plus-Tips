# Mythic-Plus-Tips
Mythic plus dungeon helper with matrix approach 

## Desarrollo

La app no depende de CDNs: Tailwind, Chart.js, Font Awesome y las fuentes viven en `css/` y `vendor/`, y el service worker (`sw.js`) los precachea para que funcione offline.

Si cambias clases de Tailwind en `index.html`, regenera el CSS:

```bash
npm install
npm run build:css
```

Si cambias o agregas archivos estáticos, añádelos a `PRECACHE_ASSETS` en `sw.js` y sube `CACHE_NAME`.
