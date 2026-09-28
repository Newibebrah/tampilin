import { cn } from "@/lib/utils";

type Tone = "paper" | "subtle" | "deep" | "ink" | "flame" | "forest";
type Radius = "card" | "card-lg";

const TONE: Record<Tone, string> = {
  paper: "bg-paper border-border",
  subtle: "bg-paper-subtle border-border",
  deep: "bg-paper-deep border-border",
  ink: "bg-ink text-paper border-ink",
  flame: "bg-flame text-ink border-flame",
  forest: "bg-forest text-paper border-forest",
};

export function Card({
  children,
  tone = "subtle",
  radius = "card",
  interactive = false,
  className,
}: {
  children: React.ReactNode;
  tone?: Tone;
  radius?: Radius;
  interactive?: boolean;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "border p-8 transition-all duration-standard",
        radius === "card" ? "rounded-card" : "rounded-card-lg",
        TONE[tone],
        interactive &&
          "hover:-translate-y-1 hover:border-flame hover:bg-paper-deep hover:shadow-layer-2",
        className
      )}
    >
      {children}
    </div>
  );
}
