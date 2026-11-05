import type { CSSProperties } from "react";

import { Icon, type IconName } from "@/components/Icon";
import { APP, Arrow, DOCS, InnerRails, Lines, Rule, SectionHead, Sky } from "@/components/home/Home";
import { Closing } from "@/components/home/Sections";
import { Footer } from "@/components/landing/Footer";
import { ScrollMotion } from "@/components/landing/ScrollMotion";
import { PRODUCTS, SiteNav } from "@/components/site/SiteNav";
import { usePageMeta } from "@/hooks/usePageMeta";

import "@/components/home/bento.css";
import "./product.css";

/*
 * A product's marketing page, in the home page's system: the sky hero (the product's name, and what it does for you
 * in orange), a bento of four tiles in the home page's layout, the capabilities in the home page's touching grid,
 * the products that work with it, and the closing band. Each page supplies only its words. Every capability named
 * here exists in Pawabase today; nothing internal is explained, that is what the docs are for.
 */

/** A bento tile: a wide one shows a cluster of chips, a narrow one a huge outlined word, the orange one only words. */
export type Tile =
  | { kind: "chips"; icon: IconName; title: string; line: string; chips: string[] }
  | { kind: "word"; icon: IconName; title: string; line: string; word: string }
  | { kind: "solid"; icon: IconName; title: string; line: string };

export type Capability = { icon: IconName; title: string; line: string };

export type ProductInfo = {
  icon: IconName;
  name: string;
  /** The page's meta description. */
  description: string;
  /** What the product does for you, in a few words: set in orange under the name. */
  promise: string;
  line: string;
  /** In order: wide chips, solid, narrow word, wide chips (the home page's bento layout). */
  tiles: [Tile, Tile, Tile, Tile];
  capabilities: Capability[];
};

function TileView({ tile, place }: { tile: Tile; place: "a" | "b" | "c" | "d" }) {
  const copy = (
    <div className={`cf-copy ${tile.kind === "solid" ? "top" : ""}`}>
      <h3>{tile.title}</h3>
      <p>{tile.line}</p>
    </div>
  );
  if (tile.kind === "solid")
    return (
      <article className={`cf-tile cf-solid mp-${place}`}>
        <Icon name={tile.icon} size={28} variant="Linear" />
        {copy}
      </article>
    );
  if (tile.kind === "word")
    return (
      <article className={`cf-tile mp-tile mp-${place}`}>
        <span className="mp-tile-icon"><Icon name={tile.icon} size={20} variant="Linear" /></span>
        <span className="mp-word" aria-hidden="true">{tile.word}</span>
        {copy}
      </article>
    );
  return (
    <article className={`cf-tile mp-tile mp-${place}`}>
      <div className="mp-chips-top">
        <span className="mp-tile-icon"><Icon name={tile.icon} size={20} variant="Linear" /></span>
        <ul className="mp-chips" aria-label={tile.title}>
          {tile.chips.map((chip, i) => <li key={chip} style={{ "--i": i } as CSSProperties}>{chip}</li>)}
        </ul>
      </div>
      {copy}
    </article>
  );
}

/** The products to suggest after this one: the rest of its group first, then whatever follows, four in all. */
function related(name: string) {
  const all = PRODUCTS.flatMap((g) => g.items.map((item) => ({ ...item, group: g.title })));
  const at = all.findIndex((p) => p.label === name);
  const here = all[at];
  const others = all.filter((p) => p !== here);
  const same = others.filter((p) => p.group === here?.group);
  const after = [...all.slice(at + 1), ...all.slice(0, Math.max(0, at))];
  return [...new Set([...same, ...after])].slice(0, 4);
}

export function ProductPage({ icon, name, description, promise, line, tiles, capabilities }: ProductInfo) {
  usePageMeta(`${name} | Pawabase`, description);
  const more = related(name);
  const cols = 3;
  const rows = Math.ceil(capabilities.length / cols);

  return (
    <div className="ix-page">
      <ScrollMotion />
      <main className="ix-shell">
        <InnerRails />

        <section className="ix-hero pp-hero" aria-labelledby="product-title" data-plain="">
          <Sky seed={23} />
          <SiteNav />
          <div className="pp-hero-copy">
            <span className="pp-mark" aria-hidden="true"><Icon name={icon} size={30} variant="Linear" /></span>
            <h1 id="product-title" data-reveal="up">
              <span>{name}</span>
              <span className="hot">{promise}</span>
            </h1>
            <p data-reveal="up">{line}</p>
            <div className="pp-hero-actions" data-reveal="up">
              <a href={APP} className="ix-btn primary">Start building <Arrow /></a>
              <a href={DOCS} className="ix-btn" target="_blank" rel="noreferrer">Read the docs</a>
            </div>
          </div>
        </section>

        <section className="ix-section" aria-labelledby="glance-title" data-plain="">
          <Rule />
          <SectionHead id="glance-title" title={`What you can do with ${name}`} />
          <div className="ix-panel cf-panel" data-reveal="up">
            <Rule />
            <div className="cf-bento">
              <i className="cf-corner tl" /><i className="cf-corner tr" /><i className="cf-corner bl" /><i className="cf-corner br" />
              <TileView tile={tiles[0]} place="a" />
              <TileView tile={tiles[1]} place="b" />
              <TileView tile={tiles[2]} place="c" />
              <TileView tile={tiles[3]} place="d" />
            </div>
          </div>
        </section>

        <section className="ix-section" aria-labelledby="caps-title" data-plain="">
          <Rule />
          <SectionHead id="caps-title" title={`Everything in ${name}`}>
            <a href={DOCS} className="ix-btn caps" target="_blank" rel="noreferrer">Read the docs <Arrow /></a>
          </SectionHead>
          <div className="ix-panel mp-caps" data-reveal="up">
            <Rule />
            <Lines
              v={[[1 / 3, 0, 1], [2 / 3, 0, 1]]}
              h={Array.from({ length: rows - 1 }, (_, r) => [(r + 1) / rows, 0, 1] as [number, number, number])}
              marks={[
                [1 / 3, 0, "sq"], [2 / 3, 0, "sq"], [1 / 3, 1, "sq"], [2 / 3, 1, "sq"],
                ...Array.from({ length: rows - 1 }, (_, r) => [[1 / 3, (r + 1) / rows], [2 / 3, (r + 1) / rows], [0, (r + 1) / rows, "sq"], [1, (r + 1) / rows, "sq"]] as [number, number, "sq"?][]).flat(),
              ] as [number, number, ("plus" | "sq")?][]}
            />
            {capabilities.map((c, i) => (
              <article key={c.title} className="mp-cap">
                <span className="mp-cap-n" aria-hidden="true">{String(i + 1).padStart(2, "0")}</span>
                <span className="mp-cap-icon"><Icon name={c.icon} size={18} variant="Linear" /></span>
                <h3>{c.title}</h3>
                <p>{c.line}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="ix-section" aria-labelledby="related-title" data-plain="">
          <Rule />
          <SectionHead id="related-title" title={`Works with ${name}`} />
          <div className="ix-panel pp-related" data-reveal="up">
            <Rule />
            <div className="pp-related-grid">
              <i className="pp-corner tl" /><i className="pp-corner tr" /><i className="pp-corner bl" /><i className="pp-corner br" />
              {more.map((p) => (
                <a key={p.href} href={p.href} className="pp-tile">
                  <span className="pp-tile-icon"><Icon name={p.icon} size={20} variant="Linear" /></span>
                  <span className="pp-tile-text">
                    <b>{p.label}</b>
                    <small>{p.line}</small>
                  </span>
                  <span className="pp-tile-go" aria-hidden="true"><Arrow /></span>
                </a>
              ))}
            </div>
          </div>
        </section>

        <Closing />
        <div className="ix-footer">
          <Rule />
          <Footer />
        </div>
      </main>
    </div>
  );
}
