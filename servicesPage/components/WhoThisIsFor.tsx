"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { audienceItems } from "@/servicesPage/lib/servicesData";
import ScrollFloat from "@/animations/ScrollFloat";
import { FiCheckCircle } from "react-icons/fi";

gsap.registerPlugin(ScrollTrigger);

export default function WhoThisIsFor() {
  const sectionRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const mm = gsap.matchMedia();

    mm.add("(min-width: 768px)", () => {
      const items = gsap.utils.toArray<HTMLElement>("[data-audience-item]");
      gsap.set(items, { autoAlpha: 0, y: 24 });

      items.forEach((item, i) => {
        gsap.to(item, {
          autoAlpha: 1,
          y: 0,
          duration: 0.6,
          ease: "power3.out",
          delay: i * 0.1,
          scrollTrigger: {
            trigger: section,
            start: "top 75%",
            once: true,
          },
        });
      });
    });

    mm.add("(max-width: 767px)", () => {
      const items = gsap.utils.toArray<HTMLElement>("[data-audience-item]");
      items.forEach((el) => gsap.set(el, { autoAlpha: 1, y: 0 }));
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
            Is this for you?
          </ScrollFloat>
          <h2 className="mt-4 text-[clamp(2rem,5vw,4.2rem)] font-semibold leading-[1.06] tracking-[-0.055em] text-white">
            Who This Is For
          </h2>
        </div>

        <div className="mx-auto mt-14 grid max-w-4xl gap-5 sm:mt-18 md:grid-cols-3 md:gap-6">
          {audienceItems.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.title}
                data-audience-item=""
                className="group relative overflow-hidden rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 transition-all duration-300 hover:border-white/10 hover:bg-white/[0.04] sm:rounded-[22px] sm:p-7"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/[0.05] text-white/50">
                    <Icon className="h-[18px] w-[18px]" />
                  </div>
                  <FiCheckCircle className="ml-auto h-5 w-5 text-emerald-400/50 transition-colors duration-300 group-hover:text-emerald-400/80" />
                </div>

                <h3 className="mt-5 text-lg font-semibold tracking-[-0.03em] text-white">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-6 text-white/45">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
