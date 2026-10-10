import { useEffect, useRef, useState } from "react";
import { Icon } from "./components/Primitives";
import { dashboard, docs, github } from "./config";

/* One link in the Company menu. */
type Link = { label: string; href: string; detail?: string };

/* The one group left in the bar. The other destinations are direct links,
   a dropdown around a single page is just a slower link. */
const company: Link[] = [
  { label: "Built on Sillo", href: "https://sillo.build", detail: "The framework underneath" },
  { label: "Run with Docker", href: docs("installation/docker"), detail: "The whole stack, one image" },
  { label: "Source repository", href: github, detail: "Gateway, policies, flows and Studio" },
  { label: "Issues & ideas", href: `${github}/issues` },
  { label: "Releases", href: `${github}/releases` },
];

export function FooterDock() {
  const [open, setOpen] = useState(false);
  const dock = useRef<HTMLDivElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);

  /* Escape closes and hands focus back to the button that opened it. */
  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key !== "Escape" || !open) return;
      setOpen(false);
      trigger.current?.focus();
    };
    const outside = (event: PointerEvent) => {
      if (!dock.current?.contains(event.target as Node)) setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", outside);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", outside);
    };
  }, [open]);

  const close = () => setOpen(false);

  return (
    <footer className="site-footer">
      {/* The wordmark, moved down from the hero to close the page. Decoration,
          so it is hidden from assistive technology and unselectable. */}
      <div className="wordmark-band" aria-hidden="true">
        <span>pawabase</span>
      </div>

      <div className="dock" ref={dock}>
        <div className="dock-bar">
          <button
            ref={trigger}
            className={`dock-trigger${open ? " is-open" : ""}`}
            aria-expanded={open}
            aria-controls="dock-panel"
            onClick={() => setOpen(!open)}
          >
            Company <span className="dock-caret" aria-hidden="true" />
          </button>
          <a className="dock-quick" href={docs()}>
            Docs <span aria-hidden="true">↗</span>
          </a>
          <a className="dock-quick dock-quick-icon" href={github} aria-label="Pawabase on GitHub">
            <img src="/integrations/github.svg" width="18" height="18" alt="" />
          </a>
          <a className="button small dock-cta" href={dashboard || docs("installation/docker")}>
            {dashboard ? "Open Studio" : "Run Pawabase"}
          </a>
        </div>

        {/* Kept in the DOM while closed so `aria-controls` always has a target. */}
        <div
          id="dock-panel"
          className="dock-panel"
          role="group"
          aria-label="Company"
          hidden={!open}
        >
          <ul className="dock-list">
            {company.map((link) => (
              <li key={link.label}>
                <a href={link.href} onClick={close}>
                  <span>{link.label}</span>
                  {link.detail && <small>{link.detail}</small>}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
