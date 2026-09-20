"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

/*
 * Reveal: masuk + pergeseran + rotasi halus saat elemen di-sin-view.
 * Beda dari fade standar: ada "landing" di akhir dari arah tertentu.
 */
export function Reveal({
  children,
  className,
  delay = 0,
  y = 32,
  rotate = 0,
  once = true,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  rotate?: number;
  once?: boolean;
}) {
  const move = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={move ? { opacity: 1 } : { opacity: 0, y, rotate }}
      whileInView={move ? { opacity: 1 } : { opacity: 1, y: 0, rotate: 0 }}
      viewport={{ once, margin: "-70px" }}
      transition={{ duration: 0.85, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

/*
 * LetterReveal: karakter masuk satu-satu dari bawah.
 * Dipakai di headline besar — kesan "diketik tangan", bukan muncul instan.
 */
export function LetterReveal({
  text,
  className,
  delay = 0,
  stagger = 0.03,
}: {
  text: string;
  className?: string;
  delay?: number;
  stagger?: number;
}) {
  const move = useReducedMotion();
  if (move) return <span className={className}>{text}</span>;
  return (
    <span className={className} aria-label={text}>
      {text.split("").map((ch, i) =>
        ch === " " ? (
          <span key={i} className="inline-block w-[0.28em]" />
        ) : (
          <motion.span
            key={i}
            className="inline-block will-change-transform"
            initial={{ y: "105%", rotate: 3, opacity: 0 }}
            whileInView={{ y: "0%", rotate: 0, opacity: 1 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.6, delay: delay + i * stagger, ease: EASE }}
          >
            {ch}
          </motion.span>
        ),
      )}
    </span>
  );
}

/* ClipReveal: reveal via clip-path (bukan fade). */
export function ClipReveal({
  children,
  className,
  from = "bottom",
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  from?: "bottom" | "top";
  delay?: number;
}) {
  const move = useReducedMotion();
  const clipIn =
    from === "bottom" ? "inset(100% 0% 0% 0%)" : "inset(0% 0% 100% 0%)";
  return (
    <motion.div
      className={className}
      initial={move ? { clipPath: "inset(0% 0% 0% 0%)" } : { clipPath: clipIn }}
      whileInView={{ clipPath: "inset(0% 0% 0% 0%)" }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 1, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

/* Stagger: parent + child */
export const staggerParent: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};

export const staggerChild: Variants = {
  hidden: { opacity: 0, y: 26, rotate: 1.2 },
  show: {
    opacity: 1,
    y: 0,
    rotate: 0,
    transition: { duration: 0.7, ease: EASE },
  },
};

export function StaggerGroup({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      variants={staggerParent}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-60px" }}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <motion.div className={className} variants={staggerChild}>
      {children}
    </motion.div>
  );
}
