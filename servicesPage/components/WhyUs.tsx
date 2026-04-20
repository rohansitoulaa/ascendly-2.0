"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { differentiators } from "@/servicesPage/lib/servicesData";
import ScrollFloat from "@/animations/ScrollFloat";

gsap.registerPlugin(ScrollTrigger);

export default function WhyUs() {
  const sectionRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const mm = gsap.matchMedia();

    mm.add("(min-width: 768px)", () => {
      const items = gsap.utils.toArray<HTMLElement>("[data-why-item]");
      gsap.set(items, { autoAlpha: 0, y: 30 });

      items.forEach((item, i) => {
        gsap.to(item, {
          autoAlpha: 1,
          y: 0,
          duration: 0.7,
          ease: "power3.out",
          delay: i * 0.15,
          scrollTrigger: {
            trigger: item,
            start: "top 82%",
            once: true,
          },
        });
      });
    });

    mm.add("(max-width: 767px)", () => {
      const items = gsap.utils.toArray<HTMLElement>("[data-why-item]");
      items.forEach((el) => gsap.set(el, { autoAlpha: 1, y: 0 }));
    });

    return () => mm.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden px-4 py-20 sm:px-6 sm:py-28 lg:px-8 lg:py-36"
    >
      {/* Top divider */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />

      <div className="relative z-10 mx-auto max-w-[1360px]">
        <div className="mx-auto max-w-3xl text-center">
          <ScrollFloat
            containerClassName="my-0 text-center"
            textClassName="text-[clamp(1.1rem,1.8vw,1.4rem)] font-medium tracking-[-0.02em] text-white/50"
          >
            What makes us different
          </ScrollFloat>
          <h2 className="mt-4 text-[clamp(2rem,5vw,4.2rem)] font-semibold leading-[1.06] tracking-[-0.055em] text-white">
            Why Us
          </h2>
        </div>

        <div className="mx-auto mt-14 max-w-4xl sm:mt-20">
          <div className="space-y-0">
            {differentiators.map((diff, i) => (
              <div
                key={diff.headline}
                data-why-item=""
                className="group border-b border-white/[0.06] py-10 first:pt-0 last:border-none sm:py-14"
              >
                <div className="flex items-start gap-6 sm:gap-10">
                  {/* Index */}
                  <span className="mt-1.5 shrink-0 text-sm font-medium tabular-nums tracking-[0.12em] text-white/16 sm:text-base">
                    {String(i + 1).padStart(2, "0")}
                  </span>

                  <div className="flex-1">
                    <h3 className="text-[clamp(1.4rem,3.5vw,2.2rem)] font-semibold leading-[1.1] tracking-[-0.04em] text-white transition-colors duration-300 group-hover:text-white/90">
                      {diff.headline}
                    </h3>
                    <p className="mt-4 max-w-2xl text-[clamp(0.88rem,1.4vw,1.02rem)] leading-7 text-white/40 sm:mt-5 sm:leading-8">
                      {diff.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
