# Mythic-Plus-Tips
Mythic plus dungeon helper with matrix approach 

## Desarrollo

La app no depende de CDNs: Tailwind, Chart.js, Font Awesome y las fuentes viven en `css/` y `vendor/`, y el service worker (`sw.js`) los precachea para que funcione offline.

Después de cambiar `index.html`, los datos o las imágenes, regenera el CSS y la lista de precarga del service worker:

```bash
npm install
npm run build
```

`npm run build` compila Tailwind (`build:css`) y regenera `PRECACHE_ASSETS` y `CACHE_NAME` en `sw.js` (`build:sw`); no hay que editarlos a mano.

## Datos de mazmorras

El contenido (mazmorras, jefes, trash y la matriz de contramedidas) está en `data/dungeons.json`. La cuadrícula, el detalle, la gráfica de cronómetros y la calculadora se generan desde ahí: para agregar una mazmorra basta con añadirla al JSON y poner su imagen en `images/<id>.webp` (1141×372). Después corre `npm run build`.

### Formato de guía (estilo Method)

Una mazmorra usa la vista de guía cuando sus jefes tienen `abilities`. Cada habilidad lleva el `spellId` de Wowhead, etiquetas y una nota táctica:

```json
{ "spellId": 1239821, "tags": ["interrumpir", "golpe-tanque"], "note": "Interrumpir cada uno." }
```

Etiquetas disponibles: `interrumpir`, `aturdir`, `golpe-tanque`, `frontal`, `area`, `esquivar`, `soak`, `fijar`, `adds`, `prioridad`, `mover`, `disipar-magia`, `disipar-veneno`, `disipar-maldicion`, `disipar-enfermedad`, `calmar`, `purgar`, `info`.

Los nombres oficiales en español (es-MX), las descripciones y los íconos se obtienen de Wowhead:

```bash
npm run sync:wowhead
```

Rellena `name`, `icon` y `officialDesc` de cada `spellId`, el `name` de cada `npcId`, y descarga los íconos a `images/spells/`. Si Wowhead aún no tradujo una descripción, la omite y lo avisa. Con `-- --check` solo informa diferencias.
