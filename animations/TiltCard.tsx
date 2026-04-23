"use client";

import { type ReactNode, type HTMLAttributes, useRef } from "react";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useSpring,
  useTransform,
  useReducedMotion,
} from "motion/react";

interface TiltCardProps extends Omit<HTMLAttributes<HTMLDivElement>, "onAnimationStart" | "onDrag" | "onDragEnd" | "onDragStart"> {
  children: ReactNode;
  max?: number;
  perspective?: number;
  scale?: number;
  glare?: boolean;
  glareColor?: string;
  className?: string;
}

export function TiltCard({
  children,
  max = 10,
  perspective = 900,
  scale = 1.02,
  glare = true,
  glareColor = "rgba(255,255,255,0.18)",
  className = "",
  ...rest
}: TiltCardProps) {
  const prefersReducedMotion = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);
  const sx = useSpring(mx, { stiffness: 160, damping: 18, mass: 0.4 });
  const sy = useSpring(my, { stiffness: 160, damping: 18, mass: 0.4 });
  const rotateY = useTransform(sx, [0, 1], [-max, max]);
  const rotateX = useTransform(sy, [0, 1], [max, -max]);

  const gx = useTransform(sx, [0, 1], ["0%", "100%"]);
  const gy = useTransform(sy, [0, 1], ["0%", "100%"]);
  const glareBg = useMotionTemplate`radial-gradient(circle at ${gx} ${gy}, ${glareColor}, transparent 50%)`;

  const onMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (prefersReducedMotion) return;
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width);
    my.set((e.clientY - r.top) / r.height);
  };
  const reset = () => {
    mx.set(0.5);
    my.set(0.5);
  };

  return (
    <motion.div
      ref={ref}
      onPointerMove={onMove}
      onPointerLeave={reset}
      whileHover={prefersReducedMotion ? undefined : { scale }}
      transition={{ type: "spring", stiffness: 260, damping: 22 }}
      style={{
        rotateX,
        rotateY,
        transformPerspective: perspective,
        transformStyle: "preserve-3d",
      }}
      className={["relative", className].join(" ")}
      {...rest}
    >
      {children}
      {glare && (
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-70 mix-blend-overlay"
          style={{ background: glareBg }}
        />
      )}
    </motion.div>
  );
}

export default TiltCard;
