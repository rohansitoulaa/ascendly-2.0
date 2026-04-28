"use client";

import { useRef, useEffect, type ReactNode } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import { Counter } from "@/animations/Counter";
import VariableProximity from "@/animations/VariableProximity";
import Navbar from "@/landingPage/sections/Navbar";
import Button from "@/design/Button";
import dynamic from "next/dynamic";

const ShapeGrid = dynamic(() => import("@/animations/ShapeGrid"), { ssr: false });

/* ─── GSAP registration (client-only) ──────────────────────────── */

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);
}

/* ─── Layout Primitives ─────────────────────────────────────────── */

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

type KickerColor =
  | "default"
  | "cyan"
  | "violet"
  | "teal"
  | "indigo"
  | "emerald";

const KICKER_TEXT: Record<KickerColor, string> = {
  default: "text-white/45",
  cyan: "text-cyan-400/70",
  violet: "text-violet-400/70",
  teal: "text-teal-400/70",
  indigo: "text-indigo-400/70",
  emerald: "text-emerald-400/70",
};

const KICKER_LINE: Record<KickerColor, string> = {
  default: "bg-white/25",
  cyan: "bg-cyan-400/30",
  violet: "bg-violet-400/30",
  teal: "bg-teal-400/30",
  indigo: "bg-indigo-400/30",
  emerald: "bg-emerald-400/30",
};

const ABOUT_HERO_PROXIMITY = {
  // Cursor influence radius in pixels. Keep between 120 and 240 so the response stays local and readable.
  radius: 180,
  // Resting variable-font settings for the headline. Keep the weight restrained so the text still reads cleanly at rest.
  fromFontVariationSettings: "'wght' 360, 'wdth' 108, 'opsz' 14",
  // Peak variable-font settings near the pointer. Keep the width and weight increase controlled to avoid distorted letterforms.
  toFontVariationSettings: "'wght' 860, 'wdth' 142, 'opsz' 144",
} as const;

function Kicker({
  children,
  color = "default",
}: {
  children: ReactNode;
  color?: KickerColor;
}) {
  return (
    <div
      className={`flex items-center gap-3 text-[0.72rem] font-medium uppercase tracking-[0.22em] ${KICKER_TEXT[color]}`}
    >
      <span className={`h-px w-8 ${KICKER_LINE[color]}`} />
      <span>{children}</span>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   SECTION 1 · HERO
═══════════════════════════════════════════════════════════════════ */

function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const kickerRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const line1Ref = useRef<HTMLSpanElement>(null);
  const line2Ref = useRef<HTMLSpanElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);
  const subRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.fromTo(
        kickerRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.7 },
        0.1,
      )
        .fromTo(
          line1Ref.current,
          { opacity: 0, y: 48, clipPath: "inset(0 0 100% 0)" },
          { opacity: 1, y: 0, clipPath: "inset(0 0 0% 0)", duration: 1.0 },
          0.25,
        )
        .fromTo(
          line2Ref.current,
          { opacity: 0, y: 48, clipPath: "inset(0 0 100% 0)" },
          { opacity: 1, y: 0, clipPath: "inset(0 0 0% 0)", duration: 1.0 },
          0.4,
        )
        .fromTo(
          bodyRef.current,
          { opacity: 0, y: 28 },
          { opacity: 1, y: 0, duration: 0.85 },
          0.6,
        )
        .fromTo(
          subRef.current,
          { opacity: 0, y: 22 },
          { opacity: 1, y: 0, duration: 0.8 },
          0.75,
        )
        .fromTo(
          badgeRef.current,
          { opacity: 0, x: -16 },
          { opacity: 1, x: 0, duration: 0.65 },
          0.85,
        )
        .fromTo(
          ctaRef.current,
          { opacity: 0, y: 18 },
          { opacity: 1, y: 0, duration: 0.7 },
          0.95,
        );

      // Subtle scroll parallax on the headline
      if (sectionRef.current) {
        gsap.to([line1Ref.current, line2Ref.current], {
          y: -60,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "bottom top",
            scrub: 1.2,
          },
        });
      }
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef as React.RefObject<HTMLElement>}
      className="relative mx-auto w-full max-w-none pt-36 pb-28 sm:pt-44 sm:pb-36 overflow-hidden"
    >
      {/* Hero-local hexagon grid */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.13]">
        <ShapeGrid
          direction="diagonal"
          speed={0.3}
          borderColor="rgba(34,211,238,0.25)"
          squareSize={52}
          hoverFillColor="rgba(34,211,238,0.14)"
          shape="hexagon"
        />
      </div>
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(34,211,238,0.07), transparent 70%), radial-gradient(ellipse 60% 50% at 80% 100%, rgba(167,139,250,0.06), transparent 70%)",
        }}
      />

      <div className="relative z-10 mx-auto max-w-[1240px] px-6 sm:px-8 lg:px-10">
        <div
          ref={kickerRef as React.RefObject<HTMLDivElement>}
          style={{ opacity: 0 }}
        >
          <Kicker color="cyan">WHO THIS IS FOR · REVENUE SYSTEMS</Kicker>
        </div>

        <h1
          ref={headingRef as React.RefObject<HTMLHeadingElement>}
          className="mt-8 text-[2.75rem] font-light leading-[1.02] tracking-[-0.035em] sm:text-[4rem] lg:text-[5.25rem]"
        >
          <VariableProximity
            ref={line1Ref}
            label={"Most teams think they need more leads."}
            fromFontVariationSettings={
              ABOUT_HERO_PROXIMITY.fromFontVariationSettings
            }
            toFontVariationSettings={
              ABOUT_HERO_PROXIMITY.toFontVariationSettings
            }
            containerRef={headingRef}
            radius={ABOUT_HERO_PROXIMITY.radius}
            falloff="gaussian"
            className="text-white"
            style={{ display: "block", opacity: 0 }}
          />
          <VariableProximity
            ref={line2Ref}
            label="They don’t."
            fromFontVariationSettings={
              ABOUT_HERO_PROXIMITY.fromFontVariationSettings
            }
            toFontVariationSettings={
              ABOUT_HERO_PROXIMITY.toFontVariationSettings
            }
            containerRef={headingRef}
            radius={ABOUT_HERO_PROXIMITY.radius}
            falloff="gaussian"
            className="mt-1 text-white"
            style={{ display: "block", opacity: 0 }}
          />
        </h1>

        <div
          ref={bodyRef as React.RefObject<HTMLDivElement>}
          className="mt-12"
          style={{ opacity: 0 }}
        >
          <p className="max-w-[58ch] text-[1.1rem] leading-[1.65] text-white/50 italic sm:text-[1.2rem]">
            They lack the systems to turn pipeline into revenue.
          </p>
          <div className="mt-10 grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
            <p className="max-w-[52ch] text-[1.05rem] leading-[1.75] text-white/65 sm:text-[1.125rem]">
              Pipeline exists, but it&rsquo;s inconsistent, unstructured, and
              under-converted. That&rsquo;s where growth stalls.
            </p>
            <p className="max-w-[52ch] text-[1.05rem] leading-[1.75] text-white/55 sm:text-[1.125rem]">
              Ascendly is built for companies that already have demand
              but lack a system to scale it. We don&rsquo;t add more noise. We
              install the infrastructure that turns pipeline into predictable
              revenue.
            </p>
          </div>
        </div>

        <div
          ref={subRef as React.RefObject<HTMLDivElement>}
          className="mt-8"
          style={{ opacity: 0 }}
        >
          <p className="text-[0.98rem] leading-[1.65] text-white/40 italic">
            This only works if you already have deal flow.
          </p>
        </div>

        <div
          ref={badgeRef as React.RefObject<HTMLDivElement>}
          className="mt-8"
          style={{ opacity: 0 }}
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-cyan-500/25 bg-cyan-500/[0.07] px-5 py-2 text-[0.82rem] font-medium tracking-[0.12em] text-cyan-400/80 uppercase">
            <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 animate-pulse" />
            Not for early-stage teams. Built for companies ready to scale revenue.
          </span>
        </div>

        <div
          ref={ctaRef as React.RefObject<HTMLDivElement>}
          className="mt-14 flex flex-wrap items-center gap-4"
          style={{ opacity: 0 }}
        >
          <Button
            variant="primary"
            size="lg"
            href="https://calendly.com/ascendly"
            magnetic
          >
            Book a Strategy Call
          </Button>
          <Button variant="ghost" size="lg" href="#process" magnetic={false}>
            See our Process
          </Button>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   SECTION 2 · FOUNDER
═══════════════════════════════════════════════════════════════════ */

const FOUNDER_SECTION = {
  // Counter duration in seconds for founder proof metrics. Keep between 1.8 and 3.0 so the values feel responsive without snapping.
  statCounterDuration: 2.4,
} as const;

type FounderStat =
  | {
      label: string;
      kind: "single";
      value: number;
      prefix?: string;
      suffix?: string;
    }
  | {
      label: string;
      kind: "range";
      start: number;
      end: number;
      separator?: string;
    };

const FOUNDER_STATS: readonly FounderStat[] = [
  { label: "Campaigns executed", kind: "single", value: 500, suffix: "+" },
  {
    label: "Pipeline generated",
    kind: "single",
    value: 50,
    prefix: "$",
    suffix: "M+",
  },
  {
    label: "Opps/month/client",
    kind: "range",
    start: 15,
    end: 25,
    separator: "\u2013",
  },
];

function renderFounderStatValue(stat: FounderStat) {
  if (stat.kind === "range") {
    return (
      <span className="inline-flex items-baseline whitespace-nowrap">
        <Counter
          to={stat.start}
          duration={FOUNDER_SECTION.statCounterDuration}
          className="tabular-nums"
        />
        <span aria-hidden>{stat.separator ?? "\u2013"}</span>
        <Counter
          to={stat.end}
          duration={FOUNDER_SECTION.statCounterDuration}
          className="tabular-nums"
        />
      </span>
    );
  }

  return (
    <Counter
      to={stat.value}
      prefix={stat.prefix}
      suffix={stat.suffix}
      duration={FOUNDER_SECTION.statCounterDuration}
      className="tabular-nums"
    />
  );
}

function Founder() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const imgWrapRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        imgWrapRef.current,
        { opacity: 0, scale: 0.93, y: 50 },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 1.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 78%",
            once: true,
          },
        },
      );
      gsap.fromTo(
        textRef.current,
        { opacity: 0, x: 40 },
        {
          opacity: 1,
          x: 0,
          duration: 1.0,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 78%",
            once: true,
          },
        },
      );
      gsap.fromTo(
        gsap.utils.toArray(".founder-stat", statsRef.current!),
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.12,
          duration: 0.75,
          ease: "power3.out",
          scrollTrigger: {
            trigger: statsRef.current,
            start: "top 82%",
            once: true,
          },
        },
      );
      // Image parallax on scroll
      gsap.to(imgWrapRef.current, {
        y: -50,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1.5,
        },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={sectionRef} className="relative">
      {/* Circle grid bg for this section */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.08]">
        <ShapeGrid
          direction="up"
          speed={0.18}
          borderColor="rgba(167,139,250,0.28)"
          squareSize={68}
          hoverFillColor="rgba(167,139,250,0.12)"
          shape="circle"
        />
      </div>

      <Section className="py-28 sm:py-36">
        <div className="grid gap-16 lg:grid-cols-[1fr_1.2fr] lg:gap-24 items-center">
          {/* Image block */}
          <div ref={imgWrapRef} className="relative" style={{ opacity: 0 }}>
            <div className="relative overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.02]">
              <div
                className="absolute inset-0 z-10 pointer-events-none"
                style={{
                  background:
                    "linear-gradient(to top, rgba(5,6,10,0.6) 0%, transparent 40%)",
                }}
              />
              <Image
                src="https://res.cloudinary.com/dzsiqzfub/image/upload/v1773040422/Gemini_Generated_Image_87cnuw87cnuw87cn_or89ar.png"
                alt="Rosis Sitoula  Revenue Systems Architect"
                width={600}
                height={720}
                className="w-full h-auto object-cover"
                priority
              />
            </div>
            {/* Accent orb */}
            <div className="absolute -bottom-8 -right-8 h-48 w-48 rounded-full bg-violet-500/10 blur-3xl pointer-events-none" />
          </div>

          {/* Text */}
          <div ref={textRef} style={{ opacity: 0 }}>
            <h2 className="mt-6 text-[2.75rem] font-light tracking-[-0.03em] text-white sm:text-[3.5rem]">
              Rosis Sitoula
            </h2>
            <p className="mt-2 text-[1rem] tracking-[0.08em] text-violet-400/70 uppercase font-medium">
              Revenue Systems Architect
            </p>
            <p className="mt-8 max-w-[46ch] text-[1.05rem] leading-[1.75] text-white/60">
              Built from zero with a Gmail account and a belief that outbound
              could still be done right. Now engineering revenue systems that
              turn pipeline into predictable outcomes for B2B companies where
              every deal matters.
            </p>

            <div ref={statsRef} className="mt-12 grid grid-cols-3 gap-6">
              {FOUNDER_STATS.map((stat) => (
                <div key={stat.label} className="founder-stat">
                  <div className="text-[1.85rem] font-light tracking-[-0.035em] text-white sm:text-[2.15rem]">
                    {renderFounderStatValue(stat)}
                  </div>
                  <div className="mt-1.5 text-[0.8rem] leading-[1.45] text-white/45">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>

            {false && (
              <div className="mt-12 grid grid-cols-3 gap-6">
                {[
                  { value: "500+", label: "Campaigns executed" },
                  { value: "$50M+", label: "Pipeline generated" },
                  { value: "15–25", label: "Opps/month/client" },
                ].map((s) => (
                  <div key={s.label} className="founder-stat">
                    <div className="text-[1.85rem] font-light tracking-[-0.035em] text-white sm:text-[2.15rem]">
                      {s.value}
                    </div>
                    <div className="mt-1.5 text-[0.8rem] leading-[1.45] text-white/45">
                      {s.label}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </Section>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   SECTION 3 · CORE POSITIONING (GEARS)
═══════════════════════════════════════════════════════════════════ */

const GEARS = [
  {
    label: "Gear 01",
    title: "Pipeline Conversion System",
    body: "Inbound signals, CRM hygiene, routing and follow-up discipline  everything that turns an opportunity into a closed deal. Every opportunity is captured, worked until it closes or disqualifies, not forgotten after the first call.",
    dotClass: "bg-cyan-500",
    borderClass: "border-cyan-500/20 hover:border-cyan-500/45",
    gridBorder: "rgba(34, 211, 238, 0.14)",
    gridFill: "rgba(34, 211, 238, 0.10)",
    direction: "right" as const,
    accentClass: "text-cyan-400",
    shape: "square" as const,
  },
  {
    label: "Gear 02",
    title: "The Outbound Engine",
    body: "Precision prospecting built around ICP and intent. Multi-channel, measured, and operated like a system  not a volume game. Bad pipeline equals wasted sales time.",
    dotClass: "bg-violet-500",
    borderClass: "border-violet-500/20 hover:border-violet-500/45",
    gridBorder: "rgba(167, 139, 250, 0.14)",
    gridFill: "rgba(167, 139, 250, 0.10)",
    direction: "up" as const,
    accentClass: "text-violet-400",
    shape: "triangle" as const,
  },
];

function Gears() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const noteRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        headRef.current,
        { opacity: 0, y: 36 },
        {
          opacity: 1,
          y: 0,
          duration: 0.95,
          ease: "power3.out",
          scrollTrigger: {
            trigger: headRef.current,
            start: "top 82%",
            once: true,
          },
        },
      );
      gsap.fromTo(
        gsap.utils.toArray(".gear-card", cardsRef.current!),
        { opacity: 0, y: 60, scale: 0.97 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          stagger: 0.15,
          duration: 1.0,
          ease: "power3.out",
          scrollTrigger: {
            trigger: cardsRef.current,
            start: "top 80%",
            once: true,
          },
        },
      );
      gsap.fromTo(
        noteRef.current,
        { opacity: 0, y: 18 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: noteRef.current,
            start: "top 88%",
            once: true,
          },
        },
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={sectionRef} className="relative">
      <Section id="systems" className="py-28 sm:py-36">
        <div ref={headRef} style={{ opacity: 0 }}>
          <Kicker color="violet">The System</Kicker>
          <h2 className="mt-6 text-[2rem] font-light leading-[1.05] tracking-[-0.03em] text-white sm:text-[2.75rem] lg:text-[3.25rem]">
            Pipeline is built in two gears.
            <span className="block text-white/40">
              Revenue comes from both.
            </span>
          </h2>
          <p className="mt-6 max-w-[52ch] text-[1rem] leading-[1.7] text-white/50">
            We treat outreach as a precision manufacturing process, not a volume
            game. Because bad pipeline = wasted sales time.
          </p>
        </div>

        <div
          ref={cardsRef}
          className="mt-16 grid gap-6 md:grid-cols-2 md:gap-8"
        >
          {GEARS.map((g) => (
            <div
              key={g.label}
              className={`gear-card group relative h-full overflow-hidden rounded-2xl border bg-white/[0.015] p-8 backdrop-blur-[2px] transition-colors duration-500 sm:p-10 ${g.borderClass}`}
              style={{ opacity: 0 }}
            >
              <div className="pointer-events-none absolute inset-0 opacity-[0.22]">
                <ShapeGrid
                  direction={g.direction}
                  speed={0.22}
                  borderColor={g.gridBorder}
                  squareSize={34}
                  hoverFillColor={g.gridFill}
                  shape={g.shape}
                />
              </div>
              <div className="relative z-10">
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-2 text-[0.72rem] font-medium uppercase tracking-[0.22em] text-white/40">
                    <span
                      className={`h-1.5 w-1.5 rounded-full ${g.dotClass}`}
                    />
                    {g.label}
                  </span>
                  <span className="h-px w-10 bg-white/20 transition-all duration-500 group-hover:w-16 group-hover:bg-white/40" />
                </div>
                <h3
                  className={`mt-8 text-[1.65rem] font-light tracking-[-0.02em] text-white sm:text-[2rem]`}
                >
                  {g.title}
                </h3>
                <p className="mt-5 max-w-[46ch] text-[0.98rem] leading-[1.7] text-white/55">
                  {g.body}
                </p>
              </div>
            </div>
          ))}
        </div>

        <p
          ref={noteRef}
          className="mt-14 max-w-[48ch] text-[0.95rem] leading-[1.65] text-white/45"
          style={{ opacity: 0 }}
        >
          Every opportunity is captured, worked until it closes or disqualifies
           not forgotten after the first call.
        </p>
      </Section>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   SECTION 4 · PROOF
═══════════════════════════════════════════════════════════════════ */

function Proof() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".proof-head",
        { opacity: 0, y: 36 },
        {
          opacity: 1,
          y: 0,
          duration: 0.95,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".proof-head",
            start: "top 82%",
            once: true,
          },
        },
      );
      gsap.fromTo(
        ".proof-item",
        { opacity: 0, y: 48, x: -20 },
        {
          opacity: 1,
          y: 0,
          x: 0,
          stagger: 0.16,
          duration: 0.95,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 76%",
            once: true,
          },
        },
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={sectionRef} className="relative">
      <div className="pointer-events-none absolute inset-0 opacity-[0.07]">
        <ShapeGrid
          direction="left"
          speed={0.12}
          borderColor="rgba(52,211,153,0.28)"
          squareSize={44}
          hoverFillColor="rgba(52,211,153,0.12)"
          shape="triangle"
        />
      </div>

      <Section id="proof" className="py-28 sm:py-36">
        <div className="proof-head" style={{ opacity: 0 }}>
          <Kicker color="emerald">What We Build</Kicker>
          <h2 className="mt-6 text-[2rem] font-light leading-[1.05] tracking-[-0.03em] text-white sm:text-[2.75rem] lg:text-[3.25rem]">
            Most teams only build pipeline.
            <span className="block text-white/40">
              We build what happens after.
            </span>
          </h2>
        </div>

        <div className="mt-16 grid gap-10 md:grid-cols-2 md:gap-14">
          {[
            {
              kpi: "Qualified Opportunities Booked ✅",
              line: "Booked with qualified buyers, not noise.",
              borderClass: "border-l-2 border-emerald-500/30",
            },
            {
              kpi: "Stalled Deals Recovered ✅",
              line: "Re-engaged, re-qualified, and moved to close.",
              borderClass: "border-l-2 border-cyan-500/30",
            },
          ].map((it) => (
            <div
              key={it.kpi}
              className={`proof-item pl-8 ${it.borderClass}`}
              style={{ opacity: 0 }}
            >
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
          ))}
        </div>
      </Section>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   SECTION 5 · CTA STRIP
═══════════════════════════════════════════════════════════════════ */

function CTAStrip() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".cta-strip-el",
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.1,
          duration: 0.85,
          ease: "power3.out",
          scrollTrigger: { trigger: ref.current, start: "top 84%", once: true },
        },
      );
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={ref}
      className="mx-auto max-w-[1240px] px-6 sm:px-8 lg:px-10 py-16"
    >
      <div className="flex flex-wrap items-center gap-5">
        <div className="cta-strip-el" style={{ opacity: 0 }}>
          <Button
            variant="primary"
            size="lg"
            href="https://calendly.com/ascendly"
          >
            Book a Strategy Call
          </Button>
        </div>
        <div className="cta-strip-el" style={{ opacity: 0 }}>
          <Button variant="ghost" size="lg" href="#process" magnetic={false}>
            See our Process
          </Button>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   SECTION 6 · PHILOSOPHY / DIFFERENTIATION
═══════════════════════════════════════════════════════════════════ */

const PRINCIPLES = [
  {
    num: "01",
    title: "No Wasted Pipeline",
    body: "Generating leads that don't convert is expensive. We focus only on opportunities worth closing.",
    top: "border-t-[2px] border-cyan-500/50",
    numClass: "text-cyan-400",
  },
  {
    num: "02",
    title: "No Blind Automation",
    body: "Automation without control kills deals. Every touchpoint is intentional and timed.",
    top: "border-t-[2px] border-violet-500/50",
    numClass: "text-violet-400",
  },
  {
    num: "03",
    title: "No Dead Deals",
    body: "Most pipelines leak after the first call. We make sure every deal is worked until the outcome.",
    top: "border-t-[2px] border-teal-500/50",
    numClass: "text-teal-400",
  },
];

function Philosophy() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".phil-head",
        { opacity: 0, y: 36 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".phil-head",
            start: "top 82%",
            once: true,
          },
        },
      );
      gsap.fromTo(
        ".phil-card",
        { opacity: 0, y: 56, scale: 0.96 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          stagger: 0.12,
          duration: 0.95,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
            once: true,
          },
        },
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={sectionRef} className="relative">
      <Section id="philosophy" className="py-28 sm:py-36">
        <div className="phil-head" style={{ opacity: 0 }}>
          <Kicker color="teal">Operating Philosophy</Kicker>
          <h2 className="mt-6 text-[2rem] font-light leading-[1.05] tracking-[-0.03em] text-white sm:text-[2.75rem] lg:text-[3.25rem]">
            Volume creates pipeline.
            <span className="block text-white/40">
              Precision creates revenue.
            </span>
          </h2>
          <p className="mt-6 max-w-[48ch] text-[1rem] leading-[1.7] text-white/50">
            Every opportunity we generate is tracked, followed up, and worked
            until it closes or disqualifies.
          </p>
        </div>

        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {PRINCIPLES.map((p) => (
            <div
              key={p.num}
              className={`phil-card h-full rounded-xl border border-white/[0.07] bg-white/[0.015] p-8 transition-colors duration-500 hover:bg-white/[0.03] sm:p-10 ${p.top}`}
              style={{ opacity: 0 }}
            >
              <div
                className={`text-[0.72rem] font-medium uppercase tracking-[0.22em] ${p.numClass}`}
              >
                {p.num}
              </div>
              <h3 className="mt-8 text-[1.35rem] font-light tracking-[-0.015em] text-white sm:text-[1.5rem]">
                {p.title}
              </h3>
              <p className="mt-4 text-[0.95rem] leading-[1.7] text-white/55">
                {p.body}
              </p>
            </div>
          ))}
        </div>
      </Section>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   SECTION 7 · WHO WE WORK WITH
═══════════════════════════════════════════════════════════════════ */

const WHO_ITEMS = [
  {
    num: "01",
    title: "B2B Companies with $30k+ Customer Value",
    body: "Deals that require real sales effort, not quick conversions.",
    color: "text-cyan-400",
  },
  {
    num: "02",
    title: "Teams with Long or Multi-Step Sales Cycles",
    body: "Where follow-ups, nurturing, and timing decide the deal.",
    color: "text-violet-400",
  },
  {
    num: "03",
    title: "Companies Generating Pipeline but Not Converting Enough",
    body: "Leads exist, but revenue isn't predictable.",
    color: "text-teal-400",
  },
  {
    num: "04",
    title: "Founder-Led or Lean Sales Teams",
    body: "Where every opportunity matters and bandwidth is limited.",
    color: "text-indigo-400",
  },
];

function WhoFor() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".who-head",
        { opacity: 0, y: 36 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: { trigger: ".who-head", start: "top 82%", once: true },
        },
      );
      gsap.fromTo(
        ".who-card",
        { opacity: 0, y: 44, x: -16 },
        {
          opacity: 1,
          y: 0,
          x: 0,
          stagger: 0.1,
          duration: 0.85,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 74%",
            once: true,
          },
        },
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={sectionRef} className="relative">
      <div className="pointer-events-none absolute inset-0 opacity-[0.07]">
        <ShapeGrid
          direction="right"
          speed={0.14}
          borderColor="rgba(99,102,241,0.28)"
          squareSize={56}
          hoverFillColor="rgba(99,102,241,0.12)"
          shape="hexagon"
        />
      </div>

      <Section id="who" className="py-28 sm:py-36">
        <div className="who-head" style={{ opacity: 0 }}>
          <Kicker color="indigo">Who This Is For</Kicker>
          <h2 className="mt-6 text-[2rem] font-light leading-[1.05] tracking-[-0.03em] text-white sm:text-[2.5rem]">
            We work with B2B teams where pipeline doesn&rsquo;t just need to be
            generated,
            <span className="text-white/40">
              {" "}
              it needs to be converted into revenue.
            </span>
          </h2>
          <p className="mt-6 max-w-[56ch] text-[1rem] leading-[1.7] text-white/50">
            If your deals require multiple touchpoints, follow-ups, and real
            sales effort, this is built for you.
          </p>
        </div>

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {WHO_ITEMS.map((w) => (
            <div
              key={w.num}
              className="who-card rounded-xl border border-white/[0.07] bg-white/[0.015] p-7 transition-colors duration-500 hover:bg-white/[0.03] hover:border-white/[0.14]"
              style={{ opacity: 0 }}
            >
              <span
                className={`text-[0.72rem] font-medium uppercase tracking-[0.22em] ${w.color}`}
              >
                {w.num}
              </span>
              <h3 className="mt-5 text-[1.05rem] font-light leading-[1.4] tracking-[-0.01em] text-white">
                {w.title}
              </h3>
              <p className="mt-3 text-[0.88rem] leading-[1.65] text-white/50">
                {w.body}
              </p>
            </div>
          ))}
        </div>
      </Section>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   SECTION 8 · PROCESS
═══════════════════════════════════════════════════════════════════ */

const PROCESS_STEPS = [
  {
    step: "Step 01",
    title: "Revenue Infrastructure",
    body: "We set up your outbound + inbound systems, domains, workflows, tracking, and CRM, so every lead is captured, routed, and ready to convert.",
    color: "text-cyan-400",
    dot: "bg-cyan-500",
  },
  {
    step: "Step 02",
    title: "ICP & Decision Intelligence",
    body: "We identify high-value accounts and real buyers using data, intent signals, and enrichment  no spray-and-pray lists.",
    color: "text-violet-400",
    dot: "bg-violet-500",
  },
  {
    step: "Step 03",
    title: "Multi-Channel Engagement",
    body: "Personalized outreach + inbound capture working together  emails, LinkedIn, and intent-driven workflows that start real conversations.",
    color: "text-teal-400",
    dot: "bg-teal-500",
  },
  {
    step: "Step 04",
    title: "Pipeline → Revenue",
    body: "We qualify, route, and follow up, ensuring every opportunity has a clear path to a closed deal  not just a booked meeting.",
    color: "text-indigo-400",
    dot: "bg-indigo-500",
  },
];

function Process() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".process-head",
        { opacity: 0, y: 36 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".process-head",
            start: "top 82%",
            once: true,
          },
        },
      );
      gsap.fromTo(
        ".process-row",
        { opacity: 0, x: -32 },
        {
          opacity: 1,
          x: 0,
          stagger: 0.13,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 72%",
            once: true,
          },
        },
      );
      // Connector line grows as you scroll
      gsap.fromTo(
        ".process-connector",
        { scaleY: 0, transformOrigin: "top center" },
        {
          scaleY: 1,
          duration: 1.5,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
            once: true,
          },
        },
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={sectionRef} className="relative">
      <Section id="process" className="py-28 sm:py-36">
        <div className="process-head" style={{ opacity: 0 }}>
          <Kicker>The Process</Kicker>
          <h2 className="mt-6 text-[2rem] font-light leading-[1.05] tracking-[-0.03em] text-white sm:text-[2.75rem] lg:text-[3.25rem]">
            From Pipeline to predictable revenue.
          </h2>
          <p className="mt-4 max-w-[48ch] text-[1rem] leading-[1.7] text-white/50">
            Every step engineered, from lead capture to deal conversion.
          </p>
        </div>

        <div className="relative mt-20">
          {/* Vertical connector */}
          <div
            className="process-connector absolute left-[17px] top-8 bottom-8 w-px bg-gradient-to-b from-cyan-500/40 via-violet-500/30 to-indigo-500/20 sm:left-[139px] hidden sm:block"
            style={{ transformOrigin: "top center" }}
          />

          {PROCESS_STEPS.map((s) => (
            <div
              key={s.step}
              className="process-row group grid grid-cols-[auto_1fr] gap-8 border-t border-white/[0.07] py-10 transition-colors duration-500 hover:border-white/[0.18] sm:grid-cols-[140px_1fr] sm:gap-12 sm:py-12"
              style={{ opacity: 0 }}
            >
              <div className="flex items-start gap-3 pt-1">
                <span
                  className={`h-2 w-2 mt-1 rounded-full flex-shrink-0 ${s.dot}`}
                />
                <span
                  className={`text-[0.72rem] font-medium uppercase tracking-[0.22em] ${s.color}`}
                >
                  {s.step}
                </span>
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
          ))}
          <div className="border-t border-white/[0.07]" />
        </div>
      </Section>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   SECTION 9 · JOURNEY TIMELINE (zigzag road with driving car)
═══════════════════════════════════════════════════════════════════ */

type StopColor = "cyan" | "violet" | "teal" | "indigo" | "emerald";

type Stop = {
  x: number;
  y: number;
  year: string;
  stop: string;
  title: string;
  body: string;
  color: StopColor;
};

const STOPS: Stop[] = [
  {
    x: 400,
    y: 90,
    year: "2022",
    stop: "Stop 01",
    title: "The Spark",
    body: "Started as a one-person hustle with a Gmail, a scraping tool, and a belief that outbound could still be done right.",
    color: "cyan",
  },
  {
    x: 160,
    y: 360,
    year: "2022",
    stop: "Stop 02",
    title: "First Clients",
    body: "Cold emails went out. Replies came in. In under 30 days, we had our first paying client  all outbound, no fluff.",
    color: "violet",
  },
  {
    x: 640,
    y: 620,
    year: "2023",
    stop: "Stop 03",
    title: "Building the Engine",
    body: "We expanded from solo ops to a core team. Built smarter targeting, tighter systems, and campaigns that booked.",
    color: "teal",
  },
  {
    x: 160,
    y: 880,
    year: "2023",
    stop: "Stop 04",
    title: "The ChillPitch Era",
    body: "We branded up. ChillPitch became known for lean, fast outbound execution that actually filled calendars.",
    color: "indigo",
  },
  {
    x: 640,
    y: 1140,
    year: "2024",
    stop: "Stop 05",
    title: "The Results Engine",
    body: "We dialed it in. Emails got sharper. Lists got cleaner. Clients got meetings  and stuck around.",
    color: "emerald",
  },
  {
    x: 400,
    y: 1510,
    year: "2025",
    stop: "Stop 06",
    title: "Ascendly Launch",
    body: "ChillPitch was our beta. Ascendly.one is the product. More refined, more precise, and ready to scale outbound for the next generation of B2B.",
    color: "cyan",
  },
];

const JOURNEY_VB_W = 800;
const JOURNEY_VB_H = 1600;

const JOURNEY_ROAD_PATH =
  "M 400 90 C 400 180 160 260 160 360 C 160 460 640 540 640 620 C 640 720 160 800 160 880 C 160 980 640 1060 640 1140 C 640 1260 400 1420 400 1510";

const CARD_PLACEMENTS: Array<{
  side: "left" | "right";
  dx: number;
  dy: number;
}> = [
  { side: "right", dx: 70, dy: 40 },
  { side: "right", dx: 70, dy: 0 },
  { side: "left", dx: 70, dy: 0 },
  { side: "right", dx: 70, dy: 0 },
  { side: "left", dx: 70, dy: 0 },
  { side: "left", dx: 70, dy: -40 },
];

const STOP_COLOR: Record<
  StopColor,
  { border: string; chipBorder: string; chipBg: string; chipText: string }
> = {
  cyan: {
    border: "border-cyan-500/25",
    chipBorder: "border-cyan-500/25",
    chipBg: "bg-cyan-500/[0.08]",
    chipText: "text-cyan-400/85",
  },
  violet: {
    border: "border-violet-500/25",
    chipBorder: "border-violet-500/25",
    chipBg: "bg-violet-500/[0.08]",
    chipText: "text-violet-400/85",
  },
  teal: {
    border: "border-teal-500/25",
    chipBorder: "border-teal-500/25",
    chipBg: "bg-teal-500/[0.08]",
    chipText: "text-teal-400/85",
  },
  indigo: {
    border: "border-indigo-500/25",
    chipBorder: "border-indigo-500/25",
    chipBg: "bg-indigo-500/[0.08]",
    chipText: "text-indigo-400/85",
  },
  emerald: {
    border: "border-emerald-500/25",
    chipBorder: "border-emerald-500/25",
    chipBg: "bg-emerald-500/[0.08]",
    chipText: "text-emerald-400/85",
  },
};

function Journey() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const roadRef = useRef<SVGPathElement>(null);
  const roadTrailRef = useRef<SVGPathElement>(null);
  const carRef = useRef<SVGGElement>(null);
  const dotsRef = useRef<(SVGGElement | null)[]>([]);

  useEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".journey-head",
        { opacity: 0, y: 36 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".journey-head",
            start: "top 82%",
            once: true,
          },
        },
      );

      // Scroll-driven road + car timeline (desktop only)
      if (
        roadRef.current &&
        roadTrailRef.current &&
        carRef.current &&
        containerRef.current
      ) {
        const length = roadRef.current.getTotalLength();
        gsap.set(roadTrailRef.current, {
          strokeDasharray: length,
          strokeDashoffset: length,
        });
        gsap.set(carRef.current, { autoAlpha: 0 });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 70%",
            end: "bottom 30%",
            scrub: 0.8,
          },
        });

        tl.to(carRef.current, { autoAlpha: 1, duration: 0.02 }, 0);
        tl.to(
          roadTrailRef.current,
          { strokeDashoffset: 0, ease: "none", duration: 1 },
          0,
        );
        tl.to(
          carRef.current,
          {
            motionPath: {
              path: roadRef.current,
              align: roadRef.current,
              alignOrigin: [0.5, 0.5],
              autoRotate: 90,
            },
            ease: "none",
            duration: 1,
          },
          0,
        );

        // Pulse each stop when the car passes over it
        STOPS.forEach((s, i) => {
          const dot = dotsRef.current[i];
          if (!dot) return;
          gsap.set(dot, { transformOrigin: `${s.x}px ${s.y}px` });
          const progress = i / (STOPS.length - 1);
          tl.to(
            dot,
            {
              scale: 1.35,
              duration: 0.02,
              ease: "power2.out",
              yoyo: true,
              repeat: 1,
            },
            Math.max(0, progress - 0.005),
          );
        });
      }

      gsap.utils.toArray<HTMLElement>(".milestone-card").forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 28, scale: 0.96 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.85,
            ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 88%", once: true },
          },
        );
      });

      gsap.fromTo(
        ".journey-mobile-card",
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.12,
          duration: 0.7,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".journey-mobile-list",
            start: "top 80%",
            once: true,
          },
        },
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={sectionRef} className="relative">
      <div className="pointer-events-none absolute inset-0 opacity-[0.06]">
        <ShapeGrid
          direction="diagonal"
          speed={0.1}
          borderColor="rgba(125,211,252,0.22)"
          squareSize={60}
          hoverFillColor="rgba(125,211,252,0.1)"
          shape="circle"
        />
      </div>

      <Section id="journey" className="py-28 sm:py-36">
        <div className="journey-head" style={{ opacity: 0 }}>
          <Kicker color="cyan">Our Journey</Kicker>
          <h2 className="mt-6 text-[2rem] font-light leading-[1.05] tracking-[-0.03em] text-white sm:text-[2.75rem] lg:text-[3.25rem]">
            From a Gmail to a revenue engine.
            <span className="block text-white/40">Every stop, every turn.</span>
          </h2>
          <p className="mt-6 max-w-[56ch] text-[1rem] leading-[1.7] text-white/50">
            Six stops. One road. Scroll to ride the journey from the first cold
            email to Ascendly.
          </p>
        </div>

        {/* DESKTOP · animated zigzag road with driving car */}
        <div
          ref={containerRef}
          className="relative mx-auto mt-20 hidden md:block"
          style={{
            maxWidth: 960,
            aspectRatio: `${JOURNEY_VB_W} / ${JOURNEY_VB_H}`,
          }}
        >
          <svg
            viewBox={`0 0 ${JOURNEY_VB_W} ${JOURNEY_VB_H}`}
            className="absolute inset-0 h-full w-full"
            preserveAspectRatio="xMidYMid meet"
            style={{ overflow: "visible" }}
            aria-hidden
          >
            <defs>
              <linearGradient id="journeyRoadGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0" stopColor="rgba(34,211,238,1)" />
                <stop offset="0.55" stopColor="rgba(125,211,252,1)" />
                <stop offset="1" stopColor="rgba(167,139,250,1)" />
              </linearGradient>
              <linearGradient id="journeyCarBody" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0" stopColor="#111a2e" />
                <stop offset="1" stopColor="#1c2a4a" />
              </linearGradient>
              <radialGradient id="journeyHeadlight" cx="0.5" cy="0.5" r="0.5">
                <stop offset="0" stopColor="rgba(254,243,199,0.95)" />
                <stop offset="1" stopColor="rgba(254,243,199,0)" />
              </radialGradient>
            </defs>

            {/* Soft aura behind road */}
            <path
              d={JOURNEY_ROAD_PATH}
              stroke="rgba(34,211,238,0.12)"
              strokeWidth="48"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{ filter: "blur(10px)" }}
            />

            {/* Road body (asphalt) */}
            <path
              d={JOURNEY_ROAD_PATH}
              stroke="#0b111d"
              strokeWidth="36"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d={JOURNEY_ROAD_PATH}
              stroke="rgba(255,255,255,0.035)"
              strokeWidth="36"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            {/* Invisible reference path for MotionPath + length measurement */}
            <path
              ref={roadRef as React.RefObject<SVGPathElement>}
              d={JOURNEY_ROAD_PATH}
              stroke="none"
              fill="none"
            />

            {/* Road edge lines */}
            <path
              d={JOURNEY_ROAD_PATH}
              stroke="rgba(255,255,255,0.07)"
              strokeWidth="19"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d={JOURNEY_ROAD_PATH}
              stroke="rgba(5,8,14,1)"
              strokeWidth="17"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            {/* Scroll-driven glowing trail (appears behind the car) */}
            <path
              ref={roadTrailRef as React.RefObject<SVGPathElement>}
              d={JOURNEY_ROAD_PATH}
              stroke="url(#journeyRoadGrad)"
              strokeWidth="3"
              strokeLinecap="round"
              fill="none"
              style={{ filter: "drop-shadow(0 0 8px rgba(34,211,238,0.75))" }}
            />

            {/* Stops */}
            {STOPS.map((s, i) => (
              <g
                key={i}
                ref={(el) => {
                  dotsRef.current[i] = el;
                }}
              >
                <circle cx={s.x} cy={s.y} r="30" fill="rgba(34,211,238,0.06)" />
                <circle
                  cx={s.x}
                  cy={s.y}
                  r="15"
                  fill="#080c16"
                  stroke="rgba(34,211,238,0.55)"
                  strokeWidth="1.2"
                />
                <circle
                  cx={s.x}
                  cy={s.y}
                  r="5.5"
                  fill="rgba(125,211,252,1)"
                  style={{
                    filter: "drop-shadow(0 0 6px rgba(34,211,238,0.9))",
                  }}
                />
              </g>
            ))}

            {/* Car (centered at local origin, nose pointing up → autoRotate: 90) */}
            <g
              ref={carRef as React.RefObject<SVGGElement>}
              style={{ opacity: 0 }}
            >
              <ellipse
                cx="0"
                cy="-52"
                rx="26"
                ry="40"
                fill="url(#journeyHeadlight)"
                opacity="0.45"
              />
              <rect
                x="-15"
                y="-26"
                width="30"
                height="52"
                rx="9"
                fill="url(#journeyCarBody)"
                stroke="rgba(34,211,238,0.85)"
                strokeWidth="1.4"
              />
              <path
                d="M -11 -22 L 11 -22 L 9 -10 L -9 -10 Z"
                fill="rgba(125,211,252,0.38)"
              />
              <path
                d="M -9 14 L 9 14 L 11 24 L -11 24 Z"
                fill="rgba(167,139,250,0.22)"
              />
              <circle cx="-8" cy="-24" r="2" fill="#fef3c7" />
              <circle cx="8" cy="-24" r="2" fill="#fef3c7" />
              <circle cx="-8" cy="24" r="1.5" fill="#ef4444" />
              <circle cx="8" cy="24" r="1.5" fill="#ef4444" />
              <rect
                x="-19"
                y="-14"
                width="4"
                height="10"
                rx="1.5"
                fill="#05080f"
              />
              <rect
                x="15"
                y="-14"
                width="4"
                height="10"
                rx="1.5"
                fill="#05080f"
              />
              <rect
                x="-19"
                y="4"
                width="4"
                height="10"
                rx="1.5"
                fill="#05080f"
              />
              <rect
                x="15"
                y="4"
                width="4"
                height="10"
                rx="1.5"
                fill="#05080f"
              />
            </g>
          </svg>

          {/* Milestone cards positioned at their stops */}
          {STOPS.map((s, i) => {
            const p = CARD_PLACEMENTS[i];
            const topPct = ((s.y + p.dy) / JOURNEY_VB_H) * 100;
            const xPct = (s.x / JOURNEY_VB_W) * 100;
            const c = STOP_COLOR[s.color];
            const positionStyle =
              p.side === "right"
                ? { left: `calc(${xPct}% + ${p.dx}px)` }
                : { right: `calc(${100 - xPct}% + ${p.dx}px)` };
            return (
              <div
                key={i}
                className="absolute w-[300px]"
                style={{
                  top: `${topPct}%`,
                  transform: "translateY(-50%)",
                  ...positionStyle,
                }}
              >
                <div
                  className={`milestone-card rounded-xl border ${c.border} bg-[#080b14]/80 p-6 backdrop-blur-md transition-colors duration-400 hover:bg-[#0b0f1c]/90`}
                  style={{ opacity: 0 }}
                >
                  <div className="flex items-center gap-3">
                    <span
                      className={`inline-flex items-center rounded-full border ${c.chipBorder} ${c.chipBg} px-3 py-1 text-[0.72rem] font-medium tracking-[0.1em] uppercase ${c.chipText}`}
                    >
                      {s.year}
                    </span>
                    <span className="text-[0.7rem] font-medium uppercase tracking-[0.18em] text-white/35">
                      {s.stop}
                    </span>
                  </div>
                  <h3 className="mt-4 text-[1.2rem] font-light tracking-[-0.015em] text-white">
                    {s.title}
                  </h3>
                  <p className="mt-3 text-[0.9rem] leading-[1.65] text-white/55">
                    {s.body}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* MOBILE · simple vertical timeline */}
        <div className="journey-mobile-list relative mt-16 pl-6 md:hidden">
          <div className="absolute left-[7px] top-2 bottom-2 w-px bg-gradient-to-b from-cyan-500/50 via-violet-500/30 to-indigo-500/20" />
          <div className="flex flex-col gap-10">
            {STOPS.map((s, i) => (
              <div
                key={i}
                className="journey-mobile-card relative"
                style={{ opacity: 0 }}
              >
                <div
                  className="absolute -left-6 top-3 h-3 w-3 rounded-full bg-cyan-400 ring-4 ring-cyan-400/20"
                  style={{
                    filter: "drop-shadow(0 0 4px rgba(34,211,238,0.7))",
                  }}
                />
                <div className="rounded-xl border border-white/[0.08] bg-white/[0.025] p-6 backdrop-blur-sm">
                  <div className="flex items-center gap-3">
                    <span className="inline-flex items-center rounded-full border border-cyan-500/25 bg-cyan-500/[0.08] px-3 py-1 text-[0.72rem] font-medium tracking-[0.1em] text-cyan-400/80 uppercase">
                      {s.year}
                    </span>
                    <span className="text-[0.7rem] font-medium uppercase tracking-[0.18em] text-white/30">
                      {s.stop}
                    </span>
                  </div>
                  <h3 className="mt-4 text-[1.2rem] font-light tracking-[-0.015em] text-white">
                    {s.title}
                  </h3>
                  <p className="mt-3 text-[0.9rem] leading-[1.65] text-white/55">
                    {s.body}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Section>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   SECTION 10 · STATS / COUNTERS
═══════════════════════════════════════════════════════════════════ */

const STATS = [
  {
    to: 2,
    suffix: "K+",
    label: "Qualified Opportunities Generated",
    sub: "Across outbound + inbound systems.",
    isRange: false,
    colorClass: "text-cyan-300",
  },
  {
    to: 300,
    suffix: "",
    label: "Deals Closed by Clients",
    sub: "From pipelines we helped build.",
    isRange: false,
    colorClass: "text-violet-300",
  },
  {
    to: null,
    suffix: "",
    label: "Pipeline Growth",
    sub: "Typical increase within the first 120 days.",
    isRange: true,
    colorClass: "text-teal-300",
  },
  {
    to: 6,
    suffix: "",
    label: "Long-Term Revenue Partners",
    sub: "Clients who rely on us as GTM infrastructure.",
    isRange: false,
    colorClass: "text-indigo-300",
  },
];

function Stats() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".stat-item",
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.1,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 78%",
            once: true,
          },
        },
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={sectionRef} className="relative">
      <div className="pointer-events-none absolute inset-0 opacity-[0.07]">
        <ShapeGrid
          direction="down"
          speed={0.14}
          borderColor="rgba(52,211,153,0.22)"
          squareSize={50}
          hoverFillColor="rgba(52,211,153,0.1)"
          shape="square"
        />
      </div>

      <Section className="py-28 sm:py-36">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          {STATS.map((s) => (
            <div key={s.label} className="stat-item" style={{ opacity: 0 }}>
              <div
                className={`text-[3rem] font-light leading-none tracking-[-0.04em] sm:text-[3.5rem] ${s.colorClass}`}
              >
                {s.isRange ? (
                  <span className="inline-flex items-baseline whitespace-nowrap">
                    <Counter to={3} duration={2.4} className="tabular-nums" />
                    <span aria-hidden>–</span>
                    <Counter
                      to={6}
                      suffix="×"
                      duration={2.4}
                      className="tabular-nums"
                    />
                  </span>
                ) : (
                  <Counter
                    to={s.to as number}
                    suffix={s.suffix}
                    duration={2.4}
                    className="tabular-nums"
                  />
                )}
              </div>
              <div className="mt-3 text-[1rem] font-light tracking-[-0.01em] text-white/80">
                {s.label}
              </div>
              <div className="mt-1.5 max-w-[22ch] text-[0.85rem] leading-[1.55] text-white/40">
                {s.sub}
              </div>
            </div>
          ))}
        </div>
      </Section>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   SECTION 11 · MISSION & VISION
═══════════════════════════════════════════════════════════════════ */

function MissionVision() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".mv-block",
        { opacity: 0, y: 44 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.14,
          duration: 1.0,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            once: true,
          },
        },
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={sectionRef} className="relative">
      <Section className="py-28 sm:py-36">
        <div className="grid gap-14 md:grid-cols-2 md:gap-20">
          <div className="mv-block" style={{ opacity: 0 }}>
            <Kicker color="cyan">Mission</Kicker>
            <p className="mt-8 max-w-[34ch] text-[1.5rem] font-light leading-[1.3] tracking-[-0.015em] text-white sm:text-[1.85rem]">
              To help high-ticket B2B companies build predictable revenue
              systems  combining outbound, inbound, and automation into one
              scalable engine.
            </p>
          </div>
          <div className="mv-block" style={{ opacity: 0 }}>
            <Kicker color="violet">Vision</Kicker>
            <p className="mt-8 max-w-[34ch] text-[1.5rem] font-light leading-[1.3] tracking-[-0.015em] text-white sm:text-[1.85rem]">
              To redefine how B2B companies grow  moving from fragmented tools
              and agencies to unified revenue systems that consistently generate
              and convert pipeline.
            </p>
          </div>
        </div>
      </Section>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   SECTION 12 · VALUES
═══════════════════════════════════════════════════════════════════ */

const VALUES = [
  {
    title: "Precision Over Volume",
    body: "Growth doesn't come from more activity  it comes from better targeting, better systems, and better timing.",
    border: "border-cyan-500/20 hover:border-cyan-500/45",
    top: "border-t-[2px] border-cyan-500/50",
    num: "text-cyan-400",
  },
  {
    title: "Ownership Mindset",
    body: "We don't run campaigns. We take responsibility for pipeline performance  and fix what's broken.",
    border: "border-violet-500/20 hover:border-violet-500/45",
    top: "border-t-[2px] border-violet-500/50",
    num: "text-violet-400",
  },
  {
    title: "Systems Over Tactics",
    body: "Tools and channels change. Systems scale. Everything we build is designed to compound over time.",
    border: "border-teal-500/20 hover:border-teal-500/45",
    top: "border-t-[2px] border-teal-500/50",
    num: "text-teal-400",
  },
  {
    title: "Radical Transparency",
    body: "No black boxes. Full visibility into pipeline, performance, and decisions.",
    border: "border-indigo-500/20 hover:border-indigo-500/45",
    top: "border-t-[2px] border-indigo-500/50",
    num: "text-indigo-400",
  },
  {
    title: "Continuous Optimization",
    body: "Every touchpoint is measured, tested, and improved  from first contact to closed deal.",
    border: "border-emerald-500/20 hover:border-emerald-500/45",
    top: "border-t-[2px] border-emerald-500/50",
    num: "text-emerald-400",
  },
];

function Values() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".values-head",
        { opacity: 0, y: 36 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".values-head",
            start: "top 82%",
            once: true,
          },
        },
      );
      gsap.fromTo(
        ".value-card",
        { opacity: 0, y: 52, scale: 0.96 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          stagger: 0.1,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 72%",
            once: true,
          },
        },
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={sectionRef} className="relative">
      <div className="pointer-events-none absolute inset-0 opacity-[0.06]">
        <ShapeGrid
          direction="up"
          speed={0.12}
          borderColor="rgba(167,139,250,0.22)"
          squareSize={48}
          hoverFillColor="rgba(167,139,250,0.1)"
          shape="triangle"
        />
      </div>

      <Section className="py-28 sm:py-36">
        <div className="values-head" style={{ opacity: 0 }}>
          <Kicker>Our Values</Kicker>
          <h2 className="mt-6 text-[2rem] font-light leading-[1.05] tracking-[-0.03em] text-white sm:text-[2.75rem] lg:text-[3.25rem]">
            How we operate.
          </h2>
        </div>

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {VALUES.map((v, i) => (
            <div
              key={v.title}
              className={`value-card h-full rounded-xl border bg-white/[0.015] p-8 transition-all duration-500 hover:bg-white/[0.03] sm:p-10 ${v.border} ${v.top} ${i === 4 ? "sm:col-span-2 lg:col-span-1" : ""}`}
              style={{ opacity: 0 }}
            >
              <div
                className={`text-[0.72rem] font-medium uppercase tracking-[0.22em] ${v.num}`}
              >
                {String(i + 1).padStart(2, "0")}
              </div>
              <h3 className="mt-6 text-[1.2rem] font-light tracking-[-0.015em] text-white sm:text-[1.35rem]">
                {v.title}
              </h3>
              <p className="mt-4 text-[0.92rem] leading-[1.7] text-white/55">
                {v.body}
              </p>
            </div>
          ))}
        </div>
      </Section>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   FINAL CTA
═══════════════════════════════════════════════════════════════════ */

function FinalCTA() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".cta-el",
        { opacity: 0, y: 36 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.12,
          duration: 0.95,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            once: true,
          },
        },
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={sectionRef}>
      <Section id="cta" className="pb-40 pt-28 sm:pb-48 sm:pt-36">
        <div className="relative overflow-hidden rounded-3xl border border-white/[0.08] bg-white/[0.015] px-8 py-20 sm:px-16 sm:py-24">
          {/* Interactive grid with hover trail */}
          <div className="absolute inset-0 z-0 opacity-[0.28]">
            <ShapeGrid
              direction="right"
              speed={0.45}
              borderColor="rgba(125,211,252,0.20)"
              squareSize={38}
              hoverFillColor="rgba(125,211,252,0.28)"
              shape="square"
              hoverTrailAmount={12}
            />
          </div>

          {/* Atmosphere */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 z-[1]"
            style={{
              background:
                "radial-gradient(circle at 20% 0%, rgba(125,211,252,0.09), transparent 42%), radial-gradient(circle at 88% 100%, rgba(167,139,250,0.07), transparent 42%)",
            }}
          />

          <div className="relative z-[2]">
            <h2
              className="cta-el max-w-[20ch] text-balance text-[2.25rem] font-light leading-[1.05] tracking-[-0.03em] text-white sm:text-[3rem] lg:text-[3.5rem]"
              style={{ opacity: 0 }}
            >
              Ready to build a predictable pipeline?
            </h2>

            <p
              className="cta-el mt-8 max-w-[52ch] text-[1.05rem] leading-[1.7] text-white/60"
              style={{ opacity: 0 }}
            >
              We don&rsquo;t just generate leads  we build systems that turn
              pipeline into revenue.
            </p>

            <div
              className="cta-el mt-12 flex flex-wrap items-center gap-5"
              style={{ opacity: 0 }}
            >
              <Button
                variant="primary"
                size="lg"
                href="https://calendly.com/ascendly"
              >
                Book a Strategy Call
              </Button>
              <span className="max-w-[36ch] text-[0.9rem] leading-[1.55] text-white/45">
                We&rsquo;ll map your pipeline, identify leaks, and show you
                exactly how this would work for your business.
              </span>
            </div>
          </div>
        </div>
      </Section>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   PAGE ROOT
═══════════════════════════════════════════════════════════════════ */

export default function AboutUsPage() {
  return (
    <main
      id="top"
      className="relative isolate min-h-screen overflow-x-clip bg-[#05060A]"
    >
      {/* ── Global background: hexagon cyan, diagonal ── */}
      <div className="pointer-events-none fixed inset-0 z-0 opacity-[0.15]">
        <ShapeGrid
          direction="diagonal"
          speed={0.28}
          borderColor="rgba(34,211,238,0.22)"
          squareSize={56}
          hoverFillColor="rgba(34,211,238,0.14)"
          shape="hexagon"
        />
      </div>

      {/* ── Global background layer 2: circle violet, up ── */}
      <div className="pointer-events-none fixed inset-0 z-0 opacity-[0.08]">
        <ShapeGrid
          direction="up"
          speed={0.16}
          borderColor="rgba(167,139,250,0.24)"
          squareSize={72}
          hoverFillColor="rgba(167,139,250,0.12)"
          shape="circle"
        />
      </div>

      {/* ── Vignette ── */}
      <div
        className="pointer-events-none fixed inset-0 z-[1]"
        style={{
          background:
            "radial-gradient(ellipse at 50% 40%, transparent 20%, rgba(5,6,10,0.60) 72%, rgba(5,6,10,0.94) 100%)",
        }}
      />

      {/* ── Color atmosphere orbs ── */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-[2] overflow-hidden"
      >
        <div className="absolute -left-[15%] top-[0%] h-[70vh] w-[65vw] rounded-full bg-[radial-gradient(ellipse,rgba(34,211,238,0.07),transparent_65%)] blur-3xl" />
        <div className="absolute -right-[10%] top-[2%] h-[55vh] w-[55vw] rounded-full bg-[radial-gradient(ellipse,rgba(167,139,250,0.06),transparent_65%)] blur-3xl" />
        <div className="absolute -left-[10%] top-[18%] h-[60vh] w-[60vw] rounded-full bg-[radial-gradient(ellipse,rgba(59,130,246,0.06),transparent_65%)] blur-3xl" />
        <div className="absolute -right-[5%] top-[32%] h-[60vh] w-[55vw] rounded-full bg-[radial-gradient(ellipse,rgba(167,139,250,0.07),transparent_65%)] blur-3xl" />
        <div className="absolute left-[15%] top-[46%] h-[55vh] w-[70vw] rounded-full bg-[radial-gradient(ellipse,rgba(20,184,166,0.05),transparent_65%)] blur-3xl" />
        <div className="absolute -left-[10%] top-[60%] h-[60vh] w-[55vw] rounded-full bg-[radial-gradient(ellipse,rgba(56,189,248,0.06),transparent_65%)] blur-3xl" />
        <div className="absolute -right-[5%] top-[74%] h-[55vh] w-[55vw] rounded-full bg-[radial-gradient(ellipse,rgba(99,102,241,0.07),transparent_65%)] blur-3xl" />
        <div className="absolute left-[10%] top-[86%] h-[55vh] w-[80vw] rounded-full bg-[radial-gradient(ellipse,rgba(52,211,153,0.05),transparent_65%)] blur-3xl" />
      </div>

      {/* ── Navbar ── */}
      <div className="relative z-20">
        <Navbar />
      </div>

      {/* ── Sections ── */}
      <div className="relative z-10">
        <Hero />
        <Hairline />
        <Founder />
        <Hairline />
        <Gears />
        <Hairline />
        <Proof />
        <CTAStrip />
        <Hairline />
        <Philosophy />
        <Hairline />
        <WhoFor />
        <Hairline />
        <Process />
        <Hairline />
        <Journey />
        <Hairline />
        <Stats />
        <Hairline />
        <MissionVision />
        <Hairline />
        <Values />
        <FinalCTA />
      </div>
    </main>
  );
}
