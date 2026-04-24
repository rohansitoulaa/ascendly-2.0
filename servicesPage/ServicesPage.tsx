"use client";

import dynamic from "next/dynamic";
import { useRef, type ReactNode } from "react";
import { Counter } from "@/animations/Counter";
import VariableProximity from "@/animations/VariableProximity";
import Navbar from "@/landingPage/sections/Navbar";
import Button from "@/design/Button";
import { Reveal } from "@/animations/Reveal";

const DotField = dynamic(() => import("@/design/DotField"), { ssr: false });

const SERVICES_HERO_PROXIMITY = {
  // Cursor influence radius in pixels. Keep between 120 and 240 so the letter response stays local and readable.
  radius: 180,
  // Resting variable-font settings. Keep the weight moderate so the text remains elegant before interaction.
  fromFontVariationSettings: "'wght' 360, 'wdth' 108, 'opsz' 14",
  // Peak variable-font settings near the pointer. Keep the width and weight increase controlled to avoid visual breakup.
  toFontVariationSettings: "'wght' 860, 'wdth' 142, 'opsz' 144",
} as const;

const SERVICES_STATS = {
  // Counter duration in seconds. Keep between 1.8 and 3.2 so the values settle smoothly without dragging.
  counterDuration: 2.4,
} as const;

/* ------------------------------------------------------------------ */
/*  Layout primitives                                                  */
/* ------------------------------------------------------------------ */

function Section({
  children,
  className = "",
  id,
}: {
  children: ReactNode;
  className?: string;
  id?: string;
}) {
  return (
    <section
      id={id}
      className={`relative mx-auto w-full max-w-[1240px] px-6 sm:px-8 lg:px-10 ${className}`}
    >
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

function ProximityHeading({
  lines,
  as = "h2",
  className,
  containerClassName = "w-full",
  mutedLineIndexes = [],
}: {
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
            fromFontVariationSettings={
              SERVICES_HERO_PROXIMITY.fromFontVariationSettings
            }
            toFontVariationSettings={
              SERVICES_HERO_PROXIMITY.toFontVariationSettings
            }
            containerRef={containerRef}
            radius={SERVICES_HERO_PROXIMITY.radius}
            falloff="gaussian"
            className={[
              "block",
              index > 0 ? "mt-1" : "",
              mutedLineIndexes.includes(index) ? "text-white/40" : "text-white",
            ]
              .filter(Boolean)
              .join(" ")}
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
        <Kicker>Services · Revenue Systems</Kicker>
      </Reveal>

      <Reveal direction="up" distance={24} delay={0.05}>
        <ProximityHeading
          as="h1"
          lines={[
            "Most teams don't have a lead problem.",
            "They have a conversion problem.",
          ]}
          mutedLineIndexes={[1]}
          containerClassName="mt-8 w-full"
          className="text-[2.75rem] font-light leading-[1.02] tracking-[-0.035em] sm:text-[4rem] lg:text-[5rem]"
        />
      </Reveal>

      <Reveal direction="up" distance={20} delay={0.15}>
        <div className="mt-12 grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
          <p className="max-w-[52ch] text-[1.05rem] leading-[1.7] text-white/65 sm:text-[1.125rem]">
            Pipeline gets generated but not followed up, not worked properly,
            and not converted. That&rsquo;s where most revenue is lost.
          </p>
          <p className="max-w-[52ch] text-[1.05rem] leading-[1.7] text-white/55 sm:text-[1.125rem]">
            We built Ascendly to fix that. Not by sending more emails  by
            building systems that ensure every opportunity is captured, worked,
            and converted. We work with B2B companies where each deal matters.
          </p>
        </div>
      </Reveal>

      <Reveal direction="up" distance={16} delay={0.25}>
        <div className="mt-14 flex flex-wrap items-center gap-4">
          <Button variant="primary" size="lg" href="#cta">
            Book a Strategy Call
          </Button>
          <Button variant="ghost" size="lg" href="#systems" magnetic={false}>
            How the system works
          </Button>
        </div>
      </Reveal>
    </Section>
  );
}

/* ------------------------------------------------------------------ */
/*  Two Gears                                                          */
/* ------------------------------------------------------------------ */

function Gears() {
  const gears = [
    {
      label: "Gear 01",
      title: "Pipeline Conversion System",
      body: "Inbound signals, CRM hygiene, routing and follow-up discipline  everything that turns an opportunity into a closed deal.",
    },
    {
      label: "Gear 02",
      title: "Outbound Engine",
      body: "Precision prospecting built around ICP and intent. Multi-channel, measured, and operated like a system  not a volume game.",
    },
  ];

  return (
    <Section id="systems" className="py-28 sm:py-36">
      <Reveal direction="up">
        <Kicker>The System</Kicker>
      </Reveal>
      <Reveal direction="up" delay={0.05}>
        <ProximityHeading
          lines={[
            "Pipeline is built in two gears.",
            "Revenue comes from both.",
          ]}
          mutedLineIndexes={[1]}
          containerClassName="mt-6 w-full"
          className="text-balance text-[2rem] font-light leading-[1.05] tracking-[-0.03em] sm:text-[2.75rem] lg:text-[3.25rem]"
        />
      </Reveal>

      <div className="mt-16 grid gap-6 md:grid-cols-2 md:gap-8">
        {gears.map((g, i) => (
          <Reveal key={g.label} direction="up" delay={0.1 + i * 0.08}>
            <div className="group relative h-full rounded-2xl border border-white/[0.08] bg-white/[0.015] p-8 backdrop-blur-[2px] transition-colors duration-500 hover:border-white/[0.16] hover:bg-white/[0.03] sm:p-10">
              <div className="flex items-center justify-between">
                <span className="text-[0.72rem] font-medium uppercase tracking-[0.22em] text-white/40">
                  {g.label}
                </span>
                <span className="h-px w-10 bg-white/20 transition-all duration-500 group-hover:w-16 group-hover:bg-white/40" />
              </div>
              <h3 className="mt-8 text-[1.65rem] font-light tracking-[-0.02em] text-white sm:text-[2rem]">
                {g.title}
              </h3>
              <p className="mt-5 max-w-[46ch] text-[0.98rem] leading-[1.7] text-white/55">
                {g.body}
              </p>
            </div>
          </Reveal>
        ))}
      </div>

      <Reveal direction="up" delay={0.25}>
        <p className="mt-14 max-w-[48ch] text-[0.95rem] leading-[1.65] text-white/45">
          We treat outreach as a precision system, not a volume game.
        </p>
      </Reveal>
    </Section>
  );
}

/* ------------------------------------------------------------------ */
/*  Core Proof                                                         */
/* ------------------------------------------------------------------ */

function Proof() {
  const items = [
    {
      kpi: "Qualified Opportunities",
      line: "Booked with qualified buyers, not noise.",
    },
    {
      kpi: "Stalled Deals Recovered",
      line: "Re-engaged, re-qualified, and moved to close.",
    },
  ];
  return (
    <Section id="proof" className="py-28 sm:py-36">
      <Reveal direction="up">
        <Kicker>What We Build</Kicker>
      </Reveal>
      <Reveal direction="up" delay={0.05}>
        <ProximityHeading
          lines={[
            "Most teams only build pipeline.",
            "We build what happens after.",
          ]}
          mutedLineIndexes={[1]}
          containerClassName="mt-6 w-full"
          className="text-balance text-[2rem] font-light leading-[1.05] tracking-[-0.03em] sm:text-[2.75rem] lg:text-[3.25rem]"
        />
      </Reveal>

      <div className="mt-16 grid gap-10 md:grid-cols-2 md:gap-14">
        {items.map((it, i) => (
          <Reveal key={it.kpi} direction="up" delay={0.1 + i * 0.08}>
            <div className="border-l border-white/10 pl-8">
              <div className="text-[0.72rem] font-medium uppercase tracking-[0.22em] text-white/45">
                Core Outcome
              </div>
              <div className="mt-4 text-[1.75rem] font-light tracking-[-0.02em] text-white sm:text-[2.15rem]">
                {it.kpi}
              </div>
              <p className="mt-4 max-w-[42ch] text-[0.98rem] leading-[1.7] text-white/55">
                {it.line}
              </p>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

/* ------------------------------------------------------------------ */
/*  Principles                                                         */
/* ------------------------------------------------------------------ */

function Principles() {
  const items = [
    {
      index: "01",
      title: "No Wasted Pipeline",
      body: "Generating leads that don’t convert is expensive. Every opportunity is accounted for.",
    },
    {
      index: "02",
      title: "No Blind Automation",
      body: "Automation without control kills deals. Humans make the calls that matter.",
    },
    {
      index: "03",
      title: "No Dead Deals",
      body: "Every deal is worked until close or disqualification. Nothing is left in limbo.",
    },
  ];
  return (
    <Section id="industries" className="py-28 sm:py-36">
      <Reveal direction="up">
        <Kicker>Operating Principles</Kicker>
      </Reveal>
      <Reveal direction="up" delay={0.05}>
        <ProximityHeading
          lines={["Three rules we don’t break."]}
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
/*  Who this is for                                                    */
/* ------------------------------------------------------------------ */

function WhoFor() {
  const items = [
    "B2B companies with $30k+ deal size",
    "Long or multi-step sales cycles",
    "Pipeline exists, but conversion is weak",
    "Lean or founder-led sales teams",
  ];
  return (
    <Section id="process" className="py-28 sm:py-36">
      <div className="grid gap-16 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
        <div className="lg:col-span-2">
          <Reveal direction="up">
            <Kicker>Who This Is For</Kicker>
          </Reveal>
          <Reveal direction="up" delay={0.05}>
            <ProximityHeading
              lines={["Built for operators who know, every deal matters."]}
              mutedLineIndexes={[1]}
              containerClassName="mt-6 w-full"
              className="text-balance text-[2rem] font-light leading-[1.05] tracking-[-0.03em] sm:text-[2.5rem]"
            />
          </Reveal>
        </div>

        <div className="divide-y divide-white/[0.07] lg:col-start-2">
          {items.map((label, i) => (
            <Reveal key={label} direction="up" delay={0.08 + i * 0.05}>
              <div className="flex items-center justify-between gap-6 py-6">
                <span className="font-mono text-[0.8rem] tracking-[0.18em] text-white/35">
                  0{i + 1}
                </span>
                <span className="flex-1 text-[1.05rem] leading-[1.5] text-white/80 sm:text-[1.15rem]">
                  {label}
                </span>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  );
}

/* ------------------------------------------------------------------ */
/*  Process                                                            */
/* ------------------------------------------------------------------ */

function Process() {
  const steps = [
    {
      step: "Step 01",
      title: "Revenue Infrastructure",
      body: "Set up outbound + inbound systems, CRM, and tracking. One source of truth for the whole funnel.",
    },
    {
      step: "Step 02",
      title: "ICP & Decision Intelligence",
      body: "Identify real buyers using firmographic data and intent signals. No vanity lists.",
    },
    {
      step: "Step 03",
      title: "Multi-Channel Engagement",
      body: "Email, LinkedIn, and inbound capture orchestrated as one motion  not three disconnected campaigns.",
    },
    {
      step: "Step 04",
      title: "Pipeline → Revenue",
      body: "Qualification, routing, follow-ups, deal progression. Worked until close or disqualification.",
    },
  ];
  return (
    <Section className="py-28 sm:py-36">
      <Reveal direction="up">
        <Kicker>The Process</Kicker>
      </Reveal>
      <Reveal direction="up" delay={0.05}>
        <ProximityHeading
          lines={["From system setup to closed revenue."]}
          containerClassName="mt-6 w-full"
          className="text-balance text-[2rem] font-light leading-[1.05] tracking-[-0.03em] sm:text-[2.75rem] lg:text-[3.25rem]"
        />
      </Reveal>

      <div className="mt-20">
        {steps.map((s, i) => (
          <Reveal key={s.step} direction="up" delay={0.05 + i * 0.04}>
            <div className="group grid grid-cols-[auto_1fr] gap-8 border-t border-white/[0.07] py-10 transition-colors duration-500 hover:border-white/[0.18] sm:grid-cols-[140px_1fr] sm:gap-12 sm:py-12">
              <div className="text-[0.72rem] font-medium uppercase tracking-[0.22em] text-white/40">
                {s.step}
              </div>
              <div>
                <h3 className="text-[1.5rem] font-light tracking-[-0.015em] text-white transition-colors duration-500 group-hover:text-white sm:text-[1.85rem]">
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
/*  Stats                                                              */
/* ------------------------------------------------------------------ */

function Stats() {
  const stats = [
    { value: "2K+", label: "Qualified opportunities generated" },
    { value: "300", label: "Deals closed" },
    { value: "3–6×", label: "Pipeline growth" },
    { value: "6", label: "Long-term revenue partners" },
  ];
  const renderStatValue = (label: string, fallback: string) => {
    switch (label) {
      case "Qualified opportunities generated":
        return (
          <Counter
            to={2}
            suffix="K+"
            duration={SERVICES_STATS.counterDuration}
            className="tabular-nums"
          />
        );
      case "Deals closed":
        return (
          <Counter
            to={300}
            duration={SERVICES_STATS.counterDuration}
            className="tabular-nums"
          />
        );
      case "Pipeline growth":
        return (
          <span className="inline-flex items-baseline whitespace-nowrap">
            <Counter
              to={3}
              duration={SERVICES_STATS.counterDuration}
              className="tabular-nums"
            />
            <span aria-hidden>{"\u2013"}</span>
            <Counter
              to={6}
              duration={SERVICES_STATS.counterDuration}
              className="tabular-nums"
            />
          </span>
        );
      case "Long-term revenue partners":
        return (
          <Counter
            to={6}
            duration={SERVICES_STATS.counterDuration}
            className="tabular-nums"
          />
        );
      default:
        return fallback;
    }
  };
  return (
    <Section className="py-28 sm:py-36">
      <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
        {stats.map((s, i) => (
          <Reveal key={s.label} direction="up" delay={0.05 + i * 0.06}>
            <div>
              <div className="text-[3rem] font-light leading-none tracking-[-0.04em] text-white sm:text-[3.5rem]">
                {renderStatValue(s.label, s.value)}
              </div>
              <div className="mt-4 max-w-[22ch] text-[0.92rem] leading-[1.55] text-white/50">
                {s.label}
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

/* ------------------------------------------------------------------ */
/*  Mission & Vision                                                   */
/* ------------------------------------------------------------------ */

function MissionVision() {
  return (
    <Section className="py-28 sm:py-36">
      <div className="grid gap-14 md:grid-cols-2 md:gap-16">
        <Reveal direction="up">
          <div>
            <Kicker>Mission</Kicker>
            <p className="mt-8 max-w-[34ch] text-[1.5rem] font-light leading-[1.3] tracking-[-0.015em] text-white sm:text-[1.85rem]">
              Help high-ticket B2B companies build predictable revenue systems.
            </p>
          </div>
        </Reveal>
        <Reveal direction="up" delay={0.08}>
          <div>
            <Kicker>Vision</Kicker>
            <p className="mt-8 max-w-[34ch] text-[1.5rem] font-light leading-[1.3] tracking-[-0.015em] text-white sm:text-[1.85rem]">
              Replace fragmented tools and agencies with unified revenue
              systems.
            </p>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}

/* ------------------------------------------------------------------ */
/*  Values                                                             */
/* ------------------------------------------------------------------ */

function Values() {
  const values = [
    "Precision Over Volume",
    "Ownership Mindset",
    "Systems Over Tactics",
    "Radical Transparency",
    "Continuous Optimization",
  ];
  return (
    <Section className="py-28 sm:py-36">
      <Reveal direction="up">
        <Kicker>Values</Kicker>
      </Reveal>
      <div className="mt-10 flex flex-wrap gap-x-3 gap-y-3">
        {values.map((v, i) => (
          <Reveal key={v} direction="up" delay={0.04 * i} inline>
            <span className="inline-flex items-center rounded-full border border-white/[0.1] bg-white/[0.02] px-5 py-2.5 text-[0.92rem] tracking-[-0.005em] text-white/75 transition-colors duration-400 hover:border-white/25 hover:text-white">
              {v}
            </span>
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
            <h2 className="max-w-[20ch] text-balance text-[2.25rem] font-light leading-[1.05] tracking-[-0.03em] text-white sm:text-[3rem] lg:text-[3.5rem]">
              Ready to build a
              <span className="block text-white/40">predictable pipeline?</span>
            </h2>
          </Reveal>
          <Reveal direction="up" delay={0.08}>
            <p className="mt-8 max-w-[52ch] text-[1.05rem] leading-[1.7] text-white/60">
              We don&rsquo;t just generate leads. We build systems that turn
              pipeline into revenue.
            </p>
          </Reveal>
          <Reveal direction="up" delay={0.16}>
            <div className="mt-12 flex flex-wrap items-center gap-5">
              <Button variant="primary" size="lg">
                Book a Strategy Call
              </Button>
              <span className="text-[0.9rem] leading-[1.55] text-white/45">
                We&rsquo;ll map your pipeline and show where revenue is leaking.
              </span>
            </div>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

export default function ServicesPage() {
  return (
    <main
      id="top"
      className="relative isolate min-h-screen overflow-x-clip bg-[#05060A]"
    >
      {/* Background: DotField  subtle, calm, low-contrast */}
      <div className="pointer-events-none fixed inset-0 z-0">
        <div className="absolute inset-0 opacity-[0.55]">
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

        {/* Vignette overlay */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(5,6,10,0.25) 0%, rgba(5,6,10,0.55) 100%)",
          }}
        />
      </div>

      {/* Scrolling color atmosphere  blobs scroll with content, one per section band */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-1 overflow-hidden"
      >
        {/* Hero  cyan left, violet right */}
        <div className="absolute -left-[15%] top-[0%] h-[70vh] w-[65vw] rounded-full bg-[radial-gradient(ellipse,rgba(34,211,238,0.09),transparent_65%)] blur-3xl" />
        <div className="absolute -right-[10%] top-[2%] h-[55vh] w-[55vw] rounded-full bg-[radial-gradient(ellipse,rgba(167,139,250,0.08),transparent_65%)] blur-3xl" />

        {/* Gears  deep blue left */}
        <div className="absolute -left-[10%] top-[15%] h-[60vh] w-[60vw] rounded-full bg-[radial-gradient(ellipse,rgba(59,130,246,0.07),transparent_65%)] blur-3xl" />

        {/* Proof  violet right */}
        <div className="absolute -right-[5%] top-[28%] h-[60vh] w-[55vw] rounded-full bg-[radial-gradient(ellipse,rgba(167,139,250,0.08),transparent_65%)] blur-3xl" />

        {/* Principles  teal center */}
        <div className="absolute left-[15%] top-[40%] h-[55vh] w-[70vw] rounded-full bg-[radial-gradient(ellipse,rgba(20,184,166,0.06),transparent_65%)] blur-3xl" />

        {/* WhoFor  sky blue left */}
        <div className="absolute -left-[10%] top-[53%] h-[60vh] w-[55vw] rounded-full bg-[radial-gradient(ellipse,rgba(56,189,248,0.07),transparent_65%)] blur-3xl" />

        {/* Process  indigo right */}
        <div className="absolute -right-[5%] top-[65%] h-[55vh] w-[55vw] rounded-full bg-[radial-gradient(ellipse,rgba(99,102,241,0.08),transparent_65%)] blur-3xl" />

        {/* Stats / Mission  cyan center */}
        <div className="absolute left-[10%] top-[77%] h-[55vh] w-[80vw] rounded-full bg-[radial-gradient(ellipse,rgba(34,211,238,0.06),transparent_65%)] blur-3xl" />

        {/* CTA  violet left, sky blue right */}
        <div className="absolute -left-[5%] top-[90%] h-[50vh] w-[55vw] rounded-full bg-[radial-gradient(ellipse,rgba(167,139,250,0.08),transparent_65%)] blur-3xl" />
        <div className="absolute -right-[5%] top-[92%] h-[45vh] w-[50vw] rounded-full bg-[radial-gradient(ellipse,rgba(125,211,252,0.07),transparent_65%)] blur-3xl" />
      </div>

      {/* Navbar */}
      <div className="relative z-20">
        <Navbar />
      </div>

      {/* Sections */}
      <div className="relative z-10">
        <Hero />
        <Hairline />
        <Gears />
        <Hairline />
        <Proof />
        <Hairline />
        <Principles />
        <Hairline />
        <WhoFor />
        <Hairline />
        <Process />
        <Hairline />
        <Stats />
        <Hairline />
        <MissionVision />
        <Hairline />
        <Values />
        <CTA />
      </div>
    </main>
  );
}
