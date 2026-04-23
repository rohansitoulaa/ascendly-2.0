"use client";

import { type AnchorHTMLAttributes, type ReactNode } from "react";
import { motion } from "motion/react";
import { FiArrowUpRight } from "react-icons/fi";

interface AnimatedLinkProps extends Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "onAnimationStart" | "onDrag" | "onDragEnd" | "onDragStart"> {
  children: ReactNode;
  showArrow?: boolean;
  underline?: boolean;
  accent?: boolean;
}

export function AnimatedLink({
  children,
  showArrow = true,
  underline = true,
  accent = false,
  className = "",
  ...rest
}: AnimatedLinkProps) {
  return (
    <motion.a
      whileHover="hover"
      initial="initial"
      className={[
        "group relative inline-flex items-center gap-1.5 text-[0.92rem] font-medium tracking-[-0.01em] transition-colors",
        accent ? "text-cyan-200 hover:text-cyan-100" : "text-white/78 hover:text-white",
        className,
      ].join(" ")}
      {...rest}
    >
      <span className="relative">
        {children}
        {underline && (
          <>
            <motion.span
              aria-hidden
              className="absolute inset-x-0 -bottom-0.5 h-[1.5px] origin-right bg-current opacity-30"
              variants={{
                initial: { scaleX: 1 },
                hover: { scaleX: 0 },
              }}
              transition={{ duration: 0.35, ease: [0.65, 0, 0.35, 1] }}
            />
            <motion.span
              aria-hidden
              className="absolute inset-x-0 -bottom-0.5 h-[1.5px] origin-left bg-current"
              variants={{
                initial: { scaleX: 0 },
                hover: { scaleX: 1 },
              }}
              transition={{ duration: 0.4, delay: 0.05, ease: [0.65, 0, 0.35, 1] }}
            />
          </>
        )}
      </span>
      {showArrow && (
        <motion.span
          aria-hidden
          className="inline-flex h-4 w-4 items-center justify-center overflow-hidden"
        >
          <motion.span
            className="inline-flex items-center justify-center"
            variants={{
              initial: { x: 0, y: 0, rotate: 0 },
              hover: { x: 1, y: -1, rotate: 12 },
            }}
            transition={{ type: "spring", stiffness: 320, damping: 18 }}
          >
            <FiArrowUpRight className="h-4 w-4" />
          </motion.span>
        </motion.span>
      )}
    </motion.a>
  );
}

export default AnimatedLink;
