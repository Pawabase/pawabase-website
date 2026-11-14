import { ProductFrame, Questions } from "@/components/product/ProductFrame";
import { ChipsArt, GlyphArt, RelayArt, RingArt, RowsArt, TimelineArt } from "@/components/product/objects";
import { Bento, Compare, Pipeline, ProductHero, Tour } from "@/components/product/sections";

/* Webhooks: a signed event on a wire as the hero; in and out side by side; the path of an outgoing event; a tour of routing,
   retries and signatures; inbound as a bento; questions. */

export default function WebhooksPage() {
  return (
    <ProductFrame
      name="Webhooks"
      description="Inbound webhooks that start flows, and signed, retried outbound events with a history of every delivery."
      hero={
        <ProductHero
          title="Talk to other services,"
          quiet="both ways."
          lead="Receive webhooks that start flows, and send signed events to the services you use."
          art={<RelayArt />}
          notes={["Signed", "Retried", "Every delivery kept"]}
        />
      }
    >
      <Compare
        title="In and out"
        lead="One place for both directions."
        sides={[
          { icon: "add", title: "Inbound", line: "Receive webhooks that start flows.", rows: [["A URL", "For each service that calls you"], ["Checked", "It really came from who it says"], ["Then", "A flow starts"]] },
          { icon: "send", title: "Outbound", line: "Send signed events to the services you use.", rows: [["Events", "The ones you choose"], ["Signed", "Receivers can confirm it is you"], ["Retried", "Until it is delivered"]], lit: true },
        ]}
      />

      <Pipeline
        band
        title="The path of an outgoing event"
        lead="Signed, sent, and tried again if it fails."
        stages={[
          { icon: "events", label: "Something happens", line: "An order is created, a user signs up." },
          { icon: "filter", label: "Routed", line: "Each event goes where you chose." },
          { icon: "verified", label: "Signed", line: "Receivers can confirm it came from you." },
          { icon: "send", label: "Delivered", line: "Or tried again, waiting a little longer." },
        ]}
      />

      <Tour
        title="A closer look"
        lead="Routing, retries and proof of origin."
        stops={[
          { label: "Routing", title: "Choose which events go where", line: "Send each event to the services that need it.", points: ["orders.created to your warehouse", "user.created to your CRM", "orders.updated to your analytics"], art: <ChipsArt words={["orders.created", "orders.updated", "user.created", "invoices.created", "orders.deleted"]} /> },
          { label: "Retries", title: "A delivery that fails is tried again", line: "No answer or a server error, and the delivery waits and tries again.", points: ["First try: no answer", "Second try: server error", "Third try: delivered"], art: <TimelineArt items={["third try: delivered", "second try: server error", "first try: no answer"]} /> },
          { label: "Signatures", title: "Every delivery is signed", line: "Receivers can confirm it really came from you.", points: ["A signature on every delivery", "A secret per endpoint", "Easy to check on the other side"], art: <RingArt icon="verified" /> },
          { label: "History", title: "See every delivery", line: "What was sent, and how the receiver answered.", points: ["Every attempt", "The receiver's answer", "Send again in one click"], art: <RowsArt icons={["send", "send", "send"]} /> },
        ]}
      />

      <Bento
        band
        title="Receive them too"
        lead="A URL for each service that needs to reach you."
        tiles={[
          { title: "Payments", line: "A payment succeeded? Start the flow that ships the order.", art: <GlyphArt icon="key" /> },
          { title: "Source control", line: "A new push can run whatever should follow it.", art: <GlyphArt icon="code" /> },
          { title: "Forms and shipping", line: "Make sure a webhook really came from who it says, then start a flow when it calls.", art: <RelayArt />, size: "wide" },
        ]}
      />

      <Questions
        items={[
          ["How does a receiver know an event came from me?", "Every delivery is signed. The receiver checks the signature with the endpoint's secret."],
          ["What if the other service is down?", "The delivery is tried again, waiting a little longer each time, and every attempt is kept."],
          ["Can an incoming webhook start a flow?", "Yes. Each service gets its own URL, the webhook is checked, and then the flow you chose starts."],
        ]}
      />
    </ProductFrame>
  );
}
