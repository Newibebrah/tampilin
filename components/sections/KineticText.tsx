"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface KineticTextProps {
  text: string;
  className?: string;
  highlightWords?: string[];
  highlightClassName?: string;
  delay?: number;
  stagger?: number;
}

export function KineticText({
  text,
  className,
  highlightWords = [],
  highlightClassName = "text-flame",
  delay = 0,
  stagger = 0.08,
}: KineticTextProps) {
  const words = text.split(" ");

  return (
    <motion.span
      className={cn("inline-block", className)}
      initial="hidden"
      animate="visible"
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: {
            staggerChildren: stagger,
            delayChildren: delay,
          },
        },
      }}
    >
      {words.map((word, index) => {
        const isHighlighted = highlightWords.some((hw) => word.includes(hw));
        const cleanWord = word.replace(/[.,!?;:]/g, "");
        const punctuation = word.slice(cleanWord.length);

        return (
          <motion.span
            key={index}
            className={cn(
              "inline-block",
              isHighlighted && highlightClassName
            )}
            initial={{ opacity: 0, y: 30, rotateX: -90 }}
            animate={{ opacity: 1, y: 0, rotateX: 0 }}
            transition={{
              duration: 0.7,
              ease: [0.22, 1, 0.36, 1],
            }}
            style={{ display: "inline-block", marginRight: index < words.length - 1 ? "0.25em" : 0 }}
          >
            {cleanWord}{punctuation}
          </motion.span>
        );
      })}
    </motion.span>
  );
}