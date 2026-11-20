#!/usr/bin/env node
// Regenera en sw.js la lista PRECACHE_ASSETS y el nombre de la caché.
// El nombre incluye un hash del contenido: si cualquier archivo cambia,
// el service worker cambia y los usuarios reciben la nueva versión.
//
// Uso: npm run build:sw

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const ROOT = path.join(__dirname, '..');
const SW_FILE = path.join(ROOT, 'sw.js');

// Carpetas y archivos que la app necesita sin conexión.
const INCLUDE = ['index.html', 'privacidad.html', 'manifest.json', 'css', 'data', 'vendor', 'images'];
// Archivos que existen en el repo pero la app no usa.
const EXCLUDE = [/^images\/icon-\d+\.png$/, /LICENSE/i, /\.map$/];

function walk(rel) {
    const abs = path.join(ROOT, rel);
    if (!fs.existsSync(abs)) return [];
    if (fs.statSync(abs).isFile()) return [rel];
    return fs.readdirSync(abs).sort().flatMap(name => walk(path.posix.join(rel, name)));
}

const files = INCLUDE.flatMap(walk).filter(f => !EXCLUDE.some(rx => rx.test(f)));

const hash = crypto.createHash('sha256');
for (const f of files) hash.update(f).update(fs.readFileSync(path.join(ROOT, f)));
const version = hash.digest('hex').slice(0, 10);

const list = ["    './',", ...files.map(f => `    './${f}',`)].join('\n');

let sw = fs.readFileSync(SW_FILE, 'utf8');
sw = sw.replace(/const CACHE_NAME = '[^']*';/, `const CACHE_NAME = 'mythic-plus-${version}';`);
sw = sw.replace(/const PRECACHE_ASSETS = \[[\s\S]*?\n\];/, `const PRECACHE_ASSETS = [\n${list}\n];`);
fs.writeFileSync(SW_FILE, sw);

console.log(`sw.js: ${files.length + 1} recursos, caché mythic-plus-${version}`);
