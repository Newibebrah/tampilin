import type { ReactNode } from "react";

export function Reveal({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  rotate?: number;
  once?: boolean;
}) {
  return <div className={className}>{children}</div>;
}

export function LetterReveal({
  text,
  className,
}: {
  text: string;
  className?: string;
  delay?: number;
  stagger?: number;
}) {
  return <span className={className}>{text}</span>;
}

export function ClipReveal({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
  from?: "bottom" | "top";
  delay?: number;
}) {
  return <div className={className}>{children}</div>;
}

export const staggerParent = {};
export const staggerChild = {};

export function StaggerGroup({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return <div className={className}>{children}</div>;
}

export function StaggerItem({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return <div className={className}>{children}</div>;
}
