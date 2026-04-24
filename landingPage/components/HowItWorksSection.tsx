"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLayoutEffect, useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

/* ── Data ─────────────────────────────────────────────────── */

interface PipelineStep {
  title: string;
  description: string;
}

const rightSteps: PipelineStep[] = [
  {
    title: "Align",
    description:
      "We define your ICP, qualification criteria, and what a real opportunity looks like.",
  },
  {
    title: "Capture",
    description:
      "Inbound sources go live  every lead is captured, enriched, and routed automatically.",
  },
  {
    title: "Generate",
    description:
      "Outbound activates to create additional pipeline alongside inbound demand.",
  },
  {
    title: "Convert",
    description:
      "Every meeting is followed up automatically. No deal goes cold. Opportunities are worked until outcome.",
  },
  {
    title: "Close & Scale",
    description:
      "Deals convert. Pipeline becomes predictable. System keeps compounding.",
  },
];

const leftSteps: PipelineStep[] = [
  {
    title: "System Setup",
    description:
      "Infrastructure, routing logic, and qualification framework built around your ICP.",
  },
  {
    title: "Signal & Data Layer",
    description:
      "Leads enriched, verified, and scored before any outreach or booking.",
  },
  {
    title: "Multi-Channel Execution",
    description: "Email + LinkedIn + inbound working together  not in silos.",
  },
  {
    title: "Deal Intelligence Layer",
    description:
      "Call insights, intent signals, and follow-ups automated after every interaction.",
  },
  {
    title: "Pipeline Visibility",
    description:
      "Every deal, stage, and next step tracked  full transparency.",
  },
];

/* ── Step Card ────────────────────────────────────────────── */

function StepCard({
  step,
  index,
  side,
}: {
  step: PipelineStep;
  index: number;
  side: "left" | "right";
}) {
  const isLeft = side === "left";
  const accentBorder = isLeft
    ? "border-cyan-500/[0.08] hover:border-cyan-500/[0.16]"
    : "border-sky-500/[0.08] hover:border-sky-500/[0.16]";
  const dotColor = isLeft ? "bg-cyan-400/70" : "bg-sky-400/70";
  const dotBorder = isLeft ? "border-cyan-400/30" : "border-sky-400/30";
  const numberColor = isLeft ? "text-cyan-500/40" : "text-sky-500/40";

  return (
    <div
      className={`relative flex items-start gap-5 ${isLeft ? "lg:flex-row-reverse lg:text-right" : ""}`}
      data-hiw-card=""
      data-hiw-side={side}
    >
      {/* connector dot on centre timeline (desktop) */}
      <div
        className={`absolute top-5 hidden lg:block ${isLeft ? "-right-[calc(50%+7px)]" : "-left-[calc(50%+7px)]"}`}
      >
        <div
          data-hiw-dot=""
          className="relative flex h-[15px] w-[15px] items-center justify-center"
        >
          <span
            className={`absolute h-[15px] w-[15px] rounded-full border bg-[#06090d] ${dotBorder}`}
          />
          <span
            className={`absolute h-[5px] w-[5px] rounded-full ${dotColor}`}
          />
        </div>
      </div>

      {/* card surface */}
      <div
        className={`group flex flex-1 gap-4 rounded-[clamp(16px,2.5vw,24px)] border bg-white/[0.015] p-5 backdrop-blur-sm transition-all duration-300 hover:bg-white/[0.03] sm:gap-5 sm:p-6 ${accentBorder} ${isLeft ? "lg:flex-row-reverse" : ""}`}
      >
        {/* step number */}
        <span
          className={`shrink-0 text-[clamp(2rem,4vw,3.2rem)] font-bold leading-none tracking-tighter ${numberColor} transition-colors duration-300 group-hover:opacity-70`}
        >
          {String(index + 1).padStart(2, "0")}
        </span>

        {/* text */}
        <div className="min-w-0 flex-1">
          <h3 className="text-[1.05rem] font-semibold leading-tight tracking-[-0.03em] text-white sm:text-[1.15rem]">
            {step.title}
          </h3>
          <p className="mt-2 text-[0.84rem] leading-[1.65] text-slate-400 sm:text-[0.88rem]">
            {step.description}
          </p>
        </div>
      </div>
    </div>
  );
}

/* ── Main Component ───────────────────────────────────────── */

export function HowItWorksSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const mm = gsap.matchMedia();

    mm.add("(min-width: 768px)", () => {
      /* heading reveal */
      const headingEls = gsap.utils.toArray<HTMLElement>("[data-hiw-heading]");
      headingEls.forEach((el, i) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 28 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out",
            delay: i * 0.1,
            scrollTrigger: {
              trigger: el,
              start: "top 88%",
              once: true,
            },
          },
        );
      });

      /* step cards stagger reveal */
      const cards = gsap.utils.toArray<HTMLElement>("[data-hiw-card]");
      cards.forEach((card, index) => {
        const side = card.dataset.hiwSide;
        gsap.fromTo(
          card,
          {
            opacity: 0,
            x: side === "left" ? -40 : 40,
            y: 14,
          },
          {
            opacity: 1,
            x: 0,
            y: 0,
            duration: 0.75,
            ease: "power3.out",
            delay: (index % 5) * 0.09,
            scrollTrigger: {
              trigger: card,
              start: "top 86%",
              once: true,
            },
          },
        );
      });

      /* centre timeline draw */
      const line = timelineRef.current;
      if (line) {
        gsap.fromTo(
          line,
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: "none",
            scrollTrigger: {
              trigger: section,
              start: "top 50%",
              end: "bottom 70%",
              scrub: 0.6,
            },
          },
        );
      }

      /* step dots pulse */
      const dots = gsap.utils.toArray<HTMLElement>("[data-hiw-dot]");
      dots.forEach((dot) => {
        gsap.fromTo(
          dot,
          { scale: 0, opacity: 0 },
          {
            scale: 1,
            opacity: 1,
            duration: 0.5,
            ease: "back.out(2.6)",
            scrollTrigger: {
              trigger: dot,
              start: "top 82%",
              once: true,
            },
          },
        );
      });
    });

    /* Mobile: ensure everything visible */
    mm.add("(max-width: 767px)", () => {
      const els = gsap.utils.toArray<HTMLElement>(
        "[data-hiw-heading], [data-hiw-card], [data-hiw-dot]",
      );
      els.forEach((el) => {
        gsap.set(el, { opacity: 1, x: 0, y: 0, scale: 1 });
      });
    });

    return () => {
      mm.revert();
    };
  }, []);

  return (
    <section
      id="how-it-works"
      ref={sectionRef}
      className="section-perf-skip relative overflow-hidden bg-[#06090d] px-4 py-20 sm:px-6 sm:py-28 lg:px-8 lg:py-32"
    >
      {/* ── top divider ── */}
      <div className="pointer-events-none absolute inset-x-0 top-0 mx-auto h-px max-w-[1360px] bg-gradient-to-r from-transparent via-white/[0.07] to-transparent" />

      {/* ── ambient glow ── */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-0 h-[420px] w-[680px] -translate-x-1/2 rounded-full bg-cyan-500/[0.04] blur-[140px]" />
        <div className="absolute bottom-0 right-0 h-[320px] w-[480px] rounded-full bg-sky-500/[0.035] blur-[120px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-[1360px]">
        {/* ── section header ── */}
        <div className="mx-auto max-w-3xl text-center">


          <h2
            data-hiw-heading=""
            className="mt-6 text-[clamp(2.2rem,5.5vw,4.8rem)] font-semibold leading-[1.02] tracking-[-0.06em] text-white"
          >
            How the System{" "}
            <span className="bg-gradient-to-r from-cyan-300 via-sky-300 to-blue-400 bg-clip-text text-transparent">
              Works
            </span>
          </h2>

          <p
            data-hiw-heading=""
            className="mx-auto mt-5 max-w-[52ch] text-[clamp(0.92rem,1.6vw,1.08rem)] leading-7 text-slate-400"
          >
            From first touch to closed deal  one continuous pipeline.
          </p>
        </div>

        {/* ── dual-column pipeline ── */}
        <div className="relative mt-14 sm:mt-18 lg:mt-24">
          {/* centre timeline (desktop only) */}
          <div className="pointer-events-none absolute inset-y-0 left-1/2 hidden w-px -translate-x-1/2 lg:block">
            <div className="h-full w-full bg-white/[0.04]" />
            <div
              ref={timelineRef}
              className="absolute inset-x-0 top-0 h-full origin-top bg-gradient-to-b from-cyan-400/40 via-sky-400/20 to-transparent"
            />
          </div>

          {/* column labels */}
          <div className="mb-8 hidden grid-cols-2 lg:grid">
            <div data-hiw-heading="" className="pr-12 text-right xl:pr-20">
              <span className="inline-flex items-center gap-2 rounded-full border border-white/[0.06] bg-white/[0.025] px-3.5 py-1.5 text-[0.65rem] font-semibold uppercase tracking-[0.26em] text-slate-500">
                <span className="h-1.5 w-1.5 rounded-full bg-cyan-400/50" />
                System Layer
              </span>
            </div>
            <div data-hiw-heading="" className="pl-12 xl:pl-20">
              <span className="inline-flex items-center gap-2 rounded-full border border-white/[0.06] bg-white/[0.025] px-3.5 py-1.5 text-[0.65rem] font-semibold uppercase tracking-[0.26em] text-slate-500">
                <span className="h-1.5 w-1.5 rounded-full bg-sky-400/50" />
                Revenue Pipeline
              </span>
            </div>
          </div>

          {/* mobile column labels */}
          <div className="mb-6 flex flex-col gap-4 lg:hidden">
            <span className="inline-flex w-fit items-center gap-2 rounded-full border border-white/[0.06] bg-white/[0.025] px-3.5 py-1.5 text-[0.65rem] font-semibold uppercase tracking-[0.26em] text-slate-500">
              <span className="h-1.5 w-1.5 rounded-full bg-cyan-400/50" />
              System Layer
            </span>
          </div>

          <div className="grid gap-4 lg:grid-cols-2 lg:gap-0">
            {/* ── LEFT COLUMN  System / Infrastructure ── */}
            <div className="flex flex-col gap-4 lg:pr-10 xl:pr-16">
              {leftSteps.map((step, i) => (
                <StepCard key={step.title} step={step} index={i} side="left" />
              ))}
            </div>

            {/* ── RIGHT COLUMN  Revenue Pipeline ── */}
            <div className="flex flex-col gap-4 lg:pl-10 xl:pl-16">
              {/* mobile label for right column */}
              <div className="mt-6 lg:hidden">
                <span className="inline-flex w-fit items-center gap-2 rounded-full border border-white/[0.06] bg-white/[0.025] px-3.5 py-1.5 text-[0.65rem] font-semibold uppercase tracking-[0.26em] text-slate-500">
                  <span className="h-1.5 w-1.5 rounded-full bg-sky-400/50" />
                  Revenue Pipeline
                </span>
              </div>
              {rightSteps.map((step, i) => (
                <StepCard key={step.title} step={step} index={i} side="right" />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
