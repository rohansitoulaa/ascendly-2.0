"use client";

import { useEffect } from "react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "motion/react";

interface SpotlightCursorProps {
  size?: number;
  color?: string;
  blend?: "screen" | "overlay" | "plus-lighter" | "normal";
  opacity?: number;
}

export function SpotlightCursor({
  size = 480,
  color = "rgba(125, 211, 252, 0.18)",
  blend = "screen",
  opacity = 1,
}: SpotlightCursorProps) {
  const prefersReducedMotion = useReducedMotion();
  const x = useMotionValue(-9999);
  const y = useMotionValue(-9999);
  const sx = useSpring(x, { stiffness: 140, damping: 22, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 140, damping: 22, mass: 0.4 });

  useEffect(() => {
    if (prefersReducedMotion) return;
    // Skip on touch devices
    if (typeof window !== "undefined" && window.matchMedia("(hover: none)").matches) return;

    const onMove = (e: MouseEvent) => {
      x.set(e.clientX - size / 2);
      y.set(e.clientY - size / 2);
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, [prefersReducedMotion, size, x, y]);

  if (prefersReducedMotion) return null;

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed z-[50] rounded-full"
      style={{
        left: sx,
        top: sy,
        width: size,
        height: size,
        background: `radial-gradient(closest-side, ${color}, transparent 70%)`,
        mixBlendMode: blend,
        opacity,
        filter: "blur(2px)",
      }}
    />
  );
}

export default SpotlightCursor;
