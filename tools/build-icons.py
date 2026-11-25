#!/usr/bin/env python3
"""Genera un Font Awesome reducido con solo los íconos que usa la app.

Busca clases `fa-*` en index.html y data/*.json, toma su código del CSS original
(tools/vendor-src/fontawesome) y recorta la fuente a esos glifos. Resultado:
  vendor/fontawesome/icons.css
  vendor/fontawesome/fa-solid-subset.woff2

Uso: npm run build:icons   (requiere: pip install fonttools brotli)
"""
import pathlib, re, sys
from fontTools import subset

ROOT = pathlib.Path(__file__).resolve().parent.parent
SRC = ROOT / 'tools' / 'vendor-src' / 'fontawesome'
OUT = ROOT / 'vendor' / 'fontawesome'
UTILITY = {'fa-solid'}

css = (SRC / 'all.min.css').read_text(encoding='utf-8')
codes = {}
for selectors, code in re.findall(r'([^{}]+)\{content:"\\([0-9a-f]+)"\}', css):
    for sel in selectors.split(','):
        m = re.fullmatch(r'\.(fa-[a-z0-9-]+):before', sel.strip())
        if m:
            codes.setdefault(m.group(1), code)

sources = [ROOT / 'index.html', *sorted((ROOT / 'data').glob('*.json'))]
used = sorted({c for f in sources for c in re.findall(r'\bfa-[a-z0-9-]+\b', f.read_text(encoding='utf-8'))} - UTILITY)
missing = [c for c in used if c not in codes]
if missing:
    sys.exit(f'Íconos sin definición en Font Awesome: {", ".join(missing)}')

OUT.mkdir(parents=True, exist_ok=True)
rules = '\n'.join(f'.{c}:before{{content:"\\{codes[c]}"}}' for c in used)
(OUT / 'icons.css').write_text(f'''/* Font Awesome Free 6.5.1 (subconjunto generado por tools/build-icons.py). Licencia: ver LICENSE.txt */
@font-face{{font-family:"FA Solid";font-style:normal;font-weight:900;font-display:block;src:url(fa-solid-subset.woff2) format("woff2")}}
.fa-solid{{font-family:"FA Solid";font-weight:900;font-style:normal;font-variant:normal;line-height:1;display:inline-block;text-rendering:auto;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale}}
{rules}
''', encoding='utf-8')

opts = subset.Options()
opts.flavor = 'woff2'
opts.layout_features = []
font = subset.load_font(str(SRC / 'fa-solid-900.woff2'), opts)
sub = subset.Subsetter(opts)
sub.populate(unicodes=[int(codes[c], 16) for c in used])
sub.subset(font)
subset.save_font(font, str(OUT / 'fa-solid-subset.woff2'), opts)
print(f'icons.css: {len(used)} íconos; fuente: {(OUT / "fa-solid-subset.woff2").stat().st_size // 1024} KB')
