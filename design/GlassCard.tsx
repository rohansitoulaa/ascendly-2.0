"use client";

import {
  type HTMLAttributes,
  type ReactNode,
  useRef,
} from "react";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "motion/react";

interface GlassCardProps extends Omit<HTMLAttributes<HTMLDivElement>, "onAnimationStart" | "onDrag" | "onDragEnd" | "onDragStart"> {
  children: ReactNode;
  tilt?: boolean;
  spotlight?: boolean;
  glow?: boolean;
  accent?: "cyan" | "violet" | "emerald" | "rose" | "amber" | "none";
  className?: string;
  innerClassName?: string;
}

const accentMap = {
  cyan: {
    glow: "rgba(34, 211, 238, 0.35)",
    ring: "rgba(125, 211, 252, 0.22)",
  },
  violet: {
    glow: "rgba(167, 139, 250, 0.35)",
    ring: "rgba(196, 181, 253, 0.22)",
  },
  emerald: {
    glow: "rgba(52, 211, 153, 0.32)",
    ring: "rgba(110, 231, 183, 0.22)",
  },
  rose: {
    glow: "rgba(251, 113, 133, 0.32)",
    ring: "rgba(253, 164, 175, 0.22)",
  },
  amber: {
    glow: "rgba(251, 191, 36, 0.32)",
    ring: "rgba(253, 224, 71, 0.22)",
  },
  none: {
    glow: "rgba(255, 255, 255, 0.18)",
    ring: "rgba(255, 255, 255, 0.1)",
  },
};

export function GlassCard({
  children,
  tilt = true,
  spotlight = true,
  glow = true,
  accent = "cyan",
  className = "",
  innerClassName = "",
  ...rest
}: GlassCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);
  const smoothX = useSpring(mx, { stiffness: 160, damping: 22 });
  const smoothY = useSpring(my, { stiffness: 160, damping: 22 });

  const rotateX = useTransform(smoothY, [0, 1], [8, -8]);
  const rotateY = useTransform(smoothX, [0, 1], [-10, 10]);
  const spotlightX = useTransform(smoothX, (v) => `${v * 100}%`);
  const spotlightY = useTransform(smoothY, (v) => `${v * 100}%`);
  const spotlightBg = useMotionTemplate`radial-gradient(360px circle at ${spotlightX} ${spotlightY}, ${accentMap[accent].glow}, transparent 55%)`;

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current || prefersReducedMotion) return;
    const rect = ref.current.getBoundingClientRect();
    mx.set((e.clientX - rect.left) / rect.width);
    my.set((e.clientY - rect.top) / rect.height);
  };

  const handleLeave = () => {
    mx.set(0.5);
    my.set(0.5);
  };

  const accentColors = accentMap[accent];

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={
        tilt && !prefersReducedMotion
          ? { rotateX, rotateY, transformPerspective: 900, transformStyle: "preserve-3d" }
          : undefined
      }
      className={[
        "group relative overflow-hidden rounded-[clamp(18px,2.4vw,28px)] border border-white/[0.08] bg-gradient-to-br from-white/[0.035] to-white/[0.01] backdrop-blur-xl transition-[border-color,box-shadow] duration-500",
        glow
          ? "shadow-[0_24px_80px_rgba(0,0,0,0.45),inset_0_1px_0_rgba(255,255,255,0.06)] hover:border-white/15 hover:shadow-[0_28px_92px_rgba(0,0,0,0.55),0_0_0_1px_rgba(255,255,255,0.1),inset_0_1px_0_rgba(255,255,255,0.1)]"
          : "",
        className,
      ].join(" ")}
      {...rest}
    >
      {/* Spotlight cursor glow */}
      {spotlight && !prefersReducedMotion && (
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          style={{ background: spotlightBg }}
        />
      )}

      {/* Top edge light */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/25 to-transparent"
      />

      {/* Accent ring (visible on hover) */}
      {glow && (
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          style={{
            boxShadow: `inset 0 0 0 1px ${accentColors.ring}, 0 0 80px -10px ${accentColors.glow}`,
          }}
        />
      )}

      <div className={["relative z-10", innerClassName].join(" ")}>
        {children}
      </div>
    </motion.div>
  );
}

export default GlassCard;
