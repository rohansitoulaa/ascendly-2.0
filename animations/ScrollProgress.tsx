"use client";

import { motion, useScroll, useSpring } from "motion/react";

interface ScrollProgressProps {
  color?: string;
  height?: number;
  position?: "top" | "bottom";
  gradient?: boolean;
}

export function ScrollProgress({
  color = "rgb(125, 211, 252)",
  height = 2,
  position = "top",
  gradient = true,
}: ScrollProgressProps) {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 240,
    damping: 40,
    mass: 0.3,
  });

  const bg = gradient
    ? "linear-gradient(to right, rgb(34,211,238), rgb(125,211,252), rgb(167,139,250))"
    : color;

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed inset-x-0 z-[100] origin-left"
      style={{
        [position]: 0,
        height,
        scaleX,
        background: bg,
      }}
    />
  );
}

export default ScrollProgress;
