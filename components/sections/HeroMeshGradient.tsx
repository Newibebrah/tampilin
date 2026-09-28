"use client";

import { useRef, useEffect } from "react";
import { cn } from "@/lib/utils";

interface MeshGradientProps {
  className?: string;
}

export function MeshGradient({ className }: MeshGradientProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let time = 0;

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = canvas.offsetWidth * dpr;
      canvas.height = canvas.offsetHeight * dpr;
      canvas.style.width = canvas.offsetWidth + "px";
      canvas.style.height = canvas.offsetHeight + "px";
      ctx.scale(dpr, dpr);
    };

    const blobs = [
      { x: 0.3, y: 0.2, r: 0.6, color: "rgba(255,77,46,0.15)", speedX: 0.0003, speedY: 0.0002 },
      { x: 0.7, y: 0.8, r: 0.5, color: "rgba(232,255,90,0.1)", speedX: -0.0002, speedY: -0.0003 },
      { x: 0.5, y: 0.5, r: 0.4, color: "rgba(27,58,47,0.08)", speedX: 0.0001, speedY: 0.00015 },
    ];

    const draw = () => {
      if (!ctx) return;
      const width = canvas.offsetWidth;
      const height = canvas.offsetHeight;

      ctx.clearRect(0, 0, width, height);

      time += 0.01;

      blobs.forEach((blob) => {
        blob.x += Math.sin(time * blob.speedX * 1000) * 0.0005;
        blob.y += Math.cos(time * blob.speedY * 1000) * 0.0005;

        blob.x = Math.max(0.1, Math.min(0.9, blob.x));
        blob.y = Math.max(0.1, Math.min(0.9, blob.y));

        const gradient = ctx.createRadialGradient(
          blob.x * width, blob.y * height, 0,
          blob.x * width, blob.y * height, Math.max(width, height) * blob.r
        );
        gradient.addColorStop(0, blob.color);
        gradient.addColorStop(1, "transparent");

        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, width, height);
      });

      animationId = requestAnimationFrame(draw);
    };

    resize();
    draw();

    const handleResize = () => resize();
    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={cn("absolute inset-0 w-full h-full pointer-events-none", className)}
      aria-hidden="true"
    />
  );
}