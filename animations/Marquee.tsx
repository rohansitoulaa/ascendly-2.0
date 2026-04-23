"use client";

import { type ReactNode, Children, useMemo } from "react";
import { motion } from "motion/react";

interface MarqueeProps {
  children: ReactNode;
  direction?: "left" | "right";
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
  speed = 40,
  pauseOnHover = true,
  gap = 32,
  fade = true,
  className = "",
  itemClassName = "",
}: MarqueeProps) {
  const items = useMemo(() => Children.toArray(children), [children]);

  const distance = direction === "left" ? "-50%" : "50%";

  return (
    <div
      className={[
        "group relative flex w-full overflow-hidden",
        fade
          ? "[mask-image:linear-gradient(to_right,transparent,#000_10%,#000_90%,transparent)]"
          : "",
        className,
      ].join(" ")}
    >
      <motion.div
        className="flex shrink-0 items-center"
        style={{ gap }}
        animate={{ x: ["0%", distance] }}
        transition={{
          duration: speed,
          ease: "linear",
          repeat: Infinity,
        }}
        {...(pauseOnHover
          ? { whileHover: { animationPlayState: "paused" } }
          : {})}
      >
        {[...items, ...items].map((item, i) => (
          <div key={i} className={["shrink-0", itemClassName].join(" ")}>
            {item}
          </div>
        ))}
      </motion.div>
      {pauseOnHover && (
        <style jsx>{`
          .group:hover :global(> div) {
            animation-play-state: paused;
          }
        `}</style>
      )}
    </div>
  );
}

export default Marquee;
