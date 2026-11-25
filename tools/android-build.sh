#!/usr/bin/env bash
# Compila y firma la app Android (TWA) para Google Play.
#
# Uso:
#   ANDROID_HOME=/ruta/al/android-sdk \
#   KEYSTORE=/ruta/guia-mitica-plus-upload.keystore \
#   KEYSTORE_PASSWORD='la-contraseña' \
#   tools/android-build.sh
#
# Resultado en android/dist/:
#   guia-mitica-plus-<versión>.aab   -> se sube a Google Play
#   guia-mitica-plus-<versión>.apk   -> para instalar y probar en un teléfono
#
# Requisitos: JDK 17 o superior y Android SDK con "platforms;android-36" y "build-tools;36.0.0".
set -euo pipefail

: "${ANDROID_HOME:?Define ANDROID_HOME con la ruta del Android SDK}"
: "${KEYSTORE:?Define KEYSTORE con la ruta de la llave de subida}"
: "${KEYSTORE_PASSWORD:?Define KEYSTORE_PASSWORD}"
ALIAS="${KEY_ALIAS:-upload}"

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT/android"

VERSION=$(node -p "require('./twa-manifest.json').appVersionName")
BUILD_TOOLS="$ANDROID_HOME/build-tools/$(ls "$ANDROID_HOME/build-tools" | sort -V | tail -1)"

# La plantilla de Bubblewrap aún apunta a JCenter, que ya no existe.
sed -i 's/jcenter()/mavenCentral()/' build.gradle
echo "sdk.dir=$ANDROID_HOME" > local.properties

./gradlew --no-daemon --console=plain bundleRelease assembleRelease

mkdir -p dist
AAB="dist/guia-mitica-plus-$VERSION.aab"
APK="dist/guia-mitica-plus-$VERSION.apk"

cp app/build/outputs/bundle/release/app-release.aab "$AAB"
jarsigner -keystore "$KEYSTORE" -storepass "$KEYSTORE_PASSWORD" -keypass "$KEYSTORE_PASSWORD" "$AAB" "$ALIAS" >/dev/null

"$BUILD_TOOLS/zipalign" -f -p 4 app/build/outputs/apk/release/app-release-unsigned.apk dist/aligned.apk
"$BUILD_TOOLS/apksigner" sign --ks "$KEYSTORE" --ks-key-alias "$ALIAS" \
    --ks-pass "pass:$KEYSTORE_PASSWORD" --key-pass "pass:$KEYSTORE_PASSWORD" --out "$APK" dist/aligned.apk
rm -f dist/aligned.apk "$APK.idsig"

"$BUILD_TOOLS/apksigner" verify "$APK"
jarsigner -verify "$AAB" >/dev/null
echo "Listo:"
ls -lh "$AAB" "$APK"
