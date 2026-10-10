// Screenshot a page for design review.
//   node scripts/shot.mjs /products/auth [--w 1440] [--theme light|dark] [--out artifacts/x.png] [--y 0 --h 900] [--full] [--hover x,y] [--open products]
import { chromium } from "playwright";
import { mkdir } from "node:fs/promises";

const arg = (name, fallback) => {
  const i = process.argv.indexOf(`--${name}`);
  return i > -1 ? process.argv[i + 1] : fallback;
};
const path = process.argv[2]?.startsWith("--") ? "/" : (process.argv[2] ?? "/");
const width = Number(arg("w", 1440));
const theme = arg("theme", "light");
const height = Number(arg("vh", width < 600 ? 844 : 900));
const out = arg("out", `artifacts/shot-${path.replace(/\W+/g, "_") || "home"}-${width}-${theme}.png`);
const origin = process.env.CHECK_URL || "http://127.0.0.1:4173";

await mkdir("artifacts", { recursive: true });
const browser = await chromium.launch({ channel: "chrome", headless: true });
const context = await browser.newContext({ viewport: { width, height }, reducedMotion: process.argv.includes("--motion") ? "no-preference" : "reduce" });
await context.addInitScript((t) => localStorage.setItem("pawabase.website.theme", t), theme);
const page = await context.newPage();
const errors = [];
page.on("pageerror", (e) => errors.push(e.message));
page.on("console", (m) => m.type() === "error" && errors.push(m.text()));
await page.goto(origin + path, { waitUntil: "networkidle" });
await page.evaluate(() => document.fonts.ready);
if (process.argv.includes("--scroll")) {
  await page.evaluate(async () => {
    for (let y = 0; y < document.body.scrollHeight; y += 500) {
      scrollTo(0, y);
      await new Promise((r) => setTimeout(r, 60));
    }
    scrollTo(0, 0);
  });
}
const open = arg("open");
if (open) await page.getByRole("button", { name: new RegExp(open, "i") }).first().click();
const hover = arg("hover");
if (hover) {
  const [x, y] = hover.split(",").map(Number);
  await page.mouse.move(x, y, { steps: 6 });
  await page.waitForTimeout(900);
}
await page.waitForTimeout(500);
const y = Number(arg("y", 0));
const h = arg("h");
if (process.argv.includes("--full")) await page.screenshot({ path: out, fullPage: true });
else if (h) {
  await page.evaluate((top) => scrollTo(0, top), y);
  await page.waitForTimeout(400);
  await page.screenshot({ path: out });
} else await page.screenshot({ path: out });
console.log(out, errors.length ? `ERRORS: ${errors.join(" | ")}` : "no console errors");
await browser.close();
