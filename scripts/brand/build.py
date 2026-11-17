"""Build Pawabase's brand files (public/brand/*.svg, public/favicon.svg) from the brand kit.

The symbol is the kit's own vector; the lettering is the kit's Plus Jakarta Sans at Medium (500) with its -25 unit tracking,
checked against the kit's wordmark. Needs fonttools (pip install fonttools).

    python scripts/brand/build.py public/brand --kit ~/Downloads/Pawabase-Design-System
    cp public/brand/favicon.svg public/favicon.svg && npm run seo:images && node scripts/email-assets.mjs && node scripts/blog/art.mjs

Then copy the same files to pawabase-cloud/web/public/brand and the docs' logo/ folder.
"""
import re, sys, json
from pathlib import Path
from fontTools.ttLib import TTFont
from fontTools.varLib.instancer import instantiateVariableFont
from fontTools.pens.svgPathPen import SVGPathPen
from fontTools.pens.boundsPen import BoundsPen

import argparse
_args = argparse.ArgumentParser(); _args.add_argument("out"); _args.add_argument("--kit", default=str(Path.home() / "Downloads/Pawabase-Design-System"))
_a = _args.parse_args()
KIT = Path(_a.kit).expanduser()
OUT = Path(_a.out)
OUT.mkdir(parents=True, exist_ok=True)
ORANGE, IVORY, INK = "#ff6a00", "#fcf8f5", "#050506"

MARK = re.search(r'd="([^"]+)"', (KIT / "logos/symbol/orange.svg").read_text()).group(1)
font = instantiateVariableFont(TTFont(KIT / "fonts/PlusJakartaSans-Variable.ttf"), {"wght": 500})
gs, cmap = font.getGlyphSet(), font.getBestCmap()
TRACK = -25  # the kit's letter-spacing, in font units

def word(text):
    """Glyph paths for a word, laid out by advance width, in font units (y up)."""
    x, parts, xmin, xmax = 0, [], None, 0
    for ch in text:
        name = cmap[ord(ch)]
        pen = SVGPathPen(gs); gs[name].draw(pen)
        b = BoundsPen(gs); gs[name].draw(b)
        if pen.getCommands():
            parts.append(f'<path d="{pen.getCommands()}" transform="translate({x},0)"/>')
            if b.bounds:
                xmin = x + b.bounds[0] if xmin is None else xmin
                xmax = x + b.bounds[2]
        x += gs[name].width + TRACK
    return "".join(parts), x, xmin or 0, xmax

# check against the kit's own wordmark: same advances means the same instance
kit_adv = [int(n) for n in re.findall(r'translate\((\d+),0\)', (KIT / "logos/wordmark/ivory.svg").read_text())]
ours = []; x = 0
for ch in "pawabase": ours.append(x); x += gs[cmap[ord(ch)]].width + TRACK
assert ours == kit_adv, (ours, kit_adv)

S = 0.11            # the kit's lettering scale
MK = 0.78125        # the kit's mark scale in the horizontal lockup (mark 256 wide -> 200)
BASE = 177          # baseline in the kit's lockup
TEXT_X = 285        # where the lettering starts in the kit's lockup

def svg(view, body, label):
    return f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="{view}" role="img" aria-label="{label}"><title>{label}</title>{body}</svg>\n'

def mark(fill, tx=0, ty=0, s=1.0):
    return f'<path fill="{fill}" d="{MARK}" transform="translate({tx:g},{ty:g}) scale({s:g})"/>'

files = {}
# the symbol, centred in a 256 square with the kit's favicon inset (12.5% each side), as the old mark sat in its square
INSET = 0.875
def square(fill):
    return mark(fill, 16, (256 - 228 * INSET) / 2, INSET)
for name, fill in [("mark", ORANGE), ("symbol-dark", ORANGE), ("symbol-light", ORANGE), ("mark-ivory", IVORY), ("mark-black", INK)]:
    files[f"{name}.svg"] = svg("0 0 256 256", square(fill), "Pawabase")

pawabase, _, wx0, wx1 = word("pawabase")
cloud, _, cx0, cx1 = word("cloud")
space = gs[cmap[ord(" ")]].width
ASC, DESC = 760, -205  # font units the lettering reaches (b/l ascender, p descender), checked below
def text(body, fill, x, opacity=None):
    o = f' fill-opacity="{opacity}"' if opacity else ""
    return f'<g fill="{fill}"{o} transform="translate({x:g},{BASE}) scale({S},-{S})">{body}</g>'

PAD = 0
top, bottom = 40, 40 + 228 * MK  # the mark spans the lockup's height
def lockup(fill_text, extra=False):
    body = mark(ORANGE, 40, 40, MK) + text(pawabase, fill_text, TEXT_X)
    right = TEXT_X + wx1 * S
    if extra:
        cx = TEXT_X + (wx1 + space * 1.25 - cx0) * S
        body += text(cloud, fill_text, cx, 0.6)
        right = cx + cx1 * S
    return body, right

for name, fill, extra, label in [("horizontal-dark", IVORY, False, "Pawabase"), ("horizontal-light", INK, False, "Pawabase"),
                                  ("cloud-dark", IVORY, True, "Pawabase Cloud"), ("cloud-light", INK, True, "Pawabase Cloud")]:
    body, right = lockup(fill, extra)
    files[f"{name}.svg"] = svg(f"40 {top:g} {right - 40:.1f} {bottom - top:.2f}", body, label)

# the lettering alone
for name, fill in [("wordmark-dark", IVORY), ("wordmark-light", INK)]:
    y0, y1 = BASE - ASC * S, BASE - DESC * S
    files[f"{name}.svg"] = svg(f"{wx0 * S:.1f} {y0:.1f} {(wx1 - wx0) * S:.1f} {y1 - y0:.1f}", text(pawabase, fill, 0), "Pawabase")

# favicon: the orange symbol, no ground (the kit's own favicon)
files["favicon.svg"] = svg("0 0 256 256", square(ORANGE), "Pawabase")

for name, body in files.items():
    (OUT / name).write_text(body)
print(json.dumps({k: len(v) for k, v in files.items()}))
