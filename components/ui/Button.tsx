"use client";

import { forwardRef, ButtonHTMLAttributes } from "react";
import { Slot } from "@radix-ui/react-slot";
import { cn } from "@/lib/utils";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost" | "icon";
  size?: "sm" | "md" | "lg";
  asChild?: boolean;
}

const VARIANT: Record<NonNullable<ButtonProps["variant"]>, string> = {
  primary: "button-primary",
  secondary: "button-secondary",
  ghost: "button-ghost",
  icon: "button-icon",
};

const SIZE_SUFFIX: Record<NonNullable<ButtonProps["size"]>, string> = {
  sm: "-sm",
  md: "",
  lg: "-lg",
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", asChild = false, children, type, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    const sized =
      variant === "icon" || size === "md" ? VARIANT[variant] : `${VARIANT[variant]}${SIZE_SUFFIX[size]}`;

    return (
      <Comp
        ref={ref}
        {...(asChild ? {} : { type: type ?? "button" })}
        className={cn(sized, className)}
        {...props}
      >
        {children}
      </Comp>
    );
  }
);

Button.displayName = "Button";
