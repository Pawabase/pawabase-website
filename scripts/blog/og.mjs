/**
 * A blog post's share card: 1200 x 630, in the site's own share image language (the dot grid, dashed rails, rules with plus marks),
 * with the post's topic, its title large, and who wrote it, when and how long it takes. Written by the build next to the post's page
 * (dist/blog/<slug>/og.png), so nothing has to be drawn by hand or committed.
 */
import { C, circle, esc, fit, line, png, rect, text } from "../seo/lib.mjs";

const W = 1200;
const H = 630;
const RAIL_L = 80;
const RAIL_R = W - 80;
const RULE_T = 70;
const RULE_B = H - 70;

const plus = (x, y) => `<path d="M${x - 7} ${y} h14 M${x} ${y - 7} v14" stroke="${C.line3}" stroke-width="1.5" stroke-linecap="round"/>`;

const DAY = new Intl.DateTimeFormat("en", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" });

/** The card as SVG. ``post`` is an entry of src/content/blog.json; ``authors`` its authors' names. */
export function cardSvg(post, authors) {
  const x = RAIL_L + 64;
  const width = RAIL_R - x - 64;
  const title = fit(post.title, { sizes: [68, 60, 54, 48, 42], weight: 700, max: width, lines: 3, spacing: -1.5 });
  const lineHeight = Math.round(title.size * 1.08);
  const top = 250 - ((title.lines.length - 1) * lineHeight) / 2;
  const topic = (post.category ?? post.tags[0] ?? "Blog").toUpperCase();
  const meta = [authors.join(", "), DAY.format(new Date(`${post.date}T00:00:00Z`)), `${post.readingTime} min read`].join("   ·   ");
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" role="img" aria-label="${esc(post.title)}">
  <defs>
    <pattern id="dots" width="26" height="26" patternUnits="userSpaceOnUse"><circle cx="1.5" cy="1.5" r="1.1" fill="#fff" fill-opacity=".05"/></pattern>
    <radialGradient id="glow" cx="88%" cy="8%" r="60%"><stop offset="0" stop-color="${C.brand}" stop-opacity=".22"/><stop offset="1" stop-color="${C.brand}" stop-opacity="0"/></radialGradient>
  </defs>
  ${rect(0, 0, W, H, { fill: C.bg })}
  ${rect(0, 0, W, H, { fill: "url(#dots)" })}
  ${rect(0, 0, W, H, { fill: "url(#glow)" })}
  ${line(RAIL_L, 0, RAIL_L, H, { stroke: C.line2, dash: "3 8", cap: "butt" })}
  ${line(RAIL_R, 0, RAIL_R, H, { stroke: C.line2, dash: "3 8", cap: "butt" })}
  ${line(0, RULE_T, W, RULE_T, { stroke: C.line })}
  ${line(0, RULE_B, W, RULE_B, { stroke: C.line })}
  ${plus(RAIL_L, RULE_T)}${plus(RAIL_R, RULE_T)}${plus(RAIL_L, RULE_B)}${plus(RAIL_R, RULE_B)}
  ${circle(x + 5, 132, 5, { fill: C.brand })}
  ${text(x + 20, 137, topic, { size: 17, weight: 700, fill: C.brand, spacing: 2.2 })}
  ${text(RAIL_R - 64, 137, "PAWABASE BLOG", { size: 15, weight: 700, fill: C.faint, spacing: 2.2, anchor: "end" })}
  ${title.lines.map((l, i) => text(x, top + i * lineHeight, l, { size: title.size, weight: 700, fill: C.text, spacing: -1.5 })).join("\n  ")}
  ${line(x, RULE_B - 88, RAIL_R - 64, RULE_B - 88, { stroke: C.line2 })}
  ${text(x, RULE_B - 44, meta, { size: 20, weight: 500, fill: C.muted })}
</svg>`;
}

/** The card as PNG (what every network reads). */
export const cardPng = (post, authors) => png(cardSvg(post, authors), W);
