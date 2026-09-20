import { ArrowUpRight, Instagram, Mail, MapPin, Clock } from "lucide-react";
import Link from "next/link";
import { cn, waLink } from "@/lib/utils";
import { SITE, NAV_LINKS, FOOTER_NOTE } from "@/content/site";
import { Marquee } from "@/components/Marquee";
import { RotatingBadge } from "@/components/RotatingBadge";

const MARQUEE_WORDS = [
  "Tampil online",
  "Nggak asal jadi",
  "Desain custom",
  "Cepat",
  "Jujur soal harga",
  "UMKM bangga",
];

export function Footer() {
  return (
    <footer className="relative z-10 border-t border-ink/10 bg-ink text-cream">
      <div className="border-b border-cream/10 py-4">
        <Marquee items={MARQUEE_WORDS} slow className="font-serif text-2xl font-black tracking-tight text-cream/90" />
      </div>

      <div className="grid gap-10 px-5 py-14 md:grid-cols-12 md:px-8">
        <div className="md:col-span-5">
          <Link href="/" className="inline-flex items-center gap-2">
            <span className="grid h-10 w-10 -rotate-6 place-items-center rounded-xl bg-accent font-serif text-2xl font-black text-cream shadow-sticker-sm">
              t.
            </span>
            <span className="font-serif text-3xl font-black tracking-tighter">
              tampilin<span className="text-accent">.</span>
            </span>
          </Link>
          <p className="mt-4 max-w-xs font-mono text-sm leading-relaxed text-cream/60">
            {SITE.tagline}
          </p>
          <a
            href={waLink("Halo tampilin.online, saya mau tanya soal website.")}
            target="_blank"
            rel="noopener noreferrer"
            className="group mt-8 inline-flex items-center gap-3 rounded-2xl bg-accent px-6 py-4 font-mono text-sm font-bold uppercase text-cream shadow-sticker-sm transition-transform hover:-translate-y-0.5"
          >
            Mulai dari &quot;Halo&quot;
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>

          <RotatingBadge
            text="TAMPILIN ONLINE • WEB JASA • UMKM • "
            className="h-32 w-32 text-cream"
            label="t."
          />
        </div>

        <div className="md:col-span-3">
          <h4 className="font-mono text-xs uppercase tracking-[0.25em] text-cream/40">Menu</h4>
          <ul className="mt-5 space-y-3">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="group inline-flex items-center gap-2 font-serif text-xl font-bold text-cream/80 transition-colors hover:text-cream"
                >
                  {link.label}
                  <ArrowUpRight className="h-4 w-4 opacity-0 transition-opacity group-hover:opacity-100" />
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="md:col-span-4">
          <h4 className="font-mono text-xs uppercase tracking-[0.25em] text-cream/40">Ngobrol</h4>
          <ul className="mt-5 space-y-4 text-sm">
            <li>
              <a
                href={waLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 font-mono text-cream/70 transition-colors hover:text-cream"
              >
                <span className="grid h-9 w-9 place-items-center rounded-xl bg-cream/5">
                  <Instagram className="h-4 w-4" />
                </span>
                {SITE.whatsappDisplay}
              </a>
            </li>
            <li>
              <a
                href={`mailto:${SITE.email}`}
                className="flex items-center gap-3 font-mono text-cream/70 transition-colors hover:text-cream"
              >
                <span className="grid h-9 w-9 place-items-center rounded-xl bg-cream/5">
                  <Mail className="h-4 w-4" />
                </span>
                {SITE.email}
              </a>
            </li>
            <li className="flex items-center gap-3 font-mono text-cream/70">
              <span className="grid h-9 w-9 place-items-center rounded-xl bg-cream/5">
                <Clock className="h-4 w-4" />
              </span>
              {SITE.hours}
            </li>
            <li className="flex items-center gap-3 font-mono text-cream/70">
              <span className="grid h-9 w-9 place-items-center rounded-xl bg-cream/5">
                <MapPin className="h-4 w-4" />
              </span>
              {SITE.city}
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-cream/10 px-5 py-6 md:px-8">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 font-mono text-xs text-cream/40 md:flex-row md:items-center md:justify-between">
          <p>
            © {SITE.since} {SITE.name}. {FOOTER_NOTE}
          </p>
          <p className="uppercase tracking-[0.25em]">tampil · rapi · jalan</p>
        </div>
      </div>
    </footer>
  );
}
