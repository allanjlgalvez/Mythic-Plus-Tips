#!/usr/bin/env node
// Revisa que data/dungeons.json y data/classes.json estén completos y en español.
// Uso: npm run validate
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const read = f => JSON.parse(fs.readFileSync(path.join(ROOT, 'data', f), 'utf8'));
const TAGS = ['interrumpir', 'aturdir', 'golpe-tanque', 'frontal', 'area', 'esquivar', 'soak', 'fijar', 'adds', 'prioridad', 'mover',
    'disipar-magia', 'disipar-veneno', 'disipar-maldicion', 'disipar-enfermedad', 'calmar', 'purgar', 'info'];
const errors = [];
const err = (where, msg) => errors.push(`${where}: ${msg}`);

function checkAbility(a, where) {
    if (!Number.isInteger(a.spellId)) err(where, 'habilidad sin spellId');
    if (!a.name) err(where, `spell ${a.spellId} sin nombre (corre npm run sync:wowhead)`);
    if (/^\[.*\]$/.test(a.name || '')) err(where, `spell ${a.spellId} con nombre sin traducir: ${a.name}`);
    if (!a.icon) err(where, `spell ${a.spellId} sin ícono`);
    else if (!fs.existsSync(path.join(ROOT, 'images', 'spells', `${a.icon}.jpg`))) err(where, `falta images/spells/${a.icon}.jpg`);
    for (const t of a.tags || []) if (!TAGS.includes(t)) err(where, `etiqueta desconocida "${t}" en spell ${a.spellId}`);
}

const { dungeons } = read('dungeons.json');
const ids = new Set();
for (const d of dungeons) {
    const where = d.id || '(mazmorra sin id)';
    for (const k of ['id', 'name', 'shortName', 'timer', 'expansion']) if (!d[k]) err(where, `falta "${k}"`);
    if (ids.has(d.id)) err(where, 'id repetido');
    ids.add(d.id);
    if (!/^\d{1,2}:\d{2}$/.test(d.timer || '')) err(where, `temporizador inválido "${d.timer}"`);
    if (!fs.existsSync(path.join(ROOT, 'images', `${d.id}.webp`))) err(where, `falta images/${d.id}.webp`);
    if (!d.bosses?.length) err(where, 'sin jefes');
    if (d.bossesCount !== d.bosses?.length) err(where, `bossesCount (${d.bossesCount}) no coincide con ${d.bosses?.length} jefes`);
    if (!d.route?.length) err(where, 'sin ruta');
    for (const b of d.bosses || []) {
        if (!b.name || /^\[.*\]$/.test(b.name)) err(where, `jefe sin nombre válido: ${b.name}`);
        if (!b.abilities?.length) err(`${where} / ${b.name}`, 'jefe sin habilidades');
        (b.abilities || []).forEach(a => checkAbility(a, `${where} / ${b.name}`));
    }
    for (const t of d.trash || []) (t.abilities || []).forEach(a => checkAbility(a, `${where} / trash ${t.name}`));
}

const { classes } = read('classes.json');
for (const [name, c] of Object.entries(classes)) {
    if (!/^#[0-9A-F]{6}$/i.test(c.color || '')) err(name, 'color inválido');
    if (!c.roles?.length) err(name, 'sin roles');
    for (const k of c.counters || []) {
        checkAbility(k, `clase ${name}`);
        for (const r of k.roles || []) if (!c.roles.includes(r)) err(name, `rol "${r}" que la clase no tiene`);
    }
}

if (errors.length) {
    console.error(`✗ ${errors.length} problema(s) en los datos:\n  ` + errors.join('\n  '));
    process.exit(1);
}
console.log(`✓ Datos válidos: ${dungeons.length} mazmorras, ${Object.keys(classes).length} clases.`);
