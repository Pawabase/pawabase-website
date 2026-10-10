import { Link } from "@tanstack/react-router";
import { products } from "../config";

/** The end of a product page: where to read more, and the other products. Real links only. */
export function Next({ current, docsHref, docsLabel }: { current: string; docsHref: string; docsLabel: string }) {
  return (
    <section className="next">
      <div className="wrap">
        <h2 className="h2">Keep reading.</h2>
        <div className="next-links">
          <a href={docsHref}>
            {docsLabel} <span>Documentation</span>
          </a>
          {products
            .filter((p) => p.key !== current)
            .map((p) => (
              <Link key={p.key} to={p.path}>
                {p.name} <span>{p.line}</span>
              </Link>
            ))}
        </div>
      </div>
    </section>
  );
}
