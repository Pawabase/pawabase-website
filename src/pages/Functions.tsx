import { Code } from "../components/Code";
import { Figure } from "../components/Figure";
import { Next } from "../components/Next";
import { docs } from "../config";

const ORDERS_PAY = `
from pawabase.functions import FunctionError, function

@function("orders.pay", policy="authenticated", timeout=30)
async def pay(ctx):
    async with ctx.runtime.transaction() as db:
        moved = await db.execute(
            "UPDATE orders SET status = 'paid' "
            "WHERE id = ? AND status = 'pending'",
            [ctx.input["order_id"]],
        )
        if not moved:
            raise FunctionError(
                "That order is not waiting for payment.",
                status=409,
                code="not_pending",
            )
    await ctx.runtime.emit("order.paid", {"id": ctx.input["order_id"]})
    return {"paid": True}
`;

const CLI = `
pip install pawabase
pawabase init
pawabase emulate --watch
pawabase deploy
pawabase deploy --branch my-feature
pawabase rollback
pawabase logs -f
`;

export default function Functions() {
  return (
    <>
      <section className="pagehead">
      <i className="fx dots soft fill" aria-hidden="true" />
        <div className="wrap split">
          <div className="c5" style={{ alignSelf: "center" }}>
            <h1 className="h1" style={{ fontSize: "clamp(34px, 4.4vw, 56px)" }}>Functions</h1>
            <p className="lede" style={{ marginTop: 20 }}>Plain async Python for logic a flow cannot express. It lives in your repository and runs next to your data.</p>
            <div className="actions" style={{ marginTop: 28 }}>
              <a className="btn btn-primary" href={docs("code/functions")}>Read about Functions</a>
              <a className="btn" href={docs("code/cli")}>Command line</a>
            </div>
          </div>
          <div className="c7">
            <Code lang="python" caption="A function: a transaction, a deliberate error and an event." source="pawabase-docs, Code › Functions">
              {ORDERS_PAY}
            </Code>
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="three">
      <i className="fx dots patch tr" aria-hidden="true" />
        <div className="wrap">
          <h2 id="three" className="h1" style={{ marginBottom: 28, maxWidth: "18ch" }}>
            The same file runs in three places.
          </h2>
          <div className="two three">
            <div className="sheet blurb"><h3 className="h3">On a deployment</h3><p className="body">Deploy with an API key. Branches deploy next to main, and rollback is one command.</p></div>
            <div className="sheet blurb"><h3 className="h3">On your machine</h3><p className="body"><span className="mono">pawabase emulate</span> serves it locally against a real deployment.</p></div>
            <div className="sheet blurb"><h3 className="h3">In a unit test</h3><p className="body">Tests use <span className="mono">pawabase.testing</span> and need no server.</p></div>
          </div>
          <p className="notice" style={{ marginTop: 28 }}>Running functions in isolated worker processes by default is in review and is not part of a released version.</p>
        </div>
      </section>

      <section className="section deep" aria-labelledby="invoke">
      <i className="fx rings big tr" aria-hidden="true" />
        <div className="wrap split top">
          <div className="c5">
            <div className="stage">
              <Figure name="workers" names={(c) => c} label="A plate with four worker tiles on dashed links. The tile under the pointer rises alone." ratio="5 / 4" />
            </div>
          </div>
          <div className="c7 stack" style={{ ["--gap" as string]: "22px" }}>
            <h2 id="invoke" className="h1">
              Called over HTTP, from a flow, or as a job.
            </h2>
            <p className="lede">Its policy decides who may call it. Inside, ctx.runtime reaches resources, events, storage, mail and secrets.</p>
            <Code lang="bash" caption="From an empty folder to a followed log." source="pawabase-docs, Code › CLI">
              {CLI}
            </Code>
          </div>
        </div>
      </section>
      <Next current="functions" docsHref={docs("code/functions")} docsLabel="Functions" />
    </>
  );
}
