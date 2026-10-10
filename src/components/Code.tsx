import hljs from "highlight.js/lib/core";
import bash from "highlight.js/lib/languages/bash";
import json from "highlight.js/lib/languages/json";
import python from "highlight.js/lib/languages/python";
import typescript from "highlight.js/lib/languages/typescript";

hljs.registerLanguage("bash", bash);
hljs.registerLanguage("json", json);
hljs.registerLanguage("python", python);
hljs.registerLanguage("ts", typescript);

type Lang = "python" | "bash" | "ts" | "json" | "text";

/** Highlighted with highlight.js (core and four languages); the colours are the theme's own tokens, in styles.css under `.hljs-*`. */
export function Code({ children, lang = "text", caption, source }: { children: string; lang?: Lang; caption?: string; source?: string }) {
  const text = children.replace(/^\n+|\s+$/g, "");
  const html = lang === "text" ? text.replace(/&/g, "&amp;").replace(/</g, "&lt;") : hljs.highlight(text, { language: lang, ignoreIllegals: true }).value;
  return (
    <figure className="codecard">
      <pre className="code" tabIndex={0}>
        <code className="hljs" dangerouslySetInnerHTML={{ __html: html }} />
      </pre>
      {(caption || source) && (
        <div className="code-cap">
          <span>{caption}</span>
          {source && <span>{source}</span>}
        </div>
      )}
    </figure>
  );
}
