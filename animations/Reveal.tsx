"use client";

import { type ReactNode, useMemo, useRef } from "react";
import {
  motion,
  useInView,
  useReducedMotion,
  type Transition,
} from "motion/react";

type RevealDirection = "up" | "down" | "left" | "right" | "scale" | "blur" | "none";

interface RevealProps {
  children: ReactNode;
  className?: string;
  direction?: RevealDirection;
  distance?: number;
  delay?: number;
  duration?: number;
  once?: boolean;
  amount?: number;
  stagger?: number;
  margin?: string;
  /** Render as inline (uses span instead of div). */
  inline?: boolean;
}

function offsetFor(direction: RevealDirection, distance: number) {
  switch (direction) {
    case "up":
      return { y: distance, x: 0, scale: 1, filter: "blur(0px)" };
    case "down":
      return { y: -distance, x: 0, scale: 1, filter: "blur(0px)" };
    case "left":
      return { x: distance, y: 0, scale: 1, filter: "blur(0px)" };
    case "right":
      return { x: -distance, y: 0, scale: 1, filter: "blur(0px)" };
    case "scale":
      return { x: 0, y: 0, scale: 0.92, filter: "blur(0px)" };
    case "blur":
      return { x: 0, y: distance / 2, scale: 0.98, filter: "blur(14px)" };
    default:
      return { x: 0, y: 0, scale: 1, filter: "blur(0px)" };
  }
}

export function Reveal({
  children,
  className,
  direction = "up",
  distance = 36,
  delay = 0,
  duration = 0.9,
  once = true,
  amount = 0.25,
  stagger,
  margin = "0px 0px -12% 0px",
  inline = false,
}: RevealProps) {
  const ref = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const inView = useInView(ref, { once, amount, margin: margin as never });

  const hidden = useMemo(
    () => ({ opacity: 0, ...offsetFor(direction, distance) }),
    [direction, distance],
  );
  const visible = useMemo(
    () => ({ opacity: 1, x: 0, y: 0, scale: 1, filter: "blur(0px)" }),
    [],
  );

  const Component = inline ? motion.span : motion.div;

  if (prefersReducedMotion) {
    return (
      <Component ref={ref as never} className={className}>
        {children}
      </Component>
    );
  }

  const transition: Transition = {
    duration,
    delay,
    ease: [0.22, 1, 0.36, 1],
    ...(stagger ? { staggerChildren: stagger, delayChildren: delay } : {}),
  };

  return (
    <Component
      ref={ref as never}
      className={className}
      initial={hidden}
      animate={inView ? visible : hidden}
      transition={transition}
    >
      {children}
    </Component>
  );
}

interface RevealGroupProps {
  children: ReactNode;
  className?: string;
  stagger?: number;
  delay?: number;
  once?: boolean;
  amount?: number;
  margin?: string;
  inline?: boolean;
}

export function RevealGroup({
  children,
  className,
  stagger = 0.08,
  delay = 0,
  once = true,
  amount = 0.2,
  margin = "0px 0px -10% 0px",
  inline = false,
}: RevealGroupProps) {
  const ref = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const inView = useInView(ref, { once, amount, margin: margin as never });
  const Component = inline ? motion.span : motion.div;

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
    >
      {children}
    </Component>
  );
}

interface RevealChildProps {
  children: ReactNode;
  className?: string;
  direction?: RevealDirection;
  distance?: number;
  duration?: number;
  inline?: boolean;
}

export function RevealChild({
  children,
  className,
  direction = "up",
  distance = 24,
  duration = 0.8,
  inline = false,
}: RevealChildProps) {
  const hidden = { opacity: 0, ...offsetFor(direction, distance) };
  const visible = { opacity: 1, x: 0, y: 0, scale: 1, filter: "blur(0px)" };
  const Component = inline ? motion.span : motion.div;

  return (
    <Component
      className={className}
      variants={{ hidden, visible }}
      transition={{ duration, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </Component>
  );
}

export default Reveal;
