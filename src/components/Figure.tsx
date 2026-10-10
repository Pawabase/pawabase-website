import { useEffect, useRef, useState } from "react";
import { create, type Figure as FigureHandle } from "../hairline/mount";
import { figures } from "../hairline/registry";

type Props = {
  name: string;
  /** The accessible name; each figure has a default description. */
  label?: string;
  intensity?: number;
  /** Walk the figure through its answer on its own until a pointer or finger arrives. */
  play?: boolean;
  /** Names for what the figure's own caption says (`tile 3`), shown in the corner read-out. Left out: no read-out. */
  names?: Record<string, string> | ((caption: string) => string);
  className?: string;
  /** Intrinsic ratio while the figure is not drawn yet, so nothing shifts when it is. */
  ratio?: string;
};

/**
 * A Hairline figure, drawn when it comes near the viewport. On the server and before that it is an empty box of the right shape.
 * The corner read-out sits outside the drawing, as the figures' rules require.
 */
export function Figure({ name, label, intensity, play, names, className = "", ratio = "5 / 4" }: Props) {
  const host = useRef<HTMLDivElement>(null);
  const [caption, setCaption] = useState("");
  const handle = useRef<FigureHandle | null>(null);
  const namesRef = useRef(names);
  namesRef.current = names;

  useEffect(() => {
    const el = host.current;
    const spec = figures[name];
    if (!el || !spec) return;
    let cancelled = false;
    const start = () => {
      spec.load().then((mod) => {
        if (cancelled) return;
        handle.current = create(
          { id: name, label: spec.label, rest: spec.rest, engine: mod.mount, tour: spec.tour, focusable: spec.focusable },
          el,
          {
            intensity,
            label,
            play,
            onRead: (text) => {
              const map = namesRef.current;
              setCaption(map ? (typeof map === "function" ? map(text) : (map[text] ?? text)) : text);
            },
          },
        );
      });
    };
    if (typeof IntersectionObserver === "undefined") {
      start();
      return () => {
        cancelled = true;
        handle.current?.destroy();
      };
    }
    const seen = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          seen.disconnect();
          start();
        }
      },
      { rootMargin: "300px 0px" },
    );
    seen.observe(el);
    return () => {
      cancelled = true;
      seen.disconnect();
      handle.current?.destroy();
      handle.current = null;
    };
    // mounts once per figure; option changes go through update below
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [name]);

  useEffect(() => {
    handle.current?.update({ intensity, label, play });
  }, [intensity, label, play]);

  return (
    <div className={`figure ${className}`}>
      <div ref={host} style={{ aspectRatio: ratio }} />
      {names && (
        <div className="readout" aria-hidden="true">
          <b>{caption && caption !== "rest" ? caption : " "}</b>
        </div>
      )}
    </div>
  );
}
