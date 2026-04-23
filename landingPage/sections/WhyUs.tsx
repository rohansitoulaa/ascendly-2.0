"use client";

import { motion } from "motion/react";
import { FiCheck } from "react-icons/fi";
import { SectionHeader } from "@/design/SectionHeader";
import { Reveal } from "@/animations/Reveal";
import { Counter } from "@/animations/Counter";
import { GlassCard } from "@/design/GlassCard";

const pillars = [
  {
    title: "Operators, not advisors",
    copy: "Every pod is led by someone who has closed the number, not just diagrammed it.",
  },
  {
    title: "Instrumented by default",
    copy: "Dashboards, signal streams, and weekly forward-looking readouts — included.",
  },
  {
    title: "Rebuilds your inside baseball",
    copy: "We transfer the system, so your team operates the loop long after we ramp down.",
  },
  {
    title: "Outcome-priced",
    copy: "Fees tied to pipeline velocity, not hours. We only win when you do.",
  },
];

const stats = [
  { n: 146, suf: "%", label: "Avg pipeline lift, year one" },
  { n: 38, suf: " days", label: "Median time-to-first-win" },
  { n: 12, suf: "M+", label: "ARR under active ops" },
  { n: 96, suf: "%", label: "Client retention, rolling" },
];

export function WhyUs() {
  return (
    <section className="relative py-28 sm:py-36">
      <div className="mx-auto w-full max-w-[1220px] px-6 sm:px-8">
        <SectionHeader
          kicker="Why Ascendly"
          title="The difference you feel"
          highlight="by week two."
          subtitle="Revenue operators embedded in your team. Systems-thinking applied to your pipeline. The loop gets tighter every week."
          align="left"
          size="lg"
        />

        <div className="mt-16 grid grid-cols-1 gap-6 sm:mt-20 lg:grid-cols-[1.1fr_0.9fr]">
          {/* Pillars */}
          <div className="flex flex-col gap-3">
            {pillars.map((p, i) => (
              <Reveal key={p.title} direction="up" delay={i * 0.05}>
                <GlassCard accent="none" tilt={false}>
                  <div className="flex items-start gap-5 p-6 sm:p-7">
                    <motion.span
                      whileHover={{ scale: 1.15, rotate: 10 }}
                      transition={{ type: "spring", stiffness: 320, damping: 20 }}
                      className="mt-1 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-cyan-300/25 bg-cyan-400/10 text-cyan-200 shadow-[0_0_14px_rgba(34,211,238,0.2)]"
                    >
                      <FiCheck className="h-4 w-4" strokeWidth={3} />
                    </motion.span>
                    <div className="flex flex-col">
                      <h4 className="text-[1.1rem] font-semibold tracking-[-0.02em] text-white">
                        {p.title}
                      </h4>
                      <p className="mt-2 text-[0.95rem] leading-[1.65] text-white/60">
                        {p.copy}
                      </p>
                    </div>
                  </div>
                </GlassCard>
              </Reveal>
            ))}
          </div>

          {/* Stats panel */}
          <Reveal direction="up" delay={0.1}>
            <GlassCard accent="cyan" tilt>
              <div className="relative flex h-full flex-col gap-7 p-7 sm:p-9">
                <span className="inline-block w-fit rounded-full border border-cyan-300/20 bg-cyan-400/5 px-3 py-1 text-[0.7rem] uppercase tracking-[0.24em] text-cyan-100">
                  Live book
                </span>
                <h3 className="max-w-[24ch] text-[clamp(1.6rem,2.8vw,2.2rem)] font-semibold leading-[1.1] tracking-[-0.035em] text-white">
                  The outcomes speak. These are rolling averages, not cherry-picked wins.
                </h3>
                <div className="grid grid-cols-2 gap-6">
                  {stats.map((s) => (
                    <div key={s.label} className="flex flex-col">
                      <span className="text-[clamp(1.6rem,3.2vw,2.2rem)] font-semibold leading-none tracking-[-0.04em] text-white">
                        <Counter to={s.n} suffix={s.suf} />
                      </span>
                      <span className="mt-2 text-[0.72rem] uppercase tracking-[0.24em] text-white/45">
                        {s.label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </GlassCard>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

export default WhyUs;
