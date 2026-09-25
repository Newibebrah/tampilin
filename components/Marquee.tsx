import { cn } from "@/lib/utils";

export function Marquee({
  items,
  className,
  separator = "·",
}: {
  items: string[];
  className?: string;
  separator?: string;
}) {
  return (
    <div className={cn("flex flex-wrap items-center gap-x-6 gap-y-2", className)} aria-hidden="true">
      {items.map((item) => (
        <span key={item} className="flex items-center gap-6">
          {item}
          <span className="opacity-60">{separator}</span>
        </span>
      ))}
    </div>
  );
}
