// Checks every page of a running build (CHECK_URL, default http://127.0.0.1:4173), in both themes at three widths:
// console errors, horizontal overflow, axe, forbidden styles (shadow, filter, backdrop-filter, gradient), banned words, broken internal links.
import { chromium } from "playwright";
import AxeBuilder from "@axe-core/playwright";

const origin = process.env.CHECK_URL || "http://127.0.0.1:4173";
const paths = ["/"];
const banned = /\b(seamless(ly)?|powerful|revolutionary|supercharge|unlock|effortless(ly)?|next-generation|game-changing)\b/i;
const problems = [];
const browser = await chromium.launch({ channel: "chrome", headless: true });
const seen = new Set();
for (const theme of ["light", "dark"]) {
  for (const width of [1440, 768, 390]) {
    const ctx = await browser.newContext({ viewport: { width, height: 900 }, reducedMotion: "reduce" });
    await ctx.addInitScript((t) => localStorage.setItem("pawabase.website.theme", t), theme);
    for (const path of paths) {
      const page = await ctx.newPage();
      const tag = `${path} ${theme} ${width}`;
      page.on("pageerror", (e) => problems.push(`${tag}: ${e.message}`));
      page.on("console", (m) => m.type() === "error" && problems.push(`${tag}: console ${m.text()}`));
      await page.goto(origin + path, { waitUntil: "networkidle" });
      const r = await page.evaluate(({ bannedSrc }) => {
        const out = { overflow: document.documentElement.scrollWidth - innerWidth, bad: [], words: [], links: [] };
        for (const el of document.querySelectorAll("body *")) {
          const s = getComputedStyle(el);
          if (s.boxShadow !== "none") out.bad.push(`${el.tagName}.${el.className} box-shadow`);
          if (s.textShadow !== "none") out.bad.push(`${el.tagName}.${el.className} text-shadow`);
          if (s.filter !== "none") out.bad.push(`${el.tagName}.${el.className} filter`);
          if (s.backdropFilter && s.backdropFilter !== "none") out.bad.push(`${el.tagName}.${el.className} backdrop-filter`);
          if (/gradient/.test(s.backgroundImage)) out.bad.push(`${el.tagName}.${el.className} gradient`);
        }
        const m = document.body.innerText.match(new RegExp(bannedSrc, "i"));
        if (m) out.words.push(m[0]);
        out.links = [...document.querySelectorAll("a[href]")].map((a) => a.getAttribute("href"));
        return out;
      }, { bannedSrc: banned.source });
      if (r.overflow > 0) problems.push(`${tag}: horizontal overflow ${r.overflow}px`);
      for (const b of new Set(r.bad)) problems.push(`${tag}: ${b}`);
      for (const w of r.words) problems.push(`${tag}: banned word "${w}"`);
      for (const l of r.links) if (l.startsWith("/")) seen.add(l.split("#")[0] || "/");
      if (width === 1440) {
        const axe = await new AxeBuilder({ page }).analyze();
        for (const v of axe.violations) problems.push(`${tag}: axe ${v.id} (${v.nodes.length}) ${v.help}`);
      }
      await page.close();
    }
    await ctx.close();
  }
}
for (const l of seen) {
  const res = await fetch(origin + l);
  if (!res.ok) problems.push(`link ${l}: ${res.status}`);
}
await browser.close();
if (problems.length) {
  console.log([...new Set(problems)].join("\n"));
  process.exit(1);
}
console.log(`ok: ${paths.length} pages × 2 themes × 3 widths`);
