"use client";

import {
  type ButtonHTMLAttributes,
  type ReactNode,
  forwardRef,
  useRef,
  useState,
} from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  type Variants,
} from "motion/react";
import { FiArrowUpRight } from "react-icons/fi";

type Variant = "primary" | "glass" | "ghost" | "outline";
type Size = "sm" | "md" | "lg";
export type IconAnimation = "nudge" | "shake" | "pulse" | "bounce" | "spin";

interface ButtonProps extends Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  "onAnimationStart" | "onDrag" | "onDragEnd" | "onDragStart"
> {
  variant?: Variant;
  size?: Size;
  children: ReactNode;
  icon?: ReactNode;
  iconPosition?: "left" | "right";
  magnetic?: boolean;
  loading?: boolean;
  href?: string;
  iconAnimation?: IconAnimation;
  secondaryText?: string;
}

// rounded-xl for all sizes; sm is now noticeably larger for navbar legibility
const sizeStyles: Record<Size, string> = {
  sm: "px-5 py-2.5 text-[0.88rem] rounded-xl gap-2",
  md: "px-6 py-3 text-[0.95rem] rounded-xl gap-2.5 sm:px-7 sm:py-3.5",
  lg: "px-7 py-3.5 text-[1rem] rounded-xl gap-3 sm:px-8 sm:py-4 sm:text-[1.05rem]",
};

// Static visual config per variant  background never moves
interface VariantCfg {
  className: string;
  bgStyle?: string;
  textClass: string;
  hoverOverlay: string;
  shadow?: string;
  hoverShadow?: string;
}

const variantCfg: Record<Variant, VariantCfg> = {
  primary: {
    className: "",
    bgStyle: "linear-gradient(135deg, #475C70 0%, #263E52 100%)",
    textClass: "text-white",
    hoverOverlay: "rgba(255,255,255,0.10)",
    shadow:
      "0 10px 36px rgba(38,62,82,0.45), inset 0 1px 0 rgba(255,255,255,0.14)",
    hoverShadow:
      "0 18px 52px rgba(38,62,82,0.60), inset 0 1px 0 rgba(255,255,255,0.20)",
  },
  glass: {
    className: "border border-white/12 bg-white/[0.06] backdrop-blur-xl",
    textClass: "text-white",
    hoverOverlay: "rgba(71,92,112,0.28)",
    shadow:
      "0 10px 40px rgba(0,0,0,0.28), inset 0 1px 0 rgba(255,255,255,0.08)",
    hoverShadow:
      "0 14px 48px rgba(38,62,82,0.30), inset 0 1px 0 rgba(255,255,255,0.14)",
  },
  ghost: {
    className: "",
    textClass: "text-white/80",
    hoverOverlay: "rgba(71,92,112,0.20)",
  },
  outline: {
    className: "border border-[#475C70]/40 bg-[#475C70]/[0.06]",
    textClass: "text-[#a5c0d8]",
    hoverOverlay: "rgba(71,92,112,0.22)",
    shadow: "inset 0 1px 0 rgba(125,180,210,0.08)",
    hoverShadow:
      "0 0 0 1px rgba(71,92,112,0.30), inset 0 1px 0 rgba(125,180,210,0.14)",
  },
};

// Icon animation variants  icon stays in position, only transforms
const iconAnimVariants: Record<IconAnimation, Variants> = {
  nudge: {
    idle: { x: 0, rotate: 0 },
    active: {
      x: 4,
      rotate: 14,
      transition: { type: "spring", stiffness: 420, damping: 20 },
    },
  },
  shake: {
    idle: { rotate: 0, x: 0 },
    active: {
      rotate: [0, -20, 20, -16, 16, -10, 10, -5, 5, 0],
      transition: { duration: 0.65, ease: "easeInOut" },
    },
  },
  pulse: {
    idle: { scale: 1 },
    active: {
      scale: [1, 1.38, 0.86, 1.16, 1],
      transition: { duration: 0.5, ease: "easeOut" },
    },
  },
  bounce: {
    idle: { y: 0 },
    active: {
      y: [-4, 0, -2.5, 0],
      transition: { duration: 0.5, ease: "easeInOut" },
    },
  },
  spin: {
    idle: { rotate: 0 },
    active: {
      rotate: 360,
      transition: { type: "spring", stiffness: 220, damping: 16 },
    },
  },
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  function Button(
    {
      variant = "primary",
      size = "md",
      children,
      icon,
      iconPosition = "right",
      magnetic = false,
      loading = false,
      className = "",
      disabled,
      href,
      onClick,
      iconAnimation = "nudge",
      secondaryText,
      ...rest
    },
    forwardedRef,
  ) {
    const localRef = useRef<HTMLButtonElement>(null);
    const ref =
      (forwardedRef as React.RefObject<HTMLButtonElement>) ?? localRef;

    const [isPressed, setIsPressed] = useState(false);
    const [isHovered, setIsHovered] = useState(false);
    const [ripple, setRipple] = useState<{
      x: number;
      y: number;
      id: number;
    } | null>(null);

    const mx = useMotionValue(0);
    const my = useMotionValue(0);
    const springX = useSpring(mx, { stiffness: 220, damping: 22 });
    const springY = useSpring(my, { stiffness: 220, damping: 22 });
    const rotateX = useTransform(springY, [-20, 20], [6, -6]);
    const rotateY = useTransform(springX, [-20, 20], [-6, 6]);

    const handleMouseMove = magnetic
      ? (e: React.MouseEvent<HTMLButtonElement>) => {
          if (!ref.current) return;
          const r = ref.current.getBoundingClientRect();
          mx.set((e.clientX - r.left - r.width / 2) * 0.35);
          my.set((e.clientY - r.top - r.height / 2) * 0.35);
        }
      : undefined;

    const handleMouseLeave = () => {
      if (magnetic) {
        mx.set(0);
        my.set(0);
      }
      setIsPressed(false);
      setIsHovered(false);
    };

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      if (!ref.current) return;
      const r = ref.current.getBoundingClientRect();
      setRipple({
        x: e.clientX - r.left,
        y: e.clientY - r.top,
        id: Date.now(),
      });
      window.setTimeout(() => setRipple(null), 600);
      if (href) window.location.href = href;
      onClick?.(e);
    };

    const cfg = variantCfg[variant];
    const easing = "cubic-bezier(0.4, 0, 0.2, 1)";

    // Icon node  stays anchored, only animates in place
    const iconNode = (anim: boolean) => (
      <motion.span
        className="inline-flex shrink-0 items-center justify-center"
        variants={anim ? iconAnimVariants[iconAnimation] : undefined}
        animate={anim ? (isHovered ? "active" : "idle") : undefined}
        initial={anim ? "idle" : undefined}
      >
        {icon ?? <FiArrowUpRight className="text-[1.1em]" />}
      </motion.span>
    );

    return (
      <motion.button
        ref={ref}
        type={rest.type ?? "button"}
        disabled={disabled || loading}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={handleMouseLeave}
        onMouseDown={() => setIsPressed(true)}
        onMouseUp={() => setIsPressed(false)}
        onClick={handleClick}
        style={
          magnetic
            ? {
                x: springX,
                y: springY,
                rotateX,
                rotateY,
                transformPerspective: 600,
                background: cfg.bgStyle,
                boxShadow: isHovered ? cfg.hoverShadow : cfg.shadow,
              }
            : {
                background: cfg.bgStyle,
                boxShadow: isHovered ? cfg.hoverShadow : cfg.shadow,
              }
        }
        className={[
          "relative inline-flex cursor-pointer items-center justify-center overflow-hidden whitespace-nowrap",
          "transition-[box-shadow,border-color] duration-300",
          "disabled:cursor-not-allowed disabled:opacity-60",
          cfg.className,
          cfg.textClass,
          sizeStyles[size],
          className,
        ]
          .filter(Boolean)
          .join(" ")}
        {...rest}
      >
        {/* Hover brightness overlay  fades in, background itself never moves */}
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 transition-opacity duration-300"
          style={{
            background: cfg.hoverOverlay,
            opacity: isHovered ? 1 : 0,
          }}
        />

        {/* Content row: [icon?] [text slider] [icon?] */}
        <motion.span
          className="relative z-10 inline-flex items-center"
          style={{ gap: "inherit" }}
          animate={{ scale: isPressed ? 0.97 : 1 }}
          transition={{ type: "spring", stiffness: 400, damping: 24 }}
        >
          {/* Left icon  anchored, animates only */}
          {icon && iconPosition === "left" && iconNode(true)}

          {/* Text-only slider  overflow:hidden clips two label spans */}
          <span className="relative inline-block overflow-hidden">
            {/* Resting label  slides out upward on hover */}
            <span
              className="block font-medium tracking-[-0.01em]"
              style={{
                transform: isHovered ? "translateY(-100%)" : "translateY(0)",
                transition: `transform 0.30s ${easing}`,
              }}
            >
              {children}
            </span>
            {/* Hover label  slides in from below */}
            <span
              className="absolute left-0 top-0 block font-medium tracking-[-0.01em]"
              style={{
                transform: isHovered ? "translateY(0)" : "translateY(100%)",
                transition: `transform 0.30s ${easing}`,
              }}
              aria-hidden
            >
              {secondaryText ?? children}
            </span>
          </span>

          {/* Right icon  anchored, animates only */}
          {iconPosition === "right" && iconNode(true)}
        </motion.span>

        {/* Ripple */}
        {ripple && (
          <motion.span
            key={ripple.id}
            initial={{ opacity: 0.35, scale: 0 }}
            animate={{ opacity: 0, scale: 4 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="pointer-events-none absolute h-24 w-24 rounded-full bg-current"
            style={{
              left: ripple.x - 48,
              top: ripple.y - 48,
              mixBlendMode: variant === "primary" ? "multiply" : "screen",
              zIndex: 20,
            }}
          />
        )}

        {loading && (
          <span className="absolute inset-0 z-30 flex items-center justify-center">
            <span className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-current border-t-transparent" />
          </span>
        )}
      </motion.button>
    );
  },
);

export default Button;
