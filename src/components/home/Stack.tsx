import { useEffect, useState, type ComponentType } from "react";
import {
  SiAngular,
  SiAnthropic,
  SiAstro,
  SiBun,
  SiCursor,
  SiDeno,
  SiDjango,
  SiExpo,
  SiFastapi,
  SiFlutter,
  SiGo,
  SiGooglegemini,
  SiKotlin,
  SiMeta,
  SiMistralai,
  SiNextdotjs,
  SiNodedotjs,
  SiNuxt,
  SiPython,
  SiReact,
  SiRemix,
  SiSolid,
  SiSvelte,
  SiSwift,
  SiTypescript,
  SiVuedotjs,
} from "@icons-pack/react-simple-icons";

import { Arrow, Lines, Rule, SectionHead } from "./Home";
import "./stack.css";
import { DOCS } from "@/lib/links";

/*
 * Works with what you already use: a 9 × 3 grid of logos running rail to rail, divided by dashed lines with crosses
 * where they meet; web frameworks along the top, languages and runtimes through the middle round Pawabase, mobile and
 * AI along the bottom. A cell lights up now and then; hovering one names it. Everything here reaches Pawabase through
 * the REST API, the JavaScript or Python SDK, the AI gateway, or MCP.
 */

type Logo = ComponentType<{ size?: number; color?: string }>;
const CORE = "core";
const CELLS: ([Logo, string] | typeof CORE)[] = [
  [SiReact, "React"], [SiNextdotjs, "Next.js"], [SiVuedotjs, "Vue"], [SiNuxt, "Nuxt"], [SiSvelte, "Svelte"], [SiAngular, "Angular"], [SiAstro, "Astro"], [SiRemix, "Remix"], [SiSolid, "Solid"],
  [SiTypescript, "TypeScript"], [SiNodedotjs, "Node.js"], [SiBun, "Bun"], [SiDeno, "Deno"], CORE, [SiPython, "Python"], [SiDjango, "Django"], [SiFastapi, "FastAPI"], [SiGo, "Go"],
  [SiSwift, "Swift"], [SiKotlin, "Kotlin"], [SiFlutter, "Flutter"], [SiExpo, "Expo"], [SiAnthropic, "Anthropic"], [SiGooglegemini, "Gemini"], [SiMistralai, "Mistral"], [SiMeta, "Llama"], [SiCursor, "Cursor"],
];
const COLS = 9;

const v = Array.from({ length: COLS - 1 }, (_, k) => [(k + 1) / COLS, 0, 1] as [number, number, number]);
const crossings = v.flatMap(([x]) => [[x, 1 / 3], [x, 2 / 3]] as [number, number][]);

function Cell({ logo: Logo, name, lit }: { logo: Logo; name: string; lit: boolean }) {
  return (
    <li className={`lg-cell ${lit ? "lit" : ""}`}>
      <Logo size={26} color="currentColor" />
      <span className="lg-name">{name}</span>
    </li>
  );
}

export function Stack() {
  const [lit, setLit] = useState<number[]>([]);

  // now and then a cell lights up, three at most at a time
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timer = window.setInterval(() => {
      setLit((on) => {
        let next = Math.floor(Math.random() * CELLS.length);
        while (CELLS[next] === CORE || on.includes(next)) next = (next + 1) % CELLS.length;
        return [...on, next].slice(-3);
      });
    }, 900);
    return () => window.clearInterval(timer);
  }, []);

  return (
    <section className="ix-section" aria-labelledby="stack-title" data-plain="">
      <Rule />
      <SectionHead id="stack-title" title="Works with what you already use">
        <a href={DOCS} className="ix-btn caps">Read the docs <Arrow /></a>
      </SectionHead>
      <div className="ix-panel lg-panel" data-reveal="up">
        <Rule />
        <Lines v={v} h={[[1 / 3, 0, 1], [2 / 3, 0, 1]]} marks={[...crossings, ...v.flatMap(([x]) => [[x, 0, "sq"], [x, 1, "sq"]] as [number, number, "sq"][]), [0, 1 / 3, "sq"], [0, 2 / 3, "sq"], [1, 1 / 3, "sq"], [1, 2 / 3, "sq"]]} />
        <ul className="lg-grid" aria-label="Frameworks, languages and AI tools that work with Pawabase">
          {CELLS.map((cell, i) =>
            cell === CORE ? (
              <li key="core" className="lg-cell lg-core" aria-label="Pawabase">
                <span className="lg-core-mark"><i /></span>
              </li>
            ) : (
              <Cell key={cell[1]} logo={cell[0]} name={cell[1]} lit={lit.includes(i)} />
            ),
          )}
        </ul>
      </div>
    </section>
  );
}
