// Genera las capturas para la ficha de Google Play en store/play-store/.
// Uso: python3 -m http.server 8766   (en la raíz del repo, en otra terminal)
//      node tools/play-store-capturas.js store/play-store
const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

const OUT = process.argv[2];
const BASE = 'http://localhost:8766/index.html';

// Cada dispositivo: viewport CSS * escala = tamaño final exacto.
const DEVICES = [
  { dir: '1-telefono', viewport: { width: 360, height: 640 }, scale: 3, mobile: true,
    shots: ['mazmorras', 'guia', 'jefe', 'ruta', 'matriz', 'analizador'] },          // 1080x1920 (9:16)
  { dir: '2-tablet-7', viewport: { width: 720, height: 1280 }, scale: 1.5, mobile: true,
    shots: ['mazmorras', 'jefe', 'matriz', 'analizador'] },                          // 1080x1920 (9:16)
  { dir: '3-tablet-10', viewport: { width: 1280, height: 720 }, scale: 2, mobile: true,
    shots: ['mazmorras', 'jefe', 'matriz', 'analizador'] },                          // 2560x1440 (16:9)
  { dir: '4-plegable', name: 'desplegado-1x1', viewport: { width: 900, height: 900 }, scale: 2, mobile: true, shots: ['jefe'] },        // 1800x1800
  { dir: '4-plegable', name: 'desplegado-4x3', viewport: { width: 1024, height: 768 }, scale: 2, mobile: true, shots: ['matriz'] },     // 2048x1536
  { dir: '4-plegable', name: 'plegado-10x16', viewport: { width: 600, height: 960 }, scale: 2, mobile: true, shots: ['mazmorras'] },    // 1200x1920
  { dir: '5-escritorio', viewport: { width: 1280, height: 720 }, scale: 1.5, mobile: false,
    shots: ['mazmorras', 'jefe', 'matriz', 'analizador'] },                          // 1920x1080 (16:9)
];

const SCENES = {
  mazmorras: async p => { await p.evaluate(() => switchTab('tab-dungeons')); },
  guia: async p => { await p.evaluate(() => selectDungeon('voidscar-arena')); },
  jefe: async p => {
    await p.evaluate(() => selectDungeon('the-blinding-vale'));
    await p.waitForTimeout(900);
    await scrollToEl(p, '#guide-boss-2');
  },
  ruta: async p => {
    await p.evaluate(() => selectDungeon('kings-rest'));
    await p.waitForTimeout(900);
    await scrollToEl(p, '#guide-route');
  },
  matriz: async p => {
    await p.evaluate(() => switchTab('tab-matrix'));
    await p.selectOption('#matrix-dungeon-filter', 'kings-rest');
    await p.waitForTimeout(200);
    await scrollToEl(p, '#tab-matrix');
  },
  analizador: async p => {
    await p.evaluate(() => {
      switchTab('tab-analyzer');
      const set = (id, v) => { document.getElementById(id).value = v; };
      set('party-tank', 'Guerrero'); set('party-healer', 'Sacerdote'); set('party-dps1', 'Caballero de la Muerte');
      set('party-dps2', 'Cazador de Demonios'); set('party-dps3', 'Mago');
      calculatePartyCoverage();
    });
    await scrollToEl(p, '#tab-analyzer');
  },
};

async function scrollToEl(p, sel) {
  await p.evaluate(sel => {
    const el = document.querySelector(sel);
    const header = document.querySelector('header').offsetHeight;
    window.scrollTo(0, el.getBoundingClientRect().top + window.scrollY - header - 8);
  }, sel);
  await p.waitForTimeout(300);
}

(async () => {
  const b = await chromium.launch();
  for (const d of DEVICES) {
    const ctx = await b.newContext({ viewport: d.viewport, deviceScaleFactor: d.scale, isMobile: d.mobile, hasTouch: d.mobile });
    const p = await ctx.newPage();
    const errors = [];
    p.on('pageerror', e => errors.push(e.message));
    fs.mkdirSync(path.join(OUT, d.dir), { recursive: true });
    for (const [i, shot] of d.shots.entries()) {
      await p.goto(BASE + '#tab-dungeons', { waitUntil: 'networkidle' });
      await p.evaluate(() => localStorage.clear());
      await p.waitForTimeout(500);
      await SCENES[shot](p);
      await p.waitForTimeout(900);
      const file = path.join(OUT, d.dir, `${d.name ? d.name : String(i + 1).padStart(2, '0') + '-' + shot}.png`);
      await p.screenshot({ path: file });
    }
    if (errors.length) console.log(d.dir, 'errores:', errors);
    await ctx.close();
  }
  await b.close();
})();
