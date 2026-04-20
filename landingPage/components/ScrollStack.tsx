"use client";

import Lenis from "lenis";
import {
  useCallback,
  useLayoutEffect,
  useRef,
  type ReactNode,
} from "react";

interface CardLayoutMetric {
  cardTop: number;
  pinStart: number;
  triggerEnd: number;
}

interface CardTransformState {
  blur: number;
  opacity: number;
  rotation: number;
  scale: number;
  translateY: number;
}

export interface ScrollStackItemProps {
  children: ReactNode;
  itemClassName?: string;
}

export function ScrollStackItem({
  children,
  itemClassName = "",
}: ScrollStackItemProps) {
  return (
    <article
      className={`scroll-stack-card relative box-border h-auto min-h-0 w-full origin-top rounded-[clamp(20px,3vw,34px)] p-4 shadow-[0_0_30px_rgba(0,0,0,0.08)] will-change-transform sm:p-6 md:h-[32rem] md:rounded-[38px] md:p-8 lg:h-[34rem] lg:p-10 ${itemClassName}`.trim()}
      style={{
        backfaceVisibility: "hidden",
        transformStyle: "preserve-3d",
      }}
    >
      {children}
    </article>
  );
}

export interface ScrollStackProps {
  baseScale?: number;
  blurAmount?: number;
  children: ReactNode;
  className?: string;
  innerClassName?: string;
  itemDistance?: number;
  itemScale?: number;
  itemStackDistance?: number;
  onStackComplete?: () => void;
  releaseDistance?: number;
  releaseOpacity?: number;
  rotationAmount?: number;
  scaleDuration?: number;
  scaleEndPosition?: `${number}%` | number;
  stackPosition?: `${number}%` | number;
  useWindowScroll?: boolean;
  disableOnMobile?: boolean;
}

const parsePosition = (
  value: `${number}%` | number,
  containerHeight: number,
) => {
  if (typeof value === "string" && value.includes("%")) {
    return (Number.parseFloat(value) / 100) * containerHeight;
  }

  return typeof value === "number" ? value : Number.parseFloat(value);
};

const calculateProgress = (scrollTop: number, start: number, end: number) => {
  if (end <= start) {
    return scrollTop >= end ? 1 : 0;
  }

  if (scrollTop <= start) {
    return 0;
  }

  if (scrollTop >= end) {
    return 1;
  }

  return (scrollTop - start) / (end - start);
};

export default function ScrollStack({
  baseScale = 0.85,
  blurAmount = 0,
  children,
  className = "",
  innerClassName = "",
  itemDistance = 100,
  itemScale = 0.03,
  itemStackDistance = 30,
  onStackComplete,
  releaseDistance = 0,
  releaseOpacity = 1,
  rotationAmount = 0,
  scaleEndPosition = "10%",
  stackPosition = "20%",
  useWindowScroll = false,
  disableOnMobile = false,
}: ScrollStackProps) {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLElement[]>([]);
  const layoutMetricsRef = useRef<CardLayoutMetric[]>([]);
  const endElementTopRef = useRef(0);
  const lastTransformsRef = useRef(new Map<number, CardTransformState>());
  const lenisRef = useRef<Lenis | null>(null);
  const lenisFrameRef = useRef<number | null>(null);
  const updateFrameRef = useRef<number | null>(null);
  const resizeObserverRef = useRef<ResizeObserver | null>(null);
  const stackCompletedRef = useRef(false);
  const prefersReducedMotionRef = useRef(false);

  const getScrollData = useCallback(() => {
    if (useWindowScroll) {
      return {
        containerHeight: window.innerHeight,
        scrollTop: window.scrollY,
      };
    }

    const scroller = scrollerRef.current;

    return {
      containerHeight: scroller?.clientHeight ?? 0,
      scrollTop: scroller?.scrollTop ?? 0,
    };
  }, [useWindowScroll]);

  const getElementOffset = useCallback(
    (element: HTMLElement) => {
      if (useWindowScroll) {
        const rect = element.getBoundingClientRect();

        return rect.top + window.scrollY;
      }

      return element.offsetTop;
    },
    [useWindowScroll],
  );

  const updateCardTransforms = useCallback(() => {
    updateFrameRef.current = null;

    if (disableOnMobile && window.innerWidth < 768) {
      return;
    }

    const root = scrollerRef.current;
    const layoutMetrics = layoutMetricsRef.current;
    if (!root || !cardsRef.current.length || !layoutMetrics.length) {
      return;
    }

    const prefersReducedMotion = prefersReducedMotionRef.current;
    const { containerHeight, scrollTop } = getScrollData();
    if (!containerHeight) {
      return;
    }

    const stackPositionPx = parsePosition(stackPosition, containerHeight);
    const pinEnd = endElementTopRef.current - containerHeight / 2;
    let topCardIndex = 0;

    if (!prefersReducedMotion && blurAmount > 0) {
      for (let index = 0; index < layoutMetrics.length; index += 1) {
        if (scrollTop >= layoutMetrics[index].pinStart) {
          topCardIndex = index;
        }
      }
    }

    cardsRef.current.forEach((card, index) => {
      const metric = layoutMetrics[index];
      if (!metric) {
        return;
      }

      const scaleProgress = calculateProgress(
        scrollTop,
        metric.pinStart,
        metric.triggerEnd,
      );
      const targetScale = baseScale + index * itemScale;
      const scale = prefersReducedMotion
        ? 1
        : 1 - scaleProgress * (1 - targetScale);
      const rotation = prefersReducedMotion
        ? 0
        : index * rotationAmount * scaleProgress;

      let blur = 0;
      if (!prefersReducedMotion && blurAmount > 0 && index < topCardIndex) {
        blur = Math.max(0, (topCardIndex - index) * blurAmount);
      }

      let translateY = 0;
      let opacity = 1;
      const isPinned = scrollTop >= metric.pinStart && scrollTop <= pinEnd;

      if (!prefersReducedMotion) {
        if (isPinned) {
          translateY =
            scrollTop -
            metric.cardTop +
            stackPositionPx +
            itemStackDistance * index;
        } else if (scrollTop > pinEnd) {
          const releaseProgress = calculateProgress(
            scrollTop,
            pinEnd,
            pinEnd + containerHeight * 0.9,
          );
          translateY =
            pinEnd -
            metric.cardTop +
            stackPositionPx +
            itemStackDistance * index +
            releaseDistance * releaseProgress;
          opacity = 1 - (1 - releaseOpacity) * releaseProgress;
        }
      }

      const nextState: CardTransformState = {
        blur: Math.round(blur * 100) / 100,
        opacity: Math.round(opacity * 1000) / 1000,
        rotation: Math.round(rotation * 100) / 100,
        scale: Math.round(scale * 1000) / 1000,
        translateY: Math.round(translateY * 100) / 100,
      };
      const previousState = lastTransformsRef.current.get(index);
      const changed =
        !previousState ||
        Math.abs(previousState.translateY - nextState.translateY) > 0.1 ||
        Math.abs(previousState.scale - nextState.scale) > 0.001 ||
        Math.abs(previousState.rotation - nextState.rotation) > 0.1 ||
        Math.abs(previousState.blur - nextState.blur) > 0.1 ||
        Math.abs(previousState.opacity - nextState.opacity) > 0.01;

      if (!changed) {
        if (index !== cardsRef.current.length - 1) {
          return;
        }
      } else {
        card.style.transform = `translate3d(0, ${nextState.translateY}px, 0) scale(${nextState.scale}) rotate(${nextState.rotation}deg)`;
        card.style.filter =
          nextState.blur > 0 ? `blur(${nextState.blur}px)` : "none";
        card.style.opacity = `${nextState.opacity}`;
        lastTransformsRef.current.set(index, nextState);

        if (index !== cardsRef.current.length - 1) {
          return;
        }
      }

      const inView = scrollTop >= metric.pinStart && scrollTop <= pinEnd;
      if (inView && !stackCompletedRef.current) {
        stackCompletedRef.current = true;
        onStackComplete?.();
      } else if (!inView && stackCompletedRef.current) {
        stackCompletedRef.current = false;
      }
    });
  }, [
    baseScale,
    blurAmount,
    getScrollData,
    itemScale,
    itemStackDistance,
    onStackComplete,
    releaseDistance,
    releaseOpacity,
    rotationAmount,
    stackPosition,
    disableOnMobile,
  ]);

  const scheduleUpdate = useCallback(() => {
    if (updateFrameRef.current !== null) {
      return;
    }

    updateFrameRef.current = window.requestAnimationFrame(updateCardTransforms);
  }, [updateCardTransforms]);

  const measureLayout = useCallback(() => {
    const root = scrollerRef.current;
    if (!root || !cardsRef.current.length) {
      return;
    }

    const isMobile = disableOnMobile && window.innerWidth < 768;

    if (isMobile) {
      cardsRef.current.forEach((card) => {
        card.style.transform = "none";
        card.style.marginBottom = "";
        card.style.filter = "none";
        card.style.opacity = "";
      });
      layoutMetricsRef.current = [];
      return;
    }

    // Force restore styling if coming from mobile resize
    cardsRef.current.forEach((card, index) => {
      if (index < cardsRef.current.length - 1) {
        card.style.marginBottom = `${itemDistance}px`;
      }
      card.style.backfaceVisibility = "hidden";
      card.style.perspective = "1000px";
      card.style.transformOrigin = "top center";
      card.style.willChange = "transform, filter";
    });

    const { containerHeight } = getScrollData();
    if (!containerHeight) {
      return;
    }

    const stackPositionPx = parsePosition(stackPosition, containerHeight);
    const scaleEndPositionPx = parsePosition(scaleEndPosition, containerHeight);
    const endElement = root.querySelector(
      ".scroll-stack-end",
    ) as HTMLElement | null;

    endElementTopRef.current = endElement ? getElementOffset(endElement) : 0;
    layoutMetricsRef.current = cardsRef.current.map((card, index) => {
      const cardTop = getElementOffset(card);
      const pinStart = cardTop - stackPositionPx - itemStackDistance * index;

      return {
        cardTop,
        pinStart,
        triggerEnd: cardTop - scaleEndPositionPx,
      };
    });

    lenisRef.current?.resize();
    scheduleUpdate();
  }, [
    getElementOffset,
    getScrollData,
    itemStackDistance,
    scaleEndPosition,
    scheduleUpdate,
    stackPosition,
    disableOnMobile,
  ]);

  useLayoutEffect(() => {
    const root = scrollerRef.current;
    const scroller = useWindowScroll ? null : root;

    if (!root) {
      return;
    }

    prefersReducedMotionRef.current = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const cards = Array.from(
      root.querySelectorAll(".scroll-stack-card"),
    ) as HTMLElement[];
    const transformCache = lastTransformsRef.current;
    const handleScroll = () => {
      scheduleUpdate();
    };

    cardsRef.current = cards;
    const isMobile = disableOnMobile && window.innerWidth < 768;

    cards.forEach((card, index) => {
      if (!isMobile && index < cards.length - 1) {
        card.style.marginBottom = `${itemDistance}px`;
      }

      card.style.backfaceVisibility = isMobile ? "" : "hidden";
      card.style.opacity = "1";
      card.style.perspective = isMobile ? "" : "1000px";
      card.style.transform = isMobile ? "none" : "translateZ(0)";
      card.style.transformOrigin = isMobile ? "" : "top center";
      card.style.willChange = isMobile ? "" : "transform, filter";
    });

    if (!isMobile && !prefersReducedMotionRef.current && !useWindowScroll && scroller) {
      const content = scroller.querySelector(".scroll-stack-inner") as HTMLElement | null;

      if (content) {
        const lenis = new Lenis({
          autoRaf: false,
          content,
          duration: 0.7,
          easing: (t) => 1 - Math.pow(1 - t, 4),
          eventsTarget: scroller,
          lerp: 0.16,
          smoothWheel: true,
          syncTouch: true,
          syncTouchLerp: 0.12,
          touchMultiplier: 1.1,
          wheelMultiplier: 1,
          wrapper: scroller,
        });

        lenis.on("scroll", handleScroll);

        const raf = (time: number) => {
          lenis.raf(time);
          lenisFrameRef.current = window.requestAnimationFrame(raf);
        };

        lenisFrameRef.current = window.requestAnimationFrame(raf);
        lenisRef.current = lenis;
      }
    } else if (!isMobile && !useWindowScroll && scroller) {
      scroller.addEventListener("scroll", handleScroll, { passive: true });
    }

    resizeObserverRef.current = new ResizeObserver(() => {
      measureLayout();
    });

    resizeObserverRef.current.observe(root);
    cards.forEach((card) => {
      resizeObserverRef.current?.observe(card);
    });

    if (useWindowScroll) {
      window.addEventListener("scroll", handleScroll, { passive: true });
    }

    window.addEventListener("resize", measureLayout);
    void document.fonts?.ready.then(measureLayout);
    measureLayout();

    return () => {
      if (lenisFrameRef.current !== null) {
        window.cancelAnimationFrame(lenisFrameRef.current);
      }

      if (updateFrameRef.current !== null) {
        window.cancelAnimationFrame(updateFrameRef.current);
      }

      resizeObserverRef.current?.disconnect();
      resizeObserverRef.current = null;

      if (useWindowScroll) {
        window.removeEventListener("scroll", handleScroll);
      }

      window.removeEventListener("resize", measureLayout);
      scroller?.removeEventListener("scroll", handleScroll);
      lenisRef.current?.destroy();
      lenisRef.current = null;
      lenisFrameRef.current = null;
      updateFrameRef.current = null;
      cardsRef.current = [];
      layoutMetricsRef.current = [];
      transformCache.clear();
      stackCompletedRef.current = false;
    };
  }, [itemDistance, measureLayout, scheduleUpdate, useWindowScroll, disableOnMobile]);

  return (
    <div
      ref={scrollerRef}
      className={`relative w-full ${useWindowScroll ? "overflow-visible" : "h-full overflow-y-auto overflow-x-hidden"} ${className}`.trim()}
      data-lenis-prevent={useWindowScroll ? undefined : ""}
      style={{
        WebkitOverflowScrolling: "touch",
        WebkitTransform: "translateZ(0)",
        overscrollBehavior: useWindowScroll ? "auto" : "contain",
        transform: "translateZ(0)",
      }}
    >
      <div
        className={`scroll-stack-inner ${useWindowScroll ? "min-h-screen" : "min-h-full"} px-4 pb-12 pt-4 md:pb-[42rem] md:pt-[18vh] md:px-8 lg:px-10 ${innerClassName}`.trim()}
      >
        {children}
        <div className="scroll-stack-end h-px w-full" />
      </div>
    </div>
  );
}
