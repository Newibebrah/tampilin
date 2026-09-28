import { cn } from "@/lib/utils";

type Tone = "flame" | "lime" | "forest" | "ink";

const TONE: Record<Tone, string> = {
  flame: "bg-flame-subtle text-flame-hover border-flame/20",
  lime: "bg-lime/20 text-forest border-lime/40",
  forest: "bg-forest-subtle text-forest border-forest/20",
  ink: "bg-paper-subtle text-ink-muted border-border",
};

export function Badge({
  children,
  tone = "flame",
  dot = false,
  pulse = false,
  className,
}: {
  children: React.ReactNode;
  tone?: Tone;
  dot?: boolean;
  pulse?: boolean;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-pill border px-3 py-1.5 text-mono-xs font-bold uppercase tracking-[0.1em]",
        TONE[tone],
        className
      )}
    >
      {dot && (
        <span className="relative flex h-2 w-2 flex-shrink-0">
          {pulse && (
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-current opacity-60" />
          )}
          <span className="relative inline-flex h-2 w-2 rounded-full bg-current" />
        </span>
      )}
      {children}
    </span>
  );
}
