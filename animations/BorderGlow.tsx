"use client";

import {
  type PointerEvent as ReactPointerEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
} from "react";

interface BorderGlowProps {
  animated?: boolean;
  backgroundColor?: string;
  borderRadius?: number;
  children?: ReactNode;
  className?: string;
  colors?: string[];
  coneSpread?: number;
  edgeSensitivity?: number;
  fillOpacity?: number;
  glowColor?: string;
  glowIntensity?: number;
  glowRadius?: number;
  surface?: "dark" | "light";
}

const GRADIENT_POSITIONS = [
  "80% 55%",
  "69% 34%",
  "8% 6%",
  "41% 38%",
  "86% 85%",
  "82% 18%",
  "51% 4%",
];
const COLOR_MAP = [0, 1, 2, 0, 1, 2, 1];

function parseHSL(hslStr: string) {
  const match = hslStr.match(/([\d.]+)\s*([\d.]+)%?\s*([\d.]+)%?/);
  if (!match) {
    return { h: 40, l: 80, s: 80 };
  }

  return {
    h: Number.parseFloat(match[1]),
    l: Number.parseFloat(match[3]),
    s: Number.parseFloat(match[2]),
  };
}

function buildBoxShadow(glowColor: string, intensity: number) {
  const { h, l, s } = parseHSL(glowColor);
  const base = `${h}deg ${s}% ${l}%`;
  const layers: Array<[number, number, number, number, number, boolean]> = [
    [0, 0, 0, 1, 100, true],
    [0, 0, 1, 0, 60, true],
    [0, 0, 3, 0, 50, true],
    [0, 0, 6, 0, 40, true],
    [0, 0, 15, 0, 30, true],
    [0, 0, 25, 2, 20, true],
    [0, 0, 50, 2, 10, true],
    [0, 0, 1, 0, 60, false],
    [0, 0, 3, 0, 50, false],
    [0, 0, 6, 0, 40, false],
    [0, 0, 15, 0, 30, false],
    [0, 0, 25, 2, 20, false],
    [0, 0, 50, 2, 10, false],
  ];

  return layers
    .map(([x, y, blur, spread, alpha, inset]) => {
      const adjustedAlpha = Math.min(alpha * intensity, 100);
      return `${inset ? "inset " : ""}${x}px ${y}px ${blur}px ${spread}px hsl(${base} / ${adjustedAlpha}%)`;
    })
    .join(", ");
}

function buildMeshGradients(colors: string[]) {
  const gradients: string[] = [];

  for (let index = 0; index < 7; index += 1) {
    const color = colors[Math.min(COLOR_MAP[index], colors.length - 1)];
    gradients.push(
      `radial-gradient(at ${GRADIENT_POSITIONS[index]}, ${color} 0px, transparent 50%)`,
    );
  }

  gradients.push(`linear-gradient(${colors[0]} 0 100%)`);
  return gradients;
}

const easeOutCubic = (value: number) => 1 - Math.pow(1 - value, 3);
const easeInCubic = (value: number) => value * value * value;

function animateValue({
  delay = 0,
  duration = 1000,
  ease = easeOutCubic,
  end = 100,
  onEnd,
  onUpdate,
  start = 0,
}: {
  delay?: number;
  duration?: number;
  ease?: (value: number) => number;
  end?: number;
  onEnd?: () => void;
  onUpdate: (value: number) => void;
  start?: number;
}) {
  const startTime = performance.now() + delay;
  let frameId: number | null = null;

  const tick = () => {
    const elapsed = performance.now() - startTime;
    const progress = Math.min(elapsed / duration, 1);

    onUpdate(start + (end - start) * ease(progress));

    if (progress < 1) {
      frameId = requestAnimationFrame(tick);
    } else {
      onEnd?.();
    }
  };

  const timeoutId = window.setTimeout(() => {
    frameId = requestAnimationFrame(tick);
  }, delay);

  return () => {
    window.clearTimeout(timeoutId);
    if (frameId !== null) {
      cancelAnimationFrame(frameId);
    }
  };
}

export default function BorderGlow({
  children,
  className = "",
  edgeSensitivity = 30,
  glowColor = "220 70 80",
  backgroundColor = "#ffffff",
  borderRadius = 28,
  glowRadius = 40,
  glowIntensity = 1,
  coneSpread = 25,
  animated = false,
  colors = ["#cbd5e1", "#94a3b8", "#e2e8f0"],
  fillOpacity = 0.45,
  surface = "dark",
}: BorderGlowProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [cursorAngle, setCursorAngle] = useState(45);
  const [edgeProximity, setEdgeProximity] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [sweepActive, setSweepActive] = useState(false);

  const getCenterOfElement = useCallback((element: HTMLElement) => {
    const { height, width } = element.getBoundingClientRect();
    return [width / 2, height / 2] as const;
  }, []);

  const getEdgeProximity = useCallback(
    (element: HTMLElement, x: number, y: number) => {
      const [cx, cy] = getCenterOfElement(element);
      const dx = x - cx;
      const dy = y - cy;

      let kx = Number.POSITIVE_INFINITY;
      let ky = Number.POSITIVE_INFINITY;

      if (dx !== 0) {
        kx = cx / Math.abs(dx);
      }

      if (dy !== 0) {
        ky = cy / Math.abs(dy);
      }

      return Math.min(Math.max(1 / Math.min(kx, ky), 0), 1);
    },
    [getCenterOfElement],
  );

  const getCursorAngle = useCallback(
    (element: HTMLElement, x: number, y: number) => {
      const [cx, cy] = getCenterOfElement(element);
      const dx = x - cx;
      const dy = y - cy;

      if (dx === 0 && dy === 0) {
        return 0;
      }

      let degrees = Math.atan2(dy, dx) * (180 / Math.PI) + 90;
      if (degrees < 0) {
        degrees += 360;
      }

      return degrees;
    },
    [getCenterOfElement],
  );

  const handlePointerMove = useCallback(
    (event: ReactPointerEvent<HTMLDivElement>) => {
      const card = cardRef.current;
      if (!card) {
        return;
      }

      const rect = card.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;

      setEdgeProximity(getEdgeProximity(card, x, y));
      setCursorAngle(getCursorAngle(card, x, y));
    },
    [getCursorAngle, getEdgeProximity],
  );

  useEffect(() => {
    if (!animated) {
      return;
    }

    const angleStart = 110;
    const angleEnd = 465;
    const animationCleanups: Array<() => void> = [];
    const startFrame = requestAnimationFrame(() => {
      setSweepActive(true);
      setCursorAngle(angleStart);

      animationCleanups.push(
        animateValue({
          duration: 500,
          onUpdate: (value) => setEdgeProximity(value / 100),
        }),
      );
      animationCleanups.push(
        animateValue({
          duration: 1500,
          ease: easeInCubic,
          end: 50,
          onUpdate: (value) => {
            setCursorAngle((angleEnd - angleStart) * (value / 100) + angleStart);
          },
        }),
      );
      animationCleanups.push(
        animateValue({
          delay: 1500,
          duration: 2250,
          ease: easeOutCubic,
          end: 100,
          start: 50,
          onUpdate: (value) => {
            setCursorAngle((angleEnd - angleStart) * (value / 100) + angleStart);
          },
        }),
      );
      animationCleanups.push(
        animateValue({
          delay: 2500,
          duration: 1500,
          ease: easeInCubic,
          end: 0,
          onEnd: () => setSweepActive(false),
          onUpdate: (value) => setEdgeProximity(value / 100),
          start: 100,
        }),
      );
    });

    return () => {
      cancelAnimationFrame(startFrame);
      animationCleanups.forEach((cleanup) => cleanup());
    };
  }, [animated]);

  const colorSensitivity = edgeSensitivity + 20;
  const isVisible = isHovered || sweepActive;
  const restingBorderOpacity = surface === "light" ? 0.18 : 0;
  const restingGlowOpacity = surface === "light" ? 0.08 : 0;
  const activeBorderOpacity = Math.max(
    0,
    (edgeProximity * 100 - colorSensitivity) / (100 - colorSensitivity),
  );
  const activeGlowOpacity = Math.max(
    0,
    (edgeProximity * 100 - edgeSensitivity) / (100 - edgeSensitivity),
  );
  const borderOpacity = isVisible
    ? Math.max(restingBorderOpacity, activeBorderOpacity)
    : restingBorderOpacity;
  const glowOpacity = isVisible
    ? Math.max(restingGlowOpacity, activeGlowOpacity)
    : restingGlowOpacity;

  const meshGradients = buildMeshGradients(colors);
  const borderBackground = meshGradients.map((gradient) => `${gradient} border-box`);
  const fillBackground = meshGradients.map((gradient) => `${gradient} padding-box`);
  const angleDeg = `${cursorAngle.toFixed(3)}deg`;
  const fillBlendMode = surface === "light" ? "normal" : "soft-light";
  const glowBlendMode = surface === "light" ? "normal" : "plus-lighter";
  const glowFilter = surface === "light" ? "blur(10px) saturate(1.28)" : "saturate(1.08)";
  const resolvedFillOpacity =
    fillOpacity * (surface === "light" ? 0.62 : 1);

  return (
    <div
      ref={cardRef}
      className={`relative isolate grid border border-white/15 ${className}`.trim()}
      onPointerEnter={() => setIsHovered(true)}
      onPointerLeave={() => setIsHovered(false)}
      onPointerMove={handlePointerMove}
      style={{
        background: backgroundColor,
        borderRadius: `${borderRadius}px`,
        boxShadow:
          "rgba(0,0,0,0.08) 0 1px 2px, rgba(0,0,0,0.06) 0 6px 18px, rgba(0,0,0,0.04) 0 18px 42px",
        transform: "translate3d(0, 0, 0.01px)",
      }}
    >
      <div
        className="absolute inset-0 -z-[1] rounded-[inherit]"
        style={{
          WebkitMaskImage: `conic-gradient(from ${angleDeg} at center, black ${coneSpread}%, transparent ${coneSpread + 15}%, transparent ${100 - coneSpread - 15}%, black ${100 - coneSpread}%)`,
          background: [
            `linear-gradient(${backgroundColor} 0 100%) padding-box`,
            "linear-gradient(rgb(255 255 255 / 0%) 0% 100%) border-box",
            ...borderBackground,
          ].join(", "),
          border: "1px solid transparent",
          maskImage: `conic-gradient(from ${angleDeg} at center, black ${coneSpread}%, transparent ${coneSpread + 15}%, transparent ${100 - coneSpread - 15}%, black ${100 - coneSpread}%)`,
          opacity: borderOpacity,
          transition: isVisible
            ? "opacity 0.25s ease-out"
            : "opacity 0.75s ease-in-out",
        }}
      />

      <div
        className="absolute inset-0 -z-[1] rounded-[inherit]"
        style={
          {
            WebkitMaskComposite:
              "source-out, source-over, source-over, source-over, source-over, source-over",
            WebkitMaskImage: [
              "linear-gradient(to bottom, black, black)",
              "radial-gradient(ellipse at 50% 50%, black 40%, transparent 65%)",
              "radial-gradient(ellipse at 66% 66%, black 5%, transparent 40%)",
              "radial-gradient(ellipse at 33% 33%, black 5%, transparent 40%)",
              "radial-gradient(ellipse at 66% 33%, black 5%, transparent 40%)",
              "radial-gradient(ellipse at 33% 66%, black 5%, transparent 40%)",
              `conic-gradient(from ${angleDeg} at center, transparent 5%, black 15%, black 85%, transparent 95%)`,
            ].join(", "),
            background: fillBackground.join(", "),
            border: "1px solid transparent",
            maskComposite: "subtract, add, add, add, add, add",
            maskImage: [
              "linear-gradient(to bottom, black, black)",
              "radial-gradient(ellipse at 50% 50%, black 40%, transparent 65%)",
              "radial-gradient(ellipse at 66% 66%, black 5%, transparent 40%)",
              "radial-gradient(ellipse at 33% 33%, black 5%, transparent 40%)",
              "radial-gradient(ellipse at 66% 33%, black 5%, transparent 40%)",
              "radial-gradient(ellipse at 33% 66%, black 5%, transparent 40%)",
              `conic-gradient(from ${angleDeg} at center, transparent 5%, black 15%, black 85%, transparent 95%)`,
            ].join(", "),
            mixBlendMode: fillBlendMode,
            opacity: borderOpacity * resolvedFillOpacity,
            transition: isVisible
              ? "opacity 0.25s ease-out"
              : "opacity 0.75s ease-in-out",
          } as CSSProperties
        }
      />

      <span
        className="pointer-events-none absolute z-[1] rounded-[inherit]"
        style={
          {
            WebkitMaskImage: `conic-gradient(from ${angleDeg} at center, black 2.5%, transparent 10%, transparent 90%, black 97.5%)`,
            filter: glowFilter,
            inset: `${-glowRadius}px`,
            maskImage: `conic-gradient(from ${angleDeg} at center, black 2.5%, transparent 10%, transparent 90%, black 97.5%)`,
            mixBlendMode: glowBlendMode,
            opacity: glowOpacity,
            transition: isVisible
              ? "opacity 0.25s ease-out"
              : "opacity 0.75s ease-in-out",
          } as CSSProperties
        }
      >
        <span
          className="absolute rounded-[inherit]"
          style={{
            boxShadow: buildBoxShadow(glowColor, glowIntensity),
            inset: `${glowRadius}px`,
          }}
        />
      </span>

      <div className="relative z-[1] flex flex-col overflow-auto">{children}</div>
    </div>
  );
}
