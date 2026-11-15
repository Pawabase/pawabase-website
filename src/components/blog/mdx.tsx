import type { MDXComponents } from "mdx/types";
import type { ComponentProps, ReactNode } from "react";

import { Pre } from "./Code";
import { Figure } from "./Figure";

/*
 * What MDX draws each piece of a post with. Headings get an anchor link (rehype-slug gave them their ids), links leave the site in
 * a new tab, tables scroll sideways on a phone, code is highlighted, and posts can use <Figure>, <Callout>, <Kbd> and <Steps>.
 */

const CALLOUTS = {
  note: { label: "Note", icon: "i" },
  tip: { label: "Tip", icon: "✦" },
  warning: { label: "Warning", icon: "!" },
  danger: { label: "Careful", icon: "!" },
} as const;

export function Callout({ type = "note", title, children }: { type?: keyof typeof CALLOUTS; title?: string; children?: ReactNode }) {
  const kind = CALLOUTS[type] ?? CALLOUTS.note;
  return (
    <aside className={`bp-callout ${type}`} role="note">
      <span className="bp-callout-icon" aria-hidden="true">{kind.icon}</span>
      <div>
        <p className="bp-callout-title">{title ?? kind.label}</p>
        <div className="bp-callout-body">{children}</div>
      </div>
    </aside>
  );
}

export const Kbd = ({ children }: { children?: ReactNode }) => <kbd className="bp-kbd">{children}</kbd>;

/** Numbered steps: each child h3 (### in the post) starts one. */
export const Steps = ({ children }: { children?: ReactNode }) => <div className="bp-steps">{children}</div>;

function heading(Tag: "h2" | "h3" | "h4") {
  return function Heading({ id, children, ...rest }: ComponentProps<"h2">) {
    return (
      <Tag id={id} {...rest}>
        {children}
        {id && <a className="bp-anchor" href={`#${id}`} aria-label="Link to this section">#</a>}
      </Tag>
    );
  };
}

function A({ href = "", children, ...rest }: ComponentProps<"a">) {
  const away = /^https?:\/\//.test(href) && !href.startsWith("https://pawabase.com");
  return (
    <a href={href} {...rest} {...(away ? { target: "_blank", rel: "noreferrer noopener" } : {})}>
      {children}
    </a>
  );
}

export const COMPONENTS: MDXComponents = {
  h2: heading("h2"),
  h3: heading("h3"),
  h4: heading("h4"),
  a: A,
  pre: Pre,
  table: (props) => <div className="bp-table"><table {...props} /></div>,
  img: ({ src, alt }) => <Figure src={src} alt={alt} />,
  Figure,
  Image: Figure,
  Callout,
  Kbd,
  Steps,
};
