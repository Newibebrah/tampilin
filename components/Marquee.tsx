import { cn } from "@/lib/utils";

/*
 * Marquee: strip teks berjalan tanpa jeda. Konten diduplikasi 2x lalu
 * track digeser -50% (keyframes "marquee" dari tailwind.config).
 * Props: items (kata/tag), slow (30s vs 20s), reverse, separator.
 */
export function Marquee({
  items,
  className,
  slow = false,
  reverse = false,
  separator = "✦",
}: {
  items: string[];
  className?: string;
  slow?: boolean;
  reverse?: boolean;
  separator?: string;
}) {
  const doubled = [...items, ...items];
  return (
    <div
      className={cn(
        "relative flex overflow-hidden whitespace-nowrap",
        "[mask-image:linear-gradient(90deg,transparent,black_8%,black_92%,transparent)]",
        className,
      )}
      aria-hidden="true"
    >
      <div
        className={cn(
          "flex w-max shrink-0 items-center",
          slow ? "animate-marquee-slow" : "animate-marquee",
          reverse && "[animation-direction:reverse]",
        )}
      >
        {doubled.map((item, i) => (
          <span key={i} className="flex items-center">
            <span className="px-3">{item}</span>
            <span className="opacity-70">{separator}</span>
          </span>
        ))}
      </div>
    </div>
  );
}
