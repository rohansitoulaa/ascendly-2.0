"use client";

import { type ReactNode, Children, useEffect, useRef, useMemo } from "react";
import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useSpring,
} from "motion/react";

interface MarqueeProps {
  children: ReactNode;
  direction?: "left" | "right";
  /** Pixels per second */
  speed?: number;
  pauseOnHover?: boolean;
  gap?: number;
  fade?: boolean;
  className?: string;
  itemClassName?: string;
}

export function Marquee({
  children,
  direction = "left",
  speed = 60,
  pauseOnHover = true,
  gap = 32,
  fade = true,
  className = "",
  itemClassName = "",
}: MarqueeProps) {
  const items = useMemo(() => Children.toArray(children), [children]);
  const trackRef = useRef<HTMLDivElement>(null);
  const xRef = useRef(0);
  const halfWidthRef = useRef(0);
  const x = useMotionValue("0px");

  const targetSpeed = useMotionValue(1);
  const speedMultiplier = useSpring(targetSpeed, {
    stiffness: 28,
    damping: 14,
    mass: 0.6,
  });

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const measure = () => {
      halfWidthRef.current = track.scrollWidth / 2;
    };
    measure();

    const resizeObserver =
      typeof ResizeObserver === "undefined" ? null : new ResizeObserver(measure);
    resizeObserver?.observe(track);
    window.addEventListener("resize", measure);

    return () => {
      resizeObserver?.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [items]);

  useAnimationFrame((_, delta) => {
    const halfWidth = halfWidthRef.current;
    if (halfWidth === 0) return;
    const sign = direction === "left" ? -1 : 1;
    xRef.current += sign * (speed / 1000) * delta * speedMultiplier.get();
    if (direction === "left" && xRef.current <= -halfWidth) {
      xRef.current += halfWidth;
    } else if (direction === "right" && xRef.current >= 0) {
      xRef.current -= halfWidth;
    }
    x.set(`${xRef.current}px`);
  });

  return (
    <div
      className={[
        "relative flex w-full overflow-hidden",
        fade
          ? "mask-[linear-gradient(to_right,transparent,#000_12%,#000_88%,transparent)]"
          : "",
        className,
      ].join(" ")}
      onMouseEnter={() => pauseOnHover && targetSpeed.set(0)}
      onMouseLeave={() => pauseOnHover && targetSpeed.set(1)}
    >
      <motion.div
        ref={trackRef}
        className="flex shrink-0 items-center"
        style={{ gap, x }}
      >
        {[...items, ...items].map((item, i) => (
          <div key={i} className={["shrink-0", itemClassName].join(" ")}>
            {item}
          </div>
        ))}
      </motion.div>
    </div>
  );
}

export default Marquee;
