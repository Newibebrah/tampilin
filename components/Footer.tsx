"use client";

import { useEffect, useState } from "react";
import { ArrowUpRight, Clock3, Instagram, Mail, MapPin, MessageCircle, Sun, Moon } from "lucide-react";
import Link from "next/link";
import { waLink } from "@/lib/utils";
import { SITE, NAV_LINKS, FOOTER_NOTE } from "@/content/site";
import { useTheme } from "next-themes";

export function Footer() {
  const { setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isDark = mounted && resolvedTheme === "dark";

  return (
    <footer className="border-t border-border bg-paper dark:bg-ink dark:border-border">
      <div className="border-b border-border/50">
        <div className="section-shell grid gap-8 py-14 md:grid-cols-[1fr_auto] md:items-end md:py-16">
          <div>
            <p className="eyebrow text-lime">Siap mulai?</p>
            <h2 className="mt-4 max-w-2xl display-sm text-ink dark:text-paper">
              Ceritakan bisnis Anda. Kami bantu bikin website yang layak dipakai.
            </h2>
          </div>
          <a
            href={waLink("Halo tampilin.online, saya mau mendiskusikan kebutuhan website saya.")}
            target="_blank"
            rel="noopener noreferrer"
            className="button-primary"
          >
            Konsultasi via WhatsApp
            <ArrowUpRight className="h-4 w-4" />
          </a>
        </div>
      </div>

      <div className="section-shell grid gap-12 py-14 md:grid-cols-12 md:py-16">
        <div className="md:col-span-5">
          <Link href="/" className="inline-flex items-center gap-2.5">
            <span className="grid h-9 w-9 place-items-center rounded-sharp bg-flame text-body-sm font-bold text-paper">
              t.
            </span>
            <span className="text-heading-lg font-semibold tracking-[-0.02em] text-ink dark:text-paper">
              tampilin<span className="text-flame">.</span>
            </span>
          </Link>
          <p className="mt-5 max-w-sm body text-ink-muted dark:text-ink-muted">{SITE.tagline}</p>
          <a
            href={waLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-7 inline-flex items-center gap-2 body-sm font-medium text-ink-muted dark:text-ink-muted transition-colors duration-micro hover:text-flame"
          >
            {SITE.whatsappDisplay}
            <ArrowUpRight className="h-4 w-4" />
          </a>
        </div>

        <div className="md:col-span-3">
          <h3 className="mono-xs text-ink-subtle dark:text-ink-subtle">Navigasi</h3>
          <ul className="mt-5 space-y-3">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="body-sm text-ink-muted dark:text-ink-muted transition-colors duration-micro hover:text-flame"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="md:col-span-4">
          <h3 className="mono-xs text-ink-subtle dark:text-ink-subtle">Hubungi kami</h3>
          <ul className="mt-5 space-y-4 body-sm text-ink-muted dark:text-ink-muted">
            <li>
              <a
                href={waLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 transition-colors duration-micro hover:text-flame"
              >
                <span className="grid h-8 w-8 place-items-center rounded-soft border border-border bg-paper-subtle dark:bg-paper-deep">
                  <MessageCircle className="h-4 w-4" />
                </span>
                {SITE.whatsappDisplay}
              </a>
            </li>
            <li>
              <a href={`mailto:${SITE.email}`} className="flex items-center gap-3 transition-colors duration-micro hover:text-flame">
                <span className="grid h-8 w-8 place-items-center rounded-soft border border-border bg-paper-subtle dark:bg-paper-deep">
                  <Mail className="h-4 w-4" />
                </span>
                {SITE.email}
              </a>
            </li>
            <li>
              <a href={SITE.instagramUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 transition-colors duration-micro hover:text-flame">
                <span className="grid h-8 w-8 place-items-center rounded-soft border border-border bg-paper-subtle dark:bg-paper-deep">
                  <Instagram className="h-4 w-4" />
                </span>
                {SITE.instagram}
              </a>
            </li>
            <li className="flex items-center gap-3">
              <span className="grid h-8 w-8 place-items-center rounded-soft border border-border bg-paper-subtle dark:bg-paper-deep">
                <Clock3 className="h-4 w-4" />
              </span>
              {SITE.hours}
            </li>
            <li className="flex items-center gap-3">
              <span className="grid h-8 w-8 place-items-center rounded-soft border border-border bg-paper-subtle dark:bg-paper-deep">
                <MapPin className="h-4 w-4" />
              </span>
              {SITE.city}
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-border/50">
        <div className="section-shell flex flex-col gap-4 py-8 text-body-sm text-ink-muted dark:text-ink-muted sm:flex-row sm:items-center sm:justify-between">
          <p>© {SITE.since} {SITE.name}. {FOOTER_NOTE}</p>
          <div className="flex items-center gap-4">
            <p className="mono-xs uppercase tracking-[0.16em]">Web yang jelas, profesional, siap dipakai</p>
            <button
              onClick={() => setTheme(isDark ? "light" : "dark")}
              className="button-icon h-10 w-10"
              aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
            >
              {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}