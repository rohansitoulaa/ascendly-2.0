"use client";

import { FiActivity, FiCpu, FiLayers, FiTarget, FiZap, FiTrendingUp } from "react-icons/fi";
import { SectionHeader } from "@/design/SectionHeader";
import { GlassCard } from "@/design/GlassCard";
import { Reveal } from "@/animations/Reveal";
import { Counter } from "@/animations/Counter";
import { motion } from "motion/react";

export function Bento() {
  return (
    <section id="systems" className="relative py-28 sm:py-36">
      <div className="mx-auto w-full max-w-[1220px] px-6 sm:px-8">
        <SectionHeader
          kicker="The operating system"
          title="One stack."
          highlight="Every growth lever."
          subtitle="Each module is instrumented, composable, and tuned to your motion. Together they form a compounding revenue system — not another disconnected tool."
          align="left"
          size="lg"
        />

        <div className="mt-14 grid grid-cols-1 gap-5 sm:mt-20 sm:grid-cols-6 sm:grid-rows-[auto_auto] sm:gap-6">
          {/* BIG: Pipeline engine */}
          <Reveal className="sm:col-span-4" direction="up">
            <GlassCard accent="cyan" className="h-full">
              <div className="flex flex-col gap-6 p-6 sm:p-9">
                <div className="flex items-center gap-3">
                  <IconShell accent="cyan">
                    <FiActivity />
                  </IconShell>
                  <span className="text-[0.7rem] uppercase tracking-[0.28em] text-white/45">
                    Pipeline engine
                  </span>
                </div>
                <h3 className="max-w-[20ch] text-[clamp(1.5rem,2.6vw,2rem)] font-semibold tracking-[-0.03em] text-white">
                  A real-time view of every signal that drives pipeline.
                </h3>
                <LiveChart />
                <p className="max-w-[52ch] text-[0.98rem] leading-[1.7] text-white/60">
                  ICP scoring, intent fusion, and account routing work together
                  — so reps touch opportunities the moment they heat up.
                </p>
              </div>
            </GlassCard>
          </Reveal>

          {/* Conversion */}
          <Reveal className="sm:col-span-2" direction="up" delay={0.08}>
            <GlassCard accent="violet" className="h-full">
              <div className="flex h-full flex-col gap-5 p-6 sm:p-7">
                <IconShell accent="violet">
                  <FiTarget />
                </IconShell>
                <div className="mt-auto">
                  <div className="text-[3.2rem] font-semibold leading-none tracking-[-0.05em] text-white sm:text-[3.8rem]">
                    <Counter to={38} suffix="%" />
                  </div>
                  <p className="mt-2 text-[0.82rem] uppercase tracking-[0.24em] text-white/45">
                    Avg conversion lift
                  </p>
                </div>
                <p className="text-[0.92rem] leading-[1.6] text-white/60">
                  Multi-stage playbooks with live controls on every touch.
                </p>
              </div>
            </GlassCard>
          </Reveal>

          {/* Forecast */}
          <Reveal className="sm:col-span-2" direction="up" delay={0.04}>
            <GlassCard accent="emerald" className="h-full">
              <div className="flex h-full flex-col gap-5 p-6 sm:p-7">
                <IconShell accent="emerald">
                  <FiTrendingUp />
                </IconShell>
                <h4 className="text-[1.15rem] font-semibold tracking-[-0.02em] text-white">
                  Deterministic forecast
                </h4>
                <p className="text-[0.92rem] leading-[1.6] text-white/60">
                  Committed, best case, and stretch — backed by signal decay,
                  not gut feel.
                </p>
                <ForecastBars />
              </div>
            </GlassCard>
          </Reveal>

          {/* Automations */}
          <Reveal className="sm:col-span-2" direction="up" delay={0.12}>
            <GlassCard accent="amber" className="h-full">
              <div className="flex h-full flex-col gap-5 p-6 sm:p-7">
                <IconShell accent="amber">
                  <FiZap />
                </IconShell>
                <h4 className="text-[1.15rem] font-semibold tracking-[-0.02em] text-white">
                  Signal automations
                </h4>
                <p className="text-[0.92rem] leading-[1.6] text-white/60">
                  Branching flows that reshape themselves as your pipeline learns.
                </p>
                <div className="mt-auto flex flex-wrap gap-1.5">
                  {["Intent", "Churn", "Expand", "Refresh"].map((t) => (
                    <span
                      key={t}
                      className="rounded-full border border-amber-200/15 bg-amber-400/[0.05] px-2.5 py-1 text-[0.7rem] text-amber-100/80"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </GlassCard>
          </Reveal>

          {/* Attribution */}
          <Reveal className="sm:col-span-2" direction="up" delay={0.18}>
            <GlassCard accent="rose" className="h-full">
              <div className="flex h-full flex-col gap-5 p-6 sm:p-7">
                <IconShell accent="rose">
                  <FiLayers />
                </IconShell>
                <h4 className="text-[1.15rem] font-semibold tracking-[-0.02em] text-white">
                  Revenue attribution
                </h4>
                <p className="text-[0.92rem] leading-[1.6] text-white/60">
                  Ties every booked dollar to the touch that moved it.
                </p>
              </div>
            </GlassCard>
          </Reveal>

          {/* Intelligence */}
          <Reveal className="sm:col-span-2" direction="up" delay={0.22}>
            <GlassCard accent="cyan" className="h-full">
              <div className="flex h-full flex-col gap-5 p-6 sm:p-7">
                <IconShell accent="cyan">
                  <FiCpu />
                </IconShell>
                <h4 className="text-[1.15rem] font-semibold tracking-[-0.02em] text-white">
                  On-brand intelligence
                </h4>
                <p className="text-[0.92rem] leading-[1.6] text-white/60">
                  Models tuned on your voice, your ICP, your close motion.
                </p>
              </div>
            </GlassCard>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

const accentPalette = {
  cyan: "from-cyan-300/30 to-sky-400/10 text-cyan-200 border-cyan-300/25",
  violet: "from-violet-300/30 to-fuchsia-400/10 text-violet-200 border-violet-300/25",
  emerald: "from-emerald-300/30 to-teal-400/10 text-emerald-200 border-emerald-300/25",
  rose: "from-rose-300/30 to-pink-400/10 text-rose-200 border-rose-300/25",
  amber: "from-amber-300/30 to-orange-400/10 text-amber-200 border-amber-300/25",
} as const;

function IconShell({
  children,
  accent,
}: {
  children: React.ReactNode;
  accent: keyof typeof accentPalette;
}) {
  return (
    <span
      className={[
        "relative inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border bg-gradient-to-br text-[1.1rem] shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] backdrop-blur-md",
        accentPalette[accent],
      ].join(" ")}
    >
      {children}
    </span>
  );
}

function LiveChart() {
  const bars = [28, 34, 52, 42, 64, 48, 72, 58, 78, 68, 92, 84];
  return (
    <div className="flex h-36 items-end gap-1.5 rounded-2xl border border-white/[0.06] bg-white/[0.02] p-4">
      {bars.map((h, i) => (
        <motion.span
          key={i}
          initial={{ height: 0, opacity: 0 }}
          whileInView={{ height: `${h}%`, opacity: 1 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{
            duration: 0.9,
            delay: 0.04 * i,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="flex-1 rounded-sm bg-gradient-to-t from-cyan-400/70 to-sky-200/90 shadow-[0_0_10px_rgba(125,211,252,0.3)]"
        />
      ))}
    </div>
  );
}

function ForecastBars() {
  const rows = [
    { l: "Committed", w: 72 },
    { l: "Best case", w: 88 },
    { l: "Stretch", w: 58 },
  ];
  return (
    <div className="flex flex-col gap-2">
      {rows.map((r, i) => (
        <div key={r.l} className="flex items-center gap-3">
          <span className="w-20 shrink-0 text-[0.7rem] uppercase tracking-[0.22em] text-white/45">
            {r.l}
          </span>
          <div className="relative h-1.5 flex-1 overflow-hidden rounded-full bg-white/[0.06]">
            <motion.span
              initial={{ width: 0 }}
              whileInView={{ width: `${r.w}%` }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 1.1, delay: 0.1 + i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-emerald-300 to-teal-200 shadow-[0_0_10px_rgba(52,211,153,0.35)]"
            />
          </div>
        </div>
      ))}
    </div>
  );
}

export default Bento;
