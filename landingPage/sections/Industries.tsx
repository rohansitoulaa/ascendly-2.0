"use client";

import { motion } from "motion/react";
import {
  FiBriefcase,
  FiCloud,
  FiCpu,
  FiDollarSign,
  FiHeart,
  FiShield,
} from "react-icons/fi";
import { SectionHeader } from "@/design/SectionHeader";
import { TiltCard } from "@/animations/TiltCard";
import { Reveal } from "@/animations/Reveal";

const industries = [
  {
    icon: <FiCloud />,
    title: "B2B SaaS",
    copy: "ARR motions, PLG + sales hybrids, expansion loops.",
    stat: "2.6×",
    label: "pipeline",
  },
  {
    icon: <FiShield />,
    title: "Cybersecurity",
    copy: "Long-cycle enterprise sales with multi-stakeholder buying groups.",
    stat: "−38%",
    label: "CAC",
  },
  {
    icon: <FiDollarSign />,
    title: "Fintech",
    copy: "Compliance-aware playbooks for regulated revenue teams.",
    stat: "+44%",
    label: "win rate",
  },
  {
    icon: <FiHeart />,
    title: "Health tech",
    copy: "Payer, provider, and employer sales with audited trails.",
    stat: "3.1×",
    label: "signal uplift",
  },
  {
    icon: <FiCpu />,
    title: "AI / Infra",
    copy: "Platform deals, design partners, and technical champions.",
    stat: "48d",
    label: "avg ramp",
  },
  {
    icon: <FiBriefcase />,
    title: "Professional services",
    copy: "Partner-led growth with retention-sensitive forecasting.",
    stat: "96%",
    label: "retention",
  },
];

export function Industries() {
  return (
    <section id="industries" className="relative py-28 sm:py-36">
      <div className="mx-auto w-full max-w-[1220px] px-6 sm:px-8">
        <SectionHeader
          kicker="Industries"
          title="Built for"
          highlight="revenue complexity."
          subtitle="Each industry comes with its own signal topology, cycle shape, and buying committee. We tune the system to your reality — not the other way around."
          align="left"
          size="lg"
        />

        <div className="mt-14 grid grid-cols-1 gap-5 sm:mt-20 sm:grid-cols-2 lg:grid-cols-3">
          {industries.map((x, i) => (
            <Reveal key={x.title} direction="up" delay={i * 0.05}>
              <TiltCard max={6} className="h-full rounded-[24px]">
                <div className="relative h-full overflow-hidden rounded-[24px] border border-white/[0.08] bg-gradient-to-br from-white/[0.04] to-white/[0.01] p-7 backdrop-blur-xl">
                  <div className="flex items-center justify-between">
                    <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.03] text-[1.1rem] text-cyan-200">
                      {x.icon}
                    </span>
                    <div className="text-right">
                      <div className="text-[1.6rem] font-semibold leading-none tracking-[-0.03em] text-white">
                        {x.stat}
                      </div>
                      <div className="mt-1 text-[0.65rem] uppercase tracking-[0.24em] text-white/45">
                        {x.label}
                      </div>
                    </div>
                  </div>
                  <h3 className="mt-7 text-[1.25rem] font-semibold tracking-[-0.02em] text-white">
                    {x.title}
                  </h3>
                  <p className="mt-2.5 max-w-[38ch] text-[0.92rem] leading-[1.65] text-white/58">
                    {x.copy}
                  </p>

                  <motion.span
                    aria-hidden
                    initial={{ opacity: 0.25 }}
                    whileHover={{ opacity: 0.55 }}
                    className="pointer-events-none absolute -bottom-24 -right-16 h-64 w-64 rounded-full bg-cyan-400/12 blur-[90px]"
                  />
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
