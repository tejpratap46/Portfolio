import React, { useState } from "react";
import { cn } from "@/lib/utils";

export type UnderlineVariant =
  | "sketch"
  | "dual"
  | "wave"
  | "straight"
  | "highlight"
  | "slide";

export interface UnderlineProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  children: React.ReactNode;
  variant?: UnderlineVariant;
  curveVariant?: 1 | 2 | 3;
  color?: string;
  trackColor?: string;
  thickness?: number;
  as?: "a" | "span" | "button";
  animateOnHover?: boolean;
  alwaysActive?: boolean;
  className?: string;
  containerClassName?: string;
}

/**
 * Enhanced Underline component inspired by Ahmad Shadeed's Underliner library.
 * Features dual-layer SVG paths, organic hand-drawn curves, harmonic waves,
 * and high-precision interactive animations.
 */
export const Underline: React.FC<UnderlineProps> = ({
  children,
  variant = "sketch",
  curveVariant = 1,
  color,
  trackColor,
  thickness = 2,
  as = "span",
  animateOnHover = true,
  alwaysActive = false,
  className = "",
  containerClassName = "",
  ...props
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const Component = as as any;

  // Path data for sketch curves
  const sketchPath =
    curveVariant === 2
      ? "M 1,4 Q 35,7 65,3 T 99,5"
      : curveVariant === 3
      ? "M 1,6 Q 25,2 55,5 T 99,3"
      : "M 1,5 Q 30,2 60,6 T 99,4";

  // Render SVG Paths based on variant
  const renderSvgUnderline = () => {
    switch (variant) {
      case "sketch":
        return (
          <svg
            className={cn(
              "absolute left-0 -bottom-1.5 w-full h-[9px] pointer-events-none overflow-visible",
              "transition-all duration-300 ease-out"
            )}
            viewBox="0 0 100 8"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            {/* Base guide track path */}
            <path
              d={sketchPath}
              fill="none"
              stroke={trackColor || "currentColor"}
              strokeWidth={thickness}
              strokeLinecap="round"
              className="opacity-25 transition-opacity duration-300"
            />
            {/* Active animated foreground path */}
            <path
              d={sketchPath}
              fill="none"
              stroke={color || "currentColor"}
              strokeWidth={thickness + 0.6}
              strokeLinecap="round"
              className={cn(
                "transition-all duration-500",
                animateOnHover
                  ? isHovered || alwaysActive
                    ? "stroke-dashoffset-0 opacity-100"
                    : "stroke-dashoffset-[102] opacity-0"
                  : "opacity-100"
              )}
              style={{
                transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
                strokeDasharray: 102,
                strokeDashoffset:
                  !animateOnHover || isHovered || alwaysActive ? 0 : 102,
              }}
            />
          </svg>
        );

      case "dual":
        return (
          <svg
            className="absolute left-0 -bottom-1 w-full h-[6px] pointer-events-none overflow-visible"
            viewBox="0 0 100 6"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            {/* Background passive path */}
            <path
              d="M 0,3 L 100,3"
              fill="none"
              stroke={trackColor || "var(--line-strong, #a3a3a3)"}
              strokeWidth={thickness}
              strokeLinecap="round"
              className="opacity-40"
            />
            {/* Foreground sweeping path */}
            <path
              d="M 0,3 L 100,3"
              fill="none"
              stroke={color || "var(--ink, #171717)"}
              strokeWidth={thickness + 0.5}
              strokeLinecap="round"
              style={{
                strokeDasharray: 100,
                strokeDashoffset:
                  !animateOnHover || isHovered || alwaysActive ? 0 : 100,
                transition: "stroke-dashoffset 0.35s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.2s ease",
                opacity: !animateOnHover || isHovered || alwaysActive ? 1 : 0.2,
              }}
            />
          </svg>
        );

      case "wave":
        return (
          <svg
            className="absolute left-0 -bottom-1.5 w-full h-[7px] pointer-events-none overflow-visible"
            viewBox="0 0 100 7"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            {/* Track */}
            <path
              d="M 0,3.5 Q 12.5,0.5 25,3.5 T 50,3.5 T 75,3.5 T 100,3.5"
              fill="none"
              stroke={trackColor || "currentColor"}
              strokeWidth={thickness}
              strokeLinecap="round"
              className="opacity-25"
            />
            {/* Foreground animated wave */}
            <path
              d="M 0,3.5 Q 12.5,0.5 25,3.5 T 50,3.5 T 75,3.5 T 100,3.5"
              fill="none"
              stroke={color || "currentColor"}
              strokeWidth={thickness + 0.5}
              strokeLinecap="round"
              style={{
                strokeDasharray: 120,
                strokeDashoffset:
                  !animateOnHover || isHovered || alwaysActive ? 0 : 120,
                transition: "stroke-dashoffset 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
              }}
            />
          </svg>
        );

      case "straight":
        return (
          <svg
            className="absolute left-0 -bottom-1 w-full h-[4px] pointer-events-none overflow-visible"
            viewBox="0 0 100 4"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <path
              d="M 0,2 L 100,2"
              fill="none"
              stroke={trackColor || "var(--line-strong)"}
              strokeWidth={thickness}
              strokeLinecap="round"
              className="opacity-30"
            />
            <path
              d="M 0,2 L 100,2"
              fill="none"
              stroke={color || "currentColor"}
              strokeWidth={thickness}
              strokeLinecap="round"
              style={{
                strokeDasharray: 100,
                strokeDashoffset:
                  !animateOnHover || isHovered || alwaysActive ? 0 : 100,
                transition: "stroke-dashoffset 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
              }}
            />
          </svg>
        );

      default:
        return null;
    }
  };

  // Pure CSS slide variant
  if (variant === "slide") {
    return (
      <Component
        className={cn(
          "relative inline-block text-ink group cursor-pointer",
          containerClassName
        )}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        {...props}
      >
        <span
          className={cn(
            "relative z-10 font-inherit transition-colors duration-200",
            className
          )}
        >
          {children}
        </span>
        <span
          aria-hidden="true"
          className="absolute bottom-0 left-0 w-full h-[1.5px] bg-[var(--line-strong)] opacity-40 transition-all duration-300 pointer-events-none"
        />
        <span
          aria-hidden="true"
          className={cn(
            "absolute bottom-0 left-0 h-[2px] bg-[var(--ink)] pointer-events-none transition-all duration-300",
            animateOnHover
              ? isHovered || alwaysActive
                ? "w-full opacity-100"
                : "w-0 opacity-0"
              : "w-full opacity-100"
          )}
          style={{
            transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
            ...(color ? { backgroundColor: color } : {}),
          }}
        />
      </Component>
    );
  }

  // Soft highlighter marker variant
  if (variant === "highlight") {
    return (
      <Component
        className={cn(
          "relative inline-block text-ink group cursor-pointer",
          containerClassName
        )}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        {...props}
      >
        <span
          aria-hidden="true"
          className={cn(
            "absolute inset-x-[-4px] bottom-0 h-[45%] -rotate-0.5 rounded-sm pointer-events-none transition-all duration-300 ease-out",
            "bg-emerald-500/15 dark:bg-emerald-400/20",
            animateOnHover
              ? isHovered || alwaysActive
                ? "opacity-100 scale-100"
                : "opacity-40 scale-x-90"
              : "opacity-100"
          )}
          style={color ? { backgroundColor: color } : undefined}
        />
        <span
          className={cn(
            "relative z-10 font-inherit transition-colors duration-200",
            className
          )}
        >
          {children}
        </span>
      </Component>
    );
  }

  // SVG-based variants (sketch, dual, wave, straight)
  return (
    <Component
      className={cn(
        "relative inline-block text-ink group cursor-pointer transition-colors",
        containerClassName
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      {...props}
    >
      <span className={cn("relative z-10 font-inherit", className)}>
        {children}
      </span>
      {renderSvgUnderline()}
    </Component>
  );
};

export default Underline;
