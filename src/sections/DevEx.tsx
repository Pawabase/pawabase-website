import { useState } from "react";
import { Reveal } from "../lib";
import { docs } from "../config";

const TABS = [
  { key: "function", label: "A function", file: "functions/orders.py", doc: "code/functions", code: `from pawabase.functions import FunctionError, function

@function(
    "orders.pay",
    description="Mark an order paid",
    policy="authenticated",
    input_fields=[
        {"name": "order_id", "type": "integer", "required": True},
    ],
)
async def pay(ctx):
    async with ctx.runtime.transaction() as db:
        moved = await db.execute(
            "UPDATE orders SET status = 'paid' "
            "WHERE id = ? AND status = 'pending'",
            [ctx.input["order_id"]],
        )
        if not moved:
            raise FunctionError("Not waiting for payment.", status=409)
    await ctx.runtime.emit("order.paid", {"id": ctx.input["order_id"]})
    return {"paid": True}` },
  { key: "client", label: "From the client", file: "app.ts", doc: "clients/javascript", code: `import { createClient } from "@pawabase/client";

const pawabase = createClient({
  url: "https://api.example.com",
  apiKey: "pb_pk_…",
});

await pawabase.auth.signInWithPassword({ email, password });

const live = pawabase.from("posts").eq("status", "live");
const page = await live.order("created_at", "desc").perPage(20);` },
  { key: "cli", label: "From the terminal", file: "terminal", doc: "code/cli", code: `$ pip install pawabase
$ pawabase init
$ pawabase emulate --watch     # run it locally, against your deployment
$ pawabase deploy              # put it on the deployment
$ pawabase trigger event order.paid` },
] as const;

export function DevEx() {
  const [on, setOn] = useState(0);
  const t = TABS[on];
  return (
    <section className="dev" id="developers" aria-labelledby="dev-title">
      <div className="dev-wrap">
        <div className="dev-copy">
          <Reveal as="h2" delay={60} className="display"><span id="dev-title">Functions, flows and APIs in the same project.</span></Reveal>
          <Reveal as="p" delay={120}>Use ready-made capabilities for the work every product shares. Add the logic that makes yours different with Python functions, custom routes and visual flows.</Reveal>
          <Reveal as="p" delay={180}>Connect from the tools your team already uses: the JavaScript client, plain REST from any language, or the command line.</Reveal>
          <Reveal as="div" delay={240} className="dev-links">
            <a className="link-arrow" href={docs("clients/overview")}>Clients <span aria-hidden="true">→</span></a>
            <a className="link-arrow" href={docs("code/overview")}>Writing code <span aria-hidden="true">→</span></a>
          </Reveal>
        </div>
        <Reveal kind="fade" className="dev-window">
          <div className="dev-bar">
            <span className="dots" aria-hidden="true"><i /><i /><i /></span>
            <div className="dev-tabs" role="tablist">
              {TABS.map((x, i) => <button key={x.key} role="tab" aria-selected={i === on} className={i === on ? "on" : ""} onClick={() => setOn(i)}>{x.label}</button>)}
            </div>
            <span className="file mono">{t.file}</span>
          </div>
          <pre className="code mono" tabIndex={0} aria-label={`${t.label} example`}><code>{t.code}</code></pre>
          <div className="dev-foot"><a className="link-arrow" href={docs(t.doc)}>Open in the docs <span aria-hidden="true">→</span></a></div>
        </Reveal>
      </div>
    </section>
  );
}
