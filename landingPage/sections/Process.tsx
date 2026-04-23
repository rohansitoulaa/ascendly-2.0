"use client";

import { motion } from "motion/react";
import { FiCompass, FiTool, FiRadio, FiAward } from "react-icons/fi";
import { SectionHeader } from "@/design/SectionHeader";
import { Reveal } from "@/animations/Reveal";

const steps = [
  {
    n: "01",
    icon: <FiCompass />,
    title: "Diagnose",
    copy: "We map pipeline economics, uncover friction, and pressure-test the close motion.",
    weeks: "Week 1",
  },
  {
    n: "02",
    icon: <FiTool />,
    title: "Design",
    copy: "We architect playbooks, routing, and signal layers tuned to your ICP + market reality.",
    weeks: "Week 2–3",
  },
  {
    n: "03",
    icon: <FiRadio />,
    title: "Deploy",
    copy: "We stand up instrumentation, automations, and orchestration. One operating picture, live.",
    weeks: "Week 3–6",
  },
  {
    n: "04",
    icon: <FiAward />,
    title: "Compound",
    copy: "Weekly ops loops tighten the system — every cohort outperforms the last.",
    weeks: "Ongoing",
  },
];

export function Process() {
  return (
    <section id="process" className="relative py-28 sm:py-36">
      <div className="mx-auto w-full max-w-[1220px] px-6 sm:px-8">
        <SectionHeader
          kicker="How we work"
          title="Four steps,"
          highlight="one compounding loop."
          subtitle="No decks, no theater. Diagnostic-first engagements that become operating systems you keep."
          align="left"
          size="lg"
        />

        <div className="relative mt-16 sm:mt-24">
          {/* Connecting line */}
          <div
            aria-hidden
            className="absolute left-4 top-0 hidden h-full w-px bg-gradient-to-b from-transparent via-white/15 to-transparent sm:left-[31px] sm:block"
          />

          <div className="flex flex-col gap-10 sm:gap-12">
            {steps.map((s, i) => (
              <Reveal key={s.n} direction="up" delay={i * 0.06}>
                <div className="group relative grid grid-cols-[auto_1fr] gap-5 sm:grid-cols-[64px_1fr_240px] sm:gap-10">
                  {/* Step icon node */}
                  <motion.div
                    whileHover={{ scale: 1.08, rotate: -5 }}
                    transition={{ type: "spring", stiffness: 280, damping: 18 }}
                    className="relative z-10 inline-flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-gradient-to-br from-white/[0.08] to-white/[0.02] text-[1.3rem] text-cyan-200 shadow-[0_10px_28px_rgba(0,0,0,0.35),inset_0_1px_0_rgba(255,255,255,0.08)] backdrop-blur-md sm:h-[64px] sm:w-[64px]"
                  >
                    {s.icon}
                    <span className="absolute -right-1 -top-1 inline-flex h-5 min-w-[20px] items-center justify-center rounded-full bg-[#05060A] px-1.5 text-[0.6rem] font-mono text-white/70 ring-1 ring-white/15">
                      {s.n}
                    </span>
                  </motion.div>

                  {/* Content */}
                  <div className="flex flex-col">
                    <h3 className="text-[1.45rem] font-semibold tracking-[-0.025em] text-white sm:text-[1.75rem]">
                      {s.title}
                    </h3>
                    <p className="mt-3 max-w-[54ch] text-[0.98rem] leading-[1.7] text-white/60">
                      {s.copy}
                    </p>
                  </div>

                  {/* Timeline */}
                  <div className="col-span-2 sm:col-span-1 sm:text-right">
                    <span className="inline-block rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-[0.72rem] uppercase tracking-[0.24em] text-white/55">
                      {s.weeks}
                    </span>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Process;
