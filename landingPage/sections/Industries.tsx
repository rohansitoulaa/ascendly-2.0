"use client";

import { TiltCard } from "@/animations/TiltCard";
import { Reveal } from "@/animations/Reveal";

const cards = [
  {
    title: "B2B Companies with $15k+ LTV",
    body: "Deals that require real sales effort, not quick, transactional closes.",
  },
  {
    title: "Multi-Step or Longer Sales Cycles",
    body: "Where timing, context, and deal progression decide outcomes.",
  },
  {
    title: "Generating Pipeline, But Not Converting Enough",
    body: "Pipeline exists, but revenue isn't predictable.",
  },
  {
    title: "Lean or Founder-Led Sales Teams",
    body: "Where every opportunity matters, and bandwidth is constrained.",
  },
];

export function Industries() {
  return (
    <section id="industries" className="relative py-28 sm:py-36">
      <div className="mx-auto w-full max-w-[1220px] px-6 sm:px-8">
        <Reveal direction="up">
          <div className="flex items-center gap-3 text-[0.72rem] font-medium uppercase tracking-[0.22em] text-white/45">
            <span className="h-px w-8 bg-white/25" />
            <span>WHO WE WORK WITH</span>
          </div>
        </Reveal>

        <Reveal direction="up" delay={0.05}>
          <h2 className="mt-6 max-w-[38ch] text-[clamp(1.8rem,3.5vw,3rem)] font-semibold leading-[1.05] tracking-[-0.045em] text-white">
            We work with B2B companies that already have demand, but need it to convert and scale.
          </h2>
        </Reveal>

        <Reveal direction="up" delay={0.1}>
          <p className="mt-5 max-w-[52ch] text-[0.98rem] leading-[1.7] text-white/55">
            If your deals involve multiple stakeholders, longer cycles, and real
            sales effort, this is built for you.{" "}
            <span className="text-white/35">If not, it won&rsquo;t.</span>
          </p>
        </Reveal>

        <div className="mt-14 grid grid-cols-1 gap-5 sm:mt-20 sm:grid-cols-2 lg:grid-cols-4">
          {cards.map((card, index) => (
            <Reveal key={card.title} direction="up" delay={index * 0.05}>
              <TiltCard max={5} className="h-full rounded-[24px]">
                <div className="relative h-full overflow-hidden rounded-[24px] border border-white/[0.08] bg-linear-to-br from-white/[0.04] to-white/[0.01] p-6 backdrop-blur-xl sm:p-7">
                  <span className="block font-mono text-[0.72rem] tracking-[0.24em] text-white/30">
                    0{index + 1}
                  </span>
                  <h3 className="mt-5 text-[1rem] font-semibold leading-[1.3] tracking-[-0.02em] text-white/88">
                    {card.title}
                  </h3>
                  <p className="mt-3 text-[0.9rem] leading-[1.65] text-white/50">
                    {card.body}
                  </p>
                </div>
              </TiltCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Industries;
