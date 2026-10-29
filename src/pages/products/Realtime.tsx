import type { ReactNode } from "react";

import { backdrop } from "@/components/landing/Backdrops";
import { Figure } from "@/components/landing/hairline/Hairline";
import { Band, Card } from "@/components/landing/Section";
import {
  Initials,
  Mockup,
  PASTELS,
  useInView,
  useLiveTick,
} from "@/components/landing/studio/Studio";
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

const PEOPLE = [
  ["Ada Nwosu", PASTELS.peach],
  ["Kwame Mensah", PASTELS.mint],
  ["Inès Laurent", PASTELS.rose],
  ["Marcus Chen", PASTELS.sky],
] as const;

const CHAT = [
  ["Kwame Mensah", "Order 1042 just left the warehouse."],
  ["Ada Nwosu", "Perfect, the customer can see it already."],
  ["Inès Laurent", "Restocked the arc lamp, 40 units."],
  ["Marcus Chen", "Pushing the promo banner at noon."],
];

function LiveChannel() {
  const { ref, inView } = useInView<HTMLDivElement>();
  const tick = useLiveTick(inView, 2600);
  const shown = Array.from({ length: 3 }, (_, i) => CHAT[(tick + i) % CHAT.length]);
  const typer = PEOPLE[(tick + 3) % PEOPLE.length][0].split(" ")[0];

  return (
    <div ref={ref}>
      <Card className="mx-auto max-w-[720px] p-3">
        <Mockup label="A team channel with four people online, messages arriving as they're sent, and someone typing" className="sx-window block">
          <div className="flex items-center justify-between border-b border-[var(--sx-line)] px-5 py-3">
            <span className="sx-mono text-[12.5px] text-[var(--sx-muted)]">ops:northwind</span>
            <span className="flex items-center gap-3">
              <span className="flex -space-x-1.5">
                {PEOPLE.map(([name, tone]) => (
                  <span key={name} className="rounded-full ring-2 ring-[#101315]">
                    <Initials name={name} tone={tone} size={22} />
                  </span>
                ))}
              </span>
              <span className="flex items-center gap-2 text-[12px] text-[var(--sx-faint)]">
                <span key={tick} className="sx-live" data-pulse={tick ? "" : undefined} />4 here
              </span>
            </span>
          </div>
          <div className="grid gap-3 p-5">
            {shown.map(([who, text], i) => {
              const tone = PEOPLE.find((p) => p[0] === who)?.[1] ?? PASTELS.lavender;
              return (
                <div key={`${tick}-${i}`} className={`flex items-start gap-3 ${i === 2 && tick ? "sx-swap" : ""}`} style={{ opacity: 0.55 + i * 0.22 }}>
                  <Initials name={who} tone={tone} size={26} />
                  <span className="leading-[1.45]">
                    <span className="block text-[12.5px] font-medium">{who}</span>
                    <span className="block text-[13px] text-[var(--sx-muted)]">{text}</span>
                  </span>
                </div>
              );
            })}
            <div className="pl-[38px] text-[12px] text-[var(--sx-faint)]">{typer} is typing…</div>
          </div>
        </Mockup>
      </Card>
    </div>
  );
}

function Primitive({ title, copy, children }: { title: string; copy: string; children: ReactNode }) {
  return (
    <Card className="flex flex-col p-7">
      <div className="grid h-[120px] place-items-center">{children}</div>
      <span className="mt-6 text-[16px] font-medium tracking-[-0.02em] text-text">{title}</span>
      <span className="mt-2 text-[14px] leading-[1.6] text-muted">{copy}</span>
    </Card>
  );
}

function BroadcastMark() {
  return (
    <svg viewBox="0 0 200 110" className="h-full w-[200px]" aria-hidden="true">
      <circle cx="40" cy="55" r="9" fill="none" stroke="#F5F3EE" />
      {[20, 55, 90].map((y) => (
        <g key={y}>
          <path d={`M49 55 C 100 55 110 ${y} 160 ${y}`} fill="none" stroke="rgba(245,243,238,0.18)" />
          <circle cx="166" cy={y} r="6" fill="none" stroke="rgba(245,243,238,0.4)" />
        </g>
      ))}
    </svg>
  );
}

function HistoryMark() {
  return (
    <svg viewBox="0 0 220 110" className="h-full w-[220px]" aria-hidden="true">
      <line x1="10" x2="210" y1="55" y2="55" stroke="rgba(245,243,238,0.15)" />
      {[30, 60, 90, 120, 150, 180].map((x, i) => (
        <circle key={x} cx={x} cy="55" r="5" fill={i > 2 ? "#F5F3EE" : "none"} stroke={i > 2 ? "none" : "rgba(245,243,238,0.4)"} />
      ))}
      <text x="165" y="85" textAnchor="middle" fontSize="10" fill="#70757D" fontFamily="PP Neue Montreal, sans-serif">replayed</text>
    </svg>
  );
}

function CatchUp() {
  const dots = [80, 150, 220, 330, 400, 470, 540, 650, 720];
  const missed = (x: number) => x > 290 && x < 580;
  return (
    <Figure width={820} height={220} label="A connection drops for a moment; messages sent meanwhile are kept and delivered once when it reconnects" className="h-auto w-full min-w-[640px]">
      <line x1="40" x2="290" y1="90" y2="90" style={{ stroke: "rgba(245,243,238,0.3)" }} />
      <line x1="290" x2="580" y1="90" y2="90" style={{ stroke: "rgba(245,243,238,0.25)", strokeDasharray: "3 6" }} />
      <line x1="580" x2="780" y1="90" y2="90" style={{ stroke: "rgba(245,243,238,0.3)" }} />
      <text x="290" y="66" textAnchor="middle" fontSize="11" fill="#70757D">connection drops</text>
      <text x="580" y="66" textAnchor="middle" fontSize="11" fill="#70757D">back online</text>
      {dots.map((x) => (
        <circle key={x} cx={x} cy={90} r={5.5} style={{ fill: "var(--hl-plate)", stroke: missed(x) ? "#F5F3EE" : "rgba(245,243,238,0.4)" }} />
      ))}
      {dots.filter(missed).map((x, i) => (
        <path key={x} className="hl-line" d={`M${x} 98 C${x} 160 ${600 + i * 14} 160 ${600 + i * 14} 104`} style={{ stroke: "rgba(245,243,238,0.55)" }} />
      ))}
      <text x="440" y="190" textAnchor="middle" fontSize="11" fill="#70757D">missed messages arrive once, in order</text>
    </Figure>
  );
}

function ChannelRule() {
  return (
    <Card className="p-3">
      <Mockup label="A channel rule that lets only members of a room join, refusing a signed-out visitor" className="sx-window block">
        <div className="border-b border-[var(--sx-line)] px-5 py-3 text-[14px] font-semibold">Channel rule · chat:&#123;room&#125;</div>
        <div className="grid gap-2 p-5">
          <div className="text-[12px] text-[var(--sx-faint)]">who can join and send</div>
          <div className="sx-input h-[34px] text-[12.5px]">Signed in, and a member of this room</div>
        </div>
        {[
          ["Ada Nwosu", "member", true],
          ["Marcus Chen", "member", true],
          ["Anonymous", "signed out", false],
        ].map(([who, role, ok]) => (
          <div key={who as string} className="flex h-[48px] items-center justify-between border-t border-[var(--sx-line-soft)] px-5 text-[12.5px]">
            <span>
              {who as string} <span className="text-[var(--sx-faint)]">· {role as string}</span>
            </span>
            <span className="flex items-center gap-2" style={{ color: ok ? "var(--sx-ok)" : "var(--sx-danger)" }}>
              <span className="sx-dot" style={{ background: ok ? "var(--sx-ok)" : "var(--sx-danger)" }} />
              {ok ? "joined" : "refused"}
            </span>
          </div>
        ))}
      </Mockup>
    </Card>
  );
}

const USES = ["Order tracking", "Team chat", "Live dashboards", "Who's viewing", "Collaborative editing"];

export default function RealtimePage() {
  return (
    <ProductShell title="Realtime" description="Broadcast, presence and history over WebSockets, with the same access rules as the rest of your backend.">
      <Band className="pb-[clamp(72px,9vw,120px)] pt-[clamp(64px,8vw,112px)]" backdrop={<>{backdrop.rings("50%", "62%")}{backdrop.glow("50%", "60%", "900px", "520px")}</>}>
        <div className="mx-auto flex max-w-[720px] flex-col items-center gap-6 text-center">
          <ProductName icon="realtime" name="Realtime" />
          <Display quiet="Nothing extra to host.">Make it feel alive.</Display>
          <p className="max-w-[46ch] text-[16px] leading-[1.65] text-muted">
            Messages that land instantly, people who show up as online, and
            screens that update the moment something changes.
          </p>
          <HeroActions />
        </div>
        <div className="mt-14">
          <LiveChannel />
        </div>
      </Band>

      <Band labelledBy="rt-three" className="py-[clamp(72px,9vw,120px)]">
        <Copy id="rt-three" center title="Three things, done well." />
        <div className="mt-12 grid gap-4 min-[860px]:grid-cols-3">
          <Primitive title="Broadcast" copy="Send a message to everyone on a channel the moment it happens.">
            <BroadcastMark />
          </Primitive>
          <Primitive title="Presence" copy="Know who's here, who just left and who's typing.">
            <span className="flex -space-x-2">
              {PEOPLE.map(([name, tone]) => (
                <span key={name} className="rounded-full ring-4 ring-[#101315]">
                  <Initials name={name} tone={tone} size={44} />
                </span>
              ))}
            </span>
          </Primitive>
          <Primitive title="History" copy="Late arrivals catch up on what they missed.">
            <HistoryMark />
          </Primitive>
        </div>
      </Band>

      <Band labelledBy="rt-catchup" className="py-[clamp(72px,9vw,120px)]" backdrop={backdrop.lines("50%", "60%")}>
        <Copy id="rt-catchup" center title="Spotty signal? No lost messages." quiet="Reconnects on its own.">
          When a phone drops off the network, the connection comes back by
          itself and delivers what was missed exactly once.
        </Copy>
        <Card className="mx-auto mt-12 max-w-[1000px] overflow-x-auto px-6 py-10">
          <CatchUp />
        </Card>
      </Band>

      <Band labelledBy="rt-rules" className="py-[clamp(72px,9vw,120px)]">
        <Split
          ratio="wide-copy"
          copy={
            <Copy id="rt-rules" title="Private channels stay private." quiet="Same rules as your data." link={{ label: "See access policies", href: "/products/policies" }}>
              Decide who can join and send on each channel. Anyone else is
              turned away before they hear a thing.
            </Copy>
          }
          visual={<ChannelRule />}
        />
      </Band>

      <Band labelledBy="rt-uses" className="py-[clamp(72px,9vw,120px)]" backdrop={backdrop.hatch("80%", "50%")}>
        <h2 id="rt-uses" className="text-center text-[15px] text-faint">What teams build with it</h2>
        <ul className="mx-auto mt-8 flex max-w-[1000px] flex-wrap justify-center gap-x-10 gap-y-4">
          {USES.map((use, i) => (
            <li key={use} className={`text-[clamp(26px,3.2vw,44px)] font-normal tracking-[-0.045em] ${i % 2 ? "text-muted" : "text-text"}`}>
              {use}
            </li>
          ))}
        </ul>
      </Band>

      <Band labelledBy="rt-code" className="py-[clamp(72px,9vw,120px)]">
        <Split
          flip
          ratio="wide-visual"
          copy={
            <Copy id="rt-code" title="Join, listen, send." quiet="That's the whole API.">
              Subscribe to a channel, react to messages and presence, and
              replay recent history for anyone who just arrived.
            </Copy>
          }
          visual={
            <CodeCard
              file="chat.ts"
              label="Joining a chat channel with presence and replay, listening for messages and sending one"
              lines={[
                'const room = pawabase.realtime.channel("chat:lobby", {',
                '  presence: { name: "Ada" },',
                "  replay: 50,",
                "});",
                "",
                'room.on("message", (m) => show(m.from, m.payload.text));',
                'room.on("presence", ({ members }) => setOnline(members));',
                "",
                "await room.subscribe();",
                'await room.send("message", { text: "hi" });',
              ]}
            />
          }
        />
      </Band>

      <ProductCta
        title="Make it live."
        quiet="Keep it simple."
        next={{ label: "Next: Flows", href: "/products/flows" }}
        backdrop={backdrop.rings("50%", "100%")}
      />
    </ProductShell>
  );
}

