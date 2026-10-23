import type { ReactNode } from "react";

import { backdrop, Contours } from "@/components/landing/Backdrops";
import { AccessFigure } from "@/components/landing/PoliciesSection";
import { Band, Card } from "@/components/landing/Section";
import { Mockup } from "@/components/landing/studio/Studio";
import {
  Copy,
  Display,
  HeroActions,
  Points,
  ProductCta,
  ProductName,
  ProductShell,
  Split,
} from "@/components/product/kit";

function Select({ children, tone = "text" }: { children: ReactNode; tone?: "text" | "muted" }) {
  return (
    <span className={`sx-input sx-mono h-[34px] min-w-0 flex-1 justify-between text-[12px] ${tone === "muted" ? "text-[var(--sx-muted)]" : ""}`}>
      <span className="truncate">{children}</span>
      <span className="text-[var(--sx-faint)]">⌄</span>
    </span>
  );
}

function Builder() {
  return (
    <Card className="p-3">
      <Mockup label="A rule letting people read and update their own orders, and admins every order, built with a form" className="sx-window block">
        <div className="flex items-center justify-between border-b border-[var(--sx-line)] px-5 py-3">
          <span className="text-[14px] font-semibold">Owners manage their orders</span>
          <span className="sx-btn sx-btn-primary">Save rule</span>
        </div>
        <div className="sx-tabs px-5">
          <span data-on="">Configure</span>
          <span>JSON</span>
        </div>
        <div className="grid gap-5 p-5">
          <div className="grid gap-4 min-[560px]:grid-cols-2">
            <label className="grid gap-1.5">
              <span className="text-[12px] text-[var(--sx-muted)]">Applies to</span>
              <Select>orders</Select>
            </label>
            <label className="grid gap-1.5">
              <span className="text-[12px] text-[var(--sx-muted)]">Actions</span>
              <span className="sx-seg !h-[34px]">
                <span data-on="">Read</span>
                <span>Create</span>
                <span data-on="">Update</span>
                <span>Delete</span>
              </span>
            </label>
          </div>
          <div className="grid gap-2">
            <span className="text-[12px] text-[var(--sx-muted)]">Allow when</span>
            <div className="grid gap-2 rounded-[8px] border border-[var(--sx-line)] p-3">
              <div className="flex gap-2"><Select tone="muted">Owns the record (field)</Select><Select>owner_id</Select></div>
              <div className="pl-1 text-[11.5px] text-[var(--sx-faint)]">or</div>
              <div className="flex gap-2"><Select tone="muted">Has role</Select><Select>admin</Select></div>
            </div>
          </div>
        </div>
      </Mockup>
    </Card>
  );
}

const ROLES = ["Visitor", "Customer", "Staff", "Admin"];
const ACTIONS = ["List", "Read", "Create", "Update", "Delete"];
const GRID: Record<string, (string | null)[]> = {
  Visitor: [null, null, null, null, null],
  Customer: ["own", "own", "yes", "own", null],
  Staff: ["yes", "yes", "yes", "yes", null],
  Admin: ["yes", "yes", "yes", "yes", "yes"],
};

function Matrix() {
  return (
    <Card className="overflow-x-auto p-3">
      <Mockup label="Who can do what to orders: visitors nothing, customers their own orders, staff everything but delete, admins everything" className="sx-window block min-w-[560px]">
        <div className="grid h-[44px] grid-cols-[minmax(0,1.2fr)_repeat(5,minmax(0,1fr))] items-center border-b border-[var(--sx-line)] bg-[var(--sx-head)] px-5 text-[12px] text-[var(--sx-muted)]">
          <span>orders</span>
          {ACTIONS.map((a) => <span key={a} className="text-center">{a}</span>)}
        </div>
        {ROLES.map((role) => (
          <div key={role} className="grid h-[52px] grid-cols-[minmax(0,1.2fr)_repeat(5,minmax(0,1fr))] items-center border-b border-[var(--sx-line-soft)] px-5 text-[12.5px] last:border-b-0">
            <span className="font-medium">{role}</span>
            {GRID[role].map((cell, i) => (
              <span key={i} className="text-center">
                {cell === "yes" ? (
                  <span className="text-[var(--sx-ok)]">✓</span>
                ) : cell === "own" ? (
                  <span className="text-[12px] text-[var(--sx-brand)]">own</span>
                ) : (
                  <span className="text-[var(--sx-faint)]">—</span>
                )}
              </span>
            ))}
          </div>
        ))}
      </Mockup>
    </Card>
  );
}

function JsonView() {
  return (
    <Card className="p-3">
      <Mockup label="The same rule shown as JSON" className="sx-window block">
        <div className="sx-tabs px-5">
          <span>Configure</span>
          <span data-on="">JSON</span>
        </div>
        <pre className="sx-mono overflow-x-auto px-5 py-5 text-[12.5px] leading-[1.8] text-[var(--sx-muted)]">
          {'{\n  "any": [\n    { "owner": '}<span className="text-[#c9bfff]">"owner_id"</span>{' },\n    { "role": '}<span className="text-[#c9bfff]">"admin"</span>{' }\n  ]\n}'}
        </pre>
      </Mockup>
    </Card>
  );
}

export default function PoliciesPage() {
  return (
    <ProductShell title="Access policies" description="Readable rules for who can list, read, create, update and delete, enforced on every request, file and channel.">
      <Band
        className="pb-[clamp(72px,9vw,120px)] pt-[clamp(56px,7vw,96px)]"
        backdrop={<Contours flip className="opacity-[0.12] [mask-image:radial-gradient(ellipse_60%_70%_at_75%_40%,black,transparent_75%)] [-webkit-mask-image:radial-gradient(ellipse_60%_70%_at_75%_40%,black,transparent_75%)]" />}
      >
        <Split
          ratio="wide-visual"
          copy={
            <div className="flex flex-col gap-6">
              <ProductName icon="policies" name="Access policies" />
              <Display quiet="Their access.">Your rules.</Display>
              <p className="max-w-[40ch] text-[16px] leading-[1.65] text-muted">
                Decide who can see and change each record with a form anyone
                on the team can read. Pawabase checks it on every request.
              </p>
              <HeroActions />
            </div>
          }
          visual={<Builder />}
        />
      </Band>

      <Band labelledBy="po-figure" className="py-[clamp(72px,9vw,120px)]">
        <Copy id="po-figure" center title="One rule. Three people." quiet="Three different answers.">
          The same request returns two orders for a customer, all five for an
          admin, and nothing at all for someone who isn't signed in.
        </Copy>
        <Card className="mt-12 px-4 py-10">
          <AccessFigure />
        </Card>
      </Band>

      <Band labelledBy="po-matrix" className="py-[clamp(72px,9vw,120px)]" backdrop={backdrop.grid("50%")}>
        <Split
          flip
          ratio="wide-visual"
          copy={
            <Copy id="po-matrix" title="A rule per action." quiet="Reading isn't deleting.">
              Listing, reading, creating, updating and deleting each get their
              own rule, so a customer can see an order without ever removing it.
            </Copy>
          }
          visual={<Matrix />}
        />
      </Band>

      <Band labelledBy="po-doors" className="py-[clamp(72px,9vw,120px)]">
        <Copy id="po-doors" center title="Every door, the same lock." quiet="No side entrance." />
        <Points
          className="mx-auto mt-12 max-w-[1000px]"
          items={[
            { icon: "document", title: "The Data API", copy: "Every list, read and write checks the rule first." },
            { icon: "storage", title: "Files", copy: "Buckets follow the same kind of rule, per action." },
            { icon: "realtime", title: "Realtime", copy: "Private channels turn away anyone who shouldn't hear." },
          ]}
        />
      </Band>

      <Band labelledBy="po-who" className="py-[clamp(88px,10vw,140px)]" backdrop={backdrop.hatch("50%", "50%")}>
        <h2 id="po-who" className="text-center text-[15px] text-faint">Rules can use</h2>
        <ul className="mx-auto mt-8 flex max-w-[960px] flex-wrap justify-center gap-x-10 gap-y-4">
          {["the signed-in user", "their role", "their organization", "the record's owner", "the record's fields"].map((item, i) => (
            <li key={item} className={`text-[clamp(24px,3vw,40px)] tracking-[-0.045em] ${i % 2 ? "text-muted" : "text-text"}`}>{item}</li>
          ))}
        </ul>
      </Band>

      <Band labelledBy="po-json" className="py-[clamp(72px,9vw,120px)]">
        <Split
          copy={
            <Copy id="po-json" title="A form for the team." quiet="JSON for the review.">
              Build rules with the form, then read the exact definition when a
              change goes through review. Both always say the same thing.
            </Copy>
          }
          visual={<JsonView />}
        />
      </Band>

      <ProductCta
        title="Ship features,"
        quiet="not security holes."
        next={{ label: "Next: API security", href: "/products/api-security" }}
        backdrop={backdrop.glow("50%", "100%", "1000px", "420px")}
      />
    </ProductShell>
  );
}

