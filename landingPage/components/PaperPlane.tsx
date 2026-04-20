import type { HTMLAttributes } from "react";
import { useId } from "react";

interface PaperPlaneProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}

export function PaperPlane({
  size = 44,
  className = "",
  style,
  ...props
}: PaperPlaneProps) {
  const gradientId = useId();
  const foldId = useId();
  const tailId = useId();
  const lineId = useId();

  return (
    <div
      aria-hidden="true"
      className={`inline-flex shrink-0 items-center justify-center ${className}`}
      style={{ height: size, width: size, ...style }}
      {...props}
    >
      <svg
        className="h-full w-full overflow-visible drop-shadow-[0_12px_18px_rgba(0,0,0,0.24)]"
        viewBox="0 0 80 80"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id={gradientId} x1="12" y1="24" x2="58" y2="68">
            <stop stopColor="#FBFDFF" />
            <stop offset="0.55" stopColor="#E6EDF5" />
            <stop offset="1" stopColor="#CAD5E1" />
          </linearGradient>
          <linearGradient id={foldId} x1="40" y1="24" x2="62" y2="70">
            <stop stopColor="#F6FAFE" />
            <stop offset="1" stopColor="#A9B8C9" />
          </linearGradient>
          <linearGradient id={tailId} x1="14" y1="39" x2="43" y2="54">
            <stop stopColor="#D7E1EC" />
            <stop offset="1" stopColor="#B7C4D3" />
          </linearGradient>
          <linearGradient id={lineId} x1="20" y1="24" x2="59" y2="62">
            <stop stopColor="rgba(56,72,91,0.75)" />
            <stop offset="1" stopColor="rgba(56,72,91,0.08)" />
          </linearGradient>
        </defs>

        <path
          d="M11 37.5L67.4 14.4C69.5 13.5 71.5 15.5 70.6 17.6L47.5 74C46.7 75.9 43.9 76.1 42.9 74.4L32.1 54.1L11 37.5Z"
          fill={`url(#${gradientId})`}
        />
        <path
          d="M32.1 54.1L70.6 17.6L52 41.1L47.5 74L32.1 54.1Z"
          fill={`url(#${foldId})`}
        />
        <path
          d="M11 37.5L52 41.1L32.1 54.1L11 37.5Z"
          fill={`url(#${tailId})`}
          opacity="0.94"
        />
        <path
          d="M23.8 31L52 41.1"
          stroke={`url(#${lineId})`}
          strokeLinecap="round"
          strokeWidth="1.5"
          opacity="0.8"
        />
        <path
          d="M32.1 54.1L47.5 74"
          stroke="rgba(38, 55, 72, 0.22)"
          strokeLinecap="round"
          strokeWidth="1.35"
        />
        <path
          d="M33.5 52.7L69.3 18.9"
          stroke="rgba(56, 72, 91, 0.18)"
          strokeLinecap="round"
          strokeWidth="1.2"
        />
      </svg>
    </div>
  );
}
