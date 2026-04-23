"use client";

import { motion } from "motion/react";

interface DividerProps {
  variant?: "line" | "glow" | "dotted" | "gradient";
  orientation?: "horizontal" | "vertical";
  length?: string;
  className?: string;
}

export function Divider({
  variant = "gradient",
  orientation = "horizontal",
  length = "100%",
  className = "",
}: DividerProps) {
  const isH = orientation === "horizontal";
  const base = isH
    ? { width: length, height: "1px" }
    : { height: length, width: "1px" };

  const bg =
    variant === "gradient"
      ? isH
        ? "linear-gradient(to right, transparent, rgba(125,211,252,0.45), rgba(167,139,250,0.4), transparent)"
        : "linear-gradient(to bottom, transparent, rgba(125,211,252,0.45), rgba(167,139,250,0.4), transparent)"
      : variant === "glow"
      ? isH
        ? "linear-gradient(to right, transparent, rgba(255,255,255,0.6), transparent)"
        : "linear-gradient(to bottom, transparent, rgba(255,255,255,0.6), transparent)"
      : variant === "dotted"
      ? "transparent"
      : "rgba(255,255,255,0.08)";

  return (
    <motion.div
      aria-hidden
      initial={{ opacity: 0, scaleX: isH ? 0.6 : 1, scaleY: isH ? 1 : 0.6 }}
      whileInView={{ opacity: 1, scaleX: 1, scaleY: 1 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      style={{
        ...base,
        background: bg,
        backgroundImage:
          variant === "dotted"
            ? isH
              ? "radial-gradient(circle, rgba(255,255,255,0.35) 1px, transparent 1px)"
              : "radial-gradient(circle, rgba(255,255,255,0.35) 1px, transparent 1px)"
            : undefined,
        backgroundSize: variant === "dotted" ? "8px 8px" : undefined,
        boxShadow:
          variant === "glow"
            ? "0 0 14px rgba(125,211,252,0.35), 0 0 28px rgba(167,139,250,0.22)"
            : undefined,
        transformOrigin: isH ? "left center" : "top center",
      }}
      className={className}
    />
  );
}

export default Divider;
