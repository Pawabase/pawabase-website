import { useEffect, useState } from "react";

import { Icon } from "@/components/Icon";

import { Wordmark } from "./Brand";

const APP_URL = "https://app.pawabase.com";

const LINKS = [
  { label: "Features", href: "/#features" },
  { label: "Database", href: "/products/database" },
  { label: "Auth", href: "/products/authentication" },
  { label: "Storage", href: "/products/storage" },
  { label: "Realtime", href: "/products/realtime" },
  { label: "Flows", href: "/products/flows" },
  { label: "Docs", href: "https://docs.sillo.build", external: true },
  { label: "GitHub", href: "https://github.com/Pawabase/pawabase", external: true },
  { label: "Pricing", href: "/#start" },
];

const external = (on?: boolean) => (on ? { target: "_blank", rel: "noreferrer" } : {});

export function TopBar() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => event.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header className="sticky top-0 z-50 px-4 py-2 min-[768px]:px-6">
      <div className="relative mx-auto w-full max-w-[1160px]">
        <nav
          className="flex h-[56px] items-center justify-between gap-3 rounded-2xl border border-white/[0.12] bg-[#111112]/84 px-2 pl-4 shadow-[0_18px_70px_rgba(0,0,0,0.34)] backdrop-blur-xl min-[768px]:h-[60px]"
          aria-label="Primary navigation"
        >
          <a href="/" className="inline-flex w-fit shrink-0 items-center" aria-label="Pawabase home" onClick={() => setOpen(false)}>
            <Wordmark />
          </a>

          <div className="hidden items-center gap-0.5 min-[1000px]:flex">
            {LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                {...external(link.external)}
                className="rounded-lg px-3 py-2 text-[12.5px] font-medium tracking-[-0.01em] text-muted no-underline transition-colors duration-150 hover:bg-white/[0.07] hover:text-text"
              >
                {link.label}
              </a>
            ))}
          </div>

          <a
            href={APP_URL}
            target="_blank"
            rel="noreferrer"
            className="hidden h-10 shrink-0 items-center justify-center gap-1.5 rounded-lg border border-white/[0.78] bg-[#F5F5F6] px-4 text-[12.5px] font-bold tracking-[-0.02em] text-[#111315] no-underline shadow-[inset_0_-2px_0_rgba(255,112,73,0.45)] transition-colors duration-200 hover:bg-white min-[1000px]:inline-flex"
          >
            Start building
            <Icon name="arrowRight" size={15} />
          </a>

          <button
            type="button"
            className="inline-grid h-10 w-10 shrink-0 cursor-pointer place-items-center rounded-xl border border-white/[0.12] bg-white/[0.04] text-text transition-colors hover:bg-white/[0.08] min-[1000px]:hidden"
            aria-label={open ? "Close navigation" : "Open navigation"}
            aria-expanded={open}
            aria-controls="mobile-navigation"
            onClick={() => setOpen((value) => !value)}
          >
            <Icon name={open ? "close" : "menu"} size={19} />
          </button>
        </nav>

        {open ? (
          <div
            id="mobile-navigation"
            className="absolute inset-x-0 top-[calc(100%+8px)] z-40 max-h-[calc(100svh-84px)] overflow-y-auto overscroll-contain rounded-[24px] border border-white/[0.12] bg-[#111112]/98 p-3 shadow-[0_30px_90px_rgba(0,0,0,0.5)] backdrop-blur-xl min-[1000px]:hidden"
          >
            <nav aria-label="Mobile navigation">
              {LINKS.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  {...external(link.external)}
                  onClick={() => setOpen(false)}
                  className="flex items-center justify-between border-b border-white/[0.07] py-3.5 text-[14px] font-semibold tracking-[-0.02em] text-text no-underline"
                >
                  {link.label}
                  <span aria-hidden="true" className="text-faint">→</span>
                </a>
              ))}
              <a
                href={APP_URL}
                target="_blank"
                rel="noreferrer"
                onClick={() => setOpen(false)}
                className="mt-3 flex h-11 w-full items-center justify-center gap-2 rounded-lg border border-white/[0.78] bg-[#F5F5F6] text-[13px] font-bold tracking-[-0.02em] text-[#111315] no-underline shadow-[inset_0_-2px_0_rgba(255,112,73,0.45)]"
              >
                Start building
                <Icon name="arrowRight" size={15} />
              </a>
            </nav>
          </div>
        ) : null}
      </div>
    </header>
  );
}
