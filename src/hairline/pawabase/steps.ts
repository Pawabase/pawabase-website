import { picker, stroke } from "./picker";

/**
 * Steps: a stair of five treads climbing from front to back, each a little higher than the one before, the way a definition becomes a
 * running application one stage at a time. The pointer picks a tread and it lifts; the treads beside it follow. The top tread is bright
 * at rest, and carries the one mark: the thing the stair leads to.
 */
export const mount = picker({
  base: [-8, -8, 84, 62],
  axis: "z",
  rest: 4,
  scale: 3.7,
  hit: 28,
  parts: [0, 1, 2, 3, 4].map((i) => ({
    x: i * 15, y: 4, w: 13, d: 44, h: 4 + i * 5, r: 3, name: `stage ${i + 1}`,
    mark: i === 4 ? (P, x, y, z) => stroke(P, x, y, z, 3, 12, 10, 22) + stroke(P, x, y, z, 10, 22, 3, 32) : undefined,
  })),
});
