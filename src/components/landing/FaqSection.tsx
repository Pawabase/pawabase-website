import { Band, Eyebrow, TextLink, Title } from "./Section";
import { QUESTIONS } from "@/seo/faq";
import { DOCS } from "@/lib/links";


export function FaqSection() {
  return (
    <Band id="faq" labelledBy="faq-title" className="py-[clamp(72px,9vw,128px)]">
      <div className="grid gap-10 min-[1000px]:grid-cols-[minmax(0,0.8fr)_minmax(0,1.4fr)] min-[1000px]:gap-20">
        <div data-reveal="left" className="flex h-fit flex-col gap-6 min-[1000px]:sticky min-[1000px]:top-28">
          <Eyebrow className="w-fit">FAQ</Eyebrow>
          <Title id="faq-title" quiet="Short answers.">
            Questions.
          </Title>
          <TextLink href={DOCS}>Browse the documentation</TextLink>
        </div>

        <div data-reveal="stagger" className="border-t border-white/[0.08]">
          {QUESTIONS.map((item) => (
            <details key={item.q} className="group border-b border-white/[0.08]">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-6 text-[19px] font-medium tracking-[-0.025em] text-text transition-colors duration-150 hover:text-brand [&::-webkit-details-marker]:hidden">
                {item.q}
                <span
                  aria-hidden="true"
                  className="relative h-3.5 w-3.5 flex-none text-faint before:absolute before:left-0 before:top-1/2 before:h-px before:w-full before:bg-current after:absolute after:left-1/2 after:top-0 after:h-full after:w-px after:bg-current after:transition-transform after:duration-200 group-open:after:scale-y-0"
                />
              </summary>
              <p className="max-w-[62ch] pb-7 text-[16.5px] leading-[1.65] tracking-[-0.01em] text-muted">
                {item.a}
              </p>
            </details>
          ))}
        </div>
      </div>
    </Band>
  );
}
