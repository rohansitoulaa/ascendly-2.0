"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { FiStar } from "react-icons/fi";
import { SectionHeader } from "@/design/SectionHeader";
import { GlassCard } from "@/design/GlassCard";

const quotes = [
  {
    quote:
      "Ascendly replaced three tools and a consulting contract. Our pipeline is instrumented for the first time in the company's history — the forecast finally matches reality.",
    name: "Elena Ruiz",
    role: "VP Revenue",
    co: "Helix Labs",
    accent: "cyan" as const,
  },
  {
    quote:
      "The first two weeks paid for the engagement. We shipped a new ICP motion, cut ramp by 40%, and the team actually enjoys the weekly ops loop.",
    name: "Marcus Okafor",
    role: "Head of GTM",
    co: "Northwind",
    accent: "violet" as const,
  },
  {
    quote:
      "They operate like a product team. Everything is versioned, measurable, and tuned in public. A category-defining partner for revenue systems.",
    name: "Priya Rao",
    role: "Chief of Staff",
    co: "Luminary",
    accent: "emerald" as const,
  },
  {
    quote:
      "We've worked with every big-name agency. None came close to this level of rigor. Our board asks about 'the Ascendly loop' by name.",
    name: "Jonas Bergström",
    role: "COO",
    co: "Arcadia",
    accent: "amber" as const,
  },
];

export function Testimonials() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const x = useTransform(scrollYProgress, [0, 1], ["6%", "-22%"]);

  return (
    <section id="proof" className="relative overflow-hidden py-28 sm:py-36">
      <div className="mx-auto w-full max-w-[1220px] px-6 sm:px-8">
        <SectionHeader
          kicker="Client proof"
          title="Outcomes the"
          highlight="board asks about."
          subtitle="Revenue leaders, COOs, and chiefs of staff — on what changes once the loop is live."
          align="left"
          size="lg"
        />
      </div>

      <div ref={ref} className="relative mt-14 sm:mt-20">
        <motion.div
          style={{ x }}
          className="flex gap-5 px-6 sm:gap-6 sm:px-8"
        >
          {quotes.map((q) => (
            <div
              key={q.name}
              className="w-[85vw] shrink-0 sm:w-[480px] lg:w-[540px]"
            >
              <GlassCard accent={q.accent} className="h-full">
                <div className="flex h-full flex-col gap-6 p-7 sm:p-9">
                  <div className="flex items-center gap-1 text-amber-200">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <FiStar key={i} className="h-3.5 w-3.5 fill-current" />
                    ))}
                  </div>
                  <p className="text-[clamp(1.05rem,1.7vw,1.25rem)] leading-[1.55] tracking-[-0.015em] text-white/85">
                    &ldquo;{q.quote}&rdquo;
                  </p>
                  <div className="mt-auto flex items-center gap-3 border-t border-white/[0.06] pt-5">
                    <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-white/10 to-white/0 text-[0.9rem] font-semibold text-white/80 ring-1 ring-white/10">
                      {q.name
                        .split(" ")
                        .map((p) => p[0])
                        .join("")}
                    </span>
                    <div className="flex flex-col">
                      <span className="text-[0.92rem] font-medium tracking-[-0.01em] text-white">
                        {q.name}
                      </span>
                      <span className="text-[0.78rem] text-white/50">
                        {q.role} · {q.co}
                      </span>
                    </div>
                  </div>
                </div>
              </GlassCard>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

export default Testimonials;
