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

import { Orbits } from "./Backdrops";
import { Band, Lead, Title } from "./Section";

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
      backdrop={<div className="absolute inset-0 [mask-image:linear-gradient(to_bottom,transparent,black_240px,black_calc(100%-240px),transparent)] [-webkit-mask-image:linear-gradient(to_bottom,transparent,black_240px,black_calc(100%-240px),transparent)]"><Orbits /></div>}
    >
      <div data-reveal="up" className="flex flex-col items-center gap-5 text-center">
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
        className="mx-auto mt-14 grid max-w-[920px] grid-cols-5 gap-y-10 max-[559px]:grid-cols-3"
      >
        {FRAMEWORKS.map(({ name, Mark }) => (
          <li key={name} className="group flex flex-col items-center gap-3 transition-transform duration-300 hover:-translate-y-1">
            <Mark
              size={28}
              aria-hidden="true"
              className="text-white/35 transition-all duration-300 group-hover:scale-110 group-hover:text-text"
            />
            <span className="text-[15px] font-medium tracking-[-0.01em] text-faint transition-colors duration-200 group-hover:text-muted">
              {name}
            </span>
          </li>
        ))}
      </ul>

    </Band>
  );
}
