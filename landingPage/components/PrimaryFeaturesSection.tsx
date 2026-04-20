"use client";

import dynamic from "next/dynamic";
import { FeatureStackCard } from "@/landingPage/components/FeatureStackCard";
import { PRIMARY_FEATURES } from "@/landingPage/lib/primaryFeatures";

// Lazy load the scroll stack with no SSR because it relies heavily on window and scroll
const ScrollStack = dynamic(
  () => import("@/landingPage/components/ScrollStack"),
  { ssr: false }
);

export function PrimaryFeaturesSection() {
  return (
    <section
      id="primary-features"
      className="relative z-20 -mt-6 px-4 pb-8 pt-2 sm:-mt-10 sm:px-6 sm:pb-10 sm:pt-4 md:-mt-18 md:pb-14 md:pt-6"
    >
      <div className="mx-auto max-w-[1380px]">
        {/* On mobile, we use flex-col and gap instead of the tall padding bottom needed for the scroll animation */}
        <ScrollStack
          className="relative"
          innerClassName="px-0 pb-8 pt-[1vh] flex flex-col gap-6 sm:gap-8 sm:pb-12 md:block md:gap-0 md:pb-[46rem] md:pt-[3vh]"
          itemStackDistance={14}
          releaseDistance={260}
          releaseOpacity={0.18}
          scaleEndPosition="7%"
          stackPosition="13%"
          useWindowScroll
          disableOnMobile
        >
          {PRIMARY_FEATURES.map((feature, index) => (
            <FeatureStackCard
              key={feature.title}
              feature={feature}
              index={index}
              total={PRIMARY_FEATURES.length}
            />
          ))}
        </ScrollStack>
      </div>
    </section>
  );
}
