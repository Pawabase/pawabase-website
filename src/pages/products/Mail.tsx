import { Band, HeroActions, ProductFrame, Questions, Spec, Steps, useTicker } from "@/components/product/ProductFrame";
import { SiteNav } from "@/components/site/SiteNav";
import "./mail.css";

/* Paper on dark: the one page that goes light. A real letter fills in its own values in the hero, six kinds of email sit on a table, and the log shows a failed message going out again. */

const FIELDS: Record<string, string> = { name: "Ada", order: "1042", total: "$128.00" };
const LOG: [string, string][] = [["ada@example.com", "Your receipt"], ["grace@example.com", "Your sign-in code"], ["alan@example.com", "You're invited to Acme"]];

function Value({ name, filled }: { name: string; filled: boolean }) {
  return <span className={`ml-var ${filled ? "filled" : ""}`}>{filled ? FIELDS[name] : `{{ ${name} }}`}</span>;
}

function Letter() {
  const filled = useTicker(2600, 1) % 2 === 1;
  return (
    <div className="ml-letter" aria-hidden="true">
      <header><b>Your receipt from Acme</b><small>Acme &lt;hello@acme.com&gt;</small></header>
      <p className="ml-hello">Hi <Value name="name" filled={filled} />,</p>
      <p>Thanks for your order. We've got it and we're on it.</p>
      <div className="ml-lines">
        <div><span>Order</span><span>#<Value name="order" filled={filled} /></span></div>
        <div><b>Total</b><b><Value name="total" filled={filled} /></b></div>
      </div>
      <span className="ml-cta">View your order</span>
    </div>
  );
}

function Mini({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <article>
      <div className="ml-mini">{children}</div>
      <h3>{title}</h3>
    </article>
  );
}

function Delivery() {
  const tick = useTicker(1900) % 4;
  return (
    <ul className="ml-log" aria-hidden="true">
      {LOG.map(([to, subject], i) => {
        const failed = i === 1 && tick < 2;
        return (
          <li key={to} className={failed ? "failed" : ""}>
            <span>{to}</span>
            <small>{subject}</small>
            <em>{failed ? "Failed" : "Sent"}</em>
            <u className={i === 1 && tick === 1 ? "press" : i === 1 && tick < 2 ? "" : "hide"}>Send again</u>
          </li>
        );
      })}
    </ul>
  );
}

export default function MailPage() {
  return (
    <ProductFrame name="Mail" description="Transactional email with a visual template editor, sign-in emails, sends from flows, a delivery log and retries over your own SMTP.">
      <section className="ix-hero ml-hero" aria-labelledby="product-title" data-plain="">
        <SiteNav />
        <div className="ml-copy">
          <h1 id="product-title" data-reveal="up">Email your app sends,<br />designed and tracked.</h1>
          <HeroActions />
        </div>
        <Letter />
      </section>

      <Band label="Every email your app sends" className="ml-table">
        <h2>Sign-in emails are ready. Add your own for everything else.</h2>
        <div className="ml-minis" aria-hidden="true">
          <Mini title="Sign-in code"><i /><b className="ml-code">482 917</b><i className="s" /></Mini>
          <Mini title="Magic link"><i /><i className="s" /><span className="ml-mini-btn">Sign in</span></Mini>
          <Mini title="Password reset"><i /><i /><span className="ml-mini-btn">Reset</span></Mini>
          <Mini title="Invitation"><b className="ml-who">Grace invited you</b><i /><span className="ml-mini-btn">Join Acme</span></Mini>
          <Mini title="Receipt"><i className="s" /><div className="ml-rows"><u /><u /><u /></div><b className="ml-total">$128.00</b></Mini>
          <Mini title="Alert"><span className="ml-flag" /><i /><i className="s" /></Mini>
        </div>
      </Band>

      <Band label="A visual editor" className="ml-editor" band>
        <div>
          <h2>Design emails without hand-writing HTML.</h2>
          <p>Build from blocks, in your brand, with a live preview. Fill templates with names, totals and links, and send them from any flow.</p>
        </div>
        <ul className="ml-blocks" aria-hidden="true">
          {["Text", "Image", "Button", "Columns", "Show if", "Repeat"].map((block) => <li key={block}>{block}</li>)}
        </ul>
      </Band>

      <Band label="Delivery log" className="ml-delivery">
        <div>
          <h2>Every message, and how it went.</h2>
          <p>See what was sent and what failed. Send it again in one click, through the SMTP service you already use.</p>
        </div>
        <Delivery />
      </Band>

      <Steps band lead="From a template to an email in someone's inbox." steps={[
        ["Design a template", "Build it from blocks in your brand, with a live preview."],
        ["Fill it in", "Names, totals and links come from the flow or request that sends it."],
        ["Send and track", "Send from any flow, see how each message went, and send again in one click."],
      ]} />

      <Spec title="Everything in Mail" icon="mail" items={[
        ["Sign-in emails", "Codes, links, resets and invitations, ready to use."],
        ["A visual editor", "Blocks, conditions and repeats, no hand-written HTML."],
        ["Templates with values", "Fill names, totals and links when you send."],
        ["Sends from flows", "Any flow can send an email as a step."],
        ["A delivery log", "What was sent, what failed, and why."],
        ["Your own SMTP", "Send through the service you already use."],
      ]} />

      <Questions items={[
        ["Do I need my own email provider?", "Not to start: sign-in emails are sent for you. Connect the SMTP service you already use for everything else."],
        ["Can I send an email from a flow?", "Yes. Sending an email is a step in any flow, filled with the values the flow has."],
        ["What happens when a message fails?", "It shows in the delivery log with the reason, and you can send it again in one click."],
      ]} />
    </ProductFrame>
  );
}
