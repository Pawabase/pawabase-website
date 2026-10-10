import type { SVGProps } from "react";
import type { Product } from "../config";

type P = SVGProps<SVGSVGElement>;
const base: P = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.4,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  "aria-hidden": true,
};

/* Thin-line product marks, drawn on the same 24px grid and weight. */
export const ProductIcon = ({ name, ...rest }: { name: Product["key"] } & P) => {
  switch (name) {
    case "auth":
      return (
        <svg {...base} {...rest}>
          <path d="M12 3 5 6v5.4c0 4.4 2.9 7.4 7 9.6 4.1-2.2 7-5.2 7-9.6V6z" />
          <circle cx="12" cy="10.6" r="1.8" />
          <path d="M12 12.4v3.2" />
        </svg>
      );
    case "database":
      return (
        <svg {...base} {...rest}>
          <ellipse cx="12" cy="6" rx="7" ry="2.8" />
          <path d="M5 6v6c0 1.5 3.1 2.8 7 2.8s7-1.3 7-2.8V6" />
          <path d="M5 12v6c0 1.5 3.1 2.8 7 2.8s7-1.3 7-2.8v-6" />
        </svg>
      );
    case "storage":
      return (
        <svg {...base} {...rest}>
          <path d="M3.5 8 12 3.5 20.5 8v8L12 20.5 3.5 16z" />
          <path d="M3.5 8 12 12.5 20.5 8M12 12.5v8" />
        </svg>
      );
    case "functions":
      return (
        <svg {...base} {...rest}>
          <path d="M8.5 4.5C6.8 4.5 6 5.4 6 7v2c0 1.4-.6 2.6-2 3 1.4.4 2 1.6 2 3v2c0 1.6.8 2.5 2.5 2.5" />
          <path d="M15.5 4.5C17.2 4.5 18 5.4 18 7v2c0 1.4.6 2.6 2 3-1.4.4-2 1.6-2 3v2c0 1.6-.8 2.5-2.5 2.5" />
          <circle cx="12" cy="12" r="1.1" />
        </svg>
      );
    case "automation":
      return (
        <svg {...base} {...rest}>
          <circle cx="5.5" cy="6" r="2" />
          <circle cx="18.5" cy="6" r="2" />
          <circle cx="12" cy="18" r="2" />
          <path d="M7.4 6.6C10 8 14 8 16.6 6.6M6.5 7.8l4.5 8.4M17.5 7.8 13 16.2" />
        </svg>
      );
    case "cloud":
      return (
        <svg {...base} {...rest}>
          <rect x="4" y="4.5" width="16" height="6" rx="1.6" />
          <rect x="4" y="13.5" width="16" height="6" rx="1.6" />
          <path d="M7.5 7.5h.01M7.5 16.5h.01M11 7.5h6M11 16.5h6" />
        </svg>
      );
  }
};

export const Chevron = (p: P) => (
  <svg viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...p}>
    <path d="m2.5 4.5 3.5 3.5 3.5-3.5" />
  </svg>
);

export const ArrowRight = (p: P) => (
  <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...p}>
    <path d="M2.5 8h11M9 3.5 13.5 8 9 12.5" />
  </svg>
);

export const Sun = (p: P) => (
  <svg {...base} {...p}>
    <circle cx="12" cy="12" r="4" />
    <path d="M12 3v2M12 19v2M3 12h2M19 12h2M5.6 5.6 7 7M17 17l1.4 1.4M5.6 18.4 7 17M17 7l1.4-1.4" />
  </svg>
);

export const Moon = (p: P) => (
  <svg {...base} {...p}>
    <path d="M20 14.5A8.5 8.5 0 0 1 9.5 4 8.5 8.5 0 1 0 20 14.5z" />
  </svg>
);

export const MenuIcon = ({ open, ...p }: { open: boolean } & P) => (
  <svg {...base} {...p}>
    {open ? <path d="M6 6l12 12M18 6 6 18" /> : <path d="M4 8h16M4 16h16" />}
  </svg>
);

export const Check = (p: P) => (
  <svg {...base} {...p}>
    <path d="m5 12.5 4.5 4.5L19 7.5" />
  </svg>
);
