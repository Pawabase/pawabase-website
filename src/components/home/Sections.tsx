import { Arrow } from "./Home";
import "./sections.css";
import { DOCS, SIGN_UP } from "@/lib/links";

/* ── the closing: one centred line in the hero's silver, two buttons, and nothing else; the footer follows straight on ── */

export function Closing() {
  return (
    <section className="ix-section ix-closing" aria-labelledby="closing-title" data-plain="">
      <h2 id="closing-title" data-reveal="up">Build the whole system.<br /><span>Start free today.</span></h2>
      <div className="ix-closing-actions" data-reveal="up">
        <a href={SIGN_UP} className="btn btn-light btn-lg">Start building <Arrow /></a>
        <a href={DOCS} className="btn btn-lg">Read the docs</a>
      </div>
    </section>
  );
}
