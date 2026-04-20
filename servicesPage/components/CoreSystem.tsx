"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { gearCards } from "@/servicesPage/lib/servicesData";
import { FiCheckCircle } from "react-icons/fi";
import BorderGlow from "@/animations/BorderGlow";
import ScrollFloat from "@/animations/ScrollFloat";

gsap.registerPlugin(ScrollTrigger);

export default function CoreSystem() {
  const sectionRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const mm = gsap.matchMedia();

    mm.add("(min-width: 768px)", () => {
      const cards = gsap.utils.toArray<HTMLElement>("[data-gear-card]");
      gsap.set(cards, { autoAlpha: 0, y: 36 });

      cards.forEach((card, i) => {
        gsap.to(card, {
          autoAlpha: 1,
          y: 0,
          duration: 0.75,
          ease: "power3.out",
          delay: i * 0.14,
          scrollTrigger: {
            trigger: section,
            start: "top 72%",
            once: true,
          },
        });
      });
    });

    mm.add("(max-width: 767px)", () => {
      const cards = gsap.utils.toArray<HTMLElement>("[data-gear-card]");
      cards.forEach((el) => gsap.set(el, { autoAlpha: 1, y: 0 }));
    });

    return () => mm.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden px-4 py-20 sm:px-6 sm:py-28 lg:px-8 lg:py-36"
    >
      {/* Ambient */}
      <div className="pointer-events-none absolute right-0 top-1/4 h-[500px] w-[500px] bg-[radial-gradient(ellipse_at_center,rgba(56,189,248,0.04),transparent_65%)]" />
      <div className="pointer-events-none absolute bottom-0 left-0 h-[400px] w-[400px] bg-[radial-gradient(ellipse_at_center,rgba(16,185,129,0.04),transparent_65%)]" />

      <div className="relative z-10 mx-auto max-w-[1360px]">
        <div className="mx-auto max-w-3xl text-center">
          <ScrollFloat
            containerClassName="my-0 text-center"
            textClassName="text-[clamp(1.1rem,1.8vw,1.4rem)] font-medium tracking-[-0.02em] text-white/50"
          >
            Core differentiation
          </ScrollFloat>
          <h2 className="mt-4 text-[clamp(2rem,5vw,4.2rem)] font-semibold leading-[1.06] tracking-[-0.055em] text-white">
            Two gears.{" "}
            <span className="text-white/50">One revenue machine.</span>
          </h2>
        </div>

        <div className="mx-auto mt-14 grid max-w-6xl gap-6 sm:mt-20 lg:grid-cols-2">
          {gearCards.map((gear, i) => (
            <div key={gear.title} data-gear-card="">
              <BorderGlow
                animated={i === 0}
                backgroundColor="rgba(7,17,28,0.78)"
                borderRadius={28}
                className={`h-full ${gear.borderClass}`}
                colors={
                  i === 0
                    ? ["rgba(56,189,248,0.72)", "rgba(14,165,233,0.66)", "rgba(100,116,139,0.5)"]
                    : ["rgba(16,185,129,0.72)", "rgba(52,211,153,0.66)", "rgba(100,116,139,0.5)"]
                }
                edgeSensitivity={20}
                fillOpacity={0.24}
                glowColor={i === 0 ? "200 80 60" : "160 70 55"}
                glowIntensity={0.82}
                surface="dark"
              >
                <div className="flex h-full flex-col p-6 sm:p-8">
                  {/* Header */}
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className={`flex h-10 w-10 items-center justify-center rounded-xl sm:h-12 sm:w-12 sm:rounded-[16px] ${gear.iconBgClass}`}>
                        <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <span className="inline-flex rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-[0.62rem] font-medium uppercase tracking-[0.24em] text-white/45">
                        Gear {i + 1}
                      </span>
                    </div>
                    <span className="text-[0.62rem] font-semibold uppercase tracking-[0.28em] text-white/20">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>

                  {/* Title */}
                  <div className="mt-6 sm:mt-8">
                    <h3 className="text-[clamp(1.5rem,3vw,2.2rem)] font-semibold leading-[1.06] tracking-[-0.04em] text-white">
                      {gear.title}
                    </h3>
                    <p className="mt-2 text-sm leading-6 text-white/45 sm:text-[0.94rem] sm:leading-7">
                      {gear.subtitle}
                    </p>
                  </div>

                  {/* Points */}
                  <div className="mt-6 grid gap-2.5 sm:mt-8 sm:gap-3">
                    {gear.points.map((point) => (
                      <div
                        key={point}
                        className="flex items-start gap-3 rounded-[16px] border border-white/[0.06] bg-white/[0.02] px-4 py-3 sm:rounded-[20px] sm:px-5 sm:py-3.5"
                      >
                        <FiCheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400/80" />
                        <p className="text-[0.85rem] leading-6 text-white/65 sm:text-sm sm:leading-6">
                          {point}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </BorderGlow>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
