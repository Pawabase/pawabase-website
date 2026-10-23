import "./hairline.css";

import type { CSSProperties, ReactNode } from "react";

/**
 * Hairline: Pawabase's line drawings. Solids are drawn on a 2:1 isometric
 * ground, filled with the section's own background and painted back to front,
 * so a nearer solid simply covers a farther one. Strokes never scale. One
 * bright solid at a time says where to look.
 */

export type Vec2 = [number, number];
export type Project = (x: number, y: number, z?: number) => Vec2;

export function projector(ox: number, oy: number, s: number): Project {
  return (x, y, z = 0) => [ox + (x - y) * s, oy + (x + y) * s * 0.5 - z * s];
}

const pts = (list: Vec2[]) =>
  list.map(([x, y]) => `${Math.round(x * 100) / 100},${Math.round(y * 100) / 100}`).join(" ");

type Tone = "lo" | "mid" | "edge" | "hi";

/** A box: top, right face and front face, as the 2:1 camera sees them. */
export function Box({
  P,
  x,
  y,
  z = 0,
  w,
  d,
  h,
  tone = "edge",
  lid = false,
  className = "",
  style,
}: {
  P: Project;
  x: number;
  y: number;
  z?: number;
  w: number;
  d: number;
  h: number;
  tone?: Tone;
  lid?: boolean;
  className?: string;
  style?: CSSProperties;
}) {
  const top: Vec2[] = [P(x, y, z + h), P(x + w, y, z + h), P(x + w, y + d, z + h), P(x, y + d, z + h)];
  const right: Vec2[] = [P(x + w, y, z), P(x + w, y + d, z), P(x + w, y + d, z + h), P(x + w, y, z + h)];
  const front: Vec2[] = [P(x, y + d, z), P(x + w, y + d, z), P(x + w, y + d, z + h), P(x, y + d, z + h)];
  const inset = Math.min(w, d) * 0.22;

  return (
    <g className={`hl-solid hl-${tone} ${className}`} style={style}>
      <polygon points={pts(right)} />
      <polygon points={pts(front)} />
      <polygon points={pts(top)} />
      {lid ? (
        <polyline
          className="hl-crease"
          points={pts([P(x + inset, y + d / 2, z + h), P(x + w - inset, y + d / 2, z + h)])}
        />
      ) : null}
    </g>
  );
}

/** A dashed footprint on the ground: something that is about to exist. */
export function Footprint({
  P,
  x,
  y,
  w,
  d,
  z = 0,
}: {
  P: Project;
  x: number;
  y: number;
  w: number;
  d: number;
  z?: number;
}) {
  return (
    <polygon
      className="hl-dash"
      points={pts([P(x, y, z), P(x + w, y, z), P(x + w, y + d, z), P(x, y + d, z)])}
    />
  );
}

/** A short label with a leader line, in the figure's own quiet voice. */
export function Callout({
  at,
  to,
  children,
  align = "start",
  lit = false,
}: {
  at: Vec2;
  to: Vec2;
  children: ReactNode;
  align?: "start" | "end";
  lit?: boolean;
}) {
  return (
    <g className={`hl-callout ${lit ? "hl-callout-lit" : ""}`}>
      <polyline points={pts([at, to])} />
      <circle cx={at[0]} cy={at[1]} r={2} />
      <text
        x={to[0] + (align === "start" ? 8 : -8)}
        y={to[1] + 4}
        textAnchor={align}
      >
        {children}
      </text>
    </g>
  );
}

/** The drawing surface: a viewBox, labelled as one image, decorative inside. */
export function Figure({
  label,
  width,
  height,
  className = "",
  children,
}: {
  label: string;
  width: number;
  height: number;
  className?: string;
  children: ReactNode;
}) {
  return (
    <svg
      role="img"
      aria-label={label}
      viewBox={`0 0 ${width} ${height}`}
      className={`hairline ${className}`}
    >
      {children}
    </svg>
  );
}
