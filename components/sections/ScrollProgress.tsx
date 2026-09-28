"use client";

import { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface ScrollProgressProps {
  steps: number;
  className?: string;
}

export function ScrollProgress({ steps, className }: ScrollProgressProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          const rect = entry.target.getBoundingClientRect();
          const containerRect = container.getBoundingClientRect();
          const scrollProgress = Math.max(0, Math.min(1, (containerRect.bottom - rect.top) / (containerRect.height + rect.height)));
          setProgress(scrollProgress);
        }
      },
      { threshold: Array.from({ length: 101 }, (_, i) => i / 100) }
    );

    const items = container.querySelectorAll("[data-step]");
    items.forEach((item) => observer.observe(item));

    return () => observer.disconnect();
  }, [steps]);

  return (
    <div ref={containerRef} className={cn("relative", className)}>
      <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-[2px] bg-border" aria-hidden="true">
        <motion.div
          className="absolute left-1/2 -translate-x-1/2 h-[2px] bg-flame"
          style={{ transformOrigin: "top center" }}
          animate={{ scaleY: progress }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        />
      </div>
      {Array.from({ length: steps }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-paper border-2 border-border z-10"
          style={{ top: `${(i / (steps - 1)) * 100}%` }}
          animate={{
            borderColor: progress >= i / (steps - 1) ? "#FF4D2E" : "rgba(17,17,17,0.08)",
            backgroundColor: progress >= i / (steps - 1) ? "#FF4D2E" : "#F5F1EA",
          }}
          transition={{ duration: 0.3 }}
        />
      ))}
    </div>
  );
}