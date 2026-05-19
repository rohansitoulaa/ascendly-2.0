"use client";

import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
  useInView,
} from "motion/react";
import { FiArrowRight } from "react-icons/fi";
import { Button } from "@/design/Button";
import { CALENDLY_URL } from "@/lib/constants";
import { SplitText } from "@/animations/SplitText";
import { Counter } from "@/animations/Counter";
import Silk from "@/landingPage/components/Silk";
import { useSiteTheme } from "@/lib/useSiteTheme";

function SpinningDollarStat() {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const prefersReducedMotion = useReducedMotion();

  return (
    <span ref={ref} className="inline-flex items-baseline">
      <motion.span
        className="inline-block"
        animate={
          inView && !prefersReducedMotion
            ? { rotate: [0, 360, 720] }
            : { rotate: 0 }
        }
        transition={{ duration: 1.8, ease: [0.22, 1, 0.36, 1] }}
      >
        $
      </motion.span>
      <Counter to={12} suffix="M+" />
    </span>
  );
}

export function Hero() {
  const prefersReducedMotion = useReducedMotion();
  const theme = useSiteTheme();
  const ref = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const titleY = useTransform(
    scrollYProgress,
    [0, 1],
    [0, prefersReducedMotion ? 0 : -120],
  );
  const titleOpacity = useTransform(
    scrollYProgress,
    [0, 0.8],
    [1, prefersReducedMotion ? 1 : 0.2],
  );

  return (
    <section
      ref={ref as never}
      className="relative isolate flex min-h-svh items-center overflow-hidden pt-28 sm:pt-36"
    >
      {/* Layered background  static, no scroll transform (huge gradients + paint = stutter) */}
      <div
        className="pointer-events-none absolute inset-0 -z-30"
        aria-hidden
      >
        {!theme || theme === "dark" ? (
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(34,211,238,0.14),transparent_45%),radial-gradient(circle_at_80%_70%,rgba(167,139,250,0.16),transparent_50%),radial-gradient(circle_at_59%_110%,rgba(59,130,246,0.14),transparent_55%)]" />
        ) : null}
        <div
          className="absolute inset-0"
          style={{ background: "var(--gradient-overlay-bottom)" }}
        />
      </div>

      {/* Silk animation */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-20 opacity-30"
      >
        <Silk
          color={theme === "light" ? "#DBE7EF" : "#263E52"}
          speed={2}
          scale={1}
          noiseIntensity={1.5}
          rotation={0}
        />
      </div>

      {/* Floating orbs — dark mode only */}
      {theme === "dark" && (
        <>
          <div
            className="pointer-events-none absolute -top-24 -left-24 -z-10 h-[420px] w-[420px] rounded-full bg-cyan-500/20 blur-[90px] sm:h-[540px] sm:w-[540px]"
            aria-hidden
          />
          <div
            className="pointer-events-none absolute -right-24 top-1/3 -z-10 h-[380px] w-[380px] rounded-full bg-violet-500/18 blur-[100px] sm:h-[520px] sm:w-[520px]"
            aria-hidden
          />
        </>
      )}

      <div className="mx-auto w-full max-w-[1220px] px-6 sm:px-8">
        <motion.div
          style={{ y: titleY, opacity: titleOpacity }}
          className="flex flex-col items-start"
        >

          <h1 className="mt-7 max-w-[34ch] text-[clamp(2rem,4.2vw,4.2rem)] font-semibold leading-[1.05] tracking-[-0.06em] text-ink">
            <SplitText
              split="word"
              animation="rise"
              stagger={0.06}
              duration={0.9}
              className="block"
            >
              For B2B firms with strong LTV,
            </SplitText>
            <motion.span
              className={`block bg-clip-text pt-2 text-transparent bg-linear-to-r ${theme === "light" ? "from-cyan-600 via-sky-600 to-violet-600" : "from-cyan-200 via-sky-300 to-violet-300"}`}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.9,
                delay: 0.38,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              but inconsistent pipeline and lost/stalled deals.
            </motion.span>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mt-8 max-w-[58ch] text-[clamp(1rem,1.6vw,1.2rem)] leading-[1.65] text-ink/66"
          >
            Ascendly builds and runs revenue systems (inbound and outbound) that
            generate qualified pipelines and turn existing opportunities into
            predictable growth.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.75 }}
            className="mt-10 flex flex-wrap items-center gap-4"
          >
            <Button variant="primary" size="lg" icon={<FiArrowRight />} href={CALENDLY_URL}>
              Apply for a Revenue Audit
            </Button>
            <p className="max-w-[44ch] text-[0.78rem] leading-[1.55] text-ink/44 italic">
              (For B2B service companies with $3M–$100M revenue and $15k+ customer lifetime value. Not for early-stage teams or low-ticket offers.)
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.95 }}
            className="mt-16 grid w-full max-w-[720px] grid-cols-2 gap-8 sm:grid-cols-4"
          >
            <div className="flex flex-col border-l border-hairline/10 pl-4">
              <span className="text-[clamp(1.6rem,3.4vw,2.2rem)] font-semibold tracking-[-0.04em] text-ink">
                <Counter to={2.4} decimals={1} suffix="x" />
              </span>
              <span className="mt-1 text-[0.72rem] uppercase tracking-[0.26em] text-ink/45">
                Pipeline Growth
              </span>
            </div>

            <div className="flex flex-col border-l border-hairline/10 pl-4">
              <span className="text-[clamp(1.6rem,3.4vw,2.2rem)] font-semibold tracking-[-0.04em] text-ink">
                30–60d
              </span>
              <span className="mt-1 text-[0.72rem] uppercase tracking-[0.26em] text-ink/45">
                Day Ramp
              </span>
            </div>

            <div className="flex flex-col border-l border-hairline/10 pl-4">
              <span className="text-[clamp(1.6rem,3.4vw,2.2rem)] font-semibold tracking-[-0.04em] text-ink">
                <Counter to={96} suffix="%" />
              </span>
              <span className="mt-1 text-[0.72rem] uppercase tracking-[0.26em] text-ink/45">
                Retention
              </span>
            </div>

            <div className="flex flex-col border-l border-hairline/10 pl-4">
              <span className="text-[clamp(1.6rem,3.4vw,2.2rem)] font-semibold tracking-[-0.04em] text-ink">
                <SpinningDollarStat />
              </span>
              <span className="mt-1 text-[0.72rem] uppercase tracking-[0.26em] text-ink/45">
                Pipeline Managed
              </span>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll cue */}
      <motion.div
        aria-hidden
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.8 }}
        className="pointer-events-none absolute inset-x-0 bottom-10 mx-auto hidden w-fit items-center gap-3 text-[0.68rem] uppercase tracking-[0.32em] text-ink/40 md:flex"
      >
        <span className="relative inline-flex h-9 w-[2px] overflow-hidden rounded-full bg-surface/10">
          <motion.span
            animate={{ y: ["-100%", "120%"] }}
            transition={{
              duration: 2.2,
              repeat: Infinity,
              ease: [0.65, 0, 0.35, 1],
            }}
            className="absolute inset-x-0 h-1/2 rounded-full bg-linear-to-b from-transparent via-cyan-200 to-transparent"
          />
        </span>
        Scroll
      </motion.div>
    </section>
  );
}

export default Hero;
