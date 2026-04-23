"use client";

import { type ReactNode } from "react";
import { motion } from "motion/react";

interface BadgeProps {
  children: ReactNode;
  dot?: boolean;
  dotColor?: string;
  className?: string;
  variant?: "default" | "solid" | "glow";
}

const variantStyles: Record<NonNullable<BadgeProps["variant"]>, string> = {
  default:
    "border-white/10 bg-white/[0.04] text-white/72 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]",
  solid:
    "border-white/20 bg-white/10 text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.15)]",
  glow:
    "border-cyan-300/20 bg-cyan-400/[0.06] text-cyan-100 shadow-[0_0_0_1px_rgba(125,211,252,0.05),inset_0_1px_0_rgba(255,255,255,0.04),0_0_18px_rgba(34,211,238,0.14)]",
};

export function Badge({
  children,
  dot = false,
  dotColor = "rgb(34, 211, 238)",
  className = "",
  variant = "default",
}: BadgeProps) {
  return (
    <span
      className={[
        "inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5 text-[0.66rem] font-medium uppercase tracking-[0.28em] backdrop-blur-md sm:text-[0.7rem]",
        variantStyles[variant],
        className,
      ].join(" ")}
    >
      {dot && (
        <span className="relative inline-flex h-1.5 w-1.5">
          <motion.span
            className="absolute inset-0 rounded-full"
            style={{ background: dotColor, boxShadow: `0 0 12px ${dotColor}` }}
            animate={{ scale: [1, 1.35, 1], opacity: [1, 0.6, 1] }}
            transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
          />
        </span>
      )}
      {children}
    </span>
  );
}

export default Badge;
