"use client";

import { type ReactNode, useMemo } from "react";
import { motion, useReducedMotion } from "motion/react";

type SplitMode = "char" | "word" | "line";
type Animation = "rise" | "fade" | "wave" | "flicker" | "stagger-blur";

interface SplitTextProps {
  children: string;
  split?: SplitMode;
  animation?: Animation;
  duration?: number;
  stagger?: number;
  delay?: number;
  amount?: number;
  once?: boolean;
  className?: string;
  itemClassName?: string;
}

export function SplitText({
  children,
  split = "char",
  animation = "rise",
  duration = 0.7,
  stagger = 0.02,
  delay = 0,
  amount = 0.35,
  once = true,
  className = "",
  itemClassName = "",
}: SplitTextProps): ReactNode {
  const prefersReducedMotion = useReducedMotion();

  const pieces = useMemo(() => {
    const text = children ?? "";
    if (split === "word") return text.split(/(\s+)/);
    if (split === "line") return text.split(/\r?\n/);
    return Array.from(text);
  }, [children, split]);

  if (prefersReducedMotion) {
    return <span className={className}>{children}</span>;
  }

  const variants = {
    rise: {
      hidden: { y: "110%", opacity: 0 },
      show: { y: "0%", opacity: 1 },
    },
    fade: {
      hidden: { opacity: 0 },
      show: { opacity: 1 },
    },
    wave: {
      hidden: { y: 18, opacity: 0 },
      show: { y: 0, opacity: 1 },
    },
    flicker: {
      hidden: { opacity: 0, filter: "blur(8px)" },
      show: { opacity: 1, filter: "blur(0px)" },
    },
    "stagger-blur": {
      hidden: { opacity: 0, y: 14, filter: "blur(10px)" },
      show: { opacity: 1, y: 0, filter: "blur(0px)" },
    },
  } as const;

  const v = variants[animation];
  const needsMask = animation === "rise";

  return (
    <motion.span
      initial="hidden"
      whileInView="show"
      viewport={{ once, amount }}
      transition={{ staggerChildren: stagger, delayChildren: delay }}
      className={["inline-block", className].join(" ")}
      aria-label={children}
    >
      {pieces.map((piece, i) => {
        if (/^\s+$/.test(piece)) return <span key={i}>{piece}</span>;
        return (
          <span
            key={i}
            aria-hidden
            className={[
              "inline-block",
              needsMask ? "overflow-hidden align-bottom" : "",
              itemClassName,
            ].join(" ")}
          >
            <motion.span
              className="inline-block"
              variants={v}
              transition={{ duration, ease: [0.22, 1, 0.36, 1] }}
            >
              {piece === " " ? "\u00A0" : piece}
            </motion.span>
          </span>
        );
      })}
    </motion.span>
  );
}

export default SplitText;
