// Prueba de humo: abre la app en un navegador real y recorre lo principal.
// Uso: npm test   (sirve la carpeta en un puerto local y usa Playwright/Chromium)
import { chromium, devices } from 'playwright';
import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { extname, join, normalize } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = fileURLToPath(new URL('..', import.meta.url));
const TYPES = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json',
    '.png': 'image/png', '.jpg': 'image/jpeg', '.webp': 'image/webp', '.woff2': 'font/woff2' };

const server = createServer(async (req, res) => {
    const file = normalize(join(ROOT, decodeURIComponent(new URL(req.url, 'http://x').pathname)));
    if (!file.startsWith(ROOT)) return res.writeHead(403).end();
    try {
        res.writeHead(200, { 'content-type': TYPES[extname(file)] || 'application/octet-stream' });
        res.end(await readFile(file.endsWith('/') ? join(file, 'index.html') : file));
    } catch { res.writeHead(404).end(); }
}).listen(0);
const base = `http://localhost:${server.address().port}/index.html`;

const failures = [];
const check = (ok, msg) => { if (!ok) failures.push(msg); console.log(`${ok ? '✓' : '✗'} ${msg}`); };

const browser = await chromium.launch(process.env.CHROMIUM_PATH ? { executablePath: process.env.CHROMIUM_PATH } : {});
try {
    const ctx = await browser.newContext({ ...devices['Pixel 7'] });
    const page = await ctx.newPage();
    const errors = [];
    page.on('pageerror', e => errors.push(e.message));
    page.on('console', m => m.type() === 'error' && errors.push(m.text()));
    page.on('requestfailed', r => r.url().startsWith('http://localhost') && errors.push(`falló ${r.url()}`));

    await page.goto(base, { waitUntil: 'networkidle' });
    const ids = await page.evaluate(() => dungeonsData.map(d => d.id));
    check(ids.length === 8, `8 mazmorras cargadas (${ids.length})`);

    for (const id of ids) {
        await page.evaluate(id => selectDungeon(id), id);
        await page.waitForTimeout(250);
        const r = await page.evaluate(() => {
            const el = document.getElementById('dungeon-detail-container');
            return { abilities: el.querySelectorAll('a[href*="/mx/spell="]').length, route: !!el.querySelector('#guide-route'),
                english: /\b(the|damage|inflicts|players)\b/i.test(el.innerText) };
        });
        check(r.abilities > 0 && r.route && !r.english, `guía ${id}: ${r.abilities} habilidades, ruta, sin inglés`);
    }

    await page.goBack();
    await page.waitForTimeout(400);
    check(await page.evaluate(() => location.hash) !== '', 'el botón Atrás vuelve a la pantalla anterior');

    await page.evaluate(() => switchTab('tab-matrix'));
    check(await page.locator('#matrix-table-body tr').count() > 20, 'la matriz tiene filas');

    await page.evaluate(() => switchTab('tab-analyzer'));
    check(/Cobertura/.test(await page.locator('#coverage-score-badge').innerText()), 'el analizador calcula cobertura');

    await page.evaluate(() => switchTab('tab-overview'));
    await page.waitForFunction(() => window.Chart && Chart.getChart('timersChart'), null, { timeout: 5000 }).catch(() => {});
    check(await page.evaluate(() => !!(window.Chart && Chart.getChart('timersChart'))), 'la gráfica de cronómetros se dibuja');

    check(errors.length === 0, `sin errores en consola${errors.length ? ': ' + errors.join(' | ') : ''}`);
} finally {
    await browser.close();
    server.close();
}

if (failures.length) { console.error(`\n${failures.length} prueba(s) fallaron`); process.exit(1); }
console.log('\nTodas las pruebas pasaron.');
