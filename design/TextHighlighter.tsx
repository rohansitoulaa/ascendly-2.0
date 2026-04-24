"use client";

import {
  type CSSProperties,
  type ElementType,
  type HTMLAttributes,
  type MouseEvent,
  type ReactNode,
  createElement,
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { motion, type Transition, useInView } from "motion/react";

type HighlightDirection = "ltr" | "rtl" | "ttb" | "btt";

type InViewOptions = Parameters<typeof useInView>[1];

const TEXT_HIGHLIGHT_DEFAULTS = {
  // Highlight sweep duration in seconds. Keep between 0.35 and 1.2 so the fill stays readable and not sluggish.
  duration: 1,
  // Viewport share required before in-view highlights trigger. Keep between 0.1 and 0.5 to avoid firing too early or too late.
  inViewAmount: 0.1,
} as const;

const TEXT_HIGHLIGHT_DEFAULT_TRANSITION: Transition = {
  type: "spring",
  duration: TEXT_HIGHLIGHT_DEFAULTS.duration,
  delay: 0,
  bounce: 0,
};

const TEXT_HIGHLIGHT_DEFAULT_IN_VIEW: InViewOptions = {
  once: true,
  initial: false,
  amount: TEXT_HIGHLIGHT_DEFAULTS.inViewAmount,
};

export type TextHighlighterProps = {
  children: ReactNode;
  as?: ElementType;
  triggerType?: "hover" | "ref" | "inView" | "auto";
  transition?: Transition;
  useInViewOptions?: InViewOptions;
  className?: string;
  highlightColor?: string;
  direction?: HighlightDirection;
} & HTMLAttributes<HTMLElement>;

export type TextHighlighterRef = {
  animate: (direction?: HighlightDirection) => void;
  reset: () => void;
};

function getBackgroundSize(direction: HighlightDirection, animated: boolean) {
  switch (direction) {
    case "ltr":
    case "rtl":
      return animated ? "100% 100%" : "0% 100%";
    case "ttb":
    case "btt":
      return animated ? "100% 100%" : "100% 0%";
    default:
      return animated ? "100% 100%" : "0% 100%";
  }
}

function getBackgroundPosition(direction: HighlightDirection) {
  switch (direction) {
    case "ltr":
      return "0% 0%";
    case "rtl":
      return "100% 0%";
    case "ttb":
      return "0% 0%";
    case "btt":
      return "0% 100%";
    default:
      return "0% 0%";
  }
}

export const TextHighlighter = forwardRef<TextHighlighterRef, TextHighlighterProps>(
  (
    {
      children,
      as = "span",
      triggerType = "inView",
      transition = TEXT_HIGHLIGHT_DEFAULT_TRANSITION,
      useInViewOptions = TEXT_HIGHLIGHT_DEFAULT_IN_VIEW,
      className,
      highlightColor = "rgba(253, 224, 71, 0.28)",
      direction = "ltr",
      onMouseEnter,
      onMouseLeave,
      ...props
    },
    ref,
  ) => {
    const componentRef = useRef<HTMLElement>(null);
    const [isAnimating, setIsAnimating] = useState(false);
    const [isHovered, setIsHovered] = useState(false);
    const [currentDirection, setCurrentDirection] =
      useState<HighlightDirection>(direction);

    useEffect(() => {
      setCurrentDirection(direction);
    }, [direction]);

    const isInView = useInView(componentRef, useInViewOptions);

    useImperativeHandle(ref, () => ({
      animate: (animationDirection?: HighlightDirection) => {
        if (animationDirection) {
          setCurrentDirection(animationDirection);
        }
        setIsAnimating(true);
      },
      reset: () => setIsAnimating(false),
    }));

    const shouldAnimate =
      triggerType === "hover"
        ? isHovered
        : triggerType === "inView"
          ? isInView
          : triggerType === "ref"
            ? isAnimating
            : triggerType === "auto";

    const ElementTag = as;
    const backgroundSize = getBackgroundSize(currentDirection, shouldAnimate);
    const initialBackgroundSize = getBackgroundSize(currentDirection, false);
    const backgroundPosition = getBackgroundPosition(currentDirection);

    const highlightStyle: CSSProperties = {
      backgroundImage: `linear-gradient(${highlightColor}, ${highlightColor})`,
      backgroundRepeat: "no-repeat",
      backgroundPosition,
      boxDecorationBreak: "clone",
      WebkitBoxDecorationBreak: "clone",
    };

    const handleMouseEnter = (event: MouseEvent<HTMLElement>) => {
      onMouseEnter?.(event);
      if (triggerType === "hover") {
        setIsHovered(true);
      }
    };

    const handleMouseLeave = (event: MouseEvent<HTMLElement>) => {
      onMouseLeave?.(event);
      if (triggerType === "hover") {
        setIsHovered(false);
      }
    };

    return createElement(
      ElementTag,
      {
        ...props,
        ref: componentRef,
        onMouseEnter: handleMouseEnter,
        onMouseLeave: handleMouseLeave,
      },
      (
        <motion.span
          className={["inline", className].filter(Boolean).join(" ")}
          style={highlightStyle}
          animate={{ backgroundSize }}
          initial={{ backgroundSize: initialBackgroundSize }}
          transition={transition}
        >
          {children}
        </motion.span>
      ),
    );
  },
);

TextHighlighter.displayName = "TextHighlighter";

export default TextHighlighter;
