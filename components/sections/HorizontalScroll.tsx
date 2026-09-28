"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { ArrowLeft, ArrowRight, MessageSquare, Palette, PenTool, Rocket } from "lucide-react";

const STEP_ICONS = {
  discover: MessageSquare,
  sketsa: PenTool,
  desain: Palette,
  "go-live": Rocket,
} as const;





export function HorizontalScroll({
  children,
  className,
  gap = 24,
}: {
  children: React.ReactNode;
  className?: string;
  gap?: number;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [edges, setEdges] = useState({ left: false, right: true });

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const update = () => {
      setEdges({
        left: el.scrollLeft > 10,
        right: el.scrollLeft + el.clientWidth < el.scrollWidth - 10,
      });
    };

    update();
    el.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      el.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  const nudge = (dir: 1 | -1) => {
    containerRef.current?.scrollBy({ left: dir * 340, behavior: "smooth" });
  };

  return (
    <div className={cn("relative", className)}>
      <div
        ref={containerRef}
        className="scrollbar-hide -mb-4 flex snap-x snap-mandatory overflow-x-auto pb-4 md:-mb-0 md:grid md:grid-cols-3 md:gap-6 md:overflow-visible md:pb-0 md:snap-none"
        style={{ gap: `${gap}px` }}
      >
        {children}
      </div>

      <div className="mt-2 flex items-center gap-2 md:hidden">
        <button
          type="button"
          onClick={() => nudge(-1)}
          disabled={!edges.left}
          className="grid h-11 w-11 place-items-center rounded-icon border border-border bg-paper text-ink transition-all duration-micro hover:border-flame hover:text-flame-hover disabled:pointer-events-none disabled:opacity-30"
          aria-label="Geser ke kiri"
        >
          <ArrowLeft className="h-4 w-4" />
        </button>
        <button
          type="button"
          onClick={() => nudge(1)}
          disabled={!edges.right}
          className="grid h-11 w-11 place-items-center rounded-icon border border-border bg-paper text-ink transition-all duration-micro hover:border-flame hover:text-flame-hover disabled:pointer-events-none disabled:opacity-30"
          aria-label="Geser ke kanan"
        >
          <ArrowRight className="h-4 w-4" />
        </button>
        <p className="ml-2 mono-xs uppercase tracking-[0.14em] text-ink-subtle">
          Geser untuk lihat semua langkah
        </p>
      </div>
    </div>
  );
}

export interface TimelineStepData {
  id: string;
  no: string;
  title: string;
  body: string;
  duration: string;
}

export function TimelineStep({ step, index }: { step: TimelineStepData; index: number }) {
  const Icon = STEP_ICONS[step.id as keyof typeof STEP_ICONS] ?? PenTool;

  return (
    <motion.article
      className="flex w-[300px] shrink-0 snap-start flex-col rounded-card border border-border bg-paper-subtle p-7 transition-all duration-standard hover:-translate-y-1 hover:border-flame hover:bg-paper hover:shadow-layer-2 sm:w-[340px] md:w-auto"
      initial={{ opacity: 0, x: 24 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.45, delay: index * 0.08 }}
    >
      <div className="flex items-start justify-between">
        <span className="grid h-14 w-14 place-items-center rounded-icon bg-flame/10 text-flame-hover">
          <Icon className="h-6 w-6" strokeWidth={2} />
        </span>
        <span className="font-display text-3xl font-extrabold leading-none tracking-[-0.04em] text-ink/10">
          {step.no}
        </span>
      </div>

      <p className="mono-xs mt-6 uppercase tracking-[0.14em] text-flame-hover">{step.duration}</p>
      <h3 className="heading-md mt-2 text-ink">{step.title}</h3>
      <p className="body-sm mt-3 text-ink-muted">{step.body}</p>
    </motion.article>
  );
}
