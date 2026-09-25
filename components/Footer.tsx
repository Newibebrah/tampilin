import { ArrowUpRight, Clock3, Instagram, Mail, MapPin, MessageCircle } from "lucide-react";
import Link from "next/link";
import { waLink } from "@/lib/utils";
import { SITE, NAV_LINKS, FOOTER_NOTE } from "@/content/site";

export function Footer() {
  return (
    <footer className="bg-ink text-white">
      <div className="border-b border-white/10">
        <div className="section-shell grid gap-8 py-14 md:grid-cols-[1fr_auto] md:items-end md:py-16">
          <div>
            <p className="eyebrow text-lime">Siap mulai?</p>
            <h2 className="mt-4 max-w-2xl text-3xl font-semibold leading-tight tracking-[-0.04em] sm:text-4xl">
              Ceritakan bisnis Anda. Kami bantu bikin website yang layak dipakai.
            </h2>
          </div>
          <a
            href={waLink("Halo tampilin.online, saya mau mendiskusikan kebutuhan website saya.")}
            target="_blank"
            rel="noopener noreferrer"
            className="button-primary bg-accent hover:bg-accent-deep"
          >
            Konsultasi via WhatsApp
            <ArrowUpRight className="h-4 w-4" />
          </a>
        </div>
      </div>

      <div className="section-shell grid gap-12 py-14 md:grid-cols-12 md:py-16">
        <div className="md:col-span-5">
          <Link href="/" className="inline-flex items-center gap-2.5">
            <span className="grid h-9 w-9 place-items-center rounded-lg bg-accent text-sm font-bold text-white">t.</span>
            <span className="text-xl font-semibold tracking-[-0.03em]">
              tampilin<span className="text-accent">.</span>
            </span>
          </Link>
          <p className="mt-5 max-w-sm text-sm leading-7 text-white/60">{SITE.tagline}</p>
          <a
            href={waLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-7 inline-flex items-center gap-2 text-sm font-medium text-white transition-colors duration-150 hover:text-lime"
          >
            {SITE.whatsappDisplay}
            <ArrowUpRight className="h-4 w-4" />
          </a>
        </div>

        <div className="md:col-span-3">
          <h3 className="text-xs font-semibold uppercase tracking-[0.18em] text-white/50">Navigasi</h3>
          <ul className="mt-5 space-y-3">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="text-sm text-white/70 transition-colors duration-150 hover:text-white">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="md:col-span-4">
          <h3 className="text-xs font-semibold uppercase tracking-[0.18em] text-white/50">Hubungi kami</h3>
          <ul className="mt-5 space-y-4 text-sm text-white/70">
            <li>
              <a
                href={waLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 transition-colors duration-150 hover:text-white"
              >
                <span className="grid h-8 w-8 place-items-center rounded-lg bg-white/5"><MessageCircle className="h-4 w-4" /></span>
                {SITE.whatsappDisplay}
              </a>
            </li>
            <li>
              <a href={`mailto:${SITE.email}`} className="flex items-center gap-3 transition-colors duration-150 hover:text-white">
                <span className="grid h-8 w-8 place-items-center rounded-lg bg-white/5"><Mail className="h-4 w-4" /></span>
                {SITE.email}
              </a>
            </li>
            <li>
              <a href={SITE.instagramUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 transition-colors duration-150 hover:text-white">
                <span className="grid h-8 w-8 place-items-center rounded-lg bg-white/5"><Instagram className="h-4 w-4" /></span>
                {SITE.instagram}
              </a>
            </li>
            <li className="flex items-center gap-3">
              <span className="grid h-8 w-8 place-items-center rounded-lg bg-white/5"><Clock3 className="h-4 w-4" /></span>
              {SITE.hours}
            </li>
            <li className="flex items-center gap-3">
              <span className="grid h-8 w-8 place-items-center rounded-lg bg-white/5"><MapPin className="h-4 w-4" /></span>
              {SITE.city}
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="section-shell flex flex-col gap-2 py-6 text-xs text-white/40 sm:flex-row sm:items-center sm:justify-between">
          <p>© {SITE.since} {SITE.name}. {FOOTER_NOTE}</p>
          <p className="uppercase tracking-[0.16em]">Web yang jelas, profesional, dan siap dipakai</p>
        </div>
      </div>
    </footer>
  );
}
