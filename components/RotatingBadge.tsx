"use client";

/*
 * RotatingBadge — teks yang mengelilingi lingkaran, muter pelan.
 * Self-contained: pakai CSS animation ring, tanpa framer-motion.
 * Nama rilis "spink" dipakai di Navbar saat detail dibuka.
 */
import { useId } from "react";

export function RotatingBadge({
  text,
  className = "",
  label = "open",
}: {
  text: string;
  className?: string;
  label?: string;
}) {
  const id = useId();
  const r = 16;
  const circumference = 2 * Math.PI * r;
  const dash = circumference / text.length;

  return (
    <span
      className={`relative grid place-items-center rounded-full ${className}`}
      style={{ width: "9.5rem", height: "9.5rem" }}
    >
      <svg viewBox="0 0 300 300" className="absolute inset-0 h-full w-full animate-spin-slow">
        <defs>
          <path id={`c-${id}`} d={`M150,150 m-${r},0 a${r},${r} 0 1,1 ${2 * r},0 a${r},${r} 0 1,1 ${-2 * r},0`} />
        </defs>
        <text className="fill-current font-mono text-[11px] uppercase tracking-[0.28em]">
          <textPath href={`#c-${id}`} startOffset="0">
            {text}
          </textPath>
        </text>
      </svg>
      <span className="font-serif text-sm font-black">{label}</span>
    </span>
  );
}
