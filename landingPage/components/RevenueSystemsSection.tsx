"use client";

import ScrollFloat from "@/animations/ScrollFloat";
import { Parallax } from "@/animations/Parallax";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRouter } from "next/navigation";
import {
  forwardRef,
  type ComponentPropsWithoutRef,
  type ForwardedRef,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import {
  FiArrowUpRight,
  FiCheckCircle,
  FiLayers,
  FiSend,
} from "react-icons/fi";
import { Button } from "./Button";

gsap.registerPlugin(ScrollTrigger);

const serviceCards = [
  {
    title: "Revenue Automation System",
    eyebrow: "End-to-end system",
    subtext:
      "End-to-end pipeline system, from capturing demand to converting deals.",
    points: [
      "Capture every inbound lead automatically",
      "Enrich, qualify, and route opportunities",
      "Run outbound in parallel to generate pipeline",
      "Follow up on every deal until it closes or disqualifies",
      "Track pipeline, revenue, and ROI in real-time",
    ],
    bottomLine: "We don't just generate a pipeline, we make sure it converts.",
    cta: "Book a pipeline audit",
    ctaHref: "/schedule",
    ctaVariant: "primary" as const,
    icon: FiLayers,
    cardClass: "border-[color:var(--services-card-border)] bg-[color:var(--services-card-bg)]",
    overlayClass:
      "bg-[image:var(--services-overlay)]",
    glowOneClass: "bg-[color:var(--services-glow-one)]",
    glowTwoClass: "bg-[color:var(--services-glow-two)]",
    iconShellClass: "bg-[color:var(--services-icon-shell-bg)] text-[color:var(--services-icon-shell-text)]",
  },
  {
    title: "Outbound Engine (Standalone)",
    eyebrow: "Pipeline generation only",
    subtext: "For teams that only need consistent pipeline generation.",
    points: [
      "Targeted cold email + LinkedIn outreach",
      "ICP-based prospecting",
      "Reply handling + meeting booking",
      "Runs independently or alongside your internal team",
    ],
    bottomLine: "Adds pipeline. Does not manage conversion.",
    cta: "Learn more",
    ctaHref: "/#reviews",
    ctaVariant: "glass" as const,
    icon: FiSend,
    cardClass: "border-[color:var(--services-card-border)] bg-[color:var(--services-card-bg)]",
    overlayClass:
      "bg-[image:var(--services-overlay)]",
    glowOneClass: "bg-[color:var(--services-glow-one)]",
    glowTwoClass: "bg-[color:var(--services-glow-two)]",
    iconShellClass: "bg-[color:var(--services-icon-shell-bg)] text-[color:var(--services-icon-shell-text)]",
  },
];

type ArrowLayout = {
  height: number;
  width: number;
  leftPath: string;
  rightPath: string;
};

type RevenueSystemsSectionProps = ComponentPropsWithoutRef<"section">;

const clamp = (value: number, min: number, max: number) =>
  Math.min(Math.max(value, min), max);

const getRelativePointX = (
  rect: DOMRect,
  containerRect: DOMRect,
  ratio: number,
) => {
  return rect.left - containerRect.left + rect.width * ratio;
};

const buildArrowPath = ({
  startX,
  startY,
  endX,
  endY,
  direction,
}: {
  startX: number;
  startY: number;
  endX: number;
  endY: number;
  direction: -1 | 1;
}) => {
  const verticalGap = Math.max(endY - startY, 1);
  const horizontalGap = Math.abs(endX - startX);

  const horizontalTravel = clamp(horizontalGap * 0.34, 54, 110);
  const outerX = startX + direction * horizontalTravel;

  const firstCornerRadius = clamp(verticalGap * 0.12, 16, 28);
  const secondCornerRadius = clamp(verticalGap * 0.1, 14, 24);
  const lowerBendY = endY - clamp(verticalGap * 0.22, 26, 44);

  return [
    `M ${startX} ${startY}`,
    `L ${outerX - direction * firstCornerRadius} ${startY}`,
    `Q ${outerX} ${startY} ${outerX} ${startY + firstCornerRadius}`,
    `L ${outerX} ${lowerBendY - secondCornerRadius}`,
    `Q ${outerX} ${lowerBendY} ${
      outerX + direction * secondCornerRadius
    } ${lowerBendY}`,
    `L ${endX} ${endY}`,
  ].join(" ");
};

const assignForwardedRef = (
  ref: ForwardedRef<HTMLElement>,
  value: HTMLElement | null,
) => {
  if (typeof ref === "function") {
    ref(value);
    return;
  }

  if (ref) {
    ref.current = value;
  }
};

const renderAnimatedWord = (word: string) =>
  word.split("").map((char, index) => (
    <span
      aria-hidden="true"
      className="inline-block"
      data-service-heading-char=""
      key={`${word}-${index}`}
    >
      {char === " " ? "\u00A0" : char}
    </span>
  ));

export const RevenueSystemsSection = forwardRef<
  HTMLElement,
  RevenueSystemsSectionProps
>(function RevenueSystemsSection(
  { className = "", id = "services", ...props },
  forwardedRef,
) {
  const router = useRouter();

  const sectionRef = useRef<HTMLElement | null>(null);
  const servicesShellRef = useRef<HTMLDivElement | null>(null);
  const ourWordRef = useRef<HTMLSpanElement | null>(null);
  const servicesWordRef = useRef<HTMLSpanElement | null>(null);
  const leftCardRef = useRef<HTMLElement | null>(null);
  const rightCardRef = useRef<HTMLElement | null>(null);

  const [arrowLayout, setArrowLayout] = useState<ArrowLayout | null>(null);

  const setSectionRef = (node: HTMLElement | null) => {
    sectionRef.current = node;
    assignForwardedRef(forwardedRef, node);
  };

  useLayoutEffect(() => {
    // Skip arrow layout computation on mobile  arrows are hidden anyway
    if (window.innerWidth < 1280) {
      return;
    }

    const updateArrowLayout = () => {
      const shell = servicesShellRef.current;
      const ourWord = ourWordRef.current;
      const servicesWord = servicesWordRef.current;
      const leftCard = leftCardRef.current;
      const rightCard = rightCardRef.current;

      if (!shell || !ourWord || !servicesWord || !leftCard || !rightCard) {
        return;
      }

      const containerRect = shell.getBoundingClientRect();
      const ourWordRect = ourWord.getBoundingClientRect();
      const servicesWordRect = servicesWord.getBoundingClientRect();
      const leftCardRect = leftCard.getBoundingClientRect();
      const rightCardRect = rightCard.getBoundingClientRect();

      const width = containerRect.width;
      const height = containerRect.height;

      if (!width || !height) {
        return;
      }

      const titleBottomY =
        Math.max(ourWordRect.bottom, servicesWordRect.bottom) -
        containerRect.top;
      const startY = titleBottomY + 8;

      const leftStartX = getRelativePointX(ourWordRect, containerRect, 0.14);
      const rightStartX = getRelativePointX(
        servicesWordRect,
        containerRect,
        0.93,
      );

      const leftEndX =
        leftCardRect.left - containerRect.left + leftCardRect.width / 2;
      const rightEndX =
        rightCardRect.left - containerRect.left + rightCardRect.width / 2;

      const leftEndY = leftCardRect.top - containerRect.top;
      const rightEndY = rightCardRect.top - containerRect.top;

      setArrowLayout({
        width,
        height,
        leftPath: buildArrowPath({
          startX: leftStartX,
          startY,
          endX: leftEndX,
          endY: leftEndY,
          direction: -1,
        }),
        rightPath: buildArrowPath({
          startX: rightStartX,
          startY,
          endX: rightEndX,
          endY: rightEndY,
          direction: 1,
        }),
      });
    };

    const frameId = window.requestAnimationFrame(updateArrowLayout);
    window.addEventListener("resize", updateArrowLayout);

    let resizeObserver: ResizeObserver | null = null;

    if (typeof ResizeObserver !== "undefined") {
      resizeObserver = new ResizeObserver(updateArrowLayout);

      [
        servicesShellRef.current,
        ourWordRef.current,
        servicesWordRef.current,
        leftCardRef.current,
        rightCardRef.current,
      ].forEach((element) => {
        if (element) {
          resizeObserver?.observe(element);
        }
      });
    }

    return () => {
      window.cancelAnimationFrame(frameId);
      window.removeEventListener("resize", updateArrowLayout);
      resizeObserver?.disconnect();
    };
  }, []);

  // Card reveal animation  desktop only
  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) {
      return;
    }

    const mm = gsap.matchMedia();

    mm.add("(min-width: 768px)", () => {
      const cards = gsap.utils.toArray<HTMLElement>("[data-service-card]");

      cards.forEach((card, index) => {
        gsap.set(card, { autoAlpha: 0, y: 30 });

        gsap.to(card, {
          autoAlpha: 1,
          y: 0,
          duration: 0.7,
          ease: "power3.out",
          delay: index * 0.08,
          scrollTrigger: {
            once: true,
            start: "top 82%",
            trigger: card,
          },
        });
      });
    });

    // Mobile: ensure cards are visible (no autoAlpha: 0)
    mm.add("(max-width: 767px)", () => {
      const cards = gsap.utils.toArray<HTMLElement>("[data-service-card]");
      cards.forEach((card) => {
        gsap.set(card, { autoAlpha: 1, y: 0 });
      });
    });

    return () => {
      mm.revert();
    };
  }, []);

  // Heading char animation  desktop only
  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) {
      return;
    }

    const mm = gsap.matchMedia();

    mm.add("(min-width: 768px)", () => {
      const wordElements = gsap.utils.toArray<HTMLElement>(
        "[data-service-heading-word]",
      );

      wordElements.forEach((wordElement) => {
        const charElements = wordElement.querySelectorAll<HTMLElement>(
          "[data-service-heading-char]",
        );

        if (!charElements.length) {
          return;
        }

        gsap.fromTo(
          charElements,
          {
            opacity: 0,
            scaleX: 0.7,
            scaleY: 2.3,
            transformOrigin: "50% 0%",
            willChange: "opacity, transform",
            yPercent: 120,
          },
          {
            duration: 1,
            ease: "back.inOut(2)",
            opacity: 1,
            scaleX: 1,
            scaleY: 1,
            stagger: 0.03,
            yPercent: 0,
            scrollTrigger: {
              end: "bottom bottom-=40%",
              scrub: true,
              start: "center bottom+=50%",
              trigger: wordElement,
            },
          },
        );
      });
    });

    // Mobile: ensure heading chars are visible
    mm.add("(max-width: 767px)", () => {
      const charElements = gsap.utils.toArray<HTMLElement>(
        "[data-service-heading-char]",
      );
      charElements.forEach((el) => {
        el.style.opacity = "1";
        el.style.transform = "none";
      });
    });

    return () => {
      mm.revert();
    };
  }, []);

  // Arrow draw animation  desktop only (arrows are hidden below xl)
  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section || !arrowLayout) {
      return;
    }

    const mm = gsap.matchMedia();

    mm.add("(min-width: 1280px)", () => {
      const arrowPaths = gsap.utils.toArray<SVGPathElement>(
        "[data-service-arrow]",
      );

      arrowPaths.forEach((path, index) => {
        const pathLength = path.getTotalLength();

        gsap.set(path, {
          strokeDasharray: pathLength,
          strokeDashoffset: pathLength,
        });

        gsap.to(path, {
          strokeDashoffset: 0,
          duration: 0.95,
          ease: "power2.out",
          delay: 0.18 + index * 0.12,
          scrollTrigger: {
            once: true,
            start: "top 74%",
            trigger: section,
          },
        });
      });
    });

    return () => {
      mm.revert();
    };
  }, [arrowLayout]);

  const handleCardNavigation = (href: string) => {
    router.push(href);
  };

  return (
    <section
      id={id}
      ref={setSectionRef}
      className={`section-perf-skip theme-shift-transition relative overflow-hidden bg-[color:var(--services-bg)] px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20 ${className}`.trim()}
      {...props}
    >
      <Parallax offset={100} className="pointer-events-none absolute left-[-4rem] top-12 h-72 w-72">
        <div className="theme-shift-transition h-full w-full rounded-full bg-[color:var(--services-glow-one)] blur-[110px]" />
      </Parallax>
      <Parallax offset={-80} className="pointer-events-none absolute right-[-3rem] top-20 h-80 w-80">
        <div className="theme-shift-transition h-full w-full rounded-full bg-[color:var(--services-glow-two)] blur-[120px]" />
      </Parallax>
      <Parallax offset={60} className="pointer-events-none absolute bottom-0 left-1/3 h-72 w-72">
        <div className="theme-shift-transition h-full w-full rounded-full bg-[color:var(--services-glow-one)] blur-[110px]" />
      </Parallax>

      <div className="relative z-10 mx-auto max-w-[1480px]">
        <div className="mx-auto max-w-4xl text-center">
          <ScrollFloat
            containerClassName="my-0 text-center"
            textClassName="theme-shift-transition text-[clamp(1.3rem,2vw,1.7rem)] font-medium tracking-[-0.03em] text-[color:var(--services-copy)]"
          >
            Most teams buy services.
          </ScrollFloat>
          <ScrollFloat
            containerClassName="mt-2 text-center"
            textClassName="theme-shift-transition text-[clamp(1.4rem,3.5vw,3.1rem)] font-semibold leading-[1.18] tracking-[-0.05em] text-[color:var(--services-title)]"
          >
            We build systems that generate and convert revenue.
          </ScrollFloat>
        </div>

        <div ref={servicesShellRef} className="relative mx-auto mt-6 max-w-6xl">
          <div className="relative z-30">
            <h2 className="hero-headline-shell text-center text-[clamp(2.4rem,7vw,6.6rem)] font-semibold leading-[0.9] tracking-[-0.075em]">
              <span className="sr-only">Our Services</span>
              <span aria-hidden="true" className="inline-block">
                <span
                  ref={ourWordRef}
                  className="theme-shift-transition inline-block overflow-hidden align-bottom text-[color:var(--services-title)]"
                >
                  <span data-service-heading-word="" className="inline-block">
                    {renderAnimatedWord("Our")}
                  </span>
                </span>
                <span className="inline-block px-[0.08em]" aria-hidden="true">
                  {" "}
                </span>
                <span
                  ref={servicesWordRef}
                  className="hero-headline-accent theme-shift-transition inline-block overflow-hidden align-bottom text-[color:var(--services-title)]"
                >
                  <span data-service-heading-word="" className="inline-block">
                    {renderAnimatedWord("Services")}
                  </span>
                </span>
              </span>
            </h2>
          </div>

          {arrowLayout ? (
            <svg
              aria-hidden="true"
              viewBox={`0 0 ${arrowLayout.width} ${arrowLayout.height}`}
              preserveAspectRatio="none"
              className="theme-shift-transition pointer-events-none absolute inset-0 z-20 hidden h-full w-full overflow-visible text-[color:var(--services-arrow)] xl:block"
              fill="none"
            >
              <defs>
                <marker
                  id="services-arrowhead"
                  markerWidth="12"
                  markerHeight="12"
                  refX="9"
                  refY="6"
                  orient="auto"
                >
                  <path d="M0,0 L10,6 L0,12 z" fill="currentColor" />
                </marker>
              </defs>

              <path
                data-service-arrow=""
                d={arrowLayout.leftPath}
                stroke="currentColor"
                strokeWidth="2.8"
                strokeLinecap="round"
                strokeLinejoin="round"
                vectorEffect="non-scaling-stroke"
                markerEnd="url(#services-arrowhead)"
              />

              <path
                data-service-arrow=""
                d={arrowLayout.rightPath}
                stroke="currentColor"
                strokeWidth="2.8"
                strokeLinecap="round"
                strokeLinejoin="round"
                vectorEffect="non-scaling-stroke"
                markerEnd="url(#services-arrowhead)"
              />
            </svg>
          ) : null}

          <div className="relative z-10 mt-10 grid gap-6 sm:mt-12 xl:mt-16 xl:grid-cols-2">
            {serviceCards.map((card, index) => {
              const Icon = card.icon;

              return (
                <article
                  key={card.title}
                  ref={(element: HTMLElement | null) => {
                    if (index === 0) {
                      leftCardRef.current = element;
                    }

                    if (index === 1) {
                      rightCardRef.current = element;
                    }
                  }}
                  data-service-card=""
                  className={`theme-shift-transition group relative overflow-hidden rounded-[clamp(20px,3vw,34px)] border p-5 shadow-[0_28px_90px_rgba(15,23,42,0.1)] backdrop-blur-2xl sm:p-6 lg:p-8 ${card.cardClass}`}
                >
                  <div
                    className={`pointer-events-none absolute inset-0 ${card.overlayClass}`}
                  />
                  <div
                    className={`theme-shift-transition pointer-events-none absolute -left-12 top-8 h-40 w-40 rounded-full blur-[90px] ${card.glowOneClass}`}
                  />
                  <div
                    className={`theme-shift-transition pointer-events-none absolute bottom-0 right-0 h-44 w-44 rounded-full blur-[100px] ${card.glowTwoClass}`}
                  />
                  <div
                    className="theme-shift-transition pointer-events-none absolute inset-[1px] rounded-[inherit] bg-[color:var(--services-card-inner)]"
                  />

                  <div className="relative flex h-full flex-col">
                    <div className="flex flex-wrap items-start justify-between gap-3">
                      <div className="flex flex-wrap items-center gap-3">
                        <div
                          className={`theme-shift-transition flex h-10 w-10 shrink-0 items-center justify-center rounded-[14px] text-[16px] shadow-[0_14px_34px_rgba(0,0,0,0.05)] sm:h-12 sm:w-12 sm:rounded-[18px] sm:text-[18px] ${card.iconShellClass}`}
                        >
                          <Icon />
                        </div>
                        <span
                          className="theme-shift-transition rounded-full border border-[color:var(--services-kicker-border)] bg-[color:var(--services-kicker-bg)] px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.24em] text-[color:var(--services-kicker-text)] shadow-[0_10px_24px_rgba(0,0,0,0.05)] sm:px-3 sm:py-1.5 sm:text-[11px]"
                        >
                          {card.eyebrow}
                        </span>
                      </div>
                      <span
                        className="theme-shift-transition text-[11px] font-semibold uppercase tracking-[0.28em] text-[color:var(--services-copy)] opacity-70"
                      >
                        {String(index + 1).padStart(2, "0")}
                      </span>
                    </div>

                    <div className="mt-5 sm:mt-6">
                      <h3
                        className="theme-shift-transition text-[clamp(1.5rem,3vw,2.6rem)] font-semibold leading-[0.96] tracking-[-0.04em] text-[color:var(--services-title)]"
                      >
                        {card.title}
                      </h3>
                      <p
                        className="theme-shift-transition mt-3 max-w-2xl text-[14px] leading-6 text-[color:var(--services-copy)] sm:mt-4 sm:text-[15px] sm:leading-7"
                      >
                        {card.subtext}
                      </p>
                    </div>

                    <div className="mt-5 grid gap-2.5 sm:mt-7 sm:gap-3">
                      {card.points.map((point) => (
                        <div
                          key={point}
                          className="theme-shift-transition flex items-start gap-2.5 rounded-[18px] border border-[color:var(--services-token-border)] bg-[color:var(--services-token-bg)] px-3 py-2.5 shadow-[0_14px_34px_rgba(0,0,0,0.05)] backdrop-blur-xl sm:gap-3 sm:rounded-[22px] sm:px-4 sm:py-3"
                        >
                          <FiCheckCircle
                            className="theme-shift-transition mt-0.5 shrink-0 text-[1rem] text-[color:var(--services-check)]"
                          />
                          <p
                            className="theme-shift-transition text-[13.5px] leading-5.5 text-[color:var(--services-token-text)] sm:text-[14.5px] sm:leading-6"
                          >
                            {point}
                          </p>
                        </div>
                      ))}
                    </div>

                    <div className="mt-5 sm:mt-7">
                      <Button
                        onClick={() => handleCardNavigation(card.ctaHref)}
                        variant={card.ctaVariant}
                        className={
                          card.ctaVariant === "primary"
                            ? "pl-5 pr-2.5 py-2.5 shadow-[0_18px_52px_rgba(0,0,0,0.16)] sm:pl-6 sm:pr-3 md:pl-7 md:pr-3.5 md:py-3"
                            : "px-4 py-2.5 shadow-[0_14px_40px_rgba(0,0,0,0.08)] sm:px-5 sm:py-3"
                        }
                        trailingAdornmentClassName="ml-1"
                        trailingAdornment={
                          <FiArrowUpRight className="text-base" />
                        }
                      >
                        {card.cta}
                      </Button>
                    </div>

                    <blockquote
                      className="theme-shift-transition mt-3 text-[0.9rem] font-medium leading-6 tracking-[-0.02em] text-[color:var(--services-title)] sm:mt-4 sm:text-[0.98rem] sm:leading-7"
                    >
                      &ldquo;{card.bottomLine}&rdquo;
                    </blockquote>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
});

export default RevenueSystemsSection;
