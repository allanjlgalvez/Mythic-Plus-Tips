# Publicar Guía Mítica Plus en Google Play

La app es una PWA. Para Android se empaqueta como **TWA** (Trusted Web Activity): una app que abre tu sitio de GitHub Pages en pantalla completa, sin barra de navegador.

## Resumen

| Paso | Quién | Estado |
|---|---|---|
| 1. Manifest, íconos, capturas y política de privacidad | Claude | ✅ Hecho |
| 2. Crear el repo `allanjlgalvez.github.io` | Tú | ⏳ |
| 3. Generar el paquete Android con PWABuilder | Tú (te guío) | ⏳ |
| 4. Publicar `assetlinks.json` en el repo raíz | Claude | ⏳ (necesita los pasos 2 y 3) |
| 5. Cuenta de Google Play Console y prueba cerrada | Tú | ⏳ |
| 6. Ficha de la tienda y envío a revisión | Tú (textos listos abajo) | ⏳ |

---

## Paso 2: crear el repo `allanjlgalvez.github.io`

Android solo confía en una app web si el dominio publica un archivo `/.well-known/assetlinks.json` **en la raíz**. Tu app vive en `allanjlgalvez.github.io/Mythic-Plus-Tips/`, así que la raíz necesita su propio repo.

1. Entra a <https://github.com/new>.
2. **Repository name:** `allanjlgalvez.github.io` (exactamente así).
3. Déjalo **Public** y marca **Add a README file**.
4. Presiona **Create repository**.
5. Dile a Claude que ya está creado para que lo conecte y suba el archivo.

## Paso 3: generar el paquete Android con PWABuilder

1. Entra a <https://www.pwabuilder.com>.
2. Pega `https://allanjlgalvez.github.io/Mythic-Plus-Tips/` y presiona **Start**.
3. Cuando termine el análisis, presiona **Package For Stores** → **Android** → **Generate Package**.
4. En las opciones, revisa:
   - **Package ID:** `io.github.allanjlgalvez.guiamiticaplus`. No se puede cambiar después de publicar.
   - **App name:** `Guía Mítica Plus`.
   - **Short name:** `Guía Mítica+`.
   - **Signing key:** deja **Create new**.
5. Presiona **Download**. Obtienes un `.zip` con:
   - `*.aab`: el archivo que se sube a Google Play.
   - `*.apk`: para instalarla en tu teléfono y probarla.
   - `signing.keystore` y `signing-key-info.txt`: **tu llave de firma**.
   - `assetlinks.json`: el archivo del paso 4.

> ⚠️ **Guarda `signing.keystore` y `signing-key-info.txt` en un lugar seguro** (por ejemplo Google Drive y una memoria USB). Sin ellos no podrás publicar actualizaciones de la app. **No los subas a GitHub.**

6. Comparte con Claude **solo el contenido de `assetlinks.json`**. No contiene secretos: es la huella pública de tu llave.

## Paso 4: publicar `assetlinks.json`

Claude lo sube a `allanjlgalvez.github.io/.well-known/assetlinks.json`, junto con un archivo `.nojekyll` para que GitHub Pages no oculte la carpeta `.well-known`.

Después de que Google Play firme la app (paso 5), Play Console te da **una segunda huella SHA-256**: *Configuración → Integridad de la app → Firma de apps*. Hay que agregarla al mismo `assetlinks.json`. Si no se agrega, la app de la tienda mostrará la barra del navegador.

## Paso 5: Google Play Console

1. Crea la cuenta en <https://play.google.com/console> (pago único de 25 USD y verificación de identidad).
2. **Crear app** → nombre `Guía Mítica Plus`, idioma predeterminado **Español (Latinoamérica)**, tipo **App**, **Gratis**.
3. Las cuentas personales nuevas deben hacer una **prueba cerrada con al menos 12 testers durante 14 días** antes de publicar en producción. Invita a tu grupo de M+.
4. Sube el `.aab` en **Pruebas → Prueba cerrada**.

## Paso 6: ficha de la tienda (textos listos)

**Nombre (máx. 30):**
```
Guía Mítica Plus
```

**Descripción corta (máx. 80):**
```
Guías de mazmorras M+ en español: jefes, interrupciones, disipaciones y rutas.
```

**Descripción completa:**
```
Guía Mítica Plus es una guía en español para las mazmorras Míticas+ de World of Warcraft: Midnight, Temporada 2.

• Guía de cada mazmorra: jefes, habilidades con su nombre oficial en español, táctica y consejos para tanque, sanador y DPS.
• Trash importante: qué interrumpir, qué disipar y qué matar primero.
• Ruta recomendada para cada mazmorra.
• Matriz de contramedidas: todas las mecánicas que se interrumpen, disipan, calman o purgan, con las habilidades de cada clase que las resuelven.
• Analizador de grupo: elige las clases de tu grupo y descubre qué mecánicas no pueden cubrir.
• Calculadora de tiempos para +2 y +3.
• Funciona sin conexión.

Nombres y descripciones de habilidades verificados en Wowhead.

Guía de fans no oficial. Esta app no está afiliada a Blizzard Entertainment ni respaldada por ella. World of Warcraft es una marca de Blizzard Entertainment, Inc.
```

**Recursos gráficos (en la carpeta `store/`):**

| Play Console pide | Archivo |
|---|---|
| Ícono de la app (512×512) | `store/icono-512.png` |
| Gráfico destacado (1024×500) | `store/grafico-destacado.png` |
| Capturas de teléfono (2–8) | `store/telefono-1-mazmorras.png` … `store/telefono-5-analizador.png` |

**Otros formularios de Play Console:**
- **Política de privacidad:** `https://allanjlgalvez.github.io/Mythic-Plus-Tips/privacidad.html`
- **Seguridad de los datos:** la app **no recopila ni comparte** datos.
- **Anuncios:** no contiene anuncios.
- **Público objetivo:** 13 años o más (contenido de un videojuego clasificado T).
- **Categoría:** Libros y obras de consulta (o Herramientas).
- **Clasificación de contenido:** responde el cuestionario; no hay violencia, compras ni interacción entre usuarios.

## Riesgo a tener en cuenta

La app usa nombres, íconos e imágenes de World of Warcraft. Google Play puede rechazarla por propiedad intelectual de terceros, aunque sea una guía de fans. El aviso de "guía de fans no oficial" en la ficha y dentro de la app ayuda, pero no lo garantiza. Si la rechazan, la APK de PWABuilder se puede seguir compartiendo e instalando directamente.
