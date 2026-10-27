import { useState } from "react";
import { Highlight, themes } from "prism-react-renderer";

import { Icon } from "@/components/Icon";

import { PrimaryButton } from "./PrimaryButton";
import { Band } from "./Section";

type Example = {
  id: "python" | "typescript" | "http";
  tab: string;
  title: string;
  description: string;
  file: string;
  language: "python" | "typescript" | "bash";
  install: string;
  code: string;
};

const EXAMPLES: Example[] = [
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
  "Sign in with the same identity system",
  "Query records through access policies",
  "Create and update data in one request",
];

function CodeEditor({ code, language }: Pick<Example, "code" | "language">) {
  return (
    <Highlight theme={themes.vsDark} code={code} language={language}>
      {({ className, style, tokens, getLineProps, getTokenProps }) => (
        <pre
          className={`${className} min-h-[430px] overflow-auto py-6 text-[12px] font-semibold leading-[1.75] min-[560px]:py-7 min-[560px]:text-[15px]`}
          style={{
            ...style,
            margin: 0,
            background: "#0b0b0c",
            fontFamily: '"SFMono-Regular", Consolas, "Liberation Mono", Menlo, monospace',
            fontVariantLigatures: "none",
          }}
        >
          <code className="block min-w-max">
            {tokens.map((line, index) => (
              <span
                key={index}
                {...getLineProps({ line })}
                className="grid min-h-[1.75em] grid-cols-[44px_minmax(0,1fr)] pr-6 min-[560px]:grid-cols-[52px_minmax(0,1fr)] min-[560px]:pr-8"
              >
                <span aria-hidden="true" className="select-none pr-4 text-right text-white/25">{index + 1}</span>
                <span className="whitespace-pre">
                  {line.map((token, tokenIndex) => (
                    <span key={tokenIndex} {...getTokenProps({ token })} />
                  ))}
                </span>
              </span>
            ))}
          </code>
        </pre>
      )}
    </Highlight>
  );
}

export function ConnectSection() {
  const [activeId, setActiveId] = useState<Example["id"]>("python");
  const [copied, setCopied] = useState(false);
  const active = EXAMPLES.find((example) => example.id === activeId) ?? EXAMPLES[0];

  const copy = async () => {
    await navigator.clipboard.writeText(active.code);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1600);
  };

  return (
    <Band
      id="connect"
      labelledBy="connect-title"
      wide
      className="bg-[#0b0b0c] py-[clamp(80px,10vw,140px)]"
    >
      <div
        data-reveal="up"
        className="border-b border-white/[0.08]"
        role="tablist"
        aria-label="Connection method"
      >
        <div className="flex gap-1 overflow-x-auto">
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
                className={`min-w-[112px] cursor-pointer rounded-t-[12px] px-6 py-4 text-[15px] font-medium transition-colors ${selected ? "bg-white text-[#111315]" : "text-muted hover:bg-white/[0.04] hover:text-text"}`}
              >
                {example.tab}
              </button>
            );
          })}
        </div>
      </div>

      <div
        id="connect-example"
        role="tabpanel"
        className="grid items-center gap-14 pt-[clamp(48px,6vw,80px)] min-[980px]:grid-cols-[minmax(320px,0.86fr)_minmax(0,1.14fr)] min-[980px]:gap-[clamp(64px,8vw,120px)]"
      >
        <div data-reveal="left" className="max-w-[560px]">
          <p className="text-[13px] font-medium uppercase tracking-[0.12em] text-faint">Ways to connect</p>
          <h2
            id="connect-title"
            className="mt-5 text-[clamp(42px,4.5vw,64px)] font-medium leading-[1.05] tracking-[-0.05em] text-text"
          >
            {active.title}
          </h2>
          <p className="mt-6 max-w-[38ch] text-[18px] leading-[1.6] tracking-[-0.01em] text-muted">
            {active.description}
          </p>

          <ul className="mt-9 grid gap-4">
            {POINTS.map((point) => (
              <li key={point} className="flex items-center gap-3 text-[16px] text-muted">
                <span className="grid h-5 w-5 flex-none place-items-center rounded-full border border-white/25 text-[11px] text-text">✓</span>
                {point}
              </li>
            ))}
          </ul>

          <PrimaryButton href="https://docs.sillo.build" className="mt-10 inline-flex w-fit">
            Read the docs
            <Icon name="arrowRight" size={17} />
          </PrimaryButton>
        </div>

        <div data-reveal="right" className="min-w-0">
          <div className="overflow-hidden rounded-[24px] border border-white/10 bg-[#0b0b0c] transition-colors duration-300 hover:border-white/20">
            <div className="flex h-14 items-center gap-2.5 border-b border-white/10 bg-[#111214] px-5 text-[12px] text-muted">
              <span className="h-2 w-2 rounded-full bg-[#ff5f57]" />
              <span className="h-2 w-2 rounded-full bg-[#febc2e]" />
              <span className="h-2 w-2 rounded-full bg-[#28c840]" />
              <Icon name="document" size={15} className="ml-2 text-[#777981]" />
              <span>{active.file}</span>
              <button
                type="button"
                onClick={copy}
                aria-label={`Copy ${active.file}`}
                className="ml-auto inline-grid h-8 w-8 cursor-pointer place-items-center rounded-lg text-[#777981] transition-colors hover:bg-black/[0.06] hover:text-[#111315]"
              >
                <Icon name="copy" size={15} />
              </button>
              <span className="sr-only" aria-live="polite">{copied ? "Copied" : ""}</span>
            </div>
            <CodeEditor code={active.code} language={active.language} />
          </div>

        </div>
      </div>
    </Band>
  );
}
