import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

import { currencyName, useCurrency } from "@/lib/currency";

const WIDTH = 280;
const EDGE = 8;
const GAP = 6;

type Place = { left: number; maxHeight: number; top?: number; bottom?: number };

/**
 * Prices are in naira; this shows the equivalent in another currency: a small button that opens a searchable list. The list is drawn on the page
 * itself rather than inside the plan cards (which would paint over it) and sits above the button when there is no room below, so it can always be
 * reached and scrolled.
 */
export function CurrencyPicker() {
  const { currency, options, choose, converted, base } = useCurrency();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [place, setPlace] = useState<Place | null>(null);
  const button = useRef<HTMLButtonElement>(null);
  const menu = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const away = (event: MouseEvent) => {
      const target = event.target as Node;
      if (!button.current?.contains(target) && !menu.current?.contains(target)) setOpen(false);
    };
    const key = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        button.current?.focus();
      }
    };
    document.addEventListener("mousedown", away);
    document.addEventListener("keydown", key);
    return () => {
      document.removeEventListener("mousedown", away);
      document.removeEventListener("keydown", key);
    };
  }, [open]);

  useLayoutEffect(() => {
    if (!open || !button.current) {
      setPlace(null);
      return;
    }
    const run = () => {
      if (!button.current) return;
      const anchor = button.current.getBoundingClientRect();
      const below = window.innerHeight - anchor.bottom - GAP - EDGE;
      const above = anchor.top - GAP - EDGE;
      const up = below < 240 && above > below;
      const left = Math.min(Math.max(EDGE, anchor.left), Math.max(EDGE, window.innerWidth - WIDTH - EDGE));
      setPlace({ left, maxHeight: Math.max(160, Math.min(380, up ? above : below)), ...(up ? { bottom: window.innerHeight - anchor.top + GAP } : { top: anchor.bottom + GAP }) });
    };
    run();
    window.addEventListener("resize", run);
    window.addEventListener("scroll", run, true);
    return () => {
      window.removeEventListener("resize", run);
      window.removeEventListener("scroll", run, true);
    };
  }, [open]);

  const needle = query.trim().toLowerCase();
  const shown = options.filter((code) => `${code} ${currencyName(code)}`.toLowerCase().includes(needle));
  return (
    <div className="relative flex items-center gap-3">
      <button
        ref={button}
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => setOpen(!open)}
        className="inline-flex h-9 items-center gap-2 rounded-full bg-card px-4 text-[13px] font-semibold tracking-[0.02em] text-text ring-1 ring-white/[0.1] transition hover:ring-brand/50"
      >
        {currency}
        <svg width="12" height="12" viewBox="0 0 12 12" aria-hidden="true">
          <path d="M2.5 4.5 6 8l3.5-3.5" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
      {converted ? <span className="text-[12.5px] text-faint">Charged in naira ({base})</span> : null}
      {open
        ? createPortal(
            <div
              ref={menu}
              role="listbox"
              aria-label="Currency"
              style={{ position: "fixed", zIndex: 1000, width: WIDTH, maxWidth: "calc(100vw - 16px)", visibility: place ? "visible" : "hidden", ...place }}
              className="flex flex-col gap-2 overflow-hidden rounded-[10px] bg-card p-2 shadow-2xl ring-1 ring-white/[0.1]"
            >
              <input
                autoFocus
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search currency"
                className="h-9 w-full shrink-0 rounded-lg bg-white/[0.05] px-3 text-[13px] text-text outline-none placeholder:text-faint focus:ring-1 focus:ring-brand/60"
              />
              <div className="overflow-y-auto overscroll-contain" data-lenis-prevent style={{ maxHeight: Math.max(120, (place?.maxHeight ?? 320) - 60) }}>
                {shown.map((code) => (
                  <button
                    key={code}
                    type="button"
                    role="option"
                    aria-selected={code === currency}
                    onClick={() => {
                      choose(code);
                      setOpen(false);
                      setQuery("");
                    }}
                    className={`flex w-full items-baseline gap-3 rounded-lg px-3 py-2 text-left text-[13px] hover:bg-white/[0.06] ${code === currency ? "bg-brand/[0.1]" : ""}`}
                  >
                    <b className="w-10 shrink-0 font-semibold text-text">{code}</b>
                    <span className="truncate text-muted">{currencyName(code)}</span>
                  </button>
                ))}
                {shown.length === 0 ? <div className="p-3 text-center text-[13px] text-muted">No match</div> : null}
              </div>
            </div>,
            document.body,
          )
        : null}
    </div>
  );
}
