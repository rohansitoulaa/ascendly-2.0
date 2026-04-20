"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { flowNodes } from "@/servicesPage/lib/servicesData";
import ScrollFloat from "@/animations/ScrollFloat";

gsap.registerPlugin(ScrollTrigger);

export default function RevenueAutomationExplainer() {
  const sectionRef = useRef<HTMLElement>(null);
  const lineRef = useRef<SVGPathElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const mm = gsap.matchMedia();

    mm.add("(min-width: 768px)", () => {
      // Card reveal
      const cards = gsap.utils.toArray<HTMLElement>("[data-flow-card]");
      gsap.set(cards, { autoAlpha: 0, y: 30 });

      cards.forEach((card, i) => {
        gsap.to(card, {
          autoAlpha: 1,
          y: 0,
          duration: 0.65,
          ease: "power3.out",
          delay: i * 0.12,
          scrollTrigger: {
            trigger: section,
            start: "top 70%",
            once: true,
          },
        });
      });

      // Connector line draw
      if (lineRef.current) {
        const len = lineRef.current.getTotalLength();
        gsap.set(lineRef.current, { strokeDasharray: len, strokeDashoffset: len });
        gsap.to(lineRef.current, {
          strokeDashoffset: 0,
          duration: 1.4,
          ease: "power2.out",
          scrollTrigger: {
            trigger: section,
            start: "top 65%",
            once: true,
          },
        });
      }
    });

    mm.add("(max-width: 767px)", () => {
      const cards = gsap.utils.toArray<HTMLElement>("[data-flow-card]");
      cards.forEach((el) => gsap.set(el, { autoAlpha: 1, y: 0 }));
    });

    return () => mm.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden px-4 py-20 sm:px-6 sm:py-28 lg:px-8 lg:py-36"
    >
      {/* Ambient glow */}
      <div className="pointer-events-none absolute left-1/2 top-1/3 h-[500px] w-[700px] -translate-x-1/2 -translate-y-1/2 bg-[radial-gradient(ellipse_at_center,rgba(134,146,153,0.06),transparent_65%)]" />

      <div className="relative z-10 mx-auto max-w-[1360px]">
        <div className="mx-auto max-w-3xl text-center">
          <ScrollFloat
            containerClassName="my-0 text-center"
            textClassName="text-[clamp(1.1rem,1.8vw,1.4rem)] font-medium tracking-[-0.02em] text-white/50"
          >
            A connected system
          </ScrollFloat>
          <h2 className="mt-4 text-[clamp(2rem,5vw,4.2rem)] font-semibold leading-[1.06] tracking-[-0.055em] text-white">
            What Revenue Automation{" "}
            <span className="text-white/50">Actually Means</span>
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-[clamp(0.9rem,1.5vw,1.05rem)] leading-7 text-white/45 sm:mt-6 sm:leading-8">
            Not disconnected tools. A single system where every stage feeds the next — and nothing falls through the cracks.
          </p>
        </div>

        {/* Flow nodes */}
        <div className="relative mx-auto mt-14 max-w-5xl sm:mt-20">
          {/* Desktop connector line */}
          <svg
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 z-0 hidden h-full w-full md:block"
            preserveAspectRatio="none"
            viewBox="0 0 1000 100"
          >
            <path
              ref={lineRef}
              d="M125,50 L875,50"
              fill="none"
              stroke="rgba(255,255,255,0.08)"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>

          <div className="relative z-10 grid gap-5 sm:grid-cols-2 md:grid-cols-4 md:gap-6">
            {flowNodes.map((node, i) => {
              const Icon = node.icon;
              return (
                <div
                  key={node.title}
                  data-flow-card=""
                  className={`group relative rounded-2xl border bg-white/[0.02] p-5 transition-all duration-300 hover:bg-white/[0.05] sm:rounded-[22px] sm:p-6 ${node.accentClass}`}
                >
                  {/* Inner glow on hover */}
                  <div className="pointer-events-none absolute inset-0 rounded-[inherit] bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.03),transparent_70%)] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                  <div className="relative">
                    {/* Step number */}
                    <div className="flex items-center justify-between">
                      <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${node.iconBgClass}`}>
                        <Icon className="h-[18px] w-[18px]" />
                      </div>
                      <span className="text-[0.62rem] font-medium uppercase tracking-[0.28em] text-white/20">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                    </div>

                    <h3 className="mt-5 text-lg font-semibold tracking-[-0.03em] text-white">
                      {node.title}
                    </h3>
                    <p className="mt-2 text-sm leading-6 text-white/45">
                      {node.description}
                    </p>

                    {/* Arrow indicator (not on last) */}
                    {i < flowNodes.length - 1 && (
                      <div className="absolute -right-3 top-5 hidden text-white/12 md:block">
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                          <path d="M1 7h10m0 0L7.5 3.5M11 7L7.5 10.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
