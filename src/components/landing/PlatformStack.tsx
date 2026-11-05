import type { ReactNode } from "react";

import { Icon, type IconName } from "@/components/Icon";

import ScrollStack, { ScrollStackItem } from "./ScrollStack";
import { Eyebrow } from "./Section";

/* ── plain spec lists: terms and what they mean ────────────────────────── */

function Spec({ rows, divider, term }: { rows: [string, string][]; divider: string; term: string }) {
  return (
    <dl className={`m-0 w-full divide-y ${divider}`}>
      {rows.map(([name, text]) => (
        <div key={name} className="grid gap-1 py-5 first:pt-0 last:pb-0 min-[900px]:grid-cols-[150px_1fr] min-[900px]:gap-8">
          <dt className={`text-[15px] font-medium ${term}`}>{name}</dt>
          <dd className="m-0 text-[15px] leading-[1.6] opacity-70">{text}</dd>
        </div>
      ))}
    </dl>
  );
}

const SECURITY: [string, string][] = [
  ["Reusable", "One policy, used by every resource that needs it."],
  ["Knows the user", "Rules see who is asking, their team and their role."],
  ["Scoped keys", "Each key reaches only what you allow."],
  ["Rate limits", "Slow down abuse on the routes that matter."],
];

const FLOWS: [string, string][] = [
  ["Triggers", "An endpoint, a schedule, a data change or a webhook."],
  ["Agents", "Hand a step to an agent, with the model you choose."],
  ["Built visually", "Or describe it, and edit what you get."],
];

/* ── cards ─────────────────────────────────────────────────────────────── */

type Layer = {
  icon: IconName;
  title: string;
  line: string;
  className: string;
  muted: string;
  style?: React.CSSProperties;
  visual: ReactNode;
};

const LAYERS: Layer[] = [
  {
    icon: "apiSecurity",
    title: "Policies",
    line: "Write a rule once and reuse it on endpoints, tables, files and agents. Keys and limits stand in front of all of it.",
    className: "!bg-[#17181b] text-text",
    muted: "text-muted",
    visual: <Spec rows={SECURITY} divider="divide-white/[0.08]" term="text-text" />,
  },
  {
    icon: "automation",
    title: "Flows and agents",
    line: "Lay out the logic visually. Call an agent from any step, or straight from an endpoint or route.",
    className: "text-text",
    muted: "text-text/70",
    style: {
      background:
        "#17181b",
    },
    visual: <Spec rows={FLOWS} divider="divide-white/[0.14]" term="text-text" />,
  },
];

export function PlatformStack() {
  return (
    <section id="platform-stack" aria-labelledby="stack-heading" className="relative bg-shell pb-[clamp(64px,8vw,120px)]">
      <div className="border-b border-line py-[clamp(56px,7vw,96px)]">
        <div data-reveal="up" className="mx-auto flex max-w-[720px] flex-col items-center gap-5 px-5 text-center">
          <Eyebrow>The platform</Eyebrow>
          <h2
            id="stack-heading"
            className="m-0 text-[clamp(38px,4.4vw,62px)] font-medium leading-[1.06] tracking-[-0.03em] text-text text-balance"
          >
            Write the rule once. Let flows do the rest.
          </h2>
          <p className="m-0 max-w-[48ch] text-[18px] leading-[1.6] text-muted">
            Policies guard everything in the system. Flows and agents handle the work.
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-[1180px] pt-[clamp(40px,5vw,72px)]">
        <ScrollStack
          useWindowScroll
          smoothScroll={false}
          stackPosition="16%"
          itemDistance={140}
          itemStackDistance={28}
          itemScale={0.04}
          baseScale={0.9}
          dimAmount={0.25}
          holdDistance={160}
        >
          {LAYERS.map((layer) => (
            <ScrollStackItem key={layer.title} itemClassName={layer.className} style={layer.style}>
              <div className="grid h-full items-center gap-8 min-[760px]:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] min-[760px]:gap-14">
                <div className="flex flex-col">
                  <h3 className="m-0 flex items-center gap-3 text-[clamp(32px,3.6vw,48px)] font-medium leading-[1.05] tracking-[-0.03em]">
                    <Icon name={layer.icon} size={32} variant="TwoTone" className="text-brand" />
                    {layer.title}
                  </h3>
                  <p className={`m-0 mt-5 max-w-[38ch] text-[16.5px] leading-[1.6] ${layer.muted}`}>{layer.line}</p>
                </div>
                <div className="hidden items-center min-[760px]:flex">{layer.visual}</div>
              </div>
            </ScrollStackItem>
          ))}
        </ScrollStack>
      </div>
    </section>
  );
}
