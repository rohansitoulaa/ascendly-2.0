"use client";

import { useEffect, useRef, useState } from "react";
import { useInView, useMotionValue, useSpring, useReducedMotion } from "motion/react";

interface CounterProps {
  from?: number;
  to: number;
  duration?: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  separator?: string;
  className?: string;
  once?: boolean;
}

export function Counter({
  from = 0,
  to,
  duration = 1.8,
  decimals = 0,
  prefix = "",
  suffix = "",
  separator = ",",
  className = "",
  once = true,
}: CounterProps) {
  const prefersReducedMotion = useReducedMotion();
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once, amount: 0.5 });
  const mv = useMotionValue(from);
  const spring = useSpring(mv, {
    stiffness: 90,
    damping: 24,
    mass: 0.6,
    duration: duration * 1000,
  });
  const [display, setDisplay] = useState(from);

  useEffect(() => {
    if (!inView) return;
    if (prefersReducedMotion) {
      mv.jump(to);
      spring.jump(to);
      return;
    }
    mv.set(to);
  }, [inView, to, mv, spring, prefersReducedMotion]);

  useEffect(() => {
    const unsub = spring.on("change", (v) => setDisplay(v));
    return () => unsub();
  }, [spring]);

  const format = (n: number) => {
    const fixed = n.toFixed(decimals);
    const [int, dec] = fixed.split(".");
    const withSep = int.replace(/\B(?=(\d{3})+(?!\d))/g, separator);
    return dec ? `${withSep}.${dec}` : withSep;
  };

  return (
    <span ref={ref} className={className}>
      {prefix}
      {format(display)}
      {suffix}
    </span>
  );
}

export default Counter;
