"use client";

import { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface RevealMaskProps {
  children: React.ReactNode;
  className?: string;
  threshold?: number;
  rootMargin?: string;
  once?: boolean;
  delay?: number;
}

export function RevealMask({
  children,
  className,
  threshold = 0.1,
  rootMargin = "0px",
  once = true,
  delay = 0,
}: RevealMaskProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (once) observer.unobserve(entry.target);
        } else if (!once) {
          setIsVisible(false);
        }
      },
      { threshold, rootMargin }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold, rootMargin, once]);

  return (
    <div ref={ref} className={cn("overflow-hidden", className)}>
      <motion.div
        initial={{ clipPath: "inset(100% 0 0 0)" }}
        animate={isVisible ? { clipPath: "inset(0 0 0 0)" } : { clipPath: "inset(100% 0 0 0)" }}
        transition={{
          duration: 0.8,
          ease: [0.22, 1, 0.36, 1],
          delay,
        }}
      >
        {children}
      </motion.div>
    </div>
  );
}

interface StaggerRevealProps {
  children: React.ReactNode;
  className?: string;
  stagger?: number;
  delay?: number;
  threshold?: number;
  rootMargin?: string;
}

export function StaggerReveal({
  children,
  className,
  stagger = 0.1,
  delay = 0,
  threshold = 0.1,
  rootMargin = "0px",
}: StaggerRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold, rootMargin }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold, rootMargin]);

  return (
    <div ref={ref} className={className}>
      {React.Children.map(children, (child, index) =>
        React.isValidElement(child)
          ? React.cloneElement(child as React.ReactElement<any>, {
              initial: { opacity: 0, y: 20 },
              animate: isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 },
              transition: {
                duration: 0.6,
                ease: [0.22, 1, 0.36, 1],
                delay: delay + index * stagger,
              },
            })
          : child
      )}
    </div>
  );
}

import React from "react";