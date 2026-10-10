import { Figure } from "../components/Figure";
import { figures } from "../hairline/registry";

/** Development bench: every registered figure, large, so it can be looked at and driven. */
export function Figures() {
  const only = typeof location !== "undefined" ? new URLSearchParams(location.search).get("only") : null;
  const names = Object.keys(figures).filter((n) => !only || only.split(",").includes(n));
  return (
    <div className="wrap section">
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(420px, 1fr))", gap: 48 }}>
        {names.map((n) => (
          <div key={n}>
            <div className="small mono" style={{ marginBottom: 8 }}>
              {n}
            </div>
            <Figure name={n} names={(c) => c} />
          </div>
        ))}
      </div>
    </div>
  );
}
