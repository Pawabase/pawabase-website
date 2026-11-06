/**
 * The app icons and manifest, from the brand mark: the sizes phones, browsers and "add to home screen" ask for, a maskable one with
 * room for the round and squircle crops Android applies, and a single-colour mark for Safari's pinned tabs.
 *
 *   node scripts/seo/icons.mjs
 */
import { readFileSync, writeFileSync } from "node:fs";

import { SITE } from "../../src/seo/site.ts";
import { C, ROOT, png } from "./lib.mjs";

const mark = readFileSync(`${ROOT}/public/brand/mark.svg`, "utf8");
const body = mark.replace(/^[\s\S]*?<svg[^>]*>/, "").replace(/<\/svg>\s*$/, "").replace(/<title>.*?<\/title>/, "");

/** The mark on the brand's dark ground; `inset` leaves room round it (a maskable icon's safe zone is the middle 80%). */
const icon = (size, inset, rounded) => {
  const scale = (size * (1 - inset * 2)) / 256;
  const at = size * inset;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}"><rect width="${size}" height="${size}" rx="${rounded ? size * 0.22 : 0}" fill="${C.bg}"/><g transform="translate(${at} ${at}) scale(${scale})">${body}</g></svg>`;
};

writeFileSync(`${ROOT}/public/icon-192.png`, png(icon(192, 0.17, true)));
writeFileSync(`${ROOT}/public/icon-512.png`, png(icon(512, 0.17, true)));
writeFileSync(`${ROOT}/public/icon-maskable-512.png`, png(icon(512, 0.22, false)));

// Safari wants one colour and paints it itself, so every gradient becomes plain black.
const flat = body.replace(/<defs>[\s\S]*?<\/defs>/, "").replace(/fill="url\([^)]*\)"/g, 'fill="#000"');
writeFileSync(`${ROOT}/public/safari-pinned-tab.svg`, `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256">${flat}</svg>\n`);

const manifest = {
  name: "Pawabase",
  short_name: "Pawabase",
  description: SITE.description,
  id: "/",
  start_url: "/",
  scope: "/",
  display: "standalone",
  background_color: C.bg,
  theme_color: SITE.themeColor,
  lang: SITE.language,
  categories: ["developer tools", "productivity", "business"],
  icons: [
    { src: "/icon-192.png", sizes: "192x192", type: "image/png", purpose: "any" },
    { src: "/icon-512.png", sizes: "512x512", type: "image/png", purpose: "any" },
    { src: "/icon-maskable-512.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
    { src: "/favicon.svg", sizes: "any", type: "image/svg+xml", purpose: "any" },
  ],
};
writeFileSync(`${ROOT}/public/site.webmanifest`, `${JSON.stringify(manifest, null, 2)}\n`);
console.log("icons, pinned-tab mark and manifest written.");
