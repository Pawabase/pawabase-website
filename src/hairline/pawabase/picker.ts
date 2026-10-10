import { Cam, facing, fit, poly, proj, ringAt, type Projector, type Vec2, type Vec3 } from "../core/iso";
import { tdone, tset, tval, tween, type Tween } from "../core/motion";
import { disposer, mk, pointer, put, register, solid, type FigureMount, type Solid } from "../core/stage";
import { lid, slab } from "../slab";

/**
 * A plate with parts on it, of which the pointer picks one. The parts are the figure: each has its own footprint, height and mark, and
 * moves on its own axis (up, or out along x or y, the way the object it stands for would move). The picked part takes the bright edge
 * and the ones beside it follow a little; at rest one bright part says where to look. The pick is made against the parts' resting tops,
 * never where they have moved to (rule 01). The slider is how far the picked part moves, in world units.
 */
export type Part = {
  x: number; y: number; w: number; d: number; h: number;
  /** Height of the part's foot above the plate. */
  z?: number;
  /** Corner radius; the default suits a thin plate. */
  r?: number;
  name: string;
  /** Extra lines on the lid, as one path, given the lid's corner (x, y) and its height. */
  mark?: (P: Projector, x: number, y: number, z: number) => string;
};

export type PickerSpec = {
  base: [number, number, number, number];
  parts: Part[];
  axis: "z" | "x" | "y";
  /** The part that is bright at rest. */
  rest: number;
  /** How the neighbours follow, by distance in the list: 1 is as far as the picked one. */
  fall?: number[];
  scale?: number;
  /** Lines drawn on the plate under the parts, as one path. */
  floor?: (P: Projector) => string;
  hit?: number;
};

const BT = 4, STEP = 45, UP = 700, DOWN = 1100;

export function picker(spec: PickerSpec): FigureMount {
  const { base, parts, axis, rest } = spec;
  const fall = spec.fall ?? [1, 0.3, 0.08];
  return ({ stage, svg, read }, value) => {
    const bag = disposer();
    let lift = value;
    const C = Cam(45, 0.5, 1);
    const pts: Vec3[] = [[base[0], base[1], 0], [base[2], base[3], 0]];
    for (const p of parts) {
      const reach = axis === "z" ? lift * 1.6 : 0;
      const dx = axis === "x" ? lift * 1.4 : 0, dy = axis === "y" ? lift * 1.4 : 0;
      pts.push([p.x, p.y, BT + (p.z ?? 0) + p.h + reach], [p.x + p.w + dx, p.y + p.d + dy, BT + (p.z ?? 0) + p.h + reach]);
    }
    // the largest the figure can be and still stand inside the 400 × 320 frame at its far reach
    {
      const Q = proj(C);
      const xy = pts.map(([x, y, z]) => Q(x, y, z));
      const w = Math.max(...xy.map((q) => q[0])) - Math.min(...xy.map((q) => q[0])), h = Math.max(...xy.map((q) => q[1])) - Math.min(...xy.map((q) => q[1]));
      C.S *= Math.min(344 / w, 272 / h);
    }
    fit(C, pts, 200, 166);
    const P = proj(C), front = facing(C);
    const g = mk("g", {}, svg);
    const [br, bi] = lid(base[0], base[1], base[2], base[3], 7, 2);
    put(solid(g), slab(P, front, br, bi, 0, BT));
    if (spec.floor) mk("path", { d: spec.floor(P), class: "nf lo" }, g);

    type Live = { p: Part; i: number; el: Solid; mark: SVGPathElement; tw: Tween; drawn: number; on: boolean };
    const order = parts.map((p, i) => ({ p, i })).sort((a, b) => a.p.x + a.p.y - (b.p.x + b.p.y) || (a.p.z ?? 0) - (b.p.z ?? 0));
    const live: Live[] = [];
    for (const { p, i } of order) live[i] = { p, i, el: solid(g), mark: mk("path", { class: "nf lo" }, g), tw: tween(0, UP), drawn: NaN, on: false };
    // paint order is by depth, but the list keeps the parts' own numbers
    const draw = (l: Live, e: number) => {
      const { p } = l;
      const x = p.x + (axis === "x" ? e : 0), y = p.y + (axis === "y" ? e : 0), z0 = BT + (p.z ?? 0) + (axis === "z" ? e : 0);
      const [ring, inner] = lid(x, y, x + p.w, y + p.d, p.r ?? 3, 1);
      put(l.el, slab(P, front, ring, inner, z0, z0 + p.h));
      l.mark.setAttribute("d", p.mark ? p.mark(P, x, y, z0 + p.h) : "");
    };

    const B = register(stage, (_dt, now) => {
      let moving = false;
      for (const l of live) {
        const e = tval(l.tw, now);
        if (!tdone(l.tw, now)) moving = true;
        if (e !== l.drawn) { l.drawn = e; draw(l, e); }
      }
      return moving;
    });
    bag.add(B.unregister);

    const tops = parts.map((p) => P(p.x + p.w / 2, p.y + p.d / 2, BT + (p.z ?? 0) + p.h));
    const HIT = spec.hit ?? 34;
    let act = -1;
    const hit = ([sx, sy]: Vec2) => {
      let a = -1, best = HIT;
      tops.forEach((q, k) => { const m = Math.hypot(sx - q[0], sy - q[1]); if (m < best) { best = m; a = k; } });
      if (a !== act && act >= 0) {
        const held = Math.hypot(sx - tops[act][0], sy - tops[act][1]);
        if (held < HIT && best > 0.8 * held) return act;
      }
      return a;
    };
    const apply = (a: number) => {
      const now = performance.now();
      live.forEach((l) => {
        const hop = a < 0 ? 0 : Math.abs(l.i - a);
        const to = a < 0 ? 0 : lift * (fall[hop] ?? 0), cur = tval(l.tw, now);
        l.tw.dur = to < cur ? DOWN : UP;
        tset(l.tw, to, now, to > cur ? hop * STEP : 0);
        const on = l.i === (a < 0 ? rest : a);
        if (on !== l.on) { l.on = on; l.el.sil.classList.toggle("hi", on); }
      });
      B.wake();
    };
    apply(-1);
    read.textContent = "rest";
    bag.add(pointer(stage, {
      move: (p) => { const a = hit(p); if (a !== act) { act = a; read.textContent = a < 0 ? "rest" : parts[a].name; apply(a); } },
      leave: () => { if (act >= 0) { act = -1; read.textContent = "rest"; apply(-1); } },
    }));
    bag.add(() => svg.replaceChildren());
    return { set: (v) => { lift = v; apply(act); }, destroy: bag.dispose };
  };
}

/** A line along the lid between two lid-local points. */
export const stroke = (P: Projector, x: number, y: number, z: number, u0: number, v0: number, u1: number, v1: number) => {
  const a = P(x + u0, y + v0, z), b = P(x + u1, y + v1, z);
  return `M${a[0].toFixed(2)} ${a[1].toFixed(2)}L${b[0].toFixed(2)} ${b[1].toFixed(2)}`;
};
export const dashedRect = (P: Projector, x0: number, y0: number, x1: number, y1: number, z = BT) => poly([P(x0, y0, z), P(x1, y0, z), P(x1, y1, z), P(x0, y1, z)]);
void ringAt;
