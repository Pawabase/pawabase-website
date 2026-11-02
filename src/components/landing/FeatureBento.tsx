import { SiGithub, SiGoogle } from "@icons-pack/react-simple-icons";
import type { CSSProperties } from "react";

import { Icon, type IconName } from "@/components/Icon";

import { Band } from "./Section";
import { Mockup, useInView, useLiveTick } from "./studio/Studio";

/* ── the sign-in screen, set into the tile and cropped by its edge ──────── */

function LoginScreen() {
  return (
    <div
      className="relative mx-5 h-full overflow-hidden rounded-t-[18px] border border-b-0 border-white/[0.1] px-6 pt-8 text-center"
      style={{
        background:
          "radial-gradient(90% 38% at 50% 0%, rgba(45,212,191,0.32), rgba(45,212,191,0) 75%), #080b0f",
      }}
    >
      <span aria-hidden="true" className="mx-auto block size-8 rounded-full bg-brand" />
      <div className="mt-4 text-[17px] font-medium tracking-[-0.02em] text-text">Welcome back</div>
      <div className="mt-1 text-[12.5px] text-muted">Sign in to your account to continue</div>

      <div className="mt-6 flex h-[42px] items-center rounded-[9px] border border-white/[0.14] bg-black px-3 text-left text-[12.5px] text-muted">
        you@company.com
      </div>
      <span className="btn-clay mt-3 inline-flex h-[42px] w-full items-center justify-center text-[13px]">
        Continue
      </span>

      <div className="my-5 flex items-center gap-3 text-[11px] text-muted">
        <span className="h-px flex-1 bg-white/[0.1]" />
        Or continue with
        <span className="h-px flex-1 bg-white/[0.1]" />
      </div>

      <div className="grid gap-2.5">
        <span className="btn-clay-dark inline-flex h-[42px] items-center justify-center gap-2 text-[13px]">
          <SiGithub size={15} /> GitHub
        </span>
        <span className="btn-clay-dark inline-flex h-[42px] items-center justify-center gap-2 text-[13px]">
          <SiGoogle size={14} /> Google
        </span>
      </div>
    </div>
  );
}

/* ── realtime: a stack of live events, the newest on top ────────────────── */

const EVENTS = [
  ["INSERT", "orders", "#1291"],
  ["UPDATE", "orders", "#1042 shipped"],
  ["INSERT", "messages", "on its way!"],
  ["UPDATE", "profiles", "Ada is online"],
] as const;

const PEOPLE = ["bg-[#F5F3EE] text-[#06080b]", "bg-brand text-[#03201c]", "bg-[#0f3d38] text-brand"];

function LiveStack() {
  const { ref, inView } = useInView<HTMLDivElement>();
  const tick = useLiveTick(inView, 2200);
  const at = (back: number) => EVENTS[(tick + EVENTS.length * 4 - back) % EVENTS.length];
  const [kind, target, detail] = at(0);

  const ghost = "absolute rounded-[12px] border border-white/[0.06] px-4 py-3";

  return (
    <div ref={ref} className="relative h-[116px]">
      <div className={`${ghost} inset-x-5 bottom-6 h-[56px] bg-[#05413a] opacity-60`} />
      <div className={`${ghost} inset-x-2.5 bottom-3 h-[56px] bg-[#04332e] opacity-80`}>
        <span className="font-mono text-[11px] text-[#F5F3EE]/45">
          {at(1)[0]} &middot; {at(1)[1]}
        </span>
      </div>
      <div
        key={tick}
        className="absolute inset-x-0 bottom-0 flex items-center justify-between gap-3 rounded-[12px] border border-white/[0.08] bg-[#03201c] px-4 py-3 text-[#F5F3EE] shadow-[0_10px_24px_-10px_rgba(0,0,0,0.6)] motion-safe:animate-rise"
      >
        <div className="min-w-0 font-mono text-[12px] leading-[1.5]">
          <div className="flex items-center gap-2">
            <span className="size-1.5 rounded-full bg-brand" />
            <span className="text-brand">{kind}</span>
            <span className="truncate text-[#F5F3EE]/60">{target}</span>
          </div>
          <div className="truncate pl-3.5">{detail}</div>
        </div>
        <span className="flex flex-none -space-x-1.5" aria-hidden="true">
          {PEOPLE.map((tone, i) => (
            <span
              key={i}
              className={`flex size-6 items-center justify-center rounded-full text-[10px] font-bold ring-2 ring-[#03201c] ${tone}`}
            >
              {["A", "K", "I"][i]}
            </span>
          ))}
        </span>
      </div>
    </div>
  );
}

/* ── tiles ─────────────────────────────────────────────────────────────── */

const TILE = "relative overflow-hidden rounded-[18px] p-6 shadow-[0_10px_30px_-18px_rgba(0,0,0,0.8)]";

function Words({ title, line }: { title: string; line: string }) {
  return (
    <div>
      <h3 className="m-0 text-[28px] font-medium leading-[1.1] tracking-[-0.03em]">{title}</h3>
      <p className="m-0 mt-2 max-w-[30ch] text-[14.5px] leading-[1.4] opacity-65">{line}</p>
    </div>
  );
}

const CHIPS: IconName[] = ["database", "storage", "mail"];

const ORBIT: { icon: IconName; style: CSSProperties }[] = [
  { icon: "webhooks", style: { left: "72%", top: "12%" } },
  { icon: "scheduling", style: { left: "46%", top: "42%" } },
  { icon: "mail", style: { left: "66%", top: "68%" } },
  { icon: "database", style: { left: "88%", top: "62%" } },
];

/* ── section ───────────────────────────────────────────────────────────── */

export function FeatureBento() {
  return (
    <Band id="features" labelledBy="features-title" wide className="py-[clamp(40px,5vw,72px)]">
      <h2 id="features-title" className="sr-only">
        One platform. Every backend layer.
      </h2>

      <div
        data-reveal="stagger"
        className="mx-auto grid max-w-[1240px] gap-4 min-[640px]:grid-cols-2 min-[1100px]:auto-rows-[262px] min-[1100px]:grid-cols-4"
      >
        {/* Data: plain, with the services as small chips */}
        <div className={`${TILE} flex min-h-[262px] flex-col justify-between bg-[#12171d] text-text ring-1 ring-white/[0.06]`}>
          <div className="flex gap-3">
            {CHIPS.map((name) => (
              <span
                key={name}
                className="flex size-12 items-center justify-center rounded-[12px] bg-white/[0.07] text-brand ring-1 ring-white/[0.06]"
              >
                <Icon name={name} size={22} variant="TwoTone" />
              </span>
            ))}
          </div>
          <Words title="Database" line="A real PostgreSQL database in every project, with relationships between tables." />
        </div>

        {/* Auth: the tall tile, with the real sign-in screen cropped by its edge */}
        <div
          className={`${TILE} flex min-h-[470px] flex-col !pb-0 text-text ring-1 ring-white/[0.06] min-[1100px]:row-span-2 min-[1100px]:min-h-0`}
          style={{
            background:
              "radial-gradient(90% 50% at 50% 100%, rgba(45,212,191,0.22), rgba(45,212,191,0) 70%), #0b0f14",
          }}
        >
          <Words title="Auth" line="Sign-in, organizations, sessions, roles and permissions." />
          <Mockup
            label="The Pawabase sign-in screen with an email field and GitHub and Google buttons"
            className="-mx-6 mt-6 flex-1 overflow-hidden"
          >
            <LoginScreen />
          </Mockup>
        </div>

        {/* Realtime: solid teal, with a stack of live changes */}
        <div className={`${TILE} flex min-h-[262px] flex-col justify-between bg-brand text-[#03201c]`}>
          <h3 className="m-0 max-w-[13ch] text-[28px] font-medium leading-[1.08] tracking-[-0.03em]">
            Updates, the moment they happen.
          </h3>
          <Mockup label="Live changes to an orders table arriving, with three people online">
            <LiveStack />
          </Mockup>
        </div>

        {/* Storage: black, dotted, a single folder */}
        <div className={`${TILE} flex min-h-[262px] flex-col bg-black !p-0 text-text ring-1 ring-white/[0.06]`}>
          <div
            aria-hidden="true"
            className="absolute inset-0 opacity-60 [background-image:radial-gradient(rgba(245,243,238,0.5)_1px,transparent_1.6px)] [background-size:11px_11px] [mask-image:radial-gradient(ellipse_70%_60%_at_50%_45%,black,transparent)] [-webkit-mask-image:radial-gradient(ellipse_70%_60%_at_50%_45%,black,transparent)]"
          />
          <div className="relative flex flex-1 flex-col items-center justify-center gap-2">
            <Icon name="storage" size={64} variant="Bulk" className="text-brand" />
            <span className="text-[13px] font-semibold">uploads</span>
          </div>
          <div className="relative p-6 pt-0">
            <h3 className="m-0 text-[20px] font-medium tracking-[-0.02em]">Storage</h3>
            <p className="m-0 mt-1 text-[13.5px] text-muted">Uploads, resizing and expiring links.</p>
          </div>
        </div>

        {/* Pricing: pale */}
        <div className={`${TILE} flex min-h-[262px] flex-col justify-end bg-[#F5F3EE] text-[#06080b]`}>
          <div className="text-[clamp(64px,6vw,84px)] font-medium leading-none tracking-[-0.05em]">$0</div>
          <p className="m-0 mt-3 max-w-[28ch] text-[15px] leading-[1.4] text-[#06080b]/65">
            to start. The free plan includes a project, a database and sign-in.
          </p>
        </div>

        {/* Workflows: wide, a soft gradient with chips on arcs */}
        <div
          className={`${TILE} min-h-[262px] text-text ring-1 ring-white/[0.06] min-[640px]:col-span-2`}
          style={{
            background:
              "radial-gradient(75% 95% at 10% 105%, rgba(45,212,191,0.75) 0%, rgba(45,212,191,0) 62%), linear-gradient(135deg, #0d2f2c 0%, #0b1a1a 100%)",
          }}
        >
          <h3 className="m-0 max-w-[10ch] text-[28px] font-medium leading-[1.1] tracking-[-0.03em]">
            Workflows that run themselves
          </h3>
          <p className="m-0 mt-2 max-w-[26ch] text-[14.5px] leading-[1.4] text-text/65">
            Visual logic for APIs, schedules, database events and webhooks.
          </p>
          <svg
            aria-hidden="true"
            viewBox="0 0 400 262"
            preserveAspectRatio="xMaxYMid slice"
            className="absolute inset-y-0 right-0 h-full w-[62%]"
          >
            {[110, 160, 210, 260].map((r) => (
              <circle key={r} cx="400" cy="330" r={r} fill="none" stroke="rgba(245,243,238,0.22)" strokeWidth="1" />
            ))}
          </svg>
          <div className="absolute inset-y-0 right-0 w-[62%]">
            {ORBIT.map((chip) => (
              <span
                key={chip.icon}
                className="absolute flex size-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-[#F5F3EE] text-[#06080b] shadow-[0_6px_16px_-6px_rgba(0,0,0,0.5)]"
                style={chip.style}
              >
                <Icon name={chip.icon} size={20} variant="TwoTone" />
              </span>
            ))}
          </div>
        </div>
      </div>
    </Band>
  );
}
