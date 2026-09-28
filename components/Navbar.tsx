"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowUpRight, Menu, MessageCircle, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import { SITE, NAV_LINKS } from "@/content/site";
import { Drawer, DrawerTrigger, DrawerContent, DrawerHeader, DrawerTitle } from "@/components/ui/Drawer";

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const pathname = usePathname();
  const headerRef = useRef<HTMLElement>(null);

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
            <span className="grid h-10 w-10 place-items-center rounded-soft bg-flame text-heading-sm font-extrabold text-paper shadow-glow-flame">
              t.
            </span>
            <span className="text-heading-sm font-bold tracking-[-0.03em] text-ink">
              tampilin<span className="text-flame-hover">.</span>
            </span>
          </Link>

          <nav className="hidden items-center gap-1 lg:flex lg:mx-auto" aria-label="Navigasi utama">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                aria-current={pathname === link.href ? "page" : undefined}
                className={cn(
                  "relative rounded-soft px-4 py-2.5 text-body-sm font-semibold text-ink-muted transition-all duration-micro hover:bg-paper-subtle hover:text-ink",
                  "after:absolute after:inset-x-4 after:-bottom-px after:h-0.5 after:origin-left after:scale-x-0 after:rounded-full after:bg-flame after:transition-transform after:duration-standard",
                  "hover:after:scale-x-100",
                  pathname === link.href && "bg-paper-subtle text-ink after:scale-x-100"
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
            <Link href="/harga" className="button-primary hidden lg:inline-flex">
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
                        "flex items-center justify-between gap-4 py-4 text-heading-sm font-semibold text-ink transition-colors duration-micro hover:text-flame-hover",
                        pathname === link.href && "text-flame-hover"
                      )}
                    >
                      <span className="mono-xs text-ink-muted">0{index + 1}</span>
                      {link.label}
                      <ArrowUpRight className="h-5 w-5 text-ink-muted" />
                    </Link>
                  ))}
                  <div className="pt-4 border-t border-border">
                    <Link href="/harga" className="button-primary w-full justify-center">
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