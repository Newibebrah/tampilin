"use client";

import { useEffect, useState } from "react";
import { Toaster } from "sonner";
import { ThemeProvider } from "next-themes";
import { LenisProvider } from "@/components/LenisProvider";
import { CommandPaletteProvider } from "@/components/CommandPalette";

export function Providers({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
      <LenisProvider>
        <CommandPaletteProvider>
          {children}
          {mounted && (
            <Toaster
              position="bottom-right"
              toastOptions={{
                className: "bg-paper text-ink border-border shadow-layer-3",
                style: { boxShadow: "0 4px 24px rgba(0,0,0,0.1)" },
                duration: 4000,
              }}
            />
          )}
        </CommandPaletteProvider>
      </LenisProvider>
    </ThemeProvider>
  );
}