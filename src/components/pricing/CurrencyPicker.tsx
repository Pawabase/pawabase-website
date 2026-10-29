import { useEffect, useRef, useState } from "react";

import { currencyName, useCurrency } from "@/lib/currency";

/** Prices are in US dollars; this shows them in another currency: a small button that opens a searchable list. */
export function CurrencyPicker() {
  const { currency, options, choose, converted } = useCurrency();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const box = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!open) return;
    const away = (event: MouseEvent) => {
      if (!box.current?.contains(event.target as Node)) setOpen(false);
    };
    const key = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", away);
    document.addEventListener("keydown", key);
    return () => {
      document.removeEventListener("mousedown", away);
      document.removeEventListener("keydown", key);
    };
  }, [open]);
  const needle = query.trim().toLowerCase();
  const shown = options.filter((code) => `${code} ${currencyName(code)}`.toLowerCase().includes(needle));
  return (
    <div ref={box} className="relative flex items-center gap-3">
      <button
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
      {converted ? <span className="text-[12.5px] text-faint">Billed in USD</span> : null}
      {open ? (
        <div role="listbox" className="absolute left-0 top-[calc(100%+8px)] z-30 grid w-[280px] gap-2 rounded-2xl bg-card p-2 shadow-2xl ring-1 ring-white/[0.1]">
          <input
            autoFocus
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search currency"
            className="h-9 w-full rounded-lg bg-white/[0.05] px-3 text-[13px] text-text outline-none placeholder:text-faint focus:ring-1 focus:ring-brand/60"
          />
          <div className="max-h-[260px] overflow-y-auto">
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
        </div>
      ) : null}
    </div>
  );
}
