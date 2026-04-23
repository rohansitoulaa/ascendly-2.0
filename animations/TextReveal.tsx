"use client";

import { useMemo, useRef } from "react";
import {
  motion,
  useInView,
  useReducedMotion,
  type Variants,
} from "motion/react";

type Style = "fade-up" | "blur-in" | "mask-sweep" | "wave" | "scale-char";
type SplitBy = "word" | "char";

interface TextRevealProps {
  children: string;
  className?: string;
  charClassName?: string;
  style?: Style;
  splitBy?: SplitBy;
  stagger?: number;
  delay?: number;
  duration?: number;
  once?: boolean;
  amount?: number;
  /** Use span (inline) or div (block). Default: span. */
  as?: "span" | "div";
}

const variantBuilders: Record<Style, (duration: number) => Variants> = {
  "fade-up": (duration) => ({
    hidden: { opacity: 0, y: "72%", rotate: 4 },
    visible: {
      opacity: 1,
      y: 0,
      rotate: 0,
      transition: { duration, ease: [0.22, 1, 0.36, 1] },
    },
  }),
  "blur-in": (duration) => ({
    hidden: { opacity: 0, filter: "blur(12px)", y: 14 },
    visible: {
      opacity: 1,
      filter: "blur(0px)",
      y: 0,
      transition: { duration, ease: [0.22, 1, 0.36, 1] },
    },
  }),
  "mask-sweep": (duration) => ({
    hidden: { y: "120%", opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration, ease: [0.76, 0, 0.24, 1] },
    },
  }),
  wave: (duration) => ({
    hidden: { y: 24, opacity: 0 },
    visible: (i: number = 0) => ({
      y: 0,
      opacity: 1,
      transition: {
        duration,
        delay: (i % 10) * 0.02,
        ease: [0.33, 1, 0.68, 1],
      },
    }),
  }),
  "scale-char": (duration) => ({
    hidden: { opacity: 0, scale: 0.6, y: 20 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { duration, ease: [0.22, 1.4, 0.36, 1] },
    },
  }),
};

function splitLabel(text: string, by: SplitBy) {
  const words = text.split(" ");
  if (by === "word") {
    return words.map((word, i) => ({
      key: `${word}-${i}`,
      parts: [{ key: `${word}-${i}-w`, text: word }],
      isLast: i === words.length - 1,
    }));
  }
  return words.map((word, i) => ({
    key: `${word}-${i}`,
    parts: word.split("").map((ch, j) => ({ key: `${word}-${i}-${j}`, text: ch })),
    isLast: i === words.length - 1,
  }));
}

export function TextReveal({
  children,
  className,
  charClassName,
  style = "fade-up",
  splitBy = "char",
  stagger = 0.025,
  delay = 0,
  duration = 0.8,
  once = true,
  amount = 0.4,
  as = "span",
}: TextRevealProps) {
  const ref = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const inView = useInView(ref, { once, amount });
  const words = useMemo(() => splitLabel(children, splitBy), [children, splitBy]);
  const variants = useMemo(() => variantBuilders[style](duration), [style, duration]);

  const usesMask = style === "mask-sweep";
  const Component = as === "div" ? motion.div : motion.span;

  if (prefersReducedMotion) {
    return (
      <Component ref={ref as never} className={className}>
        {children}
      </Component>
    );
  }

  return (
    <Component
      ref={ref as never}
      className={className}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      transition={{ staggerChildren: stagger, delayChildren: delay }}
      aria-label={children}
    >
      {words.map((word, wi) => (
        <span
          key={word.key}
          className="inline-block whitespace-nowrap"
          aria-hidden
        >
          {word.parts.map((part, pi) => {
            const inner = (
              <motion.span
                variants={variants}
                custom={wi * 3 + pi}
                className={`inline-block ${charClassName ?? ""}`.trim()}
              >
                {part.text}
              </motion.span>
            );
            return usesMask ? (
              <span
                key={part.key}
                className="inline-block overflow-hidden align-baseline"
              >
                {inner}
              </span>
            ) : (
              <span key={part.key} className="inline-block">
                {inner}
              </span>
            );
          })}
          {!word.isLast && <span className="inline-block">&nbsp;</span>}
        </span>
      ))}
    </Component>
  );
}

export default TextReveal;
