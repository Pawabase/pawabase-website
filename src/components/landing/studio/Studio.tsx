import "./studio.css";

import {
  type CSSProperties,
  type ReactNode,
  useEffect,
  useRef,
  useState,
} from "react";

export function useReducedMotion() {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  return reduced;
}

/** Whether the element is on screen now, and whether it has ever been. */
export function useInView<T extends Element>(margin = "0px 0px -12% 0px") {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);
  const [seen, setSeen] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setInView(entry.isIntersecting);
        if (entry.isIntersecting) setSeen(true);
      },
      { rootMargin: margin, threshold: 0.12 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [margin]);

  return { ref, inView, seen };
}

/**
 * A step counter that only advances while the mockup is on screen and the
 * visitor has not asked for reduced motion. Mockups derive their state from it.
 */
export function useLiveTick(active: boolean, interval: number) {
  const reduced = useReducedMotion();
  const [tick, setTick] = useState(0);

  useEffect(() => {
    if (!active || reduced) return;
    const id = window.setInterval(() => setTick((t) => t + 1), interval);
    return () => window.clearInterval(id);
  }, [active, reduced, interval]);

  return tick;
}

/** A crop of Studio: labelled for assistive tech, hidden from it inside. */
export function Mockup({
  label,
  className = "",
  style,
  children,
}: {
  label: string;
  className?: string;
  style?: CSSProperties;
  children: ReactNode;
}) {
  return (
    <div
      role="img"
      aria-label={label}
      className={`sx ${className}`}
      style={style}
      onPointerMove={(event) => {
        const box = event.currentTarget.getBoundingClientRect();
        event.currentTarget.style.setProperty("--mx", `${event.clientX - box.left}px`);
        event.currentTarget.style.setProperty("--my", `${event.clientY - box.top}px`);
      }}
    >
      <div aria-hidden="true" className="contents">
        {children}
      </div>
    </div>
  );
}

/** Background atmosphere: grid, dots, glow or a beam, placed with --fx-x / --fx-y. */
export function Fx({
  kind,
  className = "",
  style,
}: {
  kind: "grid" | "dots" | "glow" | "beam" | "rings" | "lines" | "hatch";
  className?: string;
  style?: CSSProperties;
}) {
  return <div aria-hidden="true" className={`fx-${kind} ${className}`} style={style} />;
}

/** Rises once into place the first time it scrolls into view. */
export function Rise({
  className = "",
  delay = 0,
  children,
}: {
  className?: string;
  delay?: number;
  children: ReactNode;
}) {
  const { ref, seen } = useInView<HTMLDivElement>();

  return (
    <div
      ref={ref}
      className={`rise ${className}`}
      data-seen={seen ? "" : undefined}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

/** Studio's table. Cells marked data-wide drop out below 700px, where `compact` takes over. */
export function Grid({
  columns,
  compact,
  className = "",
  children,
}: {
  columns: string;
  compact?: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <div
      className={`sx-grid ${className}`}
      style={{ "--sx-cols": columns, "--sx-cols-sm": compact } as CSSProperties}
    >
      {children}
    </div>
  );
}

export function Head({
  cells,
  wide = [],
}: {
  cells: ReactNode[];
  wide?: number[];
}) {
  return (
    <div className="sx-tr sx-th">
      {cells.map((cell, i) => (
        <span key={i} data-wide={wide.includes(i) ? "" : undefined}>
          {cell}
        </span>
      ))}
    </div>
  );
}

export function Initials({
  name,
  tone,
  size = 26,
}: {
  name: string;
  tone: string;
  size?: number;
}) {
  const letters = name
    .split(" ")
    .map((part) => part[0])
    .slice(0, 2)
    .join("");

  return (
    <span
      className="inline-grid flex-none place-items-center rounded-full font-semibold"
      style={{
        width: size,
        height: size,
        background: tone,
        color: "#101315",
        fontSize: size * 0.4,
      }}
    >
      {letters}
    </span>
  );
}

export const PASTELS = {
  lavender: "#F5F3EE",
  peach: "#F5F3EE",
  mint: "#F5F3EE",
  butter: "#F5F3EE",
  sky: "#F5F3EE",
  rose: "#F5F3EE",
};

/* Python and TypeScript share one quiet palette; the keyword list covers both. */
const PY_KEYWORDS = new Set(
  "from import async def await return if else for in and or not None True False with as const let new export function true false null of raise class assert".split(" "),
);
const PY_TOKENS =
  /(#.*$|"(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*'|@[\w.]+|\b\d[\d_]*\b|\b[A-Za-z_]\w*\b)/g;

function pyColor(token: string, next: string) {
  if (token.startsWith("#")) return "var(--sx-faint)";
  if (token.startsWith('"') || token.startsWith("'")) return "#F5F3EE";
  if (token.startsWith("@")) return "var(--sx-brand)";
  if (PY_KEYWORDS.has(token)) return "#F5F3EE";
  if (/^\d/.test(token)) return "#F5F3EE";
  if (next.startsWith("(")) return "#F5F3EE";
  return "#F5F3EE";
}

/** Studio's code view: numbered lines, Geist Mono, quiet colours. */
export function Code({
  lines,
  start = 1,
  highlight,
}: {
  lines: string[];
  start?: number;
  highlight?: number;
}) {
  return (
    <div className="sx-mono py-3 text-[12.5px] leading-[1.85]">
      {lines.map((line, i) => {
        const parts = line.split(PY_TOKENS);
        return (
          <div
            key={i}
            className="flex whitespace-pre pr-6"
            style={
              highlight === i
                ? { background: "var(--sx-brand-soft)" }
                : undefined
            }
          >
            <span className="w-11 flex-none select-none pr-4 text-right text-[var(--sx-faint)] opacity-60">
              {start + i}
            </span>
            <span>
              {parts.map((part, j) =>
                part ? (
                  <span key={j} style={{ color: pyColor(part, parts[j + 1] ?? "") }}>
                    {part}
                  </span>
                ) : null,
              )}
            </span>
          </div>
        );
      })}
    </div>
  );
}
