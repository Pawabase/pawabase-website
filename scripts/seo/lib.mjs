/** Shared by the image scripts: the brand's fonts and colours, measuring and wrapping text, and the small drawing helpers the art is made of. */
import { Resvg } from "@resvg/resvg-js";
import { readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

export const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "../..");
export const FAMILY = "Plus Jakarta Sans";

/** The brand palette (src/styles.css). Anything translucent is made from these with an opacity. */
export const C = {
  bg: "#111214",
  surface: "#17181b",
  raised: "#1d1e22",
  line: "#232428",
  line2: "#2e3035",
  line3: "#3a3c42",
  text: "#f3f0eb",
  muted: "#a8a49d",
  faint: "#6d6a64",
  brand: "#FF6A00",
  amber: "#FFA627",
};

export const font = {
  fontFiles: [
    `${ROOT}/public/brand/PlusJakartaSans-Variable.ttf`,
    `${ROOT}/scripts/seo/fonts/PlusJakartaSans-500.ttf`,
    `${ROOT}/scripts/seo/fonts/PlusJakartaSans-700.ttf`,
    `${ROOT}/scripts/seo/fonts/PlusJakartaSans-800.ttf`,
  ],
  loadSystemFonts: false,
  defaultFontFamily: FAMILY,
};

export const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

export function png(svg, width) {
  return new Resvg(svg, { font, fitTo: width ? { mode: "width", value: width } : undefined }).render().asPng();
}

const widths = new Map();
/** How wide a piece of text is set, in px, in the real font. */
export function measure(text, size, weight = 500, spacing = 0) {
  const key = `${text}|${size}|${weight}|${spacing}`;
  if (widths.has(key)) return widths.get(key);
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="4000" height="300"><text x="0" y="150" font-family="${FAMILY}" font-weight="${weight}" font-size="${size}" letter-spacing="${spacing}">${esc(text)}</text></svg>`;
  const box = new Resvg(svg, { font }).getBBox();
  // The ink box leaves out the side bearings, so a space or two is added back to keep lines honest.
  const value = (box?.width ?? text.length * size * 0.55) + size * 0.08;
  widths.set(key, value);
  return value;
}

/** Break text into lines no wider than max. */
export function wrap(text, size, weight, max, spacing = 0) {
  const lines = [];
  let line = "";
  for (const word of text.split(/\s+/)) {
    const next = line ? `${line} ${word}` : word;
    if (line && measure(next, size, weight, spacing) > max) {
      lines.push(line);
      line = word;
    } else line = next;
  }
  if (line) lines.push(line);
  return lines;
}

/** Wrap, shrinking the type until it fits in the most lines allowed. */
export function fit(text, { sizes, weight, max, lines, spacing = 0 }) {
  for (const size of sizes) {
    const out = wrap(text, size, weight, max, spacing);
    if (out.length <= lines) return { size, lines: out };
  }
  const size = sizes[sizes.length - 1];
  return { size, lines: ellipsis(wrap(text, size, weight, max, spacing), lines, size, weight, max, spacing) };
}

function ellipsis(all, limit, size, weight, max, spacing) {
  if (all.length <= limit) return all;
  const kept = all.slice(0, limit);
  let last = kept[limit - 1];
  while (last.length > 1 && measure(`${last}…`, size, weight, spacing) > max) last = last.slice(0, last.lastIndexOf(" ") > 0 ? last.lastIndexOf(" ") : -1);
  kept[limit - 1] = `${last.replace(/[ ,.;:]+$/, "")}…`;
  return kept;
}

// ── drawing ──────────────────────────────────────────────────────────────

const attrs = (o) =>
  Object.entries(o)
    .filter(([, v]) => v !== undefined && v !== null && v !== false)
    .map(([k, v]) => `${k.replace(/[A-Z]/g, (m) => `-${m.toLowerCase()}`)}="${esc(v)}"`)
    .join(" ");

export const rect = (x, y, w, h, o = {}) => {
  const { r = 0, fill = "none", stroke, sw = 1, op, dash, ...rest } = o;
  return `<rect ${attrs({ x, y, width: w, height: h, rx: r, fill, stroke, strokeWidth: stroke ? sw : undefined, opacity: op, strokeDasharray: dash, ...rest })}/>`;
};
export const circle = (cx, cy, r, o = {}) => {
  const { fill = "none", stroke, sw = 1, op, dash, ...rest } = o;
  return `<circle ${attrs({ cx, cy, r, fill, stroke, strokeWidth: stroke ? sw : undefined, opacity: op, strokeDasharray: dash, ...rest })}/>`;
};
export const line = (x1, y1, x2, y2, o = {}) => {
  const { stroke = C.line2, sw = 1, op, dash, cap = "round" } = o;
  return `<line ${attrs({ x1, y1, x2, y2, stroke, strokeWidth: sw, opacity: op, strokeDasharray: dash, strokeLinecap: cap })}/>`;
};
export const path = (d, o = {}) => {
  const { fill = "none", stroke, sw = 1, op, dash, cap = "round", join = "round" } = o;
  return `<path ${attrs({ d, fill, stroke, strokeWidth: stroke ? sw : undefined, opacity: op, strokeDasharray: dash, strokeLinecap: cap, strokeLinejoin: join })}/>`;
};
export const text = (x, y, value, o = {}) => {
  const { size = 14, weight = 500, fill = C.muted, anchor = "start", spacing, op } = o;
  return `<text ${attrs({ x, y, fontFamily: FAMILY, fontWeight: weight, fontSize: size, fill, textAnchor: anchor, letterSpacing: spacing, opacity: op })}>${esc(value)}</text>`;
};
/** A small rounded label with text centred in it; returns its width too so rows can be laid out. */
export function pill(x, y, label, o = {}) {
  const { size = 13, weight = 700, fill = "none", stroke = C.line3, color = C.muted, h = 26, pad = 12, spacing = 0.4 } = o;
  const w = Math.round(measure(label, size, weight, spacing) + pad * 2);
  return {
    w,
    svg: rect(x, y, w, h, { r: h / 2, fill, stroke, sw: 1 }) + text(x + w / 2, y + h / 2 + size * 0.36, label, { size, weight, fill: color, anchor: "middle", spacing }),
  };
}
