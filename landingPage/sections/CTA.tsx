"use client";

import { FiArrowRight } from "react-icons/fi";
import { motion } from "motion/react";
import { Button } from "@/design/Button";
import { Badge } from "@/design/Badge";
import { SplitText } from "@/animations/SplitText";
import { Reveal } from "@/animations/Reveal";

export function CTA() {
  return (
    <section className="relative overflow-hidden py-32 sm:py-44">
      <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_35%,rgba(34,211,238,0.22),transparent_45%),radial-gradient(circle_at_70%_65%,rgba(167,139,250,0.22),transparent_50%)]" />
        <motion.div
          className="absolute inset-0"
          animate={{ backgroundPosition: ["0% 0%", "100% 100%"] }}
          transition={{ duration: 22, repeat: Infinity, repeatType: "reverse", ease: "linear" }}
          style={{
            backgroundImage:
              "conic-gradient(from 120deg at 50% 50%, rgba(125,211,252,0.08), rgba(167,139,250,0.08), rgba(125,211,252,0.08))",
            backgroundSize: "140% 140%",
          }}
        />
      </div>

      <div className="mx-auto flex w-full max-w-[1040px] flex-col items-center px-6 text-center sm:px-8">
        <Reveal>
          <Badge dot variant="glow">
            Onboarding Q2 2026
          </Badge>
        </Reveal>

        <h2 className="mt-7 max-w-[20ch] text-[clamp(2.5rem,7vw,5.2rem)] font-semibold leading-[1.02] tracking-[-0.055em] text-white">
          <SplitText split="word" animation="rise" stagger={0.05} duration={0.85}>
            Build the revenue system
          </SplitText>
          <br />
          <span className="bg-gradient-to-r from-cyan-200 via-sky-300 to-violet-300 bg-clip-text text-transparent">
            <SplitText split="word" animation="stagger-blur" stagger={0.06} duration={0.95} delay={0.18}>
              your board already expects.
            </SplitText>
          </span>
        </h2>

        <Reveal delay={0.25}>
          <p className="mx-auto mt-8 max-w-[54ch] text-[clamp(1rem,1.4vw,1.1rem)] leading-[1.7] text-white/65">
            Three-week diagnostic. Six-week build. A compounding loop your team
            keeps. One seat left this cohort.
          </p>
        </Reveal>

        <Reveal delay={0.35}>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            <Button variant="primary" size="lg" icon={<FiArrowRight />}>
              Book the audit
            </Button>
            <Button variant="glass" size="lg" magnetic={false}>
              See a sample loop
            </Button>
          </div>
        </Reveal>

        <Reveal delay={0.5}>
          <p className="mt-6 text-[0.78rem] uppercase tracking-[0.3em] text-white/40">
            No decks · No retainers · Outcome-priced
          </p>
        </Reveal>
      </div>
    </section>
  );
}

export default CTA;
