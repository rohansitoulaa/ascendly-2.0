"use client";

import BorderGlow from "@/animations/BorderGlow";
import GlareHover from "@/animations/GlareHover";
// import ShapeGrid from "@/animations/ShapeGrid";
import VariableProximity from "@/animations/VariableProximity";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import { useLayoutEffect, useRef } from "react";
import {
  FiActivity,
  FiArrowUpRight,
  FiBarChart2,
  FiTrendingDown,
  FiZap,
} from "react-icons/fi";

gsap.registerPlugin(ScrollTrigger);

const reviewSignals = [
  {
    detail: "Know whether weak targeting, weak offers, or slow follow-up is stalling replies.",
    icon: FiBarChart2,
    title: "Lead to reply",
  },
  {
    detail: "See where conversations fall apart before they become booked pipeline.",
    icon: FiActivity,
    title: "Reply to meeting",
  },
  {
    detail: "Find the exact point where pipeline stops turning into revenue.",
    icon: FiTrendingDown,
    title: "Meeting to close",
  },
];

export function PipelineReviewSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const panelRef = useRef<HTMLDivElement | null>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) {
      return;
    }

    const frame = section.querySelector<HTMLElement>("[data-review-frame]");
    const copyNodes = section.querySelectorAll<HTMLElement>("[data-review-copy]");
    const metricNodes = section.querySelectorAll<HTMLElement>("[data-review-chip]");
    const accentNodes = section.querySelectorAll<HTMLElement>("[data-review-accent]");

    const mm = gsap.matchMedia();

    mm.add("(min-width: 768px)", () => {
      if (frame) {
        gsap.fromTo(
          frame,
          {
            autoAlpha: 0,
            scale: 0.985,
            y: 54,
          },
          {
            autoAlpha: 1,
            duration: 0.95,
            ease: "power3.out",
            scale: 1,
            scrollTrigger: {
              once: true,
              start: "top 78%",
              trigger: section,
            },
            y: 0,
          },
        );
      }

      gsap.fromTo(
        copyNodes,
        {
          autoAlpha: 0,
          y: 26,
        },
        {
          autoAlpha: 1,
          duration: 0.72,
          ease: "power3.out",
          stagger: 0.08,
          scrollTrigger: {
            once: true,
            start: "top 74%",
            trigger: section,
          },
          y: 0,
        },
      );

      metricNodes.forEach((node, index) => {
        const xShift = (index % 2 === 0 ? 1 : -1) * (10 + index * 2);
        const yShift = -10 - (index % 3) * 6;

        gsap.to(node, {
          duration: 3.8 + index * 0.35,
          ease: "sine.inOut",
          repeat: -1,
          x: xShift,
          y: yShift,
          yoyo: true,
        });
      });

      accentNodes.forEach((node, index) => {
        gsap.to(node, {
          duration: 11 + index * 2.4,
          ease: "sine.inOut",
          repeat: -1,
          rotation: index % 2 === 0 ? 14 : -14,
          scale: 1.04,
          x: index % 2 === 0 ? 20 : -20,
          y: index % 2 === 0 ? -16 : 16,
          yoyo: true,
        });
      });
    });

    mm.add("(max-width: 767px)", () => {
      if (frame) {
        gsap.set(frame, { autoAlpha: 1, scale: 1, y: 0 });
      }

      gsap.set(copyNodes, { autoAlpha: 1, y: 0 });
    });

    return () => {
      mm.revert();
    };
  }, []);

  return (
    <section
      id="pipeline-review"
      ref={sectionRef}
      className="relative overflow-hidden bg-[#040506] px-4 py-20 sm:px-6 sm:py-28 lg:px-8 lg:py-32"
    >


      <div
        data-review-accent=""
        className="pointer-events-none absolute left-[-8rem] top-10 h-72 w-72 rounded-full bg-cyan-400/[0.06] blur-[120px]"
      />
      <div
        data-review-accent=""
        className="pointer-events-none absolute bottom-[-7rem] right-[-6rem] h-80 w-80 rounded-full bg-slate-400/[0.07] blur-[130px]"
      />

      <div className="relative z-10 mx-auto max-w-[1360px]">
        <BorderGlow
          backgroundColor="rgba(7, 9, 10, 0.9)"
          borderRadius={34}
          className="border-white/10"
          colors={[
            "rgba(125,211,252,0.24)",
            "rgba(255,255,255,0.14)",
            "rgba(71,85,105,0.28)",
          ]}
          edgeSensitivity={18}
          fillOpacity={0.36}
          glowColor="192 82 64"
          glowIntensity={0.72}
          surface="dark"
        >
          <div
            ref={panelRef}
            data-review-frame=""
            className="relative overflow-hidden px-6 py-8 sm:px-8 sm:py-10 lg:px-12 lg:py-12"
          >

           

            <div className="relative z-10 grid gap-10 lg:grid-cols-[minmax(0,1.35fr)_minmax(320px,0.85fr)] lg:items-end">
              <div className="max-w-4xl">
                

                <div data-review-copy="" className="mt-6">
                  <VariableProximity
                    label="If your pipeline doesn't convert, more leads won't fix it. Let us review."
                    fromFontVariationSettings="'wght' 420, 'wdth' 102, 'opsz' 14"
                    toFontVariationSettings="'wght' 920, 'wdth' 145, 'opsz' 144"
                    containerRef={panelRef}
                    radius={160}
                    falloff="gaussian"
                    className="block text-[clamp(2.45rem,6vw,6.1rem)] font-medium leading-[0.93] tracking-[-0.075em] text-white"
                  />
                </div>

                <p
                  data-review-copy=""
                  className="mt-6 max-w-2xl text-[0.98rem] leading-7 text-slate-300/70 sm:text-[1.05rem] sm:leading-8"
                >
                  Share the numbers that matter: lead volume, reply rate, show
                  rate, and close rate. We will show you where conversion is
                  leaking before you spend more on top-of-funnel volume.
                </p>

                <div
                  data-review-copy=""
                  className="mt-8 flex flex-col items-start gap-4 sm:mt-10 sm:flex-row sm:items-center"
                >
                  <Link
                    href="/services"
                    className="pipeline-review-cta group relative inline-flex min-h-[54px] items-center gap-3 overflow-hidden rounded-full border border-cyan-300/18 bg-[linear-gradient(180deg,rgba(255,255,255,0.12),rgba(255,255,255,0.04))] px-6 py-3.5 text-sm font-semibold tracking-[0.02em] text-white shadow-[0_24px_64px_rgba(0,0,0,0.32),inset_0_1px_0_rgba(255,255,255,0.12)] transition-transform duration-300 hover:-translate-y-0.5 hover:border-cyan-200/32 hover:bg-[linear-gradient(180deg,rgba(255,255,255,0.16),rgba(255,255,255,0.06))]"
                  >
                    <span>Share your stats here</span>
                    <FiArrowUpRight className="text-base transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </Link>

                  
                </div>
              </div>

              <div data-review-copy="" className="relative">
                <GlareHover
                  width="100%"
                  height="auto"
                  background="rgba(0, 0, 0, 0.35)"
                  borderRadius="30px"
                  borderColor="rgba(255, 255, 255, 0.1)"
                  glareColor="#ffffff"
                  glareOpacity={0.14}
                  glareAngle={-32}
                  glareSize={220}
                  transitionDuration={700}
                  className="w-full cursor-default shadow-[0_24px_64px_rgba(0,0,0,0.26)] backdrop-blur-2xl"
                >
                  <div className="relative w-full overflow-hidden p-5 sm:p-6">
                    <div className="pointer-events-none absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-cyan-200/20 to-transparent" />

                    <div className="flex items-start gap-4">
                      <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-[18px] border border-cyan-300/16 bg-cyan-400/[0.08] text-cyan-200 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]">
                        <FiZap className="text-[1.1rem]" />
                      </span>

                      <div>
                        <p className="text-[0.68rem] font-semibold uppercase tracking-[0.28em] text-slate-400/80">
                          What we review
                        </p>
                        <h3 className="mt-2 text-[1.5rem] font-semibold tracking-[-0.04em] text-white">
                          Where your pipeline loses momentum.
                        </h3>
                      </div>
                    </div>

                    <div className="mt-6 grid gap-3">
                      {reviewSignals.map((signal) => {
                        const Icon = signal.icon;

                        return (
                          <div
                            key={signal.title}
                            className="rounded-[22px] border border-white/8 bg-white/[0.03] p-4"
                          >
                            <div className="flex items-start gap-3">
                              <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-[14px] border border-white/8 bg-white/[0.04] text-slate-100">
                                <Icon className="text-[0.95rem]" />
                              </span>

                              <div>
                                <p className="text-sm font-semibold tracking-[-0.02em] text-white">
                                  {signal.title}
                                </p>
                                <p className="mt-1 text-sm leading-6 text-slate-300/66">
                                  {signal.detail}
                                </p>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </GlareHover>
              </div>
            </div>
          </div>
        </BorderGlow>
      </div>
    </section>
  );
}

export default PipelineReviewSection;
