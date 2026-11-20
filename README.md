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

## Datos de mazmorras

El contenido (mazmorras, jefes, trash y la matriz de contramedidas) está en `data/dungeons.json`. La cuadrícula, el detalle, la gráfica de cronómetros y la calculadora se generan desde ahí: para agregar una mazmorra basta con añadirla al JSON y poner su imagen en `images/<id>.webp` (1141×372). Recuerda subir `CACHE_NAME` en `sw.js` al cambiar el JSON.
