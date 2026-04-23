"use client";

import { type CSSProperties, useMemo } from "react";

type Palette = "aurora" | "obsidian" | "ember" | "violet" | "cyan";

interface GradientMeshProps {
  palette?: Palette;
  className?: string;
  opacity?: number;
  blur?: number;
  /** Grain overlay strength (0–1). */
  grain?: number;
  /** Animation speed multiplier. 1 = default. 0 = static. */
  speed?: number;
}

const palettes: Record<
  Palette,
  { blobs: Array<{ color: string; pos: string; size: string }>; base: string }
> = {
  aurora: {
    base: "#05070a",
    blobs: [
      { color: "rgba(14, 165, 233, 0.28)", pos: "12% 18%", size: "44rem" },
      { color: "rgba(56, 189, 248, 0.22)", pos: "88% 22%", size: "38rem" },
      { color: "rgba(16, 185, 129, 0.18)", pos: "74% 82%", size: "40rem" },
      { color: "rgba(99, 102, 241, 0.2)", pos: "18% 88%", size: "36rem" },
    ],
  },
  obsidian: {
    base: "#050608",
    blobs: [
      { color: "rgba(100, 116, 139, 0.2)", pos: "10% 14%", size: "40rem" },
      { color: "rgba(134, 146, 153, 0.18)", pos: "92% 18%", size: "36rem" },
      { color: "rgba(71, 85, 105, 0.2)", pos: "80% 86%", size: "42rem" },
      { color: "rgba(148, 163, 184, 0.14)", pos: "20% 92%", size: "34rem" },
    ],
  },
  ember: {
    base: "#070506",
    blobs: [
      { color: "rgba(244, 63, 94, 0.22)", pos: "18% 20%", size: "40rem" },
      { color: "rgba(251, 146, 60, 0.2)", pos: "84% 16%", size: "36rem" },
      { color: "rgba(168, 85, 247, 0.18)", pos: "72% 84%", size: "40rem" },
      { color: "rgba(217, 70, 239, 0.16)", pos: "18% 88%", size: "34rem" },
    ],
  },
  violet: {
    base: "#06060c",
    blobs: [
      { color: "rgba(124, 58, 237, 0.24)", pos: "14% 16%", size: "44rem" },
      { color: "rgba(168, 85, 247, 0.22)", pos: "88% 20%", size: "38rem" },
      { color: "rgba(56, 189, 248, 0.18)", pos: "78% 84%", size: "40rem" },
      { color: "rgba(236, 72, 153, 0.18)", pos: "16% 90%", size: "36rem" },
    ],
  },
  cyan: {
    base: "#040608",
    blobs: [
      { color: "rgba(34, 211, 238, 0.26)", pos: "16% 20%", size: "42rem" },
      { color: "rgba(14, 165, 233, 0.24)", pos: "86% 18%", size: "38rem" },
      { color: "rgba(59, 130, 246, 0.2)", pos: "74% 82%", size: "40rem" },
      { color: "rgba(20, 184, 166, 0.2)", pos: "18% 88%", size: "34rem" },
    ],
  },
};

export function GradientMesh({
  palette = "obsidian",
  className,
  opacity = 1,
  blur = 90,
  grain = 0.5,
  speed = 1,
}: GradientMeshProps) {
  const config = palettes[palette];

  const baseStyle: CSSProperties = useMemo(
    () => ({
      background: config.base,
      opacity,
    }),
    [config.base, opacity],
  );

  const duration = speed === 0 ? 0 : 24 / Math.max(speed, 0.1);

  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className ?? ""}`}
      style={baseStyle}
    >
      {config.blobs.map((blob, i) => (
        <div
          key={i}
          className="gradient-mesh-blob absolute rounded-full"
          style={{
            left: blob.pos.split(" ")[0],
            top: blob.pos.split(" ")[1],
            width: blob.size,
            height: blob.size,
            background: `radial-gradient(circle at center, ${blob.color}, transparent 62%)`,
            filter: `blur(${blur}px)`,
            transform: "translate(-50%, -50%)",
            willChange: "transform",
            animationDuration: duration ? `${duration + i * 4}s` : "0s",
            animationDelay: `${i * -6}s`,
          }}
        />
      ))}
      {grain > 0 && (
        <div
          className="absolute inset-0 mix-blend-overlay"
          style={{
            opacity: grain * 0.4,
            backgroundImage:
              "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.6 0'/></filter><rect width='160' height='160' filter='url(%23n)'/></svg>\")",
          }}
        />
      )}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.45) 100%)",
        }}
      />
    </div>
  );
}

export default GradientMesh;
