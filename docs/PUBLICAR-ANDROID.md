# Publicar Guía Mítica Plus en Google Play

La app es una PWA empaquetada como **TWA** (Trusted Web Activity): una app Android que abre el sitio de GitHub Pages en pantalla completa. El proyecto Android vive en `android/` y se genera con [Bubblewrap](https://github.com/GoogleChromeLabs/bubblewrap), la herramienta oficial de Google para TWA.

## Estado

| Paso | Estado |
|---|---|
| App web lista para producción: sin conexión, navegación con "Atrás", accesibilidad, política de privacidad | ✅ |
| Proyecto Android (`android/`), destino Android 16 (API 36) | ✅ |
| Llave de subida y paquete firmado (`.aab` + `.apk`) | ✅ (archivos entregados por separado, no están en el repo) |
| `assetlinks.json` con la huella de la llave de subida | ✅ en `allanjlgalvez.github.io` |
| Cuenta de Play Console | ⏳ Tú |
| Agregar la huella de **firma de apps de Google Play** a `assetlinks.json` | ⏳ después de subir el `.aab` |
| Prueba cerrada (12 testers, 14 días) y envío a producción | ⏳ Tú |

---

## 1. Guarda la llave de subida (importantísimo)

Recibiste dos archivos que **no** están en GitHub:

- `guia-mitica-plus-upload.keystore`: la llave de subida.
- `guia-mitica-plus-upload-clave.txt`: su contraseña.

Guárdalos en **dos lugares seguros** (por ejemplo Google Drive y una memoria USB). Los necesitas para subir cada actualización. Si los pierdes, Google permite restablecer la llave de subida desde Play Console, pero toma días. **Nunca los subas a GitHub ni los compartas.**

## 2. Crea la app en Play Console

1. Crea tu cuenta de desarrollador en <https://play.google.com/console> (pago único de 25 USD y verificación de identidad).
2. **Crear app**:
   - Nombre: `Guía Mítica Plus`
   - Idioma predeterminado: **Español (Latinoamérica) – es-419**
   - App o juego: **App**
   - Gratis o pagada: **Gratis**
3. Acepta las declaraciones y crea la app.

## 3. Sube el paquete a prueba cerrada

1. **Probar y publicar → Pruebas → Prueba cerrada → Crear pista** (o usa la pista "Alpha").
2. **Testers:** crea una lista de correos con al menos **12 personas** (tu grupo de M+ sirve). Deben aceptar la invitación con el enlace que da Play Console.
3. **Crear versión** → acepta **Firma de apps de Google Play** → sube `guia-mitica-plus-1.0.0.aab`.
4. Notas de la versión (es-419): `Primera versión: guías de las 8 mazmorras de la Temporada 2, matriz de contramedidas y analizador de grupo.`
5. Las cuentas personales nuevas deben mantener la prueba cerrada **14 días seguidos con 12 testers** antes de pedir acceso a producción.

## 4. Agrega la huella de Google Play a `assetlinks.json`

Con la firma de apps de Google Play, Google vuelve a firmar la app con **su** llave. Si su huella no está en `assetlinks.json`, la app descargada de la tienda muestra una barra de dirección arriba, y eso es motivo frecuente de rechazo.

1. Play Console → tu app → **Configuración → Integridad de la app → Firma de apps**.
2. Copia la **huella digital del certificado SHA-256** de "Certificado de la clave de firma de apps".
3. Pásasela a Claude (no es secreta) o agrégala tú en `allanjlgalvez.github.io/.well-known/assetlinks.json`, dentro de `sha256_cert_fingerprints`, junto a la que ya está.
4. Comprueba que quedó bien en <https://developers.google.com/digital-asset-links/tools/generator> con el dominio `allanjlgalvez.github.io` y el paquete `io.github.allanjlgalvez.guiamiticaplus`.

## 5. Ficha de Play Store

**Nombre (máx. 30):** `Guía Mítica Plus`

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
• Analizador de grupo: elige las clases de tu grupo y descubre qué mecánicas no pueden cubrir. Tu grupo se recuerda para la próxima vez.
• Comparte la guía de una mazmorra con tu grupo en un toque.
• Calculadora de tiempos para +2 y +3.
• Funciona sin conexión.

Nombres y descripciones de habilidades verificados en Wowhead.

Guía de fans no oficial. Esta app no está afiliada a Blizzard Entertainment ni respaldada por ella. World of Warcraft es una marca de Blizzard Entertainment, Inc.
```

**Recursos gráficos (carpeta `store/`):**

| Play Console pide | Archivo |
|---|---|
| Ícono de la app (512×512) | `store/icono-512.png` |
| Gráfico destacado (1024×500) | `store/grafico-destacado.png` |
| Capturas de teléfono (2–8) | `store/telefono-1-mazmorras.png` … `store/telefono-5-analizador.png` |

## 6. Formularios de "Contenido de la app"

Play Console → **Política → Contenido de la app**. Respuestas para esta app:

| Formulario | Respuesta |
|---|---|
| Política de privacidad | `https://allanjlgalvez.github.io/Mythic-Plus-Tips/privacidad.html` |
| Acceso a la app | Toda la funcionalidad está disponible sin restricciones (no hay inicio de sesión) |
| Anuncios | No, la app no contiene anuncios |
| Clasificación de contenido | Categoría "Referencia, noticias o educación"; responde **No** a violencia, sexo, lenguaje, drogas, apuestas e interacción entre usuarios |
| Público objetivo | 13 años o más; la app no está dirigida a niños |
| Seguridad de los datos | La app **no recopila ni comparte** datos de usuarios. El grupo del analizador se guarda solo en el dispositivo y no se envía a ningún lado |
| App de noticias / gobierno / salud / finanzas | No |
| Categoría de la tienda | Libros y obras de consulta |
| Datos de contacto | Un correo de contacto (obligatorio; Play lo muestra en la ficha) |

## 7. Publicar una actualización

1. Cambia la app web, haz merge en `main` y espera a que GitHub Pages la publique. **La mayoría de los cambios (guías, datos, diseño) llegan a la app sin publicar una versión nueva**, porque la app carga el sitio.
2. Solo hace falta un `.aab` nuevo si cambias el nombre, el ícono, los colores, los accesos directos o el destino de API:
   1. En `android/twa-manifest.json` sube `appVersionCode` (2, 3, …) y `appVersionName`.
   2. Desde `android/`: `bubblewrap update` y luego `bubblewrap build` (pide la contraseña de la llave).
   3. Sube el nuevo `app-release-bundle.aab` a Play Console.

## Riesgos conocidos

- **Propiedad intelectual:** la app usa nombres, íconos e imágenes de World of Warcraft. El aviso de "guía de fans no oficial" ayuda, pero Google puede rechazarla. Si pasa, la `.apk` firmada se puede compartir e instalar directamente.
- **"Funcionalidad limitada":** Google rechaza apps que solo envuelven un sitio. Esta app funciona sin conexión, recuerda tu grupo, comparte guías, tiene accesos directos en el ícono y navegación nativa con el botón "Atrás". Menciónalo si un revisor lo cuestiona.
