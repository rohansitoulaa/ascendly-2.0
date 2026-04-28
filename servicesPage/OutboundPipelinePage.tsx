"use client";

import dynamic from "next/dynamic";
import { useRef, type ReactNode } from "react";
import { FiArrowRight, FiCheck, FiX } from "react-icons/fi";
import Navbar from "@/landingPage/sections/Navbar";
import Button from "@/design/Button";
import { Reveal } from "@/animations/Reveal";
import { Badge } from "@/design/Badge";
import VariableProximity from "@/animations/VariableProximity";

const DotField = dynamic(() => import("@/design/DotField"), { ssr: false });

const PROXIMITY = {
  radius: 180,
  fromFontVariationSettings: "'wght' 360, 'wdth' 108, 'opsz' 14",
  toFontVariationSettings: "'wght' 860, 'wdth' 142, 'opsz' 144",
} as const;

/* ------------------------------------------------------------------ */
/*  Primitives                                                         */
/* ------------------------------------------------------------------ */

function Section({ children, className = "", id }: { children: ReactNode; className?: string; id?: string }) {
  return (
    <section id={id} className={`relative mx-auto w-full max-w-[1240px] px-6 sm:px-8 lg:px-10 ${className}`}>
      {children}
    </section>
  );
}

function Hairline() {
  return (
    <div className="mx-auto w-full max-w-[1240px] px-6 sm:px-8 lg:px-10">
      <div className="h-px bg-white/[0.06]" />
    </div>
  );
}

function Kicker({ children }: { children: ReactNode }) {
  return (
    <div className="flex items-center gap-3 text-[0.72rem] font-medium uppercase tracking-[0.22em] text-white/45">
      <span className="h-px w-8 bg-white/25" />
      <span>{children}</span>
    </div>
  );
}

function ProximityHeading({ lines, as = "h2", className, containerClassName = "w-full", mutedLineIndexes = [] }: {
  lines: string[];
  as?: "h1" | "h2";
  className: string;
  containerClassName?: string;
  mutedLineIndexes?: number[];
}) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const HeadingTag = as;
  return (
    <div ref={containerRef} className={containerClassName}>
      <HeadingTag className={className}>
        {lines.map((line, index) => (
          <VariableProximity
            key={`${line}-${index}`}
            label={line}
            fromFontVariationSettings={PROXIMITY.fromFontVariationSettings}
            toFontVariationSettings={PROXIMITY.toFontVariationSettings}
            containerRef={containerRef}
            radius={PROXIMITY.radius}
            falloff="gaussian"
            className={["block", index > 0 ? "mt-1" : "", mutedLineIndexes.includes(index) ? "text-white/40" : "text-white"].filter(Boolean).join(" ")}
          />
        ))}
      </HeadingTag>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Hero                                                               */
/* ------------------------------------------------------------------ */

function Hero() {
  return (
    <Section className="max-w-none pt-36 pb-28 sm:pt-44 sm:pb-36">
      <Reveal direction="up" distance={18}>
        <Badge dot variant="glow">GTM PIPELINE SYSTEM</Badge>
      </Reveal>

      <Reveal direction="up" distance={24} delay={0.06}>
        <ProximityHeading
          as="h1"
          lines={[
            "Build qualified pipeline",
            "without adding noise.",
          ]}
          mutedLineIndexes={[1]}
          containerClassName="mt-8 w-full"
          className="text-[2.75rem] font-light leading-[1.02] tracking-[-0.035em] sm:text-[4rem] lg:text-[5rem]"
        />
      </Reveal>

      <Reveal direction="up" distance={20} delay={0.15}>
        <div className="mt-12 grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
          <p className="max-w-[52ch] text-[1.05rem] leading-[1.7] text-white/65 sm:text-[1.125rem]">
            Most outbound fails because it&rsquo;s built on volume, not precision. Generic sequences,
            wrong ICPs, wrong timing. The result is noise: ignored by buyers and wasted by teams.
          </p>
          <p className="max-w-[52ch] text-[1.05rem] leading-[1.7] text-white/50 sm:text-[1.125rem]">
            The Outbound Pipeline System is structured outbound built around signal, timing, and ICP fit.
            We don&rsquo;t generate meetings. We generate qualified meetings with buyers who are actually ready.
          </p>
        </div>
      </Reveal>

      <Reveal direction="up" distance={16} delay={0.25}>
        <div className="mt-14 flex flex-wrap items-center gap-4">
          <Button variant="primary" size="lg" icon={<FiArrowRight />} href="#cta">
            Apply for an Outbound Audit
          </Button>
          <Button variant="ghost" size="lg" href="#what-it-handles" magnetic={false}>
            What it handles
          </Button>
        </div>
        <p className="mt-4 text-[0.78rem] leading-[1.55] text-white/40 italic">
          (For B2B companies with $3M–$100M revenue and $15k+ LTV. Not for early-stage or low-ticket models.)
        </p>
      </Reveal>
    </Section>
  );
}

/* ------------------------------------------------------------------ */
/*  What It Handles                                                    */
/* ------------------------------------------------------------------ */

function WhatItHandles() {
  const items = [
    {
      index: "01",
      title: "ICP Definition & Segmentation",
      body: "We build a precise ideal customer profile using firmographic data, technographic signals, and buying intent, not guesswork or broad categories.",
    },
    {
      index: "02",
      title: "Intent Signal Identification",
      body: "We surface companies and contacts showing buying signals: hiring patterns, funding events, tech stack changes, and content engagement.",
    },
    {
      index: "03",
      title: "Multi-Channel Outbound",
      body: "Cold email and LinkedIn coordinated as one motion. Sequenced by persona, stage, and signal, not spray-and-pray.",
    },
    {
      index: "04",
      title: "Personalisation at Scale",
      body: "Every message is contextualised to the recipient&rsquo;s situation. Not merge-tag personalisation. Genuine relevance that earns a reply.",
    },
    {
      index: "05",
      title: "Meeting Qualification Layer",
      body: "Replies are qualified before booking. No unqualified calls on your calendar: just buyers who match, are ready, and have authority.",
    },
    {
      index: "06",
      title: "Continuous Optimisation",
      body: "Weekly reporting on reply rates, meeting rates, and pipeline value. Sequences are iterated based on what converts, not assumptions.",
    },
  ];

  return (
    <Section id="what-it-handles" className="py-28 sm:py-36">
      <Reveal direction="up">
        <Kicker>What It Handles</Kicker>
      </Reveal>
      <Reveal direction="up" delay={0.05}>
        <ProximityHeading
          lines={["Six systems. One qualified pipeline."]}
          containerClassName="mt-6 w-full"
          className="text-balance text-[2rem] font-light leading-[1.05] tracking-[-0.03em] sm:text-[2.75rem] lg:text-[3.25rem]"
        />
      </Reveal>

      <div className="mt-20">
        {items.map((item, i) => (
          <Reveal key={item.index} direction="up" delay={0.04 + i * 0.04}>
            <div className="group grid grid-cols-[auto_1fr] gap-8 border-t border-white/[0.07] py-10 transition-colors duration-500 hover:border-white/[0.18] sm:grid-cols-[140px_1fr] sm:gap-12 sm:py-12">
              <div className="font-mono text-[0.72rem] tracking-[0.22em] text-white/35">
                {item.index}
              </div>
              <div>
                <h3 className="text-[1.5rem] font-light tracking-[-0.015em] text-white sm:text-[1.85rem]">
                  {item.title}
                </h3>
                <p className="mt-4 max-w-[58ch] text-[1rem] leading-[1.7] text-white/55">
                  {item.body}
                </p>
              </div>
            </div>
          </Reveal>
        ))}
        <div className="border-t border-white/[0.07]" />
      </div>
    </Section>
  );
}

/* ------------------------------------------------------------------ */
/*  Right Fit Grid                                                     */
/* ------------------------------------------------------------------ */

function RightFit() {
  const fits = [
    "B2B companies with $15k+ LTV per deal",
    "No reliable outbound motion today",
    "Relying on referrals or inbound only",
    "Strong closer but no consistent pipeline",
    "Sales team spending time prospecting, not closing",
    "Ready to invest in a system, not campaigns",
  ];

  const notFits = [
    "Companies without a defined ICP or offer",
    "Low-ticket or transactional products",
    "No internal capacity to run discovery calls",
    "Looking for guaranteed volume, not qualified meetings",
  ];

  return (
    <Section className="py-28 sm:py-36">
      <Reveal direction="up">
        <Kicker>Right Fit</Kicker>
      </Reveal>
      <Reveal direction="up" delay={0.05}>
        <ProximityHeading
          lines={["Built for companies that need", "qualified pipeline, not more leads."]}
          mutedLineIndexes={[1]}
          containerClassName="mt-6 w-full"
          className="text-balance text-[2rem] font-light leading-[1.05] tracking-[-0.03em] sm:text-[2.75rem] lg:text-[3.25rem]"
        />
      </Reveal>

      <div className="mt-16 grid gap-6 md:grid-cols-2 md:gap-8">
        <Reveal direction="up" delay={0.1}>
          <div className="h-full rounded-2xl border border-white/[0.08] bg-white/[0.015] p-8 sm:p-10">
            <div className="mb-6 flex items-center gap-3">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-500/15">
                <FiCheck size={12} className="text-emerald-400" />
              </span>
              <span className="text-[0.75rem] font-medium uppercase tracking-[0.2em] text-emerald-400/70">
                This fits if
              </span>
            </div>
            <ul className="flex flex-col gap-4">
              {fits.map((f) => (
                <li key={f} className="flex items-start gap-3">
                  <FiCheck size={14} className="mt-[3px] shrink-0 text-emerald-400/60" />
                  <span className="text-[0.95rem] leading-[1.6] text-white/70">{f}</span>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>

        <Reveal direction="up" delay={0.15}>
          <div className="h-full rounded-2xl border border-white/[0.06] bg-white/[0.008] p-8 sm:p-10">
            <div className="mb-6 flex items-center gap-3">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-red-500/10">
                <FiX size={12} className="text-red-400/70" />
              </span>
              <span className="text-[0.75rem] font-medium uppercase tracking-[0.2em] text-red-400/50">
                This won&rsquo;t fit if
              </span>
            </div>
            <ul className="flex flex-col gap-4">
              {notFits.map((f) => (
                <li key={f} className="flex items-start gap-3">
                  <FiX size={14} className="mt-[3px] shrink-0 text-red-400/40" />
                  <span className="text-[0.95rem] leading-[1.6] text-white/40">{f}</span>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}

/* ------------------------------------------------------------------ */
/*  How It Works                                                       */
/* ------------------------------------------------------------------ */

function HowItWorks() {
  const steps = [
    {
      step: "Week 1–2",
      title: "Outbound Audit",
      body: "We review your current ICP, messaging, and outbound history. If you have none, we start from your best clients and work backwards.",
    },
    {
      step: "Week 3–8",
      title: "System Build & Launch",
      body: "ICP definition, list build, sequence creation, tooling setup, and first campaigns launched. All tuned before we scale spend.",
    },
    {
      step: "Week 9+",
      title: "Iterate & Scale",
      body: "Weekly optimisation loops based on reply rate, meeting quality, and pipeline value. We scale what works, kill what doesn't.",
    },
  ];

  return (
    <Section className="py-28 sm:py-36">
      <Reveal direction="up">
        <Kicker>How It Works</Kicker>
      </Reveal>
      <Reveal direction="up" delay={0.05}>
        <ProximityHeading
          lines={["Audit. Build. Scale.", "No wasted ramp time."]}
          mutedLineIndexes={[1]}
          containerClassName="mt-6 w-full"
          className="text-balance text-[2rem] font-light leading-[1.05] tracking-[-0.03em] sm:text-[2.75rem] lg:text-[3.25rem]"
        />
      </Reveal>

      <div className="mt-20">
        {steps.map((s, i) => (
          <Reveal key={s.step} direction="up" delay={0.05 + i * 0.06}>
            <div className="group grid grid-cols-[auto_1fr] gap-8 border-t border-white/[0.07] py-10 transition-colors duration-500 hover:border-white/[0.18] sm:grid-cols-[180px_1fr] sm:gap-12 sm:py-12">
              <div className="text-[0.72rem] font-medium uppercase tracking-[0.22em] text-white/40">
                {s.step}
              </div>
              <div>
                <h3 className="text-[1.5rem] font-light tracking-[-0.015em] text-white sm:text-[1.85rem]">
                  {s.title}
                </h3>
                <p className="mt-4 max-w-[58ch] text-[1rem] leading-[1.7] text-white/55">
                  {s.body}
                </p>
              </div>
            </div>
          </Reveal>
        ))}
        <div className="border-t border-white/[0.07]" />
      </div>
    </Section>
  );
}

/* ------------------------------------------------------------------ */
/*  Commitment                                                         */
/* ------------------------------------------------------------------ */

function Commitment() {
  const items = [
    {
      index: "01",
      title: "Qualified Meetings Only",
      body: "We don't measure success in meetings booked. We measure it in qualified conversations with buyers who match, have authority, and are ready to engage.",
    },
    {
      index: "02",
      title: "No Spray-and-Pray",
      body: "Volume without precision destroys sender reputation and wastes budget. We send fewer messages to better-fit targets, with better results.",
    },
    {
      index: "03",
      title: "You Keep the Infrastructure",
      body: "Every list, sequence, and system is built in your tools. No lock-in. If we part ways, your outbound keeps running.",
    },
  ];

  return (
    <Section className="py-28 sm:py-36">
      <Reveal direction="up">
        <Kicker>Our Commitment</Kicker>
      </Reveal>
      <Reveal direction="up" delay={0.05}>
        <ProximityHeading
          lines={["Three things we won't compromise on."]}
          containerClassName="mt-6 w-full"
          className="text-balance text-[2rem] font-light leading-[1.05] tracking-[-0.03em] sm:text-[2.75rem] lg:text-[3.25rem]"
        />
      </Reveal>

      <div className="mt-16 grid gap-px overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.06] md:grid-cols-3">
        {items.map((p, i) => (
          <Reveal key={p.index} direction="up" delay={0.08 + i * 0.06}>
            <div className="h-full bg-[#07080c] p-8 sm:p-10">
              <div className="text-[0.72rem] font-medium uppercase tracking-[0.22em] text-white/35">
                {p.index}
              </div>
              <h3 className="mt-8 text-[1.35rem] font-light tracking-[-0.015em] text-white sm:text-[1.5rem]">
                {p.title}
              </h3>
              <p className="mt-4 text-[0.95rem] leading-[1.7] text-white/55">
                {p.body}
              </p>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

/* ------------------------------------------------------------------ */
/*  CTA                                                                */
/* ------------------------------------------------------------------ */

function CTA() {
  return (
    <Section id="cta" className="pb-40 pt-28 sm:pb-48 sm:pt-36">
      <div className="relative overflow-hidden rounded-3xl border border-white/[0.08] bg-white/[0.015] px-8 py-20 sm:px-16 sm:py-24">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(circle at 20% 0%, rgba(167,139,250,0.08), transparent 40%), radial-gradient(circle at 90% 100%, rgba(125,211,252,0.06), transparent 40%)",
          }}
        />
        <div className="relative">
          <Reveal direction="up">
            <h2 className="max-w-[22ch] text-balance text-[2.25rem] font-light leading-[1.05] tracking-[-0.03em] text-white sm:text-[3rem] lg:text-[3.5rem]">
              Ready to build qualified pipeline
              <span className="block text-white/40">without the noise?</span>
            </h2>
          </Reveal>
          <Reveal direction="up" delay={0.08}>
            <p className="mt-8 max-w-[52ch] text-[1.05rem] leading-[1.7] text-white/60">
              We start with an outbound audit to identify your best-fit buyers and
              biggest gaps before building anything. Selective intake: quality over volume.
            </p>
          </Reveal>
          <Reveal direction="up" delay={0.16}>
            <div className="mt-12 flex flex-col items-start gap-3">
              <Button variant="primary" size="lg" icon={<FiArrowRight />}>
                Apply for an Outbound Audit
              </Button>
              <p className="text-[0.78rem] leading-[1.55] text-white/40 italic">
                (For B2B companies with $3M–$100M revenue and $15k+ LTV. Not for early-stage or low-ticket models.)
              </p>
            </div>
          </Reveal>
          <Reveal direction="up" delay={0.24}>
            <p className="mt-6 text-[0.78rem] uppercase tracking-[0.3em] text-white/35">
              Selective onboarding · Outcome-aligned · Built for scale
            </p>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

export default function OutboundPipelinePage() {
  return (
    <main id="top" className="relative isolate min-h-screen overflow-x-clip bg-[#05060A]">
      <div className="pointer-events-none fixed inset-0 z-0">
        <div className="absolute inset-0 opacity-[0.50]">
          <DotField
            dotRadius={1}
            dotSpacing={24}
            cursorRadius={360}
            bulgeStrength={36}
            glowRadius={180}
            glowColor="#05060A"
            gradientFrom="rgba(226, 232, 240, 0.22)"
            gradientTo="rgba(148, 163, 184, 0.10)"
          />
        </div>
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(180deg, rgba(5,6,10,0.25) 0%, rgba(5,6,10,0.55) 100%)" }}
        />
      </div>

      <div aria-hidden className="pointer-events-none absolute inset-0 z-1 overflow-hidden">
        <div className="absolute -left-[15%] top-[0%] h-[70vh] w-[65vw] rounded-full bg-[radial-gradient(ellipse,rgba(167,139,250,0.09),transparent_65%)] blur-3xl" />
        <div className="absolute -right-[10%] top-[2%] h-[55vh] w-[55vw] rounded-full bg-[radial-gradient(ellipse,rgba(34,211,238,0.08),transparent_65%)] blur-3xl" />
        <div className="absolute -left-[10%] top-[35%] h-[60vh] w-[60vw] rounded-full bg-[radial-gradient(ellipse,rgba(99,102,241,0.07),transparent_65%)] blur-3xl" />
        <div className="absolute -right-[5%] top-[60%] h-[55vh] w-[55vw] rounded-full bg-[radial-gradient(ellipse,rgba(56,189,248,0.08),transparent_65%)] blur-3xl" />
        <div className="absolute left-[10%] top-[80%] h-[55vh] w-[80vw] rounded-full bg-[radial-gradient(ellipse,rgba(167,139,250,0.06),transparent_65%)] blur-3xl" />
      </div>

      <div className="relative z-20">
        <Navbar />
      </div>

      <div className="relative z-10">
        <Hero />
        <Hairline />
        <WhatItHandles />
        <Hairline />
        <RightFit />
        <Hairline />
        <HowItWorks />
        <Hairline />
        <Commitment />
        <CTA />
      </div>
    </main>
  );
}
