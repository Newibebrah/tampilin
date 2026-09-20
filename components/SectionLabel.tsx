import { cn } from "@/lib/utils";

/*
 * SectionLabel: label mono kecil di atas judul section.
 * no = nomor urut (02.), label = kata kunci.
 */
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
    <span
      className={cn(
        "inline-flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-[0.25em] text-accent",
        className,
      )}
    >
      {no && <span className="text-ink/40">{no}.</span>}
      <span className="inline-block h-2 w-2 rotate-45 bg-accent" />
      {label}
    </span>
  );
}
