/**
 * The app icons and manifest, from the brand mark: the sizes phones, browsers and "add to home screen" ask for, a maskable one with
 * room for the round and squircle crops Android applies, Apple's touch icon, small tab favicons, and a single-colour mark for Safari's pinned tabs.
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
// Apple rounds the corners itself, so its icon is square; browser tabs get the bare mark, with no ground.
writeFileSync(`${ROOT}/public/apple-touch-icon.png`, png(icon(180, 0.17, false)));
const bare = (size) => `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 256 256">${body}</svg>`;
writeFileSync(`${ROOT}/public/favicon-16x16.png`, png(bare(16), 16));
writeFileSync(`${ROOT}/public/favicon-32x32.png`, png(bare(32), 32));
// favicon.ico: the same bare mark (no ground) at the sizes Windows and older browsers ask for, each stored as a PNG.
const ico = (sizes) => {
  const images = sizes.map((size) => png(bare(size), size));
  const head = Buffer.alloc(6 + 16 * images.length);
  head.writeUInt16LE(0, 0); head.writeUInt16LE(1, 2); head.writeUInt16LE(images.length, 4);
  let offset = head.length;
  images.forEach((image, i) => {
    const at = 6 + 16 * i, size = sizes[i];
    head.writeUInt8(size >= 256 ? 0 : size, at); head.writeUInt8(size >= 256 ? 0 : size, at + 1);
    head.writeUInt16LE(1, at + 4); head.writeUInt16LE(32, at + 6);
    head.writeUInt32LE(image.length, at + 8); head.writeUInt32LE(offset, at + 12);
    offset += image.length;
  });
  return Buffer.concat([head, ...images]);
};
writeFileSync(`${ROOT}/public/favicon.ico`, ico([16, 32, 48, 64, 128, 256]));

// Safari wants one colour and paints it itself, so every fill becomes plain black.
const flat = body.replace(/<defs>[\s\S]*?<\/defs>/, "").replace(/fill="[^"]*"/g, 'fill="#000"');
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
