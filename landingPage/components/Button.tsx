import type { ButtonHTMLAttributes, ReactNode } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  leadingAdornment?: ReactNode;
  trailingAdornment?: ReactNode;
  trailingAdornmentClassName?: string;
  variant?: "primary" | "glass";
  href?: string;
}

export function Button({
  variant = "primary",
  leadingAdornment,
  trailingAdornment,
  trailingAdornmentClassName = "",
  children,
  className = "",
  href,
  onClick,
  ...props
}: ButtonProps) {
  const baseStyles =
    "inline-flex items-center justify-center rounded-full border font-medium transition-all duration-300 disabled:cursor-not-allowed disabled:opacity-60 min-h-[44px]";

  const variantStyles =
    variant === "glass"
      ? "gap-2 border-hairline/14 bg-surface/6 px-5 py-2.5 text-sm text-ink/88 backdrop-blur-xl shadow-[inset_0_1px_0_rgba(255,255,255,0.12),0_16px_36px_rgba(0,0,0,0.18)] hover:bg-surface/10 hover:text-ink"
      : "gap-3 border-white/55 bg-white px-5 py-3 text-base font-semibold text-slate-800 shadow-[0_24px_60px_rgba(5,12,18,0.2),inset_0_1px_0_rgba(255,255,255,0.92)] hover:-translate-y-0.5 hover:bg-slate-50 md:px-6 md:py-3.5";

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (href) {
      if (/^https?:\/\//i.test(href)) {
        window.open(href, "_blank", "noopener,noreferrer");
      } else {
        window.location.href = href;
      }
    }
    onClick?.(e);
  };

  return (
    <button
      className={`${baseStyles} ${variantStyles} ${className}`}
      onClick={handleClick}
      {...props}
    >
      {leadingAdornment ? (
        <span className="inline-flex shrink-0 items-center justify-center">
          {leadingAdornment}
        </span>
      ) : null}
      <span>{children}</span>
      {trailingAdornment ? (
        <span
          className={`inline-flex shrink-0 items-center justify-center ${trailingAdornmentClassName}`}
        >
          {trailingAdornment}
        </span>
      ) : null}
    </button>
  );
}
