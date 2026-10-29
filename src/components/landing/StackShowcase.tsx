
"use client";

import { useState } from "react";
import {
  SiReact,
  SiNextdotjs,
  SiVuedotjs,
  SiSvelte,
  SiAngular,
  SiJavascript,
} from "@icons-pack/react-simple-icons";

const FRAMEWORKS = [
  {
    name: "React",
    language: "tsx",
    code: `import { useEffect, useState } from "react";

const gateway = import.meta.env.VITE_PAWABASE_URL;
const apiKey = import.meta.env.VITE_PAWABASE_PUBLISHABLE_KEY;

export function Tasks() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetch(\`\${gateway}/rest/v1/tasks\`, {
      headers: { apikey: apiKey },
    })
      .then((response) => response.json())
      .then(setTasks);
  }, []);

  return <TaskList tasks={tasks} />;
}`,
  },
  {
    name: "Next.js",
    language: "tsx",
    code: `const gateway = process.env.PAWABASE_URL!;
const apiKey = process.env.PAWABASE_PUBLISHABLE_KEY!;

async function getTasks() {
  const response = await fetch(
    \`\${gateway}/rest/v1/tasks\`,
    { headers: { apikey: apiKey } },
  );

  return response.json();
}

export default async function TasksPage() {
  const tasks = await getTasks();
  return <TaskList tasks={tasks} />;
}`,
  },
  {
    name: "Vue",
    language: "vue",
    code: `<script setup>
import { onMounted, ref } from "vue";

const tasks = ref([]);
const gateway = import.meta.env.VITE_PAWABASE_URL;
const apiKey = import.meta.env.VITE_PAWABASE_PUBLISHABLE_KEY;

onMounted(async () => {
  const response = await fetch(\`\${gateway}/rest/v1/tasks\`, {
    headers: { apikey: apiKey },
  });
  tasks.value = await response.json();
});
</script>`,
  },
  {
    name: "Svelte",
    language: "svelte",
    code: `<script>
  import { onMount } from "svelte";

  let tasks = [];
  const gateway = import.meta.env.VITE_PAWABASE_URL;
  const apiKey = import.meta.env.VITE_PAWABASE_PUBLISHABLE_KEY;

  onMount(async () => {
    const response = await fetch(\`\${gateway}/rest/v1/tasks\`, {
      headers: { apikey: apiKey },
    });
    tasks = await response.json();
  });
</script>`,
  },
  {
    name: "Angular",
    language: "ts",
    code: `import { Component, inject } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "../environments/environment";

@Component({ selector: "app-tasks", template: "..." })
export class TasksComponent {
  private http = inject(HttpClient);

  tasks = this.http.get(
    \`\${environment.pawabaseUrl}/rest/v1/tasks\`,
    {
      headers: {
        apikey: environment.pawabasePublishableKey,
      },
    },
  );
}`,
  },
  {
    name: "JavaScript",
    language: "js",
    code: `const gateway = "https://api.example.com";
const apiKey = "your-publishable-key";

async function loadTasks() {
  const response = await fetch(
    \`\${gateway}/rest/v1/tasks\`,
    { headers: { apikey: apiKey } },
  );

  if (!response.ok) {
    throw new Error("Could not load tasks");
  }

  return response.json();
}

const tasks = await loadTasks();
renderTasks(tasks);`,
  },
] as const;

const FRAMEWORK_ICONS = {
  React: SiReact,
  "Next.js": SiNextdotjs,
  Vue: SiVuedotjs,
  Svelte: SiSvelte,
  Angular: SiAngular,
  JavaScript: SiJavascript,
};

const KEYWORDS = new Set([
  "import",
  "from",
  "const",
  "let",
  "return",
  "async",
  "await",
  "function",
  "export",
  "default",
  "class",
  "private",
  "new",
  "throw",
  "if",
]);

const FUNCTIONS = new Set([
  "fetch",
  "useEffect",
  "useState",
  "onMounted",
  "onMount",
  "json",
  "get",
  "inject",
  "renderTasks",
]);

const TYPES = new Set([
  "Component",
  "HttpClient",
  "TasksComponent",
  "TaskList",
  "Error",
  "Promise",
]);

function HighlightedLine({ line }: { line: string }) {
  const tokens = line.split(
    /(\/\/.*|"(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*'|`(?:[^`\\]|\\.)*`|\b[a-zA-Z_$][\w$]*\b|\b\d+\b)/g,
  );

  return (
    <>
      {tokens.map((token, index) => {
        let color = "#F5F3EE";

        if (token.startsWith("//")) {
          color = "#F5F3EE";
        } else if (
          token.startsWith('"') ||
          token.startsWith("'") ||
          token.startsWith("`")
        ) {
          color = "#F5F3EE";
        } else if (KEYWORDS.has(token)) {
          color = "#F5F3EE";
        } else if (FUNCTIONS.has(token)) {
          color = "#F5F3EE";
        } else if (TYPES.has(token)) {
          color = "#F5F3EE";
        } else if (/^\d+$/.test(token)) {
          color = "#F5F3EE";
        }

        return (
          <span key={index} style={{ color }}>
            {token}
          </span>
        );
      })}
    </>
  );
}

export function StackShowcase() {
  const [activeIndex, setActiveIndex] = useState(0);

  const framework = FRAMEWORKS[activeIndex];

  return (
    <section
      id="stack"
      className="border-t border-line bg-shell"
      aria-labelledby="stack-title"
    >
      {/* Outer page rails */}
      <div className="grid grid-cols-[14px_minmax(0,1fr)_14px] min-[768px]:grid-cols-[42px_minmax(0,1fr)_42px] min-[1241px]:grid-cols-[minmax(86px,9.25%)_minmax(0,1fr)_minmax(86px,9.25%)]">
        <div
          className="border-r border-line"
          aria-hidden="true"
        />

        {/* Main two-column layout */}
        <div className="grid min-w-0 grid-cols-1 min-[900px]:grid-cols-[43%_57%]">

          {/* LEFT: Editorial content */}
          <div className="relative flex min-h-[380px] flex-col justify-center overflow-hidden border-b border-line px-6 py-16 min-[768px]:px-10 min-[900px]:min-h-[570px] min-[900px]:border-b-0 min-[900px]:border-r min-[900px]:px-8">

            <h2
              id="stack-title"
              className="max-w-[11ch] text-[clamp(34px,4.2vw,58px)] font-semibold leading-[1.04] tracking-[-0.055em] text-text"
            >
              Your frontend.
              <span className="block text-muted">
                Your choice.
              </span>
            </h2>

            <p className="mt-6 max-w-[300px] text-[clamp(17px,1.55vw,21px)] leading-[1.4] tracking-[-0.03em] text-muted">
              One backend for whatever you build.
            </p>

            <div
              className="mt-10 flex items-center gap-2"
              aria-hidden="true"
            >
              <span className="h-px w-16 bg-line" />
              <span className="h-1.5 w-1.5 rounded-full bg-brand" />
            </div>
          </div>

          {/* RIGHT: Framework showcase */}
          <div className="relative flex min-h-[500px] min-w-0 flex-col overflow-hidden bg-elevated min-[900px]:min-h-[570px]">

            {/* Framework selector */}
            <div className="relative z-10 overflow-x-auto border-b border-line [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              <div
                role="tablist"
                aria-label="Framework examples"
                className="grid min-w-[540px] grid-cols-6"
              >
                {FRAMEWORKS.map((item, index) => {
                  const active = index === activeIndex;
                  const Icon = FRAMEWORK_ICONS[item.name];

                  return (
                    <button
                      key={item.name}
                      type="button"
                      role="tab"
                      id={`framework-tab-${index}`}
                      aria-selected={active}
                      aria-controls="framework-code"
                      onClick={() => setActiveIndex(index)}
                      className={`relative flex h-[88px] flex-col items-center justify-center gap-3 border-r border-line transition-colors last:border-r-0 ${
                        active
                          ? "bg-shell text-text"
                          : "text-muted hover:bg-shell/50 hover:text-text"
                      }`}
                    >
                      <Icon
                        size={23}
                        color="currentColor"
                        aria-hidden="true"
                      />

                      <span className="text-[10px] font-medium">
                        {item.name}
                      </span>

                      {active && (
                        <span className="absolute inset-x-0 bottom-0 h-[2px] bg-brand" />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Spacious framework heading */}
            <div className="relative z-[1] flex-1 px-7 pt-12 min-[768px]:px-10">
              <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-faint">
                Framework integration
              </p>

              <h3 className="mt-3 text-[clamp(20px,2vw,26px)] font-medium tracking-[-0.045em] text-text">
                {framework.name}
                <span className="text-muted">
                  {" "}+ Pawabase
                </span>
              </h3>
            </div>

            {/* Minimal code preview */}
            <div
              id="framework-code"
              role="tabpanel"
              aria-labelledby={`framework-tab-${activeIndex}`}
              className="relative z-[1] ml-auto w-[94%] max-w-[620px] overflow-hidden rounded-tl-xl border-l border-t border-[#34383F] bg-[#06080b]"
            >
              <div className="relative h-[300px] overflow-hidden min-[768px]:h-[340px]">

                <pre className="absolute inset-0 overflow-hidden px-5 py-6 font-mono text-[11px] leading-[1.95] text-[#F5F3EE]">
                  <code>
                    {framework.code
                      .split("\n")
                      .map((line, index) => (
                        <span
                          key={`${framework.name}-${index}`}
                          className="grid grid-cols-[36px_minmax(max-content,1fr)]"
                        >
                          <span className="select-none pr-4 text-right text-[#70757D]">
                            {index + 1}
                          </span>

                          <span className="whitespace-pre">
                            <HighlightedLine line={line} />
                          </span>
                        </span>
                      ))}
                  </code>
                </pre>

                {/* Subtle bottom fade */}
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-x-0 bottom-0 h-[125px] bg-gradient-to-b from-transparent via-[#06080b]/70 to-[#06080b]"
                />
              </div>
            </div>
          </div>
        </div>

        <div
          className="border-l border-line"
          aria-hidden="true"
        />
      </div>
    </section>
  );
}
