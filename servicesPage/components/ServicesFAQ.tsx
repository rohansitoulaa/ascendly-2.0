"use client";

import { useCallback, useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { faqItems } from "@/servicesPage/lib/servicesData";
import ScrollFloat from "@/animations/ScrollFloat";

gsap.registerPlugin(ScrollTrigger);

function FAQAccordion({
  question,
  answer,
  index,
}: {
  question: string;
  answer: string;
  index: number;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);

  const toggle = useCallback(() => {
    const content = contentRef.current;
    const inner = innerRef.current;
    if (!content || !inner) return;

    if (isOpen) {
      // Closing
      gsap.to(content, {
        height: 0,
        duration: 0.4,
        ease: "power3.inOut",
      });
      gsap.to(inner, {
        opacity: 0,
        y: -6,
        duration: 0.25,
        ease: "power2.in",
      });
    } else {
      // Opening
      const targetHeight = inner.scrollHeight;
      gsap.to(content, {
        height: targetHeight,
        duration: 0.45,
        ease: "power3.out",
      });
      gsap.to(inner, {
        opacity: 1,
        y: 0,
        duration: 0.35,
        ease: "power2.out",
        delay: 0.1,
      });
    }

    setIsOpen(!isOpen);
  }, [isOpen]);

  return (
    <div
      data-faq-item=""
      className="group border-b border-white/[0.06] last:border-none"
    >
      <button
        type="button"
        onClick={toggle}
        className="flex w-full items-start gap-4 py-6 text-left transition-colors duration-200 sm:gap-6 sm:py-7"
        aria-expanded={isOpen}
      >
        <span className="mt-0.5 shrink-0 text-xs font-medium tabular-nums tracking-[0.12em] text-white/16 sm:text-sm">
          {String(index + 1).padStart(2, "0")}
        </span>

        <span className="flex-1 text-base font-semibold tracking-[-0.02em] text-white transition-colors duration-200 group-hover:text-white/85 sm:text-lg">
          {question}
        </span>

        {/* Toggle icon */}
        <span className="relative mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-white/[0.08] bg-white/[0.03] transition-colors duration-200 group-hover:border-white/12">
          <span className="h-px w-3 bg-white/50 transition-transform duration-300" />
          <span
            className={`absolute h-3 w-px bg-white/50 transition-transform duration-300 ${
              isOpen ? "rotate-90" : "rotate-0"
            }`}
          />
        </span>
      </button>

      <div
        ref={contentRef}
        className="overflow-hidden"
        style={{ height: 0 }}
      >
        <div
          ref={innerRef}
          className="pb-6 pl-8 pr-4 sm:pb-7 sm:pl-12 sm:pr-6"
          style={{ opacity: 0, transform: "translateY(-6px)" }}
        >
          <p className="max-w-2xl text-sm leading-7 text-white/45 sm:text-[0.94rem] sm:leading-8">
            {answer}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function ServicesFAQ() {
  const sectionRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const mm = gsap.matchMedia();

    mm.add("(min-width: 768px)", () => {
      const items = gsap.utils.toArray<HTMLElement>("[data-faq-item]");
      gsap.set(items, { autoAlpha: 0, y: 16 });

      items.forEach((item, i) => {
        gsap.to(item, {
          autoAlpha: 1,
          y: 0,
          duration: 0.5,
          ease: "power3.out",
          delay: i * 0.06,
          scrollTrigger: {
            trigger: section,
            start: "top 72%",
            once: true,
          },
        });
      });
    });

    mm.add("(max-width: 767px)", () => {
      const items = gsap.utils.toArray<HTMLElement>("[data-faq-item]");
      items.forEach((el) => gsap.set(el, { autoAlpha: 1, y: 0 }));
    });

    return () => mm.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="faqs"
      className="relative overflow-hidden px-4 py-20 sm:px-6 sm:py-28 lg:px-8 lg:py-36"
    >
      <div className="relative z-10 mx-auto max-w-[1360px]">
        <div className="mx-auto max-w-3xl text-center">
          <ScrollFloat
            containerClassName="my-0 text-center"
            textClassName="text-[clamp(1.1rem,1.8vw,1.4rem)] font-medium tracking-[-0.02em] text-white/50"
          >
            Common questions
          </ScrollFloat>
          <h2 className="mt-4 text-[clamp(2rem,5vw,4.2rem)] font-semibold leading-[1.06] tracking-[-0.055em] text-white">
            FAQ
          </h2>
        </div>

        <div className="mx-auto mt-14 max-w-3xl sm:mt-18">
          {faqItems.map((faq, i) => (
            <FAQAccordion
              key={faq.question}
              question={faq.question}
              answer={faq.answer}
              index={i}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
