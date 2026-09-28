import { cn } from "@/lib/utils";

type Tone = "flame" | "lime" | "forest" | "ink" | "outline" | "inverse";
type Size = "sm" | "md" | "lg";

const TONE: Record<Tone, string> = {
  flame: "bg-flame/10 text-flame-hover",
  lime: "bg-lime/25 text-forest",
  forest: "bg-forest-subtle text-forest",
  ink: "bg-ink text-paper",
  outline: "bg-transparent text-ink border border-border-strong",
  inverse: "bg-paper/10 text-paper",
};

const SIZE: Record<Size, string> = {
  sm: "h-10 w-10 rounded-icon [&_svg]:h-4 [&_svg]:w-4",
  md: "h-12 w-12 rounded-icon [&_svg]:h-6 [&_svg]:w-6",
  lg: "h-14 w-14 rounded-icon [&_svg]:h-7 [&_svg]:w-7",
};

export function IconContainer({
  children,
  tone = "flame",
  size = "md",
  className,
}: {
  children: React.ReactNode;
  tone?: Tone;
  size?: Size;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex flex-shrink-0 items-center justify-center transition-colors duration-standard",
        TONE[tone],
        SIZE[size],
        className
      )}
    >
      {children}
    </span>
  );
}
