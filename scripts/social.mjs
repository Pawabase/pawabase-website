// Renders public/media/social.png (1200x630): the Cloud Kingdom, the wordmark and the headline.
import { chromium } from "playwright";
import { readFile } from "node:fs/promises";
const uri = async (file, type) => `data:${type};base64,${(await readFile(file)).toString("base64")}`;
const [hero, font, mark, mascot] = await Promise.all([
  uri("public/images/world/hero.webp", "image/webp"),
  uri("public/fonts/jakarta.woff2", "font/woff2"),
  uri("public/favicon.svg", "image/svg+xml"),
  uri("public/images/mascot/laptop.webp", "image/webp"),
]);
const browser = await chromium.launch({ channel: "chrome", headless: true });
try {
  const page = await browser.newPage({ viewport: { width: 1200, height: 630 }, deviceScaleFactor: 1 });
  await page.setContent(`<html><head><style>
    @font-face{font-family:Jakarta;src:url(${font}) format("woff2");font-weight:200 800}
    *{box-sizing:border-box}
    body{margin:0;width:1200px;height:630px;position:relative;overflow:hidden;background:#0b0b19;color:#fff;font-family:Jakarta,system-ui,sans-serif}
    .bg{position:absolute;inset:0;background:url(${hero}) 68% 40%/cover}
    .shade{position:absolute;inset:0;background:linear-gradient(90deg,#0b0b19f2 0%,#0b0b19b0 38%,#0b0b1922 70%),linear-gradient(0deg,#0b0b19cc,transparent 40%)}
    .brand{position:absolute;left:72px;top:60px;display:flex;align-items:center;gap:12px;font-size:30px;font-weight:800;letter-spacing:-.06em}
    .brand img{width:44px;height:44px}
    h1{position:absolute;left:72px;top:190px;margin:0;width:640px;font-size:92px;line-height:.95;font-weight:700;letter-spacing:-.055em}
    .mascot{position:absolute;right:90px;bottom:56px;width:260px}
  </style></head><body><div class="bg"></div><div class="shade"></div>
  <div class="brand"><img src="${mark}" alt="">pawabase</div>
  <h1>The backend your product starts on.</h1>
  <img class="mascot" src="${mascot}" alt=""></body></html>`);
  await page.evaluate(() => document.fonts.ready);
  await page.waitForTimeout(400);
  await page.screenshot({ path: "public/media/social.png" });
} finally {
  await browser.close();
}
