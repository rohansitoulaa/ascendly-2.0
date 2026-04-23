"use client";

import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
} from "motion/react";
import { FiArrowRight, FiPlay } from "react-icons/fi";
import { Button } from "@/design/Button";
import { Badge } from "@/design/Badge";
import { SplitText } from "@/animations/SplitText";
import { Counter } from "@/animations/Counter";
import { Parallax } from "@/animations/Parallax";

export function Hero() {
  const prefersReducedMotion = useReducedMotion();
  const ref = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const titleY = useTransform(scrollYProgress, [0, 1], [0, prefersReducedMotion ? 0 : -140]);
  const titleScale = useTransform(scrollYProgress, [0, 1], [1, prefersReducedMotion ? 1 : 0.82]);
  const titleOpacity = useTransform(scrollYProgress, [0, 0.8], [1, prefersReducedMotion ? 1 : 0.12]);
  const bgY = useTransform(scrollYProgress, [0, 1], [0, prefersReducedMotion ? 0 : 160]);
  const orbY = useTransform(scrollYProgress, [0, 1], [0, prefersReducedMotion ? 0 : -220]);

  return (
    <section
      ref={ref as never}
      className="relative isolate flex min-h-[100svh] items-center overflow-hidden pt-28 sm:pt-36"
    >
      {/* Layered background */}
      <motion.div
        style={{ y: bgY }}
        className="pointer-events-none absolute inset-0 -z-30"
        aria-hidden
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(34,211,238,0.14),transparent_45%),radial-gradient(circle_at_80%_70%,rgba(167,139,250,0.16),transparent_50%),radial-gradient(circle_at_50%_110%,rgba(59,130,246,0.14),transparent_55%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(5,6,10,0)_0%,rgba(5,6,10,0.55)_60%,rgba(5,6,10,1)_100%)]" />
      </motion.div>

      {/* Grid overlay */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-20 opacity-[0.15]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.08) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
          maskImage:
            "radial-gradient(ellipse at center, black 30%, transparent 75%)",
        }}
      />

      {/* Floating orbs */}
      <motion.div
        style={{ y: orbY }}
        className="pointer-events-none absolute -top-24 -left-24 -z-10 h-[420px] w-[420px] rounded-full bg-cyan-500/20 blur-[110px] sm:h-[540px] sm:w-[540px]"
        aria-hidden
      />
      <Parallax offset={-120} className="pointer-events-none absolute -right-24 top-1/3 -z-10">
        <div className="h-[380px] w-[380px] rounded-full bg-violet-500/18 blur-[120px] sm:h-[520px] sm:w-[520px]" />
      </Parallax>

      <div className="mx-auto w-full max-w-[1220px] px-6 sm:px-8">
        <motion.div
          style={{ y: titleY, scale: titleScale, opacity: titleOpacity }}
          className="flex flex-col items-start"
        >
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          >
            <Badge dot variant="glow">
              Revenue OS · 2026
            </Badge>
          </motion.div>

          <h1 className="mt-7 max-w-[18ch] text-[clamp(2.8rem,8.2vw,6.4rem)] font-semibold leading-[0.95] tracking-[-0.06em] text-white">
            <SplitText split="word" animation="rise" stagger={0.06} duration={0.9} className="block">
              Predictable revenue,
            </SplitText>
            <span className="block bg-gradient-to-r from-cyan-200 via-sky-300 to-violet-300 bg-clip-text pt-2 text-transparent">
              <SplitText
                split="word"
                animation="stagger-blur"
                stagger={0.06}
                duration={1}
                delay={0.2}
                className="block"
              >
                engineered to scale.
              </SplitText>
            </span>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mt-8 max-w-[58ch] text-[clamp(1rem,1.6vw,1.2rem)] leading-[1.65] text-white/66"
          >
            Ascendly designs and operates premium revenue systems that compound
            pipeline activity into predictable growth — instrumented end-to-end
            by teams who have shipped at scale.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.75 }}
            className="mt-10 flex flex-wrap items-center gap-3"
          >
            <Button variant="primary" size="lg" icon={<FiArrowRight />}>
              Start a revenue audit
            </Button>
            <Button variant="glass" size="lg" icon={<FiPlay className="h-4 w-4" />} iconPosition="left" magnetic={false}>
              Watch the loop
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.95 }}
            className="mt-16 grid w-full max-w-[720px] grid-cols-2 gap-8 sm:grid-cols-4"
          >
            {[
              { n: 2.4, suf: "x", label: "Pipeline lift" },
              { n: 48, suf: "d", label: "Avg ramp" },
              { n: 96, suf: "%", label: "Retention" },
              { n: 12, suf: "M+", label: "Managed ARR" },
            ].map((s) => (
              <div
                key={s.label}
                className="flex flex-col border-l border-white/10 pl-4"
              >
                <span className="text-[clamp(1.6rem,3.4vw,2.2rem)] font-semibold tracking-[-0.04em] text-white">
                  <Counter to={s.n} decimals={s.n % 1 === 0 ? 0 : 1} suffix={s.suf} />
                </span>
                <span className="mt-1 text-[0.72rem] uppercase tracking-[0.26em] text-white/45">
                  {s.label}
                </span>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll cue */}
      <motion.div
        aria-hidden
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.8 }}
        className="pointer-events-none absolute inset-x-0 bottom-10 mx-auto hidden w-fit items-center gap-3 text-[0.68rem] uppercase tracking-[0.32em] text-white/40 md:flex"
      >
        <span className="relative inline-flex h-9 w-[2px] overflow-hidden rounded-full bg-white/10">
          <motion.span
            animate={{ y: ["-100%", "120%"] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: [0.65, 0, 0.35, 1] }}
            className="absolute inset-x-0 h-1/2 rounded-full bg-gradient-to-b from-transparent via-cyan-200 to-transparent"
          />
        </span>
        Scroll
      </motion.div>
    </section>
  );
}

export default Hero;
