"use client";

import {
  useEffect,
  useMemo,
  useRef,
  type ReactNode,
  type RefObject,
} from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface ScrollFloatProps {
  animationDuration?: number;
  children: ReactNode;
  containerClassName?: string;
  ease?: string;
  scrollContainerRef?: RefObject<HTMLElement | null>;
  scrollEnd?: string;
  scrollStart?: string;
  stagger?: number;
  textClassName?: string;
}

const ScrollFloat = ({
  children,
  scrollContainerRef,
  containerClassName = "",
  textClassName = "",
  animationDuration = 1,
  ease = "back.inOut(2)",
  scrollStart = "center bottom+=50%",
  scrollEnd = "bottom bottom-=40%",
  stagger = 0.03,
}: ScrollFloatProps) => {
  const containerRef = useRef<HTMLHeadingElement | null>(null);

  const splitText = useMemo(() => {
    const text = typeof children === "string" ? children : "";
    const words = text.split(" ");

    return words.map((word, wordIndex) => (
      <span key={`word-${wordIndex}`} className="inline-block whitespace-nowrap">
        {word.split("").map((char, charIndex) => (
          <span className="word inline-block" key={`${word}-${charIndex}`}>
            {char}
          </span>
        ))}
        {wordIndex < words.length - 1 ? (
          <span className="word inline-block">{"\u00A0"}</span>
        ) : null}
      </span>
    ));
  }, [children]);

  useEffect(() => {
    const element = containerRef.current;
    if (!element) {
      return;
    }

    // Disable animation on mobile — show text statically
    const mm = gsap.matchMedia();

    mm.add("(min-width: 768px)", () => {
      const scroller = scrollContainerRef?.current ?? window;
      const charElements = element.querySelectorAll<HTMLElement>(".word");

      if (!charElements.length) {
        return;
      }

      gsap.fromTo(
        charElements,
        {
          opacity: 0,
          scaleX: 0.7,
          scaleY: 2.3,
          transformOrigin: "50% 0%",
          willChange: "opacity, transform",
          yPercent: 120,
        },
        {
          duration: animationDuration,
          ease,
          opacity: 1,
          scaleX: 1,
          scaleY: 1,
          stagger,
          yPercent: 0,
          scrollTrigger: {
            end: scrollEnd,
            scroller,
            scrub: true,
            start: scrollStart,
            trigger: element,
          },
        },
      );
    });

    // Mobile: ensure characters are fully visible with no transforms
    mm.add("(max-width: 767px)", () => {
      const charElements = element.querySelectorAll<HTMLElement>(".word");
      charElements.forEach((el) => {
        el.style.opacity = "1";
        el.style.transform = "none";
      });
    });

    return () => {
      mm.revert();
    };
  }, [
    animationDuration,
    ease,
    scrollContainerRef,
    scrollEnd,
    scrollStart,
    stagger,
    splitText,
  ]);

  return (
    <h2
      ref={containerRef}
      className={`my-5 overflow-hidden ${containerClassName}`.trim()}
    >
      <span
        className={`inline-block text-[clamp(1.6rem,4vw,3rem)] leading-[1.5] ${textClassName}`.trim()}
      >
        {splitText}
      </span>
    </h2>
  );
};

export default ScrollFloat;
