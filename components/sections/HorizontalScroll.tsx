"use client";

import { useRef, useEffect, useState } from "react";
import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface HorizontalScrollProps {
  children: React.ReactNode;
  className?: string;
  snap?: "start" | "center" | "end";
  gap?: number;
}

export function HorizontalScroll({
  children,
  className,
  snap = "start",
  gap = 24,
}: HorizontalScrollProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const checkScroll = () => {
      setCanScrollLeft(container.scrollLeft > 10);
      setCanScrollRight(container.scrollLeft + container.clientWidth < container.scrollWidth - 10);
    };

    checkScroll();
    container.addEventListener("scroll", checkScroll, { passive: true });
    window.addEventListener("resize", checkScroll);

    return () => {
      container.removeEventListener("scroll", checkScroll);
      window.removeEventListener("resize", checkScroll);
    };
  }, []);

  const scrollLeft = () => {
    containerRef.current?.scrollBy({ left: -300, behavior: "smooth" });
  };

  const scrollRight = () => {
    containerRef.current?.scrollBy({ left: 300, behavior: "smooth" });
  };

  return (
    <div className={cn("relative", className)}>
      <div
        ref={containerRef}
        className={cn(
          "flex overflow-x-auto scrollbar-hide pb-4 -mb-4",
          "scroll-snap-x"
        )}
        style={{ scrollSnapType: "x mandatory", gap: `${gap}px` }}
      >
        {React.Children.map(children, (child) =>
          React.isValidElement(child)
            ? React.cloneElement(child as React.ReactElement<any>, {
                className: cn(
                  "flex-shrink-0 scroll-snap-start",
                  (child.props.className || "")
                ),
                style: {
                  ...(child.props.style || {}),
                  scrollSnapAlign: snap,
                  minWidth: "300px",
                  maxWidth: "400px",
                },
              })
            : child
        )}
      </div>

      {(canScrollLeft || canScrollRight) && (
        <div className="absolute inset-y-0 left-0 right-0 pointer-events-none">
          {canScrollLeft && (
            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-16 h-16 -ml-8 rounded-full bg-paper/80 backdrop-blur-md border border-border flex items-center justify-center shadow-layer-2 pointer-events-auto cursor-pointer hover:bg-paper-subtle transition-colors" onClick={scrollLeft} aria-label="Scroll left">
              <svg className="h-5 w-5 text-ink" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </div>
          )}
          {canScrollRight && (
            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-16 h-16 -mr-8 rounded-full bg-paper/80 backdrop-blur-md border border-border flex items-center justify-center shadow-layer-2 pointer-events-auto cursor-pointer hover:bg-paper-subtle transition-colors" onClick={scrollRight} aria-label="Scroll right">
              <svg className="h-5 w-5 text-ink" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

interface TimelineStepProps {
  step: {
    no: string;
    title: string;
    body: string;
    duration: string;
    icon?: React.ReactNode;
  };
  index: number;
}

export function TimelineStep({ step, index }: TimelineStepProps) {
  return (
    <motion.div
      className="flex flex-col gap-4 p-6 border border-border rounded-xl bg-paper/50 backdrop-blur-sm min-w-[320px] max-w-[380px]"
      initial={{ opacity: 0, x: 30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: index * 0.1 }}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="grid h-12 w-12 place-items-center rounded-xl bg-flame/10 text-flame font-display font-bold text-xl">
            {step.no}
          </div>
          <div>
            <p className="mono-xs text-flame">{step.duration}</p>
            <h3 className="heading-sm mt-1">{step.title}</h3>
          </div>
        </div>
      </div>
      <p className="body-sm text-ink-muted ml-16">{step.body}</p>
    </motion.div>
  );
}