import { cn } from "@/lib/utils";

export function SectionLabel({
  no,
  label,
  className,
}: {
  no?: string;
  label: string;
  className?: string;
}) {
  return (
    <span className={cn("inline-flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.18em] text-accent", className)}>
      {no && <span className="font-mono text-ink-muted">{no}</span>}
      <span className="h-px w-7 bg-accent" />
      {label}
    </span>
  );
}
