import { useEffect, useState } from "react";

/** Real Studio screenshots (public/screens), taken from a project with live data. Order is the order of the tabs. */
const SCREENS = [
  { key: "overview", label: "Overview", src: "/screens/overview.jpg", alt: "Pawabase Studio overview: requests, latency, bandwidth and flow runs for the last hour, with a live request feed" },
  { key: "data", label: "Data", src: "/screens/data.jpg", alt: "Pawabase Studio table editor showing a products table with its rows and columns" },
  { key: "users", label: "Users & auth", src: "/screens/users.jpg", alt: "Pawabase Studio users page listing signed-up people with status and sign-in method" },
  { key: "flows", label: "Flows", src: "/screens/flows.jpg", alt: "Pawabase Studio flow editor with a checkout workflow: find the product, check stock, record the order, answer" },
] as const;

const WIDTH = 1512;
const HEIGHT = 796;
const ROTATE_MS = 7000;

/** The product as it is: screenshots of Studio, one per tab, advancing on their own until a visitor picks one. */
export function StudioPreview() {
  const [active, setActive] = useState(0);
  const [manual, setManual] = useState(false);

  useEffect(() => {
    if (manual || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timer = window.setInterval(() => setActive((current) => (current + 1) % SCREENS.length), ROTATE_MS);
    return () => window.clearInterval(timer);
  }, [manual]);

  return (
    <div className="overflow-hidden rounded-[15px] border border-line bg-page text-text">
      <div role="tablist" aria-label="Studio screens" className="flex flex-wrap items-center justify-center gap-1 border-b border-line bg-surface p-2 text-[clamp(11px,1vw,13px)]">
        {SCREENS.map((screen, index) => (
          <button
            key={screen.key}
            type="button"
            role="tab"
            aria-selected={index === active}
            onClick={() => { setManual(true); setActive(index); }}
            className={`cursor-pointer rounded-md px-3 py-1.5 font-medium transition-colors ${index === active ? "bg-elevated text-text" : "text-muted hover:text-text"}`}
          >
            {screen.label}
          </button>
        ))}
      </div>
      <div className="relative w-full" style={{ aspectRatio: `${WIDTH} / ${HEIGHT}` }}>
        {SCREENS.map((screen, index) => (
          <img
            key={screen.key}
            src={screen.src}
            alt={screen.alt}
            width={WIDTH}
            height={HEIGHT}
            loading={index === 0 ? "eager" : "lazy"}
            decoding="async"
            draggable={false}
            aria-hidden={index !== active}
            className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-500 ${index === active ? "opacity-100" : "pointer-events-none opacity-0"}`}
          />
        ))}
      </div>
    </div>
  );
}
