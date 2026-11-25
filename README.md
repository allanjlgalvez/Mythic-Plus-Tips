# Mythic-Plus-Tips
Mythic plus dungeon helper with matrix approach 

## Desarrollo

La app no depende de CDNs: Tailwind, Chart.js, Font Awesome y las fuentes viven en `css/` y `vendor/`, y el service worker (`sw.js`) los precachea para que funcione offline.

Requisitos: Node 22 y Python 3 (`pip install -r tools/requirements.txt`).

Después de cambiar `index.html`, los datos o las imágenes:

```bash
npm install
npm run build
npm run check
```

- `npm run build`: genera el subconjunto de íconos de Font Awesome (`build:icons`), compila Tailwind (`build:css`) y regenera `PRECACHE_ASSETS` y `CACHE_NAME` en `sw.js` (`build:sw`). No hay que editarlos a mano.
- `npm run check`: valida los datos (`validate`) y abre la app en Chromium para recorrer las 8 guías, la matriz, el analizador y la gráfica (`test`).

GitHub Actions corre lo mismo en cada push y pull request (`.github/workflows/ci.yml`), y falla si falta hacer commit de algún archivo generado.

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

También sincroniza `data/classes.json`. Rellena `name`, `icon` y `officialDesc` de cada `spellId`, el `name` de cada `npcId`, y descarga los íconos a `images/spells/`. Si Wowhead aún no tradujo una descripción, la omite y lo avisa. Con `-- --check` solo informa diferencias.

### Matriz, analizador y rutas

- La **Matriz de Contramedidas** se genera sola: cada habilidad con etiqueta `interrumpir`, `aturdir`, `disipar-*`, `calmar` o `purgar` aparece como fila, con las clases que la pueden resolver.
- El **Analizador de grupo** cruza esas mismas etiquetas con `data/classes.json` (qué habilidad de cada clase resuelve cada etiqueta y en qué rol) y avisa qué mecánicas de cada mazmorra no cubre el grupo.
- Cada mazmorra tiene una **ruta** (`route`): una lista de pasos en orden.

## App Android (Google Play)

El proyecto Android está en `android/` (TWA generada con Bubblewrap, destino Android 16 / API 36). Los pasos para publicar y actualizar están en [`docs/PUBLICAR-ANDROID.md`](docs/PUBLICAR-ANDROID.md). La llave de firma **nunca** se sube al repositorio.

## Navegación

Cada pantalla tiene su dirección, así el botón "Atrás" de Android funciona y se pueden compartir enlaces:

- Pestañas: `#tab-dungeons`, `#tab-overview`, `#tab-matrix`, `#tab-analyzer`, `#tab-calculator`
- Guía de una mazmorra: `#mazmorra-<id>` (por ejemplo `#mazmorra-voidscar-arena`)
