"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowUpRight, Instagram } from "lucide-react";
import { cn, waLink } from "@/lib/utils";
import { SITE, NAV_LINKS } from "@/content/site";

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
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

  return (
    <>
      <header
        className={cn(
          "fixed left-0 right-0 top-0 z-50",
          scrolled ? "border-b border-ink/10 bg-cream/90 backdrop-blur-md" : "bg-transparent",
        )}
      >
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4 md:px-8">
          <Link href="/" className="flex items-center gap-2">
            <span className="font-serif text-xl font-black tracking-tighter text-ink">
              tampilin
            </span>
          </Link>

          <nav className="hidden items-center gap-1 lg:flex">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "rounded-full px-4 py-2 font-mono text-sm uppercase tracking-wide text-ink/70 transition-colors hover:bg-ink hover:text-cream",
                  pathname === link.href && "bg-ink text-cream",
                )}
              >
                {link.label}
              </Link>
            ))}
            <a
              href={waLink("Halo tampilin.online, saya mau tanya soal website.")}
              target="_blank"
              rel="noopener noreferrer"
              className="ml-2 flex items-center gap-1.5 rounded-full bg-accent px-5 py-2.5 font-mono text-sm font-bold uppercase text-cream shadow-hard-sm transition-transform hover:-translate-y-0.5"
            >
              Mulai proyek
              <ArrowUpRight className="h-4 w-4" />
            </a>
          </nav>

          <button
            onClick={() => setOpen(true)}
            className="grid h-11 w-11 place-items-center rounded-xl border-2 border-ink bg-cream lg:hidden"
            aria-label="Buka menu"
          >
            <Menu className="h-5 w-5" />
          </button>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[70] flex flex-col bg-ink text-cream"
            initial={{ clipPath: "inset(0% 0% 100% 0%)" }}
            animate={{ clipPath: "inset(0% 0% 0% 0%)" }}
            exit={{ clipPath: "inset(0% 0% 100% 0%)" }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="flex items-center justify-between px-5 py-4">
              <span className="font-serif text-2xl font-black tracking-tighter">
                tampilin<span className="text-lime">.</span>
              </span>
              <button
                onClick={() => setOpen(false)}
                className="grid h-11 w-11 place-items-center rounded-xl border border-cream/20"
                aria-label="Tutup menu"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <nav className="flex flex-1 flex-col justify-center px-6">
              {NAV_LINKS.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ x: -24, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.06 * i, duration: 0.4 }}
                >
                  <Link
                    href={link.href}
                    className="group flex items-baseline gap-5 border-b border-cream/10 py-5"
                  >
                    <span className="font-mono text-xs text-cream/40">0{i + 1}</span>
                    <span className="font-serif text-4xl font-black tracking-tight transition-transform group-hover:-translate-x-1">
                      {link.label}
                    </span>
                  </Link>
                </motion.div>
              ))}
            </nav>
            <div className="px-6 pb-8">
              <a
                href={waLink("Halo tampilin.online, saya mau tanya soal website.")}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 rounded-2xl bg-accent px-6 py-4 font-mono text-sm font-bold uppercase text-cream"
              >
                Konsultasi gratis via WhatsApp
                <ArrowUpRight className="h-4 w-4" />
              </a>
              <p className="mt-4 flex items-center gap-2 font-mono text-xs text-cream/50">
                <Instagram className="h-3.5 w-3.5" /> {SITE.instagram}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
