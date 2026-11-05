import { Icon } from "@/components/Icon";
import { Sky } from "@/components/home/Home";
import { SiteNav } from "@/components/site/SiteNav";
import { Band, HeroActions, ProductFrame, useTicker } from "@/components/product/ProductFrame";
import "./storage.css";

/* Files as objects: columns of them drift past the hero, one picture climbs a staircase of sizes, three ways for a file to leave, and a rule per action. */

type Sheet = { kind: "photo" | "doc" | "clip"; tall?: boolean; name: string; tone?: number };
const WALL: Sheet[][] = [
  [{ kind: "photo", tall: true, name: "team.jpg", tone: 1 }, { kind: "doc", name: "invoice.pdf" }, { kind: "photo", name: "logo.png", tone: 2 }, { kind: "clip", name: "demo.mp4" }, { kind: "doc", name: "contract.pdf" }],
  [{ kind: "doc", name: "report.pdf" }, { kind: "photo", name: "avatar.webp", tone: 3 }, { kind: "photo", tall: true, name: "product.jpg", tone: 2 }, { kind: "doc", name: "terms.pdf" }, { kind: "photo", name: "cover.png", tone: 1 }],
  [{ kind: "clip", name: "intro.mp4" }, { kind: "photo", tall: true, name: "office.jpg", tone: 3 }, { kind: "doc", name: "receipt.pdf" }, { kind: "photo", name: "banner.jpg", tone: 1 }, { kind: "doc", name: "brief.pdf" }],
];
const SIZES = [48, 96, 160, 256, 400];
const ACCESS: [string, string, string][] = [
  ["Upload", "Signed-in users", "users"],
  ["Read", "Anyone", "search"],
  ["Delete", "Admins", "policies"],
];
const MORE: [string, string][] = [
  ["Folders", "Organise files the way your app thinks about them."],
  ["Files beside records", "Keep files linked to the records they belong to."],
  ["Profile pictures", "Avatars for your users, ready to use."],
  ["Kept where you want", "On local disk or any S3-compatible service."],
];

function FileSheet({ item }: { item: Sheet }) {
  return (
    <div className={`st-file ${item.kind} ${item.tall ? "tall" : ""} tone-${item.tone ?? 0}`}>
      <div className="st-art">{item.kind === "clip" && <Icon name="play" size={22} variant="Linear" />}{item.kind === "doc" && <><i /><i /><i /><i /></>}</div>
      <span>{item.name}</span>
    </div>
  );
}

function Countdown() {
  const left = 3599 - (useTicker(1000) % 3600);
  const clock = `${String(Math.floor(left / 60)).padStart(2, "0")}:${String(left % 60).padStart(2, "0")}`;
  return <b className="st-clock" aria-hidden="true">{clock}</b>;
}

export default function StoragePage() {
  const size = useTicker(1300) % SIZES.length;
  return (
    <ProductFrame name="Storage" description="File storage with per-action access rules, share links that expire, image resizing, folders and S3-compatible backends.">
      <section className="ix-hero st-hero" aria-labelledby="product-title" data-plain="">
        <Sky seed={41} />
        <SiteNav />
        <div className="st-split">
          <div className="st-copy">
            <h1 id="product-title" data-reveal="up">Files with the same rules as your data.</h1>
            <p data-reveal="up">Buckets for uploads, images and documents, with access rules, share links and image resizing built in.</p>
            <HeroActions />
          </div>
          <div className="st-wall" aria-hidden="true">
            {WALL.map((column, c) => (
              <div key={c} className={`st-column c${c}`}>
                {[...column, ...column].map((item, i) => <FileSheet key={i} item={item} />)}
              </div>
            ))}
          </div>
        </div>
      </section>

      <Band label="Images resized on request" className="st-sizes">
        <div className="st-sizes-copy">
          <h2>One upload.<br />Every size.</h2>
          <p>Thumbnails and previews are made when they are asked for, so you never store every version.</p>
        </div>
        <div className="st-stairs" aria-hidden="true">
          {SIZES.map((px, i) => (
            <div key={px} className={`st-step ${i === size ? "on" : ""}`}>
              <div className="st-pic" style={{ width: px / 2.6, height: px / 2.6 }} />
              <small>{px}px</small>
            </div>
          ))}
        </div>
      </Band>

      <Band label="Hand out files the right way" className="st-doors">
        <article>
          <span className="st-door-mark open"><Icon name="search" size={24} variant="Linear" /></span>
          <h3>Public</h3>
          <p>Anyone with the address can see it.</p>
        </article>
        <article>
          <span className="st-door-mark"><Icon name="policies" size={24} variant="Linear" /></span>
          <h3>Private</h3>
          <p>Only the people your rules allow.</p>
        </article>
        <article className="hot">
          <Countdown />
          <h3>Share link</h3>
          <p>Send one file to anyone, to view or download, for as long as you choose.</p>
        </article>
      </Band>

      <Band label="Rules for every action" className="st-rules">
        <h2>Who can do what, bucket by bucket.</h2>
        <ul>
          {ACCESS.map(([action, who]) => <li key={action}><b>{action}</b><i /><span>{who}</span></li>)}
        </ul>
      </Band>

      <Band label="Everything in Storage" className="st-more">
        {MORE.map(([title, line]) => <article key={title}><h3>{title}</h3><p>{line}</p></article>)}
      </Band>
    </ProductFrame>
  );
}
