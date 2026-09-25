import { cn } from "@/lib/utils";

export function RotatingBadge({
  text,
  className = "",
  label = "open",
}: {
  text: string;
  className?: string;
  label?: string;
}) {
  return (
    <span
      className={cn("relative grid place-items-center rounded-full border border-current/20", className)}
      style={{ width: "9.5rem", height: "9.5rem" }}
      aria-label={text}
    >
      <span className="font-serif text-sm font-semibold">{label}</span>
    </span>
  );
}
