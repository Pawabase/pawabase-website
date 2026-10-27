import { Icon } from "@/components/Icon";
import { backdrop } from "@/components/landing/Backdrops";
import { Band, Card } from "@/components/landing/Section";
import { Mockup, useInView, useLiveTick } from "@/components/landing/studio/Studio";
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

function Email({ name = "Kwame" }: { name?: string }) {
  return (
    <div className="rounded-[10px] bg-[#fbfaf8] px-8 py-8 text-left text-[#1b1a1f]">
      <div className="text-[15px] font-bold tracking-[-0.03em]">Northwind</div>
      <div className="mt-8 text-[22px] font-semibold leading-[1.2] tracking-[-0.025em]">Your order is packed</div>
      <p className="mt-3 text-[14px] leading-[1.65] text-[#55535e]">
        Hi {name}, order 1281 is packed and leaves our warehouse today. We'll
        send the tracking link the moment it's on its way.
      </p>
      <div className="mt-6 grid gap-2 border-y border-[#ebe9e4] py-4 text-[13px]">
        <span className="flex justify-between"><span>Stoneware mug × 2</span><span>$48.00</span></span>
        <span className="flex justify-between"><span>Linen tote</span><span>$41.99</span></span>
      </div>
      <span className="mt-6 inline-flex h-10 items-center rounded-[8px] bg-[#1b1a1f] px-5 text-[13px] font-semibold text-white">View order</span>
    </div>
  );
}

function HeroEmail() {
  const { ref, inView } = useInView<HTMLDivElement>();
  const tick = useLiveTick(inView, 2400);
  const names = ["Kwame", "Inès", "Priya", "Mateo"];

  return (
    <div ref={ref}>
      <Card className="mx-auto max-w-[920px] p-3">
        <Mockup label="An order email rendered from a template, with the variables it uses listed beside it" className="sx-window grid min-[860px]:grid-cols-[minmax(0,1fr)_240px]">
          <div className="bg-[var(--sx-head)] p-6">
            <Email name={names[tick % names.length]} />
          </div>
          <div className="border-t border-[var(--sx-line)] p-5 min-[860px]:border-l min-[860px]:border-t-0">
            <div className="text-[13px] font-semibold">order-packed</div>
            <div className="mt-1 text-[12px] text-[var(--sx-faint)]">Template · updated 2 days ago</div>
            <div className="mt-5 text-[12px] text-[var(--sx-muted)]">Variables</div>
            <div className="mt-2 flex flex-wrap gap-1.5">
              {["name", "order.id", "order.items", "order.total", "tracking_url"].map((v) => (
                <span key={v} className="sx-mono rounded-[4px] border border-[var(--sx-line)] px-1.5 py-0.5 text-[11.5px] text-[var(--sx-muted)]">{`{{ ${v} }}`}</span>
              ))}
            </div>
            <span className="sx-btn mt-6 w-full justify-center">Send test</span>
          </div>
        </Mockup>
      </Card>
    </div>
  );
}

function TemplateSource() {
  return (
    <Card className="p-3">
      <Mockup label="The order-packed template's source, with placeholders for the customer's name and order" className="sx-window block">
        <div className="sx-tabs px-5">
          <span data-on="">order-packed</span>
          <span>welcome</span>
          <span>password-reset</span>
          <span>invoice</span>
        </div>
        <pre className="sx-mono overflow-x-auto px-5 py-5 text-[12.5px] leading-[1.85] text-[var(--sx-muted)]">
          {"<h1>Your order is packed</h1>\n<p>Hi "}
          <span className="text-[#c9bfff]">{"{{ name }}"}</span>
          {", order "}
          <span className="text-[#c9bfff]">{"{{ order.id }}"}</span>
          {" is packed.</p>\n\n"}
          <span className="text-[#ff9a7c]">{"{% for item in order.items %}"}</span>
          {"\n  <p>"}
          <span className="text-[#c9bfff]">{"{{ item.name }}"}</span>
          {" × "}
          <span className="text-[#c9bfff]">{"{{ item.qty }}"}</span>
          {"</p>\n"}
          <span className="text-[#ff9a7c]">{"{% endfor %}"}</span>
          {"\n\n<a href=\""}
          <span className="text-[#c9bfff]">{"{{ tracking_url }}"}</span>
          {"\">View order</a>"}
        </pre>
      </Mockup>
    </Card>
  );
}

function Log() {
  return (
    <Card className="p-3">
      <Mockup label="Recent emails: most sent, one failed delivery and one suppressed address" className="sx-window block">
        <div className="flex items-center justify-between border-b border-[var(--sx-line)] px-5 py-3">
          <span className="text-[14px] font-semibold">Recent mail</span>
          <span className="sx-seg"><span data-on="">Every status</span><span>Failed</span></span>
        </div>
        {[
          ["kwame@mensah.co", "order-packed", "Sent", "var(--sx-ok)"],
          ["ines.laurent@gmail.com", "welcome", "Sent", "var(--sx-ok)"],
          ["old@northwind.dev", "invoice", "Delivery failed", "var(--sx-danger)"],
          ["no-reply@example.com", "digest", "Suppressed", "var(--sx-faint)"],
          ["priya@raman.dev", "password-reset", "Sent", "var(--sx-ok)"],
        ].map(([to, template, status, tone]) => (
          <div key={to} className="grid h-[48px] grid-cols-[minmax(0,1.3fr)_minmax(0,0.9fr)_130px] items-center border-b border-[var(--sx-line-soft)] px-5 text-[12.5px] last:border-b-0">
            <span className="truncate">{to}</span>
            <span className="sx-mono truncate text-[var(--sx-faint)]">{template}</span>
            <span className="flex items-center gap-2 text-[var(--sx-muted)]">
              <span className="sx-dot" style={{ background: tone }} />
              {status}
            </span>
          </div>
        ))}
      </Mockup>
    </Card>
  );
}

export default function MailPage() {
  return (
    <ProductShell title="Mail" description="Transactional email from reusable templates, sent directly or from workflows.">
      <Band className="pb-[clamp(72px,9vw,120px)] pt-[clamp(64px,8vw,112px)]" backdrop={<>{backdrop.glow("50%", "65%", "1000px", "600px")}{backdrop.dots("50%", "70%")}</>}>
        <div className="mx-auto flex max-w-[720px] flex-col items-center gap-6 text-center">
          <ProductName icon="mail" name="Mail" />
          <Display quiet="Without the email plumbing.">Emails people open.</Display>
          <p className="max-w-[46ch] text-[16px] leading-[1.65] text-muted">
            Receipts, welcomes, resets and digests, written once as templates
            and sent the moment something happens.
          </p>
          <HeroActions />
        </div>
        <div className="mt-14">
          <HeroEmail />
        </div>
      </Band>

      <Band labelledBy="m-templates" className="py-[clamp(72px,9vw,120px)]">
        <Split
          ratio="wide-visual"
          copy={
            <Copy id="m-templates" title="Write it once." quiet="Fill it in every time.">
              Templates take the customer's name, their order and anything
              else you pass in, with loops and conditions when you need them.
            </Copy>
          }
          visual={<TemplateSource />}
        />
      </Band>

      <Band labelledBy="m-send" className="py-[clamp(72px,9vw,120px)]" backdrop={backdrop.hatch("50%", "50%")}>
        <Copy id="m-send" center title="Send it from a flow." quiet="One block, no code." />
        <div className="mt-12 grid gap-4 min-[900px]:grid-cols-2">
          <Card className="p-7">
            <span className="text-[15px] font-medium text-text">In a flow</span>
            <p className="mt-2 text-[14px] text-muted">Drop in a Send email block.</p>
            <Mockup label="A flow step that sends the order-packed email when an order is packed" className="mt-6 block">
              <div className="grid gap-0">
                <div className="rounded-[10px] border border-[var(--sx-line)] px-4 py-3 text-[12.5px]"><span className="text-[var(--sx-faint)]">When </span>an order is packed</div>
                <div className="ml-6 h-5 w-px bg-[var(--sx-brand)]" />
                <div className="flex items-center gap-3 rounded-[10px] border border-[var(--sx-brand)] px-4 py-3 text-[12.5px]">
                  <Icon name="mail" size={16} variant="Bulk" className="text-[var(--sx-brand)]" />
                  Send email · <span className="sx-mono text-[var(--sx-muted)]">order-packed</span>
                </div>
              </div>
            </Mockup>
          </Card>
          <CodeCard
            file="Send email"
            label="The settings of the Send email block: the order-packed template, the customer's address and the order as its data"
            className="h-full"
            lines={[
              "template: order-packed",
              'to: {{ input.order.email }}',
              "data: {{ input.order }}",
            ]}
          />
        </div>
      </Band>

      <Band labelledBy="m-log" className="py-[clamp(72px,9vw,120px)]">
        <Split
          flip
          ratio="wide-visual"
          copy={
            <Copy id="m-log" title="Know what went out." quiet="And what didn't.">
              Every message is logged with its status, so a failed delivery or
              a suppressed address never goes unnoticed.
            </Copy>
          }
          visual={<Log />}
        />
      </Band>

      <Band labelledBy="m-safe" className="py-[clamp(88px,10vw,140px)]" backdrop={backdrop.grid("50%")}>
        <div className="mx-auto max-w-[880px] text-center">
          <h2 id="m-safe" className="text-[clamp(26px,3.2vw,42px)] font-normal leading-[1.2] tracking-[-0.045em] text-text text-balance">
            Safe while you build.
            <span className="text-muted"> Until a mail server is set up, messages are recorded instead of sent, so test data never lands in a real inbox.</span>
          </h2>
        </div>
      </Band>

      <ProductCta
        title="Say the right thing,"
        quiet="right when it happens."
        next={{ label: "Next: Webhooks", href: "/products/webhooks" }}
        backdrop={backdrop.glow("50%", "100%", "1000px", "420px")}
      />
    </ProductShell>
  );
}
