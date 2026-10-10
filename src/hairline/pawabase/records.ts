import { picker, stroke } from "./picker";

/**
 * Records: the rows of a table, laid side by side as long strips on a plate, each with its cell rules. The pointer picks a row and it
 * slides out of the table toward the viewer, the way a record is read out of a table; the rows next to it follow a little.
 */
export const mount = picker({
  base: [-8, -6, 76, 66],
  axis: "x",
  rest: 0,
  scale: 4.1,
  hit: 26,
  parts: [0, 1, 2, 3, 4].map((i) => ({
    x: 0, y: i * 12, w: 60, d: 9, h: 3, r: 2.4, name: `row ${i + 1}`,
    mark: (P, x, y, z) => stroke(P, x, y, z, 15, 2, 15, 7) + stroke(P, x, y, z, 31, 2, 31, 7) + stroke(P, x, y, z, 47, 2, 47, 7),
  })),
});
