import { ScrollStackItem } from "@/landingPage/components/ScrollStack";
import type { PrimaryFeatureItem } from "@/landingPage/lib/primaryFeatures";

interface FeatureStackCardProps {
  feature: PrimaryFeatureItem;
  index: number;
  total: number;
}

export function FeatureStackCard({
  feature,
  index,
  total,
}: FeatureStackCardProps) {
  return (
    <ScrollStackItem itemClassName="overflow-hidden border border-white/10 bg-[linear-gradient(180deg,rgba(9,14,20,0.96),rgba(5,8,13,0.98))] shadow-[0_32px_80px_rgba(0,0,0,0.34),inset_0_1px_0_rgba(255,255,255,0.05)]">
      <div
        className={`pointer-events-none absolute inset-0 ${feature.theme.cardGlowClassName}`}
      />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,rgba(255,255,255,0),rgba(255,255,255,0.16),rgba(255,255,255,0))]" />

      <div className="relative grid h-full gap-6 md:grid-cols-[minmax(0,1.12fr)_minmax(240px,0.88fr)] md:gap-10">
        <div className="flex h-full flex-col">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <span
              className={`inline-flex items-center rounded-full border px-2.5 py-1 text-[0.58rem] font-medium uppercase tracking-[0.3em] sm:px-3 sm:py-1.5 sm:text-[0.62rem] ${feature.theme.badgeClassName}`}
            >
              {feature.eyebrow}
            </span>

            <span
              className={`text-xs font-medium uppercase tracking-[0.28em] ${feature.theme.numberClassName}`}
            >
              {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
            </span>
          </div>

          <div className="mt-5 max-w-3xl sm:mt-8">
            <h2 className="max-w-[15ch] text-[clamp(1.5rem,4vw,2.35rem)] font-semibold tracking-[-0.05em] text-white leading-[1.08]">
              {feature.title}
            </h2>
            <p className="mt-4 max-w-[62ch] text-[clamp(0.875rem,1.5vw,1.04rem)] leading-7 text-white/64 sm:mt-5 sm:leading-8">
              {feature.summary}
            </p>
          </div>

          <div className="mt-auto grid gap-3 pt-6 sm:gap-4 sm:pt-8 md:grid-cols-3">
            {feature.supportPoints.map((point) => (
              <div
                key={point}
                className={`rounded-[18px] border p-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] sm:rounded-[24px] sm:p-4 ${feature.theme.detailClassName}`}
              >
                <div className="mb-2 size-2 rounded-full bg-white/55 sm:mb-3" />
                <p className="text-[13px] leading-6 text-white/70 sm:text-sm sm:leading-7">{point}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="relative flex h-full min-h-[14rem] flex-col justify-between rounded-[22px] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.035),rgba(255,255,255,0.012))] p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)] sm:min-h-[18rem] sm:rounded-[28px] sm:p-5 md:min-h-0 md:p-6">
          <div className="flex items-center justify-between gap-3">
            <span className="text-[0.58rem] font-medium uppercase tracking-[0.28em] text-white/34 sm:text-[0.62rem]">
              Signal Layer
            </span>
            <div
              className={`inline-flex rounded-full border px-2.5 py-1 text-[0.58rem] font-medium uppercase tracking-[0.22em] sm:px-3 sm:py-1.5 sm:text-[0.62rem] ${feature.theme.pillClassName}`}
            >
              Live
            </div>
          </div>

          <div className={`relative mt-4 flex-1 overflow-hidden rounded-[18px] border p-4 sm:mt-5 sm:rounded-[24px] sm:p-5 ${feature.theme.panelClassName}`}>
            <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.03),transparent_18%),linear-gradient(90deg,rgba(255,255,255,0.025)_1px,transparent_1px),linear-gradient(rgba(255,255,255,0.025)_1px,transparent_1px)] bg-[size:100%_100%,72px_100%,100%_52px]" />
            <div className="relative flex h-full flex-col">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="text-[0.58rem] font-medium uppercase tracking-[0.28em] text-white/34 sm:text-[0.62rem]">
                    Active Focus
                  </div>
                  <div className="mt-2 text-base font-medium tracking-[-0.03em] text-white/88 sm:mt-3 sm:text-lg">
                    {feature.eyebrow} Motion
                  </div>
                </div>
                <div className="relative size-16 shrink-0 sm:size-24 md:size-28">
                  <div
                    className={`absolute inset-0 rounded-full blur-2xl ${feature.theme.orbClassName}`}
                  />
                  <div className="absolute inset-[22%] rounded-full border border-white/10 bg-white/4" />
                </div>
              </div>

              <div className="mt-5 space-y-3 sm:mt-8 sm:space-y-4">
                {feature.signalLabels.map((label, labelIndex) => (
                  <div key={label} className="flex items-center gap-2 sm:gap-3">
                    <span className="w-10 text-[0.58rem] font-medium uppercase tracking-[0.22em] text-white/28 sm:w-14 sm:text-[0.62rem]">
                      0{labelIndex + 1}
                    </span>
                    <div className="relative h-2.5 flex-1 overflow-hidden rounded-full bg-white/8 sm:h-3">
                      <div
                        className={`absolute inset-y-0 left-0 rounded-full bg-white/82 ${labelIndex === 0 ? "w-[78%]" : labelIndex === 1 ? "w-[62%]" : "w-[86%]"}`}
                      />
                    </div>
                    <span
                      className={`inline-flex rounded-full border px-2 py-0.5 text-[0.55rem] font-medium uppercase tracking-[0.18em] sm:px-2.5 sm:py-1 sm:text-[0.62rem] ${feature.theme.pillClassName}`}
                    >
                      {label}
                    </span>
                  </div>
                ))}
              </div>

              <div
                className={`mt-auto h-px w-full bg-gradient-to-r ${feature.theme.ruleClassName}`}
              />

              <div className="mt-4 flex items-end justify-between gap-4 sm:mt-5 sm:gap-6">
                <div>
                  <div className="text-[0.58rem] font-medium uppercase tracking-[0.24em] text-white/32 sm:text-[0.62rem]">
                    Coverage
                  </div>
                  <div className="mt-1.5 text-2xl font-semibold tracking-[-0.05em] text-white/88 sm:mt-2 sm:text-3xl">
                    {92 + ((index * 3) % 7)}%
                  </div>
                </div>
                <div className="max-w-[10rem] text-right text-xs leading-5 text-white/46 sm:max-w-[12rem] sm:text-sm sm:leading-6">
                  Different emphasis, same system language. Each card carries its
                  own color signature.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ScrollStackItem>
  );
}
