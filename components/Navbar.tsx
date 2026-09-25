"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowUpRight, Menu, MessageCircle, X } from "lucide-react";
import { cn, waLink } from "@/lib/utils";
import { SITE, NAV_LINKS } from "@/content/site";

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  return (
    <>
      <header
        className={cn(
          "sticky top-0 z-50 border-b transition-colors duration-150",
          scrolled ? "border-line bg-canvas/95 backdrop-blur-md" : "border-transparent bg-canvas",
        )}
      >
        <div className="section-shell flex h-[4.5rem] items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5" aria-label="Kembali ke beranda">
            <span className="grid h-9 w-9 place-items-center rounded-lg bg-ink text-sm font-bold text-white">
              t.
            </span>
            <span className="text-lg font-semibold tracking-[-0.03em] text-ink">
              tampilin<span className="text-accent">.</span>
            </span>
          </Link>

          <nav className="hidden items-center gap-1 lg:flex" aria-label="Navigasi utama">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                aria-current={pathname === link.href ? "page" : undefined}
                className={cn(
                  "rounded-md px-3.5 py-2 text-sm font-medium text-ink-muted transition-colors duration-150 hover:bg-cream-dim hover:text-ink",
                  pathname === link.href && "bg-cream-dim text-ink",
                )}
              >
                {link.label}
              </Link>
            ))}
            <a
              href={waLink("Halo tampilin.online, saya mau tanya soal website.")}
              target="_blank"
              rel="noopener noreferrer"
              className="button-primary ml-3"
            >
              Mulai proyek
              <ArrowUpRight className="h-4 w-4" />
            </a>
          </nav>

          <button
            type="button"
            onClick={() => setOpen(true)}
            className="icon-button lg:hidden"
            aria-label="Buka menu"
            aria-expanded={open}
            aria-controls="mobile-navigation"
          >
            <Menu className="h-5 w-5" />
          </button>
        </div>
      </header>

      {open && (
        <div
          id="mobile-navigation"
          role="dialog"
          aria-modal="true"
          aria-label="Navigasi mobile"
          className="fixed inset-0 z-[60] flex flex-col bg-canvas lg:hidden"
        >
          <div className="section-shell flex h-[4.5rem] items-center justify-between border-b border-line">
            <Link href="/" className="flex items-center gap-2.5" onClick={() => setOpen(false)}>
              <span className="grid h-9 w-9 place-items-center rounded-lg bg-ink text-sm font-bold text-white">
                t.
              </span>
              <span className="text-lg font-semibold tracking-[-0.03em] text-ink">
                tampilin<span className="text-accent">.</span>
              </span>
            </Link>
            <button type="button" onClick={() => setOpen(false)} className="icon-button" aria-label="Tutup menu">
              <X className="h-5 w-5" />
            </button>
          </div>

          <nav className="section-shell flex flex-1 flex-col justify-center gap-1 py-12" aria-label="Navigasi mobile">
            {NAV_LINKS.map((link, index) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="flex items-center gap-4 border-b border-line py-5 text-2xl font-semibold tracking-[-0.03em] text-ink"
              >
                <span className="font-mono text-xs font-medium text-ink-muted">0{index + 1}</span>
                {link.label}
                <ArrowUpRight className="ml-auto h-5 w-5 text-ink-muted" />
              </Link>
            ))}
            <a
              href={waLink("Halo tampilin.online, saya mau tanya soal website.")}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setOpen(false)}
              className="button-primary mt-8 w-full"
            >
              Mulai proyek
              <ArrowUpRight className="h-4 w-4" />
            </a>
            <p className="mt-5 flex items-center gap-2 text-sm text-ink-muted">
              <MessageCircle className="h-4 w-4" /> {SITE.whatsappDisplay}
            </p>
          </nav>
        </div>
      )}
    </>
  );
}
