"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowUpRight, Menu, Sun, Moon, Command, Sparkles, MessageCircle } from "lucide-react";
import { cn, waLink } from "@/lib/utils";
import { SITE, NAV_LINKS } from "@/content/site";
import { useTheme } from "next-themes";
import { Drawer, DrawerTrigger, DrawerContent, DrawerHeader, DrawerTitle } from "@/components/ui/Drawer";

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();
  const { setTheme, resolvedTheme } = useTheme();
  const magneticRef = useRef<HTMLButtonElement>(null);
  const headerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const onScroll = () => {
      const scrollY = window.scrollY;
      setScrolled(scrollY > 12);
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? scrollY / docHeight : 0;
      setScrollProgress(progress);
      if (headerRef.current) {
        headerRef.current.style.setProperty("--scroll-progress", String(progress));
      }
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const toggleTheme = () => {
    setTheme(resolvedTheme === "dark" ? "light" : "dark");
  };

  const isDark = mounted && resolvedTheme === "dark";

  return (
    <>
      <header
        ref={headerRef}
        className={cn(
          "sticky top-0 z-50 border-b transition-all duration-200",
          scrolled
            ? "border-border bg-paper/95 backdrop-blur-[12px] shadow-layer-1"
            : "border-transparent bg-transparent"
        )}
      >
        <div className="relative">
          <div
            className="absolute top-0 left-0 h-[2px] bg-gradient-to-r from-flame via-lime to-flame origin-left transition-transform duration-micro"
            style={{ transform: `scaleX(${scrollProgress})` }}
            aria-hidden="true"
          />
        </div>

        <div className="section-shell flex h-[4.5rem] items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-2.5 shrink-0"
            aria-label="Kembali ke beranda"
            onClick={(e) => {
              if (pathname === "/") {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: "smooth" });
              }
            }}
          >
            <span className="grid h-9 w-9 place-items-center rounded-sharp bg-ink text-body-sm font-bold text-paper">
              t.
            </span>
            <span className="text-heading-sm font-semibold tracking-[-0.02em] text-ink">
              tampilin<span className="text-flame">.</span>
            </span>
          </Link>

          <nav className="hidden items-center gap-1 lg:flex lg:mx-auto" aria-label="Navigasi utama">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                aria-current={pathname === link.href ? "page" : undefined}
                className={cn(
                  "relative rounded-sharp px-4 py-2 text-body-sm font-medium text-ink-muted transition-all duration-micro hover:text-ink hover:bg-paper-subtle",
                  pathname === link.href && "text-ink bg-paper-subtle"
                )}
                onClick={(e) => {
                  if (link.href === "/" && pathname === "/") {
                    e.preventDefault();
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }
                }}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2 lg:gap-3">
            <button
              onClick={toggleTheme}
              className="button-icon lg:hidden"
              aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
              aria-pressed={isDark}
            >
              {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>

            <button
              ref={magneticRef}
              onClick={() => {
                // Command palette trigger
                window.dispatchEvent(new CustomEvent("cmdk:open"));
              }}
              className="hidden lg:button-icon"
              aria-label="Buka command palette (⌘K)"
            >
              <Command className="h-5 w-5" />
              <kbd className="sr-only">⌘K</kbd>
            </button>

            <Link
              href={waLink("Halo tampilin.online, saya mau tanya soal website.")}
              target="_blank"
              rel="noopener noreferrer"
              className="button-primary hidden lg:inline-flex"
            >
              <Sparkles className="h-4 w-4" />
              <span>Mulai proyek</span>
              <ArrowUpRight className="h-4 w-4" />
            </Link>

            <Drawer>
              <DrawerTrigger asChild>
                <button
                  type="button"
                  className="button-icon lg:hidden"
                  aria-label="Buka menu"
                  aria-expanded={open}
                >
                  <Menu className="h-5 w-5" />
                </button>
              </DrawerTrigger>
              <DrawerContent className="bg-paper">
                <DrawerHeader className="p-6 border-b border-border">
                  <DrawerTitle className="text-heading-lg font-semibold">
                    Navigasi
                  </DrawerTitle>
                </DrawerHeader>
                <nav className="p-6 space-y-1" aria-label="Navigasi mobile">
                  {NAV_LINKS.map((link, index) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className={cn(
                        "flex items-center justify-between gap-4 py-4 text-heading-sm font-semibold text-ink transition-colors duration-micro hover:text-flame",
                        pathname === link.href && "text-flame"
                      )}
                    >
                      <span className="mono-xs text-ink-muted">0{index + 1}</span>
                      {link.label}
                      <ArrowUpRight className="h-5 w-5 text-ink-muted" />
                    </Link>
                  ))}
                  <div className="pt-4 border-t border-border">
                    <button
                      type="button"
                      onClick={() => {
                        setOpen(false);
                        window.dispatchEvent(new CustomEvent("cmdk:open"));
                      }}
                      className="flex w-full items-center justify-between gap-4 py-3 text-body font-semibold text-ink transition-colors duration-micro hover:text-flame"
                    >
                      <span className="flex items-center gap-3">
                        <Command className="h-4 w-4" />
                        Cari halaman
                      </span>
                      <kbd className="mono-xs rounded-soft bg-paper-subtle px-2 py-0.5 text-ink-muted">
                        ⌘K
                      </kbd>
                    </button>
                  </div>
                  <div className="pt-4 border-t border-border">
                    <Link
                      href={waLink("Halo tampilin.online, saya mau tanya soal website.")}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="button-primary w-full justify-center"
                    >
                      <Sparkles className="h-4 w-4" />
                      <span>Mulai proyek</span>
                      <ArrowUpRight className="h-4 w-4" />
                    </Link>
                    <p className="mt-4 text-center text-body-sm text-ink-muted flex items-center justify-center gap-2">
                      <MessageCircle className="h-4 w-4" /> {SITE.whatsappDisplay}
                    </p>
                  </div>
                </nav>
              </DrawerContent>
            </Drawer>
          </div>
        </div>
      </header>
    </>
  );
}