import { SiApple, SiGithub, SiGoogle } from "@icons-pack/react-simple-icons";
import type { ReactNode } from "react";

import { Icon, type IconName } from "@/components/Icon";

import { backdrop } from "./Backdrops";
import { Band, Card, Lead } from "./Section";
import {
  Initials,
  Mockup,
  PASTELS,
  useInView,
  useLiveTick,
} from "./studio/Studio";

/* ── tile ──────────────────────────────────────────────────────────────── */

/** A feature card: Bulk icon and name, one line, then the product itself in full. */
function Tile({
  icon,
  title,
  line,
  label,
  className = "",
  preview,
  children,
}: {
  icon: IconName;
  title: string;
  line: string;
  label: string;
  className?: string;
  /** Height of the preview window, so tiles in a row line up. */
  preview: string;
  children: ReactNode;
}) {
  return (
    <Card className={`flex flex-col p-6 min-[768px]:p-7 ${className}`}>
      <h3 className="flex items-center gap-2.5 text-[19px] font-medium tracking-[-0.025em] text-text">
        <Icon name={icon} size={22} variant="Bulk" className="text-brand" />
        {title}
      </h3>
      <p className="mt-2.5 max-w-[46ch] text-[16.5px] leading-[1.5] tracking-[-0.01em] text-muted">
        {line}
      </p>
      <div className="flex-1" />
      <Mockup
        label={label}
        className={`fade-b mt-6 overflow-hidden rounded-[14px] bg-shell ring-1 ring-white/[0.06] [--fade-at:78%] ${preview}`}
      >
        {children}
      </Mockup>
    </Card>
  );
}

const Bar = ({ children }: { children: ReactNode }) => (
  <div className="flex h-[38px] items-center justify-between gap-3 border-b border-[var(--sx-line)] px-4 text-[12px]">
    {children}
  </div>
);

/* ── previews ──────────────────────────────────────────────────────────── */

const COLS = "grid-cols-[minmax(0,0.8fr)_minmax(0,1.3fr)_minmax(0,0.7fr)_minmax(0,0.7fr)]";

const ORDERS = [
  ["01JD7…4c1", "Amara Okafor", "248.00", "paid"],
  ["01JD7…12a", "Lucas Moreau", "64.50", "paid"],
  ["01JD7…28b", "Priya Raman", "1,120.00", "pending"],
  ["01JD7…39c", "Kwame Mensah", "89.99", "paid"],
  ["01JD7…41d", "Sofia Lindqvist", "312.40", "refunded"],
  ["01JD7…57e", "Daniel Haddad", "45.00", "paid"],
  ["01JD7…63f", "Yuki Tanaka", "730.25", "paid"],
];
const ARRIVING = [
  ["01JD8…0a2", "Mateo Rossi", "176.00", "pending"],
  ["01JD8…1f7", "Zainab Bello", "54.90", "pending"],
  ["01JD8…3c9", "Oliver Grant", "389.00", "pending"],
];

function DatabasePreview() {
  const { ref, inView } = useInView<HTMLDivElement>();
  const tick = useLiveTick(inView, 3200);
  const rows = [
    ...Array.from({ length: tick }, (_, i) => ARRIVING[i % ARRIVING.length]).reverse(),
    ...ORDERS,
  ].slice(0, 7);

  return (
    <div ref={ref}>
      <Bar>
        <span className="sx-mono text-[var(--sx-muted)]">northwind / orders</span>
        <span className="flex items-center gap-2 text-[var(--sx-faint)]">
          <span key={tick} className="sx-live" data-pulse={tick ? "" : undefined} />
          <span className="sx-num">{(1284 + tick).toLocaleString("en-US")} rows</span>
        </span>
      </Bar>
      <div className="sx-mono truncate border-b border-[var(--sx-line)] px-4 py-2.5 text-[11.5px] text-[var(--sx-faint)]">
        <span className="text-[var(--sx-brand)]">GET</span> /rest/v1/orders?filter[status]=eq.paid&amp;sort=-created_at
      </div>
      <div className={`grid ${COLS} border-b border-[var(--sx-line)] px-4 py-2 text-[11.5px] text-[var(--sx-faint)]`}>
        <span>id</span>
        <span>customer</span>
        <span className="text-right">total</span>
        <span className="pl-5">status</span>
      </div>
      {rows.map(([id, name, total, status], i) => (
        <div
          key={i === 0 ? `${id}${tick}` : id}
          className={`grid h-[36px] ${COLS} items-center border-b border-[var(--sx-line-soft)] px-4 text-[12.5px] [--sx-row:36px] ${i === 0 && tick ? "sx-row-in" : ""}`}
        >
          <span className="sx-mono truncate text-[var(--sx-faint)]">{id}</span>
          <span className="truncate">{name}</span>
          <span className="sx-num text-right">{total}</span>
          <span className="truncate pl-5 text-[var(--sx-muted)]">{status}</span>
        </div>
      ))}
    </div>
  );
}

function AuthPreview() {
  const { ref, inView } = useInView<HTMLDivElement>();
  const tick = useLiveTick(inView, 650);
  const typed = tick % 10;

  return (
    <div ref={ref} className="mx-auto max-w-[360px] px-5 pt-5">
      <div className="text-[14px] font-medium">Welcome back</div>
      <div className="text-[12px] text-[var(--sx-faint)]">Sign in to Northwind</div>
      <div className="mt-4 grid grid-cols-3 gap-2">
        {[
          ["Google", SiGoogle],
          ["GitHub", SiGithub],
          ["Apple", SiApple],
        ].map(([name, Mark]) => {
          const M = Mark as typeof SiGoogle;
          return (
            <span key={name as string} className="sx-btn h-[34px] justify-center text-[12px]">
              <M size={12} />
              {name as string}
            </span>
          );
        })}
      </div>
      <div className="my-3.5 flex items-center gap-3 text-[10.5px] text-[var(--sx-faint)]">
        <span className="h-px flex-1 bg-[var(--sx-line)]" />
        OR
        <span className="h-px flex-1 bg-[var(--sx-line)]" />
      </div>
      <div className="sx-input h-[34px] text-[12.5px]">ada@nwosu.dev</div>
      <div className="mt-4 text-[12px] text-[var(--sx-muted)]">Enter your two-step code</div>
      <div className="mt-2 grid grid-cols-6 gap-1.5">
        {"482915".split("").map((digit, i) => (
          <span
            key={i}
            className="sx-mono grid h-[38px] place-items-center rounded-[6px] border text-[14px] transition-colors duration-300"
            style={{ borderColor: i === typed ? "var(--sx-brand)" : "var(--sx-line)" }}
          >
            {i < typed ? digit : ""}
          </span>
        ))}
      </div>
      <span className="sx-btn sx-btn-primary mt-4 h-[34px] w-full justify-center">Verify</span>
    </div>
  );
}

const EVENTS = [
  ["UPDATE", "orders · 1042", "shipped"],
  ["INSERT", "messages", "on its way!"],
  ["UPDATE", "orders · 1043", "packed"],
  ["INSERT", "orders", "1291"],
];

function RealtimePreview() {
  const { ref, inView } = useInView<HTMLDivElement>();
  const tick = useLiveTick(inView, 2600);
  const shown = Array.from({ length: 4 }, (_, i) => EVENTS[(tick + i) % EVENTS.length]);

  return (
    <div ref={ref}>
      <Bar>
        <span className="flex -space-x-1.5">
          {[
            ["Ada Nwosu", PASTELS.peach],
            ["Kwame Mensah", PASTELS.mint],
            ["Ines Laurent", PASTELS.rose],
          ].map(([name, tone]) => (
            <span key={name} className="rounded-full ring-2 ring-[#08090a]">
              <Initials name={name} tone={tone} size={18} />
            </span>
          ))}
        </span>
        <span className="flex items-center gap-2 text-[var(--sx-faint)]">
          <span key={tick} className="sx-live" data-pulse={tick ? "" : undefined} />
          3 online
        </span>
      </Bar>
      {shown.map(([kind, target, detail], i) => (
        <div
          key={`${tick}-${i}`}
          className={`grid h-[36px] grid-cols-[60px_minmax(0,1fr)_minmax(0,0.7fr)] items-center border-b border-[var(--sx-line-soft)] px-4 text-[12px] [--sx-row:36px] ${i === 0 && tick ? "sx-row-in" : ""}`}
        >
          <span className="sx-mono text-[10.5px]" style={{ color: kind === "INSERT" ? "var(--sx-ok)" : "var(--sx-info)" }}>
            {kind}
          </span>
          <span className="sx-mono truncate">{target}</span>
          <span className="truncate text-right text-[var(--sx-muted)]">{detail}</span>
        </div>
      ))}
    </div>
  );
}

function StoragePreview() {
  return (
    <div className="grid h-full grid-cols-[minmax(0,1fr)_minmax(0,1fr)] gap-4 p-4">
      <svg viewBox="0 0 104 84" className="h-[150px] w-full rounded-[8px]" style={{ background: PASTELS.peach }} aria-hidden="true">
        <rect x="36" y="24" width="30" height="34" rx="4" fill="#211f2c" opacity="0.86" />
        <path d="M66 32h5a7 7 0 0 1 0 14h-5" fill="none" stroke="#211f2c" strokeOpacity="0.86" strokeWidth="4" />
      </svg>
      <div className="grid content-start gap-3 text-[12px]">
        <div className="truncate font-medium">mug.jpg</div>
        {[
          ["Width", "1200", 0.7],
          ["Quality", "80", 0.8],
        ].map(([name, value, fill]) => (
          <div key={name as string}>
            <div className="flex justify-between text-[var(--sx-muted)]">
              <span>{name as string}</span>
              <span className="sx-num">{value as string}</span>
            </div>
            <div className="mt-1.5 h-[3px] rounded-full bg-[var(--sx-line)]">
              <div className="h-full rounded-full bg-[var(--sx-muted)]" style={{ width: `${(fill as number) * 100}%` }} />
            </div>
          </div>
        ))}
        <div className="sx-num text-[var(--sx-faint)]">2.4 MB → 412 KB</div>
        <div className="sx-mono truncate text-[11px] text-[var(--sx-faint)]">link expires in 15 min</div>
      </div>
    </div>
  );
}

const FIREWALL = [
  ["1", "Block", "ip in 203.0.113.0/24"],
  ["2", "Limit", "/auth/* · 10 per min"],
  ["3", "Allow", "key pb_pk_… · /rest/v1/*"],
];

function SecurityPreview() {
  const { ref, inView } = useInView<HTMLDivElement>();
  const tick = useLiveTick(inView, 1800);
  const hit = tick % FIREWALL.length;

  return (
    <div ref={ref}>
      <Bar>
        <span className="text-[var(--sx-muted)]">Firewall · in order</span>
        <span className="text-[var(--sx-faint)]">CORS · keys · secrets</span>
      </Bar>
      {FIREWALL.map(([n, action, rule], i) => (
        <div
          key={n}
          className="grid h-[36px] grid-cols-[22px_54px_minmax(0,1fr)] items-center border-b border-[var(--sx-line-soft)] px-4 text-[12px] transition-colors duration-500"
          style={{ background: i === hit && tick ? "var(--sx-brand-soft)" : "transparent" }}
        >
          <span className="sx-mono text-[var(--sx-faint)]">{n}</span>
          <span className="font-medium">{action}</span>
          <span className="sx-mono truncate text-[var(--sx-muted)]">{rule}</span>
        </div>
      ))}
      <div key={tick} className="sx-swap sx-mono truncate px-4 py-3 text-[11.5px] text-[var(--sx-faint)]">
        {["403 · 203.0.113.7 blocked", "429 · /auth/v1/token rate limited", "200 · GET /rest/v1/orders"][hit]}
      </div>
    </div>
  );
}

function AutomationPreview() {
  const { ref, inView } = useInView<HTMLDivElement>();
  const tick = useLiveTick(inView, 1600);
  const items: [IconName, string, string][] = [
    ["scheduling", "Nightly digest", "Every day at 07:00"],
    ["webhooks", "Payment received", "Marks the order paid"],
    ["database", "Order created", "Reserves stock, sends the receipt"],
    ["mail", "Welcome email", "Sent on sign-up"],
  ];
  const running = tick % items.length;

  return (
    <div ref={ref} className="grid grid-cols-1 gap-2 p-3 min-[560px]:grid-cols-2">
      {items.map(([icon, name, detail], i) => (
        <div
          key={name}
          className="flex items-center gap-3 rounded-[10px] border px-3 py-3 transition-colors duration-500"
          style={{ borderColor: i === running && tick ? "var(--sx-brand)" : "var(--sx-line)" }}
        >
          <Icon name={icon} size={18} variant="Bulk" className="flex-none text-[var(--sx-muted)]" />
          <span className="min-w-0 leading-[1.35]">
            <span className="block truncate text-[12.5px] font-medium">{name}</span>
            <span className="block truncate text-[11.5px] text-[var(--sx-faint)]">{detail}</span>
          </span>
        </div>
      ))}
    </div>
  );
}

function RulesPreview() {
  return (
    <div className="grid gap-2 p-4">
      <div className="text-[12px] text-[var(--sx-faint)]">orders · read, update when</div>
      <div className="sx-input h-[32px] text-[12px]">Owns the record · <span className="sx-mono text-[#c9bfff]">owner_id</span></div>
      <div className="pl-1 text-[11.5px] text-[var(--sx-faint)]">or</div>
      <div className="sx-input h-[32px] text-[12px]">Has role · <span className="sx-mono text-[#c9bfff]">admin</span></div>
    </div>
  );
}

function ReleasePreview() {
  const { ref, inView } = useInView<HTMLDivElement>();
  const tick = useLiveTick(inView, 1300);
  const progress = Math.min(1, (tick % 6) / 4);
  const live = progress >= 1;

  return (
    <div ref={ref} className="grid gap-3 p-4">
      <div className="flex items-center gap-3">
        <Icon name="queues" size={18} variant="Bulk" className="flex-none text-[var(--sx-muted)]" />
        <span className="min-w-0 flex-1 leading-[1.35]">
          <span className="block truncate text-[12.5px] font-medium">Release 14</span>
          <span className="block truncate text-[11.5px] text-[var(--sx-faint)]">staging → production</span>
        </span>
        <span className="text-[11.5px]" style={{ color: live ? "var(--sx-ok)" : "var(--sx-muted)" }}>
          {live ? "Live" : "Activating"}
        </span>
      </div>
      <div className="h-[3px] rounded-full bg-[var(--sx-line)]">
        <div
          className="h-full rounded-full transition-[width] duration-700"
          style={{ width: `${progress * 100}%`, background: live ? "var(--sx-ok)" : "var(--sx-brand)" }}
        />
      </div>
      <div className="grid gap-1.5 pt-1 text-[11.5px] text-[var(--sx-faint)]">
        <span>Snapshot taken at 02:00</span>
        <span>Alarms on · status page public</span>
      </div>
    </div>
  );
}

/* ── section ───────────────────────────────────────────────────────────── */

const ROW_1 = "h-[330px]";
const ROW = "h-[220px]";

export function FeatureBento() {
  return (
    <Band
      id="features"
      labelledBy="features-title"
      wide
      className="py-[clamp(80px,10vw,140px)]"
      backdrop={
        <div className="absolute inset-0 [mask-image:linear-gradient(to_bottom,transparent,black_280px)] [-webkit-mask-image:linear-gradient(to_bottom,transparent,black_280px)]">
          {backdrop.glow("50%", "6%", "1100px", "420px")}
          {backdrop.hatch("8%", "80%")}
          {backdrop.dots("94%", "30%")}
        </div>
      }
    >
      <div className="mx-auto mb-12 flex max-w-[720px] flex-col items-center gap-4 text-center">
        <h2
          id="features-title"
          className="text-[clamp(40px,4.7vw,66px)] font-medium leading-[1.05] tracking-[-0.045em] text-text text-balance"
        >
          Every layer of the backend.
        </h2>
        <Lead className="max-w-[48ch]">
          Start with a table. Sign-in, files, live updates and automation
          are already part of the same system when the product needs them.
        </Lead>
      </div>

      <div className="grid gap-4 min-[760px]:grid-cols-2 min-[1100px]:grid-cols-12">
        <Tile
          icon="database"
          title="Database"
          line="Every table comes with a secure REST API, with filters, sorting and relations built in. Postgres underneath."
          label="An orders table with new rows arriving, and the request that reads it"
          className="min-[760px]:col-span-2 min-[1100px]:col-span-7"
          preview={ROW_1}
        >
          <DatabasePreview />
        </Tile>
        <Tile
          icon="users"
          title="Auth"
          line="Social sign-in, two-step codes, teams, invites and user API keys."
          label="A sign-in screen with Google, GitHub and Apple and a two-step code being entered"
          className="min-[760px]:col-span-2 min-[1100px]:col-span-5"
          preview={ROW_1}
        >
          <AuthPreview />
        </Tile>
        <Tile
          icon="apiSecurity"
          title="API security"
          line="Scoped keys, an ordered firewall, rate limits and CORS in front of every route."
          label="Firewall rules evaluated in order: a blocked address, a rate-limited sign-in route and an allowed key"
          className="min-[1100px]:col-span-4"
          preview={ROW}
        >
          <SecurityPreview />
        </Tile>
        <Tile
          icon="realtime"
          title="Realtime"
          line="Live updates and presence, with nothing extra to host."
          label="Changes to the orders table streaming in, with three people online"
          className="min-[1100px]:col-span-4"
          preview={ROW}
        >
          <RealtimePreview />
        </Tile>
        <Tile
          icon="storage"
          title="Storage"
          line="Uploads, image resizing and links that expire."
          label="A product photo being resized to a smaller file, with an expiring link"
          className="min-[760px]:col-span-2 min-[1100px]:col-span-4"
          preview={ROW}
        >
          <StoragePreview />
        </Tile>
        <Tile
          icon="automation"
          title="Automation"
          line="Visual flows, on a schedule, an event or a webhook. Emails included."
          label="Automations for a nightly digest, a payment webhook, new orders and welcome emails"
          className="min-[760px]:col-span-2 min-[1100px]:col-span-6"
          preview={ROW}
        >
          <AutomationPreview />
        </Tile>
        <Tile
          icon="policies"
          title="Access rules"
          line="Decide who sees what, once."
          label="A rule letting owners and admins read and update orders"
          className="min-[1100px]:col-span-3"
          preview={ROW}
        >
          <RulesPreview />
        </Tile>
        <Tile
          icon="automation"
          title="Releases"
          line="Staging, production and rollback in a click."
          label="A release going live in production, with a nightly snapshot and alarms"
          className="min-[1100px]:col-span-3"
          preview={ROW}
        >
          <ReleasePreview />
        </Tile>
      </div>
    </Band>
  );
}
