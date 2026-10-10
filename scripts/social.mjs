// Renders public/social.png (1200x630): the mark, the wordmark and the headline on the light page colour. No screenshots.
import { chromium } from "playwright";
import { readFile } from "node:fs/promises";
const uri = async (file, type) => `data:${type};base64,${(await readFile(file)).toString("base64")}`;
const [font, mark] = await Promise.all([uri("public/fonts/jakarta.woff2", "font/woff2"), uri("public/brand/mark.svg", "image/svg+xml")]);
const browser = await chromium.launch({ channel: "chrome", headless: true });
try {
  const page = await browser.newPage({ viewport: { width: 1200, height: 630 }, deviceScaleFactor: 1 });
  await page.setContent(`<html><head><style>
    @font-face{font-family:Jakarta;src:url(${font}) format("woff2");font-weight:200 800}
    *{box-sizing:border-box}
    body{margin:0;width:1200px;height:630px;background:#f5f3ee;color:#151719;font-family:Jakarta,system-ui,sans-serif;position:relative;border:1px solid #d9d5cb}
    .brand{position:absolute;left:80px;top:72px;display:flex;align-items:center;gap:14px;font-size:34px;font-weight:700;letter-spacing:-.04em}
    .brand img{width:44px;height:44px}
    h1{position:absolute;left:80px;top:200px;margin:0;width:960px;font-size:104px;line-height:.98;letter-spacing:-.05em;font-weight:700}
    p{position:absolute;left:80px;bottom:72px;margin:0;font-size:30px;color:#5a5f63}
  </style></head><body>
    <div class="brand"><img src="${mark}" alt=""/>pawabase</div>
    <h1>Everything your application needs.</h1>
    <p>Identity, data, files, logic and automation. Managed or self-hosted.</p>
  </body></html>`);
  await page.evaluate(() => document.fonts.ready);
  await page.screenshot({ path: "public/social.png" });
  console.log("public/social.png");
} finally {
  await browser.close();
}
