import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";

/** Marks elements with [data-reveal] as visible once they scroll into view. */
export function useRevealObserver() {
  useEffect(() => {
    document.documentElement.classList.add("js");
    const items = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));
    if (!("IntersectionObserver" in window)) { items.forEach(i => i.classList.add("in")); return; }
    const io = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } }),
      { threshold: 0.12, rootMargin: "0px 0px -6% 0px" },
    );
    items.forEach(i => io.observe(i));
    return () => io.disconnect();
  }, []);
}

/** Writes how far a section has travelled through the viewport (0..1) to --p. */
export function useScrollProgress<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let raf = 0;
    const update = () => {
      raf = 0;
      const r = el.getBoundingClientRect();
      const total = r.height + innerHeight;
      el.style.setProperty("--p", String(Math.min(1, Math.max(0, (innerHeight - r.top) / total))));
    };
    const on = () => { if (!raf) raf = requestAnimationFrame(update); };
    update();
    addEventListener("scroll", on, { passive: true });
    addEventListener("resize", on);
    return () => { removeEventListener("scroll", on); removeEventListener("resize", on); cancelAnimationFrame(raf); };
  }, []);
  return ref;
}

export function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(true);
  useEffect(() => {
    const m = matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduced(m.matches);
    sync(); m.addEventListener("change", sync);
    return () => m.removeEventListener("change", sync);
  }, []);
  return reduced;
}

/** True while the element is on screen. */
export function useInView<T extends HTMLElement>(margin = "0px") {
  const ref = useRef<T>(null);
  const [seen, setSeen] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el || !("IntersectionObserver" in window)) return;
    const io = new IntersectionObserver(([e]) => setSeen(e.isIntersecting), { rootMargin: margin });
    io.observe(el);
    return () => io.disconnect();
  }, [margin]);
  return [ref, seen] as const;
}

/** Words that light up as the paragraph scrolls through the viewport. */
export function WordReveal({ text, className = "" }: { text: string; className?: string }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const words = text.split(" ");
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const spans = Array.from(el.querySelectorAll<HTMLElement>("[data-w]"));
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) { spans.forEach(s => s.classList.add("lit")); return; }
    let raf = 0;
    const update = () => {
      raf = 0;
      const r = el.getBoundingClientRect();
      const t = (innerHeight * 0.82 - r.top) / (r.height + innerHeight * 0.18);
      const n = Math.round(Math.min(1, Math.max(0, t)) * spans.length * 1.05);
      spans.forEach((s, i) => s.classList.toggle("lit", i < n));
    };
    const on = () => { if (!raf) raf = requestAnimationFrame(update); };
    update();
    addEventListener("scroll", on, { passive: true });
    addEventListener("resize", on);
    return () => { removeEventListener("scroll", on); removeEventListener("resize", on); cancelAnimationFrame(raf); };
  }, [text]);
  return (
    <p ref={ref} className={`word-reveal ${className}`}>
      {words.map((w, i) => <span key={i} data-w className="lit-ssr">{w}{" "}</span>)}
    </p>
  );
}

export function Reveal({ children, as: Tag = "div", delay = 0, kind, className = "", style }: { children: ReactNode; as?: any; delay?: number; kind?: "fade" | "mask"; className?: string; style?: CSSProperties }) {
  return <Tag data-reveal={kind ?? ""} className={className} style={{ ...style, "--d": `${delay}ms` } as CSSProperties}>{children}</Tag>;
}
