"use client";

import { motion } from "motion/react";
import { Badge } from "./Badge";
import TextReveal from "@/animations/TextReveal";

interface SectionHeaderProps {
  kicker?: string;
  kickerDot?: boolean;
  kickerDotColor?: string;
  title: string;
  highlight?: string;
  highlightGradient?: string;
  subtitle?: string;
  align?: "left" | "center";
  size?: "md" | "lg" | "xl";
  className?: string;
}

const sizeMap = {
  md: "text-[clamp(1.85rem,4.4vw,3.4rem)]",
  lg: "text-[clamp(2.2rem,5.2vw,4.4rem)]",
  xl: "text-[clamp(2.5rem,6.4vw,5.6rem)]",
};

export function SectionHeader({
  kicker,
  kickerDot = true,
  kickerDotColor,
  title,
  highlight,
  highlightGradient = "from-cyan-200 via-sky-300 to-violet-300",
  subtitle,
  align = "left",
  size = "lg",
  className = "",
}: SectionHeaderProps) {
  const alignClass =
    align === "center" ? "mx-auto items-center text-center" : "items-start text-left";

  return (
    <div className={`relative flex flex-col ${alignClass} ${className}`}>
      {kicker && (
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <Badge dot={kickerDot} dotColor={kickerDotColor}>
            {kicker}
          </Badge>
        </motion.div>
      )}

      <h2
        className={[
          "mt-5 font-semibold leading-[1.02] tracking-[-0.055em] text-white",
          sizeMap[size],
          align === "center" ? "max-w-[22ch]" : "max-w-[26ch]",
        ].join(" ")}
      >
        <TextReveal
          style="mask-sweep"
          splitBy="word"
          stagger={0.05}
          duration={0.9}
          as="span"
          className="inline-block"
        >
          {title}
        </TextReveal>
        {highlight && (
          <>
            {" "}
            <TextReveal
              style="mask-sweep"
              splitBy="word"
              stagger={0.05}
              duration={0.9}
              delay={0.12}
              as="span"
              className={`inline-block bg-gradient-to-r ${highlightGradient} bg-clip-text text-transparent`}
            >
              {highlight}
            </TextReveal>
          </>
        )}
      </h2>

      {subtitle && (
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className={[
            "mt-5 text-[clamp(0.95rem,1.6vw,1.1rem)] leading-[1.62] text-white/62 sm:mt-6 sm:leading-[1.7]",
            align === "center" ? "max-w-[58ch]" : "max-w-[62ch]",
          ].join(" ")}
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  );
}

export default SectionHeader;
