/**
 * The + marks where a section line meets the two side rails. Place inside a
 * `relative` block; it sits on that block's top edge (or its bottom edge).
 */
function Plus({ side }: { side: "left" | "right" }) {
  return (
    <span
      className={`absolute top-0 block size-[13px] ${side === "left" ? "left-0 -translate-x-1/2" : "right-0 translate-x-1/2"} -translate-y-1/2`}
    >
      <i className="absolute left-0 top-1/2 block h-px w-full -translate-y-1/2 bg-[#9aa4b0]" />
      <i className="absolute left-1/2 top-0 block h-full w-px -translate-x-1/2 bg-[#9aa4b0]" />
    </span>
  );
}

export function Junctions({ edge = "top" }: { edge?: "top" | "bottom" }) {
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute left-1/2 z-[2] h-0 w-[min(calc(100%-32px),1320px)] -translate-x-1/2 ${edge === "top" ? "top-0" : "bottom-0"}`}
    >
      <Plus side="left" />
      <Plus side="right" />
    </div>
  );
}
