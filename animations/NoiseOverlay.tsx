"use client";

interface NoiseOverlayProps {
  opacity?: number;
  blend?: "overlay" | "soft-light" | "multiply" | "screen" | "normal";
  fixed?: boolean;
  zIndex?: number;
  className?: string;
}

const noiseSvg =
  "data:image/svg+xml;utf8," +
  encodeURIComponent(
    `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 200'>
      <filter id='n'>
        <feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/>
        <feColorMatrix values='0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 0 0.55 0'/>
      </filter>
      <rect width='100%' height='100%' filter='url(#n)'/>
    </svg>`
  );

export function NoiseOverlay({
  opacity = 0.06,
  blend = "overlay",
  fixed = true,
  zIndex = 2,
  className = "",
}: NoiseOverlayProps) {
  return (
    <div
      aria-hidden
      className={[
        "pointer-events-none",
        fixed ? "fixed inset-0" : "absolute inset-0",
        className,
      ].join(" ")}
      style={{
        backgroundImage: `url("${noiseSvg}")`,
        backgroundSize: "200px 200px",
        mixBlendMode: blend,
        opacity,
        zIndex,
      }}
    />
  );
}

export default NoiseOverlay;
