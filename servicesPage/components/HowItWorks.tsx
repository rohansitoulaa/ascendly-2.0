"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { milestones } from "@/servicesPage/lib/servicesData";
import ScrollFloat from "@/animations/ScrollFloat";

gsap.registerPlugin(ScrollTrigger);

export default function HowItWorks() {
  const sectionRef = useRef<HTMLElement>(null);
  const timelineTrackRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const track = timelineTrackRef.current;
    if (!section) return;

    const mm = gsap.matchMedia();

    mm.add("(min-width: 768px)", () => {
      // Milestone cards stagger
      const items = gsap.utils.toArray<HTMLElement>("[data-milestone]");
      gsap.set(items, { autoAlpha: 0, y: 24 });

      items.forEach((item, i) => {
        gsap.to(item, {
          autoAlpha: 1,
          y: 0,
          duration: 0.65,
          ease: "power3.out",
          delay: i * 0.12,
          scrollTrigger: {
            trigger: item,
            start: "top 82%",
            once: true,
          },
        });
      });

      // Timeline fill
      if (track) {
        gsap.fromTo(
          track,
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: "none",
            scrollTrigger: {
              trigger: section,
              start: "top 60%",
              end: "bottom 40%",
              scrub: 1,
            },
          }
        );
      }
    });

    mm.add("(max-width: 767px)", () => {
      const items = gsap.utils.toArray<HTMLElement>("[data-milestone]");
      items.forEach((el) => gsap.set(el, { autoAlpha: 1, y: 0 }));
      if (track) track.style.transform = "scaleY(1)";
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
            Your timeline
          </ScrollFloat>
          <h2 className="mt-4 text-[clamp(2rem,5vw,4.2rem)] font-semibold leading-[1.06] tracking-[-0.055em] text-white">
            How It Works
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-[clamp(0.9rem,1.5vw,1.05rem)] leading-7 text-white/45">
            From onboarding to closed deals in 10 weeks. Here&rsquo;s what the timeline looks like.
          </p>
        </div>

        <div className="relative mx-auto mt-14 max-w-3xl sm:mt-20">
          {/* Vertical timeline track */}
          <div className="absolute bottom-0 left-5 top-0 w-px bg-white/[0.06] sm:left-8 md:left-1/2 md:-translate-x-px">
            <div
              ref={timelineTrackRef}
              className="absolute inset-x-0 top-0 h-full origin-top bg-gradient-to-b from-sky-400/40 via-emerald-400/30 to-amber-400/20"
            />
          </div>

          <div className="space-y-8 sm:space-y-12">
            {milestones.map((ms, i) => {
              const Icon = ms.icon;
              const isRight = i % 2 === 1;

              return (
                <div
                  key={ms.title}
                  data-milestone=""
                  className={`relative flex items-start gap-5 sm:gap-8 md:gap-0 ${
                    isRight ? "md:flex-row-reverse" : ""
                  }`}
                >
                  {/* Node dot */}
                  <div className="absolute left-5 top-3 z-20 flex items-center justify-center sm:left-8 md:left-1/2 md:-translate-x-1/2">
                    <span className="h-3 w-3 rounded-full border-2 border-white/20 bg-[#0c0e10]" />
                  </div>

                  {/* Spacer for mobile left-aligned */}
                  <div className="hidden w-12 shrink-0 sm:block sm:w-16 md:hidden" />
                  <div className="w-10 shrink-0 sm:hidden" />

                  {/* Content card */}
                  <div className={`flex-1 rounded-2xl border border-white/[0.06] bg-white/[0.02] p-5 sm:rounded-[22px] sm:p-6 ${
                    isRight ? "md:mr-[calc(50%+2rem)]" : "md:ml-[calc(50%+2rem)]"
                  }`}>
                    <div className="flex items-center gap-3">
                      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/[0.05] text-white/50">
                        <Icon className="h-4 w-4" />
                      </div>
                      <span className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-[0.62rem] font-semibold uppercase tracking-[0.24em] text-white/50">
                        {ms.week}
                      </span>
                    </div>

                    <h3 className="mt-4 text-lg font-semibold tracking-[-0.03em] text-white">
                      {ms.title}
                    </h3>
                    <p className="mt-2 text-sm leading-6 text-white/45">
                      {ms.description}
                    </p>
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
