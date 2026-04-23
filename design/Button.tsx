"use client";

import {
  type ButtonHTMLAttributes,
  type ReactNode,
  forwardRef,
  useRef,
  useState,
} from "react";
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { FiArrowUpRight } from "react-icons/fi";

type Variant = "primary" | "glass" | "ghost" | "outline";
type Size = "sm" | "md" | "lg";

interface ButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "onAnimationStart" | "onDrag" | "onDragEnd" | "onDragStart"> {
  variant?: Variant;
  size?: Size;
  children: ReactNode;
  icon?: ReactNode;
  iconPosition?: "left" | "right";
  magnetic?: boolean;
  loading?: boolean;
  href?: string;
}

const variantStyles: Record<Variant, string> = {
  primary:
    "bg-white text-[#05060A] shadow-[0_14px_44px_rgba(255,255,255,0.22),inset_0_1px_0_rgba(255,255,255,0.8)] hover:shadow-[0_22px_60px_rgba(255,255,255,0.32),inset_0_1px_0_rgba(255,255,255,0.9)]",
  glass:
    "border border-white/12 bg-white/[0.04] text-white backdrop-blur-xl shadow-[0_10px_40px_rgba(0,0,0,0.3),inset_0_1px_0_rgba(255,255,255,0.08)] hover:bg-white/[0.08] hover:border-white/20",
  ghost: "text-white/80 hover:text-white hover:bg-white/[0.06]",
  outline:
    "border border-cyan-400/30 bg-cyan-500/[0.04] text-cyan-100 hover:border-cyan-400/55 hover:bg-cyan-500/[0.08] hover:text-cyan-50 shadow-[0_0_0_1px_rgba(125,211,252,0.04),inset_0_1px_0_rgba(125,211,252,0.08)]",
};

const sizeStyles: Record<Size, string> = {
  sm: "px-4 py-2 text-[0.78rem] rounded-full gap-1.5",
  md: "px-5 py-2.5 text-[0.88rem] rounded-full gap-2 sm:px-6 sm:py-3 sm:text-[0.92rem]",
  lg: "px-6 py-3 text-[0.95rem] rounded-full gap-2.5 sm:px-7 sm:py-3.5 sm:text-[1rem]",
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  {
    variant = "primary",
    size = "md",
    children,
    icon,
    iconPosition = "right",
    magnetic = true,
    loading = false,
    className = "",
    disabled,
    href,
    onClick,
    ...rest
  },
  forwardedRef,
) {
  const localRef = useRef<HTMLButtonElement>(null);
  const ref = (forwardedRef as React.RefObject<HTMLButtonElement>) ?? localRef;

  const [isPressed, setIsPressed] = useState(false);
  const [ripple, setRipple] = useState<{ x: number; y: number; id: number } | null>(null);

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const springX = useSpring(mx, { stiffness: 220, damping: 22 });
  const springY = useSpring(my, { stiffness: 220, damping: 22 });
  const rotateX = useTransform(springY, [-20, 20], [6, -6]);
  const rotateY = useTransform(springX, [-20, 20], [-6, 6]);

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!magnetic || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    mx.set(x * 0.35);
    my.set(y * 0.35);
  };

  const handleMouseLeave = () => {
    mx.set(0);
    my.set(0);
    setIsPressed(false);
  };

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    setRipple({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
      id: Date.now(),
    });
    window.setTimeout(() => setRipple(null), 600);
    if (href) {
      window.location.href = href;
    }
    onClick?.(e);
  };

  const content = (
    <motion.span
      className="relative z-10 inline-flex items-center"
      style={{ gap: "inherit" }}
      animate={{ scale: isPressed ? 0.97 : 1 }}
      transition={{ type: "spring", stiffness: 400, damping: 24 }}
    >
      {icon && iconPosition === "left" && (
        <motion.span
          className="inline-flex items-center justify-center"
          whileHover={{ rotate: -8 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          {icon}
        </motion.span>
      )}
      <span className="inline-block font-medium tracking-[-0.01em]">
        {children}
      </span>
      {icon !== undefined
        ? iconPosition === "right" && (
            <motion.span
              className="inline-flex items-center justify-center"
              animate={{ x: isPressed ? 2 : 0 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              {icon}
            </motion.span>
          )
        : iconPosition === "right" && (
            <motion.span
              className="inline-flex items-center justify-center"
              animate={{ x: isPressed ? 3 : 0, rotate: isPressed ? 6 : 0 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <FiArrowUpRight className="text-[1.05em]" />
            </motion.span>
          )}
    </motion.span>
  );

  return (
    <motion.button
      ref={ref}
      type={rest.type ?? "button"}
      disabled={disabled || loading}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseDown={() => setIsPressed(true)}
      onMouseUp={() => setIsPressed(false)}
      onClick={handleClick}
      style={
        magnetic
          ? { x: springX, y: springY, rotateX, rotateY, transformPerspective: 600 }
          : undefined
      }
      className={[
        "group relative inline-flex cursor-pointer items-center justify-center overflow-hidden whitespace-nowrap font-medium transition-[background,border-color,box-shadow,color] duration-300 disabled:cursor-not-allowed disabled:opacity-60",
        variantStyles[variant],
        sizeStyles[size],
        className,
      ].join(" ")}
      {...rest}
    >
      {/* Sheen sweep on hover */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent opacity-0 transition-[transform,opacity] duration-700 group-hover:translate-x-full group-hover:opacity-100"
      />

      {/* Ripple */}
      {ripple && (
        <motion.span
          key={ripple.id}
          initial={{ opacity: 0.45, scale: 0 }}
          animate={{ opacity: 0, scale: 4 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="pointer-events-none absolute h-24 w-24 rounded-full bg-current"
          style={{
            left: ripple.x - 48,
            top: ripple.y - 48,
            mixBlendMode: variant === "primary" ? "multiply" : "screen",
          }}
        />
      )}

      {loading && (
        <span className="relative z-10 mr-2 inline-block h-3.5 w-3.5 animate-spin rounded-full border-2 border-current border-t-transparent" />
      )}

      {content}
    </motion.button>
  );
});

export default Button;
