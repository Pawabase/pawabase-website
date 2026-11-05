import { useState } from "react";
import { Highlight, type PrismTheme } from "prism-react-renderer";

import { Icon } from "@/components/Icon";

import { Band, Eyebrow } from "./Section";
import { DOCS } from "@/lib/links";

export type Example = {
  id: "python" | "typescript" | "http";
  tab: string;
  title: string;
  description: string;
  file: string;
  language: "python" | "typescript" | "bash";
  install: string;
  code: string;
};

export const EXAMPLES: Example[] = [
  {
    id: "python",
    tab: "Python",
    title: "Python SDK",
    description: "Use the Python client in APIs, scripts, workers, and data jobs.",
    file: "app.py",
    language: "python",
    install: "pip install pawabase",
    code: `from pawabase import create_client

pb = create_client(url=URL, api_key=KEY)

session = pb.auth.sign_in_with_password(
    email="ada@example.com",
    password="••••••••",
)

posts = (pb.from_("posts")
    .eq("author_id", session.user.id)
    .all())

pb.from_("posts").create({
    "title": "Connected from Python",
    "author_id": session.user.id,
})`,
  },
  {
    id: "typescript",
    tab: "TypeScript",
    title: "TypeScript SDK",
    description: "Use one typed client across browser, server, and edge runtimes.",
    file: "app.ts",
    language: "typescript",
    install: "npm install @pawabase/client",
    code: `import { createClient } from "@pawabase/client";

const pb = createClient({ url: URL, apiKey: KEY });

const session = await pb.auth.signInWithPassword({
  email: "ada@example.com",
  password: "••••••••",
});

const posts = await pb.from("posts")
  .eq("author_id", session.user.id)
  .all();

await pb.from("posts").create({
  title: "Connected from TypeScript",
  author_id: session.user.id,
});`,
  },
  {
    id: "http",
    tab: "HTTP",
    title: "REST API",
    description: "Connect from any runtime that can make an HTTP request.",
    file: "requests.sh",
    language: "bash",
    install: "No SDK required — just HTTPS",
    code: `# Sign in and receive an access token
curl -X POST "$URL/auth/v1/token" \\
  -H "apikey: $KEY" \\
  -H "content-type: application/json" \\
  -d '{"email":"ada@example.com","password":"••••••••"}'

# Read the signed-in user's posts
curl "$URL/rest/v1/posts?filter[author_id]=eq.usr_123" \\
  -H "apikey: $KEY" -H "authorization: Bearer $TOKEN"

# Create another post
curl -X POST "$URL/rest/v1/posts" \\
  -H "apikey: $KEY" -H "authorization: Bearer $TOKEN" \\
  -H "content-type: application/json" \\
  -d '{"title":"Connected over HTTP","author_id":"usr_123"}'`,
  },
];

const POINTS = [
  "Same users everywhere",
  "Same rules on every request",
  "Same data in every app",
];

/* VS Code's Dark+ feel, tuned toward the brand: teal keywords, soft warm strings. */
const THEME: PrismTheme = {
  plain: { color: "#e4e0d9", backgroundColor: "transparent" },
  styles: [
    { types: ["comment", "prolog", "doctype"], style: { color: "#77736c" } },
    { types: ["keyword", "operator", "boolean", "important"], style: { color: "#FF6A00" } },
    { types: ["string", "attr-value", "template-string"], style: { color: "#ffd27a" } },
    { types: ["function", "method"], style: { color: "#ffd27a" } },
    { types: ["class-name", "builtin"], style: { color: "#FFD27A" } },
    { types: ["number", "constant", "symbol"], style: { color: "#7fb2f0" } },
    { types: ["punctuation"], style: { color: "#a8a49d" } },
    { types: ["variable", "parameter", "property"], style: { color: "#f3f0eb" } },
  ],
};

const MONO =
  '"JetBrains Mono", ui-monospace, "SF Mono", SFMono-Regular, Menlo, Consolas, "Liberation Mono", monospace';

const LANGUAGE_NAMES = { python: "Python", typescript: "TypeScript", bash: "Shell Script" } as const;

/** The line the cursor sits on, as in an open editor. */
const ACTIVE_LINE = 2;

function CodeEditor({ code, language }: Pick<Example, "code" | "language">) {
  return (
    <Highlight theme={THEME} code={code} language={language}>
      {({ className, style, tokens, getLineProps, getTokenProps }) => (
        <pre
          className={`${className} m-0 overflow-auto py-4 text-[13px] font-normal antialiased`}
          style={{
            ...style,
            background: "transparent",
            fontFamily: MONO,
            fontVariantLigatures: "none",
            lineHeight: "22px",
            scrollbarWidth: "thin",
          }}
        >
          <code className="block min-w-max" style={{ fontFamily: MONO, fontVariantLigatures: "none" }}>
            {tokens.map((line, index) => {
              const active = index === ACTIVE_LINE;
              return (
                <span
                  key={index}
                  {...getLineProps({ line })}
                  className={`grid min-h-[22px] grid-cols-[56px_minmax(0,1fr)] pr-6 ${active ? "bg-white/[0.045]" : ""}`}
                >
                  <span
                    aria-hidden="true"
                    className={`select-none pr-5 text-right ${active ? "text-[#d9d5ce]" : "text-[#77736c]"}`}
                  >
                    {index + 1}
                  </span>
                  <span className="whitespace-pre">
                    {line.map((token, tokenIndex) => (
                      <span key={tokenIndex} {...getTokenProps({ token })} />
                    ))}
                  </span>
                </span>
              );
            })}
          </code>
        </pre>
      )}
    </Highlight>
  );
}

function useCopy() {
  const [copied, setCopied] = useState<string | null>(null);
  const copy = async (key: string, text: string) => {
    await navigator.clipboard.writeText(text);
    setCopied(key);
    window.setTimeout(() => setCopied(null), 1600);
  };
  return { copied, copy };
}

export function ConnectSection() {
  const [activeId, setActiveId] = useState<Example["id"]>("python");
  const { copied, copy } = useCopy();
  const active = EXAMPLES.find((example) => example.id === activeId) ?? EXAMPLES[0];

  return (
    <Band
      id="connect"
      labelledBy="connect-title"
      wide
      className="py-0"
    >
      <div className="mx-auto max-w-[1180px] pb-[clamp(40px,5vw,72px)]">
        <div data-reveal="up" className="flex flex-col items-center gap-6 px-5 pt-[clamp(32px,4vw,56px)] text-center">
          <Eyebrow>Ways to connect</Eyebrow>
          <div
            role="tablist"
            aria-label="Connection method"
            className="inline-flex gap-1 rounded-[10px] border border-line p-1"
          >
            {EXAMPLES.map((example) => {
              const selected = example.id === active.id;
              return (
                <button
                  key={example.id}
                  type="button"
                  role="tab"
                  aria-selected={selected}
                  aria-controls="connect-example"
                  onClick={() => setActiveId(example.id)}
                  className={`flex h-10 min-w-[104px] cursor-pointer items-center justify-center gap-2 rounded-[9px] px-4 text-[14px] font-medium transition-colors ${selected ? "bg-white/[0.08] text-text" : "text-muted hover:text-text"}`}
                >
                  <span className={`size-1.5 rounded-full transition-colors ${selected ? "bg-brand" : "bg-white/20"}`} />
                  {example.tab}
                </button>
              );
            })}
          </div>
        </div>

        <div className="px-6 min-[980px]:px-10">
        <div
          id="connect-example"
          role="tabpanel"
          className="grid items-stretch gap-12 py-[clamp(40px,5vw,72px)] min-[980px]:grid-cols-[minmax(300px,0.8fr)_minmax(0,1.2fr)] min-[980px]:gap-0"
        >
          <div data-reveal="left" className="flex max-w-[460px] flex-col justify-center min-[980px]:pr-[clamp(32px,5vw,72px)]">
            <h2
              id="connect-title"
              className="m-0 text-[clamp(38px,4.2vw,56px)] font-medium leading-[1.05] tracking-[-0.03em] text-text"
            >
              {active.title}
            </h2>
            <p className="m-0 mt-5 text-[17px] leading-[1.6] text-muted">{active.description}</p>

            <button
              type="button"
              onClick={() => copy("install", active.install)}
              aria-label={`Copy: ${active.install}`}
              className="group mt-8 flex w-full cursor-pointer items-center gap-3 rounded-[10px] border border-line bg-white/[0.02] px-4 py-3 text-left font-mono text-[13px] text-text transition-colors hover:border-white/25"
            >
              <span className="text-brand">$</span>
              <span className="min-w-0 flex-1 truncate">{active.install}</span>
              <span className="flex-none text-[11px] text-muted">{copied === "install" ? "Copied" : "Copy"}</span>
            </button>

            <ul className="m-0 mt-8 grid list-none gap-3.5 p-0">
              {POINTS.map((point) => (
                <li key={point} className="flex items-center gap-3 text-[15px] text-muted">
                  <span aria-hidden="true" className="size-1.5 flex-none rounded-full bg-brand" />
                  {point}
                </li>
              ))}
            </ul>

            <a
              href={DOCS}
              target="_blank"
              rel="noreferrer"
              className="btn-clay mt-9 inline-flex h-[46px] w-fit items-center justify-center gap-2 px-[22px] text-[14px] no-underline"
            >
              Read the docs
              <Icon name="arrowRight" size={16} />
            </a>
          </div>

          <div data-reveal="right" className="min-w-0 min-[980px]:border-l min-[980px]:border-line min-[980px]:pl-[clamp(32px,5vw,72px)]">
            <div className="overflow-hidden rounded-[10px] border border-white/[0.07] bg-[#111214]">
              <div className="flex h-10 items-stretch border-b border-white/[0.06] bg-[#0c0d0f] text-[12.5px]">
                <span
                  className="relative flex items-center gap-2 border-r border-white/[0.06] bg-[#111214] px-4 text-text"
                  style={{ fontFamily: MONO }}
                >
                  <span className="absolute inset-x-0 top-0 h-px bg-brand" />
                  <span className="size-2 rounded-[2px] bg-brand/80" />
                  {active.file}
                </span>
                <button
                  type="button"
                  onClick={() => copy("code", active.code)}
                  aria-label={`Copy ${active.file}`}
                  className="ml-auto mr-1 inline-flex cursor-pointer items-center gap-1.5 self-center rounded-md px-2.5 py-1.5 text-[12px] text-muted transition-colors hover:bg-white/[0.06] hover:text-text"
                >
                  <Icon name="copy" size={14} />
                  {copied === "code" ? "Copied" : "Copy"}
                </button>
                <span className="sr-only" aria-live="polite">
                  {copied === "code" ? "Copied" : ""}
                </span>
              </div>

              <div
                className="flex h-7 items-center gap-1.5 px-5 text-[11.5px] text-[#77736c]"
                style={{ fontFamily: MONO }}
              >
                pawabase <span aria-hidden="true">›</span> <span className="text-[#a8a49d]">{active.file}</span>
              </div>

              <CodeEditor code={active.code} language={active.language} />

              <div
                className="flex h-7 items-center justify-between bg-[#17181b] px-4 text-[11.5px] text-[#f3f0eb]"
                style={{ fontFamily: MONO }}
              >
                <span>Ln {ACTIVE_LINE + 1}, Col 1</span>
                <span className="flex gap-4">
                  <span>UTF-8</span>
                  <span>{LANGUAGE_NAMES[active.language]}</span>
                </span>
              </div>
            </div>
          </div>
        </div>
        </div>
      </div>
    </Band>
  );
}
