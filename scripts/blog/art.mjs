/**
 * The blog's own pictures: covers and diagrams drawn as SVG in the site's language (halftone dots lit orange, striped bars, dashed
 * rails, Plus Jakarta Sans), and rendered to PNG with the real font so the image pipeline can optimise them. Each picture is written
 * as <name>.svg (to edit) and <name>.png (what the post uses) into the post's own assets folder.
 *
 *   node scripts/blog/art.mjs
 */
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

import { C, FAMILY, esc, fit, measure, png } from "../seo/lib.mjs";
import { CONTENT } from "./collect.mjs";

const ORANGE = "#ff6a00";
const SUN = "#ffbf9a";
const INK = "#0b0b0d";
const IVORY = "#fcf8f5";
const MUTED = "rgba(252,248,245,0.6)";
const FAINT = "rgba(252,248,245,0.38)";
const LINE = "rgba(252,248,245,0.1)";

/** A tiny seeded generator, so every picture comes out the same each run. */
function seeded(seed) {
  let s = seed;
  return () => {
    s = (s * 1664525 + 1013904223) % 4294967296;
    return s / 4294967296;
  };
}

const t = (x, y, value, { size = 20, weight = 500, fill = IVORY, anchor = "start", spacing = 0, mono = false, op } = {}) =>
  `<text x="${x}" y="${y}" font-family="${mono ? "JetBrains Mono, Menlo, monospace" : FAMILY}" font-weight="${weight}" font-size="${size}" fill="${fill}" text-anchor="${anchor}" letter-spacing="${spacing}"${op ? ` opacity="${op}"` : ""}>${esc(value)}</text>`;

const frame = (w, h, inner) => `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">
  <defs>
    <pattern id="dots" width="24" height="24" patternUnits="userSpaceOnUse"><circle cx="1.5" cy="1.5" r="1" fill="#fff" fill-opacity=".05"/></pattern>
    <linearGradient id="silver" x1="0" y1="0" x2="0" y2="1"><stop offset=".08" stop-color="#ffffff"/><stop offset=".6" stop-color="#d8d6d3"/><stop offset="1" stop-color="#8e8b87"/></linearGradient>
    <linearGradient id="sun" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${SUN}"/><stop offset=".45" stop-color="#ff8a4a"/><stop offset="1" stop-color="${ORANGE}"/></linearGradient>
  </defs>
  <rect width="${w}" height="${h}" fill="${INK}"/>
  <rect width="${w}" height="${h}" fill="url(#dots)"/>
  ${inner}
</svg>`;

/** The hero's field: thin striped bars in clusters, a few warm. */
function bars(x0, y0, w, h, { count = 160, seed = 7, warmth = 0.12 } = {}) {
  const rand = seeded(seed);
  const out = [];
  for (let i = 0; i < count; i++) {
    const cx = x0 + Math.pow(rand(), 0.8) * w;
    const bh = h * (0.08 + rand() * 0.42) * (0.5 + (cx - x0) / w);
    const by = y0 + rand() * (h - bh);
    const warm = rand() < warmth;
    const width = rand() < 0.35 ? 4 : 2.5;
    const op = (0.18 + rand() * 0.6) * (0.4 + (cx - x0) / w);
    out.push(`<rect x="${cx.toFixed(1)}" y="${by.toFixed(1)}" width="${width}" height="${bh.toFixed(1)}" fill="url(#${warm ? "stripeWarm" : "stripe"})" opacity="${op.toFixed(2)}"/>`);
  }
  return `<defs>
    <pattern id="stripe" width="4" height="4" patternUnits="userSpaceOnUse"><rect width="4" height="2" fill="#dcdce1"/></pattern>
    <pattern id="stripeWarm" width="4" height="4" patternUnits="userSpaceOnUse"><rect width="4" height="2" fill="${ORANGE}"/></pattern>
  </defs>${out.join("")}`;
}

/** Rails and rules with plus marks: the site's own frame. */
const rails = (w, h, inset = 80, top = 70) => {
  const plus = (x, y) => `<path d="M${x - 7} ${y} h14 M${x} ${y - 7} v14" stroke="rgba(252,248,245,.42)" stroke-width="1.5" stroke-linecap="round"/>`;
  return `<line x1="${inset}" y1="0" x2="${inset}" y2="${h}" stroke="${LINE}" stroke-dasharray="3 8"/>
  <line x1="${w - inset}" y1="0" x2="${w - inset}" y2="${h}" stroke="${LINE}" stroke-dasharray="3 8"/>
  <line x1="0" y1="${top}" x2="${w}" y2="${top}" stroke="${LINE}"/>
  <line x1="0" y1="${h - top}" x2="${w}" y2="${h - top}" stroke="${LINE}"/>
  ${plus(inset, top)}${plus(w - inset, top)}${plus(inset, h - top)}${plus(w - inset, h - top)}`;
};

/** A cover: 1600 x 900, a kicker, the title large, a line under it, and a picture on the right. */
function cover({ kicker, title, line, art }) {
  const W = 1600;
  const H = 900;
  const x = 150;
  const head = fit(title, { sizes: [92, 84, 76, 68, 60], weight: 700, max: 820, lines: 3, spacing: -3 });
  const lh = Math.round(head.size * 1.04);
  const top = 360 - ((head.lines.length - 1) * lh) / 2;
  const sub = fit(line, { sizes: [28, 26, 24], weight: 500, max: 760, lines: 2 });
  return frame(W, H, `${art}
  ${rails(W, H)}
  <circle cx="${x + 6}" cy="${top - head.size - 28}" r="6" fill="${ORANGE}"/>
  ${t(x + 24, top - head.size - 20, kicker.toUpperCase(), { size: 20, weight: 700, fill: ORANGE, spacing: 3 })}
  ${head.lines.map((l, i) => `<text x="${x}" y="${top + i * lh}" font-family="${FAMILY}" font-weight="700" font-size="${head.size}" fill="url(#silver)" letter-spacing="-3">${esc(l)}</text>`).join("\n  ")}
  ${sub.lines.map((l, i) => t(x, top + (head.lines.length - 1) * lh + 70 + i * 40, l, { size: sub.size, fill: MUTED })).join("\n  ")}
  ${t(x, H - 110, "PAWABASE BLOG", { size: 17, weight: 700, fill: FAINT, spacing: 3 })}`);
}

// ── brand marks ───────────────────────────────────────────────────────────

/**
 * A brand's mark from Simple Icons (CC0, the package the site already uses for brand logos), drawn at ``size`` px with its top-left
 * at (x, y). Returns its 24x24 path, scaled, in ``color`` (the brand's own colour by default).
 */
const ICONS = new URL("../../node_modules/@icons-pack/react-simple-icons/icons/", import.meta.url);
function mark(name, x, y, size, color) {
  const src = readFileSync(new URL(`Si${name}.mjs`, ICONS), "utf8");
  const d = src.match(/\bd: "([^"]+)"/)[1];
  const brand = src.match(/defaultColor = "([^"]+)"/)[1];
  // a brand whose own colour is near-black (Anthropic, X…) would vanish on the dark ground: draw it in ivory
  const [r, g, b] = [1, 3, 5].map((i) => parseInt(brand.slice(i, i + 2), 16) / 255);
  const dark = 0.2126 * r + 0.7152 * g + 0.0722 * b < 0.25;
  return `<path transform="translate(${x} ${y}) scale(${size / 24})" d="${d}" fill="${color ?? (dark ? IVORY : brand)}"/>`;
}

/** Pawabase's own mark (public/brand/mark.svg), at ``size`` px. Its gradients get an id of their own each time. */
let markCount = 0;
function pawabaseMark(x, y, size) {
  const n = markCount++;
  const inner = readFileSync(new URL("../../public/brand/mark.svg", import.meta.url), "utf8")
    .replace(/^[\s\S]*?<svg[^>]*>/, "").replace(/<\/svg>\s*$/, "").replace(/<title>.*?<\/title>/, "")
    .replace(/pb-(upper|lower|vivid)/g, `pb-$1-${n}`);
  return `<g transform="translate(${x} ${y}) scale(${size / 256})">${inner}</g>`;
}

/** The ten platforms of the ranking: name, Simple Icons name (or none), and what each is best for. */
const PLATFORMS = [
  ["Pawabase", "pawabase", "Complete products and SaaS"],
  ["Supabase", "Supabase", "Postgres primitives you assemble yourself"],
  ["Firebase", "Firebase", "Mobile apps deep in Google's ecosystem"],
  ["Convex", "Convex", "Reactive apps written in TypeScript"],
  ["Appwrite", "Appwrite", "An open-source backend you self-host"],
  ["AWS Amplify", null, "Teams standardised on AWS"],
  ["PocketBase", "Pocketbase", "Small apps on a single server"],
  ["Nhost", "Nhost", "GraphQL-first teams on Postgres"],
  ["Xano", null, "No-code builders who need a backend"],
  ["Back4App", null, "Existing Parse Server apps"],
];

/** A platform's logo inside a rounded tile; a name tile when there's no mark to draw. */
function logoTile(x, y, w, h, [name, icon], { hot = false, label = true } = {}) {
  const box = `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${Math.round(w * 0.16)}" fill="${hot ? "rgba(255,106,0,.1)" : "#121214"}" stroke="${hot ? "rgba(255,106,0,.6)" : "rgba(252,248,245,.12)"}"/>`;
  const size = Math.round(Math.min(w, h) * (label ? 0.42 : 0.5));
  const cx = x + w / 2;
  const top = y + (label ? h * 0.2 : (h - size) / 2);
  let art;
  if (icon === "pawabase") art = pawabaseMark(cx - size / 2, top, size);
  else if (icon) art = mark(icon, cx - size / 2, top, size);
  else art = t(cx, y + h * (label ? 0.48 : 0.56), name.split(" ")[0], { size: Math.round(w * 0.16), weight: 700, fill: IVORY, anchor: "middle" });
  const caption = label && icon ? t(cx, y + h - h * 0.13, name, { size: Math.round(w * 0.105), weight: 600, fill: MUTED, anchor: "middle" }) : label && !icon ? t(cx, y + h - h * 0.13, name.includes(" ") ? name.split(" ").slice(1).join(" ") : "", { size: Math.round(w * 0.105), weight: 600, fill: MUTED, anchor: "middle" }) : "";
  return box + art + caption;
}

// ── the pictures ──────────────────────────────────────────────────────────

/** The ranking's cover: the title, and the ten logos in rank order, the first lit. */
function rankingCover() {
  const W = 1600;
  const H = 900;
  const x = 150;
  const tiles = PLATFORMS.map((p, i) => {
    const col = i % 4;
    const row = Math.floor(i / 4);
    const tx = 905 + col * 150 + (row === 2 ? 150 : 0);
    const ty = 180 + row * 175;
    return `${logoTile(tx, ty, 132, 132, p, { hot: i === 0 })}${t(tx + 10, ty - 10, String(i + 1).padStart(2, "0"), { size: 15, weight: 700, fill: i === 0 ? ORANGE : FAINT, mono: true })}`;
  }).join("");
  const head = fit("The 10 best backend platforms of 2026", { sizes: [80, 72, 66, 60], weight: 700, max: 660, lines: 4, spacing: -3 });
  const lh = Math.round(head.size * 1.04);
  return frame(W, H, `${tiles}
  ${rails(W, H)}
  <circle cx="${x + 6}" cy="${232 - head.size}" r="6" fill="${ORANGE}"/>
  ${t(x + 24, 240 - head.size, "THE 2026 RANKING", { size: 20, weight: 700, fill: ORANGE, spacing: 3 })}
  ${head.lines.map((l, i) => `<text x="${x}" y="${300 + i * lh}" font-family="${FAMILY}" font-weight="700" font-size="${head.size}" fill="url(#silver)" letter-spacing="-3">${esc(l)}</text>`).join("\n  ")}
  ${t(x, 330 + head.lines.length * lh, "Ranked on what decides whether a", { size: 26, fill: MUTED })}
  ${t(x, 368 + head.lines.length * lh, "backend carries a product past launch.", { size: 26, fill: MUTED })}
  ${t(x, H - 110, "PAWABASE BLOG", { size: 17, weight: 700, fill: FAINT, spacing: 3 })}`);
}

/** One platform's header in the ranking: its rank, its logo, its name and what it's best for. */
function rankCard(i) {
  const W = 1600;
  const H = 520;
  const [name, , best] = PLATFORMS[i];
  const first = i === 0;
  return frame(W, H, `${first ? `<radialGradient id="glow1" cx="85%" cy="30%" r="55%"><stop offset="0" stop-color="${ORANGE}" stop-opacity=".22"/><stop offset="1" stop-color="${ORANGE}" stop-opacity="0"/></radialGradient><rect width="${W}" height="${H}" fill="url(#glow1)"/>` : ""}
  <text x="90" y="${H / 2 + 120}" font-family="${FAMILY}" font-weight="800" font-size="330" fill="none" stroke="${first ? "rgba(255,106,0,.7)" : "rgba(252,248,245,.16)"}" stroke-width="2.5" letter-spacing="-16">${String(i + 1).padStart(2, "0")}</text>
  ${logoTile(560, 130, 260, 260, PLATFORMS[i], { hot: first, label: false })}
  ${t(880, 228, first ? "#1 OF 10 · OUR PICK" : `#${i + 1} OF 10`, { size: 20, weight: 700, fill: first ? ORANGE : FAINT, spacing: 3 })}
  ${t(876, 312, name, { size: 84, weight: 700, fill: IVORY, spacing: -3 })}
  ${t(880, 370, `Best for: ${best}`, { size: 26, fill: MUTED })}`);
}

/** The frameworks Pawabase has setup guides for, as a strip of their marks. */
function frameworks() {
  const W = 1600;
  const H = 520;
  const list = [["React", "React"], ["Next.js", "Nextdotjs"], ["Vue", "Vuedotjs"], ["Svelte", "Svelte"], ["Angular", "Angular"], ["Astro", "Astro"], ["Flutter", "Flutter"], ["Swift", "Swift"], ["Android", "Android"], ["Python", "Python"], ["FastAPI", "Fastapi"], ["Node.js", "Nodedotjs"]];
  const tiles = list.map(([label, icon], i) => {
    const col = i % 6;
    const row = Math.floor(i / 6);
    const x = 130 + col * 230;
    const y = 160 + row * 170;
    let art;
    try {
      art = mark(icon, x + 70, y + 22, 58, IVORY);
    } catch {
      art = t(x + 99, y + 64, label[0], { size: 40, weight: 700, anchor: "middle" });
    }
    return `<rect x="${x}" y="${y}" width="198" height="146" rx="22" fill="#121214" stroke="rgba(252,248,245,.12)"/>${art}${t(x + 99, y + 118, label, { size: 19, weight: 600, fill: MUTED, anchor: "middle" })}`;
  }).join("");
  return frame(W, H, `${t(130, 92, "WORKS WITH YOUR STACK", { size: 16, weight: 700, fill: ORANGE, spacing: 3 })}
  ${t(130, 128, "Typed SDKs for TypeScript and Python, and setup guides for the frameworks you already use.", { size: 23, fill: MUTED })}
  ${tiles}`);
}

/** The comparison's cover: Pawabase's mark against Supabase's. */
function versusCover() {
  const W = 1600;
  const H = 900;
  const x = 150;
  return frame(W, H, `${rails(W, H)}
  <rect x="975" y="335" width="230" height="230" rx="44" fill="#121214" stroke="rgba(252,248,245,.14)"/>
  ${pawabaseMark(1010, 370, 160)}
  ${t(1312, 466, "vs", { size: 44, weight: 700, fill: MUTED, anchor: "middle" })}
  <rect x="1385" y="365" width="170" height="170" rx="34" fill="#121214" stroke="rgba(252,248,245,.14)"/>
  ${mark("Supabase", 1420, 400, 100)}
  <circle cx="${x + 6}" cy="${172}" r="6" fill="${ORANGE}"/>
  ${t(x + 24, 180, "COMPARISON", { size: 20, weight: 700, fill: ORANGE, spacing: 3 })}
  <text x="${x}" y="300" font-family="${FAMILY}" font-weight="700" font-size="92" fill="url(#silver)" letter-spacing="-3">Pawabase</text>
  <text x="${x}" y="396" font-family="${FAMILY}" font-weight="700" font-size="92" fill="url(#silver)" letter-spacing="-3">vs Supabase</text>
  ${t(x, 470, "Both start from Postgres. One hands you primitives;", { size: 28, fill: MUTED })}
  ${t(x, 510, "the other hands you the whole system.", { size: 28, fill: MUTED })}
  ${t(x, H - 110, "PAWABASE BLOG", { size: 17, weight: 700, fill: FAINT, spacing: 3 })}`);
}


/** A labelled node: a rounded tile with a mono label and a line. */
const tile = (x, y, w, h, label, sub, { hot = false } = {}) => `<g>
  <rect x="${x}" y="${y}" width="${w}" height="${h}" rx="16" fill="${hot ? "rgba(255,106,0,.1)" : "#121214"}" stroke="${hot ? "rgba(255,106,0,.55)" : "rgba(252,248,245,.12)"}"/>
  ${t(x + 22, y + 38, label, { size: 21, weight: 600, fill: IVORY })}
  ${sub ? t(x + 22, y + 66, sub, { size: 15, fill: MUTED }) : ""}
</g>`;

function oneSystem() {
  const W = 1600;
  const H = 1000;
  const cx = 800;
  const cy = 520;
  const parts = [
    ["Data API", "REST for every table"], ["Auth", "Passkeys, SSO, MFA, orgs"], ["Policies", "One rule, everywhere"],
    ["Storage", "Files, links, transforms"], ["Realtime", "Channels, presence, live"], ["Flows", "Visual workflows"],
    ["AI & agents", "Gateway, agents, vectors"], ["Mail", "Templates and delivery"], ["Observability", "Requests, traces, alarms"],
    ["MCP", "Your backend, for AI tools"],
  ];
  const R = 360;
  const tw = 250;
  const th = 86;
  const nodes = parts.map(([label, sub], i) => {
    const a = -Math.PI / 2 + (i / parts.length) * Math.PI * 2;
    const x = cx + Math.cos(a) * (R + 120) - tw / 2;
    const y = cy + Math.sin(a) * R - th / 2;
    const lx = cx + Math.cos(a) * 170;
    const ly = cy + Math.sin(a) * 170;
    return `<line x1="${lx.toFixed(0)}" y1="${ly.toFixed(0)}" x2="${(x + tw / 2).toFixed(0)}" y2="${(y + th / 2).toFixed(0)}" stroke="rgba(255,106,0,.35)" stroke-dasharray="4 6"/>${tile(x, y, tw, th, label, sub)}`;
  });
  return frame(W, H, `${t(80, 70, "ONE SYSTEM", { size: 16, weight: 700, fill: ORANGE, spacing: 3 })}
  ${t(80, 108, "Every part shares one database, one set of users and one set of rules.", { size: 24, fill: MUTED })}
  ${nodes.join("\n  ")}
  <rect x="${cx - 128}" y="${cy - 34}" width="256" height="68" rx="34" fill="#121214" stroke="rgba(255,106,0,.6)"/>
  ${t(cx, cy + 9, "Postgres + your data", { size: 22, weight: 700, anchor: "middle" })}`);
}

function stitchedVsOne() {
  const W = 1600;
  const H = 820;
  const left = [["Database", "hosted Postgres"], ["Auth", "another vendor"], ["File storage", "a bucket + glue"], ["Email", "an ESP + templates"], ["Jobs & cron", "a queue service"], ["Workflows", "an automation tool"], ["AI calls", "keys in your code"], ["Logs", "a log vendor"]];
  const tiles = left.map(([a, b], i) => tile(80 + (i % 2) * 330, 170 + Math.floor(i / 2) * 140, 310, 112, a, b)).join("");
  const wires = Array.from({ length: 14 }, (_, i) => {
    const r = seeded(i + 5);
    const x1 = 100 + r() * 620;
    const y1 = 180 + r() * 520;
    const x2 = 100 + r() * 620;
    const y2 = 180 + r() * 520;
    return `<path d="M${x1.toFixed(0)} ${y1.toFixed(0)} C ${(x1 + 140).toFixed(0)} ${y1.toFixed(0)}, ${(x2 - 140).toFixed(0)} ${y2.toFixed(0)}, ${x2.toFixed(0)} ${y2.toFixed(0)}" fill="none" stroke="rgba(252,248,245,.12)" stroke-dasharray="3 6"/>`;
  }).join("");
  return frame(W, H, `${t(80, 80, "STITCHED", { size: 16, weight: 700, fill: FAINT, spacing: 3 })}
  ${t(80, 118, "Eight services, eight bills, eight sets of users and keys.", { size: 22, fill: MUTED })}
  ${wires}${tiles}
  <line x1="800" y1="60" x2="800" y2="${H - 60}" stroke="${LINE}" stroke-dasharray="3 8"/>
  ${t(870, 80, "ONE SYSTEM", { size: 16, weight: 700, fill: ORANGE, spacing: 3 })}
  ${t(870, 118, "One project, one bill, one set of users and rules.", { size: 22, fill: MUTED })}
  <rect x="1035" y="436" width="300" height="70" rx="35" fill="#121214" stroke="rgba(255,106,0,.6)"/>
  ${t(1185, 480, "Pawabase", { size: 30, weight: 700, anchor: "middle" })}`);
}

/** How the ranking was scored: weighted criteria as bars. */
function rubric() {
  const W = 1600;
  const H = 820;
  const rows = [["Completeness out of the box", 25], ["Access control model", 15], ["Developer experience", 15], ["Automation: jobs, flows, email", 15], ["AI readiness", 10], ["Operations: environments, logs, backups", 10], ["Price and lock-in", 10]];
  const x = 120;
  const barX = 760;
  const max = 25;
  const body = rows.map(([label, w], i) => {
    const y = 200 + i * 80;
    const len = (w / max) * 620;
    return `${t(x, y + 26, label, { size: 26, weight: 500 })}
    <rect x="${barX}" y="${y}" width="620" height="36" rx="18" fill="rgba(252,248,245,.05)"/>
    <rect x="${barX}" y="${y}" width="${len.toFixed(0)}" height="36" rx="18" fill="url(#sun)"/>
    ${t(barX + 640, y + 27, `${w}%`, { size: 22, weight: 700, fill: IVORY, mono: true })}`;
  }).join("\n  ");
  return frame(W, H, `${t(x, 92, "HOW WE SCORED", { size: 16, weight: 700, fill: ORANGE, spacing: 3 })}
  ${t(x, 134, "Seven criteria, weighted by what decides whether a backend carries a product past launch.", { size: 24, fill: MUTED })}
  ${body}`);
}

/** Where the work lives: built in, or code you write and run. */
function whereTheWorkLives() {
  const W = 1600;
  const H = 1060;
  const rows = [
    ["Tables and a REST API", "built", "built"],
    ["Access rules", "built", "sql"],
    ["Organizations for your users", "built", "code"],
    ["Visual workflows", "built", "code"],
    ["Transactional email templates", "built", "code"],
    ["AI model gateway and agents", "built", "code"],
    ["Request logs and traces in one place", "built", "built"],
    ["Environments with a reviewed promote", "built", "built"],
  ];
  const label = { built: "Built in", sql: "SQL per table", code: "Your code" };
  const col = (x, kind) => {
    const hot = kind === "built";
    return `<rect x="${x}" y="-26" width="330" height="44" rx="22" fill="${hot ? "rgba(255,106,0,.12)" : "rgba(252,248,245,.04)"}" stroke="${hot ? "rgba(255,106,0,.5)" : "rgba(252,248,245,.12)"}"/>
      ${t(x + 165, 4, label[kind], { size: 19, weight: 600, fill: hot ? "#ffb27a" : MUTED, anchor: "middle" })}`;
  };
  const body = rows.map(([name, a, b], i) => `<g transform="translate(0 ${250 + i * 92})">
    <line x1="100" y1="-50" x2="${W - 100}" y2="-50" stroke="${LINE}"/>
    ${t(110, 8, name, { size: 25, weight: 500 })}
    ${col(780, a)}${col(1160, b)}
  </g>`).join("\n  ");
  return frame(W, H, `${t(110, 90, "WHERE THE WORK LIVES", { size: 16, weight: 700, fill: ORANGE, spacing: 3 })}
  ${t(110, 132, "What a typical SaaS needs, and who carries it.", { size: 24, fill: MUTED })}
  ${pawabaseMark(862, 154, 34)}${t(960, 180, "Pawabase", { size: 26, weight: 700, anchor: "middle" })}
  ${mark("Supabase", 1240, 156, 30)}${t(1340, 180, "Supabase", { size: 26, weight: 700, fill: MUTED, anchor: "middle" })}
  ${body}`);
}

/** An afternoon's plan: five steps on a timeline. */
function afternoon() {
  const W = 1600;
  const H = 640;
  const steps = [["1:00", "Tables", "Model the data"], ["1:40", "Policies", "Who may do what"], ["2:20", "Auth", "Sign-in and orgs"], ["3:10", "Flows", "Invites, email, jobs"], ["4:00", "Ship", "Promote to production"]];
  const x0 = 160;
  const gap = (W - 320) / (steps.length - 1);
  const body = steps.map(([time, name, sub], i) => {
    const x = x0 + i * gap;
    return `<circle cx="${x}" cy="330" r="${i === steps.length - 1 ? 18 : 12}" fill="${i === steps.length - 1 ? ORANGE : "#121214"}" stroke="${ORANGE}" stroke-width="2"/>
    ${t(x, 270, time, { size: 20, weight: 700, fill: ORANGE, anchor: "middle", mono: true })}
    ${t(x, 400, name, { size: 30, weight: 700, anchor: "middle" })}
    ${t(x, 438, sub, { size: 20, fill: MUTED, anchor: "middle" })}`;
  }).join("\n  ");
  return frame(W, H, `${t(160, 110, "ONE AFTERNOON", { size: 16, weight: 700, fill: ORANGE, spacing: 3 })}
  ${t(160, 150, "From an empty project to a backend in production.", { size: 24, fill: MUTED })}
  <line x1="${x0}" y1="330" x2="${W - 160}" y2="330" stroke="rgba(255,106,0,.45)" stroke-dasharray="4 8" stroke-width="2"/>
  ${body}`);
}

/** A policy written once, used by tables, files, channels, flows and routes. */
function oneRule() {
  const W = 1600;
  const H = 760;
  const uses = ["Tables", "Files", "Channels", "Flows", "Routes"];
  const body = uses.map((u, i) => {
    const y = 140 + i * 110;
    return `<path d="M 700 380 C 860 380, 900 ${y + 40}, 1060 ${y + 40}" fill="none" stroke="rgba(255,106,0,.45)" stroke-dasharray="4 6" stroke-width="2"/>
    ${tile(1060, y, 380, 80, u, i === 0 ? "read, write, delete" : i === 1 ? "download, upload" : i === 2 ? "subscribe, publish" : i === 3 ? "who may run it" : "who may call it")}`;
  }).join("\n  ");
  return frame(W, H, `${t(120, 100, "ONE RULE", { size: 16, weight: 700, fill: ORANGE, spacing: 3 })}
  ${t(120, 140, "Write a policy once. Every part that accepts one enforces it.", { size: 24, fill: MUTED })}
  <rect x="120" y="270" width="580" height="220" rx="20" fill="#121214" stroke="rgba(255,106,0,.55)"/>
  ${t(150, 318, "team_member", { size: 24, weight: 700, fill: "#ffb27a", mono: true })}
  ${t(150, 368, "Signed in, and a member of the", { size: 24, fill: IVORY })}
  ${t(150, 404, "organization the row belongs to,", { size: 24, fill: IVORY })}
  ${t(150, 440, "as an owner, admin or member.", { size: 24, fill: IVORY })}
  ${body}`);
}

/** The AI providers a Pawabase environment can connect, for the gateway post. */
const PROVIDERS = [["OpenAI", null], ["Anthropic", "Anthropic"], ["Gemini", "Googlegemini"], ["Mistral", "Mistralai"], ["Groq", null], ["xAI", null]];

/** The gateway post's cover: the title, and the providers' tiles drawing into the Pawabase gateway. */
function gatewayCover() {
  const W = 1600;
  const H = 900;
  const x = 150;
  const tiles = PROVIDERS.map((p, i) => {
    const ty = 168 + i * 96;
    const wire = `<path d="M 1062 ${ty + 40} C 1180 ${ty + 40}, 1200 450, 1300 450" fill="none" stroke="rgba(255,106,0,.45)" stroke-dasharray="4 7" stroke-width="2"/>`;
    return wire + logoTile(980, ty, 82, 82, p, { label: false });
  }).join("");
  return frame(W, H, `${tiles}
  <rect x="1300" y="370" width="160" height="160" rx="36" fill="#121214" stroke="rgba(252,248,245,.14)"/>
  ${pawabaseMark(1330, 400, 100)}
  ${rails(W, H)}
  <circle cx="${x + 6}" cy="172" r="6" fill="${ORANGE}"/>
  ${t(x + 24, 180, "INTRODUCING", { size: 20, weight: 700, fill: ORANGE, spacing: 3 })}
  <text x="${x}" y="292" font-family="${FAMILY}" font-weight="700" font-size="80" fill="url(#silver)" letter-spacing="-3">Call any AI model</text>
  <text x="${x}" y="376" font-family="${FAMILY}" font-weight="700" font-size="80" fill="url(#silver)" letter-spacing="-3">without exposing</text>
  <text x="${x}" y="460" font-family="${FAMILY}" font-weight="700" font-size="80" fill="url(#silver)" letter-spacing="-3">your keys</text>
  ${t(x, 530, "One address for every model. Keys on the server,", { size: 27, fill: MUTED })}
  ${t(x, 570, "your rules on every call.", { size: 27, fill: MUTED })}
  ${t(x, H - 110, "PAWABASE BLOG", { size: 17, weight: 700, fill: FAINT, spacing: 3 })}`);
}

/** Keys in the browser, or keys behind the gateway. */
function keysDiagram() {
  const W = 1600;
  const H = 860;
  const box = (x, y, w, h, title, sub, hot = false) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="18" fill="${hot ? "rgba(255,106,0,.1)" : "#121214"}" stroke="${hot ? "rgba(255,106,0,.6)" : "rgba(252,248,245,.14)"}"/>
    ${t(x + 24, y + 42, title, { size: 23, weight: 700 })}${sub ? t(x + 24, y + 74, sub, { size: 17, fill: MUTED }) : ""}`;
  const arrow = (x1, x2, y, label) => `<line x1="${x1}" y1="${y}" x2="${x2 - 10}" y2="${y}" stroke="rgba(252,248,245,.35)" stroke-width="2" stroke-dasharray="5 7"/><path d="M ${x2 - 12} ${y - 7} L ${x2} ${y} L ${x2 - 12} ${y + 7}" fill="none" stroke="rgba(252,248,245,.5)" stroke-width="2"/>${label ? t((x1 + x2) / 2, y - 16, label, { size: 16, fill: FAINT, anchor: "middle", mono: true }) : ""}`;
  return frame(W, H, `${t(100, 92, "WITHOUT A GATEWAY", { size: 16, weight: 700, fill: FAINT, spacing: 3 })}
  ${t(100, 130, "The provider's key ships inside your app, to every visitor.", { size: 23, fill: MUTED })}
  ${box(100, 180, 360, 110, "Your app", "in the browser or on a phone")}
  ${arrow(460, 1120, 235, "sk-…  (your key, readable by anyone)")}
  ${box(1120, 180, 380, 110, "AI provider", "bills you for every call")}
  <line x1="100" y1="370" x2="1500" y2="370" stroke="${LINE}"/>
  ${t(100, 440, "WITH THE PAWABASE AI GATEWAY", { size: 16, weight: 700, fill: ORANGE, spacing: 3 })}
  ${t(100, 478, "Your app holds a publishable key. The provider's key never leaves the server.", { size: 23, fill: MUTED })}
  ${box(100, 540, 300, 110, "Your app", "publishable key only")}
  ${arrow(400, 560, 595, "")}
  <rect x="560" y="520" width="480" height="270" rx="22" fill="rgba(255,106,0,.08)" stroke="rgba(255,106,0,.6)"/>
  ${pawabaseMark(588, 548, 44)}${t(646, 580, "AI gateway", { size: 26, weight: 700 })}
  ${t(590, 640, "●  Provider keys stay here", { size: 19, fill: IVORY })}
  ${t(590, 682, "●  Your policy decides who may call", { size: 19, fill: IVORY })}
  ${t(590, 724, "●  Every call is recorded", { size: 19, fill: IVORY })}
  ${t(590, 766, "●  Swap providers without a deploy", { size: 19, fill: IVORY })}
  ${arrow(1040, 1180, 655, "")}
  ${PROVIDERS.map((p, i) => logoTile(1190 + (i % 3) * 104, 560 + Math.floor(i / 3) * 104, 90, 90, p, { label: false })).join("")}`);
}

// ── the posts' pictures ───────────────────────────────────────────────────

/** What a BaaS is: your apps on top, the building blocks you call in the middle, what is run for you underneath. */
function baasStack() {
  const W = 1600;
  const H = 860;
  const apps = [["Web app", "React, Vue, Next.js…"], ["Mobile app", "iOS, Android, Flutter"], ["AI agent", "tools over MCP or HTTP"], ["Your server", "any language"]];
  const blocks = [
    ["Database + API", "REST for every table"], ["Sign-in & users", "accounts, orgs, MFA"], ["Access rules", "who may do what"], ["File storage", "uploads, links"],
    ["Realtime", "live updates"], ["Logic & jobs", "flows, schedules"], ["Email", "templates, delivery"], ["Webhooks & events", "in and out"],
  ];
  const appTiles = apps.map(([a, b], i) => tile(120 + i * 345, 150, 325, 96, a, b)).join("");
  const blockTiles = blocks.map(([a, b], i) => tile(150 + (i % 4) * 335, 395 + Math.floor(i / 4) * 120, 315, 100, a, b, { hot: i === 2 })).join("");
  const arrows = apps.map((_, i) => `<line x1="${282 + i * 345}" y1="252" x2="${282 + i * 345}" y2="322" stroke="rgba(255,106,0,.45)" stroke-dasharray="4 6" stroke-width="2"/>`).join("");
  return frame(W, H, `${t(120, 92, "YOUR APPS", { size: 16, weight: 700, fill: FAINT, spacing: 3 })}
  ${appTiles}${arrows}
  <rect x="100" y="330" width="1400" height="320" rx="24" fill="none" stroke="rgba(255,106,0,.5)"/>
  ${t(130, 372, "THE BACKEND AS A SERVICE: YOU CALL IT", { size: 16, weight: 700, fill: ORANGE, spacing: 3 })}
  ${blockTiles}
  <rect x="100" y="690" width="1400" height="120" rx="24" fill="#121214" stroke="rgba(252,248,245,.12)"/>
  ${t(130, 736, "RUN FOR YOU", { size: 16, weight: 700, fill: FAINT, spacing: 3 })}
  ${t(130, 778, "Servers, scaling, backups, security patches, monitoring and uptime: the provider's job, not yours.", { size: 24, fill: MUTED })}`);
}

const POSTS = {
  "2026/11-24-what-is-a-baas": {
    cover: cover({ kicker: "Guide", title: "What is a BaaS?", line: "Backend as a service, explained: what's inside, how it works, and when it's the right choice.", art: `${bars(900, 140, 620, 600, { seed: 44, warmth: 0.16 })}` }),
    "baas-stack": baasStack(),
  },
  "2026/11-16-call-ai-models-without-exposing-your-keys": {
    cover: gatewayCover(),
    keys: keysDiagram(),
  },
  "2026/11-15-introducing-pawabase": {
    cover: cover({ kicker: "Announcing", title: "Introducing Pawabase", line: "The complete backend for anything you build, from a weekend project to the system a company runs on.", art: `${bars(900, 140, 620, 600, { seed: 9 })}` }),
    "one-system": oneSystem(),
    frameworks: frameworks(),
    "stitched-vs-one": stitchedVsOne(),
  },
  "2026/11-13-best-backend-as-a-service-platforms-2026": {
    cover: rankingCover(),
    rubric: rubric(),
    ...Object.fromEntries(PLATFORMS.map((_, i) => [`rank-${String(i + 1).padStart(2, "0")}`, rankCard(i)])),
  },
  "2026/11-11-pawabase-vs-supabase": {
    cover: versusCover(),
    "where-the-work-lives": whereTheWorkLives(),
    "one-rule": oneRule(),
  },
  "2026/11-09-build-a-saas-backend-in-an-afternoon": {
    cover: cover({ kicker: "Guide", title: "A SaaS backend in one afternoon", line: "Tables, rules, sign-in, organizations, email and jobs, then production. One system, start to finish.", art: `${bars(900, 140, 620, 600, { seed: 31, warmth: 0.2 })}` }),
    afternoon: afternoon(),
  },
};

for (const [folder, pictures] of Object.entries(POSTS)) {
  const dir = join(CONTENT, folder, "assets");
  mkdirSync(dir, { recursive: true });
  for (const [name, svg] of Object.entries(pictures)) {
    writeFileSync(join(dir, `${name}.svg`), svg);
    writeFileSync(join(dir, `${name}.png`), png(svg));
  }
  console.log(`${folder}: ${Object.keys(pictures).join(", ")}`);
}
void measure;
