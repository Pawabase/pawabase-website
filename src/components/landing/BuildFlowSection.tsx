import { useState } from "react";

import { Icon } from "@/components/Icon";

import { PrimaryButton } from "./PrimaryButton";
import { Band } from "./Section";
import { Mockup, Rise } from "./studio/Studio";

function WindowBar({
  title,
  icon,
  value,
}: {
  title: string;
  icon: "code" | "document";
  value: string;
}) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    await navigator.clipboard.writeText(value);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1600);
  };

  return (
    <div className="flex h-12 items-center gap-2 px-4 text-[12px] font-medium text-[var(--sx-muted)] min-[560px]:px-5">
      <Icon name={icon} size={16} variant="Bulk" className="text-brand" />
      <span>{title}</span>
      <button
        type="button"
        onClick={copy}
        aria-label={`Copy ${title}`}
        className="ml-auto inline-grid h-8 w-8 cursor-pointer place-items-center rounded-lg text-[var(--sx-faint)] transition-colors hover:bg-white/[0.06] hover:text-[var(--sx-text)]"
      >
        <Icon name="copy" size={15} />
      </button>
      <span className="sr-only" aria-live="polite">{copied ? "Copied" : ""}</span>
    </div>
  );
}

const QUICKSTART = `$ npx pawabase@latest init
✓ Project created
✓ Database and API ready
→ northwind.pawabase.app`;

const CLIENT_CODE = `import { createClient } from '@pawabase/js';

const pawabase = createClient(
  'https://northwind.pawabase.app'
);

const orders = await pawabase
  .from('orders').select();`;

function QuickstartTerminal() {
  return (
    <Mockup
      label="Pawabase quickstart terminal creating a new backend project"
      className="relative w-full overflow-hidden rounded-[24px] bg-card"
    >
      <WindowBar title="Terminal" icon="code" value={QUICKSTART} />
      <div className="mx-3 mb-3 rounded-[16px] bg-[#06080b] px-5 py-5 sx-mono text-[13px] leading-[1.9] min-[560px]:mx-4 min-[560px]:mb-4 min-[560px]:px-6">
        <p className="text-[var(--sx-muted)]">
          <span className="mr-2 text-[var(--sx-faint)]">$</span>
          npx pawabase@latest init
        </p>
        <p className="text-[var(--sx-ok)]">✓ Project created</p>
        <p className="text-[var(--sx-ok)]">✓ Database and API ready</p>
        <p className="text-[var(--sx-faint)]">→ northwind.pawabase.app</p>
      </div>
    </Mockup>
  );
}

function ClientCode() {
  return (
    <Mockup
      label="TypeScript code connecting an application to Pawabase and reading orders"
      className="relative w-full overflow-hidden rounded-[24px] bg-card"
    >
      <WindowBar title="app.ts" icon="document" value={CLIENT_CODE} />
      <div className="mx-3 mb-3 min-w-0 overflow-hidden rounded-[16px] bg-[#06080b] px-5 py-5 sx-mono text-[12px] leading-[1.95] min-[560px]:mx-4 min-[560px]:mb-4 min-[560px]:px-6 min-[560px]:text-[13px]">
          <p className="text-[#F5F3EE]">import <span className="text-[var(--sx-text)]">&#123; createClient &#125;</span> from <span className="text-[var(--sx-ok)]">'@pawabase/js'</span>;</p>
          <p>&nbsp;</p>
          <p><span className="text-[#F5F3EE]">const</span> pawabase = createClient&#40;</p>
          <p className="pl-5 text-[var(--sx-ok)]">'https://northwind.pawabase.app'</p>
          <p>&#41;;</p>
          <p>&nbsp;</p>
          <p><span className="text-[#F5F3EE]">const</span> orders = <span className="text-[#F5F3EE]">await</span> pawabase</p>
          <p className="bg-white/[0.045] pl-5 text-[var(--sx-text)]">.from&#40;<span className="text-[var(--sx-ok)]">'orders'</span>&#41;.select&#40;&#41;;</p>
      </div>
    </Mockup>
  );
}

export function BuildFlowSection() {
  return (
    <Band
      id="build-flow"
      labelledBy="build-flow-title"
      wide
      className="min-h-[700px] overflow-hidden bg-shell"
      innerClassName="flex min-h-[700px] items-center py-[clamp(82px,9vw,124px)]"
    >
      <div className="grid w-full items-center gap-16 min-[980px]:grid-cols-[minmax(390px,0.92fr)_minmax(0,1.08fr)] min-[980px]:gap-[clamp(56px,7vw,104px)]">
        <div className="relative z-10 max-w-[580px] min-[1240px]:pl-6">
          <h2
            id="build-flow-title"
            className="text-[clamp(42px,4vw,60px)] font-medium leading-[1.06] tracking-[-0.05em] text-text text-balance"
          >
            <span className="block">One project, and</span>
            <span className="block">the backend is yours.</span>
          </h2>
          <p className="mt-6 max-w-[34ch] text-[17px] leading-[1.6] tracking-[-0.01em] text-muted">
            Create a project, connect your app, and start building.
          </p>
          <PrimaryButton
            href="https://docs.sillo.build"
            className="mt-8 inline-flex w-fit"
          >
            Read the quickstart
            <Icon name="arrowRight" size={17} />
          </PrimaryButton>
        </div>

        <Rise className="grid w-full gap-3 min-[560px]:gap-4">
          <div className="mr-[clamp(18px,5vw,64px)]">
            <QuickstartTerminal />
          </div>
          <div className="ml-[clamp(18px,5vw,64px)]">
            <ClientCode />
          </div>
        </Rise>
      </div>
    </Band>
  );
}
