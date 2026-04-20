"use client";

import {
  memo,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
  type Key,
  type ReactNode,
  type RefObject,
} from "react";

export type LogoItem =
  | {
      ariaLabel?: string;
      href?: string;
      node: ReactNode;
      title?: string;
    }
  | {
      alt?: string;
      height?: number;
      href?: string;
      sizes?: string;
      src: string;
      srcSet?: string;
      title?: string;
      width?: number;
    };

export interface LogoLoopProps {
  ariaLabel?: string;
  className?: string;
  direction?: "left" | "right" | "up" | "down";
  fadeOut?: boolean;
  fadeOutColor?: string;
  gap?: number;
  hoverSpeed?: number;
  logoHeight?: number;
  logos: LogoItem[];
  pauseOnHover?: boolean;
  renderItem?: (item: LogoItem, key: Key) => ReactNode;
  scaleOnHover?: boolean;
  speed?: number;
  style?: CSSProperties;
  width?: number | string;
}

const ANIMATION_CONFIG = {
  COPY_HEADROOM: 2,
  MIN_COPIES: 2,
  SMOOTH_TAU: 0.25,
} as const;

const cx = (...parts: Array<string | false | null | undefined>) =>
  parts.filter(Boolean).join(" ");

const toCssLength = (value?: number | string) =>
  typeof value === "number" ? `${value}px` : value;

const isNodeItem = (
  item: LogoItem,
): item is Extract<LogoItem, { node: ReactNode }> => "node" in item;

const useAnimationLoop = (
  trackRef: RefObject<HTMLDivElement | null>,
  targetVelocity: number,
  seqWidth: number,
  seqHeight: number,
  isHovered: boolean,
  hoverSpeed: number | undefined,
  isVertical: boolean,
) => {
  const rafRef = useRef<number | null>(null);
  const lastTimestampRef = useRef<number | null>(null);
  const offsetRef = useRef(0);
  const velocityRef = useRef(0);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) {
      return;
    }

    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const sequenceSize = isVertical ? seqHeight : seqWidth;
    if (sequenceSize > 0) {
      offsetRef.current =
        ((offsetRef.current % sequenceSize) + sequenceSize) % sequenceSize;
      track.style.transform = isVertical
        ? `translate3d(0, ${-offsetRef.current}px, 0)`
        : `translate3d(${-offsetRef.current}px, 0, 0)`;
    }

    if (prefersReducedMotion) {
      track.style.transform = "translate3d(0, 0, 0)";

      return () => {
        lastTimestampRef.current = null;
      };
    }

    const animate = (timestamp: number) => {
      if (lastTimestampRef.current === null) {
        lastTimestampRef.current = timestamp;
      }

      const deltaTime = Math.max(0, timestamp - lastTimestampRef.current) / 1000;
      lastTimestampRef.current = timestamp;

      const target =
        isHovered && hoverSpeed !== undefined ? hoverSpeed : targetVelocity;
      const easingFactor = 1 - Math.exp(-deltaTime / ANIMATION_CONFIG.SMOOTH_TAU);
      velocityRef.current += (target - velocityRef.current) * easingFactor;

      if (sequenceSize > 0) {
        const nextOffset =
          ((offsetRef.current + velocityRef.current * deltaTime) % sequenceSize +
            sequenceSize) %
          sequenceSize;
        offsetRef.current = nextOffset;
        track.style.transform = isVertical
          ? `translate3d(0, ${-nextOffset}px, 0)`
          : `translate3d(${-nextOffset}px, 0, 0)`;
      }

      rafRef.current = window.requestAnimationFrame(animate);
    };

    rafRef.current = window.requestAnimationFrame(animate);

    return () => {
      if (rafRef.current !== null) {
        window.cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }

      lastTimestampRef.current = null;
    };
  }, [
    hoverSpeed,
    isHovered,
    isVertical,
    seqHeight,
    seqWidth,
    targetVelocity,
    trackRef,
  ]);
};

const LogoLoopComponent = ({
  logos,
  speed = 120,
  direction = "left",
  width = "100%",
  logoHeight = 28,
  gap = 32,
  pauseOnHover,
  hoverSpeed,
  fadeOut = false,
  fadeOutColor,
  scaleOnHover = false,
  renderItem,
  ariaLabel = "Partner logos",
  className,
  style,
}: LogoLoopProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const seqRef = useRef<HTMLUListElement>(null);

  const [seqWidth, setSeqWidth] = useState<number>(0);
  const [seqHeight, setSeqHeight] = useState<number>(0);
  const [copyCount, setCopyCount] = useState<number>(
    ANIMATION_CONFIG.MIN_COPIES,
  );
  const [isHovered, setIsHovered] = useState<boolean>(false);

  const isVertical = direction === "up" || direction === "down";
  const effectiveHoverSpeed = useMemo(() => {
    if (hoverSpeed !== undefined) {
      return hoverSpeed;
    }

    if (pauseOnHover === true) {
      return 0;
    }

    if (pauseOnHover === false) {
      return undefined;
    }

    return 0;
  }, [hoverSpeed, pauseOnHover]);

  const targetVelocity = useMemo(() => {
    const magnitude = Math.abs(speed);
    const directionMultiplier = isVertical
      ? direction === "up"
        ? 1
        : -1
      : direction === "left"
        ? 1
        : -1;

    return magnitude * directionMultiplier * (speed < 0 ? -1 : 1);
  }, [direction, isVertical, speed]);

  const updateDimensions = useCallback(() => {
    const container = containerRef.current;
    const sequence = seqRef.current;
    if (!container || !sequence) {
      return;
    }

    const containerWidth = container.clientWidth;
    const sequenceRect = sequence.getBoundingClientRect();
    const measuredWidth = Math.ceil(sequenceRect.width);
    const measuredHeight = Math.ceil(sequenceRect.height);

    if (isVertical) {
      const parentHeight = container.parentElement?.clientHeight ?? measuredHeight;
      if (parentHeight > 0 && container.style.height !== `${parentHeight}px`) {
        container.style.height = `${parentHeight}px`;
      }

      if (measuredHeight > 0) {
        setSeqHeight(measuredHeight);
        const viewportHeight = container.clientHeight || parentHeight || measuredHeight;
        const neededCopies =
          Math.ceil(viewportHeight / measuredHeight) +
          ANIMATION_CONFIG.COPY_HEADROOM;
        setCopyCount(Math.max(ANIMATION_CONFIG.MIN_COPIES, neededCopies));
      }

      return;
    }

    if (measuredWidth > 0) {
      setSeqWidth(measuredWidth);
      const neededCopies =
        Math.ceil(containerWidth / measuredWidth) + ANIMATION_CONFIG.COPY_HEADROOM;
      setCopyCount(Math.max(ANIMATION_CONFIG.MIN_COPIES, neededCopies));
    }
  }, [isVertical]);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    if (typeof ResizeObserver === "undefined") {
      window.addEventListener("resize", updateDimensions);
      updateDimensions();

      return () => {
        window.removeEventListener("resize", updateDimensions);
      };
    }

    const refs = [containerRef, seqRef] as const;
    const observers = refs.map((ref) => {
      if (!ref.current) {
        return null;
      }

      const observer = new ResizeObserver(updateDimensions);
      observer.observe(ref.current);
      return observer;
    });

    updateDimensions();

    return () => {
      observers.forEach((observer) => observer?.disconnect());
    };
  }, [updateDimensions, logos, gap, logoHeight, isVertical]);

  useEffect(() => {
    const sequence = seqRef.current;
    if (!sequence) {
      return;
    }

    const images = Array.from(sequence.querySelectorAll("img"));
    if (images.length === 0) {
      updateDimensions();
      return;
    }

    let pendingCount = images.length;
    const handleComplete = () => {
      pendingCount -= 1;
      if (pendingCount === 0) {
        updateDimensions();
      }
    };

    images.forEach((image) => {
      if (image.complete) {
        handleComplete();
        return;
      }

      image.addEventListener("load", handleComplete, { once: true });
      image.addEventListener("error", handleComplete, { once: true });
    });

    return () => {
      images.forEach((image) => {
        image.removeEventListener("load", handleComplete);
        image.removeEventListener("error", handleComplete);
      });
    };
  }, [updateDimensions, logos, gap, logoHeight, isVertical]);

  useAnimationLoop(
    trackRef,
    targetVelocity,
    seqWidth,
    seqHeight,
    isHovered,
    effectiveHoverSpeed,
    isVertical,
  );

  const cssVariables = useMemo(
    () =>
      ({
        "--logoloop-fadeColor": fadeOutColor,
        "--logoloop-gap": `${gap}px`,
        "--logoloop-logoHeight": `${logoHeight}px`,
      }) as CSSProperties,
    [fadeOutColor, gap, logoHeight],
  );

  const logoFrameStyle = useMemo<CSSProperties>(
    () => ({
      height: `${logoHeight}px`,
    }),
    [logoHeight],
  );

  const logoImageStyle = useMemo<CSSProperties>(
    () => ({
      height: `${logoHeight}px`,
      width: "auto",
    }),
    [logoHeight],
  );

  const rootClasses = useMemo(
    () =>
      cx(
        "group relative",
        isVertical ? "inline-block h-full overflow-hidden" : "overflow-x-hidden",
        "[--logoloop-fadeColorAuto:#0b0b0b]",
        "[--logoloop-gap:32px]",
        "[--logoloop-logoHeight:28px]",
        scaleOnHover && "py-[calc(var(--logoloop-logoHeight)*0.1)]",
        className,
      ),
    [className, isVertical, scaleOnHover],
  );

  const handleMouseEnter = useCallback(() => {
    if (effectiveHoverSpeed !== undefined) {
      setIsHovered(true);
    }
  }, [effectiveHoverSpeed]);

  const handleMouseLeave = useCallback(() => {
    if (effectiveHoverSpeed !== undefined) {
      setIsHovered(false);
    }
  }, [effectiveHoverSpeed]);

  const renderLogoItem = useCallback(
    (item: LogoItem, key: Key) => {
      if (renderItem) {
        return (
          <li
            className={cx(
              "flex-none leading-[1]",
              isVertical ? "mb-[var(--logoloop-gap)]" : "mr-[var(--logoloop-gap)]",
              scaleOnHover && "group/item overflow-visible",
            )}
            key={key}
            role="listitem"
          >
            {renderItem(item, key)}
          </li>
        );
      }

      const hoverScaleClass = scaleOnHover
        ? "transition-transform duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] group-hover/item:scale-105"
        : undefined;

      const content = isNodeItem(item) ? (
        <span
          className={cx("inline-flex items-center motion-reduce:transition-none", hoverScaleClass)}
          aria-hidden={Boolean(item.href && !item.ariaLabel)}
          style={logoFrameStyle}
        >
          {item.node}
        </span>
      ) : (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          alt={item.alt ?? ""}
          className={cx(
            "block object-contain",
            "pointer-events-none motion-reduce:transition-none [-webkit-user-drag:none]",
            hoverScaleClass,
          )}
          decoding="async"
          draggable={false}
          height={item.height}
          loading="lazy"
          sizes={item.sizes}
          src={item.src}
          srcSet={item.srcSet}
          style={logoImageStyle}
          title={item.title}
          width={item.width}
        />
      );

      const href = item.href;
      const itemAriaLabel = isNodeItem(item)
        ? item.ariaLabel ?? item.title
        : item.alt ?? item.title;

      return (
        <li
          className={cx(
            "flex-none leading-[1]",
            isVertical ? "mb-[var(--logoloop-gap)]" : "mr-[var(--logoloop-gap)]",
            scaleOnHover && "group/item overflow-visible",
          )}
          key={key}
          role="listitem"
        >
          {href ? (
            <a
              aria-label={itemAriaLabel || "logo link"}
              className="inline-flex items-center rounded no-underline transition-opacity duration-200 ease-linear hover:opacity-80 focus-visible:outline focus-visible:outline-current focus-visible:outline-offset-2"
              href={href}
              rel="noreferrer noopener"
              target="_blank"
            >
              {content}
            </a>
          ) : (
            content
          )}
        </li>
      );
    },
    [isVertical, logoFrameStyle, logoImageStyle, renderItem, scaleOnHover],
  );

  const logoLists = useMemo(
    () =>
      Array.from({ length: copyCount }, (_, copyIndex) => (
        <ul
          aria-hidden={copyIndex > 0}
          className={cx("flex items-center", isVertical && "flex-col")}
          key={`copy-${copyIndex}`}
          ref={copyIndex === 0 ? seqRef : undefined}
          role="list"
        >
          {logos.map((item, itemIndex) =>
            renderLogoItem(item, `${copyIndex}-${itemIndex}`),
          )}
        </ul>
      )),
    [copyCount, isVertical, logos, renderLogoItem],
  );

  const containerStyle = useMemo(
    () =>
      ({
        ...cssVariables,
        ...style,
        width: isVertical
          ? toCssLength(width) === "100%"
            ? undefined
            : toCssLength(width)
          : (toCssLength(width) ?? "100%"),
      }) as CSSProperties,
    [cssVariables, isVertical, style, width],
  );

  return (
    <div
      aria-label={ariaLabel}
      className={rootClasses}
      ref={containerRef}
      role="region"
      style={containerStyle}
    >
      {fadeOut ? (
        isVertical ? (
          <>
            <div
              aria-hidden
              className="pointer-events-none absolute inset-x-0 top-0 z-10 h-[clamp(24px,8%,120px)] bg-[linear-gradient(to_bottom,var(--logoloop-fadeColor,var(--logoloop-fadeColorAuto))_0%,rgba(0,0,0,0)_100%)]"
            />
            <div
              aria-hidden
              className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-[clamp(24px,8%,120px)] bg-[linear-gradient(to_top,var(--logoloop-fadeColor,var(--logoloop-fadeColorAuto))_0%,rgba(0,0,0,0)_100%)]"
            />
          </>
        ) : (
          <>
            <div
              aria-hidden
              className="pointer-events-none absolute inset-y-0 left-0 z-10 w-[clamp(24px,8%,120px)] bg-[linear-gradient(to_right,var(--logoloop-fadeColor,var(--logoloop-fadeColorAuto))_0%,rgba(0,0,0,0)_100%)]"
            />
            <div
              aria-hidden
              className="pointer-events-none absolute inset-y-0 right-0 z-10 w-[clamp(24px,8%,120px)] bg-[linear-gradient(to_left,var(--logoloop-fadeColor,var(--logoloop-fadeColorAuto))_0%,rgba(0,0,0,0)_100%)]"
            />
          </>
        )
      ) : null}

      <div
        className={cx(
          "relative z-0 flex select-none will-change-transform motion-reduce:transform-none",
          isVertical ? "h-max w-full flex-col" : "w-max flex-row",
        )}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        ref={trackRef}
      >
        {logoLists}
      </div>
    </div>
  );
};

const LogoLoop = memo(LogoLoopComponent);

LogoLoop.displayName = "LogoLoop";

export default LogoLoop;
