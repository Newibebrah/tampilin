"use client";

import { forwardRef, ButtonHTMLAttributes } from "react";
import { Slot } from "@radix-ui/react-slot";
import { cn } from "@/lib/utils";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost" | "icon";
  size?: "sm" | "md" | "lg";
  asChild?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", asChild = false, children, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";

    const baseStyles = "relative inline-flex items-center justify-center gap-2 font-semibold transition-all duration-micro active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-flame focus-visible:ring-offset-2 focus-visible:ring-offset-paper dark:focus-visible:ring-offset-ink disabled:pointer-events-none disabled:opacity-50";

    const variants = {
      primary: "rounded-sharp bg-flame text-paper hover:bg-flame-hover hover:gap-3",
      secondary: "rounded-sharp border border-border-strong bg-transparent text-ink hover:border-ink hover:bg-paper-subtle",
      ghost: "rounded-sharp px-4 text-ink-muted hover:text-ink hover:bg-paper-subtle",
      icon: "grid h-12 w-12 place-items-center rounded-soft border border-border bg-paper/80 backdrop-blur-md text-ink hover:border-border-strong hover:bg-paper-subtle hover:shadow-layer-1",
    };

    const sizes = {
      sm: "px-6 py-3 text-body-sm",
      md: "px-8 py-4 text-body",
      lg: "px-10 py-5 text-body-lg",
    };

    return (
      <Comp
        ref={ref}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        {...props}
      >
        {children}
      </Comp>
    );
  }
);

Button.displayName = "Button";