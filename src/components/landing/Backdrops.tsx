import type { CSSProperties } from "react";

import { Fx } from "./studio/Studio";

/**
 * Section backdrops. Each section gets a different, faint texture so the page
 * never reads as one flat sheet, and none of them competes with the content:
 * every one is masked to fade out well before the edges.
 */

const at = (x: string, y: string, extra: Record<string, string> = {}) =>
  ({ "--fx-x": x, "--fx-y": y, ...extra }) as CSSProperties;

/** The hero's contour field, echoed in brand orange at a whisper. */
export function Contours({
  className = "",
  flip = false,
}: {
  className?: string;
  flip?: boolean;
}) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 1600 600"
      preserveAspectRatio="xMidYMid slice"
      className={`pointer-events-none absolute inset-0 h-full w-full text-brand ${flip ? "-scale-x-100" : ""} ${className}`}
    >
      {Array.from({ length: 18 }, (_, i) => {
        const offset = i * 28;
        return (
          <path
            key={i}
            d={`M ${-120 + offset} 620 C ${260 + offset} 380, ${-40 + offset} 200, ${420 + offset} 40 S ${980 + offset} -120, ${1400 + offset} -260`}
            fill="none"
            stroke="currentColor"
            strokeWidth={i % 5 === 0 ? 1.3 : 0.75}
            opacity={0.2 + (i % 4) * 0.06}
          />
        );
      })}
    </svg>
  );
}

/** Concentric circles behind a centred group, like orbits. */
export function Orbits({ className = "" }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 1000 600"
      preserveAspectRatio="xMidYMid slice"
      className={`pointer-events-none absolute inset-0 h-full w-full ${className}`}
      style={{
        maskImage: "radial-gradient(ellipse 55% 70% at 50% 60%, #000, transparent 80%)",
        WebkitMaskImage: "radial-gradient(ellipse 55% 70% at 50% 60%, #000, transparent 80%)",
      }}
    >
      {[120, 200, 290, 390].map((r, i) => (
        <circle
          key={r}
          cx="500"
          cy="360"
          r={r}
          fill="none"
          stroke="white"
          strokeOpacity={0.06}
          strokeDasharray={i % 2 ? "2 6" : undefined}
        />
      ))}
      <circle cx={500 + 290} cy="360" r="3" fill="#ff7049" opacity="0.7" />
      <circle cx={500 - 141} cy={360 - 141} r="2.5" fill="#ff7049" opacity="0.5" />
    </svg>
  );
}

export const backdrop = {
  /** A fading grid, lit from the top (or from `y`). */
  grid: (y = "0%") => <Fx kind="grid" style={at("50%", y)} />,
  dots: (x = "50%", y = "50%") => <Fx kind="dots" style={at(x, y)} />,
  rings: (x = "50%", y = "50%") => <Fx kind="rings" style={at(x, y)} />,
  lines: (x = "50%", y = "50%") => <Fx kind="lines" style={at(x, y)} />,
  hatch: (x = "50%", y = "50%") => <Fx kind="hatch" style={at(x, y)} />,
  glow: (x = "50%", y = "0%", w = "980px", h = "460px") => (
    <Fx kind="glow" style={at(x, y, { "--fx-w": w, "--fx-h": h })} />
  ),
};
