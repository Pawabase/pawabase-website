import { picker, stroke } from "./picker";

/**
 * Session: a card file. Four standing cards in a tray, each a different height, the way what a request carries is not all of one weight:
 * the person, the session, the organization they act in, and the second factor, which stands tallest. The picked card slides up out of
 * the file and takes the bright edge; the neighbours follow a little. A notch is cut across every card's top.
 */
const cards = [
  { name: "person", h: 14 }, { name: "session", h: 18 }, { name: "organization", h: 22 }, { name: "second factor", h: 28 },
];
export const mount = picker({
  base: [-6, -6, 58, 40],
  axis: "z",
  rest: 3,
  scale: 4.8,
  parts: cards.map((c, i) => ({
    x: 4 + i * 13, y: 6, w: 5, d: 28, h: c.h, r: 1.6, name: c.name,
    mark: (P, x, y, z) => stroke(P, x, y, z, 2.5, 6, 2.5, 12) + stroke(P, x, y, z, 2.5, 16, 2.5, 22),
  })),
  floor: (P) => [0, 1, 2, 3].map((i) => stroke(P, 4 + i * 13 - 1.5, 4, 4, 0, 0, 0, 32)).join(""),
});
