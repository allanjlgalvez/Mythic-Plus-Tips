#!/usr/bin/env node
// Sincroniza data/dungeons.json y data/classes.json con Wowhead en español (es-MX).
//
// Para cada objeto con `spellId` rellena `name`, `icon` y `officialDesc`;
// para cada objeto con `npcId` rellena `name`. Descarga los íconos a
// images/spells/ para que funcionen sin conexión.
//
// Uso:
//   npm run sync:wowhead            -> actualiza el JSON y descarga íconos
//   npm run sync:wowhead -- --check -> solo informa diferencias, no escribe

const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const DATA_FILES = ['dungeons.json', 'classes.json'].map(f => path.join(ROOT, 'data', f));
const ICON_DIR = path.join(ROOT, 'images', 'spells');
const TOOLTIP = 'https://nether.wowhead.com/tooltip';
const ICON_URL = icon => `https://wow.zamimg.com/images/wow/icons/large/${icon}.jpg`;
const CHECK_ONLY = process.argv.includes('--check');

const cache = new Map();

async function tooltip(type, id, locale = 'mx') {
    const key = `${type}/${id}/${locale}`;
    if (!cache.has(key)) {
        cache.set(key, (async () => {
            const query = locale ? `?locale=${locale}` : '';
            const res = await fetch(`${TOOLTIP}/${type}/${id}${query}`);
            if (!res.ok) throw new Error(`Wowhead ${key}: HTTP ${res.status}`);
            return res.json();
        })());
    }
    return cache.get(key);
}

// Extrae la descripción del tooltip HTML y quita cifras de daño/sanación,
// que dependen del nivel de la llave y confunden más de lo que ayudan.
function cleanDescription(html) {
    const match = html.match(/<div class="q">([\s\S]*?)<\/div>/);
    if (!match) return null;
    return match[1]
        .replace(/<br\s*\/?>/gi, ' ')
        .replace(/<[^>]+>/g, '')
        .replace(/&nbsp;/g, ' ')
        // Notas condicionales de Blizzard: "[]" vacío se quita y "[texto]" pasa a "(texto)".
        .replace(/\[\]/g, ' ')
        .replace(/\[([^\]]*)\]/g, '($1)')
        // "116379 p. de daño", "387930 p de daño", "7274 de daño" -> "daño";
        // "29095 p. más de daño" -> "más daño". Los porcentajes se conservan.
        .replace(/\b\d[\d.,]*\s+(?:p\.?\s+)?(más\s+)?de\s+(daño|sanación|curación)/gi, '$1$2')
        .replace(/\s+/g, ' ')
        .trim();
}

async function downloadIcon(icon) {
    const file = path.join(ICON_DIR, `${icon}.jpg`);
    if (fs.existsSync(file)) return;
    const res = await fetch(ICON_URL(icon));
    if (!res.ok) throw new Error(`Ícono ${icon}: HTTP ${res.status}`);
    fs.writeFileSync(file, Buffer.from(await res.arrayBuffer()));
}

function collect(node, found = []) {
    if (Array.isArray(node)) node.forEach(n => collect(n, found));
    else if (node && typeof node === 'object') {
        if (node.spellId || node.npcId) found.push(node);
        Object.values(node).forEach(v => collect(v, found));
    }
    return found;
}

async function main() {
    const files = DATA_FILES.map(file => ({ file, data: JSON.parse(fs.readFileSync(file, 'utf8')) }));
    const targets = files.flatMap(f => collect(f.data));
    fs.mkdirSync(ICON_DIR, { recursive: true });

    let changes = 0;
    const note = (obj, field, value) => {
        if (value == null || obj[field] === value) return;
        // Wowhead muestra entre corchetes los nombres que aún no tienen traducción.
        if (field === 'name' && /^\[.*\]$/.test(value)) {
            console.warn(`  AVISO ${obj.spellId ? 'spell ' + obj.spellId : 'npc ' + obj.npcId}: nombre sin traducir en Wowhead (${value}), se conserva ${JSON.stringify(obj.name)}.`);
            return;
        }
        console.log(`  ${obj.spellId ? 'spell ' + obj.spellId : 'npc ' + obj.npcId} ${field}: ${JSON.stringify(obj[field])} -> ${JSON.stringify(value)}`);
        if (!CHECK_ONLY) obj[field] = value;
        changes++;
    };

    for (const obj of targets) {
        if (obj.spellId) {
            const t = await tooltip('spell', obj.spellId);
            note(obj, 'name', t.name);
            note(obj, 'icon', t.icon);
            // Si Wowhead aún no tradujo la descripción, llega igual que en inglés:
            // en ese caso no la usamos (la app debe estar en español).
            const desc = cleanDescription(t.tooltip);
            const descEn = cleanDescription((await tooltip('spell', obj.spellId, null)).tooltip);
            if (desc && desc === descEn) {
                console.warn(`  AVISO spell ${obj.spellId} (${t.name}): descripción sin traducir en Wowhead, se omite.`);
                if ('officialDesc' in obj) {
                    changes++;
                    if (!CHECK_ONLY) delete obj.officialDesc;
                }
            } else {
                note(obj, 'officialDesc', desc);
            }
            if (!CHECK_ONLY && t.icon) await downloadIcon(t.icon);
        } else if (obj.npcId) {
            const t = await tooltip('npc', obj.npcId);
            note(obj, 'name', t.name);
        }
    }

    console.log(`${targets.length} entradas revisadas, ${changes} cambios${CHECK_ONLY ? ' (sin escribir)' : ''}.`);
    if (!CHECK_ONLY && changes) {
        for (const { file, data } of files) fs.writeFileSync(file, JSON.stringify(data, null, 2) + '\n');
    }
    if (CHECK_ONLY && changes) process.exitCode = 1;
}

main().catch(err => { console.error(err.message); process.exit(1); });
