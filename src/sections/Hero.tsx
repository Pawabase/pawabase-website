import { useEffect, useState } from "react";
import { docs, github } from "../config";
import { Icon } from "../components/Primitives";

const features = [
  { id: "database", label: "Database", detail: "Typed resources", icon: "database", preview: "/media/studio/resources.webp" },
  { id: "auth", label: "Authentication", detail: "Policies apply", icon: "shield", preview: "/media/studio/policies.webp" },
  { id: "storage", label: "Storage", detail: "Signed access", icon: "folder", preview: "/media/studio/portal.webp" },
  { id: "realtime", label: "Realtime", detail: "Live channels", icon: "radio", preview: "/media/studio/overview.webp" },
  { id: "flows", label: "Flows", detail: "Visual logic", icon: "flow", preview: "/media/studio/flows.webp" },
  { id: "apis", label: "APIs", detail: "Ready to call", icon: "code", preview: "/media/studio/api.webp" },
] as const;

const snippets = {
  query: `import { createClient } from "@pawabase/client"\n\nconst pawa = createClient({\n  url: "https://api.myapp.com",\n  apiKey: "pb_pk_••••••••",\n})\n\nconst { data } = await pawa\n  .from("orders")\n  .eq("status", "paid")\n  .order("created_at", "desc")`,
  auth: `const result = await pawa.auth\n  .signInWithPassword({\n    email: "ada@acme.co",\n    password: "••••••••",\n  })\n\nif (result.status === "mfa_required") {\n  await result.verify(code)\n}`,
};

function CodePanel() {
  const [tab, setTab] = useState<keyof typeof snippets>("query");
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(snippets[tab]);
      setCopied(true);
    } catch {
      setCopied(false);
    }
  };

  useEffect(() => {
    if (!copied) return;
    const timer = window.setTimeout(() => setCopied(false), 1600);
    return () => window.clearTimeout(timer);
  }, [copied]);

  return (
    <div className="hero-code-card">
      <div className="hero-card-bar hero-code-bar">
        <div className="hero-code-tabs" role="tablist" aria-label="SDK examples">
          <button role="tab" aria-selected={tab === "query"} className={tab === "query" ? "active" : ""} onClick={() => setTab("query")}>Query</button>
          <button role="tab" aria-selected={tab === "auth"} className={tab === "auth" ? "active" : ""} onClick={() => setTab("auth")}>Auth</button>
        </div>
        <button className="hero-copy-button" onClick={copy} aria-label="Copy SDK example">{copied ? "Copied" : "Copy"}</button>
      </div>
      <pre><code>{tab === "query" ? <>
        <span className="syn-purple">import</span>{" { "}<span className="syn-blue">createClient</span>{" } "}<span className="syn-purple">from</span>{"\n"}<span className="syn-green">&quot;@pawabase/client&quot;</span>{"\n\n"}<span className="syn-purple">const</span>{" pawa = "}<span className="syn-blue">createClient</span>{"({\n  url: "}<span className="syn-green">&quot;https://api.myapp.com&quot;</span>{",\n  apiKey: "}<span className="syn-green">&quot;pb_pk_••••••••&quot;</span>{",\n})\n\n"}<span className="syn-purple">const</span>{" { data } = "}<span className="syn-purple">await</span>{" pawa\n  ."}<span className="syn-blue">from</span><span className="syn-gold">(&quot;orders&quot;)</span>{"\n  ."}<span className="syn-blue">eq</span><span className="syn-gold">(&quot;status&quot;, &quot;paid&quot;)</span>{"\n  ."}<span className="syn-blue">order</span><span className="syn-gold">(&quot;created_at&quot;, &quot;desc&quot;)</span>
      </> : <>
        <span className="syn-purple">const</span>{" result = "}<span className="syn-purple">await</span>{" pawa.auth\n  ."}<span className="syn-blue">signInWithPassword</span>{"({\n    email: "}<span className="syn-green">&quot;ada@acme.co&quot;</span>{",\n    password: "}<span className="syn-green">&quot;••••••••&quot;</span>{",\n  })\n\n"}<span className="syn-purple">if</span>{" (result.status === "}<span className="syn-green">&quot;mfa_required&quot;</span>{") {\n  "}<span className="syn-purple">await</span>{" result."}<span className="syn-blue">verify</span>{"(code)\n}"}
      </>}</code></pre>
      <div className="hero-code-foot"><span><i /> Type-safe response</span><b>TypeScript</b></div>
    </div>
  );
}

export function Hero() {
  const [active, setActive] = useState<(typeof features)[number]>(features[0]);

  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="hero-shell">
        <div className="hero-copy">
          <h1 id="hero-title" className="display">Build your backend.<br /><em>Keep your momentum.</em></h1>
          <p className="hero-lede">Database, auth, storage, realtime and backend logic—connected in one place, with an SDK that stays out of your way.</p>
          <div className="hero-actions">
            <a className="btn btn-ink" href={docs("quickstart")}>Start building <Icon name="arrow" /></a>
            <a className="hero-secondary" href={github}>See how it works <span aria-hidden="true">↗</span></a>
          </div>
        </div>

        <div className="hero-stage" aria-label="Pawabase SDK, Studio and features">
          <div className="hero-code-column">
            <p><b>TypeScript SDK</b><span>One client for your whole backend.</span></p>
            <CodePanel />
          </div>

          <div className="hero-studio-wrap">
            <div className="hero-studio-media">
              <img key={active.id} src={active.preview} alt={`Pawabase Studio ${active.label} view`} fetchPriority="high" />
            </div>
          </div>

          <div className="hero-feature-column">
            <p>Everything your product needs, connected and ready to use.</p>
            <div className="hero-feature-grid">{features.map((feature) => (
              <button key={feature.id} className={active.id === feature.id ? "active" : ""} aria-pressed={active.id === feature.id} onClick={() => setActive(feature)}>
                <span className={`hero-feature-icon tone-${feature.id}`}><Icon name={feature.icon} /></span>
                <b>{feature.label}</b>
              </button>
            ))}</div>
          </div>
        </div>
      </div>
    </section>
  );
}
