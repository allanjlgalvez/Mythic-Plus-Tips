# Recursos para la ficha de Google Play

Play Console → **Crecimiento → Presencia en Play Store → Ficha de Play Store principal → Recursos visuales**.

| Campo de Play Console | Archivos de esta carpeta | Tamaño |
|---|---|---|
| **Ícono de la app** * | `0-comunes/icono-512.png` | 512×512 |
| **Gráfico de funciones** * | `0-comunes/grafico-destacado-1024x500.png` | 1024×500 |
| **Capturas de pantalla de teléfono** * | Las 6 de `1-telefono/` (en orden) | 1080×1920 (9:16) |
| **Tablet de 7 pulgadas** * | Las 4 de `2-tablet-7/` | 1080×1920 (9:16) |
| **Tablet de 10 pulgadas** * | Las 4 de `3-tablet-10/` | 2560×1440 (16:9) |
| Dispositivos plegables (opcional) | Las 3 de `4-plegable/`: desplegado 1:1, desplegado 4:3 y plegado 10:16 | 1800×1800, 2048×1536, 1200×1920 |
| Computadoras (opcional) | Las 4 de `5-escritorio/` | 1920×1080 (16:9) |
| Video (opcional) | Déjalo vacío | — |
| Android XR (opcional) | Déjalo vacío: la app no está hecha para XR | — |

Todos los archivos son PNG, cumplen la proporción y los límites de tamaño de Google, y pesan menos de 3 MB cada uno.
Las 6 capturas de teléfono superan 1080 px por lado, así que la app también puede aparecer en promociones de Google Play.

Para regenerarlas después de cambiar la app: `node tools/play-store-capturas.js` con un servidor local en el puerto 8766 (ver el comentario al inicio del script).
