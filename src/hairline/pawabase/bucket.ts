import { dashedRect, picker, stroke } from "./picker";

/**
 * Bucket: three crates of different footprints stand on a plate, each with a clasp across its lid, and a dashed footprint beside the
 * plate's edge for the one that does not exist yet. The pointer picks a crate and it lifts clear of the plate, as a bucket does when it is
 * opened for a signed link. One bright crate says where to look at rest.
 */
export const mount = picker({
  base: [-8, -8, 80, 60],
  axis: "z",
  rest: 1,
  scale: 3.8,
  hit: 40,
  parts: [
    { x: 0, y: 2, w: 22, d: 22, h: 16, name: "bucket 1" },
    { x: 28, y: 14, w: 28, d: 26, h: 22, name: "bucket 2" },
    { x: 4, y: 30, w: 20, d: 20, h: 12, name: "bucket 3" },
  ].map((c) => ({ ...c, r: 4, mark: (P, x, y, z) => stroke(P, x, y, z, 4, c.d / 2, c.w - 4, c.d / 2) + stroke(P, x, y, z, c.w / 2, c.d / 2 - 3, c.w / 2, c.d / 2 + 3) })),
  floor: (P) => dashedRect(P, 58, 2, 72, 16),
});
