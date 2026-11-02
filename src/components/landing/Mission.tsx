import { Icon, type IconName } from "@/components/Icon";

import { Band } from "./Section";

const TONES = {
  teal: "bg-brand text-[#03201c]",
  cream: "bg-[#F5F3EE] text-[#06080b]",
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
