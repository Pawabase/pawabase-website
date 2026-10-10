import { picker, stroke } from "./picker";

/**
 * Rack: four blades in a frame, one over another, each a project on its own hardware. The pointer picks a blade and it slides out along
 * its rails toward the viewer; the blades beside it follow a little. Every blade has a handle and a row of vents.
 */
export const mount = picker({
  base: [-8, -8, 76, 66],
  axis: "y",
  rest: 1,
  scale: 3.7,
  hit: 36,
  parts: [0, 1, 2, 3].map((i) => ({
    x: 0, y: 6, z: i * 13, w: 56, d: 38, h: 8, r: 3, name: `project ${i + 1}`,
    mark: (P, x, y, z) => stroke(P, x, y, z, 10, 33, 46, 33) + stroke(P, x, y, z, 10, 8, 22, 8) + stroke(P, x, y, z, 10, 13, 22, 13),
  })),
});
