const KEYWORDS = new Set([
  "import",
  "from",
  "const",
  "let",
  "await",
  "async",
  "export",
  "function",
  "return",
  "new",
  "if",
  "else",
  "for",
  "of",
  "in",
]);

const FUNCTIONS = new Set([
  "fetch",
  "json",
  "handler",
  "stringify",
  "update",
  "run",
]);

const TOKEN_PATTERN =
  /(\/\/.*|"(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*'|`(?:[^`\\]|\\.)*`|\b[a-zA-Z_$][\w$]*\b|\b\d+\b)/g;

function tokenColor(token: string) {
  if (token.startsWith("//")) return "#5F6167";
  if (
    token.startsWith('"') ||
    token.startsWith("'") ||
    token.startsWith("`")
  ) {
    return "#B9AEFF";
  }
  if (KEYWORDS.has(token)) return "#FF9A7C";
  if (FUNCTIONS.has(token)) return "#EDEDED";
  if (/^\d+$/.test(token)) return "#FFB19B";
  return "#C3C5CA";
}

function HighlightedLine({ line }: { line: string }) {
  const tokens = line.split(TOKEN_PATTERN);

  return (
    <>
      {tokens.map((token, index) =>
        token === "" ? null : (
          <span key={index} style={{ color: tokenColor(token) }}>
            {token}
          </span>
        ),
      )}
    </>
  );
}

export function CodeSnippet({
  lines,
  label,
  className = "",
  codeClassName = "",
}: {
  lines: string[];
  label?: string;
  className?: string;
  codeClassName?: string;
}) {
  return (
    <div
      className={`overflow-hidden rounded-lg border border-line bg-[#0D0E10] ${className}`}
    >
      {label ? (
        <div className="flex items-center justify-between gap-4 border-b border-line px-4 py-2.5 font-mono text-[8px] uppercase tracking-[0.14em] text-faint">
          <span className="inline-flex items-center gap-2">
            <span className="h-1 w-1 rounded-full bg-brand" aria-hidden="true" />
            {label}
          </span>
          <span className="text-white/25">pawabase</span>
        </div>
      ) : null}

      <pre
        className={`overflow-x-auto px-4 py-3.5 font-mono text-[10.5px] font-semibold leading-[1.9] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden ${codeClassName}`}
        aria-label={label}
      >
        <code>
          {lines.map((line, index) => (
            <span key={index} className="block whitespace-pre">
              {line ? <HighlightedLine line={line} /> : "\u00A0"}
            </span>
          ))}
        </code>
      </pre>
    </div>
  );
}
