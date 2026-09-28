"use client";

import { useEffect, useCallback, useState } from "react";
import { createContext, useContext } from "react";
import {
  Command,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandSeparator,
} from "cmdk";
import * as Dialog from "@radix-ui/react-dialog";
import { useRouter, usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import { toast } from "sonner";
import { cn, waLink } from "@/lib/utils";

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

interface PaletteItem {
  label: string;
  href?: string;
  action?: string;
  icon: string;
  shortcut: string;
  external?: boolean;
}

const COMMANDS: PaletteItem[] = [
  { label: "Home", href: "/", icon: "🏠", shortcut: "⌘H" },
  { label: "Layanan", href: "/layanan", icon: "🛠️", shortcut: "⌘L" },
  { label: "Harga & Simulasi", href: "/harga", icon: "💰", shortcut: "⌘P" },
  { label: "Preview", href: "/preview", icon: "👁️", shortcut: "⌘R" },
  { label: "Tentang", href: "/tentang", icon: "ℹ️", shortcut: "⌘A" },
  {
    label: "WhatsApp",
    href: waLink(),
    icon: "💬",
    shortcut: "⌘W",
    external: true,
  },
  { label: "Toggle Dark Mode", action: "toggle-theme", icon: "🌙", shortcut: "⌘D" },
];

export function CommandPaletteProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [session, setSession] = useState(0);
  const router = useRouter();
  const pathname = usePathname();
  const { setTheme, resolvedTheme } = useTheme();

  const openPalette = useCallback(() => {
    setSearch("");
    setSession((n) => n + 1);
    setIsOpen(true);
  }, []);

  const closePalette = useCallback(() => {
    setSearch("");
    setIsOpen(false);
  }, []);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        if (isOpen) {
          closePalette();
        } else {
          openPalette();
        }
      }
    };

    const handleOpenEvent = () => openPalette();

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("cmdk:open", handleOpenEvent);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("cmdk:open", handleOpenEvent);
    };
  }, [isOpen, openPalette, closePalette]);

  const handleAction = useCallback(
    (action: string) => {
      switch (action) {
        case "toggle-theme":
          setTheme(resolvedTheme === "dark" ? "light" : "dark");
          toast(resolvedTheme === "dark" ? "Light mode aktif" : "Dark mode aktif");
          break;
      }
    },
    [resolvedTheme, setTheme]
  );

  const navItems = COMMANDS.filter((c) => c.href);
  const actionItems = COMMANDS.filter((c) => c.action);

  return (
    <CommandPaletteContext.Provider value={{ isOpen, setIsOpen }}>
      {children}

      <Dialog.Root open={isOpen} onOpenChange={(open) => (open ? openPalette() : closePalette())}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 z-[60] bg-black/50 backdrop-blur-sm" />
          <Dialog.Content className="fixed left-1/2 top-[12vh] z-[60] w-[calc(100vw-2rem)] max-w-xl -translate-x-1/2 overflow-hidden rounded-sharp border border-border bg-paper shadow-layer-3 focus:outline-none">
            <Dialog.Title className="sr-only">Command palette</Dialog.Title>
            <Dialog.Description className="sr-only">
              Cari halaman atau jalankan aksi dengan cepat.
            </Dialog.Description>

            <Command
              key={session}
              label="Command palette"
              loop
              className="[&_[cmdk-group-heading]]:px-4 [&_[cmdk-group-heading]]:py-2 [&_[cmdk-group-heading]]:text-mono-xs [&_[cmdk-group-heading]]:font-semibold [&_[cmdk-group-heading]]:uppercase [&_[cmdk-group-heading]]:tracking-[0.1em] [&_[cmdk-group-heading]]:text-ink-subtle"
            >
              <div className="flex items-center border-b border-border px-4">
                <CommandInput
                  value={search}
                  onValueChange={setSearch}
                  placeholder="Cari halaman atau aksi..."
                  className="h-14 w-full bg-transparent text-body-lg text-ink outline-none placeholder:text-ink-subtle"
                />
                <kbd className="mono-xs flex-shrink-0 rounded-soft bg-paper-subtle px-2 py-1 text-ink-muted">
                  Esc
                </kbd>
              </div>

              <CommandList className="max-h-[22rem] overflow-y-auto p-2">
                <CommandEmpty className="py-8 text-center text-body-sm text-ink-muted">
                  Tidak ditemukan
                </CommandEmpty>

                <CommandGroup heading="Navigasi">
                  {navItems.map((cmd) => (
                    <CommandItem
                      key={cmd.href}
                      value={`${cmd.label} ${cmd.href}`}
                      onSelect={() => {
                        closePalette();
                        if (cmd.external) {
                          window.open(cmd.href, "_blank", "noopener,noreferrer");
                        } else {
                          router.push(cmd.href!);
                          if (pathname === cmd.href) {
                            window.scrollTo({ top: 0, behavior: "smooth" });
                          }
                        }
                      }}
                      className={cn(
                        "flex cursor-pointer items-center justify-between gap-4 rounded-soft px-3 py-2.5 text-body text-ink data-[selected=true]:bg-paper-subtle",
                        pathname === cmd.href && "text-flame"
                      )}
                    >
                      <span className="flex items-center gap-3">
                        <span aria-hidden="true" className="text-base">
                          {cmd.icon}
                        </span>
                        <span>{cmd.label}</span>
                      </span>
                      <kbd className="mono-xs rounded-soft bg-paper-subtle px-2 py-0.5 text-ink-muted">
                        {cmd.shortcut}
                      </kbd>
                    </CommandItem>
                  ))}
                </CommandGroup>

                <CommandSeparator className="my-2 h-px bg-border" />

                <CommandGroup heading="Aksi">
                  {actionItems.map((cmd) => (
                    <CommandItem
                      key={cmd.action}
                      value={`${cmd.label} ${cmd.action}`}
                      onSelect={() => {
                        closePalette();
                        handleAction(cmd.action!);
                      }}
                      className="flex cursor-pointer items-center justify-between gap-4 rounded-soft px-3 py-2.5 text-body text-ink data-[selected=true]:bg-paper-subtle"
                    >
                      <span className="flex items-center gap-3">
                        <span aria-hidden="true" className="text-base">
                          {cmd.icon}
                        </span>
                        <span>{cmd.label}</span>
                      </span>
                      <kbd className="mono-xs rounded-soft bg-paper-subtle px-2 py-0.5 text-ink-muted">
                        {cmd.shortcut}
                      </kbd>
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </CommandPaletteContext.Provider>
  );
}
