"use client";

import { HTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/utils";
import { GlowingEffect } from "./glowing-effect";

interface GlowingContainerProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  glowClassName?: string;
  variant?: "default" | "white";
  glow?: boolean;
  disabled?: boolean;
  blur?: number;
  borderWidth?: number;
  spread?: number;
}

const GlowingContainer = forwardRef<HTMLDivElement, GlowingContainerProps>(
  (
    {
      className,
      glowClassName,
      children,
      variant = "default",
      glow = true,
      disabled = false,
      blur = 0,
      borderWidth = 2,
      spread = 30,
      ...props
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className={cn(
          "relative rounded-lg border border-slate-200 dark:border-slate-800 overflow-visible",
          className
        )}
        {...props}
      >
        <GlowingEffect
          variant={variant}
          glow={glow}
          disabled={disabled}
          blur={blur}
          className={glowClassName}
          borderWidth={borderWidth}
          spread={spread}
        />
        {children}
      </div>
    );
  }
);

GlowingContainer.displayName = "GlowingContainer";

export { GlowingContainer }; 