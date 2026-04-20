"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { serviceBoxes } from "@/servicesPage/lib/servicesData";
import ScrollFloat from "@/animations/ScrollFloat";

gsap.registerPlugin(ScrollTrigger);

export default function WhatWeBuild() {
  const sectionRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const mm = gsap.matchMedia();

    mm.add("(min-width: 768px)", () => {
      const cards = gsap.utils.toArray<HTMLElement>("[data-build-card]");
      gsap.set(cards, { autoAlpha: 0, y: 28, scale: 0.97 });

      cards.forEach((card, i) => {
        gsap.to(card, {
          autoAlpha: 1,
          y: 0,
          scale: 1,
          duration: 0.6,
          ease: "power3.out",
          delay: i * 0.06,
          scrollTrigger: {
            trigger: section,
            start: "top 68%",
            once: true,
          },
        });
      });
    });

    mm.add("(max-width: 767px)", () => {
      const cards = gsap.utils.toArray<HTMLElement>("[data-build-card]");
      cards.forEach((el) => gsap.set(el, { autoAlpha: 1, y: 0, scale: 1 }));
    });

    return () => mm.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden px-4 py-20 sm:px-6 sm:py-28 lg:px-8 lg:py-36"
    >
      <div className="relative z-10 mx-auto max-w-[1360px]">
        <div className="mx-auto max-w-3xl text-center">
          <ScrollFloat
            containerClassName="my-0 text-center"
            textClassName="text-[clamp(1.1rem,1.8vw,1.4rem)] font-medium tracking-[-0.02em] text-white/50"
          >
            The full stack
          </ScrollFloat>
          <h2 className="mt-4 text-[clamp(2rem,5vw,4.2rem)] font-semibold leading-[1.06] tracking-[-0.055em] text-white">
            What We Build
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-[clamp(0.9rem,1.5vw,1.05rem)] leading-7 text-white/45">
            Eight interlocking systems that turn pipeline activity into predictable revenue.
          </p>
        </div>

        <div className="mx-auto mt-14 grid max-w-6xl gap-4 sm:mt-18 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
          {serviceBoxes.map((box, i) => {
            const Icon = box.icon;
            return (
              <div
                key={box.title}
                data-build-card=""
                className="service-shimmer-card group relative overflow-hidden rounded-2xl border border-white/[0.06] bg-white/[0.02] p-5 transition-all duration-400 hover:border-white/12 hover:bg-white/[0.04] sm:rounded-[22px] sm:p-6"
              >
                {/* Shimmer border on hover */}
                <div className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 transition-opacity duration-500 group-hover:opacity-100" style={{
                  background: "conic-gradient(from var(--shimmer-angle, 0deg) at 50% 50%, transparent 0%, rgba(255,255,255,0.06) 10%, transparent 20%)",
                  mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                  maskComposite: "exclude",
                  WebkitMaskComposite: "xor",
                  padding: "1px",
                }} />

                <div className="relative">
                  <div className="flex items-center justify-between">
                    <div className={`flex h-9 w-9 items-center justify-center rounded-lg sm:h-10 sm:w-10 sm:rounded-xl ${box.accentClass} bg-white/[0.04]`}>
                      <Icon className="h-4 w-4 sm:h-[18px] sm:w-[18px]" />
                    </div>
                    <span className="text-[0.55rem] font-medium uppercase tracking-[0.24em] text-white/16">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>

                  <h3 className="mt-4 text-[0.94rem] font-semibold leading-tight tracking-[-0.02em] text-white sm:text-base">
                    {box.title}
                  </h3>
                  <p className="mt-2 text-[0.8rem] leading-[1.6] text-white/40 sm:text-[0.84rem]">
                    {box.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
