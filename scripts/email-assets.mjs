/**
 * The images Pawabase Cloud's emails load from this site (public/email/): the wordmark for their dark footer, and the social
 * marks beside it. Emails link to them by address rather than attaching them, so nothing shows up as an attachment.
 *
 *   node scripts/email-assets.mjs
 */
import { readFileSync, writeFileSync } from "node:fs";

import { Resvg } from "@resvg/resvg-js";

const ROOT = new URL("../", import.meta.url);
const out = (name) => new URL(`public/email/${name}`, ROOT);
const png = (svg, width) => new Resvg(svg, { fitTo: { mode: "width", value: width } }).render().asPng();

// the wordmark, light on dark, 120 px at 2x
writeFileSync(out("logo.png"), png(readFileSync(new URL("public/brand/horizontal-dark.svg", ROOT), "utf8"), 240));

// social marks: ivory at 60% on the footer band, 20 px at 2x
const ICONS = new URL("node_modules/@icons-pack/react-simple-icons/icons/", ROOT);
const simple = (name) => readFileSync(new URL(`Si${name}.mjs`, ICONS), "utf8").match(/\bd: "([^"]+)"/)[1];
const LINKEDIN = "M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.13 1.45-2.13 2.94v5.67H9.35V9h3.42v1.56h.05c.48-.9 1.65-1.85 3.4-1.85 3.64 0 4.31 2.4 4.31 5.51v6.23zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56v11.45z";
const marks = { x: simple("X"), github: simple("Github"), linkedin: LINKEDIN };
for (const [name, d] of Object.entries(marks)) {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="${d}" fill="#9c9998"/></svg>`;
  writeFileSync(out(`${name}.png`), png(svg, 40));
}
console.log("public/email: logo.png, x.png, github.png, linkedin.png");
