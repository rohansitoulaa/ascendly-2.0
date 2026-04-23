"use client";

import {
  type CSSProperties,
  type ReactNode,
  useRef,
} from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";

type ParallaxAxis = "y" | "x" | "both";

interface ParallaxProps {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  offset?: number;
  offsetX?: number;
  axis?: ParallaxAxis;
  scaleFrom?: number;
  scaleTo?: number;
  rotate?: number;
  smooth?: boolean;
  scrollOffset?: [string, string];
  inline?: boolean;
}

export function Parallax({
  children,
  className,
  style,
  offset = 80,
  offsetX = 0,
  axis = "y",
  scaleFrom = 1,
  scaleTo = 1,
  rotate = 0,
  smooth = true,
  scrollOffset = ["start end", "end start"],
  inline = false,
}: ParallaxProps) {
  const ref = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: scrollOffset as never,
  });

  const smoothed = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 28,
    mass: 0.4,
  });
  const progress = smooth ? smoothed : scrollYProgress;

  const y = useTransform(progress, [0, 1], [offset, -offset]);
  const x = useTransform(progress, [0, 1], [offsetX || offset, -(offsetX || offset)]);
  const scale = useTransform(
    progress,
    [0, 0.5, 1],
    [scaleFrom, (scaleFrom + scaleTo) / 2, scaleTo],
  );
  const rot = useTransform(progress, [0, 1], [rotate, -rotate]);

  const Component = inline ? motion.span : motion.div;

  if (prefersReducedMotion) {
    return (
      <Component ref={ref as never} className={className} style={style}>
        {children}
      </Component>
    );
  }

  const appliedStyle: Record<string, unknown> = {
    ...style,
    willChange: "transform",
  };
  if (axis !== "x") appliedStyle.y = y;
  if (axis !== "y") appliedStyle.x = x;
  if (scaleFrom !== 1 || scaleTo !== 1) appliedStyle.scale = scale;
  if (rotate !== 0) appliedStyle.rotate = rot;

  return (
    <Component
      ref={ref as never}
      className={className}
      style={appliedStyle as never}
    >
      {children}
    </Component>
  );
}

interface ParallaxLayersProps {
  className?: string;
  children?: ReactNode;
  layers: [LayerConfig?, LayerConfig?, LayerConfig?];
}

interface LayerConfig {
  className?: string;
  style?: CSSProperties;
  strength?: number;
}

export function ParallaxLayers({
  className,
  children,
  layers,
}: ParallaxLayersProps) {
  const ref = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const smoothed = useSpring(scrollYProgress, {
    stiffness: 110,
    damping: 26,
    mass: 0.4,
  });

  const [layer0, layer1, layer2] = layers;
  const s0 = layer0?.strength ?? 30;
  const s1 = layer1?.strength ?? 80;
  const s2 = layer2?.strength ?? 140;

  const y0 = useTransform(smoothed, [0, 1], [s0, -s0]);
  const y1 = useTransform(smoothed, [0, 1], [s1, -s1]);
  const y2 = useTransform(smoothed, [0, 1], [s2, -s2]);

  const renderLayer = (
    layer: LayerConfig | undefined,
    y: typeof y0,
    key: number,
  ) => {
    if (!layer) return null;
    return (
      <motion.div
        key={key}
        aria-hidden
        className={`pointer-events-none absolute inset-0 ${layer.className ?? ""}`}
        style={{
          ...layer.style,
          ...(prefersReducedMotion ? {} : { y }),
          willChange: "transform",
        }}
      />
    );
  };

  return (
    <div ref={ref} className={className}>
      {renderLayer(layer0, y0, 0)}
      {renderLayer(layer1, y1, 1)}
      {renderLayer(layer2, y2, 2)}
      {children}
    </div>
  );
}

export default Parallax;
