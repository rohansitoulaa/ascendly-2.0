"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLayoutEffect, useRef } from "react";
import { Parallax } from "@/animations/Parallax";

gsap.registerPlugin(ScrollTrigger);

/* ── Data ─────────────────────────────────────────────────── */

interface ValueProp {
  number: string;
  title: string;
  contrast: {
    label: { them: string; us: string };
    them: string[];
    us: string[];
  };
  summary?: string;
}

const valueProps: ValueProp[] = [
  {
    number: "01",
    title: "We're accountable to revenue, not activity",
    contrast: {
      label: { them: "Most agencies report", us: "We focus on" },
      them: ["Emails sent", "Replies", "Meetings"],
      us: [
        "Pipeline created",
        "Deals progressed",
        "Revenue generated",
      ],
    },
  },
  {
    number: "02",
    title: "We don't stop at meetings",
    contrast: {
      label: { them: "Most outbound", us: "We" },
      them: ["Breaks after booking a meeting"],
      us: [
        "Track every opportunity",
        "Follow up automatically",
        "Re-engage stalled deals",
      ],
    },
    summary:
      "No deal is left to die in your pipeline.",
  },
  {
    number: "03",
    title: "System, not campaigns",
    contrast: {
      label: { them: "Others", us: "We build" },
      them: ["Run campaigns"],
      us: [
        "Inbound capture",
        "Outbound generation",
        "Deal follow-up",
        "Pipeline tracking",
      ],
    },
    summary:
      "One system that continuously generates and converts pipeline.",
  },
  {
    number: "04",
    title: "ROI before scale",
    contrast: {
      label: { them: "Typical approach", us: "Our approach" },
      them: ["Scale first, validate later"],
      us: [
        "Start with controlled volume",
        "Prove opportunity flow",
        "Then scale into full system",
      ],
    },
  },
  {
    number: "05",
    title: "Built for high-value deals",
    contrast: {
      label: { them: "Not for", us: "Built for" },
      them: [
        "Low-ticket sales",
        "Transactional funnels",
      ],
      us: [
        "Companies where each deal matters",
      ],
    },
  },
];

/* ── Component ────────────────────────────────────────────── */

export function WhyChooseSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const mm = gsap.matchMedia();

    mm.add("(min-width: 768px)", () => {
      /* heading reveal */
      const headings = gsap.utils.toArray<HTMLElement>(
        "[data-why-heading]",
      );
      headings.forEach((el, i) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 24 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
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

      /* card reveals */
      const cards = gsap.utils.toArray<HTMLElement>("[data-why-card]");
      cards.forEach((card, index) => {
        gsap.fromTo(
          card,
          { opacity: 0, y: 36 },
          {
            opacity: 1,
            y: 0,
            duration: 0.72,
            ease: "power3.out",
            delay: index * 0.06,
            scrollTrigger: {
              trigger: card,
              start: "top 86%",
              once: true,
            },
          },
        );
      });

      /* contrast columns — slide in */
      const contrasts = gsap.utils.toArray<HTMLElement>(
        "[data-why-contrast]",
      );
      contrasts.forEach((el) => {
        const side = el.dataset.whySide;
        gsap.fromTo(
          el,
          { opacity: 0, x: side === "them" ? -18 : 18 },
          {
            opacity: 1,
            x: 0,
            duration: 0.55,
            ease: "power2.out",
            scrollTrigger: {
              trigger: el,
              start: "top 88%",
              once: true,
            },
          },
        );
      });

      /* vertical progress bar */
      const progress = progressRef.current;
      if (progress) {
        gsap.fromTo(
          progress,
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: "none",
            scrollTrigger: {
              trigger: section,
              start: "top 40%",
              end: "bottom 60%",
              scrub: 0.5,
            },
          },
        );
      }
    });

    mm.add("(max-width: 767px)", () => {
      const els = gsap.utils.toArray<HTMLElement>(
        "[data-why-heading], [data-why-card], [data-why-contrast]",
      );
      els.forEach((el) => {
        gsap.set(el, { opacity: 1, x: 0, y: 0 });
      });
    });

    return () => {
      mm.revert();
    };
  }, []);

  return (
    <section
      id="why-ascendly"
      ref={sectionRef}
      className="section-perf-skip relative overflow-hidden bg-[#06090d] px-4 py-20 sm:px-6 sm:py-28 lg:px-8 lg:py-32"
    >
      {/* ── top divider ── */}
      <div className="pointer-events-none absolute inset-x-0 top-0 mx-auto h-px max-w-[1360px] bg-gradient-to-r from-transparent via-white/[0.08] to-transparent" />

      {/* ── parallax ambient glows ── */}
      <div className="pointer-events-none absolute inset-0">
        <Parallax offset={120} className="absolute left-0 top-1/3 h-[440px] w-[440px]">
          <div className="h-full w-full rounded-full bg-cyan-500/[0.04] blur-[140px]" />
        </Parallax>
        <Parallax offset={-90} className="absolute bottom-20 right-1/4 h-[340px] w-[340px]">
          <div className="h-full w-full rounded-full bg-sky-500/[0.035] blur-[110px]" />
        </Parallax>
        <Parallax offset={60} className="absolute right-0 top-10 h-[280px] w-[280px]">
          <div className="h-full w-full rounded-full bg-violet-500/[0.03] blur-[120px]" />
        </Parallax>
      </div>

      <div className="relative z-10 mx-auto max-w-[1360px]">
        {/* ── section header ── */}
        <div className="max-w-3xl">
          <span
            data-why-heading=""
            className="inline-flex rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-[0.68rem] font-medium uppercase tracking-[0.28em] text-slate-400"
          >
            Why Ascendly
          </span>

          <h2
            data-why-heading=""
            className="mt-6 text-[clamp(2rem,5vw,4.2rem)] font-semibold leading-[1.06] tracking-[-0.05em] text-white"
          >
            Why you should choose{" "}
            <span className="bg-gradient-to-r from-cyan-300 to-sky-400 bg-clip-text text-transparent">
              Ascendly
            </span>
          </h2>
        </div>

        {/* ── value propositions ── */}
        <div className="relative mt-12 sm:mt-16 lg:mt-18">
          {/* left progress bar (desktop) */}
          <div className="pointer-events-none absolute bottom-0 left-0 top-0 hidden w-px lg:block">
            <div className="h-full w-full bg-white/[0.04]" />
            <div
              ref={progressRef}
              className="absolute inset-x-0 top-0 h-full origin-top bg-gradient-to-b from-cyan-400/50 via-sky-400/30 to-transparent"
            />
          </div>

          <div className="flex flex-col">
            {valueProps.map((prop, index) => (
              <article
                key={prop.number}
                data-why-card=""
                className="group relative border-b border-white/[0.04] py-10 first:pt-0 last:border-b-0 last:pb-0 sm:py-12 lg:pl-10 xl:pl-14"
              >
                {/* number dot on progress bar (desktop) */}
                <div className="absolute -left-[5px] top-10 hidden lg:block first:top-0 sm:top-12">
                  <div className="relative h-[11px] w-[11px]">
                    <span className="absolute inset-0 rounded-full border border-slate-700/80 bg-[#06090d] transition-colors duration-300 group-hover:border-cyan-500/40" />
                    <span className="absolute inset-[3px] rounded-full bg-slate-700/60 transition-colors duration-300 group-hover:bg-cyan-400/60" />
                  </div>
                </div>

                <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:gap-10 xl:gap-14">
                  {/* number + title + summary */}
                  <div className="min-w-0 shrink-0 lg:w-[320px] xl:w-[380px]">
                    <div className="flex items-baseline gap-3">
                      <span className="text-[clamp(1.6rem,3vw,2.2rem)] font-bold tabular-nums leading-none tracking-tighter text-white/[0.08]">
                        {prop.number}
                      </span>
                      <h3 className="text-[clamp(1.1rem,2.2vw,1.4rem)] font-semibold leading-[1.2] tracking-[-0.03em] text-white">
                        {prop.title}
                      </h3>
                    </div>
                    {prop.summary ? (
                      <p className="mt-3 text-[0.86rem] leading-6 text-slate-500 lg:pl-[calc(clamp(1.6rem,3vw,2.2rem)+0.75rem)]">
                        {prop.summary}
                      </p>
                    ) : null}
                  </div>

                  {/* contrast columns */}
                  <div className="flex flex-1 flex-col gap-3 sm:flex-row sm:gap-4">
                    {/* THEM */}
                    <div
                      data-why-contrast=""
                      data-why-side="them"
                      className="flex-1 rounded-[clamp(14px,2vw,20px)] border border-white/[0.05] bg-white/[0.015] p-5"
                    >
                      <span className="text-[0.62rem] font-semibold uppercase tracking-[0.28em] text-slate-600">
                        {prop.contrast.label.them}
                      </span>
                      <ul className="mt-3.5 flex flex-col gap-2.5">
                        {prop.contrast.them.map((item) => (
                          <li
                            key={item}
                            className="flex items-center gap-2.5 text-[0.84rem] leading-6 text-slate-500"
                          >
                            <span className="h-1 w-1 shrink-0 rounded-full bg-slate-700" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* US */}
                    <div
                      data-why-contrast=""
                      data-why-side="us"
                      className="flex-1 rounded-[clamp(14px,2vw,20px)] border border-cyan-500/[0.1] bg-cyan-500/[0.02] p-5"
                    >
                      <span className="text-[0.62rem] font-semibold uppercase tracking-[0.28em] text-cyan-400/60">
                        {prop.contrast.label.us}
                      </span>
                      <ul className="mt-3.5 flex flex-col gap-2.5">
                        {prop.contrast.us.map((item) => (
                          <li
                            key={item}
                            className="flex items-center gap-2.5 text-[0.84rem] leading-6 text-slate-300"
                          >
                            <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-cyan-400/45" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
