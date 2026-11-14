import { useState } from "react";

import { Icon } from "@/components/Icon";
import { SectionHead } from "@/components/home/Home";
import { Picture } from "@/components/home/Platform";
import { ProductFrame, useTicker } from "@/components/product/ProductFrame";
import { ProductHero } from "@/components/product/sections";

import "./storage.css";

/*
 * Storage, told through one file. The hero is a picture and its smaller copy. Then: a slider that asks the same image for a different
 * size, the address changing with it; three ways to hand out a file, drawn as doors; and where the bytes live, local disk or an
 * S3-compatible service. Nothing here appears on another product page.
 */

const WIDTHS = [64, 160, 320, 640, 1280];

function Sizes() {
  const [at, setAt] = useState(2);
  const w = WIDTHS[at];
  return (
    <section className="ix-section" aria-labelledby="st-sizes-title" data-plain="">
      <SectionHead id="st-sizes-title" title="Upload once, ask for any size" lead="Thumbnails and previews are made the first time they are asked for, then kept. Change the width in the address and you get that size." />
      <div className="st-sizes" data-reveal="up">
        <div className="st-frame" aria-hidden="true">
          <span className="st-pic" style={{ width: `${18 + at * 18}%` }}>
            <svg viewBox="0 0 120 90" preserveAspectRatio="none"><path d="M0 90 L36 50 L56 68 L82 38 L120 78 L120 90 Z" /><circle cx="90" cy="24" r="7" /></svg>
          </span>
        </div>
        <div className="st-controls">
          <code className="st-url">/storage/v1/products/lamp.jpg<b>?w={w}</b></code>
          <input type="range" min={0} max={WIDTHS.length - 1} step={1} value={at} onChange={(e) => setAt(Number(e.target.value))} aria-label="Image width" />
          <div className="st-ticks">{WIDTHS.map((x, i) => <span key={x} className={i === at ? "on" : ""}>{x}px</span>)}</div>
        </div>
      </div>
    </section>
  );
}

function Doors() {
  const left = 30 - (useTicker(1000, 0) % 31);
  return (
    <section className="ix-section ix-band" aria-labelledby="st-doors-title" data-plain="">
      <SectionHead id="st-doors-title" title="Three ways out the door" lead="Decide per bucket how files leave it. Public for what anyone may see, private behind your rules, or a link for one person that stops working when you say." />
      <div className="st-doors" data-reveal="up">
        <article className="st-door open">
          <div className="st-arch" aria-hidden="true"><span className="st-leaf" /></div>
          <h3>Public</h3>
          <p>Anyone with the address can see it. Logos, product images, anything meant to be seen.</p>
        </article>
        <article className="st-door locked">
          <div className="st-arch" aria-hidden="true"><span className="st-leaf" /><span className="st-lock"><Icon name="lock" size={18} variant="Linear" /></span></div>
          <h3>Private</h3>
          <p>Only the people your rules allow. Every download is checked, like every row.</p>
        </article>
        <article className="st-door timed">
          <div className="st-arch" aria-hidden="true"><span className="st-leaf" /><span className="st-clock">{String(left).padStart(2, "0")}<small>days</small></span></div>
          <h3>Share link</h3>
          <p>One file, to anyone, to view or download, until the day you choose.</p>
        </article>
      </div>
    </section>
  );
}

function Where() {
  const [s3, setS3] = useState(false);
  return (
    <section className="ix-section" aria-labelledby="st-where-title" data-plain="">
      <SectionHead id="st-where-title" title="Your bytes, where you want them" lead="Keep files on local disk or on any S3-compatible service. Your app, your rules and your links stay exactly the same.">
        <div className="st-pick" role="radiogroup" aria-label="Where files are kept">
          <button type="button" role="radio" aria-checked={!s3} onClick={() => setS3(false)}>Local disk</button>
          <button type="button" role="radio" aria-checked={s3} onClick={() => setS3(true)}>S3-compatible</button>
        </div>
      </SectionHead>
      <div className={`st-where ${s3 ? "s3" : ""}`} data-reveal="up" aria-hidden="true">
        <div className="st-app"><span>Your app</span><code>/storage/v1/…</code></div>
        <span className="st-pipe"><i /></span>
        <div className="st-bucket"><Icon name="storage" size={22} variant="Linear" /><b>products</b><small>bucket</small></div>
        <span className="st-pipe"><i /></span>
        <div className="st-backend">
          <span className={!s3 ? "on" : ""}><Icon name="database" size={18} variant="Linear" />Local disk</span>
          <span className={s3 ? "on" : ""}><Icon name="globe" size={18} variant="Linear" />S3-compatible</span>
        </div>
      </div>
    </section>
  );
}

export default function StoragePage() {
  return (
    <ProductFrame
      name="Storage"
      description="File storage with per-action access rules, share links that expire, image resizing, folders and S3-compatible backends."
      hero={
        <ProductHero
          title="Files with the same rules"
          quiet="as your data."
          lead="Buckets for uploads, images and documents, with access rules, share links and image resizing built in."
          art={<Picture />}
          notes={["Rules per action", "Share links that expire", "Resized on request"]}
        />
      }
    >
      <Sizes />
      <Doors />
      <Where />
    </ProductFrame>
  );
}
