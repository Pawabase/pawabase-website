import { Icon, type IconName } from "@/components/Icon";

import { Band } from "./Section";

const TONES = {
  teal: "bg-brand text-[#121316]",
  cream: "bg-[#FCF8F5] text-[#121316]",
  deep: "bg-[#0f3d38] text-brand",
} as const;

/** A round, coloured mark that sits in the line of text like a word. */
function Mark({ icon, tone, overlap = false }: { icon: IconName; tone: keyof typeof TONES; overlap?: boolean }) {
  return (
    <span
      aria-hidden="true"
      className={`inline-flex size-[1.08em] translate-y-[0.14em] items-center justify-center rounded-full align-baseline ${TONES[tone]} ${overlap ? "-ml-[0.26em]" : "mx-[0.12em]"}`}
    >
      <Icon name={icon} size={24} variant="Bold" className="size-[0.5em]" />
    </span>
  );
}

export function Mission() {
  return (
    <Band id="mission" labelledBy="mission-title" className="pb-[clamp(72px,9vw,128px)] pt-[clamp(24px,4vw,56px)]">
      <div data-reveal="up" className="mx-auto flex max-w-[1100px] flex-col items-center text-center">
        <p className="m-0 inline-flex h-8 items-center rounded-full bg-white/[0.08] px-4 text-[12px] font-bold uppercase tracking-[0.08em] text-text">
          Why Pawabase
        </p>

        <div className="mt-6 flex w-full items-center gap-4">
          <span aria-hidden="true" className="h-px flex-1 bg-gradient-to-r from-transparent to-white/20" />
          <span aria-hidden="true" className="size-1 rotate-45 bg-white/40" />
          <span className="text-[17px] font-medium text-text">One backend, any app</span>
          <span aria-hidden="true" className="size-1 rotate-45 bg-white/40" />
          <span aria-hidden="true" className="h-px flex-1 bg-gradient-to-l from-transparent to-white/20" />
        </div>

        <h2
          id="mission-title"
          className="m-0 mt-[clamp(40px,5vw,72px)] text-[clamp(28px,4.3vw,60px)] font-medium leading-[1.2] tracking-[-0.03em] text-text"
        >
          Pawabase is <Mark icon="database" tone="teal" />
          <Mark icon="users" tone="cream" overlap />
          <Mark icon="storage" tone="deep" overlap /> one backend for your data, sign-in, files and
          email. Our mission is to take the plumbing out of building apps
          <Mark icon="events" tone="teal" /> so you can spend your time on the product
          <Mark icon="sparkle" tone="cream" />
        </h2>

        <a
          href="https://docs.sillo.build"
          target="_blank"
          rel="noreferrer"
          className="group mt-[clamp(40px,5vw,64px)] inline-flex items-center gap-3 text-[14px] font-bold uppercase tracking-[0.08em] text-text no-underline hover:text-brand"
        >
          Read the documentation
          <span aria-hidden="true" className="transition-transform group-hover:translate-x-0.5">
            →
          </span>
        </a>
      </div>
    </Band>
  );
}

/** The statement under the mission. The section rules and the page rails are the frame. */
export function Pledge() {
  return (
    <div role="region" aria-label="Why one backend" className="relative py-[clamp(72px,9vw,128px)]">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 left-1/2 w-[min(calc(100%-32px),1320px)] -translate-x-1/2"
        style={{
          backgroundImage: "radial-gradient(rgba(245,243,238,0.18) 0.7px, transparent 0.7px)",
          backgroundSize: "16px 16px",
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 left-1/2 h-48 w-[min(calc(100%-32px),1320px)] -translate-x-1/2 bg-[radial-gradient(ellipse_at_center,rgba(255,106,0,0.1),transparent_68%)]"
      />
      <div data-reveal="up" className="relative mx-auto max-w-[1100px] px-6 text-center min-[768px]:px-10">
        <p className="m-0 text-[clamp(22px,2.7vw,36px)] font-medium leading-[1.45] tracking-[-0.025em] text-text">
          Every backend you assemble by hand is a
          <span className="mx-[0.2em] inline-flex translate-y-[0.08em] items-center align-baseline">
            <span aria-hidden="true" className="hidden h-px w-[clamp(28px,4vw,72px)] bg-gradient-to-r from-transparent to-[#e87870]/80 min-[720px]:block" />
            <span className="relative mx-2 inline-flex px-[0.45em] py-[0.08em] text-[#f0b0aa] [text-shadow:0_0_22px_rgba(232,120,112,0.45)]">
              <span aria-hidden="true" className="absolute left-0 top-0 size-[0.35em] border-l border-t border-[#e87870]" />
              <span aria-hidden="true" className="absolute right-0 top-0 size-[0.35em] border-r border-t border-[#e87870]" />
              <span aria-hidden="true" className="absolute bottom-0 left-0 size-[0.35em] border-b border-l border-[#e87870]" />
              <span aria-hidden="true" className="absolute bottom-0 right-0 size-[0.35em] border-b border-r border-[#e87870]" />
              week spent on plumbing
            </span>
            <span aria-hidden="true" className="hidden h-px w-[clamp(28px,4vw,72px)] bg-gradient-to-l from-transparent to-[#e87870]/80 min-[720px]:block" />
          </span>
        </p>
        <p className="m-0 mt-[clamp(28px,4vw,48px)] text-[clamp(22px,2.7vw,36px)] font-medium leading-[1.45] tracking-[-0.025em] text-text">
          Pawabase is one backend, so the time you have goes to{" "}
          <span className="inline-flex translate-y-[0.06em] rounded-[8px] border border-brand/30 bg-brand/[0.08] px-[0.4em] py-[0.04em] align-baseline text-brand">
            the product
          </span>
        </p>
      </div>
    </div>
  );
}
