import React from "react";
import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";
import { GlowingEffect } from "./glowing-effect";

const mockupVariants = cva(
  "flex relative z-10 overflow-visible shadow-2xl border border-border/5 border-t-border/15",
  {
    variants: {
      type: {
        mobile: "rounded-[48px] max-w-[350px]",
        responsive: "rounded-md",
      },
    },
    defaultVariants: {
      type: "responsive",
    },
  },
);

export interface MockupProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof mockupVariants> {
  glowing?: boolean;
  glowingVariant?: "default" | "white";
  glowingDisabled?: boolean;
  borderWidth?: number;
  spread?: number;
}

const Mockup = React.forwardRef<HTMLDivElement, MockupProps>(
  ({ className, type, glowing = true, glowingVariant = "default", glowingDisabled = false, borderWidth = 2, spread = 30, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(mockupVariants({ type, className }))}
      {...props}
    >
      {glowing && (
        <GlowingEffect 
          variant={glowingVariant} 
          disabled={glowingDisabled}
          borderWidth={borderWidth}
          spread={spread}
          glow={true}
        />
      )}
      {props.children}
    </div>
  ),
);
Mockup.displayName = "Mockup";

const frameVariants = cva(
  "bg-accent/5 flex relative z-10 overflow-visible rounded-2xl",
  {
    variants: {
      size: {
        small: "p-2",
        large: "p-4",
      },
    },
    defaultVariants: {
      size: "small",
    },
  },
);

export interface MockupFrameProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof frameVariants> {
  glowing?: boolean;
  glowingVariant?: "default" | "white";
  glowingDisabled?: boolean;
  borderWidth?: number;
  spread?: number;
}

const MockupFrame = React.forwardRef<HTMLDivElement, MockupFrameProps>(
  ({ className, size, glowing = true, glowingVariant = "default", glowingDisabled = false, borderWidth = 2, spread = 30, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(frameVariants({ size, className }))}
      {...props}
    >
      {glowing && (
        <GlowingEffect 
          variant={glowingVariant} 
          disabled={glowingDisabled}
          borderWidth={borderWidth}
          spread={spread}
          glow={true}
        />
      )}
      {props.children}
    </div>
  ),
);
MockupFrame.displayName = "MockupFrame";

export { Mockup, MockupFrame };