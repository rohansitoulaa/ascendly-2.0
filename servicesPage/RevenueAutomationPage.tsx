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
        <Badge dot variant="glow">REVENUE CONVERSION SYSTEM</Badge>
      </Reveal>

      <Reveal direction="up" distance={24} delay={0.06}>
        <ProximityHeading
          as="h1"
          lines={[
            "Turn existing demand",
            "into predictable revenue.",
          ]}
          mutedLineIndexes={[1]}
          containerClassName="mt-8 w-full"
          className="text-[2.75rem] font-light leading-[1.02] tracking-[-0.035em] sm:text-[4rem] lg:text-[5rem]"
        />
      </Reveal>

      <Reveal direction="up" distance={20} delay={0.15}>
        <div className="mt-12 grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
          <p className="max-w-[52ch] text-[1.05rem] leading-[1.7] text-white/65 sm:text-[1.125rem]">
            You&rsquo;re generating inbound leads, referrals, or interest, but revenue isn&rsquo;t
            predictable. Opportunities stall. Follow-ups don&rsquo;t happen. Deals die in silence.
          </p>
          <p className="max-w-[52ch] text-[1.05rem] leading-[1.7] text-white/50 sm:text-[1.125rem]">
            The Revenue Conversion System is the infrastructure layer that captures every opportunity,
            qualifies it properly, and works it to a decision. Built for B2B companies with $15k+ LTV.
          </p>
        </div>
      </Reveal>

      <Reveal direction="up" distance={16} delay={0.25}>
        <div className="mt-14 flex flex-wrap items-center gap-4">
          <Button variant="primary" size="lg" icon={<FiArrowRight />} href="#cta">
            Apply for a Revenue Audit
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
      title: "Inbound Capture & Routing",
      body: "Every lead (form fill, referral, event, or content) is captured, enriched, and routed to the right person within minutes, not days.",
    },
    {
      index: "02",
      title: "Lead Qualification Framework",
      body: "A structured qualification layer filters out noise and surfaces buyers with real intent. Sales only touches opportunities worth touching.",
    },
    {
      index: "03",
      title: "Deal Progression System",
      body: "Every open opportunity has a next step, an owner, and a deadline. Nothing lingers. Nothing is forgotten.",
    },
    {
      index: "04",
      title: "AI-Powered Follow-Up",
      body: "After every call or meeting, personalised follow-up sequences fire automatically: context-aware, on-brand, and timed to decision cadence.",
    },
    {
      index: "05",
      title: "Stalled Deal Reactivation",
      body: "Deals that went cold get a structured re-engagement sequence based on timing, stakeholder, and last known intent signal.",
    },
    {
      index: "06",
      title: "Pipeline Visibility & Attribution",
      body: "One live view of every deal, stage, and revenue value. Full attribution from first touch to closed. No spreadsheets, no guessing.",
    },
  ];

  return (
    <Section id="what-it-handles" className="py-28 sm:py-36">
      <Reveal direction="up">
        <Kicker>What It Handles</Kicker>
      </Reveal>
      <Reveal direction="up" delay={0.05}>
        <ProximityHeading
          lines={["Six systems. One conversion loop."]}
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
    "Multi-step or consultative sales cycles",
    "Pipeline exists but conversion is inconsistent",
    "Inbound leads going cold before follow-up",
    "No structured deal progression or CRM hygiene",
    "Lean or founder-led team closing $3M–$100M",
  ];

  const notFits = [
    "Early-stage companies with no pipeline yet",
    "Low-ticket or transactional e-commerce",
    "B2C or consumer-facing businesses",
    "Under $3M ARR with no existing deal flow",
  ];

  return (
    <Section className="py-28 sm:py-36">
      <Reveal direction="up">
        <Kicker>Right Fit</Kicker>
      </Reveal>
      <Reveal direction="up" delay={0.05}>
        <ProximityHeading
          lines={["Built for companies that already", "have demand, just not a system."]}
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
      step: "Week 1–3",
      title: "Revenue Audit",
      body: "We map your current funnel: where leads enter, where they stall, and where deals die. Full visibility before we touch anything.",
    },
    {
      step: "Week 4–9",
      title: "System Build",
      body: "We build the capture layer, qualification framework, deal progression system, and follow-up automation. Configured to your ICP and sales motion.",
    },
    {
      step: "Week 10+",
      title: "Handoff & Scale",
      body: "Your team runs the system. We stay on for optimisation. No black box: everything is documented and owned by you.",
    },
  ];

  return (
    <Section className="py-28 sm:py-36">
      <Reveal direction="up">
        <Kicker>How It Works</Kicker>
      </Reveal>
      <Reveal direction="up" delay={0.05}>
        <ProximityHeading
          lines={["Three-week audit. Six-week build.", "A system your team keeps."]}
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
      title: "Outcome-Aligned",
      body: "We only take on companies where ROI is clear before we start. If we can't see a return, we won't take the engagement.",
    },
    {
      index: "02",
      title: "You Own the System",
      body: "No vendor lock-in. No dependency. Everything we build is yours: documented, transferable, and running on your stack.",
    },
    {
      index: "03",
      title: "Selective Onboarding",
      body: "We work with a small number of companies at a time so quality doesn't dilute. If there's no fit, we'll tell you.",
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
              "radial-gradient(circle at 20% 0%, rgba(125,211,252,0.08), transparent 40%), radial-gradient(circle at 90% 100%, rgba(167,139,250,0.06), transparent 40%)",
          }}
        />
        <div className="relative">
          <Reveal direction="up">
            <h2 className="max-w-[22ch] text-balance text-[2.25rem] font-light leading-[1.05] tracking-[-0.03em] text-white sm:text-[3rem] lg:text-[3.5rem]">
              Ready to turn pipeline
              <span className="block text-white/40">into predictable revenue?</span>
            </h2>
          </Reveal>
          <Reveal direction="up" delay={0.08}>
            <p className="mt-8 max-w-[52ch] text-[1.05rem] leading-[1.7] text-white/60">
              We start with a three-week audit so you see the gaps before we build anything.
              Selective intake. We only work with companies where the ROI is clear.
            </p>
          </Reveal>
          <Reveal direction="up" delay={0.16}>
            <div className="mt-12 flex flex-col items-start gap-3">
              <Button variant="primary" size="lg" icon={<FiArrowRight />}>
                Apply for a Revenue Audit
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

export default function RevenueAutomationPage() {
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
        <div className="absolute -left-[15%] top-[0%] h-[70vh] w-[65vw] rounded-full bg-[radial-gradient(ellipse,rgba(34,211,238,0.09),transparent_65%)] blur-3xl" />
        <div className="absolute -right-[10%] top-[2%] h-[55vh] w-[55vw] rounded-full bg-[radial-gradient(ellipse,rgba(167,139,250,0.08),transparent_65%)] blur-3xl" />
        <div className="absolute -left-[10%] top-[35%] h-[60vh] w-[60vw] rounded-full bg-[radial-gradient(ellipse,rgba(56,189,248,0.07),transparent_65%)] blur-3xl" />
        <div className="absolute -right-[5%] top-[60%] h-[55vh] w-[55vw] rounded-full bg-[radial-gradient(ellipse,rgba(99,102,241,0.08),transparent_65%)] blur-3xl" />
        <div className="absolute left-[10%] top-[80%] h-[55vh] w-[80vw] rounded-full bg-[radial-gradient(ellipse,rgba(34,211,238,0.06),transparent_65%)] blur-3xl" />
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
