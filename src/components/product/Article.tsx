import { Fragment } from "react";

import { Icon, type IconName } from "@/components/Icon";
import { Junctions } from "@/components/landing/Junctions";
import { Band } from "@/components/landing/Section";

import { APP_URL, DOCS_URL, ProductShell } from "./kit";

/**
 * A product page written as a long article: a bordered header cell, then
 * headings, paragraphs, tables, code and checklists in one left-aligned column.
 */

export type Block =
  | { p: string }
  | { h3: string }
  | { list: string[] }
  | { steps: string[] }
  | { table: { head: string[]; rows: string[][] } }
  | { note: string };

export type ArticleSection = { title: string; blocks: Block[] };

/** `like this` renders as inline code and **like this** as bold. */
function Inline({ text }: { text: string }) {
  const parts = text.split(/(`[^`]+`|\*\*[^*]+\*\*)/g);
  return (
    <>
      {parts.map((part, i) => {
        if (part.startsWith("`") && part.endsWith("`") && part.length > 1)
          return (
            <code key={i} className="rounded-[5px] bg-white/[0.05] px-1.5 py-px font-mono text-[0.86em] text-[#d7dbe0]">
              {part.slice(1, -1)}
            </code>
          );
        if (part.startsWith("**") && part.endsWith("**") && part.length > 4)
          return (
            <strong key={i} className="font-medium text-text">
              {part.slice(2, -2)}
            </strong>
          );
        return <Fragment key={i}>{part}</Fragment>;
      })}
    </>
  );
}

const P = "m-0 text-[16px] leading-[1.85] text-[#a9afb8]";

function Render({ block }: { block: Block }) {
  if ("p" in block) return <p className={P}><Inline text={block.p} /></p>;
  if ("h3" in block)
    return <h3 className="m-0 mt-4 text-[18px] font-medium tracking-[-0.01em] text-text">{block.h3}</h3>;
  if ("list" in block)
    return (
      <ul className="m-0 grid list-none gap-2.5 p-0">
        {block.list.map((item) => (
          <li key={item} className={`${P} flex gap-3`}>
            <span aria-hidden="true" className="mt-[0.8em] size-1 flex-none rounded-full bg-brand" />
            <span><Inline text={item} /></span>
          </li>
        ))}
      </ul>
    );
  if ("steps" in block)
    return (
      <ol className="m-0 grid list-none gap-2.5 p-0">
        {block.steps.map((item, i) => (
          <li key={item} className={`${P} flex gap-4`}>
            <span className="w-5 flex-none font-mono text-[13px] text-brand">{i + 1}.</span>
            <span><Inline text={item} /></span>
          </li>
        ))}
      </ol>
    );
  if ("table" in block)
    return (
      <div className="overflow-x-auto rounded-[14px] border border-line">
        <table className="w-full min-w-[480px] border-collapse text-left text-[14px]">
          <thead>
            <tr>
              {block.table.head.map((h) => (
                <th key={h} className="border-b border-line bg-white/[0.02] px-5 py-3 text-[11.5px] font-medium uppercase tracking-[0.1em] text-muted">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {block.table.rows.map((row) => (
              <tr key={row[0]} className="border-b border-line last:border-0">
                {row.map((cell, i) => (
                  <td key={i} className={`px-5 py-3.5 align-top leading-[1.6] ${i === 0 ? "font-medium text-text" : "text-[#a9afb8]"}`}>
                    <Inline text={cell} />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  return (
    <div className="rounded-[12px] border border-line border-l-2 border-l-brand bg-white/[0.02] px-5 py-4">
      <p className={`${P} text-[15px]`}><Inline text={block.note} /></p>
    </div>
  );
}

const strings = (value: unknown): string[] =>
  typeof value === "string"
    ? [value]
    : Array.isArray(value)
      ? value.flatMap(strings)
      : value && typeof value === "object"
        ? Object.values(value).flatMap(strings)
        : [];

const words = (sections: ArticleSection[], intro: string) =>
  strings([intro, sections]).join(" ").split(/\s+/).filter(Boolean).length;

export function ProductArticle({
  icon,
  name,
  category,
  description,
  intro,
  sections,
  next,
  docs = DOCS_URL,
}: {
  icon: IconName;
  name: string;
  category: string;
  /** The page's meta description. */
  description: string;
  intro: string;
  sections: ArticleSection[];
  next: { label: string; href: string };
  docs?: string;
}) {
  const minutes = Math.max(2, Math.round(words(sections, intro) / 210));

  return (
    <ProductShell title={name} description={description}>
      <section aria-label={name} className="relative">
        <div className="mx-auto grid w-[min(calc(100%-32px),1320px)] min-[760px]:grid-cols-[minmax(180px,260px)_1fr]">
          <div
            aria-hidden="true"
            className="grid h-[180px] place-items-center border-b border-line bg-[#0b0f14] text-brand min-[760px]:h-auto min-[760px]:border-b-0 min-[760px]:border-r"
          >
            <Icon name={icon} size={64} variant="TwoTone" />
          </div>
          <div className="px-6 py-[clamp(36px,5vw,64px)] min-[760px]:px-12">
            <h1 className="m-0 text-[clamp(36px,4.4vw,56px)] font-medium leading-[1.05] tracking-[-0.03em] text-text">
              {name}
            </h1>
            <p className="m-0 mt-4 text-[14px] text-muted">
              {category} &middot; {minutes} min read
            </p>
            <div className="mt-7 flex flex-wrap items-center gap-3">
              <a
                href={APP_URL}
                className="btn-clay inline-flex h-[46px] items-center justify-center gap-2 px-[22px] text-[14px] no-underline"
              >
                Get started
              </a>
              <a
                href={docs}
                target="_blank"
                rel="noreferrer"
                className="btn-clay-dark inline-flex h-[46px] items-center justify-center gap-2 px-[22px] text-[14px] no-underline"
              >
                Read the docs
                <Icon name="arrowRight" size={15} />
              </a>
            </div>
          </div>
        </div>
      </section>

      <div className="relative">
        <Junctions />
        <Junctions edge="bottom" />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 left-1/2 z-0 w-[min(calc(100%-32px),1320px)] -translate-x-1/2 border-x border-line"
        />
        <Band className="!pb-[clamp(56px,7vw,104px)] !pt-[clamp(36px,5vw,64px)]">
          <article className="max-w-[740px]">
            <p className="m-0 text-[18px] leading-[1.75] text-[#c3c8cf]">
              <Inline text={intro} />
            </p>
            {sections.map((section) => (
              <section key={section.title} className="mt-16 border-t border-line pt-10">
                <h2 className="m-0 mb-6 text-[clamp(24px,2.6vw,30px)] font-normal leading-[1.2] tracking-[-0.02em] text-text">
                  {section.title}
                </h2>
                <div className="grid gap-5">
                  {section.blocks.map((block, i) => (
                    <Render key={i} block={block} />
                  ))}
                </div>
              </section>
            ))}
            <div className="mt-14 flex flex-wrap items-center gap-3 border-t border-line pt-8">
              <a
                href={APP_URL}
                className="btn-clay inline-flex h-[46px] items-center justify-center gap-2 px-[22px] text-[14px] no-underline"
              >
                Start building
                <Icon name="arrowRight" size={15} />
              </a>
              <a
                href={next.href}
                className="btn-clay-dark inline-flex h-[46px] items-center justify-center px-[22px] text-[14px] no-underline"
              >
                {next.label}
              </a>
            </div>
          </article>
        </Band>
      </div>
    </ProductShell>
  );
}
