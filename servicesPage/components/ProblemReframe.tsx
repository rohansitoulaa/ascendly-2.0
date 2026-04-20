"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { painPoints } from "@/servicesPage/lib/servicesData";
import ScrollFloat from "@/animations/ScrollFloat";

gsap.registerPlugin(ScrollTrigger);

export default function ProblemReframe() {
  const sectionRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const mm = gsap.matchMedia();

    mm.add("(min-width: 768px)", () => {
      const items = gsap.utils.toArray<HTMLElement>("[data-pain-item]");
      gsap.set(items, { autoAlpha: 0, x: -20 });

      items.forEach((item, i) => {
        gsap.to(item, {
          autoAlpha: 1,
          x: 0,
          duration: 0.6,
          ease: "power3.out",
          delay: i * 0.1,
          scrollTrigger: {
            trigger: item,
            start: "top 85%",
            once: true,
          },
        });
      });
    });

    mm.add("(max-width: 767px)", () => {
      const items = gsap.utils.toArray<HTMLElement>("[data-pain-item]");
      items.forEach((el) => gsap.set(el, { autoAlpha: 1, x: 0 }));
    });

    return () => mm.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden px-4 py-20 sm:px-6 sm:py-28 lg:px-8 lg:py-36"
    >
      <div className="mx-auto max-w-[1360px]">
        <div className="mx-auto max-w-3xl text-center">
          <ScrollFloat
            containerClassName="my-0 text-center"
            textClassName="text-[clamp(1.1rem,1.8vw,1.4rem)] font-medium tracking-[-0.02em] text-white/50"
          >
            The real bottleneck
          </ScrollFloat>

          <h2 className="mt-4 text-[clamp(2rem,5vw,4.2rem)] font-semibold leading-[1.06] tracking-[-0.055em] text-white">
            Most teams don&rsquo;t have a lead problem.{" "}
            <span className="text-white/50">They have a system problem.</span>
          </h2>
        </div>

        <div className="mx-auto mt-14 grid max-w-3xl gap-4 sm:mt-18 sm:gap-5">
          {painPoints.map((point, i) => (
            <div
              key={point.label}
              data-pain-item=""
              className="group flex items-start gap-4 rounded-2xl border border-white/[0.06] bg-white/[0.02] px-5 py-5 transition-colors duration-300 hover:border-white/10 hover:bg-white/[0.04] sm:gap-5 sm:rounded-[22px] sm:px-7 sm:py-6"
            >
              {/* Pulse indicator */}
              <div className="relative mt-1.5 flex shrink-0 items-center justify-center">
                <span className="absolute h-3 w-3 animate-ping rounded-full bg-red-500/30" />
                <span className="relative h-2.5 w-2.5 rounded-full bg-red-400/80" />
              </div>

              <div>
                <p className="text-base font-semibold tracking-[-0.03em] text-white sm:text-lg">
                  {point.label}
                </p>
                <p className="mt-1.5 text-sm leading-6 text-white/45 sm:text-[0.94rem] sm:leading-7">
                  {point.detail}
                </p>
              </div>

              <span className="ml-auto mt-1 shrink-0 text-xs font-medium uppercase tracking-[0.24em] text-white/20">
                {String(i + 1).padStart(2, "0")}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
