import { useEffect, useRef, useState } from "react";

import type { Picture } from "@/lib/blog";

/*
 * A post's picture. The build has already made AVIF, WebP and JPEG at several widths and a tiny blurred copy (see
 * scripts/blog/remark-blog.mjs), so the browser picks the smallest file that is sharp on this screen, the space is reserved at the
 * image's real size (nothing jumps as it loads), the blur shows until the picture arrives, and a click opens it full size.
 */

const SIZES = "(max-width: 760px) 100vw, 760px";

const MIME: Record<string, string> = { avif: "image/avif", webp: "image/webp", jpeg: "image/jpeg", jpg: "image/jpeg", png: "image/png" };

/** The picture itself: sources by format, the fallback with its size, and the blur until it has loaded. */
export function Picture({ image, lqip, alt, sizes = SIZES, eager = false, className = "" }: { image: Picture; lqip?: string | null; alt: string; sizes?: string; eager?: boolean; className?: string }) {
  const [loaded, setLoaded] = useState(false);
  const img = useRef<HTMLImageElement>(null);
  // an image already in the cache has loaded before React attached onLoad
  useEffect(() => {
    if (img.current?.complete) setLoaded(true);
  }, []);
  return (
    <picture
      className={`bp-picture ${loaded ? "loaded" : ""} ${className}`}
      style={{ aspectRatio: `${image.img.w} / ${image.img.h}`, backgroundImage: lqip ? `url("${lqip}")` : undefined }}
    >
      {Object.entries(image.sources).map(([format, srcSet]) => (
        <source key={format} type={MIME[format] ?? `image/${format}`} srcSet={srcSet} sizes={sizes} />
      ))}
      <img
        ref={img}
        src={image.img.src}
        width={image.img.w}
        height={image.img.h}
        alt={alt}
        loading={eager ? "eager" : "lazy"}
        decoding="async"
        fetchPriority={eager ? "high" : "auto"}
        onLoad={() => setLoaded(true)}
      />
    </picture>
  );
}

/** The largest file of a picture: what the zoom view shows. */
const largest = (image: Picture) => {
  const set = image.sources.webp ?? image.sources.avif;
  if (!set) return image.img.src;
  return set.split(",").map((s) => s.trim().split(/\s+/)[0]).filter(Boolean).at(-1) ?? image.img.src;
};

/**
 * A figure in a post. Raster images come optimised (``image`` and ``lqip``); anything else (SVG, GIF, an address on the web) comes as
 * ``src`` and is shown as it is. ``inline`` keeps a picture inside a sentence.
 */
export function Figure({ image, lqip, src, alt = "", caption, inline = false, wide = false }: { image?: Picture; lqip?: string | null; src?: string; alt?: string; caption?: string; inline?: boolean; wide?: boolean }) {
  const dialog = useRef<HTMLDialogElement>(null);
  if (inline) return image ? <img className="bp-inline" src={image.img.src} width={image.img.w} height={image.img.h} alt={alt} loading="lazy" decoding="async" /> : <img className="bp-inline" src={src} alt={alt} loading="lazy" />;
  const open = () => dialog.current?.showModal();
  const close = () => dialog.current?.close();
  return (
    <figure className={`bp-figure ${wide ? "wide" : ""}`}>
      <button type="button" className="bp-zoom" onClick={open} aria-label={`Open the image full size: ${alt}`}>
        {image ? <Picture image={image} lqip={lqip} alt={alt} /> : <img className="bp-plain" src={src} alt={alt} loading="lazy" decoding="async" />}
      </button>
      {caption && <figcaption>{caption}</figcaption>}
      <dialog ref={dialog} className="bp-lightbox" onClick={close} onKeyDown={(e) => e.key === "Escape" && close()}>
        <img src={image ? largest(image) : src} alt={alt} />
        {caption && <p>{caption}</p>}
        <button type="button" className="bp-lightbox-close" onClick={close} aria-label="Close">×</button>
      </dialog>
    </figure>
  );
}
