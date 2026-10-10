import { Reveal } from "../lib";

const ORDER = ["A users table.", "A password reset.", "Roles, once someone who isn't you signs up.", "File uploads.", "A queue, once a request takes too long.", "Webhooks, in and out.", "An admin screen to watch all of it."];

export function Why() {
  return (
    <section className="why" id="why" aria-labelledby="why-title">
      <div className="why-wrap">
        <div className="why-label">
          <Reveal as="h2" delay={60} className="display"><span id="why-title">Stop rebuilding the same backend.</span></Reveal>
        </div>
        <div className="why-body">
          <Reveal as="p" className="lead">Most teams spend their earliest product cycles assembling the same backend pieces.</Reveal>
          <ol className="why-seq">
            {ORDER.map((o, i) => <Reveal as="li" key={o} delay={i * 70}><span className="n">{String(i + 1).padStart(2, "0")}</span>{o}</Reveal>)}
          </ol>
          <Reveal as="p">Months in, the backend exists, but the product has barely moved. None of that work was unique, and none of it should have delayed what customers can see.</Reveal>
          <Reveal as="p">Pawabase provides accounts, permissions, data APIs, files, realtime and background work from the start. Add functions, routes and flows for the logic specific to your application.</Reveal>
          <Reveal as="blockquote" className="pull"><span className="mono">The backend is essential.</span><b>Starting it from zero is not.</b></Reveal>
        </div>
      </div>
    </section>
  );
}
