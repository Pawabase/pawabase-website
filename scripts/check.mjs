// Verifies the built homepage: structure, layout, links, motion preferences and accessibility,
// at desktop, tablet and mobile widths in both themes. Run against a preview or dev server.
import { chromium } from "playwright";
import AxeBuilder from "@axe-core/playwright";
import assert from "node:assert/strict";
import { mkdir, readFile, writeFile } from "node:fs/promises";

const browser = await chromium.launch({ channel: "chrome", headless: true });
const origin = process.env.CHECK_URL || "http://localhost:4173";
const report = [];
const SECTIONS = ["proposition", "studio", "build", "platform", "developers", "why", "ownership", "ecosystem", "open", "explore"];
await mkdir("artifacts", { recursive: true });
try {
  for (const width of [1440, 768, 390]) {
    for (const theme of ["light", "dark"]) {
      const context = await browser.newContext({ viewport: { width, height: width < 600 ? 844 : 900 }, reducedMotion: "reduce" });
      await context.addInitScript(value => localStorage.setItem("pawabase.website.theme", value), theme);
      const page = await context.newPage();
      const errors = [];
      page.on("pageerror", e => errors.push(e.message));
      page.on("console", m => { if (m.type() === "error") errors.push(m.text()); });
      await page.goto(origin, { waitUntil: "networkidle" });
      await page.evaluate(() => document.fonts.ready);

      assert.equal(await page.locator("h1").count(), 1, "exactly one h1");
      assert.equal(await page.locator("main > section").count(), 12, "hero plus eleven sections, then the closing footer");
      assert.equal(await page.locator("footer.close").count(), 1);
      for (const id of SECTIONS) assert.equal(await page.locator(`#${id}`).count(), 1, `section #${id}`);
      assert.equal(await page.locator("html").getAttribute("data-theme"), theme);
      assert(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), "Horizontal overflow");
      const broken = await page.evaluate(() => [...document.querySelectorAll('a[href^="#"]')].filter(a => a.getAttribute("href").length > 1 && !document.getElementById(a.getAttribute("href").slice(1))).map(a => a.getAttribute("href")));
      assert.deepEqual(broken, [], "broken in-page anchors");
      // Every image must load.
      await page.evaluate(async () => { for (let y = 0; y < document.body.scrollHeight; y += 600) { scrollTo(0, y); await new Promise(r => setTimeout(r, 40)); } scrollTo(0, 0); });
      await page.waitForTimeout(600);
      const missing = await page.evaluate(() => [...document.images].filter(i => i.complete && i.naturalWidth === 0).map(i => i.src));
      assert.deepEqual(missing, [], "images failed to load");
      // The Studio switcher changes the view and reports its state.
      const tab = page.locator(".show-tabs button").nth(2);
      await tab.click();
      assert.equal(await tab.getAttribute("aria-pressed"), "true");
      // Capability, scene and start-path selectors respond.
      await page.locator(".explore-tabs button").nth(2).click();
      assert((await page.locator(".explore-pane code").innerText()).includes("pawabase deploy"));
      // Mobile navigation opens and closes.
      if (width < 900) {
        await page.locator(".menu-toggle").click();
        assert.equal(await page.locator(".menu-toggle").getAttribute("aria-expanded"), "true");
        await page.keyboard.press("Escape");
        assert.equal(await page.locator(".menu-toggle").getAttribute("aria-expanded"), "false");
      }
      await page.screenshot({ path: `artifacts/home-${width}-${theme}.png`, fullPage: true });
      const result = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag21aa"]).analyze();
      report.push({ width, theme, errors, accessibility: result.violations.map(v => ({ id: v.id, nodes: v.nodes.slice(0, 4).map(n => ({ target: n.target, summary: n.failureSummary })) })) });
      await context.close();
    }
  }
  const html = await readFile("dist/index.html", "utf8");
  for (const needle of ["The backend your product starts on", "application/ld+json", "og:image", 'rel="canonical"', "twitter:card"]) assert(html.includes(needle), `Missing prerender: ${needle}`);
  await writeFile("artifacts/checks.json", JSON.stringify(report, null, 2));
  console.log(JSON.stringify(report.map(r => ({ ...r, accessibility: r.accessibility.map(a => a.id + " x" + a.nodes.length) })), null, 1));
  assert(report.every(r => !r.errors.length && !r.accessibility.length), "Check artifacts/checks.json");
  console.log("All checks passed.");
} finally {
  await browser.close();
}
