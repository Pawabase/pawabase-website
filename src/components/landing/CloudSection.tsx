import { Icon } from "@/components/Icon";

import { backdrop } from "./Backdrops";
import { PrimaryButton } from "./PrimaryButton";
import { Band, Card, Lead, TextLink, Title } from "./Section";

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
      className="py-[clamp(80px,10vw,140px)]"
      backdrop={
        <div className="absolute inset-0 [mask-image:linear-gradient(to_bottom,transparent,black_240px,black_calc(100%-240px),transparent)] [-webkit-mask-image:linear-gradient(to_bottom,transparent,black_240px,black_calc(100%-240px),transparent)]">
          {backdrop.grid("100%")}
          {backdrop.glow("50%", "100%", "1000px", "440px")}
        </div>
      }
    >
      <div
        data-reveal="up"
        className="mx-auto flex max-w-[680px] flex-col items-center gap-5 text-center"
      >
        <Title id="deploy-title" quiet="A clear path from first build to production.">
          Deploy and scale.
        </Title>
        <Lead className="max-w-[48ch]">
          Start with a complete backend. Move from idea to production without
          stitching together separate services.
        </Lead>
      </div>

      <div
        data-reveal="stagger"
        className="mt-[clamp(48px,6vw,80px)] grid gap-4 min-[900px]:grid-cols-2"
      >
        <Card className="flex flex-col gap-6 p-8 min-[900px]:p-10">
          <div className="flex items-center gap-3">
            <Icon name="sparkle" size={26} variant="Bulk" className="text-brand" />
            <h3 className="text-[24px] font-medium tracking-[-0.03em] text-text">Pawabase Cloud</h3>
          </div>
          <p className="max-w-[40ch] text-[16.5px] leading-[1.55] tracking-[-0.01em] text-muted">
            Create a project with data, auth and workflows ready. We run the
            infrastructure.
          </p>
          <Checks items={CLOUD} />
          <div className="mt-auto flex flex-wrap items-center gap-x-7 gap-y-4 pt-4">
            <PrimaryButton href="https://app.pawabase.com" className="inline-flex">
              Create a project
              <Icon name="arrowRight" size={17} />
            </PrimaryButton>
          </div>
        </Card>

        <Card className="flex flex-col gap-6 p-8 min-[900px]:p-10">
          <div className="flex items-center gap-3">
            <Icon name="database" size={26} variant="Bulk" className="text-brand" />
            <h3 className="text-[24px] font-medium tracking-[-0.03em] text-text">Built for production</h3>
          </div>
          <p className="max-w-[40ch] text-[16.5px] leading-[1.55] tracking-[-0.01em] text-muted">
            The work of operating software is visible: environments, releases,
            alarms and the controls to keep every project moving safely.
          </p>
          <Checks items={OPERATIONS} />
          <TextLink href="/products/observability" className="pt-1">Explore operations</TextLink>
        </Card>
      </div>
    </Band>
  );
}
