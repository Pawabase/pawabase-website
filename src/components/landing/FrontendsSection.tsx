import {
  SiAngular,
  SiAstro,
  SiFlutter,
  SiNextdotjs,
  SiNuxt,
  SiReact,
  SiRemix,
  SiSvelte,
  SiSwift,
  SiVuedotjs,
} from "@icons-pack/react-simple-icons";

import { Band, Eyebrow, Lead, Title } from "./Section";

const FRAMEWORKS = [
  { name: "React", Mark: SiReact },
  { name: "Next.js", Mark: SiNextdotjs },
  { name: "Vue", Mark: SiVuedotjs },
  { name: "Nuxt", Mark: SiNuxt },
  { name: "Svelte", Mark: SiSvelte },
  { name: "Angular", Mark: SiAngular },
  { name: "Astro", Mark: SiAstro },
  { name: "Remix", Mark: SiRemix },
  { name: "Flutter", Mark: SiFlutter },
  { name: "Swift", Mark: SiSwift },
];

export function FrontendsSection() {
  return (
    <Band
      id="stack"
      labelledBy="stack-title"
      className="py-[clamp(72px,9vw,128px)]"
    >
      <div data-reveal="up" className="flex flex-col items-center gap-5 text-center">
        <Eyebrow>Frameworks</Eyebrow>
        <Title id="stack-title" quiet="On infrastructure you choose." className="max-w-[16ch]">
          Any frontend.
        </Title>
        <Lead className="max-w-[46ch]">
          Web frameworks, native apps and servers all reach Pawabase over the
          same API, through a client library or plain HTTP.
        </Lead>
      </div>

      <ul
        data-reveal="stagger"
        className="m-0 mx-auto mt-[clamp(40px,5vw,64px)] grid max-w-[960px] list-none grid-cols-5 border-l border-t border-line p-0 max-[639px]:grid-cols-3"
      >
        {FRAMEWORKS.map(({ name, Mark }) => (
          <li
            key={name}
            className="group flex h-[120px] flex-col items-center justify-center gap-3 border-b border-r border-line transition-colors duration-200 hover:bg-white/[0.03]"
          >
            <Mark
              size={30}
              aria-hidden="true"
              className="text-white/35 transition-colors duration-200 group-hover:text-brand"
            />
            <span className="text-[14px] font-medium tracking-[-0.01em] text-faint transition-colors duration-200 group-hover:text-text">
              {name}
            </span>
          </li>
        ))}
      </ul>
    </Band>
  );
}
