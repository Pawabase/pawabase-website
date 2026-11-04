import { Icon } from "@/components/Icon";

import { Band, Eyebrow, Lead, TextLink, Title } from "./Section";

const CLOUD = [
  "A project with its own database",
  "Auth, storage, email and realtime included",
  "Environments, releases and alarms managed",
];

const OPERATIONS = [
  "Isolated projects with their own database",
  "Environments, releases and rollback built in",
  "Observability and support as you grow",
];

function Checks({ items }: { items: string[] }) {
  return (
    <ul className="flex flex-col gap-3">
      {items.map((item) => (
        <li key={item} className="flex items-start gap-3 text-[16px] leading-[1.5] tracking-[-0.01em] text-muted">
          <span aria-hidden="true" className="mt-[9px] h-1.5 w-1.5 flex-none rounded-full bg-brand" />
          {item}
        </li>
      ))}
    </ul>
  );
}

export function CloudSection() {
  return (
    <Band
      id="deploy"
      labelledBy="deploy-title"
      className="py-[clamp(72px,9vw,128px)]"
    >
      <div
        data-reveal="up"
        className="mx-auto flex max-w-[680px] flex-col items-center gap-5 text-center"
      >
        <Eyebrow>Cloud</Eyebrow>
        <Title id="deploy-title" quiet="A clear path from first build to production.">
          Deploy and scale.
        </Title>
        <Lead className="max-w-[48ch]">
          Start with a complete backend, then move from an idea to a reliable
          production system without assembling the platform around it.
        </Lead>
      </div>

      <div
        data-reveal="stagger"
        className="mx-auto mt-[clamp(40px,5vw,72px)] grid max-w-[1040px] gap-4 min-[900px]:grid-cols-2"
      >
        <article
          className="relative flex min-h-[380px] flex-col gap-6 overflow-hidden rounded-[18px] p-8 text-text ring-1 ring-white/[0.06] min-[900px]:p-10"
          style={{
            background:
              "radial-gradient(80% 70% at 15% 110%, rgba(255,106,0,0.5) 0%, rgba(255,106,0,0) 65%), linear-gradient(135deg, #0d2f2c 0%, #0b1a1a 100%)",
          }}
        >
          <h3 className="m-0 text-[28px] font-medium leading-[1.1] tracking-[-0.03em]">Pawabase Cloud</h3>
          <p className="m-0 max-w-[36ch] text-[16px] leading-[1.55] text-text/70">
            Create a project with data, auth and workflows ready. We run the infrastructure.
          </p>
          <Checks items={CLOUD} />
          <a
            href="https://app.pawabase.com"
            className="btn-clay mt-auto inline-flex h-[46px] w-fit items-center justify-center gap-2 px-[22px] text-[14px] no-underline"
          >
            Create a project
            <Icon name="arrowRight" size={16} />
          </a>
        </article>

        <article className="relative flex min-h-[380px] flex-col gap-6 overflow-hidden rounded-[18px] bg-[#12171d] p-8 text-text ring-1 ring-white/[0.06] min-[900px]:p-10">
          <h3 className="m-0 text-[28px] font-medium leading-[1.1] tracking-[-0.03em]">Built for production</h3>
          <p className="m-0 max-w-[36ch] text-[16px] leading-[1.55] text-muted">
            Environments, releases, alarms and the controls to keep every project moving safely.
          </p>
          <Checks items={OPERATIONS} />
          <TextLink href="/products/observability" className="mt-auto">Explore operations</TextLink>
        </article>
      </div>
    </Band>
  );
}
