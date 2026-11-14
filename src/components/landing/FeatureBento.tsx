import { SiGithub, SiGoogle } from "@icons-pack/react-simple-icons";
import type { CSSProperties } from "react";

import { Icon, type IconName } from "@/components/Icon";

import { Mockup, useInView, useLiveTick } from "./studio/Studio";

/* ── the sign-in screen, set into the tile and cropped by its edge ──────── */

function LoginScreen() {
  return (
    <div
      className="relative mx-5 h-full overflow-hidden rounded-t-[12px] border border-b-0 border-white/[0.1] px-6 pt-6 text-center"
      style={{
        background:
          "#17181b",
      }}
    >
      <span aria-hidden="true" className="mx-auto block size-8 rounded-full bg-brand" />
      <div className="mt-4 text-[17px] font-medium tracking-[-0.02em] text-text">Welcome back</div>
      <div className="mt-1 text-[12.5px] text-muted">Sign in to your account to continue</div>

      <div className="mt-6 flex h-[42px] items-center rounded-[9px] border border-white/[0.14] bg-black px-3 text-left text-[12.5px] text-muted">
        you@company.com
      </div>
      <span className="btn btn-light btn-block mt-3">
        Continue
      </span>

      <div className="my-5 flex items-center gap-3 text-[11px] text-muted">
        <span className="h-px flex-1 bg-white/[0.1]" />
        Or continue with
        <span className="h-px flex-1 bg-white/[0.1]" />
      </div>

      <div className="grid gap-2.5">
        <span className="btn">
          <SiGithub size={15} /> GitHub
        </span>
        <span className="btn">
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

const PEOPLE = ["bg-[#f3f0eb] text-[#111214]", "bg-brand text-[#111214]", "bg-[#17181b] text-brand"];

function LiveStack() {
  const { ref, inView } = useInView<HTMLDivElement>();
  const tick = useLiveTick(inView, 2200);
  const at = (back: number) => EVENTS[(tick + EVENTS.length * 4 - back) % EVENTS.length];
  const [kind, target, detail] = at(0);

  const ghost = "absolute rounded-[10px] border border-white/[0.06] px-4 py-3";

  return (
    <div ref={ref} className="relative h-[116px]">
      <div className={`${ghost} inset-x-5 bottom-6 h-[56px] bg-[#1d1e22] opacity-60`} />
      <div className={`${ghost} inset-x-2.5 bottom-3 h-[56px] bg-[#17181b] opacity-80`}>
        <span className="font-mono text-[11px] text-[#f3f0eb]/45">
          {at(1)[0]} &middot; {at(1)[1]}
        </span>
      </div>
      <div
        key={tick}
        className="absolute inset-x-0 bottom-0 flex items-center justify-between gap-3 rounded-[10px] border border-white/[0.08] bg-[#111214] px-4 py-3 text-[#f3f0eb] motion-safe:animate-rise"
      >
        <div className="min-w-0 font-mono text-[12px] leading-[1.5]">
          <div className="flex items-center gap-2">
            <span className="size-1.5 rounded-full bg-brand" />
            <span className="text-brand">{kind}</span>
            <span className="truncate text-[#f3f0eb]/60">{target}</span>
          </div>
          <div className="truncate pl-3.5">{detail}</div>
        </div>
        <span className="flex flex-none -space-x-1.5" aria-hidden="true">
          {PEOPLE.map((tone, i) => (
            <span
              key={i}
              className={`flex size-6 items-center justify-center rounded-full text-[10px] font-bold ring-2 ring-[#111214] ${tone}`}
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

const TILE = "bento-tile relative overflow-hidden rounded-[10px] p-8";

/** The LED matrix inside a tile: dark until the pointer passes, then lit in orange around it. */
const Led = ({ tone = "" }: { tone?: string }) => <span aria-hidden="true" className={`bento-led ${tone}`} />;

function Words({ title, line }: { title: string; line: string }) {
  return (
    <div>
      <h3 className="m-0 text-[34px] font-medium leading-[1.06] tracking-[-0.035em]">{title}</h3>
      <p className="m-0 mt-3 max-w-[30ch] text-[15.5px] leading-[1.45] opacity-65">{line}</p>
    </div>
  );
}

/** Query traffic, as column heights (percent of the waveform's height). */
const WAVE = [34, 52, 41, 66, 48, 72, 58, 84, 62, 47, 70, 91, 76, 55, 63, 80, 69, 52, 44, 61, 74, 57, 40, 49];

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
    <section id="features" aria-labelledby="features-title" data-plain="" className="relative">
      <h2 id="features-title" className="sr-only">
        Data, auth, agents and APIs in one system.
      </h2>

      <div className="bento-frame relative">
      {["t1", "t2", "t3", "b1", "b2", "b3", "m1", "m2", "m3"].map((at) => <span key={at} aria-hidden="true" className={`bento-handle ${at}`} />)}
      <div
        data-reveal="stagger"
        onPointerMove={(event) => {
          const tile = (event.target as HTMLElement).closest<HTMLElement>(".bento-tile");
          if (!tile) return;
          const box = tile.getBoundingClientRect();
          tile.style.setProperty("--mx", `${event.clientX - box.left}px`);
          tile.style.setProperty("--my", `${event.clientY - box.top}px`);
        }}
        className="bento-grid grid min-[640px]:grid-cols-2 min-[1100px]:auto-rows-[340px] min-[1100px]:grid-cols-4"
      >
        {/* Data: plain, with the services as small chips */}
        <div className={`${TILE} flex min-h-[320px] flex-col justify-between bg-[#17181b] text-text`}>
          <Led />
          <div className="relative flex gap-3">
            {CHIPS.map((name) => (
              <span
                key={name}
                className="flex size-12 items-center justify-center rounded-[10px] bg-white/[0.07] text-brand ring-1 ring-white/[0.06]"
              >
                <Icon name={name} size={22} variant="TwoTone" />
              </span>
            ))}
          </div>
          <div aria-hidden="true" className="bento-wave">
            {WAVE.map((h, i) => <span key={i} style={{ "--h": `${h}%`, "--d": `${(i % 7) * -0.37}s` } as CSSProperties} />)}
          </div>
          <div className="relative"><Words title="Data" line="Make a table and it's already an API. Every team works from the same records." /></div>
        </div>

        {/* Auth: the tall tile, with the real sign-in screen cropped by its edge */}
        <div
          className={`${TILE} bento-auth flex min-h-[560px] flex-col !pb-0 text-text min-[1100px]:row-span-2 min-[1100px]:min-h-0`}
          style={{
            background:
              "#17181b",
          }}
        >
          <Led />
          <div className="relative"><Words title="Auth" line="Sign-in, teams and roles for the people who use what you build." /></div>
          <Mockup
            label="The Pawabase sign-in screen with an email field and GitHub and Google buttons"
            className="-mx-6 mt-6 flex-1 overflow-hidden"
          >
            <LoginScreen />
          </Mockup>
        </div>

        {/* Realtime: solid teal, with a stack of live changes */}
        <div className={`${TILE} bento-sun flex min-h-[320px] flex-col justify-between bg-brand text-[#111214]`}>
          <span aria-hidden="true" className="bento-sun-matrix" />
          <span aria-hidden="true" className="bento-sun-light" />
          <h3 className="relative m-0 max-w-[13ch] text-[34px] font-medium leading-[1.04] tracking-[-0.035em]">
            Everyone sees changes as they happen.
          </h3>
          <Mockup label="Live changes to an orders table arriving, with three people online" className="relative">
            <LiveStack />
          </Mockup>
        </div>

        {/* Storage: black, dotted, a single folder */}
        <div className={`${TILE} bento-storage flex min-h-[320px] flex-col bg-[#0c0d0f] !p-0 text-text`}>
          <span aria-hidden="true" className="bento-storage-matrix" />
          <span aria-hidden="true" className="bento-storage-light" />
          <Led />
          <div className="relative flex flex-1 flex-col items-center justify-center gap-2">
            <Icon name="storage" size={64} variant="Bulk" className="text-brand" />
            <span className="text-[13px] font-semibold">uploads</span>
          </div>
          <div className="relative p-6 pt-0">
            <h3 className="m-0 text-[26px] font-medium tracking-[-0.03em]">Storage</h3>
            <p className="m-0 mt-1 text-[13.5px] text-muted">Files for your apps, and somewhere for agents to keep things.</p>
          </div>
        </div>

        {/* Pricing: pale */}
        <div className={`${TILE} bento-ivory flex min-h-[320px] flex-col justify-end bg-[#f3f0eb] text-[#111214]`}>
          <span aria-hidden="true" className="bento-ivory-planet upper" />
          <span aria-hidden="true" className="bento-ivory-planet lower" />
          <Led tone="ink" />
          <div className="relative text-[clamp(72px,7vw,104px)] font-medium leading-none tracking-[-0.05em]">$0</div>
          <p className="relative m-0 mt-3 max-w-[28ch] text-[15px] leading-[1.4] text-[#111214]/65">
            to start. The free plan includes a project, a database and sign-in.
          </p>
        </div>

        {/* Workflows: wide, a soft gradient with chips on arcs */}
        <div
          className={`${TILE} bento-flows min-h-[320px] text-text min-[640px]:col-span-2`}
          style={{
            background:
              "#17181b",
          }}
        >
          <Led />
          <h3 className="relative m-0 max-w-[10ch] text-[34px] font-medium leading-[1.06] tracking-[-0.035em]">
            Flows and agents
          </h3>
          <p className="relative m-0 mt-2 max-w-[26ch] text-[14.5px] leading-[1.4] text-text/65">
            Run them on a schedule, from an event, or straight from an endpoint.
          </p>
          <svg
            aria-hidden="true"
            viewBox="0 0 400 262"
            preserveAspectRatio="xMaxYMid slice"
            className="absolute inset-y-0 right-0 h-full w-[62%] max-[639px]:opacity-40"
          >
            {[110, 160, 210, 260].map((r, i) => (
              <circle key={r} cx="400" cy="330" r={r} fill="none" stroke="rgba(243,240,235,0.2)" strokeWidth="1" strokeDasharray={i % 2 ? "2 6" : undefined} />
            ))}
            <g className="bento-dial">
              {Array.from({ length: 72 }, (_, i) => {
                const a = (i * 5 * Math.PI) / 180;
                const len = i % 9 === 0 ? 9 : 4;
                return <line key={i} x1={400 + 110 * Math.cos(a)} y1={330 + 110 * Math.sin(a)} x2={400 + (110 - len) * Math.cos(a)} y2={330 + (110 - len) * Math.sin(a)} stroke={i % 9 === 0 ? "#FF6A00" : "rgba(243,240,235,0.35)"} strokeWidth="1" />;
              })}
            </g>
            <g className="bento-sat a"><circle cx="400" cy={330 - 160} r="3.5" fill="#FF6A00" /></g>
            <g className="bento-sat b"><circle cx="400" cy={330 - 260} r="2.6" fill="#f3f0eb" /></g>
          </svg>
          <div className="absolute inset-y-0 right-0 w-[62%] max-[639px]:hidden">
            {ORBIT.map((chip) => (
              <span
                key={chip.icon}
                className="absolute flex size-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-[#f3f0eb] text-[#111214]"
                style={chip.style}
              >
                <Icon name={chip.icon} size={20} variant="TwoTone" />
              </span>
            ))}
          </div>
        </div>
      </div>
      </div>
    </section>
  );
}
