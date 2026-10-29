import type { CSSProperties } from "react";

import { backdrop } from "@/components/landing/Backdrops";
import { Figure } from "@/components/landing/hairline/Hairline";
import { Band, Card } from "@/components/landing/Section";
import { Mockup, PASTELS } from "@/components/landing/studio/Studio";
import {
  CodeCard,
  Copy,
  Display,
  HeroActions,
  ProductCta,
  ProductName,
  ProductShell,
  Split,
} from "@/components/product/kit";

function Mug({ size }: { size: number }) {
  return (
    <svg viewBox="0 0 104 84" width={size} height={(size * 84) / 104} className="rounded-[10px]" style={{ background: PASTELS.peach }} aria-hidden="true">
      <rect x="36" y="24" width="30" height="34" rx="4" fill="#101315" opacity="0.86" />
      <path d="M66 32h5a7 7 0 0 1 0 14h-5" fill="none" stroke="#101315" strokeOpacity="0.86" strokeWidth="4" />
      <ellipse cx="51" cy="64" rx="22" ry="2.5" fill="#101315" opacity="0.12" />
    </svg>
  );
}

function Transforms() {
  return (
    <div className="flex flex-wrap items-end justify-center gap-[clamp(24px,4vw,56px)]">
      {[
        { size: 96, label: "Thumbnail", meta: "200 px · 9 KB" },
        { size: 180, label: "Card", meta: "800 px · 61 KB" },
        { size: 300, label: "Original", meta: "2400 px · 2.4 MB" },
      ].map((v) => (
        <figure key={v.label} className="flex flex-col items-center gap-3">
          <Mug size={v.size} />
          <figcaption className="text-center">
            <span className="block text-[14px] text-text">{v.label}</span>
            <span className="block font-[PP_Neue_Montreal,sans-serif] text-[12px] text-faint">{v.meta}</span>
          </figcaption>
        </figure>
      ))}
    </div>
  );
}

function DirectUpload() {
  const steps = [
    { x: 40, title: "Your app", note: "asks for an upload slot" },
    { x: 330, title: "Pawabase", note: "returns a signed link" },
    { x: 620, title: "Bucket", note: "receives the file directly" },
  ];
  const path = "M200 120 C 250 120 280 120 330 120 M490 120 C540 120 570 120 620 120";
  return (
    <Figure width={800} height={240} label="Your app asks Pawabase for a signed upload link, then sends the file straight to the bucket without passing through your server" className="h-auto w-full min-w-[620px]">
      {steps.map((s, i) => (
        <g key={s.title}>
          <rect x={s.x} y={80} width={160} height={80} rx={12} style={{ stroke: i === 2 ? "rgba(245,243,238,0.8)" : "rgba(245,243,238,0.3)" }} />
          <text x={s.x + 80} y={116} textAnchor="middle" fontSize="14" fontFamily="PP Neue Montreal, sans-serif" fill="#F5F3EE">{s.title}</text>
          <text x={s.x + 80} y={138} textAnchor="middle" fontSize="10.5" fill="#70757D">{s.note}</text>
        </g>
      ))}
      <path className="hl-line" d={path} style={{ stroke: "rgba(245,243,238,0.2)" }} />
      <path className="hl-line hl-flow" d="M120 160 C120 220 700 220 700 160" style={{ stroke: "rgba(245,243,238,0.75)" }} />
      <text x={410} y={214} textAnchor="middle" fontSize="11" fill="#70757D">the file goes straight to storage</text>
      <circle r={3.5} className="hl-travel" style={{ fill: "#F5F3EE", stroke: "none", "--path": 'path("M120 160 C120 220 700 220 700 160")', "--dur": "3s" } as CSSProperties} />
    </Figure>
  );
}

const BUCKETS = [
  ["product-images", "Anyone can read", "Staff can upload"],
  ["avatars", "Signed-in people can read", "Owners can replace their own"],
  ["invoices", "Only the owner can read", "Created by your flows"],
  ["exports", "Private", "Shared with expiring links"],
];

function BucketRules() {
  return (
    <Card className="p-3">
      <Mockup label="Four buckets and who can read and write each one" className="sx-window block">
        <div className="grid h-[38px] grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)_minmax(0,1.2fr)] items-center border-b border-[var(--sx-line)] bg-[var(--sx-head)] px-5 text-[12px] text-[var(--sx-muted)]">
          <span>Bucket</span>
          <span>Read</span>
          <span>Write</span>
        </div>
        {BUCKETS.map(([name, read, write]) => (
          <div key={name} className="grid h-[50px] grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)_minmax(0,1.2fr)] items-center border-b border-[var(--sx-line-soft)] px-5 text-[12.5px] last:border-b-0">
            <span className="sx-mono">{name}</span>
            <span className="truncate pr-3 text-[var(--sx-muted)]">{read}</span>
            <span className="truncate text-[var(--sx-muted)]">{write}</span>
          </div>
        ))}
      </Mockup>
    </Card>
  );
}

const HERO_BUCKETS = [
  ["product-images", "Public"],
  ["avatars", "Signed in"],
  ["invoices", "Owner only"],
  ["exports", "Private"],
];

const HERO_FILES = [
  { name: "mug.jpg", size: "2.4 MB", tone: PASTELS.peach },
  { name: "tote.jpg", size: "1.8 MB", tone: PASTELS.lavender },
  { name: "notebook.jpg", size: "2.1 MB", tone: PASTELS.butter },
  { name: "cap.jpg", size: "1.2 MB", tone: PASTELS.mint },
  { name: "bottle.jpg", size: "3.0 MB", tone: PASTELS.sky },
  { name: "poster.jpg", size: "4.2 MB", tone: PASTELS.rose },
];

function StorageHero() {
  return (
    <Card className="p-2 min-[768px]:p-3">
      <Mockup label="Pawabase Studio showing the product-images bucket with six photos and a share link that expires in five minutes" className="sx-window flex min-h-[440px] overflow-hidden">
        <aside className="hidden w-[188px] flex-none flex-col gap-1 border-r border-[var(--sx-line)] p-3 min-[560px]:flex">
          <span className="mb-2 px-2.5 pt-1 text-[12px] text-[var(--sx-faint)]">Buckets</span>
          {HERO_BUCKETS.map(([name, access], i) => (
            <span key={name} className="sx-nav !h-auto flex-col !items-start gap-0 py-2 mb-1" data-on={i === 0 ? "" : undefined}>
              <span className="sx-mono">{name}</span>
              <span className="text-[11.5px] text-[var(--sx-faint)]">{access}</span>
            </span>
          ))}
        </aside>
        <div className="flex min-w-0 flex-1 flex-col">
          <div className="flex h-[52px] flex-none items-center justify-between border-b border-[var(--sx-line)] px-5">
            <span className="text-[15px] font-semibold">product-images</span>
            <span className="sx-btn sx-btn-primary">Upload</span>
          </div>
          <div className="grid flex-1 grid-cols-2 content-start gap-3 p-5 min-[640px]:grid-cols-3">
            {HERO_FILES.map((file, i) => (
              <div key={file.name} className={`overflow-hidden rounded-[10px] border ${i === 0 ? "border-[var(--sx-brand)]" : "border-[var(--sx-line)]"}`}>
                <div className="h-[82px]" style={{ background: file.tone }} />
                <div className="flex flex-col px-3 py-2 text-[12px] leading-[1.4]">
                  <span className="truncate">{file.name}</span>
                  <span className="text-[var(--sx-faint)]">{file.size}</span>
                </div>
              </div>
            ))}
          </div>
          <div className="flex flex-wrap items-center justify-between gap-3 border-t border-[var(--sx-line)] px-5 py-3 text-[12.5px]">
            <span className="flex items-center gap-2 whitespace-nowrap text-[var(--sx-muted)]">
              <span className="sx-dot" style={{ background: "var(--sx-ok)" }} />
              mug.jpg · share link expires in 5 min
            </span>
            <span className="sx-btn">Copy link</span>
          </div>
        </div>
      </Mockup>
    </Card>
  );
}

export default function StoragePage() {
  return (
    <ProductShell title="Storage" description="Buckets with access rules, image resizing and links that expire, on local disk or any S3-compatible service.">
      <Band className="pb-[clamp(56px,7vw,96px)] pt-[clamp(56px,7vw,96px)]" backdrop={backdrop.dots("70%", "50%")}>
        <Split
          ratio="1fr_1fr"
          copy={
            <div className="flex flex-col gap-6">
              <ProductName icon="storage" name="Storage" />
              <Display quiet="With the same rules." className="!text-[clamp(40px,4.4vw,64px)]">Files that follow along.</Display>
              <p className="max-w-[40ch] text-[18px] leading-[1.6] tracking-[-0.01em] text-muted">
                Avatars, product photos, invoices, exports. Upload them, serve
                them, and decide who sees each one, without a separate service
                to wire up.
              </p>
              <HeroActions />
            </div>
          }
          visual={<StorageHero />}
        />
      </Band>

      <Band labelledBy="st-transform" className="py-[clamp(72px,9vw,120px)]">
        <Copy id="st-transform" center title="One upload. Every size." quiet="Made when they're asked for.">
          Upload the original once and ask for the size each screen needs.
          Pages load faster and you never store a stack of copies.
        </Copy>
        <Card className="mx-auto mt-12 max-w-[980px] px-6 py-12">
          <Transforms />
        </Card>
      </Band>

      <Band labelledBy="st-direct" className="py-[clamp(72px,9vw,120px)]" backdrop={backdrop.lines("50%", "60%")}>
        <Copy id="st-direct" center title="Uploads that skip your server." quiet="Big files, no bottleneck.">
          Hand the browser a signed link and the file goes straight to storage.
          The link is the permission, and it expires on its own.
        </Copy>
        <Card className="mx-auto mt-12 max-w-[1000px] overflow-x-auto px-6 py-10">
          <DirectUpload />
        </Card>
      </Band>

      <Band labelledBy="st-rules" className="py-[clamp(72px,9vw,120px)]">
        <Split
          ratio="wide-visual"
          copy={
            <Copy id="st-rules" title="A rule for every bucket." quiet="Set by action." link={{ label: "See access policies", href: "/products/policies" }}>
              Reading, uploading and deleting can each follow their own rule,
              written the same way as the rules for your data.
            </Copy>
          }
          visual={<BucketRules />}
        />
      </Band>

      <Band labelledBy="st-code" className="py-[clamp(72px,9vw,120px)]">
        <Split
          flip
          copy={
            <Copy id="st-code" title="Upload, link, done." quiet="From any client.">
              Store a file, hand out a link that expires, and show public
              images with a plain URL.
            </Copy>
          }
          visual={
            <CodeCard
              file="avatar.ts"
              label="Uploading an avatar, creating a five-minute link, and getting a public image URL"
              lines={[
                'const avatars = pawabase.storage.from("avatars");',
                "",
                'await avatars.upload("u1/me.png", file);',
                "",
                'const { url } = await avatars.createSignedUrl("u1/me.png", {',
                "  expiresIn: 300,",
                "});",
                "",
                'const src = pawabase.storage.from("product-images").getPublicUrl("mug.jpg");',
              ]}
            />
          }
        />
      </Band>

      <Band labelledBy="st-yours" className="py-[clamp(88px,10vw,140px)]" backdrop={backdrop.hatch("50%", "50%")}>
        <div className="mx-auto max-w-[900px] text-center">
          <h2 id="st-yours" className="text-[clamp(28px,3.4vw,46px)] font-normal leading-[1.15] tracking-[-0.045em] text-text text-balance">
            Keep files on local disk while you build.
            <span className="text-muted"> Move them to any S3-compatible service when you grow. Your app doesn't change.</span>
          </h2>
        </div>
      </Band>

      <ProductCta
        title="Bring your files."
        quiet="We'll keep them in order."
        next={{ label: "Next: Realtime", href: "/products/realtime" }}
        backdrop={backdrop.glow("50%", "100%", "1000px", "420px")}
      />
    </ProductShell>
  );
}
