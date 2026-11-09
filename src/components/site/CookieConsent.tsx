import { useEffect, useId, useRef, useState } from "react";

import { getConsent, OPEN_EVENT, saveConsent } from "@/lib/consent";
import "./consent.css";

type Mode = "hidden" | "banner" | "details";

/** Twelve crumbs fly out of the cookie when a choice is made: where each goes and how long it waits. */
const CRUMBS = Array.from({ length: 14 }, (_, i) => {
  const angle = (i / 14) * Math.PI * 2 + (i % 2) * 0.3;
  const reach = 46 + ((i * 37) % 34);
  return { x: Math.cos(angle) * reach, y: Math.sin(angle) * reach + 8, delay: (i % 5) * 0.03, size: 3.5 + (i % 3) * 1.5 };
});

/** The cookie, drawn in lit dots like the rest of the site: a round of dots with two bites out of it and a few chips. */
function Cookie({ className }: { className?: string }) {
  const id = useId().replace(/:/g, "");
  return (
    <svg className={className} viewBox="0 0 64 64" width="64" height="64" aria-hidden="true">
      <defs>
        <pattern id={`${id}p`} width="4" height="4" patternUnits="userSpaceOnUse">
          <circle cx="2" cy="2" r="1.35" fill="#ff6a00" />
        </pattern>
        <mask id={`${id}m`}>
          <circle cx="32" cy="32" r="28" fill="#fff" />
          <circle cx="52" cy="14" r="9" fill="#000" />
          <circle cx="57" cy="38" r="6" fill="#000" />
        </mask>
      </defs>
      <rect width="64" height="64" fill={`url(#${id}p)`} mask={`url(#${id}m)`} />
      {[[21, 24], [37, 35], [24, 43], [40, 20], [31, 29]].map(([x, y]) => (
        <circle key={`${x}${y}`} cx={x} cy={y} r="2.6" fill="#ffd27a" />
      ))}
    </svg>
  );
}

function Toggle({ label, hint, checked, locked, onChange }: { label: string; hint: string; checked: boolean; locked?: boolean; onChange?: (value: boolean) => void }) {
  return (
    <label className={`ck-row${locked ? " is-locked" : ""}`}>
      <span className="ck-row-text">
        <b>{label}</b>
        <small>{hint}</small>
      </span>
      <input type="checkbox" role="switch" checked={checked} disabled={locked} onChange={(event) => onChange?.(event.target.checked)} />
      <span className="ck-switch" aria-hidden="true" />
      {locked ? <span className="sr-only">Always on</span> : null}
    </label>
  );
}

/**
 * The cookie banner. It asks once, a moment after the page settles; "Accept all" and "Necessary only" answer in one click, and
 * "Customize" opens the choices. The footer's "Cookie settings" link (any `a[href="#cookie-settings"]`) opens it again.
 */
export function CookieConsent() {
  const [mode, setMode] = useState<Mode>("hidden");
  const [leaving, setLeaving] = useState(false);
  const [analytics, setAnalytics] = useState(false);
  const [preferences, setPreferences] = useState(false);
  const timers = useRef<number[]>([]);

  useEffect(() => {
    const wait = (fn: () => void, ms: number) => timers.current.push(window.setTimeout(fn, ms));
    const reopen = () => {
      const saved = getConsent();
      setAnalytics(saved?.analytics ?? false);
      setPreferences(saved?.preferences ?? false);
      setLeaving(false);
      setMode("details");
    };
    if (!getConsent()) wait(() => setMode("banner"), 1400);
    const onClick = (event: MouseEvent) => {
      const link = (event.target as Element | null)?.closest?.('a[href="#cookie-settings"]');
      if (!link) return;
      event.preventDefault();
      reopen();
    };
    window.addEventListener(OPEN_EVENT, reopen);
    document.addEventListener("click", onClick);
    return () => {
      timers.current.forEach(window.clearTimeout);
      window.removeEventListener(OPEN_EVENT, reopen);
      document.removeEventListener("click", onClick);
    };
  }, []);

  useEffect(() => {
    if (mode === "hidden") return undefined;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape" && mode === "details") setMode(getConsent() ? "hidden" : "banner");
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [mode]);

  const decide = (choice: { analytics: boolean; preferences: boolean }) => {
    saveConsent(choice);
    setLeaving(true);
    const reduced = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    timers.current.push(window.setTimeout(() => { setMode("hidden"); setLeaving(false); }, reduced ? 0 : 1000));
  };

  if (mode === "hidden") return null;
  const open = mode === "details";

  return (
    <div className={`ck${leaving ? " is-leaving" : ""}`} role="dialog" aria-label="Cookie preferences" aria-live="polite">
      <span className="ck-field" aria-hidden="true" />
      <div className="ck-head">
        <span className="ck-cookie">
          <Cookie />
          <span className="ck-crumbs" aria-hidden="true">
            {CRUMBS.map((crumb, i) => (
              <i key={i} style={{ ["--x" as string]: `${crumb.x}px`, ["--y" as string]: `${crumb.y}px`, ["--d" as string]: `${crumb.delay}s`, width: crumb.size, height: crumb.size }} />
            ))}
          </span>
        </span>
        <div>
          <p className="ck-caps">Cookies</p>
          <h2>Cookies, kept simple</h2>
        </div>
      </div>
      <p className="ck-copy">
        We use a few cookies to keep the site working and, if you allow it, to see which pages help and which do not. Nothing is sold, and
        you can change your mind any time. <a href="/legal/cookies">Read the Cookie Policy</a>.
      </p>

      <div className="ck-panel" data-open={open}>
        <div>
          <Toggle label="Necessary" hint="Keeps the site secure and remembers this choice. Always on." checked locked />
          <Toggle label="Analytics" hint="Anonymous page views and speed, so we can improve the site." checked={analytics} onChange={setAnalytics} />
          <Toggle label="Preferences" hint="Remembers things like your currency on the pricing page." checked={preferences} onChange={setPreferences} />
        </div>
      </div>

      <div className="ck-actions">
        {open ? (
          <>
            <button type="button" className="ck-btn ck-primary" onClick={() => decide({ analytics, preferences })}>Save choices</button>
            <button type="button" className="ck-btn" onClick={() => decide({ analytics: true, preferences: true })}>Accept all</button>
          </>
        ) : (
          <>
            <button type="button" className="ck-btn ck-primary" onClick={() => decide({ analytics: true, preferences: true })}>Accept all</button>
            <button type="button" className="ck-btn" onClick={() => decide({ analytics: false, preferences: false })}>Necessary only</button>
            <button type="button" className="ck-link" onClick={() => setMode("details")}>Customize</button>
          </>
        )}
      </div>
    </div>
  );
}
