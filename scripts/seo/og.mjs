/**
 * The share image: 1200 x 630, the size Facebook, LinkedIn, X, Slack, Discord, WhatsApp, Telegram and iMessage all use.
 * Just the logo, on the site's own rails and dot grid. One image for every page.
 *
 *   node scripts/seo/og.mjs
 *
 * Writes public/og.png (what the networks read; none accept SVG) and public/og.svg (to edit). Both are committed, so a normal build
 * never needs to run this.
 */
import { readFileSync, writeFileSync } from "node:fs";

import { C, ROOT, line, png, rect } from "./lib.mjs";

const W = 1200;
const H = 630;
const logo = readFileSync(`${ROOT}/public/brand/horizontal-dark.svg`, "utf8").replace(/^[\s\S]*?<svg[^>]*>/, "").replace(/<\/svg>\s*$/, "").replace(/<title>.*?<\/title>/, "");

// The logo file is 655 x 128. Centred, about half the image wide.
const logoW = 540;
const scale = logoW / 655;
const logoH = 128 * scale;

/** A small plus where a rail meets a rule: the site's own marker. */
const plus = (x, y) => `<path d="M${x - 7} ${y} h14 M${x} ${y - 7} v14" stroke="${C.line3}" stroke-width="1.5" stroke-linecap="round"/>`;

const RAIL_L = 140;
const RAIL_R = W - 140;
const RULE_T = 110;
const RULE_B = H - 110;

export const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" role="img" aria-label="Pawabase"><title>Pawabase</title>
  <defs><pattern id="dots" width="26" height="26" patternUnits="userSpaceOnUse"><circle cx="1.5" cy="1.5" r="1.1" fill="#fff" fill-opacity=".055"/></pattern></defs>
  ${rect(0, 0, W, H, { fill: C.bg })}
  ${rect(0, 0, W, H, { fill: "url(#dots)" })}
  ${line(RAIL_L, 0, RAIL_L, H, { stroke: C.line2, dash: "3 8", cap: "butt" })}
  ${line(RAIL_R, 0, RAIL_R, H, { stroke: C.line2, dash: "3 8", cap: "butt" })}
  ${line(0, RULE_T, W, RULE_T, { stroke: C.line })}
  ${line(0, RULE_B, W, RULE_B, { stroke: C.line })}
  ${plus(RAIL_L, RULE_T)}${plus(RAIL_R, RULE_T)}${plus(RAIL_L, RULE_B)}${plus(RAIL_R, RULE_B)}
  <g transform="translate(${(W - logoW) / 2} ${(H - logoH) / 2}) scale(${scale})">${logo}</g>
</svg>
`;

if (import.meta.url === `file://${process.argv[1]}`) {
  writeFileSync(`${ROOT}/public/og.svg`, svg);
  writeFileSync(`${ROOT}/public/og.png`, png(svg, W));
  console.log("public/og.png and public/og.svg written.");
}
