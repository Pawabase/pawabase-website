import { Highlight, type PrismTheme } from "prism-react-renderer";
import { isValidElement, useState, type ReactElement, type ReactNode } from "react";

/*
 * Code in a post: the site's own colours, the file name or language in a bar on top, a copy button, line numbers, and the lines a
 * fence marks ({2,4-6}) lit. MDX hands over <pre><code className="language-ts" data-title data-lines>…</code></pre>.
 */

const THEME: PrismTheme = {
  plain: { color: "#e4e0d9", backgroundColor: "transparent" },
  styles: [
    { types: ["comment", "prolog", "doctype"], style: { color: "#77736c", fontStyle: "italic" } },
    { types: ["keyword", "operator", "boolean", "important", "atrule"], style: { color: "#FF6A00" } },
    { types: ["string", "attr-value", "template-string", "char"], style: { color: "#ffd27a" } },
    { types: ["function", "method"], style: { color: "#ffd27a" } },
    { types: ["class-name", "builtin", "tag"], style: { color: "#ffb36b" } },
    { types: ["number", "constant", "symbol"], style: { color: "#7fb2f0" } },
    { types: ["punctuation"], style: { color: "#a8a49d" } },
    { types: ["variable", "parameter", "property", "attr-name"], style: { color: "#f3f0eb" } },
    { types: ["deleted"], style: { color: "#ff8a80" } },
    { types: ["inserted"], style: { color: "#9be38a" } },
  ],
};

const NAMES: Record<string, string> = {
  ts: "TypeScript", tsx: "TSX", typescript: "TypeScript", js: "JavaScript", jsx: "JSX", javascript: "JavaScript", py: "Python", python: "Python",
  sql: "SQL", sh: "Shell", bash: "Shell", shell: "Shell", json: "JSON", yaml: "YAML", yml: "YAML", http: "HTTP", text: "Text", diff: "Diff", go: "Go", css: "CSS", html: "HTML",
};

/** "2,4-6" → {2, 4, 5, 6} */
function lit(spec?: string) {
  const out = new Set<number>();
  for (const part of (spec ?? "").split(",").filter(Boolean)) {
    const [a, b] = part.split("-").map(Number);
    for (let n = a!; n <= (b ?? a!); n++) out.add(n);
  }
  return out;
}

function Copy({ text }: { text: string }) {
  const [done, setDone] = useState(false);
  return (
    <button
      type="button"
      className={`bp-copy ${done ? "done" : ""}`}
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(text);
          setDone(true);
          window.setTimeout(() => setDone(false), 1600);
        } catch {
          /* the clipboard can be refused; nothing to do */
        }
      }}
      aria-label="Copy the code"
    >
      {done ? "Copied" : "Copy"}
    </button>
  );
}

type CodeProps = { className?: string; children?: ReactNode; "data-title"?: string; "data-lines"?: string };

/** MDX's <pre>: highlighted when it wraps a code element, left alone otherwise. */
export function Pre({ children }: { children?: ReactNode }) {
  const code = isValidElement(children) ? (children as ReactElement<CodeProps>) : null;
  if (!code) return <pre className="bp-pre-plain">{children}</pre>;
  const { className = "", children: raw, "data-title": title, "data-lines": lines } = code.props;
  const language = className.replace(/^language-/, "") || "text";
  const text = String(raw ?? "").replace(/\n$/, "");
  const marked = lit(lines);
  return (
    <div className="bp-code">
      <div className="bp-code-bar">
        <span className="bp-code-title">{title ?? NAMES[language] ?? language}</span>
        {title && <span className="bp-code-lang">{NAMES[language] ?? language}</span>}
        <Copy text={text} />
      </div>
      <Highlight code={text} language={language} theme={THEME}>
        {({ tokens, getLineProps, getTokenProps }) => (
          <pre className="bp-pre" tabIndex={0}>
            <code>
              {tokens.map((line, i) => (
                <span key={i} {...getLineProps({ line })} className={`bp-line ${marked.has(i + 1) ? "lit" : ""}`}>
                  <span className="bp-ln" aria-hidden="true">{i + 1}</span>
                  <span className="bp-lc">
                    {line.map((token, k) => <span key={k} {...getTokenProps({ token })} />)}
                    {"\n"}
                  </span>
                </span>
              ))}
            </code>
          </pre>
        )}
      </Highlight>
    </div>
  );
}
