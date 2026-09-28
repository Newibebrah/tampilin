"use client";

import { useState, useEffect, useCallback } from "react";
import { createContext, useContext } from "react";
import { Command, CommandInput, CommandList, CommandEmpty, CommandGroup, CommandItem, CommandSeparator } from "cmdk";
import { cn } from "@/lib/utils";
import { useRouter, usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import { toast } from "sonner";
import { SITE, NAV_LINKS } from "@/content/site";
import { waLink } from "@/lib/utils";

interface CommandPaletteContextType {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

const CommandPaletteContext = createContext<CommandPaletteContextType | null>(null);

export function useCommandPalette() {
  const context = useContext(CommandPaletteContext);
  if (!context) throw new Error("useCommandPalette must be used within CommandPaletteProvider");
  return context;
}

interface CommandItem {
  label: string;
  href?: string;
  action?: string;
  icon: string;
  shortcut: string;
  external?: boolean;
}

const COMMANDS: CommandItem[] = [
  { label: "Home", href: "/", icon: "🏠", shortcut: "⌘H" },
  { label: "Layanan", href: "/layanan", icon: "🛠️", shortcut: "⌘L" },
  { label: "Harga & Simulasi", href: "/harga", icon: "💰", shortcut: "⌘P" },
  { label: "Preview", href: "/preview", icon: "👁️", shortcut: "⌘R" },
  { label: "Tentang", href: "/tentang", icon: "ℹ️", shortcut: "⌘A" },
  { label: "WhatsApp", href: waLink("Halo tampilin.online, saya mau tanya soal website."), icon: "💬", shortcut: "⌘W", external: true },
  { label: "Toggle Dark Mode", action: "toggle-theme", icon: "🌙", shortcut: "⌘D" },
  { label: "Reset Kalkulator", action: "reset-calculator", icon: "🔄", shortcut: "⌘R" },
];

export function CommandPaletteProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const { theme, setTheme, resolvedTheme } = useTheme();

  const handleAction = useCallback((action: string) => {
    switch (action) {
      case "toggle-theme":
        setTheme(resolvedTheme === "dark" ? "light" : "dark");
        toast(resolvedTheme === "dark" ? "Light mode activated" : "Dark mode activated");
        break;
      case "reset-calculator":
        window.dispatchEvent(new CustomEvent("calculator:reset"));
        toast("Kalkulator direset");
        break;
    }
  }, [resolvedTheme, setTheme]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key === "k") {
        event.preventDefault();
        setIsOpen(true);
      }
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("cmdk:open", () => setIsOpen(true));

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("cmdk:open", () => setIsOpen(true));
    };
  }, []);

  return (
    <CommandPaletteContext.Provider value={{ isOpen, setIsOpen }}>
      {children}
      <Command>
        <CommandInput
          placeholder="Cari halaman, aksi... (⌘K)"
          className="bg-paper border-border text-ink placeholder:text-ink-muted"
        />
        <CommandList className="max-h-[400px] bg-paper border-border shadow-layer-3">
          <CommandGroup heading="Navigasi">
            {COMMANDS.filter((c): c is CommandItem & { href: string } => !!c.href).map((cmd) => (
              <CommandItem
                key={cmd.href}
                onSelect={() => {
                  if (cmd.external) {
                    window.open(cmd.href, "_blank", "noopener,noreferrer");
                  } else {
                    router.push(cmd.href);
                    if (pathname === cmd.href && cmd.href === "/") {
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }
                  }
                  setIsOpen(false);
                }}
                className={cn(
                  "flex items-center justify-between gap-4 px-3 py-2 text-body text-ink",
                  pathname === cmd.href && "bg-paper-subtle"
                )}
              >
                <span className="flex items-center gap-3">
                  <span className="text-xl">{cmd.icon}</span>
                  <span>{cmd.label}</span>
                </span>
                <kbd className="mono-xs text-ink-muted px-2 py-0.5 rounded bg-paper-subtle">{cmd.shortcut}</kbd>
              </CommandItem>
            ))}
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading="Aksi">
            {COMMANDS.filter(c => c.action).map((cmd) => (
              <CommandItem
                key={cmd.action}
                onSelect={() => {
                  handleAction(cmd.action!);
                  setIsOpen(false);
                }}
                className="flex items-center justify-between gap-4 px-3 py-2 text-body text-ink"
              >
                <span className="flex items-center gap-3">
                  <span className="text-xl">{cmd.icon}</span>
                  <span>{cmd.label}</span>
                </span>
                <kbd className="mono-xs text-ink-muted px-2 py-0.5 rounded bg-paper-subtle">{cmd.shortcut}</kbd>
              </CommandItem>
            ))}
          </CommandGroup>
        </CommandList>
        <CommandEmpty className="py-6 text-center text-body-sm text-ink-muted">
          Tidak ditemukan
        </CommandEmpty>
      </Command>
    </CommandPaletteContext.Provider>
  );
}